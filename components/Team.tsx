'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface TeamProps {
  lang: string;
}

export default function Team({ lang }: TeamProps) {
  const router = useRouter();
  const isMarathi = lang === 'mr';

  const defaultMembers = [
    {
      id: 'default-1',
      name: isMarathi ? 'प्रसाद मोहिते' : 'Prasad Mohite',
      role: isMarathi ? 'संस्थापक आणि अध्यक्ष' : 'Founder & President',
      image: '/team/Team/Prasad%20Mohite%20(Founder%20%26%20President)).jpg',
    },
    {
      id: 'default-2',
      name: isMarathi ? 'अनू मोहिते' : 'Anu Mohite',
      role: isMarathi ? 'सचिव' : 'Secretary',
      image: '/team/Team/Anu%20Mohite%20(Secretary).jpg',
    },
    {
      id: 'default-3',
      name: isMarathi ? 'विष्णू भोसले' : 'Vishnu Bhosale',
      role: isMarathi ? 'मुख्य कार्यकारी अधिकारी' : 'CEO',
      image: '/team/Team/Vishnu%20Bhosale%20(CEO).jpeg',
    },
    {
      id: 'default-4',
      name: isMarathi ? 'पांडुरंग तुपसामुद्रे' : 'Pandurang Tupsamudre',
      role: isMarathi ? 'उपाध्यक्ष' : 'Vice-President',
      image: '/team/Team/Pandurang%20Tupsamudre%20(Vice-President).jpeg',
    },
    {
      id: 'default-5',
      name: isMarathi ? 'सोमनाथ लामगुंडे' : 'Somnath Lamgunde',
      role: isMarathi ? 'संचालक' : 'Director',
      image: '/team/Team/Somnath%20Lamgunde%20(Director).jpeg',
    },
    {
      id: 'default-6',
      name: isMarathi ? 'समाधान वाडणे' : 'Samadhan Vadane',
      role: isMarathi ? 'प्रकल्प अधिकारी (कृषी)' : 'Project Officer – Agriculture',
      image: '/team/Team/Samadhan%20Vadane%20(Project%20Officer%20Agri).jpeg',
    },
  ];

  const [members, setMembers] = useState<any[]>(defaultMembers);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch('/api/team');
        const data = await res.json();
        if (data.success && data.team_members && data.team_members.length > 0) {
          setMembers(data.team_members.map((m: any) => ({
            id: m.id,
            name: m.name,
            role: (isMarathi && m.position_mr) ? m.position_mr : m.position,
            image: m.image,
            linkedin: m.linkedin,
            facebook: m.facebook,
            instagram: m.instagram,
          })));
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
      }
    }
    loadMembers();
  }, [isMarathi]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={member.id || idx}
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
                  {member.linkedin ? (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>
                  ) : null}
                  {member.facebook ? (
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z"/>
                      </svg>
                    </a>
                  ) : null}
                  {member.instagram ? (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                  ) : null}
                  {!member.linkedin && !member.facebook && !member.instagram && (
                    <span className="text-white/80 text-xs font-semibold px-3 py-1 rounded-full bg-black/40">Prathana Foundation</span>
                  )}
                </div>
              </div>

              {/* Text info and social links */}
              <div className="space-y-2 w-full">
                <h4 className="font-serif-display text-lg font-bold text-brand-charcoal">{member.name}</h4>
                <p className="text-brand-forest text-xs font-bold uppercase tracking-wider">{member.role}</p>

                {/* Social links: Always accessible and comfortably tappable on mobile & desktop */}
                {(member.linkedin || member.facebook || member.instagram) && (
                  <div className="flex items-center justify-center gap-2.5 pt-3 mt-2 border-t border-brand-clay/40">
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Facebook`}
                        title="Facebook Profile"
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z"/>
                        </svg>
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Instagram`}
                        title="Instagram Profile"
                        className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        title="LinkedIn Profile"
                        className="w-8 h-8 rounded-full bg-blue-50 text-sky-700 hover:bg-sky-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-4">
          <button
            onClick={() => router.push(`/${lang}/team`)}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-8 py-3.5 text-[13px] tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            {isMarathi ? 'सर्व स्वयंसेवक पहा' : 'View All Volunteers'}
          </button>
        </div>

      </div>
    </section>
  );
}
