import type { Metadata } from 'next';
import Link from 'next/link';
import SlashPage, { LinkList } from '@/components/SlashPage';
import styles from '@/components/SlashPage.module.scss';
import { blogroll, card, chipotleOrder, daylists, podroll, postroll } from '@/data/slash';

export const metadata: Metadata = { title: 'Links | Kate Thompson' };

const PAGES: { href: string; name: string; note?: string }[] = [
    { href: '/card', name: 'Card', note: 'my contact info, ready to save' },
    { href: '/guestbook', name: 'Guestbook', note: 'sign the visitor log' },
    { href: '/control-panel', name: 'Control Panel', note: 'live Milwaukee telemetry' },
    { href: '/self-hosting', name: 'Self-hosting', note: 'what runs on my own hardware' },
    { href: '/colophon', name: 'Colophon', note: 'how this site is built' },
    // Content pages stay unlisted until they have entries
    ...(blogroll.length ? [{ href: '/blogroll', name: 'Blogroll' }] : []),
    ...(podroll.length ? [{ href: '/podroll', name: 'Podroll' }] : []),
    ...(postroll.length ? [{ href: '/postroll', name: 'Postroll' }] : []),
    ...(daylists.length ? [{ href: '/daylists', name: 'Daylists' }] : []),
    ...(chipotleOrder.length ? [{ href: '/chipotle', name: 'Chipotle' }] : []),
];

const PROJECTS = [
    { name: 'Stormglass', url: 'https://mystormglass.xyz', note: 'environmental health forecasts' },
    { name: 'Cream City Docket', url: 'https://creamcitydocket.com', note: 'Milwaukee legislation in plain English' },
    { name: 'Research feed', url: 'https://research.k8thompson.dev/research-public', note: 'daily Long COVID and ME/CFS papers' },
    { name: 'Pattern Maker', url: 'https://patterns.k8thompson.dev', note: 'cross-stitch charts' },
    { name: 'Signal Tuner', url: 'https://tuner.k8thompson.dev', note: 'a signal decoder game' },
    { name: 'Where To?', url: 'https://whereto.k8thompson.dev', note: 'errand route planner' },
];

export default function LinksPage() {
    const elsewhere = [
        { name: 'Email', url: `mailto:${card.email}`, note: card.email },
        ...card.socials.filter((s) => s.url).map((s) => ({ name: s.label, url: s.url, note: s.handle })),
    ];

    return (
        <SlashPage slug="links" title="Links" intro={<p>Everywhere else I am, and every page on this site.</p>}>
            <section className={styles.section}>
                <h2>Elsewhere</h2>
                <LinkList items={elsewhere} />
            </section>
            <section className={styles.section}>
                <h2>Live projects</h2>
                <LinkList items={PROJECTS} />
            </section>
            <section className={styles.section}>
                <h2>On this site</h2>
                <ul className={styles.list}>
                    {PAGES.map((p) => (
                        <li key={p.href}>
                            <Link href={p.href}>{p.name}</Link>
                            {p.note && <span className={styles.note}>{p.note}</span>}
                        </li>
                    ))}
                </ul>
            </section>
        </SlashPage>
    );
}
