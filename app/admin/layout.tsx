import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
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
      className={`${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#070a0e] text-[#e2e8f0] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
