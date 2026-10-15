'use client';

import { useRef, useState } from 'react';
import CreativeCard from './CreativeCard';
import type { GallerySection } from '@/app/beyond-code/data';
import styles from './GalleryGrid.module.scss';

// Fixed rather than random so server and client renders match
const TILTS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 0.5];

interface GalleryGridProps {
    sections: GallerySection[];
    variant?: 'photo' | 'wall' | 'scrapbook';
    headingClassName: string;
    introClassName: string;
}

export default function GalleryGrid({ sections, variant, headingClassName, introClassName }: GalleryGridProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const allItems = sections.flatMap((section) => section.items);
    const active = activeIndex === null ? null : allItems[activeIndex];

    const open = (index: number) => {
        setActiveIndex(index);
        dialogRef.current?.showModal();
    };

    const step = (delta: number) =>
        setActiveIndex((i) => (i === null ? i : (i + delta + allItems.length) % allItems.length));

    const starts = sections.map((_, s) =>
        sections.slice(0, s).reduce((sum, section) => sum + section.items.length, 0),
    );

    return (
        <>
            {sections.map((section, s) => {
                const start = starts[s];
                return (
                    <section key={section.heading ?? s}>
                        {section.heading && <h2 className={headingClassName}>{section.heading}</h2>}
                        {section.intro && <p className={introClassName}>{section.intro}</p>}
                        {variant === 'photo' ? (
                            <div className={styles.photoGrid}>
                                {section.items.map((item, i) => (
                                    <button
                                        key={item.image}
                                        type="button"
                                        className={styles.photo}
                                        onClick={() => open(start + i)}
                                        aria-label={`View ${item.title}`}
                                    >
                                        <img src={item.image} alt={item.alt} loading="lazy" />
                                        <span className={styles.photoCaption}>
                                            {item.title} <span>· {item.category}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : variant === 'wall' || variant === 'scrapbook' ? (
                            <div className={`${styles.pinnedGrid} ${section.portrait ? styles.portraitGrid : ''}`}>
                                {section.items.map((item, i) => (
                                    <button
                                        key={item.image}
                                        type="button"
                                        className={`${styles.pinned} ${styles[variant]}`}
                                        style={{ '--tilt': `${TILTS[(start + i) % TILTS.length]}deg` } as React.CSSProperties}
                                        onClick={() => open(start + i)}
                                        aria-label={`View ${item.title}`}
                                    >
                                        <span className={styles.paper}>
                                            <img src={item.image} alt={item.alt} loading="lazy" />
                                        </span>
                                        <span className={styles.photoCaption}>
                                            {item.title} <span>· {item.category}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className={`${styles.grid} ${section.portrait ? styles.portraitGrid : ''}`}>
                                {section.items.map((item, i) => (
                                    <button
                                        key={item.image}
                                        type="button"
                                        className={styles.trigger}
                                        onClick={() => open(start + i)}
                                        aria-label={`View ${item.title}`}
                                    >
                                        <CreativeCard
                                            title={item.title}
                                            category={item.category}
                                            imageSrc={item.image}
                                            alt={item.alt}
                                            contain
                                            portrait={section.portrait}
                                            touchCaption
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>
                );
            })}

            <dialog
                ref={dialogRef}
                className={styles.dialog}
                onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
                onClose={() => setActiveIndex(null)}
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
                            <img src={active.image} alt={active.alt} className={styles.fullImage} />
                            {allItems.length > 1 && (
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
                                {activeIndex! + 1} / {allItems.length}
                            </span>
                        </figcaption>
                    </figure>
                )}
            </dialog>
        </>
    );
}
