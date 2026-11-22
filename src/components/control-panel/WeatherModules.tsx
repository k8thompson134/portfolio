'use client';

import { useFeed } from './useFeed';
import { Compass, Lamp, MagicEye, Nixie, RackModule, SegmentBar, Screen, VuMeter } from './parts';
import styles from './ControlPanel.module.scss';

const MKE = 'latitude=43.0389&longitude=-87.9065';
const HALF_HOUR = 30 * 60 * 1000;

// ---------- Wind ----------

const WIND_URL = `https://api.open-meteo.com/v1/forecast?${MKE}&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m&wind_speed_unit=mph`;

interface Wind {
  speed: number;
  gusts: number;
  direction: number;
}

function parseWind(json: unknown): Wind {
  const c = (json as { current: { wind_speed_10m: number; wind_gusts_10m: number; wind_direction_10m: number } }).current;
  return { speed: c.wind_speed_10m, gusts: c.wind_gusts_10m, direction: c.wind_direction_10m };
}

const POINTS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

// Beaufort scale, in mph
function beaufort(mph: number): string {
  const scale: [number, string][] = [
    [1, 'CALM'],
    [8, 'LIGHT BREEZE'],
    [13, 'GENTLE BREEZE'],
    [19, 'MODERATE BREEZE'],
    [25, 'FRESH BREEZE'],
    [32, 'STRONG BREEZE'],
    [39, 'NEAR GALE'],
    [47, 'GALE'],
  ];
  return scale.find(([max]) => mph < max)?.[1] ?? 'STRONG GALE';
}

export function WindModule() {
  const { data, status } = useFeed('mke-wind', WIND_URL, HALF_HOUR, parseWind);
  const point = data ? POINTS[Math.round(data.direction / 22.5) % 16] : '---';

  return (
    <RackModule
      label="WIND · MKE"
      code="MOD-02"
      accent="magenta"
      meta="10 M ABOVE GROUND · SRC OPEN-METEO · REFRESH 30M"
      status={status}
      info={
        <>
          <p>&gt; WIND AT 10 METERS, MILWAUKEE</p>
          <p>Sustained speed and gusts in mph from Open-Meteo, plus the direction the wind is blowing from. The label underneath is the Beaufort scale.</p>
        </>
      }
    >
      <Screen glow="accent">
        <div className={styles.vuPair}>
          <VuMeter value={data?.speed ?? null} max={40} label="SPEED" unit="MPH" />
          <VuMeter value={data?.gusts ?? null} max={40} label="GUSTS" unit="MPH" />
        </div>
      </Screen>
      <div className={styles.windRow}>
        <Compass degrees={data?.direction ?? null} />
        <div className={styles.baroSide}>
          <span className={styles.engraved}>FROM</span>
          <span className={styles.bigRead}>
            {point} {data ? `${Math.round(data.direction)}°` : ''}
          </span>
          <span className={styles.readout}>{data ? beaufort(data.speed) : 'WAITING'}</span>
        </div>
      </div>
    </RackModule>
  );
}

// ---------- Conditions: temperature, humidity, air quality ----------

const COND_URL = `https://api.open-meteo.com/v1/forecast?${MKE}&current=temperature_2m,apparent_temperature,relative_humidity_2m&temperature_unit=fahrenheit`;
const AIR_URL = `https://air-quality-api.open-meteo.com/v1/air-quality?${MKE}&current=us_aqi,pm2_5`;

interface Conditions {
  temp: number;
  feels: number;
  humidity: number;
}

interface Air {
  aqi: number;
  pm25: number;
}

function parseConditions(json: unknown): Conditions {
  const c = (json as { current: { temperature_2m: number; apparent_temperature: number; relative_humidity_2m: number } }).current;
  return { temp: c.temperature_2m, feels: c.apparent_temperature, humidity: c.relative_humidity_2m };
}

function parseAir(json: unknown): Air {
  const c = (json as { current: { us_aqi: number; pm2_5: number } }).current;
  return { aqi: c.us_aqi, pm25: c.pm2_5 };
}

// EPA AQI categories, the same bands Stormglass uses
const AQI_BANDS = [
  { upTo: 50, color: '#39ff6a', name: 'GOOD' },
  { upTo: 100, color: '#ffe23f', name: 'MODERATE' },
  { upTo: 150, color: '#ff9a3f', name: 'SENSITIVE' },
  { upTo: 200, color: '#ff4a3d', name: 'UNHEALTHY' },
  { upTo: 300, color: '#c04bff', name: 'VERY UNHEALTHY' },
  { upTo: 500, color: '#8a1a3a', name: 'HAZARDOUS' },
];

