import { offline, redis } from '@/lib/redis';

export async function GET() {
    if (!redis) return offline();
    return Response.json({ count: (await redis.get<number>('counter:visits')) ?? 0 });
}

// The client calls this once per browser session, so reloads don't count twice
export async function POST() {
    if (!redis) return offline();
    return Response.json({ count: await redis.incr('counter:visits') });
}
