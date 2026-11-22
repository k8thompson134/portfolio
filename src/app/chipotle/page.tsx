import type { Metadata } from 'next';
import SlashPage, { Empty } from '@/components/SlashPage';
import styles from '@/components/SlashPage.module.scss';
import { chipotleOrder } from '@/data/slash';

export const metadata: Metadata = { title: 'Chipotle Order | Kate Thompson' };

export default function ChipotlePage() {
    return (
        <SlashPage slug="chipotle" title="My Chipotle Order" intro={<p>In case you&apos;re ever ordering for me.</p>}>
            {chipotleOrder.length ? (
                <dl className={styles.dl}>
                    {chipotleOrder.map((row) => (
                        <div key={row.item} style={{ display: 'contents' }}>
                            <dt>{row.item}</dt>
                            <dd>{row.choice}</dd>
                        </div>
                    ))}
                </dl>
            ) : (
                <Empty>Order not on file yet.</Empty>
            )}
        </SlashPage>
    );
}
