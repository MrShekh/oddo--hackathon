import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, setUser }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user || {});
  const fileInputRef = useRef();
  const [imgPreview, setImgPreview] = useState(user?.photo || null);
  const navigate = useNavigate();

  if (!user) return <div className="container"><div className="full-modal-content"><h2>Not logged in</h2></div></div>;

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setForm(user);
    setImgPreview(user.photo);
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
    localStorage.setItem('skillSwapUser', JSON.stringify(form));
    setUser(form);
    
    // Also update the profiles list
    const storedProfiles = localStorage.getItem('skillSwapProfiles');
    if (storedProfiles) {
      const profiles = JSON.parse(storedProfiles);
      const updatedProfiles = profiles.map(p => 
        String(p.id) === String(user.id) ? form : p
      );
      localStorage.setItem('skillSwapProfiles', JSON.stringify(updatedProfiles));
    }
    
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('skillSwapUser');
    setUser(null);
    navigate('/');
  };

  // Split skills into pill tags for display
  const skillsOffered = (form.skillsOffered || '').split(',').map(s => s.trim()).filter(Boolean);
  const skillsWanted = (form.skillsWanted || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="container" style={{minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
      {!editing && (
        <button
          style={{position:'absolute',left:24,top:24,zIndex:2,background:'none',border:'none',color:'var(--accent)',fontSize:'2rem',cursor:'pointer',fontWeight:700}}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          &#8592;
        </button>
      )}
      <div className="full-modal-content" style={{maxWidth: 650, minWidth: 420, margin: '0 auto', alignItems: 'center', boxShadow: '0 8px 32px #00B3A4'}}>
        <div className="profile-upload center-upload" style={{marginBottom: 0}}>
          <div className="profile-photo signup-photo" onClick={() => editing && fileInputRef.current.click()} style={{cursor: editing ? 'pointer' : 'default', width: 130, height: 130, fontSize: '3.2rem', borderWidth: 4}}>
            {imgPreview ? (
              <img src={imgPreview} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
            ) : (
              <span>+</span>
            )}
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
        <h2 style={{marginBottom: 8, fontSize:'2.2rem', fontWeight:800, letterSpacing:0.5}}>{form.name}</h2>
        <div style={{color:'#bdbdbd', fontSize:'1.2rem', marginBottom: 18}}>{form.location || 'Unknown location'}</div>
        
        {editing ? (
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off" style={{width:'100%', maxWidth: 480}}>
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Name</label>
            <input type="text" name="name" value={form.name || ''} onChange={handleChange} required />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Email</label>
            <input type="email" name="email" value={form.email || ''} onChange={handleChange} required />
            <label style={{fontWeight:700, fontSize:'1.15rem'}}>Password</label>
            <input type="password" name="password" value={form.password || ''} onChange={handleChange} required />
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
            <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop: 32}}>
              <button type="button" className="login-submit" style={{background:'linear-gradient(90deg, #00B3A4 60%, #1E90FF 100%)', minWidth: 160, fontWeight:800, fontSize:'1.1rem', borderRadius: 14, boxShadow:'0 2px 12px #00B3A4'}} onClick={handleEdit}>Edit Profile</button>
            </div>
          </>
        )}
        
        {/* Logout Section */}
        {!editing && (
          <div style={{
            marginTop: 40,
            paddingTop: 30,
            borderTop: '2px solid #333',
            textAlign: 'center'
          }}>
            <h3 style={{
              marginBottom: 16,
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#fff'
            }}>Account Settings</h3>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: '#FF4444',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                minWidth: 120
              }}
            >
              Logout
            </button>
            <div style={{
              marginTop: 12,
              fontSize: '0.9rem',
              color: '#bdbdbd'
            }}>
              Click logout to sign out and return to login
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 