# 🚀 Debt & Expense Optimizer - Phase 1

A **fully functional, free web app** that helps users manage debts, track recurring expenses, and optimize payoff plans using AI. Built with a modern, Rocket Money-inspired UI.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🎯 Core Features
- **Debt Aggregation**: Connect bank accounts via Plaid API to automatically import all debts
- **Manual Debt Entry**: Add credit cards, loans, mortgages, and BNPL debts manually
- **AI-Powered Payoff Optimization**: Calculate optimal payment plans using the debt avalanche method
- **Recurring Expense Tracking**: Track rent, utilities, subscriptions, and other recurring bills
- **Smart Notifications**: Email and in-app reminders for upcoming payments
- **Beautiful Dashboard**: Rocket Money-style UI with progress visualizations
- **Progress Tracking**: Visualize debt payoff progress over time with charts

### 📊 Dashboard Highlights
- Total debt overview with payoff timeline
- Individual debt cards showing balance, interest rate, and suggested payments
- Debt progress charts (line, pie, and bar charts)
- Upcoming bills and payment reminders
- AI-generated recommendations to save money
- Interest saved calculator

### 🔒 Security
- Firebase Authentication for secure user management
- Plaid integration for bank-level security
- PostgreSQL database with encrypted sensitive data
- JWT token-based API authentication

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database management
- **Firebase Admin SDK** - Authentication
- **Plaid API** - Bank account aggregation
- **Nodemailer** - Email notifications
- **Node-cron** - Scheduled tasks

### Third-Party Services
- **Plaid** - Bank account connections
- **Firebase** - Authentication
- **SendGrid/Mailgun** - Email delivery (optional)
- **OpenAI API** - AI recommendations (optional enhancement)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)
- **Git**

You'll also need accounts for:
- **Firebase** (free tier)
- **Plaid** (sandbox/development)
- **SendGrid or Mailgun** (optional, for emails)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd debt-expense-optimizer
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

cd ..
```

### 3. Set Up PostgreSQL Database

Create a PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE debt_optimizer;

# Create user (optional)
CREATE USER debt_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE debt_optimizer TO debt_user;

# Exit
\q
```

### 4. Configure Environment Variables

#### Backend Configuration

Create `server/.env` from the example:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your credentials:

```env
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/debt_optimizer
DB_HOST=localhost
DB_PORT=5432
DB_NAME=debt_optimizer
DB_USER=postgres
DB_PASSWORD=your_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# Plaid API (use sandbox for development)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox

# OpenAI API (optional)
OPENAI_API_KEY=your_openai_api_key

# Email Service (optional)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com

# JWT Secret
JWT_SECRET=your_secure_random_string

# Frontend URL
CLIENT_URL=http://localhost:3000
```

#### Frontend Configuration

Create `client/.env` from the example:

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env` and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

VITE_API_URL=http://localhost:5000/api
```

### 5. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication → Email/Password
4. Go to Project Settings → Service Accounts
5. Generate new private key (download JSON)
6. Copy credentials to `server/.env`
7. Go to Project Settings → General
8. Copy Web API config to `client/.env`

### 6. Set Up Plaid

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Sign up for a free account
3. Get your `client_id` and `sandbox` secret
4. Add credentials to `server/.env`
5. Configure allowed redirect URIs: `http://localhost:3000`

### 7. Initialize Database

Run database migrations:

```bash
cd server
npm run migrate
# or start the server (it will auto-sync in development)
npm run dev
```

### 8. Start the Application

#### Development Mode

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Or use the root-level command:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage

### First Time Setup

1. **Sign Up**: Create a new account at http://localhost:3000/signup
2. **Onboarding**: Follow the onboarding flow to connect accounts
3. **Connect Plaid**: Link your bank accounts securely via Plaid
4. **Review Debts**: Check imported debts and add any missing ones manually
5. **Add Expenses**: Track recurring bills and subscriptions
6. **View Dashboard**: See your personalized debt payoff plan

### Key User Flows

#### Connecting Bank Accounts
1. Navigate to **Accounts** page
2. Click **Connect Account**
3. Select your bank from Plaid's interface
4. Login securely (credentials never stored)
5. Select accounts to link
6. Debts automatically imported

