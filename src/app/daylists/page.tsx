import type { Metadata } from 'next';
import SlashPage, { Empty } from '@/components/SlashPage';
import styles from '@/components/SlashPage.module.scss';
import { daylists } from '@/data/slash';

export const metadata: Metadata = { title: 'Daylists | Kate Thompson' };

export default function DaylistsPage() {
    return (
        <SlashPage slug="daylists" title="Daylists" intro={<p>The names Spotify gives my daylist, collected.</p>}>
            {daylists.length ? (
                <ul className={styles.list}>
                    {daylists.map((d) => (
                        <li key={d.title}>
                            <span>{d.title}</span>
                            {d.date && <span className={styles.note}>{d.date}</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <Empty>No daylists collected yet.</Empty>
            )}
        </SlashPage>
    );
}
