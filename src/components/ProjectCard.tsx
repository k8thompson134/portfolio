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
  github?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  status,
  href,
  github,
}: ProjectCardProps) {
  return (
    <article className={styles.card}>
      {href && (
        <Link href={href} className={styles.cardLink} aria-label={`View ${title} details`} />
      )}

      <header className={styles.header}>
        <span className={`${styles.led} ${styles[status]}`}>{status.toUpperCase()}</span>

        {github && (
          <a
            href={github}
            className={styles.githubIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Source on GitHub"
            title="View Source on GitHub"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-1.455-3.795-1.455-.54-1.38-1.335-1.755-1.335-1.755-1.095-.75.09-.735.09-.735 1.2.09 1.83 1.245 1.83 1.245 1.08 1.86 2.805 1.32 3.495 1.005.105-.78.42-1.32.765-1.62-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.225 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.695.24 2.925.12 3.225.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        )}
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
}
