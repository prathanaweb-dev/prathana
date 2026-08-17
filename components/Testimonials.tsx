'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote, User } from 'lucide-react';
import { Testimonial, defaultTestimonials } from '@/lib/db';

interface TestimonialsProps {
  lang: string;
  initialTestimonials?: Testimonial[];
}

export default function Testimonials({ lang, initialTestimonials }: TestimonialsProps) {
  const isMarathi = lang === 'mr';
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials
  );

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  const borderColors = [
    'border-l-brand-green',
    'border-l-brand-yellow',
    'border-l-[#e75c3c]',
    'border-l-blue-500',
    'border-l-purple-500',
  ];

  return (
    <section className="py-24 bg-brand-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <span className="text-[11px] uppercase tracking-widest font-bold text-brand-forest">
            {isMarathi ? 'अभिप्राय आणि विश्वास' : 'Testimonials & Public Feedback'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal max-w-2xl mx-auto leading-tight">
            {isMarathi ? 'आमच्या मौल्यवान देणगीदारांचे व हितचिंतकांचे अनुभव' : 'What Our Donors & Supporters Say'}
          </h2>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-2" />
        </div>

        {/* Dynamic Reviews Speech Bubbles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => {
            const name = (isMarathi && t.name_mr) ? t.name_mr : t.name;
            const role = (isMarathi && t.role_mr) ? t.role_mr : t.role;
            const text = (isMarathi && t.text_mr) ? t.text_mr : t.text;
            const borderCol = borderColors[idx % borderColors.length];

            return (
              <motion.div
                key={t.id || idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col space-y-6 text-left"
              >
                {/* Speech bubble box */}
                <div className={`bg-white p-8 rounded-3xl shadow-sm border-l-4 ${borderCol} relative space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between`}>
                  <div className="space-y-3">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-brand-yellow fill-current" />
                      ))}
                    </div>
                    {/* Text */}
                    <p className="text-brand-muted text-[13px] leading-relaxed font-light italic">
                      &ldquo;{text}&rdquo;
                    </p>
                  </div>
                  
                  {/* Speech Bubble Arrow Triangle */}
                  <div className="absolute left-8 -bottom-3 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
                </div>

                {/* Reviewer identity directly below arrow */}
                <div className="flex items-center gap-3 pl-4">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={name}
                      className="w-11 h-11 rounded-full object-cover border border-brand-clay/50 shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-brand-sand text-brand-forest border border-brand-clay/50 flex items-center justify-center font-bold text-sm shadow-sm">
                      {name ? name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-brand-charcoal leading-tight">{name}</span>
                    <span className="text-[11px] text-brand-forest font-semibold mt-0.5">{role}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots Selector Below */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e75c3c]" />
        </div>

      </div>
    </section>
  );
}
