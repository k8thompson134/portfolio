'use client';

import { useEffect, useRef } from 'react';
import styles from './Lightbox.module.scss';

export interface LightboxItem {
    title: string;
    category: string;
    image: string;
    alt?: string;
    description?: string;
}

interface LightboxProps {
    items: LightboxItem[];
    index: number | null;
    onIndexChange: (index: number | null) => void;
}

export default function Lightbox({ items, index, onIndexChange }: LightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const active = index === null ? null : items[index];

    useEffect(() => {
        const dialog = dialogRef.current;
        if (index !== null && !dialog?.open) dialog?.showModal();
    }, [index]);

    const step = (delta: number) => {
        if (index !== null) onIndexChange((index + delta + items.length) % items.length);
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
            onClose={() => onIndexChange(null)}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') step(1);
                if (e.key === 'ArrowLeft') step(-1);
            }}
        >
            {active && (
                <figure className={styles.figure}>
                    <button
                        type="button"
                        className={styles.close}
                        onClick={() => dialogRef.current?.close()}
                        aria-label="Close"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                    <div className={styles.stage}>
                        {/* Plain img: the expanded view shows the original file at full resolution */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={active.image} alt={active.alt ?? active.title} className={styles.fullImage} />
                        {items.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className={`${styles.nav} ${styles.prev}`}
                                    onClick={() => step(-1)}
                                    aria-label="Previous"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 6l-6 6 6 6" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.nav} ${styles.next}`}
                                    onClick={() => step(1)}
                                    aria-label="Next"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                    <figcaption className={styles.caption}>
                        <span className={styles.captionTitle}>{active.title}</span>
                        <span className={styles.captionCategory}>{active.category}</span>
                        {active.description && <p className={styles.captionText}>{active.description}</p>}
                        <span className={styles.counter}>
                            {index! + 1} / {items.length}
                        </span>
                    </figcaption>
                </figure>
            )}
        </dialog>
    );
}
