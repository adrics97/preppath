package com.preppath.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionResponse {
    private String planName;
    private String status;
    private Integer maxApps;
    private Integer maxQuestions;
    private Integer currentApps;
    private Integer currentQuestions;
    private LocalDateTime currentPeriodEnd;
    private Boolean cancelAtPeriodEnd;
}