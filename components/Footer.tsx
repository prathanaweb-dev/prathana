'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslations } from '@/components/TranslationProvider';

interface FooterProps {
  lang: string;
  onDonateClick?: () => void;
}

export default function Footer({ lang, onDonateClick }: FooterProps) {
  const isMr = lang === 'mr';
  const t = useTranslations(isMr ? 'mr' : 'en');

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
                  { name: isMr ? 'कायदेशीर' : 'Legal', href: `/${lang}/legal/terms` },
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
                      ? '६४/१ लोकमंगल साखर कारखाना रोड, मोरवंची, ता. मोहोळ जि. सोलापूर, ४१३२१३' 
                      : '64/1 Lokmangal Sugar Factory Road, Morvanchi, Taluka Mohol, Dist. Solapur, 413213'}
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
                    +91 95459 92026 / +91 90490 63829 / +91 70380 62114
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
            
            <div className="flex items-center gap-4 text-white/50">
              <a href="https://facebook.com/prathanafoundation" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com/prathanafoundation" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors" title="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://instagram.com/prathanafoundation" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors" title="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
