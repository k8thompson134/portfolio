import styles from './Footer.module.scss';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                © {currentYear} <span>K8 Control Panel</span> · Built with Next.js
            </p>
        </footer>
    );
}
