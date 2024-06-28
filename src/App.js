// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserSignup from './components/Auth/UserSignup';
import WorkerSignup from './components/Auth/WorkerSignup';
import UserLogin from './components/Auth/UserLogin';
import WorkerLogin from './components/Auth/WorkerLogin';
import UserDashboard from './components/UserDashboard/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard/WorkerDashboard';
import WorkerDetails from './components/UserDashboard/WorkerDetails';
import UserProfile from './components/UserDashboard/UserProfile';
import UserBookings from './components/UserDashboard/UserBookings';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/workersignup" element={<WorkerSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/workerlogin" element={<WorkerLogin />} />
          <Route
            path="/user/home"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workerdashboard"
            element={
              <ProtectedRoute>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/worker/:workerId"
            element={
              <ProtectedRoute>
                <WorkerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/bookings"
            element={
              <ProtectedRoute>
                <UserBookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
