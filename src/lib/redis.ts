import { createHmac } from 'node:crypto';
import { Redis } from '@upstash/redis';

// The Vercel integration may inject either naming scheme
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

// Null until the Upstash integration is connected in Vercel; routes answer 503 and the UI shows NO SIGNAL
export const redis = url && token ? new Redis({ url, token }) : null;

export const offline = () => Response.json({ error: 'storage offline' }, { status: 503 });

// Keyed hash so rate-limit keys never hold a raw IP; plain SHA-256 of IPv4 is brute-forceable
export function clientIp(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    return createHmac('sha256', token ?? '').update(ip).digest('hex').slice(0, 32);
}

// One action per IP per window; returns false when the IP already acted
export async function claim(r: Redis, key: string, seconds: number) {
    return (await r.set(key, 1, { nx: true, ex: seconds })) === 'OK';
}

export interface Entry {
    id: string;
    name: string;
    site: string;
    message: string;
    at: string;
}
