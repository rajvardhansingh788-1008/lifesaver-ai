const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Scenario = require('./Scenario');

const Result = sequelize.define('Result', {
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
  scenarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'scenario_id',
    references: {
      model: Scenario,
      key: 'id'
    }
  },
  selectedOption: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'selected_option'
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_correct'
  },
  coinsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'coins_earned'
  }
}, {
  tableName: 'results',
  timestamps: true
});

// Associations
User.hasMany(Result, { foreignKey: 'userId' });
Result.belongsTo(User, { foreignKey: 'userId' });

Scenario.hasMany(Result, { foreignKey: 'scenarioId' });
Result.belongsTo(Scenario, { foreignKey: 'scenarioId' });

module.exports = Result;
