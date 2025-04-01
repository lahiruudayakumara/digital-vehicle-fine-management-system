package com.example.digital_fine_management_system.model.fine;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "fines")
public class Fine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("fineid")
    private Long fineID;

    @Column(nullable = false)
    @JsonProperty("driver_name")
    private String driverName;

    @Column(nullable = false, unique = true)
    @JsonProperty("license_number")
    private String licenseNumber;

    @Column(nullable = false)
    @JsonProperty("vehicle_number")
    private String vehicleNumber;

    @Column(nullable = false)
    @JsonProperty("location")
    private String location;

    @Column(nullable = false)
    @JsonProperty("category")
    private String category;

    @Column(nullable = false)
    @JsonProperty("fine_amount")
    private Double fineAmount;

    @Enumerated(EnumType.STRING)
    private FineStatus status = FineStatus.PENDING; // Default status

    @Column(nullable = false)
    @JsonProperty("police_officer_id")
    private Long policeOfficerId; // Manually provided officer ID

    public enum FineStatus {
        PENDING,
        COMPLETED
    }

    @CreationTimestamp // Auto-generated on create
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp // Auto-updated on update
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}