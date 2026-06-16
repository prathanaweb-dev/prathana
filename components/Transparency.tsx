'use client';

import { motion } from 'framer-motion';
import { CheckCircle, FileText, Award } from 'lucide-react';

export default function Transparency() {
  const certifications = [
    {
      title: 'Maharashtra Trust Registration',
      code: 'Reg No. MH/SOL/10294/2021',
      desc: 'Registered under the Maharashtra Public Trusts Act, 1950, governing public charitable institutions.',
    },
    {
      title: 'Section 80G Tax Exemption',
      code: 'PAN/80G Approval Active',
      desc: 'All contributions are eligible for a 50% income tax deduction under section 80G of the Income Tax Act.',
    },
    {
      title: '12A Registration',
      code: 'Granted by Income Tax Dept',
      desc: 'Establishes our non-profit status, exempting the foundation from income tax to maximize ground funding.',
    },
    {
      title: 'External Financial Audits',
      code: 'Audited by K.R. Shinde & Co.',
      desc: 'Annual statements are prepared by independent certified accountants and submitted to the Trust Registrar.',
    },
  ];

  const fundBars = [
    {
      label: 'Direct Program Relief',
      pct: 88,
      color: 'bg-brand-green',
      textColor: 'text-brand-green',
      detail: 'Meals, school supplies, diagnostics clinics, and critical health support.',
    },
    {
      label: 'Field & Logistics Operations',
      pct: 7,
      color: 'bg-brand-saffron',
      textColor: 'text-brand-saffron',
      detail: 'Kitchen operations staff, transportation to remote slums, local hubs.',
    },
    {
      label: 'Admin & Transaction Fees',
      pct: 5,
      color: 'bg-brand-muted',
      textColor: 'text-brand-muted',
      detail: 'Payment gateway fees, server hosting, regulatory reporting paperwork.',
    },
  ];

  return (
    <section id="transparency" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 space-y-5"
        >
          <span className="section-label">Financial Integrity</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
            Our Promise of
            <br />
            Absolute Clarity.
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base max-w-xl leading-relaxed">
            We operate with the awareness that every single rupee you contribute
            is a trust placed in us. We verify every transaction, compile public
            sheets, and report directly on audits.
          </p>
        </motion.div>

        {/* Full-Width Unified Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white border border-brand-clay rounded-2xl p-8 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left: Fund Allocation Bars */}
            <div className="space-y-7">
              <div>
                <h4 className="font-serif-display text-xl font-bold text-brand-charcoal mb-1">
                  Where Your Donation Goes
                </h4>
                <span className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">
                  Allocation of Fiduciary Funds
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
                    <span className="block text-[11px] text-brand-muted leading-relaxed">
                      {bar.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Zero Commission Badge */}
              <div className="p-4 bg-brand-sand/50 border border-brand-clay/40 rounded-xl flex items-center gap-3">
                <Award className="w-9 h-9 text-brand-saffron flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-brand-charcoal uppercase tracking-wide">
                    Zero Commission Platform
                  </span>
                  <p className="text-[11px] text-brand-muted leading-relaxed mt-0.5">
                    Our directors do not draw salaries. 100% of executive operations
                    are financed voluntarily.
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
                  className="p-5 bg-brand-sand/40 border border-brand-clay/40 rounded-2xl space-y-3 hover:border-brand-saffron/40 transition-colors duration-300"
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

                  <p className="text-xs text-brand-muted leading-relaxed">
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
          className="mt-8 p-5 border border-brand-clay/50 bg-white rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-saffron/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-brand-saffron" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-brand-charcoal">
                Annual Audit Statements
              </span>
              <span className="block text-[11px] text-brand-muted">
                Registration approvals, tax filings & balance sheets (PDF)
              </span>
            </div>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('This is a mockup. In production, this links to official tax filings and balance sheets.');
            }}
            className="px-6 py-2.5 bg-brand-charcoal hover:bg-brand-saffron text-white font-semibold tracking-wide uppercase text-[13px] rounded-full transition-all duration-300"
          >
            Download Documents
          </a>
        </motion.div>
      </div>
    </section>
  );
}
