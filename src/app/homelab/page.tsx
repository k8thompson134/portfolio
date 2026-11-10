import styles from '../page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import K8Tap from '@/components/K8Tap';

export default function HomelabPage() {
  return (
    <main className={styles.main}>
      <section>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>

        <h1 className={styles.pageTitle}>Homelab Infrastructure</h1>
        <p className={styles.pageDescription}>A local AI stack, media server, and 50+ scheduled jobs on one 16 GB Mac mini</p>

        {/* Overview */}
        <div style={{ marginBottom: '3rem', color: '#A0A8C0', lineHeight: '1.8', fontSize: '1rem' }}>
          <p>
            A Mac mini M4 with 16 GB of memory runs everything: the <a href="/local-personal-ai" style={{ color: '#5C9EAD', textDecoration: 'underline' }}>Local Personal AI System</a>,
            a local language model, speech-to-text, a vector database, self-hosted Git, workflow automation, a media server with
            custom live-TV channels, and more than 50 launchd jobs. Some services run in Docker; the ones that need the GPU,
            hardware video encoding, or the external drive run natively. Private access goes over Tailscale, and a single
            public page is served through a Cloudflare Tunnel with no open router ports.
          </p>
        </div>

        {/* The Challenge */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1rem' }}>The Challenge</h2>
          <p style={{ color: '#A0A8C0', lineHeight: '1.8', fontSize: '0.95rem' }}>
            A 12B-parameter model alone wants about half the machine&apos;s memory. Fitting it alongside a Docker VM, a media
            server, live-TV transcoding, and dozens of background jobs means treating memory as a budget: measuring where it
            actually goes, deciding which services earn a permanent slot, and starting the rest only when they are needed.
            All of it has to recover on its own after the frequent power outages, without anyone on site.
          </p>
        </div>

        {/* Architecture */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Architecture</h2>
          <div style={{
            background: '#1C2541',
            border: '1px solid #3A506B',
            borderRadius: '4px',
            padding: '1.5rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.8rem',
            color: '#5C9EAD',
            overflowX: 'auto',
            marginBottom: '1.5rem'
          }}>
            <pre style={{ margin: 0, padding: 0, color: '#5C9EAD' }}>{`Mac mini M4 · 16 GB
├── Native (launchd)
│   ├── Lair API + Discord bot
│   ├── Ollama (Metal GPU)
│   ├── whisper.cpp (on demand)
│   └── Jellyfin + ErsatzTV
├── Docker Desktop VM (2.5 GB)
│   ├── n8n · ChromaDB · Gitea
│   ├── SearXNG (optional profile)
│   └── media library services
└── Network
    ├── Tailscale (private)
    └── Cloudflare Tunnel (public page)`}</pre>
          </div>
        </div>

        {/* Services */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Services & Resource Allocation</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                name: 'Ollama',
                purpose: 'Local LLM inference',
                memory: '~7.3 GB model file, memory-mapped',
                key: 'Runs natively so it gets Metal acceleration and unified memory. The primary model is a text-only Gemma 3 12B tag built from the same weights without the vision projector, so it loads memory-mapped (reclaimable) instead of as ~9 GB of swappable memory; the vision version loads only for image calls. Llama 3.2 1B handles light tasks. Keep-alive is set by priority: 30 minutes after interactive use, 10 after batch jobs. Flash attention and a q8_0 KV cache trim the footprint further.'
              },
              {
                name: 'whisper.cpp',
                purpose: 'Local speech-to-text',
                memory: '~600 MB while running',
                key: 'Metal-accelerated transcription for voice notes and the car voice agent. Started on the first audio request and stopped after 10 idle minutes, instead of holding memory all day.'
              },
              {
                name: 'n8n',
                purpose: 'Workflow automation',
                memory: '768 MB cap',
                key: 'Handles a few timed jobs and the Discord message webhooks. Most nightly data jobs run as launchd agents instead, so they do not depend on Docker being up.'
              },
              {
                name: 'ChromaDB',
                purpose: 'Vector database',
                memory: '512 MB cap',
                key: 'Embeddings for semantic search over the notes vault, symptom history, and writing samples (retrieval for chat and voice-matched drafting).'
              },
              {
                name: 'Gitea',
                purpose: 'Self-hosted Git',
                memory: '512 MB cap',
                key: 'Hosts the Lair repository and other private projects.'
              },
              {
                name: 'SearXNG',
                purpose: 'Private metasearch',
                memory: '512 MB cap, off by default',
                key: 'Behind a Compose profile and started only when web search is needed; features that use it log a warning and degrade instead of failing.'
              },
              {
                name: 'Jellyfin + ErsatzTV',
                purpose: 'Media server and custom live-TV channels',
                memory: '~1 GB combined',
                key: 'Native rather than containerized: the Docker VM cannot use VideoToolbox hardware encoding, so a container would transcode every stream on the CPU. ErsatzTV builds always-on channels from smart collections, with Jellyfin as the guide and player.'
              }
            ].map(service => (
              <div key={service.name} style={{
                background: '#1C2541',
                border: '1px solid #3A506B',
                borderRadius: '4px',
                padding: '1rem',
                borderLeft: '3px solid #FF6B35'
              }}>
                <h3 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.95rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#FF6B35'
                }}>{service.name}</h3>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: '#5C9EAD', fontWeight: 'bold' }}>MEMORY</span> <span style={{ color: '#A0A8C0' }}>{service.memory}</span>
                </div>
                <p style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '0.85rem', color: '#B8D4C8' }}>
                  {service.purpose}
                </p>
                <p style={{ margin: '0', fontSize: '0.85rem', color: '#A0A8C0' }}>{service.key}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Philosophy */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Infrastructure Philosophy</h2>
          <ul style={{
            lineHeight: '1.8',
            color: '#A0A8C0',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            listStyleType: 'none'
          }}>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Local-first by default:</strong> All processing happens on your hardware. External APIs (when used) are optional integrations, not core dependencies.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Native where it matters:</strong> Containers by default; native for anything that needs the GPU, hardware video encoding, or the external drive.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Measured memory budget:</strong> Memory use is measured per service, and a service that rarely runs gets started on demand instead of holding a permanent slot.
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Configuration as files:</strong> Each stack has its own Compose file and every native service has a launchd plist, so the machine can be rebuilt from what is on disk.
            </li>
          </ul>
        </div>

        {/* Key Design Decisions */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Key Design Decisions</h2>
          <ul style={{
            lineHeight: '1.8',
            color: '#A0A8C0',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            listStyleType: 'none'
          }}>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Memory caps on containers:</strong> <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>mem_limit</code> + <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>memswap_limit</code> on each container so one runaway service cannot starve the rest
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Optional profiles for rarely used services:</strong> services used a few times a week sit behind a Compose <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>profiles</code> entry and are started by hand, which shrank the Docker VM from 3 GB to 2.5 GB
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>launchd for scheduled work:</strong> nightly data jobs, backups, and watchdogs are launchd agents rather than n8n workflows, so they still run when Docker does not
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Watchdogs and backups:</strong> a health check every 5 minutes, a Tailscale watchdog every 2, a nightly database backup copied to a second drive, and a guard that stops media containers if the external drive is not mounted rather than letting them fill an empty folder
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Two networks, two audiences:</strong> everything private is Tailscale-only; the one public page goes through a Cloudflare Tunnel whose ingress lists two paths and returns 404 for everything else
            </li>
          </ul>
        </div>

        {/* Lessons Learned */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Lessons Learned</h2>
          <ul style={{
            lineHeight: '1.8',
            color: '#A0A8C0',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            listStyleType: 'none'
          }}>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Check the runtime before the service:</strong> OrbStack and Docker Desktop once ran side by side, each with its own copy of the stack and same-named volumes. Three separate &quot;duplicated&quot; or &quot;unreachable but running&quot; bugs traced back to that, and consolidating onto one runtime fixed all three.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>macOS privacy controls apply to daemons too:</strong> a bare binary launched by launchd is silently denied access to an external drive; a library scan just sits at 0% CPU. Launching the app bundle&apos;s wrapper instead gives it an identity that can hold the permission.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>The parts of a model you do not use still cost memory:</strong> loading Gemma 3 with its vision projector pushed the machine hard enough to crash the window server. A text-only tag of the same weights fits the GPU estimate, loads memory-mapped, and leaves vision for the calls that send images.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>A read timeout is not a deadline:</strong> a model that streams slowly keeps resetting an HTTP read timeout, and one request sat open for over three hours. Every local model call now runs under a hard wall-clock limit.
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Measure before cutting:</strong> when swap hit 7 GB, per-process measurements showed a transcription server idling at 600 MB and two containers handling a few requests a week. Moving those to on-demand freed more than any tuning of the busy services would have.
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Tech Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['macOS launchd', 'Docker Desktop', 'Docker Compose', 'Ollama (Gemma 3, Llama 3.2)', 'whisper.cpp', 'n8n', 'ChromaDB', 'Gitea', 'SearXNG', 'Jellyfin', 'ErsatzTV', 'Tailscale', 'Cloudflare Tunnel'].map(tech => (
              <span key={tech} style={{
                background: '#253557',
                border: '1px solid #3A506B',
                color: '#B8D4C8',
                padding: '0.5rem 0.75rem',
                borderRadius: '2px',
                fontSize: '0.85rem',
                fontFamily: "'IBM Plex Mono', monospace"
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Complementary Pages */}
        <div style={{ marginBottom: '3rem', padding: '1.5rem', background: '#1C2541', border: '1px solid #3A506B', borderRadius: '4px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', color: '#5C9EAD', marginBottom: '1rem', marginTop: '0' }}>See Also</h2>
          <p style={{ color: '#A0A8C0', margin: '0' }}>
            <strong style={{ color: '#B8D4C8' }}>Local Personal AI System:</strong> The application this infrastructure exists to run: inference routing, output guardrails, feedback loops, and a public research pipeline. <a href="/local-personal-ai" style={{ color: '#5C9EAD', textDecoration: 'underline' }}>Read about the architecture →</a>
          </p>
        </div>

        {/* Footer */}
        <div style={{
          background: '#1C2541',
          border: '1px solid #3A506B',
          borderRadius: '4px',
          padding: '1.5rem',
          marginTop: '3rem',
          color: '#A0A8C0',
          fontSize: '0.9rem',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 1rem 0' }}>
            <strong style={{ color: '#B8D4C8' }}>Operations on constrained hardware:</strong> container and native service management, memory budgeting, scheduled jobs, watchdogs, and private versus public networking on a single machine.
          </p>
          <p style={{ margin: '0' }}>
            Built and run on a Mac mini. All services are self-hosted; personal data stays on the machine.
          </p>
        </div>

        <p style={{
          opacity: 0.35,
          textAlign: 'center',
          marginTop: '1.5rem'
        }}>
          <K8Tap>
            <Image
              src="/images/k8-mark-xs.png"
              alt="K8"
              width={444}
              height={128}
              style={{ height: '20px', width: 'auto', display: 'inline-block' }}
            />
          </K8Tap>
        </p>
      </section>
    </main>
  );
}
