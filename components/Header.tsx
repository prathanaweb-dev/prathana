'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  onDonateClick: () => void;
}

const navLinks = [
  { name: 'Our Story', href: '#about' },
  { name: 'Campaigns', href: '#campaigns' },
  { name: 'Impact', href: '#impact' },
  { name: 'Transparency', href: '#transparency' },
  { name: 'Contact', href: '#contact' },
];

export default function Header({ onDonateClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-paper border-b border-brand-clay py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo — Magazine Masthead */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brand-saffron flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-12">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display text-xl md:text-2xl font-bold tracking-tight text-brand-charcoal leading-none">
              Prarthana
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-saffron font-semibold mt-0.5">
              Foundation Solapur
            </span>
          </div>
        </a>

        {/* Desktop Navigation — Minimal Editorial */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-brand-muted hover:text-brand-charcoal transition-colors duration-300 tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onDonateClick}
            className="rounded-full bg-brand-saffron text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal transition-all duration-300"
          >
            Donate Now
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onDonateClick}
            className="rounded-full bg-brand-saffron text-white px-5 py-2 text-[12px] font-semibold tracking-wide"
          >
            Donate
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
            <nav className="flex flex-col px-8 pt-10 pb-8 h-full">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="block py-3 font-serif-display text-2xl font-medium text-brand-charcoal hover:text-brand-saffron transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-brand-clay">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDonateClick();
                  }}
                  className="w-full py-4 rounded-full bg-brand-saffron text-white text-center font-semibold tracking-wide text-[14px] hover:bg-brand-charcoal transition-colors duration-300"
                >
                  Donate Now
                </button>
                <p className="text-center text-[11px] text-brand-muted mt-4 tracking-wide">
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
