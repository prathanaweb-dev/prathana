'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Mail, MapPin, Phone, Send } from 'lucide-react';
import { translations } from '@/lib/translations';

interface FooterProps {
  lang: string;
  onDonateClick?: () => void;
}

export default function Footer({ lang, onDonateClick }: FooterProps) {
  const isMr = lang === 'mr';
  const t = translations[isMr ? 'mr' : 'en'] || translations.en;

  const isMarathi = lang === 'mr';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden text-white">
      
      {/* Main Footer — Deep Forest Green Background */}
      <div className="bg-brand-forest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Col 1 — Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:col-span-2 lg:col-span-1 text-left"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Prathana Foundation Logo"
                  className="w-12 h-12 object-contain bg-white/10 rounded-xl p-1"
                />
                <div className="flex flex-col">
                  <span className="font-serif-display text-lg font-bold leading-none">
                    Prathana
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-yellow font-bold mt-1">
                    Foundation
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed max-w-xs font-light">
                {isMarathi
                  ? 'सोलापूर, महाराष्ट्र येथे कार्यरत असलेली तळागाळातील संघटना जी गरीब कुटुंबांना पोषण, शिक्षण आणि आरोग्य सेवा पुरवते.'
                  : 'A grassroots humanitarian collective providing nutrition, education, and medical aid to families in Solapur, Maharashtra.'}
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-brand-yellow hover:border-brand-yellow transition-all duration-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-brand-yellow hover:border-brand-yellow transition-all duration-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-brand-yellow hover:border-brand-yellow transition-all duration-300">
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Col 2 — Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 text-left"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow block border-b border-white/10 pb-2">
                {isMarathi ? 'महत्वाच्या लिंक्स' : 'Quick Links'}
              </span>
              <nav className="flex flex-col gap-3 font-light">
                {[
                  { name: t.nav.story, href: `/${lang}/about` },
                  { name: t.nav.vision, href: `/${lang}/vision-mission` },
                  { name: t.nav.activities, href: `/${lang}/activities` },
                  { name: t.nav.projects, href: `/${lang}/projects` },
                  { name: t.nav.events, href: `/${lang}/events` },
                  { name: t.nav.gallery, href: `/${lang}/gallery` },
                  { name: isMr ? 'टीम' : 'Team', href: `/${lang}/team` },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Col 3 — Campaigns Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-left"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow block border-b border-white/10 pb-2">
                {isMarathi ? 'मोहिमा' : 'Active Campaigns'}
              </span>
              <nav className="flex flex-col gap-3 font-light">
                {[
                  { name: isMarathi ? 'बालग्राम पोषण मोहीम' : 'Balgram Nutrition Project', href: `/${lang}/donation` },
                  { name: isMarathi ? 'शैक्षणिक साहित्य संच' : 'School Kit Distributions', href: `/${lang}/donation` },
                  { name: isMarathi ? 'वृद्धाश्रम वैद्यकीय निधी' : 'Old Age Home Medical Aid', href: `/${lang}/donation` },
                  { name: isMarathi ? 'स्वच्छ पेयजल व्यवस्था' : 'Pure Water for All', href: `/${lang}/donation` },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Col 4 — Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-5 text-left"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-yellow block border-b border-white/10 pb-2">
                {isMarathi ? 'संपर्क माहिती' : 'Contact Us'}
              </span>
              <div className="space-y-4 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-yellow mt-0.5 shrink-0" />
                  <p className="text-xs text-white/70 leading-relaxed">
                    {isMarathi 
                      ? 'प्रार्थना बालग्राम, मोरवंची गाव, मोहोळ तालुका, सोलापूर जिल्हा, महाराष्ट्र ४१३२१३' 
                      : 'Prathana Balgram, Morvanchi Village, Mohol Taluka, Solapur District, Maharashtra 413213'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                  <a
                    href="mailto:contact@prathanafoundation.org"
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    contact@prathanafoundation.org
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                  <span className="text-xs text-white/70">
                    +91 98765 43210
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/10 bg-brand-charcoal/40">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-light text-center md:text-left">
              &copy; {new Date().getFullYear()} Prathana Foundation Solapur. All rights reserved.
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-widest font-light text-white/50">
              <a href={`/${lang}/legal/terms`} className="hover:text-white transition-colors">
                {isMarathi ? 'अटी व शर्ती' : 'Terms & Conditions'}
              </a>
              <span className="text-white/20">|</span>
              <a href={`/${lang}/legal/privacy`} className="hover:text-white transition-colors">
                {isMarathi ? 'गोपनीयता धोरण' : 'Privacy Policy'}
              </a>
              <span className="text-white/20">|</span>
              <a href={`/${lang}/legal/refund`} className="hover:text-white transition-colors">
                {isMarathi ? 'परतावा धोरण' : 'Refund Policy'}
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="/admin"
                className="text-[10px] uppercase tracking-widest text-brand-yellow hover:underline transition-colors font-semibold"
              >
                Admin Gateway
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors font-light"
              >
                {isMarathi ? 'वरती जा' : 'Top'}
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
