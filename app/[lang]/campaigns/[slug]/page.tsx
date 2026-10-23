import { Metadata } from 'next';
import { getCampaigns } from '@/lib/db';
import { notFound } from 'next/navigation';
import CampaignDetailClient from './CampaignDetailClient';

const SITE_BASE = 'https://prarthanafoundation.org';

/** Converts a relative /public path to an absolute URL WhatsApp can crawl. */
function absoluteImg(img?: string | null): string {
  const fallback = `${SITE_BASE}/balgram-home.jpg`;
  if (!img) return fallback;
  if (img.startsWith('http')) {
    // Replace dead Cloudinary domain with local fallback
    if (img.includes('cloudinary.com/djoklzpse')) return fallback;
    return img;
  }
  return `${SITE_BASE}${img}`;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const campaigns = await getCampaigns();
  const campaign = campaigns.find(c => c.slug === slug);

  if (!campaign) {
    return {
      title: 'Campaign Not Found | Prarthana Foundation',
    };
  }

  const isMr = lang === 'mr';
  const title = (isMr && campaign.title_mr) ? campaign.title_mr : campaign.title;
  const description = (isMr && campaign.description_mr) ? campaign.description_mr : campaign.description;
  const url = `https://prarthanafoundation.org/${lang}/campaigns/${campaign.slug}`;

  const ogImage = absoluteImg(campaign.image);

  return {
    title: `${title} | Prathana Foundation`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | Prathana Foundation`,
      description: description.slice(0, 200),
      url,
      siteName: 'Prathana Foundation Solapur',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 200),
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_BASE}/en/campaigns/${campaign.slug}`,
        mr: `${SITE_BASE}/mr/campaigns/${campaign.slug}`,
      },
    },
  };
}

export default async function CampaignPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;
  
  const campaigns = await getCampaigns();
  const campaign = campaigns.find(c => c.slug === slug);

  if (!campaign) {
    notFound();
  }

  const isMr = lang === 'mr';
  const title = (isMr && campaign.title_mr) ? campaign.title_mr : campaign.title;
  const description = (isMr && campaign.description_mr) ? campaign.description_mr : campaign.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    name: title,
    description: description,
    image: absoluteImg(campaign.image),
    recipient: {
      '@type': 'NGO',
      name: 'Prarthana Foundation',
      url: 'https://prarthanafoundation.org',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Solapur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampaignDetailClient lang={lang} campaign={campaign} />
    </>
  );
}
