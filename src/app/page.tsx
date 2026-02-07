import styles from './page.module.scss';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>The K8 Control Panel</h1>

      <h2 className={styles.sectionLabel}>About Me</h2>
      <p className={styles.bio}><b>I'm a software engineering student at MSOE who takes projects from problem to production. </b><br />
        My projects include RantTrack (a voice-first symptom tracker in React Native), contributions to the Progressive Learning Platform (an assembly language IDE for students), and eSubmit (a Ruby on Rails submission system with Docker deployment).
        I approach projects methodically: understand the problem, research solutions, gather requirements, then plan implementation. I learned how to break down large problems from nearly a decade organizing technical events, Women in STEM meetups as a FIRST Ladies regional partner with my robotics team in high school, conference planning through SWE, and cultural celebrations as outreach chair of my sorority.
        I'm comfortable with the full project lifecycle: user research, requirements documentation, development, and knowledge transfer. Beyond coding, I've taught programming, write technical documentation that people actually use, present technical concepts clearly, and handle graphic design and visual communication. Milwaukee-based, graduating May 2027.
        <br /><br /><b>I work with React Native, Flutter, Ruby on Rails, Java, TypeScript, and Python. I'm interested in opportunities in health tech, educational software, robotics, manufacturing, and mission-driven organizations.</b>
      </p>

      <h2 className={styles.sectionLabel}>Mission Log</h2>
      <div className={styles.grid}>
        <ProjectCard
          title="RantTrack"
          description="Natural Language Processing symptom tracker for chronic illness management. Designed for tracking symptoms on their worst days. Built using React Native with local-first data."
          tech={['React Native', 'TypeScript', 'SQLite', 'Expo']}
          status="live"
          href="/ranttrack"
        />
        <ProjectCard
          title="Magic Pace Ball"
          description="Flutter running pacing oracle with on-device LLM for real-time pacing advice. No cloud dependency for privacy."
          tech={['Flutter', 'Dart', 'On-Device LLM']}
          status="wip"
          href="/magic-pace-ball"
        />
        <ProjectCard
          title="Progresive Learning Platform"
          description="Assembly language compiler built for students to replace an outdated software used in computer architecture courses to include modern IDE features while also implementing features to make learning assembly less intimidating."
          tech={['Java', 'JavaFX', 'JUnit', 'Mockito', 'MIPS Assembly', 'Lombok', 'Google Guava']}
          status="live"
        />
        <ProjectCard
          title="eSubmit"
          description="Assignment submittal tool and autograder for programming assignments in multiple languages."
          tech={['Ruby On Rails', 'SQLite', 'AngularJS', 'Docker', 'LDAP', 'jQuery', 'RSpec']}
          status="live"
        />
        <ProjectCard
          title="Where To?"
          description="I want to get coffee, go to a book store, hit a thrift shop, and get sushi for lunch. So many different coffee brands, so many thrift shops in the Milwaukee area, Where To helps you find the options that give you the itinerary that makes the best route. Scenic route feature coming soon!"
          tech={['JavaScript', 'Google Maps API']}
          status="wip"
          href="/where-to"
        />
      </div>

    </main>
  );
}
