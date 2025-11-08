const plaidService = require('../services/plaid.service');
const userService = require('../services/user.service');

class PlaidController {
  async createLinkToken(req, res, next) {
    try {
      const { uid: firebaseUid, email, name } = req.user;
      
      // Find or create user
      const user = await userService.findOrCreateUser(firebaseUid, email, name);
      
      const linkTokenData = await plaidService.createLinkToken(user.id);
      res.json(linkTokenData);
    } catch (error) {
      next(error);
    }
  }

  async exchangePublicToken(req, res, next) {
    try {
      const { publicToken } = req.body;
      const { uid: firebaseUid } = req.user;

      if (!publicToken) {
        return res.status(400).json({ error: 'Public token is required' });
      }

      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const result = await plaidService.exchangePublicToken(user.id, publicToken);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAccounts(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const accounts = await plaidService.getAccounts(user.id);
      res.json(accounts);
    } catch (error) {
      next(error);
    }
  }

  async getLiabilities(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      // This will return debts imported from Plaid
      const debtService = require('../services/debt.service');
      const debts = await debtService.getDebts(user.id);
      
      res.json(debts);
    } catch (error) {
      next(error);
    }
  }

  async syncTransactions(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const result = await plaidService.syncTransactions(user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlaidController();
