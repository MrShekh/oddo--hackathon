import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample reviews data (in a real app, this would come from a backend)
const sampleReviews = [
  {
    reviewer: 'Priya Patel',
    stars: 5,
    comment: 'Great to work with! Very knowledgeable and helpful.'
  },
  {
    reviewer: 'John Doe',
    stars: 4,
    comment: 'Good communication and delivered as promised.'
  },
  {
    reviewer: 'Anna Smith',
    stars: 5,
    comment: 'Amazing experience, learned a lot! Highly recommend.'
  },
  {
    reviewer: 'Carlos Ruiz',
    stars: 3,
    comment: 'Decent skills, but response time could be better.'
  },
  {
    reviewer: 'Sara Lee',
    stars: 4,
    comment: 'Very friendly and professional.'
  }
];

const UserProfilePage = ({ profiles, user, setUser, setProfiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const profileUser = profiles.find(p => p.id == id); // Use loose equality to handle string/number conversion
  
  const [showPopup, setShowPopup] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profileUser || {});
  const fileInputRef = useRef();
  const [imgPreview, setImgPreview] = useState(profileUser?.photo || null);
  
  // Update form when profileUser changes
  useEffect(() => {
    if (profileUser) {
      setForm(profileUser);
      setImgPreview(profileUser.photo || null);
    }
  }, [profileUser]);
  const isLoggedIn = !!localStorage.getItem('skillSwapUser');
  const isOwnProfile = user && profileUser && String(user.id) === String(profileUser.id);

  // Show loading state if profiles are not loaded yet
  if (profiles.length === 0) {
    return (
      <div className="container">
        <div className="full-modal-content">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="container">
        <div className="full-modal-content">
          <h2>User not found</h2>
          <p>Profile ID: {id}</p>
          <p>Available profiles: {profiles.length}</p>
          <p>Profile IDs: {profiles.map(p => p.id).join(', ')}</p>
          <button onClick={() => navigate('/')}>Go Back Home</button>
        </div>
      </div>
    );
  }

  const handleRequest = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    } else {
      navigate(`/swap-request/${profileUser.id}`);
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setForm(profileUser);
    setImgPreview(profileUser.photo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      toDataUrl(file).then(url => {
        setForm(f => ({ ...f, photo: url }));
        setImgPreview(url);
      });
    }
  };

  function toDataUrl(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the profile in the profiles array
    const updatedProfiles = profiles.map(p => 
      String(p.id) === String(profileUser.id) ? form : p
    );
    // Update localStorage with the new profiles
    localStorage.setItem('skillSwapProfiles', JSON.stringify(updatedProfiles));
    // Update the profiles state in the parent component
    setProfiles(updatedProfiles);
    // Update the current user if it's their own profile
    if (isOwnProfile) {
      localStorage.setItem('skillSwapUser', JSON.stringify(form));
      setUser(form);
    }
    setEditing(false);
  };

  // Split skills into arrays for display
  const skillsOffered = (form.skillsOffered || '').split(',').map(s => s.trim()).filter(Boolean);
  const skillsWanted = (form.skillsWanted || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="container" style={{position:'relative'}}>
      <button
        style={{position:'absolute',left:24,top:24,zIndex:2,background:'none',border:'none',color:'var(--accent)',fontSize:'2rem',cursor:'pointer',fontWeight:700}}
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        &#8592;
      </button>
      <div className="full-modal-content">
        <div className="profile-upload center-upload" style={{marginBottom: 0}}>
          <div 
            className="profile-photo signup-photo" 
            onClick={() => editing && fileInputRef.current.click()} 
            style={{cursor: editing ? 'pointer' : 'default'}}
          >
            {imgPreview ? <img src={imgPreview} alt={form.name} /> : <span>+</span>}
          </div>
          {editing && (
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          )}
        </div>
        <h2 style={{marginBottom: 8}}>{form.name}</h2>
        <div style={{color:'#bdbdbd', fontSize:'1.1rem', marginBottom: 18}}>{form.location || 'Unknown location'}</div>
        
        {editing ? (
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off" style={{width:'100%', maxWidth: 480}}>
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Name</label>
            <input type="text" name="name" value={form.name || ''} onChange={handleChange} required />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Location</label>
            <input type="text" name="location" value={form.location || ''} onChange={handleChange} required />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>About</label>
            <textarea name="about" value={form.about || ''} onChange={handleChange} placeholder="Tell us about yourself..." />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Skills Offered</label>
            <input type="text" name="skillsOffered" value={form.skillsOffered || ''} onChange={handleChange} placeholder="e.g. JavaScript, Python" required />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Skills Wanted</label>
            <input type="text" name="skillsWanted" value={form.skillsWanted || ''} onChange={handleChange} placeholder="e.g. Graphic Design, Musician" required />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Availability</label>
            <select name="availability" value={form.availability || ''} onChange={handleChange} required>
              <option value="">Select availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="weekends">Weekends</option>
              <option value="weekdays">Weekdays</option>
            </select>
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Profile Visibility</label>
            <div className="profile-visibility">
              <label><input type="radio" name="visibility" value="public" checked={form.visibility === 'public'} onChange={handleChange} /> Public</label>
              <label><input type="radio" name="visibility" value="private" checked={form.visibility === 'private'} onChange={handleChange} /> Private</label>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop: 32}}>
              <button type="submit" className="login-submit" style={{background:'linear-gradient(90deg, #00B3A4 60%, #1E90FF 100%)', minWidth: 160, fontWeight:800, fontSize:'1.1rem', borderRadius: 14, boxShadow:'0 2px 12px #00B3A4'}}>Save</button>
              <button type="button" className="login-submit" style={{background:'#444', minWidth: 140, fontWeight:700, fontSize:'1.1rem', borderRadius: 14, marginLeft: 16}} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-section-label">About</div>
            <div style={{marginBottom: 18, color:'#bdbdbd', fontSize:'1.1rem'}}>{form.about || 'No about info provided.'}</div>
            <div className="profile-section-label">Skills Offered</div>
            <div style={{marginBottom: 18}}>
              {skillsOffered.map(skill => <span className="profile-pill" key={skill}>{skill}</span>)}
            </div>
            <div className="profile-section-label">Skills Wanted</div>
            <div style={{marginBottom: 18}}>
              {skillsWanted.map(skill => <span className="profile-pill" key={skill}>{skill}</span>)}
            </div>
            <div className="profile-section-label">Availability</div>
            <div style={{marginBottom: 18, color:'#bdbdbd', fontSize:'1.1rem'}}>{form.availability || 'Not specified'}</div>
            <div className="profile-section-label">Profile Visibility</div>
            <div style={{marginBottom: 18, color:'#bdbdbd', fontSize:'1.1rem'}}>{form.visibility === 'public' ? 'Public (visible to all users)' : 'Private (only visible to connections)'}</div>
            <div className="profile-section-label">Rating</div>
            <div style={{marginBottom: 18, color:'#bdbdbd', fontSize:'1.1rem'}}>{form.rating ? `${form.rating}/5` : 'No rating'}</div>
            {/* Ratings and Reviews Section */}
            <div className="profile-section-label">User Reviews</div>
            <div style={{marginBottom: 24}}>
              {sampleReviews.map((review, idx) => (
                <div key={idx} style={{
                  background: '#18181b',
                  borderRadius: 12,
                  padding: '16px 18px',
                  marginBottom: 14,
                  border: '1.5px solid #23232a',
                  color: '#fff',
                  boxShadow: '0 2px 8px #0002'
                }}>
                  <div style={{display:'flex', alignItems:'center', marginBottom: 6}}>
                    <span style={{fontWeight:700, fontSize:'1.05rem', marginRight: 10}}>{review.reviewer}</span>
                    <span style={{color:'#FFD700', fontSize:'1.1rem', fontWeight:600}}>{'★'.repeat(review.stars)}{'☆'.repeat(5-review.stars)}</span>
                  </div>
                  <div style={{color:'#bdbdbd', fontSize:'1.05rem'}}>{review.comment}</div>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', gap: 12, marginTop: 32}}>
              {!isOwnProfile && (
                <button className="login-submit" style={{flex: 1}} onClick={handleRequest}>Request</button>
              )}
              {isOwnProfile && (
                <button 
                  className="login-submit" 
                  style={{
                    background:'linear-gradient(90deg, #00B3A4 60%, #1E90FF 100%)', 
                    minWidth: 160, 
                    fontWeight:800, 
                    fontSize:'1.1rem', 
                    borderRadius: 14, 
                    boxShadow:'0 2px 12px #00B3A4',
                    flex: 1
                  }} 
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </>
        )}
        {showPopup && <div className="login-popup" style={{bottom: 24, top: 'unset', left: '50%', transform: 'translateX(-50%)'}}>
          Please login first.
        </div>}
      </div>
    </div>
  );
};

export default UserProfilePage; 