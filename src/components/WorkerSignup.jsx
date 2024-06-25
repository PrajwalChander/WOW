// src/components/WorkerSignup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import './AuthForm.css';

const WorkerSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phn: '',
    password: ''
  });

  const { username, email, phn, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'workers'), {
        uid: user.uid,
        username,
        email,
        phn
      });

      alert('Successfully Registered');
    } catch (err) {
      console.error('Error Signing Up:', err);
      alert('Error Signing Up');
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>Worker Sign Up</h2>
        <input type="text" name="username" value={username} onChange={onChange} required placeholder="Username" />
        <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
        <input type="text" name="phn" value={phn} onChange={onChange} required placeholder="Phone Number" />
        <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default WorkerSignup;
