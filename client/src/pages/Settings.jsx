import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon, UserIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Settings = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    paymentReminders: true,
    weeklyReport: true,
    marketingEmails: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon }
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ displayName: profile.name });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleNotificationUpdate = (e) => {
    e.preventDefault();
    toast.success('Notification preferences updated!');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="input bg-gray-50 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              <form onSubmit={handleNotificationUpdate} className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Notification Channels</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                        className="h-5 w-5 text-primary-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Get browser push notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                        className="h-5 w-5 text-primary-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive text message alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                        className="h-5 w-5 text-primary-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">What to Send</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Payment Reminders</p>
                        <p className="text-sm text-gray-600">Get reminded before payments are due</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.paymentReminders}
                        onChange={(e) => setNotifications({ ...notifications, paymentReminders: e.target.checked })}
                        className="h-5 w-5 text-primary-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Weekly Reports</p>
                        <p className="text-sm text-gray-600">Weekly summary of your progress</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.weeklyReport}
                        onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                        className="h-5 w-5 text-primary-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Marketing Emails</p>
                        <p className="text-sm text-gray-600">Tips and product updates</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                        className="h-5 w-5 text-primary-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Save Preferences
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Password & Security</h2>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your password regularly for security</p>
                  </button>

                  <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </button>

                  <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                    <p className="font-medium text-gray-900">Active Sessions</p>
                    <p className="text-sm text-gray-600">Manage devices where you're logged in</p>
                  </button>
                </div>
              </div>

              <div className="card bg-danger-50 border-2 border-danger-200">
                <h3 className="font-bold text-danger-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-danger-700 mb-4">
                  These actions are permanent and cannot be undone
                </p>
                <button className="px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white font-medium rounded-xl">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Billing</h2>
              <div className="bg-success-50 border-2 border-success-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-success-900 mb-2">
                  You're on the Free Plan
                </h3>
                <p className="text-success-700">
                  DebtOptimizer is 100% free forever. No hidden costs, no premium tiers, no paywalls.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
