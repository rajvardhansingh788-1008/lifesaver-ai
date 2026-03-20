const router = require('express').Router();
const { getQuizQuestions, evaluateAnswer } = require('../controllers/quizController');
const { authenticate } = require('../middleware/auth');

router.get('/questions', authenticate, getQuizQuestions);
router.post('/evaluate', authenticate, evaluateAnswer);

module.exports = router;
