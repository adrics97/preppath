package com.preppath.controller;

import com.preppath.dto.*;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.*;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/subscription")
@RequiredArgsConstructor
//@CrossOrigin(origins = "https://preppathapp.com")
public class SubscriptionController {

    private final StripeService stripeService;
    private final SubscriptionService subscriptionService;

    /**
     * Obtener suscripción actual del usuario
     */
    @GetMapping("/current")
    public ResponseEntity<SubscriptionResponse> getCurrentSubscription(Authentication auth) {
        Long userId = getUserIdFromAuth(auth);
        SubscriptionResponse subscription = subscriptionService.getUserSubscription(userId);
        return ResponseEntity.ok(subscription);
    }

    /**
     * Crear sesión de checkout
     */
    @PostMapping("/checkout")
    public ResponseEntity<Map<String, String>> createCheckoutSession(
            @RequestBody CheckoutSessionRequest request,
            Authentication auth
    ) throws StripeException {
        Long userId = getUserIdFromAuth(auth);
        Session session = stripeService.createCheckoutSession(userId, request.getPriceId());

        return ResponseEntity.ok(Map.of(
                "sessionId", session.getId(),
                "url", session.getUrl()
        ));
    }

    /**
     * Crear portal de gestión
     */
    @PostMapping("/portal")
    public ResponseEntity<Map<String, String>> createCustomerPortal(Authentication auth)
            throws StripeException {
        Long userId = getUserIdFromAuth(auth);
        String portalUrl = stripeService.createCustomerPortal(userId);

        return ResponseEntity.ok(Map.of("url", portalUrl));
    }

    /**
     * Verificar si puede crear app
     */
    @GetMapping("/can-create-app")
    public ResponseEntity<Map<String, Boolean>> canCreateApp(Authentication auth) {
        Long userId = getUserIdFromAuth(auth);
        boolean canCreate = subscriptionService.canCreateApp(userId);

        return ResponseEntity.ok(Map.of("canCreate", canCreate));
    }

    /**
     * Verificar si puede crear pregunta
     */
    @GetMapping("/can-create-question")
    public ResponseEntity<Map<String, Boolean>> canCreateQuestion(Authentication auth) {
        Long userId = getUserIdFromAuth(auth);
        boolean canCreate = subscriptionService.canCreateQuestion(userId);

        return ResponseEntity.ok(Map.of("canCreate", canCreate));
    }

    /**
     * Extraer ID del usuario autenticado
     */
    private Long getUserIdFromAuth(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return userDetails.getId();
    }
}