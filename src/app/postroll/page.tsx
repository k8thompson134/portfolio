import type { Metadata } from 'next';
import SlashPage, { Empty, LinkList } from '@/components/SlashPage';
import { postroll } from '@/data/slash';

export const metadata: Metadata = { title: 'Postroll | Kate Thompson' };

export default function PostrollPage() {
    return (
        <SlashPage slug="postroll" title="Postroll" intro={<p>Single posts and articles I keep coming back to.</p>}>
            {postroll.length ? <LinkList items={postroll} /> : <Empty>Nothing listed yet.</Empty>}
        </SlashPage>
    );
}
