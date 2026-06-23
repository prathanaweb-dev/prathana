'use client';

import { motion } from 'framer-motion';
import { CheckCircle, FileText, Award } from 'lucide-react';

interface TransparencyProps {
  lang: string;
}

export default function Transparency({ lang }: TransparencyProps) {
  const certifications = [
    {
      title: lang === 'mr' ? 'संस्था व ट्रस्ट नोंदणी' : 'Society & Trust Registration',
      code: 'Est. 2018 · Societies Reg Act 1860',
      desc: lang === 'mr' 
        ? 'संस्था नोंदणी अधिनियम, १८६० आणि मुंबई सार्वजनिक विश्वस्त व्यवस्था अधिनियम, १९५० अंतर्गत २०१८ मध्ये नोंदणीकृत.'
        : 'Registered in 2018 under the Societies Registration Act, 1860 and the Mumbai Public Trusts Act, 1950.',
    },
    {
      title: lang === 'mr' ? 'कल ८०जी कर सवलत' : 'Section 80G Tax Exemption',
      code: 'PAN/80G Approval Active',
      desc: lang === 'mr'
        ? 'सर्व देणग्या आयकर कायद्याच्या कलम ८०जी अंतर्गत ५०% कर वजावटीसाठी पात्र आहेत.'
        : 'All contributions are eligible for a 50% income tax deduction under section 80G of the Income Tax Act.',
    },
    {
      title: lang === 'mr' ? '१२ए नोंदणी' : '12A Registration',
      code: 'Granted by Income Tax Dept',
      desc: lang === 'mr'
        ? 'संस्थेला कर सवलत देणारी नोंदणी, ज्यामुळे गोळा झालेला सर्व निधी थेट प्रत्यक्ष मदतकार्यात वापरता येतो.'
        : 'Establishes our non-profit status, exempting the foundation from income tax to maximize ground funding.',
    },
    {
      title: lang === 'mr' ? 'बाह्य वित्तीय लेखापरीक्षण' : 'External Financial Audits',
      code: 'Audited by K.R. Shinde & Co.',
      desc: lang === 'mr'
        ? 'वार्षिक हिशेब स्वतंत्र सनदी लेखापालाकडून तपासले जातात आणि धर्मादाय आयुक्तांकडे सादर केले जातात.'
        : 'Annual statements are prepared by independent certified accountants and submitted to the Trust Registrar.',
    },
  ];

  const fundBars = [
    {
      label: lang === 'mr' ? 'थेट सेवा कार्य' : 'Direct Program Relief',
      pct: 88,
      color: 'bg-brand-green',
      textColor: 'text-brand-green',
      detail: lang === 'mr' ? 'जेवण, शालेय साहित्य संच, प्राथमिक तपासणी आणि वैद्यकीय मदत.' : 'Meals, school supplies, diagnostics clinics, and critical health support.',
    },
    {
      label: lang === 'mr' ? 'क्षेत्रीय आणि वाहतूक खर्च' : 'Field & Logistics Operations',
      pct: 7,
      color: 'bg-brand-saffron',
      textColor: 'text-brand-saffron',
      detail: lang === 'mr' ? 'स्वयंपाकघर कर्मचारी, वस्त्यांमध्ये वाहतूक आणि स्थानिक साठा केंद्र.' : 'Kitchen operations staff, transportation to remote slums, local hubs.',
    },
    {
      label: lang === 'mr' ? 'प्रशासकीय व ट्रान्झॅक्शन फी' : 'Admin & Transaction Fees',
      pct: 5,
      color: 'bg-brand-muted',
      textColor: 'text-brand-muted',
      detail: lang === 'mr' ? 'पेमेंट गेटवे शुल्क, सर्व्हर खर्च आणि शासकीय कागदपत्रांचे रिपोर्टिंग.' : 'Payment gateway fees, server hosting, regulatory reporting paperwork.',
    },
  ];

  return (
    <section id="transparency" className="py-32 bg-brand-paper bg-grid-pattern relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-green/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[25%] left-[-10%] w-[500px] h-[500px] bg-brand-saffron/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-2s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 space-y-5"
        >
          <span className="section-label">{lang === 'mr' ? 'वित्तीय पारदर्शकता' : 'Financial Integrity'}</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            {lang === 'mr' ? <>प्रत्येक रुपयाची<br />पूर्ण पारदर्शकता.</> : <>Our Promise of<br />Absolute Clarity.</>}
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed font-light">
            {lang === 'mr'
              ? 'आम्हाला जाणीव आहे की तुमचा प्रत्येक रुपया हा आमच्यावर टाकलेला विश्वास आहे. आम्ही प्रत्येक खर्चाची नोंद ठेवतो, ताळेबंद जाहीर करतो आणि लेखापरीक्षण अहवाल सादर करतो.'
              : 'We operate with the awareness that every single rupee you contribute is a trust placed in us. We verify every transaction, compile public sheets, and report directly on audits.'}
          </p>
        </motion.div>

        {/* Full-Width Unified Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="premium-card rounded-2xl p-8 md:p-10 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left: Fund Allocation Bars */}
            <div className="space-y-7">
              <div>
                <h4 className="font-serif-display text-xl font-bold text-brand-charcoal mb-1">
                  {lang === 'mr' ? 'तुमची मदत कुठे वापरली जाते' : 'Where Your Donation Goes'}
                </h4>
                <span className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">
                  {lang === 'mr' ? 'निधी वाटपाची आकडेवारी' : 'Allocation of Fiduciary Funds'}
                </span>
              </div>

              <div className="space-y-6">
                {fundBars.map((bar, idx) => (
                  <div key={bar.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-brand-charcoal">
                        {bar.label}
                      </span>
                      <span className={`font-mono text-sm font-bold ${bar.textColor}`}>
                        {bar.pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-brand-clay/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.15 }}
                        className={`h-full rounded-full ${bar.color}`}
                      />
                    </div>
                    <span className="block text-[11px] text-brand-muted leading-relaxed font-light">
                      {bar.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zero Commission Badge */}
              <div className="p-4 bg-brand-sand/30 border border-brand-clay/40 rounded-xl flex items-center gap-3">
                <Award className="w-9 h-9 text-brand-saffron flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-brand-charcoal uppercase tracking-wide">
                    {lang === 'mr' ? 'शून्य कमिशन व्यासपीठ' : 'Zero Commission Platform'}
                  </span>
                  <p className="text-[11px] text-brand-muted leading-relaxed mt-0.5 font-light">
                    {lang === 'mr'
                      ? 'आमचे संचालक कोणतेही मानधन घेत नाहीत. सर्व प्रशासकीय व्यवस्थापन पूर्णपणे स्वयंसेवी पद्धतीने केले जाते.'
                      : 'Our directors do not draw salaries. 100% of executive operations are financed voluntarily.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 2×2 Certification Mini-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-5 bg-brand-sand/40 border border-brand-clay/40 rounded-2xl space-y-3 shadow-sm hover:shadow-md hover:border-brand-saffron/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-brand-green" />
                    </div>
                    <h4 className="font-serif-display text-sm font-bold text-brand-charcoal leading-snug">
                      {cert.title}
                    </h4>
                  </div>

                  <span className="inline-block font-mono text-[11px] font-bold text-brand-saffron">
                    {cert.code}
                  </span>

                  <p className="text-xs text-brand-muted leading-relaxed font-light">
                    {cert.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Document Download Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 p-5 border border-brand-clay/50 bg-white/70 backdrop-blur-md rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-saffron/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-brand-saffron" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-brand-charcoal">
                {lang === 'mr' ? 'वार्षिक लेखापरीक्षण दस्तऐवज' : 'Annual Audit Statements'}
              </span>
              <span className="block text-[11px] text-brand-muted font-light">
                {lang === 'mr' ? 'नोंदणी प्रमाणपत्रे, कर परतावे आणि ताळेबंद (PDF)' : 'Registration approvals, tax filings & balance sheets (PDF)'}
              </span>
            </div>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(lang === 'mr' ? 'हे एक मॉकअप आहे. अधिकृत टॅक्स रिटर्न डाऊनलोड करण्यासाठी हे प्रोडक्शनमध्ये लिंक केले जाईल.' : 'This is a mockup. In production, this links to official tax filings and balance sheets.');
            }}
            className="px-6 py-2.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold tracking-wide uppercase text-[11px] rounded-full text-center shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            {lang === 'mr' ? 'दस्तऐवज डाऊनलोड करा' : 'Download Documents'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
