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
    
    @Autowired
    private RiderRepository riderRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Transactional(readOnly = true)
    public List<Rider> findAllRiders() {
        return riderRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<Rider> findRiderById(Long id) {
        return riderRepository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public Optional<Rider> findRiderByLicenseId(String licenseId) {
        return riderRepository.findByLicenseId(licenseId);
    }
    
    @Transactional(readOnly = true)
    public Optional<Rider> findRiderByUsername(String username) {
        return riderRepository.findByUsername(username);
    }
    
    @Transactional
    public Rider saveRider(Rider rider) {
        // Set role to RIDER if not already set
        if (rider.getRole() == null) {
            rider.setRole(Role.RIDER);
        }
        
        // Encode password if it's a new rider (id is null)
        if (rider.getId() == null && rider.getPassword() != null) {
            rider.setPassword(passwordEncoder.encode(rider.getPassword()));
        }
        
        return riderRepository.save(rider);
    }
    
    @Transactional
    public void deleteRider(Long id) {
        riderRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return riderRepository.existsByUsername(username);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return riderRepository.existsByEmail(email);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByLicenseId(String licenseId) {
        return riderRepository.existsByLicenseId(licenseId);
    }
}