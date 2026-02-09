import styles from './page.module.scss';
import HeroTitle from '@/components/HeroTitle';
import ProfileCard from '@/components/ProfileCard';
import TechStack from '@/components/TechStack';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroTitle />

      <section id="about">
        <h2 className={styles.sectionLabel}>About Me</h2>
        <ProfileCard imageSrc="/images/avatar.png" />
        <p className={styles.bio}>
          <b>I'm a software engineering student at MSOE who takes projects from problem to production. </b><br />
          My projects include RantTrack (a voice-first symptom tracker in React Native), contributions to the Progressive Learning Platform (an assembly language IDE for students), and eSubmit (a Ruby on Rails submission system with Docker deployment).
          I approach projects methodically: understand the problem, research solutions, gather requirements, then plan implementation. I learned how to break down large problems from nearly a decade organizing technical events, Women in STEM meetups as a FIRST Ladies regional partner with my robotics team in high school, conference planning through SWE, and cultural celebrations as outreach chair of my sorority.
          I'm comfortable with the full project lifecycle: user research, requirements documentation, development, and knowledge transfer. Beyond coding, I've taught programming, write technical documentation that people actually use, present technical concepts clearly, and handle graphic design and visual communication.
        </p>
        <TechStack />
      </section>

      <section id="projects">
        <h2 className={styles.sectionLabel}>Mission Log</h2>
        <div className={styles.grid}>
          <ProjectCard
            title="RantTrack"
            description="Voice-first symptom tracker for chronically ill users. A custom NLP engine extracts symptoms, severity, and pain details from natural speech so users can log how they feel just by talking. 100% local, zero cloud dependency."
            tech={['React Native', 'TypeScript', 'SQLite', 'Expo']}
            status="live"
            href="/ranttrack"
            github="https://github.com/k8thompson134/rant-app"
          />
          <ProjectCard
            title="Magic Pace Ball"
            description="Flutter running pacing oracle with on-device LLM for real-time pacing advice. No cloud dependency for privacy."
            tech={['Flutter', 'Dart', 'On-Device LLM']}
            status="wip"
            href="/magic-pace-ball"
            github="https://github.com/k8thompson134/magic-pace-ball"
          />
          <ProjectCard
            title="Where To?"
            description="I want to get coffee, go to a book store, hit a thrift shop, and get sushi for lunch. So many different coffee brands, so many thrift shops in the Milwaukee area, Where To helps you find the options that give you the itinerary that makes the best route. Scenic route feature coming soon!"
            tech={['JavaScript', 'Google Maps API']}
            status="live"
            href="/where-to"
            github="https://github.com/k8thompson134/where-to"
          />
          <ProjectCard
            title="Progresive Learning Platform"
            description="Assembly language compiler built for students to replace an outdated software used in computer architecture courses to include modern IDE features while also implementing features to make learning assembly less intimidating."
            tech={['Java', 'JavaFX', 'JUnit', 'Mockito', 'MIPS Assembly', 'Lombok', 'Google Guava']}
            status="live"
          />
          <ProjectCard
            title="eSubmit"
            description="Assignment submittal tool and autograder used in for programming assignments in multiple languages. Team focused on updating the docker infastructure and views for both students and instructors."
            tech={['Ruby On Rails', 'SQLite', 'AngularJS', 'Docker', 'LDAP', 'jQuery', 'RSpec']}
            status="live"
          />
        </div>
      </section>

      <section id="beyond-code">
        <h2 className={styles.sectionLabel}>Beyond Code</h2>
        <div className={styles.categoryGrid}>
          <CategoryCard
            title="Logo Design"
            description="Logos I've designed that were officially adopted, including process work and iterations."
            count={10}
            href="/beyond-code/logos"
          />
          <CategoryCard
            title="Crafts"
            description="Cross stitch, upcycled teacup candles, and other handmade projects."
            count={3}
            href="/beyond-code/crafts"
          />
          <CategoryCard
            title="Posters & Flyers"
            description="Event promotion and materials for YDSA, KSM, and campus organizations."
            count={7}
            href="/beyond-code/posters"
          />
          <CategoryCard
            title="Events Hosted"
            description="SWE conferences, cultural celebrations, and community events I've organized."
            count={10}
            href="/beyond-code/events"
          />
        </div>
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}
