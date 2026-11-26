import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('lifesaver_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('lifesaver_token');
      localStorage.removeItem('lifesaver_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

// Simulation
export const startSimulation = () => API.get('/simulation/start');
export const submitAnswer = (data) => API.post('/simulation/answer', data);

// Quiz
export const getQuizQuestions = (type) => API.get(`/quiz/questions?type=${type}`);
export const evaluateQuizAnswer = (data) => API.post('/quiz/evaluate', data);

// User
export const getProfile = () => API.get('/user/profile');

// Leaderboard
export const getLeaderboard = () => API.get('/leaderboard');

// Admin
export const getAdminDashboard = () => API.get('/admin/dashboard');

// Chatbot
export const sendChatMessage = (message) => API.post('/chatbot', { message });

// Web3
export const claimCoins = (data) => API.post('/web3/claim', data);

export default API;
