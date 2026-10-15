import Link from 'next/link';
import styles from '../page.module.scss';
import CategoryCard from '@/components/CategoryCard';
import Footer from '@/components/Footer';
import { categories, itemCount, coverItem } from './data';

export default function BeyondCodePage() {
  return (
    <main className={styles.main}>
      <div className={styles.backLink}>
        <Link href="/">← Back to Command Center</Link>
      </div>
      <h1 className={styles.pageTitle}>Beyond Code</h1>
      <p className={styles.pageDescription}>
        Campaign art, logos, posters, photography, handmade work, and the events I&apos;ve organized outside of software.
      </p>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            title={category.title}
            description={category.summary}
            count={itemCount(category)}
            href={`/beyond-code/${category.slug}`}
            cover={{ ...coverItem(category), contain: coverItem(category).contain || category.coverContain }}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}
