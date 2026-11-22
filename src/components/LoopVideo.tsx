'use client';

import { useEffect, useRef } from 'react';

interface LoopVideoProps {
    src: string;
    poster: string;
    label: string;
    className?: string;
}

// Silent GIF-style loop that only plays while on screen, and never under reduced motion
export default function LoopVideo({ src, poster, label, className }: LoopVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.25 },
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            src={src}
            poster={poster}
            aria-label={label}
            className={className}
            muted
            loop
            playsInline
            preload="metadata"
        />
    );
}
