package com.preppath.dto;

import com.preppath.model.PracticeSession.Rating;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PracticeSessionResponse {

    private Long id;
    private QuestionResponse question;
    private LocalDateTime practiceDate;
    private Rating rating;
    private Integer timeSpentMinutes;
    private String notes;
    private Boolean completed;
    private LocalDateTime createdAt;
}