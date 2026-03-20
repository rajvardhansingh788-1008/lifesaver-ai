const router = require('express').Router();
const { submitSOS, getPendingAlerts, broadcastAlert, getActiveBroadcasts } = require('../controllers/alertController');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Student submits an SOS
router.post('/sos', authenticate, submitSOS);

// Admin gets all active/pending alerts
router.get('/', authenticate, requireAdmin, getPendingAlerts);

// Admin broadcasts the alert
router.post('/broadcast/:id', authenticate, requireAdmin, broadcastAlert);

// Students get active broadcasts for their school
router.get('/active', authenticate, getActiveBroadcasts);

module.exports = router;
