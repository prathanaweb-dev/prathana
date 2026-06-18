import { getActivities } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ActivitiesClient from './ActivitiesClient';

interface ActivitiesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { lang } = await params;
  const activities = await getActivities();

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24">
        <ActivitiesClient
          lang={lang}
          initialActivities={activities}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
