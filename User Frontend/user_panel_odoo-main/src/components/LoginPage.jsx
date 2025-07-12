import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get stored user data
    const storedUser = localStorage.getItem('skillSwapUser');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      
      // Check if email and password match
      if (userData.email === email && userData.password === password) {
        setUser(userData);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('No user account found. Please sign up first.');
    }
  };

  return (
    <div className="auth-page-bg">
      <div className="full-modal-content">
        <h2>Login to Skill Swap Platform</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          {error && (
            <div style={{
              color: '#FF4444',
              fontSize: '0.9rem',
              marginBottom: '16px',
              textAlign: 'center',
              padding: '8px',
              background: 'rgba(255, 68, 68, 0.1)',
              borderRadius: '8px'
            }}>
              {error}
            </div>
          )}
          <button type="submit" className="login-submit">Login</button>
        </form>
        <div className="login-links">
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          <span className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 