package com.preppath.model;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscription_plans")
@Data
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "stripe_price_id")
    private String stripePriceId;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "max_apps")
    private Integer maxApps;

    @Column(name = "max_questions")
    private Integer maxQuestions;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public boolean isUnlimited() {
        return maxApps == null && maxQuestions == null;
    }
}