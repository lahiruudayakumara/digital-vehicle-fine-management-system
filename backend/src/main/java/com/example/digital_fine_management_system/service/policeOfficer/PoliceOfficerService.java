//package com.example.digital_fine_management_system.service.policeOfficer;
//
//import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;
//import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
//import com.example.digital_fine_management_system.model.user.PoliceOfficer;
//import com.example.digital_fine_management_system.repository.user.PoliceOfficerRepository;
//import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class PoliceOfficerService {
//
//    private final PoliceOfficerRepository policeOfficerRepository;
//    private final BCryptPasswordEncoder passwordEncoder;
//
//    // Create a new police officer
//    public PoliceOfficerResponseDTO createPoliceOfficer(PoliceOfficerRequestDTO dto) {
//        if (policeOfficerRepository.existsByPoliceId(dto.getPoliceId())) {
//            throw new IllegalArgumentException("Police ID already exists.");
//        }
//        PoliceOfficer officer = policeOfficerRepository.save(
//                PoliceOfficer.builder()
//                        .policeId(dto.getPoliceId())
//                        .name(dto.getName())
//                        .address(dto.getAddress())
//                        .telephoneNumber(dto.getTelephoneNumber())
//                        .patrolLocations(dto.getPatrolLocations())
//                        .password(passwordEncoder.encode(dto.getPassword()))
//                        .build()
//        );
//        return new PoliceOfficerResponseDTO(officer);
//    }
//
//    // Retrieve all police officers
//    public List<PoliceOfficerResponseDTO> getAllPoliceOfficers() {
//        return policeOfficerRepository.findAll().stream()
//                .map(PoliceOfficerResponseDTO::new)
//                .collect(Collectors.toList());
//    }
//
//    // Retrieve a police officer by Police ID
//    public PoliceOfficerResponseDTO getPoliceOfficerByPoliceId(String policeId) {
//        PoliceOfficer officer = policeOfficerRepository.findByPoliceId(policeId)
//                .orElseThrow(() -> new EntityNotFoundException("Police Officer not found with Police ID: " + policeId));
//        return new PoliceOfficerResponseDTO(officer);
//    }
//
//    // Retrieve a police officer by database ID
//    public PoliceOfficerResponseDTO getPoliceOfficerById(Long id) {
//        PoliceOfficer officer = policeOfficerRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Police Officer not found with ID: " + id));
//        return new PoliceOfficerResponseDTO(officer);
//    }
//
//    // Update a police officer's details
//    public PoliceOfficerResponseDTO updatePoliceOfficer(Long id, PoliceOfficerRequestDTO requestDTO) {
//        PoliceOfficer officer = policeOfficerRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Police Officer not found with ID: " + id));
//
//        officer.setName(requestDTO.getName());
//        officer.setAddress(requestDTO.getAddress());
//        officer.setTelephoneNumber(requestDTO.getTelephoneNumber());
//        officer.setPatrolLocations(requestDTO.getPatrolLocations());
//
//        if (requestDTO.getPassword() != null && !requestDTO.getPassword().isEmpty()) {
//            officer.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
//        }
//
//        PoliceOfficer updatedOfficer = policeOfficerRepository.save(officer);
//        return new PoliceOfficerResponseDTO(updatedOfficer);
//    }
//
//    // Delete a police officer
//    public void deletePoliceOfficer(Long id) {
//        if (!policeOfficerRepository.existsById(id)) {
//            throw new EntityNotFoundException("Police Officer not found with ID: " + id);
//        }
//        policeOfficerRepository.deleteById(id);
//    }
//}
