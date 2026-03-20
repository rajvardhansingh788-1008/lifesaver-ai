import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Simulation from './pages/Simulation';
import Simulation3D from './pages/Simulation3D';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import EmergencyMap from './pages/EmergencyMap';
import Guide from './pages/Guide';
import History from './pages/History';
import ChatBot from './components/ChatBot';
import SOSButton from './components/SOSButton';
import EmergencyBroadcast from './components/EmergencyBroadcast';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-state"><div className="spinner-large"></div></div>;
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-state"><div className="spinner-large"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/simulation" element={<ProtectedRoute><Simulation /></ProtectedRoute>} />
      <Route path="/simulation-3d" element={<ProtectedRoute><Simulation3D /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path="/map" element={<ProtectedRoute><EmergencyMap /></ProtectedRoute>} />
      <Route path="/guide" element={<ProtectedRoute><Guide /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function ChatBotWrapper() {
  const { user } = useAuth();
  // Don't show chatbot for admin, keep it for students
  return user && user.role !== 'admin' ? <ChatBot /> : null;
}

function GlobalAlertsWrapper() {
  const { user } = useAuth();
  return user && user.role !== 'admin' ? (
    <>
      <SOSButton />
      <EmergencyBroadcast />
    </>
  ) : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <GlobalAlertsWrapper />
        <ChatBotWrapper />
      </AuthProvider>
    </BrowserRouter>
  );
}
