import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import CheckoutForm from './CheckoutPayment'
import { loadStripe } from '@stripe/stripe-js';

console.log('Stripe key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // should print your key

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = (props) => {

    const options = {
        mode: 'payment',
        amount: 10,
        currency: 'usd',
        appearance: {
            theme: 'flat',
        },
    }
  return (
    <div>
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm {...props} />
        </Elements>
      
    </div>
  )
}

export default PaymentPage
