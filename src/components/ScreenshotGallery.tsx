'use client';

import { useState } from 'react';
import CreativeCard from './CreativeCard';
import Lightbox from './Lightbox';
import styles from './ScreenshotGallery.module.scss';

export interface Screenshot {
    title: string;
    category: string;
    image: string;
    alt?: string;
    portrait?: boolean;
}

interface ScreenshotGalleryProps {
    items: Screenshot[];
    className: string;
}

export default function ScreenshotGallery({ items, className }: ScreenshotGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <>
            <div className={className}>
                {items.map((item, i) => (
                    <button
                        key={item.image}
                        type="button"
                        className={styles.trigger}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`View ${item.title}`}
                    >
                        <CreativeCard
                            title={item.title}
                            category={item.category}
                            imageSrc={item.image}
                            alt={item.alt}
                            portrait={item.portrait}
                            contain
                        />
                    </button>
                ))}
            </div>
            <Lightbox items={items} index={activeIndex} onIndexChange={setActiveIndex} />
        </>
    );
}
