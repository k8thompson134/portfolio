import styles from '../../page.module.scss';
import CreativeCard from '@/components/CreativeCard';

export default function LogosPage() {
    return (
        <main className={styles.main}>
            <div className={styles.backLink}>
                <a href="/">← Back to Command Center</a>
            </div>
            <h1 className={styles.pageTitle}>Logo Design</h1>
            <p className={styles.pageDescription}>
                Logos I've designed that were officially adopted by their organizations.
            </p>

            <div className={styles.creativeGrid}>
                <CreativeCard
                    title="eSubmit Logo"
                    category="Official · Adopted 2024"
                    imageSrc="/images/creative work/eSubmit Logo.png"
                    contain
                />
                <CreativeCard
                    title="PLiPS Logo"
                    category="Official · Adopted"
                    imageSrc="/images/creative work/pLIPS.png"
                    contain
                />
            </div>

            <h2 className={styles.sectionLabel}>eSubmit Iterations</h2>
            <p className={styles.bio}>Design process and early concepts</p>
            <div className={styles.creativeGrid}>
                <CreativeCard
                    title="Concept 1"
                    category="Draft"
                    imageSrc="/images/creative work/eSubmit Logo Ideas.png"
                    contain
                />
                <CreativeCard
                    title="Concept 2"
                    category="Draft"
                    imageSrc="/images/creative work/eSubmit Logo Ideas(1).png"
                    contain
                />
                <CreativeCard
                    title="Concept 3"
                    category="Draft"
                    imageSrc="/images/creative work/eSubmit Logo Ideas(2).png"
                    contain
                />
                <CreativeCard
                    title="Concept 4"
                    category="Draft"
                    imageSrc="/images/creative work/eSubmit Logo Ideas(3).png"
                    contain
                />
                <CreativeCard
                    title="Final Option A"
                    category="Finalist"
                    imageSrc="/images/creative work/eSubmit Logo Finals(4).png"
                    contain
                />
                <CreativeCard
                    title="Final Option B"
                    category="Finalist"
                    imageSrc="/images/creative work/eSubmit Logo Finals(5).png"
                    contain
                />
                <CreativeCard
                    title="Final Option C"
                    category="Finalist"
                    imageSrc="/images/creative work/eSubmit Logo Finals(6).png"
                    contain
                />
                <CreativeCard
                    title="Final Option D"
                    category="Finalist"
                    imageSrc="/images/creative work/eSubmit Logo Finals(7).png"
                    contain
                />
            </div>
        </main>
    );
}
