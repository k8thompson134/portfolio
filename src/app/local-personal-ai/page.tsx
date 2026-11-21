import styles from './page.module.scss';
import Link from 'next/link';
import Footer from '@/components/Footer';

const BAD_DAYS = [
  {
    title: 'A Feed Instead of a Dashboard',
    description:
      'The home screen is a ranked feed of cards instead of pages to remember to open. Measuring how logging actually happened shaped it: free text got done and forms did not, so the feed leans on one free-text check-in that fans out through extraction. Whether a card shows and where it sorts are separate rules. A card appears when its condition holds or its stream is overdue for its own cadence, and a per-kind urgency weight only decides the order.',
    takeaway:
      'Ordinary cards snooze until tomorrow, and the few that lose data if missed, like today’s check-in or an event starting today, come back next session. Catch-up prompts reach back at most 3 days, so a bad week can’t turn the feed into a guilt wall.',
  },
  {
    title: 'A Check-In That Is All Taps',
    description:
      'Morning and evening check-ins take about 30 seconds and need no typing: sleep, how my body woke up, mood, energy, and brain capacity in the morning; stress, pain, people, noise, flares, and what I did in the evening. The answers are written the way a tired person thinks (“Under 30%, low-power mode”), and each maps to a 1–10 score in the same columns as a typed check-in, so it feeds every chart and the energy budget.',
  },
  {
    title: 'An Energy Budget Like a Bank Balance',
    description:
      'Each morning sets an energy budget from my personal baseline, lowered when crash risk is up, and shows it as a moon on the home screen. An itemized ledger draws it down through the day: steps scaled to my own 28-day median, appointments (a call costs half an in-person visit), rated activities, and symptoms logged with exertion.',
    takeaway:
      'When a check-in says the battery is lower than the estimate, a correction line resets the moon to match. My answer outranks the model.',
  },
  {
    title: 'Scheduling Around My Limits',
    description:
      'Find a time ranks upcoming days against my limits (one in-person commitment a day, two commitments in total, neighbouring in-person days ranked lower) using the same event costs as the energy ledger. Adding an event shows a live warning when it would break one, and appointments get a leave-by push notification.',
  },
];

const CASE_STUDIES = [
  {
    title: 'Medication Effects from My Own Data',
    problem:
      'Is a medication actually helping, or does it just feel that way? One person’s data is noisy, and anything else that changed at the same time muddies the answer.',
    solution:
      'Each medication gets windows before, on, and after it, compared on energy and worst-symptom severity from the same daily data the health charts use. A window has to have enough rated days to count, the verdict says when another medication started or stopped nearby, and stopping a medication checks whether things moved back, the strongest evidence one person can get.',
    result:
      'Working with my doctor, it confirmed that one of my medications was not helping: a large dataset since I started it showed mixed results and no clear trend. Another showed a clear upward trend.',
  },
  {
    title: 'A Crash Forecast Fit on My Own History',
    problem:
      'The first crash-risk score added up 10 factors. It said “critical” every day off keywords in dream notes, then “minimal” every day once 6 of its inputs went stale. A score that never changes is not a forecast.',
    solution:
      'A personal model fit on my own crash onsets, taken from the symptom log and recorded episodes. Features are simple yes/no signals: poor air quality today or tomorrow, steps above my 30-day median, heat, check-in exertion and sensory load, low energy, more symptoms than usual, a busy calendar. Each is weighted by the smoothed log odds of an onset and shrunk toward a prior, because the history is small.',
    result:
      'The forecast moves with real conditions and lowers the next energy budget when risk is up. It is backtested on onsets and refit every month.',
  },
  {
    title: 'Email Extraction That Can’t Make Things Up',
    problem:
      'Appointments, prep instructions, and deadlines arrive by email across two inboxes. A model that invents a plausible date or address is worse than one that misses it.',
    solution:
      'Local models triage every message and pull out events, tasks, and heads-ups, then each field is checked against the original email. A committed event is skipped unless its date appears in the email, a clinic’s prep note is kept as the email’s own sentence instead of the model’s paraphrase, and a provider name that is not in the email gets dropped. A clinic’s confirmation email merges into the appointment I already entered by hand.',
    result:
      '48,000+ emails processed. Medical heads-ups land on the feed with Seen and Make task buttons instead of sitting unread.',
  },
  {
    title: 'The Lair Ledger',
    problem: 'Newsletters pile up unread, and the same story arrives from five senders.',
    solution:
      'A newspaper built from the triaged newsletters and local Milwaukee and Wisconsin RSS feeds. Embeddings cluster stories across senders, and a small local model judges the ambiguous pairs, since look-alike headlines are not always the same story. A local model writes the lead, and each edition is saved as a snapshot with its images cached.',
    result:
      'A daily edition, updated through the day, and a weekly one on Mondays. Thumbs and more-or-fewer rules on topics and sources tune the next edition, and an almanac of movement and working-class history runs alongside.',
  },
];

