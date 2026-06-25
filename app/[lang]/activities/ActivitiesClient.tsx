'use client';

import { useState } from 'react';
import { Activity } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '@/lib/translations';

interface ActivitiesClientProps {
  lang: string;
  initialActivities: Activity[];
}

export default function ActivitiesClient({
  lang,
  initialActivities,
}: ActivitiesClientProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'nutrition' | 'education' | 'healthcare'>('all');
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const filtered = activeTab === 'all'
    ? initialActivities
    : initialActivities.filter((act) => act.category === activeTab);

  const categories = [
    { id: 'all', label: t.activities.categories.all },
    { id: 'nutrition', label: t.activities.categories.nutrition },
    { id: 'education', label: t.activities.categories.education },
    { id: 'healthcare', label: t.activities.categories.healthcare },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 max-w-3xl text-left"
      >
        <span className="section-label">{t.activities.label}</span>
        <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
          {t.activities.title}
        </h1>
        <div className="accent-line" />
        <p className="text-base text-brand-muted font-light leading-relaxed">
          {t.activities.desc}
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center gap-2.5 border-b border-brand-clay/40 pb-5"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
              activeTab === cat.id
                ? 'bg-brand-forest text-white border-brand-forest shadow-sm'
                : 'bg-white/60 text-brand-muted border-brand-clay hover:bg-brand-sand/35 hover:text-brand-charcoal hover:border-brand-forest/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((act, idx) => {
              const title = (lang === 'mr' && act.title_mr) ? act.title_mr : act.title;
              const desc = (lang === 'mr' && act.description_mr) ? act.description_mr : act.description;
              const displayCategory = categories.find((c) => c.id === act.category)?.label || act.category;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  key={act.id}
                  className="bg-white border border-brand-clay/60 rounded-2xl overflow-hidden flex flex-col justify-between group h-full premium-card text-left"
                >
                  <div className="h-48 overflow-hidden bg-brand-sand relative">
                    <img
                      src={act.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 editorial-img"
                    />
                    <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[9px] uppercase tracking-widest font-bold text-brand-charcoal px-3 py-1 rounded-full border border-brand-clay/35 shadow-sm">
                      {displayCategory}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif-display text-lg font-bold text-brand-charcoal leading-snug group-hover:text-brand-forest transition-colors">
                        {title}
                      </h3>
                      <p className="text-brand-muted text-xs leading-relaxed font-light">
                        {desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 border border-dashed border-brand-clay rounded-2xl bg-white/50 backdrop-blur-sm"
            >
              <p className="font-serif-display italic text-brand-muted text-lg">
                {t.activities.noItems}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
