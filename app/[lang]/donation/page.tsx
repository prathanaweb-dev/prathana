import { getCampaigns, getDonations } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationClient from './DonationClient';

interface DonationPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DonationPage({ params }: DonationPageProps) {
  const { lang } = await params;
  const campaigns = await getCampaigns();

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-24 pb-20">
        <DonationClient
          lang={lang}
          initialCampaigns={campaigns}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
