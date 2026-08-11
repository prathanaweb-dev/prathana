'use client';

import { Campaign } from '@/lib/db';
import { motion } from 'framer-motion';
import CampaignCard from './CampaignCard';
import { useTranslations } from '@/components/TranslationProvider';

interface CampaignsProps {
  lang: string;
  campaigns: Campaign[];
  onDonateClick: (campaignId: string) => void;
}

export default function Campaigns({ lang, campaigns, onDonateClick }: CampaignsProps) {
  const t = useTranslations((lang === 'mr' ? 'mr' : 'en') as 'en'|'mr');

  const activeCampaigns = campaigns.filter((c) => c.status !== 'completed' && !c.is_completed);
  const completedCampaigns = campaigns.filter((c) => c.status === 'completed' || c.is_completed);

  const titleLocal = lang === 'mr' ? "गरजूंना मदत करा आणि दान करा" : "Help & Donate Them When They're In Need";

  return (
    <section id="campaigns" className="py-24 bg-brand-paper relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-yellow/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">

        {/* Header Block with Dot Controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-brand-clay/35 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-3 text-left"
          >
            <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
              {lang === 'mr' ? 'आपल्या सक्रिय मोहिमा' : 'Our Campaigns'}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal max-w-xl leading-tight">
              {titleLocal}
            </h2>
          </motion.div>

          {/* Dots Decoration */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-3.5 h-3.5 rounded-full bg-brand-green" />
            <span className="w-3.5 h-3.5 rounded-full bg-brand-yellow" />
          </div>
        </div>

        {/* Active Campaign Cards Grid */}
        {activeCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeCampaigns.map((camp) => (
              <CampaignCard
                key={camp.id}
                lang={lang}
                campaign={camp}
                onDonateClick={onDonateClick}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="text-center py-16 px-8 border border-dashed border-brand-clay/60 rounded-3xl premium-card shadow-sm"
          >
            <p className="font-serif-display text-xl italic text-brand-muted">
              {t.donation.noActive}
            </p>
          </motion.div>
        )}

        {/* Completed Campaigns Subsection */}
        {completedCampaigns.length > 0 && (
          <div className="mt-20 space-y-8">
            <div className="editorial-divider" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-2"
            >
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-muted">
                {lang === 'mr' ? 'यशस्वी मोहिमा' : 'Fulfilled Missions'}
              </span>
              <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-brand-muted">
                {t.donation.completedTitle}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-75">
              {completedCampaigns.map((camp) => (
                <CampaignCard
                  key={camp.id}
                  lang={lang}
                  campaign={camp}
                  onDonateClick={onDonateClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
