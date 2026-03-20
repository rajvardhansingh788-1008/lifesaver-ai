const scenarios = [
  {
    title: 'Office Fire Emergency',
    disasterType: 'fire',
    situation: 'You are working on the 5th floor of an office building when the fire alarm goes off. You can smell smoke coming from the hallway. The emergency exit staircase is 20 meters to your left, and the elevator is 5 meters to your right. What do you do?',
    options: [
      'Take the elevator to evacuate quickly',
      'Use the emergency staircase to exit the building',
      'Hide under your desk and wait for help',
      'Open windows and jump to escape'
    ],
    correctOption: 1,
    explanations: {
      '0': 'WRONG! Never use elevators during a fire. They can malfunction, fill with smoke, or open on the fire floor, trapping you.',
      '1': 'CORRECT! Always use emergency staircases during a fire. Stay low to avoid smoke inhalation, and proceed calmly to the nearest exit.',
      '2': 'WRONG! Hiding under a desk does not protect you from fire or smoke. You need to evacuate the building immediately.',
      '3': 'WRONG! Jumping from the 5th floor is extremely dangerous and likely fatal. Always use designated emergency exits.'
    },
    difficulty: 'easy'
  },
  {
    title: 'Earthquake in Classroom',
    disasterType: 'earthquake',
    situation: 'You are sitting in a classroom when the ground starts shaking violently. Books are falling off shelves, and the lights are flickering. Your teacher is not in the room. What is your first action?',
    options: [
      'Run outside the building immediately',
      'Drop, Cover, and Hold On under a sturdy desk',
      'Stand in the doorway for protection',
      'Call emergency services immediately'
    ],
    correctOption: 1,
    explanations: {
      '0': 'WRONG! Running during an earthquake is dangerous. Falling debris could hit you. Wait until the shaking stops before evacuating.',
      '1': 'CORRECT! Drop, Cover, and Hold On is the internationally recommended response. Get under a sturdy desk, protect your head and neck, and hold on until shaking stops.',
      '2': 'WRONG! Standing in a doorway is an outdated myth. Modern doorways are no stronger than other parts of a building. Get under sturdy furniture instead.',
      '3': 'WRONG! While calling 911 is important, your immediate priority during shaking is to protect yourself. Call after the shaking stops.'
    },
    difficulty: 'easy'
  },
  {
    title: 'Flash Flood Warning',
    disasterType: 'flood',
    situation: 'You are driving home when you receive a flash flood warning on your phone. You see water flowing across the road ahead — it appears to be about knee-deep. What should you do?',
    options: [
      'Drive through quickly before the water rises',
      'Turn around and find an alternate higher-ground route',
      'Wait in your car until the water recedes',
      'Get out of your car and walk through the water'
    ],
    correctOption: 1,
    explanations: {
      '0': 'WRONG! Just 6 inches of moving water can knock you down, and 2 feet can sweep away a vehicle. Never drive through floodwater.',
      '1': 'CORRECT! "Turn Around, Don\'t Drown!" is the golden rule. Find an alternate route on higher ground. Even shallow water can hide dangerous conditions.',
      '2': 'WRONG! Staying in a car in a flood zone is dangerous. Water can rise quickly and trap you inside. Move to higher ground instead.',
      '3': 'WRONG! Walking through floodwater is extremely dangerous. It can contain debris, downed power lines, and hidden hazards. Just 6 inches of moving water can sweep you off your feet.'
    },
    difficulty: 'medium'
  },
  {
    title: 'Kitchen Fire at Home',
    disasterType: 'fire',
    situation: 'You are cooking dinner and oil in the pan catches fire. The flames are rising quickly. What is the safest immediate action?',
    options: [
      'Pour water on the fire to extinguish it',
      'Cover the pan with a metal lid and turn off the heat',
      'Try to carry the burning pan to the sink',
      'Use a fire extinguisher and aim at the center of the fire'
    ],
    correctOption: 1,
    explanations: {
      '0': 'WRONG! NEVER put water on a grease/oil fire! Water causes the oil to splatter and the fire to explode outward, potentially causing severe burns.',
      '1': 'CORRECT! Covering with a metal lid smothers the fire by cutting off oxygen. Turn off the heat source and let it cool completely. This is the safest method for grease fires.',
      '2': 'WRONG! Moving a burning pan is extremely dangerous. Hot oil can splash and cause severe burns, and the fire can spread to other areas.',
      '3': 'WRONG! While a fire extinguisher can work, aiming at the center of a grease fire can splash burning oil. For a small pan fire, smothering with a lid is safer and simpler.'
    },
    difficulty: 'medium'
  },
  {
    title: 'Earthquake Aftershock Protocol',
    disasterType: 'earthquake',
    situation: 'The initial earthquake has stopped. You are inside a damaged building with cracked walls. You can hear people shouting outside. The lights are out, and you smell gas. What is your priority action?',
    options: [
      'Turn on your phone flashlight and search for others',
      'Evacuate immediately and move to an open area, without using lights or switches',
      'Stay inside and wait for rescue teams',
      'Light a candle to see your surroundings better'
    ],
    correctOption: 1,
    explanations: {
      '0': 'WRONG! While helping others is noble, if you smell gas, any electrical spark (including from a phone) could ignite the gas. Evacuate first.',
      '1': 'CORRECT! If you smell gas, evacuate immediately. Do NOT use any electrical switches, phones, or open flames — any spark could ignite leaking gas. Move to an open area away from damaged buildings.',
      '2': 'WRONG! A damaged building with gas leaks is extremely dangerous. Aftershocks could collapse it further. Evacuate to an open area immediately.',
      '3': 'WRONG! NEVER use open flames when you smell gas! This could cause an explosion. Evacuate without creating any sparks.'
    },
    difficulty: 'hard'
  }
];

module.exports = scenarios;
