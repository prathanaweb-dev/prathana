'use client';

import { motion } from 'framer-motion';

const timelineEvents = [
  {
    year: '2021',
    title: 'The Seed of Food',
    description:
      'Began distributing cooked meals to 50 orphan and homeless children daily during peak economic hardships in Solapur.',
    color: 'bg-brand-saffron',
  },
  {
    year: '2023',
    title: 'Educational Wings',
    description:
      'Launched the Education Support project — school kits and sponsorship funds keeping 200+ slum children enrolled.',
    color: 'bg-brand-green',
  },
  {
    year: '2025',
    title: 'Transparency Portal',
    description:
      'Public database logs and automated donation verification ensure every rupee is fully auditable.',
    color: 'bg-brand-charcoal',
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-brand-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-y-0 items-start">

          {/* ── Left column: Editorial Image ── */}
          <motion.div
            className="lg:col-span-6 space-y-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl overflow-hidden border border-brand-clay">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
                alt="Volunteer teaching children at a transit shelter"
                className="w-full h-[500px] object-cover editorial-img"
                loading="lazy"
              />
            </div>
            {/* Caption strip */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] text-brand-muted font-light">
                Outreach coordinator hosting an evening tuition circle at a transit shelter.
              </span>
              <span className="text-[9px] font-mono text-brand-muted/60 uppercase">
                Solapur, MH
              </span>
            </div>
          </motion.div>

          {/* ── Right column: Text (offset for asymmetry) ── */}
          <motion.div
            className="lg:col-span-5 lg:col-start-8 space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="space-y-4">
              <span className="section-label">Our Origins</span>
              <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal leading-[1.1]">
                Grounded in<br />Compassion.
              </h2>
              <div className="accent-line" />
            </div>

            <div className="space-y-5 text-brand-muted text-[15px] leading-relaxed font-light">
              <p>
                Founded in Solapur, Maharashtra, <strong className="font-medium text-brand-charcoal">Prarthana Foundation</strong> began
                as a voluntary response to hunger. We noticed that hunger was not just a lack of food — it was the
                single greatest barrier keeping children from attending primary school, studying, and escaping the
                cycle of extreme poverty.
              </p>
              <p>
                By setting up makeshift community kitchens, we first guaranteed daily nutrition. Once children had
                full stomachs, their parents were willing to send them to schools. We then stepped in to cover costs
                for books, uniforms, and primary registration.
              </p>
            </div>

            {/* Pull-quote */}
            <motion.blockquote
              className="border-l-2 border-brand-saffron/30 pl-6 py-2"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-serif-display italic text-xl text-brand-charcoal leading-relaxed">
                &ldquo;We did not start Prarthana in a boardroom. We started it on the streets of Solapur
                when we saw children collecting waste instead of holding books.&rdquo;
              </p>
              <cite className="block mt-3 text-[10px] uppercase tracking-widest text-brand-saffron font-bold not-italic">
                Founding Team &bull; Solapur, 2021
              </cite>
            </motion.blockquote>

            {/* Trust commitment */}
            <div className="pt-4">
              <p className="text-brand-muted text-[13px] leading-relaxed font-light">
                We believe trust is earned through absolute clarity. As a registered NGO in Maharashtra, our
                financial books, audit reports, and direct utilization statistics are public. When you donate,
                you receive immediate digital updates on campaign progress.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── Horizontal Timeline Strip ── */}
        <motion.div
          className="mt-24 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Horizontal connecting line */}
          <div className="absolute top-[22px] left-0 right-0 h-px bg-brand-clay/80 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.year}
                className="relative bg-white border border-brand-clay/60 rounded-2xl p-6 pt-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 * idx + 0.3 }}
              >
                {/* Dot on the line */}
                <div
                  className={`absolute -top-[5px] left-8 w-[11px] h-[11px] rounded-full ${event.color} ring-[3px] ring-brand-paper hidden md:block`}
                />

                <div className="space-y-2">
                  <span className="font-mono text-[13px] font-bold text-brand-charcoal tracking-wide">
                    {event.year}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-saffron font-bold ml-3">
                    {event.title}
                  </span>
                  <p className="text-brand-muted text-[13px] leading-relaxed font-light pt-1">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
