const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Scenario = sequelize.define('Scenario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  disasterType: {
    type: DataTypes.ENUM('fire', 'earthquake', 'flood'),
    allowNull: false,
    field: 'disaster_type'
  },
  situation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false
  },
  correctOption: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'correct_option'
  },
  explanations: {
    type: DataTypes.JSON,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  }
}, {
  tableName: 'scenarios',
  timestamps: true
});

module.exports = Scenario;
