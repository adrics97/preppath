package com.preppath.dto;

import com.preppath.model.Question.Difficulty;
import com.preppath.model.Question.QuestionCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponse {

    private Long id;
    private String title;
    private String description;
    private QuestionCategory category;
    private Difficulty difficulty;
    private String answer;
    private String hints;
    private String notes;
    private String sourceUrl;
    private Boolean isFavorite;
    private Integer timesPracticed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}