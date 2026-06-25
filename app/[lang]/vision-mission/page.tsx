'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { Target, Compass } from 'lucide-react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VisionMissionPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  return (
    <div className="relative min-h-screen bg-brand-paper bg-grid-pattern overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-green/4 rounded-full blur-[100px] pointer-events-none animate-drift" style={{ animationDelay: '-2.5s' }} />

      <Header lang={lang} />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24 z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <span className="section-label">{t.vision.label}</span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
              {t.vision.title}
            </h1>
            <div className="accent-line" />
          </motion.div>

          {/* Vision & Mission Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-white border border-brand-clay/60 rounded-3xl space-y-6 flex flex-col justify-between premium-card"
            >
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-yellow">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {t.vision.visionTitle}
                </h3>
                <p className="text-[15px] text-brand-muted font-light leading-relaxed">
                  {t.vision.visionDesc}
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 bg-white border border-brand-clay/60 rounded-3xl space-y-6 flex flex-col justify-between premium-card"
            >
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-green">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {t.vision.missionTitle}
                </h3>
                <p className="text-[15px] text-brand-muted font-light leading-relaxed">
                  {t.vision.missionDesc}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Strategic Goals List */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-10 bg-brand-charcoal text-white rounded-3xl relative overflow-hidden space-y-8 shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 text-left">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">
                {lang === 'mr' ? 'उद्दिष्टे' : 'Strategic Blueprint'}
              </span>
              <h3 className="font-serif-display text-3xl font-bold leading-tight">
                {t.vision.goalsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {t.vision.goals.map((goal, index) => (
                <div key={index} className="flex gap-4 items-start bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold text-xs font-mono font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-brand-clay leading-relaxed font-light">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
