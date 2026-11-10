import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
    title: string;
    description: string;
    count: number;
    href: string;
    cover?: { image: string; contain?: boolean };
}

export default function CategoryCard({ title, description, count, href, cover }: CategoryCardProps) {
    return (
        <Link href={href} className={styles.categoryCard}>
            {cover && (
                <Image
                    src={cover.image}
                    alt=""
                    width={900}
                    height={600}
                    sizes="(max-width: 640px) 100vw, 450px"
                    className={`${styles.cover} ${cover.contain ? styles.contain : ''}`}
                />
            )}
            <div className={styles.body}>
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
            </div>
        </Link>
    );
}
