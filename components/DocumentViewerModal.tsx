'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, Loader2, Download } from 'lucide-react';
import { getEmbeddableDocumentInfo } from '@/lib/documentUtils';

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
  const [useGoogleFallback, setUseGoogleFallback] = useState(false);

  if (!isOpen || !url) return null;

  const docInfo = getEmbeddableDocumentInfo(url);
  const activeEmbedUrl = useGoogleFallback && docInfo.googleViewerUrl ? docInfo.googleViewerUrl : docInfo.embedUrl;

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
          className="relative w-full max-w-5xl h-[92vh] bg-[#121620] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-[#1a1f2e] border-b border-white/10 flex items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-bold text-white truncate">{title}</h3>
                <span className="text-[11px] text-white/40 block truncate">
                  {docInfo.isGoogleDrive
                    ? (lang === 'mr' ? 'गुगल ड्राइव्ह दस्तऐवज' : 'Google Drive Document')
                    : (lang === 'mr' ? 'दस्तऐवज पूर्वावलोकन' : 'Direct Document Viewer')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Viewer Switch Toggle if not Google Drive */}
              {!docInfo.isGoogleDrive && docInfo.googleViewerUrl && (
                <button
                  onClick={() => {
                    setLoading(true);
                    setUseGoogleFallback(prev => !prev);
                  }}
                  className="hidden sm:inline-flex text-[11px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
                >
                  {useGoogleFallback ? 'Switch to Native PDF' : 'Switch to Google Docs'}
                </button>
              )}

              {/* Direct Download Button */}
              {docInfo.directUrl && (
                <a
                  href={docInfo.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  title={lang === 'mr' ? 'डाउनलोड करा' : 'Download document'}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Download size={15} />
                  <span className="hidden sm:inline">{lang === 'mr' ? 'डाउनलोड' : 'Download'}</span>
                </a>
              )}

              {/* Open in New Tab Button */}
              <a
                href={docInfo.directUrl || url}
                target="_blank"
                rel="noopener noreferrer"
                title={lang === 'mr' ? 'नवीन टॅबमध्ये उघडा' : 'Open in new tab'}
                className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              >
                <ExternalLink size={15} />
                <span className="hidden md:inline">{lang === 'mr' ? 'थेट उघडा' : 'Open Direct'}</span>
              </a>

              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close viewer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Google Drive Helper Notice */}
          {docInfo.isGoogleDrive && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200">
              <span className="text-[11px] leading-tight">
                ℹ️ <strong>Google Drive Note:</strong> {lang === 'mr' 
                  ? 'जर पूर्वावलोकन दिसत नसेल, तर गुगल ड्राइव्ह लिंक "Anyone with the link can view" असावी.' 
                  : 'If preview shows "No preview available", make sure link sharing in Google Drive is set to "Anyone with the link can view".'}
              </span>
              <a
                href={docInfo.directUrl || url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-amber-300 font-bold hover:text-white text-[11px] flex items-center gap-1"
              >
                {lang === 'mr' ? 'येथे क्लिक करून ड्राइव्हमध्ये उघडा ↗' : 'Click here to open in Google Drive ↗'}
              </a>
            </div>
          )}

          {/* Viewer Area */}
          <div className="relative flex-1 bg-neutral-900 w-full h-full overflow-hidden flex flex-col items-center justify-center">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-[#121620] z-10 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  {lang === 'mr' ? 'दस्तऐवज लोड होत आहे...' : 'Loading document...'}
                </span>
              </div>
            )}

            <iframe
              key={activeEmbedUrl}
              src={activeEmbedUrl}
              className="w-full h-full border-0 bg-white flex-1"
              title={title}
              allow="autoplay; encrypted-media; fullscreen"
              onLoad={() => setLoading(false)}
            />

            {/* Bottom Fallback Footer */}
            <div className="w-full py-2 px-4 bg-[#1a1f2e] border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="text-[11px] truncate max-w-md">
                {title}
              </span>
              <a
                href={docInfo.directUrl || url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 text-[11px] flex-shrink-0"
              >
                <span>{lang === 'mr' ? 'काही अडचण आल्यास येथे उघडा' : 'Trouble loading? Open in new window'}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
