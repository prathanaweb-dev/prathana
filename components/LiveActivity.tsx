'use client';

import { useState, useEffect } from 'react';
import { Donation, Campaign } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveActivityProps {
  lang: string;
  donations: Donation[];
  campaigns: Campaign[];
  stats: {
    totalDonors: number;
    donorsToday: number;
  };
}

export default function LiveActivity({ lang, donations, campaigns, stats }: LiveActivityProps) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const recentDonations = donations.slice(0, 6);

  /* Rotate through donations every 4 seconds */
  useEffect(() => {
    if (recentDonations.length <= 1) return;
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % recentDonations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [recentDonations.length]);

  const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (lang === 'mr') {
      if (diffMins < 1) return 'आत्ताच';
      if (diffMins < 60) return `${diffMins} मि. पूर्वी`;
      if (diffHours < 24) return `${diffHours} ता. पूर्वी`;
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } else {
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }
  };

  /* Show 3 donations at a time for the ticker row */
  const getVisibleDonations = () => {
    const result: Donation[] = [];
    for (let i = 0; i < Math.min(3, recentDonations.length); i++) {
      result.push(recentDonations[(visibleIndex + i) % recentDonations.length]);
    }
    return result;
  };

  return (
    <section className="py-8 bg-brand-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Single card container */}
        <div className="premium-card rounded-2xl p-5 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">

            {/* ── Left: Live badge + stat pills ── */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Live indicator */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-green">
                  {lang === 'mr' ? 'थेट क्रियाकलाप' : 'Live Activity'}
                </span>
              </div>

              {/* Stat pills */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sand/50 border border-brand-clay/40">
                  <span className="font-mono text-sm font-bold text-brand-charcoal">
                    {stats.donorsToday}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-muted font-semibold">
                    {lang === 'mr' ? 'आज' : 'today'}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sand/50 border border-brand-clay/40">
                  <span className="font-mono text-sm font-bold text-brand-charcoal">
                    {stats.totalDonors}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-muted font-semibold">
                    {lang === 'mr' ? 'एकूण' : 'total'}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Vertical separator ── */}
            <div className="hidden md:block w-px h-8 bg-brand-clay/60" />

            {/* ── Right: Scrolling donation ticker ── */}
            <div className="flex-1 overflow-hidden min-w-0">
              <div className="flex items-center gap-6">
                <AnimatePresence mode="popLayout" initial={false}>
                  {getVisibleDonations().map((donation) => (
                    <motion.div
                      key={donation.id}
                      className="flex items-center gap-2.5 flex-shrink-0"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Green dot */}
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />

                      <span className="text-[13px] text-brand-charcoal whitespace-nowrap">
                        <span className="font-medium">{donation.donor_name}</span>
                        <span className="text-brand-muted mx-1.5">&rarr;</span>
                        <span className="font-mono font-semibold text-brand-green">
                          ₹{Number(donation.amount).toLocaleString('en-IN')}
                        </span>
                        <span className="text-brand-muted mx-1.5">&middot;</span>
                        <span className="text-[11px] text-brand-muted font-light">
                          {getRelativeTime(donation.created_at)}
                        </span>
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Far right: trust badge ── */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">
                {lang === 'mr' ? 'पडताळणी झाली' : 'Verified'}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
