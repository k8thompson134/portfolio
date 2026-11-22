'use client';

import { useEffect, useState } from 'react';
import type { FeedStatus } from './useFeed';
import { Nixie, RackModule } from './parts';

export default function CounterModule() {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<FeedStatus>('loading');

  useEffect(() => {
    // Count each browser session once; later loads in the same session only read the total
    const counted = sessionStorage.getItem('cp-counted');
    fetch('/api/counter', { method: counted ? 'GET' : 'POST' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ count }: { count: number }) => {
        sessionStorage.setItem('cp-counted', '1');
        setCount(count);
        setStatus('live');
      })
      .catch(() => setStatus('nosignal'));
  }, []);

  return (
    <RackModule
      label="VISITOR COUNT"
      code="MOD-10"
      accent="orange"
      meta="ONE COUNT PER BROWSER SESSION · NO COOKIES"
      status={status}
      info={
        <>
          <p>&gt; VISITS SINCE POWER-ON</p>
          <p>Every visit to this panel, counted once per browser session. Only the total is stored: no names, no IPs.</p>
        </>
      }
    >
      <Nixie value={count === null ? '------' : String(count).padStart(6, '0')} label="Visitors" />
    </RackModule>
  );
}
