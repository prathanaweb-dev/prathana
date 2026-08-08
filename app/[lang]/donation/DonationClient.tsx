'use client';

import { useState } from 'react';
import { Campaign } from '@/lib/db';
import Campaigns from '@/components/Campaigns';
import PaymentModal from '@/components/PaymentModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight } from 'lucide-react';
import { translations } from '@/lib/translations';

interface DonationClientProps {
  lang: string;
  initialCampaigns: Campaign[];
}

export default function DonationClient({
  lang,
  initialCampaigns,
}: DonationClientProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);

  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const [toast, setToast] = useState<{
    show: boolean;
    donor: string;
    amount: number;
  } | null>(null);

  const refreshCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (err) {
      console.error('Error refreshing campaigns:', err);
    }
  };

  const handleDonateOpen = (campaignId?: string) => {
    setSelectedCampaignId(campaignId);
    setPaymentModalOpen(true);
  };

  const handleDonationSuccess = (amount: number, donorName: string, campaignId: string) => {
    refreshCampaigns();
    setToast({ show: true, donor: donorName, amount });
    setTimeout(() => setToast(null), 6000);
  };

  return (
    <div className="relative">
      <Campaigns
        lang={lang}
        campaigns={campaigns}
        onDonateClick={handleDonateOpen}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        campaigns={campaigns}
        selectedCampaignId={selectedCampaignId}
        onSuccess={handleDonationSuccess}
      />

      {/* ── Donation Success Toast ── */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-8 z-[60] w-[340px] bg-brand-charcoal rounded-2xl p-5 shadow-2xl border border-white/5"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-green/15 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-brand-green fill-brand-green" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                    {lang === 'mr' ? 'देणगी जमा केली' : 'Donation Submitted'}
                  </span>
                  <button
                    onClick={() => setToast(null)}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[13px] text-white/80 leading-relaxed">
                  <span className="font-semibold text-white">{toast.donor}</span>{' '}
                  {lang === 'mr' ? 'यांनी' : 'contributed'}{' '}
                  <span className="font-bold text-brand-gold">
                    ₹{toast.amount.toLocaleString('en-IN')}
                  </span>{' '}
                  {lang === 'mr' ? 'ची मदत केली' : ''}
                </p>

                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-white/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  {lang === 'mr' ? 'प्रशासकाच्या मान्यतेच्या प्रतीक्षेत' : 'Pending admin approval'}
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
