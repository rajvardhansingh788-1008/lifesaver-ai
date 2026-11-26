import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAdminDashboard } from '../api/client';

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAdminDashboard();
        setData(res.data);
      } catch (err) {
        console.error('Admin error:', err);
        if (err.response?.status === 403) {
          navigate('/dashboard');
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = data?.students?.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.school && s.school.toLowerCase().includes(search.toLowerCase())) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="admin-page">
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
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/admin" className="nav-link active">Admin</Link>
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="admin-content">
        <h1>🔧 Admin Dashboard</h1>

        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
          </div>
        ) : data ? (
          <>
            <div className="admin-summary">
              <div className="admin-stat">
                <span className="admin-stat-num">{data.summary.totalStudents}</span>
                <span className="admin-stat-label">Students</span>
              </div>
              <div className="admin-stat">
                <span className="admin-stat-num">{data.summary.totalScenarios}</span>
                <span className="admin-stat-label">Scenarios</span>
              </div>
              <div className="admin-stat">
                <span className="admin-stat-num">{data.summary.totalAttempts}</span>
                <span className="admin-stat-label">Total Attempts</span>
              </div>
            </div>

            <div className="admin-search">
              <input
                type="text"
                placeholder="🔍 Search students by name, school, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>School</th>
                    <th>E-Coins</th>
                    <th>Accuracy</th>
                    <th>Scenarios</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
                      <td className="td-name">{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.school || '—'}</td>
                      <td><span className="coin-cell">🪙 {s.coins}</span></td>
                      <td><span className="accuracy-cell">{s.accuracy}%</span></td>
                      <td>{s.scenariosAttempted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="empty-state">No students match your search.</p>
              )}
            </div>
          </>
        ) : (
          <p>Failed to load admin data.</p>
        )}
      </div>
    </div>
  );
}
