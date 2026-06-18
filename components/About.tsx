'use client';

import { motion } from 'framer-motion';
import { translations } from '@/lib/translations';

interface AboutProps {
  lang: string;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const timelineEvents = [
    {
      year: '2018',
      title: lang === 'mr' ? 'वंचितांची शाळा' : 'Vanchitanchi Shala',
      description: lang === 'mr' 
        ? 'प्रसाद आणि अनू मोहिते यांनी सोलापूरच्या रस्त्यावरील मुलांच्या शिक्षणासाठी वंचितांची शाळा उपक्रम सुरू केला.' 
        : 'Prasad and Anu Mohite started "Vanchitanchi Shala" in Solapur to rescue street and begging children.',
      color: 'bg-brand-saffron',
    },
    {
      year: 'Balgram',
      title: lang === 'mr' ? 'हक्काचे घर' : 'A Permanent Home',
      description: lang === 'mr'
        ? 'प्रसाद यांनी आपली वडिलोपार्जित जमीन विकून बालग्रामच्या हक्काच्या जागेसाठी मोरवंची येथे जमीन खरेदी केली.'
        : 'Prasad sold his family land to purchase land in Morvanchi village, establishing Prathana Balgram.',
      color: 'bg-brand-green',
    },
    {
      year: 'Today',
      title: lang === 'mr' ? 'विस्तारित सेवा' : 'Expanding Care',
      description: lang === 'mr'
        ? 'सध्या बालग्राममध्ये ४५ बालके, वृद्धाश्रमात २५ वृद्ध आणि नैसर्गिक शेती प्रकल्प सुरू आहेत.'
        : 'Now supporting 45 children, 25 abandoned elderly, and promoting self-reliance via natural farming.',
      color: 'bg-brand-charcoal',
    },
  ];

  return (
    <section id="about" className="py-32 bg-brand-paper bg-grid-pattern relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-saffron/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-3s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-y-0 items-start">

          {/* ── Left column: Editorial Image ── */}
          <motion.div
            className="lg:col-span-6 space-y-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl overflow-hidden border border-brand-clay/60 shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
                alt="Volunteer teaching children at a transit shelter"
                className="w-full h-[500px] object-cover editorial-img"
                loading="lazy"
              />
            </div>
            {/* Caption strip */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] text-brand-muted font-light">
                {lang === 'mr' 
                  ? 'सोलापूरमधील एका तात्पुरत्या निवारा केंद्रात संध्याकाळचे अभ्यास वर्ग घेताना outreach समन्वयक.' 
                  : 'Outreach coordinator hosting an evening tuition circle at a transit shelter.'}
              </span>
              <span className="text-[9px] font-mono text-brand-muted/60 uppercase">
                Solapur, MH
              </span>
            </div>
          </motion.div>

          {/* ── Right column: Text (offset for asymmetry) ── */}
          <motion.div
            className="lg:col-span-5 lg:col-start-8 space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="space-y-4">
              <span className="section-label">{t.about.label}</span>
              <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
                {t.about.title}
              </h2>
              <div className="accent-line" />
            </div>

            <div className="space-y-5 text-brand-muted text-[15px] leading-relaxed font-light">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* Pull-quote */}
            <motion.blockquote
              className="border-l-2 border-brand-saffron/30 pl-6 py-2"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-serif-display italic text-xl text-brand-charcoal leading-relaxed">
                &ldquo;{t.about.quote}&rdquo;
              </p>
              <cite className="block mt-3 text-[10px] uppercase tracking-widest text-brand-saffron font-bold not-italic">
                {t.about.quoteAuthor}
              </cite>
            </motion.blockquote>

            {/* Trust commitment */}
            <div className="pt-4">
              <p className="text-brand-muted text-[13px] leading-relaxed font-light">
                {t.about.trustDesc}
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── Horizontal Timeline Strip ── */}
        <motion.div
          className="mt-24 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Horizontal connecting line */}
          <div className="absolute top-[22px] left-0 right-0 h-px bg-brand-clay/80 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.year}
                className="relative premium-card border border-brand-clay/50 rounded-2xl p-6 pt-10 shadow-md"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 * idx + 0.3 }}
              >
                {/* Dot on the line */}
                <div
                  className={`absolute -top-[5px] left-8 w-[11px] h-[11px] rounded-full ${event.color} ring-[3px] ring-brand-paper hidden md:block`}
                />

                <div className="space-y-2">
                  <span className="font-mono text-[13px] font-bold text-brand-charcoal tracking-wide">
                    {event.year}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-saffron font-bold ml-3">
                    {event.title}
                  </span>
                  <p className="text-brand-muted text-[13px] leading-relaxed font-light pt-1">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
