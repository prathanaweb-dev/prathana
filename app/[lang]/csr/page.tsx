'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, CheckCircle2, Loader2, FolderUp, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/db';

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

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFolderInfo, setUploadedFolderInfo] = useState<string | null>(null);
  const [isUploadingFolder, setIsUploadingFolder] = useState(false);

  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploadingFolder(true);
      const fileCount = e.target.files.length;
      // Simulate folder upload processing
      setTimeout(() => {
        setUploadedFolderInfo(`${fileCount} file(s) from folder uploaded successfully.`);
        setIsUploadingFolder(false);
      }, 1500);
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          // Filter to only show ongoing/active projects if needed, or just show all
          setProjects(data.projects || []);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-paper selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />

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

        {/* ── PREMIUM ALTERNATING PROJECTS (DYNAMIC) ── */}
        <section className="py-24 md:py-32 relative bg-brand-paper min-h-[50vh]">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-brand-muted space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
                <p className="tracking-widest uppercase text-xs font-bold">Loading Projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-brand-muted text-center space-y-4">
                <p className="text-xl font-light">No projects available at the moment.</p>
                <p className="text-sm">Please check back later for our latest CSR proposals.</p>
              </div>
            ) : (
              <div className="space-y-32 md:space-y-48">
                {projects.map((project, idx) => {
                  const isEven = idx % 2 === 0;
                  const title = lang === 'mr' && project.title_mr ? project.title_mr : project.title;
                  const desc = lang === 'mr' && project.description_mr ? project.description_mr : project.description;
                  const imageSrc = project.image || '/awards/Awards/FB_IMG_1541862550370.jpg';

                  return (
                    <div key={project.id || idx} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative`}>
                      
                      {/* Decorative Background Glows */}
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-left-20' : '-right-20'} w-96 h-96 bg-brand-saffron/10 rounded-full blur-[120px] pointer-events-none`} />

                      {/* Image Section */}
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 relative group"
                      >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-brand-clay/20">
                          {/* Image */}
                          <img 
                            src={imageSrc} 
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-brand-charcoal/10 group-hover:bg-transparent transition-colors duration-700" />
                          
                          {/* Premium Border Ring */}
                          <div className="absolute inset-4 border border-white/30 rounded-2xl pointer-events-none mix-blend-overlay" />
                        </div>
                        
                        {/* Floating Badge */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-white text-brand-charcoal px-6 py-4 rounded-2xl shadow-xl border border-brand-clay/30 flex items-center gap-3 z-20`}
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-green" />
                          <span className="font-bold text-sm tracking-wide uppercase">
                            {project.status === 'completed' 
                              ? (lang === 'mr' ? 'पूर्ण प्रकल्प' : 'Completed') 
                              : (lang === 'mr' ? 'सक्रिय प्रकल्प' : 'Active Initiative')}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Content Section */}
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 space-y-8"
                      >
                        <div className="space-y-4">
                          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-[1.1]">
                            {title}
                          </h2>
                        </div>
                        
                        <div className="w-12 h-1 bg-brand-yellow rounded-full" />
                        
                        <p className="text-lg text-brand-muted font-light leading-relaxed whitespace-pre-wrap">
                          {desc}
                        </p>
                      </motion.div>

                    </div>
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
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                href={`/${lang}/contact`}
                className="group relative inline-flex items-center justify-center gap-3 bg-brand-yellow text-brand-charcoal font-bold py-5 px-10 rounded-full text-[15px] uppercase tracking-widest overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_40px_rgba(240,165,0,0.3)]"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{csr.ctaBtn}</span>
              </Link>
              
              <div className="relative">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFolderUpload}
                  // @ts-ignore - React types don't natively include webkitdirectory well, but browsers support it
                  webkitdirectory="" 
                  directory="" 
                  multiple 
                  className="hidden" 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingFolder}
                  className="group relative inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 text-white font-bold py-5 px-10 rounded-full text-[15px] uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 backdrop-blur-sm"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  {isUploadingFolder ? (
                    <Loader2 className="w-5 h-5 relative z-10 animate-spin" />
                  ) : uploadedFolderInfo ? (
                    <FileCheck className="w-5 h-5 relative z-10 text-brand-green" />
                  ) : (
                    <FolderUp className="w-5 h-5 relative z-10" />
                  )}
                  <span className="relative z-10">
                    {isUploadingFolder 
                      ? (lang === 'mr' ? 'अपलोड करत आहे...' : 'Uploading...') 
                      : uploadedFolderInfo 
                        ? (lang === 'mr' ? 'यशस्वी' : 'Uploaded') 
                        : (lang === 'mr' ? 'फोल्डर अपलोड करा' : 'Upload Folder')}
                  </span>
                </button>
              </div>
            </motion.div>
            
            {/* Success message */}
            {uploadedFolderInfo && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand-green text-sm mt-4 font-bold tracking-wide"
              >
                {uploadedFolderInfo}
              </motion.p>
            )}
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
