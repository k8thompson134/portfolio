export const BALL_WIDTH = 160;
export const BALL_HEIGHT = 200;
export const HIGH_SCORE_STORAGE_KEY = "k8_rise_high_score";
export const MISSION_SUMMARY_DURATION_MS = 4000;
export const STAR_COUNT = 65;

export enum GameStatus {
  IDLE = "IDLE",
  PLAYING = "PLAYING",
  EXITING = "EXITING",
  SUMMARY = "SUMMARY",
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vRot: number;
  t: number;
  combo: number;
}

export interface HitImpulse {
  impulseX: number;
  upwardBoost: number;
  impulseSpin: number;
}

export function getTelemetryStatus(combo: number): string {
  if (combo >= 75) return "MAX TURBULENCE";
  if (combo >= 50) return "DEEP TURBULENCE";
  if (combo >= 30) return "GRAVITY 3.0X";
  if (combo >= 15) return "GRAVITY 2.0X";
  if (combo >= 5) return "SOLAR WIND";
  return "ORBITAL FLOAT";
}

export function createStarfield(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.45 + 0.15,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 1.5,
  }));
}

// Converts pointer offset relative to target center into horizontal impulse, spin, and vertical boost
export function calculateHitImpulse(
  hitX: number,
  hitY: number,
  width = BALL_WIDTH,
  height = BALL_HEIGHT,
  combo = 0,
): HitImpulse {
  const centerX = width / 2;
  const centerY = height / 2;
  const offsetX = hitX - centerX;
  const offsetY = hitY - centerY;

  const impulseX = -offsetX * (0.08 + Math.min(0.06, combo * 0.004));
  const upwardBoost =
    -6.8 - Math.max(0, (offsetY / centerY) * 2.5) - Math.min(3.5, combo * 0.15);
  const impulseSpin = -offsetX * 0.12;

  return { impulseX, upwardBoost, impulseSpin };
}

export function createInitialPhysicsState(
  screenW: number,
  screenH: number,
): PhysicsState {
  return {
    x: screenW + 50,
    y: screenH * 0.35,
    vx: -3.2,
    vy: 0,
    angle: 8,
    vRot: -0.3,
    t: 0,
    combo: 0,
  };
}
