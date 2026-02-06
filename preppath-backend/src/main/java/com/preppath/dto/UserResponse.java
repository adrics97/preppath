package com.preppath.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String linkedinUrl;
    private String githubUrl;
    private String currentPosition;
    private Integer yearsOfExperience;
    private LocalDateTime createdAt;
}