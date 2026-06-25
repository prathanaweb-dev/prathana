'use client';

import { useState } from 'react';
import { EventItem } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { translations } from '@/lib/translations';

interface EventsClientProps {
  lang: string;
  initialEvents: EventItem[];
}

export default function EventsClient({
  lang,
  initialEvents,
}: EventsClientProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const formatDate = (dateString: string) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const selectedEvent = initialEvents.find(e => e.id === selectedEventId);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      <AnimatePresence mode="wait">
        {selectedEventId && selectedEvent ? (
          
          /* ── Detail view ── */
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedEventId(null)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-charcoal transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.events.backBtn}
            </button>

            {/* Featured Image */}
            <div className="h-64 sm:h-[400px] w-full rounded-3xl overflow-hidden border border-brand-clay">
              <img
                src={selectedEvent.featured_image}
                alt={(lang === 'mr' && selectedEvent.title_mr) ? selectedEvent.title_mr : selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info details */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted font-mono">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>{t.events.published} {formatDate(selectedEvent.published_date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-green" />
                  <span>Solapur Desk</span>
                </div>
              </div>

              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal leading-tight">
                {(lang === 'mr' && selectedEvent.title_mr) ? selectedEvent.title_mr : selectedEvent.title}
              </h1>
              <div className="accent-line" />
            </div>

            {/* Content paragraph */}
            <div className="prose max-w-none text-brand-muted text-base leading-relaxed font-light space-y-6 pt-4 border-t border-brand-clay/30">
              {((lang === 'mr' && selectedEvent.content_mr) ? selectedEvent.content_mr : selectedEvent.content)
                .split('\n')
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              }
            </div>
          </motion.div>
        ) : (
          
          /* ── List view ── */
          <motion.div
            key="list"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="space-y-4 max-w-3xl text-left">
              <span className="section-label">{t.events.label}</span>
              <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
                {t.events.title}
              </h1>
              <div className="accent-line" />
              <p className="text-base text-brand-muted font-light leading-relaxed">
                {t.events.desc}
              </p>
            </div>

            {/* List */}
            <div className="space-y-6 min-h-[300px]">
              {initialEvents.length > 0 ? (
                initialEvents.map((evt, idx) => {
                  const title = (lang === 'mr' && evt.title_mr) ? evt.title_mr : evt.title;
                  const content = (lang === 'mr' && evt.content_mr) ? evt.content_mr : evt.content;

                  return (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-white border border-brand-clay/60 rounded-3xl items-start group cursor-pointer premium-card text-left"
                      onClick={() => setSelectedEventId(evt.id)}
                    >
                      {/* Image */}
                      <div className="md:col-span-4 h-40 w-full rounded-2xl overflow-hidden bg-brand-sand relative">
                        <img
                          src={evt.featured_image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 editorial-img"
                        />
                      </div>

                      {/* Content details */}
                      <div className="md:col-span-8 space-y-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-brand-muted font-mono uppercase font-bold tracking-widest">
                          <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
                          <span>{formatDate(evt.published_date)}</span>
                        </div>

                        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-brand-charcoal leading-snug group-hover:text-brand-forest transition-colors">
                          {title}
                        </h3>

                        <p className="text-brand-muted text-xs leading-relaxed font-light line-clamp-3">
                          {content}
                        </p>

                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-forest hover:text-brand-yellow transition-colors pt-2">
                          <span>{t.events.readMore}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-20 border border-dashed border-brand-clay rounded-2xl bg-white/50 backdrop-blur-sm">
                  <p className="font-serif-display italic text-brand-muted text-lg">
                    {t.events.noItems}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
