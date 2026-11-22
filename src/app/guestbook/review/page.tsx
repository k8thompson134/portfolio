import type { Metadata } from 'next';
import SlashPage from '@/components/SlashPage';
import GuestbookReview from '@/components/GuestbookReview';

export const metadata: Metadata = { title: 'Review Guestbook', robots: { index: false } };

export default function GuestbookReviewPage() {
    return (
        <SlashPage slug="guestbook/review" title="Review Entries">
            <GuestbookReview />
        </SlashPage>
    );
}
