const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/summary', dashboardController.getSummary);
router.get('/debt-history', dashboardController.getDebtHistory);
router.get('/spending-insights', dashboardController.getSpendingInsights);

module.exports = router;
