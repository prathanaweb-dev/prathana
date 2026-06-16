'use client';

import { Campaign } from '@/lib/db';
import { motion } from 'framer-motion';
import CampaignCard from './CampaignCard';

interface CampaignsProps {
  campaigns: Campaign[];
  onDonateClick: (campaignId: string) => void;
}

export default function Campaigns({ campaigns, onDonateClick }: CampaignsProps) {
  const activeCampaigns = campaigns.filter((c) => !c.is_completed);
  const completedCampaigns = campaigns.filter((c) => c.is_completed);

  return (
    <section id="campaigns" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 space-y-5"
        >
          <span className="section-label">Direct Relief</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            Active Relief
            <br />
            Campaigns.
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed">
            Choose a campaign close to your heart. Every rupee raised is tracked
            transparently. You can witness live progress updates immediately
            after your checkout completes.
          </p>
        </motion.div>

        {/* Active Campaign Cards — Single Column */}
        {activeCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {activeCampaigns.map((camp) => (
              <CampaignCard
                key={camp.id}
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
            className="text-center py-16 px-8 border border-dashed border-brand-clay rounded-3xl bg-white"
          >
            <p className="font-serif-display text-xl italic text-brand-muted">
              No active campaigns at this moment.
              <br />
              All goals have been successfully fulfilled!
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
              <span className="section-label">Completed</span>
              <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-brand-muted tracking-tight">
                Fulfilled Missions
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-75">
              {completedCampaigns.map((camp) => (
                <CampaignCard
                  key={camp.id}
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
