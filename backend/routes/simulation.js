const router = require('express').Router();
const { startSimulation, submitAnswer } = require('../controllers/simulationController');
const { authenticate } = require('../middleware/auth');
const { validate, answerSchema } = require('../middleware/validate');

router.get('/start', authenticate, startSimulation);
router.post('/answer', authenticate, validate(answerSchema), submitAnswer);

module.exports = router;
