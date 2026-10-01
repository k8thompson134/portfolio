import Link from 'next/link';
import styles from './AboutContent.module.scss';

export default function AboutContent() {
  return (
    <div className={styles.about}>
      <p className={styles.lede}>
        I&apos;m a software engineering student at MSOE who takes projects <span>from problem to production.</span>
      </p>
      <p>
        Right now that means a voice-first symptom tracker, a civic tech tool for Milwaukee, and a homelab with
        its own AI stack. I care most about software that is accessible, private by design, and useful to people
        the usual tools overlook.
      </p>
      <p>
        I work methodically: understand the problem, research solutions, gather requirements, then plan the
        implementation. Nearly a decade of organizing events taught me how to break large problems down, from
        Women in STEM meetups with my high school robotics team as a FIRST Ladies regional partner, to SWE
        conference planning, to cultural celebrations as outreach chair of my sorority.
      </p>
      <p>
        Beyond coding, I&apos;ve taught programming, written technical documentation people actually use, and
        done graphic design and visual communication.{' '}
        <Link href="/beyond-code" className={styles.link}>See the design and event work →</Link>
      </p>
    </div>
  );
}
