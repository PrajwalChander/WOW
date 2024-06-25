import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to WorkOnWheels</h1>
      <div className="role-selection">
        <Link to="/login" className="role-button">Login as User</Link>
        <Link to="/workerlogin" className="role-button">Login as Worker</Link>
        <Link to="/usersignup" className="role-button">Sign Up as User</Link>
        <Link to="/workersignup" className="role-button">Sign Up as Worker</Link>
      </div>
    </div>
  );
};

export default Home;
