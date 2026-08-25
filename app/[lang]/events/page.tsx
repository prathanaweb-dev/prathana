import type { Metadata } from 'next';
import { getEvents, getReports } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsClient from './EventsClient';

interface EventsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isMr = lang === 'mr';

  const title = isMr
    ? 'ब्लॉग आणि अधिकृत अहवाल | प्रार्थना फाउंडेशन सोलापूर'
    : 'Blogs, Stories & Official Reports | Prathana Foundation';
  const description = isMr
    ? 'संस्थेचे प्रत्यक्ष सेवा कार्य, प्रगती, घडामोडी आणि सर्व प्रमाणित वार्षिक वित्तीय अहवाल व पारदर्शकता केंद्र.'
    : 'Latest ground updates, humanitarian stories, annual impact reports, and certified financial audits from Prathana Foundation Solapur.';

  const url = `https://prarthanafoundation.org/${lang}/events`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Prathana Foundation Solapur',
      type: 'article',
      images: [
        {
          url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_k1puoc.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://prarthanafoundation.org/en/events',
        mr: 'https://prarthanafoundation.org/mr/events',
      },
    },
  };
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang } = await params;
  const events = await getEvents();
  const reports = await getReports();

  return (
    <div className="relative min-h-screen bg-brand-paper bg-grid-pattern overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-saffron/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-3.5s' }} />

      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24 z-10">
        <EventsClient
          lang={lang}
          initialEvents={events}
          initialReports={reports}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
