const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const messages = error.errors.map(e => e.message);
    return res.status(400).json({ error: 'Validation failed', details: messages });
  }
};

// Schemas
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  school: z.string().optional(),
  role: z.enum(['student', 'admin']).optional()
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

const answerSchema = z.object({
  scenarioId: z.number().int().positive('Scenario ID is required'),
  selectedOption: z.number().int().min(0, 'Option is required')
});

const quizSubmitSchema = z.object({
  answers: z.array(z.object({
    scenarioId: z.number().int().positive(),
    selectedOption: z.number().int().min(0)
  })).min(1, 'At least one answer is required')
});

module.exports = {
  validate,
  signupSchema,
  loginSchema,
  answerSchema,
  quizSubmitSchema
};
