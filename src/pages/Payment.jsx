import CheckoutForm from '@/components/Payment/CheckoutForm';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCart from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_paymentPublic);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('');
  const [payableAmount, setPayableAmount] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { cart } = useCart();

  console.log(cart);

  useEffect(() => {
    const paymentIntentId = localStorage.getItem('paymentIntentId');

    const handlePaymentIntent = async () => {
      if (!paymentIntentId) {
        const { data } = await axiosSecure.post(
          `/payments/create-payment-intent`,
          cart
        );
        setClientSecret(data?.data?.clientSecret);
        setPayableAmount(data?.data?.amount);
        localStorage.setItem('paymentIntentId', data?.data?.paymentIntentId);
      } else {
        const { data } = await axiosSecure.get(
          `/payments/retrieve-payment-intent/${paymentIntentId}`
        );
        setClientSecret(data?.data?.clientSecret);
        setPayableAmount(data?.data?.amount);
      }
    };
    handlePaymentIntent();
  }, [cart, axiosSecure]);

  return (
    <>
      {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} amount={payableAmount} />
        </Elements>
      )}
    </>
  );
}
