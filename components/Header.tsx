'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Globe, ChevronDown, Phone, Search } from 'lucide-react';
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

  // Pages whose hero section is dark — header should use light text
  const darkHeroPages = [
    `/${lang}`,
    `/${lang}/`,
    `/${lang}/about`,
    `/${lang}/vision-mission`,
    `/${lang}/donation`,
    `/${lang}/gallery`,
    `/${lang}/activities`,
    `/${lang}/projects`,
    `/${lang}/events`,
    '/en', '/mr', '/'
  ];
  const hasDarkHero = darkHeroPages.some(p => pathname === p || pathname?.startsWith(p + '/') === false && pathname === p);
  // simpler: just check if it starts with any known dark page prefix
  const onDarkPage = !pathname ? false : (
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname === '/en' ||
    pathname === '/mr' ||
    pathname === '/' ||
    pathname.startsWith(`/${lang}/about`) ||
    pathname.startsWith(`/${lang}/vision-mission`) ||
    pathname.startsWith(`/${lang}/donation`) ||
    pathname.startsWith(`/${lang}/gallery`) ||
    pathname.startsWith(`/${lang}/activities`) ||
    pathname.startsWith(`/${lang}/projects`) ||
    pathname.startsWith(`/${lang}/events`)
  );

  const useLightText = onDarkPage && !isScrolled && !mobileMenuOpen;

  const navLinkClass = `text-[13px] font-bold transition-colors duration-300 tracking-wide ${
    useLightText ? 'text-white/85 hover:text-white' : 'text-brand-muted hover:text-brand-charcoal'
  }`;

  const navLinks = [
    { name: lang === 'mr' ? 'मुख्य पान' : 'Home', href: `/${lang}` },
    { name: t.nav.story, href: `/${lang}/about` },
    { name: lang === 'mr' ? 'मोहिमा' : 'Campaigns', href: `/${lang}/donation` },
    { name: t.nav.vision, href: `/${lang}/vision-mission` },
    { name: t.nav.activities, href: `/${lang}/activities` },
    { name: t.nav.projects, href: `/${lang}/projects` },
    { name: t.nav.events, href: `/${lang}/events` },
    { name: t.nav.gallery, href: `/${lang}/gallery` },
    { name: lang === 'mr' ? 'टीम' : 'Team', href: `/${lang}/team` },
    { name: lang === 'mr' ? 'संपर्क' : 'Contact', href: `/${lang}/contact` },
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'bg-brand-paper/95 backdrop-blur-md border-b border-brand-clay/60 py-3 shadow-[0_4px_30px_rgba(21,34,27,0.06)]'
          : onDarkPage
            ? 'bg-gradient-to-b from-black/50 to-transparent py-5'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Logo — Magazine Masthead */}
        <a href={`/${lang}`} className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Prathana Foundation Logo"
            className="w-9 h-9 md:w-12 md:h-12 object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-6 drop-shadow-[0_2px_8px_rgba(21,34,27,0.06)] shrink-0"
          />
          <div className="flex flex-col shrink-0">
            <span className={`font-serif-display text-lg md:text-2xl font-bold tracking-tight leading-none ${
              useLightText ? 'text-white' : 'text-brand-charcoal'
            }`}>
              Prathana
            </span>
            <span className={`text-[8px] md:text-[10px] uppercase tracking-widest font-semibold mt-0.5 transition-colors duration-300 ${
              useLightText ? 'text-brand-yellow' : 'text-brand-forest'
            }`}>
              Foundation
            </span>
          </div>
        </a>

        {/* Desktop Navigation — Restructured to prevent overlap & match mockup */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {/* Home */}
          <a
            href={`/${lang}`}
            className={navLinkClass}
          >
            {lang === 'mr' ? 'मुख्य पान' : 'Home'}
          </a>

          {/* About Us */}
          <a
            href={`/${lang}/about`}
            className={`${navLinkClass} whitespace-nowrap`}
          >
            {t.nav.story}
          </a>

          {/* Campaigns */}
          <a
            href={`/${lang}/donation`}
            className={navLinkClass}
          >
            {lang === 'mr' ? 'मोहिमा' : 'Campaigns'}
          </a>

          {/* Pages Dropdown (Hover-based group) */}
          <div className="relative group py-2">
            <button className={`flex items-center gap-1 text-[13px] font-bold transition-colors duration-300 tracking-wide cursor-pointer ${
              useLightText ? 'text-white/85 hover:text-white' : 'text-brand-muted hover:text-brand-charcoal'
            }`}>
              <span>{lang === 'mr' ? 'विभाग' : 'Pages'}</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            {/* Dropdown Menu Box */}
            <div className="absolute left-0 mt-1 w-44 bg-white border border-brand-clay rounded-2xl shadow-xl overflow-hidden hidden group-hover:block z-30">
              <a
                href={`/${lang}/vision-mission`}
                className="block px-4 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-charcoal hover:bg-brand-sand/40 transition-colors border-b border-brand-clay/30"
              >
                {t.nav.vision}
              </a>
              <a
                href={`/${lang}/activities`}
                className="block px-4 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-charcoal hover:bg-brand-sand/40 transition-colors border-b border-brand-clay/30"
              >
                {t.nav.activities}
              </a>
              <a
                href={`/${lang}/projects`}
                className="block px-4 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-charcoal hover:bg-brand-sand/40 transition-colors border-b border-brand-clay/30"
              >
                {t.nav.projects}
              </a>
              <a
                href={`/${lang}/gallery`}
                className="block px-4 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-charcoal hover:bg-brand-sand/40 transition-colors border-b border-brand-clay/30"
              >
                {t.nav.gallery}
              </a>
              <a
                href={`/${lang}/team`}
                className="block px-4 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-charcoal hover:bg-brand-sand/40 transition-colors"
              >
                {lang === 'mr' ? 'टीम' : 'Team'}
              </a>
            </div>
          </div>

          {/* Blog (Events) */}
          <a
            href={`/${lang}/events`}
            className={navLinkClass}
          >
            {lang === 'mr' ? 'बातम्या' : 'Blog'}
          </a>

          {/* Contact */}
          <a
            href={`/${lang}/contact`}
            className={navLinkClass}
          >
            {lang === 'mr' ? 'संपर्क' : 'Contact'}
          </a>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold transition-colors duration-300 ${
                useLightText
                  ? 'border-white/30 hover:bg-white/10 text-white'
                  : 'border-brand-clay hover:bg-brand-sand/55 text-brand-charcoal'
              }`}
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
                        lang === 'en' ? 'text-brand-forest bg-brand-sand/20 font-bold' : 'text-brand-charcoal'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => switchLanguage('mr')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-brand-sand/40 transition-colors ${
                        lang === 'mr' ? 'text-brand-forest bg-brand-sand/20 font-bold' : 'text-brand-charcoal'
                      }`}
                    >
                      मराठी (Marathi)
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Call & Search Block — Responsive */}
          <div className={`hidden xl:flex items-center gap-4 border-l pl-4 h-8 shrink-0 ${
            useLightText ? 'border-white/20' : 'border-brand-clay/60'
          }`}>
            <button className={`transition-colors ${
              useLightText ? 'text-white/80 hover:text-brand-yellow' : 'text-brand-charcoal hover:text-brand-forest'
            }`} aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-charcoal shadow-sm">
                <Phone className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-[9px] uppercase tracking-widest font-bold leading-none ${
                  useLightText ? 'text-white/60' : 'text-brand-muted'
                }`}>Call Us</span>
                <span className={`text-[11px] font-bold mt-0.5 leading-none ${
                  useLightText ? 'text-white' : 'text-brand-charcoal'
                }`}>+91 98765 43210</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDonateTrigger}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-5 py-2.5 text-[13px] tracking-wide shadow-[0_4px_12px_rgba(247,195,36,0.2)] transition-all duration-300 hover:-translate-y-0.5 shrink-0"
          >
            {t.nav.donate}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          {/* Mobile Lang Button */}
          <button
            onClick={() => switchLanguage(lang === 'en' ? 'mr' : 'en')}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 rounded-full border text-[10px] sm:text-[11px] font-bold ${
              useLightText
                ? 'border-white/30 text-white hover:bg-white/10'
                : 'border-brand-clay text-brand-charcoal'
            }`}
            title="Switch Language"
          >
            <Globe className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">{lang === 'en' ? 'MR' : 'EN'}</span>
          </button>

          <button
            onClick={handleDonateTrigger}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] tracking-wide shadow-[0_4px_10px_rgba(247,195,36,0.2)] transition-all duration-300 shrink-0"
          >
            {lang === 'mr' ? 'मदत करा' : 'Donate'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 sm:p-2 transition-colors shrink-0 ${useLightText ? 'text-white' : 'text-brand-charcoal'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>
    </header>

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
                  className="block py-2.5 font-serif-display text-2xl font-medium text-brand-charcoal hover:text-brand-forest transition-colors"
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
                className="w-full py-3.5 rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold text-center tracking-wide text-[14px] shadow-[0_4px_12px_rgba(247,195,36,0.2)] transition-all duration-300"
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
  </>
  );
}
