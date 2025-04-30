package com.example.digital_fine_management_system.model.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "riders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rider {
    
    @Id
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column
    private String phone;
    
    @Column(name = "license_number")
    private String licenseNumber;
    
    @Column(name = "license_type")
    private String licenseType;
    
    @Column(name = "expiry_date")
    private LocalDate expiryDate;
    
    @Column
    private String password;
    
    @Column(name = "avatar_url")
    private String avatarUrl;
    
    @Column(name = "vehicle_count")
    private int vehicleCount;
    
    @Column(name = "joined_date")
    private LocalDateTime joinedDate;
    
    @Column
    private boolean active = true;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    // Helper methods for entity management
    
    public void incrementVehicleCount() {
        this.vehicleCount++;
    }
    
    public void decrementVehicleCount() {
        if (this.vehicleCount > 0) {
            this.vehicleCount--;
        }
    }
}