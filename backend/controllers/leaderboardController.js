const { User } = require('../models');
const { sequelize } = require('../config/db');

const getLeaderboard = async (req, res) => {
  try {
    // Top students by coins
    const topStudents = await User.findAll({
      where: { role: 'student' },
      attributes: ['id', 'name', 'school', 'coins', 'accuracy', 'scenariosAttempted'],
      order: [['coins', 'DESC']],
      limit: 20
    });

    // Top schools (aggregate coins by school)
    const topSchools = await User.findAll({
      where: { role: 'student' },
      attributes: [
        'school',
        [sequelize.fn('SUM', sequelize.col('coins')), 'totalCoins'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'studentCount'],
        [sequelize.fn('AVG', sequelize.col('accuracy')), 'avgAccuracy']
      ],
      group: ['school'],
      having: sequelize.where(sequelize.col('school'), '!=', null),
      order: [[sequelize.fn('SUM', sequelize.col('coins')), 'DESC']],
      limit: 10,
      raw: true
    });

    res.json({ topStudents, topSchools });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to load leaderboard.' });
  }
};

module.exports = { getLeaderboard };
