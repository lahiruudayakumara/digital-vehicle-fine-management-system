package com.example.digital_fine_management_system.service.auth;

import com.example.digital_fine_management_system.dto.auth.LoginRequest;
import com.example.digital_fine_management_system.dto.auth.LoginResponse;
import com.example.digital_fine_management_system.dto.auth.RegisterRequest;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;
import com.example.digital_fine_management_system.model.user.PoliceOfficer;
import com.example.digital_fine_management_system.model.user.Role;
import com.example.digital_fine_management_system.model.user.User;
import com.example.digital_fine_management_system.repository.user.UserRepository;
import com.example.digital_fine_management_system.util.JwtTokenProvider;
import com.example.digital_fine_management_system.util.PasswordUtil;
import com.example.digital_fine_management_system.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String registerUser(RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            User user = new User();
            user.setFullName(request.getFullName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(PasswordUtil.encodePassword(request.getPassword()));
            user.setRole(Role.valueOf(request.getRole()));

            userRepository.save(user);
            return "User registered successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String registerPoliceOfficer(PoliceOfficerRequestDTO request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            PoliceOfficer policeOfficer = new PoliceOfficer();
            policeOfficer.setFullName(request.getFullName());
            policeOfficer.setUsername(request.getUsername());
            policeOfficer.setEmail(request.getEmail());
            policeOfficer.setPassword(PasswordUtil.encodePassword(request.getPassword()));
            policeOfficer.setRole(Role.POLICE_OFFICER);
            policeOfficer.setBadgeID(request.getBadgeID());
            policeOfficer.setAddress(request.getAddress());
            policeOfficer.setTelephone(request.getTelephone());
            policeOfficer.setPatrolLocations(request.getPatrolLocations());

            userRepository.save(policeOfficer);
            return "Police officer registered successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public ResponseEntity<?> authenticateUser(LoginRequest request) {
        if (isInvalidRequest(request)) {
            return ResponseUtil.badRequestResponse("Username and password are required");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            return generateLoginResponse(authentication);
        } catch (BadCredentialsException e) {
            return ResponseUtil.unauthorizedResponse("Invalid username or password");
        } catch (DisabledException e) {
            return ResponseUtil.forbiddenResponse("User account is disabled");
        } catch (LockedException e) {
            return ResponseUtil.forbiddenResponse("User account is locked");
        } catch (AuthenticationException e) {
            return ResponseUtil.unauthorizedResponse("Authentication failed");
        }
    }

    public ResponseEntity<?> refreshAccessToken(Map<String, String> requestBody) {
        try {
            String refreshToken = requestBody.get("refreshToken");

            if (!jwtTokenProvider.validateRefreshToken(refreshToken)) {
                logger.debug("Refresh token validation failed: '{}'", refreshToken);
                return ResponseUtil.unauthorizedResponse("Invalid or expired refresh token");
            }

            String username = jwtTokenProvider.extractUsername(refreshToken, true);
            if (username == null || username.isEmpty()) {
                logger.warn("No username found in refresh token: '{}'", refreshToken);
                return ResponseUtil.unauthorizedResponse("No username found in refresh token");
            }

            String role = userRepository.getRoleByUsername(username);
            String newAccessToken = jwtTokenProvider.generateAccessToken(username, role);
            Date expiryDate = jwtTokenProvider.extractExpiration(newAccessToken, false);

            LoginResponse response = LoginResponse.builder()
                    .username(username)
                    .token(newAccessToken)
                    .refreshToken(refreshToken)
                    .role(role)
                    .expiresIn(expiryDate)
                    .timestamp(Instant.now())
                    .build();

            logger.debug("Successfully refreshed token for user: {}", username);
            return ResponseEntity.ok(response);

        } catch (JwtTokenProvider.JwtAuthenticationException e) {
            logger.debug("JWT parsing failed: {}", e.getMessage());
            return ResponseUtil.unauthorizedResponse("Invalid or expired refresh token: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during token refresh: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to refresh token: " + e.getMessage()));
        }
    }

    private boolean isInvalidRequest(LoginRequest request) {
        return request.getUsername() == null || request.getUsername().isEmpty() ||
                request.getPassword() == null || request.getPassword().isEmpty();
    }

    private ResponseEntity<?> generateLoginResponse(Authentication authentication) {
        String username = authentication.getName();
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("USER");

        String token = jwtTokenProvider.generateAccessToken(username, role);
        String refreshToken = jwtTokenProvider.generateRefreshToken(username, role);
        Date expiryDate = jwtTokenProvider.extractExpiration(token, false);

        LoginResponse response = LoginResponse.builder()
                .username(username)
                .token(token)
                .refreshToken(refreshToken)
                .role(role)
                .expiresIn(expiryDate)
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.ok(response);
    }
}