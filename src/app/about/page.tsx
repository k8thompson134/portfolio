import styles from '../page.module.scss';
import Bio from '@/components/Bio';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.backLink}>
        <a href="/">← Back to Command Center</a>
      </div>
      <h1 className={styles.pageTitle}>About Me</h1>
      <Bio />
      <TechStack />
      <Footer />
    </main>
  );
}
