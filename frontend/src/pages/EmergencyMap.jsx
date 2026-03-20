import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EmergencyMap.css';

export default function EmergencyMap() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [currentLocation, setCurrentLocation] = useState('Room 101');
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [disasterType, setDisasterType] = useState('None');
  const [animating, setAnimating] = useState(false);

  // Simple predefined paths for different starting locations during a Fire
  const routes = {
    'Room 101': { safe: 'path-room101', blocked: ['path-hallway-east'] },
    'Chemistry Lab': { safe: 'path-lab', blocked: ['path-main-stairs'] },
    'Library': { safe: 'path-library', blocked: ['path-library-corridor'] },
  };

  const activeRoute = emergencyActive ? routes[currentLocation] : null;

  const triggerEmergency = (type) => {
    setDisasterType(type);
    setEmergencyActive(false);
    setAnimating(false);
    
    // Reset and trigger animation
    setTimeout(() => {
      setEmergencyActive(true);
      setAnimating(true);
    }, 100);
  };

  return (
    <div className="map-page">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="logo-icon">🛡️</span>
          <span>LifeSaver AI</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/map" className="nav-link active">Campus Map</Link>
          <Link to="/simulation" className="nav-link">2D Simulate</Link>
          <Link to="/simulation-3d" className="nav-link">3D Simulate</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {user?.role === 'admin' && (
             <Link to="/admin" className="nav-link">Admin</Link>
          )}
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="map-content">
        <div className="map-header">
          <h1>Campus <span className="highlight">Evacuation Map</span> 🗺️</h1>
          <p>Find the safest route to the assembly point during an emergency.</p>
        </div>

        <div className="map-controls">
          <div className="control-group">
            <label>Your Current Location:</label>
            <select 
              value={currentLocation} 
              onChange={(e) => {
                setCurrentLocation(e.target.value);
                setEmergencyActive(false); // Reset on change
              }}
              className="location-select"
            >
              <option value="Room 101">Room 101 (West Wing)</option>
              <option value="Chemistry Lab">Chemistry Lab (East Wing)</option>
              <option value="Library">Library (North Wing)</option>
            </select>
          </div>
          
          <div className="control-group">
            <button className="btn-danger" onClick={() => triggerEmergency('Fire')}>
              🔥 Simulate Fire Drill
            </button>
            <button className="btn-warning" onClick={() => triggerEmergency('Earthquake')}>
              🌍 Simulate Earthquake
            </button>
          </div>
        </div>

        <div className="map-container">
          <div className="map-legend">
            <h4>Legend</h4>
            <div className="legend-item"><span className="legend-color safe"></span> Safe Route</div>
            <div className="legend-item"><span className="legend-color blocked"></span> Blocked/Hazard</div>
            <div className="legend-item"><span className="legend-color assembly"></span> Assembly Point</div>
            <div className="legend-item"><span className="legend-color you"></span> You Are Here</div>
          </div>

          <div className="svg-wrapper">
            <svg viewBox="0 0 800 500" className={`campus-svg ${emergencyActive ? 'emergency-mode' : ''}`}>
              {/* Background Campus Grid/Layout */}
              <rect x="50" y="50" width="700" height="400" className="campus-floor" rx="10" />
              
              {/* Rooms */}
              <rect x="70" y="70" width="150" height="120" className="room" />
              <text x="145" y="135" className="room-label">Room 101</text>
              
              <rect x="70" y="210" width="150" height="120" className="room" />
              <text x="145" y="275" className="room-label">Room 102</text>

              <rect x="580" y="70" width="150" height="120" className="room" />
              <text x="655" y="135" className="room-label">Chemistry Lab</text>

              <rect x="250" y="70" width="300" height="100" className="room library" />
              <text x="400" y="125" className="room-label">Library</text>

              {/* Hallways (Implicit space between rooms) */}
              <text x="400" y="250" className="corridor-label">Main Corridor</text>

              {/* Assembly Point */}
              <circle cx="400" cy="420" r="40" className="assembly-point" />
              <text x="400" y="425" className="assembly-label">ASSEMBLY</text>

              {/* Base Routes (Hidden until active) */}
              <g className="routes">
                {/* Room 101 Safe Route */}
                <path 
                  id="path-room101" 
                  d="M 145 135 L 240 135 L 240 250 L 400 250 L 400 380" 
                  className={`route-line safe-route ${activeRoute?.safe === 'path-room101' ? 'active animating' : ''}`}
                />
                
                {/* Chemistry Lab Safe Route */}
                <path 
                  id="path-lab" 
                  d="M 655 135 L 560 135 L 560 250 L 400 250 L 400 380" 
                  className={`route-line safe-route ${activeRoute?.safe === 'path-lab' ? 'active animating' : ''}`}
                />

                {/* Library Safe Route */}
                <path 
                  id="path-library" 
                  d="M 400 125 L 400 380" 
                  className={`route-line safe-route ${activeRoute?.safe === 'path-library' ? 'active animating' : ''}`}
                />

                {/* Blocked Routes */}
                <path 
                  id="path-hallway-east" 
                  d="M 500 250 L 700 250" 
                  className={`route-line blocked-route ${emergencyActive && activeRoute?.blocked.includes('path-hallway-east') ? 'active' : ''}`}
                />
                <path 
                  id="path-main-stairs" 
                  d="M 400 200 L 400 250" 
                  className={`route-line blocked-route ${emergencyActive && activeRoute?.blocked.includes('path-main-stairs') ? 'active' : ''}`}
                />
                <path 
                  id="path-library-corridor" 
                  d="M 250 250 L 400 250" 
                  className={`route-line blocked-route ${emergencyActive && activeRoute?.blocked.includes('path-library-corridor') ? 'active' : ''}`}
                />
              </g>

              {/* Location Markers */}
              {currentLocation === 'Room 101' && <circle cx="145" cy="135" r="8" className="location-marker pulse" />}
              {currentLocation === 'Chemistry Lab' && <circle cx="655" cy="135" r="8" className="location-marker pulse" />}
              {currentLocation === 'Library' && <circle cx="400" cy="125" r="8" className="location-marker pulse" />}

              {/* Fire/Hazard visualizer */}
              {emergencyActive && activeRoute?.blocked.map((blockId, idx) => {
                let x = 0, y = 0;
                if (blockId === 'path-hallway-east') { x = 600; y = 250; }
                if (blockId === 'path-main-stairs') { x = 400; y = 225; }
                if (blockId === 'path-library-corridor') { x = 325; y = 250; }
                
                return (
                  <g key={idx} transform={`translate(${x}, ${y})`}>
                    <circle r="15" fill="rgba(239, 68, 68, 0.4)" className="hazard-pulse" />
                    <text textAnchor="middle" y="5" fontSize="16">❌</text>
                  </g>
                )
              })}

            </svg>
          </div>
        </div>
        
        {emergencyActive && (
          <div className="emergency-alert">
            <div className="alert-icon">⚠️</div>
            <div className="alert-text">
              <strong>{disasterType} Alert Detected!</strong><br />
              Please follow the <span className="safe-text">Green Path</span> to the Assembly Point immediately. Avoid the zones marked with <span className="danger-text">Red Crosses</span>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
