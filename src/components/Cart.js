// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8083/cart/1')
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data', error);
      });
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <h3>{item.productName}</h3>
          <p>{item.quantity} x {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
