import type { Metadata } from 'next';
import Link from 'next/link';
import SlashPage from '@/components/SlashPage';
import styles from '@/components/SlashPage.module.scss';

export const metadata: Metadata = { title: 'Self-hosting | Kate Thompson' };

const SERVICES = [
    { name: 'Lair', what: 'my personal AI system: health tracking, pacing, briefings, and research' },
    { name: 'Ollama', what: 'local language models, so personal data never leaves the machine' },
    { name: 'whisper.cpp', what: 'speech to text, loaded on demand' },
    { name: 'ChromaDB', what: 'vector search over my notes and papers' },
    { name: 'n8n', what: 'workflow automation' },
    { name: 'Gitea', what: 'my own Git server' },
    { name: 'SearXNG', what: 'private metasearch, off until needed' },
    { name: 'K8TV', what: 'my own TV channels on ErsatzTV, including a WeatherStar weather channel and Twitch relays' },
];

export default function SelfHostingPage() {
    return (
        <SlashPage
            slug="self-hosting"
            title="Self-hosting"
            intro={
                <p>
                    What I run on my own hardware: one 16 GB Mac mini in Milwaukee, reachable from my devices over Tailscale. The only
                    public door is a Cloudflare Tunnel to the{' '}
                    <a href="https://research.k8thompson.dev/research-public" target="_blank" rel="noopener noreferrer">research feed</a>.
                    The full architecture and memory budget are on the <Link href="/homelab">Homelab page</Link>.
                </p>
            }
        >
            <section className={styles.section}>
                <h2>Running</h2>
                <dl className={styles.dl}>
                    {SERVICES.map((s) => (
                        <div key={s.name} style={{ display: 'contents' }}>
                            <dt>{s.name}</dt>
                            <dd>{s.what}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </SlashPage>
    );
}
