import styles from './page.module.scss';
import Link from 'next/link';

export default function RantTrack() {
    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backLink}>← Return to Base</Link>
            <h1 className={styles.title}>RantTrack</h1>
            <p className={styles.tagline}>Voice-first symptom tracking for when you need it most.</p>

            <div className={styles.content}>
                <div className={styles.info}>
                    <p>
                        RantTrack uses natural language processing to help chronic illness patients log symptoms just by speaking.
                        Designed for high-pain days where navigating complex UI is difficult.
                    </p>
                    <div className={styles.status}>
                        <span className={styles.badge}>Status: Live</span>
                        <span className={styles.badge}>React Native</span>
                    </div>
                </div>

                <div className={styles.preview}>
                    {/* Placeholder for Screenshots or Web Build */}
                    <div className={styles.placeholderBox}>
                        <p>App Preview / Download</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
