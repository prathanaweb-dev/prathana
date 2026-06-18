'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { translations } from '@/lib/translations';

interface ImpactProps {
  lang: string;
  stats: {
    mealsProvided: number;
    kidsEducated: number;
    medicalConsults: number;
  };
}

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 2000, startCounting: boolean) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!startCounting || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startCounting]);

  return count;
}

/* ── Single metric card ── */
function MetricCard({
  value,
  suffix,
  label,
  description,
  index,
}: {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const animatedValue = useCounter(value, 2200, isInView);

  return (
    <motion.div
      ref={ref}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <span className="block font-mono text-5xl md:text-6xl font-bold text-white tracking-tight">
        {animatedValue.toLocaleString('en-IN')}
        {suffix && <span className="text-4xl md:text-5xl">{suffix}</span>}
      </span>
      <span className="block text-[10px] tracking-widest uppercase text-brand-gold font-bold">
        {label}
      </span>
      <p className="text-white/50 text-sm font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Impact({ lang, stats }: ImpactProps) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const metrics = [
    {
      value: stats.mealsProvided || 4625,
      label: lang === 'mr' ? 'वितरित जेवण' : 'Meals Served',
      description: lang === 'mr'
        ? 'सोलापूरच्या झोपडपट्टी भागातील गरीब आणि अनाथ मुलांना दिलेले सकस अन्न'
        : 'Hot nutritious meals to orphans & low-income children in Solapur',
    },
    {
      value: stats.kidsEducated || 380,
      label: lang === 'mr' ? 'शिक्षण घेतलेली मुले' : 'Children Educated',
      description: lang === 'mr'
        ? 'शालेय साहित्य संच, फी आणि गणवेशाद्वारे मदत मिळालेले विद्यार्थी'
        : 'Sponsored with school kits, fees, and uniforms',
    },
    {
      value: stats.medicalConsults || 1240,
      label: lang === 'mr' ? 'वैद्यकीय तपासण्या' : 'Medical Consults',
      description: lang === 'mr'
        ? 'मोफत प्राथमिक आरोग्य तपासणी शिबिरे आणि आवश्यक औषधांचे वाटप'
        : 'Free health checkups & prescription medicines provided',
    },
    {
      value: 88,
      suffix: '%',
      label: lang === 'mr' ? 'निधीचा थेट वापर' : 'Direct Utilization',
      description: lang === 'mr'
        ? 'थेट मदत आणि सेवा कार्यावर खर्च झालेली रक्कम, लेखापरीक्षणाद्वारे प्रमाणित'
        : 'Funds spent directly on relief, verified by audits',
    },
  ];

  return (
    <section id="impact" className="py-28 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-saffron/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-20 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
            {lang === 'mr' ? 'कामाचे मोजमाप' : 'Measuring Our Work'}
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-white">
            {t.vision.label === 'Purpose & Drive' 
              ? <>Every Contribution<br />Leaves a Lasting Imprint.</>
              : <>प्रत्येक लहान मदत<br />नवा बदल घडवून आणते.</>}
          </h2>
          <div className="w-12 h-[2px] bg-brand-gold mt-2" />
        </motion.div>

        {/* 2×2 Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, idx) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              description={metric.description}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="font-serif-display italic text-lg md:text-xl text-brand-clay/80 leading-relaxed">
            &ldquo;{lang === 'mr' 
              ? 'आम्ही यश पैशांमध्ये मोजत नाही. आमचे यश त्या मुलांमध्ये आहे जे रात्री उपाशी झोपत नाहीत आणि त्या कुटुंबांमध्ये आहे ज्यांना मोफत औषधे मिळतात.' 
              : 'We don\'t count success in rupees collected. We count success in kids who no longer sleep hungry, and families who receive medicines without going into debt.'}&rdquo;
          </p>
          <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mt-4">
            {lang === 'mr' ? 'प्रमाणित प्रत्यक्ष परिणाम · प्रार्थना सोलापूर' : 'Verified Audited Impact · Prathana Solapur'}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
