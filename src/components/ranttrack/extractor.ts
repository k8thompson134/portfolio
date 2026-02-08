/**
 * Curated NLP Symptom Extractor -- Web Demo Port
 *
 * Ported from RantTrack's mobile extraction engine (2,260 lines)
 * with a curated subset of symptom patterns for demo purposes.
 *
 * Supports: phrase matching, lemma matching, negation detection,
 * severity scoring, pain qualifier/body part extraction.
 */

import { ExtractedSymptom, ExtractionResult, Severity } from './types';

// ============================================================================
// SYMPTOM LEMMAS - Single word -> symptom category
// ============================================================================

const SYMPTOM_LEMMAS: Record<string, string> = {
  // Fatigue / Energy
  exhaust: 'fatigue', exhausted: 'fatigue', exhaustion: 'fatigue',
  tire: 'fatigue', tired: 'fatigue', tiredness: 'fatigue',
  wipe: 'fatigue', wiped: 'fatigue',
  fatigue: 'fatigue', fatigued: 'fatigue',
  drain: 'fatigue', drained: 'fatigue',
  spent: 'fatigue', depleted: 'fatigue',
  sluggish: 'fatigue', lethargic: 'fatigue', lethargy: 'fatigue',
  weary: 'fatigue', wrecked: 'fatigue', destroyed: 'fatigue',
  energy: 'fatigue', suffering: 'fatigue',
  knackered: 'fatigue', shattered: 'fatigue', zonked: 'fatigue',
  listless: 'fatigue', bushed: 'fatigue', beat: 'fatigue',
  enervated: 'fatigue',

  // PEM
  crash: 'pem', crashed: 'pem', crashing: 'pem',
  payback: 'pem', pem: 'pem',
  flare: 'flare', flaring: 'flare', flareup: 'flare',
  overdid: 'pem', overexerted: 'pem', overexertion: 'pem', pushed: 'pem',
  relapse: 'pem', relapsed: 'pem',

  // Brain Fog / Cognitive
  foggy: 'brain_fog', fog: 'brain_fog', fuzzy: 'brain_fog',
  cloudy: 'brain_fog', scattered: 'brain_fog', spacey: 'brain_fog',
  hazy: 'brain_fog', muddled: 'brain_fog', confused: 'brain_fog',
  fried: 'brain_fog', blanking: 'brain_fog', disoriented: 'brain_fog',
  loopy: 'brain_fog',
  forgetful: 'memory', forgetting: 'memory',
  distracted: 'focus', unfocused: 'focus',
  concentration: 'focus', focusing: 'focus', cognitive: 'brain_fog',

  // General Pain
  ache: 'pain', achy: 'pain', aching: 'pain',
  hurt: 'pain', hurts: 'pain', hurting: 'pain',
  pain: 'pain', painful: 'pain',
  sore: 'pain', soreness: 'pain', tender: 'pain',
  throbbing: 'pain', stabbing: 'pain', sharp: 'pain',
  burning: 'pain', discomfort: 'pain',

  // Headache
  migraine: 'headache', migraines: 'headache',
  headache: 'headache', headaches: 'headache',
  pounding: 'headache',

  // Muscle / Joint Pain
  muscle: 'muscle_pain', muscles: 'muscle_pain',
  joint: 'joint_pain', joints: 'joint_pain',
  stiff: 'stiffness', stiffness: 'stiffness',

  // Sleep
  insomnia: 'insomnia', sleepless: 'insomnia',
  restless: 'sleep_disturbance',
  unrefreshed: 'unrefreshing_sleep', unrefreshing: 'unrefreshing_sleep',
  drowsy: 'hypersomnia',

  // Cardiac / POTS
  palpitation: 'palpitations', palpitations: 'palpitations',
  racing: 'palpitations', flutter: 'palpitations',
  tachycardia: 'palpitations', arrhythmia: 'palpitations',
  skipping: 'palpitations',

  // Dizziness / Vertigo
  dizzy: 'dizziness', dizziness: 'dizziness',
  lightheaded: 'dizziness', lightheadedness: 'dizziness',
  faint: 'fainting', fainted: 'fainting', fainting: 'fainting',
  vertigo: 'vertigo', spinning: 'vertigo',
  woozy: 'dizziness', unsteady: 'dizziness',

  // GI
  nausea: 'nausea', nauseous: 'nausea', nauseated: 'nausea', queasy: 'nausea',
  vomit: 'vomiting', vomiting: 'vomiting', puke: 'vomiting', puking: 'vomiting',
  bloated: 'bloating', bloating: 'bloating', distension: 'bloating',
  gastroparesis: 'gastroparesis', dysphagia: 'swallowing_difficulty',

  // Neurological
  tingle: 'numbness_tingling', tingling: 'numbness_tingling',
  numb: 'numbness_tingling', numbness: 'numbness_tingling',
  paresthesia: 'numbness_tingling', paresthesias: 'numbness_tingling',
  tremor: 'tremor', shaking: 'tremor', shaky: 'tremor',
  twitching: 'tremor', twitches: 'tremor', spasm: 'spasm', spasms: 'spasm',
  vibration: 'vibration', vibrations: 'vibration',
  zap: 'brain_zaps', zaps: 'brain_zaps',

  // Respiratory
  breathless: 'shortness_of_breath',
  wheezy: 'wheezing', wheezing: 'wheezing',
  cough: 'cough', coughing: 'cough',

  // Mood
  depressed: 'low_mood', depression: 'low_mood', sad: 'low_mood',
  hopeless: 'low_mood', crying: 'low_mood',
  anxious: 'anxiety', anxiety: 'anxiety', worried: 'anxiety',
  panic: 'panic', panicky: 'panic',
  stressed: 'stress', stress: 'stress',
  overwhelmed: 'overwhelmed',
  irritable: 'irritability', frustrated: 'irritability',

  // Temperature
  sweating: 'sweating', sweaty: 'sweating', sweats: 'sweating',
  chills: 'chills', chilly: 'chills',
  feverish: 'fever', fever: 'fever',

  // Weakness
  weak: 'weakness', weakness: 'weakness',

  // General Malaise
  sick: 'malaise', awful: 'malaise', terrible: 'malaise',
  horrible: 'malaise', miserable: 'malaise',

  // Sensory
  rash: 'rash', hives: 'rash',
  blurry: 'vision_changes',

  // EDS / Hypermobility
  subluxation: 'subluxation', subluxed: 'subluxation', subluxing: 'subluxation',
  dislocation: 'dislocation', dislocating: 'dislocation', dislocated: 'dislocation',
  hypermobile: 'hypermobility', hypermobility: 'hypermobility',

  // MCAS / Immune
  histamine: 'histamine_reaction', mcas: 'histamine_reaction',
  allodynia: 'allodynia',

  // Autonomic
  dysautonomia: 'dysautonomia', pots: 'pots',
  hypotension: 'hypotension',

  // Appetite / Weight
  appetite: 'appetite_change',

  // Urinary
  urgency: 'urinary',

  // Temperature (additions)
  flushing: 'flushing', flushed: 'flushing', overheating: 'heat_intolerance',
  overheated: 'heat_intolerance',
};

