'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Loader2, FileText, Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CsrDocument } from '@/lib/db';
import DocumentViewerModal from '@/components/DocumentViewerModal';

export default function CSRPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  const csr = (t as any).csr;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [docs, setDocs] = useState<CsrDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch('/api/csr-docs');
        const data = await res.json();
        if (data.success) {
          setDocs(data.documents || []);
        }
      } catch (err) {
        console.error('Failed to fetch csr docs', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-paper selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />

      {/* Document In-App Preview Modal */}
      {selectedDoc && (
        <DocumentViewerModal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc.title}
          url={selectedDoc.url}
          lang={lang}
        />
      )}

      <main className="flex-1 z-10 pt-20">
        
        {/* ── HIGH-END CINEMATIC HERO ── */}
        <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-[#0d1a14] overflow-hidden">
          {/* Parallax Background */}
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/awards/Awards/FB_IMG_1541862550370.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a14]/90 via-[#0d1a14]/60 to-[#0d1a14] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-green/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-brand-yellow/10 rounded-full blur-[150px] pointer-events-none" />
          </motion.div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center space-y-8 mt-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 backdrop-blur-md text-brand-yellow text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(240,165,0,0.15)]">
                {csr.label}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              className="font-serif-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-[1.05]"
            >
              {csr.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto"
            >
              {csr.subtitle}
            </motion.p>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-brand-yellow/50 to-transparent" />
          </motion.div>
        </section>

        {/* ── DOCUMENT LIBRARY (PREMIUM GRID) ── */}
        <section className="py-24 md:py-32 relative bg-brand-paper min-h-[50vh]">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-brand-muted space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
                <p className="tracking-widest uppercase text-xs font-bold">Loading Documents...</p>
              </div>
            ) : docs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-brand-muted text-center space-y-4">
                <FileText className="w-12 h-12 opacity-20" />
                <p className="text-xl font-light">No CSR documents available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {docs.map((doc, idx) => {
                  const title = lang === 'mr' && doc.title_mr ? doc.title_mr : doc.title;
                  
                  return (
                    <motion.div 
                      key={doc.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      onClick={() => setSelectedDoc({ title, url: doc.url })}
                      className="group relative bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(240,165,0,0.15)] border border-brand-clay/20 hover:border-brand-yellow/40 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <FileText className="w-32 h-32 text-brand-yellow rotate-12" />
                      </div>
                      
                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-14 h-14 bg-brand-clay/10 text-brand-forest rounded-2xl flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-amber-950 transition-colors duration-500 shadow-sm">
                            <FileText className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-yellow/10 text-amber-900 border border-brand-yellow/20">
                            {doc.url?.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC'}
                          </span>
                        </div>

                        <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal mb-4 group-hover:text-brand-forest transition-colors line-clamp-3">
                          {title}
                        </h3>
                        
                        <div className="text-sm font-semibold uppercase tracking-wider mt-auto pt-6 flex items-center justify-between text-brand-forest group-hover:text-amber-600 transition-colors">
                          <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-amber-500" />
                            {lang === 'mr' ? 'दस्तऐवज पहा' : 'View Document'}
                          </span>
                          <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── HIGH-IMPACT CALL TO ACTION ── */}
        <section className="py-32 relative bg-brand-charcoal overflow-hidden border-t-8 border-brand-yellow">
          <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-charcoal via-brand-forest/40 to-brand-charcoal pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif-display text-5xl md:text-7xl font-bold text-white leading-tight">
                {csr.ctaHeader}
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto"
            >
              {csr.ctaDesc}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="pt-6 flex justify-center"
            >
              <Link
                href={`/${lang}/contact`}
                className="group relative inline-flex items-center justify-center gap-3 bg-brand-yellow text-brand-charcoal font-bold py-5 px-10 rounded-full text-[15px] uppercase tracking-widest overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_40px_rgba(240,165,0,0.3)]"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{csr.ctaBtn}</span>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
