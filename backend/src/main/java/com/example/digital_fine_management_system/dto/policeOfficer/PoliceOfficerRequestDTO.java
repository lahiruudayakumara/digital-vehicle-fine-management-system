package com.example.digital_fine_management_system.dto.policeOfficer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class PoliceOfficerRequestDTO {

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    private String fullName;

    @NotBlank
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Police ID is required")
    @Size(min = 1, max = 20, message = "Police ID must be between 1 and 20 characters")
    private String policeId;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Telephone number is required")
    private String telephoneNumber;

    @NotNull(message = "Patrol locations cannot be null")
    private List<String> patrolLocations;

}
