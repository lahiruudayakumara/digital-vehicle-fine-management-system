package com.example.digital_fine_management_system.controllers.auth;

import com.example.digital_fine_management_system.dto.rider.RiderResponseDTO;
import com.example.digital_fine_management_system.dto.rider.RiderUpdateDTO;
import com.example.digital_fine_management_system.service.rider.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/riders")
public class RiderController {

    private final RiderService riderService;

    @Autowired
    public RiderController(RiderService riderService) {
        this.riderService = riderService;
    }

    @GetMapping
    public List<RiderResponseDTO> getAllRiders() {
        return riderService.getAllRiders();
    }

    // Endpoint to fetch a single rider by their ID
    @GetMapping("/{riderId}")
    public RiderResponseDTO getRiderById(@PathVariable String riderId) {
        return riderService.getRiderById(riderId);
    }

    @PatchMapping("/{riderId}")
    public RiderResponseDTO updateRider(
            @PathVariable String riderId,
            @RequestBody RiderUpdateDTO updateDTO) {
        return riderService.updateRider(riderId, updateDTO);
    }

    @PutMapping("/{riderId}")
    public ResponseEntity<String> replaceRider(
            @PathVariable String riderId,
            @RequestBody RiderUpdateDTO updateDTO) {
        riderService.replaceRider(riderId, updateDTO);
        return ResponseEntity.ok("Rider record replaced successfully");
    }

    @DeleteMapping("/{riderId}")
    public ResponseEntity<String> deleteRider(@PathVariable String riderId) {
        riderService.deleteRider(riderId);
        return ResponseEntity.ok("Rider and associated User with ID " + riderId + " have been deleted.");
    }
}