import React from 'react';
import { Link } from 'react-router-dom';
//import './Header.css'; // Optional: Add styles for your header component

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Vamika Store</h1>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
