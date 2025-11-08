const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.get('/', expenseController.getExpenses);
router.get('/upcoming', expenseController.getUpcomingExpenses);
router.get('/:id', expenseController.getExpense);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);
router.post('/:id/paid', expenseController.markAsPaid);

module.exports = router;
