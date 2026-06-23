'use client';

import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StoriesProps {
  lang: string;
}

export default function Stories({ lang }: StoriesProps) {
  const router = useRouter();

  const isMarathi = lang === 'mr';

  const tLocal = {
    title: isMarathi ? 'आमचे नवीन लेख आणि बातम्या' : 'Our Latest News & Articles You Like',
    viewAll: isMarathi ? 'सर्व लेख पहा' : 'View All Articles',
    readMore: isMarathi ? 'अधिक वाचा' : 'Read More',
    byAdmin: isMarathi ? 'प्रशासक' : 'Admin',
    comments: isMarathi ? 'टिप्पण्या' : 'Comments',
  };

  const articles = [
    {
      date: isMarathi ? '२० जून २०२६' : '20 June 2026',
      commentsCount: 2,
      title: isMarathi 
        ? 'शिक्षण टिकवून ठेवण्यासाठी पोटभर आहार ही पहिली पायरी आहे' 
        : 'Nutrition and meals are the first step to child education.',
      desc: isMarathi
        ? 'सोलापूरमधील वस्ती भागातील बालकांमध्ये कुपोषण दूर करण्यासाठी आमच्या स्वयंपाकघराने राबविलेले उपक्रम.'
        : 'How our community kitchen feeds street and begging children daily to support their school retention.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop',
    },
    {
      date: isMarathi ? '१८ जून २०२६' : '18 June 2026',
      commentsCount: 0,
      title: isMarathi
        ? 'मोरवंची गावातील बालग्राममध्ये शैक्षणिक साहित्य वाटप मोहीम'
        : 'A warm kit for the school distribution drive in Morvanchi.',
      desc: isMarathi
        ? 'ग्रामीण भागातील गरजू विद्यार्थ्यांना वह्या, पुस्तके, दप्तर आणि इतर शैक्षणिक साहित्याचे वाटप.'
        : 'Distributing education bags, writing books, and uniforms to orphaned children at Balgram.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop',
    },
    {
      date: isMarathi ? '१५ जून २०२६' : '15 June 2026',
      commentsCount: 5,
      title: isMarathi
        ? 'रस्त्यावरील बालकांना मुख्य प्रवाहात आणण्यासाठी वंचितांची शाळा'
        : 'Educating street children helps secure a hopeful society.',
      desc: isMarathi
        ? 'भीक मागणाऱ्या बालकांना शिक्षणाची गोडी लावून त्यांना शाळेत दाखल करण्याचे आमचे प्रयत्न.'
        : 'Enrolling children rescued from begging into public schools and tracking their long-term growth.',
      image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <section id="stories" className="py-24 bg-brand-paper relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-yellow/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16 text-center">

        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
            {isMarathi ? 'बातम्या आणि लेख' : 'News & Articles'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal max-w-xl mx-auto leading-tight">
            {tLocal.title}
          </h2>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-2" />
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-brand-clay/35 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col text-left"
            >
              {/* Photo Area with date badge in corner */}
              <div className="h-52 relative overflow-hidden bg-brand-sand">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Yellow Date Badge */}
                <div className="absolute bottom-4 left-4 bg-brand-yellow text-brand-charcoal px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                  {art.date}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta comments */}
                  <div className="flex items-center gap-2 text-[10px] font-bold text-brand-muted uppercase tracking-wider">
                    <span>{tLocal.byAdmin}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {art.commentsCount} {tLocal.comments}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h4 className="font-serif-display text-lg font-bold text-brand-charcoal leading-snug group-hover:text-brand-forest transition-colors duration-300">
                    {art.title}
                  </h4>
                  <p className="text-brand-muted text-xs leading-relaxed font-light line-clamp-2">
                    {art.desc}
                  </p>
                </div>

                {/* Read more link */}
                <div className="pt-2">
                  <a
                    href={`/${lang}/events`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-charcoal hover:text-brand-forest transition-colors"
                  >
                    <span>{tLocal.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-4">
          <button
            onClick={() => router.push(`/${lang}/events`)}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-8 py-3.5 text-[13px] tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            {tLocal.viewAll}
          </button>
        </div>

      </div>
    </section>
  );
}
