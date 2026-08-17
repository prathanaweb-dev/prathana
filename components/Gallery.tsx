'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Video as VideoIcon, Film } from 'lucide-react';
import { useTranslations } from '@/components/TranslationProvider';

interface GalleryPhotoItem {
  id?: string;
  url: string;
  thumbnail_url?: string;
  media_type?: 'image' | 'video';
  title: string;
  title_mr?: string;
  desc?: string;
  desc_mr?: string;
  category: string;
}

interface GalleryProps {
  lang: string;
  initialPhotos?: GalleryPhotoItem[];
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

export default function Gallery({ lang, initialPhotos }: GalleryProps) {
  const t = useTranslations((lang === 'mr' ? 'mr' : 'en') as 'en'|'mr');
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const defaultPhotos: GalleryPhotoItem[] = [
    // ── Balgram ──
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_agkzck.jpg', title: 'Balgram Children', title_mr: 'बालग्राम मुले', desc: 'Children at Prathana Balgram campus.', desc_mr: 'बालग्राम आवारातील मुले.', category: 'balgram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_k1puoc.jpg', title: 'Daily Routine', title_mr: 'दैनंदिन दिनक्रम', desc: 'Children going about their daily routine at Balgram.', desc_mr: 'मुलांचा रोजचा दिनक्रम.', category: 'balgram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_di2elp.jpg', title: 'Life at Balgram', title_mr: 'बालग्राम जीवन', desc: 'Glimpses of life inside Prathana Balgram.', desc_mr: 'बालग्राम आवारात मुलांचे जीवन.', category: 'balgram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_phkqky.jpg', title: 'Balgram Event', title_mr: 'बालग्राम कार्यक्रम', desc: 'A special moment from a Balgram programme.', desc_mr: 'बालग्रामच्या विशेष कार्यक्रमाचा एक क्षण.', category: 'balgram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_odbniq.jpg', title: 'Study Time', title_mr: 'अभ्यास वेळ', desc: 'Children studying after school at Balgram.', desc_mr: 'मुले शाळेनंतर अभ्यास करताना.', category: 'balgram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_cz6dfi.jpg', title: 'Founder with Children', title_mr: 'प्रसाद मोहिते', desc: 'Founder Prasad Mohite with the children at Balgram.', desc_mr: 'संस्थापक प्रसाद मोहिते मुलांसोबत.', category: 'balgram' },

    // ── Natural Farming ──
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951864/prathana/blob_dgvcd9.jpg', title: 'Natural Farming', title_mr: 'नैसर्गिक शेती', desc: 'Chemical-free crop growing at Balgram campus.', desc_mr: 'बालग्राम आवारात रासायनिक खतांशिवाय शेती.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_kcexgd.jpg', title: 'Vegetable Garden', title_mr: 'भाजीपाला बाग', desc: 'Fresh vegetable garden at the campus.', desc_mr: 'ताज्या भाज्यांची बाग.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_mphuhc.jpg', title: 'Field Work', title_mr: 'शेत काम', desc: 'Field work at Balgram natural farm.', desc_mr: 'बालग्रामातील शेत काम.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_th3dy8.jpg', title: 'Crop Care', title_mr: 'पिकांची देखभाल', desc: 'Regular maintenance of crops.', desc_mr: 'पिकांची नियमित देखभाल.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951857/prathana/blob_iflelf.jpg', title: 'Harvest', title_mr: 'शेत कापणी', desc: 'Harvest day at the natural farm.', desc_mr: 'काढणीचा दिवस.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951857/prathana/blob_eyfjs0.jpg', title: 'Organic Produce', title_mr: 'सेंद्रिय भाज्या', desc: 'Fresh organic vegetables from the campus farm.', desc_mr: 'ताजे सेंद्रिय भाजीपाला.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951859/prathana/blob_vno5na.jpg', title: 'Green Garden', title_mr: 'हिरवी बाग', desc: 'Working in the lush green garden.', desc_mr: 'हिरव्यागार बागेत काम.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951860/prathana/blob_vq5dxe.jpg', title: 'Children & Farming', title_mr: 'मुले आणि शेती', desc: 'Children learning farming skills.', desc_mr: 'मुले शेतीचे धडे शिकत आहेत.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951862/prathana/blob_sdhum9.jpg', title: 'Sustainable Farming', title_mr: 'शाश्वत शेती', desc: 'Sustainable and eco-friendly farming practices.', desc_mr: 'शाश्वत आणि पर्यावरणपूरक शेती.', category: 'farming' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951863/prathana/blob_wkqr0a.jpg', title: 'Farm View', title_mr: 'शेत दृश्य', desc: 'Aerial view of Balgram farm.', desc_mr: 'बालग्राम शेताचे विहंगम दृश्य.', category: 'farming' },

    // ── Vrudhashram ──
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951870/prathana/blob_agf0ba.jpg', title: 'Old Age Home Care', title_mr: 'वृद्धाश्रम सेवा', desc: 'Daily care for senior residents at Morvanci campus.', desc_mr: 'ज्येष्ठ नागरिकांची काळजी.', category: 'vrudhashram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951867/prathana/blob_c4tthq.jpg', title: 'Dignified Living', title_mr: 'सन्मानाचे जीवन', desc: 'Warmth and companionship for abandoned elders.', desc_mr: 'निराधार वृद्धांना सन्मानाचे जीवन.', category: 'vrudhashram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951869/prathana/blob_duxfju.jpg', title: 'Elders\' Joy', title_mr: 'वृद्ध आनंद', desc: 'Joyful moments inside the old age home.', desc_mr: 'वृद्धाश्रमातील आनंदाचे क्षण.', category: 'vrudhashram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951868/prathana/blob_qjg7lz.jpg', title: 'Together Time', title_mr: 'एकत्र वेळ', desc: 'Senior residents spending time together.', desc_mr: 'ज्येष्ठ नागरिक एकत्र वेळ घालवतात.', category: 'vrudhashram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951870/prathana/blob_dgxofw.jpg', title: 'Elder Service', title_mr: 'वृद्ध सेवा', desc: 'Regular medical care and attention.', desc_mr: 'नियमित वैद्यकीय सेवा.', category: 'vrudhashram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951867/prathana/blob_cmk7t6.jpg', title: 'Ashram Programme', title_mr: 'वृद्धाश्रम कार्यक्रम', desc: 'Special programme at the old age home.', desc_mr: 'वृद्धाश्रमातील विशेष कार्यक्रम.', category: 'vrudhashram' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951871/prathana/blob_wubsee.jpg', title: 'Warmth & Love', title_mr: 'आपुलकी', desc: 'Serving elders with love and warmth.', desc_mr: 'प्रेम आणि आपुलकीने वृद्धांची सेवा.', category: 'vrudhashram' },

    // ── Vanchitanchi Shala ──
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951899/prathana/blob_g4lenb.jpg', title: 'Vanchitanchi Shala', title_mr: 'वंचितांची शाळा', desc: 'School for underprivileged street children.', desc_mr: 'रस्त्यावरील मुलांसाठी शाळा.', category: 'shala' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951899/prathana/blob_hezvzh.jpg', title: 'Child Literacy', title_mr: 'बाल शिक्षण', desc: 'Informal literacy classes for street children.', desc_mr: 'मुलांसाठी अनौपचारिक शिक्षण.', category: 'shala' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951902/prathana/blob_fbfemq.jpg', title: 'Education Drive', title_mr: 'शिक्षण उपक्रम', desc: 'Bringing children into mainstream education.', desc_mr: 'मुलांना शिक्षणाच्या प्रवाहात आणणे.', category: 'shala' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951902/prathana/blob_yxet38.jpg', title: 'Learning Children', title_mr: 'शिकणारी मुले', desc: 'Children enthusiastically learning.', desc_mr: 'उत्साहाने शिकणारी मुले.', category: 'shala' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951899/prathana/blob_n7gshe.jpg', title: 'Shala Outreach', title_mr: 'शाळा उपक्रम', desc: 'Outreach activity for marginalised children.', desc_mr: 'वंचित मुलांसाठी शाळा उपक्रम.', category: 'shala' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951881/prathana/blob_yb3ast.jpg', title: 'Classroom', title_mr: 'वर्ग खोली', desc: 'Learning in an informal classroom setting.', desc_mr: 'अनौपचारिक वर्ग खोलीत शिक्षण.', category: 'shala' },

