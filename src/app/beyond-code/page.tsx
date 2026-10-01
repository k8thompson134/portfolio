import styles from '../page.module.scss';
import CategoryCard from '@/components/CategoryCard';
import Footer from '@/components/Footer';

export default function BeyondCodePage() {
  return (
    <main className={styles.main}>
      <div className={styles.backLink}>
        <a href="/">← Back to Command Center</a>
      </div>
      <h1 className={styles.pageTitle}>Beyond Code</h1>
      <p className={styles.pageDescription}>
        Design, handmade work, and the events I&apos;ve organized outside of software.
      </p>
      <div className={styles.categoryGrid}>
        <CategoryCard
          title="Logo Design"
          description="Logos I've designed that were officially adopted, including process work and iterations."
          count={10}
          href="/beyond-code/logos"
        />
        <CategoryCard
          title="Crafts"
          description="Cross stitch, upcycled teacup candles, and other handmade projects."
          count={3}
          href="/beyond-code/crafts"
        />
        <CategoryCard
          title="Posters & Flyers"
          description="Event promotion and materials for YDSA, KSM, and campus organizations."
          count={7}
          href="/beyond-code/posters"
        />
        <CategoryCard
          title="Events Hosted"
          description="SWE conferences, cultural celebrations, and community events I've organized."
          count={10}
          href="/beyond-code/events"
        />
      </div>
      <Footer />
    </main>
  );
}
