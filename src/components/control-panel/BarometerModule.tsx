'use client';

import { useFeed } from './useFeed';
import { Lamp, NeedleGauge, Nixie, RackModule, Screen, ScopeTrace } from './parts';
import styles from './ControlPanel.module.scss';

const URL =
  'https://api.open-meteo.com/v1/forecast?latitude=43.0389&longitude=-87.9065' +
  '&hourly=pressure_msl&current=pressure_msl&past_days=1&forecast_days=2&timezone=America%2FChicago';

interface Pressure {
  now: number;
  nowTime: string;
  times: string[];
  hourly: number[];
}

function parse(json: unknown): Pressure {
  const j = json as { current: { pressure_msl: number; time: string }; hourly: { time: string[]; pressure_msl: number[] } };
  return { now: j.current.pressure_msl, nowTime: j.current.time, times: j.hourly.time, hourly: j.hourly.pressure_msl };
}

// Lair's definition of a pressure swing: a day with a 9+ hPa range, or an 8+ hPa
// shift in the daily mean from the day before
function swingAhead(p: Pressure): boolean {
  const days = new Map<string, number[]>();
  p.times.forEach((t, i) => {
    const day = t.slice(0, 10);
    days.set(day, [...(days.get(day) ?? []), p.hourly[i]]);
  });
  const today = p.nowTime.slice(0, 10);
  const keys = [...days.keys()].sort();
  const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
  return keys.some((day, i) => {
    if (day < today) return false;
    const v = days.get(day)!;
    const range = Math.max(...v) - Math.min(...v);
    const shift = i > 0 ? Math.abs(mean(v) - mean(days.get(keys[i - 1])!)) : 0;
    return range >= 9 || shift >= 8;
  });
}

export default function BarometerModule() {
  const { data, status } = useFeed('mke-pressure', URL, 30 * 60 * 1000, parse);

  const nowIndex = data ? Math.max(0, data.times.findIndex((t) => t > data.nowTime) - 1) : 0;
  const past3h = data ? data.hourly[Math.max(0, nowIndex - 3)] : null;
  const trend = data && past3h !== null ? data.now - past3h : 0;
  const trendLabel = trend > 0.5 ? 'RISING' : trend < -0.5 ? 'FALLING' : 'STEADY';
  const swing = data ? swingAhead(data) : false;

  return (
    <RackModule
      label="BAROMETER · MKE"
      code="MOD-01"
      accent="cyan"
      meta="LAT 43.04N · LON 87.91W · SRC OPEN-METEO · REFRESH 30M"
      status={status}
      wide
      info={
        <>
          <p>&gt; SEA-LEVEL PRESSURE, MILWAUKEE</p>
          <p>Live from Open-Meteo, refreshed every 30 minutes. The scope shows yesterday, today, and tomorrow, with the cursor at now.</p>
          <p>
            The SWING lamp uses the same rule as Lair: a day with a 9+ hPa range, or an 8+ hPa shift from the day before. Big
            swings are when a lot of people with chronic illness feel it, which is why Stormglass exists.
          </p>
        </>
      }
    >
      <div className={styles.baroFace}>
        <div className={styles.baroDial}>
          <Screen glow="accent" round>
            <span className={styles.polar} aria-hidden="true" />
            <NeedleGauge
              value={data?.now ?? null}
              min={980}
              max={1040}
              ticks={[980, 995, 1010, 1025, 1040]}
              unit="hPa"
              zones={[{ from: 980, to: 995, label: 'storm' }]}
            />
          </Screen>
        </div>
        <div className={styles.baroSide}>
          <span className={styles.engraved}>PRESSURE</span>
          <Nixie value={data ? data.now.toFixed(1) : '----.-'} label="Pressure in hectopascals" />
          <div className={styles.lampRow}>
            <Lamp on={trendLabel === 'RISING'} color="green" label="RISE" />
            <Lamp on={trendLabel === 'STEADY'} color="amber" label="STEADY" />
            <Lamp on={trendLabel === 'FALLING'} color="amber" label="FALL" />
            <Lamp on={swing} color="red" label="SWING" />
          </div>
          <span className={styles.readout}>
            3H {trend >= 0 ? '+' : ''}
            {trend.toFixed(1)} hPa · {trendLabel}
          </span>
        </div>
      </div>
      <span className={styles.engraved}>72 HOUR TRACE</span>
      <Screen glow="green">
        {data ? <ScopeTrace values={data.hourly} nowIndex={nowIndex} glow="green" /> : <div className={styles.warming}>WARMING UP…</div>}
      </Screen>
      <div className={styles.traceAxis} aria-hidden="true">
        <span>YESTERDAY</span>
        <span>TODAY</span>
        <span>TOMORROW</span>
      </div>
    </RackModule>
  );
}