// ============================================================================
// MULTI-WORD SYMPTOM PHRASES
// ============================================================================

const SYMPTOM_PHRASES: Record<string, string> = {
  // Fatigue
  'brain fog': 'brain_fog',
  'wiped out': 'fatigue',
  'worn out': 'fatigue',
  'no energy': 'fatigue',
  'low energy': 'fatigue',
  'zero energy': 'fatigue',
  'running on empty': 'fatigue',
  'running on fumes': 'fatigue',
  'hit a wall': 'fatigue',
  'feel like death': 'fatigue',

  // Spoon Theory
  'out of spoons': 'spoon_theory',
  'no spoons': 'spoon_theory',
  'low spoons': 'spoon_theory',
  'negative spoons': 'spoon_theory',
  'no spoons left': 'spoon_theory',
  'low on spoons': 'spoon_theory',
  'spoon deficit': 'spoon_theory',

  // PEM / Crash
  'post-exertional malaise': 'pem',
  'post exertional malaise': 'pem',
  'energy crash': 'pem',
  'crashed hard': 'pem',
  'totally crashed': 'pem',
  'boom and bust': 'pem',
  'pushed too hard': 'pem',
  'overdid it': 'pem',
  'paying for it': 'pem',

  // Flare
  'in a flare': 'flare',
  'flare up': 'flare',
  'flare-up': 'flare',
  'bad flare': 'flare',
  'major flare': 'flare',
  'full flare': 'flare',

  // Cognitive
  "can't think": 'brain_fog',
  "cant think": 'brain_fog',
  "can't focus": 'brain_fog',
  "cant focus": 'brain_fog',
  "can't concentrate": 'brain_fog',
  "can't remember": 'memory',
  'brain is soup': 'brain_fog',
  'brain soup': 'brain_fog',
  'brain is fried': 'brain_fog',
  'brain is broken': 'brain_fog',
  'brain not braining': 'brain_fog',
  'brain empty': 'brain_fog',
  'head empty': 'brain_fog',
  'mental fog': 'brain_fog',
  'fibro fog': 'brain_fog',
  "can't brain": 'brain_fog',
  'no thoughts': 'brain_fog',
  'thinking through mud': 'brain_fog',

  // Cardiac
  'heart racing': 'palpitations',
  'heart pounding': 'palpitations',
  'heart is racing': 'palpitations',
  'heart is pounding': 'palpitations',
  'heart rate spiked': 'palpitations',
  'heart rate spiking': 'tachycardia',

  // Dizziness
  'room spinning': 'vertigo',
  'head spinning': 'vertigo',
  'almost fainted': 'presyncope',
  'nearly fainted': 'presyncope',
  'feeling faint': 'presyncope',
  'so dizzy': 'dizziness',
  'really dizzy': 'dizziness',
  'super dizzy': 'dizziness',

  // Pain
  'killing me': 'pain',
  'full body pain': 'pain',
  'everything hurts': 'pain',
  'all over pain': 'pain',
  'hurts so bad': 'pain',
  'back pain': 'back_pain',
  'neck pain': 'neck_pain',
  'chest pain': 'chest_pain',
  'muscle pain': 'muscle_pain',
  'joint pain': 'joint_pain',
  'body aches': 'muscle_pain',
  'splitting headache': 'headache',
  'head is killing me': 'headache',

  // Respiratory
  'short of breath': 'shortness_of_breath',
  'shortness of breath': 'shortness_of_breath',
  "can't breathe": 'shortness_of_breath',
  "cant breathe": 'shortness_of_breath',
  'out of breath': 'shortness_of_breath',
  'chest tight': 'chest_tightness',
  'tight chest': 'chest_tightness',

  // Sleep
  "can't sleep": 'insomnia',
  "cant sleep": 'insomnia',
  'trouble sleeping': 'insomnia',
  'woke up tired': 'unrefreshing_sleep',
  'woke up exhausted': 'unrefreshing_sleep',
  'still tired': 'unrefreshing_sleep',

  // GI
  'stomach pain': 'gi_pain',
  'stomach cramps': 'gi_pain',
  'threw up': 'vomiting',
  'throwing up': 'vomiting',

  // Mood
  'feeling low': 'low_mood',
  'feeling down': 'low_mood',
  'panic attack': 'panic',
  'anxiety attack': 'panic',

  // Sensitivity
  'sensitive to light': 'light_sensitivity',
  'light sensitivity': 'light_sensitivity',
  'too bright': 'light_sensitivity',
  'sensitive to sound': 'sound_sensitivity',
  'too loud': 'sound_sensitivity',

  // Temperature
  'night sweats': 'sweating',
  "can't get warm": 'cold_intolerance',

  // Weakness
  'legs like jelly': 'weakness',
  'jelly legs': 'weakness',
  'heavy limbs': 'weakness',

  // Casual/Gen-Z
  'feel like garbage': 'malaise',
  'feels like garbage': 'malaise',
  'feeling like garbage': 'malaise',
  'feel like crap': 'malaise',
  'feels like crap': 'malaise',
  'feel like trash': 'malaise',
  'literally dying': 'fatigue',
  'literally dead': 'fatigue',
  'im dead': 'fatigue',
  "i'm dead": 'fatigue',
  'dead tired': 'fatigue',
  'so dead': 'fatigue',
  'body gave up': 'fatigue',
  'barely functioning': 'fatigue',
  'not functioning': 'fatigue',
  'absolutely exhausted': 'fatigue',
  'absolutely drained': 'fatigue',
  'totally wrecked': 'fatigue',
  'lowkey exhausted': 'fatigue',
  'lowkey dying': 'fatigue',

  'brain is complete soup': 'brain_fog',
  'hurts like hell': 'pain',
  'pain is insane': 'pain',
  'pain is brutal': 'pain',

  "can't even": 'overwhelmed',
  'cant even': 'overwhelmed',

  // Orthostatic / POTS
  "can't stand": 'orthostatic_intolerance',
  "cant stand": 'orthostatic_intolerance',
  'trouble standing': 'orthostatic_intolerance',
  'upon standing': 'orthostatic_intolerance',
  'when i stand': 'orthostatic_intolerance',
  'stood up too fast': 'orthostatic_intolerance',
  'blood pooling': 'blood_pooling',
  'coat hanger pain': 'dysautonomia',
  'adrenaline surge': 'adrenaline_surge',
  'adrenaline rush': 'adrenaline_surge',
  'adrenaline dump': 'adrenaline_surge',

  // EDS / Hypermobility
  'joint instability': 'subluxation',
  'joints popping': 'subluxation',
  'joints slipping': 'subluxation',
  'fell out of place': 'subluxation',

  // Neurological
  'pins and needles': 'numbness_tingling',
  'pins needles': 'numbness_tingling',
  'brain zaps': 'brain_zaps',
  'electric shocks': 'brain_zaps',
  'internal tremor': 'vibration',
  'internal tremors': 'vibration',
  'internal vibrations': 'vibration',

  // Cognitive (expanded)
  "can't find words": 'brain_fog',
  'losing words': 'brain_fog',
  'words not working': 'brain_fog',
  'brain not working': 'brain_fog',
  'brain is mush': 'brain_fog',
  'cotton wool head': 'brain_fog',
  'thoughts are slow': 'brain_fog',
  'slow thinking': 'brain_fog',
  'cognitive dysfunction': 'brain_fog',
  'pain fog': 'brain_fog',
  'med fog': 'brain_fog',
  'medication fog': 'brain_fog',
  'word finding': 'brain_fog',

  // Activity Intolerance
  'exercise intolerance': 'exercise_intolerance',
  "can't exercise": 'exercise_intolerance',
  'cant exercise': 'exercise_intolerance',
  'did too much': 'pem',
  'pushed through': 'pem',
  'pacing failure': 'pem',
  'delayed recovery': 'pem',
  'slow recovery': 'pem',

  // Syncope
  'about to pass out': 'presyncope',
  'passed out': 'fainting',
  'blacked out': 'fainting',
  'greyed out': 'presyncope',
  'grayed out': 'presyncope',
  'tunnel vision': 'presyncope',

  // Sensory Sensitivity
  'light hurts': 'light_sensitivity',
  'lights hurt': 'light_sensitivity',
  'sound hurts': 'sound_sensitivity',
  'sounds hurt': 'sound_sensitivity',
  'noise sensitivity': 'sound_sensitivity',
  'smell sensitivity': 'smell_sensitivity',
  'sensitive to smells': 'smell_sensitivity',

  // Sleep (expanded)
  "couldn't sleep": 'insomnia',
  'couldnt sleep': 'insomnia',
  'tossing and turning': 'insomnia',
  'keep waking up': 'sleep_disturbance',
  'waking up constantly': 'sleep_disturbance',
  'never feel rested': 'unrefreshing_sleep',
  "don't feel rested": 'unrefreshing_sleep',
  'restless sleep': 'sleep_disturbance',

  // GI (expanded)
  'stomach churning': 'nausea',
  'abdominal pain': 'gi_pain',
  'gut issues': 'gi_pain',
  'digestive issues': 'gi_pain',
  "can't keep food down": 'vomiting',
  'food intolerance': 'food_sensitivity',
  'food intolerances': 'food_sensitivity',
  'food sensitivities': 'food_sensitivity',
  'trouble swallowing': 'swallowing_difficulty',
  'hard to swallow': 'swallowing_difficulty',

  // Temperature (expanded)
  'hot and cold': 'temperature_dysregulation',
  "can't regulate temperature": 'temperature_dysregulation',
  'heat intolerance': 'heat_intolerance',
  'cold intolerance': 'cold_intolerance',
  'hot flashes': 'hot_flashes',
  'hot flushes': 'hot_flashes',

  // Weakness / Mobility
  'legs gave out': 'weakness',
  'legs buckling': 'weakness',
  'unsteady on feet': 'dizziness',
  'balance problems': 'balance_issues',
  'balance issues': 'balance_issues',
  "can't walk": 'mobility_impairment',
  'trouble walking': 'mobility_impairment',

  // Long COVID specific
  'altered smell': 'parosmia',
  'smell distortion': 'parosmia',
  'altered taste': 'dysgeusia',
  'metallic taste': 'dysgeusia',
  'ringing in ears': 'tinnitus',
  'ears ringing': 'tinnitus',

  // MCAS
  'histamine reaction': 'histamine_reaction',
  'allergic reaction': 'histamine_reaction',
  'mast cell activation': 'histamine_reaction',

  // Mental Health (expanded)
  'intrusive thoughts': 'intrusive_thoughts',
  'mental breakdown': 'overwhelmed',

  // Autoimmune specific
  'malar rash': 'rash',
  'low grade fever': 'fever',
  'mouth sores': 'mouth_sores',

  // Dissociation
  'out of my body': 'dissociation',
  'floating outside': 'dissociation',
};

