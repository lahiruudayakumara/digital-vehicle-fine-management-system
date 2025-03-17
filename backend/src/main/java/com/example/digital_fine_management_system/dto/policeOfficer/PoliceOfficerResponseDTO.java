package com.example.digital_fine_management_system.dto.policeOfficer;

import com.example.digital_fine_management_system.model.user.PoliceOfficer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PoliceOfficerResponseDTO {
    private Long id;
    private String policeId;
    private String name;
    private String address;
    private String telephoneNumber;
    private List<String> patrolLocations;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor that takes PoliceOfficer entity
    public PoliceOfficerResponseDTO(PoliceOfficer officer) {
        this.id = officer.getId();
        this.policeId = officer.getPoliceId();
//        this.name = officer.getName();
//        this.address = officer.getAddress();
//        this.telephoneNumber = officer.getTelephoneNumber();
//        this.patrolLocations = officer.getPatrolLocations();
        this.createdAt = officer.getCreatedAt();
        this.updatedAt = officer.getUpdatedAt();
    }
}
