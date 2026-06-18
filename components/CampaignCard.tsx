'use client';

import { Campaign } from '@/lib/db';
import { Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '@/lib/translations';

interface CampaignCardProps {
  lang: string;
  campaign: Campaign;
  onDonateClick: (campaignId: string) => void;
}

export default function CampaignCard({ lang, campaign, onDonateClick }: CampaignCardProps) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const goal = Number(campaign.goal_amount);
  const raised = Number(campaign.amount_raised);
  const remaining = Math.max(0, goal - raised);
  const progressPercent = Math.min(100, Math.round((raised / goal) * 100));
  const isCompleted = campaign.is_completed || campaign.status === 'completed';

  const title = (lang === 'mr' && campaign.title_mr) ? campaign.title_mr : campaign.title;
  const description = (lang === 'mr' && campaign.description_mr) ? campaign.description_mr : campaign.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col md:flex-row bg-white border border-brand-clay/60 rounded-2xl overflow-hidden group ${
        isCompleted ? 'opacity-70 saturate-[0.6]' : ''
      }`}
    >
      {/* Image Section */}
      <div className="h-52 md:h-auto md:w-72 relative overflow-hidden bg-brand-sand flex-shrink-0">
        <img
          src={campaign.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 editorial-img"
          loading="lazy"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 via-brand-charcoal/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-brand-charcoal/20" />

        {/* Status Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-brand-green text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full">
            <CheckCircle className="w-3 h-3" />
            {lang === 'mr' ? 'ध्येय साध्य' : 'Goal Achieved'}
          </div>
        )}

        {/* Progress percentage on image */}
        {!isCompleted && (
          <div className="absolute bottom-4 left-5">
            <span className="font-mono text-[28px] font-bold text-white leading-none tracking-tight">
              {progressPercent}%
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-white/70 font-semibold mt-0.5">
              {t.donation.funded}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-7 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <span className="section-label">
            {isCompleted ? (lang === 'mr' ? 'पूर्ण मोहीम' : 'Completed') : (lang === 'mr' ? 'सक्रिय मोहीम' : 'Active Campaign')}
          </span>
          <h4 className="font-serif-display text-xl md:text-2xl font-bold text-brand-charcoal leading-tight group-hover:text-brand-saffron transition-colors duration-300">
            {title}
          </h4>
          <p className="text-brand-muted text-sm leading-relaxed line-clamp-3 font-light">
            {description}
          </p>
        </div>

        {/* Financial Metrics Section */}
        <div className="mt-7 space-y-5">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-brand-clay/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className={`h-full rounded-full ${isCompleted ? 'bg-brand-green' : 'bg-brand-saffron'}`}
              />
            </div>
          </div>

          {/* 3-Column Metric Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-clay/40">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-semibold mb-1">
                {t.donation.goal}
              </span>
              <span className="font-mono text-sm font-bold text-brand-charcoal">
                ₹{goal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-semibold mb-1">
                {t.donation.raised}
              </span>
              <span className="font-mono text-sm font-bold text-brand-green">
                ₹{raised.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-semibold mb-1">
                {t.donation.remaining}
              </span>
              <span className="font-mono text-sm font-bold text-brand-saffron">
                ₹{remaining.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Donate CTA */}
          <button
            onClick={() => onDonateClick(campaign.id)}
            disabled={isCompleted}
            className={`w-full py-3.5 rounded-full font-semibold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-brand-sand border border-brand-clay text-brand-muted cursor-not-allowed'
                : 'bg-brand-charcoal text-white hover:bg-brand-saffron hover:-translate-y-0.5 shadow-sm hover:shadow-md'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isCompleted ? '' : 'fill-current'}`} />
            {isCompleted ? (lang === 'mr' ? 'उद्दिष्ट पूर्ण' : 'Goal Achieved') : t.donation.donateBtn}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
