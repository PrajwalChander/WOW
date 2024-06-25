import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Work On Wheels</h1>
      <div className="buttons-container">
        <Link to="/userlogin" className="btn">User</Link>
        <Link to="/workerlogin" className="btn">Worker</Link>
      </div>
    </div>
  );
};

export default Home;
