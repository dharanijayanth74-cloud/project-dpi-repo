import React, { useState } from 'react';
import WorkingMap from './components/WorkingMap';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <header className="App-header">
            <div className="header-content">
              <h1>Crowdsourced Address Feedback Platform - India</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span>👤 {currentUser.username}</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '0.9em'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
          <main>
            <WorkingMap />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
