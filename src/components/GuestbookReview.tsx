'use client';

import { useEffect, useState } from 'react';
import type { Entry } from '@/lib/redis';
import styles from './Guestbook.module.scss';

export default function GuestbookReview() {
    const [token, setToken] = useState('');
    const [pending, setPending] = useState<Entry[] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('guestbook-token');
        if (saved) load(saved);
        // load is stable enough here: it only runs once, with the saved token
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function load(t = token) {
        const res = await fetch('/api/guestbook/review', { headers: { authorization: `Bearer ${t}` } }).catch(() => null);
        setToken(t);
        setError('');
        if (!res?.ok) {
            setError(res?.status === 401 ? 'Wrong token.' : 'The log is offline.');
            return;
        }
        localStorage.setItem('guestbook-token', t);
        setPending(await res.json());
    }

    async function act(id: string, action: 'approve' | 'reject') {
        const res = await fetch('/api/guestbook/review', {
            method: 'POST',
            headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
            body: JSON.stringify({ id, action }),
        }).catch(() => null);
        if (res?.ok) setPending((p) => p?.filter((e) => e.id !== id) ?? null);
        else setError('That action did not go through.');
    }

    return (
        <>
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); load(); }}>
                <label>
                    Admin token
                    <input type="password" value={token} onChange={(e) => setToken(e.target.value)} autoComplete="current-password" />
                </label>
                <button type="submit">Load pending</button>
                {error && <p className={styles.err} role="alert">{error}</p>}
            </form>

            <ol className={styles.entries}>
                {pending?.length === 0 && <li className={styles.meta}>Nothing waiting.</li>}
                {pending?.map((entry) => (
                    <li key={entry.id}>
                        <p className={styles.meta}>
                            <b>{entry.name}</b> {entry.site && `· ${entry.site}`} · {new Date(entry.at).toLocaleString()}
                        </p>
                        <p className={styles.message}>{entry.message}</p>
                        <p>
                            <button type="button" onClick={() => act(entry.id, 'approve')}>Approve</button>{' '}
                            <button type="button" onClick={() => act(entry.id, 'reject')}>Reject</button>
                        </p>
                    </li>
                ))}
            </ol>
        </>
    );
}
