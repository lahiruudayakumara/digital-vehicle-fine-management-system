package com.example.digital_fine_management_system.controllers.auth;

import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
//import com.example.digital_fine_management_system.service.policeOfficer.PoliceOfficerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/policeOfficers")
@RequiredArgsConstructor
public class PoliceOfficerController {

//    private final PoliceOfficerService policeOfficerService;
//
//    @PostMapping
//    public ResponseEntity<PoliceOfficerResponseDTO> createPoliceOfficer(@RequestBody PoliceOfficerRequestDTO requestDTO) {
//        return ResponseEntity.ok(policeOfficerService.createPoliceOfficer(requestDTO));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<PoliceOfficerResponseDTO>> getAllPoliceOfficers() {
//        return ResponseEntity.ok(policeOfficerService.getAllPoliceOfficers());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<PoliceOfficerResponseDTO> getPoliceOfficerById(@PathVariable Long id) {
//        return ResponseEntity.ok(policeOfficerService.getPoliceOfficerById(id));
//    }
//
//    @GetMapping("/policeId/{policeId}")
//    public ResponseEntity<PoliceOfficerResponseDTO> getPoliceOfficerByPoliceId(@PathVariable String policeId) {
//        return ResponseEntity.ok(policeOfficerService.getPoliceOfficerByPoliceId(policeId));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<PoliceOfficerResponseDTO> updatePoliceOfficer(@PathVariable Long id,
//                                                                        @RequestBody PoliceOfficerRequestDTO requestDTO) {
//        return ResponseEntity.ok(policeOfficerService.updatePoliceOfficer(id, requestDTO));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deletePoliceOfficer(@PathVariable Long id) {
//        policeOfficerService.deletePoliceOfficer(id);
//        return ResponseEntity.noContent().build();
    }
//}
