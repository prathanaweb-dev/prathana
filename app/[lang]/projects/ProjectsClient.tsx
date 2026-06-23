'use client';

import { useState } from 'react';
import { Project } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { translations } from '@/lib/translations';

interface ProjectsClientProps {
  lang: string;
  initialProjects: Project[];
}

export default function ProjectsClient({
  lang,
  initialProjects,
}: ProjectsClientProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'planned' | 'active' | 'completed'>('all');
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const filtered = activeTab === 'all'
    ? initialProjects
    : initialProjects.filter((proj) => proj.status === activeTab);

  const statuses = [
    { id: 'all', label: t.projects.status.all },
    { id: 'planned', label: t.projects.status.planned },
    { id: 'active', label: t.projects.status.active },
    { id: 'completed', label: t.projects.status.completed },
  ] as const;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-brand-green/10 text-brand-green border-brand-green/20';
      case 'active':
        return 'bg-brand-yellow/15 text-brand-forest border-brand-yellow/30';
      case 'planned':
      default:
        return 'bg-brand-muted/10 text-brand-muted border-brand-clay/40';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">{t.projects.label}</span>
        <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
          {t.projects.title}
        </h1>
        <div className="accent-line" />
        <p className="text-base text-brand-muted font-light leading-relaxed">
          {t.projects.desc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-brand-clay/40 pb-5">
        {statuses.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
              activeTab === s.id
                ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm'
                : 'bg-transparent text-brand-muted border-brand-clay hover:bg-brand-sand/35 hover:text-brand-charcoal'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-6 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((proj, idx) => {
              const title = (lang === 'mr' && proj.title_mr) ? proj.title_mr : proj.title;
              const desc = (lang === 'mr' && proj.description_mr) ? proj.description_mr : proj.description;
              const currentStatus = statuses.find((s) => s.id === proj.status)?.label || proj.status;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  key={proj.id}
                  className="bg-white border border-brand-clay/60 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row h-full group"
                >
                  {/* Left: Image */}
                  <div className="h-56 md:h-auto md:w-80 relative overflow-hidden bg-brand-sand flex-shrink-0">
                    <img
                      src={proj.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 editorial-img"
                    />
                  </div>

                  {/* Right: Content details */}
                  <div className="p-7 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusBadgeClass(proj.status)}`}>
                          {currentStatus}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-[10px] text-brand-muted font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(proj.start_date)}</span>
                          <span>&ndash;</span>
                          <span>{formatDate(proj.end_date)}</span>
                        </div>
                      </div>

                      <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal leading-tight group-hover:text-brand-forest transition-colors">
                        {title}
                      </h3>
                      
                      <p className="text-brand-muted text-sm leading-relaxed font-light">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-clay/30 flex items-center gap-2 text-[10px] text-brand-muted uppercase font-bold tracking-widest font-mono">
                      <Briefcase className="w-3.5 h-3.5 text-brand-yellow" />
                      <span>{t.projects.timeline}: {currentStatus}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-brand-clay rounded-2xl bg-white"
            >
              <p className="font-serif-display italic text-brand-muted text-lg">
                {t.projects.noItems}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
