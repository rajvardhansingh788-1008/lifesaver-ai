const router = require('express').Router();
const { claimCoins } = require('../controllers/web3Controller');
const { authenticate } = require('../middleware/auth');

router.post('/claim', authenticate, claimCoins);

module.exports = router;
