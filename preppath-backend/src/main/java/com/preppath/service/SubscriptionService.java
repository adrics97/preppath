package com.preppath.service;

import com.preppath.dto.SubscriptionResponse;
import com.preppath.model.*;
import com.preppath.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final UserSubscriptionRepository subscriptionRepository;
    private final UserUsageRepository usageRepository;
    private final SubscriptionPlanRepository planRepository;

    /**
     * Obtener información de suscripción del usuario
     */
    public SubscriptionResponse getUserSubscription(Long userId) {
        UserSubscription subscription = subscriptionRepository.findByUserId(userId)
                .orElseGet(() -> createFreeSubscription(userId));

        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseGet(() -> createUserUsage(userId));

        SubscriptionPlan plan = subscription.getPlan();

        return new SubscriptionResponse(
                plan.getName(),
                subscription.getStatus(),
                plan.getMaxApps(),
                plan.getMaxQuestions(),
                usage.getAppsCount(),
                usage.getQuestionsCount(),
                subscription.getCurrentPeriodEnd(),
                subscription.getCancelAtPeriodEnd()
        );
    }

    /**
     * Verificar si el usuario puede crear una app
     */
    public boolean canCreateApp(Long userId) {
        UserSubscription subscription = subscriptionRepository.findByUserId(userId)
                .orElseGet(() -> createFreeSubscription(userId));

        // Plan PRO es ilimitado
        if (subscription.getPlan().isUnlimited()) {
            return true;
        }

        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseGet(() -> createUserUsage(userId));

        Integer maxApps = subscription.getPlan().getMaxApps();
        return usage.getAppsCount() < maxApps;
    }

    /**
     * Verificar si el usuario puede crear una pregunta
     */
    public boolean canCreateQuestion(Long userId) {
        UserSubscription subscription = subscriptionRepository.findByUserId(userId)
                .orElseGet(() -> createFreeSubscription(userId));

        if (subscription.getPlan().isUnlimited()) {
            return true;
        }

        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseGet(() -> createUserUsage(userId));

        Integer maxQuestions = subscription.getPlan().getMaxQuestions();
        return usage.getQuestionsCount() < maxQuestions;
    }

    /**
     * Incrementar contador de apps
     */
    @Transactional
    public void incrementAppCount(Long userId) {
        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseGet(() -> createUserUsage(userId));

        usage.setAppsCount(usage.getAppsCount() + 1);
        usageRepository.save(usage);
    }

    /**
     * Incrementar contador de preguntas
     */
    @Transactional
    public void incrementQuestionCount(Long userId) {
        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseGet(() -> createUserUsage(userId));

        usage.setQuestionsCount(usage.getQuestionsCount() + 1);
        usageRepository.save(usage);
    }

    /**
     * Decrementar contador de apps (cuando se elimina)
     */
    @Transactional
    public void decrementAppCount(Long userId) {
        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Uso no encontrado"));

        if (usage.getAppsCount() > 0) {
            usage.setAppsCount(usage.getAppsCount() - 1);
            usageRepository.save(usage);
        }
    }

    /**
     * Decrementar contador de preguntas (cuando se elimina)
     */
    @Transactional
    public void decrementQuestionCount(Long userId) {
        UserUsage usage = usageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Uso no encontrado"));

        if (usage.getQuestionsCount() > 0) {
            usage.setQuestionsCount(usage.getQuestionsCount() - 1);
            usageRepository.save(usage);
        }
    }

    private UserSubscription createFreeSubscription(Long userId) {
        SubscriptionPlan freePlan = planRepository.findByName("FREE")
                .orElseThrow(() -> new RuntimeException("Plan FREE no encontrado"));

        UserSubscription subscription = new UserSubscription();
        subscription.setUserId(userId);
        subscription.setPlan(freePlan);
        subscription.setStatus("active");

        return subscriptionRepository.save(subscription);
    }

    private UserUsage createUserUsage(Long userId) {
        UserUsage usage = new UserUsage();
        usage.setUserId(userId);
        return usageRepository.save(usage);
    }
}