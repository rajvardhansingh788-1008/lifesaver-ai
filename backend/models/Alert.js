const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    }
  },
  disasterType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'disaster_type'
  },
  status: {
    type: DataTypes.ENUM('pending', 'broadcasted', 'resolved'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'alerts',
  timestamps: true
});

module.exports = Alert;
