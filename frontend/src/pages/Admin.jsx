import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAdminDashboard, getPendingAlerts, broadcastAlert } from '../api/client';
import './Admin.css'; // Let's add custom styles

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [dashRes, alertsRes] = await Promise.all([
          getAdminDashboard(),
          getPendingAlerts()
        ]);
        setData(dashRes.data);
        setAlerts(alertsRes.data.alerts || []);
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
    
    // Auto-refresh alerts every 10 seconds for admin
    const interval = setInterval(async () => {
      try {
        const res = await getPendingAlerts();
        setAlerts(res.data.alerts || []);
      } catch (e) {}
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleBroadcast = async (alertId) => {
    if (!window.confirm("Are you sure you want to broadcast this emergency to the entire school?")) return;
    try {
      await broadcastAlert(alertId);
      // Refresh alerts
      const res = await getPendingAlerts();
      setAlerts(res.data.alerts || []);
      alert('Emergency Broadcast Sent!');
    } catch (err) {
      alert('Failed to send broadcast');
    }
  };

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
            <div className="admin-overview">
              <div className="admin-metric-card primary">
                <div className="metric-icon">🎓</div>
                <div className="metric-data">
                  <h3>{data.summary.totalStudents}</h3>
                  <p>Students Trained</p>
                </div>
              </div>
              
              <div className="admin-metric-card success">
                <div className="metric-icon">🎯</div>
                <div className="metric-data">
                  <h3>{data.summary.avgPreparednessScore}%</h3>
                  <p>Avg Preparedness Score</p>
                </div>
              </div>

              <div className="admin-metric-card warning">
                <div className="metric-icon">📋</div>
                <div className="metric-data">
                  <h3>{data.summary.drillAttendance}%</h3>
                  <p>Drill Attendance</p>
                </div>
              </div>

              <div className="admin-metric-card info">
                <div className="metric-icon">🎮</div>
                <div className="metric-data">
                  <h3>{data.summary.totalScenarios}</h3>
                  <p>Scenarios Available</p>
                </div>
              </div>
            </div>

            <div className="admin-dashboard-grid">
              {/* ALERTS SECTION (NEW) */}
              <div className="admin-section alerts-area" style={{ gridColumn: '1 / -1', borderColor: alerts.length > 0 ? '#ef4444' : '#334155' }}>
                <h3 style={{ color: alerts.length > 0 ? '#ef4444' : '#e2e8f0' }}>🚨 Active SOS Alerts</h3>
                <p className="section-desc">Real-time distress signals from students on campus.</p>
                <div className="alerts-container">
                  {alerts.length > 0 ? (
                    alerts.map(a => (
                      <div className="alert-card" key={a.id}>
                        <div className="alert-info">
                          <span className="alert-type">🔥 {a.disasterType} EMERGENCY</span>
                          <span className="alert-sender"><strong>{a.User.name}</strong> ({a.User.school})</span>
                          <span className="alert-time">{new Date(a.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <button className="btn-danger-broadcast" onClick={() => handleBroadcast(a.id)}>
                          Broadcast Alert to {a.User.school || 'Campus'}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="empty-state">No pending emergency alerts. Campus is safe. ✨</p>
                  )}
                </div>
              </div>

              {/* TOP RISK AREAS SECTION */}
              <div className="admin-section risk-areas">
                <h3>⚠️ Top Risk Areas</h3>
                <p className="section-desc">Disasters where students fail the most during simulations.</p>
                <div className="risk-bars-container">
                  {data.summary.topRiskAreas && data.summary.topRiskAreas.length > 0 ? (
                    data.summary.topRiskAreas.map((risk, index) => (
                      <div className="risk-bar-item" key={index}>
                        <div className="risk-bar-info">
                          <span className="risk-type">{risk.disasterType.toUpperCase()}</span>
                          <span className="risk-score">{risk.riskScore}% Failure Rate ({risk.failureCount} errors)</span>
                        </div>
                        <div className="risk-bar-track">
                          <div 
                            className={`risk-bar-fill ${risk.riskScore > 50 ? 'high-risk' : 'med-risk'}`} 
                            style={{ width: `${risk.riskScore}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="empty-state">No simulation failures recorded yet.</p>
                  )}
                </div>
              </div>

              {/* STUDENT TRACKING SECTION */}
              <div className="admin-section student-tracking">
                <div className="section-header">
                  <h3>👥 Student Tracking & Completion</h3>
                  <div className="admin-search">
                    <input
                      type="text"
                      placeholder="🔍 Search students..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>School</th>
                        <th>Status</th>
                        <th>Score (Acc)</th>
                        <th>Attempts</th>
                        <th>E-Coins</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s, i) => (
                        <tr key={s.id}>
                          <td>
                            <div className="student-identifier">
                              <span className="td-name">{s.name}</span>
                              <span className="td-email">{s.email}</span>
                            </div>
                          </td>
                          <td>{s.school || '—'}</td>
                          <td>
                            {s.scenariosAttempted > 0 ? (
                              <span className="status-badge active">✔️ Trained</span>
                            ) : (
                              <span className="status-badge pending">❌ Pending</span>
                            )}
                          </td>
                          <td><span className="accuracy-cell">{s.accuracy}%</span></td>
                          <td>{s.scenariosAttempted}</td>
                          <td><span className="coin-cell">🪙 {s.coins}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <p className="empty-state">No students match your search.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Failed to load admin data.</p>
        )}
      </div>
    </div>
  );
}
