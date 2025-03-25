package com.example.digital_fine_management_system.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.refresh-secret}")
    private String jwtRefreshSecret;

    @Value("${jwt.expiration:3600000}")
    private long jwtExpirationInMs;

    @Value("${jwt.refresh-expiration:86400000}")
    private long jwtRefreshExpirationInMs;

    @Value("${jwt.algorithm:HS512}")
    private String algorithm;

    private SecretKey signingKey;
    private SecretKey refreshSigningKey;

    @PostConstruct
    public void init() {
        this.signingKey = generateKey(jwtSecret);
        this.refreshSigningKey = generateKey(jwtRefreshSecret);
        logger.info("JwtTokenProvider initialized with algorithm: {}", algorithm);
    }

    private SecretKey generateKey(String secret) {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 64) {
            logger.warn("JWT secret is shorter than 64 bytes, which is insecure for HS512.");
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(String username, String role) {
        return generateToken(username, jwtExpirationInMs, role, signingKey);
    }

    public String generateRefreshToken(String username, String role) {
        return generateToken(username, jwtRefreshExpirationInMs, role, refreshSigningKey);
    }

    private String generateToken(String username, long expiration, String role, SecretKey key) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.forName(algorithm))
                .compact();
    }

    public boolean validateToken(String token, boolean isRefresh) {
        try {
            parseClaims(token, isRefresh ? refreshSigningKey : signingKey);
            return true;
        } catch (ExpiredJwtException e) {
            logger.debug("Token expired: {}", e.getMessage());
        } catch (SignatureException | MalformedJwtException e) {
            logger.debug("Invalid token: {}", e.getMessage());
        } catch (JwtException e) {
            logger.debug("Token validation failed: {}", e.getMessage());
        }
        return false;
    }


    public boolean validateRefreshToken(String token) {
        return validateToken(token, true);
    }

    public String extractUsername(String token, boolean isRefresh) {
        return extractClaim(token, Claims::getSubject, isRefresh ? refreshSigningKey : signingKey);
    }

    public String extractRole(String token, boolean isRefresh) {
        return extractClaim(token, claims -> claims.get("role", String.class), isRefresh ? refreshSigningKey : signingKey);
    }

    public Date extractExpiration(String token, boolean isRefresh) {
        return extractClaim(token, Claims::getExpiration, isRefresh ? refreshSigningKey : signingKey);
    }

    private Claims parseClaims(String token, SecretKey key) {
        validateTokenNotNullOrEmpty(token);
        return Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token.trim())
                .getBody();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver, SecretKey key) {
        return claimsResolver.apply(parseClaims(token, key));
    }

    private void validateTokenNotNullOrEmpty(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
    }

    public static class JwtAuthenticationException extends RuntimeException {
        public JwtAuthenticationException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
