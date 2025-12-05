import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Locations', value: '1,248', icon: '📍', color: '#3498db' },
    { title: 'Verified Addresses', value: '872', icon: '✅', color: '#2ecc71' },
    { title: 'Pending Review', value: '156', icon: '⏳', color: '#f39c12' },
    { title: 'User Points', value: '3,420', icon: '⭐', color: '#e74c3c' }
  ];

  const recentActivity = [
    { user: 'Rajesh Kumar', action: 'added new building entrance', time: '2 minutes ago', location: 'Mumbai, Maharashtra' },
    { user: 'Priya Sharma', action: 'updated street information', time: '15 minutes ago', location: 'Delhi, Delhi' },
    { user: 'Amit Patel', action: 'verified landmark', time: '1 hour ago', location: 'Bangalore, Karnataka' },
    { user: 'Sneha Reddy', action: 'reported fake address', time: '2 hours ago', location: 'Hyderabad, Telangana' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Crowdsourced Address Feedback Platform</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-user">
                  <div className="user-avatar">
                    {activity.user.charAt(0)}
                  </div>
                </div>
                <div className="activity-details">
                  <h4>{activity.user}</h4>
                  <p>{activity.action} in {activity.location}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="challenges-section">
          <h2>Ongoing Challenges</h2>
          <div className="challenge-list">
            <div className="challenge-card">
              <h3>🏙️ Metro Cities Challenge</h3>
              <p>Add 50 addresses in metro cities to earn bonus points!</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <p className="progress-text">32/50 completed</p>
            </div>
            <div className="challenge-card">
              <h3>🏛️ Heritage Sites</h3>
              <p>Document heritage sites in your city for extra rewards!</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '30%' }}></div>
              </div>
              <p className="progress-text">15/50 completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;