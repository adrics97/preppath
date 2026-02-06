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
public class CompanyResponse {

    private Long id;
    private String name;
    private String location;
    private String websiteUrl;
    private String linkedinUrl;
    private String industry;
    private String companySize;
    private String description;
    private String culture;
    private LocalDateTime createdAt;
}