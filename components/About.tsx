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
        desc: isMarathi ? 'मोरवंची बालग्राममधील ४५ बालके आणि वृद्धाश्रमातील २५ वृद्धांसाठी कॅम्पसवरील स्वयंपाकघरात दररोज सकस आणि ताजे जेवण.' : 'Daily nutritious meals prepared in our campus kitchen for 45 children at Balgram and 25 elders at the Old Age Home in Morvanchi.',
        ctaText: isMarathi ? 'आहार प्रायोजित करा' : 'Sponsor a Meal',
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
        campaignId: 'campaign-3',
        icon: BookOpen,
        strokeColor: 'var(--color-brand-yellow)',
        bgFill: '#fbf9f0',
        iconBg: 'bg-brand-yellow text-brand-charcoal',
      },
    ],
    aboutTitle: isMarathi ? 'वैयक्तिक दुःखाचे आशेच्या आणि सेवेच्या कार्यात रूपांतर' : 'From Personal Tragedy to a Mission of Hope',
    aboutSub: isMarathi 
      ? '२०१८ मध्ये प्रसाद मोहिते आणि अनू मोहिते (MSW पदवीधर) यांनी स्थापन केलेल्या प्रार्थना फाउंडेशनने शेतकरी आत्महत्या व वैयक्तिक दुःखाचे रूपांतर समाजसेवेत केले. आज मोरवंची (सोलापूर) येथे ४५ बालकांना प्रार्थना बालग्राम आणि २५ वृद्धांना प्रार्थना वृद्धाश्रमाद्वारे निवारा, शिक्षण व सन्मान दिला जातो.' 
      : 'Founded in 2018 by Prasad Mohite and Anu Mohite (both MSW graduates), Prathana Foundation transformed personal grief after losing Prasad’s farmer father to suicide into a sacred mission. Today, it provides permanent residential care, education, and dignity to 45 children at Prathana Balgram and 25 senior citizens at Prathana Old Age Home in Morvanchi, Solapur.',
    motto: isMarathi ? 'मानवता हाच खरा धर्म' : 'Humanity is the True Religion',
    feature1Title: isMarathi ? 'प्रार्थना बालग्राम आणि वृद्धाश्रम' : 'Prathana Balgram & Old Age Home',
    feature1Desc: isMarathi ? 'मोरवंची (जि. सोलापूर) येथील स्वतःच्या हक्काच्या कॅम्पसमध्ये ४५ अनाथ/वंचित बालकांना व २५ निराधार वृद्धांना कौटुंबिक वातावरणात मोफत निवारा, शिक्षण आणि मोफत आरोग्य काळजी.' : 'Permanent residential campus on purchased land in Morvanchi, Solapur — providing shelter, education, healthcare, and family-like dignity to 45 vulnerable children and 25 senior citizens.',
    feature2Title: isMarathi ? 'वंचितांची शाळा आणि सेंद्रिय शेती' : 'Vanchitanchi Shala & Natural Farming',
    feature2Desc: isMarathi ? 'रस्त्यावरील व भिक्षेकरी मुलांना शिक्षणाच्या मुख्य प्रवाहात आणण्यापासून ते कॅम्पसमध्ये १६+ प्रकारच्या सेंद्रिय भाज्यांची नैसर्गिक शेती करण्यापर्यंत बालकांमध्ये स्वावलंबन निर्माण करणारे उपक्रम.' : 'Mainstreaming street and begging children into formal education, alongside cultivating 16+ varieties of chemical-free organic vegetables on campus for self-reliance.',
    feature3Title: isMarathi ? 'आपत्ती व्यवस्थापन आणि युवा विकास' : 'Disaster Relief & Youth Leadership',
    feature3Desc: isMarathi ? 'कोरोना व सोलापूर पूर परिस्थितीत थेट मदत (११ घरांची पुनर्बांधणी), तसेच शाळा-कॉलेजांमधील तरुणांसाठी निवासी नेतृत्व व व्यक्तिमत्त्व विकास शिबिरे.' : 'Active emergency support during COVID-19 & Solapur floods (rebuilding 11 homes), alongside residential youth leadership camps across schools and colleges.',
    btnText: isMarathi ? 'स्वयंसेवक व्हा' : 'Become a Volunteer',
    callUs: isMarathi ? 'संपर्क साधण्यासाठी' : 'Contact Us',
  };

  return (
    <section id="about" className="py-24 bg-brand-paper relative overflow-hidden">
      {/* Background ambient blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-yellow/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* ── SECTION 1: Charity With Difference ── */}
        <div className="text-center space-y-14">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
              {tLocal.charityTitle}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal">
              {tLocal.charitySub}
            </h2>
            <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {tLocal.cards.map((card, idx) => {
              const Icon = card.icon;
              const cardImages = [
                '/food.jpeg',
                '/medical-care.jpg',
                '/child-education.jpg',
              ];
              const accentColors = [
                { accent: 'from-brand-green/90 to-brand-green/70', ring: 'ring-brand-green/40', iconBg: 'bg-brand-green', badge: 'bg-brand-green' },
                { accent: 'from-[#d36d4b]/90 to-[#d36d4b]/70', ring: 'ring-[#d36d4b]/40', iconBg: 'bg-[#d36d4b]', badge: 'bg-[#d36d4b]' },
                { accent: 'from-brand-yellow/90 to-amber-500/80', ring: 'ring-brand-yellow/40', iconBg: 'bg-brand-yellow', badge: 'bg-brand-yellow' },
              ][idx];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onClick={() => onDonateClick && onDonateClick(card.campaignId)}
                  className="group relative flex flex-col rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                  style={{ boxShadow: '0 8px 40px rgba(21,34,27,0.12), 0 2px 8px rgba(21,34,27,0.06)' }}
                >
                  {/* Photo section */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={cardImages[idx]}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating icon badge — top left */}
                    <div className={`absolute top-5 left-5 w-12 h-12 rounded-2xl ${card.iconBg} shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 backdrop-blur-sm ring-2 ring-white/20`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex flex-col flex-1 bg-white p-6 gap-4">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-serif-display text-xl font-bold text-brand-charcoal leading-snug group-hover:text-brand-forest transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-brand-muted text-[13px] leading-relaxed font-light line-clamp-3">
                        {card.desc}
                      </p>
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center justify-between pt-3 border-t border-brand-clay/15">
                      <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-charcoal group-hover:text-brand-forest transition-colors duration-300">
                        {card.ctaText}
                        <span className="w-6 h-6 rounded-full bg-brand-charcoal/6 flex items-center justify-center group-hover:bg-brand-forest/15 group-hover:translate-x-1.5 transition-all duration-300 text-xs">→</span>
                      </span>
                      {/* Decorative number */}
                      <span className="font-mono text-4xl font-black text-brand-charcoal/[0.04] leading-none select-none group-hover:text-brand-charcoal/[0.08] transition-colors duration-500">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ── SECTION 2: Who We Are ── */}
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
                    src="/who-we-are-1.jpg"
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
                    src="/who-we-are-2.jpg"
                    alt="Outreach activity at Balgram"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Bottom stacked image */}
                <div className="rounded-3xl overflow-hidden border border-brand-clay/30 shadow-md h-[180px]">
                  <img
                    src="/who-we-are-3.jpg"
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
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
                  {isMarathi ? 'आम्ही कोण आहोत' : 'Who We Are'}
                </span>
                <span className="text-[10px] font-serif italic font-bold px-3 py-1 rounded-full bg-brand-yellow/15 text-brand-charcoal border border-brand-yellow/40">
                  "{tLocal.motto}"
                </span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
                {tLocal.aboutTitle}
              </h2>
              <div className="w-12 h-[2px] bg-brand-yellow" />
              <p className="text-brand-muted text-sm md:text-base leading-relaxed font-light">
                {tLocal.aboutSub}
              </p>
            </div>

            {/* Checklist details */}
            <div className="space-y-5">
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

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-forest flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[15px] text-brand-charcoal">{tLocal.feature3Title}</h4>
                  <p className="text-brand-muted text-xs font-light leading-relaxed">{tLocal.feature3Desc}</p>
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
                  <span className="text-xs font-bold text-brand-charcoal mt-1 leading-tight">+91 95459 92026 / 90490 63829 / 90223 93906</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
