package com.example.digital_fine_management_system.repository.user;

import com.example.digital_fine_management_system.model.user.Rider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RiderRepository extends JpaRepository<Rider, Long> {
    Optional<Rider> findByLicenseId(String licenseId);
}
