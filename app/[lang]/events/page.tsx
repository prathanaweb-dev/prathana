import { getEvents } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsClient from './EventsClient';

interface EventsPageProps {
  params: Promise<{ lang: string }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang } = await params;
  const events = await getEvents();

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24">
        <EventsClient
          lang={lang}
          initialEvents={events}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
