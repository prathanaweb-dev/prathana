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
      transition={{ duration: 0.6 }}
      className={`flex flex-col bg-white border border-brand-clay/35 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${
        isCompleted ? 'opacity-75 saturate-[0.7]' : ''
      }`}
    >
      {/* Cover Image */}
      <div className="h-56 relative overflow-hidden bg-brand-sand">
        <img
          src={campaign.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Status Badge */}
        {isCompleted ? (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-brand-green text-white px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
            <CheckCircle className="w-3.5 h-3.5" />
            {lang === 'mr' ? 'यशस्वी' : 'Goal Achieved'}
          </div>
        ) : (
          <div className="absolute bottom-4 left-4 bg-brand-yellow text-brand-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
            {progressPercent}% {lang === 'mr' ? 'पूर्ण' : 'funded'}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-brand-saffron font-bold">
            {isCompleted ? (lang === 'mr' ? 'पूर्ण मोहीम' : 'Completed') : (lang === 'mr' ? 'सक्रिय मोहीम' : 'Active')}
          </span>
          <h4 className="font-serif-display text-xl font-bold text-brand-charcoal leading-snug group-hover:text-brand-saffron transition-colors duration-300 line-clamp-1">
            {title}
          </h4>
          <p className="text-brand-muted text-xs leading-relaxed line-clamp-3 font-light">
            {description}
          </p>
        </div>

        {/* Progress & Stats Info */}
        <div className="space-y-4 pt-4 border-t border-brand-clay/35">
          {/* Yellow Progress Bar */}
          <div className="w-full h-2 bg-brand-clay/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${isCompleted ? 'bg-brand-green' : 'bg-brand-yellow'}`}
            />
          </div>

          {/* Goal vs Raised Details */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="text-left">
              <span className="block text-[9px] uppercase tracking-wider text-brand-muted font-bold mb-0.5">
                {lang === 'mr' ? 'उद्दिष्ट' : 'Goal'}
              </span>
              <span className="font-mono text-brand-charcoal">
                ₹{goal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[9px] uppercase tracking-wider text-brand-muted font-bold mb-0.5">
                {lang === 'mr' ? 'जमा निधी' : 'Raised'}
              </span>
              <span className="font-mono text-brand-green">
                ₹{raised.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Solid Forest Green Action Button */}
          <button
            onClick={() => onDonateClick(campaign.id)}
            disabled={isCompleted}
            className={`w-full py-3.5 rounded-full font-bold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-brand-sand border border-brand-clay/50 text-brand-muted cursor-not-allowed'
                : 'bg-brand-forest text-white hover:bg-brand-forest/90 shadow-md hover:-translate-y-0.5'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isCompleted ? '' : 'fill-current text-brand-yellow'}`} />
            {isCompleted ? (lang === 'mr' ? 'उद्दिष्ट पूर्ण' : 'Goal Achieved') : t.donation.donateBtn}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
