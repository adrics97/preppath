package com.preppath.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {

    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 200)
    private String name;

    private String location;
    private String websiteUrl;
    private String linkedinUrl;
    private String industry;
    private String companySize;
    private String description;
    private String culture;
}