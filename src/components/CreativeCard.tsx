import styles from './CreativeCard.module.scss';

interface CreativeCardProps {
    title: string;
    category: string;
    imageSrc?: string;
    href?: string;
    contain?: boolean;
    imagePosition?: string; // e.g., "top", "center", "bottom", "left", "right"
    portrait?: boolean;
}

export default function CreativeCard({
    title,
    category,
    imageSrc,
    href,
    contain,
    imagePosition = 'center',
    portrait
}: CreativeCardProps) {
    const CardWrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <CardWrapper className={`${styles.creativeCard} ${portrait ? styles.portrait : ''}`} {...wrapperProps}>
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={title}
                    className={`${styles.image} ${contain ? styles.contain : ''}`}
                    style={{ objectPosition: imagePosition }}
                />
            ) : (
                <div className={styles.placeholder}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                </div>
            )}
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.category}>{category}</span>
            </div>
        </CardWrapper>
    );
}
