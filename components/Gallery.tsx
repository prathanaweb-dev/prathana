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
  
  const [activeCategory, setActiveCategory] = useState<'all' | 'balgram' | 'farming' | 'vrudhashram' | 'shala' | 'awards'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = [
    // ── Balgram ──
    { url: '/balgram/Balgram/486262788_4051383418425113_5954660625716303688_n.jpg', title: lang === 'mr' ? 'बालग्राम मुले' : 'Balgram Children', desc: lang === 'mr' ? 'बालग्राम आवारातील मुले.' : 'Children at Prathana Balgram campus.', category: 'balgram' },
    { url: '/balgram/Balgram/485616890_4051383675091754_3272242485595725906_n.jpg', title: lang === 'mr' ? 'दैनंदिन दिनक्रम' : 'Daily Routine', desc: lang === 'mr' ? 'मुलांचा रोजचा दिनक्रम.' : 'Children going about their daily routine at Balgram.', category: 'balgram' },
    { url: '/balgram/Balgram/486262711_4051383575091764_2412107029084713359_n.jpg', title: lang === 'mr' ? 'बालग्राम जीवन' : 'Life at Balgram', desc: lang === 'mr' ? 'बालग्राम आवारात मुलांचे जीवन.' : 'Glimpses of life inside Prathana Balgram.', category: 'balgram' },
    { url: '/balgram/Balgram/481252295_4027096254187163_273174834482280391_n.jpg', title: lang === 'mr' ? 'बालग्राम कार्यक्रम' : 'Balgram Event', desc: lang === 'mr' ? 'बालग्रामच्या विशेष कार्यक्रमाचा एक क्षण.' : 'A special moment from a Balgram programme.', category: 'balgram' },
    { url: '/balgram/Balgram/481214496_4027096250853830_8076879962026144513_n.jpg', title: lang === 'mr' ? 'अभ्यास वेळ' : 'Study Time', desc: lang === 'mr' ? 'मुले शाळेनंतर अभ्यास करताना.' : 'Children studying after school at Balgram.', category: 'balgram' },
    { url: '/balgram/Balgram/WhatsApp Image 2026-06-22 at 1.09.36 PM.jpeg', title: lang === 'mr' ? 'प्रसाद मोहिते' : 'Founder with Children', desc: lang === 'mr' ? 'संस्थापक प्रसाद मोहिते मुलांसोबत.' : 'Founder Prasad Mohite with the children at Balgram.', category: 'balgram' },

    // ── Natural Farming ──
    { url: '/naturalfarming/Natural%20Farming/_MG_0169.JPG', title: lang === 'mr' ? 'नैसर्गिक शेती' : 'Natural Farming', desc: lang === 'mr' ? 'बालग्राम आवारात रासायनिक खतांशिवाय शेती.' : 'Chemical-free crop growing at Balgram campus.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260329-WA0129.jpg', title: lang === 'mr' ? 'भाजीपाला बाग' : 'Vegetable Garden', desc: lang === 'mr' ? 'ताज्या भाज्यांची बाग.' : 'Fresh vegetable garden at the campus.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260329-WA0137.jpg', title: lang === 'mr' ? 'शेत काम' : 'Field Work', desc: lang === 'mr' ? 'बालग्रामातील शेत काम.' : 'Field work at Balgram natural farm.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260329-WA0143.jpg', title: lang === 'mr' ? 'पिकांची देखभाल' : 'Crop Care', desc: lang === 'mr' ? 'पिकांची नियमित देखभाल.' : 'Regular maintenance of crops.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260331-WA0043.jpg', title: lang === 'mr' ? 'शेत कापणी' : 'Harvest', desc: lang === 'mr' ? 'काढणीचा दिवस.' : 'Harvest day at the natural farm.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260623-WA0002.jpg', title: lang === 'mr' ? 'सेंद्रिय भाज्या' : 'Organic Produce', desc: lang === 'mr' ? 'ताजे सेंद्रिय भाजीपाला.' : 'Fresh organic vegetables from the campus farm.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260623-WA0004.jpg', title: lang === 'mr' ? 'हिरवी बाग' : 'Green Garden', desc: lang === 'mr' ? 'हिरव्यागार बागेत काम.' : 'Working in the lush green garden.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260623-WA0008.jpg', title: lang === 'mr' ? 'मुले आणि शेती' : 'Children & Farming', desc: lang === 'mr' ? 'मुले शेतीचे धडे शिकत आहेत.' : 'Children learning farming skills.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG-20260623-WA0014.jpg', title: lang === 'mr' ? 'शाश्वत शेती' : 'Sustainable Farming', desc: lang === 'mr' ? 'शाश्वत आणि पर्यावरणपूरक शेती.' : 'Sustainable and eco-friendly farming practices.', category: 'farming' },
    { url: '/naturalfarming/Natural%20Farming/IMG_9727.JPG', title: lang === 'mr' ? 'शेत दृश्य' : 'Farm View', desc: lang === 'mr' ? 'बालग्राम शेताचे विहंगम दृश्य.' : 'Aerial view of Balgram farm.', category: 'farming' },

    // ── Vrudhashram ──
    { url: '/Vrudhashram/Vrudhashram/486624799_4051683148395140_1808839315720356419_n.jpg', title: lang === 'mr' ? 'वृद्धाश्रम सेवा' : 'Old Age Home Care', desc: lang === 'mr' ? 'ज्येष्ठ नागरिकांची काळजी.' : 'Daily care for senior residents at Morvanci campus.', category: 'vrudhashram' },
    { url: '/Vrudhashram/Vrudhashram/485888831_4051682965061825_6203613217436305161_n.jpg', title: lang === 'mr' ? 'सन्मानाचे जीवन' : 'Dignified Living', desc: lang === 'mr' ? 'निराधार वृद्धांना सन्मानाचे जीवन.' : 'Warmth and companionship for abandoned elders.', category: 'vrudhashram' },
    { url: '/Vrudhashram/Vrudhashram/486493233_4051683115061810_2849420172237744929_n.jpg', title: lang === 'mr' ? 'वृद्ध आनंद' : 'Elders\' Joy', desc: lang === 'mr' ? 'वृद्धाश्रमातील आनंदाचे क्षण.' : 'Joyful moments inside the old age home.', category: 'vrudhashram' },
    { url: '/Vrudhashram/Vrudhashram/486082083_4050577441839044_1886977957426859795_n.jpg', title: lang === 'mr' ? 'एकत्र वेळ' : 'Together Time', desc: lang === 'mr' ? 'ज्येष्ठ नागरिक एकत्र वेळ घालवतात.' : 'Senior residents spending time together.', category: 'vrudhashram' },
    { url: '/Vrudhashram/Vrudhashram/486627533_4055227254707396_4811101929059682483_n.jpg', title: lang === 'mr' ? 'वृद्ध सेवा' : 'Elder Service', desc: lang === 'mr' ? 'नियमित वैद्यकीय सेवा.' : 'Regular medical care and attention.', category: 'vrudhashram' },
    { url: '/Vrudhashram/Vrudhashram/481242447_4030471493849639_7949063453700923126_n.jpg', title: lang === 'mr' ? 'वृद्धाश्रम कार्यक्रम' : 'Ashram Programme', desc: lang === 'mr' ? 'वृद्धाश्रमातील विशेष कार्यक्रम.' : 'Special programme at the old age home.', category: 'vrudhashram' },
    { url: '/Vrudhashram/Vrudhashram/503761736_4133072476922873_5976244531151698281_n.jpg', title: lang === 'mr' ? 'आपुलकी' : 'Warmth & Love', desc: lang === 'mr' ? 'प्रेम आणि आपुलकीने वृद्धांची सेवा.' : 'Serving elders with love and warmth.', category: 'vrudhashram' },

    // ── Vanchitanchi Shala ──
    { url: '/vanchitanchishala/Vanchitanchi%20Shala/481773971_4029575357272586_1971485340868554889_n.jpg', title: lang === 'mr' ? 'वंचितांची शाळा' : 'Vanchitanchi Shala', desc: lang === 'mr' ? 'रस्त्यावरील मुलांसाठी शाळा.' : 'School for underprivileged street children.', category: 'shala' },
    { url: '/vanchitanchishala/Vanchitanchi%20Shala/IMG-20180608-WA0096.jpg', title: lang === 'mr' ? 'बाल शिक्षण' : 'Child Literacy', desc: lang === 'mr' ? 'मुलांसाठी अनौपचारिक शिक्षण.' : 'Informal literacy classes for street children.', category: 'shala' },
    { url: '/vanchitanchishala/Vanchitanchi%20Shala/IMG-20180608-WA0171.jpg', title: lang === 'mr' ? 'शिक्षण उपक्रम' : 'Education Drive', desc: lang === 'mr' ? 'मुलांना शिक्षणाच्या प्रवाहात आणणे.' : 'Bringing children into mainstream education.', category: 'shala' },
    { url: '/vanchitanchishala/Vanchitanchi%20Shala/IMG-20180826-WA0282.jpg', title: lang === 'mr' ? 'शिकणारी मुले' : 'Learning Children', desc: lang === 'mr' ? 'उत्साहाने शिकणारी मुले.' : 'Children enthusiastically learning.', category: 'shala' },
    { url: '/vanchitanchishala/Vanchitanchi%20Shala/FB_IMG_1542104496892.jpg', title: lang === 'mr' ? 'शाळा उपक्रम' : 'Shala Outreach', desc: lang === 'mr' ? 'वंचित मुलांसाठी शाळा उपक्रम.' : 'Outreach activity for marginalised children.', category: 'shala' },
    { url: '/vanchitanchishala/Vanchitanchi%20Shala/20181109_092926.jpg', title: lang === 'mr' ? 'वर्ग खोली' : 'Classroom', desc: lang === 'mr' ? 'अनौपचारिक वर्ग खोलीत शिक्षण.' : 'Learning in an informal classroom setting.', category: 'shala' },

    // ── Awards & Recognition ──
    { url: '/awards/Awards/FB_IMG_1782107660649.jpg.jpeg', title: lang === 'mr' ? 'पुरस्कार सोहळा' : 'Award Ceremony', desc: lang === 'mr' ? 'प्रार्थना फाउंडेशनला पुरस्कार.' : 'Prathana Foundation receiving recognition.', category: 'awards' },
    { url: '/awards/Awards/FB_IMG_1782107621493.jpg.jpeg', title: lang === 'mr' ? 'सामाजिक पुरस्कार' : 'Social Award', desc: lang === 'mr' ? 'सामाजिक कार्याबद्दल पुरस्कार.' : 'Award for outstanding social work.', category: 'awards' },
    { url: '/awards/Awards/DSC_0350.JPG', title: lang === 'mr' ? 'विशेष सन्मान' : 'Special Honour', desc: lang === 'mr' ? 'विशेष सन्मान समारंभ.' : 'Special felicitation ceremony.', category: 'awards' },
    { url: '/awards/Awards/DSC_0432.JPG', title: lang === 'mr' ? 'मान्यता' : 'Recognition', desc: lang === 'mr' ? 'कार्याची मान्यता.' : 'Recognition for community service.', category: 'awards' },
    { url: '/awards/Awards/FB_IMG_1782107830648.jpg.jpeg', title: lang === 'mr' ? 'प्रतिष्ठित पुरस्कार' : 'Prestigious Award', desc: lang === 'mr' ? 'प्रतिष्ठित सामाजिक पुरस्कार.' : 'Prestigious social service award.', category: 'awards' },
    { url: '/awards/Awards/20200310_125506.jpg', title: lang === 'mr' ? 'समाजसेवा सन्मान' : 'Community Honour', desc: lang === 'mr' ? 'समाजसेवेसाठी सन्मान.' : 'Felicitation for community service.', category: 'awards' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: lang === 'mr' ? 'सर्व' : 'All' },
    { id: 'balgram', label: lang === 'mr' ? 'बालग्राम' : 'Balgram' },
    { id: 'farming', label: lang === 'mr' ? 'नैसर्गिक शेती' : 'Natural Farming' },
    { id: 'vrudhashram', label: lang === 'mr' ? 'वृद्धाश्रम' : 'Old Age Home' },
    { id: 'shala', label: lang === 'mr' ? 'वंचितांची शाळा' : 'Vanchitanchi Shala' },
    { id: 'awards', label: lang === 'mr' ? 'पुरस्कार' : 'Awards' },
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
    <section id="gallery" className="py-32 bg-brand-paper bg-grid-pattern relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-yellow/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-3.5s' }} />

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
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-brand-forest text-white border-brand-forest shadow-md'
                  : 'bg-white/60 text-brand-muted border-brand-clay/60 hover:bg-brand-sand/55 hover:text-brand-charcoal hover:border-brand-yellow/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Uniform 3-column Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.07 }}
              className="relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => setLightboxIndex(idx)}
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                loading="lazy"
              />

              {/* Permanent gradient + title */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/20 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/90">{photo.title}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/45 transition-all duration-500" />

              {/* Hover text — slides up */}
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">{photo.title}</span>
                <p className="text-white/85 text-xs mt-1.5 font-light leading-relaxed line-clamp-2">{photo.desc}</p>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3 h-3 text-white" />
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