// ============================================================================
// NEGATION WORDS
// ============================================================================

const NEGATION_WORDS = new Set([
  'not', 'no', "n't", 'never', 'without',
  'dont', "don't", 'doesnt', "doesn't",
  'didnt', "didn't", 'havent', "haven't",
  'hasnt', "hasn't", 'isnt', "isn't",
  'arent', "aren't", 'wont', "won't",
  'cant', "can't", 'none', 'neither', 'nothing',
]);

// ============================================================================
// SEVERITY
// ============================================================================

const SEVERITY_INDICATORS: Record<string, Severity> = {
  'slight': 'mild', 'slightly': 'mild', 'mild': 'mild', 'mildly': 'mild',
  'minor': 'mild', 'bit': 'mild', 'somewhat': 'mild',
  'kinda': 'mild', 'manageable': 'mild', 'tolerable': 'mild',
  'barely': 'mild', 'hardly': 'mild', 'lightly': 'mild', 'little': 'mild',

  'moderate': 'moderate', 'moderately': 'moderate',
  'pretty': 'moderate', 'fairly': 'moderate', 'quite': 'moderate',
  'noticeable': 'moderate', 'definitely': 'moderate', 'significant': 'moderate',

  'severe': 'severe', 'severely': 'severe',
  'extreme': 'severe', 'extremely': 'severe',
  'very': 'severe', 'really': 'severe', 'super': 'severe',
  'intense': 'severe', 'awful': 'severe', 'terrible': 'severe',
  'horrible': 'severe', 'unbearable': 'severe', 'excruciating': 'severe',
  'crippling': 'severe', 'debilitating': 'severe',
  'worst': 'severe', 'massive': 'severe', 'major': 'severe', 'brutal': 'severe',
  'absolutely': 'severe', 'totally': 'severe', 'completely': 'severe',
  'incredibly': 'severe', 'insane': 'severe',
};

