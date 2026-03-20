/**
 * Hardcoded Disaster Safety Q&A Database
 * Used as fallback when Gemini API is unavailable.
 * Covers: Fire, Earthquake, Flood, Tsunami, Cyclone, Landslide, Lightning, Heatwave, First Aid, General Safety
 */

const fallbackQA = [
  // ─────────────── FIRE SAFETY ───────────────
  {
    keywords: ['fire', 'burn', 'flame', 'smoke', 'blaze', 'aag', 'jalana'],
    q: 'What should I do if there is a fire in my house?',
    a: '🔥 **Fire Safety Steps:**\n1. Stay calm. Alert everyone in the house immediately.\n2. Crawl low under the smoke — smoke rises, so the cleaner air is near the floor.\n3. Feel doors before opening — if hot, do NOT open. Find another exit.\n4. Get out fast and go to your meeting point outside.\n5. Call the fire department (101 in India).\n6. Never go back inside a burning building for any reason.'
  },
  {
    keywords: ['fire extinguisher', 'extinguisher', 'how to use extinguisher'],
    q: 'How do I use a fire extinguisher?',
    a: '🧯 **Remember the PASS technique:**\n- **P** — Pull the pin\n- **A** — Aim the nozzle at the base of the fire\n- **S** — Squeeze the handle\n- **S** — Sweep side to side at the base of the flames\n\n⚠️ Only attempt this if the fire is small and you have a clear escape route behind you.'
  },
  {
    keywords: ['clothes fire', 'clothes catch fire', 'kapde', 'body fire'],
    q: 'What if my clothes catch fire?',
    a: '🛑 **Stop, Drop, and Roll!**\n1. **STOP** — Do not run, it fans the flames.\n2. **DROP** — Get to the ground immediately.\n3. **ROLL** — Roll back and forth to smother the fire.\n4. Cover your face with your hands while rolling.\n5. Cool the burn with water and seek medical help.'
  },
  {
    keywords: ['fire escape', 'escape plan', 'fire exit', 'evacuation fire'],
    q: 'How should I plan a fire escape route?',
    a: '🏃 **Fire Escape Planning:**\n1. Identify at least **2 exits** from every room.\n2. Practice your escape plan every 6 months.\n3. Choose an outside **meeting point** (e.g., a tree or lamppost).\n4. Make sure windows can be opened easily.\n5. Keep exit paths clear of furniture and clutter.\n6. Install smoke alarms on every floor and test monthly.'
  },
  {
    keywords: ['fire prevention', 'prevent fire', 'fire cause', 'fire safety tips'],
    q: 'How can I prevent fires at home?',
    a: '🔒 **Fire Prevention Tips:**\n1. Never leave cooking unattended.\n2. Keep flammable items away from stoves and heaters.\n3. Don\'t overload electrical outlets or use damaged wires.\n4. Store matches and lighters away from children.\n5. Install smoke detectors and check batteries regularly.\n6. Have a fire extinguisher in the kitchen.\n7. Never smoke inside the house.'
  },
  {
    keywords: ['kitchen fire', 'oil fire', 'grease fire', 'cooking fire'],
    q: 'What to do during a kitchen or oil fire?',
    a: '🍳 **Kitchen Fire Safety:**\n1. **Never use water on an oil/grease fire** — it will explode!\n2. Turn off the burner if safe to do so.\n3. Cover the pan with a metal lid to cut off oxygen.\n4. Use a fire extinguisher (Class B or K) if available.\n5. If it spreads, evacuate and call 101.\n6. Baking soda can smother small grease fires.'
  },

  // ─────────────── EARTHQUAKE ───────────────
  {
    keywords: ['earthquake', 'quake', 'tremor', 'seismic', 'bhukamp', 'shaking'],
    q: 'What should I do during an earthquake?',
    a: '🌍 **During an Earthquake:**\n1. **DROP** to your hands and knees.\n2. **COVER** — Get under a sturdy desk or table. Protect your head and neck.\n3. **HOLD ON** — Stay there until the shaking stops.\n4. Stay away from windows, mirrors, and heavy objects.\n5. If outdoors, move to an open area away from buildings.\n6. If driving, pull over and stay inside the car.\n\n❌ Do NOT run outside during shaking — falling debris is the main killer.'
  },
  {
    keywords: ['after earthquake', 'earthquake over', 'post earthquake'],
    q: 'What should I do after an earthquake?',
    a: '📋 **After an Earthquake:**\n1. Check yourself and others for injuries.\n2. Be prepared for **aftershocks** — they can be strong too.\n3. Check for gas leaks — if you smell gas, open windows and leave.\n4. Avoid damaged buildings and fallen power lines.\n5. Use stairs, never elevators.\n6. Listen to emergency broadcasts for instructions.\n7. Keep your phone use minimal to avoid overloading networks.'
  },
  {
    keywords: ['earthquake kit', 'earthquake bag', 'earthquake prepare', 'earthquake supply'],
    q: 'How to prepare an earthquake emergency kit?',
    a: '🎒 **Earthquake Emergency Kit:**\n1. Water — 1 gallon per person per day (3-day supply)\n2. Non-perishable food (canned food, energy bars)\n3. First aid kit\n4. Flashlight + extra batteries\n5. Whistle (to signal for help)\n6. Important documents in waterproof bag\n7. Extra clothes and blankets\n8. Phone charger / power bank\n9. Cash (ATMs may not work)\n10. Medications if needed'
  },
  {
    keywords: ['earthquake safe', 'earthquake proof', 'earthquake building'],
    q: 'How can I make my home earthquake-safe?',
    a: '🏠 **Earthquake-Proofing Your Home:**\n1. Secure heavy furniture to walls with brackets.\n2. Use earthquake-resistant latches on cabinets.\n3. Place heavy objects on lower shelves.\n4. Strap your water heater to the wall.\n5. Know where gas and water shut-offs are.\n6. Fix any cracks in walls or foundations.\n7. Keep shoes near your bed (for broken glass).'
  },

  // ─────────────── FLOOD ───────────────
  {
    keywords: ['flood', 'flooding', 'water rise', 'baarish', 'flood water', 'paani'],
    q: 'What should I do during a flood?',
    a: '🌊 **During a Flood:**\n1. Move to **higher ground** immediately.\n2. **Never walk or drive through flood water** — just 6 inches can knock you down.\n3. Stay away from rivers, streams, and drainage channels.\n4. Disconnect electrical appliances before water reaches them.\n5. If trapped, go to the highest floor or rooftop.\n6. Signal for help — wave a bright cloth or use a flashlight.\n7. Listen to local radio for updates.'
  },
  {
    keywords: ['flood prepare', 'flood safety', 'flood tips', 'before flood'],
    q: 'How to prepare for a flood?',
    a: '🛡️ **Flood Preparation:**\n1. Know your area\'s flood risk — check flood zone maps.\n2. Keep important documents in waterproof containers.\n3. Stock emergency supplies (water, food, medicines).\n4. Elevate electrical appliances and valuable items.\n5. Clear drains and gutters regularly.\n6. Have a family communication plan.\n7. Know your evacuation routes.'
  },
  {
    keywords: ['after flood', 'flood cleanup', 'post flood'],
    q: 'What to do after a flood?',
    a: '🧹 **After a Flood:**\n1. Return home only when authorities say it\'s safe.\n2. Check for structural damage before entering.\n3. Beware of snakes and insects that may have entered.\n4. Do NOT touch electrical equipment if wet.\n5. Throw away food that touched flood water.\n6. Clean and disinfect everything that was submerged.\n7. Watch for contaminated drinking water — boil before use.'
  },

  // ─────────────── TSUNAMI ───────────────
  {
    keywords: ['tsunami', 'tidal wave', 'ocean wave', 'sea wave'],
    q: 'What should I do during a tsunami warning?',
    a: '🌊 **Tsunami Safety:**\n1. If you feel a strong earthquake near the coast, move to high ground immediately.\n2. A **receding ocean** (water pulling far back) is a natural tsunami warning.\n3. Go at least **100 feet above sea level** or 2 miles inland.\n4. Do NOT go to the beach to watch — tsunamis are not surfable waves.\n5. Stay away from the coast until officials say it\'s safe.\n6. Tsunamis come in **multiple waves** — the first may not be the largest.'
  },

  // ─────────────── CYCLONE / HURRICANE ───────────────
  {
    keywords: ['cyclone', 'hurricane', 'storm', 'toofan', 'typhoon', 'strong wind'],
    q: 'What should I do during a cyclone?',
    a: '🌀 **Cyclone Safety:**\n1. Stay indoors in a strong building, away from windows.\n2. Board up windows or tape them in an X pattern.\n3. Stock emergency supplies for at least 3 days.\n4. Charge all phones and power banks.\n5. Fill bathtubs and buckets with clean water.\n6. Listen to official weather warnings.\n7. If asked to evacuate, do so immediately.\n8. Beware of the **"eye"** — the calm center. The storm will resume.'
  },

  // ─────────────── LANDSLIDE ───────────────
  {
    keywords: ['landslide', 'mudslide', 'land slide', 'hill collapse', 'pahad'],
    q: 'What should I do during a landslide?',
    a: '⛰️ **Landslide Safety:**\n1. Move away from the path of the slide — go uphill if possible.\n2. If you can\'t escape, curl into a ball and protect your head.\n3. Watch for warning signs: unusual sounds, cracks in ground, tilting trees.\n4. After a landslide, stay away from the slide area.\n5. Report broken utility lines to authorities.\n6. Avoid river valleys and low-lying areas during heavy rain.'
  },

  // ─────────────── LIGHTNING ───────────────
  {
    keywords: ['lightning', 'thunder', 'thunderstorm', 'bijli'],
    q: 'What should I do during a lightning storm?',
    a: '⚡ **Lightning Safety:**\n1. Get indoors immediately — a solid building is safest.\n2. Avoid water, tall trees, and open fields.\n3. Do NOT use landline phones (cell phones are OK).\n4. Stay away from windows and doors.\n5. If caught outside, crouch low with feet together — do NOT lie flat.\n6. Wait 30 minutes after the last thunder before going outside.\n7. Unplug electronics to prevent power surge damage.'
  },

  // ─────────────── HEATWAVE ───────────────
  {
    keywords: ['heatwave', 'heat wave', 'heat stroke', 'hot weather', 'garmi', 'loo'],
    q: 'How to stay safe during a heatwave?',
    a: '☀️ **Heatwave Safety:**\n1. Stay hydrated — drink water every 15-20 minutes.\n2. Avoid going outside between 12 PM – 4 PM.\n3. Wear light-colored, loose-fitting cotton clothes.\n4. Use ORS (Oral Rehydration Solution) or lemon water.\n5. Never leave children or pets in parked cars.\n6. Recognize **heat stroke** signs: headache, confusion, no sweating, hot skin.\n7. If someone has heat stroke, cool them with wet cloths and call for help immediately.'
  },

  // ─────────────── FIRST AID ───────────────
  {
    keywords: ['first aid', 'cpr', 'bleeding', 'wound', 'injury', 'chot'],
    q: 'What are the basics of first aid?',
    a: '🏥 **First Aid Basics:**\n1. **Check** the scene is safe before helping.\n2. **Call** emergency services (112 in India).\n3. **Care** for the person:\n   - For **bleeding**: Apply firm pressure with a clean cloth.\n   - For **burns**: Cool with running water for 10 minutes.\n   - For **choking**: Give 5 back blows, then 5 abdominal thrusts.\n   - For **unconscious person**: Check breathing, start CPR if not breathing.\n4. Keep the person calm and warm.\n5. Do NOT move someone with a spine/neck injury.'
  },
  {
    keywords: ['cpr', 'heart attack', 'cardiac', 'breathing stopped', 'saans'],
    q: 'How to perform CPR?',
    a: '❤️ **CPR Steps (for adults):**\n1. Check if the person is responsive — tap and shout.\n2. Call 112 (emergency) immediately.\n3. Place the heel of your hand on the center of the chest.\n4. Push hard and fast — at least **2 inches deep, 100-120 pushes/min**.\n5. After 30 compressions, give **2 rescue breaths** (tilt head, lift chin).\n6. Continue until help arrives or the person starts breathing.\n\n💡 Tip: Push to the beat of the song "Stayin\' Alive" for correct rhythm!'
  },
  {
    keywords: ['snake bite', 'snakebite', 'saanp'],
    q: 'What to do for a snake bite?',
    a: '🐍 **Snake Bite First Aid:**\n1. Keep the person calm and still — movement spreads venom faster.\n2. Remove jewelry/watches near the bite before swelling starts.\n3. Keep the bitten limb **below heart level**.\n4. **Do NOT** suck the venom, cut the wound, or apply a tourniquet.\n5. **Do NOT** apply ice.\n6. Note the snake\'s appearance if safe to do so.\n7. Get to a hospital immediately — antivenom is the only real treatment.'
  },
  {
    keywords: ['fracture', 'broken bone', 'haddi'],
    q: 'What to do for a fracture or broken bone?',
    a: '🦴 **Fracture First Aid:**\n1. Do NOT try to straighten the bone.\n2. Immobilize the injured area using a splint (stick, rolled newspaper, etc.).\n3. Apply ice wrapped in cloth to reduce swelling.\n4. Elevate the limb if possible.\n5. Check circulation beyond the injury (feeling, color, warmth).\n6. Call for medical help — fractures need proper X-ray and treatment.'
  },

  // ─────────────── GENERAL SAFETY ───────────────
  {
    keywords: ['emergency number', 'help number', 'ambulance', 'police number'],
    q: 'What are important emergency numbers?',
    a: '📞 **Important Emergency Numbers (India):**\n- **112** — Universal Emergency Number\n- **101** — Fire Department\n- **102** — Ambulance\n- **100** — Police\n- **108** — Emergency Medical Service\n- **1078** — Disaster Management\n- **181** — Women Helpline\n- **1098** — Child Helpline\n\n💡 Save these in your phone right now!'
  },
  {
    keywords: ['emergency kit', 'disaster kit', 'survival kit', 'safety bag'],
    q: 'What should be in a disaster emergency kit?',
    a: '🎒 **Universal Disaster Kit:**\n1. 💧 Water — 3 liters per person per day (3-day supply)\n2. 🥫 Non-perishable food (instant noodles, biscuits, dried fruits)\n3. 🏥 First aid kit with basic medicines\n4. 🔦 Flashlight + extra batteries\n5. 📻 Battery-powered radio\n6. 📱 Phone power bank (fully charged)\n7. 📄 Important documents (Aadhar, insurance, etc.)\n8. 💊 Personal medications\n9. 💵 Cash in small denominations\n10. 🧹 Whistle + dust mask\n11. 🔧 Multi-tool / Swiss knife\n12. 🧥 Extra clothes and blankets'
  },
  {
    keywords: ['school safety', 'school drill', 'school disaster'],
    q: 'What should students do during a disaster at school?',
    a: '🏫 **School Disaster Safety:**\n1. Listen to your teacher\'s instructions immediately.\n2. Follow the practiced drill — **Do NOT panic.**\n3. **Earthquake**: Duck under desks. Cover head and neck.\n4. **Fire**: Walk (don\'t run) to the assembly point. Use stairs only.\n5. Stay in a group — never wander off alone.\n6. Help classmates who need assistance.\n7. Know your school\'s evacuation map and exits.'
  },
  {
    keywords: ['disaster app', 'alert app', 'warning app'],
    q: 'Are there apps for disaster alerts?',
    a: '📱 **Useful Disaster Alert Apps:**\n1. **NDMA App** — Official Indian disaster alerts\n2. **Damini** — Lightning alerts for India\n3. **SACHET** — Cyclone & weather warnings\n4. **Mausam** — India Meteorological Department weather\n5. **Google Crisis Alerts** — Built into Google Maps\n6. **Red Cross Emergency** — First aid + alerts\n\nKeep these installed and notifications turned ON!'
  },
  {
    keywords: ['what is disaster', 'types of disaster', 'disaster meaning', 'natural disaster'],
    q: 'What are the different types of natural disasters?',
    a: '🌎 **Types of Natural Disasters:**\n\n**Geological:**\n- Earthquakes, Volcanic eruptions, Landslides, Tsunamis\n\n**Meteorological:**\n- Cyclones, Hurricanes, Tornadoes, Thunderstorms\n\n**Hydrological:**\n- Floods, Flash floods, Tsunamis\n\n**Climatological:**\n- Heatwaves, Droughts, Wildfires\n\n**Biological:**\n- Pandemics (e.g., COVID-19), Epidemics\n\nEach type requires different preparation and response strategies.'
  },
  {
    keywords: ['rescue', 'trapped', 'building collapse', 'stuck', 'debris'],
    q: 'What to do if I am trapped under debris?',
    a: '🆘 **If Trapped Under Debris:**\n1. Stay calm and conserve energy.\n2. Cover your mouth and nose with cloth to filter dust.\n3. **Tap on a pipe or wall** so rescuers can hear you.\n4. Use a whistle if you have one.\n5. **Shout only as a last resort** — you could inhale dangerous dust.\n6. Do NOT light a match (there could be gas leaks).\n7. Try to move to where you can see light or feel air.'
  },
  {
    keywords: ['electricity', 'electric shock', 'power line', 'bijli ka jhatka'],
    q: 'What to do for an electric shock?',
    a: '⚡ **Electric Shock First Aid:**\n1. Do NOT touch the person if they\'re still in contact with the source.\n2. Turn off the power source if possible.\n3. Use a DRY non-conducting object (wooden stick) to separate them.\n4. Call emergency services (112).\n5. If not breathing, start CPR.\n6. Treat any burns with cool water.\n7. Keep the person lying down and warm until help arrives.'
  },
  {
    keywords: ['drowning', 'water accident', 'swimming', 'pool'],
    q: 'What to do if someone is drowning?',
    a: '🏊 **Drowning Rescue:**\n1. **Shout for help** and call emergency services.\n2. **Reach** — Use a long object (branch, towel) from shore.\n3. **Throw** — Toss a floating object (life ring, ball, bottle).\n4. **Row** — Use a boat if available.\n5. **Go** — Only swim to them as a LAST resort (trained rescuers only).\n6. Once out of water, check breathing and start CPR if needed.\n7. Keep them warm and seek medical help.'
  },
  {
    keywords: ['gas leak', 'gas', 'smell gas', 'lpg'],
    q: 'What to do if I smell a gas leak?',
    a: '💨 **Gas Leak Safety:**\n1. Do NOT turn on/off any electrical switches.\n2. Do NOT light matches, candles, or lighters.\n3. Open all windows and doors for ventilation.\n4. Turn off the gas supply at the main valve.\n5. Evacuate everyone from the building.\n6. Call the gas emergency number from OUTSIDE.\n7. Do not re-enter until cleared by authorities.'
  },

  // ─────────────── PANDEMIC / DISEASE ───────────────
  {
    keywords: ['pandemic', 'virus', 'covid', 'disease', 'infection', 'bimari'],
    q: 'How to stay safe during a pandemic?',
    a: '😷 **Pandemic Safety:**\n1. Wash hands frequently with soap for 20+ seconds.\n2. Wear masks in crowded or enclosed spaces.\n3. Maintain social distancing (6 feet / 2 meters).\n4. Get vaccinated when vaccines are available.\n5. Avoid touching your face.\n6. Disinfect frequently touched surfaces.\n7. Stay home if you feel unwell.\n8. Follow official health guidelines from WHO/government.'
  },

  // ─────────────── COLD WAVE / WINTER ───────────────
  {
    keywords: ['cold', 'winter', 'hypothermia', 'frostbite', 'sardi', 'thand'],
    q: 'How to stay safe during extreme cold?',
    a: '🥶 **Cold Wave Safety:**\n1. Layer your clothing — wear thermal inners, wool, and a windproof jacket.\n2. Keep your extremities warm (hands, feet, ears).\n3. Stay dry — wet clothing loses heat rapidly.\n4. Eat warm, high-calorie foods.\n5. Recognize **hypothermia** signs: shivering, confusion, drowsiness.\n6. If someone has hypothermia, warm them gradually (NOT with hot water).\n7. Keep a room heated and well-ventilated.'
  },

  // ─────────────── MISCELLANEOUS ───────────────
  {
    keywords: ['help', 'hi', 'hello', 'hey', 'kya', 'bolo', 'namaste'],
    q: 'Hello / General greeting',
    a: '👋 **Hello! I\'m your LifeSaver AI Assistant.**\n\nI can help you with:\n- 🔥 Fire safety\n- 🌍 Earthquake preparedness\n- 🌊 Flood & tsunami survival\n- 🌀 Cyclone safety\n- ⚡ Lightning protection\n- ☀️ Heatwave tips\n- 🏥 First aid basics\n- 📞 Emergency numbers\n- 🎒 Emergency kit preparation\n\nJust ask me anything about disaster safety! For example: "What to do during an earthquake?"'
  },
  {
    keywords: ['thank', 'thanks', 'shukriya', 'dhanyavaad'],
    q: 'Thank you',
    a: '🙏 **You\'re welcome!** Stay safe and keep learning about disaster preparedness. Remember — knowledge saves lives! If you have any more questions, feel free to ask. 🛡️'
  },
  {
    keywords: ['who are you', 'what are you', 'kya hai tu', 'kaun ho'],
    q: 'Who are you?',
    a: '🤖 **I\'m LifeSaver AI — your disaster safety assistant!**\n\nI\'m designed to help students learn about:\n- How to stay safe during natural disasters\n- First aid and emergency response\n- Disaster preparedness tips\n\nI\'m part of the LifeSaver AI platform, where you can practice disaster simulations and earn E-Coins! 🪙'
  },
  {
    keywords: ['nuclear', 'radiation', 'bomb', 'atomic'],
    q: 'What to do during a nuclear emergency?',
    a: '☢️ **Nuclear Emergency Safety:**\n1. Get inside a building immediately — preferably brick/concrete.\n2. Go to the **basement or center** of the building.\n3. Remove contaminated clothing and shower.\n4. Close all windows and doors, turn off ventilation.\n5. Listen to official instructions on radio/TV.\n6. If told to evacuate, follow the designated routes.\n7. Cover your nose and mouth if outdoors.\n8. Do NOT use flash or conditioned air until cleared.'
  },
  {
    keywords: ['volcano', 'volcanic', 'eruption', 'lava'],
    q: 'What to do during a volcanic eruption?',
    a: '🌋 **Volcanic Eruption Safety:**\n1. Evacuate immediately if told to do so.\n2. Avoid river valleys and low-lying areas (lahars flow there).\n3. Wear long sleeves, pants, goggles, and a mask.\n4. Stay indoors with windows and doors closed.\n5. Protect yourself from **ash fall** — it can cause breathing problems.\n6. Do NOT drive in heavy ash — it clogs engines.\n7. Clear ash from roofs to prevent collapse.'
  },
  {
    keywords: ['tornado', 'twister'],
    q: 'What to do during a tornado?',
    a: '🌪️ **Tornado Safety:**\n1. Go to the **lowest floor** of a sturdy building.\n2. Get to an interior room (bathroom, closet) away from windows.\n3. Cover yourself with a thick mattress or blankets.\n4. Protect your head and neck.\n5. If in a car, get out and lie in a low ditch.\n6. **Never** try to outrun a tornado in a vehicle.\n7. Mobile homes are NOT safe — go to a sturdy building.'
  },
  {
    keywords: ['wildfire', 'forest fire', 'jungle fire'],
    q: 'What to do during a wildfire?',
    a: '🔥🌲 **Wildfire Safety:**\n1. Evacuate immediately when told — don\'t wait.\n2. Wear cotton/wool clothing and cover exposed skin.\n3. Close all windows and doors at home.\n4. Move downhill if possible — fire spreads faster uphill.\n5. Get to a road, cleared area, or body of water.\n6. Cover your nose and mouth with a wet cloth.\n7. After returning home, check for hidden hot spots and embers.'
  },
  {
    keywords: ['signal', 'sos', 'lost', 'help signal', 'rescue signal'],
    q: 'How to signal for help during an emergency?',
    a: '🆘 **Emergency Signaling Methods:**\n1. **SOS** — Three short, three long, three short (... --- ...)\n2. **Whistle** — Blow 3 times, pause, repeat.\n3. **Mirror/Shiny object** — Flash toward rescuers/aircraft.\n4. **Bright cloth** — Wave from a high point or lay on ground.\n5. **Fire** — Build three fires in a triangle (universal distress signal).\n6. **Phone** — Call 112.  Even works without SIM card on most phones.'
  },
  {
    keywords: ['water purify', 'clean water', 'safe water', 'drinking water'],
    q: 'How to purify water during an emergency?',
    a: '💧 **Emergency Water Purification:**\n1. **Boiling** — Bring to a rolling boil for 1 minute (best method).\n2. **Water purification tablets** — Follow package instructions.\n3. **Bleach** — Add 8 drops of unscented bleach per gallon, wait 30 min.\n4. **Solar disinfection** — Fill clear bottle, leave in direct sunlight for 6+ hours.\n5. **Cloth filter** — Strain through clean cloth to remove large particles first.\n\n⚠️ Never drink flood water or water near industrial areas.'
  },
];

/**
 * Find the best matching answer for a user question.
 * Uses keyword matching with scoring.
 */
function findBestMatch(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of fallbackQA) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword.toLowerCase())) {
        // Longer keyword matches get higher score
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Require at least some match
  if (bestScore >= 2 && bestMatch) {
    return bestMatch.a;
  }

  // Default response if no match found
  return '🤔 I\'m not sure about that, but I can help you with disaster safety topics!\n\n**Try asking me about:**\n- 🔥 "What to do during a fire?"\n- 🌍 "Earthquake safety tips"\n- 🌊 "How to prepare for a flood?"\n- 🏥 "How to perform CPR?"\n- 📞 "Emergency numbers"\n- 🎒 "What should be in a disaster kit?"\n- ⚡ "Lightning safety"\n- 🌀 "Cyclone precautions"\n\nJust type your question and I\'ll help! 🛡️';
}

module.exports = { fallbackQA, findBestMatch };
