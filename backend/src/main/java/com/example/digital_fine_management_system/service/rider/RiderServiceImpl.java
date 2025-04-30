package com.example.digital_fine_management_system.service.rider;

import com.example.digital_fine_management_system.dto.rider.RiderResponseDTO;
import com.example.digital_fine_management_system.dto.rider.RiderUpdateDTO;
import com.example.digital_fine_management_system.model.user.Rider;
import com.example.digital_fine_management_system.repository.user.RiderRepository;
import com.example.digital_fine_management_system.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RiderServiceImpl implements RiderService {

    private final RiderRepository riderRepository;
    private final UserRepository userRepository;

    @Autowired
    public RiderServiceImpl(RiderRepository riderRepository, UserRepository userRepository) {
        this.riderRepository = riderRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<RiderResponseDTO> getAllRiders() {
        return riderRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RiderResponseDTO getRiderById(String riderId) {
        Rider rider = riderRepository.findById(riderId)
                .orElseThrow(() -> new RuntimeException("Rider not found with ID: " + riderId));
        return convertToDTO(rider);
    }

    @Override
    public RiderResponseDTO updateRider(String riderId, RiderUpdateDTO updateDTO) {
        Rider rider = riderRepository.findById(riderId)
                .orElseThrow(() -> new RuntimeException("Rider not found with ID: " + riderId));

        // Update fields only if they are not null (supports PATCH)
        Optional.ofNullable(updateDTO.getName()).ifPresent(rider::setName);
        Optional.ofNullable(updateDTO.getEmail()).ifPresent(rider::setEmail);
        Optional.ofNullable(updateDTO.getPhone()).ifPresent(rider::setPhone);
        Optional.ofNullable(updateDTO.getLicenseNumber()).ifPresent(rider::setLicenseNumber);
        Optional.ofNullable(updateDTO.getLicenseType()).ifPresent(rider::setLicenseType);
        Optional.ofNullable(updateDTO.getExpiryDate()).ifPresent(rider::setExpiryDate);
        Optional.ofNullable(updateDTO.getAvatarUrl()).ifPresent(rider::setAvatarUrl);
        Optional.ofNullable(updateDTO.getActive()).ifPresent(rider::setActive);

        riderRepository.save(rider);
        return convertToDTO(rider);
    }

    @Override
    public void replaceRider(String riderId, RiderUpdateDTO updateDTO) {
        Rider existingRider = riderRepository.findById(riderId)
                .orElseThrow(() -> new RuntimeException("Rider not found with ID: " + riderId));
        
        // Preserve the values that should remain unchanged during replacement
        LocalDateTime joinedDate = existingRider.getJoinedDate();
        String password = existingRider.getPassword();
        int vehicleCount = existingRider.getVehicleCount();
        
        // Create a new rider object with updated values
        Rider rider = new Rider();
        rider.setId(riderId);
        rider.setName(updateDTO.getName());
        rider.setEmail(updateDTO.getEmail());
        rider.setPhone(updateDTO.getPhone());
        rider.setLicenseNumber(updateDTO.getLicenseNumber());
        rider.setLicenseType(updateDTO.getLicenseType());
        rider.setExpiryDate(updateDTO.getExpiryDate());
        rider.setAvatarUrl(updateDTO.getAvatarUrl());
        rider.setActive(updateDTO.getActive() != null ? updateDTO.getActive() : existingRider.isActive());
        
        // Restore preserved values
        rider.setJoinedDate(joinedDate);
        rider.setPassword(password);
        rider.setVehicleCount(vehicleCount);

        riderRepository.save(rider);
    }

    @Override
    public void deleteRider(String riderId) {
        Rider rider = riderRepository.findById(riderId)
                .orElseThrow(() -> new RuntimeException("Rider not found with ID: " + riderId));

        // Ensure user record is deleted to maintain data integrity
        userRepository.deleteById(Long.parseLong(rider.getId()));
        riderRepository.delete(rider);
    }

    private RiderResponseDTO convertToDTO(Rider rider) {
        return new RiderResponseDTO(
                rider.getId(),
                rider.getName(),
                rider.getEmail(),
                rider.getPhone(),
                rider.getLicenseNumber(),
                rider.getLicenseType(),
                rider.getExpiryDate(),
                rider.getAvatarUrl(),
                rider.getVehicleCount(),
                rider.getJoinedDate(),
                rider.isActive()
        );
    }
}