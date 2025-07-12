import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ProfileList from './components/ProfileList';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ProfilePage from './components/ProfilePage';
import UserProfilePage from './components/UserProfilePage';
import SwapRequestPage from './components/SwapRequestPage';
import MySwapsPage from './components/MySwapsPage';
import { mockProfiles } from './components/ProfileList';

const Home = ({ user, profiles, setProfiles }) => (
  <div className="container">
    <SearchBar />
    <ProfileList user={user} profiles={profiles} setProfiles={setProfiles} />
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState(mockProfiles);

  useEffect(() => {
    // On mount, check if user is logged in
    const storedUser = localStorage.getItem('skillSwapUser');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    // Load profiles from localStorage
    const storedProfiles = localStorage.getItem('skillSwapProfiles');
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    } else {
      // Initialize with mock profiles if none exist
      localStorage.setItem('skillSwapProfiles', JSON.stringify(mockProfiles));
    }
  }, []);

  return (
    <Router>
      <div className="main-bg">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} profiles={profiles} setProfiles={setProfiles} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage setUser={setUser} />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
          <Route path="/my-swaps" element={<MySwapsPage user={user} />} />
          <Route path="/user/:id" element={<UserProfilePage profiles={profiles} user={user} setUser={setUser} setProfiles={setProfiles} />} />
          <Route path="/swap-request/:id" element={<SwapRequestPage user={user} profiles={profiles} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 