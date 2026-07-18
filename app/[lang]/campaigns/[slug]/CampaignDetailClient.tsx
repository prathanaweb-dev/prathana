'use client';

import { Campaign } from '@/lib/db';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PaymentModal from '@/components/PaymentModal';

interface Props {
  lang: string;
  campaign: Campaign;
}

export default function CampaignDetailClient({ lang, campaign }: Props) {
  const router = useRouter();
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  const isMarathi = lang === 'mr';

  const [modalOpen, setModalOpen] = useState(false);

  const goal = Number(campaign.goal_amount);
  const raised = Number(campaign.amount_raised);
  const progressPercent = Math.min(100, Math.round((raised / goal) * 100));
  const isCompleted = campaign.is_completed || campaign.status === 'completed';

  const title = (isMarathi && campaign.title_mr) ? campaign.title_mr : campaign.title;
  const description = (isMarathi && campaign.description_mr) ? campaign.description_mr : campaign.description;
  const content = (isMarathi && campaign.content_mr) ? campaign.content_mr : (campaign.content || description);

  return (
    <>
      <main className="min-h-screen bg-brand-paper pb-24 pt-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Back button */}
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-brand-muted hover:text-brand-saffron transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isMarathi ? 'मागे जा' : 'Back to Campaigns'}
          </button>

          {/* Header Section */}
          <header className="space-y-6 text-center md:text-left">
            <span className="section-label">
              {isCompleted ? (isMarathi ? 'पूर्ण मोहीम' : 'Completed Campaign') : (isMarathi ? 'सक्रिय मोहीम' : 'Active Campaign')}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight">
              {title}
            </h1>
          </header>

          {/* Cover Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[40px_10px_40px_10px] overflow-hidden shadow-xl border-4 border-white relative"
          >
            <img src={campaign.image} alt={title} className="w-full h-full object-cover editorial-img" />
            
            {/* Status Badge */}
            {isCompleted ? (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                <CheckCircle className="w-4 h-4" />
                {isMarathi ? 'उद्दिष्ट साध्य' : 'Goal Achieved'}
              </div>
            ) : (
              <div className="absolute top-6 right-6 bg-brand-yellow text-brand-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                {progressPercent}% {isMarathi ? 'पूर्ण' : 'Funded'}
              </div>
            )}
          </motion.div>

          {/* Main Content & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (Rich Text) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg prose-olive max-w-none">
                <p className="text-xl font-serif-display leading-relaxed text-brand-charcoal">
                  {description}
                </p>
                <div className="w-12 h-1 bg-brand-yellow my-8 rounded-full" />
                
                {/* Format content with basic paragraph splitting if needed */}
                <div className="space-y-6 text-brand-muted font-light leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              </div>
            </div>

            {/* Right Sidebar (Donation Panel) */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 premium-card rounded-3xl p-8 space-y-8">
                
                {/* Stats */}
                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">
                      {isMarathi ? 'उद्दिष्ट' : 'Goal'}
                    </span>
                    <span className="font-mono text-3xl text-brand-charcoal font-bold">
                      ₹{goal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="w-full h-2.5 bg-brand-clay/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${isCompleted ? 'bg-brand-green' : 'bg-brand-yellow'}`}
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">
                      {isMarathi ? 'जमा निधी' : 'Raised'}
                    </span>
                    <span className="font-mono text-xl text-brand-green font-bold">
                      ₹{raised.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Donate Button */}
                <button
                  onClick={() => setModalOpen(true)}
                  disabled={isCompleted}
                  className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 ${
                    isCompleted
                      ? 'bg-brand-sand border-2 border-brand-clay text-brand-muted cursor-not-allowed shadow-none hover:translate-y-0'
                      : 'bg-brand-forest text-white hover:bg-brand-forest/90'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isCompleted ? '' : 'text-brand-yellow fill-current'}`} />
                  {isCompleted ? (isMarathi ? 'मोहीम पूर्ण झाली' : 'Campaign Closed') : t.donation.donateBtn}
                </button>
                
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <PaymentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        campaigns={[campaign]} 
        selectedCampaignId={campaign.id} 
        onSuccess={() => setModalOpen(false)}
      />
    </>
  );
}
