package com.example.digital_fine_management_system.repository.user;

import com.example.digital_fine_management_system.model.user.PoliceOfficer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PoliceOfficerRepository extends JpaRepository<PoliceOfficer, Long> {
    Optional<PoliceOfficer> findByBadgeID(String badgeID); // Use badgeID instead of policeId
}
