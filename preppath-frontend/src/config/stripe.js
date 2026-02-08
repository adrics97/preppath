import { loadStripe } from '@stripe/stripe-js';

// Tu clave PÚBLICA de Stripe (pk_test_...)
export const stripePromise = loadStripe(
    'pk_test_51SyCKa2NT3G6vpWSmqh4bXE4rAXWKPbyTRCmWGQrfJDYX7E5B4n5QJJJ64w9nY1yFyOJYCXnT5Hk0wAuxYiUyFXf00kYzE6pGD'
);

// Price ID del plan Pro (lo creamos en Stripe)
export const PRICE_IDS = {
    PRO_MONTHLY: 'price_1SyCOB2NT3G6vpWSDtRCzlHw'
};