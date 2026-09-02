import styles from '../page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import K8Tap from '@/components/K8Tap';

export default function HomelabPage() {
  return (
    <main className={styles.main}>
      <section>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>

        <h1 className={styles.pageTitle}>Homelab AI Infrastructure</h1>
        <p className={styles.pageDescription}>Docker Compose orchestration for local-first applications</p>

        {/* Overview */}
        <div style={{ marginBottom: '3rem', color: '#A0A8C0', lineHeight: '1.8', fontSize: '1rem' }}>
          <p>
            A containerized AI stack running 8 services with tight resource constraints on a Mac mini.
            This is the runtime layer for any local-first application, specifically designed to support the <a href="/local-personal-ai" style={{ color: '#5C9EAD', textDecoration: 'underline' }}>Local Personal AI System</a>.
            Demonstrates cost-efficient orchestration, privacy-first design, and systems thinking for production services on modest hardware.
            Shows DevOps fundamentals: service orchestration, memory constraints, data persistence, and graceful degradation.
          </p>
        </div>

        {/* The Challenge */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1rem' }}>The Challenge</h2>
          <p style={{ color: '#A0A8C0', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Run a production-grade AI stack locally with privacy guarantees, no cloud lock-in, and minimal hardware cost.
            Orchestrate multiple services (LLM inference, workflow orchestration, vector search, Git hosting, file management)
            within constrained memory while maintaining reliability and data persistence.
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
            <pre style={{ margin: 0, padding: 0, color: '#5C9EAD' }}>{`┌──────────────────────────────────────────────────────┐
│         Homelab Stack (Mac mini)                     │
├──────────────────────────────────────────────────────┤
│                                                       │
│         AI/LLM Services                              │
│      Ollama (11434)  Open WebUI (3000)               │
│      Pipelines (9099)  n8n (5678)                    │
│      ChromaDB (8000)  SearXNG (8888)                 │
│                                                       │
│              ▲ AI inference                          │
│      ▲ Vector embeddings  ▲ Workflow                │
│                                                       │
│      Infrastructure & APIs                           │
│      Gitea (3002)  FileBrowser (8081)                │
│                                                       │
│              ▲ Git hosting  ▲ File mgmt              │
│                                                       │
└──────────────────────────────────────────────────────┘`}</pre>
          </div>
        </div>

        {/* Services */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Services & Resource Allocation</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                name: 'Ollama',
                purpose: 'LLM inference engine',
                memory: '2GB',
                key: 'Local language models: Llama 3.2 (1b) for fast inference, Qwen 2.5-Coder (7b) for code generation, Nomic Embed Text for embeddings. No external API calls.'
              },
              {
                name: 'Open WebUI + Pipelines',
                purpose: 'Chat interface & custom LLM pipelines',
                memory: '1GB + 512MB',
                key: 'Web UI for chat interactions; Pipelines for custom request processing'
              },
              {
                name: 'n8n',
                purpose: 'Workflow orchestration',
                memory: '1GB',
                key: 'Coordinates all service integrations; automation and data routing'
              },
              {
                name: 'ChromaDB',
                purpose: 'Vector database',
                memory: '512MB',
                key: 'Stores embeddings for semantic search and RAG (Retrieval-Augmented Generation)'
              },
              {
                name: 'SearXNG',
                purpose: 'Private search engine',
                memory: '512MB',
                key: 'Meta-search across multiple engines; no tracking, all processing local'
              },
              {
                name: 'Gitea',
                purpose: 'Self-hosted Git server',
                memory: '512MB',
                key: 'Local repository hosting for code and project management'
              },
              {
                name: 'FileBrowser',
                purpose: 'Web-based file manager',
                memory: '256MB',
                key: 'Browse projects and data without CLI'
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
              <strong style={{ color: '#B8D4C8' }}>Composable services:</strong> Each container is independent. Upgrade Ollama, replace n8n, add new services—without affecting others.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Resource-aware design:</strong> Every service has explicit memory limits. Proves you can run production workloads on modest hardware without waste.
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Docker Compose as infrastructure code:</strong> One YAML file is the single source of truth. No manual config, no lost setup knowledge.
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
              <strong style={{ color: '#B8D4C8' }}>Memory limits enforced per-service:</strong> Each service has strict <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>mem_limit</code> + <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>memswap_limit</code> to prevent resource starvation
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Restart policies tuned:</strong> Critical services use <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>always</code> restart; non-critical use <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>unless-stopped</code>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Named external volumes:</strong> Data persists across container restarts; enables safe updates without data loss
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Docker Compose single source of truth:</strong> All configuration lives in one file; no manual steps, no lost setup knowledge
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>No cloud dependencies:</strong> All processing stays local; privacy by architecture, not policy
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
              <strong style={{ color: '#B8D4C8' }}>Memory limits are hard constraints:</strong> Without them, a runaway process can OOM-kill the host. Swaplimit prevents disk thrashing.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Named volumes are essential:</strong> Ephemeral containers with bind mounts = data loss on restart. External volumes survive container lifecycle.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Restart policies need thought:</strong> <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>always</code> creates restart loops on bad config; <code style={{ background: '#0A0E27', color: '#5C9EAD', padding: '0.2rem 0.4rem', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>unless-stopped</code> respects manual stops.
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Port allocation matters:</strong> Avoid conflicts with host services. Document all port mappings in one place.
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Tech Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['Docker', 'Docker Compose', 'Ollama (Llama 3.2, Qwen 2.5-Coder)', 'Open WebUI', 'n8n', 'ChromaDB', 'SearXNG', 'Gitea', 'FileBrowser'].map(tech => (
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
            <strong style={{ color: '#B8D4C8' }}>Local Personal AI System:</strong> See how this infrastructure is used to build a coherent, unified system with feedback loops and emergent intelligence. <a href="/local-personal-ai" style={{ color: '#5C9EAD', textDecoration: 'underline' }}>Read about the architecture →</a>
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
            <strong style={{ color: '#B8D4C8' }}>DevOps + Infrastructure:</strong> This page showcases Docker orchestration, memory management, service coordination, and deployment patterns on constrained hardware.
            It's the foundation that enables higher-level systems thinking.
          </p>
          <p style={{ margin: '0' }}>
            Built and deployed on a Mac mini. All services local; all data stays local unless explicitly shared.
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
