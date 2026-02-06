package com.preppath.dto;

import com.preppath.model.PracticeSession.Rating;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PracticeSessionRequest {

    @NotNull(message = "Question ID is required")
    private Long questionId;

    private LocalDateTime practiceDate;
    private Rating rating;
    private Integer timeSpentMinutes;
    private String notes;
    private Boolean completed;
}