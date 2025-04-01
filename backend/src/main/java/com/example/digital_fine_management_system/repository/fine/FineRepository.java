package com.example.digital_fine_management_system.repository.fine;

import com.example.digital_fine_management_system.model.fine.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FineRepository extends JpaRepository<Fine, Long> {
    // Only keeping basic repository functionality for creating fines
}