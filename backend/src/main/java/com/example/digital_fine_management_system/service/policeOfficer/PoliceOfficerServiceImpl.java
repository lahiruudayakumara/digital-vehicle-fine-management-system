package com.example.digital_fine_management_system.service.policeOfficer;

import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerUpdateDTO;
import com.example.digital_fine_management_system.model.user.PoliceOfficer;
import com.example.digital_fine_management_system.repository.user.PoliceOfficerRepository;
import com.example.digital_fine_management_system.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PoliceOfficerServiceImpl implements PoliceOfficerService {

    private final PoliceOfficerRepository policeOfficerRepository;
    private final UserRepository userRepository;

    @Autowired
    public PoliceOfficerServiceImpl(PoliceOfficerRepository policeOfficerRepository, UserRepository userRepository) {
        this.policeOfficerRepository = policeOfficerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PoliceOfficerResponseDTO> getAllPoliceOfficers() {
        return policeOfficerRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public PoliceOfficerResponseDTO updatePoliceOfficer(String badgeID, PoliceOfficerUpdateDTO updateDTO) {
        PoliceOfficer officer = policeOfficerRepository.findByBadgeID(badgeID)
                .orElseThrow(() -> new RuntimeException("Police officer not found with Badge ID: " + badgeID));

        // Update fields (excluding Badge ID)
        officer.setFullName(updateDTO.getFullName());
        officer.setUsername(updateDTO.getUsername());
        officer.setEmail(updateDTO.getEmail());
        officer.setPassword(updateDTO.getPassword());
        officer.setAddress(updateDTO.getAddress());
        officer.setTelephone(updateDTO.getTelephoneNumber());
        officer.setPatrolLocations(String.join(", ", updateDTO.getPatrolLocations()));

        policeOfficerRepository.save(officer);
        return convertToDTO(officer);
    }

    @Override
    public void replacePoliceOfficer(String badgeID, PoliceOfficerUpdateDTO updateDTO) {
        updatePoliceOfficer(badgeID, updateDTO); // Calls update method (same logic)
    }

    @Override
    public void deletePoliceOfficer(String badgeID) {
        PoliceOfficer officer = policeOfficerRepository.findByBadgeID(badgeID)
                .orElseThrow(() -> new RuntimeException("Police Officer not found with Badge ID: " + badgeID));

        // Delete User record first (to maintain data integrity)
        userRepository.deleteById(officer.getId());
        policeOfficerRepository.delete(officer);
    }

    private PoliceOfficerResponseDTO convertToDTO(PoliceOfficer officer) {
        return PoliceOfficerResponseDTO.builder()
                .badgeID(officer.getBadgeID())
                .fullName(officer.getFullName())
                .address(officer.getAddress())
                .telephone(officer.getTelephone())
                .patrolLocations(List.of(officer.getPatrolLocations().split(", ")))
                .build();
    }
}
