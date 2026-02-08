package com.preppath.model;

import lombok.Data;
import jakarta.persistence.*;  // ← Cambio aquí
import java.time.LocalDate;

@Entity
@Table(name = "user_usage")
@Data
public class UserUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "apps_count")
    private Integer appsCount = 0;

    @Column(name = "questions_count")
    private Integer questionsCount = 0;

    @Column(name = "last_reset_date")
    private LocalDate lastResetDate;

    @PrePersist
    protected void onCreate() {
        if (lastResetDate == null) {
            lastResetDate = LocalDate.now();
        }
    }
}