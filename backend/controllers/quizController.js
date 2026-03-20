const { User } = require('../models');

// Robust set of categorized questions for the new Quiz feature
const quizQuestions = {
  fire: [
    {
      id: 'f1', title: 'Kitchen Grease Fire', disasterType: 'fire',
      situation: 'A pan of cooking oil suddenly catches fire on your kitchen stove.',
      options: ['Throw water on it.', 'Cover pan with metal lid.', 'Carry it outside.', 'Use flour.'],
      correctOption: 1,
      explanations: { '0': 'Water violently explodes grease fires.', '1': 'Correct! Cuts off oxygen.', '2': 'Spreads fire easily.', '3': 'Flour is explosive.' }
    },
    {
      id: 'f2', title: 'Electrical Sparking', disasterType: 'fire',
      situation: 'A spark from an overloaded wall outlet starts a small fire.',
      options: ['Use Class C extinguisher.', 'Throw water.', 'Open windows.', 'Wet towel.'],
      correctOption: 0,
      explanations: { '0': 'Correct! Dry chemical for electrical.', '1': 'Causes electrocution.', '2': 'Feeds oxygen to fire.', '3': 'Conducts electricity.' }
    },
    {
      id: 'f3', title: 'Trapped in a Room', disasterType: 'fire',
      situation: 'You are trapped in a room and smoke is filling the hallway.',
      options: ['Run through smoke.', 'Hide under bed.', 'Block door cracks and signal.', 'Break door.'],
      correctOption: 2,
      explanations: { '0': 'Smoke inhalation is deadly.', '1': 'Hard for rescuers to find you.', '2': 'Correct! Safest survival strategy.', '3': 'Lets toxic smoke rush in.' }
    },
    {
      id: 'f4', title: 'Clothes on Fire', disasterType: 'fire',
      situation: 'Your sleeve accidentally catches on fire.',
      options: ['Run to find water.', 'Stop, Drop, and Roll.', 'Take the shirt off slowly.', 'Pat it with your hands.'],
      correctOption: 1,
      explanations: { '0': 'Running fans the flames.', '1': 'Correct! Smothers the fire quickly.', '2': 'Takes too long, causes burns.', '3': 'Will burn your hands.' }
    },
    {
      id: 'f5', title: 'Escaping a Burning Building', disasterType: 'fire',
      situation: 'You are escaping a building filled with thick smoke.',
      options: ['Run upright.', 'Crawl low on the floor.', 'Use the elevator.', 'Hold your breath and sprint.'],
      correctOption: 1,
      explanations: { '0': 'Smoke rises; toxic at head height.', '1': 'Correct! Cleaner air is near the floor.', '2': 'Elevators fail during fires.', '3': 'You will pass out from lack of oxygen.' }
    },
    {
      id: 'f6', title: 'Closed Door Heating Up', disasterType: 'fire',
      situation: 'You are trying to escape, but the doorknob feels extremely hot.',
      options: ['Open it quickly.', 'Kick the door down.', 'Leave the door closed and find another way.', 'Cool it with spit.'],
      correctOption: 2,
      explanations: { '0': 'Fire is on the other side.', '1': 'Will cause a backdraft explosion.', '2': 'Correct! The fire is right outside.', '3': 'Completely ineffective.' }
    }
  ],
  earthquake: [
    {
      id: 'e1', title: 'Shaking Classroom', disasterType: 'earthquake',
      situation: 'You are in a classroom on the second floor when shaking starts.',
      options: ['Run outside.', 'Stand in doorway.', 'Drop, Cover, Hold on.', 'Go to window.'],
      correctOption: 2,
      explanations: { '0': 'Exposes you to falling debris.', '1': 'Doorways aren\'t safer.', '2': 'Correct! Proven protection method.', '3': 'Shattering glass hazard.' }
    },
    {
      id: 'e2', title: 'Driving During Earthquake', disasterType: 'earthquake',
      situation: 'You are driving when a strong earthquake hits.',
      options: ['Speed up.', 'Pull over away from bridges.', 'Stop instantly.', 'Run to field.'],
      correctOption: 1,
      explanations: { '0': 'Speeding is dangerous.', '1': 'Correct! Avoids structural collapse.', '2': 'Causes accidents.', '3': 'Dangerous due to debris.' }
    },
    {
      id: 'e3', title: 'Aftershock Warning', disasterType: 'earthquake',
      situation: 'The main quake just stopped. What next?',
      options: ['Back to normal.', 'Light a match.', 'Prepare for aftershocks.', 'Call everyone.'],
      correctOption: 2,
      explanations: { '0': 'Aftershocks are likely.', '1': 'Gas line explosion risk.', '2': 'Correct! Be ready for more shaking.', '3': 'Jams emergency lines.' }
    },
    {
      id: 'e4', title: 'Trapped Under Debris', disasterType: 'earthquake',
      situation: 'You are trapped under rubble after a collapse.',
      options: ['Yell constantly.', 'Light a lighter to see.', 'Tap on a pipe/wall rhythmically.', 'Try to move heavy debris.'],
      correctOption: 2,
      explanations: { '0': 'Wastes energy, inhale dust.', '1': 'Consumes oxygen, gas risk.', '2': 'Correct! Rescuers use sound to find you.', '3': 'Can cause further collapse.' }
    },
    {
      id: 'e5', title: 'Outdoors During Earthquake', disasterType: 'earthquake',
      situation: 'You are walking in a city street when the ground shakes violently.',
      options: ['Run inside a building.', 'Stand next to a tall glass building.', 'Move to an open clear area.', 'Hold onto a streetlamp.'],
      correctOption: 2,
      explanations: { '0': 'Building facades often fall off.', '1': 'Glass shatters outward.', '2': 'Correct! Away from falling objects.', '3': 'Streetlamps can fall over.' }
    }
  ],
  flood: [
    {
      id: 'fl1', title: 'Flash Flood on Road', disasterType: 'flood',
      situation: 'Water is rushing across the road you are driving on.',
      options: ['Drive slowly.', 'Turn around, find another route.', 'Abandon car and swim.', 'Speed up.'],
      correctOption: 1,
      explanations: { '0': 'Cars sweep away easily.', '1': 'Correct! Turn around, don\'t drown.', '2': 'Swimming is deadly in floods.', '3': 'Increases stalling risk.' }
    },
    {
      id: 'fl2', title: 'Rising Water at Home', disasterType: 'flood',
      situation: 'Flood waters are rapidly rising inside your home.',
      options: ['Hide in closet.', 'Evacuate to roof.', 'Swim through neighborhood.', 'Drink tap water.'],
      correctOption: 1,
      explanations: { '0': 'You will be trapped.', '1': 'Correct! Highest safe point.', '2': 'Toxic and hidden hazards.', '3': 'Water is likely contaminated.' }
    },
    {
      id: 'fl3', title: 'Post-Flood Cleanup', disasterType: 'flood',
      situation: 'Floodwaters receded. You are cleaning up.',
      options: ['Test appliances.', 'Wade in standing water.', 'Wear protective gear to clean.', 'Eat pantry food.'],
      correctOption: 2,
      explanations: { '0': 'Electrocution risk.', '1': 'Conceals hazards/sewage.', '2': 'Correct! Protect against contamination.', '3': 'Contaminated food.' }
    },
    {
      id: 'fl4', title: 'Walking in Floods', disasterType: 'flood',
      situation: 'You must evacuate on foot through a flooded street.',
      options: ['Walk where water is moving.', 'Use a stick to check depth and walk in still water.', 'Tie yourself to a tree.', 'Run through the water.'],
      correctOption: 1,
      explanations: { '0': 'Moving water will knock you down.', '1': 'Correct! Check depth carefully.', '2': 'Tree could uproot.', '3': 'You will trip and fall.' }
    },
    {
      id: 'fl5', title: 'Flood Warnings', disasterType: 'flood',
      situation: 'A "Flood Warning" has just been issued for your exact area.',
      options: ['Wait and see what happens.', 'Start filling sandbags.', 'Evacuate immediately to higher ground.', 'Go to the basement.'],
      correctOption: 2,
      explanations: { '0': 'Too late to wait.', '1': 'Takes too long.', '2': 'Correct! Warning means it is happening now.', '3': 'Basements trap you underwater.' }
    }
  ],
  medical: [
    {
      id: 'm1', title: 'Choking Victim', disasterType: 'medical',
      situation: 'A person at the restaurant is clutching their throat and cannot speak or cough.',
      options: ['Offer them a glass of water.', 'Perform the Heimlich maneuver.', 'Slap them hard on the back once.', 'Wait to see if they cough it up.'],
      correctOption: 1,
      explanations: { '0': 'They cannot swallow.', '1': 'Correct! Abdominal thrusts dislodge the item.', '2': 'Can lodge the item deeper if standing upright.', '3': 'They are suffocating.' }
    },
    {
      id: 'm2', title: 'Severe Bleeding', disasterType: 'medical',
      situation: 'Someone has a deep cut on their arm that is bleeding heavily.',
      options: ['Wash it with soap and water.', 'Apply direct pressure with a clean cloth.', 'Wait for it to clot on its own.', 'Tie a loose bandage around it.'],
      correctOption: 1,
      explanations: { '0': 'Washes away clotting factors.', '1': 'Correct! Direct pressure stops blood loss.', '2': 'They could bleed out.', '3': 'Needs firm, direct pressure.' }
    },
    {
      id: 'm3', title: 'Unconscious Breathing Person', disasterType: 'medical',
      situation: 'You find someone unconscious on the floor, but they are breathing normally.',
      options: ['Start CPR compressions immediately.', 'Place them in the recovery position.', 'Splash water on their face.', 'Prop their head up with pillows.'],
      correctOption: 1,
      explanations: { '0': 'CPR is for absent/abnormal breathing.', '1': 'Correct! Keeps airway clear of vomit/tongue.', '2': 'Does not help medically.', '3': 'Can restrict the airway.' }
    },
    {
      id: 'm4', title: 'Suspected Heart Attack', disasterType: 'medical',
      situation: 'An adult is experiencing severe chest pain radiating to their left arm, and shortness of breath.',
      options: ['Have them lie flat on their back.', 'Call emergency services and have them chew an aspirin.', 'Drive them to the hospital yourself.', 'Offer them a sugary drink.'],
      correctOption: 1,
      explanations: { '0': 'Sitting comfortably is better for breathing.', '1': 'Correct! Aspirin thins blood, EMS provides best care.', '2': 'Paramedics can start treatment immediately.', '3': 'Not helpful for cardiac issues.' }
    },
    {
      id: 'm5', title: 'Burn Injury', disasterType: 'medical',
      situation: 'You accidentally touch a hot stove and suffer a painful, red burn.',
      options: ['Apply butter to soothe it.', 'Pop any blisters that form.', 'Run cool (not freezing) water over it for 10-15 minutes.', 'Wrap it tightly in a bandage immediately.'],
      correctOption: 2,
      explanations: { '0': 'Butter traps heat and causes infection.', '1': 'Popping blisters causes infection.', '2': 'Correct! Cool water stops the burning process.', '3': 'Bandage can stick to the burn.' }
    }
  ],
  storm: [
    {
      id: 's1', title: 'Tornado Warning', disasterType: 'storm',
      situation: 'Tornado sirens are wailing and the sky is turning green.',
      options: ['Go to the basement or an interior windowless room.', 'Open all windows to equalize pressure.', 'Run outside to see the funnel cloud.', 'Get in your car and outdrive it.'],
      correctOption: 0,
      explanations: { '0': 'Correct! Lowest, safest central point protects from debris.', '1': 'Myth! Wastes time and exposes you to glass.', '2': 'Extremely dangerous.', '3': 'Tornadoes are faster and erratic.' }
    },
    {
      id: 's2', title: 'Lightning Storm Indoors', disasterType: 'storm',
      situation: 'A severe thunderstorm is directly overhead with intense lightning.',
      options: ['Take a warm shower.', 'Use corded appliances and landlines.', 'Stay away from windows and plumbing.', 'Stand on the patio to watch.'],
      correctOption: 2,
      explanations: { '0': 'Plumbing conducts electricity.', '1': 'Wires conduct lightning strikes.', '2': 'Correct! Safe from shattering glass and electrical surges.', '3': 'Exposes you to lightning strikes.' }
    },
    {
      id: 's3', title: 'Hurricane Evacuation', disasterType: 'storm',
      situation: 'A category 4 hurricane is approaching and a mandatory evacuation is ordered.',
      options: ['Board up windows and stay inside your house.', 'Evacuate immediately using designated routes.', 'Wait until the winds start to leave.', 'Hide in the attic.'],
      correctOption: 1,
      explanations: { '0': 'Mandatory means your life is at extreme risk.', '1': 'Correct! The only safe option during mandatory evac.', '2': 'Roads will be blocked or flooded by then.', '3': 'Attics become death traps as water rises.' }
    },
    {
      id: 's4', title: 'Caught Outside in Lightning', disasterType: 'storm',
      situation: 'You are stuck in a park and lightning strikes nearby.',
      options: ['Stand under the tallest tree to stay dry.', 'Lie flat on the ground.', 'Crouch low, weight on balls of feet, cover ears.', 'Hold onto a metal fence.'],
      correctOption: 2,
      explanations: { '0': 'Tall objects attract lightning.', '1': 'Ground conducts electricity over a wide area.', '2': 'Correct! Minimizes ground contact point.', '3': 'Metal conducts electricity from strikes.' }
    },
    {
      id: 's5', title: 'Winter Blizzard Stuck', disasterType: 'storm',
      situation: 'Your car breaks down on a rural road during a severe blizzard with whiteout conditions.',
      options: ['Start walking to find help.', 'Stay in the car, run heater 10 mins per hour, keep exhaust clear.', 'Leave the car running constantly.', 'Drink alcohol to stay warm.'],
      correctOption: 1,
      explanations: { '0': 'You will quickly succumb to hypothermia and get lost.', '1': 'Correct! Car provides shelter, periodic heat prevents freezing.', '2': 'Runs out of gas and risks CO poisoning.', '3': 'Alcohol lowers core body temperature.' }
    }
  ]
};

