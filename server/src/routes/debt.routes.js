const express = require('express');
const router = express.Router();
const debtController = require('../controllers/debt.controller');

router.get('/', debtController.getDebts);
router.get('/payoff-plan', debtController.getPayoffPlan);
router.post('/calculate-payoff', debtController.calculatePayoffPlan);
router.get('/:id', debtController.getDebt);
router.post('/', debtController.createDebt);
router.put('/:id', debtController.updateDebt);
router.delete('/:id', debtController.deleteDebt);

module.exports = router;
