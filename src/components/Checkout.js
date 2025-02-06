import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Checkout.css'; // Optional: Add styles for the checkout page

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart items when the component loads
  useEffect(() => {
    axios
      .get('http://localhost:8083/cart/1') // Replace with dynamic userId if available
      .then((response) => {
        setCartItems(response.data.items);
        setTotalAmount(response.data.totalAmount);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  // Handle order submission
  const handleCheckout = () => {
    setLoading(true);
    axios
      .post('http://localhost:8084/orders', {
        userId: 1, // Replace with dynamic userId if available
        cartItems,
        totalAmount,
      })
      .then((response) => {
        setLoading(false);
        alert('Order placed successfully! Order ID: ' + response.data.orderId);
        setCartItems([]);
        setTotalAmount(0);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again later.');
      });
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.productId}>
                <h4>{item.productName}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </li>
            ))}
          </ul>
          <h3>Total Amount: ${totalAmount}</h3>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      ) : (
        <p>Your cart is empty. Add some products to proceed.</p>
      )}
    </div>
  );
};

export default Checkout;
