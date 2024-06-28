// src/components/UserDashboard/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const { currentUser } = useAuth();
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserLocation(userDoc.data().location);
          } else {
            console.error('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
        }
      }
    };

    fetchUserLocation();
  }, [currentUser]);

  useEffect(() => {
    const fetchWorkers = async () => {
      if (userLocation) {
        try {
          const q = query(collection(db, 'workers'), where('location', '==', userLocation));
          const querySnapshot = await getDocs(q);
          const workersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setWorkers(workersList);
        } catch (error) {
          console.error('Error fetching workers:', error);
        }
      }
    };

    fetchWorkers();
  }, [userLocation]);

  return (
    <div>
      <nav className="navbar">
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
      <div className="home">
        <h1>Available Workers in Your Location</h1>
        <div className="worker-list">
          {workers.map((worker) => (
            <div key={worker.id} className="worker-card">
              <h2>{worker.username}</h2>
              <p>Roles: {worker.roles.join(', ')}</p>
              <p>Phone: {worker.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
