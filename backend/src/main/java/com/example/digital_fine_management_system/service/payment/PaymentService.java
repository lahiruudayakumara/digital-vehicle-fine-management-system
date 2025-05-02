package com.example.digital_fine_management_system.service.payment;

import com.example.digital_fine_management_system.model.user.Payment;
import com.example.digital_fine_management_system.repository.PaymentRepository;
import com.example.digital_fine_management_system.util.PaymentSpecification;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

public interface PaymentService {

    Payment createPayment(Payment payment);

    Payment updatePaymentStatus(String paymentId, String status);

    Payment uploadReceipt(Long paymentId, String slipUrl);

    String uploadFile(String fineId, MultipartFile file, BigDecimal amount) throws IOException;

    String createPaymentIntent(int amount) throws Exception;

    Page<Payment> getFilteredPayments(String fineId, String method, LocalDateTime startDate, LocalDateTime endDate, int page, int size);

    List<Payment> getAllPayments();
}