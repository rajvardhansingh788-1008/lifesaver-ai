const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully');
    await sequelize.sync({ alter: false, force: false });
    console.log('✅ Database synced');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    // Retry after 3 seconds instead of exiting
    console.log('🔄 Retrying connection in 3 seconds...');
    setTimeout(() => connectDB(), 3000);
  }
};

module.exports = { sequelize, connectDB };
