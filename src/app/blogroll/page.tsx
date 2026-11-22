import type { Metadata } from 'next';
import SlashPage, { Empty, LinkList } from '@/components/SlashPage';
import { blogroll } from '@/data/slash';

export const metadata: Metadata = { title: 'Blogroll | Kate Thompson' };

export default function BlogrollPage() {
    return (
        <SlashPage slug="blogroll" title="Blogroll" intro={<p>Blogs and personal sites I read.</p>}>
            {blogroll.length ? <LinkList items={blogroll} /> : <Empty>Nothing listed yet.</Empty>}
        </SlashPage>
    );
}
