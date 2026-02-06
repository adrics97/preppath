package com.preppath.dto;

import com.preppath.model.Application.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {

    private Long id;
    private String position;
    private CompanyResponse company;
    private LocalDate applicationDate;
    private ApplicationStatus status;
    private String jobUrl;
    private BigDecimal expectedSalary;
    private String salaryCurrency;
    private String notes;
    private LocalDate interviewDate;
    private LocalDate rejectionDate;
    private LocalDate offerDate;
    private String feedback;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}