const LOCAL_FIRST = [
  {
    title: 'Privacy by Design',
    description:
      'Journals, symptom logs, labs, and medications stay in a database on hardware I own, with no third-party sync and no terms of service that can change. The private app is only reachable over Tailscale. The one public page goes through a Cloudflare Tunnel whose ingress lists exactly two paths, so every other route returns 404 at the edge regardless of app-level bugs, and the API behind it returns an explicit allowlist of fields. The few calls that go to a cloud model are chosen per task, not the default. Building it this way from the start meant nothing had to be retrofitted.',
  },
  {
    title: 'Miniaturization Over Hyperscaling',
    description:
      'Companies are buying up land for hyperscale data centers that consume enormous amounts of energy and water, while very little effort goes into making AI run well on small hardware. I think that is backwards. Lair makes about 300 model calls a day, and more than 99% of them run locally on a 16 GB Mac mini. Small, efficient models are also what would let AI become embedded the way computing did, running on your phone or inside a device instead of in someone else’s data center.',
  },
  {
    title: 'Customization Over Convention',
    description:
      'Generic productivity tools overwhelm and go unused. A system built exactly for how you think, with UI you styled and workflows you designed, actually gets used. Custom tools feel like extensions of yourself.',
  },
  {
    title: 'Better AI Context',
    description:
      'Models do not learn your life on their own; context does. Because everything lands in one database, the model scoring a paper, triaging an email, or setting the day’s energy budget starts from what has actually been happening instead of generic assumptions.',
  },
  {
    title: 'Integration Without Fragmentation',
    description:
      'Instead of juggling ten apps with different UIs and data silos, one coherent system where everything converges on a single schema you control.',
  },
];

