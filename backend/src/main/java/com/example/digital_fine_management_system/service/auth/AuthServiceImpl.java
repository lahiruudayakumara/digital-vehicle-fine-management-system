package com.example.digital_fine_management_system.service.auth;

import com.example.digital_fine_management_system.dto.auth.LoginRequest;
import com.example.digital_fine_management_system.dto.auth.LoginResponse;
import com.example.digital_fine_management_system.dto.auth.RefreshTokenRequest;
import com.example.digital_fine_management_system.dto.auth.RegisterRequest;
import com.example.digital_fine_management_system.dto.policeOfficer.PoliceOfficerRequestDTO;
import com.example.digital_fine_management_system.model.user.PoliceOfficer;
import com.example.digital_fine_management_system.model.user.Role;
import com.example.digital_fine_management_system.model.user.User;
import com.example.digital_fine_management_system.repository.user.UserRepository;
import com.example.digital_fine_management_system.util.JwtTokenProvider;
import com.example.digital_fine_management_system.util.JwtTokenUtil;
import com.example.digital_fine_management_system.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private final UserRepository userRepository;

    private AuthenticationManager authenticationManager;
    @Autowired
    private final JwtTokenUtil jwtTokenUtil;

    private final UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(
            UserRepository userRepository,
            JwtTokenUtil jwtTokenUtil,
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public String registerUser(RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            User user = new User();
            user.setFullName(request.getFullName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(PasswordUtil.encodePassword(request.getPassword()));
            user.setRole(Role.valueOf(request.getRole()));

            userRepository.save(user);
            return "User registered successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String registerPoliceOfficer(PoliceOfficerRequestDTO request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            PoliceOfficer policeOfficer = new PoliceOfficer();
            policeOfficer.setFullName(request.getFullName());
            policeOfficer.setUsername(request.getUsername());
            policeOfficer.setEmail(request.getEmail());
            policeOfficer.setPassword(PasswordUtil.encodePassword(request.getPassword()));
            policeOfficer.setRole(Role.POLICE_OFFICER);
            policeOfficer.setBadgeID(request.getBadgeID()); // Setting correct police officer ID
            policeOfficer.setAddress(request.getAddress());
            policeOfficer.setTelephone(request.getTelephone());
            policeOfficer.setPatrolLocations(request.getPatrolLocations()); // Already a string

            userRepository.save(policeOfficer);
            return "Police officer registered successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public LoginResponse loginUser(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        Optional<User> user = Optional.ofNullable(userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found")));

        String token = jwtTokenUtil.generateToken(user.get().getEmail());
        String refreshToken = jwtTokenUtil.generateToken(user.get().getEmail());

        return LoginResponse.builder()
                .username(user.get().getEmail())
                .token(token)
                .role(user.get().getRole().name())
                .expiresIn(jwtTokenUtil.getExpirationTime())
                .refreshToken(refreshToken)
                .expiresIn(Instant.now().getEpochSecond())
                .refreshToken(token)
                .timestamp(Instant.now())
                .build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        if (jwtTokenProvider.validateToken(refreshToken)) {
            String username = jwtTokenProvider.getUsernameFromJWT(refreshToken);
            String newAccessToken = jwtTokenProvider.generateToken(username);
            long expiresIn = jwtTokenProvider.getExpirationTime();

            return ResponseEntity.ok(new LoginResponse(
                    username,
                    newAccessToken,
                    username,
                    expiresIn,
                    refreshToken,
                    Instant.now()
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }
}