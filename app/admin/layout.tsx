import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import '../globals.css';

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

export const metadata: Metadata = {
  title: 'Prathana Foundation Control Panel',
  description: 'Administrative Control Panel for Prathana Foundation Solapur.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
