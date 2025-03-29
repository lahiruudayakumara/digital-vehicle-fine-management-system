package com.example.digital_fine_management_system.controllers.fine;

import com.example.digital_fine_management_system.dto.fine.FineRequestDTO;
import com.example.digital_fine_management_system.dto.fine.FineResponseDTO;
import com.example.digital_fine_management_system.service.fine.FineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fines")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FineController {

    private final FineService fineService;

    @PostMapping
    public ResponseEntity<FineResponseDTO> createFine(@Valid @RequestBody FineRequestDTO fineRequestDTO) {
        FineResponseDTO fineResponse = fineService.createFine(fineRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(fineResponse);
    }

    @GetMapping
    public ResponseEntity<List<FineResponseDTO>> getAllFines() {
        List<FineResponseDTO> fines = fineService.getAllFines();
        return ResponseEntity.ok(fines);
    }

    @DeleteMapping("/{fineId}")
    public ResponseEntity<Void> deleteFine(@PathVariable Long fineId) {
        fineService.deleteFine(fineId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // Add the updateFine endpoint
    @PutMapping("/{fineId}")
    public ResponseEntity<FineResponseDTO> updateFine(
            @PathVariable Long fineId,
            @Valid @RequestBody FineRequestDTO fineRequestDTO) {
        FineResponseDTO fineResponse = fineService.updateFine(fineId, fineRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(fineResponse);
    }
}