// Route: GET /api/quiz/questions?type=fire
const getQuizQuestions = (req, res) => {
  try {
    const { type } = req.query;
    if (!type || !quizQuestions[type]) {
      return res.status(400).json({ error: 'Invalid or missing disaster type' });
    }

    // Get all questions for the requested type
    let allQuestions = [...quizQuestions[type]];
    
    // Shuffle the array
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    // Select subset (max 4 questions for a reasonable quiz length)
    const selectedQuestions = allQuestions.slice(0, 4);

    // Format response (omitting the correct options/explanations for safety)
    const questions = selectedQuestions.map(q => ({
      id: q.id,
      title: q.title,
      disasterType: q.disasterType,
      situation: q.situation,
      options: q.options
    }));

    res.json({ questions });
  } catch (error) {
    console.error('Fetch questions error:', error);
    res.status(500).json({ error: 'Failed to fetch questions.' });
  }
};

// Route: POST /api/quiz/evaluate
const evaluateAnswer = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const { questionId, selectedOption, disasterType } = req.body;

    if (!disasterType || !quizQuestions[disasterType]) {
      return res.status(400).json({ error: 'Invalid disaster type' });
    }

    const question = quizQuestions[disasterType].find(q => q.id === questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    const isCorrect = parseInt(selectedOption) === question.correctOption;
    // Reward: 10 coins for correct answer, 0 for wrong
    const coinsEarned = isCorrect ? 10 : 0; 
    let totalCoins = 0;

    // Database updates (Coins and Stats)
    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        user.coins = (user.coins || 0) + coinsEarned;
        
        user.scenariosAttempted = (user.scenariosAttempted || 0) + 1;
        const currentAccuracy = user.accuracy || 0;
        user.accuracy = isCorrect 
          ? Math.min(100, currentAccuracy + 2) 
          : Math.max(0, currentAccuracy - 1);

        await user.save();
        totalCoins = user.coins;
      }
    }

    res.json({
      correct: isCorrect,
      correctOption: question.correctOption,
      explanation: question.explanations[selectedOption.toString()],
      correctExplanation: question.explanations[question.correctOption.toString()],
      coinsEarned,
      totalCoins
    });
  } catch (error) {
    console.error('Evaluate answer error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer.' });
  }
};

// Legacy support (optional)
const submitQuiz = async (req, res) => {
  res.status(400).json({ error: 'Legacy quiz submission is no longer supported.' });
};

module.exports = { getQuizQuestions, evaluateAnswer, submitQuiz };
