package com.example.digital_fine_management_system.dto.fine;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FineRequestDTO {



    @NotBlank(message = "Driver name is required")
    private String driverName;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Fine amount is required")
    private Double fineAmount;

    @NotNull(message = "Police officer ID is required")
    private Long policeOfficerId; // Ensuring officer ID is provided
}