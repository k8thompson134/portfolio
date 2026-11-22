import type { Metadata } from 'next';
import Image from 'next/image';
import QRCode from 'qrcode';
import { card } from '@/data/slash';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Kate Thompson · Card',
    description: 'Contact info for Kate Thompson, software engineer in Milwaukee.',
};

export default async function CardPage() {
    const qr = await QRCode.toString(`${card.url}/card`, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });

    return (
        <main className={styles.page}>
            <article className={styles.card}>
                {card.image ? (
                    <Image src={card.image} alt="" width={800} height={500} className={styles.art} priority />
                ) : (
                    <div className={styles.artSlot} aria-hidden="true" />
                )}

                <header className={styles.head}>
                    <h1>{card.name}</h1>
                    <p>{card.title} · {card.location}</p>
                </header>

                <ul className={styles.contacts}>
                    <li>
                        <span>Email</span>
                        <a href={`mailto:${card.email}`}>{card.email}</a>
                    </li>
                    {card.phone && (
                        <li>
                            <span>Phone</span>
                            <a href={`tel:${card.phone.replace(/[^\d+]/g, '')}`}>{card.phone}</a>
                        </li>
                    )}
                    {card.socials.filter((s) => s.handle).map((s) => (
                        <li key={s.label}>
                            <span>{s.label}</span>
                            {s.url ? (
                                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.handle}</a>
                            ) : (
                                <b>{s.handle}</b>
                            )}
                        </li>
                    ))}
                    <li>
                        <span>Web</span>
                        <a href={card.url}>{card.url.replace('https://', '')}</a>
                    </li>
                </ul>

                <a className={styles.save} href="/card/kate.vcf" download>
                    Save contact
                </a>

                <figure className={styles.qr}>
                    <div dangerouslySetInnerHTML={{ __html: qr }} />
                    <figcaption>Scan to open this card</figcaption>
                </figure>
            </article>
        </main>
    );
}
