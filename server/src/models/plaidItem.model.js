const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlaidItem = sequelize.define('PlaidItem', {
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
  itemId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  institutionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  institutionName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accounts: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'error'),
    defaultValue: 'active'
  },
  lastSyncedAt: {
    type: DataTypes.DATE,
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
  tableName: 'plaid_items',
  timestamps: true
});

module.exports = PlaidItem;
