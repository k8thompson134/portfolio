import styles from './page.module.scss';
import Link from 'next/link';
import CreativeCard from '@/components/CreativeCard';
import Footer from '@/components/Footer';

export default function SignalTuner() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Command Center
      </Link>

      <h1 className={styles.title}>Signal Tuner</h1>
      <p className={styles.tagline}>
        A signal decoder game played inside a Winamp 2 player, on a Windows 98 desktop at 3 AM.
      </p>

      <div className={styles.status}>
        <span className={styles.badge}>Status: Live</span>
        <span className={styles.badge}>TypeScript</span>
        <span className={styles.badge}>Vite</span>
        <span className={styles.badge}>Webamp</span>
        <span className={styles.badge}>Web Audio API</span>
        <span className={styles.badge}>localStorage</span>
        <a
          href="https://tuner.k8thompson.dev"
          className={styles.liveLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Live
        </a>
        <a
          href="https://github.com/k8thompson134/tuner-I-hardly-know-er-"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <div className={styles.intro}>
        <p>
          A quiet puzzle game with no timer and no fail state. Tune the dial through the static,
          clear the interference, and decode lyrics from love songs and breakup songs nobody was
          meant to hear; finishing a transmission unlocks the song it came from. It runs inside
          a working Winamp 2 player on a Windows 98 desktop, and works on a phone.
        </p>
      </div>

      <section className={styles.gallery}>
        <h2 className={styles.galleryTitle}>Screenshots</h2>
        <div className={styles.galleryGrid}>
          <CreativeCard
            title="Tuning a Transmission"
            category="Decoded words in the marquee and playlist"
            imageSrc="/images/signal-tuner-player.jpg"
            contain
          />
          <CreativeCard
            title="Clearing the Static"
            category="NOISE filter warning, Transmission 2"
            imageSrc="/images/signal-tuner-noise-filter.jpg"
            contain
          />
          <CreativeCard
            title="Unsent Letters"
            category="Recycle Bin and Notepad"
            imageSrc="/images/signal-tuner-unsent-letter.jpg"
            contain
          />
          <CreativeCard
            title="On a Phone"
            category="Tap a slider, swipe to tune"
            imageSrc="/images/signal-tuner-phone.jpg"
            portrait
            contain
          />
        </div>
        <p className={styles.referenceCaption}>
          The unlockable songs are by Kevin MacLeod (incompetech.com, CC BY 4.0) and Alex
          McCulloch. In-game titles and bands are fictional; the real credits are listed in the
          game under Start &rarr; Music Credits.
        </p>
      </section>

      <Footer />
    </main>
  );
}