export default function LocalPersonalAIPage() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back to Control Panel
      </Link>

      <h1 className={styles.title}>Local Personal AI System</h1>
      <p className={styles.tagline}>
        A local-first assistant for health tracking, research, and daily life, running on a 16 GB Mac mini.
      </p>

      <div className={styles.status}>
        <span className={styles.badge}>Python</span>
        <span className={styles.badge}>Flask</span>
        <span className={styles.badge}>SQLite</span>
        <span className={styles.badge}>Ollama</span>
        <span className={styles.badge}>ChromaDB</span>
        <span className={styles.badge}>Claude API</span>
        <span className={styles.badge}>Tailscale</span>
        <a
          href="https://research.k8thompson.dev/research-public"
          className={styles.liveLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Live Research Page
        </a>
      </div>

      <div className={styles.intro}>
        <p>
          Lair is a Flask API with around 80 route modules over a single SQLite database, running on a Mac mini M4.
          Its main interface is a phone-first web app whose home screen is a ranked feed with push notifications.
          Local models through Ollama handle extraction, scoring, and summarization, and almost nothing leaves the
          machine. It runs on the <Link href="/homelab" className={styles.inlineLink}>homelab</Link>, and the code
          lives on a self-hosted Gitea.
        </p>
        <p>
          It is a daily-use tool and a testbed for system design, model guardrails, and privacy-first architecture
          that also has to work on a bad day.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Problem</h2>
        <div className={styles.prose}>
          <p>
            Living with a chronic illness means tracking symptoms, weather, medications, appointments, and research
            across a dozen apps that never talk to each other, on days when energy for any of it is scarce. Commercial
            tools either ignore that context or require handing sensitive health data to a cloud service. The goal: one
            system where every data source lands in the same schema, patterns surface from the data rather than
            hardcoded rules, sensitive records stay on hardware I own, and the interface gets simpler on bad days
            instead of harder.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Live: Long COVID and ME/CFS Research</h2>
        <div className={styles.prose}>
          <p>
            Long COVID and ME/CFS research spreads across overlapping conditions like POTS, EDS, MCAS, fibromyalgia,
            and small fiber neuropathy, and it publishes faster than any patient can follow. The literature also still
            carries graded exercise therapy (GET) and CBT-as-cure studies, approaches that contradict what is known
            about post-exertional malaise (PEM) and cause measurable harm. Many rest on psychosomatic models or on
            trials that left out the most severely affected patients.
          </p>
          <p>
            A daily agent scores new PubMed papers 1 to 10 for relevance with Gemma 3 12B, using a patient-specific
            prompt that classifies study type, population, and exercise framing. A keyword safety net then catches
            GET-adjacent language the model misses, like &ldquo;adapted physical activity&rdquo; paired with
            &ldquo;fatigue.&rdquo; Flagged papers get a caution note but stay <strong>visible and scored, not
            excluded</strong>, so the page shows what is actually being published instead of a filtered consensus.
            Clinical trials from ClinicalTrials.gov are filtered to drop GET and CBT-as-cure protocols and scored with
            plain-language eligibility, with recruiting trials first. Watched researchers and a priority search list
            for emerging treatments mean a new result shows up within a day of reaching PubMed.
          </p>
          <p>
            The public page is a sanitized slice of the private pipeline, with a <strong>Kate&apos;s Picks</strong>{' '}
            filter for the papers I saved. Visitors can keep their own reading list in the browser, and a{' '}
            <strong>Recommend to Kate</strong> button lets a doctor or family member send me a paper with a note. It
            lands at the top of my private reading queue with a push notification.
          </p>
          <p className={styles.meta}>Runs daily via launchd · 3,000+ papers and 60 trials tracked</p>
          <p>
            <a
              href="https://research.k8thompson.dev/research-public"
              className={styles.inlineLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the research page ↗
            </a>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Architecture</h2>
        <pre className={styles.diagram}>{`Inputs
├── Phone web app (feed, quiz, logging)
├── Email sync (two inboxes)
├── Weather, air quality, steps
└── PubMed, ClinicalTrials.gov, RSS
        ↓
Flask API (gunicorn)
├── Inference router
│   ├── local: Gemma 3 12B, Llama 3.2 1B
│   └── remote: Claude (research explainers)
├── Grounding checks on model output
└── ChromaDB retrieval
        ↓
SQLite (one schema) + Obsidian vault
        ↓
Scheduled jobs (launchd)
├── energy budget + crash forecast, mornings
├── research agent + newspaper, daily
└── push sweep, every 30 min`}</pre>
        <div className={styles.prose}>
          <p>
            <strong>Every concept has one definition, shared by every feature.</strong> A pressure swing is a day with
            a 9+ hPa hourly range or an 8+ hPa shift from the day before, and that one function drives the feed&apos;s
            advance warnings, the symptom correlation charts, and the nightly pattern analysis. Symptoms, journal
            entries, mood, medications, pressure, air quality, pollen, steps, and screen time all land in the same
            database, so a new signal joins the existing analysis instead of needing its own.
          </p>
          <p>
            Nothing is hardcoded as &ldquo;if A and B, then alert.&rdquo; The system stores observations, computes
            baselines, and lets correlations show up on their own. Pressure comes from Open-Meteo every 30 minutes,
            ground-sensor air quality from PurpleAir, and pollen through{' '}
            <Link href="/stormglass" className={styles.inlineLink}>Stormglass</Link>. A 36-hour forecast puts a card
            in the feed and a push notification on my phone before a swing arrives, and the correlation charts later
            show whether it actually lined up with bad days.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Designed for Bad Days</h2>
        <div className={styles.panels}>
          {BAD_DAYS.map((p) => (
            <section key={p.title} className={styles.panel}>
              <h3 className={styles.panelTitle}>{p.title}</h3>
              <p className={styles.panelDescription}>{p.description}</p>
              {p.takeaway && <p className={styles.panelTakeaway}>{p.takeaway}</p>}
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Case Studies</h2>
        <div className={styles.caseStudies}>
          {CASE_STUDIES.map((study) => (
            <article key={study.title} className={styles.caseStudy}>
              <h3 className={styles.panelTitle}>{study.title}</h3>
              <div className={styles.caseGrid}>
                <div>
                  <span className={styles.caseLabel}>PROBLEM</span>
                  <p>{study.problem}</p>
                </div>
                <div>
                  <span className={styles.caseLabel}>SOLUTION</span>
                  <p>{study.solution}</p>
                </div>
                <div>
                  <span className={styles.caseLabel}>RESULT</span>
                  <p>{study.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Local-First</h2>
        <div className={styles.panels}>
          {LOCAL_FIRST.map((item) => (
            <section key={item.title} className={styles.panel}>
              <h3 className={styles.panelTitle}>{item.title}</h3>
              <p className={styles.panelDescription}>{item.description}</p>
            </section>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
