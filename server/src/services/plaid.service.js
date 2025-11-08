const plaidClient = require('../config/plaid');
const { PlaidItem, Debt } = require('../models');
const { CountryCode, Products } = require('plaid');

class PlaidService {
  async createLinkToken(userId) {
    try {
      const request = {
        user: {
          client_user_id: userId
        },
        client_name: 'DebtOptimizer',
        products: [Products.Auth, Products.Transactions, Products.Liabilities],
        country_codes: [CountryCode.Us],
        language: 'en'
      };

      const response = await plaidClient.linkTokenCreate(request);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create link token: ${error.message}`);
    }
  }

  async exchangePublicToken(userId, publicToken) {
    try {
      // Exchange public token for access token
      const exchangeResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken
      });

      const { access_token, item_id } = exchangeResponse.data;

      // Get institution info
      const itemResponse = await plaidClient.itemGet({
        access_token
      });

      const institutionId = itemResponse.data.item.institution_id;
      let institutionName = 'Unknown Institution';

      if (institutionId) {
        const institutionResponse = await plaidClient.institutionsGetById({
          institution_id: institutionId,
          country_codes: [CountryCode.Us]
        });
        institutionName = institutionResponse.data.institution.name;
      }

      // Get accounts
      const accountsResponse = await plaidClient.accountsGet({
        access_token
      });

      // Store Plaid item
      const plaidItem = await PlaidItem.create({
        userId,
        itemId: item_id,
        accessToken: access_token,
        institutionId,
        institutionName,
        accounts: accountsResponse.data.accounts,
        lastSyncedAt: new Date()
      });

      // Import liabilities as debts
      await this.importLiabilities(userId, access_token);

      return {
        plaidItem,
        accounts: accountsResponse.data.accounts
      };
    } catch (error) {
      throw new Error(`Failed to exchange public token: ${error.message}`);
    }
  }

  async importLiabilities(userId, accessToken) {
    try {
      const response = await plaidClient.liabilitiesGet({
        access_token: accessToken
      });

      const { liabilities, accounts } = response.data;

      // Import credit card debts
      if (liabilities.credit) {
        for (const credit of liabilities.credit) {
          const account = accounts.find(a => a.account_id === credit.account_id);
          
          await Debt.findOrCreate({
            where: {
              userId,
              plaidAccountId: credit.account_id
            },
            defaults: {
              userId,
              plaidAccountId: credit.account_id,
              name: account?.name || account?.official_name || 'Credit Card',
              type: 'credit_card',
              balance: Math.abs(credit.last_payment_amount || 0),
              interestRate: credit.aprs?.[0]?.apr_percentage || 0,
              minimumPayment: credit.minimum_payment_amount || 0,
              dueDate: credit.next_payment_due_date
            }
          });
        }
      }

      // Import student loans
      if (liabilities.student) {
        for (const student of liabilities.student) {
          const account = accounts.find(a => a.account_id === student.account_id);
          
          await Debt.findOrCreate({
            where: {
              userId,
              plaidAccountId: student.account_id
            },
            defaults: {
              userId,
              plaidAccountId: student.account_id,
              name: account?.name || account?.official_name || 'Student Loan',
              type: 'student_loan',
              balance: student.outstanding_interest_amount + student.origination_principal_amount,
              interestRate: student.interest_rate_percentage || 0,
              minimumPayment: student.minimum_payment_amount || 0,
              dueDate: student.next_payment_due_date
            }
          });
        }
      }

      // Import mortgages
      if (liabilities.mortgage) {
        for (const mortgage of liabilities.mortgage) {
          const account = accounts.find(a => a.account_id === mortgage.account_id);
          
          await Debt.findOrCreate({
            where: {
              userId,
              plaidAccountId: mortgage.account_id
            },
            defaults: {
              userId,
              plaidAccountId: mortgage.account_id,
              name: account?.name || account?.official_name || 'Mortgage',
              type: 'mortgage',
              balance: mortgage.current_late_fee + mortgage.principal_balance,
              interestRate: mortgage.interest_rate?.percentage || 0,
              minimumPayment: mortgage.last_payment_amount || 0,
              dueDate: mortgage.next_payment_due_date
            }
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error importing liabilities:', error);
      // Don't throw - some institutions may not support liabilities
      return { success: false, error: error.message };
    }
  }

  async getAccounts(userId) {
    try {
      const plaidItems = await PlaidItem.findAll({
        where: { userId, status: 'active' }
      });

      const allAccounts = [];

      for (const item of plaidItems) {
        const response = await plaidClient.accountsBalanceGet({
          access_token: item.accessToken
        });

        allAccounts.push({
          institutionName: item.institutionName,
          accounts: response.data.accounts
        });
      }

      return allAccounts;
    } catch (error) {
      throw new Error(`Failed to get accounts: ${error.message}`);
    }
  }

  async syncTransactions(userId) {
    try {
      const plaidItems = await PlaidItem.findAll({
        where: { userId, status: 'active' }
      });

      for (const item of plaidItems) {
        // Sync liabilities
        await this.importLiabilities(userId, item.accessToken);
        
        // Update last synced time
        await item.update({ lastSyncedAt: new Date() });
      }

      return { success: true, message: 'Transactions synced successfully' };
    } catch (error) {
      throw new Error(`Failed to sync transactions: ${error.message}`);
    }
  }
}

module.exports = new PlaidService();
