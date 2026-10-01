import styles from '../page.module.scss';
import ProfileCard from '@/components/ProfileCard';
import AboutContent from '@/components/AboutContent';
import TechStack from '@/components/TechStack';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.backLink}>
        <a href="/">← Back to Command Center</a>
      </div>
      <h1 className={styles.pageTitle}>About Me</h1>
      <ProfileCard imageSrc="/images/avatar.png" />
      <AboutContent />
      <TechStack />
      <ContactSection />
      <Footer />
    </main>
  );
}
