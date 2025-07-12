import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MySwapsPage = ({ user }) => {
  const [swaps, setSwaps] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedSwap, setSelectedSwap] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigate = useNavigate();

  // Mock swap data - in a real app this would come from an API
  useEffect(() => {
    const mockSwaps = [
      // PENDING SWAPS (10)
      {
        id: 1,
        type: 'sent',
        status: 'pending',
        targetUser: { id: 1, name: 'Marc Demo', photo: 'https://randomuser.me/api/portraits/men/32.jpg', skillsOffered: ['JavaScript', 'Python'], skillsWanted: ['Musician', 'Graphic designer'], rating: 3.9, location: 'New York' },
        offeredSkill: 'JavaScript Development',
        wantedSkill: 'Guitar Lessons',
        message: 'I can help you with JavaScript and you can teach me guitar!',
        date: '2024-01-15'
      },
      {
        id: 2,
        type: 'received',
        status: 'pending',
        targetUser: { id: 2, name: 'Michell', photo: 'https://randomuser.me/api/portraits/women/44.jpg', skillsOffered: ['Graphic Design', 'UI/UX'], skillsWanted: ['React Development'], rating: 4.2, location: 'London' },
        offeredSkill: 'React Development',
        wantedSkill: 'Logo Design',
        message: 'I need a logo for my startup and can help with React!',
        date: '2024-01-10'
      },
      {
        id: 3,
        type: 'sent',
        status: 'pending',
        targetUser: { id: 3, name: 'Joe wills', photo: 'https://randomuser.me/api/portraits/men/65.jpg', skillsOffered: ['Python', 'Data Science'], skillsWanted: ['Web Development'], rating: 4.0, location: 'San Francisco' },
        offeredSkill: 'Web Development',
        wantedSkill: 'Data Analysis',
        message: 'Looking to learn data analysis in exchange for web dev help.',
        date: '2024-01-08'
      },
      {
        id: 4,
        type: 'received',
        status: 'pending',
        targetUser: { id: 4, name: 'Anna Smith', photo: 'https://randomuser.me/api/portraits/women/68.jpg', skillsOffered: ['React', 'Node.js'], skillsWanted: ['UI Designer'], rating: 4.2, location: 'Berlin' },
        offeredSkill: 'UI Design',
        wantedSkill: 'Backend Development',
        message: 'I can design beautiful UIs and need help with backend!',
        date: '2024-01-12'
      },
      {
        id: 5,
        type: 'sent',
        status: 'pending',
        targetUser: { id: 5, name: 'John Doe', photo: 'https://randomuser.me/api/portraits/men/12.jpg', skillsOffered: ['Java', 'Spring'], skillsWanted: ['DevOps'], rating: 3.7, location: 'Boston' },
        offeredSkill: 'DevOps',
        wantedSkill: 'Java Development',
        message: 'I can help with CI/CD and need Java expertise.',
        date: '2024-01-14'
      },
      {
        id: 6,
        type: 'received',
        status: 'pending',
        targetUser: { id: 6, name: 'Priya Patel', photo: 'https://randomuser.me/api/portraits/women/21.jpg', skillsOffered: ['Python', 'Django'], skillsWanted: ['Frontend'], rating: 4.5, location: 'Mumbai' },
        offeredSkill: 'Frontend Development',
        wantedSkill: 'Python Backend',
        message: 'I can build responsive UIs and need Django help.',
        date: '2024-01-11'
      },
      {
        id: 7,
        type: 'sent',
        status: 'pending',
        targetUser: { id: 7, name: 'Carlos Ruiz', photo: 'https://randomuser.me/api/portraits/men/23.jpg', skillsOffered: ['PHP', 'Laravel'], skillsWanted: ['React'], rating: 3.8, location: 'Madrid' },
        offeredSkill: 'React Development',
        wantedSkill: 'Laravel Backend',
        message: 'I can help with React and need Laravel expertise.',
        date: '2024-01-13'
      },
      {
        id: 8,
        type: 'received',
        status: 'pending',
        targetUser: { id: 8, name: 'Sara Lee', photo: 'https://randomuser.me/api/portraits/women/50.jpg', skillsOffered: ['C#', '.NET'], skillsWanted: ['UX Researcher'], rating: 4.1, location: 'Seattle' },
        offeredSkill: 'UX Research',
        wantedSkill: '.NET Development',
        message: 'I can conduct user research and need .NET help.',
        date: '2024-01-09'
      },
      {
        id: 9,
        type: 'sent',
        status: 'pending',
        targetUser: { id: 9, name: 'Tom Brown', photo: 'https://randomuser.me/api/portraits/men/77.jpg', skillsOffered: ['Go', 'Kubernetes'], skillsWanted: ['Backend'], rating: 3.6, location: 'Austin' },
        offeredSkill: 'Backend Development',
        wantedSkill: 'Go Programming',
        message: 'I can help with backend and want to learn Go.',
        date: '2024-01-16'
      },
      {
        id: 10,
        type: 'received',
        status: 'pending',
        targetUser: { id: 10, name: 'Emily Clark', photo: 'https://randomuser.me/api/portraits/women/12.jpg', skillsOffered: ['Ruby', 'Rails'], skillsWanted: ['Product Manager'], rating: 4.3, location: 'Portland' },
        offeredSkill: 'Product Management',
        wantedSkill: 'Ruby on Rails',
        message: 'I can help with product strategy and need Rails expertise.',
        date: '2024-01-07'
      },

      // ACCEPTED SWAPS (10)
      {
        id: 11,
        type: 'received',
        status: 'accepted',
        targetUser: { id: 11, name: 'Liam Wong', photo: 'https://randomuser.me/api/portraits/men/41.jpg', skillsOffered: ['Swift', 'iOS'], skillsWanted: ['Android'], rating: 3.9, location: 'Toronto' },
        offeredSkill: 'Android Development',
        wantedSkill: 'iOS Development',
        message: 'I can help with Android and want to learn iOS!',
        date: '2024-01-05'
      },
      {
        id: 12,
        type: 'sent',
        status: 'accepted',
        targetUser: { id: 12, name: 'Olga Ivanova', photo: 'https://randomuser.me/api/portraits/women/41.jpg', skillsOffered: ['C++', 'Qt'], skillsWanted: ['Web'], rating: 4.0, location: 'Moscow' },
        offeredSkill: 'Web Development',
        wantedSkill: 'C++ Programming',
        message: 'I can build web apps and want to learn C++.',
        date: '2024-01-03'
      },
      {
        id: 13,
        type: 'received',
        status: 'accepted',
        targetUser: { id: 13, name: 'Ahmed Ali', photo: 'https://randomuser.me/api/portraits/men/19.jpg', skillsOffered: ['Angular', 'TypeScript'], skillsWanted: ['Python'], rating: 3.5, location: 'Cairo' },
        offeredSkill: 'Python Development',
        wantedSkill: 'Angular Framework',
        message: 'I can help with Python and want to learn Angular.',
        date: '2024-01-02'
      },
      {
        id: 14,
        type: 'sent',
        status: 'accepted',
        targetUser: { id: 14, name: 'Yuki Tanaka', photo: 'https://randomuser.me/api/portraits/women/36.jpg', skillsOffered: ['Vue', 'Nuxt'], skillsWanted: ['React'], rating: 4.4, location: 'Tokyo' },
        offeredSkill: 'React Development',
        wantedSkill: 'Vue.js Framework',
        message: 'I can help with React and want to learn Vue.',
        date: '2024-01-01'
      },
      {
        id: 15,
        type: 'received',
        status: 'accepted',
        targetUser: { id: 15, name: 'Fatima Zahra', photo: 'https://randomuser.me/api/portraits/women/60.jpg', skillsOffered: ['Flutter', 'Dart'], skillsWanted: ['iOS'], rating: 4.2, location: 'Dubai' },
        offeredSkill: 'iOS Development',
        wantedSkill: 'Flutter Development',
        message: 'I can help with iOS and want to learn Flutter.',
        date: '2023-12-30'
      },
      {
        id: 16,
        type: 'sent',
        status: 'accepted',
        targetUser: { id: 16, name: 'Lucas Silva', photo: 'https://randomuser.me/api/portraits/men/28.jpg', skillsOffered: ['JavaScript', 'React'], skillsWanted: ['Node.js'], rating: 3.8, location: 'São Paulo' },
        offeredSkill: 'Node.js Development',
        wantedSkill: 'React Frontend',
        message: 'I can help with Node.js and want to learn React.',
        date: '2023-12-28'
      },
      {
        id: 17,
        type: 'received',
        status: 'accepted',
        targetUser: { id: 17, name: 'Sophia Müller', photo: 'https://randomuser.me/api/portraits/women/10.jpg', skillsOffered: ['Python', 'ML'], skillsWanted: ['Data Engineer'], rating: 4.6, location: 'Berlin' },
        offeredSkill: 'Data Engineering',
        wantedSkill: 'Machine Learning',
        message: 'I can help with data pipelines and want to learn ML.',
        date: '2023-12-25'
      },
      {
        id: 18,
        type: 'sent',
        status: 'accepted',
        targetUser: { id: 18, name: 'Ivan Petrov', photo: 'https://randomuser.me/api/portraits/men/14.jpg', skillsOffered: ['Java', 'Android'], skillsWanted: ['iOS'], rating: 3.7, location: 'St. Petersburg' },
        offeredSkill: 'iOS Development',
        wantedSkill: 'Android Development',
        message: 'I can help with iOS and want to learn Android.',
        date: '2023-12-22'
      },
      {
        id: 19,
        type: 'received',
        status: 'accepted',
        targetUser: { id: 19, name: 'Marta Rossi', photo: 'https://randomuser.me/api/portraits/women/14.jpg', skillsOffered: ['PHP', 'Symfony'], skillsWanted: ['Laravel'], rating: 4.1, location: 'Milan' },
        offeredSkill: 'Laravel Development',
        wantedSkill: 'Symfony Framework',
        message: 'I can help with Laravel and want to learn Symfony.',
        date: '2023-12-20'
      },
      {
        id: 20,
        type: 'sent',
        status: 'accepted',
        targetUser: { id: 20, name: 'Chen Wei', photo: 'https://randomuser.me/api/portraits/men/52.jpg', skillsOffered: ['Go', 'Microservices'], skillsWanted: ['DevOps'], rating: 4.0, location: 'Shanghai' },
        offeredSkill: 'DevOps',
        wantedSkill: 'Go Programming',
        message: 'I can help with DevOps and want to learn Go.',
        date: '2023-12-18'
      },

      // REJECTED SWAPS (10)
      {
        id: 21,
        type: 'sent',
        status: 'rejected',
        targetUser: { id: 21, name: 'Alex Johnson', photo: 'https://randomuser.me/api/portraits/men/33.jpg', skillsOffered: ['React', 'TypeScript'], skillsWanted: ['Python'], rating: 4.1, location: 'Chicago' },
        offeredSkill: 'Python Development',
        wantedSkill: 'React Development',
        message: 'I can help with Python and want to learn React.',
        date: '2023-12-15'
      },
      {
        id: 22,
        type: 'received',
        status: 'rejected',
        targetUser: { id: 22, name: 'Maria Garcia', photo: 'https://randomuser.me/api/portraits/women/45.jpg', skillsOffered: ['UI/UX Design'], skillsWanted: ['Frontend'], rating: 4.3, location: 'Barcelona' },
        offeredSkill: 'Frontend Development',
        wantedSkill: 'UI/UX Design',
        message: 'I can help with frontend and want to learn design.',
        date: '2023-12-12'
      },
      {
        id: 23,
        type: 'sent',
        status: 'rejected',
        targetUser: { id: 23, name: 'David Kim', photo: 'https://randomuser.me/api/portraits/men/67.jpg', skillsOffered: ['Node.js', 'Express'], skillsWanted: ['Python'], rating: 3.9, location: 'Seoul' },
        offeredSkill: 'Python Development',
        wantedSkill: 'Node.js Backend',
        message: 'I can help with Python and want to learn Node.js.',
        date: '2023-12-10'
      },
      {
        id: 24,
        type: 'received',
        status: 'rejected',
        targetUser: { id: 24, name: 'Lisa Chen', photo: 'https://randomuser.me/api/portraits/women/22.jpg', skillsOffered: ['Data Science'], skillsWanted: ['Web Development'], rating: 4.4, location: 'Singapore' },
        offeredSkill: 'Web Development',
        wantedSkill: 'Data Science',
        message: 'I can help with web dev and want to learn data science.',
        date: '2023-12-08'
      },
      {
        id: 25,
        type: 'sent',
        status: 'rejected',
        targetUser: { id: 25, name: 'Michael O\'Connor', photo: 'https://randomuser.me/api/portraits/men/78.jpg', skillsOffered: ['Java', 'Spring Boot'], skillsWanted: ['React'], rating: 3.8, location: 'Dublin' },
        offeredSkill: 'React Development',
        wantedSkill: 'Java Backend',
        message: 'I can help with React and want to learn Java.',
        date: '2023-12-05'
      },
      {
        id: 26,
        type: 'received',
        status: 'rejected',
        targetUser: { id: 26, name: 'Nina Patel', photo: 'https://randomuser.me/api/portraits/women/31.jpg', skillsOffered: ['Mobile Development'], skillsWanted: ['Backend'], rating: 4.2, location: 'Mumbai' },
        offeredSkill: 'Backend Development',
        wantedSkill: 'Mobile Development',
        message: 'I can help with backend and want to learn mobile dev.',
        date: '2023-12-03'
      },
      {
        id: 27,
        type: 'sent',
        status: 'rejected',
        targetUser: { id: 27, name: 'Robert Wilson', photo: 'https://randomuser.me/api/portraits/men/89.jpg', skillsOffered: ['DevOps', 'AWS'], skillsWanted: ['Frontend'], rating: 4.0, location: 'Melbourne' },
        offeredSkill: 'Frontend Development',
        wantedSkill: 'DevOps',
        message: 'I can help with frontend and want to learn DevOps.',
        date: '2023-12-01'
      },
      {
        id: 28,
        type: 'received',
        status: 'rejected',
        targetUser: { id: 28, name: 'Sarah Thompson', photo: 'https://randomuser.me/api/portraits/women/55.jpg', skillsOffered: ['Product Management'], skillsWanted: ['Technical Skills'], rating: 4.5, location: 'Vancouver' },
        offeredSkill: 'Technical Development',
        wantedSkill: 'Product Management',
        message: 'I can help with technical skills and want to learn PM.',
        date: '2023-11-28'
      },
      {
        id: 29,
        type: 'sent',
        status: 'rejected',
        targetUser: { id: 29, name: 'James Rodriguez', photo: 'https://randomuser.me/api/portraits/men/91.jpg', skillsOffered: ['Python', 'Django'], skillsWanted: ['JavaScript'], rating: 3.7, location: 'Mexico City' },
        offeredSkill: 'JavaScript Development',
        wantedSkill: 'Python Backend',
        message: 'I can help with JavaScript and want to learn Python.',
        date: '2023-11-25'
      },
      {
        id: 30,
        type: 'received',
        status: 'rejected',
        targetUser: { id: 30, name: 'Emma Davis', photo: 'https://randomuser.me/api/portraits/women/62.jpg', skillsOffered: ['Graphic Design'], skillsWanted: ['Web Development'], rating: 4.1, location: 'Amsterdam' },
        offeredSkill: 'Web Development',
        wantedSkill: 'Graphic Design',
        message: 'I can help with web development and want to learn design.',
        date: '2023-11-22'
      }
    ];
    setSwaps(mockSwaps);
  }, []);

  const filteredSwaps = swaps.filter(swap => {
    if (filter === 'all') return true;
    return swap.status === filter;
  });

  const handleViewProfile = (swap) => {
    setSelectedSwap(swap);
    setShowUserProfile(true);
  };

  const handleBackToSwaps = () => {
    setShowUserProfile(false);
    setSelectedSwap(null);
  };

  const handleAcceptSwap = (swapId) => {
    setSwaps(prevSwaps => 
      prevSwaps.map(swap => 
        swap.id === swapId ? { ...swap, status: 'accepted' } : swap
      )
    );
  };

  const handleRejectSwap = (swapId) => {
    setSwaps(prevSwaps => 
      prevSwaps.map(swap => 
        swap.id === swapId ? { ...swap, status: 'rejected' } : swap
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'accepted': return '#00B3A4';
      case 'rejected': return '#FF4444';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  if (!user) {
    return <div className="container"><div className="full-modal-content"><h2>Please login to view your swaps</h2></div></div>;
  }

  if (showUserProfile && selectedSwap) {
    const profileUser = selectedSwap.targetUser;
    return (
      <div className="container" style={{position:'relative'}}>
        <button
          style={{position:'absolute',left:24,top:24,zIndex:2,background:'none',border:'none',color:'var(--accent)',fontSize:'2rem',cursor:'pointer',fontWeight:700}}
          onClick={handleBackToSwaps}
          aria-label="Back"
        >
          &#8592;
        </button>
        <div className="full-modal-content">
          <div className="profile-upload center-upload" style={{marginBottom: 0}}>
            <div className="profile-photo signup-photo" style={{cursor:'default'}}>
              {profileUser.photo ? <img src={profileUser.photo} alt={profileUser.name} /> : <span>+</span>}
            </div>
          </div>
          <h2 style={{marginBottom: 8}}>{profileUser.name}</h2>
          <div style={{color:'#bdbdbd', fontSize:'1.1rem', marginBottom: 18}}>{profileUser.location || 'Unknown location'}</div>
          <div className="profile-section-label">Skills Offered</div>
          <div style={{marginBottom: 18}}>
            {(profileUser.skillsOffered || []).map(skill => <span className="profile-pill" key={skill}>{skill}</span>)}
          </div>
          <div className="profile-section-label">Skills Wanted</div>
          <div style={{marginBottom: 18}}>
            {(profileUser.skillsWanted || []).map(skill => <span className="profile-pill" key={skill}>{skill}</span>)}
          </div>
          <div className="profile-section-label">Rating</div>
          <div style={{marginBottom: 18, color:'#bdbdbd', fontSize:'1.1rem'}}>{profileUser.rating ? `${profileUser.rating}/5` : 'No rating'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className="full-modal-content" style={{
        maxWidth: 800, 
        width: '100%', 
        margin: '0 auto', 
        boxShadow: '0 8px 32px #00B3A4',
        padding: '24px 20px'
      }}>
        <h2 style={{
          marginBottom: 32, 
          fontSize:'2.2rem', 
          fontWeight:800, 
          letterSpacing:0.5, 
          textAlign:'center'
        }}>My Swaps</h2>
        
        {/* Filter Buttons */}
        <div style={{
          display: 'flex', 
          gap: '12px', 
          marginBottom: 32, 
          justifyContent: 'center', 
          flexWrap: 'wrap'
        }}>
          {['all', 'pending', 'accepted', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '12px 20px',
                borderRadius: '25px',
                border: 'none',
                background: filter === status ? 'linear-gradient(90deg, #00B3A4 60%, #1E90FF 100%)' : '#333',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '80px',
                minHeight: '44px'
              }}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Swaps List */}
        <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
          {filteredSwaps.length === 0 ? (
            <div style={{
              textAlign: 'center', 
              color: '#bdbdbd', 
              fontSize: '1.2rem', 
              padding: '40px'
            }}>
              No swaps found for this filter.
            </div>
          ) : (
            filteredSwaps.map(swap => (
              <div key={swap.id} style={{
                background: '#1a1a1a',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                border: '2px solid #333',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    flex: '1',
                    minWidth: '200px'
                  }}>
                    <div className="profile-photo" style={{
                      width: '60px', 
                      height: '60px', 
                      cursor: 'pointer',
                      minWidth: '60px'
                    }} onClick={() => handleViewProfile(swap)}>
                      {swap.targetUser.photo ? (
                        <img src={swap.targetUser.photo} alt={swap.targetUser.name} style={{
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          borderRadius: '50%'
                        }} />
                      ) : (
                        <span>+</span>
                      )}
                    </div>
                    <div style={{flex: '1'}}>
                      <h3 style={{
                        margin: 0, 
                        fontSize: '1.3rem', 
                        fontWeight: 700, 
                        color: 'white'
                      }}>{swap.targetUser.name}</h3>
                      <div style={{
                        color: '#bdbdbd', 
                        fontSize: '1rem'
                      }}>{swap.targetUser.location}</div>
                    </div>
                  </div>
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    background: getStatusColor(swap.status),
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}>
                    {getStatusText(swap.status)}
                  </div>
                </div>
                
                <div style={{marginBottom: '16px'}}>
                  <div style={{marginBottom: '8px'}}>
                    <span style={{fontWeight: 600, color: '#00B3A4'}}>Offered: </span>
                    <span style={{color: 'white'}}>{swap.offeredSkill}</span>
                  </div>
                  <div style={{marginBottom: '8px'}}>
                    <span style={{fontWeight: 600, color: '#FF6B6B'}}>Wanted: </span>
                    <span style={{color: 'white'}}>{swap.wantedSkill}</span>
                  </div>
                  {swap.message && (
                    <div style={{
                      marginTop: '12px', 
                      padding: '12px', 
                      background: '#2a2a2a', 
                      borderRadius: '8px', 
                      color: '#bdbdbd', 
                      fontSize: '0.95rem'
                    }}>
                      "{swap.message}"
                    </div>
                  )}
                </div>
                
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  fontSize: '0.9rem', 
                  color: '#888',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <span>{swap.type === 'sent' ? 'Sent' : 'Received'} on {new Date(swap.date).toLocaleDateString()}</span>
                  <div style={{
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => handleViewProfile(swap)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(90deg, #00B3A4 60%, #1E90FF 100%)',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        minHeight: '44px'
                      }}
                    >
                      View Profile
                    </button>
                    {swap.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptSwap(swap.id)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#00B3A4',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            minHeight: '44px'
                          }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectSwap(swap.id)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#FF4444',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            minHeight: '44px'
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MySwapsPage; 