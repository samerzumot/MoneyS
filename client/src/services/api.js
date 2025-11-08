import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const plaidAPI = {
  // Create link token
  createLinkToken: () => api.post('/plaid/create-link-token'),
  
  // Exchange public token
  exchangePublicToken: (publicToken) => 
    api.post('/plaid/exchange-public-token', { publicToken }),
  
  // Get accounts
  getAccounts: () => api.get('/plaid/accounts'),
  
  // Get liabilities (debts)
  getLiabilities: () => api.get('/plaid/liabilities'),
  
  // Sync transactions
  syncTransactions: () => api.post('/plaid/sync-transactions'),
};

export const debtAPI = {
  // Get all debts
  getDebts: () => api.get('/debts'),
  
  // Get single debt
  getDebt: (id) => api.get(`/debts/${id}`),
  
  // Create debt
  createDebt: (debtData) => api.post('/debts', debtData),
  
  // Update debt
  updateDebt: (id, debtData) => api.put(`/debts/${id}`, debtData),
  
  // Delete debt
  deleteDebt: (id) => api.delete(`/debts/${id}`),
  
  // Get payoff plan
  getPayoffPlan: () => api.get('/debts/payoff-plan'),
  
  // Calculate payoff plan
  calculatePayoffPlan: (data) => api.post('/debts/calculate-payoff', data),
};

export const expenseAPI = {
  // Get all recurring expenses
  getExpenses: () => api.get('/expenses'),
  
  // Get single expense
  getExpense: (id) => api.get(`/expenses/${id}`),
  
  // Create expense
  createExpense: (expenseData) => api.post('/expenses', expenseData),
  
  // Update expense
  updateExpense: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  
  // Delete expense
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  
  // Mark expense as paid
  markAsPaid: (id) => api.post(`/expenses/${id}/paid`),
  
  // Get upcoming expenses
  getUpcoming: () => api.get('/expenses/upcoming'),
};

export const notificationAPI = {
  // Get notifications
  getNotifications: () => api.get('/notifications'),
  
  // Mark as read
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  
  // Get unread count
  getUnreadCount: () => api.get('/notifications/unread-count'),
  
  // Update notification settings
  updateSettings: (settings) => api.put('/notifications/settings', settings),
};

export const userAPI = {
  // Get user profile
  getProfile: () => api.get('/user/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  
  // Get user settings
  getSettings: () => api.get('/user/settings'),
  
  // Update user settings
  updateSettings: (settings) => api.put('/user/settings', settings),
  
  // Complete onboarding
  completeOnboarding: () => api.post('/user/complete-onboarding'),
};

export const dashboardAPI = {
  // Get dashboard summary
  getSummary: () => api.get('/dashboard/summary'),
  
  // Get debt history
  getDebtHistory: (timeRange = '6m') => api.get(`/dashboard/debt-history?range=${timeRange}`),
  
  // Get spending insights
  getSpendingInsights: () => api.get('/dashboard/spending-insights'),
};

export default api;
