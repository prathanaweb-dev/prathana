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
    <div className="relative min-h-screen bg-brand-paper bg-grid-pattern overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-saffron/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-3.5s' }} />

      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24 z-10">
        <EventsClient
          lang={lang}
          initialEvents={events}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
