import { Severity } from './types';

export const EXAMPLE_PROMPTS = [
  "I have severe migraine with nausea and I'm exhausted",
  "Crashed hard from overdoing yesterday, brain is soup",
  "Burning pain in my shoulders, can't focus at all",
  "Out of spoons, totally drained, heart is racing",
  "I don't have pain but I feel really dizzy and anxious",
  "Woke up tired, everything hurts, in a bad flare",
];

export const SYMPTOM_DISPLAY_NAMES: Record<string, string> = {
  fatigue: 'Fatigue',
  pem: 'Post-Exertional Malaise',
  flare: 'Flare-up',
  burnout: 'Burnout',
  malaise: 'General Malaise',
  weakness: 'Weakness',
  extreme_fatigue: 'Extreme Fatigue',
  spoon_theory: 'Spoon Depletion',
  brain_fog: 'Brain Fog',
  memory: 'Memory Problems',
  focus: 'Difficulty Concentrating',
  cognitive_dysfunction: 'Cognitive Dysfunction',
  pain: 'Pain',
  headache: 'Headache',
  muscle_pain: 'Muscle Pain',
  joint_pain: 'Joint Pain',
  back_pain: 'Back Pain',
  neck_pain: 'Neck Pain',
  chest_pain: 'Chest Pain',
  gi_pain: 'Abdominal Pain',
  palpitations: 'Heart Palpitations',
  tachycardia: 'Tachycardia',
  orthostatic: 'Orthostatic Intolerance',
  dizziness: 'Dizziness',
  fainting: 'Fainting',
  vertigo: 'Vertigo',
  presyncope: 'Near-Fainting',
  nausea: 'Nausea',
  vomiting: 'Vomiting',
  bloating: 'Bloating',
  insomnia: 'Insomnia',
  sleep_disturbance: 'Sleep Disturbance',
  unrefreshing_sleep: 'Unrefreshing Sleep',
  hypersomnia: 'Hypersomnia',
  anxiety: 'Anxiety',
  panic: 'Panic',
  stress: 'Stress',
  overwhelmed: 'Overwhelmed',
  low_mood: 'Low Mood',
  irritability: 'Irritability',
  numbness_tingling: 'Numbness/Tingling',
  tremor: 'Tremor',
  shortness_of_breath: 'Shortness of Breath',
  chest_tightness: 'Chest Tightness',
  wheezing: 'Wheezing',
  sweating: 'Sweating',
  chills: 'Chills',
  fever: 'Fever',
  heat_intolerance: 'Heat Intolerance',
  cold_intolerance: 'Cold Intolerance',
  light_sensitivity: 'Light Sensitivity',
  sensitivity_light: 'Light Sensitivity',
  sound_sensitivity: 'Sound Sensitivity',
  smell_sensitivity: 'Smell Sensitivity',
  rash: 'Rash',
  stiffness: 'Stiffness',
  swelling: 'Swelling',
  overexertion: 'Overexertion',
  vision_changes: 'Vision Changes',
  cough: 'Cough',

  // EDS / Hypermobility
  subluxation: 'Subluxation',
  dislocation: 'Dislocation',
  hypermobility: 'Hypermobility',

  // Neurological (expanded)
  spasm: 'Muscle Spasms',
  vibration: 'Internal Vibrations',
  brain_zaps: 'Brain Zaps',

  // MCAS / Immune
  histamine_reaction: 'Histamine Reaction',
  allodynia: 'Allodynia',

  // Autonomic
  dysautonomia: 'Dysautonomia',
  pots: 'POTS',
  orthostatic_intolerance: 'Orthostatic Intolerance',
  hypotension: 'Low Blood Pressure',
  blood_pooling: 'Blood Pooling',
  adrenaline_surge: 'Adrenaline Surge',

  // Activity
  exercise_intolerance: 'Exercise Intolerance',
  mobility_impairment: 'Mobility Difficulty',
  balance_issues: 'Balance Issues',

  // GI (expanded)
  gastroparesis: 'Gastroparesis',
  swallowing_difficulty: 'Swallowing Difficulty',
  food_sensitivity: 'Food Sensitivity',

  // Temperature (expanded)
  temperature_dysregulation: 'Temperature Dysregulation',
  hot_flashes: 'Hot Flashes',
  flushing: 'Flushing',

  // Long COVID
  parosmia: 'Altered Smell',
  dysgeusia: 'Altered Taste',
  tinnitus: 'Tinnitus',

  // Mental Health (expanded)
  intrusive_thoughts: 'Intrusive Thoughts',
  dissociation: 'Dissociation',
  mouth_sores: 'Mouth Sores',

  // Appetite
  appetite_change: 'Appetite Change',
  urinary: 'Urinary Symptoms',
};

