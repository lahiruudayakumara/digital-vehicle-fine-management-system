package com.example.digital_fine_management_system.dto.payment;

public class PaymentRequest {
    private int amount;  // Amount in cents (e.g., $10 = 1000)

    // Getters and Setters
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}