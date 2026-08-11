import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import '../globals.css';
import { getPageContent } from '@/lib/db';
import { TranslationProvider } from '@/components/TranslationProvider';

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const translations = {
    en: {
      title: 'Prathana Foundation Solapur — Transparent Humanitarian Aid',
      description: 'Prathana Foundation is a grassroots collective in Solapur providing nutrition, school kits, and mobile healthcare to families in need. Every donation is transparently tracked.',
    },
    mr: {
      title: 'प्रार्थना फाउंडेशन सोलापूर — पारदर्शक मानवतावादी मदत',
      description: 'प्रार्थना फाउंडेशन सोलापूरमधील एक तळागाळातील चळवळ आहे जी गरजू कुटुंबांना पोषण, शालेय साहित्य आणि मोबाईल आरोग्य सेवा पुरवते. प्रत्येक देणगी पारदर्शकपणे नोंदवली जाते.',
    }
  };

  const meta = translations[lang === 'mr' ? 'mr' : 'en'];

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      'NGO Solapur',
      'Prathana Foundation',
      'Donate India',
      'Child Education',
      'Food Drive Maharashtra',
      'Transparent Charity',
    ],
    authors: [{ name: 'Prathana Foundation Solapur' }],
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
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

  return (
    <html
      lang={lang || 'en'}
      className={`${fraunces.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-brand-paper text-brand-charcoal font-sans antialiased">
        <TranslationProvider translations={await getPageContent('home')}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
