const debtService = require('./debt.service');

class PayoffService {
  /**
   * Calculate optimal debt payoff plan using the avalanche method
   * (prioritize highest interest rate debts first)
   */
  async calculatePayoffPlan(userId, monthlyBudget = null) {
    try {
      const debts = await debtService.getDebts(userId, 'active');
      
      if (debts.length === 0) {
        return {
          plan: [],
          totalMonthsToPayoff: 0,
          totalInterestPaid: 0,
          interestSavedVsMinimum: 0
        };
      }

      // Calculate total minimum payment
      const totalMinimum = debts.reduce((sum, debt) => 
        sum + parseFloat(debt.minimumPayment), 0
      );

      // If no budget specified, use minimum + 20% as recommended
      const availableBudget = monthlyBudget || totalMinimum * 1.2;

      // Sort debts by interest rate (highest first) - Avalanche method
      const sortedDebts = [...debts].sort((a, b) => 
        parseFloat(b.interestRate) - parseFloat(a.interestRate)
      );

      // Calculate payoff plan
      const plan = this.simulatePayoff(sortedDebts, availableBudget);
      
      // Calculate comparison with minimum payments only
      const minimumPlan = this.simulatePayoff(sortedDebts, totalMinimum);

      return {
        plan: plan.payments,
        totalMonthsToPayoff: plan.months,
        totalInterestPaid: plan.totalInterest,
        interestSavedVsMinimum: minimumPlan.totalInterest - plan.totalInterest,
        monthsSavedVsMinimum: minimumPlan.months - plan.months,
        suggestedMonthlyBudget: availableBudget,
        currentMinimumPayment: totalMinimum
      };
    } catch (error) {
      throw new Error(`Failed to calculate payoff plan: ${error.message}`);
    }
  }

  /**
   * Simulate debt payoff with given monthly budget
   */
  simulatePayoff(debts, monthlyBudget) {
    // Clone debts to avoid mutation
    let remainingDebts = debts.map(debt => ({
      id: debt.id,
      name: debt.name,
      balance: parseFloat(debt.balance),
      interestRate: parseFloat(debt.interestRate),
      minimumPayment: parseFloat(debt.minimumPayment)
    }));

    let months = 0;
    let totalInterest = 0;
    const payments = [];

    // Simulate month by month until all debts paid
    while (remainingDebts.length > 0 && months < 600) { // 50 year max
      months++;
      let budgetRemaining = monthlyBudget;
      const monthPayments = [];

      // Apply interest to all debts
      remainingDebts.forEach(debt => {
        const monthlyInterest = (debt.balance * (debt.interestRate / 100)) / 12;
        debt.balance += monthlyInterest;
        totalInterest += monthlyInterest;
      });

      // Pay minimums on all debts first
      remainingDebts.forEach(debt => {
        const payment = Math.min(debt.minimumPayment, debt.balance);
        debt.balance -= payment;
        budgetRemaining -= payment;
        
        monthPayments.push({
          debtId: debt.id,
          debtName: debt.name,
          payment: payment,
          remainingBalance: Math.max(0, debt.balance)
        });
      });

      // Apply extra payment to highest interest debt
      if (budgetRemaining > 0 && remainingDebts.length > 0) {
        const targetDebt = remainingDebts[0]; // Already sorted by interest rate
        const extraPayment = Math.min(budgetRemaining, targetDebt.balance);
        targetDebt.balance -= extraPayment;
        
        // Update payment for this debt
        const paymentIndex = monthPayments.findIndex(p => p.debtId === targetDebt.id);
        if (paymentIndex !== -1) {
          monthPayments[paymentIndex].payment += extraPayment;
          monthPayments[paymentIndex].remainingBalance = Math.max(0, targetDebt.balance);
        }
      }

      payments.push({
        month: months,
        payments: monthPayments,
        totalPaid: monthlyBudget - budgetRemaining
      });

      // Remove paid-off debts
      remainingDebts = remainingDebts.filter(debt => debt.balance > 0.01);
    }

    return {
      months,
      totalInterest,
      payments: this.generateSuggestedPayments(debts, payments)
    };
  }

  /**
   * Generate suggested monthly payments for each debt
   */
  generateSuggestedPayments(originalDebts, simulationPayments) {
    // Calculate average payment for first 3 months for each debt
    const firstMonths = simulationPayments.slice(0, Math.min(3, simulationPayments.length));
    
    return originalDebts.map(debt => {
      let totalPayment = 0;
      let count = 0;

      firstMonths.forEach(month => {
        const payment = month.payments.find(p => p.debtId === debt.id);
        if (payment) {
          totalPayment += payment.payment;
          count++;
        }
      });

      const suggestedPayment = count > 0 ? totalPayment / count : parseFloat(debt.minimumPayment);

      return {
        debtId: debt.id,
        debtName: debt.name,
        currentBalance: parseFloat(debt.balance),
        interestRate: parseFloat(debt.interestRate),
        minimumPayment: parseFloat(debt.minimumPayment),
        suggestedPayment: Math.round(suggestedPayment * 100) / 100,
        priority: originalDebts.indexOf(debt) + 1
      };
    });
  }

  /**
   * Get AI-enhanced recommendations using OpenAI (optional)
   */
  async getAIRecommendations(userId) {
    try {
      const debts = await debtService.getDebts(userId, 'active');
      const plan = await this.calculatePayoffPlan(userId);

      // Basic rule-based recommendations (can be enhanced with OpenAI)
      const recommendations = [];

      // Check for high-interest debts
      const highInterestDebts = debts.filter(d => parseFloat(d.interestRate) > 15);
      if (highInterestDebts.length > 0) {
        recommendations.push({
          type: 'high_interest',
          priority: 'high',
          title: 'Focus on High-Interest Debt',
          message: `You have ${highInterestDebts.length} debt(s) with interest rates above 15%. Prioritizing these can save you significant money.`,
          debtIds: highInterestDebts.map(d => d.id)
        });
      }

      // Check for low balance debts (quick wins)
      const lowBalanceDebts = debts.filter(d => parseFloat(d.balance) < 1000);
      if (lowBalanceDebts.length > 0) {
        recommendations.push({
          type: 'quick_win',
          priority: 'medium',
          title: 'Quick Win Opportunity',
          message: `You could pay off ${lowBalanceDebts.length} small debt(s) quickly for a psychological boost.`,
          debtIds: lowBalanceDebts.map(d => d.id)
        });
      }

      // Check if user could pay off faster with increased payment
      if (plan.monthsSavedVsMinimum > 0) {
        recommendations.push({
          type: 'payoff_acceleration',
          priority: 'high',
          title: 'Accelerate Your Payoff',
          message: `By following our optimized plan, you could be debt-free ${plan.monthsSavedVsMinimum} months earlier and save $${Math.round(plan.interestSavedVsMinimum)} in interest.`
        });
      }

      return recommendations;
    } catch (error) {
      throw new Error(`Failed to get AI recommendations: ${error.message}`);
    }
  }
}

module.exports = new PayoffService();
