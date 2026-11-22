import type { Metadata } from 'next';
import Link from 'next/link';
import SlashPage from '@/components/SlashPage';
import styles from '@/components/SlashPage.module.scss';

export const metadata: Metadata = { title: 'Colophon | Kate Thompson' };

export default function ColophonPage() {
    return (
        <SlashPage slug="colophon" title="Colophon" intro={<p>How this site is made.</p>}>
            <section className={styles.section}>
                <h2>Design</h2>
                <p>
                    The look is a mission control console: the colors come from NASA&apos;s 1975 Graphics Standards Manual (the
                    &ldquo;worm&rdquo; era), with panel navy, console mint, and nixie-tube orange for anything that glows. The{' '}
                    <Link href="/control-panel">Control Panel</Link> takes it furthest, as a rack of hardware modules with screens cut into
                    the chassis.
                </p>
            </section>
            <section className={styles.section}>
                <h2>Type</h2>
                <dl className={styles.dl}>
                    <dt>Display</dt>
                    <dd>Space Grotesk</dd>
                    <dt>Mono</dt>
                    <dd>IBM Plex Mono</dd>
                    <dt>Headings</dt>
                    <dd>Caprasimo</dd>
                    <dt>Body</dt>
                    <dd>Quicksand</dd>
                    <dt>Panel screens</dt>
                    <dd>Silkscreen and VT323</dd>
                </dl>
            </section>
            <section className={styles.section}>
                <h2>Stack</h2>
                <dl className={styles.dl}>
                    <dt>Framework</dt>
                    <dd>Next.js and React, written in TypeScript</dd>
                    <dt>Styles</dt>
                    <dd>Hand-written SCSS modules; icons are inline SVG</dd>
                    <dt>Journal</dt>
                    <dd>page-flip for the collage journal</dd>
                    <dt>Live data</dt>
                    <dd>Open-Meteo, NOAA SWPC, and the Cream City Docket API</dd>
                    <dt>Guestbook</dt>
                    <dd>Upstash Redis, with every entry approved by hand</dd>
                    <dt>Hosting</dt>
                    <dd>Vercel</dd>
                    <dt>Analytics</dt>
                    <dd>Vercel Web Analytics: page views only, no cookies</dd>
                    <dt>Source</dt>
                    <dd>
                        <a href="https://github.com/k8thompson134/portfolio" target="_blank" rel="noopener noreferrer">
                            github.com/k8thompson134/portfolio
                        </a>
                    </dd>
                </dl>
            </section>
        </SlashPage>
    );
}
