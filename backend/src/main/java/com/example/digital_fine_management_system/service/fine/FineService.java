package com.example.digital_fine_management_system.service.fine;

import com.example.digital_fine_management_system.dto.fine.FineRequestDTO;
import com.example.digital_fine_management_system.dto.fine.FineResponseDTO;

import java.util.List;

public interface FineService {
    FineResponseDTO createFine(FineRequestDTO fineRequestDTO);

    List<FineResponseDTO> getAllFines();  // New method to get all fines

    void deleteFine(Long fineId);  // New method to delete a fine by its fineId
}