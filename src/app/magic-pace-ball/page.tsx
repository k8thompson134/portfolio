import styles from './page.module.scss';
import Link from 'next/link';

export default function MagicPaceBall() {
    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backLink}>← Return to Base</Link>
            <h1 className={styles.title}>Magic Pace Ball</h1>
            <p className={styles.tagline}>Real-time running pacing advice powered by on-device AI.</p>

            <div className={styles.content}>
                <div className={styles.info}>
                    <p>
                        Magic Pace Ball gives you privacy-first running advice without needing a cloud connection.
                        It uses an on-device LLM to analyze your pace and heart rate in real-time.
                    </p>
                    <div className={styles.status}>
                        <span className={styles.badge}>Status: WIP</span>
                        <span className={styles.badge}>Flutter</span>
                        <span className={styles.badge}>On-Device AI</span>
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
