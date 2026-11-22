'use client';

import { useEffect, useState } from 'react';

export type FeedStatus = 'loading' | 'live' | 'nosignal';

interface Cached<T> {
  at: number;
  data: T;
}

// Fetch a public feed once per `ttlMs`, keeping the last good copy in localStorage
// so revisits are instant and a dropped connection still shows recent data.
export function useFeed<T>(key: string, url: string, ttlMs: number, parse: (json: unknown) => T) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FeedStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    const storageKey = `cp-feed:${key}`;
    let cached: Cached<T> | null = null;
    try {
      cached = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    } catch {
      cached = null;
    }
    if (cached) {
      setData(cached.data);
      setStatus('live');
      if (Date.now() - cached.at < ttlMs) return;
    }

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        const parsed = parse(json);
        setData(parsed);
        setStatus('live');
        try {
          localStorage.setItem(storageKey, JSON.stringify({ at: Date.now(), data: parsed }));
        } catch {
          // Storage full or disabled: the reading still shows, it just isn't cached
        }
      })
      .catch(() => {
        if (!cancelled && !cached) setStatus('nosignal');
      });

    return () => {
      cancelled = true;
    };
    // parse is a module-level function per feed; url and key identify the request
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, url, ttlMs]);

  return { data, status };
}
