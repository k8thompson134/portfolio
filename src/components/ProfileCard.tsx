import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
    imageSrc?: string;
}

export default function ProfileCard({ imageSrc }: ProfileCardProps) {
    return (
        <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
                {imageSrc ? (
                    <img src={imageSrc} alt="Profile" className={styles.avatar} />
                ) : (
                    <div className={styles.placeholder}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </div>
                )}
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>Kate Thompson</h3>
                <div className={styles.quickStats}>
                    <span className={styles.stat}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                        MSOE 2027
                    </span>
                    <span className={styles.stat}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Milwaukee, WI
                    </span>
                    <span className={`${styles.stat} ${styles.highlight}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        Available May 2027
                    </span>
                </div>
            </div>
        </div>
    );
}
