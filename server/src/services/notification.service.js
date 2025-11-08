const { Notification, User } = require('../models');
const debtService = require('./debt.service');
const expenseService = require('./expense.service');
const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    // Initialize email transporter
    this.emailTransporter = this.initializeEmailTransporter();
  }

  initializeEmailTransporter() {
    // For development, use ethereal email or log to console
    if (process.env.NODE_ENV === 'development') {
      return null; // Will log instead of sending
    }

    // Production: Configure with SendGrid, Mailgun, etc.
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'sendgrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  async createNotification(userId, type, title, message, relatedId = null, relatedType = null) {
    try {
      return await Notification.create({
        userId,
        type,
        title,
        message,
        relatedId,
        relatedType
      });
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  async getNotifications(userId, unreadOnly = false) {
    try {
      const where = { userId };
      if (unreadOnly) {
        where.read = false;
      }

      return await Notification.findAll({
        where,
        order: [['createdAt', 'DESC']],
        limit: 50
      });
    } catch (error) {
      throw new Error(`Failed to get notifications: ${error.message}`);
    }
  }

  async markAsRead(notificationId, userId) {
    try {
      const notification = await Notification.findOne({
        where: { id: notificationId, userId }
      });

      if (!notification) {
        throw new Error('Notification not found');
      }

      await notification.update({
        read: true,
        readAt: new Date()
      });

      return notification;
    } catch (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }

  async getUnreadCount(userId) {
    try {
      return await Notification.count({
        where: { userId, read: false }
      });
    } catch (error) {
      throw new Error(`Failed to get unread count: ${error.message}`);
    }
  }

  async sendPaymentReminder(userId, debt) {
    try {
      const user = await User.findByPk(userId);
      
      const daysUntilDue = Math.ceil(
        (new Date(debt.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
      );

      const title = `Payment Due Soon: ${debt.name}`;
      const message = `Your payment of $${debt.suggestedPayment || debt.minimumPayment} for ${debt.name} is due in ${daysUntilDue} day(s).`;

      // Create in-app notification
      await this.createNotification(
        userId,
        'payment_reminder',
        title,
        message,
        debt.id,
        'debt'
      );

      // Send email if enabled
      if (user.notificationSettings.email && user.notificationSettings.paymentReminders) {
        await this.sendEmail(
          user.email,
          title,
          message,
          `
            <h2>${title}</h2>
            <p>${message}</p>
            <p><strong>Due Date:</strong> ${new Date(debt.dueDate).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> $${debt.suggestedPayment || debt.minimumPayment}</p>
            <p>Log in to your DebtOptimizer account to manage your payments.</p>
          `
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      return { success: false, error: error.message };
    }
  }

  async sendExpenseReminder(userId, expense) {
    try {
      const user = await User.findByPk(userId);
      
      const daysUntilDue = Math.ceil(
        (new Date(expense.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
      );

      const title = `Bill Due Soon: ${expense.name}`;
      const message = `Your ${expense.name} payment of $${expense.amount} is due in ${daysUntilDue} day(s).`;

      // Create in-app notification
      await this.createNotification(
        userId,
        'expense_due',
        title,
        message,
        expense.id,
        'expense'
      );

      // Send email if enabled
      if (user.notificationSettings.email && user.notificationSettings.paymentReminders) {
        await this.sendEmail(
          user.email,
          title,
          message,
          `
            <h2>${title}</h2>
            <p>${message}</p>
            <p><strong>Due Date:</strong> ${new Date(expense.dueDate).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> $${expense.amount}</p>
          `
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending expense reminder:', error);
      return { success: false, error: error.message };
    }
  }

  async sendEmail(to, subject, text, html) {
    try {
      if (!this.emailTransporter) {
        console.log(`[DEV] Email would be sent to ${to}:`);
        console.log(`Subject: ${subject}`);
        console.log(`Text: ${text}`);
        return { success: true };
      }

      await this.emailTransporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@debtoptimizer.com',
        to,
        subject,
        text,
        html
      });

      return { success: true };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Cron job function to check for upcoming payments
   */
  async checkUpcomingPayments() {
    try {
      console.log('Checking for upcoming payments...');
      
      const users = await User.findAll({
        where: { onboardingCompleted: true }
      });

      for (const user of users) {
        // Check debts due in 3 days
        const upcomingDebts = await debtService.getUpcomingDebts(user.id, 3);
        for (const debt of upcomingDebts) {
          await this.sendPaymentReminder(user.id, debt);
        }

        // Check expenses due in 3 days
        const upcomingExpenses = await expenseService.getUpcomingExpenses(user.id, 3);
        for (const expense of upcomingExpenses) {
          await this.sendExpenseReminder(user.id, expense);
        }
      }

      console.log('Payment check completed');
    } catch (error) {
      console.error('Error checking upcoming payments:', error);
    }
  }
}

module.exports = new NotificationService();
