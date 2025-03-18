package com.example.digital_fine_management_system.service.policeOfficer;

import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerUpdateDTO;
import com.example.digital_fine_management_system.model.user.PoliceOfficer;
import com.example.digital_fine_management_system.repository.user.PoliceOfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PoliceOfficerServiceImpl implements PoliceOfficerService {

    private final PoliceOfficerRepository policeOfficerRepository;

    @Autowired
    public PoliceOfficerServiceImpl(PoliceOfficerRepository policeOfficerRepository) {
        this.policeOfficerRepository = policeOfficerRepository;
    }

    @Override
    public List<PoliceOfficerResponseDTO> getAllPoliceOfficers() {
        List<PoliceOfficer> officers = policeOfficerRepository.findAll();

        return officers.stream().map(officer -> PoliceOfficerResponseDTO.builder()
                .badgeID(officer.getBadgeID())
                .fullName(officer.getFullName())
                .address(officer.getAddress())
                .telephone(officer.getTelephone())
                .patrolLocations(Collections.singletonList(officer.getPatrolLocations()))
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    public PoliceOfficerResponseDTO updatePoliceOfficer(String badgeID, PoliceOfficerUpdateDTO updateDTO) {
        PoliceOfficer officer = policeOfficerRepository.findByBadgeID(badgeID)
                .orElseThrow(() -> new RuntimeException("Police officer not found"));

        officer.setFullName(updateDTO.getFullName());
        officer.setUsername(updateDTO.getUsername());
        officer.setEmail(updateDTO.getEmail());
        officer.setPassword(updateDTO.getPassword());
        officer.setAddress(updateDTO.getAddress());
        officer.setTelephone(updateDTO.getTelephoneNumber());
        officer.setPatrolLocations(String.join(", ", updateDTO.getPatrolLocations()));

        policeOfficerRepository.save(officer);

        return PoliceOfficerResponseDTO.builder()
                .badgeID(officer.getBadgeID())
                .fullName(officer.getFullName())
                .address(officer.getAddress())
                .telephone(officer.getTelephone())
                .patrolLocations(Collections.singletonList(officer.getPatrolLocations()))
                .build();
    }

    @Override
    public void replacePoliceOfficer(String badgeID, PoliceOfficerUpdateDTO updateDTO) {
        PoliceOfficer officer = policeOfficerRepository.findByBadgeID(badgeID)
                .orElseThrow(() -> new RuntimeException("Police officer not found"));

        officer.setFullName(updateDTO.getFullName());
        officer.setUsername(updateDTO.getUsername());
        officer.setEmail(updateDTO.getEmail());
        officer.setPassword(updateDTO.getPassword());
        officer.setAddress(updateDTO.getAddress());
        officer.setTelephone(updateDTO.getTelephoneNumber());
        officer.setPatrolLocations(String.join(", ", updateDTO.getPatrolLocations()));

        policeOfficerRepository.save(officer);
    }
}
