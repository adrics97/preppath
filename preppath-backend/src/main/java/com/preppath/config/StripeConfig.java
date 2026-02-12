package com.preppath.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


//Patrón de diseño: Configuration - La clase StripeConfig está anotada con @Configuration, lo que indica que es una clase de configuración de Spring que se utiliza para configurar y gestionar beans relacionados con Stripe en la aplicación.
@Configuration
public class StripeConfig {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }
}