import Link from 'next/link';
import styles from '../page.module.scss';
import { EntryList, LEADERSHIP, ROBOTICS, TEACHING } from '@/components/ExperienceTimeline';
import timeline from '@/components/ExperienceTimeline.module.scss';
import Footer from '@/components/Footer';

export default function ExperiencePage() {
  return (
    <main className={styles.main}>
      <div className={styles.backLink}>
        <Link href="/about">← Back to About</Link>
      </div>
      <h1 className={styles.pageTitle}>Robotics, Teaching &amp; Leadership</h1>
      <p className={styles.pageDescription}>
        I started programming on a robotics team in 8th grade, started teaching it almost right away, and have been organizing events for nearly as long.
      </p>

      <section className={timeline.section}>
        <h2 className={timeline.heading}>Robotics</h2>
        <EntryList entries={ROBOTICS} />
      </section>

      <section className={timeline.section}>
        <h2 className={timeline.heading}>Teaching</h2>
        <EntryList entries={TEACHING} />
      </section>

      <section className={timeline.section}>
        <h2 className={timeline.heading}>Leadership</h2>
        <EntryList entries={LEADERSHIP} />
      </section>

      <Footer />
    </main>
  );
}
