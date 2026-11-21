'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox, { type LightboxItem } from './Lightbox';
import styles from './ExperienceTimeline.module.scss';

export interface EntryPhoto extends LightboxItem {
  width: number;
  height: number;
}

export default function EntryPhotos({ photos }: { photos: EntryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.photos}>
        {photos.map((photo, i) => (
          <button
            key={photo.image}
            type="button"
            className={styles.photo}
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${photo.title}`}
          >
            <Image src={photo.image} alt={photo.alt ?? photo.title} width={photo.width} height={photo.height} sizes="160px" />
          </button>
        ))}
      </div>
      <Lightbox items={photos} index={activeIndex} onIndexChange={setActiveIndex} />
    </>
  );
}
