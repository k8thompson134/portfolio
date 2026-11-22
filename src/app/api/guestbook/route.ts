import { claim, clientIp, offline, redis, type Entry } from '@/lib/redis';

export async function GET() {
    if (!redis) return offline();
    const entries = await redis.lrange<Entry>('guestbook:approved', 0, 199);
    return Response.json(entries);
}

export async function POST(req: Request) {
    if (!redis) return offline();
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) return Response.json({ error: 'bad request' }, { status: 400 });
    // Honeypot: the "website" field is hidden from people, so only bots fill it
    if (body.website) return Response.json({ ok: true });

    const name = String(body.name ?? '').trim().slice(0, 40);
    const site = String(body.site ?? '').trim().slice(0, 100);
    const message = String(body.message ?? '').trim().slice(0, 500);
    if (!name || !message) return Response.json({ error: 'name and message are required' }, { status: 400 });
    if (site && !/^https?:\/\/[^\s]+$/.test(site)) return Response.json({ error: 'site must start with http(s)://' }, { status: 400 });

    if (!(await claim(redis, `guestbook:ip:${clientIp(req)}`, 600))) {
        return Response.json({ error: 'one entry every 10 minutes, please' }, { status: 429 });
    }

    const entry: Entry = { id: crypto.randomUUID(), name, site, message, at: new Date().toISOString() };
    await redis.hset('guestbook:pending', { [entry.id]: entry });
    return Response.json({ ok: true });
}
