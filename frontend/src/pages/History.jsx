import { useState } from 'react';
import { historicalDisastersData } from '../data/historicalDisasters';
import './History.css';

export default function History() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>🕰️ Historical Disasters</h1>
        <p>Learning from the past to protect the future. Explore major events that shaped modern emergency protocols.</p>
      </div>

      <div className="history-gallery">
        {historicalDisastersData.map((disaster) => (
          <div 
            key={disaster.id} 
            className="history-card"
            onClick={() => setSelectedEvent(disaster)}
          >
            <div className="history-image" style={{ backgroundImage: `url(${disaster.imageUrl})` }}>
              <div className="history-year-badge">{disaster.year}</div>
            </div>
            <div className="history-card-content">
              <h3>{disaster.title}</h3>
              <p className="history-location">📍 {disaster.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="history-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="history-modal" onClick={e => e.stopPropagation()}>
            <button className="history-close-btn" onClick={() => setSelectedEvent(null)}>&times;</button>
            
            <div className="history-modal-image" style={{ backgroundImage: `url(${selectedEvent.imageUrl})` }}></div>
            
            <div className="history-modal-body">
              <div className="history-modal-header">
                <h2>{selectedEvent.title}</h2>
                <span className="modal-year">{selectedEvent.year}</span>
              </div>
              
              <div className="history-meta">
                <span><strong>Location:</strong> {selectedEvent.location}</span>
                <span className="modal-casualties"><strong>Estimated Casualties:</strong> {selectedEvent.casualties}</span>
              </div>
              
              <div className="history-section">
                <h3>The Event</h3>
                <p>{selectedEvent.description}</p>
              </div>
              
              <div className="history-section lesson">
                <h3>💡 Lessons Learned</h3>
                <p>{selectedEvent.lessonsLearned}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