#### Adding Manual Debt
1. Go to **Accounts** → **Add Debt Manually**
2. Fill in debt details (name, balance, interest rate, etc.)
3. Save to include in payoff calculation

#### Viewing Payoff Plan
1. Dashboard shows AI-optimized payment plan
2. Each debt shows:
   - Current balance
   - Interest rate
   - Minimum payment
   - **AI-suggested payment** (optimized)
3. Follow suggestions to save on interest

#### Managing Recurring Expenses
1. Add expenses from **Accounts** page
2. Set due dates and amounts
3. Receive reminders before due dates
4. Mark as paid when complete

## 🎨 UI/UX Features

### Rocket Money-Inspired Design
- **Clean, Modern Interface**: Rounded cards with soft shadows
- **Color-Coded Alerts**: 
  - 🔴 Red: Urgent/due soon
  - 🟢 Green: Paid/on track
  - 🟡 Yellow: Warning/attention needed
- **Smooth Animations**: Page transitions and hover effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Data Visualizations**: Interactive charts with Recharts

### Dashboard Components
- Summary cards with key metrics
- Debt breakdown cards (swipeable on mobile)
- Progress charts (line, pie, bar)
- Upcoming bills sidebar
- AI recommendations card

## 🤖 AI Optimization

The app uses intelligent algorithms to optimize debt payoff:

### Debt Avalanche Method
- Prioritizes debts by interest rate (highest first)
- Minimizes total interest paid
- Calculates exact payoff timeline

### Smart Budgeting
- Considers minimum payments
- Allocates extra funds optimally
- Adjusts for cash flow safety

### Recommendations
- Identifies high-interest debts
- Suggests refinancing opportunities
- Highlights quick wins (small balances)
- Shows interest savings vs. minimum payments

## 📧 Notification System

### Email Notifications
- Payment reminders (3 days before due)
- Weekly progress reports
- Milestone celebrations
- Bill due alerts

### In-App Notifications
- Real-time alerts in dashboard
- Color-coded urgency
- Clickable to view details
- Mark as read functionality

### Configuration
Users can customize in **Settings**:
- Email on/off
- Push notifications
- SMS (if configured)
- Notification types

## 🔧 API Endpoints

### Authentication
All endpoints require `Authorization: Bearer <firebase_token>` header

### Debts
- `GET /api/debts` - Get all debts
- `GET /api/debts/:id` - Get single debt
- `POST /api/debts` - Create debt
- `PUT /api/debts/:id` - Update debt
- `DELETE /api/debts/:id` - Delete debt
- `GET /api/debts/payoff-plan` - Get optimized payoff plan

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/upcoming` - Get upcoming expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `POST /api/expenses/:id/paid` - Mark as paid

### Plaid
- `POST /api/plaid/create-link-token` - Create Plaid Link token
- `POST /api/plaid/exchange-public-token` - Exchange public token
- `GET /api/plaid/accounts` - Get connected accounts
- `POST /api/plaid/sync-transactions` - Sync latest data

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/debt-history` - Get debt history
- `GET /api/dashboard/spending-insights` - Get expense insights

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/settings` - Get settings
- `PUT /api/user/settings` - Update settings
- `POST /api/user/complete-onboarding` - Complete onboarding

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run with coverage
npm test -- --coverage
```

## 📦 Deployment

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway/DigitalOcean)

1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy server code
4. Run migrations

### Environment Variables
Make sure to set all production environment variables, especially:
- `NODE_ENV=production`
- Update `DATABASE_URL`
- Update `CLIENT_URL` to your frontend domain
- Use production Plaid credentials (not sandbox)

## 🤝 Contributing

This is a Phase 1 implementation. Contributions welcome!

### Future Enhancements
- OpenAI integration for advanced AI recommendations
- PDF export of payoff plans
- Dark mode
- Mobile app (React Native)
- Budget tracking
- Net worth calculator
- Debt snowball method option
- Savings goals integration

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions:
1. Check the [Issues](../../issues) page
2. Review the setup guide above
3. Check Firebase/Plaid documentation

## 🎉 Acknowledgments

- Inspired by Rocket Money's clean UI
- Built with modern web technologies
- Powered by Plaid for secure bank connections
- Firebase for authentication
- Open source libraries and frameworks

---

**Built with ❤️ for financial freedom**

*Version 1.0.0 - Phase 1*
