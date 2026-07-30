'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Handshake, Heart, Target, ChevronRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CSRPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  const csr = (t as any).csr;

  const projectIcons = [
    <Heart className="w-6 h-6" key="heart" />,
    <Handshake className="w-6 h-6" key="handshake" />,
    <Building2 className="w-6 h-6" key="building" />,
    <Target className="w-6 h-6" key="target" />,
    <Target className="w-6 h-6" key="target2" />,
    <Heart className="w-6 h-6" key="heart2" />,
    <Building2 className="w-6 h-6" key="building" />,
  ];

  return (
    <div className="relative min-h-screen bg-[#fbf9f5] overflow-hidden flex flex-col justify-between selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />

      <main className="flex-1 z-10 pt-20">
        
        {/* ── CINEMATIC HERO ── */}
        <section className="relative bg-[#0d1a14] text-white pt-24 pb-32 md:pb-40 overflow-hidden">
          {/* Ambient overlays */}
          <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a14] via-[#0d1a14]/90 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-green/20 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase">
                <span className="w-6 h-px bg-brand-yellow/60" />
                {csr.label}
                <span className="w-6 h-px bg-brand-yellow/60" />
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {csr.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto"
            >
              {csr.subtitle}
            </motion.p>
          </div>
        </section>

        {/* ── PROJECTS GRID ── */}
        <section className="py-24 -mt-16 md:-mt-24 relative z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {csr.projects.map((project: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-5 text-left">
                    <div className="w-14 h-14 rounded-2xl bg-[#0d1a14]/5 flex items-center justify-center text-brand-charcoal group-hover:bg-[#0d1a14] group-hover:text-brand-yellow transition-colors duration-300">
                      {projectIcons[idx % projectIcons.length]}
                    </div>
                    
                    <div>
                      <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal leading-tight">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-saffron mt-2">
                          {project.tagline}
                        </p>
                      )}
                    </div>
                    
                    <p className="text-[15px] text-stone-600 font-light leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section className="py-20 md:py-32 bg-brand-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="font-serif-display text-4xl md:text-5xl font-bold text-white"
            >
              {csr.ctaHeader}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 font-light leading-relaxed"
            >
              {csr.ctaDesc}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-3 bg-brand-yellow hover:bg-brand-saffron text-brand-charcoal font-bold py-4 px-8 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                {csr.ctaBtn}
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
