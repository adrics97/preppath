package com.preppath.controller;

import com.preppath.service.StripeService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.stripe.net.ApiResource.GSON;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
@Slf4j
public class WebhookController {

    private final StripeService stripeService;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader
    ) {
        Event event;

        // Si el webhook secret está vacío (desarrollo local), omitir verificación
        if (webhookSecret == null || webhookSecret.isEmpty()) {
            log.warn("Webhook secret no configurado - omitiendo verificación de firma");
            try {
                event = GSON.fromJson(payload, Event.class);
            } catch (Exception e) {
                log.error("Error parseando evento de Stripe", e);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payload");
            }
        } else {
            // Verificar firma del webhook
            try {
                event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            } catch (SignatureVerificationException e) {
                log.error("Firma de webhook inválida", e);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
            }
        }

        try {
            stripeService.handleWebhookEvent(event);
            return ResponseEntity.ok("Webhook procesado");
        } catch (Exception e) {
            log.error("Error procesando webhook", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing webhook");
        }
    }
}