const DEFAULT_SEVERITY_BY_SYMPTOM: Record<string, Severity> = {
  pem: 'severe', flare: 'severe', fainting: 'severe', panic: 'severe',
  presyncope: 'severe', subluxation: 'severe', dislocation: 'severe',
  exercise_intolerance: 'severe', adrenaline_surge: 'severe',
  fatigue: 'moderate', brain_fog: 'moderate', pain: 'moderate',
  dizziness: 'moderate', nausea: 'moderate', headache: 'moderate',
  anxiety: 'moderate', low_mood: 'moderate', palpitations: 'moderate',
  orthostatic_intolerance: 'moderate', dysautonomia: 'moderate',
  spoon_theory: 'moderate', insomnia: 'moderate',
};

const COMPARATIVE_PATTERNS: Record<string, 'worse' | 'better'> = {
  'worse': 'worse', 'getting worse': 'worse', 'much worse': 'worse',
  'worsening': 'worse', 'deteriorating': 'worse',
  'better': 'better', 'getting better': 'better', 'improving': 'better',
  'improved': 'better',
};

// ============================================================================
// PAIN DETAILS
// ============================================================================

const PAIN_QUALIFIERS: Record<string, string> = {
  'sharp': 'sharp', 'stabbing': 'stabbing', 'piercing': 'piercing',
  'shooting': 'shooting', 'cutting': 'sharp',
  'burning': 'burning', 'searing': 'burning',
  'cramping': 'cramping', 'cramp': 'cramping', 'cramps': 'cramping',
  'throbbing': 'throbbing', 'pulsing': 'throbbing', 'pounding': 'pounding',
  'dull': 'dull', 'aching': 'aching', 'achy': 'aching',
  'pressure': 'pressure', 'squeezing': 'squeezing',
  'tight': 'tight', 'tightness': 'tight',
  'radiating': 'radiating', 'spreading': 'radiating',
  'electric': 'electric',
};

