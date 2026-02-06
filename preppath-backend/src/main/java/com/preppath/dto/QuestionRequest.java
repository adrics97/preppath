package com.preppath.dto;

import com.preppath.model.Question.Difficulty;
import com.preppath.model.Question.QuestionCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {

    @NotBlank(message = "Question title is required")
    private String title;

    private String description;

    @NotNull(message = "Category is required")
    private QuestionCategory category;

    private Difficulty difficulty;
    private String answer;
    private String hints;
    private String notes;
    private String sourceUrl;
    private Boolean isFavorite;
}