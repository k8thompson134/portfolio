import { claim, clientIp, offline, redis } from '@/lib/redis';
import { poll } from '@/data/slash';

const key = `poll:${poll.id}`;

async function tally() {
    const raw = (await redis!.hgetall<Record<string, number>>(key)) ?? {};
    return poll.options.map((_, i) => Number(raw[i] ?? 0));
}

export async function GET() {
    if (!redis) return offline();
    return Response.json({ votes: await tally() });
}

export async function POST(req: Request) {
    if (!redis) return offline();
    const { option } = (await req.json().catch(() => ({}))) as { option?: number };
    if (!Number.isInteger(option) || option! < 0 || option! >= poll.options.length) {
        return Response.json({ error: 'bad option' }, { status: 400 });
    }
    if (!(await claim(redis, `${key}:ip:${clientIp(req)}`, 60 * 60 * 24 * 30))) {
        return Response.json({ error: 'already voted', votes: await tally() }, { status: 409 });
    }
    await redis.hincrby(key, String(option), 1);
    return Response.json({ votes: await tally() });
}