    // ── Awards & Recognition ──
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951934/prathana/blob_rnfpji.jpg', title: 'Award Ceremony', title_mr: 'पुरस्कार सोहळा', desc: 'Prathana Foundation receiving recognition.', desc_mr: 'प्रार्थना फाउंडेशनला पुरस्कार.', category: 'awards' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951932/prathana/blob_xam3lg.jpg', title: 'Social Award', title_mr: 'सामाजिक पुरस्कार', desc: 'Award for outstanding social work.', desc_mr: 'सामाजिक कार्याबद्दल पुरस्कार.', category: 'awards' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951922/prathana/blob_zpwyzx.jpg', title: 'Special Honour', title_mr: 'विशेष सन्मान', desc: 'Special felicitation ceremony.', desc_mr: 'विशेष सन्मान समारंभ.', category: 'awards' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951921/prathana/blob_jgvanm.jpg', title: 'Recognition', title_mr: 'मान्यता', desc: 'Recognition for community service.', desc_mr: 'कार्याची मान्यता.', category: 'awards' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951934/prathana/blob_v4a9z7.jpg', title: 'Prestigious Award', title_mr: 'प्रतिष्ठित पुरस्कार', desc: 'Prestigious social service award.', desc_mr: 'प्रतिष्ठित सामाजिक पुरस्कार.', category: 'awards' },
    { url: 'https://res.cloudinary.com/djoklzpse/image/upload/v1786951917/prathana/blob_bddfz7.jpg', title: 'Community Honour', title_mr: 'समाजसेवा सन्मान', desc: 'Felicitation for community service.', desc_mr: 'समाजसेवेसाठी सन्मान.', category: 'awards' },
  ];

  const [photos, setPhotos] = useState<GalleryPhotoItem[]>(
    initialPhotos && initialPhotos.length > 0 ? initialPhotos : defaultPhotos
  );

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.photos) && data.photos.length > 0) {
          setPhotos(data.photos);
        }
      })
      .catch(() => {});
  }, []);

  const checkIsVideo = (item?: GalleryPhotoItem) => {
    if (!item) return false;
    return (
      item.media_type === 'video' ||
      item.category === 'videos' ||
      item.url?.endsWith('.mp4') ||
      item.url?.endsWith('.webm') ||
      item.url?.includes('youtube.com') ||
      item.url?.includes('youtu.be')
    );
  };

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : activeCategory === 'videos'
      ? photos.filter(checkIsVideo)
      : photos.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: lang === 'mr' ? 'सर्व' : 'All' },
    { id: 'videos', label: lang === 'mr' ? '🎥 व्हिडिओ' : '🎥 Videos' },
    { id: 'balgram', label: lang === 'mr' ? 'बालग्राम' : 'Balgram' },
    { id: 'farming', label: lang === 'mr' ? 'नैसर्गिक शेती' : 'Natural Farming' },
    { id: 'vrudhashram', label: lang === 'mr' ? 'वृद्धाश्रम' : 'Old Age Home' },
    { id: 'shala', label: lang === 'mr' ? 'वंचितांची शाळा' : 'Vanchitanchi Shala' },
    { id: 'awards', label: lang === 'mr' ? 'पुरस्कार' : 'Awards' },
    { id: 'team', label: lang === 'mr' ? 'कार्यकर्ते व टीम' : 'Team' },
  ];

  const getLocalizedTitle = (photo: GalleryPhotoItem) => {
    if (lang === 'mr') return photo.title_mr || photo.title;
    return photo.title || photo.title_mr || '';
  };

  const getLocalizedDesc = (photo: GalleryPhotoItem) => {
    if (lang === 'mr') return photo.desc_mr || photo.desc;
    return photo.desc || photo.desc_mr || '';
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  const currentItem = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;
  const currentIsVideo = checkIsVideo(currentItem || undefined);
  const ytEmbed = currentItem?.url ? getYouTubeEmbedUrl(currentItem.url) : null;

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
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 shadow-sm cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-forest text-white border-brand-forest shadow-md'
                  : 'bg-white/60 text-brand-muted border-brand-clay/60 hover:bg-brand-sand/55 hover:text-brand-charcoal hover:border-brand-yellow/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Uniform 3-column Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, idx) => {
            const isVid = checkIsVideo(photo);
            return (
              <motion.div
                key={photo.id || photo.url + idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.07 }}
                className="relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer bg-brand-charcoal shadow-sm"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Media Image / Video Thumbnail */}
                {isVid ? (
                  <div className="w-full h-full relative bg-brand-charcoal flex items-center justify-center">
                    {photo.thumbnail_url ? (
                      <img
                        src={photo.thumbnail_url}
                        alt={getLocalizedTitle(photo)}
                        className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    ) : photo.url?.endsWith('.mp4') || photo.url?.endsWith('.webm') ? (
                      <video src={photo.url} className="w-full h-full object-cover opacity-85" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-forest to-brand-charcoal">
                        <Film size={40} className="text-brand-yellow/60" />
                      </div>
                    )}

                    {/* Central Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                        <Play size={20} className="fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Video Tag Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-brand-yellow text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-brand-yellow/30 z-10">
                      <VideoIcon size={11} /> Video
                    </span>
                  </div>
                ) : (
                  <img
                    src={photo.url}
                    alt={getLocalizedTitle(photo)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                )}

                {/* Permanent gradient + title */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/90">{getLocalizedTitle(photo)}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/45 transition-all duration-500" />

                {/* Hover text — slides up */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow">{getLocalizedTitle(photo)}</span>
                  <p className="text-white/85 text-xs mt-1.5 font-light leading-relaxed line-clamp-2">{getLocalizedDesc(photo)}</p>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal Player */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
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
                {lightboxIndex + 1} / {filteredPhotos.length} {currentIsVideo ? '· 🎥 Video' : ''}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left/Right Arrow Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-10 transition-colors cursor-pointer"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-10 transition-colors cursor-pointer"
              aria-label="Next media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Centered Media Player Container */}
            <div className="relative max-w-4xl max-h-[70vh] w-full h-full flex items-center justify-center z-0 p-4">
              {currentIsVideo ? (
                ytEmbed ? (
                  <div className="w-full aspect-video max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <iframe
                      src={ytEmbed}
                      title={getLocalizedTitle(currentItem)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    key={currentItem.url}
                    src={currentItem.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 bg-black"
                  />
                )
              ) : (
                <motion.img
                  key={currentItem.url}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={currentItem.url}
                  alt={getLocalizedTitle(currentItem)}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
                />
              )}
            </div>

            {/* Media Details Bottom Bar */}
            <div className="absolute bottom-8 text-center max-w-xl z-10 px-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-yellow">
                {getLocalizedTitle(currentItem)}
              </span>
              <p className="text-white/80 text-sm mt-1.5 font-light leading-relaxed">
                {getLocalizedDesc(currentItem)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
