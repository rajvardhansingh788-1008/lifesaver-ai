import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveBroadcasts } from '../api/client';
import { useAuth } from '../context/AuthContext';
import './EmergencyBroadcast.css';

export default function EmergencyBroadcast() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [broadcasts, setBroadcasts] = useState([]);
  const [dismissedLocal, setDismissedLocal] = useState({});

  useEffect(() => {
    if (!user || user.role === 'admin') return;

    const checkBroadcasts = async () => {
      try {
        const res = await getActiveBroadcasts();
        // Filter out any broadcasts we've manually dismissed locally
        const activeOnly = res.data.broadcasts.filter(b => !dismissedLocal[b.id]);
        setBroadcasts(activeOnly);
      } catch (err) {
        // Silently fail polling to not clutter console
      }
    };

    // Poll every 5 seconds for emergencies
    checkBroadcasts();
    const interval = setInterval(checkBroadcasts, 5000);
    return () => clearInterval(interval);
  }, [user, dismissedLocal]);

  if (broadcasts.length === 0) return null;

  const currentEmergency = broadcasts[0]; // Show the most recent one

  const handleDismiss = () => {
    setDismissedLocal(prev => ({ ...prev, [currentEmergency.id]: true }));
  };

  const handleGoToMap = () => {
    navigate('/map');
    handleDismiss(); // Optional: dismiss after clicking map
  };

  return (
    <div className="emergency-broadcast-overlay">
      <div className="eb-content">
        <h1 className="eb-title">🚨 SCHOOL-WIDE EMERGENCY 🚨</h1>
        <div className="eb-alert-box">
          <h2>{currentEmergency.disasterType.toUpperCase()} ALERT</h2>
          <p>An SOS signal for <strong>{currentEmergency.disasterType}</strong> has been verified at <strong>{user?.school}</strong>.</p>
          <p className="eb-instruction">Please stop what you are doing and follow evacuation protocols immediately!</p>
        </div>
        
        <div className="eb-actions">
          <button className="eb-btn eb-btn-primary" onClick={handleGoToMap}>
            🗺️ OPEN EVACUATION MAP
          </button>
          <button className="eb-btn eb-btn-secondary" onClick={handleDismiss}>
            I understand / Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
