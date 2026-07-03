'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowRight, Users, Zap, HeartHandshake, Activity, Award } from 'lucide-react';
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

  return (
    <section className="relative bg-brand-forest overflow-hidden pt-36 pb-20 text-white">
      {/* Background organic paint stroke shape on the left */}
      <div className="absolute top-1/4 left-0 w-32 h-64 bg-brand-yellow opacity-25 rounded-r-full blur-3xl pointer-events-none" />
      
      {/* Top glowing ambient blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Content */}
        <div className="lg:col-span-7 space-y-8 text-left z-10">
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
            className="font-serif-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            {lang === 'mr' ? (
              <>
                गरजू आणि निराधार <br />
                <span className="text-brand-yellow highlight-stroke font-serif italic">लोकांना मदत</span> करूया
              </>
            ) : (
              <>
                Giving Help <br />
                To Those <span className="text-brand-yellow highlight-stroke font-serif italic font-semibold">Peoples</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/80 font-light max-w-xl leading-relaxed"
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
        </div>

        {/* Right Column - Child Photo */}
        <div className="lg:col-span-5 relative flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[40px_10px_40px_10px] overflow-hidden border-8 border-brand-yellow/20 bg-brand-charcoal shadow-2xl"
          >
            <img
              src="/balgram/Balgram/486262788_4051383418425113_5954660625716303688_n.jpg"
              alt="Happy smiling children supported by Prathana Foundation"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Visual bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/60 via-transparent to-transparent" />
          </motion.div>

          {/* Floating kids stats card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md border border-brand-clay/60 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 text-brand-charcoal"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="block text-xs font-bold text-brand-charcoal">45+ Children</span>
              <span className="block text-[9px] text-brand-muted font-light uppercase tracking-wider">Sponsored at Balgram</span>
            </div>
          </motion.div>

          {/* Floating tax exemption card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-8 -left-8 bg-white/95 backdrop-blur-md border border-brand-clay/60 p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20 text-brand-charcoal hidden sm:flex"
          >
            <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow font-extrabold text-xs">
              ✓
            </div>
            <div>
              <span className="block text-[11px] font-bold text-brand-charcoal">80G Tax Exemption</span>
              <span className="block text-[8px] text-brand-muted font-light uppercase tracking-wider">Approved Charity</span>
            </div>
          </motion.div>

          {/* Golden abstract circle highlight decoration */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-4 border-dashed border-brand-yellow/30 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-brand-green/30" />
        </div>

      </div>

      {/* Badges Panel directly below Hero */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-6 text-brand-charcoal border border-brand-clay/30"
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
