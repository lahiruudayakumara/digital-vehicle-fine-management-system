package com.example.digital_fine_management_system.service.auth;


import com.example.digital_fine_management_system.dto.auth.LoginRequest;
import com.example.digital_fine_management_system.dto.auth.RegisterRequest;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;

public interface AuthService {
    String registerUser(RegisterRequest request);
    Object loginUser(LoginRequest request);
    String registerPoliceOfficer(PoliceOfficerRequestDTO request);
}