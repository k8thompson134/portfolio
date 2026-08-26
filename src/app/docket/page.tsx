import styles from './page.module.scss';
import Link from 'next/link';
import CreativeCard from '@/components/CreativeCard';

export default function Docket() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Command Center
      </Link>

      <h1 className={styles.title}>Cream City Docket</h1>
      <p className={styles.tagline}>
        Milwaukee city government, made understandable.
      </p>

      <div className={styles.status}>
        <span className={styles.badge}>Status: Live</span>
        <span className={styles.badge}>React</span>
        <span className={styles.badge}>TypeScript</span>
        <span className={styles.badge}>Python</span>
        <span className={styles.badge}>FastAPI</span>
        <span className={styles.badge}>PostgreSQL</span>
        <span className={styles.badge}>Claude API</span>
        <a
          href="https://creamcitydocket.com"
          className={styles.liveLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Live Site
        </a>
        <a
          href="https://github.com/k8thompson134/Cream-City-Docket"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <div className={styles.intro}>
        <p>
          Cream City Docket monitors Milwaukee Common Council legislation and turns it
          into something residents can actually use — plain-English summaries, issue
          tagging, and email alerts that land before a vote happens, not after.
        </p>

        <p>
          City legislative records are technically public, but they live in a legacy
          interface built for clerks, not residents, and often surface only once a
          decision is already final. Cream City Docket starts with Milwaukee&apos;s
          Common Council and turns that same public data into something people can
          track and act on in time.
        </p>
      </div>

      <div className={styles.panels}>
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Bill Feed &amp; Discovery</h2>
          <p className={styles.panelDescription}>
            Browses the full Common Council legislative record with filters for type,
            status, and issue area, plus keyword search across titles and summaries.
            An urgency-first sort surfaces bills with an imminent hearing or vote.
            The database polls the city&apos;s Legistar system hourly, so the feed
            reflects what City Hall actually has on file.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Plain-Language Summaries &amp; Tagging</h2>
          <p className={styles.panelDescription}>
            An enrichment pipeline runs every new bill through Claude Haiku, producing
            an 8th-grade-reading-level summary and sorting it into a 13-category issue
            taxonomy — housing, labor, policing, small business, and more — so
            residents can find what affects them without parsing procedural language.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Alder Profiles &amp; Vote Records</h2>
          <p className={styles.panelDescription}>
            Every alder gets a profile with an AI-generated legislative-focus summary,
            sponsored bills, full vote history, and a per-issue-area vote breakdown
            ranked against the rest of the council. A political history tab tracks
            council roles and committee memberships going back to 2004.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Timeline &amp; Vote Breakdowns</h2>
          <p className={styles.panelDescription}>
            Each bill gets a full page tracking its path from introduction through
            committee, council, and mayoral action, with a yea/nay/other breakdown per
            alder and direct links back to the official Legistar record. Substitute
            amendments are flagged automatically as they&apos;re filed.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Email Alerts</h2>
          <p className={styles.panelDescription}>
            No-account email alerts by issue area, district, or specific alder, with
            immediate, daily-digest, or weekly-digest delivery. Alerts fire on bill
            introduction, hearings, council votes, and mayoral signatures or vetoes —
            unsubscribe or change preferences any time, no login required.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Data Pipeline</h2>
          <p className={styles.panelDescription}>
            A FastAPI backend polls the Legistar API on an hourly schedule, storing
            matters, alders, and vote history in PostgreSQL. A React and TypeScript
            frontend serves the public site, deployed on Railway (backend) and Vercel
            (frontend) — all built on data the city already publishes.
          </p>
        </section>
      </div>

      <section className={styles.gallery}>
        <h2 className={styles.galleryTitle}>Screenshots</h2>
        <div className={styles.galleryGrid}>
          <CreativeCard
            title="Bill Feed"
            category="Discovery & Filtering"
            imageSrc="/images/docket-bill-feed.jpg"
            contain
          />
          <CreativeCard
            title="Bill Detail"
            category="Timeline & Plain-Language Summary"
            imageSrc="/images/docket-bill-detail.jpg"
            contain
          />
          <CreativeCard
            title="Alder Profile"
            category="Vote Records & Legislative Focus"
            imageSrc="/images/docket-alder-profile.jpg"
            contain
          />
          <CreativeCard
            title="Email Alerts"
            category="Subscribe & Digest Settings"
            imageSrc="/images/docket-subscribe.jpg"
            contain
          />
        </div>
      </section>
    </main>
  );
}
