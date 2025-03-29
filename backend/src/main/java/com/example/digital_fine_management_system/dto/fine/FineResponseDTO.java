package com.example.digital_fine_management_system.dto.fine;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FineResponseDTO {

    private Long fineId; // Unique identifier for the fine
    private String driverName;
    private String licenseNumber;
    private String vehicleNumber;
    private String location;
    private String category;
    private Double fineAmount;
    private Long policeOfficerId; // Officer who issued the fine
    private String status; // Fine status (PENDING, COMPLETED)
    private LocalDateTime createdAt; // Date and time when the fine was created
    private LocalDateTime updatedAt; // Date and time when the fine was last updated

    // Constructor to map the Fine model to this DTO
    public FineResponseDTO() {
        this.fineId = fineId;
        this.driverName = driverName;
        this.licenseNumber = licenseNumber;
        this.vehicleNumber = vehicleNumber;
        this.location = location;
        this.category = category;
        this.fineAmount = fineAmount;
        this.policeOfficerId = policeOfficerId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}