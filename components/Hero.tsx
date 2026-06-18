'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

interface HeroProps {
  lang: string;
  onDonateClick: () => void;
  stats: {
    totalRaised: number;
    totalDonors: number;
    mealsProvided: number;
    kidsEducated: number;
  };
}

export default function Hero({ lang, onDonateClick, stats }: HeroProps) {
  const router = useRouter();
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  
  const headlineWords = t.hero.title.split(' ');

  return (
    <section className="relative min-h-[100vh] bg-brand-paper bg-grid-pattern overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-saffron/8 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-green/6 rounded-full blur-[140px] pointer-events-none animate-drift" style={{ animationDelay: '-4s' }} />

      {/* Center-aligned content column */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Top: Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <span className="section-label">{t.hero.tagline}</span>
        </motion.div>

        {/* Massive Centered Headline — Word-by-word stagger */}
        <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] text-brand-charcoal text-center max-w-5xl mx-auto mt-8">
          {headlineWords.map((word, i) => {
            // Apply saffron highlight to certain words for visual polish
            const isHighlighted = 
              (lang === 'mr' && (word.includes('पोटभर') || word.includes('जेवण') || word.includes('शिक्षणाची'))) ||
              (lang !== 'mr' && (word.toLowerCase() === 'full' || word.toLowerCase() === 'stomach' || word.toLowerCase().includes('book')));
            
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`inline-block mr-[0.28em] ${
                  isHighlighted 
                    ? 'italic text-brand-saffron font-serif font-semibold border-b-2 border-brand-saffron/20 pb-0.5' 
                    : ''
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Centered Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg text-brand-muted font-light max-w-2xl mx-auto leading-relaxed text-center mt-8"
        >
          {t.hero.subtext}
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
            className="rounded-full btn-premium px-8 py-3.5 text-[13px] font-semibold tracking-wide flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Heart className="w-4 h-4 fill-current" />
            {t.hero.donateBtn}
          </button>
          <button
            onClick={() => router.push(`/${lang}/donation`)}
            className="rounded-full border-2 border-brand-charcoal text-brand-charcoal px-8 py-3 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {t.hero.viewBtn}
          </button>
        </motion.div>

        {/* Full-Width Editorial Image Band — 3 Overlapping Photos */}
        <div className="relative mt-16 md:mt-20">
          {/* Main Center Image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-3xl h-[350px] md:h-[420px] mx-auto rounded-3xl overflow-hidden border border-brand-clay/60 bg-brand-sand z-10 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
              alt="Prathana outreach — feeding children in Solapur"
              className="w-full h-full object-cover editorial-img"
            />
            {/* Caption overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/30 to-transparent p-6 pt-16">
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">
                On Ground &bull; Solapur
              </span>
              <p className="font-serif-display italic text-sm text-white/90 mt-1 max-w-xs">
                &ldquo;{lang === 'mr' ? 'शाळेत टिकण्यासाठी मुलाचे पोट भरणे ही पहिली पायरी आहे.' : 'A warm meal is the first step towards a child\'s education.'}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Left Flanking Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-8 left-0 lg:left-8 w-44 sm:w-52 md:w-60 h-[200px] md:h-[260px] rounded-2xl overflow-hidden border-4 border-brand-paper shadow-2xl z-20 hidden sm:block hover:rotate-0 hover:scale-[1.03] transition-all duration-500"
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
            className="absolute top-12 right-0 lg:right-8 w-40 sm:w-48 md:w-56 h-[180px] md:h-[240px] rounded-2xl overflow-hidden border-4 border-brand-paper shadow-2xl z-20 hidden sm:block hover:rotate-0 hover:scale-[1.03] transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop"
              alt="Central Community Kitchen"
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
          className="max-w-2xl mx-auto mt-12 md:mt-16 premium-card rounded-2xl border border-brand-clay/60"
        >
          <div className="grid grid-cols-3 divide-x divide-brand-clay/60">
            {/* Stat 1 */}
            <div className="py-6 px-4 text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-charcoal leading-none">
                {(stats.mealsProvided || 4625).toLocaleString()}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-2 block">
                {t.hero.meals}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="py-6 px-4 text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-charcoal leading-none">
                {(stats.kidsEducated || 380).toLocaleString()}+
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-2 block">
                {t.hero.children}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="py-6 px-4 text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-charcoal leading-none">
                100%
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-2 block">
                {t.hero.audited}
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
          {lang === 'mr' ? 'खाली स्क्रोल करा' : 'Scroll'}
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
