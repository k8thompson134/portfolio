import styles from './page.module.scss';
import WhereToApp from '@/components/WhereToApp';

export default function WhereTo() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Where To?</h1>
            <p className={styles.description}>
                Optimize your itinerary. Find the best route for your errands.
            </p>

            <div className={styles.appContainer} style={{ height: 'auto', background: 'transparent', padding: 0, border: 'none' }}>
                <WhereToApp />
            </div>
        </main>
    );
}
