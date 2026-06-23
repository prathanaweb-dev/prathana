'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface TeamProps {
  lang: string;
}

export default function Team({ lang }: TeamProps) {
  const router = useRouter();

  const isMarathi = lang === 'mr';

  const teamMembers = [
    {
      name: isMarathi ? 'प्रसाद मोहिते' : 'Prasad Mohite',
      role: isMarathi ? 'संस्थापक आणि अध्यक्ष' : 'Founder & President',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: isMarathi ? 'अनू मोहिते' : 'Anu Mohite',
      role: isMarathi ? 'सचिव आणि सह-संस्थापक' : 'Secretary & Co-Founder',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: isMarathi ? 'अदनान शफी' : 'Adnan Shafi',
      role: isMarathi ? 'मार्गदर्शक / समन्वयक' : 'Field Coordinator',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: isMarathi ? 'जेनी विल्सन' : 'Jenny Wilson',
      role: isMarathi ? 'आरोग्य स्वयंसेवक' : 'Health Volunteer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 bg-brand-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 text-center">
        
        {/* Header Block */}
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-widest font-bold text-brand-saffron">
            {isMarathi ? 'आमचे सहकारी' : 'Team Members'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal">
            {isMarathi ? 'आमच्या स्वयंसेवकांना भेटा' : 'Meet Our Volunteer Team Members'}
          </h2>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-2" />
        </div>

        {/* 4-Column Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-brand-clay/35 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col items-center p-5 text-center space-y-4"
            >
              {/* Photo with curved top-left and bottom-right corners */}
              <div className="w-full aspect-square rounded-[30px_10px_30px_10px] overflow-hidden bg-brand-sand relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Social icons overlay on hover */}
                <div className="absolute inset-0 bg-brand-forest/65 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Text info */}
              <div className="space-y-1">
                <h4 className="font-serif-display text-lg font-bold text-brand-charcoal">{member.name}</h4>
                <p className="text-brand-muted text-xs font-light">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-4">
          <button
            onClick={() => router.push(`/${lang}/volunteer`)}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-8 py-3.5 text-[13px] tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            {isMarathi ? 'सर्व स्वयंसेवक पहा' : 'View All Volunteers'}
          </button>
        </div>

      </div>
    </section>
  );
}
