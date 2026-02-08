import styles from './TechBadge.module.scss';

interface TechBadgeProps {
    name: string;
    icon?: React.ReactNode;
}

export default function TechBadge({ name, icon }: TechBadgeProps) {
    return (
        <span className={styles.badge}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {name}
        </span>
    );
}
