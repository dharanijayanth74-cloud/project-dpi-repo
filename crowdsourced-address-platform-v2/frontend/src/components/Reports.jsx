import React from 'react';
import './Reports.css';

const Reports = () => {
  const reportData = {
    locationTypes: [
      { type: 'Building Entrance', count: 420, percentage: 35 },
      { type: 'Missing Street', count: 280, percentage: 22 },
      { type: 'Boundary Update', count: 190, percentage: 15 },
      { type: 'Fake/Duplicate', count: 120, percentage: 10 },
      { type: 'Landmark', count: 150, percentage: 12 },
      { type: 'Public Facility', count: 88, percentage: 6 }
    ],
    states: [
      { state: 'Maharashtra', count: 320, percentage: 26 },
      { state: 'Delhi', count: 210, percentage: 17 },
      { state: 'Karnataka', count: 180, percentage: 14 },
      { state: 'Tamil Nadu', count: 150, percentage: 12 },
      { state: 'Telangana', count: 130, percentage: 10 },
      { state: 'West Bengal', count: 110, percentage: 9 },
      { state: 'Gujarat', count: 90, percentage: 7 },
      { state: 'Uttar Pradesh', count: 58, percentage: 5 }
    ]
  };

  return (
    <div className="reports">
      <div className="reports-header">
        <h1>Analytics & Reports</h1>
        <p>Detailed insights into crowdsourced address data</p>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <h2>📍 Location Types Distribution</h2>
          <div className="chart-container">
            <div className="bar-chart">
              {reportData.locationTypes.map((item, index) => (
                <div key={index} className="bar-item">
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${item.percentage * 3}px`,
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                    }}
                  ></div>
                  <div className="bar-label">
                    <span className="bar-value">{item.count}</span>
                    <span className="bar-type">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="report-card">
          <h2>🏛️ State-wise Distribution</h2>
          <div className="chart-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Locations</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {reportData.states.map((state, index) => (
                  <tr key={index}>
                    <td>{state.state}</td>
                    <td>{state.count}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar-small" 
                          style={{ width: `${state.percentage}%` }}
                        ></div>
                        <span className="percentage-text">{state.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-card full-width">
          <h2>📅 Monthly Activity Trend</h2>
          <div className="chart-container">
            <div className="line-chart">
              <svg viewBox="0 0 600 200" className="chart-svg">
                <polyline
                  fill="none"
                  stroke="#3498db"
                  strokeWidth="3"
                  points="20,150 60,120 100,140 140,100 180,130 220,90 260,110 300,80 340,100 380,70 420,90 460,60 500,80 540,50 580,70"
                />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => (
                  <circle
                    key={i}
                    cx={20 + i * 40}
                    cy={150 - (i % 2 === 0 ? 30 : 20) + (i % 3 === 0 ? 10 : 0) - (i * 2)}
                    r="4"
                    fill="#3498db"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;