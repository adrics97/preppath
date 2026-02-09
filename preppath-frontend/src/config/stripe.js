import { loadStripe } from '@stripe/stripe-js';


//const STRIPE_PUBLISHABLE_KEY_TEST = 'pk_test_51SyCKa2NT3G6vpWSmqh4bXE4rAXWKPbyTRCmWGQrfJDYX7E5B4n5QJJJ64w9nY1yFyOJYCXnT5Hk0wAuxYiUyFXf00kYzE6pGD';
const STRIPE_PUBLISHABLE_KEY_LIVE = 'pk_live_51SyCKORvN0f1Sz7xWfPbxdrPTokVCmazQYAAP80NJNAy44TuhP1DmoDDe68IkDL1xgx3uhZ3dv6bN6KQ7QBBU9Qw00qY3x9Ict';

//const STRIPE_PRICE_IDS_TEST = 'price_1SyCOB2NT3G6vpWSDtRCzlHw';
const STRIPE_PRICE_IDS_LIVE = 'price_1SyrhlRvN0f1Sz7xtQR5c3sn';


// Tu clave PÚBLICA de Stripe (pk_test_...)
export const stripePromise = loadStripe(
    STRIPE_PUBLISHABLE_KEY_LIVE
);

// Price ID del plan Pro (lo creamos en Stripe)
export const PRICE_IDS = {
    PRO_MONTHLY: STRIPE_PRICE_IDS_LIVE
};