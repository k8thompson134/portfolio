import Image from 'next/image';
import styles from './Footer.module.scss';
import K8Tap from './K8Tap';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                © {currentYear} <span>K8 Control Panel</span> · Built with Next.js
            </p>
            <p className={styles.hint}>
                <K8Tap>
                    <Image
                        src="/images/k8-mark-xs.png"
                        alt="K8"
                        width={444}
                        height={128}
                        className={styles.markHint}
                    />
                </K8Tap>
            </p>
        </footer>
    );
}
