'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Users, Zap, HeartHandshake, Activity, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/components/TranslationProvider';

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
  const t = useTranslations((lang === 'mr' ? 'mr' : 'en') as 'en'|'mr');

  const badgeItems = [
    {
      icon: Users,
      title: lang === 'mr' ? 'स्वयंसेवक व्हा' : 'Become a Volunteer',
      desc: lang === 'mr' ? 'उपेक्षित घटकांना मदत करा' : 'Help marginalized people',
      color: 'text-brand-green bg-brand-green/10',
    },
    {
      icon: Zap,
      title: lang === 'mr' ? 'झटपट मदत' : 'Quick Fundraising',
      desc: lang === 'mr' ? 'गरजूंपर्यंत थेट मदत' : 'Direct emergency aid',
      color: 'text-[#e75c3c] bg-[#e75c3c]/10',
    },
    {
      icon: HeartHandshake,
      title: lang === 'mr' ? 'देणगी द्या' : 'Give Donation',
      desc: lang === 'mr' ? 'प्रत्येक रुपया महत्त्वाचा' : 'Every rupee counts',
      color: 'text-brand-yellow bg-brand-yellow/10',
    },
    {
      icon: Activity,
      title: lang === 'mr' ? 'आरोग्य व मदत' : 'Help & Support',
      desc: lang === 'mr' ? 'वैद्यकीय सेवा पुरवा' : 'Medical care aid',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Award,
      title: lang === 'mr' ? 'बालकांचे संगोपन' : 'Sponsor a Child',
      desc: lang === 'mr' ? 'शिक्षणाला हातभार लावा' : 'Fund education kits',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  const heroImages = [
    '/balgram/Balgram/481252295_4027096254187163_273174834482280391_n.jpg',
    '/Vrudhashram/Vrudhashram/476569459_4004469246449864_4548442253041631_n.jpg',
    '/vanchitanchishala/Vanchitanchi Shala/20161022_094216.jpg',
    '/naturalfarming/Natural Farming/IMG-20260329-WA0129.jpg',
    '/awards/Awards/DSC_0595.JPG',
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0d1a14] pt-32 pb-20 text-white z-0">
      {/* Cinematic Background Carousel */}
      {heroImages.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === bgIndex ? 0.3 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
      
      {/* Cinematic Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a130d] via-[#0d1a14]/70 to-[#0d1a14]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a130d]/90 via-[#0a130d]/60 to-[#0a130d]/10 pointer-events-none" />

      {/* Cinematic Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Main Content Area (Left) */}
        <div className="w-full lg:w-[55%] max-w-2xl space-y-8 text-left mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 px-4 py-1.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-brand-yellow font-bold">
              {lang === 'mr' ? 'प्रार्थना फाउंडेशन · तळागाळातील मदत' : 'Prathana Foundation · Grassroots Outreach'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-display text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            {lang === 'mr' ? (
              <>
                अनाथ बालके व <br />
                निराधार वृद्धांना <span className="text-brand-yellow highlight-stroke font-serif italic">मायेची सावली</span>
              </>
            ) : (
              <>
                Transforming Grief <br />
                Into <span className="text-brand-yellow highlight-stroke font-serif italic font-semibold">Hope & Dignity</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 font-light max-w-xl leading-relaxed"
          >
            {t.hero.subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onDonateClick}
              className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-extrabold px-8 py-4 text-[13px] tracking-wide flex items-center gap-2 shadow-[0_4px_20px_rgba(247,195,36,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-current" />
              {t.hero.donateBtn}
            </button>
            <button
              onClick={() => router.push(`/${lang}/about`)}
              className="rounded-full border-2 border-white/40 text-white hover:border-white hover:bg-white/10 px-8 py-3.5 text-[13px] font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              {lang === 'mr' ? 'अधिक माहिती' : 'Learn More'}
            </button>
          </motion.div>

          {/* Floating Stats adapted for the cinematic layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-8"
          >
            {/* Floating kids stats card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">45+ Children</span>
                <span className="block text-[9px] text-white/50 font-light uppercase tracking-wider">Sponsored at Balgram</span>
              </div>
            </div>

            {/* Floating tax exemption card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 hidden sm:flex">
              <div className="w-9 h-9 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow font-extrabold text-sm">
                ✓
              </div>
              <div>
                <span className="block text-[11px] font-bold text-white">80G Tax Exemption</span>
                <span className="block text-[8px] text-white/50 font-light uppercase tracking-wider">Approved Charity</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Photo Scroll - Visible on mobile, tablet & desktop */}
        <div className="flex w-full lg:w-[45%] h-[320px] sm:h-[440px] lg:h-[600px] overflow-hidden relative rounded-3xl mt-6 lg:mt-0 [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
          <div className="flex gap-3 sm:gap-4 w-full h-[200%]">
            {/* Column 1 - Scrolling up */}
            <motion.div 
              animate={{ y: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="w-1/2 flex flex-col gap-3 sm:gap-4"
            >
              {[...heroImages, ...heroImages].map((src, i) => (
                <div key={`col1-${i}`} className="w-full h-44 sm:h-64 rounded-2xl overflow-hidden relative flex-shrink-0">
                  <img src={src} className="w-full h-full object-cover" alt="Prathana Foundation Solapur" />
                  <div className="absolute inset-0 bg-brand-charcoal/20 mix-blend-overlay" />
                </div>
              ))}
            </motion.div>
            
            {/* Column 2 - Scrolling down */}
            <motion.div 
              animate={{ y: ["-50%", "0%"] }} 
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="w-1/2 flex flex-col gap-3 sm:gap-4"
            >
              {[...[...heroImages].reverse(), ...[...heroImages].reverse()].map((src, i) => (
                <div key={`col2-${i}`} className="w-full h-56 sm:h-80 rounded-2xl overflow-hidden relative flex-shrink-0">
                  <img src={src} className="w-full h-full object-cover" alt="Prathana Foundation Solapur" />
                  <div className="absolute inset-0 bg-brand-charcoal/20 mix-blend-overlay" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      {/* Badges Panel directly below Hero */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-5 gap-6 text-brand-charcoal border border-brand-clay/30"
        >
          {badgeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 group hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[13px] tracking-tight text-brand-charcoal">{item.title}</h4>
                  <p className="text-[10px] text-brand-muted font-light">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

    </section>
  );
}
