'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/Lightbox';
import styles from './page.module.scss';

const SHOTS = [
    {
        label: 'Stormglass',
        title: 'Pressure Dynamics & Current Conditions',
        category: 'Stormglass dashboard',
        image: '/images/stormglass-dashboard.png',
        alt: 'Stormglass dashboard with the pressure dynamics chart and current conditions',
        width: 1370,
        height: 744,
    },
    {
        label: 'The inspiration',
        title: 'Barometric Pressure by Minute',
        category: 'curtronics.com',
        image: '/images/curtronics-baro.png',
        alt: 'Curtronics Milwaukee Weather barometric pressure per minute graph page',
        width: 1024,
        height: 656,
    },
];

export default function InspirationCompare() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <>
            <div className={styles.compare}>
                {SHOTS.map((shot, i) => (
                    <figure key={shot.image} className={styles.compareItem}>
                        <span className={`${styles.compareLabel} ${i > 0 ? styles.compareLabelMuted : ''}`}>
                            {shot.label}
                        </span>
                        <button
                            type="button"
                            className={styles.compareFrame}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`View ${shot.title}`}
                        >
                            <Image
                                src={shot.image}
                                alt={shot.alt}
                                width={shot.width}
                                height={shot.height}
                                sizes="(max-width: 768px) 100vw, 560px"
                            />
                        </button>
                        <figcaption className={styles.referenceCaption}>
                            {i === 0 ? (
                                'Pressure, air quality, pollen, and space weather in one dashboard.'
                            ) : (
                                <>
                                    The per-minute pressure graph I watched for years:{' '}
                                    <a
                                        href="http://www.curtronics.com/Weather/graphs/BaroByMinute.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.referenceLinkText}
                                    >
                                        curtronics.com
                                    </a>
                                </>
                            )}
                        </figcaption>
                    </figure>
                ))}
            </div>
            <Lightbox items={SHOTS} index={activeIndex} onIndexChange={setActiveIndex} />
        </>
    );
}