const BODY_PARTS: Record<string, string> = {
  'head': 'head', 'temple': 'temple', 'temples': 'temple',
  'forehead': 'forehead', 'skull': 'skull',
  'neck': 'neck', 'throat': 'throat', 'jaw': 'jaw',
  'face': 'face', 'eye': 'eye', 'eyes': 'eye',
  'shoulder': 'shoulder', 'shoulders': 'shoulder',
  'upper back': 'upper_back', 'lower back': 'lower_back',
  'back': 'back', 'chest': 'chest', 'spine': 'spine',
  'arm': 'arm', 'arms': 'arm', 'elbow': 'elbow',
  'wrist': 'wrist', 'wrists': 'wrist',
  'hand': 'hand', 'hands': 'hand', 'finger': 'finger', 'fingers': 'finger',
  'hip': 'hip', 'hips': 'hip',
  'leg': 'leg', 'legs': 'leg', 'thigh': 'thigh',
  'knee': 'knee', 'knees': 'knee',
  'calf': 'calf', 'calves': 'calf', 'shin': 'shin',
  'ankle': 'ankle', 'ankles': 'ankle',
  'foot': 'foot', 'feet': 'foot', 'heel': 'heel',
  'stomach': 'stomach', 'abdomen': 'abdomen', 'belly': 'belly', 'gut': 'gut',
  'side': 'side', 'ribs': 'ribs',
  'body': 'whole_body', 'everywhere': 'whole_body',
  'muscles': 'muscles', 'joints': 'joints',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"()\[\]{}]/g, ' ')  // preserve apostrophes for contractions
    .split(/\s+/)
    .filter(token => token.length > 0);
}

