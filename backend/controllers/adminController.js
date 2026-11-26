const { User, Result, Scenario } = require('../models');

const getDashboard = async (req, res) => {
  try {
    // All students with their stats
    const students = await User.findAll({
      where: { role: 'student' },
      attributes: ['id', 'name', 'email', 'school', 'coins', 'accuracy', 'scenariosAttempted'],
      order: [['coins', 'DESC']]
    });

    // Summary stats
    const totalStudents = students.length;
    const totalScenarios = await Scenario.count();
    const totalAttempts = await Result.count();

    res.json({
      summary: {
        totalStudents,
        totalScenarios,
        totalAttempts
      },
      students
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard.' });
  }
};

module.exports = { getDashboard };
