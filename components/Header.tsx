'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

interface HeaderProps {
  lang: string;
  onDonateClick?: () => void;
}

export default function Header({ lang, onDonateClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const navLinks = [
    { name: t.nav.story, href: `/${lang}/about` },
    { name: t.nav.vision, href: `/${lang}/vision-mission` },
    { name: t.nav.activities, href: `/${lang}/activities` },
    { name: t.nav.projects, href: `/${lang}/projects` },
    { name: t.nav.events, href: `/${lang}/events` },
    { name: t.nav.gallery, href: `/${lang}/gallery` },
    { name: t.nav.volunteer, href: `/${lang}/volunteer` },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const switchLanguage = (targetLang: 'en' | 'mr') => {
    if (targetLang === lang) return;
    setLangDropdownOpen(false);

    // Swap [lang] segment in pathname
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'mr') {
      segments[1] = targetLang;
    } else {
      segments.splice(1, 0, targetLang);
    }
    router.push(segments.join('/'));
  };

  const handleDonateTrigger = () => {
    if (onDonateClick) {
      onDonateClick();
    } else {
      router.push(`/${lang}/donation`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'bg-brand-paper border-b border-brand-clay py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo — Magazine Masthead */}
        <a href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brand-saffron flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-12">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display text-xl md:text-2xl font-bold tracking-tight text-brand-charcoal leading-none">
              Prathana
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-saffron font-semibold mt-0.5">
              Solapur
            </span>
          </div>
        </a>

        {/* Desktop Navigation — Minimal Editorial */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-brand-muted hover:text-brand-charcoal transition-colors duration-300 tracking-wide"
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-clay hover:bg-brand-sand/55 text-[12px] font-semibold text-brand-charcoal transition-colors duration-300"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.nav.langCode}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-32 bg-white border border-brand-clay rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    <button
                      onClick={() => switchLanguage('en')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-brand-sand/40 transition-colors ${
                        lang === 'en' ? 'text-brand-saffron bg-brand-sand/20' : 'text-brand-charcoal'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => switchLanguage('mr')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-brand-sand/40 transition-colors ${
                        lang === 'mr' ? 'text-brand-saffron bg-brand-sand/20' : 'text-brand-charcoal'
                      }`}
                    >
                      मराठी (Marathi)
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleDonateTrigger}
            className="rounded-full bg-brand-saffron text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal transition-all duration-300"
          >
            {t.nav.donate}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Lang Button */}
          <button
            onClick={() => switchLanguage(lang === 'en' ? 'mr' : 'en')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-brand-clay text-[11px] font-bold text-brand-charcoal"
            title="Switch Language"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === 'en' ? 'MR' : 'EN'}</span>
          </button>

          <button
            onClick={handleDonateTrigger}
            className="rounded-full bg-brand-saffron text-white px-4 py-2 text-[12px] font-semibold tracking-wide"
          >
            {lang === 'mr' ? 'मदत करा' : 'Donate'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-charcoal"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — Clean, large serif links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 top-[68px] bg-brand-paper z-40 border-t border-brand-clay"
          >
            <nav className="flex flex-col px-8 pt-8 pb-8 h-full overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="block py-2.5 font-serif-display text-2xl font-medium text-brand-charcoal hover:text-brand-saffron transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-brand-clay">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleDonateTrigger();
                  }}
                  className="w-full py-3.5 rounded-full bg-brand-saffron text-white text-center font-semibold tracking-wide text-[14px] hover:bg-brand-charcoal transition-colors duration-300"
                >
                  {t.nav.donate}
                </button>
                <p className="text-center text-[10px] text-brand-muted mt-4 tracking-wide font-light">
                  100% of donations reach beneficiaries
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
