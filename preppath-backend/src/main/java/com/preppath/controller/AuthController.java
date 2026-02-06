package com.preppath.controller;

import com.preppath.dto.AuthResponse;
import com.preppath.dto.LoginRequest;
import com.preppath.dto.MessageResponse;
import com.preppath.dto.RegisterRequest;
import com.preppath.model.User;
import com.preppath.security.JwtTokenProvider;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    /**
     * Register a new user
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Check if email already exists
            if (userService.emailExists(registerRequest.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Email is already in use!"));
            }

            // Create new user
            User user = User.builder()
                    .name(registerRequest.getName())
                    .email(registerRequest.getEmail())
                    .password(registerRequest.getPassword())
                    .build();

            User savedUser = userService.createUser(user);

            // Generate JWT token
            String token = tokenProvider.generateTokenFromEmail(savedUser.getEmail());

            // Build response
            AuthResponse authResponse = AuthResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .id(savedUser.getId())
                    .name(savedUser.getName())
                    .email(savedUser.getEmail())
                    .build();

            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Login user
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token
            String token = tokenProvider.generateToken(authentication);

            // Get user details
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Build response
            AuthResponse authResponse = AuthResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .id(userDetails.getId())
                    .name(userDetails.getName())
                    .email(userDetails.getEmail())
                    .build();

            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Error: Invalid email or password"));
        }
    }

    /**
     * Test endpoint (public)
     * GET /api/auth/test
     */
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(new MessageResponse("Auth endpoint is working!"));
    }
}