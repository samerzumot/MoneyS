const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM(
      'rent',
      'utilities',
      'insurance',
      'subscription',
      'phone',
      'internet',
      'other'
    ),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  frequency: {
    type: DataTypes.ENUM('weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'),
    defaultValue: 'monthly'
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dueDay: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 31
    }
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'paid', 'overdue'),
    defaultValue: 'upcoming'
  },
  lastPaidDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  autoRenew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'expenses',
  timestamps: true
});

module.exports = Expense;
