package com.example.digital_fine_management_system.repository.user;

import com.example.digital_fine_management_system.model.user.Rider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider, Long> {
    Optional<Rider> findByLicenseId(String licenseId);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByLicenseId(String licenseId);

    Optional<Rider> findByUsername(String username);
}
