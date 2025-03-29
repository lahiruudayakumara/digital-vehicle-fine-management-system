package com.example.digital_fine_management_system.service.fine;

import com.example.digital_fine_management_system.dto.fine.FineRequestDTO;
import com.example.digital_fine_management_system.dto.fine.FineResponseDTO;
import com.example.digital_fine_management_system.model.fine.Fine;
import com.example.digital_fine_management_system.repository.fine.FineRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FineServiceImpl implements FineService {

    private final FineRepository fineRepository;

    @Transactional
    @Override
    public FineResponseDTO createFine(FineRequestDTO fineRequestDTO) {
        Fine fine = new Fine();
        BeanUtils.copyProperties(fineRequestDTO, fine);

        // Set default fine status
        fine.setStatus(Fine.FineStatus.PENDING);

        // Save fine and return response
        return convertToResponseDTO(fineRepository.save(fine));
    }

    @Override
    public List<FineResponseDTO> getAllFines() {
        // Fetch all fines from the repository
        List<Fine> fines = fineRepository.findAll();

        // Convert each Fine entity to FineResponseDTO
        return fines.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFine(Long fineId) {
        // Delete the fine by its fineId
        fineRepository.deleteById(fineId);
    }

    // Helper method to convert Fine entity to FineResponseDTO
    private FineResponseDTO convertToResponseDTO(Fine fine) {
        FineResponseDTO responseDTO = new FineResponseDTO();
        BeanUtils.copyProperties(fine, responseDTO);
        return responseDTO;
    }
}