import { describe, it, expect, vi } from "vitest";
import {
  calculateHitImpulse,
  getTelemetryStatus,
  getHeightScale,
} from "./risePhysicsEngine";

describe("RiseEasterEgg Physics Engine & Custom Events", () => {
  it("dispatches rise:trigger custom event correctly", () => {
    const listeners: Record<string, Function[]> = {};

    const mockWindow = {
      addEventListener: (event: string, fn: Function) => {
        listeners[event] = listeners[event] || [];
        listeners[event].push(fn);
      },
      removeEventListener: (event: string, fn: Function) => {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter((f) => f !== fn);
        }
      },
      dispatchEvent: (event: { type: string }) => {
        if (listeners[event.type]) {
          listeners[event.type].forEach((fn) => fn(event));
        }
      },
    };

    const listener = vi.fn();
    mockWindow.addEventListener("rise:trigger", listener);
    mockWindow.dispatchEvent({ type: "rise:trigger" });

    expect(listener).toHaveBeenCalledTimes(1);

    mockWindow.removeEventListener("rise:trigger", listener);
  });

  it("calculates directional impulse vector correctly based on tap offset", () => {
    // Hit left side (hitX = 20, centerX = 80 -> offsetX = -60)
    const leftHit = calculateHitImpulse(20, 100);
    expect(leftHit.impulseX).toBeGreaterThan(0); // Should propel right
    expect(leftHit.impulseSpin).toBeGreaterThan(0); // Should spin clockwise

    // Hit right side (hitX = 140, centerX = 80 -> offsetX = +60)
    const rightHit = calculateHitImpulse(140, 100);
    expect(rightHit.impulseX).toBeLessThan(0); // Should propel left
    expect(rightHit.impulseSpin).toBeLessThan(0); // Should spin counter-clockwise

    // Hit bottom (hitY = 180, centerY = 100 -> offsetY = +80)
    const bottomHit = calculateHitImpulse(80, 180);
    expect(bottomHit.upwardBoost).toBeLessThan(-8.5); // Should pop higher upward
  });

  it("computes telemetry status thresholds correctly", () => {
    expect(getTelemetryStatus(0)).toBe("ORBITAL FLOAT");
    expect(getTelemetryStatus(4)).toBe("ORBITAL FLOAT");
    expect(getTelemetryStatus(5)).toBe("SOLAR WIND");
    expect(getTelemetryStatus(15)).toBe("GRAVITY 2.0X");
    expect(getTelemetryStatus(30)).toBe("GRAVITY 3.0X");
    expect(getTelemetryStatus(50)).toBe("DEEP TURBULENCE");
    expect(getTelemetryStatus(75)).toBe("MAX TURBULENCE");
  });

  it("scales gravity/impulse down on short screens and up on tall ones, within clamped bounds", () => {
    expect(getHeightScale(900)).toBe(1); // reference height, no scaling
    expect(getHeightScale(450)).toBeCloseTo(0.65); // short phone, clamped to the floor
    expect(getHeightScale(2000)).toBeCloseTo(1.25); // tall display, clamped to the ceiling
    expect(getHeightScale(667)).toBeLessThan(1); // short screen scales down
    expect(getHeightScale(667)).toBeGreaterThan(0.65);
  });
});
