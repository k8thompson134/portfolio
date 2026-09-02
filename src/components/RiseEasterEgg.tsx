"use client";

import { useEffect, useState, useCallback, useRef, memo } from "react";
import Image from "next/image";
import styles from "./RiseEasterEgg.module.scss";
import {
  BALL_WIDTH,
  BALL_HEIGHT,
  HIGH_SCORE_STORAGE_KEY,
  MISSION_SUMMARY_DURATION_MS,
  GameStatus,
  Star,
  PhysicsState,
  getTelemetryStatus,
  getBallDimensions,
  createStarfield,
  calculateHitImpulse,
  createInitialPhysicsState,
} from "./risePhysicsEngine";

const StarfieldBackground = memo(function StarfieldBackground({
  stars,
}: {
  stars: Star[];
}) {
  return (
    <div className={styles.starfield} aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className={styles.star}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

export default function RiseEasterEgg() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [starsVisible, setStarsVisible] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [combo, setCombo] = useState(0);
  const [finalJuggles, setFinalJuggles] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const [hasInitiated, setHasInitiated] = useState(false);
  const [isConsoleFadingOut, setIsConsoleFadingOut] = useState(false);

  // Mutable 60fps frame state to avoid React re-render overhead during animation loop
  const posRef = useRef<PhysicsState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    vRot: 0,
    t: 0,
    combo: 0,
    floorSaved: false,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const interactedRef = useRef(false);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  const startExitSequence = useCallback(() => {
    if (gameStatus === GameStatus.EXITING || gameStatus === GameStatus.SUMMARY)
      return;
    setGameStatus(GameStatus.SUMMARY);
    setIsConsoleFadingOut(false);

    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);

    // Trigger graceful CSS fade-out 600ms before summary ends
    fadeOutTimerRef.current = setTimeout(() => {
      setIsConsoleFadingOut(true);
    }, MISSION_SUMMARY_DURATION_MS - 600);

    exitTimerRef.current = setTimeout(() => {
      setGameStatus(GameStatus.IDLE);
      setIsConsoleFadingOut(false);
    }, MISSION_SUMMARY_DURATION_MS);
  }, [gameStatus]);

  const trigger = useCallback(() => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);

    if (!starsVisible) {
      setStars(createStarfield());
      setStarsVisible(true);
    }

    const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const screenH = typeof window !== "undefined" ? window.innerHeight : 800;

    posRef.current = createInitialPhysicsState(screenW, screenH);
    interactedRef.current = false;
    setHasInitiated(false);
    setIsConsoleFadingOut(false);
    setCombo(0);
    setFinalJuggles(0);
    setIsNewRecord(false);
    setGameStatus(GameStatus.PLAYING);
  }, [starsVisible]);

  // Main 60fps Physics & Boundary Collision Loop
  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const updatePhysics = () => {
      const p = posRef.current;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      p.t += 0.05;

      const { width: ballW, height: ballH } = getBallDimensions(screenW);

      if (!interactedRef.current) {
        // Initial entrance float: Taller and wider soaring zero-G space float trajectory
        p.vy = Math.sin(p.t * 0.8) * 1.5;
        p.vRot = 0.12;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.vRot;

        // Ceiling clamp to keep Rise safely inside screen bounds
        if (p.y < 25) {
          p.y = 25;
        }

        // If untouched and floats off left edge, exit silently to IDLE without summary HUD
        if (p.x < -ballW - 60) {
          setGameStatus(GameStatus.IDLE);
          return;
        }
      } else {
        // Trans-lunar microgravity & wind turbulence
        const gravityScale = 0.018 + Math.min(0.12, p.combo * 0.0018);
        p.vy += gravityScale;

        if (p.combo >= 5) {
          const wind =
            Math.sin(p.t * 2.5) *
            (0.14 + Math.min(0.35, (p.combo - 5) * 0.005));
          p.vx += wind * 0.08;
        }

        // Comfortable, non-nauseating active rotation decay
        p.vx *= 0.996;
        p.vy *= 0.996;
        p.vRot *= 0.96;

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.vRot;

        // Wall rebounds
        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx) * 0.9;
          p.vRot += p.vy * 0.08;
        } else if (p.x > screenW - ballW) {
          p.x = screenW - ballW;
          p.vx = -Math.abs(p.vx) * 0.9;
          p.vRot -= p.vy * 0.08;
        }

        // Ceiling rebound
        if (p.y < 15) {
          p.y = 15;
          p.vy = Math.abs(p.vy) * 0.75;
        }

        // Floor touch: first grazing touch per run gets a soft forgiving bounce,
        // any touch after that is mission fail
        const maxFloorY = screenH - ballH - 10;
        if (p.y >= maxFloorY) {
          if (!p.floorSaved) {
            p.floorSaved = true;
            p.y = maxFloorY;
            p.vy = -Math.abs(p.vy) * 0.5 - 4;
            p.vx *= 0.7;
          } else {
            p.y = maxFloorY;
            p.vy = 0;
            p.vx = 0;
            startExitSequence();
            return;
          }
        }
      }

      // GPU-accelerated inline transform
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.angle}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameStatus, startExitSequence]);

  const handleHit = (clientX: number, clientY: number) => {
    if (gameStatus === GameStatus.SUMMARY) {
      trigger();
      return;
    }
    if (!containerRef.current || gameStatus !== GameStatus.PLAYING) return;
    interactedRef.current = true;
    setHasInitiated(true);

    const rect = containerRef.current.getBoundingClientRect();
    const hitX = clientX - rect.left;
    const hitY = clientY - rect.top;

    const p = posRef.current;
    const impulse = calculateHitImpulse(
      hitX,
      hitY,
      rect.width,
      rect.height,
      p.combo,
    );

    p.vx = p.vx * 0.4 + impulse.impulseX;
    p.vy = Math.max(-13.5, Math.min(-7.2, p.vy * 0.2 + impulse.upwardBoost));
    p.vRot = p.vRot * 0.25 + impulse.impulseSpin;

    setCombo((c) => {
      const nextCombo = c + 1;
      posRef.current.combo = nextCombo;
      setFinalJuggles(nextCombo);

      if (nextCombo > highScore) {
        setHighScore(nextCombo);
        setIsNewRecord(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(HIGH_SCORE_STORAGE_KEY, String(nextCombo));
        }
      }
      return nextCombo;
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    handleHit(e.clientX, e.clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
      if (gameStatus === GameStatus.SUMMARY) {
        trigger();
        return;
      }
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        handleHit(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    };
  }, []);

  // Global 'k8' keyboard shortcut & custom event listener
  useEffect(() => {
    const buffer: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      buffer.push(e.key.toLowerCase());
      if (buffer.length > 2) buffer.shift();
      if (buffer[0] === "k" && buffer[1] === "8") {
        buffer.length = 0;
        trigger();
      }
    };

    const handleCustom = () => trigger();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("rise:trigger", handleCustom);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("rise:trigger", handleCustom);
    };
  }, [trigger]);

  const telemetryStatusText = getTelemetryStatus(combo);
  const isPlaying = gameStatus === GameStatus.PLAYING;
  const isSummary = gameStatus === GameStatus.SUMMARY;
  const showTelemetryConsole = (isPlaying && hasInitiated) || isSummary;

  return (
    <>
      {starsVisible && <StarfieldBackground stars={stars} />}

      {showTelemetryConsole && (
        <div
          className={`${styles.telemetryConsole} ${
            isNewRecord ? styles.newRecordConsole : ""
          } ${isSummary ? styles.isSummary : ""} ${
            isConsoleFadingOut ? styles.isFadingOut : ""
          }`}
          onClick={isSummary ? trigger : undefined}
          style={{
            cursor: isSummary ? "pointer" : "default",
            pointerEvents: "auto",
          }}
        >
          {isSummary ? (
            <div className={styles.consoleRow}>
              <span className={styles.consoleStatusDot} aria-hidden="true" />
              <span className={styles.consoleTag}>
                {isNewRecord
                  ? "MISSION STATUS // NEW RECORD"
                  : "MISSION STATUS // COMPLETE"}
              </span>
              <span className={styles.consoleDivider}>|</span>
              <span className={styles.consoleScore}>
                {String(finalJuggles).padStart(2, "0")} VOLLEYS
              </span>
              <span className={styles.consoleDivider}>|</span>
              <span className={styles.consoleBest}>
                BEST: {String(highScore).padStart(2, "0")}
              </span>
            </div>
          ) : (
            <div className={styles.consoleRow}>
              <span className={styles.consoleStatusDot} aria-hidden="true" />
              <span className={styles.consoleScore}>
                {isNewRecord
                  ? `NEW RECORD // ${String(combo).padStart(2, "0")}`
                  : `VOLLEYS // ${String(combo).padStart(2, "0")}`}
              </span>
              <span className={styles.consoleDivider}>|</span>
              <span
                key={telemetryStatusText}
                className={`${styles.consoleStatus} ${
                  combo >= 5 ? styles.isElevatedStatus : ""
                }`}
              >
                STATUS: {telemetryStatusText}
              </span>
              {highScore > 0 && (
                <>
                  <span className={styles.consoleDivider}>|</span>
                  <span className={styles.consoleBest}>
                    BEST: {String(highScore).padStart(2, "0")}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {isPlaying && (
        <div
          ref={containerRef}
          className={styles.risePhysicsContainer}
          onPointerDown={handlePointerDown}
          role="button"
          tabIndex={0}
          aria-label="Tap to bounce Rise"
          onKeyDown={handleKeyDown}
        >
          <Image
            src="/images/rise.png"
            alt="Rise the plushie floating in space"
            width={160}
            height={200}
            style={{ width: "160px", height: "auto" }}
            className={styles.rise}
            priority
          />
        </div>
      )}
    </>
  );
}
