'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Save, Code, Layout, Globe, ChevronRight, HelpCircle, Plus, Trash2, Upload, ImageIcon, Loader2 } from 'lucide-react';

const CLOUD_NAME = 'djoklzpse';
const UPLOAD_PRESET = 'prathana_preset';

function FormImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', UPLOAD_PRESET);
      fd.append('folder', 'prathana');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5 bg-[#0b0e14]/60 p-3 rounded-xl border border-white/5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400/90">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/15 bg-black flex-shrink-0 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 hover:text-red-300 transition-opacity cursor-pointer"
              title="Remove image"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl border border-dashed border-white/15 flex items-center justify-center text-white/20 flex-shrink-0 bg-black/20">
            <ImageIcon size={18} />
          </div>
        )}
        <div className="flex-1 space-y-1.5 min-w-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste Image URL or upload →"
              className="flex-1 min-w-0 bg-[#0b0e14] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-amber-500 font-mono"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-1.5 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50"
            >
              {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {error && <p className="text-red-400 text-[10px]">{error}</p>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

interface PageFormEditorProps {
  selectedPage: 'home' | 'about';
  pageContentStr: string;
  onChangePageContentStr: (val: string) => void;
  pageLoading: boolean;
  pageSaving: boolean;
  pageError: string | null;
  onSave: () => void;
  onPageChange: (page: 'home' | 'about') => void;
}

export default function PageFormEditor({
  selectedPage,
  pageContentStr,
  onChangePageContentStr,
  pageLoading,
  pageSaving,
  pageError,
  onSave,
  onPageChange,
}: PageFormEditorProps) {
  const [editorMode, setEditorMode] = useState<'visual' | 'json'>('visual');
  const [activeLang, setActiveLang] = useState<'en' | 'mr'>('en');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [parsedData, setParsedData] = useState<any>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Parse JSON string whenever it changes or mode changes
  useEffect(() => {
    try {
      if (pageContentStr) {
        const obj = JSON.parse(pageContentStr);
        setParsedData(obj);
        setParseError(null);
      }
    } catch (e: any) {
      setParseError('Invalid JSON format. Please switch to JSON mode to fix syntax errors.');
    }
  }, [pageContentStr]);

  // Helper to safely update nested properties
  const updateField = (path: (string | number)[], value: any) => {
    if (!parsedData) return;
    const newData = JSON.parse(JSON.stringify(parsedData)); // Deep clone

    if (!newData[activeLang]) {
      newData[activeLang] = {};
    }

    let curr = newData[activeLang];
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (curr[key] === undefined || curr[key] === null) {
        curr[key] = typeof path[i + 1] === 'number' ? [] : {};
      }
      curr = curr[key];
    }

    curr[path[path.length - 1]] = value;
    setParsedData(newData);
    onChangePageContentStr(JSON.stringify(newData, null, 2));
  };

  // Safe accessor helper
  const getVal = (path: (string | number)[], fallback: any = '') => {
    if (!parsedData || !parsedData[activeLang]) return fallback;
    let curr = parsedData[activeLang];
    for (let i = 0; i < path.length; i++) {
      if (curr === undefined || curr === null) return fallback;
      curr = curr[path[i]];
    }
    return curr !== undefined && curr !== null ? curr : fallback;
  };

  const sectionsForHome = [
    { id: 'hero', label: '🚀 Hero Section' },
    { id: 'about', label: 'ℹ️ About Section' },
    { id: 'stats', label: '📊 Impact Stats' },
    { id: 'campaigns', label: '📣 Campaigns & CTAs' },
    { id: 'footer', label: '🦶 Footer & Contact' },
  ];

  const sectionsForAbout = [
    { id: 'hero', label: '🚀 Hero Banner' },
    { id: 'chapters', label: '📖 Story Chapters 1, 2 & 3' },
    { id: 'prathana', label: "🕊️ Prathana's Legacy" },
    { id: 'timeline', label: '🗓️ Timeline Milestones' },
    { id: 'founders', label: "👥 Founders' Messages" },
    { id: 'sacrifice', label: '🌾 Land Sacrifice & Photos' },
    { id: 'gallery', label: '🖼️ Our Story Gallery' },
    { id: 'values', label: '💎 Vision & Core Values' },
    { id: 'cta', label: '🎯 Call to Action' },
  ];

  const currentSections = selectedPage === 'home' ? sectionsForHome : sectionsForAbout;

  // Reset active section when page changes
  useEffect(() => {
    setActiveSection('hero');
  }, [selectedPage]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141923] p-4 rounded-2xl border border-white/10">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            Page Content Manager
          </h3>
          <p className="text-xs text-white/40 mt-0.5">
            Customize all titles, story chapters, quotes, and statistics on your live website
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Page Selector */}
          <select
            value={selectedPage}
            onChange={(e) => onPageChange(e.target.value as 'home' | 'about')}
            className="bg-[#0b0e14] border border-white/15 rounded-xl px-3.5 py-2 text-xs font-semibold text-white outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="home">🏠 Home Page</option>
            <option value="about">📖 Our Story Page</option>
          </select>

          {/* Mode Toggle */}
          <div className="flex bg-[#0b0e14] border border-white/15 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setEditorMode('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                editorMode === 'visual'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layout size={13} /> Visual Form
            </button>
            <button
              type="button"
              onClick={() => setEditorMode('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                editorMode === 'json'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Code size={13} /> Raw JSON
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={pageSaving || pageLoading || !!parseError}
            className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer transition-all shadow-lg disabled:opacity-50"
          >
            <Save size={14} /> {pageSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {pageError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-mono">
          {pageError}
        </div>
      )}

      {parseError && editorMode === 'visual' && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-4 rounded-xl text-xs flex items-center justify-between">
          <span>⚠️ {parseError}</span>
          <button
            onClick={() => setEditorMode('json')}
            className="underline font-bold hover:text-white"
          >
            Switch to JSON Editor
          </button>
        </div>
      )}

      {/* Editor Main Container */}
      <div className="relative min-h-[500px]">
        {pageLoading && (
          <div className="absolute inset-0 bg-[#141923]/90 flex items-center justify-center rounded-2xl backdrop-blur-sm z-20">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <span className="text-white/60 text-xs font-semibold block">Loading Page Data...</span>
            </div>
          </div>
        )}

        {/* ════ VISUAL FORM EDITOR MODE ════ */}
        {editorMode === 'visual' && (
          <div className="space-y-6">
            {/* Language & Section Bar */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#141923]/60 p-3 rounded-2xl border border-white/5">
              {/* Language Switcher */}
              <div className="flex bg-[#0b0e14] p-1 rounded-xl border border-white/10 self-start">
                <button
                  type="button"
                  onClick={() => setActiveLang('en')}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeLang === 'en'
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  🇬🇧 English Content
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('mr')}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeLang === 'mr'
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  🇮🇳 Marathi Content (मराठी)
                </button>
              </div>

              {/* Section Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {currentSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      activeSection === sec.id
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields Area */}
            <div className="bg-[#141923] p-6 rounded-2xl border border-white/10 space-y-6">
              {/* ────────────────── HOME: HERO ────────────────── */}
              {selectedPage === 'home' && activeSection === 'hero' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Hero Banner Settings ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Tagline / Eyebrow</label>
                      <input
                        type="text"
                        value={getVal(['hero', 'tagline'])}
                        onChange={(e) => updateField(['hero', 'tagline'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                        placeholder="e.g. TRANSPARENT HUMANITARIAN AID"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Donate Button Label</label>
                      <input
                        type="text"
                        value={getVal(['hero', 'donateBtn'])}
                        onChange={(e) => updateField(['hero', 'donateBtn'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Main Headline / Title</label>
                    <textarea
                      rows={2}
                      value={getVal(['hero', 'title'])}
                      onChange={(e) => updateField(['hero', 'title'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Subtext / Paragraph</label>
                    <textarea
                      rows={3}
                      value={getVal(['hero', 'subtext'])}
                      onChange={(e) => updateField(['hero', 'subtext'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Meals Stat Badge Text</label>
                      <input
                        type="text"
                        value={getVal(['hero', 'meals'])}
                        onChange={(e) => updateField(['hero', 'meals'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Children Stat Badge Text</label>
                      <input
                        type="text"
                        value={getVal(['hero', 'children'])}
                        onChange={(e) => updateField(['hero', 'children'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Audited Badge Text</label>
                      <input
                        type="text"
                        value={getVal(['hero', 'audited'])}
                        onChange={(e) => updateField(['hero', 'audited'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── HOME: ABOUT ────────────────── */}
              {selectedPage === 'home' && activeSection === 'about' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    About Section ({activeLang.toUpperCase()})
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Title</label>
                    <input
                      type="text"
                      value={getVal(['about', 'title'])}
                      onChange={(e) => updateField(['about', 'title'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Main Description</label>
                    <textarea
                      rows={3}
                      value={getVal(['about', 'desc'])}
                      onChange={(e) => updateField(['about', 'desc'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <label className="block text-xs font-semibold text-amber-300">Feature Bullet Points</label>
                    <div>
                      <span className="text-[11px] text-white/40 block mb-1">Point 1</span>
                      <input
                        type="text"
                        value={getVal(['about', 'point1'])}
                        onChange={(e) => updateField(['about', 'point1'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/40 block mb-1">Point 2</span>
                      <input
                        type="text"
                        value={getVal(['about', 'point2'])}
                        onChange={(e) => updateField(['about', 'point2'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/40 block mb-1">Point 3</span>
                      <input
                        type="text"
                        value={getVal(['about', 'point3'])}
                        onChange={(e) => updateField(['about', 'point3'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── HOME: STATS ────────────────── */}
              {selectedPage === 'home' && activeSection === 'stats' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Impact Statistics Titles ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Total Raised Label</label>
                      <input
                        type="text"
                        value={getVal(['stats', 'totalRaised'])}
                        onChange={(e) => updateField(['stats', 'totalRaised'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Donors Count Label</label>
                      <input
                        type="text"
                        value={getVal(['stats', 'donors'])}
                        onChange={(e) => updateField(['stats', 'donors'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Meals Provided Label</label>
                      <input
                        type="text"
                        value={getVal(['stats', 'meals'])}
                        onChange={(e) => updateField(['stats', 'meals'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Children Educated Label</label>
                      <input
                        type="text"
                        value={getVal(['stats', 'children'])}
                        onChange={(e) => updateField(['stats', 'children'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── HOME: CAMPAIGNS & CTAS ────────────────── */}
              {selectedPage === 'home' && activeSection === 'campaigns' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Campaigns & CTA Banners ({activeLang.toUpperCase()})
                  </h4>

                  <div className="space-y-4">
                    <h5 className="text-xs font-bold text-white/80 uppercase tracking-wider">Campaigns Section Header</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Title</label>
                        <input
                          type="text"
                          value={getVal(['campaigns', 'title'])}
                          onChange={(e) => updateField(['campaigns', 'title'], e.target.value)}
                          className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/60 mb-1.5">View All Button Text</label>
                        <input
                          type="text"
                          value={getVal(['campaigns', 'viewAll'])}
                          onChange={(e) => updateField(['campaigns', 'viewAll'], e.target.value)}
                          className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h5 className="text-xs font-bold text-white/80 uppercase tracking-wider">Call To Action Banners</h5>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Banner Title</label>
                      <input
                        type="text"
                        value={getVal(['cta', 'title'])}
                        onChange={(e) => updateField(['cta', 'title'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Banner Subtitle / Description</label>
                      <textarea
                        rows={2}
                        value={getVal(['cta', 'desc'])}
                        onChange={(e) => updateField(['cta', 'desc'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── HOME: FOOTER & CONTACT ────────────────── */}
              {selectedPage === 'home' && activeSection === 'footer' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Footer Information ({activeLang.toUpperCase()})
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Footer Description Text</label>
                    <textarea
                      rows={3}
                      value={getVal(['footer', 'desc'])}
                      onChange={(e) => updateField(['footer', 'desc'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Address</label>
                      <input
                        type="text"
                        value={getVal(['footer', 'address'])}
                        onChange={(e) => updateField(['footer', 'address'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Phone Number</label>
                      <input
                        type="text"
                        value={getVal(['footer', 'phone'])}
                        onChange={(e) => updateField(['footer', 'phone'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Email Address</label>
                      <input
                        type="text"
                        value={getVal(['footer', 'email'])}
                        onChange={(e) => updateField(['footer', 'email'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: HERO ────────────────── */}
              {selectedPage === 'about' && activeSection === 'hero' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Our Story Hero Banner ({activeLang.toUpperCase()})
                  </h4>

                  <FormImageUpload
                    label="Hero Background Photo"
                    value={getVal(['hero', 'bgImage'])}
                    onChange={(url) => updateField(['hero', 'bgImage'], url)}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Eyebrow Badge</label>
                    <input
                      type="text"
                      value={getVal(['hero', 'eyebrow'])}
                      onChange={(e) => updateField(['hero', 'eyebrow'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Main Headline / Tagline</label>
                    <textarea
                      rows={2}
                      value={getVal(['hero', 'tag'])}
                      onChange={(e) => updateField(['hero', 'tag'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Subtext Paragraph</label>
                    <textarea
                      rows={3}
                      value={getVal(['hero', 'sub'])}
                      onChange={(e) => updateField(['hero', 'sub'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: CHAPTERS ────────────────── */}
              {selectedPage === 'about' && activeSection === 'chapters' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Story Chapters 1, 2 & 3 ({activeLang.toUpperCase()})
                  </h4>

                  {/* Chapter 1 */}
                  <div className="space-y-3 bg-[#0b0e14] p-4 rounded-xl border border-white/5">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Chapter 01: Tragedy</h5>
                    <FormImageUpload
                      label="Chapter 01 Photo (Tragedy)"
                      value={getVal(['chapters', 'c1', 'image'])}
                      onChange={(url) => updateField(['chapters', 'c1', 'image'], url)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-white/60 mb-1">Chapter Title</label>
                        <input
                          type="text"
                          value={getVal(['chapters', 'c1', 'title'])}
                          onChange={(e) => updateField(['chapters', 'c1', 'title'], e.target.value)}
                          className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/60 mb-1">Year</label>
                        <input
                          type="text"
                          value={getVal(['chapters', 'c1', 'year'])}
                          onChange={(e) => updateField(['chapters', 'c1', 'year'], e.target.value)}
                          className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Chapter Story Body Text</label>
                      <textarea
                        rows={3}
                        value={getVal(['chapters', 'c1', 'text'])}
                        onChange={(e) => updateField(['chapters', 'c1', 'text'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Chapter 2 */}
                  <div className="space-y-3 bg-[#0b0e14] p-4 rounded-xl border border-white/5">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Chapter 02: A Promise</h5>
                    <FormImageUpload
                      label="Chapter 02 Photo (Promise)"
                      value={getVal(['chapters', 'c2', 'image'])}
                      onChange={(url) => updateField(['chapters', 'c2', 'image'], url)}
                    />
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Chapter Quote</label>
                      <input
                        type="text"
                        value={getVal(['chapters', 'c2', 'quote'])}
                        onChange={(e) => updateField(['chapters', 'c2', 'quote'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Chapter Story Body Text</label>
                      <textarea
                        rows={3}
                        value={getVal(['chapters', 'c2', 'text'])}
                        onChange={(e) => updateField(['chapters', 'c2', 'text'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Chapter 3 */}
                  <div className="space-y-3 bg-[#0b0e14] p-4 rounded-xl border border-white/5">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Chapter 03: The Journey Nodes</h5>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={getVal(['chapters', 'c3', 'title'])}
                        onChange={(e) => updateField(['chapters', 'c3', 'title'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {(getVal(['chapters', 'c3', 'nodes'], []) || []).map((node: any, idx: number) => (
                        <div key={idx} className="bg-[#141923] p-3 rounded-lg border border-white/5 space-y-2">
                          <span className="text-[10px] font-bold text-amber-400">Node #{idx + 1}</span>
                          <input
                            type="text"
                            value={node.label || ''}
                            onChange={(e) => updateField(['chapters', 'c3', 'nodes', idx, 'label'], e.target.value)}
                            placeholder="e.g. MSW Studies"
                            className="w-full bg-[#0b0e14] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={node.desc || ''}
                            onChange={(e) => updateField(['chapters', 'c3', 'nodes', idx, 'desc'], e.target.value)}
                            placeholder="e.g. Master of Social Work"
                            className="w-full bg-[#0b0e14] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: PRATHANA LEGACY ────────────────── */}
              {selectedPage === 'about' && activeSection === 'prathana' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Prathana's Name & Legacy ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Eyebrow Header</label>
                      <input
                        type="text"
                        value={getVal(['prathana', 'eyebrow'])}
                        onChange={(e) => updateField(['prathana', 'eyebrow'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Featured Quote</label>
                      <input
                        type="text"
                        value={getVal(['prathana', 'quote'])}
                        onChange={(e) => updateField(['prathana', 'quote'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Story Paragraph 1</label>
                    <textarea
                      rows={2}
                      value={getVal(['prathana', 'desc1'])}
                      onChange={(e) => updateField(['prathana', 'desc1'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Story Paragraph 2</label>
                    <textarea
                      rows={2}
                      value={getVal(['prathana', 'desc2'])}
                      onChange={(e) => updateField(['prathana', 'desc2'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Story Paragraph 3</label>
                    <textarea
                      rows={2}
                      value={getVal(['prathana', 'desc3'])}
                      onChange={(e) => updateField(['prathana', 'desc3'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Closing Legacy Statement</label>
                    <input
                      type="text"
                      value={getVal(['prathana', 'end'])}
                      onChange={(e) => updateField(['prathana', 'end'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: TIMELINE ────────────────── */}
              {selectedPage === 'about' && activeSection === 'timeline' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Interactive Timeline Cards ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Eyebrow</label>
                      <input
                        type="text"
                        value={getVal(['timeline', 'eyebrow'])}
                        onChange={(e) => updateField(['timeline', 'eyebrow'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Title</label>
                      <input
                        type="text"
                        value={getVal(['timeline', 'title'])}
                        onChange={(e) => updateField(['timeline', 'title'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Subtitle</label>
                      <input
                        type="text"
                        value={getVal(['timeline', 'sub'])}
                        onChange={(e) => updateField(['timeline', 'sub'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h5 className="text-xs font-bold text-amber-300">Timeline Milestone Cards</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(getVal(['timeline', 'nodes'], []) || []).map((item: any, idx: number) => (
                        <div key={idx} className="bg-[#0b0e14] p-4 rounded-xl border border-white/5 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-amber-400">Milestone #{idx + 1}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={item.year || ''}
                              onChange={(e) => updateField(['timeline', 'nodes', idx, 'year'], e.target.value)}
                              placeholder="Year / Tag (e.g. 2018)"
                              className="bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => updateField(['timeline', 'nodes', idx, 'title'], e.target.value)}
                              placeholder="Card Title"
                              className="bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={item.desc || ''}
                            onChange={(e) => updateField(['timeline', 'nodes', idx, 'desc'], e.target.value)}
                            placeholder="Description story"
                            className="w-full bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white resize-y"
                          />
                          <FormImageUpload
                            label="Milestone Photo"
                            value={item.img || ''}
                            onChange={(url) => updateField(['timeline', 'nodes', idx, 'img'], url)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: FOUNDERS ────────────────── */}
              {selectedPage === 'about' && activeSection === 'founders' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Founders' Messages ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Eyebrow</label>
                      <input
                        type="text"
                        value={getVal(['founders', 'eyebrow'])}
                        onChange={(e) => updateField(['founders', 'eyebrow'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Title</label>
                      <input
                        type="text"
                        value={getVal(['founders', 'title'])}
                        onChange={(e) => updateField(['founders', 'title'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Prasad */}
                  <div className="bg-[#0b0e14] p-4 rounded-xl border border-white/5 space-y-3">
                    <h5 className="text-xs font-bold text-amber-300">Prasad Mohite (Founder)</h5>
                    <FormImageUpload
                      label="Prasad Mohite Portrait Photo"
                      value={getVal(['founders', 'prasad', 'image'])}
                      onChange={(url) => updateField(['founders', 'prasad', 'image'], url)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">Name</label>
                        <input
                          type="text"
                          value={getVal(['founders', 'prasad', 'name'])}
                          onChange={(e) => updateField(['founders', 'prasad', 'name'], e.target.value)}
                          className="w-full bg-[#141923] border border-white/10 rounded px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">Role Title</label>
                        <input
                          type="text"
                          value={getVal(['founders', 'prasad', 'role'])}
                          onChange={(e) => updateField(['founders', 'prasad', 'role'], e.target.value)}
                          className="w-full bg-[#141923] border border-white/10 rounded px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/60 mb-1">Personal Quote</label>
                      <textarea
                        rows={2}
                        value={getVal(['founders', 'prasad', 'quote'])}
                        onChange={(e) => updateField(['founders', 'prasad', 'quote'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Anu */}
                  <div className="bg-[#0b0e14] p-4 rounded-xl border border-white/5 space-y-3">
                    <h5 className="text-xs font-bold text-amber-300">Anu Mohite (Co-Founder)</h5>
                    <FormImageUpload
                      label="Anu Mohite Portrait Photo"
                      value={getVal(['founders', 'anu', 'image'])}
                      onChange={(url) => updateField(['founders', 'anu', 'image'], url)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">Name</label>
                        <input
                          type="text"
                          value={getVal(['founders', 'anu', 'name'])}
                          onChange={(e) => updateField(['founders', 'anu', 'name'], e.target.value)}
                          className="w-full bg-[#141923] border border-white/10 rounded px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">Role Title</label>
                        <input
                          type="text"
                          value={getVal(['founders', 'anu', 'role'])}
                          onChange={(e) => updateField(['founders', 'anu', 'role'], e.target.value)}
                          className="w-full bg-[#141923] border border-white/10 rounded px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/60 mb-1">Personal Quote</label>
                      <textarea
                        rows={2}
                        value={getVal(['founders', 'anu', 'quote'])}
                        onChange={(e) => updateField(['founders', 'anu', 'quote'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: SACRIFICE ────────────────── */}
              {selectedPage === 'about' && activeSection === 'sacrifice' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Land Sacrifice Section ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Eyebrow</label>
                      <input
                        type="text"
                        value={getVal(['sacrifice', 'eyebrow'])}
                        onChange={(e) => updateField(['sacrifice', 'eyebrow'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Headline Title</label>
                      <input
                        type="text"
                        value={getVal(['sacrifice', 'title'])}
                        onChange={(e) => updateField(['sacrifice', 'title'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Sacrifice Story Paragraph</label>
                    <textarea
                      rows={3}
                      value={getVal(['sacrifice', 'text'])}
                      onChange={(e) => updateField(['sacrifice', 'text'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Before Label</label>
                      <input
                        type="text"
                        value={getVal(['sacrifice', 'before'])}
                        onChange={(e) => updateField(['sacrifice', 'before'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">After Label</label>
                      <input
                        type="text"
                        value={getVal(['sacrifice', 'after'])}
                        onChange={(e) => updateField(['sacrifice', 'after'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <FormImageUpload
                      label="Before Photo (Street School / Old Days)"
                      value={getVal(['sacrifice', 'beforeImg'])}
                      onChange={(url) => updateField(['sacrifice', 'beforeImg'], url)}
                    />
                    <FormImageUpload
                      label="After Photo (Permanent Campus / Sanctuary)"
                      value={getVal(['sacrifice', 'afterImg'])}
                      onChange={(url) => updateField(['sacrifice', 'afterImg'], url)}
                    />
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: GALLERY ────────────────── */}
              {selectedPage === 'about' && activeSection === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-amber-400">
                        Our Story Page Gallery Mosaic ({activeLang.toUpperCase()})
                      </h4>
                      <p className="text-[11px] text-white/40 mt-0.5">
                        Manage photos shown in the photo gallery section of the Our Story page
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentItems = getVal(['gallery', 'items'], []);
                        updateField(['gallery', 'items'], [
                          ...currentItems,
                          { img: '', category: 'studying', caption: '' },
                        ]);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      <Plus size={13} /> Add Gallery Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Eyebrow</label>
                      <input
                        type="text"
                        value={getVal(['gallery', 'eyebrow'])}
                        onChange={(e) => updateField(['gallery', 'eyebrow'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Title</label>
                      <input
                        type="text"
                        value={getVal(['gallery', 'title'])}
                        onChange={(e) => updateField(['gallery', 'title'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Subtitle / Description</label>
                      <input
                        type="text"
                        value={getVal(['gallery', 'sub'])}
                        onChange={(e) => updateField(['gallery', 'sub'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-white/5">
                    <h5 className="text-xs font-bold text-amber-300">Gallery Photos List</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(getVal(['gallery', 'items'], []) || []).map((item: any, idx: number) => (
                        <div key={idx} className="bg-[#0b0e14] p-4 rounded-xl border border-white/10 space-y-3 relative group">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-amber-400">Photo #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentItems = [...(getVal(['gallery', 'items'], []) || [])];
                                currentItems.splice(idx, 1);
                                updateField(['gallery', 'items'], currentItems);
                              }}
                              className="p-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors cursor-pointer"
                              title="Delete photo"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <FormImageUpload
                            label="Photo"
                            value={item.img || ''}
                            onChange={(url) => updateField(['gallery', 'items', idx, 'img'], url)}
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-white/50 mb-1">Category</label>
                              <select
                                value={item.category || 'studying'}
                                onChange={(e) => updateField(['gallery', 'items', idx, 'category'], e.target.value)}
                                className="w-full bg-[#141923] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-amber-500 cursor-pointer"
                              >
                                <option value="studying">Children (studying)</option>
                                <option value="farming">Farming (farming)</option>
                                <option value="seniors">Seniors (seniors)</option>
                                <option value="celebrations">Celebrations (celebrations)</option>
                                <option value="volunteers">Volunteers (volunteers)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] text-white/50 mb-1">Caption</label>
                              <input
                                type="text"
                                value={item.caption || ''}
                                onChange={(e) => updateField(['gallery', 'items', idx, 'caption'], e.target.value)}
                                placeholder="Caption / Description"
                                className="w-full bg-[#141923] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(getVal(['gallery', 'items'], []) || []).length === 0 && (
                        <div className="col-span-2 text-center py-8 border border-dashed border-white/10 rounded-xl text-white/30 text-xs">
                          No custom gallery photos added. Default photos will be displayed. Click "Add Gallery Photo" to add.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: VALUES & VISION ────────────────── */}
              {selectedPage === 'about' && activeSection === 'values' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Vision, Mission & Core Values ({activeLang.toUpperCase()})
                  </h4>

                  {/* Vision */}
                  <div className="bg-[#0b0e14] p-4 rounded-xl border border-white/5 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300">Vision</h5>
                    <input
                      type="text"
                      value={getVal(['vm', 'vision', 'title'])}
                      onChange={(e) => updateField(['vm', 'vision', 'title'], e.target.value)}
                      placeholder="Vision Title"
                      className="w-full bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={getVal(['vm', 'vision', 'desc'])}
                      onChange={(e) => updateField(['vm', 'vision', 'desc'], e.target.value)}
                      placeholder="Vision Statement"
                      className="w-full bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white resize-y"
                    />
                  </div>

                  {/* Mission */}
                  <div className="bg-[#0b0e14] p-4 rounded-xl border border-white/5 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300">Mission</h5>
                    <input
                      type="text"
                      value={getVal(['vm', 'mission', 'title'])}
                      onChange={(e) => updateField(['vm', 'mission', 'title'], e.target.value)}
                      placeholder="Mission Title"
                      className="w-full bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={getVal(['vm', 'mission', 'desc'])}
                      onChange={(e) => updateField(['vm', 'mission', 'desc'], e.target.value)}
                      placeholder="Mission Statement"
                      className="w-full bg-[#141923] border border-white/10 rounded px-3 py-1.5 text-xs text-white resize-y"
                    />
                  </div>

                  {/* Values List */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <h5 className="text-xs font-bold text-amber-300">6 Core Principles</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(getVal(['values', 'list'], []) || []).map((valItem: any, idx: number) => (
                        <div key={idx} className="bg-[#0b0e14] p-3 rounded-lg border border-white/5 space-y-2">
                          <span className="text-[10px] font-bold text-amber-400">Value #{idx + 1}</span>
                          <input
                            type="text"
                            value={valItem.title || ''}
                            onChange={(e) => updateField(['values', 'list', idx, 'title'], e.target.value)}
                            placeholder="Title (e.g. Compassion)"
                            className="w-full bg-[#141923] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={valItem.desc || ''}
                            onChange={(e) => updateField(['values', 'list', idx, 'desc'], e.target.value)}
                            placeholder="Short description"
                            className="w-full bg-[#141923] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────── ABOUT: CTA ────────────────── */}
              {selectedPage === 'about' && activeSection === 'cta' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-amber-400 border-b border-white/10 pb-2">
                    Call To Action ({activeLang.toUpperCase()})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Eyebrow</label>
                      <input
                        type="text"
                        value={getVal(['cta', 'eyebrow'])}
                        onChange={(e) => updateField(['cta', 'eyebrow'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Main Title</label>
                      <input
                        type="text"
                        value={getVal(['cta', 'title'])}
                        onChange={(e) => updateField(['cta', 'title'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Subtitle</label>
                    <input
                      type="text"
                      value={getVal(['cta', 'subtitle'])}
                      onChange={(e) => updateField(['cta', 'subtitle'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={getVal(['cta', 'desc'])}
                      onChange={(e) => updateField(['cta', 'desc'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Donate Button Label</label>
                      <input
                        type="text"
                        value={getVal(['cta', 'donate'])}
                        onChange={(e) => updateField(['cta', 'donate'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Volunteer Button Label</label>
                      <input
                        type="text"
                        value={getVal(['cta', 'volunteer'])}
                        onChange={(e) => updateField(['cta', 'volunteer'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Visit Button Label</label>
                      <input
                        type="text"
                        value={getVal(['cta', 'visit'])}
                        onChange={(e) => updateField(['cta', 'visit'], e.target.value)}
                        className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ RAW JSON EDITOR MODE ════ */}
        {editorMode === 'json' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-white/50 px-1">
              <span className="font-mono">Format: Standard JSON Object</span>
              <span className="text-[11px] text-amber-400">💡 Direct code editing mode</span>
            </div>
            <textarea
              value={pageContentStr}
              onChange={(e) => onChangePageContentStr(e.target.value)}
              className="w-full h-[600px] bg-[#0b0e14] border border-white/10 rounded-2xl p-4 text-white/90 font-mono text-[13px] leading-relaxed outline-none focus:border-amber-500/40 transition-all custom-scrollbar resize-none shadow-inner"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
