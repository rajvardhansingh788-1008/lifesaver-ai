const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    defaultValue: 'student'
  },
  school: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  coins: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  accuracy: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  scenariosAttempted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'scenarios_attempted'
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
