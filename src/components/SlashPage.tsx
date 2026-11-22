import Link from 'next/link';
import type { ReactNode } from 'react';
import Footer from './Footer';
import styles from './SlashPage.module.scss';

// Shared shell for the small indie-web pages (/now-style "slash pages")
export default function SlashPage({ slug, title, intro, children }: { slug: string; title: string; intro?: ReactNode; children: ReactNode }) {
    return (
        <main className={styles.main}>
            <Link href="/links" className={styles.backLink}>← All pages</Link>
            <p className={styles.slug}>/{slug}</p>
            <h1 className={styles.title}>{title}</h1>
            {intro && <div className={styles.intro}>{intro}</div>}
            {children}
            <Footer />
        </main>
    );
}

export function Empty({ children }: { children: ReactNode }) {
    return <p className={styles.empty}>{children}</p>;
}

export function LinkList({ items }: { items: { name: string; url: string; note?: string }[] }) {
    return (
        <ul className={styles.list}>
            {items.map((item) => (
                <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                    {item.note && <span className={styles.note}>{item.note}</span>}
                </li>
            ))}
        </ul>
    );
}
