import styles from './page.module.scss';
import Link from 'next/link';
import Footer from '@/components/Footer';

const SERVICES = [
  {
    name: 'Ollama',
    purpose: 'Local LLM inference',
    memory: '~7.3 GB model file, memory-mapped',
    detail:
      'Runs natively for Metal acceleration and unified memory. The primary model is a text-only Gemma 3 12B tag built from the same weights without the vision projector, so it loads memory-mapped (reclaimable) instead of as ~9 GB of swappable memory; the vision version loads only for image calls. Llama 3.2 1B handles light tasks. Keep-alive is set by priority: 30 minutes after interactive use, 10 after batch jobs. Flash attention and a q8_0 KV cache trim the footprint further.',
  },
  {
    name: 'whisper.cpp',
    purpose: 'Local speech-to-text',
    memory: '~600 MB while running',
    detail:
      'Metal-accelerated transcription for voice notes. Started on the first audio request and stopped after 10 idle minutes, instead of holding memory all day.',
  },
  {
    name: 'n8n',
    purpose: 'Workflow automation',
    memory: '768 MB cap',
    detail:
      'Runs a few timed jobs, like the morning briefing note and a Spotify sync, plus a provider-search webhook. Most nightly data jobs run as launchd agents instead, so they do not depend on Docker being up.',
  },
  {
    name: 'ChromaDB',
    purpose: 'Vector database',
    memory: '512 MB cap',
    detail:
      'Embeddings for semantic search over the notes vault, symptom history, and writing samples (retrieval for chat and voice-matched drafting).',
  },
  {
    name: 'Gitea',
    purpose: 'Self-hosted Git',
    memory: '512 MB cap',
    detail: 'Hosts the Lair repository and other private projects.',
  },
  {
    name: 'SearXNG',
    purpose: 'Private metasearch',
    memory: '512 MB cap, off by default',
    detail:
      'Behind a Compose profile and started only when web search is needed; features that use it log a warning and degrade instead of failing.',
  },
];

export default function HomelabPage() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Control Panel
      </Link>

      <h1 className={styles.title}>Homelab Infrastructure</h1>
      <p className={styles.tagline}>A local AI stack and 50+ scheduled jobs on one 16 GB Mac mini.</p>

      <div className={styles.status}>
        <span className={styles.badge}>macOS launchd</span>
        <span className={styles.badge}>Docker Compose</span>
        <span className={styles.badge}>Ollama</span>
        <span className={styles.badge}>whisper.cpp</span>
        <span className={styles.badge}>ChromaDB</span>
        <span className={styles.badge}>Gitea</span>
        <span className={styles.badge}>Tailscale</span>
        <span className={styles.badge}>Cloudflare Tunnel</span>
      </div>

      <div className={styles.intro}>
        <p>
          A Mac mini M4 with 16 GB of memory runs everything: the{' '}
          <Link href="/local-personal-ai" className={styles.inlineLink}>Local Personal AI System</Link>, a local
          language model, speech-to-text, a vector database, self-hosted Git, workflow automation, and more than 50
          launchd jobs. Some services run in Docker; the ones that need the GPU or the external drive run natively.
        </p>
        <p>
          A 12B-parameter model alone wants about half the machine&apos;s memory. Fitting it alongside a Docker VM, other
          services, and dozens of background jobs means treating memory as a budget: measuring
          where it actually goes, deciding which services earn a permanent slot, and starting the rest only when they
          are needed. All of it has to recover on its own after the frequent power outages, without anyone on site.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Architecture</h2>
        <pre className={styles.diagram}>{`Mac mini M4 · 16 GB
├── Native (launchd)
│   ├── Lair API
│   ├── Ollama (Metal GPU)
│   └── whisper.cpp (on demand)
├── Docker Desktop VM (2.5 GB)
│   ├── n8n · ChromaDB · Gitea
│   └── SearXNG (optional profile)
└── Network
    ├── Tailscale (private)
    └── Cloudflare Tunnel (public page)`}</pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Services and Memory Budget</h2>
        <div className={styles.panels}>
          {SERVICES.map((service) => (
            <section key={service.name} className={styles.panel}>
              <h3 className={styles.panelTitle}>{service.name}</h3>
              <p className={styles.meta}>
                {service.purpose} · {service.memory}
              </p>
              <p className={styles.panelDescription}>{service.detail}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Design Decisions</h2>
        <ul className={styles.lessons}>
          <li>
            <strong>Local by default.</strong> Personal data and most model calls stay on the machine. Cloud APIs are
            per-task choices, not core dependencies.
          </li>
          <li>
            <strong>Native where it matters.</strong> Containers by default; native for anything that needs the GPU or
            the external drive.
          </li>
          <li>
            <strong>A measured memory budget.</strong> Every container has <code>mem_limit</code> and{' '}
            <code>memswap_limit</code> so one runaway service cannot starve the rest. Services used a few times a week
            sit behind a Compose <code>profiles</code> entry and start by hand, which shrank the Docker VM from 3 GB to
            2.5 GB.
          </li>
          <li>
            <strong>launchd for scheduled work.</strong> Nightly data jobs, backups, and watchdogs are launchd agents
            rather than n8n workflows, so they still run when Docker does not.
          </li>
          <li>
            <strong>Watchdogs and backups.</strong> A health check every 5 minutes, a Tailscale watchdog every 2, and
            a nightly database backup copied to a second drive. A push alert fires when memory pressure turns critical
            or swap stays nearly full, and a nightly report catches slow failures that never throw an error: disk
            space, launchd jobs that keep crashing, expiring certificates and keys, and stale backups.
          </li>
          <li>
            <strong>Configuration as files.</strong> Each stack has its own Compose file and every native service has a
            launchd plist, so the machine can be rebuilt from what is on disk. A weekly job checks the API docs against the routes in
            code and commits the fixes.
          </li>
          <li>
            <strong>Two networks, two audiences.</strong> Everything private is Tailscale-only. The one public page
            goes through a Cloudflare Tunnel whose ingress lists two paths and returns 404 for everything else, with no
            open router ports.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Lessons Learned</h2>
        <ul className={styles.lessons}>
          <li>
            <strong>Check the runtime before the service.</strong> OrbStack and Docker Desktop once ran side by side,
            each with its own copy of the stack and same-named volumes. Three separate &quot;duplicated&quot; or
            &quot;unreachable but running&quot; bugs traced back to that, and consolidating onto one runtime fixed all
            three.
          </li>
          <li>
            <strong>macOS privacy controls apply to daemons too.</strong> A bare binary launched by launchd is silently
            denied access to an external drive; a scan just sits at 0% CPU. Launching the app bundle&apos;s
            wrapper instead gives it an identity that can hold the permission.
          </li>
          <li>
            <strong>The parts of a model you do not use still cost memory.</strong> Loading Gemma 3 with its vision
            projector pushed the machine hard enough to crash the window server. A text-only tag of the same weights
            fits the GPU estimate, loads memory-mapped, and leaves vision for the calls that send images.
          </li>
          <li>
            <strong>A read timeout is not a deadline.</strong> A model that streams slowly keeps resetting an HTTP read
            timeout, and one request sat open for over three hours. Every local model call runs under a hard
            wall-clock limit.
          </li>
          <li>
            <strong>Measure before cutting.</strong> When swap hit 7 GB, per-process measurements showed a
            transcription server idling at 600 MB and two containers handling a few requests a week. Moving those to
            on-demand freed more than any tuning of the busy services would have.
          </li>
        </ul>
      </section>

      <Footer />
    </main>
  );
}
