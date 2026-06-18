'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { translations } from '@/lib/translations';

interface GalleryProps {
  lang: string;
}

export default function Gallery({ lang }: GalleryProps) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  
  const [activeCategory, setActiveCategory] = useState<'all' | 'nutrition' | 'education' | 'healthcare' | 'distribution'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=800&auto=format&fit=crop',
      title: lang === 'mr' ? 'पोषण मोहीम' : 'Nutrition Drive',
      desc: lang === 'mr' ? 'सोलापूरमधील वस्त्यांमध्ये अन्न वितरण.' : 'Cooked lunch service at Solapur slum clusters.',
      category: 'nutrition',
      gridClass: 'md:col-span-7 h-[380px]',
    },
    {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
      title: lang === 'mr' ? 'अभ्यास वर्ग' : 'Tuition Hubs',
      desc: lang === 'mr' ? 'शाळेनंतर निवारा केंद्रात मार्गदर्शन.' : 'After-school study support classes.',
      category: 'education',
      gridClass: 'md:col-span-5 h-[380px]',
    },
    {
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop',
      title: lang === 'mr' ? 'आरोग्य शिबिरे' : 'Health Camps',
      desc: lang === 'mr' ? 'वृद्ध महिलांची प्राथमिक तपासणी.' : 'Primary clinical audits for elderly widows.',
      category: 'healthcare',
      gridClass: 'md:col-span-5 h-[280px]',
    },
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
      title: lang === 'mr' ? 'साहित्य वाटप' : 'Kit Distributions',
      desc: lang === 'mr' ? 'विद्यार्थ्यांना शालेय साहित्य संच वाटप.' : 'Distribution of stationery and school kits.',
      category: 'distribution',
      gridClass: 'md:col-span-7 h-[280px]',
    },
  ];

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: t.gallery.categories.all },
    { id: 'nutrition', label: t.gallery.categories.drives },
    { id: 'education', label: t.gallery.categories.tuition },
    { id: 'healthcare', label: t.gallery.categories.medical },
    { id: 'distribution', label: t.gallery.categories.distribution },
  ] as const;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 space-y-5"
        >
          <span className="section-label">{t.gallery.label}</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            {t.gallery.title.split('<br />').map((chunk, i) => (
              <span key={i} className="block">{chunk}</span>
            ))}
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed font-light">
            {t.gallery.desc}
          </p>
        </motion.div>

        {/* Category Filters Tab Row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-brand-charcoal text-white border-brand-charcoal'
                  : 'bg-transparent text-brand-muted border-brand-clay hover:bg-brand-sand/35 hover:text-brand-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento-Style Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className={`${photo.gridClass} relative rounded-2xl overflow-hidden group cursor-pointer`}
              onClick={() => setLightboxIndex(idx)}
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover editorial-img transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* Dark hover overlay */}
              <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/40 transition-all duration-500" />

              {/* Text overlay — slides up on hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">
                  {photo.title}
                </span>
                <p className="text-white/90 text-sm mt-1 font-light leading-relaxed">
                  {photo.desc}
                </p>
              </div>

              {/* Permanent bottom-left label (subtle) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent p-5 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">
                  {photo.title}
                </span>
              </div>

              <div className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/45 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 select-none"
          >
            {/* Close trigger background */}
            <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />

            {/* Top Bar Controls */}
            <div className="absolute top-5 inset-x-0 px-6 md:px-12 flex justify-between items-center z-10 text-white">
              <span className="font-mono text-xs text-white/60">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left/Right Arrow Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-10 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Centered Image Container */}
            <div className="relative max-w-4xl max-h-[70vh] w-full h-full flex items-center justify-center z-0 p-4">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
              />
            </div>

            {/* Image Details Bottom Bar */}
            <div className="absolute bottom-8 text-center max-w-xl z-10 px-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                {filteredPhotos[lightboxIndex].title}
              </span>
              <p className="text-white/80 text-sm mt-1.5 font-light leading-relaxed">
                {filteredPhotos[lightboxIndex].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
