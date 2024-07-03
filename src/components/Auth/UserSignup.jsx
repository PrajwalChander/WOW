import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { cities } from './Cities';
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
    if (!cities.includes(location)) {
      alert('Please select a valid city from the list');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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

  const handleLocationChange = e => {
    setFormData({ ...formData, location: e.target.value });
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="container">
      <div className="navbar">
        <a href="/usersignin">User</a>
        <a href="/workersignin">Worker</a>
      </div>
      <form onSubmit={onSubmit}>
        <h2>User Sign Up</h2>
        <input type="text" name="username" value={username} onChange={onChange} required placeholder="Username" />
        <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
        <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
        <input type="text" name="phone" value={phone} onChange={onChange} required placeholder="Phone" />
        <div className="location-wrapper">
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleLocationChange}
            required
            placeholder="Enter your location"
            autoComplete="off"
          />
          {location && (
            <ul className="location-dropdown">
              {filteredCities.map(city => (
                <li key={city} onClick={() => setFormData({ ...formData, location: city })}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignup;
