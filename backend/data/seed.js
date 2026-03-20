require('dotenv').config();
const { connectDB } = require('../config/db');
const { Scenario } = require('../models');
const scenarios = require('./scenarios');

const seed = async () => {
  try {
    await connectDB();
    console.log('🌱 Seeding scenarios...');

    // Clear existing scenarios
    await Scenario.destroy({ where: {} });

    // Insert new ones
    await Scenario.bulkCreate(scenarios);

    console.log(`✅ ${scenarios.length} scenarios seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();
