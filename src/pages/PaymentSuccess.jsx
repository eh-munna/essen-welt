import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCart from '@/hooks/useCart';
import useCustomer from '@/hooks/useCustomer';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_paymentPublic);
export function PaymentSuccessContent() {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentIntent, setPaymentIntent] = useState({
    amount: 0,
  });

  const [orderCreated, setOrderCreated] = useState(false);

  const { cart, refetch } = useCart();
  const { customer } = useCustomer();

  const stripe = useStripe();

  const totalAmount = useMemo(
    () => cart?.reduce((total, item) => total + item?.totalPrice, 0),
    [cart]
  );

  useEffect(() => {
    const retrievePaymentIntent = async () => {
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

        if (paymentIntent?.status === 'succeeded') {
          toast.success(`Payment is successful`);
        }
      } catch (error) {
        console.error(error);
        toast.error(`Failed to create order. Please try again.`);
      }
    };
    retrievePaymentIntent();
  }, [stripe, searchParams]);

  useEffect(() => {
    if (
      paymentIntent?.status === 'succeeded' &&
      cart?.length > 0 &&
      customer?._id &&
      !orderCreated
    ) {
      const createOrder = async () => {
        try {
          const order = {
            customer: customer?._id,
            items: cart?.map((item) => {
              return {
                itemId: item?.itemId,
                quantity: item?.quantity,
                priceAtOrder: item?.price,
              };
            }),
            totalPrice: totalAmount,
            paymentMethod:
              paymentIntent?.payment_method_types?.[0] || 'unknown-method',
            paymentIntentId: paymentIntent?.id,
          };
          const response = await axiosSecure.post(`/orders`, order);
          if (response?.status === 409) {
            toast.error(
              `An order with the same items and customer has already been created. Please try again.`
            );
            return;
          }
          setOrderCreated(true);
          toast.success(`Order created successfully!`);
          if (response.status === 201) {
            // await axiosSecure.delete(`/carts?id=${customer?._id}`);
          }
          // refetch();
        } catch (error) {
          console.error(error);
          toast.error(`Failed to create order. Please try again.`);
        }
      };

      createOrder();

      localStorage.removeItem('paymentIntentId');
    }
  }, [
    paymentIntent,
    cart,
    customer,
    axiosSecure,
    orderCreated,
    refetch,
    totalAmount,
  ]);

  const { amount } = paymentIntent;

  if (!paymentIntent) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <section className="py-8">
        <div className="space-y-3 pb-3">
          <h1 className="text-2xl">Payment successful!</h1>
          <p>Your payment of {amount / 100} EUR has been successful.</p>
          <p>Your transaction ID is: {searchParams.get('payment_intent')}</p>
        </div>

        <Link
          className="bg-green-400 text-gray-900 px-2 py-1 rounded-md mt-4"
          to={`/orders`}
        >
          See Your Orders
        </Link>
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
