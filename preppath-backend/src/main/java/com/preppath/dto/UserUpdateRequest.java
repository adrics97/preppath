package com.preppath.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    @Size(min = 2, max = 100)
    private String name;

    private String phoneNumber;
    private String linkedinUrl;
    private String githubUrl;
    private String currentPosition;
    private Integer yearsOfExperience;
}