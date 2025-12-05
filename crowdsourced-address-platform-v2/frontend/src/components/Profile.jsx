import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    joinDate: 'January 15, 2023',
    contributions: 142,
    verified: 89,
    points: 3420
  });

  const [editing, setEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({...profile});

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setProfile({...editProfile});
    setEditing(false);
  };

  const handleCancel = () => {
    setEditProfile({...profile});
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contributionHistory = [
    { date: '2023-12-15', type: 'Building Entrance', location: 'Mumbai Central Station', points: 50 },
    { date: '2023-12-12', type: 'Landmark', location: 'Gateway of India', points: 40 },
    { date: '2023-12-10', type: 'Boundary Update', location: 'Marine Drive', points: 30 },
    { date: '2023-12-08', type: 'Missing Street', location: 'Colaba Causeway', points: 25 },
    { date: '2023-12-05', type: 'Public Facility', location: 'Chhatrapati Shivaji Terminus', points: 45 }
  ];

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account settings and view your contributions</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {profile.name.charAt(0)}
            </div>
          </div>
          
          {editing ? (
            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editProfile.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editProfile.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editProfile.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editProfile.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-phone">{profile.phone}</p>
              <p className="profile-location">📍 {profile.location}</p>
              <p className="profile-join-date">Member since {profile.joinDate}</p>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">{profile.contributions}</span>
                  <span className="stat-label">Contributions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profile.verified}</span>
                  <span className="stat-label">Verified</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profile.points}</span>
                  <span className="stat-label">Points</span>
                </div>
              </div>
              
              <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
        </div>

        <div className="contribution-history">
          <h2>Contribution History</h2>
          <div className="history-list">
            {contributionHistory.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-icon">
                  {item.type === 'Building Entrance' && '🏢'}
                  {item.type === 'Landmark' && '📍'}
                  {item.type === 'Boundary Update' && '🌐'}
                  {item.type === 'Missing Street' && '🛣️'}
                  {item.type === 'Public Facility' && '🏛️'}
                </div>
                <div className="history-details">
                  <h3>{item.type}</h3>
                  <p>{item.location}</p>
                  <span className="history-date">{item.date}</span>
                </div>
                <div className="history-points">
                  +{item.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;