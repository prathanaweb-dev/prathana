'use client';

import { Project } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2, 
  Check, CheckCircle2, MapPin, Building2, Maximize2, X, Sparkles, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectDetailClient({ lang, project }: { lang: string, project: Project }) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  const isMr = lang === 'mr';
  
  const title = (isMr && project.title_mr) ? project.title_mr : project.title;
  const desc = (isMr && project.description_mr) ? project.description_mr : project.description;
  
  const currentStatus = [
    { id: 'planned', label: isMr ? 'नियोजित प्रकल्प' : 'Planned Initiative' },
    { id: 'active', label: isMr ? 'सुरू असलेला प्रकल्प' : 'Active Project' },
    { id: 'completed', label: isMr ? 'यशस्वीरित्या पूर्ण' : 'Completed Project' },
  ].find(s => s.id === project.status)?.label || project.status;

  const formatDate = (dateString?: string) => {
    if (!dateString) return isMr ? 'अनिर्दिष्ट' : 'Ongoing';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(isMr ? 'mr-IN' : 'en-IN', { month: 'short', year: 'numeric', day: 'numeric' });
  };

  const images = [project.image, ...(project.gallery || [])].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const highlights = isMr ? [
    'तळागाळातील गरजू घटकांपर्यंत थेट मदत व पुनर्वसन',
    'स्थानिक समुदाय आणि स्वयंसेवकांचा प्रत्यक्ष सहभाग',
    'प्रार्थना बालग्राम आणि वृद्धाश्रमाच्या माध्यमातून शाश्वत विकास',
    '१००% पारदर्शक व प्रामाणिक सामाजिक कार्य'
  ] : [
    'Direct outreach & rehabilitation for rural communities in need',
    'Active participation of local volunteers & ground team',
    'Sustainable long-term impact through Balgram sanctuary',
    '100% transparent and community-driven initiative'
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-grow pt-24 pb-24">

        {/* ── CINEMATIC HERO HEADER ── */}
        <section className="relative bg-[#0d1a14] text-white pt-12 pb-20 md:pb-28 overflow-hidden">
          {/* Subtle background blur from main project image */}
          {project.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-xl scale-110 pointer-events-none"
              style={{ backgroundImage: `url('${project.image}')` }}
            />
          )}
          
          {/* Ambient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a14] via-[#0d1a14]/80 to-[#0d1a14]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-yellow/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-6">
            
            {/* Breadcrumb back button */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Link 
                href={`/${lang}/projects`} 
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-yellow/80 hover:text-brand-yellow transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                {isMr ? 'सर्व प्रकल्पांकडे परत जा' : 'Back to Projects'}
              </Link>
            </motion.div>

            {/* Badges & Meta */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm ${
                project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                project.status === 'active' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-white/10 text-white/70 border-white/20'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  project.status === 'completed' ? 'bg-emerald-400' :
                  project.status === 'active' ? 'bg-amber-400 animate-pulse' :
                  'bg-white/50'
                }`} />
                {currentStatus}
              </span>

              {(project.start_date || project.end_date) && (
                <div className="flex items-center gap-2 text-xs text-white/70 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>{formatDate(project.start_date)}</span>
                  <span>&ndash;</span>
                  <span>{project.end_date ? formatDate(project.end_date) : (isMr ? 'सुरू आहे' : 'Present')}</span>
                </div>
              )}
            </motion.div>

            {/* Project Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl pt-2"
            >
              {title}
            </motion.h1>

          </div>
        </section>

        {/* ── MAIN CONTENT & SIDEBAR GRID ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* LEFT COLUMN: Main Gallery Stage & Story (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">

              {/* IMAGE SHOWCASE & THUMBNAILS */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-3 md:p-4 rounded-3xl border border-stone-200/80 shadow-xl space-y-3"
              >
                {/* Main Large Image Display */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-stone-900 group">
                  {images.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentIndex}
                          src={images[currentIndex]}
                          alt={`${title} - photo ${currentIndex + 1}`}
                          initial={{ opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      {/* Expand Lightbox Button */}
                      <button
                        onClick={() => setLightboxOpen(true)}
                        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all shadow-md"
                        title={isMr ? 'प्रतिमा मोठी करून पहा' : 'Expand Image'}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Carousel Arrow Controls */}
                      {images.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/40 hover:bg-black/75 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 shadow-lg"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/40 hover:bg-black/75 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 shadow-lg"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">No Image Available</div>
                  )}
                </div>

                {/* Thumbnails Strip */}
                {images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none px-1">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          idx === currentIndex 
                            ? 'border-brand-saffron ring-2 ring-brand-saffron/30 scale-95' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* ABOUT PROJECT CONTENT CARD */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200/80 shadow-lg space-y-8"
              >
                <div className="flex items-center gap-3 pb-2 border-b border-stone-100">
                  <div className="p-2.5 rounded-xl bg-brand-yellow/10 text-brand-saffron">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif-display font-bold text-brand-charcoal">
                    {isMr ? 'प्रकल्पाविषयी संपूर्ण माहिती' : 'About the Project'}
                  </h2>
                </div>

                {/* Detailed Narrative */}
                <div className="prose prose-lg max-w-none text-stone-700 font-light leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {desc}
                </div>

                {/* Key Highlights Section */}
                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal/70">
                    {isMr ? 'प्रकल्पाची प्रमुख वैशिष्ट्ये' : 'Key Highlights & Objectives'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>

            </div>

            {/* RIGHT COLUMN: Sticky Overview & Support CTA (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">

              {/* PROJECT QUICK METADATA CARD */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-lg space-y-6 sticky top-28"
              >
                <h3 className="text-lg font-serif-display font-bold text-brand-charcoal border-b border-stone-100 pb-3">
                  {isMr ? 'प्रकल्प तपशील' : 'Project Details'}
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Status */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">{isMr ? 'स्थिती' : 'Status'}</span>
                    <span className="font-semibold text-brand-charcoal">{currentStatus}</span>
                  </div>

                  {/* Start Date */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">{isMr ? 'प्रारंभ' : 'Start Date'}</span>
                    <span className="font-semibold text-brand-charcoal">{formatDate(project.start_date)}</span>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">{isMr ? 'पूर्णता' : 'Target / End Date'}</span>
                    <span className="font-semibold text-brand-charcoal">
                      {project.end_date ? formatDate(project.end_date) : (isMr ? 'सुरू आहे' : 'Ongoing')}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-saffron" />
                      {isMr ? 'स्थान' : 'Location'}
                    </span>
                    <span className="font-semibold text-brand-charcoal text-right">
                      {isMr ? 'मोरवंची, सोलापूर' : 'Morvanchi, Solapur'}
                    </span>
                  </div>

                  {/* Organization */}
                  <div className="flex items-start justify-between py-2">
                    <span className="text-stone-500 font-medium flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      {isMr ? 'संस्था' : 'Organized By'}
                    </span>
                    <span className="font-semibold text-brand-charcoal text-right">
                      {isMr ? 'प्रार्थना फाउंडेशन' : 'Prathana Foundation'}
                    </span>
                  </div>
                </div>

                {/* SUPPORT CTA CARD */}
                <div className="pt-4 border-t border-stone-100 space-y-4">
                  <div className="bg-emerald-950 text-white p-5 rounded-2xl space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                      {isMr ? '८०जी कर सवलत' : '80G Tax Exemption'}
                    </div>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      {isMr 
                        ? 'या सामाजिक कार्यात आपले योगदान देऊन अनाथ बालकांना व निराधारांना सहकार्य करा.' 
                        : 'Your generous contribution helps empower children and elders at Prathana Balgram.'}
                    </p>
                    <Link
                      href={`/${lang}/donation`}
                      className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      {isMr ? 'आता देणगी द्या' : 'Support This Initiative'}
                    </Link>
                  </div>

                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="w-full border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">{isMr ? 'लिंक कॉपी झाली!' : 'Link Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-stone-500" />
                        <span>{isMr ? 'हा प्रकल्प शेअर करा' : 'Share This Project'}</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>

            </div>

          </div>
        </div>

        {/* ── LIGHTBOX MODAL ── */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
                <img
                  src={images[currentIndex]}
                  alt={`${title} enlarged`}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                />

                {images.length > 1 && (
                  <div className="flex items-center justify-between w-full mt-4 text-white/70 text-xs px-4">
                    <button onClick={prevImage} className="hover:text-white flex items-center gap-1 font-semibold">
                      <ChevronLeft className="w-5 h-5" /> Previous
                    </button>
                    <span>{currentIndex + 1} / {images.length}</span>
                    <button onClick={nextImage} className="hover:text-white flex items-center gap-1 font-semibold">
                      Next <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer lang={lang} />
    </div>
  );
}

