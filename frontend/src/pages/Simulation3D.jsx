import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { startSimulation, submitAnswer } from '../api/client';
import ThreeScene from '../components/ThreeScene';
import './Simulation3D.css';

export default function Simulation3D() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [characterState, setCharacterState] = useState('idle');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadScenario();
  }, []);

  const loadScenario = async () => {
    setLoading(true);
    setScenario(null);
    setResult(null);
    setSelectedOption(null);
    setError('');
    setCharacterState('idle');
    try {
      const res = await startSimulation();
      setScenario(res.data);
      setCharacterState('panic');
    } catch (err) {
      setError('Failed to load simulation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = async (index) => {
    if (result || submitting) return;
    setSelectedOption(index);
    setSubmitting(true);
    try {
      const res = await submitAnswer({ scenarioId: scenario.id, selectedOption: index });
      setResult(res.data);
      setCharacterState(res.data.correct ? 'success' : 'failure');
      if (res.data.correct) {
        updateUser({ coins: res.data.totalCoins || user.coins + res.data.coinsEarned });
      }
    } catch (err) {
      setError('Failed to submit answer.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="simulation-3d-page">
      {/* Global Navigation - Standard Theme */}
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="logo-icon">🛡️</span>
          <span>LifeSaver AI (3D Mode)</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/simulation" className="nav-link">2D Simulate</Link>
          <Link to="/simulation-3d" className="nav-link active">3D Simulate</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {user?.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="sim3d-game-container">
        {loading ? (
          <div className="sim3d-loader">
            <span className="spinner-large"></span>
            <h2>Generating 3D Environment...</h2>
          </div>
        ) : error ? (
          <div className="sim3d-error">
            <h2>System Error</h2>
            <p>{error}</p>
            <button onClick={loadScenario} className="btn-primary">Retry Setup</button>
          </div>
        ) : scenario && (
          <div className="sim3d-viewport">
            {/* The 3D Render Engine */}
            <div className="sim3d-canvas-layer">
               <ThreeScene disasterType={scenario.disasterType} characterState={characterState} />
            </div>

            {/* UI Overlay */}
            <div className="sim3d-overlay">
               {/* Top Bar HUD */}
               <div className="sim3d-hud-top">
                 <div className={`sim3d-disaster-badge badge-${scenario.disasterType}`}>
                    {scenario.disasterType.toUpperCase()} WARNING
                 </div>
                 <div className="sim3d-situation-box">
                    <h3>{scenario.title}</h3>
                    <p>{scenario.situation}</p>
                    <small>Rotate the camera using hold & drag!</small>
                 </div>
               </div>

               {/* Interaction Elements (Thought Bubbles) */}
               {!result && (
                 <div className="sim3d-options-layer">
                   {scenario.options.map((opt, i) => (
                      <button 
                        key={i} 
                        className={`sim3d-thought-cloud pos-${i} ${selectedOption === i ? 'selected' : ''}`}
                        onClick={() => handleSelectOption(i)}
                        disabled={submitting}
                      >
                         <p>{opt}</p>
                         <div className="sim3d-cloud-tail">
                            <div className="tail-1"></div>
                            <div className="tail-2"></div>
                         </div>
                      </button>
                   ))}
                 </div>
               )}

               {/* Results Modal */}
               {result && (
                 <div className="sim3d-results-modal">
                    <h2 className={result.correct ? "win" : "lose"}>
                      {result.correct ? "SURVIVAL SUCCESS" : "MISSION FAILED"}
                    </h2>
                    
                    {!result.correct && scenario.options[scenario.correctAnswer] && (
                       <div className="correct-answer-reveal">
                         <strong>Correct Action:</strong> {scenario.options[scenario.correctAnswer]}
                       </div>
                    )}
                    
                    <p className="explanation">{result.explanation}</p>
                    {result.correct && (
                      <div className="reward">🪙 +{result.coinsEarned} E-Coins</div>
                    )}
                    <button className="btn-primary" onClick={loadScenario}>
                      Next Scenario →
                    </button>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
