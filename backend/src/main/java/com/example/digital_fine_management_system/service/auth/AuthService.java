package com.example.digital_fine_management_system.service.auth;

import com.example.digital_fine_management_system.dto.auth.LoginRequest;
import com.example.digital_fine_management_system.dto.auth.RegisterRequest;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AuthService {
    String registerUser(RegisterRequest request);
    String registerPoliceOfficer(PoliceOfficerRequestDTO request);
    ResponseEntity<?> authenticateUser(LoginRequest request);
    ResponseEntity<?> refreshAccessToken(Map<String, String> requestBody);
}