const { User } = require('../models');

// Hardcoded scenarios for demo (no database required for scenarios)
const scenarios = [
  {
    id: 1,
    title: 'Grease Fire',
    disasterType: 'fire',
    situation: 'A pan of cooking oil suddenly catches fire on your kitchen stove. The flames are growing quickly.',
    options: [
      'Throw a bucket of water on the fire.',
      'Cover the pan with a metal lid and turn off the heat.',
      'Try to carry the burning pan outside.',
      'Use a flour bag to smother the flames.'
    ],
    correctAnswer: 1,
    explanation: 'Never use water on a grease fire, as it spreads the burning oil. Covering the pan cuts off oxygen, which is the safest and most effective method.'
  },
  {
    id: 2,
    title: 'School Earthquake',
    disasterType: 'earthquake',
    situation: 'You are in a classroom on the second floor when the ground begins shaking violently.',
    options: [
      'Run immediately out of the building.',
      'Stand in a doorway.',
      'Drop under a sturdy desk, Cover your head, and Hold on.',
      'Move to the windows to see what is falling.'
    ],
    correctAnswer: 2,
    explanation: 'Drop, Cover, and Hold On protects you from falling debris, which is the most common cause of injury during earthquakes. Running outside exposes you to falling glass and bricks.'
  },
  {
    id: 3,
    title: 'Flash Flood on Road',
    disasterType: 'flood',
    situation: 'You are driving and encounter quickly moving water rushing across the road. You are not sure how deep it is.',
    options: [
      'Drive through it slowly.',
      'Turn around, do not drown. Find another route.',
      'Abandon the car immediately and swim.',
      'Speed up to cross the water quickly.'
    ],
    correctAnswer: 1,
    explanation: 'Just two feet of moving water can sweep away most vehicles. Attempting to drive through flooded roads is the leading cause of flood-related deaths.'
  },
  {
    id: 4,
    title: 'Electrical Fire',
    disasterType: 'fire',
    situation: 'A spark from an overloaded wall outlet starts a small fire spreading to the curtains.',
    options: [
      'Unplug the device and use a Class C fire extinguisher.',
      'Throw water from the sink on the outlet.',
      'Open the windows to blow the fire out.',
      'Cover the outlet with a wet towel.'
    ],
    correctAnswer: 0,
    explanation: 'Throwing water on an electrical fire can cause fatal electrocution. Disconnecting the power source and using a dry chemical (Class C) extinguisher is the only safe procedure.'
  },
  {
    id: 5,
    title: 'Trapped by Flood',
    disasterType: 'flood',
    situation: 'Flood waters are rapidly rising inside your home and have reached the ground floor.',
    options: [
      'Hide in a closet on the ground floor.',
      'Evacuate to the roof and signal for help.',
      'Attempt to swim through the neighborhood to safety.',
      'Drink the tap water before it stops working.'
    ],
    correctAnswer: 1,
    explanation: 'You should move to the highest safe point, like a roof, when trapped by rising waters. Do not enter floodwaters as they are often toxic, swift, and filled with unseen hazards.'
  },
  {
    id: 6,
    title: 'Earthquake in Bed',
    disasterType: 'earthquake',
    situation: 'You are sleeping in your bed when a sudden, massive earthquake wakes you up.',
    options: [
      'Stay in bed, cover your head and neck with a pillow.',
      'Run to the closest doorway.',
      'Sprint outside to the yard.',
      'Roll under the bed.'
    ],
    correctAnswer: 0,
    explanation: 'Staying in bed and covering your head avoids injuries from shattered glass and falling heavy objects in the dark.'
  }
];

const startSimulation = async (req, res) => {
  try {
    // Select a random scenario
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const scenario = scenarios[randomIndex];

    // Return exact structure requested
    res.json({
      id: scenario.id,
      title: scenario.title,
      disasterType: scenario.disasterType,
      situation: scenario.situation,
      options: scenario.options,
      correctAnswer: scenario.correctAnswer,
      explanation: scenario.explanation
    });
  } catch (error) {
    console.error('Start simulation error:', error);
    res.status(500).json({ error: 'Failed to load scenario.' });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const { scenarioId, selectedOption } = req.body;

    const scenario = scenarios.find(s => s.id === parseInt(scenarioId));
    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found.' });
    }

    const isCorrect = parseInt(selectedOption) === scenario.correctAnswer;
    const coinsEarned = isCorrect ? 10 : 0; // +10 for correct, 0 for wrong

    let totalCoins = 0;

    // Update database coins without modifying DB structures/models
    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        user.coins = (user.coins || 0) + coinsEarned;
        
        // Also increment scenarios attempted and roughly calculate accuracy based on the user's total scenarios attempted
        user.scenariosAttempted = (user.scenariosAttempted || 0) + 1;
        // This is a naive accuracy update just to keep the field populated
        const currentAccuracy = user.accuracy || 0;
        user.accuracy = isCorrect 
          ? Math.min(100, currentAccuracy + 5) 
          : Math.max(0, currentAccuracy - 2);

        await user.save();
        totalCoins = user.coins;
      }
    }

    // Return exact structure requested
    res.json({
      correct: isCorrect,
      explanation: scenario.explanation,
      coinsEarned: coinsEarned,
      totalCoins: totalCoins
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer.' });
  }
};

module.exports = { startSimulation, submitAnswer };
