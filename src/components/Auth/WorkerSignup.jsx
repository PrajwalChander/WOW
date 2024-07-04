import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { cities } from './Cities';
import styles from './AuthForm.module.css';

const WorkerSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    location: '',
    roles: ''
  });
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const { email, password, username, phone, location, roles } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!cities.includes(location)) {
      setIsLocationValid(false);
      return;
    }
    setIsLocationValid(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'workers', user.uid), {
        uid: user.uid,
        email,
        username,
        phone,
        location,
        roles: roles.split(',').map(role => role.trim())
      });

      alert('Successfully Signed Up');
      navigate('/workerlogin');
    } catch (err) {
      console.error('Error during sign up:', err);
      alert('Error during sign up');
    }
  };

  const handleLocationChange = e => {
    setFormData({ ...formData, location: e.target.value });
    setShowDropdown(true);
  };

  const handleLocationSelect = city => {
    setFormData({ ...formData, location: city });
    setShowDropdown(false);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div class={styles.body}>
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Worker Sign Up</h2>
        <input type="text" name="username" value={username} onChange={onChange} required placeholder="Username" />
        <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
        <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
        <input type="text" name="phone" value={phone} onChange={onChange} required placeholder="Phone" />
        <div className={styles.locationWrapper}>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleLocationChange}
            className={isLocationValid ? '' : styles.invalid}
            required
            placeholder="Enter your location"
            autoComplete="off"
          />
          {location && showDropdown && (
            <ul className={styles.locationDropdown}>
              {filteredCities.map(city => (
                <li key={city} onClick={() => handleLocationSelect(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type="text" name="roles" value={roles} onChange={onChange} required placeholder="Roles (comma separated)" />
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </div></div>
  );
};

export default WorkerSignup;
