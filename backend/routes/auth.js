const router = require('express').Router();
const { signup, login } = require('../controllers/authController');
const { validate, signupSchema, loginSchema } = require('../middleware/validate');

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
