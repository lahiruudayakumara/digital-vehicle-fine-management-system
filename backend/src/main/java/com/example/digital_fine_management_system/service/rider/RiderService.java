package com.example.digital_fine_management_system.service.rider;

import com.example.digital_fine_management_system.dto.rider.RiderResponseDTO;
import com.example.digital_fine_management_system.dto.rider.RiderUpdateDTO;
import java.util.List;

public interface RiderService {
    List<RiderResponseDTO> getAllRiders();

    RiderResponseDTO getRiderById(String riderId);

    RiderResponseDTO updateRider(String riderId, RiderUpdateDTO updateDTO);

    void replaceRider(String riderId, RiderUpdateDTO updateDTO);

    void deleteRider(String riderId);
}