package com.preppath.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "practice_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PracticeSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "practice_date", nullable = false)
    private LocalDateTime practiceDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Rating rating = Rating.MEDIUM;

    @Column(name = "time_spent_minutes")
    private Integer timeSpentMinutes;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Builder.Default
    @Column(name = "completed")
    private Boolean completed = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // Enum for self-assessment
    public enum Rating {
        EASY,      // Nailed it
        MEDIUM,    // Got it with some effort
        HARD,      // Struggled, need to review
        FAILED     // Couldn't solve it
    }
}
