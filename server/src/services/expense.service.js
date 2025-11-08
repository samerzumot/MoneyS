const { Expense } = require('../models');
const { Op } = require('sequelize');

class ExpenseService {
  async getExpenses(userId) {
    try {
      return await Expense.findAll({
        where: { userId },
        order: [['dueDate', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Failed to get expenses: ${error.message}`);
    }
  }

  async getExpense(expenseId, userId) {
    try {
      const expense = await Expense.findOne({
        where: { id: expenseId, userId }
      });

      if (!expense) {
        throw new Error('Expense not found');
      }

      return expense;
    } catch (error) {
      throw new Error(`Failed to get expense: ${error.message}`);
    }
  }

  async createExpense(userId, expenseData) {
    try {
      return await Expense.create({
        userId,
        ...expenseData
      });
    } catch (error) {
      throw new Error(`Failed to create expense: ${error.message}`);
    }
  }

  async updateExpense(expenseId, userId, updates) {
    try {
      const expense = await this.getExpense(expenseId, userId);
      await expense.update(updates);
      return expense;
    } catch (error) {
      throw new Error(`Failed to update expense: ${error.message}`);
    }
  }

  async deleteExpense(expenseId, userId) {
    try {
      const expense = await this.getExpense(expenseId, userId);
      await expense.destroy();
      return { message: 'Expense deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete expense: ${error.message}`);
    }
  }

  async markAsPaid(expenseId, userId) {
    try {
      const expense = await this.getExpense(expenseId, userId);
      
      await expense.update({
        status: 'paid',
        lastPaidDate: new Date()
      });

      // If auto-renew, create next occurrence
      if (expense.autoRenew) {
        await this.createNextOccurrence(expense);
      }

      return expense;
    } catch (error) {
      throw new Error(`Failed to mark expense as paid: ${error.message}`);
    }
  }

  async createNextOccurrence(expense) {
    const nextDueDate = this.calculateNextDueDate(expense.dueDate, expense.frequency);
    
    await Expense.create({
      userId: expense.userId,
      name: expense.name,
      category: expense.category,
      amount: expense.amount,
      frequency: expense.frequency,
      dueDate: nextDueDate,
      dueDay: expense.dueDay,
      status: 'upcoming',
      autoRenew: expense.autoRenew,
      notes: expense.notes
    });
  }

  calculateNextDueDate(currentDate, frequency) {
    const date = new Date(currentDate);
    
    switch (frequency) {
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'biweekly':
        date.setDate(date.getDate() + 14);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    
    return date;
  }

  async getUpcomingExpenses(userId, days = 7) {
    try {
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + days);

      return await Expense.findAll({
        where: {
          userId,
          status: 'upcoming',
          dueDate: {
            [Op.between]: [today, futureDate]
          }
        },
        order: [['dueDate', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Failed to get upcoming expenses: ${error.message}`);
    }
  }

  async getTotalMonthlyExpenses(userId) {
    try {
      const expenses = await this.getExpenses(userId);
      
      // Convert all to monthly amounts
      return expenses.reduce((total, expense) => {
        const amount = parseFloat(expense.amount);
        let monthlyAmount = amount;
        
        switch (expense.frequency) {
          case 'weekly':
            monthlyAmount = amount * 4.33;
            break;
          case 'biweekly':
            monthlyAmount = amount * 2.17;
            break;
          case 'quarterly':
            monthlyAmount = amount / 3;
            break;
          case 'yearly':
            monthlyAmount = amount / 12;
            break;
        }
        
        return total + monthlyAmount;
      }, 0);
    } catch (error) {
      throw new Error(`Failed to get total monthly expenses: ${error.message}`);
    }
  }
}

module.exports = new ExpenseService();
