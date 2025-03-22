package com.example.digital_fine_management_system.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenRequest {

    @JsonProperty("refresh_token")
    private String refreshToken;
}
