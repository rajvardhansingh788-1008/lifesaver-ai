import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getQuizQuestions, evaluateQuizAnswer } from '../api/client';
import './Quiz.css'; // Let's also create this file if it doesn't exist, we'll check later

export default function Quiz() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // states: 'select', 'active', 'complete'
  const [mode, setMode] = useState('select');
  const [quizType, setQuizType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  
  const [quizMetrics, setQuizMetrics] = useState({ correct: 0, coins: 0, total: 0 });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const startQuiz = async (type) => {
    setLoading(true);
    setMode('active');
    setQuizType(type);
    setCurrentIndex(0);
    setAnswerResult(null);
    setSelectedOption(null);
    setQuizMetrics({ correct: 0, coins: 0, total: 0 });
    setError('');

    try {
      const res = await getQuizQuestions(type);
      setQuestions(res.data.questions);
      setQuizMetrics(prev => ({ ...prev, total: res.data.questions.length }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load quiz questions');
      setMode('select');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (idx) => {
    if (answerResult) return; // Prevent changing answer after submission
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = async () => {
    if (selectedOption === null) return;
    setSubmitting(true);
    setError('');

    const currentQuestion = questions[currentIndex];

    try {
      const res = await evaluateQuizAnswer({
        questionId: currentQuestion.id,
        selectedOption,
        disasterType: quizType
      });

      setAnswerResult({
        ...res.data,
        selectedOption
      });

      // Update local metrics
      setQuizMetrics(prev => ({
        ...prev,
        correct: prev.correct + (res.data.correct ? 1 : 0),
        coins: prev.coins + res.data.coinsEarned
      }));

      // Update global user state for immediate feedback on the navbar
      updateUser({ coins: res.data.totalCoins });

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to evaluate answer');
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setAnswerResult(null);
      setError('');
    } else {
      setMode('complete');
    }
  };

  const resetQuiz = () => {
    setMode('select');
    setQuizType(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswerResult(null);
    setError('');
  };

  // Render helpers
  const renderSelection = () => (
    <div className="quiz-selection-container">
      <h2>Select a Disaster to Start</h2>
      <p>Test your knowledge and earn E-Coins!</p>
      
      <div className="disaster-cards">
        <div className="disaster-card" onClick={() => startQuiz('fire')}>
          <div className="card-icon">🔥</div>
          <h3>Fire Safety</h3>
          <p>Learn how to survive indoor and outdoor fires.</p>
        </div>
        
        <div className="disaster-card" onClick={() => startQuiz('earthquake')}>
          <div className="card-icon">🌍</div>
          <h3>Earthquake</h3>
          <p>Master Drop, Cover, and Hold On techniques.</p>
        </div>
        
        <div className="disaster-card" onClick={() => startQuiz('flood')}>
          <div className="card-icon">🌊</div>
          <h3>Flood Danger</h3>
          <p>Navigate flash floods and rising waters safely.</p>
        </div>

        <div className="disaster-card" onClick={() => startQuiz('medical')}>
          <div className="card-icon">🩺</div>
          <h3>Medical Emergency</h3>
          <p>Learn life-saving first aid and response.</p>
        </div>

        <div className="disaster-card" onClick={() => startQuiz('storm')}>
          <div className="card-icon">⛈️</div>
          <h3>Extreme Storms</h3>
          <p>Survive tornadoes, hurricanes, and blizzards.</p>
        </div>
      </div>
    </div>
  );

  const renderActiveQuiz = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Preparing {quizType} scenarios...</p>
        </div>
      );
    }

    if (!questions.length) return null;

    const currentQ = questions[currentIndex];

    return (
      <div className="active-quiz-container">
        <div className="quiz-progress">
          Question {currentIndex + 1} of {questions.length}
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="quiz-question-card">
          <span className={`disaster-mini-badge ${quizType}`}>
            {quizType === 'fire' ? '🔥' : quizType === 'earthquake' ? '🌍' : quizType === 'flood' ? '🌊' : quizType === 'medical' ? '🩺' : '⛈️'}
          </span>
          <h3>{currentQ.title}</h3>
          <p className="question-text">{currentQ.situation}</p>

          <div className="quiz-options">
            {currentQ.options.map((opt, idx) => {
              let btnClass = `quiz-option ${selectedOption === idx ? 'selected' : ''}`;
              
              if (answerResult) {
                if (idx === answerResult.correctOption) {
                  btnClass += ' correct';
                } else if (idx === selectedOption && !answerResult.correct) {
                  btnClass += ' incorrect';
                }
                btnClass += ' disabled';
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleSelect(idx)}
                  disabled={answerResult !== null}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {answerResult ? (
          <div className={`result-panel ${answerResult.correct ? 'result-correct' : 'result-incorrect'} animation-pop`}>
            <div className="result-header">
              <span className="result-icon">{answerResult.correct ? '✅' : '❌'}</span>
              <h3>{answerResult.correct ? 'Correct Answer!' : 'Incorrect!'}</h3>
            </div>
            <p className="result-explanation">{answerResult.explanation}</p>
            <div className="result-coins">
              <span className="coin-badge">🪙 +{answerResult.coinsEarned} E-Coins</span>
            </div>
            
            <button className="btn-primary" onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? 'Next Question ➡️' : 'Finish Quiz 🏁'}
            </button>
          </div>
        ) : (
          <button
            className="btn-primary submit-quiz-btn"
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null || submitting}
          >
            {submitting ? <span className="spinner"></span> : 'Submit Answer'}
          </button>
        )}
      </div>
    );
  };

  const renderComplete = () => {
    const percentage = Math.round((quizMetrics.correct / quizMetrics.total) * 100) || 0;
    
    return (
      <div className="quiz-complete-container">
        <div className="quiz-score-card animation-pop">
          <h2>Quiz Complete! 🎉</h2>
          <div className="score-circle">
            <span className="score-num">{quizMetrics.correct}/{quizMetrics.total}</span>
            <span className="score-pct">{percentage}%</span>
          </div>
          <div className="quiz-coins" style={{ marginTop: '20px', fontSize: '1.2rem' }}>
            <span className="coin-badge">🪙 +{quizMetrics.coins} E-Coins Total Earned</span>
          </div>
        </div>
        
        <button className="btn-primary" onClick={resetQuiz} style={{ marginTop: '30px' }}>
          🔄 Take Another Quiz
        </button>
      </div>
    );
  };

  return (
    <div className="quiz-page">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="logo-icon">🛡️</span>
          <span>LifeSaver AI</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/simulation" className="nav-link">2D Simulate</Link>
          <Link to="/simulation-3d" className="nav-link">3D Simulate</Link>
          <Link to="/quiz" className="nav-link active">Quiz</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {user?.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="quiz-content">
        <div className="quiz-header">
          <h1>📝 Disaster Knowledge Quiz</h1>
        </div>

        {mode === 'select' && renderSelection()}
        {mode === 'active' && renderActiveQuiz()}
        {mode === 'complete' && renderComplete()}
      </div>
    </div>
  );
}
