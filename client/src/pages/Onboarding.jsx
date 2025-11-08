import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, BanknotesIcon, ChartBarIcon, BellIcon } from '@heroicons/react/24/outline';
import { usePlaidLink } from 'react-plaid-link';
import { plaidAPI, userAPI } from '../services/api';
import toast from 'react-hot-toast';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Welcome to DebtOptimizer',
      description: 'Let\'s get you set up in just a few steps',
      icon: '👋'
    },
    {
      id: 2,
      title: 'Connect Your Accounts',
      description: 'Securely link your bank accounts and credit cards using Plaid',
      icon: BanknotesIcon
    },
    {
      id: 3,
      title: 'AI Analysis',
      description: 'We\'ll analyze your debts and create an optimized payoff plan',
      icon: ChartBarIcon
    },
    {
      id: 4,
      title: 'Set Up Reminders',
      description: 'Never miss a payment with our smart notification system',
      icon: BellIcon
    }
  ];

  // Plaid Link integration
  const { open: openPlaid, ready: plaidReady } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken) => {
      try {
        await plaidAPI.exchangePublicToken(publicToken);
        toast.success('Accounts connected successfully!');
        setStep(3);
      } catch (error) {
        toast.error('Failed to connect accounts');
        console.error(error);
      }
    },
    onExit: (error) => {
      if (error) {
        toast.error('Failed to connect accounts');
        console.error(error);
      }
    }
  });

  const handleNext = async () => {
    if (step === 2) {
      // Initialize Plaid Link
      try {
        setLoading(true);
        const response = await plaidAPI.createLinkToken();
        setLinkToken(response.data.link_token);
        // Open Plaid Link when ready
        if (plaidReady) {
          openPlaid();
        }
      } catch (error) {
        console.error('Error creating link token:', error);
        toast.error('Failed to initialize Plaid. Continuing with manual setup...');
        setStep(3);
      } finally {
        setLoading(false);
      }
    } else if (step === 4) {
      // Complete onboarding
      try {
        await userAPI.completeOnboarding();
        toast.success('Setup complete! Welcome to DebtOptimizer');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error completing onboarding:', error);
        navigate('/dashboard');
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 3 || step === 4) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, index) => (
              <React.Fragment key={s.id}>
                <div className={`flex items-center ${index !== 0 ? 'flex-1' : ''}`}>
                  {index !== 0 && (
                    <div className={`flex-1 h-1 mx-2 ${step > s.id ? 'bg-primary-600' : 'bg-gray-300'}`} />
                  )}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      step >= s.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step > s.id ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      s.id
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2 px-2">
            {steps.map((s) => (
              <span key={s.id} className={`${step >= s.id ? 'text-primary-600 font-medium' : ''}`}>
                Step {s.id}
              </span>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="card max-w-2xl mx-auto">
          <div className="text-center mb-8">
            {typeof steps[step - 1].icon === 'string' ? (
              <div className="text-6xl mb-4">{steps[step - 1].icon}</div>
            ) : (
              <steps[step - 1].icon className="w-16 h-16 mx-auto mb-4 text-primary-600" />
            )}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[step - 1].title}
            </h2>
            <p className="text-lg text-gray-600">
              {steps[step - 1].description}
            </p>
          </div>

          {/* Step-specific content */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg text-gray-900">What you'll get:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-success-600 mr-3 mt-1">✓</span>
                    <span><strong>Debt aggregation:</strong> See all your debts in one place</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-600 mr-3 mt-1">✓</span>
                    <span><strong>AI optimization:</strong> Get a personalized payoff plan that saves money</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-600 mr-3 mt-1">✓</span>
                    <span><strong>Payment reminders:</strong> Never miss a due date again</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-600 mr-3 mt-1">✓</span>
                    <span><strong>Progress tracking:</strong> Watch your debt decrease over time</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">🔒 Your data is secure</h3>
                <p className="text-gray-700">
                  We use Plaid, a trusted service used by thousands of financial apps.
                  Your credentials are encrypted and never stored on our servers.
                </p>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p>Plaid supports 12,000+ financial institutions</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-primary-50 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">🤖 AI-Powered Optimization</h3>
                <p className="text-gray-700 mb-4">
                  Our AI analyzes your debts, interest rates, and cash flow to create
                  a personalized payment plan that:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Minimizes total interest paid</li>
                  <li>• Gets you debt-free faster</li>
                  <li>• Keeps your monthly budget manageable</li>
                  <li>• Adapts as your situation changes</li>
                </ul>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-warning-50 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">📱 Stay on Track</h3>
                <p className="text-gray-700 mb-4">
                  Choose how you want to receive payment reminders:
                </p>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-primary-600 rounded" />
                    <span className="ml-3 text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-primary-600 rounded" />
                    <span className="ml-3 text-gray-700">In-app notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-5 w-5 text-primary-600 rounded" />
                    <span className="ml-3 text-gray-700">SMS reminders (optional)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              {step === 1 ? 'Skip tutorial' : 'Skip'}
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                  Loading...
                </>
              ) : step === 4 ? (
                'Get Started'
              ) : step === 2 ? (
                'Connect Accounts'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
