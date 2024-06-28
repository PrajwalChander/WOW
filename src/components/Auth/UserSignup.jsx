// src/components/UserSignup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import './AuthForm.css';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    location: ''
  });

  const { email, password, username, phone, location } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if document creation is successful
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        username,
        phone,
        location
      });

      alert('Successfully Signed Up');
      navigate('/login');
    } catch (err) {
      console.error('Error during sign up:', err);
      alert('Error during sign up');
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>User Sign Up</h2>
        <input type="text" name="username" value={username} onChange={onChange} required placeholder="Username" />
        <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
        <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
        <input type="text" name="phone" value={phone} onChange={onChange} required placeholder="Phone" />
        <input type="text" name="location" value={location} onChange={onChange} required placeholder="Location" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignup;
