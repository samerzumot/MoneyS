import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCardIcon,
  CalendarIcon,
  ChartBarIcon,
  BanknotesIcon,
  PlusIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { debtAPI, expenseAPI, dashboardAPI } from '../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [debts, setDebts] = useState([]);
  const [upcomingExpenses, setUpcomingExpenses] = useState([]);
  const [debtHistory, setDebtHistory] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, debtsRes, expensesRes, historyRes] = await Promise.all([
        dashboardAPI.getSummary(),
        debtAPI.getDebts(),
        expenseAPI.getUpcoming(),
        dashboardAPI.getDebtHistory()
      ]);

      setSummary(summaryRes.data);
      setDebts(debtsRes.data);
      setUpcomingExpenses(expensesRes.data);
      setDebtHistory(historyRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      // Use mock data for demo if API fails
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    // Mock data for demonstration
    setSummary({
      totalDebt: 45250,
      totalMonthlyPayment: 1850,
      estimatedPayoffMonths: 36,
      interestSaved: 8420,
      upcomingPayments: 3
    });

    setDebts([
      {
        id: 1,
        name: 'Chase Sapphire Card',
        type: 'credit_card',
        balance: 8500,
        interestRate: 18.99,
        minimumPayment: 255,
        suggestedPayment: 350,
        dueDate: '2025-11-15'
      },
      {
        id: 2,
        name: 'Student Loan - Federal',
        type: 'student_loan',
        balance: 28000,
        interestRate: 4.5,
        minimumPayment: 350,
        suggestedPayment: 500,
        dueDate: '2025-11-20'
      },
      {
        id: 3,
        name: 'Car Loan',
        type: 'auto_loan',
        balance: 8750,
        interestRate: 6.2,
        minimumPayment: 295,
        suggestedPayment: 400,
        dueDate: '2025-11-10'
      }
    ]);

    setUpcomingExpenses([
      { id: 1, name: 'Rent', amount: 1800, dueDate: '2025-11-01', status: 'upcoming' },
      { id: 2, name: 'Electric Bill', amount: 120, dueDate: '2025-11-05', status: 'upcoming' },
      { id: 3, name: 'Netflix', amount: 15.99, dueDate: '2025-11-12', status: 'upcoming' }
    ]);

    setDebtHistory([
      { month: 'Jun', total: 52000 },
      { month: 'Jul', total: 50500 },
      { month: 'Aug', total: 49200 },
      { month: 'Sep', total: 47800 },
      { month: 'Oct', total: 46500 },
      { month: 'Nov', total: 45250 }
    ]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const COLORS = ['#0ea5e9', '#f59e0b', '#22c55e', '#ef4444', '#a855f7'];

  const debtByType = debts.reduce((acc, debt) => {
    const type = debt.type || 'other';
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value += debt.balance;
    } else {
      acc.push({ name: type.replace('_', ' '), value: debt.balance });
    }
    return acc;
  }, []);

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Debt Card */}
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <CreditCardIcon className="h-8 w-8 opacity-80" />
            <span className="badge bg-white/20 text-white">Total</span>
          </div>
          <p className="text-sm opacity-90 mb-1">Total Debt</p>
          <p className="text-3xl font-bold">{formatCurrency(summary?.totalDebt || 0)}</p>
          <div className="mt-4 flex items-center text-sm opacity-90">
            <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
            <span>Down {formatCurrency(6750)} this year</span>
          </div>
        </div>

        {/* Monthly Payment Card */}
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <BanknotesIcon className="h-8 w-8 text-primary-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(summary?.totalMonthlyPayment || 0)}</p>
          <div className="mt-4 text-sm text-gray-600">
            AI optimized plan
          </div>
        </div>

        {/* Payoff Timeline Card */}
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <CalendarIcon className="h-8 w-8 text-warning-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Estimated Payoff</p>
          <p className="text-3xl font-bold text-gray-900">{summary?.estimatedPayoffMonths || 0} months</p>
          <div className="mt-4 text-sm text-success-600">
            3 months faster than minimum
          </div>
        </div>

        {/* Interest Saved Card */}
        <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <ChartBarIcon className="h-8 w-8 opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">Interest Saved</p>
          <p className="text-3xl font-bold">{formatCurrency(summary?.interestSaved || 0)}</p>
          <div className="mt-4 flex items-center text-sm opacity-90">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span>vs. minimum payments</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Debt Over Time Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Debt Progress</h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={debtHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="total" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Debt Distribution Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Debt by Type</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={debtByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {debtByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Debts and Expenses Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Debt Cards - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Debts</h2>
            <button className="btn-outline text-sm py-2 px-4">
              <PlusIcon className="h-4 w-4 inline mr-1" />
              Add Debt
            </button>
          </div>

          {debts.map((debt) => {
            const daysUntil = getDaysUntilDue(debt.dueDate);
            const isUrgent = daysUntil <= 7;
            
            return (
              <div key={debt.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{debt.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{debt.type?.replace('_', ' ')}</p>
                  </div>
                  {isUrgent && (
                    <span className="badge-danger">Due in {daysUntil} days</span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Balance</p>
                    <p className="font-bold text-gray-900">{formatCurrency(debt.balance)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                    <p className="font-bold text-gray-900">{debt.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Minimum Payment</p>
                    <p className="font-bold text-gray-900">{formatCurrency(debt.minimumPayment)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">AI Suggested</p>
                    <p className="font-bold text-success-600">{formatCurrency(debt.suggestedPayment)}</p>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>12% paid off</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                    <div style={{ width: '12%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upcoming Expenses */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Bills</h2>
          
          {upcomingExpenses.map((expense) => {
            const daysUntil = getDaysUntilDue(expense.dueDate);
            const isUrgent = daysUntil <= 3;

            return (
              <div key={expense.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{expense.name}</h3>
                    <p className="text-xs text-gray-500">Due {new Date(expense.dueDate).toLocaleDateString()}</p>
                  </div>
                  {isUrgent && (
                    <span className="badge-danger text-xs">{daysUntil} days</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
              </div>
            );
          })}

          <Link to="/accounts" className="block">
            <button className="btn-secondary w-full">
              <PlusIcon className="h-5 w-5 inline mr-2" />
              Add Expense
            </button>
          </Link>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="card bg-gradient-to-br from-purple-50 to-primary-50 border-2 border-primary-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-xl bg-primary-600 flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-success-600 mr-2">✓</span>
                <span>Pay an extra $100 on Chase Sapphire to save $420 in interest</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning-600 mr-2">!</span>
                <span>Consider refinancing your car loan to reduce interest from 6.2% to 4.8%</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">💡</span>
                <span>You could be debt-free 5 months earlier by increasing monthly payment by $200</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
