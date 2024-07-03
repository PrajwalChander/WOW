// src/components/WorkerDashboard/WorkerProfile.jsx
import React from 'react';
import { useAuth } from '../../AuthContext';
import NavBarWorker from './NavBarWorker';
import './WorkerProfile.css';

const WorkerProfile = () => {
  const { currentUser } = useAuth();


  return (
    <div>
      <NavBarWorker />
      <div className="worker-profile">
        <h1>Profile</h1>
        <div className="profile-card">
          <p><strong>Name:</strong> {currentUser.username || 'N/A'}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Location:</strong> {currentUser.location || 'N/A'}</p>
          <p><strong>Role:</strong> {currentUser.roles || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
