import styles from './page.module.scss';
import Link from 'next/link';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import InspirationCompare from './InspirationCompare';
import Footer from '@/components/Footer';
import ArchitectureDiagram, { type DiagramBlock } from '@/components/ArchitectureDiagram';

const ARCHITECTURE: DiagramBlock[] = [
  {
    type: 'columns',
    blocks: [
      {
        type: 'boundary',
        label: 'Public',
        variant: 'public',
        blocks: [
          {
            type: 'tier',
            label: 'Client',
            nodes: [
              {
                id: 'pwa',
                name: 'Stormglass PWA',
                kind: 'client',
                tech: 'React · TypeScript · Workbox',
                link: { href: '#pressure-dynamics', label: 'The pressure chart' },
                detail:
                  'The installable app anyone can open: the pressure chart, condition forecasts, and air quality, with offline support. Web Push delivers opt-in alerts.',
              },
            ],
          },
        ],
      },
      {
        type: 'boundary',
        label: 'Owner only',
        variant: 'private',
        blocks: [
          {
            type: 'tier',
            label: 'Client',
            nodes: [
              {
                id: 'owner',
                name: 'My devices',
                kind: 'client',
                tech: 'Bearer token on the device',
                link: { href: '#public-forecasts-private-logs', label: 'Public forecasts, private logs' },
                detail:
                  'Symptom logs, trends, and location changes need a bearer token that stays on my device instead of being built into the public bundle.',
              },
            ],
          },
        ],
      },
    ],
  },
  { type: 'link', flows: ['HTTPS · public routes allowlisted', 'everything else needs the token'] },
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
            name: 'Fastify API',
            kind: 'service',
            tech: 'Node · TypeScript',
            link: { href: '#public-forecasts-private-logs', label: 'Access model' },
            detail:
              'Serves weather, forecasts, risk scoring, symptoms, and push subscriptions. Any route not explicitly marked public is denied by default.',
          },
          {
            id: 'risk',
            name: 'Risk engine',
            kind: 'service',
            tech: 'Per-condition scoring',
            link: { href: '#health-impact-forecast', label: 'The health forecast' },
            detail:
              'Scores 13 conditions against current conditions and the forecast, explains what is driving each risk, and decides which push alerts are worth sending.',
          },
        ],
      },
      { type: 'link', flows: ['SQL via Drizzle ORM'] },
      {
        type: 'tier',
        label: 'Data',
        nodes: [
          {
            id: 'pg',
            name: 'PostgreSQL',
            kind: 'data',
            tech: 'Drizzle ORM',
            link: { href: '#symptom-logging-trends', label: 'Symptom logging and trends' },
            detail:
              'Every reading, symptom log with its environmental snapshot, and push subscription. Symptom severity never appears in the public weather history.',
          },
        ],
      },
      { type: 'link', flows: ['node-cron → API'] },
      {
        type: 'tier',
        label: 'Schedulers',
        nodes: [
          {
            id: 'poll',
            name: 'Weather poll',
            kind: 'job',
            tech: 'Every 30 min · daily cleanup',
            detail:
              'Polls every source every 30 minutes, runs the alert checks, and trims the notification log nightly at 3am.',
          },
        ],
      },
    ],
  },
  { type: 'link', flows: ['HTTPS · every 30 min'] },
  {
    type: 'tier',
    label: 'External systems',
    nodes: [
      {
        id: 'weather',
        name: 'Weather and air APIs',
        kind: 'external',
        tech: 'Open-Meteo · PurpleAir · NOAA SWPC · Google Pollen',
        link: { href: '#air-quality-wildfire-smoke', label: 'Air quality' },
        detail:
          'Pressure, temperature, wind, UV, and regional AQI from Open-Meteo, hyperlocal ground sensors from PurpleAir, Kp and solar wind from NOAA, and pollen from Google. Every source has a free tier. PurpleAir and Pollen are optional: without their keys the app falls back to the regional air model and skips pollen.',
      },
      {
        id: 'push',
        name: 'Web Push',
        kind: 'external',
        tech: 'VAPID',
        detail:
          'Push services deliver opt-in alerts for the conditions with a clear, actionable trigger.',
      },
    ],
  },
];

