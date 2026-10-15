import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../page.module.scss';
import GalleryGrid from '@/components/GalleryGrid';
import Footer from '@/components/Footer';
import { categories } from '../data';

export const dynamicParams = false;

export function generateStaticParams() {
    return categories.map(({ slug }) => ({ slug }));
}

export default async function BeyondCodeCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);
    if (!category) notFound();

    return (
        <main className={`${styles.main} ${category.layout === 'photo' ? styles.mainWide : ''}`}>
            <div className={styles.backLink}>
                <Link href="/beyond-code">← Back to Beyond Code</Link>
            </div>
            <h1 className={styles.pageTitle}>{category.title}</h1>
            <p className={styles.pageDescription}>{category.description}</p>

            <GalleryGrid
                sections={category.sections}
                variant={category.layout}
                headingClassName={styles.sectionLabel}
                introClassName={styles.pageDescription}
            />
            <Footer />
        </main>
    );
}
