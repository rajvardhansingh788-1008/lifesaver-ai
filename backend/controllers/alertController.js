const { Alert, User } = require('../models');

// 1. Submit SOS
const submitSOS = async (req, res) => {
  try {
    const { disasterType } = req.body;
    const userId = req.user.id;

    if (!disasterType) {
      return res.status(400).json({ error: 'Disaster type is required.' });
    }

    const alert = await Alert.create({
      userId,
      disasterType
    });

    res.status(201).json({ message: 'Emergency SOS sent to Admin!', alert });
  } catch (error) {
    console.error('SOS Submit Error:', error);
    res.status(500).json({ error: 'Failed to send SOS.' });
  }
};

// 2. Get All Active Alerts (Admin only)
const getPendingAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll({
      where: { status: 'pending' },
      include: [{
        model: User,
        attributes: ['name', 'school', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ alerts });
  } catch (error) {
    console.error('Get Alerts Error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts.' });
  }
};

// 3. Admin Broadcasts Warning to School
const broadcastAlert = async (req, res) => {
  try {
    const alertId = req.params.id;
    const alert = await Alert.findByPk(alertId, { include: [User] });

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found.' });
    }

    alert.status = 'broadcasted';
    await alert.save();

    res.json({ message: `Emergency broadcast activated for school: ${alert.User.school}`, alert });
  } catch (error) {
    console.error('Broadcast Error:', error);
    res.status(500).json({ error: 'Failed to broadcast alert.' });
  }
};

// 4. Students poll for active broadcasts to their school
const getActiveBroadcasts = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.school) {
      return res.json({ broadcasts: [] });
    }

    // Find active broadcasts originating from students in the SAME school
    // We do this by finding 'broadcasted' alerts whose User matches the school.
    const activeBroadcasts = await Alert.findAll({
      where: { status: 'broadcasted' },
      include: [{
        model: User,
        where: { school: user.school },
        attributes: ['school']
      }],
      // For MVP, we only get very recent broadcasts (e.g. last 10 minutes)
      // but for simplicity, we just return all active ones. 
      // Resolving alerts is out of scope unless added later. We'll limit to last 1 hour.
      order: [['createdAt', 'DESC']]
    });

    // Filter by createdAt > 1 hour ago
    const OneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentBroadcasts = activeBroadcasts.filter(b => new Date(b.createdAt) > OneHourAgo);

    res.json({ broadcasts: recentBroadcasts });
  } catch (error) {
    console.error('Poll Broadcasts Error:', error);
    res.status(500).json({ error: 'Failed to poll broadcasts.' });
  }
};


module.exports = { submitSOS, getPendingAlerts, broadcastAlert, getActiveBroadcasts };
