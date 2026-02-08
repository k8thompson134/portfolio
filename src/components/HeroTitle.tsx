import styles from './HeroTitle.module.scss';

export default function HeroTitle() {
    return (
        <section className={styles.heroSection}>
            <h1 className={styles.title}>
                The K8 Control Panel
            </h1>
            <p className={styles.tagline}>
                Software Engineer · <span>Systems Online</span>
            </p>
        </section>
    );
}
