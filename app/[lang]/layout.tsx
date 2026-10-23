import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import '../globals.css';
import { getPageContent } from '@/lib/db';
import { TranslationProvider } from '@/components/TranslationProvider';

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isMr = lang === 'mr';
  
  const translations = {
    en: {
      title: 'Prathana Foundation Solapur — Transparent Humanitarian Aid & Child Rehabilitation',
      description: 'Prathana Foundation is a government-registered NGO in Solapur providing 24/7 child sanctuary at Prathana Balgram, nutrition, education, elderly care, and disaster relief with 100% donation transparency and 80G tax benefits.',
    },
    mr: {
      title: 'प्रार्थना फाउंडेशन सोलापूर — पारदर्शक मानवतावादी मदत व बालग्राम पुनर्वसन',
      description: 'प्रार्थना फाउंडेशन सोलापूरमधील शासनमान्य सामाजिक संस्था आहे जी गरजू बालकांना हक्काचा निवारा (प्रार्थना बालग्राम), शिक्षण, पोषण, वृद्धाश्रम सेवा आणि १००% पारदर्शक देणगी प्रणालीसह ८०जी करसवलत प्रदान करते.',
    }
  };

  const meta = translations[isMr ? 'mr' : 'en'];
  const canonicalUrl = `https://prarthanafoundation.org/${lang || 'en'}`;

  return {
    metadataBase: new URL('https://prarthanafoundation.org'),
    title: {
      default: meta.title,
      template: '%s | Prathana Foundation Solapur',
    },
    description: meta.description,
    keywords: [
      'Prathana Foundation',
      'NGO Solapur',
      'Prathana Balgram',
      'Prasad Shinde Solapur',
      'Donate India 80G',
      'Child Rehabilitation Solapur',
      'Old Age Home Solapur',
      'Food Drive Maharashtra',
      'Transparent Charity India',
    ],
    authors: [{ name: 'Prathana Foundation Solapur', url: 'https://prarthanafoundation.org' }],
    creator: 'Prathana Foundation',
    publisher: 'Prathana Foundation',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: 'https://prarthanafoundation.org/en',
        mr: 'https://prarthanafoundation.org/mr',
        'x-default': 'https://prarthanafoundation.org/en',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'Prathana Foundation Solapur',
      locale: isMr ? 'mr_IN' : 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://prarthanafoundation.org/balgram-home.jpg',
          width: 1200,
          height: 630,
          alt: 'Prathana Foundation Solapur - Humanitarian Impact',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['https://prarthanafoundation.org/balgram-home.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
      apple: '/apple-icon.png',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}>) {
  const { lang } = await params;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Prathana Foundation',
    alternateName: ['प्रार्थना फाउंडेशन', 'Prathana Foundation Solapur', 'Prathana Balgram'],
    url: 'https://prarthanafoundation.org',
    logo: 'https://prarthanafoundation.org/icon.png',
    image: 'https://prarthanafoundation.org/balgram-home.jpg',
    description: 'A grassroots humanitarian NGO in Solapur providing 24/7 child sanctuary, senior care, nutrition, and education with complete transparency and 80G tax benefit certification.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Solapur',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    nonprofitStatus: 'Nonprofit501c3',
    taxID: '80G Certified NGO',
  };

  return (
    <html
      lang={lang || 'en'}
      className={`${fraunces.variable} ${dmSans.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-paper text-brand-charcoal font-sans antialiased">
        <TranslationProvider translations={await getPageContent('home')}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
