const debtService = require('../services/debt.service');
const payoffService = require('../services/payoff.service');
const userService = require('../services/user.service');

class DebtController {
  async getDebts(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const { status } = req.query;
      const debts = await debtService.getDebts(user.id, status);
      
      res.json(debts);
    } catch (error) {
      next(error);
    }
  }

  async getDebt(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const debt = await debtService.getDebt(id, user.id);
      res.json(debt);
    } catch (error) {
      next(error);
    }
  }

  async createDebt(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const debt = await debtService.createDebt(user.id, req.body);
      res.status(201).json(debt);
    } catch (error) {
      next(error);
    }
  }

  async updateDebt(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const debt = await debtService.updateDebt(id, user.id, req.body);
      res.json(debt);
    } catch (error) {
      next(error);
    }
  }

  async deleteDebt(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const result = await debtService.deleteDebt(id, user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPayoffPlan(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const plan = await payoffService.calculatePayoffPlan(user.id);
      res.json(plan);
    } catch (error) {
      next(error);
    }
  }

  async calculatePayoffPlan(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { monthlyBudget } = req.body;
      
      const plan = await payoffService.calculatePayoffPlan(user.id, monthlyBudget);
      const recommendations = await payoffService.getAIRecommendations(user.id);
      
      res.json({
        plan,
        recommendations
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DebtController();
