'use client';

import { useEffect, useState } from 'react';
import { poll } from '@/data/slash';
import type { FeedStatus } from './useFeed';
import { RackModule, Screen } from './parts';
import styles from './PollModule.module.scss';

const votedKey = `cp-poll:${poll.id}`;

export default function PollModule() {
  const [votes, setVotes] = useState<number[] | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [status, setStatus] = useState<FeedStatus>('loading');

  useEffect(() => {
    fetch('/api/poll')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: { votes: number[] }) => {
        const saved = localStorage.getItem(votedKey);
        if (saved !== null) setChoice(Number(saved));
        setVotes(json.votes);
        setStatus('live');
      })
      .catch(() => setStatus('nosignal'));
  }, []);

  async function vote(option: number) {
    setChoice(option);
    const res = await fetch('/api/poll', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ option }),
    }).catch(() => null);
    const json = await res?.json().catch(() => null);
    if (json?.votes) setVotes(json.votes);
    // A 409 means this connection already voted: show the results either way
    if (res?.ok || res?.status === 409) localStorage.setItem(votedKey, String(option));
    else setChoice(null);
  }

  const total = votes?.reduce((a, b) => a + b, 0) ?? 0;

  return (
    <RackModule
      label="OPINION POLL"
      code="MOD-11"
      accent="magenta"
      wide
      meta={`${poll.question} · ${total} ${total === 1 ? 'VOTE' : 'VOTES'} LOGGED`}
      status={status}
      info={
        <>
          <p>&gt; ONE VOTE PER VISITOR</p>
          <p>Flip a switch to vote. The results show once you have voted, and the question changes now and then.</p>
        </>
      }
    >
      <Screen glow="green">
        <div className={styles.screen}>
          <p className={styles.question}>{poll.question}</p>
          {choice === null ? (
            <div className={styles.switches}>
              {poll.options.map((opt, i) => (
                <button key={opt} type="button" className={styles.switch} onClick={() => vote(i)}>
                  <span className={styles.toggle} aria-hidden="true" />
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <ul className={styles.results}>
              {poll.options.map((opt, i) => {
                const pct = total ? Math.round(((votes?.[i] ?? 0) / total) * 100) : 0;
                return (
                  <li key={opt} className={i === choice ? styles.mine : ''}>
                    <span className={styles.opt}>{opt}</span>
                    <span className={styles.bar} style={{ ['--pct' as string]: `${pct}%` }} />
                    <span className={styles.pct}>{pct}%</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Screen>
    </RackModule>
  );
}
