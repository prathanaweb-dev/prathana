'use client';

import { motion } from 'framer-motion';
import { Utensils, BookOpen, Stethoscope, Check, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AboutProps {
  lang: string;
  onDonateClick?: (campaignId?: string) => void;
}

export default function About({ lang, onDonateClick }: AboutProps) {
  const router = useRouter();

  const isMarathi = lang === 'mr';

  const tLocal = {
    charityTitle: isMarathi ? 'Charity With Difference' : 'Charity With Difference',
    charitySub: isMarathi ? 'गरजूंना योग्य वेळी मदत करणे' : 'Help Them When They Are In Need',
    cards: [
      {
        title: isMarathi ? 'सकस आहार' : 'Healthy Food',
        desc: isMarathi ? 'सोलापूरमधील गरीब आणि रस्त्यावरील बालकांसाठी रोज पोषक आणि दर्जेदार जेवणाची व्यवस्था.' : 'Providing nutrition-dense meals daily to children in Solapur slums.',
        ctaText: isMarathi ? 'आहार प्रायोजित करा' : 'Sponsor a Meal',
        statText: isMarathi ? '१,५००+ रोजचे जेवण' : '1,500+ Daily Meals',
        campaignId: 'campaign-1',
        icon: Utensils,
        strokeColor: 'var(--color-brand-green)',
        bgFill: '#f2f6f4',
        iconBg: 'bg-brand-green text-white',
      },
      {
        title: isMarathi ? 'वैद्यकीय सेवा' : 'Medical Care',
        desc: isMarathi ? 'तपासणी शिबिरे, मोफत औषधे आणि बालकांच्या आरोग्याची नियमित काळजी.' : 'Conducting health camps and supplying prescription medicines.',
        ctaText: isMarathi ? 'वैद्यकीय मदत करा' : 'Sponsor Care',
        statText: isMarathi ? '२५०+ तपासण्या' : '250+ Weekly Audits',
        campaignId: 'campaign-2',
        icon: Stethoscope,
        strokeColor: '#d36d4b',
        bgFill: '#faf5f2',
        iconBg: 'bg-[#d36d4b] text-white',
      },
      {
        title: isMarathi ? 'गुणवत्तापूर्ण शिक्षण' : 'Child Education',
        desc: isMarathi ? 'शैक्षणिक साहित्य वाटप, फी मदत आणि विशेष अभ्यास वर्गांचे संचालन.' : 'Distributing educational kits and coordinating tutoring hubs.',
        ctaText: isMarathi ? 'शैक्षणिक साहित्य द्या' : 'Sponsor a Kit',
        statText: isMarathi ? '४५+ बालके शाळेत' : '45+ Kids Enrolled',
        campaignId: 'campaign-3',
        icon: BookOpen,
        strokeColor: 'var(--color-brand-yellow)',
        bgFill: '#fbf9f0',
        iconBg: 'bg-brand-yellow text-brand-charcoal',
      },
    ],
    aboutTitle: isMarathi ? 'एकमेकांना मदत करून जग सुंदर बनवूया' : 'Helping Each Other Can Make World Better',
    aboutSub: isMarathi 
      ? 'प्रार्थना फाउंडेशन सोलापूरमधील रस्त्यावरील आणि शेतकरी-आत्महत्याग्रस्त कुटुंबातील बालकांना व वृद्धांना हक्काचे घर आणि मायेची सावली देते.' 
      : 'Prathana Foundation is committed to making a difference in the lives of street children and rural families by providing direct shelter, support, and hope.',
    feature1Title: isMarathi ? 'वैद्यकीय सेवा' : 'Medical Services',
    feature1Desc: isMarathi ? 'तळागाळातील कुटुंबांसाठी मोफत प्राथमिक आरोग्य तपासणी शिबिरे.' : 'Free health clinics and check-ups for marginalized families.',
    feature2Title: isMarathi ? 'आरोग्य आणि पोषण' : 'Health & Nutrition',
    feature2Desc: isMarathi ? 'बालग्राम आणि वृद्धाश्रमात रोजच्या जेवणात सकस आहाराचा समावेश.' : 'Daily balanced nutrition for all children and elderly residents.',
    btnText: isMarathi ? 'आमच्याशी जोडा' : 'Join With Us',
    callUs: isMarathi ? 'आम्हाला कधीही कॉल करा' : 'Call Us Anytime',
  };

  return (
    <section id="about" className="py-24 bg-brand-paper relative overflow-hidden">
      {/* Background ambient blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-yellow/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* ── SECTION 1: Charity With Difference ── */}
        <div className="text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
              {tLocal.charityTitle}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal">
              {tLocal.charitySub}
            </h2>
            <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tLocal.cards.map((card, idx) => {
              const Icon = card.icon;
              const accentColors = [
                { bar: 'from-brand-green to-emerald-400', glow: 'rgba(76,140,94,0.15)', ring: 'border-brand-green/30', badge: 'bg-brand-green/10 text-brand-green' },
                { bar: 'from-[#d36d4b] to-orange-300', glow: 'rgba(211,109,75,0.15)', ring: 'border-[#d36d4b]/30', badge: 'bg-[#d36d4b]/10 text-[#d36d4b]' },
                { bar: 'from-brand-yellow to-amber-300', glow: 'rgba(230,190,0,0.15)', ring: 'border-brand-yellow/30', badge: 'bg-brand-yellow/10 text-amber-700' },
              ][idx];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: idx * 0.12 }}
                  onClick={() => onDonateClick && onDonateClick(card.campaignId)}
                  className={`group relative flex flex-col bg-white rounded-3xl border ${accentColors.ring} overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2`}
                  style={{ boxShadow: `0 4px 24px ${accentColors.glow}, 0 1px 4px rgba(21,34,27,0.04)` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${accentColors.glow}, 0 2px 8px rgba(21,34,27,0.06)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${accentColors.glow}, 0 1px 4px rgba(21,34,27,0.04)`; }}
                >
                  {/* Top gradient accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${accentColors.bar}`} />

                  {/* Card body */}
                  <div className="p-7 flex flex-col gap-5 flex-1">

                    {/* Icon + stat row */}
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg} shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${accentColors.badge}`}>
                        {card.statText}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="space-y-2 flex-1">
                      <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal leading-tight group-hover:text-brand-forest transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-brand-muted text-[13px] leading-relaxed font-light">
                        {card.desc}
                      </p>
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center justify-between pt-4 border-t border-brand-clay/15">
                      <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-charcoal group-hover:text-brand-forest transition-colors duration-300">
                        {card.ctaText}
                        <span className="w-5 h-5 rounded-full bg-brand-charcoal/8 flex items-center justify-center group-hover:bg-brand-forest/10 group-hover:translate-x-1 transition-all duration-300 text-xs">→</span>
                      </span>
                      {/* Index number */}
                      <span className="font-mono text-5xl font-black text-brand-charcoal/5 leading-none select-none group-hover:text-brand-charcoal/8 transition-colors duration-500">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator under cards */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
          </div>
        </div>


        {/* ── SECTION 2: Helping Each Other Can Make World Better ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Left Side: Photo Mosaic Collage */}
          <div className="lg:col-span-6 relative">
            {/* Decorative green stripe accent */}
            <div className="absolute -left-3 top-8 bottom-8 w-1.5 bg-brand-green rounded-full opacity-60 hidden lg:block" />

            <div className="grid grid-cols-2 gap-4 pl-0 lg:pl-4">

              {/* Column A — tall portrait image */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden border border-brand-clay/30 shadow-xl h-[420px]">
                  <img
                    src="/balgram/Balgram/486262788_4051383418425113_5954660625716303688_n.jpg"
                    alt="Children at Prathana Balgram"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Floating stat chip */}
                <div className="absolute -bottom-4 -right-4 bg-white border border-brand-clay/30 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono font-black text-lg text-brand-charcoal">45+</span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-muted font-semibold mt-0.5">{isMarathi ? 'मुले' : 'Children'}</span>
                  </div>
                </div>
              </div>

              {/* Column B — two stacked images, top one offset up */}
              <div className="flex flex-col gap-4 -mt-8">
                {/* Top stacked image — taller */}
                <div className="rounded-3xl overflow-hidden border border-brand-clay/30 shadow-lg h-[220px]">
                  <img
                    src="/balgram/Balgram/485616890_4051383675091754_3272242485595725906_n.jpg"
                    alt="Outreach activity at Balgram"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Bottom stacked image */}
                <div className="rounded-3xl overflow-hidden border border-brand-clay/30 shadow-md h-[180px]">
                  <img
                    src="/naturalfarming/Natural%20Farming/_MG_0169.JPG"
                    alt="Natural farming at Balgram campus"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>


          {/* Right Side: Features Checklist */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
                {isMarathi ? 'आम्ही कोण आहोत' : 'Who We Are'}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal leading-tight">
                {tLocal.aboutTitle}
              </h2>
              <div className="w-12 h-[2px] bg-brand-yellow" />
              <p className="text-brand-muted text-sm md:text-base leading-relaxed font-light">
                {tLocal.aboutSub}
              </p>
            </div>

            {/* Checklist details */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-forest flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[15px] text-brand-charcoal">{tLocal.feature1Title}</h4>
                  <p className="text-brand-muted text-xs font-light leading-relaxed">{tLocal.feature1Desc}</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-forest flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[15px] text-brand-charcoal">{tLocal.feature2Title}</h4>
                  <p className="text-brand-muted text-xs font-light leading-relaxed">{tLocal.feature2Desc}</p>
                </div>
              </div>
            </div>

            {/* CTA Button and phone call block */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-brand-clay/35">
              <button
                onClick={() => router.push(`/${lang}/volunteer`)}
                className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-8 py-3.5 text-[13px] tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {tLocal.btnText}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-clay flex items-center justify-center text-brand-charcoal shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-brand-muted font-medium leading-none">{tLocal.callUs}</span>
                  <span className="text-sm font-bold text-brand-charcoal mt-1 leading-none">+91 98765 43210</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
