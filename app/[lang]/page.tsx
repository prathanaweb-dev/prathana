import { getCampaigns, getDonations, getAggregatedStats, getSettings } from '@/lib/db';
import HomeClient from './HomeClient';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  
  // Server-side pre-fetching
  const campaigns = await getCampaigns();
  const donations = await getDonations();
  const stats = await getAggregatedStats();
  const settings = await getSettings();

  return (
    <HomeClient
      lang={lang}
      initialCampaigns={campaigns}
      initialDonations={donations}
      initialStats={stats}
      initialSettings={settings}
    />
  );
}
