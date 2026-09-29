import styles from './page.module.scss';
import Link from 'next/link';
import CreativeCard from '@/components/CreativeCard';
import Footer from '@/components/Footer';

const SAMPLERS = [
  {
    name: 'Happy Haunting',
    detail: '76×80 stitches · Checker border, italic lettering, rotated and grouped icons',
    design: '/images/pattern-maker-happy-haunting-design.jpg',
    chart: '/images/pattern-maker-happy-haunting-chart.jpg',
    phone: '/images/pattern-maker-happy-haunting-phone.jpg',
  },
  {
    name: 'Cozy Corner',
    detail: '60×52 stitches · Heart border, block lettering, tea and home icons',
    design: '/images/pattern-maker-cozy-corner-design.jpg',
    chart: '/images/pattern-maker-cozy-corner-chart.jpg',
    phone: '/images/pattern-maker-cozy-corner-phone.jpg',
  },
];

export default function PatternMaker() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Command Center
      </Link>

      <h1 className={styles.title}>Pattern Maker</h1>
      <p className={styles.tagline}>
        Compose cross-stitch patterns from text and icons, right in the browser.
      </p>

      <div className={styles.status}>
        <span className={styles.badge}>Status: Live</span>
        <span className={styles.badge}>React</span>
        <span className={styles.badge}>TypeScript</span>
        <span className={styles.badge}>Vite</span>
        <span className={styles.badge}>SVG Canvas</span>
        <span className={styles.badge}>jsPDF</span>
        <span className={styles.badge}>localStorage</span>
        <a
          href="https://patterns.k8thompson.dev"
          className={styles.liveLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Live Site
        </a>
        <a
          href="https://github.com/k8thompson134/pattern-maker"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <div className={styles.intro}>
        <p>
          Pattern Maker is a composition tool for small cross-stitch designs. Instead of
          converting a photo into a pattern, it starts from text, a curated icon library,
          borders, and freehand stitches, and lets you arrange them on a grid the way you
          would lay out a sampler.
        </p>

        <p>
          There is no backend: designs live in the browser, and the finished pattern exports
          as a printable PDF chart with symbols, a DMC thread legend, and stitch counts. The
          layout is built to work on a phone, with tap controls alongside drag and resize.
        </p>
      </div>

      <div className={styles.panels}>
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Text &amp; Icons</h2>
          <p className={styles.panelDescription}>
            Bitmap fonts in several sizes and styles, including accented characters, plus a
            growing icon library across themes like cozy, celebration, spooky, and care.
            Custom icons can be drawn in an editor and saved for reuse.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Arrange &amp; Edit</h2>
          <p className={styles.panelDescription}>
            Drag, resize, rotate, group, align, and layer objects, then paint individual
            stitches for small details. Undo and redo cover every edit, and multiple designs
            can be saved side by side.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Printable Charts</h2>
          <p className={styles.panelDescription}>
            PDF export flattens the design into a chart with heavy ten-stitch lines, center
            arrows, a symbol per color, and a DMC legend. Larger patterns split across pages
            with an overview.
          </p>
        </section>
      </div>

      <section className={styles.gallery}>
        <h2 className={styles.galleryTitle}>Samplers</h2>
        {SAMPLERS.map((s) => (
          <div key={s.name}>
            <h3 className={styles.samplerName}>{s.name}</h3>
            <p className={styles.samplerDetail}>{s.detail}</p>
            <div className={styles.galleryGrid}>
              <CreativeCard title={s.name} category="Design" imageSrc={s.design} contain />
              <CreativeCard title={`${s.name} chart`} category="Exported PDF with DMC legend" imageSrc={s.chart} contain />
              <CreativeCard title={`${s.name} on mobile`} category="Editing on a phone" imageSrc={s.phone} contain />
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
