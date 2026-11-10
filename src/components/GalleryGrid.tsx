'use client';

import { useState } from 'react';
import Image from 'next/image';
import CreativeCard from './CreativeCard';
import Lightbox from './Lightbox';
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
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const allItems = sections.flatMap((section) => section.items);
    const open = setActiveIndex;

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
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            width={1200}
                                            height={900}
                                            sizes="(max-width: 640px) 100vw, 50vw"
                                        />
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
                                            {/* Plain img: pinned pieces keep their natural aspect ratio, which varies per piece */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
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

            <Lightbox items={allItems} index={activeIndex} onIndexChange={setActiveIndex} />
        </>
    );
}
