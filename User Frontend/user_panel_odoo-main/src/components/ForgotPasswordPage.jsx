import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: new password
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Check if user exists with this email
    const storedUser = localStorage.getItem('skillSwapUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === email) {
        setStep(2);
        setMessage('Email verified! Please enter your new password.');
      } else {
        setError('No account found with this email address.');
      }
    } else {
      setError('No account found with this email address.');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Update the user's password
    const storedUser = localStorage.getItem('skillSwapUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const updatedUser = { ...userData, password: newPassword };
      localStorage.setItem('skillSwapUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
  };

  return (
    <div className="auth-page-bg">
      <div className="full-modal-content">
        <h2>Reset Password</h2>
        
        {step === 1 ? (
          <form className="login-form" onSubmit={handleEmailSubmit} autoComplete="off">
            <p style={{ color: '#bdbdbd', marginBottom: 24, textAlign: 'center' }}>
              Enter your email address to reset your password.
            </p>
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required 
            />
            <button type="submit" className="login-submit">Verify Email</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handlePasswordReset} autoComplete="off">
            <p style={{ color: '#bdbdbd', marginBottom: 24, textAlign: 'center' }}>
              Enter your new password.
            </p>
            <label>New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password" 
              required 
            />
            <label>Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password" 
              required 
            />
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button type="button" className="login-submit" style={{ background: '#444', flex: 1 }} onClick={handleBackToEmail}>
                Back
              </button>
              <button type="submit" className="login-submit" style={{ flex: 1 }}>
                Reset Password
              </button>
            </div>
          </form>
        )}

        {error && (
          <div style={{ 
            background: '#FF4444', 
            color: 'white', 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginTop: 16,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ 
            background: '#00B3A4', 
            color: 'white', 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginTop: 16,
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <div className="login-links">
          <span className="signup-link">
            Remember your password? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 