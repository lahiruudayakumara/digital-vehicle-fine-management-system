package com.example.digital_fine_management_system.controllers.auth;

import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerUpdateDTO;
import com.example.digital_fine_management_system.service.policeOfficer.PoliceOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/police-officers")
public class PoliceOfficerController {

    private final PoliceOfficerService policeOfficerService;

    @Autowired
    public PoliceOfficerController(PoliceOfficerService policeOfficerService) {
        this.policeOfficerService = policeOfficerService;
    }

    @GetMapping
    public List<PoliceOfficerResponseDTO> getAllPoliceOfficers() {
        return policeOfficerService.getAllPoliceOfficers();
    }

    // New endpoint to fetch a single officer by badgeID
    @GetMapping("/{badgeID}")
    public PoliceOfficerResponseDTO getPoliceOfficerById(@PathVariable String badgeID) {
        return policeOfficerService.getPoliceOfficerById(badgeID);
    }

    @PatchMapping("/{badgeID}")
    public PoliceOfficerResponseDTO updatePoliceOfficer(
            @PathVariable String badgeID,
            @RequestBody PoliceOfficerUpdateDTO updateDTO) {
        return policeOfficerService.updatePoliceOfficer(badgeID, updateDTO);
    }

    @PutMapping("/{badgeID}")
    public ResponseEntity<String> replacePoliceOfficer(
            @PathVariable String badgeID,
            @RequestBody PoliceOfficerUpdateDTO updateDTO) {
        policeOfficerService.replacePoliceOfficer(badgeID, updateDTO);
        return ResponseEntity.ok("Police officer record replaced successfully");
    }

    @DeleteMapping("/{badgeID}")
    public ResponseEntity<String> deletePoliceOfficer(@PathVariable String badgeID) {
        policeOfficerService.deletePoliceOfficer(badgeID);
        return ResponseEntity.ok("Police Officer and associated User with Badge ID " + badgeID + " have been deleted.");
    }
}