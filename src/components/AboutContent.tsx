import Link from 'next/link';
import styles from './AboutContent.module.scss';

export default function AboutContent() {
  return (
    <div className={styles.about}>
      <p className={styles.lede}>
        I build software for <span>the people the usual tools overlook.</span>
      </p>
      <p>
        I like the part before the code. My projects start with research and requirements: Stormglass started from
        years of watching pressure graphs on an outdated weather site, Pattern Maker from noticing that every
        cross-stitch tool converts photos and none let you compose, and Lair&apos;s home feed from measuring which
        kinds of logging I actually kept up with. Planning first means less rebuilding later.
      </p>

      <section className={styles.section}>
        <h2 className={styles.heading}>Designing for Bad Days</h2>
        <p>
          Accessibility usually means contrast, screen readers, and touch targets, and those matter. I also design
          for energy and cognitive load, the days a user is exhausted, foggy, or in pain and every extra tap costs
          something. That is why <Link href="/ranttrack" className={styles.inlineLink}>RantTrack</Link> takes a
          rant instead of a form, <Link href="/local-personal-ai" className={styles.inlineLink}>Lair</Link>&apos;s
          check-in is all taps, and <Link href="/stormglass" className={styles.inlineLink}>Stormglass</Link> warns
          before the weather turns.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Teaching &amp; Leadership</h2>
        <p>
          I have been teaching programming since middle school robotics, and organizing events for nearly as long,
          from FIRST Ladies meetups for girls in robotics to SWE&apos;s Hands-On Future conference and multicultural
          celebrations as an outreach chair.{' '}
          <Link href="/experience" className={styles.link}>See the timeline →</Link>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Beyond Code</h2>
        <p>
          Posters, logos, campaign art, cross-stitch, collage journals, and 3D renders.{' '}
          <Link href="/beyond-code" className={styles.link}>See the creative work →</Link>
        </p>
      </section>
    </div>
  );
}
