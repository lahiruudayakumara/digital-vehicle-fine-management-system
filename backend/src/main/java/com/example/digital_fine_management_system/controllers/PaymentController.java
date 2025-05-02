package com.example.digital_fine_management_system.controllers;


import com.example.digital_fine_management_system.dto.DataResponse;
import com.example.digital_fine_management_system.dto.payment.PaymentIntentResponse;
import com.example.digital_fine_management_system.dto.payment.PaymentRequest;
import com.example.digital_fine_management_system.dto.payment.PaymentStatusRequest;
import com.example.digital_fine_management_system.dto.payment.ReceiptUploadRequestDTO;
import com.example.digital_fine_management_system.model.user.Payment;
import com.example.digital_fine_management_system.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            String clientSecret = paymentService.createPaymentIntent(paymentRequest.getAmount());

            return ResponseEntity.ok(new PaymentIntentResponse(clientSecret));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating payment intent: " + e.getMessage());
        }
    }

    @PostMapping("/update-status/{paymentId}")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable String paymentId, @RequestBody PaymentStatusRequest statusRequest) {
        try {
            Payment payment = paymentService.updatePaymentStatus(paymentId, statusRequest.getStatus());
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating payment status: " + e.getMessage());
        }
    }

    @PostMapping("/upload-receipt/{fineId}")
    public ResponseEntity<?> uploadReceipt(@ModelAttribute ReceiptUploadRequestDTO receiptUploadRequestDTO) {
        try {
            String fileUrl = paymentService.uploadFile(receiptUploadRequestDTO.getFineId(), receiptUploadRequestDTO.getFile(), receiptUploadRequestDTO.getAmount());
            return ResponseEntity.ok("Receipt uploaded successfully: " + fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading receipt: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<Page<Payment>> getPayments(
            @RequestParam(required = false) String fineId,
            @RequestParam(required = false) String method,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        System.out.println("Inside getPayments method");
        Page<Payment> result = paymentService.getFilteredPayments(fineId, method, startDate, endDate, page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all")
    public ResponseEntity<DataResponse<Payment>> getAllPayments() {
        try {
            List<Payment> payments = paymentService.getAllPayments();
            return ResponseEntity.ok(new DataResponse<>(payments));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Return error in case of failure
        }
    }
}