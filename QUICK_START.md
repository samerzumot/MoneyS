# 🚀 Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] PostgreSQL 14+ installed and running
- [ ] Firebase account created
- [ ] Plaid account created (free sandbox)

## 1. Install Everything

```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

## 2. Set Up Database

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE debt_optimizer;"
```

## 3. Configure Environment Variables

### Backend (.env)
Copy `server/.env.example` to `server/.env` and fill in:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/debt_optimizer
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
FIREBASE_PROJECT_ID=your_project_id
```

### Frontend (.env)
Copy `client/.env.example` to `client/.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 4. Get Firebase Credentials

1. Go to https://console.firebase.google.com/
2. Create new project
3. Enable Authentication → Email/Password
4. Settings → Web app → Copy config to `client/.env`
5. Settings → Service Accounts → Generate key → Copy to `server/.env`

## 5. Get Plaid Credentials

1. Go to https://dashboard.plaid.com/signup
2. Sign up (free sandbox)
3. Get Client ID and Sandbox Secret
4. Add to `server/.env`

## 6. Start Development

```bash
# In one terminal - start backend
cd server
npm run dev

# In another terminal - start frontend
cd client
npm start
```

Or use the combined command:
```bash
npm run dev
```

## 7. Open App

Visit http://localhost:3000 and sign up!

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Or on Mac:
brew services list
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in server/.env
PORT=5001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

### Firebase Auth Error
- Double-check all Firebase env variables
- Make sure Email/Password is enabled in Firebase Console
- Verify API key is correct

### Plaid Connection Fails
- Verify you're using **sandbox** credentials
- Check PLAID_ENV=sandbox in .env
- Make sure client_id and secret match

## Need Help?

Check the full [README.md](./README.md) for detailed setup instructions.
