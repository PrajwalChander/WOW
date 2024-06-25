import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/Auth/UserLogin';
import UserSignup from './components/Auth/UserSignup';
import WorkerLogin from './components/Auth/WorkerLogin';
import WorkerSignup from './components/Auth/WorkerSignup';
import UserDashboard from './components/UserDashboard/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard/WorkerDashboard';
import Home from './components/Home';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/workerlogin" element={<WorkerLogin />} />
          <Route path="/workersignup" element={<WorkerSignup />} />
          <Route
            path="/user/home"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker/home"
            element={
              <ProtectedRoute>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
