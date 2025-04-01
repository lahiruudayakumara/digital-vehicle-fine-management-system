package com.example.digital_fine_management_system.service.policeOfficer;

import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerUpdateDTO;
import java.util.List;

public interface PoliceOfficerService {
    List<PoliceOfficerResponseDTO> getAllPoliceOfficers();

    PoliceOfficerResponseDTO updatePoliceOfficer(String badgeID, PoliceOfficerUpdateDTO updateDTO); // Use String

    void replacePoliceOfficer(String badgeID, PoliceOfficerUpdateDTO updateDTO);

    void deletePoliceOfficer(String badgeID);

    PoliceOfficerResponseDTO getPoliceOfficerById(String badgeID);
}

