import Link from 'next/link';
import styles from './page.module.scss';
import HeroTitle from '@/components/HeroTitle';
import ProfileCard from '@/components/ProfileCard';
import ProjectCard from '@/components/ProjectCard';
import ProjectRow from '@/components/ProjectRow';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroTitle />

      <section id="about">
        <h2 className={styles.sectionLabel}>About Me</h2>
        <ProfileCard imageSrc="/images/avatar.png" />
        <p className={styles.intro}>
          <b>I&apos;m a software engineering student at MSOE who takes projects from problem to production.</b>{' '}
          Currently running: a voice-first symptom tracker, a civic tech tool for Milwaukee, and a homelab
          with its own AI stack.
        </p>
        <Link href="/about" className={styles.moreLink}>More about me and my tech stack →</Link>
      </section>

      <section id="projects">
        <h2 className={styles.sectionLabel}>Mission Log</h2>
        <div className={styles.grid}>
          <ProjectCard
            title="RantTrack"
            description="Voice-first symptom tracker for chronically ill users. A custom NLP engine turns natural speech into logged symptoms, severity, and pain details. 100% local."
            tech={['React Native', 'TypeScript', 'SQLite', 'Expo']}
            status="live"
            href="/ranttrack"
            github="https://github.com/k8thompson134/rant-app"
          />
          <ProjectCard
            title="Stormglass"
            description="Environmental health tracker that correlates barometric pressure, air quality, geomagnetic activity, and pollen with symptoms to forecast flare risk for ME/CFS, POTS, and migraines."
            tech={['React', 'TypeScript', 'Fastify', 'PostgreSQL']}
            status="live"
            href="/stormglass"
            liveUrl="https://mystormglass.xyz"
            github="https://github.com/k8thompson134/Stormglass"
          />
          <ProjectCard
            title="Cream City Docket"
            description="Milwaukee city government, made understandable. Plain-English summaries and email alerts for Common Council legislation, so residents can act before votes happen."
            tech={['React', 'FastAPI', 'PostgreSQL', 'Claude API']}
            status="live"
            href="/docket"
            liveUrl="https://creamcitydocket.com"
            github="https://github.com/k8thompson134/Cream-City-Docket"
          />
          <ProjectCard
            title="Local Personal AI System"
            description="A Flask and Discord bot system orchestrating Ollama, n8n, and external APIs around one SQLite schema, including a live daily research pipeline for Long COVID and ME/CFS papers."
            tech={['Flask', 'Ollama', 'n8n', 'Claude API']}
            status="live"
            href="/local-personal-ai"
            liveUrl="https://research.k8thompson.dev/research-public"
          />
        </div>

        <h3 className={styles.subLabel}>More Projects</h3>
        <div className={styles.rows}>
          <ProjectRow
            title="Homelab Stack"
            summary="Local-first AI infrastructure on a Mac mini: Ollama, Open WebUI, n8n, ChromaDB, and SearXNG under tight memory limits."
            tech={['Docker Compose', 'Ollama', 'n8n', 'ChromaDB']}
            status="live"
            href="/homelab"
          />
          <ProjectRow
            title="Pattern Maker"
            summary="Compose cross-stitch patterns from text, icons, and borders, then export printable PDF charts with a DMC thread legend."
            tech={['React', 'TypeScript', 'Vite', 'jsPDF']}
            status="live"
            href="/pattern-maker"
            liveUrl="https://patterns.k8thompson.dev"
            github="https://github.com/k8thompson134/pattern-maker"
          />
          <ProjectRow
            title="Signal Tuner"
            summary="A signal decoder game played inside a working Winamp 2 player on a Windows 98 desktop at 3 AM."
            tech={['TypeScript', 'Vite', 'Webamp', 'Web Audio API']}
            status="live"
            href="/signal-tuner"
            liveUrl="https://tuner.k8thompson.dev"
            github="https://github.com/k8thompson134/tuner-I-hardly-know-er-"
          />
          <ProjectRow
            title="Where To?"
            summary="Plans the best Milwaukee errand route across coffee shops, bookstores, thrift shops, and restaurants."
            tech={['Next.js', 'TypeScript', 'Google Maps API', 'Claude API']}
            status="live"
            liveUrl="https://whereto.k8thompson.dev"
            github="https://github.com/k8thompson134/where-to"
          />
          <ProjectRow
            title="Portfolio Website"
            summary="The site you are visiting, built with a custom control-panel design."
            tech={['Next.js', 'React', 'TypeScript', 'SCSS']}
            status="live"
            github="https://github.com/k8thompson134/portfolio"
          />
          <ProjectRow
            title="Progressive Learning Platform"
            summary="Assembly language IDE that replaces outdated software in computer architecture courses with modern editor features."
            tech={['Java', 'JavaFX', 'JUnit', 'MIPS Assembly']}
            status="coursework"
          />
          <ProjectRow
            title="eSubmit"
            summary="Assignment submission tool and autograder for programming courses; I worked on the Docker infrastructure and the student and instructor views."
            tech={['Ruby on Rails', 'AngularJS', 'Docker', 'RSpec']}
            status="coursework"
          />
        </div>
      </section>

      <section id="beyond-code">
        <h2 className={styles.sectionLabel}>Beyond Code</h2>
        <p className={styles.intro}>
          Logo design, crafts, posters, and the events I&apos;ve organized outside of software.
        </p>
        <Link href="/beyond-code" className={styles.moreLink}>Explore Beyond Code →</Link>
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}
