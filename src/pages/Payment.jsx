import CheckoutForm from '@/components/Payment/CheckoutForm';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCart from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_paymentPublic);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();

  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      const { data } = await axiosSecure.post(
        `/payments/create-payment-intent`,
        cart
      );
      setClientSecret(data?.data);
    })();
  }, [cart]);

  return (
    <>
      {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}
