'use client';

import { useCart } from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { type StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import CheckoutForm from './CheckoutForm';
import Button from '../components/Button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const isCallLoading = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // create a pymentintent as soon as the page loads
    if (cartProducts != null && !isCallLoading.current) {
      isCallLoading.current = true;
      setLoading(true);
      setError(false);
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then(async (response) => {
          if (response.status === 401) {
            router.push('/login');
          }

          const data = await response.json();
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })

        .catch((error) => {
          setError(true);
          console.error('Error', error);
          toast.error('Something went wrong');
        })

        .finally(() => {
          isCallLoading.current = false;
          setLoading(false);
        });
    }
  }, [cartProducts]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className='w-full'>
      {clientSecret != null &&
        clientSecret.length > 0 &&
        cartProducts != null && (
          <Elements options={options} stripe={stripePromise} key={clientSecret}>
            <CheckoutForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        )}
      {loading && <div className='text-center'>Loading Checkout...</div>}
      {error && (
        <div className='text-center text-rose-500'>Something went wrong...</div>
      )}
      {paymentSuccess && (
        <div className='flex flex-col items-center gap-4'>
          <div className='text-center text-teal-500'>Payment Success</div>
          <div className='w-full max-w-[220px]'>
            <Button
              label='View Your Orders'
              onClick={() => {
                router.push('/orders');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