export function ConditionsModule() {
  const cond = useFeed('mke-conditions', COND_URL, HALF_HOUR, parseConditions);
  const air = useFeed('mke-air', AIR_URL, HALF_HOUR, parseAir);
  const status = cond.status === 'nosignal' && air.status === 'nosignal' ? 'nosignal' : cond.status;
  const band = air.data ? AQI_BANDS.find((b) => air.data!.aqi <= b.upTo) ?? AQI_BANDS[AQI_BANDS.length - 1] : null;

  return (
    <RackModule
      label="CONDITIONS · MKE"
      code="MOD-03"
      accent="yellow"
      meta="SRC OPEN-METEO + CAMS AIR QUALITY · REFRESH 30M"
      status={status}
      info={
        <>
          <p>&gt; TEMPERATURE, HUMIDITY, AIR QUALITY</p>
          <p>
            Temperature in °F on the nixies. The green tuning eye closes as relative humidity rises. The bar is the US AQI, with the
            same EPA bands Stormglass uses for its air-quality risk.
          </p>
        </>
      }
    >
      <div className={styles.condRow}>
        <div className={styles.baroSide}>
          <span className={styles.engraved}>TEMP °F</span>
          <Nixie value={cond.data ? String(Math.round(cond.data.temp)).padStart(2, ' ') : '--'} label="Temperature in Fahrenheit" />
          <span className={styles.readout}>FEELS {cond.data ? Math.round(cond.data.feels) : '--'}°</span>
        </div>
        <div className={styles.eyeWrap}>
          <span className={styles.engraved}>HUMIDITY</span>
          <MagicEye value={cond.data?.humidity ?? null} label={`Relative humidity ${cond.data?.humidity ?? ''} percent`} />
          <span className={styles.readout}>{cond.data ? `${cond.data.humidity}%` : '--'}</span>
        </div>
      </div>
      <span className={styles.engraved}>AIR QUALITY · US AQI</span>
      <SegmentBar value={air.data?.aqi ?? null} segments={AQI_BANDS} label={`US AQI ${air.data?.aqi ?? ''}`} />
      <span className={styles.readout}>
        {air.data && band ? `AQI ${air.data.aqi} · ${band.name} · PM2.5 ${air.data.pm25.toFixed(1)}` : 'WAITING'}
      </span>
    </RackModule>
  );
}

// ---------- Space weather ----------

const KP_URL = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json';
const SOLAR_URL = 'https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json';

function parseKp(json: unknown): number[] {
  return (json as { Kp: number }[]).slice(-24).map((r) => r.Kp);
}

function parseSolar(json: unknown): number {
  return (json as { proton_speed: number }[])[0].proton_speed;
}

export function SpaceWeatherModule() {
  const kp = useFeed('swpc-kp', KP_URL, HALF_HOUR, parseKp);
  const solar = useFeed('swpc-solar', SOLAR_URL, 10 * 60 * 1000, parseSolar);
  const latest = kp.data ? kp.data[kp.data.length - 1] : null;
  // NOAA G-scale starts at Kp 5; aurora can reach Milwaukee's horizon around Kp 6
  const storm = latest !== null && latest >= 5;
  const aurora = latest !== null && latest >= 6;

  return (
    <RackModule
      label="SPACE WEATHER"
      code="MOD-05"
      accent="magenta"
      wide
      meta="SRC NOAA SWPC · KP EVERY 3H · SOLAR WIND LIVE"
      status={kp.status}
      info={
        <>
          <p>&gt; GEOMAGNETIC ACTIVITY</p>
          <p>
            The planetary Kp index from NOAA, 0 to 9, for the last three days in 3-hour bars. Kp 5 and up is a geomagnetic storm, and around
            Kp 6 the aurora can show up on Milwaukee&apos;s northern horizon.
          </p>
          <p>Stormglass tracks Kp too, since some people report symptoms during storms.</p>
        </>
      }
    >
      <Screen glow="accent">
        <div className={styles.kpChart} aria-label={`Kp index, latest ${latest ?? 'unknown'}`} role="img">
          {(kp.data ?? Array(24).fill(0)).map((v, i) => (
            <span key={i} className={`${styles.kpBar} ${v >= 5 ? styles.kpStorm : ''}`} style={{ height: `${Math.max(4, (v / 9) * 100)}%` }} />
          ))}
        </div>
      </Screen>
      <div className={styles.spaceRow}>
        <div className={styles.baroSide}>
          <span className={styles.engraved}>KP NOW</span>
          <span className={styles.bigRead}>{latest !== null ? latest.toFixed(1) : '-.-'}</span>
        </div>
        <div className={styles.baroSide}>
          <span className={styles.engraved}>SOLAR WIND</span>
          <span className={styles.bigRead}>{solar.data ? `${Math.round(solar.data)}` : '---'}</span>
          <span className={styles.readout}>KM/S</span>
        </div>
        <div className={styles.lampCol}>
          <Lamp on={storm} color="amber" label="STORM" />
          <Lamp on={aurora} color="green" label="AURORA" />
        </div>
      </div>
    </RackModule>
  );
}
