'use client';

import React, { useState, useEffect } from 'react';
import { Save, Code, Layout, Globe, ChevronRight, HelpCircle } from 'lucide-react';

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
  const updateField = (path: string[], value: any) => {
    if (!parsedData) return;
    const newData = JSON.parse(JSON.stringify(parsedData)); // Deep clone

    // Ensure language container exists
    if (!newData[activeLang]) {
      newData[activeLang] = {};
    }

    let curr = newData[activeLang];
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!curr[key] || typeof curr[key] !== 'object') {
        curr[key] = {};
      }
      curr = curr[key];
    }

    curr[path[path.length - 1]] = value;
    setParsedData(newData);
    onChangePageContentStr(JSON.stringify(newData, null, 2));
  };

  // Safe accessor helper
  const getVal = (path: string[], fallback = '') => {
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
    { id: 'chapters', label: '📖 Story Chapters' },
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
            Customize all titles, text descriptions, and statistics on your live website
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
                    Our Story Hero Section ({activeLang.toUpperCase()})
                  </h4>

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
                    Story Chapters ({activeLang.toUpperCase()})
                  </h4>

                  {/* Chapter 1 */}
                  <div className="space-y-3 bg-[#0b0e14] p-4 rounded-xl border border-white/5">
                    <h5 className="text-xs font-bold text-amber-300">Chapter 01: Tragedy</h5>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Title</label>
                      <input
                        type="text"
                        value={getVal(['chapters', 'c1', 'title'])}
                        onChange={(e) => updateField(['chapters', 'c1', 'title'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Story Body Text</label>
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
                    <h5 className="text-xs font-bold text-amber-300">Chapter 02: A Promise</h5>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Quote</label>
                      <input
                        type="text"
                        value={getVal(['chapters', 'c2', 'quote'])}
                        onChange={(e) => updateField(['chapters', 'c2', 'quote'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/60 mb-1">Story Body Text</label>
                      <textarea
                        rows={3}
                        value={getVal(['chapters', 'c2', 'text'])}
                        onChange={(e) => updateField(['chapters', 'c2', 'text'], e.target.value)}
                        className="w-full bg-[#141923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
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

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">Section Title</label>
                    <input
                      type="text"
                      value={getVal(['cta', 'title'])}
                      onChange={(e) => updateField(['cta', 'title'], e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                    />
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
