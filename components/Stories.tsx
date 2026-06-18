'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '@/lib/translations';

interface StoriesProps {
  lang: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function Stories({ lang }: StoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDirection, setActiveDirection] = useState(0);

  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const stories = [
    {
      name: lang === 'mr' ? 'रोहन शिंदे' : 'Rohan Shinde',
      role: lang === 'mr' ? 'इयत्ता तिसरीचा विद्यार्थी · आधी चहाच्या दुकानात कामगार' : 'Class 3 Student · Formerly Tea Stall Laborer',
      narrative: lang === 'mr' 
        ? 'आठ वर्षांचा असताना रोहन सोलापूरमधील एका चहाच्या दुकानात दिवसाला १० तास ग्लास धुण्याचे काम करत असे. आमच्या शिक्षण प्रायोजकत्व मोहिमेमुळे रोहनला महानगरपालिकेच्या शाळेत दाखल केले गेले. त्याचे पुस्तके, गणवेश आणि संध्याकाळचा पोषण आहार पूर्णपणे देणगीदारांच्या मदतीतून दिला जातो.' 
        : 'At eight years old, Rohan spent ten hours a day cleaning glasses at a local roadside tea shop. Thanks to our education sponsorship campaign, Rohan was enrolled in a municipal school. His books, uniform, and evening nutrition support are entirely covered by donor contributions.',
      quote: lang === 'mr' ? 'मला खूप अभ्यास करायचा आहे आणि आमच्या वस्तीतील मुलांना शिकवण्यासाठी शिक्षक व्हायचे आहे.' : 'I want to study hard and become a teacher in our colony one day.',
      image: 'https://images.unsplash.com/photo-1618057350488-8120b0802c65?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: lang === 'mr' ? 'लक्ष्मी कांबळे' : 'Laxmi Kamble',
      role: lang === 'mr' ? 'तीन मुलींची एकल माता' : 'Single Mother of Three Daughters',
      narrative: lang === 'mr'
        ? 'घरकाम करून स्वतःच्या पायावर तीन मुलींचे पालनपोषण करताना लक्ष्मीची खूप दमछाक होत होती. आमच्या पोषण आहार मोहिमेने आणि शालेय साहित्य वाटपाने तिच्या डोक्यावरील मोठा भार कमी केला. तिच्या मुली आता उपाशी न राहता रोज शाळेत जातात.'
        : 'Laxmi struggled to manage single-handedly while working as a housemaid. The nutrition meals program and school kit support took a massive load off her shoulders. Her daughters now attend class regularly without skipping nutritious lunches.',
      quote: lang === 'mr' ? 'माझ्या मुलींकडे आता नवीन दप्तर आणि खायला पोटभर अन्न आहे. यामुळे मला खूप मानसिक शांतता मिळाली.' : 'My daughters have school bags and full bellies now. This gives me peace of mind.',
      image: 'https://images.unsplash.com/photo-1593113503873-e4b412c93f4b?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const paginate = (newDirection: number) => {
    const nextIndex = (activeIndex + newDirection + stories.length) % stories.length;
    setActiveDirection(newDirection);
    setActiveIndex(nextIndex);
  };

  const goTo = (index: number) => {
    const dir = index > activeIndex ? 1 : -1;
    setActiveDirection(dir);
    setActiveIndex(index);
  };

  const story = stories[activeIndex];

  return (
    <section id="stories" className="py-32 bg-brand-sand/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-20 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t.volunteer.successTitle === 'Application Logged Successfully!' ? 'Faces of Impact' : 'बदलाचे चेहरे'}</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            {lang === 'mr' ? <>संघर्षातून घडलेल्या<br />यशस्वी कहाण्या.</> : <>Stories of<br />Resilient Hearts.</>}
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-[15px] font-light max-w-xl leading-relaxed">
            {lang === 'mr' 
              ? 'तुमच्या दातृत्वामुळे ज्यांच्या जीवनात मोलाचा बदल घडून आला आहे अशा आमच्या वस्तीतील मुलांची ओळख करून घ्या.' 
              : 'Meet the individuals whose lives have been altered by your empathy. These stories represent our purpose on the ground.'}
          </p>
        </motion.div>

        {/* Featured story */}
        <div className="relative min-h-[440px]">
          <AnimatePresence mode="wait" custom={activeDirection}>
            <motion.div
              key={activeIndex}
              custom={activeDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center"
            >
              {/* Left: Image */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border border-brand-clay/60">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-[400px] object-cover editorial-img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-6 lg:col-start-7 space-y-6">
                <div className="space-y-2">
                  <span className="section-label">{story.role}</span>
                  <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-brand-charcoal">
                    {story.name}
                  </h3>
                </div>

                <p className="text-brand-muted text-[15px] leading-relaxed font-light">
                  {story.narrative}
                </p>

                {/* Pull-quote */}
                <blockquote className="border-l-2 border-brand-saffron pl-6 py-2 mt-2">
                  <p className="font-serif-display italic text-xl text-brand-charcoal/90 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <cite className="block mt-3 text-[9px] uppercase tracking-widest text-brand-muted font-bold not-italic">
                    {lang === 'mr' ? 'लाभार्थी मनोगत' : 'Beneficiary Testimony'}
                  </cite>
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="mt-12 flex items-center justify-between">
          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-11 h-11 rounded-full border-2 border-brand-charcoal text-brand-charcoal flex items-center justify-center hover:bg-brand-charcoal hover:text-white transition-colors duration-300"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-11 h-11 rounded-full border-2 border-brand-charcoal text-brand-charcoal flex items-center justify-center hover:bg-brand-charcoal hover:text-white transition-colors duration-300"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const dir = idx > activeIndex ? 1 : -1;
                  setActiveDirection(dir);
                  // set index
                }}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 h-2 bg-brand-saffron'
                    : 'w-2 h-2 bg-brand-clay hover:bg-brand-muted'
                }`}
                aria-label={`Go to story ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="font-mono text-[11px] text-brand-muted tracking-wide">
            {String(activeIndex + 1).padStart(2, '0')}{' '}
            <span className="text-brand-clay">/</span>{' '}
            {String(stories.length).padStart(2, '0')}
          </span>
        </div>

      </div>
    </section>
  );
}
