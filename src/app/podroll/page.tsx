import type { Metadata } from 'next';
import SlashPage, { Empty, LinkList } from '@/components/SlashPage';
import { podroll } from '@/data/slash';

export const metadata: Metadata = { title: 'Podroll | Kate Thompson' };

export default function PodrollPage() {
    return (
        <SlashPage slug="podroll" title="Podroll" intro={<p>Podcasts I listen to.</p>}>
            {podroll.length ? <LinkList items={podroll} /> : <Empty>Nothing listed yet.</Empty>}
        </SlashPage>
    );
}
