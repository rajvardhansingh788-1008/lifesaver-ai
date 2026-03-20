const router = require('express').Router();
const { getDashboard } = require('../controllers/adminController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/dashboard', authenticate, requireAdmin, getDashboard);

module.exports = router;
