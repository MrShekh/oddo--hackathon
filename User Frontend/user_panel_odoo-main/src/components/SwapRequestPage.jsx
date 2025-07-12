import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SwapRequestPage = ({ user, profiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const target = profiles.find(p => String(p.id) === String(id));
  const [offered, setOffered] = useState('');
  const [wanted, setWanted] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!user || !target) return <div className="container"><div className="full-modal-content"><h2>Invalid request</h2></div></div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => navigate(-1), 1800);
  };

  // Message box style for inputs
  const messageBoxStyle = {
    marginBottom: 24,
    fontSize: '1.1rem',
    borderRadius: 12,
    border: '2px solid #23232a',
    background: '#18181b',
    color: '#fff',
    padding: '14px 18px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const textareaStyle = {
    ...messageBoxStyle,
    marginBottom: 32,
    minHeight: 100,
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  return (
    <div className="container" style={{minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <form className="full-modal-content" style={{maxWidth: 520, minWidth: 340, margin: '0 auto', alignItems: 'flex-start', boxShadow: '0 8px 32px #00B3A4'}} onSubmit={handleSubmit}>
        <h2 style={{marginBottom: 32, fontSize: '2.1rem', fontWeight: 800}}>Initiate a Skill Swap</h2>
        <label style={{fontWeight: 700, marginBottom: 8, fontSize: '1.15rem'}}>Offered Skill</label>
        <input
          type="text"
          value={offered}
          onChange={e => setOffered(e.target.value)}
          placeholder="Type the skill you offer..."
          required
          style={messageBoxStyle}
        />
        <label style={{fontWeight: 700, marginBottom: 8, fontSize: '1.15rem'}}>Wanted Skill</label>
        <input
          type="text"
          value={wanted}
          onChange={e => setWanted(e.target.value)}
          placeholder="Type the skill you want..."
          required
          style={messageBoxStyle}
        />
        <label style={{fontWeight: 700, marginBottom: 8, fontSize: '1.15rem'}}>Message (Optional)</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={textareaStyle}
        />
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
          <button type="submit" className="login-submit" style={{background:'linear-gradient(90deg, #00B3A4 60%, #1E90FF 100%)', width: 220, fontWeight:800, fontSize:'1.15rem', borderRadius: 14, boxShadow:'0 2px 12px #00B3A4'}}>
            {sent ? 'Request Sent!' : 'Send Swap Request'}
          </button>
        </div>
        {sent && <div style={{margin:'32px auto 0 auto', color:'#00B3A4', fontWeight:700, fontSize:'1.2rem', textAlign:'center'}}>Your swap request has been sent!</div>}
      </form>
    </div>
  );
};

export default SwapRequestPage; 