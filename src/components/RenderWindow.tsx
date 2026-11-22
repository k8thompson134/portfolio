import Image from 'next/image';
import LoopVideo from './LoopVideo';
import type { GalleryItem } from '@/app/beyond-code/data';
import styles from './RenderWindow.module.scss';

interface RenderWindowProps {
    item: GalleryItem;
    onOpen: () => void;
}

// A late-90s desktop window around one Bryce render, with its real file details in the status bar
export default function RenderWindow({ item, onOpen }: RenderWindowProps) {
    const render = item.render;

    return (
        <figure className={styles.item}>
            <div className={styles.window}>
                <div className={styles.titleBar}>
                    <svg className={styles.titleIcon} viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M1 13 L6 5 L9 9 L11 7 L15 13 Z" fill="#4a7a3a" />
                        <circle cx="12" cy="4" r="2" fill="#ffd34d" />
                    </svg>
                    <span className={styles.titleText}>{render?.file ?? item.title}</span>
                    <span className={styles.controls} aria-hidden="true">
                        <span className={styles.control}>
                            <svg viewBox="0 0 8 8">
                                <path d="M1 6h5" stroke="#000" strokeWidth="2" />
                            </svg>
                        </span>
                        <span className={styles.control}>
                            <svg viewBox="0 0 8 8">
                                <rect x="0.5" y="0.5" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
                                <path d="M0.5 1.5h7" stroke="#000" strokeWidth="1.5" />
                            </svg>
                        </span>
                        <span className={styles.control}>
                            <svg viewBox="0 0 8 8">
                                <path d="M1 1l6 6M7 1L1 7" stroke="#000" strokeWidth="1.5" />
                            </svg>
                        </span>
                    </span>
                </div>

                <button type="button" className={styles.viewport} onClick={onOpen} aria-label={`View ${item.title}`}>
                    {item.video ? (
                        <LoopVideo src={item.video} poster={item.image} label={item.alt} />
                    ) : (
                        <Image
                            src={item.image}
                            alt={item.alt}
                            width={960}
                            height={720}
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                    )}
                </button>

                {render && (
                    <div className={styles.statusBar}>
                        <span className={styles.field}>
                            {render.size}
                            {render.frames ? ` · ${render.frames} frames` : ''}
                        </span>
                        <span className={`${styles.field} ${styles.date}`}>{render.date}</span>
                        <a className={styles.save} href={render.download} download>
                            Save
                        </a>
                    </div>
                )}
            </div>

            <figcaption className={styles.caption}>
                {item.title} <span>· {item.category}</span>
            </figcaption>
        </figure>
    );
}
