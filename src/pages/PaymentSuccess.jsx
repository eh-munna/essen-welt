import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useCart from '@/hooks/useCart';
import useCustomer from '@/hooks/useCustomer';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_paymentPublic);

export function PaymentSuccessContent() {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentIntent, setPaymentIntent] = useState({
    amount: 0,
    status: '',
  });
  const [orderCreated, setOrderCreated] = useState(false);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const paymentIntentClientSecret = searchParams.get(
          'payment_intent_client_secret'
        );

        if (!paymentIntentClientSecret || !stripe) {
          setLoading(false);
          return;
        }

        const { paymentIntent, error } = await stripe.retrievePaymentIntent(
          paymentIntentClientSecret
        );

        if (error) {
          toast.error(error.message);
        } else {
          setPaymentIntent(paymentIntent);
          if (paymentIntent?.status === 'succeeded') {
            toast.success('Payment successful!');
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to verify payment. Please try again.');
      } finally {
        setLoading(false);
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
            items: cart?.map((item) => ({
              itemId: item?.itemId,
              quantity: item?.quantity,
              priceAtOrder: item?.price,
              itemName: item?.name,
            })),
            totalPrice: totalAmount,
            paymentMethod:
              paymentIntent?.payment_method_types?.[0] || 'unknown-method',
            paymentIntentId: paymentIntent?.id,
          };

          const response = await axiosSecure.post('/orders', order);

          if (response?.status === 409) {
            toast.error('Order already exists for these items');
            return;
          }

          setOrderCreated(true);
          toast.success('Order created successfully!');
          refetch();
        } catch (error) {
          console.error(error);
          toast.error('Failed to create order. Please contact support.');
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
        <p className="text-lg text-gray-600">Verifying your payment...</p>
      </div>
    );
  }

  if (!paymentIntent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Clock className="w-12 h-12 text-orange-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Payment Processing
        </h2>
        <p className="text-gray-600 mb-6">Your payment is being processed</p>
        <Link to="/dashboard/my-orders">
          <Button variant="outline">Check Your Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-[80px] pb-12 min-h-[75vh]">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        <div className="flex flex-col items-center text-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">Thank you for your order</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium text-gray-900">
                  €{(paymentIntent.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {paymentIntent.payment_method_types?.[0] || 'Card'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium text-gray-900 break-all">
                  {paymentIntent.id}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Next Steps</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                You'll receive an order confirmation email shortly
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Your order is being prepared
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Contact us if you have any questions
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/dashboard/my-orders" className="w-full sm:w-auto">
            <Button className="w-full py-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full">
              View Your Orders
            </Button>
          </Link>
          <Link to="/menu" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full py-6 border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white rounded-full"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="/contact" className="text-orange-500 hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PaymentSuccess() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSuccessContent />
    </Elements>
  );
}

// import useAxiosSecure from '@/hooks/useAxiosSecure';
// import useCart from '@/hooks/useCart';
// import useCustomer from '@/hooks/useCustomer';
// import { Elements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useEffect, useMemo, useState } from 'react';
// import toast from 'react-hot-toast';
// import { Link, useSearchParams } from 'react-router-dom';
// const stripePromise = loadStripe(import.meta.env.VITE_paymentPublic);
// export function PaymentSuccessContent() {
//   const [searchParams] = useSearchParams();
//   const axiosSecure = useAxiosSecure();
//   const [paymentIntent, setPaymentIntent] = useState({
//     amount: 0,
//   });

//   const [orderCreated, setOrderCreated] = useState(false);

//   const { cart, refetch } = useCart();
//   const { customer } = useCustomer();

//   const stripe = useStripe();

//   const totalAmount = useMemo(
//     () => cart?.reduce((total, item) => total + item?.totalPrice, 0),
//     [cart]
//   );

//   useEffect(() => {
//     const retrievePaymentIntent = async () => {
//       try {
//         const paymentIntentClientSecret = searchParams.get(
//           'payment_intent_client_secret'
//         );

//         if (!paymentIntentClientSecret || !stripe) {
//           return;
//         }

//         const { paymentIntent, error } = await stripe.retrievePaymentIntent(
//           paymentIntentClientSecret
//         );
//         setPaymentIntent(paymentIntent);

//         if (paymentIntent?.status === 'succeeded') {
//           toast.success(`Payment is successful`);
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error(`Failed to create order. Please try again.`);
//       }
//     };
//     retrievePaymentIntent();
//   }, [stripe, searchParams]);

//   useEffect(() => {
//     if (
//       paymentIntent?.status === 'succeeded' &&
//       cart?.length > 0 &&
//       customer?._id &&
//       !orderCreated
//     ) {
//       const createOrder = async () => {
//         try {
//           const order = {
//             customer: customer?._id,
//             items: cart?.map((item) => {
//               return {
//                 itemId: item?.itemId,
//                 quantity: item?.quantity,
//                 priceAtOrder: item?.price,
//               };
//             }),
//             totalPrice: totalAmount,
//             paymentMethod:
//               paymentIntent?.payment_method_types?.[0] || 'unknown-method',
//             paymentIntentId: paymentIntent?.id,
//           };
//           const response = await axiosSecure.post(`/orders`, order);
//           if (response?.status === 409) {
//             toast.error(
//               `An order with the same items and customer has already been created. Please try again.`
//             );
//             return;
//           }
//           setOrderCreated(true);
//           toast.success(`Order created successfully!`);
//           if (response.status === 201) {
//             refetch();
//           }
//         } catch (error) {
//           console.error(error);
//           toast.error(`Failed to create order. Please try again.`);
//         }
//       };

//       createOrder();

//       localStorage.removeItem('paymentIntentId');
//     }
//   }, [
//     paymentIntent,
//     cart,
//     customer,
//     axiosSecure,
//     orderCreated,
//     refetch,
//     totalAmount,
//   ]);

//   const { amount } = paymentIntent;

//   if (!paymentIntent) {
//     return (
//       <>
//         <div>Loading...</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <section className="py-8">
//         <div className="space-y-3 pb-3">
//           <h1 className="text-2xl">Payment successful!</h1>
//           <p>Your payment of {amount / 100} EUR has been successful.</p>
//           <p>Your transaction ID is: {searchParams.get('payment_intent')}</p>
//         </div>

//         <Link
//           className="bg-green-400 text-gray-900 px-2 py-1 rounded-md mt-4"
//           to={`/dashboard/my-orders`}
//         >
//           See Your Orders
//         </Link>
//       </section>
//     </>
//   );
// }

// export default function PaymentSuccess() {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentSuccessContent />
//     </Elements>
//   );
// }
