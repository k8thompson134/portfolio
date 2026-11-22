import type { Metadata } from 'next';
import SlashPage from '@/components/SlashPage';
import Guestbook from '@/components/Guestbook';

export const metadata: Metadata = { title: 'Guestbook | Kate Thompson' };

export default function GuestbookPage() {
    return (
        <SlashPage
            slug="guestbook"
            title="Visitor Log"
            intro={<p>Sign the log before you leave. Entries show up after I read them.</p>}
        >
            <Guestbook />
        </SlashPage>
    );
}
