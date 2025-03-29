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
@CrossOrigin(origins = "*") // Allows cross-origin requests (adjust as needed)
public class FineController {

    private final FineService fineService;

    @PostMapping
    public ResponseEntity<FineResponseDTO> createFine(@Valid @RequestBody FineRequestDTO fineRequestDTO) {
        FineResponseDTO fineResponse = fineService.createFine(fineRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(fineResponse);
    }

    // New endpoint to get all fines
    @GetMapping
    public ResponseEntity<List<FineResponseDTO>> getAllFines() {
        List<FineResponseDTO> fines = fineService.getAllFines();
        return ResponseEntity.ok(fines);
    }

    // New endpoint to delete a fine by its fineId
    @DeleteMapping("/{fineId}")
    public ResponseEntity<Void> deleteFine(@PathVariable Long fineId) {
        fineService.deleteFine(fineId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}