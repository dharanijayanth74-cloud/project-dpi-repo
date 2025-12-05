import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation (in a real app, this would be server-side)
    if (username && password) {
      // Simulate successful login
      onLogin({
        username: username,
        id: Date.now(),
        points: 0,
        level: 1
      });
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        width: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          marginBottom: '30px',
          fontSize: '2em'
        }}>
          🗺️ Address Feedback Platform
        </h1>
        
        <h2 style={{ 
          color: '#34495e', 
          marginBottom: '30px',
          fontSize: '1.5em'
        }}>
          Login to Contribute
        </h2>
        
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            Login
          </button>
        </form>
        
        <div style={{ 
          marginTop: '20px', 
          color: '#7f8c8d',
          fontSize: '14px'
        }}>
          <p>New user? <a href="#" onClick={(e) => {e.preventDefault(); alert('Signup functionality would be implemented here');}} style={{color: '#3498db'}}>Sign up</a></p>
          <p>Use any username/password to login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;