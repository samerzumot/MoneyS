const { Debt, User } = require('../models');
const { Op } = require('sequelize');

class DebtService {
  async getDebts(userId, status = 'active') {
    try {
      const where = { userId };
      if (status) {
        where.status = status;
      }

      return await Debt.findAll({
        where,
        order: [['interestRate', 'DESC']]
      });
    } catch (error) {
      throw new Error(`Failed to get debts: ${error.message}`);
    }
  }

  async getDebt(debtId, userId) {
    try {
      const debt = await Debt.findOne({
        where: { id: debtId, userId }
      });

      if (!debt) {
        throw new Error('Debt not found');
      }

      return debt;
    } catch (error) {
      throw new Error(`Failed to get debt: ${error.message}`);
    }
  }

  async createDebt(userId, debtData) {
    try {
      return await Debt.create({
        userId,
        ...debtData
      });
    } catch (error) {
      throw new Error(`Failed to create debt: ${error.message}`);
    }
  }

  async updateDebt(debtId, userId, updates) {
    try {
      const debt = await this.getDebt(debtId, userId);
      await debt.update(updates);
      return debt;
    } catch (error) {
      throw new Error(`Failed to update debt: ${error.message}`);
    }
  }

  async deleteDebt(debtId, userId) {
    try {
      const debt = await this.getDebt(debtId, userId);
      await debt.destroy();
      return { message: 'Debt deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete debt: ${error.message}`);
    }
  }

  async getTotalDebt(userId) {
    try {
      const debts = await this.getDebts(userId, 'active');
      return debts.reduce((total, debt) => total + parseFloat(debt.balance), 0);
    } catch (error) {
      throw new Error(`Failed to get total debt: ${error.message}`);
    }
  }

  async getUpcomingDebts(userId, days = 7) {
    try {
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + days);

      return await Debt.findAll({
        where: {
          userId,
          status: 'active',
          dueDate: {
            [Op.between]: [today, futureDate]
          }
        },
        order: [['dueDate', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Failed to get upcoming debts: ${error.message}`);
    }
  }
}

module.exports = new DebtService();
