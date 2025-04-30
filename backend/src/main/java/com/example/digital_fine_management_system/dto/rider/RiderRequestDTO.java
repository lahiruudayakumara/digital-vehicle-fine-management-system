package com.example.digital_fine_management_system.dto.rider;

import java.time.LocalDate;

public class RiderRequestDTO {
    private String name;
    private String email;
    private String phone;
    private String licenseNumber;
    private String licenseType;
    private LocalDate expiryDate;
    private String password;
    
    // Default constructor
    public RiderRequestDTO() {
    }
    
    // Constructor with all fields
    public RiderRequestDTO(String name, String email, String phone, String licenseNumber, 
                          String licenseType, LocalDate expiryDate, String password) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.licenseNumber = licenseNumber;
        this.licenseType = licenseType;
        this.expiryDate = expiryDate;
        this.password = password;
    }
    
    // Getters and Setters
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
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}