function isNegated(tokens: string[], index: number): boolean {
  const lookback = 4;
  const start = Math.max(0, index - lookback);
  for (let i = start; i < index; i++) {
    if (NEGATION_WORDS.has(tokens[i]) || tokens[i].includes("n't")) {
      return true;
    }
  }
  return false;
}

/**
 * Find severity from tokens near a given token index.
 * Won't cross over another symptom word (prevents "severe migraine with nausea"
 * from applying "severe" to nausea).
 * phraseLength: when matching a multi-word phrase, check tokens within the phrase
 * span itself (e.g. "really" in "really dizzy").
 */
function findSeverityAtToken(tokens: string[], tokenIndex: number, lookRange = 3, phraseLength = 1): Severity | null {
  // First check tokens within the phrase span itself (e.g. "really dizzy")
  if (phraseLength > 1) {
    for (let i = tokenIndex; i < Math.min(tokens.length, tokenIndex + phraseLength); i++) {
      if (SEVERITY_INDICATORS[tokens[i]]) {
        return SEVERITY_INDICATORS[tokens[i]];
      }
    }
  }

  // Look backward (more common: "severe pain")
  for (let i = tokenIndex - 1; i >= Math.max(0, tokenIndex - lookRange); i--) {
    // Stop if we hit another symptom word (severity belongs to that symptom)
    if (SYMPTOM_LEMMAS[tokens[i]]) break;
    if (SEVERITY_INDICATORS[tokens[i]]) {
      return SEVERITY_INDICATORS[tokens[i]];
    }
  }

  // Look forward past the phrase ("pain is severe")
  const forwardStart = tokenIndex + phraseLength;
  for (let i = forwardStart; i < Math.min(tokens.length, forwardStart + lookRange); i++) {
    if (SYMPTOM_LEMMAS[tokens[i]]) break;
    if (SEVERITY_INDICATORS[tokens[i]]) {
      return SEVERITY_INDICATORS[tokens[i]];
    }
  }

  return null;
}

/**
 * Find the token index that corresponds to a character position in the text.
 */
function charPosToTokenIndex(text: string, charPos: number): number {
  const tokens = tokenize(text);
  const textLower = text.toLowerCase();
  let cursor = 0;

  for (let i = 0; i < tokens.length; i++) {
    const idx = textLower.indexOf(tokens[i], cursor);
    if (idx >= charPos) return i;
    cursor = idx + tokens[i].length;
  }

  return tokens.length - 1;
}

