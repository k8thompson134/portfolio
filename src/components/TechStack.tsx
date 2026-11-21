import styles from './TechStack.module.scss';
import TechBadge from './TechBadge';

const technologies = [
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'Python',
    'Flask',
    'FastAPI',
    'PostgreSQL',
    'SQLite',
    'Docker',
    'Ollama',
    'Java',
    'Ruby on Rails',
];

export default function TechStack() {
    return (
        <section className={styles.techStack}>
            <h2 className={styles.heading}>Tech Stack</h2>
            <div className={styles.grid}>
                {technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                ))}
            </div>
        </section>
    );
}
