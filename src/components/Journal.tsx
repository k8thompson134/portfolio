'use client';

import { useEffect, useRef, useState } from 'react';
import type { PageFlip } from 'page-flip';
import type { GalleryItem } from '@/app/beyond-code/data';
import styles from './Journal.module.scss';

interface JournalProps {
    items: GalleryItem[];
    onOpen: (index: number) => void;
}

function makePage(className: string, hard = false): HTMLDivElement {
    const el = document.createElement('div');
    el.className = className;
    if (hard) el.dataset.density = 'hard';
    return el;
}

export default function Journal({ items, onOpen }: JournalProps) {
    const hostRef = useRef<HTMLDivElement>(null);
    const bookRef = useRef<PageFlip | null>(null);
    const [page, setPage] = useState(0);
    const [landscape, setLandscape] = useState(true);
    const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);

    // Which item each book page belongs to; covers and filler pages are -1
    const owners = [-1, ...items.flatMap((item, i) => (item.pages ?? []).map(() => i))];
    if (owners.length % 2 === 0) owners.push(-1);
    owners.push(-1);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        let cancelled = false;

        import('page-flip').then(({ PageFlip }) => {
            if (cancelled) return;
            // page-flip removes this element on destroy, so it can't be one React renders
            const block = document.createElement('div');
            host.appendChild(block);

            const cover = makePage(`${styles.page} ${styles.cover}`, true);
            cover.innerHTML = `<img src="/images/beyond-code/journal/cover.webp" alt="Junk Journal, spelled in ransom-note letters cut from the journal’s pages"><span class="${styles.coverHint}">Tap or swipe to open</span>`;
            const pages = [cover];
            items.forEach((item) =>
                (item.pages ?? []).forEach((src, n) => {
                    const el = makePage(styles.page);
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `${item.title}, page ${n + 1} of ${item.pages!.length}. ${item.alt}`;
                    // Hidden pages are swapped in by transform, so lazy loading can miss them;
                    // load up front and retry once if a request fails
                    img.addEventListener('error', () => setTimeout(() => (img.src = `${src}?retry=1`), 1000), { once: true });
                    el.appendChild(img);
                    pages.push(el);
                }),
            );
            if (pages.length % 2 === 0) pages.push(makePage(styles.page));
            const back = makePage(`${styles.page} ${styles.cover}`, true);
            back.innerHTML = '<img src="/images/beyond-code/journal/back.webp" alt="">';
            pages.push(back);

            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            // page-flip's own touch handling starts a fold whenever a finger rests on the
            // book, which blocks scrolling past it, so touch screens use onTouchEnd below
            const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const book = new PageFlip(block, {
                width: 420,
                height: 600,
                size: 'stretch',
                minWidth: 120,
                maxWidth: 520,
                minHeight: 171,
                maxHeight: 743,
                showCover: true,
                // Spreads stay side by side on phones too; they were made as spreads
                usePortrait: false,
                mobileScrollSupport: true,
                flippingTime: reduceMotion ? 1 : 700,
                maxShadowOpacity: 0.4,
                useMouseEvents: !coarsePointer,
            });
            book.on('flip', (e) => setPage(e.data));
            book.on('changeOrientation', (e) => setLandscape(e.data === 'landscape'));
            book.on('init', (e) => setLandscape(e.data.mode === 'landscape'));
            book.loadFromHTML(pages);
            bookRef.current = book;
        });

        return () => {
            cancelled = true;
            bookRef.current?.destroy();
            bookRef.current = null;
        };
    }, [items]);

    const atEnd = page >= owners.length - 1;
    // Past the back cover, "next" flips back to the front instead of stopping
    const next = () => (atEnd ? bookRef.current?.flip(0) : bookRef.current?.flipNext());

    const visiblePages = landscape && page > 0 ? [page, page + 1] : [page];
    const visible = [...new Set(visiblePages.map((p) => owners[p]).filter((i) => i >= 0))];

    return (
        <div
            className={styles.journal}
            tabIndex={0}
            aria-label="Junk journal. Use the arrow keys to turn pages."
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') bookRef.current?.flipPrev();
            }}
        >
            <div className={`${styles.bookFrame} ${landscape && (page === 0 || atEnd) ? styles.closed : ''}`}>
                <div
                    ref={hostRef}
                    onTouchStart={(e) => {
                        const t = e.touches[0];
                        touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() };
                    }}
                    onTouchEnd={(e) => {
                        const start = touchStart.current;
                        touchStart.current = null;
                        if (!start || !bookRef.current) return;
                        const t = e.changedTouches[0];
                        const dx = t.clientX - start.x;
                        const dy = t.clientY - start.y;
                        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                            if (dx < 0) next();
                            else bookRef.current.flipPrev();
                        } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && Date.now() - start.time < 300) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            if (t.clientX > rect.left + rect.width / 2) next();
                            else bookRef.current.flipPrev();
                        }
                    }}
                    className={`${styles.book} ${landscape && page === 0 ? styles.closedFront : ''} ${
                        landscape && page >= owners.length - 1 ? styles.closedBack : ''
                    }`}
                />
            </div>

            <div className={styles.controls}>
                <button type="button" onClick={() => bookRef.current?.flipPrev()} aria-label="Previous page" disabled={page === 0}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 6l-6 6 6 6" />
                    </svg>
                </button>
                <span className={styles.counter}>
                    {page === 0 ? 'Cover' : atEnd ? 'The end' : `Page ${visiblePages.join('–')}`}
                </span>
                <button
                    type="button"
                    onClick={next}
                    aria-label={atEnd ? 'Back to the cover' : 'Next page'}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {atEnd ? <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4" /> : <path d="M9 6l6 6-6 6" />}
                    </svg>
                </button>
            </div>

            <div className={styles.captions} aria-live="polite">
                {visible.map((i) => (
                    <div key={items[i].title} className={styles.caption}>
                        <div className={styles.captionHeader}>
                            <span className={styles.captionTitle}>{items[i].title}</span>
                            <span className={styles.captionCategory}>{items[i].category}</span>
                        </div>
                        {items[i].description && <p className={styles.captionText}>{items[i].description}</p>}
                        <div className={styles.captionLinks}>
                            <button type="button" onClick={() => onOpen(i)}>
                                Zoom in
                            </button>
                            {items[i].link && (
                                <a href={items[i].link.href} target="_blank" rel="noopener noreferrer">
                                    {items[i].link.label} ↗
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
