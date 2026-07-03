'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const values = [
    {
      title: lang === 'mr' ? 'करुणा (Compassion)' : 'Compassion',
      desc: lang === 'mr' 
        ? 'उपेक्षित आणि गरजू व्यक्तींसाठी सहानुभूतीने आणि सेवाभावाने काम करणे.' 
        : 'Leading all actions with empathy and heart-centered service to marginalized individuals.',
    },
    {
      title: lang === 'mr' ? 'प्रामाणिकपणा (Integrity)' : 'Integrity',
      desc: lang === 'mr'
        ? 'देणगी, कारभार आणि सामाजिक विश्वासामध्ये पूर्ण पारदर्शकता ठेवणे.'
        : 'Absolute transparency in donations, operations, and community trust.',
    },
    {
      title: lang === 'mr' ? 'शाश्वतता (Sustainability)' : 'Sustainability',
      desc: lang === 'mr'
        ? 'नैसर्गिक शेती आणि कौशल्य शिक्षणाद्वारे स्वावलंबन वाढवणे.'
        : 'Empowering self-reliance through natural farming and life-skills education.',
    },
    {
      title: lang === 'mr' ? 'ज्ञानार्जन (Learning)' : 'Learning',
      desc: lang === 'mr'
        ? 'युवक आणि मुलांमध्ये चारित्र्यनिर्मिती आणि परस्परसंवादी शिक्षणाला प्रोत्साहन देणे.'
        : 'Promoting character-building and interactive learning for youth and children.',
    },
    {
      title: lang === 'mr' ? 'समावेशकता (Inclusion)' : 'Inclusion',
      desc: lang === 'mr'
        ? 'जात, धर्म किंवा आर्थिक भेद विसरून सर्वांना सामावून घेणारे कौटुंबिक वातावरण देणे.'
        : 'Creating an open family environment that leaves no child or senior citizen behind.',
    },
    {
      title: lang === 'mr' ? 'सर्वांसाठी सन्मान (Dignity for All)' : 'Dignity for All',
      desc: lang === 'mr'
        ? 'प्रत्येक व्यक्तीला स्वाभिमानाने आणि स्वावलंबनाने जगण्याचा अधिकार देणे.'
        : 'Respecting and honoring every individual\'s right to live with self-worth.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-brand-paper bg-grid-pattern overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-saffron/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-3.5s' }} />

      <Header lang={lang} />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24 z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-24">
          
          {/* Section 1: Editorial Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <span className="section-label">{t.about.label}</span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
              {lang === 'mr' ? 'अन्नाने सुरुवात, शिक्षणाने क्रांती.' : 'It started with a plate of food.'}
            </h1>
            <div className="accent-line" />
            <p className="text-lg text-brand-muted font-light leading-relaxed">
              {t.about.p1}
            </p>
          </motion.div>

          {/* Section 2: Split Narrative Block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-brand-clay shadow-md">
              <img
                src="/awards/Awards/FB_IMG_1782107660649.jpg.jpeg"
                alt="Humanitarian outreach in Solapur"
                className="w-full h-[400px] object-cover editorial-img"
              />
            </div>

            <div className="lg:col-span-6 space-y-6 font-light text-brand-muted text-[15px] leading-relaxed">
              <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                {lang === 'mr' ? 'आमची वाटचाल आणि ध्येय' : 'How We Operate'}
              </h3>
              <p>{t.about.p2}</p>
              <p>{t.about.trustDesc}</p>
              
              <blockquote className="border-l-2 border-brand-yellow pl-5 italic text-brand-charcoal font-serif-display text-lg py-1 mt-4">
                &ldquo;{t.about.quote}&rdquo;
                <cite className="block text-[9px] uppercase tracking-widest text-brand-forest font-bold not-italic mt-2">
                  {t.about.quoteAuthor}
                </cite>
              </blockquote>
            </div>
          </motion.div>

          {/* Section 3: Core Values (3-col cards) */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="section-label">{lang === 'mr' ? 'मूल्ये' : 'Our Values'}</span>
              <h2 className="font-serif-display text-3xl font-bold text-brand-charcoal">
                {lang === 'mr' ? 'आम्हाला जोडणारी तत्वे.' : 'The Principles Steering Us.'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={v.title}
                  className="p-7 bg-white border border-brand-clay/60 rounded-2xl space-y-3 premium-card"
                >
                  <h4 className="font-serif-display text-lg font-bold text-brand-charcoal">
                    {v.title}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-light">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 4: Leadership Group */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="section-label">{lang === 'mr' ? 'नेतृत्व' : 'Leadership'}</span>
              <h2 className="font-serif-display text-3xl font-bold text-brand-charcoal">
                {t.about.leadershipTitle}
              </h2>
              <p className="text-sm text-brand-muted font-light max-w-xl">
                {t.about.leadershipSub}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.about.leaders.map((leader, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  key={leader.name}
                  className="bg-white border border-brand-clay/60 rounded-2xl overflow-hidden flex flex-col justify-between h-full premium-card"
                >
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-sand flex items-center justify-center font-serif-display text-brand-charcoal font-bold text-lg">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif-display text-base font-bold text-brand-charcoal">
                        {leader.name}
                      </h4>
                      <span className="block text-[10px] font-mono text-brand-forest uppercase font-bold">
                        {leader.role}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed font-light">
                      {leader.bio}
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
