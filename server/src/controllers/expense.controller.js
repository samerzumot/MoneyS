const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

class ExpenseController {
  async getExpenses(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const expenses = await expenseService.getExpenses(user.id);
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  }

  async getExpense(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const expense = await expenseService.getExpense(id, user.id);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }

  async createExpense(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const expense = await expenseService.createExpense(user.id, req.body);
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  }

  async updateExpense(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const expense = await expenseService.updateExpense(id, user.id, req.body);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }

  async deleteExpense(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const result = await expenseService.deleteExpense(id, user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async markAsPaid(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const expense = await expenseService.markAsPaid(id, user.id);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }

  async getUpcomingExpenses(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { days } = req.query;
      
      const expenses = await expenseService.getUpcomingExpenses(user.id, days ? parseInt(days) : 7);
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExpenseController();
