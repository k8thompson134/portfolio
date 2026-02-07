import Link from 'next/link';
import styles from './ProjectCard.module.scss';

// This defines what data each card needs — TypeScript will
// yell at you if you forget one when using the component
interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'wip' | 'archived';
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  status,
  href,
}: ProjectCardProps) {
  const content = (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={`${styles.led} ${styles[status]}`}>{status.toUpperCase()}</span>
      </header>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <footer className={styles.footer}>
        {tech.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </footer>
    </article>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {content}
      </Link>
    );
  }

  return content;
}
