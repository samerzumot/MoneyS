const express = require('express');
const router = express.Router();
const plaidController = require('../controllers/plaid.controller');

router.post('/create-link-token', plaidController.createLinkToken);
router.post('/exchange-public-token', plaidController.exchangePublicToken);
router.get('/accounts', plaidController.getAccounts);
router.get('/liabilities', plaidController.getLiabilities);
router.post('/sync-transactions', plaidController.syncTransactions);

module.exports = router;
