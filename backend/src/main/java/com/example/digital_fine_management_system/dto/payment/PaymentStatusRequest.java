package com.example.digital_fine_management_system.dto.payment;

public class PaymentStatusRequest {
    private String status;  // Status of the payment (e.g., "successful", "failed")

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
