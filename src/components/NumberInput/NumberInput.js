import { set } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'

export const NumberInput = ({quantity, max=1, min=1}) => {

  const [value, setValue] = useState(quantity ?? 1);
  const [message, setMessage] = useState('');

  const displayMaxStock = useCallback(() => {
    setMessage(`Sorry, we have limited quantity available for this product. Maximum quantity available is ${max}`);
    
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [max]);

  const displayMinQuantity = useCallback(() => {
    setMessage(`Atleast ${min} quantity is required.`);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [min]);

  const onIncreaseQuantity = useCallback(() => {
    if (value < max) {
      setValue(prev => prev + 1);
    } else {
      displayMaxStock();
    }
  }, [value, max, displayMaxStock]);

  const onReduceQuantity = useCallback(() => {
    if (value > min) {
      setValue(prev => prev - 1);
    }
    else {
      displayMinQuantity();
    }
  }, [value, min, displayMinQuantity]);

  return (
    <>
    <div className="flex justify-center items-center">
        <button type="button" id="decrement-button"
         className="bg-gray-500 w-10 hover:bg-gray-600 border border-gray-300 rounded-s-lg p-3 h-11
          focus:ring-gray-100 focus:ring-2 focus:outline-none" onClick={onReduceQuantity}>
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        </button>
        <input type="text" name='quantity' value={value} disabled id="quantity-input" aria-describedby="helper-text-explanation"
         className="bg-gray-200 border-x-0 w-12 border-gray-300
          h-11 text-center text-gray-900 text-sm block py-2.5 focus:outline-none" placeholder="0" required />
        <button type="button" id="increment-button" onClick={onIncreaseQuantity}
         className="bg-gray-500 w-10 hover:bg-gray-600 border border-gray-300 rounded-e-lg p-3 h-11
         focus:ring-gray-100 focus:ring-2 focus:outline-none">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
        
    </div>
    {message && <p className='text-sm text-center pt-2 text-red-600'>{message}</p>}
    </>
  )
}


