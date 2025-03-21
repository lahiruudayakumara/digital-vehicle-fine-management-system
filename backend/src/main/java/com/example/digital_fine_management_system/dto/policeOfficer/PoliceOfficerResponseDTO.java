package com.example.digital_fine_management_system.dto.policeOfficer;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class PoliceOfficerResponseDTO {
    private String badgeID;
    private String fullName;
    private String address;
    private String telephone;
    private List<String> patrolLocations;
}
