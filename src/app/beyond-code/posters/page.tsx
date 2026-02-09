import styles from '../../page.module.scss';
import CreativeCard from '@/components/CreativeCard';

export default function PostersPage() {
    return (
        <main className={styles.main}>
            <div className={styles.backLink}>
                <a href="/">← Back to Command Center</a>
            </div>

            <h1 className={styles.pageTitle}>Posters & Flyers</h1>
            <p className={styles.pageDescription}>
                Event promotion and organizational materials for YDSA, KSM, and campus organizations.
            </p>

            <div className={styles.creativeGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                <CreativeCard
                    title="Artists & Makers"
                    category="KSM Sorority"
                    imageSrc="/images/creative work/Calling all artists, crafters, and makers!.png"
                    portrait
                />
                <CreativeCard
                    title="Fall Music Festival"
                    category="MKE YDSA"
                    imageSrc="/images/creative work/Fall Music Festival Invitation.png"
                    portrait
                />
                <CreativeCard
                    title="Election Flyer"
                    category="MSOE YDSA"
                    imageSrc="/images/creative work/YDSA Election flyer (36 x 48 in).png"
                    portrait
                />
                <CreativeCard
                    title="YDSA × SAGA"
                    category="MSOE YDSA"
                    imageSrc="/images/creative work/MSOE YDSA and SAGA(1).png"
                    portrait
                />
                <CreativeCard
                    title="Debate Watch Party"
                    category="MSOE YDSA"
                    imageSrc="/images/creative work/Debate watch party (8.5 x 11 in)(1).png"
                    portrait
                />
                <CreativeCard
                    title="Learn About Voting"
                    category="MSOE YDSA"
                    imageSrc="/images/creative work/Learn about.png"
                    portrait
                />
                <CreativeCard
                    title="All Students Welcome"
                    category="MSOE YDSA"
                    imageSrc="/images/creative work/No hate, No fear All studenst are welcome here! (Instagram Post).png"
                    portrait
                />

            </div>
        </main>
    );
}
