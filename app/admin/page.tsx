'use client';

// Never statically prerender — requires Firebase Auth (browser-only)
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseAuth(): Auth | null {
  if (typeof window === 'undefined') return null;
  const fbApp = getApps().length === 0 ? initializeApp(firebaseConfig as any) : getApp();
  return getAuth(fbApp);
}
import {
  LayoutDashboard, Megaphone, HandCoins, Users, BookOpen,
  MessageSquare, LogOut, Plus, Edit2, Trash2, Check, X,
  ChevronRight, TrendingUp, Heart, Menu, Bell, Search,
  RefreshCw, Loader2, CheckCircle, AlertCircle, Eye,
  Calendar, Tag, ArrowUpRight, Shield, UserCheck, Clock,
  FileText, Layers, Award, BarChart3, ChevronDown, ChevronUp, Upload, ImageIcon, Settings as SettingsIcon, Save
} from 'lucide-react';
import PageFormEditor from '@/components/admin/PageFormEditor';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Campaign { id: string; title: string; title_mr?: string; description: string; description_mr?: string; content?: string; content_mr?: string; goal_amount: number; amount_raised: number; image: string; is_completed: boolean; status: 'active' | 'completed'; created_at: string; }
interface Donation  { id: string; campaign_id: string; donor_name: string; donor_email: string; amount: number; payment_id: string; payment_status: 'pending'|'success'|'failed'; utr?: string; screenshot?: string; created_at: string; }
interface Volunteer { id: string; name: string; phone: string; email: string; city: string; occupation: string; interests: string; age?: string; gender?: string; address?: string; availability?: string; experience?: string; status: 'pending'|'approved'|'rejected'; assigned_activity?: string; created_at: string; }
interface Activity  { id: string; title: string; description: string; image: string; category: string; created_at: string; }
interface Project   { id: string; title: string; title_mr?: string; description: string; description_mr?: string; image: string; gallery?: string[]; status: 'planned'|'active'|'completed'; start_date?: string; end_date?: string; created_at: string; }
interface EventItem { id: string; title: string; title_mr?: string; content: string; content_mr?: string; excerpt?: string; tag?: string; featured_image: string; published_date: string; created_at: string; }
interface Contact   { id: string; name: string; email: string; phone?: string; message: string; read: boolean; created_at: string; }
interface Report    { id: string; title: string; title_mr?: string; description?: string; type: 'annual'|'financial'|'impact'|'audit'|'other'; year: string; file_url: string; cover_image?: string; created_at: string; }
interface TeamMember { id: string; name: string; position: string; position_mr?: string; image: string; linkedin?: string; facebook?: string; instagram?: string; created_at: string; }

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }: { msg: string; type: 'success'|'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold border backdrop-blur-sm transition-all
      ${type === 'success' ? 'bg-emerald-900/90 border-emerald-700 text-emerald-100' : 'bg-red-900/90 border-red-700 text-red-100'}`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {msg}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, boxClass, glowClass }: { icon: React.ReactNode; label: string; value: string|number; sub?: string; boxClass: string; glowClass: string; }) {
  return (
    <div className={`relative bg-[#1a1f2e] border border-white/5 rounded-2xl p-6 overflow-hidden group hover:border-white/10 transition-all duration-300`}>
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 ${glowClass}`} />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${boxClass}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</div>
      {sub && <div className="text-[11px] text-white/25 mt-1">{sub}</div>}
    </div>
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
function Drawer({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-lg bg-[#131720] border-l border-white/8 h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all";
const selectCls = inputCls + " cursor-pointer";

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    completed: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    pending:   'bg-amber-500/15 text-amber-400 border-amber-500/20',
    approved:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    rejected:  'bg-red-500/15 text-red-400 border-red-500/20',
    success:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    failed:    'bg-red-500/15 text-red-400 border-red-500/20',
    planned:   'bg-violet-500/15 text-violet-400 border-violet-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[status] || 'bg-white/5 text-white/40 border-white/10'}`}>
      {status}
    </span>
  );
}

// ─── ImageUpload ──────────────────────────────────────────────────────────────
const CLOUD_NAME   = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME   || 'djoklzpse';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'prathana_admin';

