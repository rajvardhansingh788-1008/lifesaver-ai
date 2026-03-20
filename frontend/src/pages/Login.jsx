import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginAPI, signup as signupAPI } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', school: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = isSignup
        ? await signupAPI(form)
        : await loginAPI({ email: form.email, password: form.password });
      loginUser(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.details?.join(', ') || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="fire-particle p1"></div>
        <div className="fire-particle p2"></div>
        <div className="fire-particle p3"></div>
        <div className="water-wave w1"></div>
        <div className="water-wave w2"></div>
      </div>

      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">🛡️</span>
          <h1>LifeSaver AI</h1>
          <p className="auth-subtitle">Disaster Training Platform</p>
        </div>

        <div className="auth-toggle">
          <button
            className={!isSignup ? 'active' : ''}
            onClick={() => { setIsSignup(false); setError(''); }}
          >
            Login
          </button>
          <button
            className={isSignup ? 'active' : ''}
            onClick={() => { setIsSignup(true); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="school">School / Institution</label>
                <input
                  id="school"
                  type="text"
                  name="school"
                  placeholder="Enter your school"
                  value={form.school}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              isSignup ? '🚀 Create Account' : '🔐 Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
