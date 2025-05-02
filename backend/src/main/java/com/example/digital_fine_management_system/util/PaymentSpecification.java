package com.example.digital_fine_management_system.util;

import com.example.digital_fine_management_system.model.user.Payment;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class PaymentSpecification {

    public static Specification<Payment> hasMethod(String method) {
        return (root, query, criteriaBuilder) ->
                method != null ? criteriaBuilder.equal(root.get("method"), method) : null;
    }

    public static Specification<Payment> betweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return (root, query, cb) -> {
            if (startDate != null && endDate != null) {
                return cb.between(root.get("paymentDate"), startDate, endDate);
            }
            return null;
        };
    }

    public static Specification<Payment> hasFineId(String fineId) {
        return (root, query, cb) ->
                fineId != null ? cb.equal(root.get("fineId"), fineId) : null;
    }
}

