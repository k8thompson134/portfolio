import styles from '../page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import K8Tap from '@/components/K8Tap';

export default function LocalPersonalAIPage() {
  return (
    <main className={styles.main}>
      <section>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>

        <h1 className={styles.pageTitle}>Local Personal AI System</h1>
        <p className={styles.pageDescription}>A local-first assistant for health tracking, research, and daily life, running on a 16 GB Mac mini</p>

        {/* Overview */}
        <div style={{ marginBottom: '3rem', color: '#A0A8C0', lineHeight: '1.8', fontSize: '1rem' }}>
          <p>
            Lair is a Flask API with around 80 route modules over a single SQLite database, running on a Mac mini M4. A phone-first
            web app with a ranked feed and push notifications is the main interface; a Discord bot and a hands-free Android Auto
            voice agent sit alongside it. Local models through Ollama handle extraction, scoring, and summarization; a routing
            table sends conversation and writing to Claude. Everything private is reachable only over Tailscale, and a single
            public research page is served through a Cloudflare Tunnel.
          </p>
        </div>

        {/* The Problem */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1rem' }}>The Problem</h2>
          <p style={{ color: '#A0A8C0', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Living with a chronic illness means tracking symptoms, weather, medications, appointments, and research across
            a dozen apps that never talk to each other, on days when energy for any of it is scarce. Commercial tools either
            ignore that context or require handing sensitive health data to a cloud service. The goal: one system where every
            data source lands in the same schema, patterns surface from the data rather than hardcoded rules, sensitive records
            stay on hardware I own, and the interface gets simpler on bad days instead of harder.
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
            <pre style={{ margin: 0, padding: 0, color: '#5C9EAD' }}>{`Interfaces
├── Phone web app (feed, push, logging)
├── Discord bot (commands, guest Q&A)
└── Android Auto voice (whisper.cpp)
        ↓
Flask API (gunicorn)
├── Inference router
│   ├── local: Gemma 3 12B, Llama 3.2 1B
│   └── remote: Claude (chat, writing)
├── Output guardrails
└── ChromaDB retrieval
        ↓
SQLite (one schema) + Obsidian vault
        ↓
Scheduled jobs (launchd)
├── research agent, daily
├── dream cycle, nightly
└── push reminder sweep, every 30 min`}</pre>
          </div>

          <p style={{ color: '#A0A8C0', lineHeight: '1.8', fontSize: '0.95rem' }}>
            The key insight: <strong style={{ color: '#B8D4C8' }}>one definition per concept, shared by every feature.</strong>{' '}
            A pressure swing is a day with a 9+ hPa hourly range or an 8+ hPa shift from the day before, and that single function
            drives the feed&apos;s advance warnings, the symptom correlation charts, and the nightly pattern analysis. Symptoms,
            journal entries, pressure, air quality, pollen, steps, and screen time all land in the same database, so a new signal
            joins the existing analysis instead of needing its own.
          </p>
        </div>

        {/* Design Patterns */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#5C9EAD', marginBottom: '1.5rem' }}>Key Design Patterns</h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                title: 'Unified Schema for Cross-Domain Correlation',
                description: 'Symptoms, journal entries, mood, medications, weather, air quality, pollen, steps, and phone screen time feed one SQLite database. Shared helpers define each concept once (what counts as a crash, a pressure swing, a data gap), and every chart, alert, and nightly analysis reads the same definition.',
                example: 'Pressure comes from Open-Meteo every 30 minutes, ground-sensor AQI from PurpleAir, and pollen through Stormglass. All three land in a daily weather table that the correlation charts and the nightly analysis query directly.'
              },
              {
                title: 'Tiered Inference Routing',
                description: 'Every model call goes through one router with a named task. Extraction, scoring, classification, and summarization run on local models; conversation and writing go to Claude, where quality matters most. Fog mode reroutes everything to a 1B model with short, bulleted answers. Each call is logged with its tier, latency, and token count.',
                example: 'Daily paper scoring, symptom extraction from journal text, and the nightly dream cycle all run on Gemma 3 12B locally. Chat and message drafting are the deliberate exceptions routed to Claude.'
              },
              {
                title: 'LLM Output Guardrails',
                description: 'A free-text field from a model is never stored as fact without checking it against the source. Validators run after generation and either drop the claim or force a retry.',
                example: 'Email triage only keeps an extracted date, address, or prep note when it can be found in the original email. Research safety flags are confirmed by word-boundary matching against the paper text, not the model\'s summary of it.'
              },
              {
                title: 'Context-Aware Composition',
                description: 'The same data renders differently depending on the day. The daily briefing has three versions chosen from that morning\'s stress and capacity check-in, and fog mode hides whole sections of every page and shortens model answers.',
                example: 'Stress 7+ with capacity 4 or below: the briefing shows the single most urgent item and a reminder to rest. On a normal day it includes weather risk, symptom trends, research, and upcoming events.'
              },
              {
                title: 'Privacy by Architecture',
                description: 'Health records, journals, and labs live in a SQLite file on the Mac mini. The private app is only reachable over Tailscale. The one public surface goes through a sanitization layer that returns an explicit allowlist of fields.',
                example: 'Cloudflare Tunnel ingress lists exactly two paths for the public research page; every other path returns 404 at the edge, so private routes are unreachable from the internet regardless of app-level bugs.'
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
                loop: 'Weather Warning Loop',
                flow: '36-hour pressure forecast + AQI forecast → swing detection → feed card and push notification before the swing arrives → symptoms logged → correlation charts show whether swings actually line up with bad days'
              },
              {
                loop: 'Trend Detection Loop',
                flow: 'Symptom logged → baseline from the prior 14 days (excluding the most recent 5) → current vs. baseline → alert after 3+ consecutive days more than 20% above → acknowledged alerts stay quiet for 7 days'
              },
              {
                loop: 'Dream Cycle and Weekly Hypotheses',
                flow: 'Nightly local-model pass over symptoms, activity, pressure, and mood → findings written to the vault and a rolling weekly summary injected into chat → weekly synthesis drafts falsifiable hypotheses with 4-sample self-consistency and an adversarial critique → hypotheses tracked week over week'
              },
              {
                loop: 'Research Curation Loop',
                flow: 'Daily agent scores new papers and trials → saved papers become public picks → visitors recommend papers back → recommendations jump to the top of the private reading queue with a push notification'
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
                title: 'Trend Detection from Unified Schema',
                problem: 'Dozens of symptoms are logged in free text. How do you notice one quietly getting worse without writing a rule for each?',
                solution: 'A shared routine computes a baseline per symptom (14-day average, excluding the most recent 5 days so a bad week does not hide itself), compares current severity, and labels each trend improving, stable, or worsening. An alert fires after 3+ consecutive days more than 20% above baseline.',
                result: 'New symptoms are covered the day they are first logged. Alerts can be acknowledged for 7 days, so a known flare does not keep re-alerting.',
                skills: 'Statistical baselines, generic alerting patterns, schema extensibility'
              },
              {
                title: 'Agentic Coding with a Staging Gate (Cipher)',
                problem: 'Could a coding agent take feature requests from a Discord channel and ship them into a live system without breaking it?',
                solution: 'Gemini drafts a file/anchor/code plan, Claude Haiku executes it with insert-only edits, and every write lands in a per-task staging directory that mirrors the repo. A second model reviews the diff for bugs, and nothing touches real files until a /deploy command copies the staged files, commits, and restarts services.',
                result: '30 of 148 requests deployed. The rest mostly failed safely in staging, the most common cause being requests too broad for one pass, which led to a pre-flight breadth check that rejects them up front. Staging made failure cheap; the takeaway was that small, well-scoped requests succeed and open-ended ones do not. The pipeline is paused in favor of supervised coding sessions.',
                skills: 'Staging architectures, human-in-the-loop review, measuring agent reliability honestly'
              },
              {
                title: 'Adaptive Briefing Based on System State',
                problem: 'Same data, but users need different detail levels depending on capacity/stress.',
                solution: 'The briefing reads that morning\'s stress and capacity check-in and picks a version: minimal (stress 7+ and capacity 4 or below) shows only the most urgent item; core (stress 5+ or capacity 6 or below) keeps the health snapshot and urgent items; full adds weather risk, research, trials, and the provider pipeline.',
                result: 'The briefing stays readable on the days it is most needed, instead of being skipped because it is too long.',
                skills: 'State-driven logic, contextual presentation, adaptive UX'
              },
              {
                title: 'Voice-Matched Drafting: Statistical Style Fingerprinting',
                problem: 'Generic LLM output has a detectable "voice"—corporate hedging, heavy em-dash use, uniformly clean sentences—nothing like how a real person actually writes. Asking the model to imitate someone\'s style, or having it grade its own output, doesn\'t hold up.',
                solution: 'Build a corpus of real writing samples and compute a deterministic statistical fingerprint per register (12 metrics: sentence-length mean/stdev, contraction rate, em-dash/semicolon rate, type-token ratio, opener/closer frequency—no LLM involved). Every generated draft runs through a gate before the user sees it: a hard fail on banned corporate phrases, plus a zero-tolerance check that forces a regen when a metric that\'s statistically ~zero across the real corpus (e.g. em-dash usage) shows up anyway. Retrieval-augmented generation pulls the 5 most similar real samples via ChromaDB before drafting multiple variants at different temperatures, ranked by gate pass and drift score.',
                result: 'Verified live: zero em-dashes across repeated test generations post-fix, with the regen counter confirming the retry mechanism actually fired rather than getting lucky once. Every draft attempt—input, all variants, gate results, retrieval hits—logs for full auditability, and a chosen draft can be promoted back into the corpus to improve future fingerprints.',
                skills: 'Statistical validation over LLM self-assessment, retrieval-augmented generation, empirical prompt engineering (fixing failures found via live testing, not guesswork), regen/ranking pipelines'
              },
              {
                title: 'Hands-Free Voice Agent for the Car',
                problem: 'After an appointment is exactly when logging symptoms or notes matters most, and exactly when driving makes the phone off-limits. Android Auto wires the steering-wheel voice button to Google Assistant only; custom assistants and web apps cannot project to the car screen.',
                solution: 'A native Kotlin companion app turns "call Lair" into a VoIP call: it intercepts a dummy contact and opens a Jetpack Core-Telecom call session, which makes the car apply its hardware echo cancellation. Audio streams over Tailscale to the Mac mini, where whisper.cpp transcribes it on the GPU and spoken replies come back over the call.',
                result: 'Symptom logging, post-appointment debriefs, and quick questions work without touching the phone. Any write needs a spoken yes/no confirmation, and a 3-second timeout abandons a turn rather than guess. The transcription server starts on the first audio turn and stops after 10 idle minutes to save memory.',
                skills: 'Working around platform constraints, Android telecom APIs, local speech-to-text, safety-first voice UX'
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
              'Python 3.9', 'Flask', 'gunicorn', 'Discord.py',
              'SQLite', 'Vanilla JS PWA', 'Web Push (VAPID)',
              'Ollama: Gemma 3 12B (primary), Llama 3.2 1B (fog mode)',
              'whisper.cpp',
              'ChromaDB (semantic search)',
              'Claude API (chat, writing)',
              'Gemini (Cipher planning)',
              'Kotlin (Android Auto app)',
              'launchd', 'n8n',
              'PubMed API', 'ClinicalTrials.gov API', 'Open-Meteo', 'Kerykeion (astrology)',
              'Tailscale', 'Cloudflare Tunnel'
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
                description: 'Journals, symptom logs, labs, and medications stay in a database on hardware I own, with no third-party sync and no terms of service that can change. When a conversation does go to a cloud model, it is a deliberate, per-task routing decision, not the default.'
              },
              {
                title: 'Customization Over Convention',
                description: 'Generic productivity tools overwhelm and go unused. A system built exactly for how you think, with UI you styled and workflows you designed, actually gets used. Custom tools feel like extensions of yourself.'
              },
              {
                title: 'Better AI Context',
                description: 'Models do not learn your life on their own; context does. Retrieval over the vault, a persistent memory file, and a rolling weekly summary are assembled into every chat, so answers start from what has actually been happening instead of generic advice.'
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
              <strong style={{ color: '#B8D4C8' }}>Unified schema enables emergent patterns.</strong> You don&apos;t hardcode &quot;if A and B, then alert.&quot; Instead, you store observations, compute baselines, and let statistical correlations appear.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Validate model output against the source.</strong> A plausible invented detail is the most dangerous kind of error. Checking each extracted field against the original text catches what prompt tuning alone misses.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Staging makes agent failure cheap.</strong> When agent-written code lands in an isolated directory first, a 20% success rate is an interesting result instead of an outage. Measure the rate before trusting the loop.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Privacy-first beats privacy-later.</strong> Designing the private surface as Tailscale-only and the public surface as an explicit allowlist from day one means nothing has to be retrofitted later.
            </li>
            <li>
              <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>▸</span>
              <strong style={{ color: '#B8D4C8' }}>Feedback loops make systems smart.</strong> Not the LLM prompt—the data flow. Intent → context → outcome → learning loop. That&apos;s what enables adaptation.
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
                  That recommendation writes to the private DB and sends a push notification;
                  on the private dashboard, recommended papers surface at the top of the unread queue with a banner showing who sent it and why.
                  The page is exposed via Cloudflare Tunnel (outbound-only, no open ports) with a path-scoped ingress allowlist — everything except the public page and
                  {' '}<code style={{ color: '#B8D4C8', fontSize: '0.85rem' }}>/pub/*</code> returns 404 at the edge before touching the server.
                </p>

                <p style={{ margin: '0', fontSize: '0.8rem', color: '#5C9EAD', fontStyle: 'italic' }}>
                  runs daily at 8am via launchd → Flask API → Ollama (paper scoring and summaries run locally) · 3,000+ papers and 60 trials tracked · code on self-hosted Gitea
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
            This is a personal project and a daily-use tool: a testbed for system design, model guardrails, and privacy-first architecture
            that also has to work on a bad day. The principles carry over to any domain where data is sensitive and model output has to be trusted.
          </p>
          <p style={{ margin: '0' }}>
            Built and deployed on a Mac mini. Code is hosted on a self-hosted Gitea; personal data stays on the machine unless a task is explicitly routed out.
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
