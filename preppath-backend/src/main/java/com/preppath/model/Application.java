package com.preppath.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Position is required")
    @Column(nullable = false)
    private String position;

    @NotNull(message = "Application date is required")
    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    @Column(name = "job_url")
    private String jobUrl;

    @Column(name = "expected_salary")
    private BigDecimal expectedSalary;

    @Column(name = "salary_currency", length = 10)
    @Builder.Default
    private String salaryCurrency = "EUR";

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "interview_date")
    private LocalDate interviewDate;

    @Column(name = "rejection_date")
    private LocalDate rejectionDate;

    @Column(name = "offer_date")
    private LocalDate offerDate;

    @Column(columnDefinition = "TEXT")
    private String feedback; // Feedback received after interview

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    // Enum for Application Status
    public enum ApplicationStatus {
        APPLIED,           // Just applied
        SCREENING,         // HR screening/phone call
        TECHNICAL,         // Technical interview
        FINAL,            // Final interview
        OFFER,            // Received offer
        REJECTED,         // Rejected
        ACCEPTED,         // Accepted offer
        WITHDRAWN         // Withdrawn application
    }
}
