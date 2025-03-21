package com.example.digital_fine_management_system.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "police_officers")
@PrimaryKeyJoinColumn(name = "user_id")
public class PoliceOfficer extends User {

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id", referencedColumnName = "id") // Ensuring User ID is used
    private User user;


    @Column(unique = true, nullable = false)
    @NotBlank(message = "Badge ID cannot be blank")
    private String badgeID;

    @Column(nullable = false)
    @NotBlank(message = "Address cannot be blank")
    private String address;

    @Column(nullable = false)
    @NotBlank(message = "Telephone cannot be blank")
    private String telephone;

    @Column(nullable = false)
    @NotBlank(message = "Patrol locations cannot be blank")
    private String patrolLocations; // Storing as a comma-separated string
}
