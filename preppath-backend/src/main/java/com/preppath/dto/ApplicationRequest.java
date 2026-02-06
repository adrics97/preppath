package com.preppath.dto;

import com.preppath.model.Application.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {

    @NotBlank(message = "Position is required")
    private String position;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    private LocalDate applicationDate;
    private ApplicationStatus status;
    private String jobUrl;
    private BigDecimal expectedSalary;
    private String salaryCurrency;
    private String notes;
    private LocalDate interviewDate;
    private String feedback;
}