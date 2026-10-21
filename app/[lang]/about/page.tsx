import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getPageContent } from '@/lib/db';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isMr = lang === 'mr';

  const title = isMr
    ? 'आमचा प्रवास व बालग्राम कथा | प्रार्थना फाउंडेशन सोलापूर'
    : 'Our Story & Heritage | Prathana Foundation Solapur';
  const description = isMr
    ? 'प्रसाद आणि अनुराधा शिंदे यांनी सुरू केलेला त्याग आणि समर्पणाचा प्रवास — प्रार्थना बालग्राम आणि वृद्धाश्रम.'
    : 'Discover the inspiring journey of Prasad & Anuradha Shinde and how a personal sacrifice gave birth to Prathana Balgram sanctuary in Solapur.';

  const url = `https://prarthanafoundation.org/${lang}/about`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Prathana Foundation Solapur',
      images: ['/balgram-home.jpg'],
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://prarthanafoundation.org/en/about',
        mr: 'https://prarthanafoundation.org/mr/about',
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  
  // Server-side pre-fetching
  const aboutContent = await getPageContent('about');

  return (
    <AboutClient
      lang={lang}
      initialContent={aboutContent}
    />
  );
}
