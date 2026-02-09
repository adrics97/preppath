package com.preppath.service;

import com.preppath.model.*;
import com.preppath.repository.*;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.param.*;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripeService {

    private final UserSubscriptionRepository subscriptionRepository;
    private final SubscriptionPlanRepository planRepository;
    private final UserRepository userRepository;

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    /**
     * Crear sesión de checkout para suscripción
     */
    public Session createCheckoutSession(Long userId, String priceId) throws StripeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Buscar o crear cliente en Stripe
        String customerId = getOrCreateStripeCustomer(user);

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setCustomer(customerId)
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build()
                )
                .putMetadata("user_id", userId.toString())
                .build();

        return Session.create(params);
    }

    /**
     * Obtener o crear cliente de Stripe
     */
    private String getOrCreateStripeCustomer(User user) throws StripeException {
        if (user.getStripeCustomerId() != null) {
            return user.getStripeCustomerId();
        }

        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(user.getEmail())
                .setName(user.getName())
                .putMetadata("user_id", user.getId().toString())
                .build();

        Customer customer = Customer.create(params);

        user.setStripeCustomerId(customer.getId());
        userRepository.save(user);

        return customer.getId();
    }

    /**
     * Crear portal de gestión de suscripción
     */
    public String createCustomerPortal(Long userId) throws StripeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (user.getStripeCustomerId() == null) {
            throw new RuntimeException("Usuario no tiene cliente de Stripe");
        }

        com.stripe.param.billingportal.SessionCreateParams params =
                com.stripe.param.billingportal.SessionCreateParams.builder()
                        .setCustomer(user.getStripeCustomerId())
                        .setReturnUrl("https://preppathapp.com/dashboard")
                        .build();

        com.stripe.model.billingportal.Session portalSession =
                com.stripe.model.billingportal.Session.create(params);

        return portalSession.getUrl();
    }

    /**
     * Procesar evento de webhook
     */
    @Transactional
    public void handleWebhookEvent(Event event) {
        log.info("Procesando evento de Stripe: {}", event.getType());

        switch (event.getType()) {
            case "checkout.session.completed":
                handleCheckoutCompleted(event);
                break;
            case "customer.subscription.updated":
                handleSubscriptionUpdated(event);
                break;
            case "customer.subscription.deleted":
                handleSubscriptionDeleted(event);
                break;
            case "invoice.payment_succeeded":
                handlePaymentSucceeded(event);
                break;
            case "invoice.payment_failed":
                handlePaymentFailed(event);
                break;
            default:
                log.info("Evento no manejado: {}", event.getType());
        }
    }

    private void handleCheckoutCompleted(Event event) {
        try {
            // Extraer el ID de la sesión desde el evento
            String jsonString = event.getData().getObject().toJson();
            JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
            String sessionId = jsonObject.get("id").getAsString();
            
            // Recuperar la sesión completa desde Stripe API
            Session session = Session.retrieve(sessionId);
            
            log.info("Procesando checkout completado para session: {}", sessionId);

            Long userId = Long.parseLong(session.getMetadata().get("user_id"));
            String subscriptionId = session.getSubscription();
            String customerId = session.getCustomer();

            log.info("Usuario ID: {}, Subscription ID: {}, Customer ID: {}", userId, subscriptionId, customerId);

            Subscription stripeSubscription = Subscription.retrieve(subscriptionId);
            String priceId = stripeSubscription.getItems().getData().get(0).getPrice().getId();

            log.info("Price ID: {}", priceId);

            SubscriptionPlan plan = planRepository.findByStripePriceId(priceId)
                    .orElseThrow(() -> new RuntimeException("Plan no encontrado para priceId: " + priceId));

            UserSubscription userSubscription = subscriptionRepository.findByUserId(userId)
                    .orElse(new UserSubscription());

            userSubscription.setUserId(userId);
            userSubscription.setPlan(plan);
            userSubscription.setStripeCustomerId(customerId);
            userSubscription.setStripeSubscriptionId(subscriptionId);
            userSubscription.setStatus(stripeSubscription.getStatus());
            userSubscription.setCurrentPeriodStart(
                    LocalDateTime.ofInstant(
                            Instant.ofEpochSecond(stripeSubscription.getCurrentPeriodStart()),
                            ZoneId.systemDefault()
                    )
            );
            userSubscription.setCurrentPeriodEnd(
                    LocalDateTime.ofInstant(
                            Instant.ofEpochSecond(stripeSubscription.getCurrentPeriodEnd()),
                            ZoneId.systemDefault()
                    )
            );
            userSubscription.setCancelAtPeriodEnd(stripeSubscription.getCancelAtPeriodEnd());

            subscriptionRepository.save(userSubscription);
            log.info("Suscripción creada/actualizada para usuario {}", userId);

        } catch (StripeException e) {
            log.error("Error procesando checkout completado", e);
            throw new RuntimeException(e);
        }
    }

    private void handleSubscriptionUpdated(Event event) {
        try {
            
            // Extraer el objeto JSON del evento
            String jsonString = event.getData().getObject().toJson();
            JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
            String subscriptionId = jsonObject.get("id").getAsString();
            
            // Recuperar la suscripción completa desde Stripe API
            Subscription subscription = Subscription.retrieve(subscriptionId);

            UserSubscription userSubscription = subscriptionRepository
                    .findByStripeSubscriptionId(subscription.getId())
                    .orElseThrow(() -> new RuntimeException("Suscripción no encontrada para ID: " + subscriptionId));

            userSubscription.setStatus(subscription.getStatus());
            userSubscription.setCurrentPeriodEnd(
                    LocalDateTime.ofInstant(
                            Instant.ofEpochSecond(subscription.getCurrentPeriodEnd()),
                            ZoneId.systemDefault()
                    )
            );
            userSubscription.setCancelAtPeriodEnd(subscription.getCancelAtPeriodEnd());

            subscriptionRepository.save(userSubscription);
            log.info("Suscripción actualizada: {}", subscription.getId());
        } catch (StripeException e) {
            log.error("Error procesando subscription updated", e);
            throw new RuntimeException(e);
        }
    }

    private void handleSubscriptionDeleted(Event event) {
        try {
            // Extraer el objeto JSON del evento
            String jsonString = event.getData().getObject().toJson();
            JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
            String subscriptionId = jsonObject.get("id").getAsString();

            log.info("Cancelando suscripción: {}", subscriptionId);

            UserSubscription userSubscription = subscriptionRepository
                    .findByStripeSubscriptionId(subscriptionId)
                    .orElseThrow(() -> new RuntimeException("Suscripción no encontrada"));

            // Cambiar a plan FREE
            SubscriptionPlan freePlan = planRepository.findByName("FREE")
                    .orElseThrow(() -> new RuntimeException("Plan FREE no encontrado"));

            userSubscription.setPlan(freePlan);
            userSubscription.setStatus("cancelled");
            userSubscription.setStripeSubscriptionId(null);
            userSubscription.setCancelAtPeriodEnd(false);

            subscriptionRepository.save(userSubscription);
            log.info("Suscripción cancelada, usuario regresado a FREE");

        } catch (Exception e) {
            log.error("Error procesando subscription deleted", e);
            throw new RuntimeException(e);
        }
    }

    private void handlePaymentSucceeded(Event event) {
        log.info("Pago exitoso procesado");
    }

    private void handlePaymentFailed(Event event) {
        log.error("Pago fallido");
    }
}