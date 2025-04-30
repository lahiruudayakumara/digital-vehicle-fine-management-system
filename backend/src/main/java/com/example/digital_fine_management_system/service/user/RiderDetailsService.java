package com.example.digital_fine_management_system.service.user;

import com.example.digital_fine_management_system.model.user.Rider;
import com.example.digital_fine_management_system.model.user.Role;
import com.example.digital_fine_management_system.repository.user.RiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RiderDetailsService {
    
    private final RiderRepository riderRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public RiderDetailsService(RiderRepository riderRepository, PasswordEncoder passwordEncoder) {
        this.riderRepository = riderRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Transactional(readOnly = true)
    public List<Rider> findAllRiders() {
        return riderRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<Rider> findRiderById(String id) {
        return riderRepository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public Optional<Rider> findRiderByLicenseNumber(String licenseNumber) {
        return riderRepository.findByLicenseNumber(licenseNumber);
    }
    
    @Transactional(readOnly = true)
    public Optional<Rider> findRiderByEmail(String email) {
        return riderRepository.findByEmail(email);
    }
    
    @Transactional
    public Rider saveRider(Rider rider) {
        // Set role to RIDER if not already set
        if (rider.getRole() == null) {
            rider.setRole(Role.RIDER);
        }
        
        // Encode password if it's provided and not already encoded
        if (rider.getPassword() != null && !rider.getPassword().startsWith("$2a$")) {
            rider.setPassword(passwordEncoder.encode(rider.getPassword()));
        }
        
        return riderRepository.save(rider);
    }
    
    @Transactional
    public void deleteRider(String id) {
        riderRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return riderRepository.existsByEmail(email);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByLicenseNumber(String licenseNumber) {
        return riderRepository.existsByLicenseNumber(licenseNumber);
    }
}