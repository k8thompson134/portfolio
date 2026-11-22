import Link from 'next/link';
import BarometerModule from '@/components/control-panel/BarometerModule';
import { EmptySlot } from '@/components/control-panel/parts';
import { ConditionsModule, SpaceWeatherModule, WindModule } from '@/components/control-panel/WeatherModules';
import styles from '@/components/control-panel/ControlPanel.module.scss';
import Footer from '@/components/Footer';
import { pixel, terminal } from '@/components/control-panel/fonts';

export default function ControlPanelPage() {
  return (
    <main className={`${styles.page} ${pixel.variable} ${terminal.variable}`}>
      <Link href="/" className={styles.back}>
        ← Back to Control Panel
      </Link>

      <div className={styles.rack}>
        <header className={styles.rackHead}>
          <span className={styles.brand}>K8 TELEMETRY</span>
          <span className={styles.model}>MODEL MKE-1 · LIVE PUBLIC FEEDS</span>
          <span className={styles.hex} aria-hidden="true">
            SYS 0x4B38 · NODE MKE · 43.0389N 87.9065W
          </span>
        </header>

        <div className={styles.grid}>
          <BarometerModule />
          <WindModule />
          <ConditionsModule />
          <EmptySlot label="LAKE MICHIGAN" code="MOD-04" accent="cyan" />
          <EmptySlot label="MOON PHASE" code="MOD-06" accent="yellow" />
          <SpaceWeatherModule />
          <EmptySlot label="DOCKET TICKER" code="MOD-07" accent="green" />
          <EmptySlot label="RADIO" code="MOD-08" accent="orange" />
          <EmptySlot label="TRIVIA" code="MOD-09" accent="cyan" />
        </div>

        <footer className={styles.statusBar}>
          <span>[?] MANUAL</span>
          <span>[TAP] OPERATE</span>
          <span className={styles.statusRight}>ALL DATA PUBLIC · NO TRACKING</span>
        </footer>
      </div>

      <Footer />
    </main>
  );
}
