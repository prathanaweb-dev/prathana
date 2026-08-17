'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, Loader2, Maximize2 } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  lang?: string;
}

export default function DocumentViewerModal({
  isOpen,
  onClose,
  title,
  url,
  lang = 'en',
}: DocumentViewerModalProps) {
  const [loading, setLoading] = useState(true);
  const [viewerType, setViewerType] = useState<'google' | 'direct'>('google');

  if (!isOpen || !url) return null;

  const isPdf = url.toLowerCase().includes('.pdf');
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl h-[90vh] bg-[#121620] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#1a1f2e] border-b border-white/10 flex items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-bold text-white truncate">{title}</h3>
                <span className="text-[11px] text-white/40 block truncate">
                  {lang === 'mr' ? 'दस्तऐवज पूर्वावलोकन' : 'Document In-App Viewer'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {isPdf && (
                <button
                  onClick={() => setViewerType(prev => (prev === 'google' ? 'direct' : 'google'))}
                  className="hidden sm:inline-flex text-[11px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {viewerType === 'google' ? 'Switch to Native Viewer' : 'Switch to Google Viewer'}
                </button>
              )}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={lang === 'mr' ? 'नवीन टॅबमध्ये उघडा' : 'Open in new tab'}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ExternalLink size={16} />
              </a>
              <button
                onClick={onClose}
                aria-label="Close viewer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Viewer Area */}
          <div className="relative flex-1 bg-neutral-900 w-full h-full overflow-hidden flex items-center justify-center">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-[#121620] z-10 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  {lang === 'mr' ? 'दस्तऐवज लोड होत आहे...' : 'Rendering document preview...'}
                </span>
              </div>
            )}

            {isPdf ? (
              <iframe
                src={viewerType === 'google' ? googleViewerUrl : url}
                className="w-full h-full border-0 bg-white"
                title={title}
                onLoad={() => setLoading(false)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                <img
                  src={url}
                  alt={title}
                  onLoad={() => setLoading(false)}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
