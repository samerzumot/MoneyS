import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { usePlaidLink } from 'react-plaid-link';
import { plaidAPI, debtAPI, expenseAPI } from '../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const AccountConnections = () => {
  const [accounts, setAccounts] = useState([]);
  const [debts, setDebts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [accountsRes, debtsRes, expensesRes] = await Promise.all([
        plaidAPI.getAccounts().catch(() => ({ data: [] })),
        debtAPI.getDebts().catch(() => ({ data: [] })),
        expenseAPI.getExpenses().catch(() => ({ data: [] }))
      ]);

      setAccounts(accountsRes.data);
      setDebts(debtsRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const { open: openPlaid } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken) => {
      try {
        await plaidAPI.exchangePublicToken(publicToken);
        toast.success('Account connected successfully!');
        loadData();
      } catch (error) {
        toast.error('Failed to connect account');
        console.error(error);
      }
    }
  });

  const handleConnectAccount = async () => {
    try {
      const response = await plaidAPI.createLinkToken();
      setLinkToken(response.data.link_token);
      setTimeout(() => openPlaid(), 100);
    } catch (error) {
      toast.error('Failed to initialize connection');
      console.error(error);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await plaidAPI.syncTransactions();
      toast.success('Accounts synced successfully!');
      loadData();
    } catch (error) {
      toast.error('Failed to sync accounts');
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Connections</h1>
          <p className="mt-1 text-gray-600">Manage your connected accounts and debts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowPathIcon className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
            Sync
          </button>
          <button onClick={handleConnectAccount} className="btn-primary flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Connect Account
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connected Accounts</h2>
        {accounts.length === 0 ? (
          <div className="card text-center py-12">
            <BankIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No accounts connected</h3>
            <p className="text-gray-600 mb-6">Connect your bank accounts to get started</p>
            <button onClick={handleConnectAccount} className="btn-primary">
              Connect Your First Account
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.institution}</p>
                    <p className="text-sm text-gray-500 mt-1">••••{account.mask}</p>
                  </div>
                  <button className="text-gray-400 hover:text-danger-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(account.balance)}
                  </p>
                  <span className="badge-info text-xs mt-2">{account.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Debts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Debts</h2>
          <button className="btn-outline text-sm py-2 px-4">
            <PlusIcon className="h-4 w-4 inline mr-1" />
            Add Debt Manually
          </button>
        </div>
        
        {debts.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-600">No debts found. Add one manually or connect accounts.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{debt.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{debt.type?.replace('_', ' ')}</p>
                  </div>
                  <button className="text-gray-400 hover:text-danger-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Balance</p>
                    <p className="font-bold text-gray-900">{formatCurrency(debt.balance)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                    <p className="font-bold text-gray-900">{debt.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Min Payment</p>
                    <p className="font-bold text-gray-900">{formatCurrency(debt.minimumPayment)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Due Date</p>
                    <p className="font-bold text-gray-900">
                      {new Date(debt.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recurring Expenses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recurring Expenses</h2>
          <button className="btn-outline text-sm py-2 px-4">
            <PlusIcon className="h-4 w-4 inline mr-1" />
            Add Expense
          </button>
        </div>
        
        {expenses.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-600">No recurring expenses tracked yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{expense.name}</h3>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(expense.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-danger-600">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
                <span className="badge-info text-xs mt-2">{expense.frequency || 'Monthly'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BankIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

export default AccountConnections;
