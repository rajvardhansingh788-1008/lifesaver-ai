import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLeaderboard } from '../api/client';

export default function Leaderboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({ topStudents: [], topSchools: [] });
  const [tab, setTab] = useState('students');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLeaderboard();
        setData(res.data);
      } catch (err) {
        console.error('Leaderboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getRankBadge = (i) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

  return (
    <div className="leaderboard-page">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="logo-icon">🛡️</span>
          <span>LifeSaver AI</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/simulation" className="nav-link">2D Simulate</Link>
          <Link to="/simulation-3d" className="nav-link">3D Simulate</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/leaderboard" className="nav-link active">Leaderboard</Link>
          {user?.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="leaderboard-content">
        <h1>🏆 Leaderboard</h1>

        <div className="tab-bar">
          <button className={tab === 'students' ? 'tab active' : 'tab'} onClick={() => setTab('students')}>
            👤 Top Students
          </button>
          <button className={tab === 'schools' ? 'tab active' : 'tab'} onClick={() => setTab('schools')}>
            🏫 Top Schools
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
          </div>
        ) : tab === 'students' ? (
          <div className="leaderboard-list">
            {data.topStudents.length === 0 ? (
              <p className="empty-state">No students yet. Be the first! 🚀</p>
            ) : (
              data.topStudents.map((s, i) => (
                <div key={i} className={`leader-card ${i < 3 ? 'top-three' : ''}`}>
                  <span className="rank">{getRankBadge(i)}</span>
                  <div className="leader-info">
                    <span className="leader-name">{s.name}</span>
                    <span className="leader-school">{s.school || 'No school'}</span>
                  </div>
                  <div className="leader-stats">
                    <span className="leader-coins">🪙 {s.coins}</span>
                    <span className="leader-accuracy">🎯 {s.accuracy}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="leaderboard-list">
            {data.topSchools.length === 0 ? (
              <p className="empty-state">No schools yet.</p>
            ) : (
              data.topSchools.map((s, i) => (
                <div key={i} className={`leader-card ${i < 3 ? 'top-three' : ''}`}>
                  <span className="rank">{getRankBadge(i)}</span>
                  <div className="leader-info">
                    <span className="leader-name">{s.school}</span>
                    <span className="leader-school">{s.studentCount} students</span>
                  </div>
                  <div className="leader-stats">
                    <span className="leader-coins">🪙 {s.totalCoins}</span>
                    <span className="leader-accuracy">🎯 {Math.round(s.avgAccuracy)}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