/**
 * Extract numeric severity from patterns like "7/10", "pain at 8",
 * "3 out of 10", "energy at 30%".
 */
function extractNumericSeverity(text: string): Severity | null {
  const textLower = text.toLowerCase();

  // Match X/10 or X / 10 patterns
  const slashMatch = textLower.match(/(\d+)\s*\/\s*10/);
  if (slashMatch) {
    const num = parseInt(slashMatch[1], 10);
    if (num <= 3) return 'mild';
    if (num <= 6) return 'moderate';
    return 'severe';
  }

  // Match "X out of 10"
  const outOfMatch = textLower.match(/(\d+)\s+out\s+of\s+10/);
  if (outOfMatch) {
    const num = parseInt(outOfMatch[1], 10);
    if (num <= 3) return 'mild';
    if (num <= 6) return 'moderate';
    return 'severe';
  }

  // Match "energy at X%" or "at X percent"
  const percentMatch = textLower.match(/(?:energy|capacity|function(?:ing)?)\s+(?:at|is|around)\s+(\d+)\s*%/);
  if (percentMatch) {
    const num = parseInt(percentMatch[1], 10);
    // Lower energy = worse (inverted)
    if (num >= 70) return 'mild';
    if (num >= 40) return 'moderate';
    return 'severe';
  }

  // Match "pain level X" or "pain at X"
  const painLevelMatch = textLower.match(/(?:pain|fatigue|symptom)\s+(?:level|at|is)\s+(?:a\s+)?(\d+)/);
  if (painLevelMatch) {
    const num = parseInt(painLevelMatch[1], 10);
    if (num <= 3) return 'mild';
    if (num <= 6) return 'moderate';
    return 'severe';
  }

  return null;
}

function detectComparative(text: string): 'worse' | 'better' | null {
  const textLower = text.toLowerCase();
  for (const [phrase, direction] of Object.entries(COMPARATIVE_PATTERNS)) {
    if (textLower.includes(phrase)) {
      return direction;
    }
  }
  return null;
}

function assignDefaultSeverity(
  symptom: string,
  text: string,
  detectedSeverity: Severity | null
): Severity {
  if (detectedSeverity) return detectedSeverity;
  // Try numeric severity from text (e.g. "7/10")
  const numericSeverity = extractNumericSeverity(text);
  if (numericSeverity) return numericSeverity;
  if (DEFAULT_SEVERITY_BY_SYMPTOM[symptom]) return DEFAULT_SEVERITY_BY_SYMPTOM[symptom];
  const comparative = detectComparative(text);
  if (comparative === 'worse') return 'severe';
  if (comparative === 'better') return 'mild';
  return 'moderate';
}

function extractPainDetails(text: string): Array<{
  qualifiers: string[];
  location: string | null;
  severity: Severity | null;
  matchedText: string;
}> {
  const tokens = tokenize(text);
  const painDetails: Array<{
    qualifiers: string[];
    location: string | null;
    severity: Severity | null;
    matchedText: string;
  }> = [];

  const painWords = new Set(['pain', 'hurt', 'hurts', 'hurting', 'ache', 'aches', 'aching', 'sore', 'soreness']);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isPainWord = painWords.has(token);
    const isQualifier = PAIN_QUALIFIERS[token] !== undefined;

    if (isPainWord || isQualifier) {
      const qualifiers: string[] = [];
      let location: string | null = null;
      let severity: Severity | null = null;
      let startIndex = i;
      let endIndex = i;

      // Look backward for qualifiers and severity
      const lookbackStart = Math.max(0, i - 6);
      for (let j = i - 1; j >= lookbackStart; j--) {
        if (PAIN_QUALIFIERS[tokens[j]]) {
          qualifiers.unshift(PAIN_QUALIFIERS[tokens[j]]);
          startIndex = j;
        }
        if (SEVERITY_INDICATORS[tokens[j]]) {
          severity = SEVERITY_INDICATORS[tokens[j]];
          startIndex = j;
        }
      }

      if (isQualifier) {
        qualifiers.push(PAIN_QUALIFIERS[token]);
      }

      // Look forward for body parts
      const lookforwardEnd = Math.min(tokens.length, i + 8);
      for (let j = i; j < lookforwardEnd; j++) {
        const nextToken = tokens[j];

        // Two-word body parts
        if (j < tokens.length - 1) {
          const twoWord = `${nextToken} ${tokens[j + 1]}`;
          if (BODY_PARTS[twoWord]) {
            location = BODY_PARTS[twoWord];
            endIndex = j + 1;
            break;
          }
        }

        // Single-word body parts (skip common filler words)
        if (BODY_PARTS[nextToken] && nextToken !== 'in' && nextToken !== 'my' && nextToken !== 'the') {
          location = BODY_PARTS[nextToken];
          endIndex = j;
          break;
        }
      }

      if (qualifiers.length > 0 || location !== null) {
        const uniqueQualifiers = [...new Set(qualifiers)];
        const matchedText = tokens.slice(startIndex, endIndex + 1).join(' ');
        painDetails.push({ qualifiers: uniqueQualifiers, location, severity, matchedText });
      }
    }
  }

  return painDetails;
}

