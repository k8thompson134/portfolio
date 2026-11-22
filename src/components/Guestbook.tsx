'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { Entry } from '@/lib/redis';
import styles from './Guestbook.module.scss';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Guestbook() {
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [offline, setOffline] = useState(false);
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/guestbook')
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then(setEntries)
            .catch(() => setOffline(true));
    }, []);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');
        const res = await fetch('/api/guestbook', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
        }).catch(() => null);
        if (res?.ok) {
            setStatus('sent');
            form.reset();
        } else {
            setStatus('error');
            setError((await res?.json().catch(() => null))?.error ?? 'The log is offline. Try again later.');
        }
    }

    if (offline) return <p className={styles.offline}>NO SIGNAL. The visitor log is offline right now.</p>;

    return (
        <>
            <form className={styles.form} onSubmit={submit}>
                <label>
                    Name
                    <input name="name" required maxLength={40} autoComplete="nickname" />
                </label>
                <label>
                    Your site <span className={styles.optional}>(optional)</span>
                    <input name="site" type="url" maxLength={100} placeholder="https://" />
                </label>
                <label className={styles.honeypot} aria-hidden="true">
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <label>
                    Message
                    <textarea name="message" required maxLength={500} rows={4} />
                </label>
                <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Transmitting…' : 'Sign the log'}
                </button>
                {status === 'sent' && <p className={styles.ok}>Received. It will appear once I&apos;ve read it.</p>}
                {status === 'error' && <p className={styles.err} role="alert">{error}</p>}
            </form>

            <ol className={styles.entries}>
                {entries === null && <li className={styles.meta}>Loading the log…</li>}
                {entries?.length === 0 && <li className={styles.meta}>No entries yet. Be the first.</li>}
                {entries?.map((entry) => (
                    <li key={entry.id}>
                        <p className={styles.meta}>
                            {entry.site ? (
                                <a href={entry.site} target="_blank" rel="noopener noreferrer nofollow ugc">{entry.name}</a>
                            ) : (
                                <b>{entry.name}</b>
                            )}{' '}
                            · {new Date(entry.at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <p className={styles.message}>{entry.message}</p>
                    </li>
                ))}
            </ol>
        </>
    );
}
