package com.preppath.controller;

import com.preppath.dto.*;
import com.preppath.model.PasswordResetToken;
import com.preppath.model.User;
import com.preppath.repository.PasswordResetTokenRepository;
import com.preppath.security.JwtTokenProvider;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.EmailService;
import com.preppath.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private final PasswordResetTokenRepository resetTokenRepository;
    private final EmailService emailService;

    @Value("${github.client.id:}")
    private String githubClientId;

    @Value("${github.client.secret:}")
    private String githubClientSecret;

    // ──────────────────────────────────────────────
    // Register
    // ──────────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.emailExists(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Error: Email is already in use!"));
            }

            User user = User.builder()
                    .name(registerRequest.getName())
                    .email(registerRequest.getEmail())
                    .password(registerRequest.getPassword())
                    .build();

            User savedUser = userService.createUser(user);
            String token = tokenProvider.generateTokenFromEmail(savedUser.getEmail());

            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token).type("Bearer")
                    .id(savedUser.getId()).name(savedUser.getName()).email(savedUser.getEmail())
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    // ──────────────────────────────────────────────
    // Login
    // ──────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenProvider.generateToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token).type("Bearer")
                    .id(userDetails.getId()).name(userDetails.getName()).email(userDetails.getEmail())
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Error: Invalid email or password"));
        }
    }

    // ──────────────────────────────────────────────
    // Forgot Password
    // ──────────────────────────────────────────────
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        // Always return success to avoid email enumeration
        Optional<User> userOpt = userService.getUserByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            resetTokenRepository.deleteByUser(user);

            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = PasswordResetToken.builder()
                    .token(token)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusHours(1))
                    .build();
            resetTokenRepository.save(resetToken);

            try {
                emailService.sendPasswordResetEmail(user.getEmail(), token);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new MessageResponse("Failed to send email. Please try again later."));
            }
        }

        return ResponseEntity.ok(new MessageResponse("If that email exists, a reset link has been sent."));
    }

    // ──────────────────────────────────────────────
    // Reset Password
    // ──────────────────────────────────────────────
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> tokenOpt = resetTokenRepository.findByToken(request.getToken());

        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Invalid or expired reset token."));
        }

        PasswordResetToken resetToken = tokenOpt.get();
        userService.updatePassword(resetToken.getUser().getId(), request.getPassword());
        resetTokenRepository.delete(resetToken);

        return ResponseEntity.ok(new MessageResponse("Password updated successfully."));
    }

    // ──────────────────────────────────────────────
    // Google OAuth
    // ──────────────────────────────────────────────
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@Valid @RequestBody GoogleAuthRequest request) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://www.googleapis.com/oauth2/v3/userinfo";

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(request.getAccessToken());
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> googleResponse = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            Map<String, Object> userInfo = googleResponse.getBody();

            if (userInfo == null || userInfo.get("email") == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new MessageResponse("Could not retrieve Google user info."));
            }

            String email = (String) userInfo.get("email");
            String name = (String) userInfo.getOrDefault("name", email);

            User user = userService.getUserByEmail(email).orElseGet(() -> {
                User newUser = User.builder()
                        .name(name)
                        .email(email)
                        .password(UUID.randomUUID().toString())
                        .build();
                return userService.createUser(newUser);
            });

            String token = tokenProvider.generateTokenFromEmail(user.getEmail());
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token).type("Bearer")
                    .id(user.getId()).name(user.getName()).email(user.getEmail())
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Google sign-in failed."));
        }
    }

    // ──────────────────────────────────────────────
    // GitHub OAuth
    // ──────────────────────────────────────────────
    @PostMapping("/github")
    public ResponseEntity<?> githubLogin(@Valid @RequestBody GithubAuthRequest request) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // 1. Exchange code for access token
            String tokenUrl = "https://github.com/login/oauth/access_token" +
                    "?client_id=" + githubClientId +
                    "&client_secret=" + githubClientSecret +
                    "&code=" + request.getCode();

            HttpHeaders tokenHeaders = new HttpHeaders();
            tokenHeaders.set("Accept", "application/json");
            HttpEntity<Void> tokenEntity = new HttpEntity<>(tokenHeaders);

            ResponseEntity<Map> tokenResponse = restTemplate.exchange(tokenUrl, HttpMethod.POST, tokenEntity, Map.class);
            Map<String, Object> tokenBody = tokenResponse.getBody();

            if (tokenBody == null || tokenBody.get("access_token") == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new MessageResponse("GitHub authorization failed."));
            }

            String githubAccessToken = (String) tokenBody.get("access_token");

            // 2. Get user info
            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.setBearerAuth(githubAccessToken);
            userHeaders.set("Accept", "application/vnd.github+json");
            HttpEntity<Void> userEntity = new HttpEntity<>(userHeaders);

            ResponseEntity<Map> userResponse = restTemplate.exchange(
                    "https://api.github.com/user", HttpMethod.GET, userEntity, Map.class);
            Map<String, Object> githubUser = userResponse.getBody();

            // 3. Get primary email (may be private)
            String email = githubUser != null ? (String) githubUser.get("email") : null;
            if (email == null) {
                ResponseEntity<Map[]> emailsResponse = restTemplate.exchange(
                        "https://api.github.com/user/emails", HttpMethod.GET, userEntity, Map[].class);
                if (emailsResponse.getBody() != null) {
                    for (Map<String, Object> e : emailsResponse.getBody()) {
                        if (Boolean.TRUE.equals(e.get("primary")) && Boolean.TRUE.equals(e.get("verified"))) {
                            email = (String) e.get("email");
                            break;
                        }
                    }
                }
            }

            if (email == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new MessageResponse("Could not retrieve GitHub email."));
            }

            String name = githubUser != null && githubUser.get("name") != null
                    ? (String) githubUser.get("name")
                    : (String) githubUser.get("login");

            final String finalEmail = email;
            final String finalName = name;

            User user = userService.getUserByEmail(finalEmail).orElseGet(() -> {
                User newUser = User.builder()
                        .name(finalName)
                        .email(finalEmail)
                        .password(UUID.randomUUID().toString())
                        .build();
                return userService.createUser(newUser);
            });

            String jwtToken = tokenProvider.generateTokenFromEmail(user.getEmail());
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(jwtToken).type("Bearer")
                    .id(user.getId()).name(user.getName()).email(user.getEmail())
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("GitHub sign-in failed."));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(new MessageResponse("Auth endpoint is working!"));
    }
}
