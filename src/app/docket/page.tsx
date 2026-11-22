import styles from './page.module.scss';
import Link from 'next/link';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import Footer from '@/components/Footer';
import ArchitectureDiagram, { type DiagramBlock } from '@/components/ArchitectureDiagram';

const ARCHITECTURE: DiagramBlock[] = [
  {
    type: 'tier',
    label: 'Clients',
    nodes: [
      {
        id: 'site',
        name: 'Docket website',
        kind: 'client',
        tech: 'React · TypeScript · Vite · Vercel',
        link: { href: '#bill-feed', label: 'The bill feed' },
        detail:
          'The public site: the bill feed, bill pages with timelines and vote breakdowns, and alder profiles. Built on data the city already publishes.',
      },
      {
        id: 'inbox',
        name: 'Subscriber inbox',
        kind: 'client',
        tech: 'Email · no account',
        link: { href: '#email-alerts', label: 'Email alerts' },
        detail:
          'Residents subscribe by issue area, district, or alder and manage preferences from links in their email, with no login.',
      },
    ],
  },
  { type: 'link', flows: ['HTTPS · JSON API', 'email links → /manage/{token}'] },
  {
    type: 'boundary',
    label: 'Railway',
    variant: 'host',
    blocks: [
      {
        type: 'tier',
        label: 'Application',
        nodes: [
          {
            id: 'api',
            name: 'FastAPI',
            kind: 'service',
            tech: 'Python · SQLAlchemy · Alembic',
            link: { href: '#bill-feed', label: 'Features' },
            detail:
              'Serves the public API for bills, alders, votes, and subscriptions, and confirms and manages subscriptions from email links.',
          },
          {
            id: 'enrich',
            name: 'Enrichment',
            kind: 'service',
            tech: 'Runs after each poll',
            link: { href: '#plain-language-summaries', label: 'Summaries and tagging' },
            detail:
              'Sends each new bill to Claude Haiku for an 8th-grade summary and tags from a 13-category issue taxonomy.',
          },
        ],
      },
      { type: 'link', flows: ['SQL'] },
      {
        type: 'tier',
        label: 'Data',
        nodes: [
          {
            id: 'pg',
            name: 'PostgreSQL',
            kind: 'data',
            tech: '15 tables',
            link: { href: '#alder-profiles', label: 'Alder profiles' },
            detail:
              'Matters, alders, history, votes, subscribers, the notification queue, and the alert log. Council roles and committee memberships go back to 2004.',
          },
        ],
      },
      { type: 'link', flows: ['APScheduler → poller, enrichment, alerts'] },
      {
        type: 'tier',
        label: 'Schedulers',
        nodes: [
          {
            id: 'poll',
            name: 'Legistar poller',
            kind: 'job',
            tech: 'Hourly',
            link: { href: '#timeline-vote-breakdowns', label: 'Timelines and votes' },
            detail:
              'Polls Legistar every hour and upserts matters, votes, and alder records, then hands new bills to enrichment and queues alerts.',
          },
          {
            id: 'digest',
            name: 'Digest sender',
            kind: 'job',
            tech: '7am CT daily · weekly',
            link: { href: '#email-alerts', label: 'Email alerts' },
            detail:
              'Immediate alerts go out right away; daily and weekly digests drain from the queue at 7am Central.',
          },
        ],
      },
    ],
  },
  { type: 'link', flows: ['HTTPS'] },
  {
    type: 'tier',
    label: 'External systems',
    nodes: [
      {
        id: 'legistar',
        name: 'Legistar API',
        kind: 'external',
        tech: 'City of Milwaukee',
        link: { href: '#bill-feed', label: 'The bill feed' },
        detail:
          'The Common Council’s official legislative record: matters, histories, votes, and sponsors.',
      },
      {
        id: 'haiku',
        name: 'Claude Haiku',
        kind: 'external',
        tech: 'Anthropic API',
        link: { href: '#plain-language-summaries', label: 'Summaries and tagging' },
        detail:
          'Writes the plain-language summaries and issue tags for each new bill.',
      },
      {
        id: 'resend',
        name: 'Resend',
        kind: 'external',
        tech: 'Email delivery',
        link: { href: '#email-alerts', label: 'Email alerts' },
        detail:
          'Sends confirmation emails, immediate alerts, and digests.',
      },
    ],
  },
];

