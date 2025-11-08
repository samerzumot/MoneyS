const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Debt = sequelize.define('Debt', {
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
  plaidAccountId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(
      'credit_card',
      'student_loan',
      'auto_loan',
      'mortgage',
      'personal_loan',
      'bnpl',
      'other'
    ),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  originalBalance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  interestRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  minimumPayment: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  suggestedPayment: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  paymentDay: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 31
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'paid_off', 'closed'),
    defaultValue: 'active'
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
  tableName: 'debts',
  timestamps: true
});

module.exports = Debt;
