package com.example.digital_fine_management_system.model.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Rider extends User {
    @NotNull(message = "License id cannot be null")
    @Size(min = 1, max = 20, message = "License id must be between 1 and 20 characters")
    @Column(name = "license_id", unique = true, nullable = false)
    private String licenseId;
}
