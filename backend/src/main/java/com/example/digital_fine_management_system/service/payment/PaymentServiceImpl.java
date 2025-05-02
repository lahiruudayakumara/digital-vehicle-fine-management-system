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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${stripe.secret_key}")
    private String stripeSecretKey;
    private final String uploadDir = "C:/myapp/uploads";

    public Payment createPayment(Payment payment) {
        // Create payment entry in the database
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(String paymentId, String status) {
        // Update payment status after a successful/failed payment
        Payment payment = paymentRepository.findByStripePaymentId(paymentId).orElseThrow();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public Payment uploadReceipt(Long paymentId, String slipUrl) {
        Payment payment = paymentRepository.findById(paymentId).orElseThrow();
        payment.setSlipUrl(slipUrl);
        return paymentRepository.save(payment);
    }


    public String uploadFile(String fineId, MultipartFile file, BigDecimal amount) throws IOException {
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            throw new IOException("Invalid file name.");
        }

        // Create a unique filename to prevent overwriting
        String uniqueFileName = UUID.randomUUID() + "_" + fileName;
        Path path = Paths.get(uploadDir + File.separator + uniqueFileName);

        Files.createDirectories(path.getParent());

        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        Payment payment = new Payment();
        payment.setSlipUrl(path.toString());
        payment.setMethod("SLIP");
        payment.setFineId(fineId);
        payment.setAmount(amount);
        payment.setStatus("PENDING");
        payment.setPaymentDate(Timestamp.valueOf(LocalDateTime.now()));
        paymentRepository.save(payment);
        return "File uploaded successfully: " + path.toString();
    }

    public String createPaymentIntent(int amount) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);  // amount in cents
        params.put("currency", "usd");

        PaymentIntent intent = PaymentIntent.create(params);
        return intent.getClientSecret();
    }

    public Page<Payment> getFilteredPayments(String fineId, String method, LocalDateTime startDate, LocalDateTime endDate, int page, int size) {
        Pageable pageable = (Pageable) PageRequest.of(page, size, Sort.by("paymentDate").descending());

        Specification<Payment> spec = Specification
                .where(PaymentSpecification.hasFineId(fineId))
                .and(PaymentSpecification.hasMethod(method))
                .and(PaymentSpecification.betweenDates(startDate, endDate));

        return paymentRepository.findAll(spec, (org.springframework.data.domain.Pageable) pageable);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll(); // Assuming you have a repository that interacts with the database
    }
}