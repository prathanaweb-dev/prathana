'use client';

import { useState, useEffect } from 'react';
import { EventItem, Report } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, ArrowLeft, ArrowRight, User, FileText,
  Eye, ExternalLink, Download, Filter, BookOpen, Layers
} from 'lucide-react';
import { translations } from '@/lib/translations';
import DocumentViewerModal from '@/components/DocumentViewerModal';

interface EventsClientProps {
  lang: string;
  initialEvents: EventItem[];
  initialReports?: Report[];
}

export default function EventsClient({
  lang,
  initialEvents,
  initialReports = [],
}: EventsClientProps) {
  const [activeTab, setActiveTab] = useState<'blogs' | 'reports'>('blogs');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [viewDocModal, setViewDocModal] = useState<{ title: string; url: string } | null>(null);

  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  useEffect(() => {
    // Refresh data in background
    fetch('/api/events')
      .then(res => res.json())
      .then(data => { if (data.success && data.events) setEvents(data.events); })
      .catch(() => {});

    fetch('/api/reports')
      .then(res => res.json())
      .then(data => { if (data.success && data.reports) setReports(data.reports); })
      .catch(() => {});
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(lang === 'mr' ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const filteredReports = reports.filter(r => {
    if (selectedReportType === 'all') return true;
    return r.type === selectedReportType;
  });

  const reportTypeLabels: Record<string, { en: string; mr: string; color: string }> = {
    annual: { en: 'Annual Report', mr: 'वार्षिक अहवाल', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
    financial: { en: 'Financial Statement', mr: 'वित्तीय ताळेबंद', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
    impact: { en: 'Impact Report', mr: 'कार्य अहवाल', color: 'bg-purple-500/10 text-purple-700 border-purple-200' },
    audit: { en: 'Audit Report', mr: 'लेखापरीक्षण अहवाल', color: 'bg-amber-500/10 text-amber-800 border-amber-200' },
    other: { en: 'Disclosure', mr: 'इतर दस्तऐवज', color: 'bg-neutral-500/10 text-neutral-700 border-neutral-200' },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      {/* In-App Document Viewer Modal for Reports */}
      {viewDocModal && (
        <DocumentViewerModal
          isOpen={!!viewDocModal}
          onClose={() => setViewDocModal(null)}
          title={viewDocModal.title}
          url={viewDocModal.url}
          lang={lang}
        />
      )}

      <AnimatePresence mode="wait">
        {selectedEventId && selectedEvent ? (
          
          /* ── Event Detail view ── */
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedEventId(null)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-charcoal transition-colors font-mono cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.events.backBtn}
            </button>

            {/* Featured Image */}
            <div className="h-64 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-brand-clay shadow-lg">
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
          
          /* ── Main List & Reports Hub view ── */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Editorial Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
              <div className="space-y-4 max-w-2xl text-left">
                <span className="section-label">
                  {lang === 'mr' ? 'माहिती व पारदर्शकता केंद्र' : 'Knowledge & Transparency Hub'}
                </span>
                <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
                  {lang === 'mr' ? 'ब्लॉग आणि अधिकृत अहवाल' : 'Blogs, Stories & Official Reports'}
                </h1>
                <div className="accent-line" />
                <p className="text-base text-brand-muted font-light leading-relaxed">
                  {lang === 'mr'
                    ? 'संस्थेचे प्रत्यक्ष सेवा कार्य, प्रगती, घडामोडी आणि सर्व प्रमाणित वार्षिक वित्तीय अहवाल येथे एकाच ठिकाणी उपलब्ध आहेत.'
                    : 'Explore our latest stories from the ground in Solapur, along with certified annual reports, financial statements, and public disclosures.'}
                </p>
              </div>

              {/* Main Hub Tabs Switcher */}
              <div className="flex items-center p-1.5 bg-brand-clay/30 rounded-2xl border border-brand-clay/50 self-start md:self-auto shadow-sm">
                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'blogs'
                      ? 'bg-white text-brand-forest shadow-md'
                      : 'text-brand-muted hover:text-brand-charcoal'
                  }`}
                >
                  <BookOpen size={16} className={activeTab === 'blogs' ? 'text-amber-500' : ''} />
                  <span>{lang === 'mr' ? '📰 घडामोडी व ब्लॉग' : '📰 Blogs & News'} ({events.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'reports'
                      ? 'bg-white text-brand-forest shadow-md'
                      : 'text-brand-muted hover:text-brand-charcoal'
                  }`}
                >
                  <FileText size={16} className={activeTab === 'reports' ? 'text-brand-green' : ''} />
                  <span>{lang === 'mr' ? '📊 अधिकृत अहवाल' : '📊 Reports & Audits'} ({reports.length})</span>
                </button>
              </div>
            </div>

            {/* ═════════ TAB 1: BLOGS & EVENTS ═════════ */}
            {activeTab === 'blogs' && (
              <div className="space-y-6 min-h-[300px]">
                {events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((evt, idx) => {
                      const title = (lang === 'mr' && evt.title_mr) ? evt.title_mr : evt.title;
                      const content = (lang === 'mr' && evt.content_mr) ? evt.content_mr : evt.content;

                      return (
                        <motion.div
                          key={evt.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          className="flex flex-col bg-white border border-brand-clay/60 rounded-3xl overflow-hidden group cursor-pointer premium-card text-left shadow-sm hover:shadow-xl transition-all duration-300"
                          onClick={() => setSelectedEventId(evt.id)}
                        >
                          {/* Image */}
                          <div className="h-52 w-full bg-brand-sand relative overflow-hidden">
                            <img
                              src={evt.featured_image}
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                                {(evt as any).tag || (lang === 'mr' ? 'बातम्या' : 'News')}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5 text-[11px] text-brand-muted font-mono uppercase font-bold tracking-wider">
                                <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
                                <span>{formatDate(evt.published_date)}</span>
                              </div>

                              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-brand-charcoal leading-snug group-hover:text-brand-forest transition-colors line-clamp-2">
                                {title}
                              </h3>

                              <p className="text-brand-muted text-xs leading-relaxed font-light line-clamp-3">
                                {content}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-brand-clay/30 text-xs font-bold text-brand-forest group-hover:text-brand-yellow transition-colors">
                              <span>{t.events.readMore}</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-dashed border-brand-clay rounded-2xl bg-white/50 backdrop-blur-sm">
                    <BookOpen size={40} className="mx-auto mb-3 opacity-20 text-brand-charcoal" />
                    <p className="font-serif-display italic text-brand-muted text-lg">
                      {t.events.noItems}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ═════════ TAB 2: REPORTS & AUDITS ═════════ */}
            {activeTab === 'reports' && (
              <div className="space-y-8">
                {/* Filter Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: lang === 'mr' ? 'सर्व अहवाल' : 'All Reports' },
                    { id: 'annual', label: lang === 'mr' ? 'वार्षिक अहवाल' : 'Annual Reports' },
                    { id: 'financial', label: lang === 'mr' ? 'वित्तीय ताळेबंद' : 'Financial Statements' },
                    { id: 'impact', label: lang === 'mr' ? 'कार्य अहवाल' : 'Impact Reports' },
                    { id: 'audit', label: lang === 'mr' ? 'लेखापरीक्षण' : 'Audits' },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedReportType(f.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedReportType === f.id
                          ? 'bg-brand-forest text-white shadow-md'
                          : 'bg-white border border-brand-clay text-brand-muted hover:border-brand-forest hover:text-brand-charcoal'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Reports Grid */}
                {filteredReports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReports.map((rep, idx) => {
                      const repTitle = (lang === 'mr' && rep.title_mr) ? rep.title_mr : rep.title;
                      const typeMeta = reportTypeLabels[rep.type] || reportTypeLabels.other;

                      return (
                        <motion.div
                          key={rep.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="bg-white rounded-3xl border border-brand-clay/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-yellow/50 transition-all duration-300 group"
                        >
                          <div>
                            {/* Top row: Type badge & Year */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${typeMeta.color}`}>
                                {lang === 'mr' ? typeMeta.mr : typeMeta.en}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-lg bg-black/5 font-mono text-xs font-bold text-brand-charcoal">
                                {rep.year || '2024'}
                              </span>
                            </div>

                            {/* Cover image or Document illustration */}
                            {rep.cover_image ? (
                              <div className="h-40 w-full rounded-2xl overflow-hidden mb-4 bg-brand-clay/20 relative">
                                <img
                                  src={rep.cover_image}
                                  alt={repTitle}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            ) : (
                              <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-brand-sand/50 to-brand-clay/30 flex items-center justify-center mb-4 border border-brand-clay/30">
                                <FileText className="w-12 h-12 text-brand-forest/30 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-300" />
                              </div>
                            )}

                            {/* Title & Description */}
                            <h3 className="font-serif-display text-xl font-bold text-brand-charcoal mb-2 group-hover:text-brand-forest transition-colors line-clamp-2">
                              {repTitle}
                            </h3>
                            {rep.description && (
                              <p className="text-brand-muted text-xs leading-relaxed line-clamp-3 mb-4">
                                {rep.description}
                              </p>
                            )}
                          </div>

                          {/* Action Button: In-App View */}
                          <div className="pt-4 border-t border-brand-clay/30 mt-4 flex items-center justify-between gap-2">
                            <button
                              onClick={() => setViewDocModal({ title: repTitle, url: rep.file_url })}
                              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-forest text-white hover:bg-brand-green text-xs font-bold transition-colors cursor-pointer shadow-sm"
                            >
                              <Eye size={14} className="text-brand-yellow" />
                              <span>{lang === 'mr' ? 'अहवाल पहा' : 'View Report'}</span>
                            </button>
                            <a
                              href={rep.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={lang === 'mr' ? 'नवीन टॅबमध्ये उघडा' : 'Open in new tab'}
                              className="p-2.5 rounded-xl border border-brand-clay/60 hover:bg-brand-clay/30 text-brand-muted hover:text-brand-charcoal transition-colors cursor-pointer"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-dashed border-brand-clay rounded-2xl bg-white/50 backdrop-blur-sm">
                    <FileText size={40} className="mx-auto mb-3 opacity-20 text-brand-charcoal" />
                    <p className="font-serif-display italic text-brand-muted text-lg">
                      {lang === 'mr' ? 'या श्रेणीत कोणतेही अहवाल उपलब्ध नाहीत.' : 'No reports available under this category.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
