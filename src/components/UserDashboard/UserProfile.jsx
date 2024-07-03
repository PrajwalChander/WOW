import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import './Profile.css';
import NavBar from './NavBar';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({ username: 'NA', location: 'NA', email: 'NA' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setProfileData(userDoc.data());
          } else {
            console.error('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };


    fetchUserProfile();
  }, [currentUser]);

  return (
    <div>
    <NavBar />
    <div class='profile'> 
      <div className="profile-card">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {profileData.username || 'NA'}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Address:</strong> {profileData.location || 'NA'}</p>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
