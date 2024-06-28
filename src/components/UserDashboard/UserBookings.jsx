// src/components/UserDashboard/UserBookings.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Bookings.css';

const UserBookings = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('user_email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsList);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  return (
    <div class="bookings">
      <h2>Your Bookings</h2>
      <div class="booking-card">
        {bookings.map((booking) => (
          <div key={booking.id}>
            <h3>Worker: {booking.worker_email}</h3>
            <p>Role: {booking.role}</p>
            <p>Booked On: {new Date(booking.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
