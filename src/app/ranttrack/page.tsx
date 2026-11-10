'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function RantTrack() {
    const [activeTab, setActiveTab] = useState<'demo' | 'gallery'>('demo');

    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backLink}>← Back to Command Center</Link>
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
                    <span className={styles.badge}>Status: Live</span>
                    <span className={styles.badge}>React</span>
                    <span className={styles.badge}>TypeScript</span>
                    <span className={styles.badge}>Vite</span>
                    <span className={styles.badge}>Local-first</span>
                    <a href="https://github.com/k8thompson134/rant-app" className={styles.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    <a href="https://github.com/k8thompson134/rant-app/tree/mobile" className={styles.githubLink} target="_blank" rel="noopener noreferrer">Mobile app branch</a>
                </div>
            </div>

            <div className={styles.tabContainer}>
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
                        { title: 'Insights', category: 'Data Visualization', image: '/images/rant insights.png', portrait: true },
                        { title: 'Monthly View', category: 'Calendar', image: '/images/rant month.png', portrait: true },
                        { title: 'User Guide', category: 'Help & Resources', image: '/images/rantguide.png', portrait: true },
                        { title: 'Settings', category: 'Configuration', image: '/images/rantsettings.png', portrait: true },
                        { title: 'Settings', category: 'Customization', image: '/images/rantsettings2.png', portrait: true },
                      ]}
                    />
                </div>
            )}

            <Footer />
        </main>
    );
}
