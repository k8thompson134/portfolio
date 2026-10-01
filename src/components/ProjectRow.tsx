import Link from 'next/link';
import styles from './ProjectRow.module.scss';

interface ProjectRowProps {
  title: string;
  summary: string;
  tech: string[];
  status: 'live' | 'wip' | 'archived' | 'coursework';
  href?: string;
  github?: string;
  liveUrl?: string;
}

export default function ProjectRow({ title, summary, tech, status, href, github, liveUrl }: ProjectRowProps) {
  return (
    <article className={styles.row}>
      <span className={`${styles.led} ${styles[status]}`} title={status.toUpperCase()} aria-label={status} />
      <div className={styles.body}>
        <h3 className={styles.title}>
          {href ? <Link href={href} className={styles.titleLink}>{title}</Link> : title}
        </h3>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.tags}>
          {tech.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
      <div className={styles.links}>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title} live site`} title="Visit Live Site">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} source on GitHub`} title="View Source">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-1.455-3.795-1.455-.54-1.38-1.335-1.755-1.335-1.755-1.095-.75.09-.735.09-.735 1.2.09 1.83 1.245 1.83 1.245 1.08 1.86 2.805 1.32 3.495 1.005.105-.78.42-1.32.765-1.62-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.225 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.695.24 2.925.12 3.225.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
