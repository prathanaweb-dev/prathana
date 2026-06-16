'use client';

import { motion } from 'framer-motion';

export default function Gallery() {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=800&auto=format&fit=crop',
      title: 'Nutrition Drive',
      desc: 'Cooked lunch service at Solapur slum clusters.',
      gridClass: 'md:col-span-7 h-[380px]',
    },
    {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
      title: 'Tuition Hubs',
      desc: 'After-school study support classes.',
      gridClass: 'md:col-span-5 h-[380px]',
    },
    {
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop',
      title: 'Health Checkups',
      desc: 'Primary clinical audits for elderly widows.',
      gridClass: 'md:col-span-5 h-[280px]',
    },
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
      title: 'Primary Education',
      desc: 'Distribution of stationery and school kits.',
      gridClass: 'md:col-span-7 h-[280px]',
    },
  ];

  return (
    <section id="gallery" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 space-y-5"
        >
          <span className="section-label">Stories in Pictures</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            Glimpses of Our
            <br />
            Ground Work.
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed">
            Real photos, real smiles. We capture regular photos from our field
            activities to keep our supporters updated and connected.
          </p>
        </motion.div>

        {/* Bento-Style Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`${photo.gridClass} relative rounded-2xl overflow-hidden group cursor-pointer`}
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover editorial-img transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* Dark hover overlay */}
              <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/50 transition-all duration-500" />

              {/* Text overlay — slides up on hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
