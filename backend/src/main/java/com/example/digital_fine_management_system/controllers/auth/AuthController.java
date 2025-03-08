package com.example.digital_fine_management_system.controllers.auth;


import com.example.digital_fine_management_system.dto.auth.LoginRequest;
import com.example.digital_fine_management_system.dto.auth.LoginResponse;
import com.example.digital_fine_management_system.dto.auth.RegisterRequest;
import com.example.digital_fine_management_system.service.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<LoginResponse> login() {
        return ResponseEntity.ok(
                new LoginResponse()
        );
    }

    // Endpoint for User Registration
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        String response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    // Endpoint for User Login
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {
//        LoginResponse response = (LoginResponse) authService.loginUser(request);
//        return ResponseEntity.ok(response);
//    }
}