// ============================================================================
// MAIN EXTRACTION FUNCTION
// ============================================================================

export function extractSymptoms(text: string): ExtractionResult {
  if (!text.trim()) {
    return { text, symptoms: [] };
  }

  const textLower = text.toLowerCase();
  const foundSymptoms: ExtractedSymptom[] = [];
  const foundCategories = new Set<string>();

  // Step 1: Extract detailed pain information
  const painDetailsArray = extractPainDetails(text);

  for (const painDetail of painDetailsArray) {
    let painSymptom = 'pain';

    if (painDetail.location) {
      if (['head', 'temple', 'forehead'].includes(painDetail.location)) {
        painSymptom = 'headache';
      } else if (painDetail.location === 'neck') {
        painSymptom = 'neck_pain';
      } else if (['back', 'upper_back', 'lower_back'].includes(painDetail.location)) {
        painSymptom = 'back_pain';
      } else if (['stomach', 'abdomen', 'belly', 'gut'].includes(painDetail.location)) {
        painSymptom = 'gi_pain';
      } else if (painDetail.location === 'chest') {
        painSymptom = 'chest_pain';
      }
    }

    if (!foundCategories.has(painSymptom)) {
      foundSymptoms.push({
        symptom: painSymptom,
        matched: painDetail.matchedText,
        method: 'phrase',
        severity: painDetail.severity || assignDefaultSeverity(painSymptom, text, null),
        painDetails: {
          qualifiers: painDetail.qualifiers,
          location: painDetail.location,
        },
      });
      foundCategories.add(painSymptom);
    }
  }

  // Step 2: Extract phrase-based symptoms (longest first)
  const sortedPhrases = Object.entries(SYMPTOM_PHRASES).sort(
    (a, b) => b[0].length - a[0].length
  );

  const allTokens = tokenize(text);

  for (const [phrase, symptom] of sortedPhrases) {
    if (textLower.includes(phrase) && !foundCategories.has(symptom)) {
      const charPos = textLower.indexOf(phrase);
      const tokenIdx = charPosToTokenIndex(textLower, charPos);

      // Negation check for phrases
      if (isNegated(allTokens, tokenIdx)) continue;

      const phraseWordCount = phrase.split(/\s+/).length;
      const detectedSeverity = findSeverityAtToken(allTokens, tokenIdx, 3, phraseWordCount);
      const finalSeverity = assignDefaultSeverity(symptom, text, detectedSeverity);

      foundSymptoms.push({
        symptom,
        matched: phrase,
        method: 'phrase',
        severity: finalSeverity,
      });
      foundCategories.add(symptom);
    }
  }

  // Step 3: Extract lemma-based symptoms
  for (let i = 0; i < allTokens.length; i++) {
    const token = allTokens[i];

    if (SYMPTOM_LEMMAS[token]) {
      const symptom = SYMPTOM_LEMMAS[token];

      if (!foundCategories.has(symptom) && !isNegated(allTokens, i)) {
        const detectedSeverity = findSeverityAtToken(allTokens, i);
        const finalSeverity = assignDefaultSeverity(symptom, text, detectedSeverity);

        foundSymptoms.push({
          symptom,
          matched: token,
          method: 'lemma',
          severity: finalSeverity,
        });
        foundCategories.add(symptom);
      }
    }
  }

  return { text, symptoms: foundSymptoms };
}
