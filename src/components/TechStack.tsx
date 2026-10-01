import styles from './TechStack.module.scss';
import TechBadge from './TechBadge';

const technologies = [
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'Python',
    'PostgreSQL',
    'SQLite',
    'Docker',
    'Java',
    'Ruby on Rails',
    'Flutter',
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
