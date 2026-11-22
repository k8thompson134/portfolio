'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '@/app/beyond-code/data';
import styles from './Screensaver.module.scss';

interface ScreensaverProps {
    items: GalleryItem[];
    bug: string;
    idleSeconds?: number;
}

const STILL_MS = 7000;
const GRACE_MS = 1200;
const MOVE_PX = 24;

const shuffle = <T,>(list: T[]) => {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Screensaver({ items, bug, idleSeconds = 60 }: ScreensaverProps) {
    const [order, setOrder] = useState<GalleryItem[] | null>(null);
    const [slide, setSlide] = useState(0);
    const [still, setStill] = useState(false);
    const wentFullscreen = useRef(false);

    const start = useCallback(
        (fullscreen: boolean) => {
            setOrder(shuffle(items));
            setSlide(0);
            setStill(reducedMotion());
            wentFullscreen.current = false;
            // Only a click may request fullscreen; the idle start stays a plain overlay
            if (fullscreen && document.documentElement.requestFullscreen) {
                document.documentElement
                    .requestFullscreen()
                    .then(() => (wentFullscreen.current = true))
                    .catch(() => {});
            }
        },
        [items],
    );

    const stop = useCallback(() => {
        setOrder(null);
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }, []);

    const next = useCallback(() => setSlide((s) => s + 1), []);

    const active = order !== null;
    const current = order?.[slide % order.length];
    const playsVideo = Boolean(current?.video) && !still;

    // Stills advance on a timer; videos advance when they end
    useEffect(() => {
        if (!active || playsVideo) return;
        const timer = window.setTimeout(next, STILL_MS);
        return () => window.clearTimeout(timer);
    }, [active, playsVideo, slide, next]);

    // Any key, click, or real mouse movement wakes the screen, like the real thing
    useEffect(() => {
        if (!active) return;
        const opened = performance.now();
        let origin: { x: number; y: number } | null = null;

        const onMove = (e: MouseEvent) => {
            if (performance.now() - opened < GRACE_MS) return;
            if (!origin) {
                origin = { x: e.clientX, y: e.clientY };
                return;
            }
            if (Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > MOVE_PX) stop();
        };
        const onFullscreenChange = () => {
            if (wentFullscreen.current && !document.fullscreenElement) stop();
        };

        window.addEventListener('keydown', stop);
        window.addEventListener('pointerdown', stop);
        window.addEventListener('mousemove', onMove);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => {
            window.removeEventListener('keydown', stop);
            window.removeEventListener('pointerdown', stop);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, [active, stop]);

    // Starts by itself after the page sits idle, on mouse-and-keyboard devices only
    useEffect(() => {
        if (active || reducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        let timer = window.setTimeout(() => start(false), idleSeconds * 1000);
        const reset = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => start(false), idleSeconds * 1000);
        };
        const events = ['mousemove', 'keydown', 'scroll', 'pointerdown', 'wheel'] as const;
        events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
        return () => {
            window.clearTimeout(timer);
            events.forEach((e) => window.removeEventListener(e, reset));
        };
    }, [active, idleSeconds, start]);

    return (
        <>
            <div className={styles.launcher}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => start(true)}
                >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <rect x="1" y="2" width="14" height="10" fill="#c0c0c0" stroke="#000" />
                        <rect x="3" y="4" width="10" height="6" fill="#000080" />
                        <path d="M5 13h6v1H5z" fill="#000" />
                        <circle cx="10" cy="6" r="1" fill="#ffd34d" />
                    </svg>
                    Screensaver
                </button>
                <span className={styles.hint}>Plays every render fullscreen, and starts on its own after a minute idle. Any key or click wakes it.</span>
            </div>

            {current && (
                <div className={styles.overlay} role="dialog" aria-label="Bryce screensaver">
                    {playsVideo ? (
                        <video
                            key={slide}
                            className={styles.slide}
                            src={current.video}
                            poster={current.image}
                            aria-label={current.alt}
                            autoPlay
                            muted
                            playsInline
                            onEnded={next}
                        />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={slide} className={styles.slide} src={current.image} alt={current.alt} />
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.bug} src={bug} alt="" />
                    <span key={`label-${slide}`} className={styles.label}>
                        {current.render?.file ?? current.title}
                    </span>
                </div>
            )}
        </>
    );
}
