package com.example.digital_fine_management_system.controllers.auth;

import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerResponseDTO;
import com.example.digital_fine_management_system.service.policeOfficer.PoliceOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
