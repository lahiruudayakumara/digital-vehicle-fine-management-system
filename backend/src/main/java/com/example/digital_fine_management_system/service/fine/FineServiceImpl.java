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
import java.util.Optional;
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
        if (fine.getStatus() == null) {
            fine.setStatus(Fine.FineStatus.PENDING);
        }
        Fine savedFine = fineRepository.save(fine);
        return convertToResponseDTO(savedFine);
    }

    @Override
    public List<FineResponseDTO> getAllFines() {
        List<Fine> fines = fineRepository.findAll();
        return fines.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFine(Long fineId) {
        fineRepository.deleteById(fineId);
    }

    @Override
    @Transactional
    public FineResponseDTO updateFine(Long fineId, FineRequestDTO fineRequestDTO) {
        Optional<Fine> existingFine = fineRepository.findById(fineId);
        if (existingFine.isPresent()) {
            Fine fine = existingFine.get();
            BeanUtils.copyProperties(fineRequestDTO, fine);
            fine.setFineID(fineId); // Ensure the ID remains the same
            Fine updatedFine = fineRepository.save(fine);
            return convertToResponseDTO(updatedFine);
        } else {
            throw new RuntimeException("Fine not found with id: " + fineId); // Handle appropriately
        }
    }

    private FineResponseDTO convertToResponseDTO(Fine fine) {
        FineResponseDTO responseDTO = new FineResponseDTO();
        BeanUtils.copyProperties(fine, responseDTO);

        // Explicitly set the ID field to handle the case difference
        responseDTO.setFineId(fine.getFineID());

        responseDTO.setStatus(fine.getStatus() != null ? fine.getStatus().name() : null);
        return responseDTO;
    }
}