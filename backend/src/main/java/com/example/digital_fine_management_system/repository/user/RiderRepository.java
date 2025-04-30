package com.example.digital_fine_management_system.repository.user;

import com.example.digital_fine_management_system.model.user.Rider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider, String> {
    
    Optional<Rider> findByEmail(String email);
    
    Optional<Rider> findByLicenseNumber(String licenseNumber);
    
    boolean existsByEmail(String email);
    
    boolean existsByLicenseNumber(String licenseNumber);
}