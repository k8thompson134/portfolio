import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';

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
                        <a href="https://github.com/k8thompson134/magic-pace-ball" className={styles.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </div>
                </div>

                <div className={styles.preview}>
                    <Image
                        src="/paceball.png"
                        alt="Magic Pace Ball Screenshot"
                        width={300}
                        height={600}
                        className={styles.screenshot}
                        style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '500px' }}
                    />
                </div>
            </div>
        </main>
    );
}
