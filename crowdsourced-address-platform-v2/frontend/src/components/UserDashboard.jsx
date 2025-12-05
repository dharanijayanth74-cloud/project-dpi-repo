import React from 'react';

const UserDashboard = ({ markers }) => {
  // Calculate user statistics
  const totalPoints = markers.reduce((sum, marker) => sum + (marker.points || 0), 0);
  const totalSubmissions = markers.length;
  
  const typeCounts = markers.reduce((counts, marker) => {
    counts[marker.type] = (counts[marker.type] || 0) + 1;
    return counts;
  }, {});
  
  const level = Math.floor(totalPoints / 100) + 1;
  const progressToNextLevel = (totalPoints % 100);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      width: '250px',
      fontSize: '14px'
    }}>
      <h3 style={{ marginTop: 0, color: '#2c3e50' }}>User Dashboard</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span><strong>Level {level}</strong></span>
          <span>{progressToNextLevel}/100</span>
        </div>
        <div style={{ 
          height: '8px', 
          background: '#ecf0f1', 
          borderRadius: '4px', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            height: '100%', 
            width: `${progressToNextLevel}%`, 
            background: '#3498db',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '5px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2c3e50' }}>{totalPoints}</div>
          <div style={{ fontSize: '0.8em', color: '#7f8c8d' }}>Points</div>
        </div>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '5px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2c3e50' }}>{totalSubmissions}</div>
          <div style={{ fontSize: '0.8em', color: '#7f8c8d' }}>Submissions</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Submission Types:</strong>
        <div style={{ marginTop: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
            <span>🏢 Buildings:</span>
            <span>{typeCounts.building || 0}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
            <span>🛣️ Streets:</span>
            <span>{typeCounts.street || 0}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
            <span>🌐 Boundaries:</span>
            <span>{typeCounts.boundary || 0}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
            <span>🚩 Flags:</span>
            <span>{typeCounts.flag || 0}</span>
          </div>
        </div>
      </div>
      
      <div style={{ fontSize: '0.8em', color: '#7f8c8d', textAlign: 'center' }}>
        Keep contributing to earn more points!
      </div>
    </div>
  );
};

export default UserDashboard;