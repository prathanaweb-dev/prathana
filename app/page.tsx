'use client';

import { useState, useEffect } from 'react';
import { Campaign, Donation } from '@/lib/db';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Impact from '@/components/Impact';
import Campaigns from '@/components/Campaigns';
import LiveActivity from '@/components/LiveActivity';
import Gallery from '@/components/Gallery';
import Stories from '@/components/Stories';
import Transparency from '@/components/Transparency';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PaymentModal from '@/components/PaymentModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight } from 'lucide-react';

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalGoal: 0,
    totalDonors: 0,
    donorsToday: 0,
    mealsProvided: 0,
    kidsEducated: 0,
    medicalConsults: 0,
  });

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      <Header onDonateClick={() => handleDonateOpen()} />

      <Hero
        onDonateClick={() => handleDonateOpen()}
        stats={{
          totalRaised: stats.totalRaised,
          totalDonors: stats.totalDonors,
          mealsProvided: stats.mealsProvided,
          kidsEducated: stats.kidsEducated,
        }}
      />

      <LiveActivity
        donations={donations}
        campaigns={campaigns}
        stats={{
          totalDonors: stats.totalDonors,
          donorsToday: stats.donorsToday,
        }}
      />

      <About />

      <Impact
        stats={{
          mealsProvided: stats.mealsProvided,
          kidsEducated: stats.kidsEducated,
          medicalConsults: stats.medicalConsults,
        }}
      />

      <Campaigns campaigns={campaigns} onDonateClick={handleDonateOpen} />

      <Gallery />

      <Stories />

      <Transparency />

      <Contact />

      <Footer onDonateClick={() => handleDonateOpen()} />

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
                    Donation Verified
                  </span>
                  <button
                    onClick={() => setToast(null)}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[13px] text-white/80 leading-relaxed">
                  <span className="font-semibold text-white">{toast.donor}</span> contributed{' '}
                  <span className="font-bold text-brand-gold">
                    ₹{toast.amount.toLocaleString('en-IN')}
                  </span>
                </p>

                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-white/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  Ledger updated
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
