package com.example.digital_fine_management_system.dto.payment;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class ReceiptUploadRequestDTO {

    private String fineId;
    private BigDecimal amount;
    private MultipartFile file;
}
