'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { translations } from '@/lib/translations';

interface FooterProps {
  lang: string;
  onDonateClick?: () => void;
}

export default function Footer({ lang, onDonateClick }: FooterProps) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Bar — Saffron accent strip */}
      <div className="bg-gradient-to-r from-brand-saffron to-[#C25E2E] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-white tracking-tight">
              {lang === 'mr' ? 'मदत करण्यास उत्सुक आहात का?' : 'Ready to make an impact?'}
            </h3>
            <p className="text-white/80 text-sm mt-1 font-light">
              {lang === 'mr' ? 'प्रत्येक गोळा झालेला रुपया थेट गरजू मुलांपर्यंत पोहोचतो.' : 'Every rupee reaches the children who need it most.'}
            </p>
          </div>
          {onDonateClick ? (
            <button
              onClick={onDonateClick}
              className="rounded-full bg-white text-brand-charcoal px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal hover:text-white transition-all duration-300 inline-flex items-center gap-2 shrink-0 shadow-md hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-current text-brand-saffron" />
              <span>{t.nav.donate}</span>
            </button>
          ) : (
            <a
              href={`/${lang}/donation`}
              className="rounded-full bg-white text-brand-charcoal px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal hover:text-white transition-all duration-300 inline-flex items-center gap-2 shrink-0 shadow-md hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-current text-brand-saffron" />
              <span>{t.nav.donate}</span>
            </a>
          )}
        </motion.div>
      </div>

      {/* Main Footer — 4-Column Grid */}
      <div className="bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Col 1 — Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0 }}
              className="space-y-5 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Prathana Foundation Logo"
                  className="w-9 h-9 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-serif-display text-lg font-bold text-white leading-none">
                    Prathana
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-semibold mt-0.5">
                    Solapur
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-xs font-light">
                {lang === 'mr'
                  ? 'सोलापूर, महाराष्ट्र येथे कार्यरत असलेली तळागाळातील संघटना जी गरीब कुटुंबांना पोषण, शिक्षण आणि आरोग्य सेवा पुरवते.'
                  : 'A grassroots humanitarian collective providing nutrition, education, and medical aid to families in Solapur, Maharashtra.'}
              </p>
            </motion.div>

            {/* Col 2 — Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-white block">
                {lang === 'mr' ? 'महत्वाच्या लिंक्स' : 'Quick Links'}
              </span>
              <nav className="flex flex-col gap-3 font-light">
                {[
                  { name: t.nav.story, href: `/${lang}/about` },
                  { name: t.nav.vision, href: `/${lang}/vision-mission` },
                  { name: t.nav.activities, href: `/${lang}/activities` },
                  { name: t.nav.projects, href: `/${lang}/projects` },
                  { name: t.nav.events, href: `/${lang}/events` },
                  { name: t.nav.gallery, href: `/${lang}/gallery` },
                  { name: t.nav.volunteer, href: `/${lang}/volunteer` },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Col 3 — Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-white block">
                {lang === 'mr' ? 'संपर्क' : 'Contact'}
              </span>
              <div className="space-y-4 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-saffron mt-0.5 shrink-0" />
                  <p className="text-sm text-white/70 leading-relaxed">
                    {lang === 'mr' ? 'प्रार्थना फाउंडेशन, सोलापूर, महाराष्ट्र ४१३००१' : 'Prathana Foundation, Solapur, Maharashtra 413001'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-saffron shrink-0" />
                  <a
                    href="mailto:contact@prathanafoundation.org"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    contact@prathanafoundation.org
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-saffron shrink-0" />
                  <span className="text-sm text-white/70">
                    +91 98765 43210
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Col 4 — Tax Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-5"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-white block">
                {lang === 'mr' ? 'कर सवलती' : 'Tax Benefits'}
              </span>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                {lang === 'mr'
                  ? 'आयकर कायद्याच्या कलम ८०जी अंतर्गत सर्व देणग्या ५०% कर वजावटीसाठी पात्र आहेत. प्रत्येक मदतीसाठी देणगी पावती आणि ८०जी प्रमाणपत्र दिले जाईल.'
                  : 'All donations are 50% tax exempt under Section 80G of the Income Tax Act. A verified digital receipt and 80G certificate is issued upon every contribution.'}
              </p>
              <p className="text-[10px] text-white/40 leading-relaxed font-light whitespace-pre-line">
                {lang === 'mr' 
                  ? 'नोंदणीकृत: संस्था नोंदणी अधिनियम १८६० व मुंबई सार्वजनिक विश्वस्त व्यवस्था अधिनियम १९५०\n८०जी प्रमाणित · भारत सरकार' 
                  : 'Registered under Societies Registration Act 1860 & Mumbai Public Trust Act 1950\n80G Certified · Govt. of India'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar — Compact */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-[11px] text-white/40 uppercase tracking-widest font-light">
              &copy; {new Date().getFullYear()} Prathana Foundation Solapur. All rights reserved.
            </span>

            <div className="flex items-center gap-6">
              <a
                href="/admin"
                className="text-[11px] uppercase tracking-widest text-brand-gold hover:underline transition-colors font-semibold"
              >
                Admin Gateway
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors font-light"
              >
                {lang === 'mr' ? 'वरती जा' : 'Top'}
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
