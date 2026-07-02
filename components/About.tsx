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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tLocal.cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onClick={() => onDonateClick && onDonateClick(card.campaignId)}
                  className="relative px-8 pb-10 pt-16 min-h-[380px] flex flex-col items-center justify-between text-center group mt-10 hover:-translate-y-2 transition-all duration-500 isolate cursor-pointer"
                >
                  {/* Vector SVG Dome shape card */}
                  <svg className="absolute inset-0 w-full h-full -z-10 filter drop-shadow-[0_8px_16px_rgba(21,34,27,0.03)] group-hover:drop-shadow-[0_20px_40px_rgba(21,34,27,0.07)] group-hover:scale-[1.01] transition-all duration-500" viewBox="0 0 100 120" preserveAspectRatio="none">
                    <path
                      d="M 6,114 C 6,70 12,12 50,12 C 88,12 94,70 94,114 C 50,108 6,114 6,114 Z"
                      fill={card.bgFill}
                      stroke={card.strokeColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Overlapping Peak Icon */}
                  <div className={`absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center ${card.iconBg} shadow-md z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Card Content centered */}
                  <div className="space-y-4 flex-1 flex flex-col justify-between pt-4 w-full">
                    <div className="space-y-3">
                      {/* Metric Stat badge */}
                      <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-brand-charcoal bg-brand-charcoal/5 px-3 py-1 rounded-full group-hover:bg-brand-yellow/20 group-hover:text-brand-forest transition-colors duration-300">
                        {card.statText}
                      </span>
                      <h3 className="font-serif-display text-xl font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors duration-300">{card.title}</h3>
                      <p className="text-brand-muted text-xs leading-relaxed font-light px-2 line-clamp-3">{card.desc}</p>
                    </div>

                    {/* Interactive CTA Link */}
                    <div className="pt-3 border-t border-brand-clay/20">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-charcoal group-hover:text-brand-forest transition-colors duration-300">
                        <span>{card.ctaText}</span>
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
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
          
          {/* Left Side: Overlapping Image Collage */}
          <div className="lg:col-span-6 relative grid grid-cols-12 gap-4 items-center">
            {/* Green border stripe on the far left */}
            <div className="absolute left-0 top-12 bottom-12 w-3 bg-brand-green rounded-full opacity-70 hidden sm:block" />
            
            {/* Main top left vertical image */}
            <div className="col-span-6 sm:pl-6">
              <div className="rounded-3xl overflow-hidden border border-brand-clay/40 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop"
                  alt="Outreach kitchen food prep"
                  className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Overlapping middle/right image with play button overlay */}
            <div className="col-span-6 relative -translate-y-6">
              <div className="rounded-3xl overflow-hidden border border-brand-clay/40 shadow-xl relative">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop"
                  alt="Children studying at Balgram"
                  className="w-full h-[220px] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Yellow play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal/20">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-brand-charcoal shadow-md animate-pulse">
                    <span className="text-xs font-extrabold">+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-right offset image */}
            <div className="col-span-8 col-start-4 -mt-8">
              <div className="rounded-2xl overflow-hidden border border-brand-clay/40 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop"
                  alt="Natural farming training Solapur"
                  className="w-full h-[160px] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
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
