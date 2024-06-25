// src/components/UserLogin.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './AuthForm.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error('Not a user');
      }

      alert('Successfully Logged In');
      navigate('/userdashboard');
    } catch (err) {
      console.error('Invalid Credentials:', err);
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
