package com.preppath.controller;

import com.preppath.dto.MessageResponse;
import com.preppath.dto.UserResponse;
import com.preppath.dto.UserUpdateRequest;
import com.preppath.model.User;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;

    /**
     * Get current user profile
     * GET /api/users/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            User user = userService.getUserById(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserResponse response = UserResponse.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber())
                    .linkedinUrl(user.getLinkedinUrl())
                    .githubUrl(user.getGithubUrl())
                    .currentPosition(user.getCurrentPosition())
                    .yearsOfExperience(user.getYearsOfExperience())
                    .createdAt(user.getCreatedAt())
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Update current user profile
     * PUT /api/users/me
     */
    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody UserUpdateRequest updateRequest) {
        try {
            User userToUpdate = User.builder()
                    .name(updateRequest.getName())
                    .phoneNumber(updateRequest.getPhoneNumber())
                    .linkedinUrl(updateRequest.getLinkedinUrl())
                    .githubUrl(updateRequest.getGithubUrl())
                    .currentPosition(updateRequest.getCurrentPosition())
                    .yearsOfExperience(updateRequest.getYearsOfExperience())
                    .build();

            User updatedUser = userService.updateUser(userDetails.getId(), userToUpdate);

            UserResponse response = UserResponse.builder()
                    .id(updatedUser.getId())
                    .name(updatedUser.getName())
                    .email(updatedUser.getEmail())
                    .phoneNumber(updatedUser.getPhoneNumber())
                    .linkedinUrl(updatedUser.getLinkedinUrl())
                    .githubUrl(updatedUser.getGithubUrl())
                    .currentPosition(updatedUser.getCurrentPosition())
                    .yearsOfExperience(updatedUser.getYearsOfExperience())
                    .createdAt(updatedUser.getCreatedAt())
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Delete current user account
     * DELETE /api/users/me
     */
    @DeleteMapping("/me")
    public ResponseEntity<?> deleteCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            userService.deleteUser(userDetails.getId());
            return ResponseEntity.ok(new MessageResponse("User deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}