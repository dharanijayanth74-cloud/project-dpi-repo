import React, { useState } from 'react';
import './Gamification.css';

const Gamification = () => {
  const [activeBadge, setActiveBadge] = useState(null);

  const userStats = {
    level: 12,
    points: 3420,
    rank: '#42',
    badges: 15
  };

  const badges = [
    { id: 1, name: '📍 Explorer', description: 'Add your first location', earned: true, icon: '📍' },
    { id: 2, name: '🏙️ Urban Mapper', description: 'Map 10 locations in cities', earned: true, icon: '🏙️' },
    { id: 3, name: '🏛️ Heritage Hunter', description: 'Document 5 heritage sites', earned: true, icon: '🏛️' },
    { id: 4, name: '🎯 Precision Mapper', description: 'Achieve 95% accuracy in 20 locations', earned: false, icon: '🎯' },
    { id: 5, name: '🌟 Community Champion', description: 'Verify 50 locations by others', earned: false, icon: '🌟' },
    { id: 6, name: '🇮🇳 Bharat Mapper', description: 'Map locations in 5 different states', earned: true, icon: '🇮🇳' },
    { id: 7, name: '🏆 Elite Mapper', description: 'Reach Level 20', earned: false, icon: '🏆' },
    { id: 8, name: '📊 Data Detective', description: 'Report 10 fake/duplicate entries', earned: true, icon: '📊' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Amit Sharma', points: 5240, level: 18 },
    { rank: 2, name: 'Priya Patel', points: 4890, level: 17 },
    { rank: 3, name: 'Rajesh Kumar', points: 4560, level: 16 },
    { rank: 4, name: 'Sneha Reddy', points: 4210, level: 15 },
    { rank: 5, name: 'Vikram Singh', points: 3980, level: 14 }
  ];

  return (
    <div className="gamification">
      <div className="gamification-header">
        <h1>Gamification Center</h1>
        <p>Earn points, unlock achievements, and climb the leaderboard!</p>
      </div>

      <div className="gamification-stats">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{userStats.level}</h3>
            <p>Level</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💯</div>
          <div className="stat-info">
            <h3>{userStats.points.toLocaleString()}</h3>
            <p>Points</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>{userStats.rank}</h3>
            <p>Rank</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎖️</div>
          <div className="stat-info">
            <h3>{userStats.badges}</h3>
            <p>Badges</p>
          </div>
        </div>
      </div>

      <div className="gamification-content">
        <div className="badges-section">
          <h2>🏅 Your Badges</h2>
          <div className="badges-grid">
            {badges.map(badge => (
              <div 
                key={badge.id}
                className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                onClick={() => setActiveBadge(badge)}
              >
                <div className="badge-icon">{badge.icon}</div>
                <h3>{badge.name}</h3>
                <p>{badge.description}</p>
                {badge.earned ? (
                  <span className="badge-status earned">Earned</span>
                ) : (
                  <span className="badge-status locked">Locked</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="leaderboard-section">
          <h2>🏆 Leaderboard</h2>
          <div className="leaderboard">
            {leaderboard.map(player => (
              <div key={player.rank} className="leaderboard-item">
                <div className="rank">{player.rank}</div>
                <div className="player-info">
                  <h4>{player.name}</h4>
                  <p>Level {player.level}</p>
                </div>
                <div className="points">{player.points.toLocaleString()} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeBadge && (
        <div className="badge-modal" onClick={() => setActiveBadge(null)}>
          <div className="badge-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="badge-modal-header">
              <div className="badge-icon-large">{activeBadge.icon}</div>
              <h2>{activeBadge.name}</h2>
              <p>{activeBadge.description}</p>
            </div>
            <div className="badge-modal-body">
              {activeBadge.earned ? (
                <div className="achievement-unlocked">
                  <h3>🎉 Achievement Unlocked!</h3>
                  <p>You earned this badge on {new Date().toLocaleDateString()}</p>
                </div>
              ) : (
                <div className="achievement-locked">
                  <h3>🔒 Achievement Locked</h3>
                  <p>Complete the challenge to unlock this badge</p>
                </div>
              )}
            </div>
            <button className="close-button" onClick={() => setActiveBadge(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamification;