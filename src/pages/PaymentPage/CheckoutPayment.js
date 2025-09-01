import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/features/cart';
import { createOrderRequest } from '../../utils/order-util';
import { setLoading } from '../../store/features/common';
import { placeOrderAPI } from '../../api/order';
import { set } from 'lodash';

const CheckoutForm = ({userId, addressId}) => {

  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderResponse, setOrderResponse] = useState();

  const handleSubmit = useCallback((event) => {
    event?.preventDefault();

    const orderRequest = createOrderRequest(cartItems, userId, addressId);
    console.log('Order Request:', orderRequest);
    dispatch(setLoading(true));
    setOrderResponse({});

    if (elements) {
      placeOrderAPI(orderRequest).then(async response => {
        setOrderResponse(response);
        stripe.confirmPayment({
          elements,
          clientSecret: response?.credentials?.client_secret,

          confirmParams: {
            payment_method: 'pm_card-visa',
            return_url: 'https://localhost:3000/conformPayment'
          }
        }).then(response => {
          console.log('Payment response:', response);
      }).catch(error => {
        console.error('Error placing order:', error);
        setError('Failed to place order. Please try again.');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    });
  }
  }, [addressId, cartItems, userId]);

  return (
    <form className='items-center p-2 mt-4 w-[320px] h-[320px]' onSubmit={handleSubmit}>
        <PaymentElement/>
        <button type='submit' disabled={!stripe} className='w-[150px] items-center h-[48px] bg-black border rounded-lg mt-4 text-white hover:bg-gray-800'>Pay Now</button>
    </form>
  )
}

export default CheckoutForm;
