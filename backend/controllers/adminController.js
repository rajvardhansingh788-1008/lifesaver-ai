const { User, Result, Scenario } = require('../models');

const getDashboard = async (req, res) => {
  try {
    // All students with their stats
    const students = await User.findAll({
      where: { role: 'student' },
      attributes: ['id', 'name', 'email', 'school', 'coins', 'accuracy', 'scenariosAttempted'],
      order: [['coins', 'DESC']]
    });

    const totalStudents = students.length;
    const totalScenarios = await Scenario.count();
    const totalAttempts = await Result.count();

    // 1. Calculate Average Preparedness Score
    let sumAccuracy = 0;
    let studentsParticipated = 0;
    
    students.forEach(s => {
      sumAccuracy += s.accuracy;
      if (s.scenariosAttempted > 0) studentsParticipated++;
    });
    
    const avgPreparednessScore = totalStudents > 0 ? (sumAccuracy / totalStudents).toFixed(1) : 0;
    
    // 2. Attendance % in Drills
    const drillAttendance = totalStudents > 0 ? Math.round((studentsParticipated / totalStudents) * 100) : 0;

    // 3. Top Risk Areas
    // Calculate failure rate per scenario to identify areas needing improvement
    const results = await Result.findAll({
      include: [{ model: Scenario, attributes: ['disasterType', 'title'] }]
    });

    const riskData = {};
    results.forEach(r => {
      if (!r.Scenario) return; // Skip if scenario was deleted
      
      const type = r.Scenario.disasterType;
      if (!riskData[type]) riskData[type] = { total: 0, failed: 0 };
      riskData[type].total++;
      if (!r.isCorrect) riskData[type].failed++;
    });

    const topRiskAreas = Object.keys(riskData).map(type => {
      const { total, failed } = riskData[type];
      const riskScore = total > 0 ? Math.round((failed / total) * 100) : 0; // % failed
      return { disasterType: type, riskScore, failureCount: failed };
    }).sort((a, b) => b.riskScore - a.riskScore); // Highest risk first

    res.json({
      summary: {
        totalStudents,
        totalScenarios,
        totalAttempts,
        avgPreparednessScore: parseFloat(avgPreparednessScore),
        drillAttendance,
        topRiskAreas
      },
      students
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard.' });
  }
};

module.exports = { getDashboard };
