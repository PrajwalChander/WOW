// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import WorkerLogin from './components/WorkerLogin';
import WorkerSignup from './components/WorkerSignup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/workerlogin" element={<WorkerLogin />} />
          <Route path="/workersignup" element={<WorkerSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
