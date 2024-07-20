'use server';

import type { Stripe } from 'stripe';

import { headers } from 'next/headers';

import { CURRENCY } from '@/config';
import { formatAmountForStripe } from '@/utils/stripe/stripe-helper';
import { stripe } from '@/lib/stripe';

// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/components/ElementsForm.tsx
export async function createCheckoutSession(
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode,
  email: string,
  amount: number,
  consultationId: string
): Promise<{ client_secret: string | null; url: string | null; id: string }> {
  const origin: string = headers().get('origin')!;

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    customer_email: email,
    // client_reference_id: consultationId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: 'Paramount Plus Subscription'
          },
          unit_amount: formatAmountForStripe(amount, CURRENCY)
        }
      }
    ],
    ...(uiMode === 'hosted' && {
      success_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/failed`
    }),
    ...(uiMode === 'embedded' && {
      return_url: `${origin}/TODO/result?session_id={CHECKOUT_SESSION_ID}`
    }),
    ui_mode: uiMode
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
    id: checkoutSession.id
  };
}

export async function createPaymentIntent(data: FormData): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(Number(data.get('customDonation') as string), CURRENCY),
    automatic_payment_methods: { enabled: true },
    currency: CURRENCY
  });

  return { client_secret: paymentIntent.client_secret! };
}
