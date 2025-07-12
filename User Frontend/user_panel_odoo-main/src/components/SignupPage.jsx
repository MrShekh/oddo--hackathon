import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = ({ setUser }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imgDataUrl = null;
    if (profileImg) {
      imgDataUrl = await toDataUrl(profileImg);
    }
    const userData = {
      id: Date.now(), // Add unique ID
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      location: form.location.value,
      skillsOffered: form.skillsOffered.value,
      skillsWanted: form.skillsWanted.value,
      availability: form.availability.value,
      visibility: form.visibility.value,
      photo: imgDataUrl,
      rating: 4.0, // Default rating
      isPublic: true, // Default visibility
    };
    localStorage.setItem('skillSwapUser', JSON.stringify(userData));
    
    // Also add to profiles list
    const storedProfiles = localStorage.getItem('skillSwapProfiles');
    if (storedProfiles) {
      const profiles = JSON.parse(storedProfiles);
      profiles.push(userData);
      localStorage.setItem('skillSwapProfiles', JSON.stringify(profiles));
    } else {
      // Initialize profiles list with the new user
      localStorage.setItem('skillSwapProfiles', JSON.stringify([userData]));
    }
    
    setUser(userData);
    navigate('/');
  };

  function toDataUrl(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="auth-page-bg">
      <div className="full-modal-content">
        <h2>Sign Up for Skill Swap Platform</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="profile-upload center-upload">
            <div className="profile-photo signup-photo" onClick={() => fileInputRef.current.click()} style={{cursor: 'pointer'}}>
              {imgPreview ? (
                <img src={imgPreview} alt="Profile Preview" />
              ) : (
                <span>+</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required />
          <label>Password</label>
          <input type="password" name="password" placeholder="Create a password" required />
          <label>Location</label>
          <input type="text" name="location" placeholder="Enter your location" required />
          <label>Skills Offered</label>
          <input type="text" name="skillsOffered" placeholder="e.g. JavaScript, Python" required />
          <label>Skills Wanted</label>
          <input type="text" name="skillsWanted" placeholder="e.g. Graphic Design, Musician" required />
          <label>Availability</label>
          <select name="availability" required>
            <option value="">Select availability</option>
            <option value="weekends">Weekends</option>
            <option value="weekdays">Weekdays</option>
          </select>
          <label>Profile Visibility</label>
          <div className="profile-visibility">
            <label><input type="radio" name="visibility" value="public" defaultChecked /> Public</label>
            <label><input type="radio" name="visibility" value="private" /> Private</label>
          </div>
          <button type="submit" className="login-submit">Sign Up</button>
        </form>
        <div className="login-links">
          <span className="signup-link">Already have an account? <Link to="/login">Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 