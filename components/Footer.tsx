'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onDonateClick: () => void;
}

export default function Footer({ onDonateClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Bar — Saffron accent strip */}
      <div className="bg-brand-saffron">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ready to make an impact?
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Every rupee reaches the children who need it most.
            </p>
          </div>
          <button
            onClick={onDonateClick}
            className="rounded-full bg-white text-brand-charcoal px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal hover:text-white transition-all duration-300 inline-flex items-center gap-2 shrink-0"
          >
            <Heart className="w-4 h-4 fill-current" />
            Donate Now
          </button>
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
                <div className="w-9 h-9 rounded-full bg-brand-saffron flex items-center justify-center text-white">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-display text-lg font-bold text-white leading-none">
                    Prarthana
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-semibold mt-0.5">
                    Foundation Solapur
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                A grassroots humanitarian collective providing nutrition,
                education, and medical aid to families in Solapur, Maharashtra.
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
                Quick Links
              </span>
              <nav className="flex flex-col gap-3">
                {[
                  { name: 'Our Story', href: '#about' },
                  { name: 'Campaigns', href: '#campaigns' },
                  { name: 'Impact', href: '#impact' },
                  { name: 'Transparency', href: '#transparency' },
                  { name: 'Contact', href: '#contact' },
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
                Contact
              </span>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-saffron mt-0.5 shrink-0" />
                  <p className="text-sm text-white/70 leading-relaxed">
                    Prarthana Foundation,
                    <br />
                    Solapur, Maharashtra 413001
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-saffron shrink-0" />
                  <a
                    href="mailto:contact@prarthanafoundation.org"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    contact@prarthanafoundation.org
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
                Tax Benefits
              </span>
              <p className="text-sm text-white/70 leading-relaxed">
                All donations are 50% tax exempt under Section 80G of the Income
                Tax Act. A verified digital receipt and 80G certificate is issued
                upon every contribution.
              </p>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Registered Public Charitable Trust
                <br />
                Govt. of Maharashtra &bull; 80G Certified
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar — Compact */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-[11px] text-white/40 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Prarthana Foundation Solapur.
              All rights reserved.
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
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                Top
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
