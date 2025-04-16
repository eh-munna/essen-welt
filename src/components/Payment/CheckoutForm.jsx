import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({ clientSecret, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      setIsLoading(true);
      setMessage(null);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://essen-welt.vercel.app/payment-success?payment_intent={PAYMENT_INTENT_ID}`,
        },
        // redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent?.status === 'succeeded') {
        navigate('/payment-success', { state: { paymentIntent } });
      } else {
        setMessage('Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-sm md:max-w-lg mx-auto px-4 sm:px-6 py-8 pt-[72px] min-h-[75vh]">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-2xl font-bold text-[#131313] text-center">
            Secure Checkout
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            Complete your payment details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Element Container */}
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <PaymentElement />
            </div>

            {/* Display error message if any */}
            {message && (
              <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg">
                {message}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Total:</span>
              <span className="text-xl font-bold text-orange-500">
                €{(amount / 100).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            type="submit"
            className={cn(
              'w-full py-6 rounded-full bg-orange-500 hover:bg-orange-600',
              'text-white font-medium text-lg shadow-md transition-all duration-200',
              'disabled:bg-orange-400 disabled:cursor-not-allowed',
              'transform hover:scale-[1.02] active:scale-[0.98]'
            )}
            disabled={isLoading || !stripe || !elements}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Payment...
              </div>
            ) : (
              `Pay €${(amount / 100).toFixed(2)}`
            )}
          </Button>

          {/* Security Assurance */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="h-4 w-4 text-green-500" />
              <span>256-bit SSL secured payment</span>
            </div>
            <p className="text-xs text-gray-400">
              Your payment information is processed securely. We do not store
              your card details.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
