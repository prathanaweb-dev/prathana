import { getCampaigns } from '@/lib/db';
import { notFound } from 'next/navigation';
import CampaignDetailClient from './CampaignDetailClient';

export default async function CampaignPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;
  
  const campaigns = await getCampaigns();
  const campaign = campaigns.find(c => c.slug === slug);

  if (!campaign) {
    notFound();
  }

  return <CampaignDetailClient lang={lang} campaign={campaign} />;
}
