import styles from '../../page.module.scss';
import CreativeCard from '@/components/CreativeCard';

export default function EventsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.backLink}>
                <a href="/">← Back to Command Center</a>
            </div>
            <h1 className={styles.pageTitle}>Events Hosted</h1>
            <p className={styles.pageDescription}>
                Cultural celebrations, conferences, and community events I've organized through SWE and KSM.
            </p>

            <h2 className={styles.sectionLabel}>SWE Conference</h2>
            <div className={styles.creativeGrid}>
                <CreativeCard
                    title="Hands-On Future"
                    category="SWE · Hosted"
                    imageSrc="/images/creative work/swehandsonfuturecon1.jpg"
                />
                <CreativeCard
                    title="Conference Session"
                    category="SWE · Hosted"
                    imageSrc="/images/creative work/swehandsonfuturecon2.jpg"
                />
            </div>

            <h2 className={styles.sectionLabel}>KSM Cultural Events</h2>
            <div className={styles.creativeGrid}>
                <CreativeCard
                    title="Diwali Celebration"
                    category="KSM · Outreach Chair"
                    imageSrc="/images/creative work/diwalliwithksm.JPG"
                />
                <CreativeCard
                    title="Diwali Presentation"
                    category="KSM"
                    imageSrc="/images/creative work/diwalipresentaion.jpg"
                />
                <CreativeCard
                    title="Diwali Sand Art"
                    category="KSM"
                    imageSrc="/images/creative work/diwalisand.jpg"
                />
                <CreativeCard
                    title="Holi Festival"
                    category="KSM"
                    imageSrc="/images/creative work/Holi.jpg"
                />
                <CreativeCard
                    title="Holi Dance Class"
                    category="KSM"
                    imageSrc="/images/creative work/HoliDanceClass.jpg"
                />
                <CreativeCard
                    title="Piñata Making"
                    category="KSM"
                    imageSrc="/images/creative work/piniatamakingwithksm.jpg"
                    imagePosition="top"
                />
            </div>

            <h2 className={styles.sectionLabel}>Campus Panels</h2>
            <div className={styles.creativeGrid}>
                <CreativeCard
                    title="World Hijab Day Panel"
                    category="Hosted"
                    imageSrc="/images/creative work/hostedWHD pannel.jpg"
                />
                <CreativeCard
                    title="Panel Discussion"
                    category="Event Photo"
                    imageSrc="/images/creative work/worldhijabdaypanel.png"
                    imagePosition="top"
                />
            </div>
        </main>
    );
}
