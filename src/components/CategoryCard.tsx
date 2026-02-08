import Link from 'next/link';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
    title: string;
    description: string;
    count: number;
    href: string;
}

export default function CategoryCard({ title, description, count, href }: CategoryCardProps) {
    return (
        <Link href={href} className={styles.categoryCard}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.arrow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
            <p className={styles.description}>{description}</p>
            <span className={styles.count}>{count} {count === 1 ? 'item' : 'items'}</span>
        </Link>
    );
}