export const SYMPTOM_COLORS: Record<string, { text: string; bg: string }> = {
  // Energy/Fatigue - Warm cream
  fatigue: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.15)' },
  extreme_fatigue: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.15)' },
  burnout: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.15)' },
  malaise: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.15)' },
  weakness: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.15)' },

  // PEM/Energy - Nixie Orange
  pem: { text: '#FF6B35', bg: 'rgba(255, 107, 53, 0.15)' },
  flare: { text: '#FF6B35', bg: 'rgba(255, 107, 53, 0.15)' },
  spoon_theory: { text: '#FF6B35', bg: 'rgba(255, 107, 53, 0.15)' },
  overexertion: { text: '#FF6B35', bg: 'rgba(255, 107, 53, 0.15)' },
  exercise_intolerance: { text: '#FF6B35', bg: 'rgba(255, 107, 53, 0.15)' },

  // Cognitive - Console Teal
  brain_fog: { text: '#5C9EAD', bg: 'rgba(92, 158, 173, 0.15)' },
  memory: { text: '#5C9EAD', bg: 'rgba(92, 158, 173, 0.15)' },
  focus: { text: '#5C9EAD', bg: 'rgba(92, 158, 173, 0.15)' },
  cognitive_dysfunction: { text: '#5C9EAD', bg: 'rgba(92, 158, 173, 0.15)' },

  // Pain - LED Red
  pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  headache: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  muscle_pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  joint_pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  back_pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  neck_pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  chest_pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  gi_pain: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },
  stiffness: { text: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' },

  // Cardiac/Autonomic - LED Green
  palpitations: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  tachycardia: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  orthostatic: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  orthostatic_intolerance: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  dizziness: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  fainting: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  vertigo: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  presyncope: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  dysautonomia: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  pots: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  hypotension: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  blood_pooling: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  adrenaline_surge: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },
  balance_issues: { text: '#00FF9C', bg: 'rgba(0, 255, 156, 0.12)' },

  // GI - Coral
  nausea: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  vomiting: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  bloating: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  gastroparesis: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  swallowing_difficulty: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  food_sensitivity: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },

  // Sleep/Neuro - Lavender
  insomnia: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  sleep_disturbance: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  unrefreshing_sleep: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  hypersomnia: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  numbness_tingling: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  tremor: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  spasm: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  vibration: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  brain_zaps: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  tinnitus: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },
  dissociation: { text: '#B8A9C9', bg: 'rgba(184, 169, 201, 0.15)' },

  // Mood - Console Mint
  anxiety: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },
  panic: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },
  stress: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },
  overwhelmed: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },
  low_mood: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },
  irritability: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },
  intrusive_thoughts: { text: '#B8D4C8', bg: 'rgba(184, 212, 200, 0.15)' },

  // Respiratory - LED Yellow
  shortness_of_breath: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  chest_tightness: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  wheezing: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },

  // Temperature
  sweating: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  chills: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  fever: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  heat_intolerance: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  cold_intolerance: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  temperature_dysregulation: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  hot_flashes: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  flushing: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },

  // Sensory
  light_sensitivity: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  sensitivity_light: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  sound_sensitivity: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  smell_sensitivity: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  parosmia: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  dysgeusia: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  vision_changes: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },
  allodynia: { text: '#FFD23F', bg: 'rgba(255, 210, 63, 0.12)' },

  // EDS/Hypermobility - Pain variant (slightly different shade)
  subluxation: { text: '#FF8B8B', bg: 'rgba(255, 139, 139, 0.15)' },
  dislocation: { text: '#FF8B8B', bg: 'rgba(255, 139, 139, 0.15)' },
  hypermobility: { text: '#FF8B8B', bg: 'rgba(255, 139, 139, 0.15)' },

  // MCAS - Coral variant
  histamine_reaction: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },

  // Misc
  rash: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  mouth_sores: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  mobility_impairment: { text: '#E8DCC4', bg: 'rgba(232, 220, 196, 0.12)' },
  appetite_change: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
  urinary: { text: '#E8A090', bg: 'rgba(232, 160, 144, 0.15)' },
};

const DEFAULT_COLOR = { text: '#5C9EAD', bg: 'rgba(92, 158, 173, 0.12)' };

export function getSymptomColor(symptom: string): { text: string; bg: string } {
  return SYMPTOM_COLORS[symptom] || DEFAULT_COLOR;
}

export function getDisplayName(symptom: string): string {
  return SYMPTOM_DISPLAY_NAMES[symptom] || symptom.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export const SEVERITY_COLORS: Record<Severity, string> = {
  mild: '#00FF9C',
  moderate: '#FFD23F',
  severe: '#FF6B6B',
};
