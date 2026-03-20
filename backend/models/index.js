const User = require('./User');
const Scenario = require('./Scenario');
const Result = require('./Result');
const Alert = require('./Alert');

// Associations
User.hasMany(Alert, { foreignKey: 'userId' });
Alert.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Scenario, Result, Alert };
