const { findBestMatch } = require('../data/chatbotFallback');

/**
 * Fake AI Chatbot API
 * Works exactly like a real AI API — accepts message, returns intelligent reply.
 * No external API key needed. All answers come from our local Q&A database.
 */
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const userMessage = message.trim();

    // Simulate slight API delay (feels more like real AI)
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));

    // Get smart answer from our local Q&A database
    const reply = findBestMatch(userMessage);

    return res.json({
      success: true,
      reply,
      model: 'lifesaver-ai-v1',
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Chatbot service error.' });
  }
};
