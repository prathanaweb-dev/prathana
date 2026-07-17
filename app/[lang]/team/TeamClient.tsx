'use client';

import { TeamMember, Volunteer } from '@/lib/db';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function TeamClient({ lang, teamMembers, volunteers }: { lang: string, teamMembers: TeamMember[], volunteers: Volunteer[] }) {
  const isMr = lang === 'mr';

  const t = {
    label: isMr ? 'आमची टीम' : 'Our Team',
    title: isMr ? 'प्रार्थना परिवाराला भेटा' : 'Meet the Prathana Family',
    desc: isMr 
      ? 'आमचे समर्पित मुख्य सदस्य आणि स्वयंसेवक जे आमचे ध्येय शक्य करतात.' 
      : 'Our dedicated core members and volunteers who make our mission possible.',
    coreTeam: isMr ? 'मुख्य टीम' : 'Core Team',
    volunteers: isMr ? 'आमचे स्वयंसेवक' : 'Our Volunteers',
    noVolunteers: isMr ? 'अद्याप कोणतेही स्वयंसेवक नाहीत.' : 'No volunteers yet.',
    noTeam: isMr ? 'अद्याप कोणतेही टीम सदस्य जोडले नाहीत.' : 'No team members added yet.'
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl text-left"
          >
            <span className="section-label">{t.label}</span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
              {t.title}
            </h1>
            <div className="accent-line" />
            <p className="text-base text-brand-muted font-light leading-relaxed">
              {t.desc}
            </p>
          </motion.div>

          {/* Core Team */}
          <div className="space-y-12">
            <h2 className="text-3xl font-serif-display font-bold text-brand-charcoal border-b border-brand-clay/50 pb-4">{t.coreTeam}</h2>
            {teamMembers.length === 0 ? (
              <p className="text-brand-muted italic">{t.noTeam}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map((member, i) => (
                  <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden border border-brand-clay/60 shadow-sm hover:shadow-xl transition-all duration-500 premium-card">
                      <div className="aspect-[4/5] bg-brand-clay overflow-hidden relative">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-6 bg-white relative z-10 transform -translate-y-4 rounded-3xl mx-4 shadow-lg border border-brand-clay/40">
                        <h3 className="font-serif-display text-xl font-bold text-brand-charcoal text-center">{member.name}</h3>
                        <p className="text-brand-forest text-xs font-bold uppercase tracking-widest text-center mt-2">
                          {(isMr && member.position_mr) ? member.position_mr : member.position}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Volunteers */}
          <div className="space-y-12 pt-12 border-t border-brand-clay/50">
            <h2 className="text-3xl font-serif-display font-bold text-brand-charcoal border-b border-brand-clay/50 pb-4">{t.volunteers}</h2>
            {volunteers.length === 0 ? (
              <p className="text-brand-muted italic">{t.noVolunteers}</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {volunteers.map((vol, i) => (
                  <motion.div 
                    key={vol.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="bg-white p-5 rounded-2xl border border-brand-clay/60 shadow-sm text-center hover:border-brand-yellow/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-brand-sand rounded-full flex items-center justify-center mx-auto mb-3 text-brand-forest font-bold text-lg border border-brand-clay">
                      {vol.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-bold text-brand-charcoal text-sm">{vol.name}</div>
                    <div className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">{vol.city}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
