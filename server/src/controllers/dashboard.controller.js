const debtService = require('../services/debt.service');
const expenseService = require('../services/expense.service');
const payoffService = require('../services/payoff.service');
const userService = require('../services/user.service');

class DashboardController {
  async getSummary(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      // Get debts and calculate totals
      const debts = await debtService.getDebts(user.id, 'active');
      const totalDebt = debts.reduce((sum, debt) => sum + parseFloat(debt.balance), 0);
      
      // Get payoff plan
      const payoffPlan = await payoffService.calculatePayoffPlan(user.id);
      
      // Get upcoming payments
      const upcomingDebts = await debtService.getUpcomingDebts(user.id, 7);
      const upcomingExpenses = await expenseService.getUpcomingExpenses(user.id, 7);
      
      // Get monthly expenses
      const totalMonthlyExpenses = await expenseService.getTotalMonthlyExpenses(user.id);
      
      res.json({
        totalDebt: Math.round(totalDebt),
        totalMonthlyPayment: Math.round(payoffPlan.suggestedMonthlyBudget || 0),
        estimatedPayoffMonths: payoffPlan.totalMonthsToPayoff,
        interestSaved: Math.round(payoffPlan.interestSavedVsMinimum || 0),
        upcomingPayments: upcomingDebts.length + upcomingExpenses.length,
        debtCount: debts.length,
        totalMonthlyExpenses: Math.round(totalMonthlyExpenses)
      });
    } catch (error) {
      next(error);
    }
  }

  async getDebtHistory(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { range = '6m' } = req.query;
      
      // For now, return mock data
      // In production, you'd track historical balances in a separate table
      const debts = await debtService.getDebts(user.id, 'active');
      const currentTotal = debts.reduce((sum, debt) => sum + parseFloat(debt.balance), 0);
      
      // Generate mock historical data based on current debt
      const months = range === '6m' ? 6 : range === '1y' ? 12 : 24;
      const history = [];
      
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        
        // Simulate decreasing debt over time
        const percentageIncrease = (i / months) * 0.15; // 15% higher at the start
        const total = currentTotal * (1 + percentageIncrease);
        
        history.push({
          month: date.toLocaleString('default', { month: 'short' }),
          total: Math.round(total)
        });
      }
      
      res.json(history);
    } catch (error) {
      next(error);
    }
  }

  async getSpendingInsights(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const expenses = await expenseService.getExpenses(user.id);
      
      // Group expenses by category
      const byCategory = expenses.reduce((acc, expense) => {
        const category = expense.category || 'other';
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += parseFloat(expense.amount);
        return acc;
      }, {});
      
      res.json({
        totalExpenses: expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0),
        byCategory,
        expenseCount: expenses.length
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
