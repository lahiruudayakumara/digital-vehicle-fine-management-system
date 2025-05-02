package com.example.digital_fine_management_system.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardDetails {
    private String cardNumber;
    private int expMonth;
    private int expYear;
    private String cvc;

    // Getters and Setters
}