export default function Stormglass() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Control Panel
      </Link>

      <h1 className={styles.title}>Stormglass</h1>
      <p className={styles.tagline}>
        Environmental health signals, turned into flare-risk forecasting.
      </p>

      <div className={styles.status}>
        <span className={styles.badge}>React</span>
        <span className={styles.badge}>TypeScript</span>
        <span className={styles.badge}>Fastify</span>
        <span className={styles.badge}>PostgreSQL</span>
        <span className={styles.badge}>Drizzle ORM</span>
        <span className={styles.badge}>Recharts</span>
        <span className={styles.badge}>PWA</span>
        <a
          href="https://mystormglass.xyz"
          className={styles.liveLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Live Site
        </a>
        <a
          href="https://github.com/k8thompson134/Stormglass"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <div className={styles.intro}>
        <p>
          Stormglass is a real-time environmental health tracker built for people
          with chronic illness. It correlates barometric pressure, air quality,
          geomagnetic activity, and pollen with symptom patterns to help forecast
          flare risk for conditions like ME/CFS, POTS, and migraines.
        </p>

        <p>
          The UI and feature set were inspired by a very outdated weather website I
          used for years to watch pressure graphs and anticipate bad symptom days.
          Stormglass modernizes that idea and expands it beyond pressure alone.
        </p>
      </div>

      <InspirationCompare />

      <div className={styles.panels}>
        <section id="pressure-dynamics" className={styles.panel}>
          <h2 className={styles.panelTitle}>Pressure Dynamics</h2>
          <p className={styles.panelDescription}>
            The main chart plots barometric pressure readings over selectable
            time windows (6h, 24h, 48h, 7d) with a toggleable temperature
            overlay and forecast line. It calculates swing magnitude,
            rate-of-change, and detects weather front passages, tagging them
            as events with severity ratings directly on the chart.
          </p>
        </section>

        <section id="health-impact-forecast" className={styles.panel}>
          <h2 className={styles.panelTitle}>Health Impact Forecast</h2>
          <p className={styles.panelDescription}>
            Checks 13 conditions, from POTS and migraines to Raynaud&apos;s and
            pollen sensitivity, against current conditions and the forecast, and
            each one can be turned on or off. Every condition gets a
            Low/Moderate/High/Severe risk level with a plain-language explanation
            of what is driving it, plus opt-in push notifications for the ones
            with a clear, actionable trigger. A &ldquo;Body Impact Level&rdquo;
            bar sums up overall flare risk at a glance.
          </p>
        </section>

        <section id="air-quality-wildfire-smoke" className={styles.panel}>
          <h2 className={styles.panelTitle}>Air Quality &amp; Wildfire Smoke</h2>
          <p className={styles.panelDescription}>
            Blends a regional air-quality model with hyperlocal PurpleAir ground
            sensors. Whichever reading is higher drives the risk score, so a
            nearby smoke plume the regional model misses still surfaces. Detects
            worsening or improving smoke trends, forecasts upcoming windows where
            air quality is expected to stay safe, and tracks cumulative exposure
            burden over time.
          </p>
        </section>

        <section id="symptom-logging-trends" className={styles.panel}>
          <h2 className={styles.panelTitle}>Symptom Logging &amp; Trends</h2>
          <p className={styles.panelDescription}>
            Logging a symptom records its severity and condition tags along with
            the environmental snapshot at that moment: pressure, temperature,
            humidity, air quality, geomagnetic activity, and more. Over time,
            the trends view ranks which factors line up with each person&apos;s
            own flares, highlights what tends to help them recover, and warns
            when several of their high-risk factors align at once.
            The whole app installs as a PWA and works offline.
          </p>
        </section>

        <section id="public-forecasts-private-logs" className={styles.panel}>
          <h2 className={styles.panelTitle}>Public Forecasts, Private Logs</h2>
          <p className={styles.panelDescription}>
            Weather, forecasts, and risk levels are open to anyone visiting the site.
            Symptom logs, trends, and location changes require a bearer token that
            stays on the owner&apos;s device rather than being built into the public
            bundle, and any route not explicitly marked public is denied by default.
            Public weather history omits symptom severity entirely.
          </p>
        </section>
      </div>

      <section className={styles.architecture}>
        <h2 className={styles.galleryTitle}>Architecture</h2>
        <ArchitectureDiagram title="Stormglass" notation="C4 · container view" blocks={ARCHITECTURE} />
      </section>

      <section className={styles.gallery}>
        <h2 className={styles.galleryTitle}>Screenshots</h2>
        <ScreenshotGallery
          className={styles.galleryGrid}
          items={[
            { title: 'Pressure Dynamics & Current Conditions', category: 'Dashboard', image: '/images/stormglass-dashboard.png' },
            { title: 'Health Impact Forecast', category: 'Condition Cards', image: '/images/stormglass-forecast.png' },
            { title: 'Condition Detail Modal', category: 'POTS / Dysautonomia', image: '/images/stormglass-detail.png' },
            { title: 'Air Quality & Safe-Window Forecast', category: 'Wildfire Smoke Tracking', image: '/images/stormglass-air-quality.jpg' },
            { title: 'Exposure Burden Tracking', category: 'Last 61 Days', image: '/images/stormglass-exposure-tracking.jpg' },
          ]}
        />
      </section>

      <Footer />
    </main>
  );
}
