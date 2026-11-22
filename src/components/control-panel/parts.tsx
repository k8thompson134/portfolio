'use client';

import { useState, type ReactNode } from 'react';
import type { FeedStatus } from './useFeed';
import styles from './ControlPanel.module.scss';

export type Glow = 'green' | 'amber' | 'accent';

export function Lamp({ on, color = 'green', label }: { on: boolean; color?: 'green' | 'amber' | 'red'; label: string }) {
  return (
    <span className={styles.lampWrap}>
      <span className={`${styles.lamp} ${styles[`lamp-${color}`]} ${on ? styles.lampOn : ''}`} role="img" aria-label={`${label}: ${on ? 'on' : 'off'}`} />
      <span className={styles.lampLabel}>{label}</span>
    </span>
  );
}

// A screen "window" cut into the hardware: black glass, one glow color, scanlines
export function Screen({ glow, children, round = false }: { glow: Glow; children: ReactNode; round?: boolean }) {
  return <div className={`${styles.screen} ${styles[`glow-${glow}`]} ${round ? styles.round : ''}`}>{children}</div>;
}

export function Nixie({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.nixieBank} role="img" aria-label={`${label}: ${value}`}>
      {value.split('').map((ch, i) => (
        <span key={i} className={`${styles.tube} ${ch === '.' ? styles.tubeDot : ''}`}>
          <span className={styles.tubeGlyph}>{ch}</span>
        </span>
      ))}
    </div>
  );
}

// A round needle gauge with a printed scale, drawn in SVG
export function NeedleGauge({
  value,
  min,
  max,
  ticks,
  unit,
  zones = [],
}: {
  value: number | null;
  min: number;
  max: number;
  ticks: number[];
  unit: string;
  zones?: { from: number; to: number; label: string }[];
}) {
  const sweep = 240;
  const angleFor = (v: number) => -sweep / 2 + ((Math.min(max, Math.max(min, v)) - min) / (max - min)) * sweep;
  const point = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [100 + r * Math.cos(rad), 100 + r * Math.sin(rad)];
  };
  const arc = (from: number, to: number, r: number) => {
    const [x1, y1] = point(angleFor(from), r);
    const [x2, y2] = point(angleFor(to), r);
    const large = angleFor(to) - angleFor(from) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  const needle = value === null ? angleFor(min) : angleFor(value);

  return (
    <svg viewBox="0 0 200 170" className={styles.gauge} role="meter" aria-valuemin={min} aria-valuemax={max} aria-valuenow={value ?? undefined} aria-label={`Gauge, ${unit}`}>
      <path d={arc(min, max, 84)} className={styles.gaugeTrack} />
      {zones.map((z) => (
        <path key={z.label} d={arc(z.from, z.to, 84)} className={styles.gaugeZone} />
      ))}
      {ticks.map((t) => {
        const [x1, y1] = point(angleFor(t), 78);
        const [x2, y2] = point(angleFor(t), 88);
        const [tx, ty] = point(angleFor(t), 64);
        return (
          <g key={t}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.gaugeTick} />
            <text x={tx} y={ty} className={styles.gaugeNum}>
              {t}
            </text>
          </g>
        );
      })}
      <text x="100" y="128" className={styles.gaugeUnit}>
        {unit}
      </text>
      <g className={styles.needle} style={{ transform: `rotate(${needle}deg)` }}>
        <line x1="100" y1="112" x2="100" y2="24" />
      </g>
      <circle cx="100" cy="100" r="7" className={styles.hub} />
    </svg>
  );
}

// A phosphor trace of a series, with an optional "now" marker
export function ScopeTrace({ values, nowIndex, glow }: { values: number[]; nowIndex?: number; glow: Glow }) {
  const w = 300;
  const h = 120;
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = Math.max(1, (hi - lo) * 0.15);
  const y = (v: number) => h - ((v - (lo - pad)) / (hi - lo + pad * 2)) * h;
  const x = (i: number) => (i / (values.length - 1)) * w;
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`${styles.scope} ${styles[`glow-${glow}`]}`} aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <line key={`h${i}`} x1="0" x2={w} y1={(h / 4) * i} y2={(h / 4) * i} className={styles.scopeGrid} />
      ))}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={`v${i}`} y1="0" y2={h} x1={(w / 8) * i} x2={(w / 8) * i} className={styles.scopeGrid} />
      ))}
      <polyline points={points} className={styles.scopeTrace} />
      {nowIndex !== undefined && <line x1={x(nowIndex)} x2={x(nowIndex)} y1="0" y2={h} className={styles.scopeNow} />}
    </svg>
  );
}

// The physical module: screws, an engraved label plate, a power lamp, and a [?] key
// that flips the faceplate to a short manual page
export type Accent = 'cyan' | 'magenta' | 'green' | 'yellow' | 'orange';

