package com.example.digital_fine_management_system.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "police_officers")
@PrimaryKeyJoinColumn(name = "user_id")
public class PoliceOfficer extends User {

    @NotNull(message = "Badge number cannot be null")
    @Size(min = 1, max = 20, message = "Badge number must be between 1 and 20 characters")
    @Column(name = "police_id", unique = true, nullable = false)
    private String policeId;

    @Size(max = 100, message = "Station name cannot be longer than 100 characters")
    @Column(length = 100)
    private String station;

    @CreationTimestamp // Automatically set when created
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp // Automatically updated on change
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