export default function Docket() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Control Panel
      </Link>

      <h1 className={styles.title}>Cream City Docket</h1>
      <p className={styles.tagline}>
        Milwaukee city government, made understandable.
      </p>

      <div className={styles.status}>
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
          into something residents can actually use: plain-English summaries, issue
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
        <section id="bill-feed" className={styles.panel}>
          <h2 className={styles.panelTitle}>Bill Feed &amp; Discovery</h2>
          <p className={styles.panelDescription}>
            Browses the full Common Council legislative record with filters for type,
            status, and issue area, plus keyword search across titles and summaries.
            An urgency-first sort surfaces bills with an imminent hearing or vote.
            The database polls the city&apos;s Legistar system hourly, so the feed
            reflects what City Hall actually has on file.
          </p>
        </section>

        <section id="plain-language-summaries" className={styles.panel}>
          <h2 className={styles.panelTitle}>Plain-Language Summaries &amp; Tagging</h2>
          <p className={styles.panelDescription}>
            An enrichment pipeline runs every new bill through Claude Haiku, producing
            an 8th-grade-reading-level summary and sorting it into a 13-category issue
            taxonomy (housing, labor, policing, small business, and more) so
            residents can find what affects them without parsing procedural language.
          </p>
        </section>

        <section id="alder-profiles" className={styles.panel}>
          <h2 className={styles.panelTitle}>Alder Profiles &amp; Vote Records</h2>
          <p className={styles.panelDescription}>
            Every alder gets a profile with an AI-generated legislative-focus summary,
            sponsored bills, full vote history, and a per-issue-area vote breakdown
            ranked against the rest of the council. A political history tab tracks
            council roles and committee memberships going back to 2004.
          </p>
        </section>

        <section id="timeline-vote-breakdowns" className={styles.panel}>
          <h2 className={styles.panelTitle}>Timeline &amp; Vote Breakdowns</h2>
          <p className={styles.panelDescription}>
            Each bill gets a full page tracking its path from introduction through
            committee, council, and mayoral action, with a yea/nay/other breakdown per
            alder and direct links back to the official Legistar record. Substitute
            amendments are flagged automatically as they&apos;re filed.
          </p>
        </section>

        <section id="email-alerts" className={styles.panel}>
          <h2 className={styles.panelTitle}>Email Alerts</h2>
          <p className={styles.panelDescription}>
            No-account email alerts by issue area, district, or specific alder, with
            immediate, daily-digest, or weekly-digest delivery. Alerts fire on bill
            introduction, hearings, council votes, and mayoral signatures or vetoes.
            Unsubscribe or change preferences any time, no login required.
          </p>
        </section>
      </div>

      <section className={styles.architecture}>
        <h2 className={styles.galleryTitle}>Architecture</h2>
        <ArchitectureDiagram title="Cream City Docket" notation="C4 · container view" blocks={ARCHITECTURE} />
      </section>

      <section className={styles.gallery}>
        <h2 className={styles.galleryTitle}>Screenshots</h2>
        <ScreenshotGallery
          className={styles.galleryGrid}
          items={[
            { title: 'Bill Feed', category: 'Discovery & Filtering', image: '/images/docket-bill-feed.jpg' },
            { title: 'Bill Detail', category: 'Timeline & Plain-Language Summary', image: '/images/docket-bill-detail.jpg' },
            { title: 'Alder Profile', category: 'Vote Records & Legislative Focus', image: '/images/docket-alder-profile.jpg' },
            { title: 'Email Alerts', category: 'Subscribe & Digest Settings', image: '/images/docket-subscribe.jpg' },
          ]}
        />
      </section>

      <Footer />
    </main>
  );
}
