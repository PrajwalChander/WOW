import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo4hyjYmPDYqOrCY8sJEshp9Gybduz7aA', {
        email,
        password,
        returnSecureToken: true
      });
      console.log(res.data);
      alert('Successfully Logged In');
      // Store token and navigate to dashboard
      localStorage.setItem('token', res.data.idToken);
      navigate('/user/home');
    } catch (err) {
      console.error(err);
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>User Login</h2>
        <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
        <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
        <button type="submit">Login</button>
        <p>New User? <a href="/usersignup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default UserLogin;
