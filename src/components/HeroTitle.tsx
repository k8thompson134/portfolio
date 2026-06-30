import styles from './HeroTitle.module.scss';
import K8Tap from './K8Tap';

export default function HeroTitle() {
    return (
        <section className={styles.heroSection}>
            <h1 className={styles.title}>
                The <K8Tap>K8</K8Tap> Control Panel
            </h1>
            <p className={styles.tagline}>
                Software Engineer · <span>Systems Online</span>
            </p>
        </section>
    );
}
