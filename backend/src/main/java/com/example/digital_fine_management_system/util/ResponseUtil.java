package com.example.digital_fine_management_system.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

public class ResponseUtil {

    public static ResponseEntity<?> badRequestResponse(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("error", message));
    }

    public static ResponseEntity<?> unauthorizedResponse(String message) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", message));
    }

    public static ResponseEntity<?> forbiddenResponse(String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Collections.singletonMap("error", message));
    }
}
