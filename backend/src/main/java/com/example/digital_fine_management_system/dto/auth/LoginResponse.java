package com.example.digital_fine_management_system.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    @JsonProperty("username")
    private String username;

    @JsonProperty("token")
    private String token;

    @JsonProperty("role")
    private String role;

    @JsonProperty("expires_in")
    private Date expiresIn;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("timestamp")
    private Instant timestamp = Instant.now();
}