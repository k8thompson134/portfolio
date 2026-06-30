import styles from '../page.module.scss';
import Link from 'next/link';

export default function LocalPersonalAIPage() {
  return (
    <main className={styles.main}>
      <section>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>

        <h1 className={styles.pageTitle}>Local Personal AI System</h1>
        <p className={styles.pageDescription}>Architecture for privacy-first adaptation & autonomous improvement</p>

        {/* Overview */}
        <div style={{ marginBottom: '3rem', color: '#A0A8C0', lineHeight: '1.8', fontSize: '1rem' }}>
          <p>
            A Flask + Discord bot system that orchestrates multiple services (Ollama, n8n, external APIs) around a unified SQLite schema.
            Demonstrates patterns for cross-domain data correlation, heterogeneous input normalization, agentic self-improvement with safety guardrails,
            and privacy-by-architecture (all processing local, swappable backends, optional cloud integrations).
          </p>
        </div>

        {/* The Problem */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1rem' }}>The Problem</h2>
          <p style={{ color: '#A0A8C0', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Personal productivity & context tools are fragmented: activity scattered across Slack, GitHub, Spotify;
            environmental data siloed in separate APIs; insights buried in unconnected data sources.
            Most AI systems require cloud lock-in and expose personal data. The goal:
            a single coherent system where data converges on one schema, patterns emerge from correlation,
            and the system can improve itself without vendor dependency.
          </p>
        </div>

        {/* Architecture */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>System Architecture</h2>

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
            <pre style={{ margin: 0, padding: 0, color: '#5C9EAD' }}>{`User Input (Discord Bot)
        ↓
    Flask API
    ├── activity normalization   (commits, messages, calendar events)
    ├── adaptive briefing        (state-aware output composition)
    ├── agentic task queue       (self-improvement pipeline)
    └── correlation analysis     (cross-domain pattern detection)
        ↓
    Processing Layer
    ├── Ollama (local LLM inference)
    ├── Data Access (SQLite row_factory)
    └── External APIs (optional: PubMed, Spotify, weather)
        ↓
    Unified SQLite Schema
    ├── Event Tables (activity, observations, reflections, intentions)
    ├── Computed Tables (trends, forecasts, correlations)
    └── Agent State (staging dir, task queue, deployment history)
        ↓
    Composition Layer
    ├── n8n (orchestrate cron workflows)
    ├── Discord Bot (user interaction)
    └── Dashboard (visualization)`}</pre>
          </div>

          <p style={{ color: '#A0A8C0', lineHeight: '1.8', fontSize: '0.95rem' }}>
            The key insight: <strong style={{ color: '#B8D4C8' }}>data convergence enables correlation without hardcoding rules.</strong>
            Instead of "if pressure drops, send alert," the system correlates pressure observations with other event types
            and detects patterns statistically. New data types integrate into the same schema; existing analysis applies automatically.
          </p>
        </div>

        {/* Design Patterns */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Key Design Patterns</h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                title: 'Unified Schema for Cross-Domain Correlation',
                description: 'Multiple event types (commits, messages, calendar events, API observations) feed a single database. Computed columns (trends, baselines, correlations) emerge from statistical analysis, not explicit rules. Adding a new data source requires schema change + analysis pipeline auto-applies.',
                example: 'Commits (0–10 scale), messages (0–50), calendar events (0–5) → unified intensity scores (1–10). Baseline calculated from 14-day history; alerts trigger when current > baseline + 20% for 3+ days.'
              },
              {
                title: 'Heterogeneous Input Normalization',
                description: 'Different sources produce different scales. Normalization logic in the API ensures all inputs map to comparable units before storage. Enables apples-to-apples comparison across sources.',
                example: 'Stormglass (pressure in hPa), Spotify (play count), GitHub (commits/day) → all normalized to 0–1 relative to baseline before correlation analysis.'
              },
              {
                title: 'Context-Aware Composition',
                description: 'Same underlying data, different output based on system state. Flask routes decide output format (brief vs. detailed, confidence thresholds, alert frequency) based on current capacity/stress.',
                example: 'High-stress state: briefing shows only top-3 alerts, skips recommendations. Low-stress: full analysis, forecasts, suggestions.'
              },
              {
                title: 'Agentic Loop with Safety Guardrails',
                description: 'Agent writes code → stages in isolated directory → human reviews diff → deploy triggers integration. Prevents production breakage; enables autonomous improvement.',
                example: 'Agent decides system needs correlation analysis for new data type: writes SQL migration + API endpoint + test → stages → human reviews + approves → deploys → integrated into live system.'
              },
              {
                title: 'Privacy-First by Architecture',
                description: 'All processing happens locally. External APIs (Stormglass, PubMed, Spotify) are optional integrations; removing them doesn\'t break the system. Backends are swappable (Ollama → Claude API, SQLite → PostgreSQL, n8n → custom orchestrator).',
                example: 'Stormglass integration is one optional route. If API goes down, system degrades gracefully; local analysis continues. Different user could swap Ollama for OpenAI without changing schema.'
              }
            ].map((pattern, idx) => (
              <div key={idx} style={{
                background: '#1C2541',
                border: '1px solid #3A506B',
                borderRadius: '4px',
                padding: '1.5rem',
                borderLeft: '3px solid #FF6B35'
              }}>
                <h3 style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#FF6B35'
                }}>{pattern.title}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#A0A8C0', lineHeight: '1.6' }}>
                  {pattern.description}
                </p>
                <p style={{ margin: '0', fontSize: '0.85rem', color: '#5C9EAD', fontStyle: 'italic' }}>
                  <strong>Example:</strong> {pattern.example}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Loops */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Feedback Loops (What Makes It Smart)</h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                loop: 'Environmental Context Loop',
                flow: 'External APIs → computed table (pressure, air quality, geomagnetic) → briefing logic reads computed values → user sees contextualized alerts'
              },
              {
                loop: 'Trend Detection Loop',
                flow: 'Event logged → baseline calculated from 14-day history → current vs. baseline → alert if > threshold for 3+ days → user acknowledges alert → trend marked resolved'
              },
              {
                loop: 'Outcome Tracking Loop',
                flow: 'User sets intention → system provides context → user logs reflection + outcome → system learns what actually happened vs. predicted → briefing accuracy improves'
              },
              {
                loop: 'Self-Improvement Loop (Cipher Agent)',
                flow: 'System detects missing feature → agent proposes code → stages in isolation → human reviews → deploy on approval → agent integrates into own codebase → system gains capability'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: '#1C2541',
                border: '1px solid #3A506B',
                borderRadius: '4px',
                padding: '1rem',
                borderLeft: '3px solid #00FF9C'
              }}>
                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.9rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#00FF9C'
                }}>{item.loop}</h4>
                <p style={{ margin: '0', fontSize: '0.85rem', color: '#A0A8C0' }}>
                  {item.flow}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Case Studies</h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                title: 'Intensity Normalization & Comparative Analysis',
                problem: 'Activity sources emit different scales: commits (0–10), messages (0–50), calendar events (0–5). Can\'t compare directly.',
                solution: 'Each source has normalization thresholds (e.g., 3 commits = low, 10+ = high). API endpoint /activity/log accepts source + metric + value, computes normalized 1–10 score. All stored as "intensity" in unified table.',
                result: 'Dashboard shows daily activity across sources in one view. User can see "Tuesday was 7/10 intensity (mostly commits), Wednesday was 3/10 (light Slack)"—apples-to-apples comparison.',
                skills: 'Data normalization, threshold tuning, aggregation logic'
              },
              {
                title: 'Trend Detection from Unified Schema',
                problem: 'Multiple event types feed the database. How do you detect when any type is trending up/down without hardcoding each?',
                solution: 'Compute table stores baseline (14-day avg excluding recent 5) + current value + % change + direction (improving/stable/worsening). Alert logic: if > baseline + 20% for 3+ consecutive days, flag. Works for any numeric column.',
                result: 'Add new data source (e.g., external API)? Schema change + compute pipeline auto-applies. No new hardcoded rules.',
                skills: 'Statistical baselines, generic alerting patterns, schema extensibility'
              },
              {
                title: 'Agentic Self-Improvement with Safety',
                problem: 'Want autonomous agents to write code, but can\'t let them ship directly to production.',
                solution: 'Agent writes code → stages in data/pending/{task_id}/ → human reviews staged diff → /deploy endpoint copies staged files → git commit → service restart. Staging dir is isolated; nothing hits real files until approval.',
                result: 'Agent can write features (API routes, database migrations, Discord commands) safely. Staging architecture enables rollback; git history tracks all deployments.',
                skills: 'Staging architectures, human-in-the-loop validation, safe deployment patterns'
              },
              {
                title: 'Adaptive Briefing Based on System State',
                problem: 'Same data, but users need different detail levels depending on capacity/stress.',
                solution: 'Briefing route reads system state (pacing score, recent events) and adjusts output: high stress → top-3 alerts only; low stress → full analysis + forecasts + recommendations.',
                result: 'Briefing is useful under all conditions. No need to hard-code "if stressed, show less"; format adapts automatically.',
                skills: 'State-driven logic, contextual presentation, adaptive UX'
              }
            ].map((study, idx) => (
              <div key={idx} style={{
                background: '#1C2541',
                border: '1px solid #3A506B',
                borderRadius: '4px',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#5C9EAD'
                }}>{study.title}</h3>

                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ color: '#FF6B35', fontWeight: 'bold', fontSize: '0.85rem' }}>PROBLEM</span>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#A0A8C0', fontSize: '0.9rem' }}>{study.problem}</p>
                  </div>
                  <div>
                    <span style={{ color: '#FF6B35', fontWeight: 'bold', fontSize: '0.85rem' }}>SOLUTION</span>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#A0A8C0', fontSize: '0.9rem' }}>{study.solution}</p>
                  </div>
                  <div>
                    <span style={{ color: '#00FF9C', fontWeight: 'bold', fontSize: '0.85rem' }}>RESULT</span>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#A0A8C0', fontSize: '0.9rem' }}>{study.result}</p>
                  </div>
                </div>

                <p style={{ margin: '0', fontSize: '0.8rem', color: '#5C9EAD', fontStyle: 'italic' }}>
                  <strong>Skills demonstrated:</strong> {study.skills}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Tech Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {[
              'Flask', 'Discord.py', 'Python 3.9',
              'SQLite', 'sqlite3.Row',
              'Ollama: Gemma 3 12B (primary), Llama 3.2 1B (fog mode)',
              'n8n (orchestration)',
              'Kerykeion (astrology)',
              'ChromaDB (semantic search)',
              'Claude API (Cipher planning)',
              'Gemini (bug review)',
              'PubMed API', 'Spotify API', 'Cloudflare Tunnel'
            ].map(tech => (
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

        {/* Why Local-First */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Why Local-First</h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                title: 'Privacy by Design',
                description: 'Journaling, health tracking, mood logs, calendar data—sensitive personal information stays on your hardware. No cloud sync, no terms of service, no data harvesting. You own your data completely.'
              },
              {
                title: 'Customization Over Convention',
                description: 'Generic productivity tools overwhelm and go unused. A system built exactly for how you think, with UI you styled and workflows you designed, actually gets used. Custom tools feel like extensions of yourself.'
              },
              {
                title: 'Better AI Context',
                description: 'Local models let you control context deeply. Instead of an LLM hallucinating from billions of tokens, your model understands your specific patterns, your language, your priorities. The system adapts to you, not the other way around.'
              },
              {
                title: 'Environmental Responsibility',
                description: 'Hyperscale data centers consume enormous energy and water. Running complex, personalized systems locally on modest hardware means less environmental impact. Miniaturization instead of hyperscaling.'
              },
              {
                title: 'Integration Without Fragmentation',
                description: 'Instead of juggling 10 different apps with different UIs and data silos, one coherent system where everything converges on a single schema you control.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: '#1C2541',
                border: '1px solid #3A506B',
                borderRadius: '4px',
                padding: '1.5rem',
                borderLeft: '3px solid #00FF9C'
              }}>
                <h3 style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#00FF9C'
                }}>{item.title}</h3>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#A0A8C0', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Key Insights</h2>
          <ul style={{
            lineHeight: '1.8',
            color: '#A0A8C0',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            listStyleType: 'none'
          }}>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Unified schema enables emergent patterns.</strong> You don't hardcode "if A and B, then alert." Instead, you store observations, compute baselines, and let statistical correlations appear.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Normalization is the foundation.</strong> Heterogeneous inputs (commits, messages, API readings) need common units before analysis. Invest in mapping functions early.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Staging architecture enables safe autonomy.</strong> Agents (or junior devs) can propose code safely when it lands in an isolated directory first. Human review + approval before production.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Privacy-first beats privacy-later.</strong> If you design for local-first + swappable backends from day one, you're not retrofitting later. Optional cloud integrations stay optional.
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Feedback loops make systems smart.</strong> Not the LLM prompt—the data flow. Intent → context → outcome → learning loop. That's what enables adaptation.
            </li>
          </ul>
        </div>

        {/* Live Features */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Live Demo</h2>
          <div style={{
            background: '#1C2541',
            border: '1px solid #3A506B',
            borderRadius: '4px',
            padding: '1.5rem',
            borderLeft: '3px solid #00FF9C'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontFamily: "'Space Grotesk', sans-serif", color: '#00FF9C' }}>
                  Long COVID / ME/CFS Research Pipeline
                </h3>

                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#A0A8C0', lineHeight: '1.7' }}>
                  Long COVID and ME/CFS research is a moving target across at least 8 overlapping conditions — ME/CFS, POTS, EDS, MCAS,
                  fibromyalgia, small fiber neuropathy, dysautonomia, and others — with new papers publishing faster than any patient
                  can track manually. The literature also contains a persistent body of work promoting graded exercise therapy (GET) and
                  CBT-as-cure: approaches that contradict the documented mechanisms of post-exertional malaise (PEM) and cause measurable
                  harm in this population, often based on psychosomatic models predating current understanding, or on trials that excluded
                  the most severely affected patients.
                </p>

                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#A0A8C0', lineHeight: '1.7' }}>
                  A daily PubMed agent scores incoming papers 1–10 for relevance using Gemma 3 12B via Ollama, with a patient-specific
                  context prompt that classifies study type, population, and exercise framing. A keyword safety net runs post-scoring to
                  catch GET-adjacent language the model misses (e.g. <em style={{ color: '#B8D4C8' }}>&ldquo;adapted physical activity&rdquo; + &ldquo;fatigue&rdquo;</em> without
                  the exact phrase &ldquo;graded exercise therapy&rdquo;). Papers that recommend exercise-based interventions in the context of
                  ME/CFS or Long COVID fatigue are flagged with a caution note — <strong style={{ color: '#B8D4C8' }}>visible and scored, not excluded</strong>,
                  so the full picture of what&apos;s being published is preserved, not filtered into a false consensus.
                </p>

                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#A0A8C0', lineHeight: '1.7' }}>
                  Clinical trials are tracked via ClinicalTrials.gov API, filtered to exclude GET and CBT-as-cure protocols, and scored
                  separately with plain-language eligibility criteria. Actively recruiting trials are surfaced at the top of the list.
                  The pipeline also tracks watched researchers and a priority search queue for emerging treatments, so spikes in
                  relevant publications — a new trial result, a mechanism paper — surface within 24 hours of indexing on PubMed.
                </p>

                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#A0A8C0', lineHeight: '1.7' }}>
                  The public page exposes a curated slice of the private pipeline via a sanitization layer (<code style={{ color: '#B8D4C8', fontSize: '0.85rem' }}>_sanitize_paper()</code> /
                  {' '}<code style={{ color: '#B8D4C8', fontSize: '0.85rem' }}>_sanitize_trial()</code>) that strips personal fields before any response leaves the API.
                  One deliberate exception: papers marked as saved in the private view are exposed as a{' '}
                  <code style={{ color: '#B8D4C8', fontSize: '0.85rem' }}>kate_saved</code> boolean — a curation signal, not raw status data —
                  surfaced as a <strong style={{ color: '#B8D4C8' }}>★ Kate&apos;s Picks</strong> filter and badge so visitors can see what was worth reading.
                  Visitors can save papers to localStorage for their own reading list, and a <strong style={{ color: '#B8D4C8' }}>Recommend to Kate</strong> button
                  opens a modal where a doctor or family member can flag a paper with their name and a note.
                  That recommendation writes to the private DB and fires a Discord notification;
                  on the private dashboard, recommended papers surface at the top of the unread queue with a banner showing who sent it and why.
                  The page is exposed via Cloudflare Tunnel (outbound-only, no open ports) with a path-scoped ingress allowlist — everything outside
                  {' '}<code style={{ color: '#B8D4C8', fontSize: '0.85rem' }}>/pub/*</code> returns 404 at the edge before touching the server.
                </p>

                <p style={{ margin: '0', fontSize: '0.8rem', color: '#5C9EAD', fontStyle: 'italic' }}>
                  runs nightly via n8n cron → Flask API → Ollama (local, no cloud inference) · code on local Gitea
                </p>
              </div>
              <a
                href="https://research.k8thompson.dev/research-public"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#00FF9C',
                  color: '#0D1B2A',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  alignSelf: 'flex-start',
                }}
              >
                View Live →
              </a>
            </div>
          </div>
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
            This is a personal project—a testbed for system design patterns, agentic loops, and privacy-first architecture.
            The architectural principles apply to any domain: activity tracking, health monitoring, research tools, personal knowledge management,
            autonomous systems that improve themselves safely.
          </p>
          <p style={{ margin: '0' }}>
            Built and deployed on a Mac mini. All code local; all data stays local unless explicitly shared.
          </p>
        </div>
      </section>
    </main>
  );
}
