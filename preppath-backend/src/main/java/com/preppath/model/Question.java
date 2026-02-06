package com.preppath.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Question title is required")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionCategory category;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Difficulty difficulty = Difficulty.MEDIUM;

    @Column(columnDefinition = "TEXT")
    private String answer; // User's answer/solution

    @Column(columnDefinition = "TEXT")
    private String hints;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "source_url")
    private String sourceUrl; // Link to LeetCode, HackerRank, etc.

    @Builder.Default
    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @Builder.Default
    @Column(name = "times_practiced")
    private Integer timesPracticed = 0;

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

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<PracticeSession> practiceSessions = new HashSet<>();

    // Enums
    public enum QuestionCategory {
        ALGORITHMS,
        DATA_STRUCTURES,
        SYSTEM_DESIGN,
        BEHAVIORAL,
        JAVASCRIPT,
        JAVA,
        PYTHON,
        SQL,
        REACT,
        SPRING,
        OTHER
    }

    public enum Difficulty {
        EASY,
        MEDIUM,
        HARD
    }
}
