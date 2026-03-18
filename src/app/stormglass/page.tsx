import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Stormglass() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Command Center
      </Link>

      <h1 className={styles.title}>Stormglass</h1>
      <p className={styles.tagline}>
        Environmental health signals, turned into flare-risk forecasting.
      </p>

      <div className={styles.content}>
        <div className={styles.info}>
          <p>
            Stormglass is a real-time environmental health tracker built for people
            with chronic illness. It correlates barometric pressure, air quality,
            geomagnetic activity, and pollen with symptom patterns to help forecast
            flare risk for conditions like ME/CFS, POTS, and migraines.
          </p>

          <p className={styles.inspiration}>
            The UI and feature set were inspired by a very outdated weather website I
            used for years to watch pressure graphs and anticipate bad symptom days —
            Stormglass modernizes that idea and expands it beyond pressure alone.
          </p>

          <figure className={styles.reference}>
            <a
              href="http://www.curtronics.com/Weather/graphs/BaroByMinute.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.referenceLink}
            >
              <Image
                src="/images/curtronics-baro.png"
                alt="Screenshot of Curtronics Milwaukee Weather barometric pressure per minute graph page"
                width={1024}
                height={768}
                className={styles.referenceImage}
                priority
              />
            </a>
            <figcaption className={styles.referenceCaption}>
              Inspired by Curtronics&apos; barometric pressure graph page:{' '}
              <a
                href="http://www.curtronics.com/Weather/graphs/BaroByMinute.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.referenceLinkText}
              >
                curtronics.com/Weather/graphs/BaroByMinute.html
              </a>
            </figcaption>
          </figure>

          <div className={styles.status}>
            <span className={styles.badge}>Status: Live</span>
            <span className={styles.badge}>React</span>
            <span className={styles.badge}>TypeScript</span>
            <span className={styles.badge}>Fastify</span>
            <span className={styles.badge}>PostgreSQL</span>
            <span className={styles.badge}>Drizzle ORM</span>
            <span className={styles.badge}>Recharts</span>
            <span className={styles.badge}>PWA</span>

            <div className={styles.links}>
              <a
                href="https://mystormglass.xyz"
                className={styles.primaryLink}
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
          </div>
        </div>

        <div className={styles.panels}>
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Pressure Dynamics</h2>
            <p className={styles.panelDescription}>
              The main chart plots barometric pressure readings over selectable
              time windows (6h, 24h, 48h, 7d) with a toggleable temperature
              overlay and forecast line. It calculates swing magnitude,
              rate-of-change, and detects weather front passages — tagging them
              as events with severity ratings directly on the chart.
            </p>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Health Impact Forecast</h2>
            <p className={styles.panelDescription}>
              Evaluates 7 health conditions against current environmental data:
              POTS/Dysautonomia, Joint Pain, Migraine, ME/CFS/PEM, Air Quality,
              Geomagnetic Storms, and Pollen &amp; Mold. Each condition gets a
              Low/Moderate/High/Severe risk level with a plain-language explanation
              of which factors are driving it. A composite &ldquo;Body Impact
              Level&rdquo; bar summarizes overall flare risk at a glance.
            </p>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Current Conditions</h2>
            <p className={styles.panelDescription}>
              A live snapshot showing pressure (with trend badge and hourly
              rate-of-change), temperature, humidity, dew point, wind speed,
              24-hour pressure range vs. historic high, and US AQI with PM2.5/PM10
              breakdowns.
            </p>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Data Pipeline</h2>
            <p className={styles.panelDescription}>
              A Fastify backend polls Open-Meteo (pressure, temp, humidity, wind,
              UV, AQI), NOAA Space Weather (Kp index, solar wind), and
              Tomorrow.io (pollen) on a 30-minute cron. Readings are stored in
              PostgreSQL via Drizzle ORM. All data sources are free — no paid
              weather APIs, no cloud lock-in.
            </p>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Settings &amp; Personalization</h2>
            <p className={styles.panelDescription}>
              Users pick their location via geocoding search and toggle which
              health conditions to track. The app is installable as a PWA with
              offline support via Workbox for fast, app-like access on mobile.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
