package com.example.digital_fine_management_system.service.fine;

import com.example.digital_fine_management_system.dto.fine.FineRequestDTO;
import com.example.digital_fine_management_system.dto.fine.FineResponseDTO;

import java.util.List;

public interface FineService {

    FineResponseDTO createFine(FineRequestDTO fineRequestDTO);

    List<FineResponseDTO> getAllFines();

    void deleteFine(Long fineId);

    FineResponseDTO updateFine(Long fineId, FineRequestDTO fineRequestDTO); // Add this method
}