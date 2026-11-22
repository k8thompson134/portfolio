'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ArchitectureDiagram, { type DiagramBlock } from '@/components/ArchitectureDiagram';

const DATA_FLOW: DiagramBlock[] = [
    {
        type: 'boundary',
        label: 'Your browser · nothing leaves it',
        variant: 'private',
        blocks: [
            {
                type: 'tier',
                label: 'Input',
                nodes: [
                    {
                        id: 'rant',
                        name: 'Rant box',
                        kind: 'client',
                        tech: 'Typed or Web Speech API',
                        link: { href: '#try-it', label: 'Try it' },
                        detail:
                            'Type or say how you feel in your own words, the way you would tell a friend. Voice uses the browser’s speech recognition where it is supported, so there is no form to fill out on a bad day.',
                    },
                ],
            },
            { type: 'link', flows: ['raw text'] },
            {
                type: 'tier',
                label: 'NLP engine',
                nodes: [
                    {
                        id: 'extract',
                        name: 'Extraction',
                        kind: 'service',
                        tech: 'Rule-based · 200+ patterns',
                        detail:
                            'A tokenizer and symptom dictionaries pick out symptoms, severity, pain details, triggers, and timing from medical terms, spoon theory, and casual or Gen-Z language. No model, so it runs instantly and offline.',
                    },
                    {
                        id: 'validate',
                        name: 'Validation',
                        kind: 'service',
                        tech: 'Negation · confidence',
                        detail:
                            'Handles negation like “no nausea though,” gives every detection a confidence score, and filters out spurious matches before anything is saved.',
                    },
                ],
            },
            { type: 'link', flows: ['symptoms with severity and confidence'] },
            {
                type: 'tier',
                label: 'Storage',
                nodes: [
                    {
                        id: 'storage',
                        name: 'localStorage',
                        kind: 'data',
                        tech: 'On this device only',
                        detail:
                            'Entries are saved in the browser and never sent to a server. If a save fails, the app says so instead of losing the entry quietly. The mobile branch uses on-device SQLite instead.',
                    },
                ],
            },
            { type: 'link', flows: ['read back'] },
            {
                type: 'tier',
                label: 'Views',
                nodes: [
                    {
                        id: 'history',
                        name: 'History and Insights',
                        kind: 'client',
                        tech: '7 · 30 · 90 days · all time',
                        link: { href: '#try-it', label: 'Try it' },
                        detail:
                            'History grouped by day, and insights on symptom frequency and good, moderate, and rough days over the last 7, 30, or 90 days or all time.',
                    },
                    {
                        id: 'export',
                        name: 'Export',
                        kind: 'client',
                        tech: 'JSON · CSV',
                        detail:
                            'Your data is yours: export to JSON or CSV, for a doctor or a spreadsheet, and import a JSON backup on another device.',
                    },
                ],
            },
        ],
    },
];

export default function RantTrack() {
    const [activeTab, setActiveTab] = useState<'demo' | 'gallery'>('demo');

    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backLink}>← Back to Control Panel</Link>
            <h1 className={styles.title}>RantTrack</h1>
            <p className={styles.tagline}>Just rant about how you feel. The NLP handles the rest.</p>

            <div className={styles.intro}>
                <p>
                    RantTrack is a privacy-first symptom tracker built for people with chronic illness.
                    Type or speak how you feel and a rule-based NLP engine extracts symptoms, severity, pain details,
                    triggers, and negation from natural speech across 200+ patterns, including medical terminology,
                    spoon theory, and casual language. Each detection carries a confidence score, and rule-based
                    validation filters out spurious matches.
                </p>
                <p>
                    The web app runs entirely in the browser: entries live in local storage, nothing is sent to a server,
                    and history, insights, and JSON/CSV export all work offline. A React Native version with on-device
                    SQLite and native speech recognition lives on the repository&apos;s mobile branch.
                    Designed for your worst flare days, when navigating complex UI costs spoons you don&apos;t have.
                </p>
                <div className={styles.status}>
                    <span className={styles.badge}>React</span>
                    <span className={styles.badge}>TypeScript</span>
                    <span className={styles.badge}>Vite</span>
                    <span className={styles.badge}>Local-first</span>
                    <a href="https://github.com/k8thompson134/rant-app" className={styles.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    <a href="https://github.com/k8thompson134/rant-app/tree/mobile" className={styles.githubLink} target="_blank" rel="noopener noreferrer">Mobile app branch</a>
                </div>
            </div>

            <section className={styles.flowSection}>
                <h2 className={styles.sectionTitle}>How It Works</h2>
                <ArchitectureDiagram title="RantTrack" notation="Data flow" blocks={DATA_FLOW} />
            </section>

            <div id="try-it" className={styles.tabContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'demo' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('demo')}
                >
                    Try the App
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'gallery' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('gallery')}
                >
                    Screenshots
                </button>
            </div>

            {activeTab === 'demo' && (
                <div className={styles.demoSection}>
                    <p className={styles.demoNote}>
                        This is the real app, not a mockup. Click an example or type your own symptoms, save an entry,
                        and explore History and Insights. Entries stay in this browser.{' '}
                        <a href="/ranttrack-app/index.html" target="_blank" rel="noopener noreferrer">Open full screen</a>
                    </p>
                    <iframe
                        className={styles.demoFrame}
                        src="/ranttrack-app/index.html"
                        title="RantTrack web app"
                    />
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className={styles.gallerySection}>
                    <ScreenshotGallery
                      className={styles.galleryGrid}
                      items={[
                        { title: 'Rant Input', category: 'Web App', image: '/images/ranttrack-web-rant.png', portrait: true },
                        { title: 'History', category: 'Web App', image: '/images/ranttrack-web-history.png', portrait: true },
                        { title: 'Insights', category: 'Web App', image: '/images/ranttrack-web-insights.png', portrait: true },
                        { title: 'Home Screen', category: 'Daily Tracking', image: '/images/ranthome.png', portrait: true },
                        { title: 'Mobile Insights', category: 'Data Visualization', image: '/images/ranttrack-mobile-insights.png', portrait: true },
                        { title: 'Monthly View', category: 'Calendar', image: '/images/ranttrack-mobile-month.png', portrait: true },
                        { title: 'User Guide', category: 'Help & Resources', image: '/images/rantguide.png', portrait: true },
                        { title: 'Low-Energy Settings', category: 'ME/CFS Features', image: '/images/rantsettings.png', portrait: true },
                        { title: 'Visual Accessibility', category: 'Contrast, Motion, Text, and Touch Size', image: '/images/rantsettings2.png', portrait: true },
                      ]}
                    />
                </div>
            )}

            <Footer />
        </main>
    );
}
