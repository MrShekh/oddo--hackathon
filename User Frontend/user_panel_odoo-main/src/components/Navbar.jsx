import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user }) => {
  const location = useLocation();
  const isInProfile = location.pathname === '/profile';

  return (
    <nav className="navbar">
      <div className="navbar-logo">Skill Swap Platform</div>
      {user && user.photo ? (
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>
          <Link to="/" className="navbar-link" style={{
            color: 'var(--accent)', 
            textDecoration: 'none', 
            fontWeight: 600, 
            fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap'
          }}>Home</Link>
          <Link to="/my-swaps" className="navbar-link" style={{
            color: 'var(--accent)', 
            textDecoration: 'none', 
            fontWeight: 600, 
            fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap'
          }}>My Swaps</Link>
          <Link to="/profile" className="navbar-profile-pic">
            <img src={user.photo} alt={user.name} />
          </Link>
        </div>
      ) : (
        <Link to="/login" className="navbar-login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar; 