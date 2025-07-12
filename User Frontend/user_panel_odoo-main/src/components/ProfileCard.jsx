import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, onUserClick, clickable, user }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Check if user is actually logged in
  const isLoggedIn = !!user;

  const handleCardClick = () => {
    if (clickable && onUserClick) {
      onUserClick();
    }
  };

  const handleRequest = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 1200);
    } else {
      // Navigate directly to swap request page
      navigate(`/swap-request/${profile.id}`);
    }
  };

  // Create star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#FFD700', fontSize: '1.1rem' }}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#FFD700', fontSize: '1.1rem' }}>☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: '#666', fontSize: '1.1rem' }}>☆</span>);
    }
    
    return stars;
  };

  return (
    <div
      className={`profile-card${clickable ? ' profile-card-clickable' : ''}`}
      onClick={handleCardClick}
      style={clickable ? { cursor: 'pointer' } : {}}
    >
      <div className="profile-photo">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} />
        ) : (
          <span>Profile Photo</span>
        )}
      </div>
      <div className="profile-info">
        <div className="profile-name">{profile.name}</div>
        <div className="profile-skills">
          <span className="skills-offered">Skills Offered =&gt; </span>
          {profile.skillsOffered.map(skill => (
            <span className="skill-badge" key={skill}>{skill}</span>
          ))}
        </div>
        <div className="profile-skills">
          <span className="skills-wanted">Skill wanted =&gt; </span>
          {profile.skillsWanted.map(skill => (
            <span className="skill-badge wanted" key={skill}>{skill}</span>
          ))}
        </div>
        <div className="profile-rating">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={{ color: '#FFD700', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {renderStars(profile.rating)}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600' }}>
              {profile.rating}/5
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="request-btn" onClick={handleRequest}>Request</button>
      </div>
      {showPopup && (
        <div className="login-popup">Please login first.</div>
      )}
    </div>
  );
};

export default ProfileCard; 