import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/user/home">Home</Link></li>
          <li><Link to="/user/bookings">Bookings</Link></li>
          <li><Link to="/user/store">Store</Link></li>
          <li><Link to="/user/contact">Contact Us</Link></li>
          <li><Link to="/user/profile">Profile</Link></li>
          <li><Link to="/user/cart">Cart</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>
      <h1>Welcome to User Dashboard</h1>
    </div>
  );
};

export default UserDashboard;
