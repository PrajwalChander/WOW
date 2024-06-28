// src/components/UserDashboard/WorkerDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import './WorkerDetails.css';

const WorkerDetails = () => {
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      const docRef = doc(db, 'workers', workerId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWorker(docSnap.data());
      } else {
        console.log('No such worker!');
      }
      setLoading(false);
    };

    fetchWorkerDetails();
  }, [workerId]);

  const handleBooking = async () => {
    if (!selectedRole) {
      alert('Please select a role before booking.');
      return;
    }

    try {
      const q = query(
        collection(db, 'bookings'),
        where('user_email', '==', currentUser.email),
        where('worker_email', '==', worker.email),
        where('role', '==', selectedRole)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('You have already booked this worker for the selected role.');
        return;
      }

      await addDoc(collection(db, 'bookings'), {
        user_email: currentUser.email,
        worker_email: worker.email,
        role: selectedRole,
        timestamp: new Date()
      });

      alert('Booking confirmed');
      navigate('/user/bookings');
    } catch (error) {
      console.error('Error booking worker:', error);
      alert('Error booking worker');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="worker-details">
      {worker ? (
        <div className="worker-details-card">
          <h2>{worker.username}</h2>
          <p>Phone: {worker.phone}</p>
          <p>Email: {worker.email}</p>
          <p>Rating: {worker.rating}</p>
          <p>Roles:</p>
          <div className="roles">
            {worker.roles.map((role, index) => (
              <button
                key={index}
                className={`role-button ${selectedRole === role ? 'selected' : ''}`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
          <button className="book-button" onClick={handleBooking}>Book</button>
        </div>
      ) : (
        <p>Worker not found.</p>
      )}
    </div>
  );
};

export default WorkerDetails;
