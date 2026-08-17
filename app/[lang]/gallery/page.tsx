import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import { getGalleryPhotos } from '@/lib/db';

interface GalleryPageProps {
  params: Promise<{ lang: string }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { lang } = await params;
  const photos = await getGalleryPhotos();

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-24 pb-20">
        <Gallery lang={lang} initialPhotos={photos} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
