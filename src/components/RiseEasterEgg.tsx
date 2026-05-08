'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './RiseEasterEgg.module.scss';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function RiseEasterEgg() {
  const [riseActive, setRiseActive] = useState(false);
  const [starsVisible, setStarsVisible] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  const trigger = useCallback(() => {
    if (riseActive) return;
    if (!starsVisible) {
      setStars(
        Array.from({ length: 65 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.45 + 0.15,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 1.5,
        }))
      );
      setStarsVisible(true);
    }
    setRiseActive(true);
    setTimeout(() => setRiseActive(false), 5800);
  }, [riseActive, starsVisible]);

  useEffect(() => {
    const buffer: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buffer.push(e.key.toLowerCase());
      if (buffer.length > 2) buffer.shift();
      if (buffer[0] === 'k' && buffer[1] === '8') {
        buffer.length = 0;
        trigger();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [trigger]);

  return (
    <>
      {starsVisible && (
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
      )}
      {riseActive && (
        <>
          <div className={styles.darkOverlay} aria-hidden="true" />
          <div className={styles.riseContainer} aria-hidden="true">
            <Image
              src="/images/rise.png"
              alt="Rise the plushie floating in space"
              width={160}
              height={200}
              style={{ width: '160px', height: 'auto' }}
              className={styles.rise}
              priority
            />
          </div>
        </>
      )}
    </>
  );
}
