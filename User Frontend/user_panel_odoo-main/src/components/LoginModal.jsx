import React from 'react';

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay full-page-modal">
      <div className="modal-content full-modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Login to Skill Swap Platform</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
          <button type="submit" className="login-submit">Login</button>
        </form>
        <div className="login-links">
          <a href="#" className="forgot-link">Forgot password?</a>
          <span className="signup-link">Don't have an account? <a href="#">Sign up</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 