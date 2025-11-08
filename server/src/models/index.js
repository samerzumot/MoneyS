const sequelize = require('../config/database');
const User = require('./user.model');
const Debt = require('./debt.model');
const Expense = require('./expense.model');
const PlaidItem = require('./plaidItem.model');
const Notification = require('./notification.model');

// Define associations
User.hasMany(Debt, { foreignKey: 'userId', as: 'debts' });
Debt.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Expense, { foreignKey: 'userId', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PlaidItem, { foreignKey: 'userId', as: 'plaidItems' });
PlaidItem.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Debt,
  Expense,
  PlaidItem,
  Notification
};
