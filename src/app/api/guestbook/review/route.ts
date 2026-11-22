import { offline, redis, type Entry } from '@/lib/redis';

function authorized(req: Request) {
    const token = process.env.GUESTBOOK_ADMIN_TOKEN;
    return Boolean(token) && req.headers.get('authorization') === `Bearer ${token}`;
}

export async function GET(req: Request) {
    if (!redis) return offline();
    if (!authorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
    const pending = (await redis.hgetall<Record<string, Entry>>('guestbook:pending')) ?? {};
    return Response.json(Object.values(pending).sort((a, b) => a.at.localeCompare(b.at)));
}

export async function POST(req: Request) {
    if (!redis) return offline();
    if (!authorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
    const { id, action } = (await req.json()) as { id: string; action: 'approve' | 'reject' };
    const entry = await redis.hget<Entry>('guestbook:pending', id);
    if (!entry) return Response.json({ error: 'not found' }, { status: 404 });
    if (action === 'approve') await redis.lpush('guestbook:approved', entry);
    await redis.hdel('guestbook:pending', id);
    return Response.json({ ok: true });
}
