import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_paymentPublic);
export function PaymentSuccessContent() {
  const [searchParams] = useSearchParams();
  const [paymentIntent, setPaymentIntent] = useState({
    amount: 0,
  });

  const stripe = useStripe();

  (async () => {
    try {
      const paymentIntentClientSecret = searchParams.get(
        'payment_intent_client_secret'
      );

      if (!paymentIntentClientSecret || !stripe) {
        return;
      }

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(
        paymentIntentClientSecret
      );
      setPaymentIntent(paymentIntent);
    } catch (error) {
      console.log(error);
    }
  })();

  const { amount } = paymentIntent;

  return (
    <>
      <section>
        <h1 className="text-2xl">Payment successful!</h1>
        <p>Your payment of {amount / 100} EUR has been successful.</p>
        <p>Your transaction ID is: {searchParams.get('payment_intent')}</p>
      </section>
    </>
  );
}

export default function PaymentSuccess() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSuccessContent />
    </Elements>
  );
}
