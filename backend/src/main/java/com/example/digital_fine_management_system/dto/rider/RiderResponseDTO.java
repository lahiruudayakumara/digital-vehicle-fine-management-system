package com.example.digital_fine_management_system.dto.rider;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RiderResponseDTO {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String licenseNumber;
    private String licenseType;
    private LocalDate expiryDate;
    private String avatarUrl;
    private int vehicleCount;
    private LocalDateTime joinedDate;
    private boolean active;
    
    // Default constructor
    public RiderResponseDTO() {
    }
    
    // Constructor with all fields
    public RiderResponseDTO(String id, String name, String email, String phone, 
                           String licenseNumber, String licenseType, LocalDate expiryDate, 
                           String avatarUrl, int vehicleCount, LocalDateTime joinedDate, boolean active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.licenseNumber = licenseNumber;
        this.licenseType = licenseType;
        this.expiryDate = expiryDate;
        this.avatarUrl = avatarUrl;
        this.vehicleCount = vehicleCount;
        this.joinedDate = joinedDate;
        this.active = active;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getLicenseNumber() {
        return licenseNumber;
    }
    
    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }
    
    public String getLicenseType() {
        return licenseType;
    }
    
    public void setLicenseType(String licenseType) {
        this.licenseType = licenseType;
    }
    
    public LocalDate getExpiryDate() {
        return expiryDate;
    }
    
    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public String getAvatarUrl() {
        return avatarUrl;
    }
    
    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
    
    public int getVehicleCount() {
        return vehicleCount;
    }
    
    public void setVehicleCount(int vehicleCount) {
        this.vehicleCount = vehicleCount;
    }
    
    public LocalDateTime getJoinedDate() {
        return joinedDate;
    }
    
    public void setJoinedDate(LocalDateTime joinedDate) {
        this.joinedDate = joinedDate;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
}