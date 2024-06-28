// src/components/UserDashboard/Profile.jsx
import React from 'react';
import { useAuth } from '../../AuthContext';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile">
      <div className="profile-card">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {currentUser.currentUser || 'N/A'}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Address:</strong> {currentUser.location || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Profile;
