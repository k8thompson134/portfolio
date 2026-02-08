import styles from '../../page.module.scss';
import CreativeCard from '@/components/CreativeCard';

export default function CraftsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.backLink}>
                <a href="/">← Back to Command Center</a>
            </div>
            <h1 className={styles.pageTitle}>Crafts</h1>
            <p className={styles.pageDescription}>
                Handmade projects—cross stitch, upcycled crafts, and more.
            </p>

            <div className={styles.creativeGrid}>
                <CreativeCard
                    title="Teacup Candles"
                    category="Upcycled · Christmas Gifts"
                    imageSrc="/images/creative work/teacupcandles.jpg"
                />
                <CreativeCard
                    title="Cow Cross Stitch"
                    category="Cross Stitch"
                    imageSrc="/images/creative work/cowCS.jpg"
                />
                <CreativeCard
                    title="Snoopy Cross Stitch"
                    category="Cross Stitch"
                    imageSrc="/images/creative work/snoopyCS.jpg"
                />
            </div>
        </main>
    );
}
