import { useState } from 'react';
import { submitSOS } from '../api/client';
import './SOSButton.css';

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSOSClick = () => {
    setIsOpen(true);
    setSuccess(false);
    setError('');
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedDisaster('');
  };

  const handleSendSOS = async () => {
    if (!selectedDisaster) {
      setError('Please select a disaster type first.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitSOS({ disasterType: selectedDisaster });
      setSuccess(true);
      setTimeout(() => {
        closeDialog();
      }, 3000);
    } catch (err) {
      setError('Failed to send SOS. Please try again or shout for help.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating SOS Button */}
      {!isOpen && (
        <button className="sos-float-btn" onClick={handleSOSClick} title="Emergency SOS">
          🆘 SOS
        </button>
      )}

      {/* SOS Modal */}
      {isOpen && (
        <div className="sos-modal-overlay">
          <div className="sos-modal">
            <button className="sos-close-btn" onClick={closeDialog}>&times;</button>
            <h2 className="sos-title">🚨 EMERGENCY SOS</h2>
            
            {success ? (
              <div className="sos-success">
                <h3>SOS Alert Sent Successfully!</h3>
                <p>Campus Admin has been notified of your situation.</p>
                <p>Please stay calm and evacuate if possible.</p>
              </div>
            ) : (
              <>
                <p className="sos-desc">Please identify the ongoing emergency:</p>
                <div className="sos-options">
                  <button 
                    className={`sos-option-btn ${selectedDisaster === 'Fire' ? 'selected' : ''}`}
                    onClick={() => setSelectedDisaster('Fire')}
                  >
                    🔥 Fire
                  </button>
                  <button 
                    className={`sos-option-btn ${selectedDisaster === 'Earthquake' ? 'selected' : ''}`}
                    onClick={() => setSelectedDisaster('Earthquake')}
                  >
                    🌍 Earthquake
                  </button>
                  <button 
                    className={`sos-option-btn ${selectedDisaster === 'Flood' ? 'selected' : ''}`}
                    onClick={() => setSelectedDisaster('Flood')}
                  >
                    🌊 Flood
                  </button>
                  <button 
                    className={`sos-option-btn ${selectedDisaster === 'Active Shooter' ? 'selected' : ''}`}
                    onClick={() => setSelectedDisaster('Active Shooter')}
                  >
                    ⚠️ Intruder/Shooter
                  </button>
                  <button 
                    className={`sos-option-btn ${selectedDisaster === 'Medical' ? 'selected' : ''}`}
                    onClick={() => setSelectedDisaster('Medical')}
                  >
                    🚑 Medical Emergency
                  </button>
                </div>
                
                {error && <p className="sos-error">{error}</p>}
                
                <button 
                  className="sos-submit-btn" 
                  onClick={handleSendSOS}
                  disabled={isSubmitting || !selectedDisaster}
                >
                  {isSubmitting ? 'Sending...' : 'SEND SOS DURESS SIGNAL'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