export function RackModule({
  label,
  code,
  accent,
  meta,
  status,
  info,
  wide = false,
  children,
}: {
  label: string;
  code: string;
  accent: Accent;
  meta?: string;
  status: FeedStatus;
  info: ReactNode;
  wide?: boolean;
  children: ReactNode;
}) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <section className={`${styles.module} ${styles[`accent-${accent}`]} ${wide ? styles.wide : ''}`} aria-label={label}>
      <span className={`${styles.screw} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.br}`} aria-hidden="true" />
      <header className={styles.moduleHead}>
        <span className={styles.plate}>{label}</span>
        <span className={styles.code} aria-hidden="true">
          {code}
        </span>
        <Lamp on={status !== 'nosignal'} color={status === 'nosignal' ? 'red' : 'green'} label={status === 'nosignal' ? 'NO SIG' : 'PWR'} />
        <button type="button" className={styles.key} onClick={() => setShowInfo((v) => !v)} aria-expanded={showInfo}>
          {showInfo ? '[X]' : '[?]'}
        </button>
      </header>
      {showInfo ? (
        <Screen glow="amber">
          <div className={styles.manual}>{info}</div>
        </Screen>
      ) : status === 'nosignal' ? (
        <Screen glow="amber">
          <div className={styles.noSignal}>NO SIGNAL</div>
        </Screen>
      ) : (
        children
      )}
      {meta && (
        <span className={styles.meta} aria-hidden="true">
          {meta}
        </span>
      )}
    </section>
  );
}

export function EmptySlot({ label, code, accent }: { label: string; code: string; accent: Accent }) {
  return (
    <section className={`${styles.module} ${styles.empty} ${styles[`accent-${accent}`]}`} aria-label={`${label}, coming soon`}>
      <span className={`${styles.screw} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.br}`} aria-hidden="true" />
      <span className={styles.blankPlate}>{label}</span>
      <span className={styles.blankNote}>
        <span className={styles.code}>{code} {'//'} </span>NO MODULE
      </span>
    </section>
  );
}

// Analog VU-style meter: a short arc with a needle, for values that bounce
export function VuMeter({ value, max, label, unit }: { value: number | null; max: number; label: string; unit: string }) {
  const angle = value === null ? -50 : -50 + (Math.min(max, Math.max(0, value)) / max) * 100;
  const ticks = [0, 0.5, 1].map((f) => Math.round(f * max));
  const pos = (v: number, r: number) => {
    const rad = ((-50 + (v / max) * 100 - 90) * Math.PI) / 180;
    return [100 + r * Math.cos(rad), 110 + r * Math.sin(rad)];
  };
  return (
    <figure className={styles.vu}>
      <svg viewBox="0 0 200 120" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value ?? undefined} aria-label={`${label}, ${unit}`}>
        <path d={`M ${pos(0, 82).join(' ')} A 82 82 0 0 1 ${pos(max, 82).join(' ')}`} className={styles.gaugeTrack} />
        <path d={`M ${pos(max * 0.8, 82).join(' ')} A 82 82 0 0 1 ${pos(max, 82).join(' ')}`} className={styles.gaugeZone} />
        {ticks.map((t) => {
          const [x1, y1] = pos(t, 76);
          const [x2, y2] = pos(t, 88);
          const [tx, ty] = pos(t, 64);
          return (
            <g key={t}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.gaugeTick} />
              <text x={tx} y={ty} className={styles.gaugeNum}>
                {t}
              </text>
            </g>
          );
        })}
        <g className={styles.vuNeedle} style={{ transform: `rotate(${angle}deg)` }}>
          <line x1="100" y1="110" x2="100" y2="30" />
        </g>
      </svg>
      <figcaption className={styles.vuLabel}>
        {label} · {value === null ? '--' : Math.round(value)} {unit}
      </figcaption>
    </figure>
  );
}

// Magic-eye tuning tube: the dark wedge narrows as the value rises
export function MagicEye({ value, label }: { value: number | null; label: string }) {
  const open = value === null ? 90 : 90 - (Math.min(100, Math.max(0, value)) / 100) * 85;
  return (
    <div className={styles.eye} role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value ?? undefined} aria-label={label}>
      <div className={styles.eyeGlow} style={{ ['--open' as string]: `${open}deg` }} />
      <div className={styles.eyeCap} />
    </div>
  );
}

// A row of lit segments, each with its own color band
export function SegmentBar({
  value,
  segments,
  label,
}: {
  value: number | null;
  segments: { upTo: number; color: string }[];
  label: string;
}) {
  return (
    <div className={styles.segBar} role="meter" aria-valuenow={value ?? undefined} aria-valuemin={0} aria-valuemax={segments[segments.length - 1].upTo} aria-label={label}>
      {segments.map((seg, i) => {
        const from = i === 0 ? 0 : segments[i - 1].upTo;
        const lit = value !== null && value > from;
        return <span key={seg.upTo} className={`${styles.seg} ${lit ? styles.segOn : ''}`} style={{ ['--seg' as string]: seg.color }} />;
      })}
    </div>
  );
}

// Compass rose with a pointer showing where the wind comes from
export function Compass({ degrees }: { degrees: number | null }) {
  return (
    <svg viewBox="0 0 100 100" className={styles.compass} aria-hidden="true">
      <circle cx="50" cy="50" r="44" className={styles.gaugeTrack} />
      {['N', 'E', 'S', 'W'].map((d, i) => {
        const a = ((i * 90 - 90) * Math.PI) / 180;
        return (
          <text key={d} x={50 + 34 * Math.cos(a)} y={50 + 34 * Math.sin(a)} className={styles.gaugeNum}>
            {d}
          </text>
        );
      })}
      <g className={styles.compassNeedle} style={{ transform: `rotate(${degrees ?? 0}deg)` }}>
        <path d="M50 10 L55 50 L50 46 L45 50 Z" />
      </g>
      <circle cx="50" cy="50" r="4" className={styles.hub} />
    </svg>
  );
}