function ImageUpload({ value, onChange, label = 'Photo' }: { value: string; onChange: (url: string) => void; label?: string }) {
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
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">{label}</label>

      {/* Preview */}
      {value && (
        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500/80"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/15 text-white/40 hover:border-amber-500/40 hover:text-amber-400 transition-all text-xs font-semibold cursor-pointer disabled:opacity-50"
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? 'Uploading…' : value ? 'Replace Photo' : 'Upload Photo'}
      </button>

      {error && <p className="text-red-400 text-[11px]">{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function DocumentUpload({ value, onChange, label = 'Document' }: { value: string; onChange: (url: string) => void; label?: string }) {
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
      fd.append('folder', 'prathana/docs');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
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
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">{label}</label>
      
      {value && (
        <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5">
          <span className="text-xs text-brand-yellow truncate max-w-[200px]">{value.split('/').pop()}</span>
          <button
            type="button"
            onClick={() => onChange('')}
            className="w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-500/80 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/15 text-white/40 hover:border-amber-500/40 hover:text-amber-400 transition-all text-xs font-semibold cursor-pointer disabled:opacity-50"
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? 'Uploading…' : value ? 'Replace Document' : 'Upload Document'}
      </button>
      {error && <p className="text-red-400 text-[11px]">{error}</p>}
      <input ref={inputRef} type="file" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Tab = 'dashboard'|'campaigns'|'donations'|'volunteers'|'team'|'content'|'messages'|'gallery'|'settings'|'csrdocs';
type ContentSub = 'activities'|'projects'|'events'|'reports'|'pages';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [contentSub, setContentSub] = useState<ContentSub>('activities');
  const [csrTitle, setCsrTitle] = useState('');
  const [csrTitleMr, setCsrTitleMr] = useState('');
  const [csrUrl, setCsrUrl] = useState('');
  const [csrDrawer, setCsrDrawer] = useState(false);

    const [toast, setToast] = useState<{msg:string; type:'success'|'error'} | null>(null);

  // Page Content Editor states
  const [selectedPage, setSelectedPage] = useState<'home'|'about'>('home');
  const [pageContentStr, setPageContentStr] = useState<string>('');
  const [pageLoading, setPageLoading] = useState(false);
  const [pageSaving, setPageSaving] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);

  const fetchPageContent = async (pageId: 'home'|'about') => {
    setPageLoading(true);
    try {
      const res = await fetch(`/api/content?pageId=${pageId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setPageContentStr(JSON.stringify(json.data, null, 2));
      } else {
        setToast({msg: "Failed to load page content", type: "error"}); setTimeout(() => setToast(null), 4000);
      }
    } catch (e) {
      setToast({msg: "Error loading page content", type: "error"}); setTimeout(() => setToast(null), 4000);
    }
    setPageLoading(false);
  };

  const savePageContent = async () => {
    setPageError(null);
    let parsed;
    try {
      parsed = JSON.parse(pageContentStr);
    } catch (e: any) {
      setPageError(`Invalid JSON: ${e.message}`);
      return;
    }
    setPageSaving(true);
    try {
      const res = await fetch(`/api/content?pageId=${selectedPage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsed })
      });
      const json = await res.json();
      if (json.success) {
        setToast({msg: "Page content saved successfully!", type: "success"}); setTimeout(() => setToast(null), 4000);
      } else {
        setToast({msg: "Error saving page content", type: "error"}); setTimeout(() => setToast(null), 4000);
      }
    } catch (e) {
      setToast({msg: "Error saving page content", type: "error"}); setTimeout(() => setToast(null), 4000);
    }
    setPageSaving(false);
  };

  useEffect(() => {
    if (tab === 'content' && contentSub === 'pages') {
      fetchPageContent(selectedPage);
    }
  }, [tab, contentSub, selectedPage]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  // Data
  const [campaigns, setCampaigns]   = useState<Campaign[]>([]);
  const [donations, setDonations]   = useState<Donation[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [expandedVolId, setExpandedVolId] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects]     = useState<Project[]>([]);
  const [events, setEvents]         = useState<EventItem[]>([]);
  const [contacts, setContacts]     = useState<Contact[]>([]);
  const [gallery, setGallery]       = useState<{id:string;url:string;title:string;title_mr?:string;desc?:string;category:string;created_at:string}[]>([]);
  const [reports, setReports]       = useState<Report[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [bankSettings, setBankSettings] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [csrDocs, setCsrDocs]       = useState<any[]>([]);

  // Team form
  const [tDrawer, setTDrawer]     = useState(false);
  const [editTeam, setEditTeam]   = useState<TeamMember|null>(null);
  const [tName, setTName]         = useState('');
  const [tPos, setTPos]           = useState('');
  const [tPosMr, setTPosMr]       = useState('');
  const [tImage, setTImage]       = useState('');
  const [tLinkedin, setTLinkedin] = useState('');
  const [tFacebook, setTFacebook] = useState('');
  const [tInstagram, setTInstagram] = useState('');

  // Gallery form
  const [gDrawer, setGDrawer]   = useState(false);
  const [gUrl, setGUrl]         = useState('');
  const [gTitle, setGTitle]     = useState('');
  const [gTitleMr, setGTitleMr] = useState('');
  const [gDesc, setGDesc]       = useState('');
  const [gCat, setGCat]         = useState('general');
  const [gFilter, setGFilter]   = useState('all');

  // Report form
  const [rDrawer, setRDrawer]     = useState(false);
  const [rTitle, setRTitle]       = useState('');
  const [rTitleMr, setRTitleMr]   = useState('');
  const [rDesc, setRDesc]         = useState('');
  const [rType, setRType]         = useState<Report['type']>('annual');
  const [rYear, setRYear]         = useState(new Date().getFullYear().toString());
  const [rFileUrl, setRFileUrl]   = useState('');
  const [rCover, setRCover]       = useState('');

  // Stats
  const [stats, setStats] = useState({ totalRaised: 0, totalGoal: 0, totalDonors: 0, activeCampaigns: 0, volunteerCount: 0, unreadMessages: 0 });

  // Drawers
  const [campDrawer, setCampDrawer] = useState(false);
  const [actDrawer, setActDrawer]   = useState(false);
  const [projDrawer, setProjDrawer] = useState(false);
  const [evtDrawer, setEvtDrawer]   = useState(false);

  // Editing targets
  const [editCamp, setEditCamp] = useState<Campaign|null>(null);
  const [editAct,  setEditAct]  = useState<Activity|null>(null);
  const [editProj, setEditProj] = useState<Project|null>(null);
  const [editEvt,  setEditEvt]  = useState<EventItem|null>(null);

  // Campaign form
  const [cTitle, setCTitle] = useState(''); const [cTitleMr, setCTitleMr] = useState('');
  const [cDesc, setCDesc]   = useState(''); const [cDescMr, setCDescMr]   = useState('');
  const [cContent, setCContent] = useState(''); const [cContentMr, setCContentMr] = useState('');
  const [cGoal, setCGoal]   = useState(''); const [cImage, setCImage]     = useState('');
  const [cStatus, setCStatus] = useState<'active'|'completed'>('active');

  // Activity form
  const [aTitle, setATitle] = useState(''); const [aTitleMr, setATitleMr] = useState('');
  const [aDesc, setADesc]   = useState(''); const [aDescMr, setADescMr]   = useState('');
  const [aImage, setAImage] = useState(''); const [aCat, setACat] = useState<Activity['category']>('general');

  // Project form
  const [pTitle, setPTitle] = useState(''); const [pTitleMr, setPTitleMr] = useState('');
  const [pDesc, setPDesc]   = useState(''); const [pDescMr, setPDescMr]   = useState('');
  const [pImage, setPImage] = useState(''); const [pGallery, setPGallery] = useState<string[]>([]);
  const [pStatus, setPStatus] = useState<Project['status']>('active');
  const [pStart, setPStart] = useState(''); const [pEnd, setPEnd] = useState('');

  // Event form
  const [eTitle, setETitle]     = useState(''); const [eTitleMr, setETitleMr]   = useState('');
  const [eContent, setEContent] = useState(''); const [eContentMr, setEContentMr] = useState('');
  const [eExcerpt, setEExcerpt] = useState(''); const [eTag, setETag]           = useState('news');
  const [eImage, setEImage]     = useState(''); const [eDate, setEDate]         = useState('');

  const [formBusy, setFormBusy] = useState(false);

  // ── Auth — Firebase ──
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) { router.push('/admin/login'); return; }
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        document.cookie = `prathana_admin=${token}; path=/; max-age=3600; SameSite=Strict`;
        localStorage.setItem('prathana_admin_session', 'true');
        setAuthorized(true);
        fetchAll();
      } else {
        router.push('/admin/login');
      }
    });
    return () => unsub();
  }, []);

  const notify = (msg: string, type: 'success'|'error' = 'success') => setToast({ msg, type });

  // ── Fetch ──
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [c, d, v, a, p, e, co, g, rp, tm, setRes, csrRes] = await Promise.all([
        fetch('/api/campaigns').then(r => r.json()),
        fetch('/api/donations').then(r => r.json()),
        fetch('/api/volunteers').then(r => r.json()),
        fetch('/api/activities').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/events').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
        fetch('/api/reports').then(r => r.json()),
        fetch('/api/team').then(r => r.json()),
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/csr-docs').then(r => r.json())
      ]);
      const camps = c.campaigns || [];
      const dons  = d.donations  || [];
      const vols  = v.volunteers || [];
      const acts  = a.activities || [];
      const projs = p.projects   || [];
      const evts  = e.events     || [];
      const msgs  = co.contacts  || [];

      setCampaigns(camps); setDonations(dons); setVolunteers(vols);
      setActivities(acts); setProjects(projs); setEvents(evts); setContacts(msgs);
      setGallery(g.photos || []);
      setReports(rp.reports || []);
      setTeamMembers(tm.team_members || []);
      if (setRes.settings) {
        setBankSettings(setRes.settings);
      }
      if (csrRes.success) {
        setCsrDocs(csrRes.documents || []);
      }

      setStats({
        totalRaised:     camps.reduce((s: number, x: Campaign) => s + Number(x.amount_raised), 0),
        totalGoal:       camps.reduce((s: number, x: Campaign) => s + Number(x.goal_amount), 0),
        totalDonors:     dons.filter((x: Donation) => x.payment_status === 'success').length,
        activeCampaigns: camps.filter((x: Campaign) => x.status === 'active').length,
        volunteerCount:  vols.filter((x: Volunteer) => x.status === 'approved').length,
        unreadMessages:  msgs.filter((x: Contact) => !x.read).length,
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const logout = async () => {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
    localStorage.removeItem('prathana_admin_session');
    document.cookie = 'prathana_admin=; path=/; max-age=0';
    router.push('/admin/login');
  };

  // ── Gallery CRUD ──
  const openGalleryDrawer = () => { setGUrl(''); setGTitle(''); setGTitleMr(''); setGDesc(''); setGCat('general'); setGDrawer(true); };
  const addPhoto = async () => {
    if (!gUrl || !gTitle) return notify('Photo and title are required', 'error');
    setFormBusy(true);
    try {
      const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: gUrl, title: gTitle, title_mr: gTitleMr, desc: gDesc, category: gCat }) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify('Photo added!'); setGDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deletePhoto = async (id: string) => {
    if (!confirm('Remove this photo?')) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Photo removed'); fetchAll(); } else notify('Delete failed', 'error');
  };

  // ── Report CRUD ──
  const openReportDrawer = () => { setRTitle(''); setRTitleMr(''); setRDesc(''); setRType('annual'); setRYear(new Date().getFullYear().toString()); setRFileUrl(''); setRCover(''); setRDrawer(true); };
  const saveReport = async () => {
    if (!rTitle || !rFileUrl) return notify('Title and file URL are required', 'error');
    setFormBusy(true);
    try {
      const res = await fetch('/api/reports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: rTitle, title_mr: rTitleMr, description: rDesc, type: rType, year: rYear, file_url: rFileUrl, cover_image: rCover }) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify('Report published!'); setRDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteReport = async (id: string) => {
    if (!confirm('Delete this report?')) return;
    const res = await fetch(`/api/reports?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Report deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

  // ── Campaign CRUD ──
  const openCampDrawer = (camp?: Campaign) => {
    setEditCamp(camp || null);
    setCTitle(camp?.title || ''); setCTitleMr(camp?.title_mr || '');
    setCDesc(camp?.description || ''); setCDescMr(camp?.description_mr || '');
    setCContent(camp?.content || ''); setCContentMr(camp?.content_mr || '');
    setCGoal(camp?.goal_amount?.toString() || ''); setCImage(camp?.image || '');
    setCStatus(camp?.status || 'active');
    setCampDrawer(true);
  };
  const saveCampaign = async () => {
    if (!cTitle || !cGoal) return notify('Title and goal are required', 'error');
    setFormBusy(true);
    try {
      const body = { title: cTitle, title_mr: cTitleMr, description: cDesc, description_mr: cDescMr, content: cContent, content_mr: cContentMr, goal_amount: Number(cGoal), amount_raised: editCamp?.amount_raised || 0, image: cImage, is_completed: cStatus === 'completed', status: cStatus, slug: cTitle.toLowerCase().replace(/\s+/g, '-') };
      const url = '/api/campaigns';
      const method = editCamp ? 'PUT' : 'POST';
      const payload = editCamp ? { id: editCamp.id, ...body } : body;
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Save failed');
      notify(editCamp ? 'Campaign updated!' : 'Campaign created!');
      setCampDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteCampaign = async (id: string) => {
    if (!confirm('Delete this campaign?')) return;
    const res = await fetch(`/api/campaigns?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Campaign deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

  // ── Volunteer actions ──
  const updateVolStatus = async (id: string, status: 'approved'|'rejected') => {
    const res = await fetch('/api/volunteers', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    const data = await res.json();
    if (data.success) { notify(`Volunteer ${status}`); fetchAll(); } else notify('Update failed', 'error');
  };

  // ── Activity CRUD ──
  const openActDrawer = (act?: Activity) => {
    setEditAct(act || null);
    setATitle(act?.title || ''); setATitleMr('');
    setADesc(act?.description || ''); setADescMr('');
    setAImage(act?.image || ''); setACat(act?.category as any || 'general');
    setActDrawer(true);
  };
  const saveActivity = async () => {
    if (!aTitle) return notify('Title is required', 'error');
    setFormBusy(true);
    try {
      const body = { title: aTitle, title_mr: aTitleMr, description: aDesc, description_mr: aDescMr, image: aImage, category: aCat };
      const method = editAct ? 'PUT' : 'POST';
      const payload = editAct ? { id: editAct.id, ...body } : body;
      const res = await fetch('/api/activities', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify(editAct ? 'Activity updated!' : 'Activity created!');
      setActDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteActivity = async (id: string) => {
    if (!confirm('Delete this activity?')) return;
    const res = await fetch(`/api/activities?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Activity deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

  // ── Project CRUD ──
  const openProjDrawer = (proj?: Project) => {
    setEditProj(proj || null);
    setPTitle(proj?.title || ''); setPTitleMr(proj?.title_mr || '');
    setPDesc(proj?.description || ''); setPDescMr(proj?.description_mr || '');
    setPImage(proj?.image || ''); setPGallery(proj?.gallery || []);
    setPStatus(proj?.status || 'active');
    setPStart(proj?.start_date || ''); setPEnd(proj?.end_date || '');
    setProjDrawer(true);
  };
  const saveProject = async () => {
    if (!pTitle) return notify('Title is required', 'error');
    setFormBusy(true);
    try {
      const body = { title: pTitle, title_mr: pTitleMr, description: pDesc, description_mr: pDescMr, image: pImage, gallery: pGallery, status: pStatus, start_date: pStart, end_date: pEnd };
      const method = editProj ? 'PUT' : 'POST';
      const payload = editProj ? { id: editProj.id, ...body } : body;
      const res = await fetch('/api/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify(editProj ? 'Project updated!' : 'Project created!');
      setProjDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Project deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

  const handleMoveProject = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    setProjects(newProjects);

    try {
      const res = await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: newProjects.map(p => p.id) })
      });
      const json = await res.json();
      if (!json.success) {
        notify('Failed to save project order', 'error');
        fetchAll();
      } else {
        notify('Project order updated!', 'success');
      }
    } catch (err: any) {
      notify('Error saving project order', 'error');
      fetchAll();
    }
  };

  // ── Event CRUD ──
  const openEvtDrawer = (evt?: EventItem) => {
    setEditEvt(evt || null);
    setETitle(evt?.title || '');   setETitleMr(evt?.title_mr || '');
    setEContent(evt?.content || ''); setEContentMr(evt?.content_mr || '');
    setEExcerpt((evt as any)?.excerpt || '');
    setETag((evt as any)?.tag || 'news');
    setEImage(evt?.featured_image || ''); setEDate(evt?.published_date || new Date().toISOString().split('T')[0]);
    setEvtDrawer(true);
  };
  const saveEvent = async () => {
    if (!eTitle || !eContent) return notify('Title and content are required', 'error');
    setFormBusy(true);
    try {
      const body = {
        title: eTitle, title_mr: eTitleMr,
        content: eContent, content_mr: eContentMr,
        excerpt: eExcerpt || eContent.slice(0, 160),
        tag: eTag,
        featured_image: eImage,
        published_date: eDate || new Date().toISOString().split('T')[0],
      };
      const method  = editEvt ? 'PUT' : 'POST';
      const payload = editEvt ? { id: editEvt.id, ...body } : body;
      const res  = await fetch('/api/events', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify(editEvt ? 'Post updated!' : 'Post published!');
      setEvtDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Event deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

  const markRead = async (id: string) => {
    await fetch('/api/contact', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchAll();
  };

  if (!authorized) return null;

  // ── Nav items ──
  // ── Team CRUD ──
  const openTeamDrawer = (member?: TeamMember) => {
    setEditTeam(member || null);
    setTName(member?.name || '');
    setTPos(member?.position || ''); setTPosMr(member?.position_mr || '');
    setTImage(member?.image || '');
    setTLinkedin(member?.linkedin || '');
    setTFacebook(member?.facebook || '');
    setTInstagram(member?.instagram || '');
    setTDrawer(true);
  };
  const saveTeamMember = async () => {
    if (!tName || !tPos || !tImage) return notify('Name, position and photo required', 'error');
    setFormBusy(true);
    try {
      const body = { 
        name: tName, 
        position: tPos, 
        position_mr: tPosMr, 
        image: tImage,
        linkedin: tLinkedin,
        facebook: tFacebook,
        instagram: tInstagram
      };
      const method = editTeam ? 'PUT' : 'POST';
      const payload = editTeam ? { id: editTeam.id, ...body } : body;
      const res = await fetch('/api/team', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify(editTeam ? 'Team Member updated!' : 'Team Member added!');
      setTDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteTeamMember = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Member deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankSettings) return;
    setSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bankSettings)
      });
      const data = await res.json();
      if (data.success) {
        setBankSettings(data.settings);
        notify('Settings saved!');
      } else {
        notify(data.error || 'Failed to save', 'error');
      }
    } catch (err: any) {
      notify(err.message || 'Error saving settings', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateDonation = async (id: string, status: 'success'|'failed') => {
    try {
      const res = await fetch('/api/donations/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donation_id: id, status })
      });
      const data = await res.json();
      if (data.success) {
        notify(`Donation marked as ${status}`);
        fetchAll();
      } else {
        notify(data.error || 'Update failed', 'error');
      }
    } catch (e: any) {
      notify(e.message, 'error');
    }
  };

  const handleSaveCsr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csrTitle || !csrUrl) {
      notify('Title and Document are required', 'error');
      return;
    }
    setFormBusy(true);
    try {
      const res = await fetch('/api/csr-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: csrTitle, title_mr: csrTitleMr, url: csrUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setCsrDocs(prev => [data.document, ...prev]);
        notify('CSR Document added successfully');
        setCsrDrawer(false);
        setCsrTitle(''); setCsrTitleMr(''); setCsrUrl('');
      } else {
        notify(data.error || 'Failed to add document', 'error');
      }
    } catch (err: any) {
      notify(err.message, 'error');
    } finally {
      setFormBusy(false);
    }
  };

  const handleDeleteCsr = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      const res = await fetch(`/api/csr-docs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCsrDocs(prev => prev.filter((d: any) => d.id !== id));
        notify('Document deleted');
      } else {
        notify(data.error || 'Failed to delete', 'error');
      }
    } catch (err: any) {
      notify(err.message, 'error');
    }
  };

  const navItems: { id: Tab; icon: React.ReactNode; label: string; badge?: number }[] = [
    { id: 'dashboard',  icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { id: 'campaigns',  icon: <Megaphone size={18} />,       label: 'Campaigns',  badge: stats.activeCampaigns },
    { id: 'donations',  icon: <HandCoins size={18} />,       label: 'Donations',  badge: stats.totalDonors },
    { id: 'volunteers', icon: <Users size={18} />,           label: 'Volunteers', badge: volunteers.filter(v => v.status === 'pending').length || undefined },
    { id: 'team',       icon: <UserCheck size={18} />,       label: 'Team Management' },
    { id: 'content',    icon: <BookOpen size={18} />,        label: 'Content' },
    { id: 'csrdocs',    icon: <FileText size={18} />,        label: 'CSR Docs' },
    { id: 'gallery',    icon: <ImageIcon size={18} />,       label: 'Gallery',    badge: gallery.length || undefined },
    { id: 'messages',   icon: <MessageSquare size={18} />,   label: 'Messages',   badge: stats.unreadMessages || undefined },
    { id: 'settings',   icon: <SettingsIcon size={18} />,    label: 'Settings' },
  ];

  const fmtCurrency = (n: number) => '₹' + n.toLocaleString('en-IN');
  const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const filteredDonations = donations.filter(d =>
    d.donor_name.toLowerCase().includes(search.toLowerCase()) ||
    d.donor_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0d1117] text-white overflow-hidden font-sans">

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d1117] border-r border-white/5 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Heart size={16} className="text-amber-400 fill-amber-400/30" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-none">Prathana</div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(n => (
            <button key={n.id} onClick={() => { setTab(n.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group
                ${tab === n.id ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}>
              <span className="flex-shrink-0">{n.icon}</span>
              <span className="flex-1 text-left">{n.label}</span>
              {n.badge != null && n.badge > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === n.id ? 'bg-amber-500/30 text-amber-300' : 'bg-white/10 text-white/50'}`}>
                  {n.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/5">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-all cursor-pointer">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-[#0d1117] flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/40 hover:text-white cursor-pointer">
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white capitalize flex items-center gap-2">
              {navItems.find(n => n.id === tab)?.icon}
              {tab === 'dashboard' ? 'Overview' : tab}
            </h1>
            <p className="text-[11px] text-white/30">Prathana Foundation Control Panel</p>
          </div>
          <button onClick={fetchAll} className="text-white/30 hover:text-white transition-colors cursor-pointer" title="Refresh">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Shield size={14} className="text-amber-400" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-amber-400" />
            </div>
          )}

          {!loading && (
            <>
              {/* ════ DASHBOARD ════ */}
              {tab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                    <StatCard icon={<TrendingUp size={22} className="text-amber-400" />} label="Total Raised" value={fmtCurrency(stats.totalRaised)} sub={`Goal: ${fmtCurrency(stats.totalGoal)}`} boxClass="bg-amber-500/15" glowClass="bg-amber-500" />
                    <StatCard icon={<HandCoins size={22} className="text-emerald-400" />} label="Donors" value={stats.totalDonors} sub="Successful payments" boxClass="bg-emerald-500/15" glowClass="bg-emerald-500" />
                    <StatCard icon={<Megaphone size={22} className="text-blue-400" />} label="Active Campaigns" value={stats.activeCampaigns} boxClass="bg-blue-500/15" glowClass="bg-blue-500" />
                    <StatCard icon={<Users size={22} className="text-violet-400" />} label="Volunteers" value={stats.volunteerCount} sub="Approved" boxClass="bg-violet-500/15" glowClass="bg-violet-500" />
                    <StatCard icon={<MessageSquare size={22} className="text-rose-400" />} label="Messages" value={stats.unreadMessages} sub="Unread" boxClass="bg-rose-500/15" glowClass="bg-rose-500" />
                    <StatCard icon={<BookOpen size={22} className="text-cyan-400" />} label="Content Items" value={activities.length + projects.length + events.length} sub="Activities + Projects + Events" boxClass="bg-cyan-500/15" glowClass="bg-cyan-500" />
                  </div>

                  {/* Recent donations */}
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                        <HandCoins size={14} className="text-amber-400" />
                        Recent Donations
                      </h3>
                      <button onClick={() => setTab('donations')} className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                        View all <ArrowUpRight size={12} />
                      </button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {donations.slice(0, 5).map(d => (
                        <div key={d.id} className="flex items-center gap-4 px-6 py-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/40">
                            {d.donor_name[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{d.donor_name}</div>
                            <div className="text-[11px] text-white/30">{d.donor_email}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-amber-400">{fmtCurrency(d.amount)}</div>
                            <Badge status={d.payment_status} />
                          </div>
                        </div>
                      ))}
                      {donations.length === 0 && <div className="px-6 py-8 text-center text-sm text-white/20">No donations yet</div>}
                    </div>
                  </div>

                  {/* Recent volunteers */}
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                        <Users size={14} className="text-violet-400" />
                        Pending Volunteers
                      </h3>
                      <button onClick={() => setTab('volunteers')} className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                        View all <ArrowUpRight size={12} />
                      </button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {volunteers.filter(v => v.status === 'pending').slice(0, 4).map(v => (
                        <div key={v.id} className="flex items-center gap-4 px-6 py-3">
                          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">
                            {v.name[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white">{v.name}</div>
                            <div className="text-[11px] text-white/30">{v.city} · {v.occupation}</div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => updateVolStatus(v.id, 'approved')} className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/25 transition-colors cursor-pointer"><Check size={13} /></button>
                            <button onClick={() => updateVolStatus(v.id, 'rejected')} className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/25 transition-colors cursor-pointer"><X size={13} /></button>
                          </div>
                        </div>
                      ))}
                      {volunteers.filter(v => v.status === 'pending').length === 0 && <div className="px-6 py-6 text-center text-sm text-white/20">No pending volunteers</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ CAMPAIGNS ════ */}
              {tab === 'campaigns' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold">Campaigns ({campaigns.length})</h2>
                    <button onClick={() => openCampDrawer()} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-colors cursor-pointer">
                      <Plus size={14} /> New Campaign
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {campaigns.map(c => (
                      <div key={c.id} className="bg-[#1a1f2e] border border-white/5 rounded-2xl p-5 flex gap-4 items-start hover:border-white/10 transition-all">
                        {c.image && <img src={c.image} alt={c.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-white/10" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-white truncate">{c.title}</h3>
                            <Badge status={c.status} />
                          </div>
                          <p className="text-[12px] text-white/40 mt-1 line-clamp-2">{c.description}</p>
                          <div className="mt-3">
                            <div className="flex justify-between text-[11px] text-white/30 mb-1">
                              <span>Raised: {fmtCurrency(c.amount_raised)}</span>
                              <span>Goal: {fmtCurrency(c.goal_amount)}</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (c.amount_raised / c.goal_amount) * 100)}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button onClick={() => openCampDrawer(c)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20 flex items-center justify-center cursor-pointer transition-colors"><Edit2 size={13} /></button>
                          <button onClick={() => deleteCampaign(c.id)} className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400/60 hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </div>
                    ))}
                    {campaigns.length === 0 && <div className="text-center py-16 text-white/20 text-sm">No campaigns yet. Create one!</div>}
                  </div>
                </div>
              )}

              {/* ════ DONATIONS ════ */}
              {tab === 'donations' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-white font-bold flex-1">Donations ({donations.length})</h2>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donors..." className="bg-[#1a1f2e] border border-white/10 rounded-xl pl-8 pr-4 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/40 w-52" />
                    </div>
                  </div>
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Donor</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Amount</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Details</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden md:table-cell">Status</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden lg:table-cell">Date</th>
                            <th className="text-right px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredDonations.map(d => (
                            <tr key={d.id} className="hover:bg-white/2 transition-colors">
                              <td className="px-5 py-3.5">
                                <div className="font-medium text-white">{d.donor_name}</div>
                                <div className="text-[11px] text-white/30">{d.donor_email}</div>
                              </td>
                              <td className="px-5 py-3.5 font-bold text-amber-400">{fmtCurrency(d.amount)}</td>
                              <td className="px-5 py-3.5">
                                {d.utr && <div className="text-[11px] text-white/60">UTR: <span className="font-mono text-white/90">{d.utr}</span></div>}
                                {d.screenshot && <div className="text-[11px] text-amber-400/80 hover:text-amber-400 cursor-pointer flex items-center gap-1 mt-0.5" onClick={() => d.screenshot?.startsWith('http') ? window.open(d.screenshot, '_blank') : alert('This proof was uploaded before Cloudinary integration and is unavailable. (Raw filename: ' + d.screenshot + ')')}><Eye size={10} /> View Proof</div>}
                              </td>
                              <td className="px-5 py-3.5 hidden md:table-cell"><Badge status={d.payment_status} /></td>
                              <td className="px-5 py-3.5 text-white/30 text-[12px] hidden lg:table-cell">{fmtDate(d.created_at)}</td>
                              <td className="px-5 py-3.5 text-right">
                                {d.payment_status === 'pending' && (
                                  <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => handleUpdateDonation(d.id, 'success')} className="p-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors cursor-pointer" title="Approve">
                                      <Check size={14} />
                                    </button>
                                    <button onClick={() => handleUpdateDonation(d.id, 'failed')} className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer" title="Reject">
                                      <X size={14} />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                          {filteredDonations.length === 0 && (
                            <tr><td colSpan={6} className="text-center py-12 text-white/20">No donations found</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ════ VOLUNTEERS ════ */}
              {tab === 'volunteers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-white font-bold">Volunteers ({volunteers.length})</h2>
                      <p className="text-xs text-white/40 mt-0.5">Click any row or the expand button to view full application details.</p>
                    </div>
                    <div className="flex gap-2 text-[11px]">
                      {['pending','approved','rejected'].map(s => (
                        <span key={s} className="px-3 py-1 rounded-full bg-white/5 text-white/40 font-semibold capitalize">
                          {volunteers.filter(v => v.status === s).length} {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="w-12 px-4 py-3 text-center"></th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Name & Contact</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden md:table-cell">City & Availability</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hidden lg:table-cell">Interests</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Status</th>
                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {volunteers.map(v => {
                            const isExpanded = expandedVolId === v.id;
                            return (
                              <Fragment key={v.id}>
                                <tr
                                  className={`transition-colors cursor-pointer ${isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                                  onClick={() => setExpandedVolId(isExpanded ? null : v.id)}
                                >
                                  {/* Expand Button */}
                                  <td className="px-4 py-3.5 text-center" onClick={(e) => { e.stopPropagation(); setExpandedVolId(isExpanded ? null : v.id); }}>
                                    <button
                                      type="button"
                                      aria-label={isExpanded ? 'Collapse details' : 'Expand full details'}
                                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isExpanded ? 'bg-amber-500/20 text-amber-400 rotate-180' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                                    >
                                      <ChevronDown size={14} />
                                    </button>
                                  </td>

                                  {/* Name & Contact */}
                                  <td className="px-5 py-3.5">
                                    <div className="font-semibold text-white flex items-center gap-2">
                                      {v.name}
                                    </div>
                                    <div className="text-[11px] text-white/40 flex items-center gap-2 mt-0.5">
                                      <span>{v.email}</span>
                                      {v.phone && <span>• {v.phone}</span>}
                                    </div>
                                  </td>

                                  {/* City & Availability */}
                                  <td className="px-5 py-3.5 hidden md:table-cell">
                                    <div className="text-white/70 font-medium text-xs">{v.city || 'Solapur'}</div>
                                    <div className="text-[11px] text-amber-400/80 capitalize mt-0.5 font-light">{v.availability || 'Weekends'}</div>
                                  </td>

                                  {/* Interests */}
                                  <td className="px-5 py-3.5 hidden lg:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                      {v.interests?.split(',').map((i, idx) => (
                                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/5 capitalize">
                                          {i.trim()}
                                        </span>
                                      ))}
                                    </div>
                                  </td>

                                  {/* Status */}
                                  <td className="px-5 py-3.5">
                                    <Badge status={v.status} />
                                  </td>

                                  {/* Actions */}
                                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-2">
                                      {v.status === 'pending' && (
                                        <>
                                          <button
                                            onClick={() => updateVolStatus(v.id, 'approved')}
                                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 cursor-pointer transition-colors"
                                          >
                                            <Check size={11} /> Approve
                                          </button>
                                          <button
                                            onClick={() => updateVolStatus(v.id, 'rejected')}
                                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 cursor-pointer transition-colors"
                                          >
                                            <X size={11} /> Reject
                                          </button>
                                        </>
                                      )}
                                      <button
                                        onClick={() => setExpandedVolId(isExpanded ? null : v.id)}
                                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5 transition-colors"
                                      >
                                        {isExpanded ? 'Hide' : 'View Full Info'}
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                {/* ── EXPANDED FULL DATA ROW ── */}
                                {isExpanded && (
                                  <tr className="bg-black/40 border-y border-white/10">
                                    <td colSpan={6} className="p-5 sm:p-7">
                                      <div className="bg-[#121622] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
                                        
                                        {/* Header */}
                                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-4">
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                              <h3 className="text-lg font-bold text-white tracking-tight">{v.name}</h3>
                                              <Badge status={v.status} />
                                            </div>
                                            <p className="text-xs text-white/40">
                                              Application ID: <span className="font-mono text-white/60">{v.id}</span>
                                              {v.created_at && ` • Submitted on ${new Date(v.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                                            </p>
                                          </div>

                                          {/* Status action buttons */}
                                          <div className="flex items-center gap-2">
                                            {v.status === 'pending' && (
                                              <>
                                                <button
                                                  onClick={() => updateVolStatus(v.id, 'approved')}
                                                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors shadow-sm cursor-pointer"
                                                >
                                                  <Check size={13} /> Approve Volunteer
                                                </button>
                                                <button
                                                  onClick={() => updateVolStatus(v.id, 'rejected')}
                                                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 transition-colors shadow-sm cursor-pointer"
                                                >
                                                  <X size={13} /> Reject
                                                </button>
                                              </>
                                            )}
                                            {v.status === 'approved' && (
                                              <button
                                                onClick={() => updateVolStatus(v.id, 'rejected')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer"
                                              >
                                                <X size={12} /> Change to Rejected
                                              </button>
                                            )}
                                            {v.status === 'rejected' && (
                                              <button
                                                onClick={() => updateVolStatus(v.id, 'approved')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                                              >
                                                <Check size={12} /> Change to Approved
                                              </button>
                                            )}
                                          </div>
                                        </div>

                                        {/* Comprehensive data grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                          
                                          {/* Phone */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Phone Number</span>
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm font-semibold text-white font-mono">{v.phone || '—'}</span>
                                              {v.phone && (
                                                <a
                                                  href={`https://wa.me/${v.phone.replace(/[^0-9]/g, '')}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold underline"
                                                >
                                                  WhatsApp ↗
                                                </a>
                                              )}
                                            </div>
                                          </div>

                                          {/* Email */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Email Address</span>
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm font-medium text-white truncate max-w-[170px]">{v.email || '—'}</span>
                                              {v.email && (
                                                <a
                                                  href={`mailto:${v.email}`}
                                                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline"
                                                >
                                                  Email ↗
                                                </a>
                                              )}
                                            </div>
                                          </div>

                                          {/* Location */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">City / Location</span>
                                            <span className="text-sm font-semibold text-white block">
                                              {v.city || 'Solapur'}{v.address ? `, ${v.address}` : ''}
                                            </span>
                                          </div>

                                          {/* Availability */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Availability</span>
                                            <span className="text-sm font-semibold text-amber-400 capitalize block">
                                              {v.availability || 'Weekends'}
                                            </span>
                                          </div>

                                          {/* Occupation */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Occupation / Profession</span>
                                            <span className="text-sm font-medium text-white/80 block">
                                              {v.occupation || 'Volunteer / Student'}
                                            </span>
                                          </div>

                                          {/* Age / Gender */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Age & Gender</span>
                                            <span className="text-sm font-medium text-white/80 block">
                                              {v.age ? `${v.age} years old` : 'Not specified'} {v.gender ? `• ${v.gender}` : ''}
                                            </span>
                                          </div>

                                          {/* Selected Interests */}
                                          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 space-y-1.5 sm:col-span-2">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Areas of Interest</span>
                                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                                              {v.interests?.split(',').map((item, idx) => (
                                                <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-amber-500/15 text-amber-300 font-medium border border-amber-500/25 capitalize">
                                                  {item.trim()}
                                                </span>
                                              ))}
                                            </div>
                                          </div>

                                        </div>

                                        {/* Volunteer Note / Message / Reason */}
                                        {v.experience && (
                                          <div className="p-4.5 bg-white/[0.03] rounded-xl border border-white/5 space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Applicant Note & Experience</span>
                                            <p className="text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-wrap font-light">
                                              "{v.experience}"
                                            </p>
                                          </div>
                                        )}

                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            );
                          })}
                          {volunteers.length === 0 && (
                            <tr>
                              <td colSpan={6} className="text-center py-16 text-white/30">
                                <div className="max-w-xs mx-auto space-y-2">
                                  <Users className="w-8 h-8 mx-auto text-white/20" />
                                  <p className="text-sm font-medium">No volunteer applications yet</p>
                                  <p className="text-xs text-white/20">When someone registers on the volunteer form, their full details will appear here.</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

                            {/* ════ TEAM ════ */}
              {tab === 'team' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold">Team Members ({teamMembers.length})</h2>
                    <button onClick={() => openTeamDrawer()} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 text-amber-950 font-semibold text-xs hover:bg-amber-400 transition-colors">
                      <Plus size={14} /> Add Member
                    </button>
                  </div>
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Photo & Name</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Position</th>
                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {teamMembers.map(m => (
                            <tr key={m.id} className="hover:bg-white/2 transition-colors">
                              <td className="px-5 py-3.5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
                                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="font-medium text-white">{m.name}</div>
                              </td>
                              <td className="px-5 py-3.5 text-white/50">
                                <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-semibold">{m.position}</span>
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => openTeamDrawer(m)} className="p-1.5 text-white/30 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors"><Edit2 size={14} /></button>
                                  <button onClick={() => deleteTeamMember(m.id)} className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {teamMembers.length === 0 && <tr><td colSpan={3} className="text-center py-12 text-white/20">No team members yet</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ════ CONTENT ════ */}
              {tab === 'content' && (
                <div className="space-y-4">
                  {/* Sub tabs */}
                  <div className="flex items-center gap-1 bg-[#1a1f2e] border border-white/5 rounded-xl p-1 w-fit flex-wrap">
                    {(['activities','projects','events','reports','pages'] as ContentSub[]).map(s => (
                      <button key={s} onClick={() => setContentSub(s)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer
                          ${contentSub === s ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' : 'text-white/40 hover:text-white/70'}`}>
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Activities */}
                  {contentSub === 'activities' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-white">Activities ({activities.length})</h3>
                        <button onClick={() => openActDrawer()} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer transition-colors"><Plus size={13} /> Add Activity</button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {activities.map(a => (
                          <div key={a.id} className="bg-[#1a1f2e] border border-white/5 rounded-xl p-4 flex gap-3 hover:border-white/10 transition-all">
                            {a.image && <img src={a.image} alt={a.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-white/10" />}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white text-sm">{a.title}</div>
                              <Badge status={a.category} />
                              <p className="text-[11px] text-white/30 mt-1 line-clamp-2">{a.description}</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <button onClick={() => openActDrawer(a)} className="w-7 h-7 rounded-lg bg-white/5 text-white/30 hover:text-white flex items-center justify-center cursor-pointer transition-colors"><Edit2 size={12} /></button>
                              <button onClick={() => deleteActivity(a.id)} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400/50 hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors"><Trash2 size={12} /></button>
                            </div>
                          </div>
                        ))}
                        {activities.length === 0 && <div className="col-span-2 text-center py-12 text-white/20 text-sm">No activities yet</div>}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {contentSub === 'projects' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-white">Projects ({projects.length})</h3>
                          <p className="text-[11px] text-white/30 mt-0.5">Use ▲ and ▼ buttons to rearrange the display order on the website</p>
                        </div>
                        <button onClick={() => openProjDrawer()} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer transition-colors"><Plus size={13} /> Add Project</button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {projects.map((p, idx) => (
                          <div key={p.id} className="bg-[#1a1f2e] border border-white/5 rounded-xl p-4 flex items-center gap-3 hover:border-white/10 transition-all relative group">
                            <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 border border-amber-500/20" title={`Display Rank #${idx + 1}`}>
                              #{idx + 1}
                            </span>
                            {p.image && <img src={p.image} alt={p.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-white/10" />}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white text-sm truncate">{p.title}</div>
                              <Badge status={p.status} />
                              <div className="text-[11px] text-white/25 mt-1">{p.start_date} → {p.end_date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Reorder Buttons */}
                              <div className="flex flex-col gap-1">
                                <button
                                  disabled={idx === 0}
                                  onClick={() => handleMoveProject(idx, 'up')}
                                  title="Move Up"
                                  className="w-6 h-6 rounded bg-white/5 hover:bg-amber-500/20 text-white/40 hover:text-amber-400 flex items-center justify-center disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                >
                                  <ChevronUp size={12} />
                                </button>
                                <button
                                  disabled={idx === projects.length - 1}
                                  onClick={() => handleMoveProject(idx, 'down')}
                                  title="Move Down"
                                  className="w-6 h-6 rounded bg-white/5 hover:bg-amber-500/20 text-white/40 hover:text-amber-400 flex items-center justify-center disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                >
                                  <ChevronDown size={12} />
                                </button>
                              </div>
                              <div className="flex flex-col gap-1 border-l border-white/10 pl-2">
                                <button onClick={() => openProjDrawer(p)} className="w-7 h-7 rounded-lg bg-white/5 text-white/30 hover:text-white flex items-center justify-center cursor-pointer transition-colors"><Edit2 size={12} /></button>
                                <button onClick={() => deleteProject(p.id)} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400/50 hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors"><Trash2 size={12} /></button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {projects.length === 0 && <div className="col-span-2 text-center py-12 text-white/20 text-sm">No projects yet</div>}
                      </div>
                    </div>
                  )}

                  {/* Blog / Events */}
                  {contentSub === 'events' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-white">Blog & News ({events.length})</h3>
                          <p className="text-[11px] text-white/30 mt-0.5">Articles, announcements and event coverage</p>
                        </div>
                        <button onClick={() => openEvtDrawer()} className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer transition-colors">
                          <Plus size={13} /> Write Post
                        </button>
                      </div>

                      <div className="space-y-3">
                        {events.map(e => {
                          const wordCount = e.content?.split(/\s+/).filter(Boolean).length || 0;
                          const readTime  = Math.max(1, Math.ceil(wordCount / 200));
                          return (
                            <div key={e.id} className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
                              <div className="flex gap-0">
                                {/* Cover image */}
                                {e.featured_image && (
                                  <div className="w-32 sm:w-44 flex-shrink-0 relative overflow-hidden">
                                    <img src={e.featured_image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1f2e]/60" />
                                  </div>
                                )}
                                {/* Content */}
                                <div className="flex-1 p-4 min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                                          {(e as any).tag || 'news'}
                                        </span>
                                        <span className="text-[10px] text-white/25 flex items-center gap-1">
                                          <Calendar size={9} /> {e.published_date}
                                        </span>
                                        <span className="text-[10px] text-white/20">{readTime} min read · {wordCount} words</span>
                                      </div>
                                      <h4 className="font-bold text-white text-sm leading-snug line-clamp-1">{e.title}</h4>
                                      <p className="text-[11px] text-white/40 mt-1 line-clamp-2 leading-relaxed">
                                        {(e as any).excerpt || e.content?.slice(0, 140)}
                                      </p>
                                    </div>
                                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                                      <button onClick={() => openEvtDrawer(e)} className="w-7 h-7 rounded-lg bg-white/5 text-white/30 hover:text-amber-400 hover:bg-amber-500/10 flex items-center justify-center cursor-pointer transition-colors">
                                        <Edit2 size={12} />
                                      </button>
                                      <button onClick={() => deleteEvent(e.id)} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400/50 hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors">
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {events.length === 0 && (
                          <div className="text-center py-16 border border-dashed border-white/8 rounded-2xl">
                            <FileText size={32} className="text-white/10 mx-auto mb-3" />
                            <p className="text-white/25 text-sm">No posts yet</p>
                            <p className="text-white/15 text-xs mt-1">Click "Write Post" to publish your first article</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── Reports ── */}
                  {contentSub === 'reports' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-white">Reports & Documents ({reports.length})</h3>
                          <p className="text-[11px] text-white/30 mt-0.5">Annual reports, financial statements, impact assessments</p>
                        </div>
                        <button onClick={openReportDrawer} className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer transition-colors">
                          <Plus size={13} /> Add Report
                        </button>
                      </div>

                      <div className="space-y-3">
                        {reports.map(r => {
                          const typeColor: Record<string,string> = {
                            annual:    'bg-blue-500/15 text-blue-400 border-blue-500/20',
                            financial: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
                            impact:    'bg-violet-500/15 text-violet-400 border-violet-500/20',
                            audit:     'bg-amber-500/15 text-amber-400 border-amber-500/20',
                            other:     'bg-white/5 text-white/40 border-white/10',
                          };
                          return (
                            <div key={r.id} className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group flex">
                              {r.cover_image ? (
                                <div className="w-24 flex-shrink-0 relative overflow-hidden">
                                  <img src={r.cover_image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1f2e]/60" />
                                </div>
                              ) : (
                                <div className="w-24 flex-shrink-0 bg-[#0f1318] flex items-center justify-center border-r border-white/5">
                                  <FileText size={24} className="text-white/15" />
                                </div>
                              )}
                              <div className="flex-1 p-4 flex items-center gap-4 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${typeColor[r.type] || typeColor.other}`}>
                                      {r.type}
                                    </span>
                                    <span className="text-[10px] text-white/25 font-semibold">{r.year}</span>
                                  </div>
                                  <h4 className="font-bold text-white text-sm leading-snug line-clamp-1">{r.title}</h4>
                                  {r.description && <p className="text-[11px] text-white/35 mt-0.5 line-clamp-1">{r.description}</p>}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <a href={r.file_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:bg-amber-500/15 hover:text-amber-400 text-[11px] font-semibold transition-colors">
                                    <ArrowUpRight size={11} /> View
                                  </a>
                                  <button onClick={() => deleteReport(r.id)} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400/50 hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {reports.length === 0 && (
                          <div className="text-center py-16 border border-dashed border-white/8 rounded-2xl">
                            <FileText size={32} className="text-white/10 mx-auto mb-3" />
                            <p className="text-white/25 text-sm">No reports yet</p>
                            <p className="text-white/15 text-xs mt-1">Click "Add Report" to upload your first document</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pages Editor */}
                  {contentSub === 'pages' && (
                    <PageFormEditor
                      selectedPage={selectedPage}
                      pageContentStr={pageContentStr}
                      onChangePageContentStr={setPageContentStr}
                      pageLoading={pageLoading}
                      pageSaving={pageSaving}
                      pageError={pageError}
                      onSave={savePageContent}
                      onPageChange={(p) => {
                        setSelectedPage(p);
                        fetchPageContent(p);
                      }}
                    />
                  )}
                </div>
              )}


              {/* ════ GALLERY ════ */}
              {tab === 'gallery' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold">Photo Gallery ({gallery.length})</h2>
                    <button onClick={openGalleryDrawer} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-colors cursor-pointer">
                      <Plus size={14} /> Add Photo
                    </button>
                  </div>

                  {/* Category filter */}
                  <div className="flex flex-wrap gap-2">
                    {['all','balgram','farming','vrudhashram','shala','awards','general'].map(cat => (
                      <button key={cat} onClick={() => setGFilter(cat)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          gFilter === cat ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {gallery
                      .filter(p => gFilter === 'all' || p.category === gFilter)
                      .map(photo => (
                        <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-white/8 aspect-square bg-[#1a1f2e]">
                          <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                            <p className="text-white text-[11px] font-semibold leading-tight">{photo.title}</p>
                            <p className="text-white/50 text-[10px] capitalize mt-0.5">{photo.category}</p>
                          </div>
                          <button onClick={() => deletePhoto(photo.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white/70 hover:bg-red-500 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    {gallery.filter(p => gFilter === 'all' || p.category === gFilter).length === 0 && (
                      <div className="col-span-4 text-center py-16 text-white/20 text-sm">No photos yet — click Add Photo to upload</div>
                    )}
                  </div>
                </div>
              )}

              {/* ════ MESSAGES ════ */}
              {tab === 'messages' && (
                <div className="space-y-4">
                  <h2 className="text-white font-bold">Contact Messages ({contacts.length})</h2>
                  <div className="space-y-3">
                    {contacts.map(c => (
                      <div key={c.id} className={`bg-[#1a1f2e] border rounded-2xl p-5 transition-all ${c.read ? 'border-white/5 opacity-60' : 'border-amber-500/20 shadow-lg shadow-amber-500/5'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-400">
                              {c.name[0]?.toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-white text-sm flex items-center gap-2">
                                {c.name}
                                {!c.read && <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />}
                              </div>
                              <div className="text-[11px] text-white/30">{c.email} {c.phone && `· ${c.phone}`}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-[11px] text-white/20">{fmtDate(c.created_at)}</span>
                            {!c.read && (
                              <button onClick={() => markRead(c.id)} className="text-[11px] px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 cursor-pointer transition-colors flex items-center gap-1">
                                <Check size={11} /> Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-[13px] text-white/60 leading-relaxed bg-black/20 rounded-xl p-3 border border-white/5">{c.message}</p>
                      </div>
                    ))}
                    {contacts.length === 0 && <div className="text-center py-16 text-white/20 text-sm">No contact messages yet</div>}
                  </div>
                </div>
              )}
              {/* ════ SETTINGS ════ */}
              {tab === 'settings' && (
                <div className="max-w-3xl">
                  <h2 className="text-white font-bold mb-4">Bank & UPI Settings</h2>
                  <form onSubmit={handleSaveSettings} className="bg-[#1a1f2e] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <ImageUpload
                          label="UPI QR Code"
                          value={bankSettings?.qrCodeUrl || ''}
                          onChange={url => setBankSettings({ ...bankSettings, qrCodeUrl: url })}
                        />
                      </div>
                      <Field label="UPI ID">
                        <input
                          value={bankSettings?.upiId || ''}
                          onChange={e => setBankSettings({ ...bankSettings, upiId: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. prathana@sbi"
                          required
                        />
                      </Field>
                      <Field label="Bank Name">
                        <input
                          value={bankSettings?.bankName || ''}
                          onChange={e => setBankSettings({ ...bankSettings, bankName: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. State Bank of India"
                          required
                        />
                      </Field>
                      <Field label="Account Name">
                        <input
                          value={bankSettings?.accountName || ''}
                          onChange={e => setBankSettings({ ...bankSettings, accountName: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. Prathana Foundation"
                          required
                        />
                      </Field>
                      <Field label="Account Number">
                        <input
                          value={bankSettings?.accountNumber || ''}
                          onChange={e => setBankSettings({ ...bankSettings, accountNumber: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. 1234567890"
                          required
                        />
                      </Field>
                      <Field label="IFSC Code">
                        <input
                          value={bankSettings?.ifscCode || ''}
                          onChange={e => setBankSettings({ ...bankSettings, ifscCode: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. SBIN0001234"
                          required
                        />
                      </Field>
                      <Field label="Branch">
                        <input
                          value={bankSettings?.branch || ''}
                          onChange={e => setBankSettings({ ...bankSettings, branch: e.target.value })}
                          className={inputCls}
                          placeholder="e.g. Solapur Main"
                          required
                        />
                      </Field>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button
                        type="submit"
                        disabled={savingSettings || !bankSettings}
                        className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-[0_4px_16px_rgba(245,158,11,0.2)] disabled:opacity-50 flex items-center gap-2"
                      >
                        {savingSettings ? <Loader2 size={16} className="animate-spin" /> : <SettingsIcon size={16} />}
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── CSR Docs Tab ── */}
              {tab === 'csrdocs' && (
                <div className="space-y-6 max-w-5xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold">CSR Documents</h2>
                    <button
                      onClick={() => {
                        setCsrTitle('');
                        setCsrTitleMr('');
                        setCsrUrl('');
                        setCsrDrawer(true);
                      }}
                      className="bg-brand-yellow hover:bg-amber-400 text-amber-950 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                    >
                      <Plus size={16} /> Add Document
                    </button>
                  </div>
                  
                  {csrDocs.length === 0 ? (
                    <div className="text-center py-20 text-white/40">
                      <FileText size={48} className="mx-auto mb-4 opacity-20" />
                      <p>No CSR documents uploaded yet.</p>
                    </div>
                  ) : (
                    <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-sm text-white/70">
                        <thead className="bg-black/20 text-white/40 uppercase tracking-widest text-[10px]">
                          <tr>
                            <th className="p-4 font-semibold">Title (En / Mr)</th>
                            <th className="p-4 font-semibold">File</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {csrDocs.map((doc: any) => (
                            <tr key={doc.id} className="hover:bg-white/[0.02]">
                              <td className="p-4">
                                <div className="font-medium text-white">{doc.title}</div>
                                {doc.title_mr && <div className="text-xs opacity-60 mt-0.5">{doc.title_mr}</div>}
                              </td>
                              <td className="p-4">
                                <a href={doc.url} target="_blank" rel="noreferrer" className="text-brand-yellow hover:underline flex items-center gap-1 text-xs">
                                  <FileText size={14} /> View File
                                </a>
                              </td>
                              <td className="p-4 text-xs">{fmtDate(doc.created_at)}</td>
                              <td className="p-4 text-right">
                                <button onClick={() => handleDeleteCsr(doc.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors ml-auto">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Add Document Drawer */}
                  {csrDrawer && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCsrDrawer(false)} />
                      <div className="relative w-full max-w-md bg-[#131824] h-full border-l border-white/10 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-bold text-white">Add CSR Document</h3>
                          <button onClick={() => setCsrDrawer(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveCsr} className="space-y-5">
                          <Field label="Document Title (English)">
                            <input value={csrTitle} onChange={e=>setCsrTitle(e.target.value)} required className={inputCls} placeholder="e.g. Annual Report 2023-24" />
                          </Field>
                          <Field label="Document Title (Marathi) - Optional">
                            <input value={csrTitleMr} onChange={e=>setCsrTitleMr(e.target.value)} className={inputCls} placeholder="e.g. वार्षिक अहवाल 2023-24" />
                          </Field>
                          <DocumentUpload
                            label="Upload PDF / Document"
                            value={csrUrl}
                            onChange={setCsrUrl}
                          />
                          <div className="pt-6">
                            <button disabled={formBusy || !csrTitle || !csrUrl} type="submit" className="w-full bg-brand-yellow text-amber-950 font-bold py-3 rounded-xl disabled:opacity-50">
                              {formBusy ? 'Saving...' : 'Save Document'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── Drawers ──────────────────────────────────────────────────────── */}

      {/* Campaign drawer */}
      <Drawer open={campDrawer} title={editCamp ? 'Edit Campaign' : 'New Campaign'} onClose={() => setCampDrawer(false)}>
        <Field label="Title (English)"><input value={cTitle} onChange={e => setCTitle(e.target.value)} className={inputCls} placeholder="Campaign title" /></Field>
        <Field label="Title (Marathi)"><input value={cTitleMr} onChange={e => setCTitleMr(e.target.value)} className={inputCls} placeholder="मराठी शीर्षक" /></Field>
        <Field label="Short Description (English)"><textarea value={cDesc} onChange={e => setCDesc(e.target.value)} className={inputCls + ' resize-none h-20'} placeholder="Short excerpt..." /></Field>
        <Field label="Full Content (English)"><textarea value={cContent} onChange={e => setCContent(e.target.value)} className={inputCls + ' resize-y h-32'} placeholder="Full campaign details..." /></Field>
        <Field label="Full Content (Marathi) [Optional]"><textarea value={cContentMr} onChange={e => setCContentMr(e.target.value)} className={inputCls + ' resize-y h-32'} placeholder="संपूर्ण माहिती..." /></Field>
        <Field label="Goal Amount (₹)"><input type="number" value={cGoal} onChange={e => setCGoal(e.target.value)} className={inputCls} placeholder="100000" /></Field>
        <ImageUpload value={cImage} onChange={setCImage} label="Campaign Photo" />
        <Field label="Status">
          <select value={cStatus} onChange={e => setCStatus(e.target.value as any)} className={selectCls}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </Field>
        <button onClick={saveCampaign} disabled={formBusy} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
          {formBusy ? <Loader2 size={16} className="animate-spin" /> : null}
          {editCamp ? 'Save Changes' : 'Create Campaign'}
        </button>
      </Drawer>

      {/* Activity drawer */}
      <Drawer open={actDrawer} title={editAct ? 'Edit Activity' : 'New Activity'} onClose={() => setActDrawer(false)}>
        <Field label="Title (English)"><input value={aTitle} onChange={e => setATitle(e.target.value)} className={inputCls} placeholder="Activity title" /></Field>
        <Field label="Title (Marathi)"><input value={aTitleMr} onChange={e => setATitleMr(e.target.value)} className={inputCls} placeholder="मराठी शीर्षक" /></Field>
        <Field label="Description"><textarea value={aDesc} onChange={e => setADesc(e.target.value)} className={inputCls + ' resize-none h-24'} placeholder="Description..." /></Field>
        <ImageUpload value={aImage} onChange={setAImage} label="Activity Photo" />
        <Field label="Category">
          <select value={aCat} onChange={e => setACat(e.target.value as any)} className={selectCls}>
            {['nutrition','education','healthcare','general'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <button onClick={saveActivity} disabled={formBusy} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
          {formBusy ? <Loader2 size={16} className="animate-spin" /> : null}
          {editAct ? 'Save Changes' : 'Create Activity'}
        </button>
      </Drawer>

      {/* Project drawer */}
      <Drawer open={projDrawer} title={editProj ? 'Edit Project' : 'New Project'} onClose={() => setProjDrawer(false)}>
        <Field label="Title (English)"><input value={pTitle} onChange={e => setPTitle(e.target.value)} className={inputCls} placeholder="Project title" /></Field>
        <Field label="Title (Marathi)"><input value={pTitleMr} onChange={e => setPTitleMr(e.target.value)} className={inputCls} placeholder="मराठी शीर्षक" /></Field>
        <Field label="Description"><textarea value={pDesc} onChange={e => setPDesc(e.target.value)} className={inputCls + ' resize-none h-24'} placeholder="Description..." /></Field>
        <ImageUpload value={pImage} onChange={setPImage} label="Cover Photo" />
        
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700">Project Gallery (Optional)</label>
          {pGallery.map((img, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex-1">
                <ImageUpload value={img} onChange={(url) => {
                  const newG = [...pGallery];
                  newG[idx] = url;
                  setPGallery(newG);
                }} label={`Image ${idx + 1}`} />
              </div>
              <button onClick={() => setPGallery(pGallery.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button onClick={() => setPGallery([...pGallery, ''])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-gray-700 hover:border-gray-400 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Gallery Image
          </button>
        </div>
        <Field label="Status">
          <select value={pStatus} onChange={e => setPStatus(e.target.value as any)} className={selectCls}>
            {['planned','active','completed'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start Date (Optional)"><input type="date" value={pStart} onChange={e => setPStart(e.target.value)} className={inputCls} /></Field>
          <Field label="End Date (Optional)"><input type="date" value={pEnd} onChange={e => setPEnd(e.target.value)} className={inputCls} /></Field>
        </div>
        <button onClick={saveProject} disabled={formBusy} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
          {formBusy ? <Loader2 size={16} className="animate-spin" /> : null}
          {editProj ? 'Save Changes' : 'Create Project'}
        </button>
      </Drawer>

      {/* Blog / Event drawer */}
      <Drawer open={evtDrawer} title={editEvt ? '✏️ Edit Post' : '✍️ Write New Post'} onClose={() => setEvtDrawer(false)}>
        {/* Cover image at top */}
        <ImageUpload value={eImage} onChange={setEImage} label="Cover Photo" />

        {/* Meta row */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tag / Category">
            <select value={eTag} onChange={e => setETag(e.target.value)} className={selectCls}>
              {['news','event','announcement','achievement','story','update'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="Published Date">
            <input type="date" value={eDate} onChange={e => setEDate(e.target.value)} className={inputCls} />
          </Field>
        </div>

        {/* Titles */}
        <Field label="Headline (English)">
          <input
            value={eTitle}
            onChange={e => setETitle(e.target.value)}
            className={inputCls + ' text-base font-semibold'}
            placeholder="A compelling headline..."
          />
        </Field>
        <Field label="Headline (Marathi)">
          <input value={eTitleMr} onChange={e => setETitleMr(e.target.value)} className={inputCls} placeholder="मराठी शीर्षक..." />
        </Field>

        {/* Excerpt */}
        <Field label="Excerpt / Summary">
          <textarea
            value={eExcerpt}
            onChange={e => setEExcerpt(e.target.value)}
            className={inputCls + ' resize-none h-16 text-xs'}
            placeholder="A one or two sentence teaser shown on the blog listing page..."
            maxLength={200}
          />
          <p className="text-[10px] text-white/20 text-right mt-1">{eExcerpt.length}/200</p>
        </Field>

        {/* Body */}
        <Field label="Article Body">
          <div className="relative">
            <textarea
              value={eContent}
              onChange={e => setEContent(e.target.value)}
              className={inputCls + ' resize-none h-56 leading-relaxed text-sm'}
              placeholder="Write the full article here. Paragraphs, details, quotes — everything goes here."
            />
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-[10px] text-white/20">
                {eContent.split(/\s+/).filter(Boolean).length} words · ~{Math.max(1, Math.ceil(eContent.split(/\s+/).filter(Boolean).length / 200))} min read
              </p>
              <p className="text-[10px] text-white/20">{eContent.length} chars</p>
            </div>
          </div>
        </Field>

        {/* Marathi body (collapsible hint) */}
        <details className="group">
          <summary className="text-[10px] text-amber-400/60 uppercase tracking-widest font-bold cursor-pointer select-none hover:text-amber-400 transition-colors list-none flex items-center gap-1">
            <ChevronDown size={12} className="group-open:rotate-180 transition-transform" /> Add Marathi Body (optional)
          </summary>
          <div className="mt-2">
            <textarea
              value={eContentMr}
              onChange={e => setEContentMr(e.target.value)}
              className={inputCls + ' resize-none h-36 mt-1'}
              placeholder="मराठी लेखाचा मजकूर..."
            />
          </div>
        </details>

        {/* Publish button */}
        <button
          onClick={saveEvent}
          disabled={formBusy || !eTitle || !eContent}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          {formBusy ? <Loader2 size={16} className="animate-spin" /> : <FileText size={15} />}
          {editEvt ? 'Save Changes' : 'Publish Post'}
        </button>
      </Drawer>

      {/* Team drawer */}
      <Drawer open={tDrawer} onClose={() => setTDrawer(false)} title={editTeam ? 'Edit Member' : 'Add Team Member'}>
        <div className="space-y-4">
          <ImageUpload value={tImage} onChange={setTImage} label="Member Photo (Square)" />
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Name</label>
            <input type="text" value={tName} onChange={e => setTName(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Position</label>
            <input type="text" value={tPos} onChange={e => setTPos(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" placeholder="e.g. Founder" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Position (Marathi) [Optional]</label>
            <input type="text" value={tPosMr} onChange={e => setTPosMr(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" placeholder="e.g. संस्थापक" />
          </div>
          <div className="pt-2 border-t border-white/10 space-y-3">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-400">Social Links [Optional]</span>
            <div>
              <label className="block text-[10px] text-white/50 mb-1">LinkedIn Profile URL</label>
              <input type="url" value={tLinkedin} onChange={e => setTLinkedin(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50" placeholder="https://linkedin.com/in/username" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-1">Facebook Profile URL</label>
              <input type="url" value={tFacebook} onChange={e => setTFacebook(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50" placeholder="https://facebook.com/username" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-1">Instagram Profile URL</label>
              <input type="url" value={tInstagram} onChange={e => setTInstagram(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50" placeholder="https://instagram.com/username" />
            </div>
          </div>
          <button disabled={formBusy} onClick={saveTeamMember} className="w-full py-2.5 bg-amber-500 text-amber-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 mt-4 flex justify-center items-center gap-2">
            {formBusy && <Loader2 size={16} className="animate-spin" />}
            {formBusy ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </Drawer>

      {/* Gallery drawer */}
      <Drawer open={gDrawer} title="Add Photo to Gallery" onClose={() => setGDrawer(false)}>
        <ImageUpload value={gUrl} onChange={setGUrl} label="Photo" />
        <Field label="Title (English)"><input value={gTitle} onChange={e => setGTitle(e.target.value)} className={inputCls} placeholder="Photo title" /></Field>
        <Field label="Title (Marathi)"><input value={gTitleMr} onChange={e => setGTitleMr(e.target.value)} className={inputCls} placeholder="मराठी शीर्षक" /></Field>
        <Field label="Description"><input value={gDesc} onChange={e => setGDesc(e.target.value)} className={inputCls} placeholder="Short caption..." /></Field>
        <Field label="Category">
          <select value={gCat} onChange={e => setGCat(e.target.value)} className={selectCls}>
            {['balgram','farming','vrudhashram','shala','awards','general'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <button onClick={addPhoto} disabled={formBusy || !gUrl} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
          {formBusy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={15} />}
          Add to Gallery
        </button>
      </Drawer>

      {/* Report drawer */}
      <Drawer open={rDrawer} title="📄 Add Report / Document" onClose={() => setRDrawer(false)}>
        <ImageUpload value={rCover} onChange={setRCover} label="Cover Thumbnail (optional)" />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Report Type">
            <select value={rType} onChange={e => setRType(e.target.value as Report['type'])} className={selectCls}>
              {(['annual','financial','impact','audit','other'] as const).map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>
              ))}
            </select>
          </Field>
          <Field label="Year">
            <input value={rYear} onChange={e => setRYear(e.target.value)} className={inputCls} placeholder="2024" maxLength={4} />
          </Field>
        </div>

        <Field label="Title (English)">
          <input value={rTitle} onChange={e => setRTitle(e.target.value)} className={inputCls} placeholder="Annual Report 2024" />
        </Field>
        <Field label="Title (Marathi)">
          <input value={rTitleMr} onChange={e => setRTitleMr(e.target.value)} className={inputCls} placeholder="मराठी शीर्षक..." />
        </Field>
        <Field label="Description (optional)">
          <textarea value={rDesc} onChange={e => setRDesc(e.target.value)} className={inputCls + ' resize-none h-16'} placeholder="Brief summary of the report..." />
        </Field>

        <Field label="PDF / File URL">
          <input
            value={rFileUrl}
            onChange={e => setRFileUrl(e.target.value)}
            className={inputCls}
            placeholder="https://... (Google Drive, Dropbox, or direct PDF link)"
          />
          <p className="text-[10px] text-white/20 mt-1">Paste a shareable link to the PDF. Use Google Drive → Share → Anyone with link.</p>
        </Field>

        <button
          onClick={saveReport}
          disabled={formBusy || !rTitle || !rFileUrl}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          {formBusy ? <Loader2 size={16} className="animate-spin" /> : <FileText size={15} />}
          Publish Report
        </button>
      </Drawer>

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
