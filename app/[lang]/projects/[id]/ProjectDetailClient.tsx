'use client';

import { Project } from '@/lib/db';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, ArrowLeft } from 'lucide-react';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectDetailClient({ lang, project }: { lang: string, project: Project }) {
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  
  const title = (lang === 'mr' && project.title_mr) ? project.title_mr : project.title;
  const desc = (lang === 'mr' && project.description_mr) ? project.description_mr : project.description;
  const currentStatus = [
    { id: 'planned', label: t.projects.status.planned },
    { id: 'active', label: t.projects.status.active },
    { id: 'completed', label: t.projects.status.completed },
  ].find(s => s.id === project.status)?.label || project.status;

  const formatDate = (dateString: string) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          
          <Link href={`/${lang}/projects`} className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-brand-muted hover:text-brand-charcoal transition-colors">
            <ArrowLeft size={16} />
            {lang === 'mr' ? 'प्रकल्पांकडे परत जा' : 'Back to Projects'}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                project.status === 'completed' ? 'bg-brand-green/10 text-brand-green border-brand-green/20' :
                project.status === 'active' ? 'bg-brand-yellow/15 text-brand-forest border-brand-yellow/30' :
                'bg-brand-muted/10 text-brand-muted border-brand-clay/40'
              }`}>
                {currentStatus}
              </span>
              
              {(project.start_date || project.end_date) && (
                <div className="flex items-center gap-2 text-xs text-brand-muted font-mono bg-white px-4 py-1.5 rounded-full border border-brand-clay/60 shadow-sm">
                  <Calendar className="w-4 h-4" />
                  {project.start_date && <span>{formatDate(project.start_date)}</span>}
                  {(project.start_date && project.end_date) && <span>&ndash;</span>}
                  {project.end_date && <span>{formatDate(project.end_date)}</span>}
                </div>
              )}
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.1]">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full aspect-[21/9] bg-brand-clay rounded-3xl overflow-hidden shadow-xl"
          >
            <img src={project.image} alt={title} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 md:p-12 rounded-3xl border border-brand-clay/60 shadow-sm space-y-6"
          >
            <h2 className="text-xl font-bold font-serif-display text-brand-charcoal">
              {lang === 'mr' ? 'प्रकल्पाबद्दल' : 'About the Project'}
            </h2>
            <div className="accent-line w-12" />
            <div className="prose prose-lg prose-brand max-w-none text-brand-muted font-light leading-relaxed whitespace-pre-wrap">
              {desc}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
