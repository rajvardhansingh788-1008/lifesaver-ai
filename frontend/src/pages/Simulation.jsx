import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { startSimulation, submitAnswer } from '../api/client';
import SimulationCharacter from '../components/SimulationCharacter';
import AnimationLayer from '../components/AnimationLayer';
import './Simulation.css';

export default function Simulation() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [characterState, setCharacterState] = useState('idle');
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  const loadScenario = async () => {
    setStarted(true);
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

  // Auto-start on first render
  if (!started) {
    loadScenario();
  }

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
    <div className="simulation-page">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="logo-icon">🛡️</span>
          <span>LifeSaver AI</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/simulation" className="nav-link active">2D Simulate</Link>
          <Link to="/simulation-3d" className="nav-link">3D Simulate</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {user?.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="sim-game-container">
        {loading ? (
          <div className="sim-loader">
            <h1 className="comic-bangers blink-text">GENERATING SCENARIO...</h1>
          </div>
        ) : error ? (
          <div className="sim-error">
            <h2 className="text-red">ERROR!</h2>
            <p>{error}</p>
            <button onClick={loadScenario} className="sim-btn">RETRY</button>
          </div>
        ) : scenario && (
          <div className={`sim-scene bg-${scenario.disasterType} ${characterState === 'panic' ? 'comic-shake' : ''}`}>
            <div className="sim-animations">
              <AnimationLayer disasterType={scenario.disasterType} />
            </div>
            <div className="sim-top-bar">
              <span className={`sim-badge ${scenario.disasterType}`}>
                {scenario.disasterType === 'fire' ? '🔥 FIRE' : scenario.disasterType === 'earthquake' ? '🌍 EARTHQUAKE' : '🌊 FLOOD'} WARNING
              </span>
              <div className="sim-situation-box comic-neue">
                {scenario.situation}
              </div>
            </div>
            <div className="sim-stage">
              <div className="sim-character-wrapper">
                <SimulationCharacter state={characterState} />
              </div>
              {!result && (
                <div className="sim-thought-clouds">
                  {scenario.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`thought-cloud cloud-${i + 1} ${selectedOption === i ? 'cloud-selected' : ''}`}
                      onClick={() => handleSelectOption(i)}
                      disabled={submitting}
                    >
                      <span className="cloud-text comic-neue">{opt}</span>
                      <div className="cloud-circles">
                        <div className="c1"></div>
                        <div className="c2"></div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {result && (
                <div className="sim-result-panel comic-panel">
                  <h2 className={`comic-bangers ${result.correct ? 'text-green' : 'text-red'}`}>
                    {result.correct ? '✅ SURVIVED!' : '❌ FATAL ERROR!'}
                  </h2>
                  {!result.correct && scenario.options && scenario.options[scenario.correctAnswer] && (
                    <div className="comic-neue" style={{ margin: '1rem 0', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      Correct Action: {scenario.options[scenario.correctAnswer]}
                    </div>
                  )}
                  <p className="comic-neue">{result.explanation}</p>
                  {result.correct && (
                    <div className="coin-reward-box">
                      <span className="comic-bangers">🪙 +{result.coinsEarned} XP</span>
                    </div>
                  )}
                  <button className="sim-btn comic-bangers" onClick={loadScenario}>
                    NEXT SCENARIO 🡒
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
