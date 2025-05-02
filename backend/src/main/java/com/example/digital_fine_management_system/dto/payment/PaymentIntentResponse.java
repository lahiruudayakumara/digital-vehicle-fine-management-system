package com.example.digital_fine_management_system.dto.payment;

public class PaymentIntentResponse {
    private String clientSecret;

    public PaymentIntentResponse(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}