'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowDown } from 'lucide-react';

interface HeroProps {
  onDonateClick: () => void;
  stats: {
    totalRaised: number;
    totalDonors: number;
    mealsProvided: number;
    kidsEducated: number;
  };
}

const headlineWords = [
  { text: 'Every', className: '' },
  { text: 'child', className: '' },
  { text: 'deserves', className: '' },
  { text: 'a', className: '' },
  { text: 'full', className: 'italic text-brand-saffron' },
  { text: 'stomach', className: 'italic text-brand-saffron' },
  { text: '&', className: '' },
  { text: 'an', className: '' },
  { text: 'open', className: '' },
  { text: 'book.', className: '' },
];

export default function Hero({ onDonateClick, stats }: HeroProps) {
  return (
    <section className="relative min-h-[100vh] bg-brand-paper overflow-hidden">
      {/* Center-aligned content column */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Top: Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <span className="section-label">Prarthana Foundation · Solapur</span>
        </motion.div>

        {/* Massive Centered Headline — Word-by-word stagger */}
        <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-brand-charcoal text-center max-w-4xl mx-auto mt-8">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`inline-block mr-[0.28em] ${word.className}`}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Centered Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-lg text-brand-muted font-light max-w-xl mx-auto leading-relaxed text-center mt-8"
        >
          A grassroots humanitarian collective in Solapur — providing nutrition,
          education kits, and medical aid to orphaned and low-income families.
          Every rupee, fully transparent.
        </motion.p>

        {/* Centered CTA Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={onDonateClick}
            className="rounded-full bg-brand-saffron text-white px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal transition-all duration-300 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            Donate Securely
          </button>
          <a
            href="#campaigns"
            className="rounded-full border-2 border-brand-charcoal text-brand-charcoal px-8 py-3 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal hover:text-white transition-all duration-300"
          >
            View Campaigns
          </a>
        </motion.div>

        {/* Full-Width Editorial Image Band — 3 Overlapping Photos */}
        <div className="relative mt-16 md:mt-20">
          {/* Main Center Image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-3xl h-[350px] md:h-[420px] mx-auto rounded-3xl overflow-hidden border border-brand-clay bg-brand-sand z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
              alt="Prarthana outreach — feeding children in Solapur"
              className="w-full h-full object-cover editorial-img"
            />
            {/* Caption overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/30 to-transparent p-6 pt-16">
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">
                On Ground &bull; Solapur
              </span>
              <p className="font-serif-display italic text-sm text-white/90 mt-1 max-w-xs">
                &ldquo;A warm meal is the first step towards a child&rsquo;s
                education.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Left Flanking Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-8 left-0 lg:left-8 w-44 sm:w-52 md:w-60 h-[200px] md:h-[260px] rounded-2xl overflow-hidden border-4 border-brand-paper shadow-2xl z-20 hidden sm:block"
          >
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop"
              alt="Child studying with an education kit"
              className="w-full h-full object-cover editorial-img"
            />
          </motion.div>

          {/* Right Flanking Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-12 right-0 lg:right-8 w-40 sm:w-48 md:w-56 h-[180px] md:h-[240px] rounded-2xl overflow-hidden border-4 border-brand-paper shadow-2xl z-20 hidden sm:block"
          >
            <img
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop"
              alt="Community outreach and support"
              className="w-full h-full object-cover editorial-img"
            />
          </motion.div>

          {/* Decorative frame behind center image */}
          <div className="absolute inset-0 mx-auto max-w-3xl h-[350px] md:h-[420px] rounded-3xl border border-brand-saffron/15 translate-x-3 translate-y-3 -z-0 pointer-events-none" />
        </div>

        {/* Stats Card — Centered, 3-col grid */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="max-w-2xl mx-auto mt-12 md:mt-16 bg-white border border-brand-clay rounded-2xl shadow-sm"
        >
          <div className="grid grid-cols-3">
            {/* Stat 1 */}
            <div className="py-6 px-4 text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-charcoal leading-none">
                {(stats.mealsProvided || 4625).toLocaleString()}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-2 block">
                Meals Served
              </span>
            </div>

            {/* Vertical Divider + Stat 2 */}
            <div className="py-6 px-4 text-center border-x border-brand-clay">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-charcoal leading-none">
                {(stats.kidsEducated || 380).toLocaleString()}+
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-2 block">
                Children Helped
              </span>
            </div>

            {/* Stat 3 */}
            <div className="py-6 px-4 text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-charcoal leading-none">
                100%
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-2 block">
                Audited Funds
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-brand-saffron" />
        </motion.div>
      </motion.div>
    </section>
  );
}
