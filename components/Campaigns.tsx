'use client';

import { Campaign } from '@/lib/db';
import { motion } from 'framer-motion';
import CampaignCard from './CampaignCard';
import { translations } from '@/lib/translations';

interface CampaignsProps {
  lang: string;
  campaigns: Campaign[];
  onDonateClick: (campaignId: string) => void;
}

export default function Campaigns({ lang, campaigns, onDonateClick }: CampaignsProps) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const activeCampaigns = campaigns.filter((c) => c.status !== 'completed' && !c.is_completed);
  const completedCampaigns = campaigns.filter((c) => c.status === 'completed' || c.is_completed);

  return (
    <section id="campaigns" className="py-32 bg-brand-paper bg-grid-pattern relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-saffron/4 rounded-full blur-[100px] pointer-events-none animate-drift" style={{ animationDelay: '-2s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 space-y-5"
        >
          <span className="section-label">{t.donation.label}</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            {t.donation.title.split('.').map((chunk, i) => (
              <span key={i} className="block">{chunk}</span>
            ))}
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed font-light">
            {t.donation.desc}
          </p>
        </motion.div>

        {/* Active Campaign Cards — Single Column */}
        {activeCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
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
          <div className="mt-28">
            {/* Editorial divider */}
            <div className="editorial-divider mb-16" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-12 space-y-3"
            >
              <span className="section-label">{lang === 'mr' ? 'पूर्ण झालेले' : 'Completed'}</span>
              <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-brand-muted tracking-tight">
                {t.donation.completedTitle}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 opacity-75">
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
