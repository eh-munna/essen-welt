import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function CheckoutForm({ clientSecret, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `http://localhost:5173/payment-success?payment_intent={PAYMENT_INTENT_ID}`,
        },
      });

      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error during payment:', error.message);
      setMessage('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <PaymentElement />
        <Button disabled={isLoading || !stripe || !elements} type="submit">
          {`Pay ${amount ? `€${(amount / 100).toFixed(2)}` : ''} `}
        </Button>
      </form>
    </>
  );
}
