'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from '@/components/TranslationProvider';

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
      className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-brand-yellow/40 p-8 rounded-2xl space-y-4 shadow-lg hover:shadow-[0_20px_50px_rgba(247,195,36,0.1)] hover:-translate-y-1 transition-all duration-500"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <span className="block font-mono text-5xl md:text-6xl font-bold text-white tracking-tight">
        {animatedValue.toLocaleString('en-IN')}
        {suffix && <span className="text-4xl md:text-5xl">{suffix}</span>}
      </span>
      <div className="w-8 h-[1.5px] bg-brand-gold/60" />
      <span className="block text-[10px] tracking-widest uppercase text-brand-gold font-bold">
        {label}
      </span>
      <p className="text-white/70 text-sm font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Impact({ lang, stats }: ImpactProps) {
  const t = useTranslations((lang === 'mr' ? 'mr' : 'en') as 'en'|'mr');

  const metrics = [
    {
      value: 45,
      suffix: '',
      label: lang === 'mr' ? 'प्रार्थना बालग्राम' : 'Prathana Balgram',
      description: lang === 'mr' 
        ? 'सध्या निवासी बालग्राममध्ये सुरक्षित असलेली मुले' 
        : 'Children Currently in Residential Care',
    },
    {
      value: 120,
      suffix: '+',
      label: lang === 'mr' ? 'प्रार्थना वृद्धाश्रम' : 'Prathana Old Age Home',
      description: lang === 'mr'
        ? 'आतापर्यंत आश्रय दिलेले निराधार वृद्ध (२५ सध्या निवासी)'
        : 'Elderly Residents Supported Since Inception (25 Current)',
    },
    {
      value: 60,
      suffix: '+',
      label: lang === 'mr' ? 'प्रार्थना मनोबल प्रकल्प' : 'Prathana Mnobal Project',
      description: lang === 'mr'
        ? 'निराधार वृद्धांवर सन्मानाने केलेले अंत्यसंस्कार'
        : 'Dignified Last Rites Performed for Destitute Elderly',
    },
    {
      value: 110,
      suffix: '+',
      label: lang === 'mr' ? 'वंचितांची शाळा' : 'Vanchitanchi Shala',
      description: lang === 'mr'
        ? 'मुख्य प्रवाहातील शिक्षणाशी जोडलेली मुले'
        : 'Children Mainstreamed into Formal Education',
    },
    {
      value: 4500,
      suffix: '+',
      label: lang === 'mr' ? 'शिक्षण सहाय्य उपक्रम' : 'Education Support Program',
      description: lang === 'mr'
        ? 'शालेय साहित्य आणि मदतीद्वारे समर्थित विद्यार्थी'
        : 'Students Supported with Educational Materials',
    },
    {
      value: 300,
      suffix: '+',
      label: lang === 'mr' ? 'युवा विकास प्रकल्प' : 'Youth Development Project',
      description: lang === 'mr'
        ? 'निवासी शिबिरे आणि कार्यशाळांद्वारे सक्षम केलेले तरुण'
        : 'Youth Empowered Through Residential Camps & Workshops',
    },
    {
      value: 45000,
      suffix: '+',
      label: lang === 'mr' ? 'कोविड-१९ मदत कार्य' : 'COVID-19 Relief Initiative',
      description: lang === 'mr'
        ? 'वाटप केलेले अन्न आणि १०,०००+ कुटुंबांना रेशन किट्स'
        : 'Meals Served & 10,000+ Families Food/Grocery Kits Distributed',
    },
    {
      value: 2000,
      suffix: '+',
      label: lang === 'mr' ? 'पूर मदत व पुनर्वसन' : 'Flood Relief & Rehabilitation',
      description: lang === 'mr'
        ? 'वितरित केलेले जेवण, १,०००+ कुटुंबांना मदत किट, ११ घरांची पुनर्बांधणी'
        : 'Meals Served, 1,000+ Families Relief Kits, 11 Flood-Damaged Homes Rebuilt',
    },
    {
      value: 16,
      suffix: '+',
      label: lang === 'mr' ? 'नैसर्गिक शेती प्रकल्प' : 'Natural Farming Project',
      description: lang === 'mr'
        ? 'कॅम्पसमध्ये पिकवल्या जाणाऱ्या नैसर्गिक भाज्यांचे प्रकार'
        : 'Varieties of Naturally Grown Vegetables Cultivated',
    },
  ];

  return (
    <section id="impact" className="py-28 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Background glow blobs & grids */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-green/8 rounded-full blur-[140px] pointer-events-none animate-drift" style={{ animationDelay: '-4s' }} />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
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

        {/* 3-column Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {lang === 'mr' ? 'प्रमाणित प्रत्यक्ष परिणाम · प्रार्थना फाउंडेशन' : 'Verified Audited Impact · Prathana Foundation'}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
