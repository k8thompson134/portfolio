'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import RantTrackApp from '@/components/ranttrack/RantTrackApp';
import CreativeCard from '@/components/CreativeCard';
import Link from 'next/link';
import Image from 'next/image';

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
                    A custom NLP engine extracts symptoms, severity, pain details, and negation from natural speech
                    across 200+ patterns including medical terminology, spoon theory, and casual language.
                    Designed for your worst flare days when navigating complex UI costs spoons you don't have.
                </p>
                <div className={styles.status}>
                    <span className={styles.badge}>Status: Live</span>
                    <span className={styles.badge}>React Native</span>
                    <span className={styles.badge}>TypeScript</span>
                    <span className={styles.badge}>SQLite</span>
                    <a href="https://github.com/k8thompson134/rant-app" className={styles.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            </div>

            <div className={styles.tabContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'demo' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('demo')}
                >
                    Interactive Demo
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'gallery' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('gallery')}
                >
                    App Screenshots
                </button>
            </div>

            {activeTab === 'demo' && (
                <div className={styles.demoSection}>
                    <p className={styles.demoNote}>
                        Try the NLP extraction engine below. Type a symptom description or click an example to see real-time parsing.
                    </p>
                    <div className={styles.demoContainer}>
                        <RantTrackApp />
                    </div>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className={styles.gallerySection}>
                    <div className={styles.galleryGrid}>
                        <CreativeCard
                            title="Home Screen"
                            category="Daily Tracking"
                            imageSrc="/images/ranthome.png"
                            portrait
                            contain
                        />
                        <CreativeCard
                            title="Insights"
                            category="Data Visualization"
                            imageSrc="/images/rant insights.png"
                            portrait
                            contain
                        />
                        <CreativeCard
                            title="Monthly View"
                            category="Calendar"
                            imageSrc="/images/rant month.png"
                            portrait
                            contain
                        />
                        <CreativeCard
                            title="User Guide"
                            category="Help & Resources"
                            imageSrc="/images/rantguide.png"
                            portrait
                            contain
                        />
                        <CreativeCard
                            title="Settings"
                            category="Configuration"
                            imageSrc="/images/rantsettings.png"
                            portrait
                            contain
                        />
                        <CreativeCard
                            title="Settings"
                            category="Customization"
                            imageSrc="/images/rantsettings2.png"
                            portrait
                            contain
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
