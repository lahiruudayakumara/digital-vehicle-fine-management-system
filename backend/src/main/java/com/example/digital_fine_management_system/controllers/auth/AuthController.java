package com.example.digital_fine_management_system.controllers.auth;


import com.example.digital_fine_management_system.dto.auth.LoginRequest;
import com.example.digital_fine_management_system.dto.auth.LoginResponse;
import com.example.digital_fine_management_system.dto.auth.RegisterRequest;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;
import com.example.digital_fine_management_system.service.auth.AuthService;
import com.example.digital_fine_management_system.util.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Collections;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping
    public ResponseEntity<LoginResponse> login() {
        return ResponseEntity.ok(
                new LoginResponse()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        String response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register-police-officer")
    public ResponseEntity<String> registerPoliceOfficer(@RequestBody PoliceOfficerRequestDTO request) {
        String response = authService.registerPoliceOfficer(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authorizationHeader) {
        try {

            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("error", "Authorization header must be in the format 'Bearer <token>'"));
            }

            // Extract the refresh token from the Authorization header
            String refreshToken = authorizationHeader.substring(7); // Removing 'Bearer ' part (7 characters)
            System.out.println(refreshToken);

            // Validate the refresh token
            if (!jwtTokenProvider.validateToken(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("error", "Invalid or expired refresh token"));
            }

            String username = jwtTokenProvider.getUsernameFromJWT(refreshToken);

            String newAccessToken = jwtTokenProvider.generateToken(username);
            long expiresIn = jwtTokenProvider.getExpirationTime();

            LoginResponse response = LoginResponse.builder()
                    .username(username)
                    .token(newAccessToken)
                    .refreshToken(refreshToken)
                    .expiresIn(expiresIn)
                    .timestamp(Instant.now())
                    .build();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to refresh token"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            String username = authentication.getName();
            String token = jwtTokenProvider.generateToken(username);
            long expiresIn = jwtTokenProvider.getExpirationTime();
            String refreshToken = jwtTokenProvider.generateRefreshToken(username);

            LoginResponse response = LoginResponse.builder()
                    .username(username)
                    .token(token)
                    .refreshToken(refreshToken)
                    .role(authentication.getAuthorities().iterator().next().getAuthority())
                    .expiresIn(expiresIn)
                    .timestamp(Instant.now())
                    .build();

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Invalid username or password"));
        }
    }
}