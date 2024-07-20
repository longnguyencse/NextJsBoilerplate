import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';
import { PaymentSuccess } from '@components/questionnaire/payment-success';

export default async function ResultPage({
  searchParams
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
    {
      expand: ['line_items', 'payment_intent']
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  return <PaymentSuccess />;
}

export const runtime = 'edge';
