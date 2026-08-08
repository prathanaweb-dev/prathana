'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VolunteerForm from '@/components/VolunteerForm';
import { useParams } from 'next/navigation';

export default function VolunteerPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <div className="relative min-h-screen bg-brand-paper selection:bg-brand-yellow/30 selection:text-brand-forest flex flex-col">
      <Header lang={lang} />
      
      <main className="flex-1 pt-24 pb-16 z-10">
        <VolunteerForm lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
