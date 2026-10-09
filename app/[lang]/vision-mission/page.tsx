'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { Target, Compass, Sparkles, HeartHandshake, ShieldCheck, TreePine } from 'lucide-react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VisionMissionPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const impactPillars = [
    {
      title: lang === 'mr' ? 'बालग्राम आश्रय व शिक्षण' : 'Child Sanctuary & Education',
      desc: lang === 'mr' ? '४५+ निराधार बालकांचे निवास, पोषण व शालेय शिक्षण' : 'Shelter, nutrition & holistic schooling for 45+ children',
      image: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_k1puoc.jpg',
      tag: lang === 'mr' ? 'बालग्राम' : 'Balgram',
    },
    {
      title: lang === 'mr' ? 'ज्येष्ठ नागरिक वृद्धाश्रम' : 'Dignified Elder Care',
      desc: lang === 'mr' ? '२५+ निराधार वृद्धांची मोफत औषधोपचार व कौटुंबिक सेवा' : 'Free healthcare, companionship & care for 25+ seniors',
      image: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951870/prathana/blob_agf0ba.jpg',
      tag: lang === 'mr' ? 'वृद्धाश्रम' : 'Old Age Home',
    },
    {
      title: lang === 'mr' ? 'नैसर्गिक व सेंद्रिय शेती' : 'Chemical-Free Agriculture',
      desc: lang === 'mr' ? '१६+ सेंद्रिय भाज्या व फळांची आवारात थेट लागवड' : '16+ organic vegetables & fruit crops cultivated on campus',
      image: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951864/prathana/blob_dgvcd9.jpg',
      tag: lang === 'mr' ? 'सेंद्रिय शेती' : 'Green Farm',
    },
    {
      title: lang === 'mr' ? 'वंचितांची शाळा उपक्रम' : 'Street Children Literacy',
      desc: lang === 'mr' ? '११०+ बालकांना थेट मुख्य प्रवाहात आणण्यासाठी शिक्षण' : 'Mainstreamed 110+ vulnerable children into formal schooling',
      image: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951899/prathana/blob_g4lenb.jpg',
      tag: lang === 'mr' ? 'वंचितांची शाळा' : 'Outreach',
    },
  ];

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
            <p className="text-base text-brand-muted font-light leading-relaxed">
              {lang === 'mr'
                ? '२०१८ पासून मोरवंची (सोलापूर) येथे निराधार मुले, वृद्ध व वंचित घटकांना सन्मानाचे आणि स्वावलंबी जीवन देण्याचा आमचा दृढ संकल्प.'
                : 'Since 2018, transforming the lives of orphaned children, destitute seniors, and marginalized rural families in Solapur.'}
            </p>
          </motion.div>

          {/* Vision & Mission Split Photographic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-brand-clay/60 rounded-3xl overflow-hidden flex flex-col justify-between premium-card shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Photo Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-brand-sand">
                <img
                  src="https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_k1puoc.jpg"
                  alt="Children smiling at Balgram"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-yellow text-brand-charcoal flex items-center justify-center font-bold shadow-md">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-white text-xs font-mono uppercase tracking-widest font-bold">
                    {lang === 'mr' ? 'ध्येय दृष्टी' : 'Our Vision'}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-8 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-charcoal mb-3">
                    {t.vision.visionTitle}
                  </h3>
                  <p className="text-[15px] text-brand-muted font-light leading-relaxed">
                    {t.vision.visionDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-clay/30 flex items-center gap-2 text-xs font-bold text-brand-forest">
                  <Sparkles className="w-4 h-4 text-brand-yellow" />
                  <span>{lang === 'mr' ? 'स्वावलंबी व सन्माननीय समाज' : 'Dignified & Self-Reliant Community'}</span>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-brand-clay/60 rounded-3xl overflow-hidden flex flex-col justify-between premium-card shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Photo Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-brand-sand">
                <img
                  src="https://res.cloudinary.com/djoklzpse/image/upload/v1786951870/prathana/blob_agf0ba.jpg"
                  alt="Elderly care at Prathana Old Age Home"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-green text-white flex items-center justify-center font-bold shadow-md">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-white text-xs font-mono uppercase tracking-widest font-bold">
                    {lang === 'mr' ? 'कार्य उद्दिष्ट' : 'Our Mission'}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-8 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-charcoal mb-3">
                    {t.vision.missionTitle}
                  </h3>
                  <p className="text-[15px] text-brand-muted font-light leading-relaxed">
                    {t.vision.missionDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-clay/30 flex items-center gap-2 text-xs font-bold text-brand-forest">
                  <HeartHandshake className="w-4 h-4 text-brand-green" />
                  <span>{lang === 'mr' ? 'थेट जमिनीवरील कार्य' : 'Grassroots Action in Solapur'}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strategic Goals Blueprint */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-12 bg-brand-charcoal text-white rounded-3xl relative overflow-hidden space-y-8 shadow-2xl"
          >
            {/* High-res background image overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity scale-105 pointer-events-none"
              style={{ backgroundImage: `url('https://res.cloudinary.com/djoklzpse/image/upload/v1786951864/prathana/blob_dgvcd9.jpg')` }}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 text-left relative z-10">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">
                {lang === 'mr' ? 'रणनीतिक आराखडा' : 'Strategic Blueprint'}
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl font-bold leading-tight">
                {t.vision.goalsTitle}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-light max-w-2xl">
                {lang === 'mr'
                  ? 'प्रत्येक उद्दिष्ट शाश्वत, पारदर्शक आणि समाजातील शेवटच्या घटकापर्यंत पोहोचणारे असावे यासाठी आमची रणनीती.'
                  : 'Actionable, accountable targets ensuring every rupee and effort directly uplifts marginalized lives.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left relative z-10">
              {t.vision.goals.map((goal, index) => (
                <div key={index} className="flex gap-4 items-start bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-brand-gold/40 hover:bg-white/10 transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border border-brand-gold/30">
                    {index + 1}
                  </div>
                  <p className="text-sm text-brand-clay leading-relaxed font-light">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Impact Pillars Grid */}
          <div className="space-y-8">
            <div className="text-left space-y-2">
              <span className="section-label">
                {lang === 'mr' ? 'प्रत्यक्ष कार्यक्षेत्र' : 'Impact Areas'}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-brand-charcoal">
                {lang === 'mr' ? 'जमिनीवरील सेवा कार्य' : 'Our Work in Motion'}
              </h2>
              <div className="accent-line" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden border border-brand-clay/50 shadow-sm hover:shadow-xl transition-all duration-300 group text-left flex flex-col"
                >
                  <div className="h-44 w-full overflow-hidden bg-brand-sand relative">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold">
                      {pillar.tag}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h4 className="font-serif-display text-lg font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-brand-muted font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
