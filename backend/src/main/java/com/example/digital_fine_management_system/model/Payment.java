package com.example.digital_fine_management_system.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String fineId;
    private BigDecimal amount;
    private Timestamp paymentDate;
    private String method;
    private String status;
    private String slipUrl;
    private String stripePaymentId;
    private String paymentIntentClientSecret;
}
