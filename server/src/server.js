require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cron = require('node-cron');

// Import routes
const plaidRoutes = require('./routes/plaid.routes');
const debtRoutes = require('./routes/debt.routes');
const expenseRoutes = require('./routes/expense.routes');
const notificationRoutes = require('./routes/notification.routes');
const userRoutes = require('./routes/user.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { authenticate } = require('./middleware/auth');

// Import services
const { checkUpcomingPayments } = require('./services/notification.service');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/plaid', authenticate, plaidRoutes);
app.use('/api/debts', authenticate, debtRoutes);
app.use('/api/expenses', authenticate, expenseRoutes);
app.use('/api/notifications', authenticate, notificationRoutes);
app.use('/api/user', authenticate, userRoutes);
app.use('/api/dashboard', authenticate, dashboardRoutes);

// Error handling
app.use(errorHandler);

// Schedule cron jobs
// Check for upcoming payments every day at 8 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running scheduled payment reminder check...');
  checkUpcomingPayments();
});

// Database connection and server startup
const startServer = async () => {
  try {
    // Test database connection
    await db.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync database (in development)
    if (process.env.NODE_ENV === 'development') {
      await db.sync({ alter: true });
      console.log('✅ Database synchronized');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
