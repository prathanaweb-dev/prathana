'use client';

import { useState } from 'react';
import { Campaign, Donation } from '@/lib/db';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LiveActivity from '@/components/LiveActivity';
import About from '@/components/About';
import Campaigns from '@/components/Campaigns';
import CTABanners from '@/components/CTABanners';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import GalleryStrip from '@/components/GalleryStrip';
import DonateSupport from '@/components/DonateSupport';
import Stories from '@/components/Stories';
import Footer from '@/components/Footer';
import PaymentModal from '@/components/PaymentModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight } from 'lucide-react';

interface HomeClientProps {
  lang: string;
  initialCampaigns: Campaign[];
  initialDonations: Donation[];
  initialStats: any;
}

export default function HomeClient({
  lang,
  initialCampaigns,
  initialDonations,
  initialStats,
}: HomeClientProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [stats, setStats] = useState(initialStats);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);

  const [toast, setToast] = useState<{
    show: boolean;
    donor: string;
    amount: number;
  } | null>(null);

  const fetchData = async () => {
    try {
      const campaignsRes = await fetch('/api/campaigns');
      const campaignsData = await campaignsRes.json();
      if (campaignsData.success) setCampaigns(campaignsData.campaigns);

      const donationsRes = await fetch('/api/donations');
      const donationsData = await donationsRes.json();
      if (donationsData.success) setDonations(donationsData.donations);

      const statsRes = await fetch('/api/donations?stats=true');
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleDonateOpen = (campaignId?: string) => {
    setSelectedCampaignId(campaignId);
    setPaymentModalOpen(true);
  };

  const handleDonationSuccess = (amount: number, donorName: string, campaignId: string) => {
    fetchData();
    setToast({ show: true, donor: donorName, amount });
    setTimeout(() => setToast(null), 6000);
  };

  return (
    <div className="relative min-h-screen bg-brand-paper">
      
      {/* Header */}
      <Header lang={lang} onDonateClick={() => handleDonateOpen()} />

      {/* Hero with left alignment and child portrait */}
      <Hero
        lang={lang}
        onDonateClick={() => handleDonateOpen()}
        stats={{
          totalRaised: stats.totalRaised,
          totalDonors: stats.totalDonors,
          mealsProvided: stats.mealsProvided,
          kidsEducated: stats.kidsEducated,
        }}
      />

      {/* Live Activity Ticker */}
      <LiveActivity
        lang={lang}
        donations={donations}
        campaigns={campaigns}
        stats={{
          totalDonors: stats.totalDonors,
          donorsToday: stats.donorsToday,
        }}
      />

      {/* About: Charity with Difference & Helping each other collage */}
      <About lang={lang} onDonateClick={handleDonateOpen} />

      {/* Campaigns: 3-column Grid layout */}
      <Campaigns lang={lang} campaigns={campaigns} onDonateClick={handleDonateOpen} />

      {/* Split CTA Banners (Volunteer & Donation) */}
      <CTABanners lang={lang} onDonateClick={() => handleDonateOpen()} />

      {/* Volunteer Team profiles */}
      <Team lang={lang} />

      {/* Speech bubbles Testimonials */}
      <Testimonials lang={lang} />

      {/* Grayscale activity photo strip */}
      <GalleryStrip />

      {/* Classroom Donate Support form block */}
      <DonateSupport lang={lang} onDonateClick={handleDonateOpen} />

      {/* Blog News Articles */}
      <Stories lang={lang} />

      {/* Footer with Newsletter */}
      <Footer lang={lang} onDonateClick={() => handleDonateOpen()} />

      {/* Modal popup checkout payment gateway */}
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
            <div className="flex items-start gap-4 text-white">
              <div className="w-11 h-11 rounded-xl bg-brand-green/15 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-brand-green fill-brand-green" />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
                    {lang === 'mr' ? 'देणगीची पडताळणी झाली' : 'Donation Verified'}
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
                  <span className="font-bold text-brand-yellow">
                    ₹{toast.amount.toLocaleString('en-IN')}
                  </span>{' '}
                  {lang === 'mr' ? 'ची मदत केली' : ''}
                </p>

                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-white/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  {lang === 'mr' ? 'नोंद अपडेट केली' : 'Ledger updated'}
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
