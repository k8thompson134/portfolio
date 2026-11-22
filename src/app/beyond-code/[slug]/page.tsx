import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../page.module.scss';
import GalleryGrid from '@/components/GalleryGrid';
import Screensaver from '@/components/Screensaver';
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

    const gallery = (
        <GalleryGrid
            sections={category.sections}
            variant={category.layout}
            headingClassName={styles.sectionLabel}
            introClassName={styles.pageDescription}
        />
    );

    return (
        <main
            className={`${styles.main} ${category.layout === 'photo' || category.layout === 'render' ? styles.mainWide : ''} ${category.layout === 'render' ? styles.desktop : ''}`}
        >
            <div className={styles.backLink}>
                <Link href="/beyond-code">← Back to Beyond Code</Link>
            </div>
            <h1 className={styles.pageTitle}>{category.title}</h1>
            <p className={styles.pageDescription}>{category.description}</p>
            {category.layout === 'render' ? (
                <>
                    <Screensaver
                        items={category.sections.flatMap((section) => section.items)}
                        bug="/images/beyond-code/3d-k8tv.webp"
                    />
                    {gallery}
                </>
            ) : (
                gallery
            )}
            <Footer />
        </main>
    );
}
