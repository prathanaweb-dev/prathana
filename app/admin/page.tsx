'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Campaign, Donation, Volunteer, Activity, Project, EventItem } from '@/lib/db';
import {
  Heart,
  Plus,
  Edit2,
  FileText,
  LogOut,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  RefreshCw,
  Users,
  Award,
  Calendar,
  Layers,
  Trash2,
  Check,
  UserCheck,
  ClipboardList
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  
  // Dashboard navigation tabs
  const [tab, setTab] = useState<'dashboard' | 'campaigns' | 'donations' | 'volunteers' | 'content'>('dashboard');
  const [contentTab, setContentTab] = useState<'activities' | 'projects' | 'events'>('activities');

  // Database lists
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalGoal: 0,
    totalDonors: 0,
    activeCampaigns: 0,
    volunteerCount: 0,
  });

  // Modal forms management
  const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Forms inputs state
  // 1. Campaign
  const [campTitle, setCampTitle] = useState('');
  const [campTitleMr, setCampTitleMr] = useState('');
  const [campDesc, setCampDesc] = useState('');
  const [campDescMr, setCampDescMr] = useState('');
  const [campGoal, setCampGoal] = useState('');
  const [campImage, setCampImage] = useState('');
  const [campStatus, setCampStatus] = useState<'active' | 'completed'>('active');

  // 2. Activity
  const [actTitle, setActTitle] = useState('');
  const [actTitleMr, setActTitleMr] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actDescMr, setActDescMr] = useState('');
  const [actImage, setActImage] = useState('');
  const [actCategory, setActCategory] = useState<'nutrition' | 'education' | 'healthcare' | 'general'>('nutrition');

  // 3. Project
  const [projTitle, setProjTitle] = useState('');
  const [projTitleMr, setProjTitleMr] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projDescMr, setProjDescMr] = useState('');
  const [projImage, setProjImage] = useState('');
  const [projStatus, setProjStatus] = useState<'planned' | 'active' | 'completed'>('active');
  const [projStart, setProjStart] = useState('');
  const [projEnd, setProjEnd] = useState('');

  // 4. Event
  const [evtTitle, setEvtTitle] = useState('');
  const [evtTitleMr, setEvtTitleMr] = useState('');
  const [evtContent, setEvtContent] = useState('');
  const [evtContentMr, setEvtContentMr] = useState('');
  const [evtImage, setEvtImage] = useState('');
  const [evtDate, setEvtDate] = useState('');

  // Form notifications
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    const isLogged = localStorage.getItem('prathana_admin_session') === 'true';
    if (!isLogged) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
      fetchAdminData();
    }
  }, [router]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Campaigns
      const campRes = await fetch('/api/campaigns');
      const campData = await campRes.json();
      if (campData.success) setCampaigns(campData.campaigns);

      // 2. Donations
      const donRes = await fetch('/api/donations');
      const donData = await donRes.json();
      if (donData.success) setDonations(donData.donations);

      // 3. Volunteers
      const volRes = await fetch('/api/volunteers');
      const volData = await volRes.json();
      if (volData.success) setVolunteers(volData.volunteers);

      // 4. Activities
      const actRes = await fetch('/api/activities');
      const actData = await actRes.json();
      if (actData.success) setActivities(actData.activities);

      // 5. Projects
      const projRes = await fetch('/api/projects');
      const projData = await projRes.json();
      if (projData.success) setProjects(projData.projects);

      // 6. Events
      const evtRes = await fetch('/api/events');
      const evtData = await evtRes.json();
      if (evtData.success) setEvents(evtData.events);

      // Calculate totals
      const raised = campData.campaigns?.reduce((acc: number, c: any) => acc + Number(c.amount_raised), 0) || 0;
      const goals = campData.campaigns?.reduce((acc: number, c: any) => acc + Number(c.goal_amount), 0) || 0;
      const activeCamps = campData.campaigns?.filter((c: any) => c.status === 'active' && !c.is_completed).length || 0;
      const verifiedDonors = donData.donations?.filter((d: any) => d.payment_status === 'success').length || 0;
      const appVols = volData.volunteers?.filter((v: any) => v.status === 'approved').length || 0;

      setStats({
        totalRaised: raised,
        totalGoal: goals,
        totalDonors: verifiedDonors,
        activeCampaigns: activeCamps,
        volunteerCount: appVols,
      });

    } catch (err) {
      console.error('Error fetching dashboard records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('prathana_admin_session');
    router.push('/admin/login');
  };

  // Convert files to Base64 strings
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Open forms helper
  const openCampaignForm = (camp?: Campaign) => {
    setFormError('');
    if (camp) {
      setEditingCampaign(camp);
      setCampTitle(camp.title);
      setCampTitleMr(camp.title_mr || '');
      setCampDesc(camp.description);
      setCampDescMr(camp.description_mr || '');
      setCampGoal(camp.goal_amount.toString());
      setCampImage(camp.image);
      setCampStatus(camp.status || (camp.is_completed ? 'completed' : 'active'));
    } else {
      setEditingCampaign(null);
      setCampTitle('');
      setCampTitleMr('');
      setCampDesc('');
      setCampDescMr('');
      setCampGoal('');
      setCampImage('');
      setCampStatus('active');
    }
    setIsCampaignFormOpen(true);
  };

  const openActivityForm = (act?: Activity) => {
    setFormError('');
    if (act) {
      setEditingActivity(act);
      setActTitle(act.title);
      setActTitleMr(act.title_mr || '');
      setActDesc(act.description);
      setActDescMr(act.description_mr || '');
      setActImage(act.image);
      setActCategory(act.category);
    } else {
      setEditingActivity(null);
      setActTitle('');
      setActTitleMr('');
      setActDesc('');
      setActDescMr('');
      setActImage('');
      setActCategory('nutrition');
    }
    setIsActivityFormOpen(true);
  };

  const openProjectForm = (proj?: Project) => {
    setFormError('');
    if (proj) {
      setEditingProject(proj);
      setProjTitle(proj.title);
      setProjTitleMr(proj.title_mr || '');
      setProjDesc(proj.description);
      setProjDescMr(proj.description_mr || '');
      setProjImage(proj.image);
      setProjStatus(proj.status);
      setProjStart(proj.start_date);
      setProjEnd(proj.end_date);
    } else {
      setEditingProject(null);
      setProjTitle('');
      setProjTitleMr('');
      setProjDesc('');
      setProjDescMr('');
      setProjImage('');
      setProjStatus('active');
      setProjStart('');
      setProjEnd('');
    }
    setIsProjectFormOpen(true);
  };

  const openEventForm = (evt?: EventItem) => {
    setFormError('');
    if (evt) {
      setEditingEvent(evt);
      setEvtTitle(evt.title);
      setEvtTitleMr(evt.title_mr || '');
      setEvtContent(evt.content);
      setEvtContentMr(evt.content_mr || '');
      setEvtImage(evt.featured_image);
      setEvtDate(evt.published_date);
    } else {
      setEditingEvent(null);
      setEvtTitle('');
      setEvtTitleMr('');
      setEvtContent('');
      setEvtContentMr('');
      setEvtImage('');
      setEvtDate(new Date().toISOString().split('T')[0]);
    }
    setIsEventFormOpen(true);
  };

  // Submit forms handler
  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = {
        title: campTitle,
        title_mr: campTitleMr,
        description: campDesc,
        description_mr: campDescMr,
        goal_amount: Number(campGoal),
        image: campImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
        status: campStatus,
        is_completed: campStatus === 'completed',
      };

      const url = '/api/campaigns';
      const method = editingCampaign ? 'PUT' : 'POST';
      const bodyPayload = editingCampaign ? { id: editingCampaign.id, updates: payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) throw new Error('Failed to save campaign details');

      await fetchAdminData();
      setIsCampaignFormOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = {
        title: actTitle,
        title_mr: actTitleMr,
        description: actDesc,
        description_mr: actDescMr,
        image: actImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
        category: actCategory,
      };

      const url = '/api/activities';
      const method = editingActivity ? 'PUT' : 'POST';
      const bodyPayload = editingActivity ? { id: editingActivity.id, updates: payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) throw new Error('Failed to save activity');

      await fetchAdminData();
      setIsActivityFormOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = {
        title: projTitle,
        title_mr: projTitleMr,
        description: projDesc,
        description_mr: projDescMr,
        image: projImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
        status: projStatus,
        start_date: projStart,
        end_date: projEnd,
      };

      const url = '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const bodyPayload = editingProject ? { id: editingProject.id, updates: payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) throw new Error('Failed to save project details');

      await fetchAdminData();
      setIsProjectFormOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = {
        title: evtTitle,
        title_mr: evtTitleMr,
        content: evtContent,
        content_mr: evtContentMr,
        featured_image: evtImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
        published_date: evtDate,
      };

      const url = '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';
      const bodyPayload = editingEvent ? { id: editingEvent.id, updates: payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) throw new Error('Failed to save news event');

      await fetchAdminData();
      setIsEventFormOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  // Delete handlers
  const handleDeleteItem = async (apiPath: string, id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`/api/${apiPath}?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Volunteer operations
  const handleVolunteerStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/volunteers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Volunteer status update failed:', err);
    }
  };

  const handleAssignActivity = async (id: string, activityTitle: string) => {
    try {
      const res = await fetch('/api/volunteers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, assigned_activity: activityTitle }),
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Volunteer activity assignment failed:', err);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-brand-paper text-brand-muted flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-saffron" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-paper text-brand-charcoal flex flex-col relative bg-grid-pattern overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-saffron/8 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green/6 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-4s' }} />

      {/* Admin Navbar */}
      <header className="border-b border-brand-clay/60 bg-white/70 backdrop-blur-md py-4 px-6 md:px-12 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Prathana Foundation Logo"
            className="w-6 h-6 object-contain"
          />
          <div>
            <span className="font-serif-display text-lg font-bold text-brand-charcoal">
              Prathana Control Panel
            </span>
            <span className="block text-[8px] uppercase tracking-widest text-brand-saffron -mt-1 font-semibold">
              Admin Dashboard
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchAdminData}
            className="p-2 border border-brand-clay/80 rounded-lg hover:bg-brand-sand text-brand-muted hover:text-brand-charcoal transition-colors"
            title="Refresh Database Logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-brand-clay/80 rounded-lg text-xs font-semibold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all text-brand-muted"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main layout container (full-width for dock layout) */}
      <div className="flex-1 flex flex-col w-full z-10 max-w-7xl mx-auto pb-28">
        {/* Main Content Pane */}
        <main className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-x-hidden">
          
          {loading ? (
            <div className="flex flex-1 items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand-saffron" />
            </div>
          ) : (
            <>
              {/* ───────────────────────────────────────────────────────────────
                  TAB 1: DASHBOARD METRICS SUMMARY
                  ─────────────────────────────────────────────────────────────── */}
              {tab === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <span className="section-label">Summary Overview</span>
                    <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal">System Metrics</h2>
                  </div>

                  {/* 4-col metric cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 bg-white border border-brand-clay/65 rounded-xl space-y-2 shadow-sm">
                      <span className="block text-[9px] uppercase tracking-widest text-brand-muted font-bold">Total Donations</span>
                      <span className="block font-mono text-2xl font-bold text-brand-green">₹{stats.totalRaised.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="p-5 bg-white border border-brand-clay/65 rounded-xl space-y-2 shadow-sm">
                      <span className="block text-[9px] uppercase tracking-widest text-brand-muted font-bold">Campaigns Target</span>
                      <span className="block font-mono text-2xl font-bold text-brand-charcoal">₹{stats.totalGoal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="p-5 bg-white border border-brand-clay/65 rounded-xl space-y-2 shadow-sm">
                      <span className="block text-[9px] uppercase tracking-widest text-brand-muted font-bold">Active Campaigns</span>
                      <span className="block font-mono text-2xl font-bold text-brand-saffron">{stats.activeCampaigns}</span>
                    </div>

                    <div className="p-5 bg-white border border-brand-clay/65 rounded-xl space-y-2 shadow-sm">
                      <span className="block text-[9px] uppercase tracking-widest text-brand-muted font-bold">Approved Volunteers</span>
                      <span className="block font-mono text-2xl font-bold text-brand-gold">{stats.volunteerCount}</span>
                    </div>
                  </div>

                  {/* Recent Activity Mini-Grids */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Applications */}
                    <div className="bg-white border border-brand-clay/65 rounded-xl p-5 space-y-4 shadow-sm">
                      <h4 className="font-serif-display font-bold text-brand-charcoal pb-3 border-b border-brand-clay/50 flex justify-between items-center text-sm">
                        <span>Pending Volunteer Applications</span>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[8px] uppercase tracking-wider font-bold">
                          {volunteers.filter(v => v.status === 'pending').length} Queue
                        </span>
                      </h4>
                      <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                        {volunteers.filter(v => v.status === 'pending').slice(0, 4).map(v => (
                          <div key={v.id} className="flex justify-between items-center bg-brand-sand/40 p-3 rounded-lg border border-brand-clay/50 text-xs">
                            <div>
                              <span className="block font-semibold text-brand-charcoal">{v.name}</span>
                              <span className="block text-[9px] text-brand-muted">{v.email} &bull; {v.phone}</span>
                            </div>
                            <button
                              onClick={() => setTab('volunteers')}
                              className="px-3 py-1 bg-brand-charcoal hover:bg-brand-saffron text-white rounded text-[10px] font-semibold transition-colors"
                            >
                              Review
                            </button>
                          </div>
                        ))}
                        {volunteers.filter(v => v.status === 'pending').length === 0 && (
                          <p className="text-brand-muted text-xs text-center py-6 font-light">All applications reviewed.</p>
                        )}
                      </div>
                    </div>

                    {/* Recent Donors */}
                    <div className="bg-white border border-brand-clay/65 rounded-xl p-5 space-y-4 shadow-sm">
                      <h4 className="font-serif-display font-bold text-brand-charcoal pb-3 border-b border-brand-clay/50 flex justify-between items-center text-sm">
                        <span>Recent Contribution Audits</span>
                        <span className="px-2 py-0.5 rounded bg-brand-green/10 text-brand-green text-[8px] uppercase tracking-wider font-bold">
                          {donations.filter(d => d.payment_status === 'success').length} verified
                        </span>
                      </h4>
                      <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                        {donations.slice(0, 4).map(d => (
                          <div key={d.id} className="flex justify-between items-center bg-brand-sand/40 p-3 rounded-lg border border-brand-clay/50 text-xs">
                            <div>
                              <span className="block font-semibold text-brand-charcoal">{d.donor_name}</span>
                              <span className="block text-[9px] text-brand-muted">{new Date(d.created_at).toLocaleDateString()}</span>
                            </div>
                            <span className="font-serif-display font-bold text-brand-green text-sm">
                              ₹{Number(d.amount).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                        {donations.length === 0 && (
                          <p className="text-brand-muted text-xs text-center py-6 font-light">No ledger inputs registered.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────
                  TAB 2: CAMPAIGNS MANAGEMENT
                  ─────────────────────────────────────────────────────────────── */}
              {tab === 'campaigns' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="section-label">Fiduciary Targets</span>
                      <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal">Campaigns Manager</h2>
                    </div>
                    <button
                      onClick={() => openCampaignForm()}
                      className="flex items-center gap-1.5 px-4 py-2 btn-premium rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Campaign
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaigns.map(camp => (
                      <div key={camp.id} className="bg-white border border-brand-clay/65 rounded-xl overflow-hidden flex flex-col justify-between shadow-sm">
                        <div className="h-32 relative bg-brand-sand">
                          <img src={camp.image} alt={camp.title} className="w-full h-full object-cover opacity-90" />
                          <span className={`absolute top-3 right-3 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-full text-white ${
                            camp.status === 'completed' || camp.is_completed ? 'bg-brand-green' : 'bg-brand-saffron'
                          }`}>
                            {camp.status || (camp.is_completed ? 'completed' : 'active')}
                          </span>
                        </div>
                        <div className="p-5 space-y-4">
                          <div className="space-y-1">
                            <span className="block font-mono text-[9px] text-brand-muted">{camp.id}</span>
                            <h4 className="font-serif-display text-base font-bold text-brand-charcoal line-clamp-1">{camp.title}</h4>
                            <p className="text-xs text-brand-muted font-light line-clamp-2">{camp.description}</p>
                          </div>
                          
                          <div className="flex gap-2 pt-3 border-t border-brand-clay/40">
                            <button
                              onClick={() => openCampaignForm(camp)}
                              className="flex-1 py-2 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors border border-brand-clay/60"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-brand-saffron" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem('campaigns', camp.id)}
                              className="p-2 border border-brand-clay/60 text-brand-muted hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Campaign"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {campaigns.length === 0 && (
                      <div className="col-span-full text-center py-20 border border-dashed border-brand-clay rounded-xl bg-white/50">
                        <p className="text-brand-muted text-xs font-light">No campaigns registered. Click Add Campaign to start.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────
                  TAB 3: VOLUNTEERS MANAGEMENT
                  ─────────────────────────────────────────────────────────────── */}
              {tab === 'volunteers' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <span className="section-label">Field Force Manager</span>
                    <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal">Volunteer Applications</h2>
                  </div>

                  <div className="bg-white border border-brand-clay/65 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-brand-sand/60 text-brand-charcoal border-b border-brand-clay/70 text-[10px] uppercase tracking-widest font-bold">
                            <th className="p-4">Applicant</th>
                            <th className="p-4">Location & Job</th>
                            <th className="p-4">Interests</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Assigned Activity</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-clay/50 text-xs font-light">
                          {volunteers.map(vol => (
                            <tr key={vol.id} className="hover:bg-brand-sand/20 transition-colors">
                              <td className="p-4 space-y-0.5">
                                <span className="block font-semibold text-brand-charcoal">{vol.name}</span>
                                <span className="block text-[10px] text-brand-muted">{vol.email}</span>
                                <span className="block text-[10px] text-brand-muted">{vol.phone}</span>
                              </td>
                              <td className="p-4 space-y-0.5">
                                <span className="block text-brand-charcoal">{vol.city}</span>
                                <span className="block text-[10px] text-brand-muted">{vol.occupation}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-[10px] bg-brand-sand px-2.5 py-1 rounded text-brand-muted border border-brand-clay/60 font-mono">
                                  {vol.interests}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  vol.status === 'approved' 
                                    ? 'bg-brand-green/10 text-brand-green' 
                                    : vol.status === 'rejected'
                                    ? 'bg-red-500/10 text-red-500'
                                    : 'bg-amber-500/10 text-amber-500'
                                }`}>
                                  <span className={`w-1 h-1 rounded-full ${
                                    vol.status === 'approved' ? 'bg-brand-green' : vol.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                                  }`} />
                                  {vol.status}
                                </span>
                              </td>
                              <td className="p-4">
                                {vol.status === 'approved' ? (
                                  <select
                                    value={vol.assigned_activity || ''}
                                    onChange={(e) => handleAssignActivity(vol.id, e.target.value)}
                                    className="px-2.5 py-1.5 bg-white border border-brand-clay text-brand-charcoal rounded text-xs outline-none focus:border-brand-saffron transition-all"
                                  >
                                    <option value="">-- Unassigned --</option>
                                    {activities.map(act => (
                                      <option key={act.id} value={act.title}>
                                        {act.title}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span className="text-brand-muted/70 italic text-[11px]">Requires Approval</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                {vol.status === 'pending' ? (
                                  <div className="flex justify-end gap-1.5">
                                    <button
                                      onClick={() => handleVolunteerStatus(vol.id, 'approved')}
                                      className="p-1.5 bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white rounded border border-brand-green/20 transition-all"
                                      title="Approve Applicant"
                                    >
                                      <UserCheck className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleVolunteerStatus(vol.id, 'rejected')}
                                      className="p-1.5 bg-red-50 text-red-500 hover:bg-red-600 hover:text-white rounded border border-red-200 transition-all"
                                      title="Reject Applicant"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleVolunteerStatus(vol.id, 'pending')}
                                    className="px-2 py-1 border border-brand-clay hover:bg-brand-sand hover:text-brand-charcoal text-brand-muted rounded text-[10px] font-semibold transition-colors"
                                  >
                                    Reset to Pending
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                          {volunteers.length === 0 && (
                            <tr>
                              <td colSpan={6} className="text-center py-12 text-brand-muted">
                                No volunteer registrations found in the log.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────
                  TAB 4: CONTENT MANAGEMENT (SUB-TABS)
                  ─────────────────────────────────────────────────────────────── */}
              {tab === 'content' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <span className="section-label">Website Content Management</span>
                    <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal">Content Hub</h2>
                  </div>

                  {/* Sub-tabs row */}
                  <div className="flex border-b border-brand-clay pb-3 gap-2">
                    {[
                      { id: 'activities', label: 'Activities' },
                      { id: 'projects', label: 'Projects' },
                      { id: 'events', label: 'Events & News' },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setContentTab(sub.id as any)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                          contentTab === sub.id
                            ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm'
                            : 'text-brand-muted border-transparent hover:text-brand-charcoal hover:bg-brand-sand/50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>

                  {/* Sub-tab: Activities */}
                  {contentTab === 'activities' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-brand-muted font-mono">{activities.length} Activities Found</span>
                        <button
                          onClick={() => openActivityForm()}
                          className="flex items-center gap-1 px-3 py-1.5 bg-brand-saffron hover:bg-brand-saffron/90 text-white rounded text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Activity
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activities.map(act => (
                          <div key={act.id} className="p-4 bg-white border border-brand-clay/65 rounded-xl flex gap-4 items-start justify-between shadow-sm">
                            <div className="flex gap-4 items-start">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-sand shrink-0">
                                <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-1">
                                <span className="px-2 py-0.5 rounded-full bg-brand-sand text-[9px] font-mono text-brand-saffron border border-brand-clay/60">
                                  {act.category}
                                </span>
                                <h4 className="font-serif-display font-bold text-brand-charcoal text-sm pt-1">{act.title}</h4>
                                <p className="text-[11px] text-brand-muted font-light line-clamp-1">{act.description}</p>
                              </div>
                            </div>

                            <div className="flex gap-1">
                              <button
                                onClick={() => openActivityForm(act)}
                                className="p-1.5 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal rounded border border-brand-clay/50 transition-colors"
                              >
                                <Edit2 className="w-3 h-3 text-brand-saffron" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('activities', act.id)}
                                className="p-1.5 bg-brand-sand hover:bg-red-50 hover:text-red-600 rounded border border-brand-clay/50 transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-brand-muted hover:text-red-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-tab: Projects */}
                  {contentTab === 'projects' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-brand-muted font-mono">{projects.length} Projects Found</span>
                        <button
                          onClick={() => openProjectForm()}
                          className="flex items-center gap-1 px-3 py-1.5 bg-brand-saffron hover:bg-brand-saffron/90 text-white rounded text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Project
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map(proj => (
                          <div key={proj.id} className="p-4 bg-white border border-brand-clay/65 rounded-xl flex gap-4 items-start justify-between shadow-sm">
                            <div className="flex gap-4 items-start">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-sand shrink-0">
                                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-1">
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                                  proj.status === 'completed' ? 'bg-brand-green/10 text-brand-green' : proj.status === 'active' ? 'bg-brand-saffron/10 text-brand-saffron' : 'bg-brand-sand text-brand-muted border border-brand-clay/40'
                                }`}>
                                  {proj.status}
                                </span>
                                <h4 className="font-serif-display font-bold text-brand-charcoal text-sm pt-1">{proj.title}</h4>
                                <p className="text-[10px] text-brand-muted font-mono font-light">
                                  {proj.start_date} &ndash; {proj.end_date}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-1">
                              <button
                                onClick={() => openProjectForm(proj)}
                                className="p-1.5 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal rounded border border-brand-clay/50 transition-colors"
                              >
                                <Edit2 className="w-3 h-3 text-brand-saffron" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('projects', proj.id)}
                                className="p-1.5 bg-brand-sand hover:bg-red-50 hover:text-red-600 rounded border border-brand-clay/50 transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-brand-muted hover:text-red-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-tab: Events */}
                  {contentTab === 'events' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-brand-muted font-mono">{events.length} Events/Blogs Found</span>
                        <button
                          onClick={() => openEventForm()}
                          className="flex items-center gap-1 px-3 py-1.5 bg-brand-saffron hover:bg-brand-saffron/90 text-white rounded text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Event
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {events.map(evt => (
                          <div key={evt.id} className="p-4 bg-white border border-brand-clay/65 rounded-xl flex gap-4 items-start justify-between shadow-sm">
                            <div className="flex gap-4 items-start">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-sand shrink-0">
                                <img src={evt.featured_image} alt={evt.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-brand-muted uppercase font-bold tracking-widest flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-brand-saffron" />
                                  {evt.published_date}
                                </span>
                                <h4 className="font-serif-display font-bold text-brand-charcoal text-sm pt-1">{evt.title}</h4>
                                <p className="text-[11px] text-brand-muted font-light line-clamp-1">{evt.content}</p>
                              </div>
                            </div>

                            <div className="flex gap-1">
                              <button
                                onClick={() => openEventForm(evt)}
                                className="p-1.5 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal rounded border border-brand-clay/50 transition-colors"
                              >
                                <Edit2 className="w-3 h-3 text-brand-saffron" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('events', evt.id)}
                                className="p-1.5 bg-brand-sand hover:bg-red-50 hover:text-red-600 rounded border border-brand-clay/50 transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-brand-muted hover:text-red-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────
                  TAB 5: DONATIONS LEDGER TABLE
                  ─────────────────────────────────────────────────────────────── */}
              {tab === 'donations' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <span className="section-label">Audit Log</span>
                    <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal">Donations Ledger</h2>
                  </div>

                  <div className="bg-white border border-brand-clay/65 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-brand-sand/60 text-brand-charcoal border-b border-brand-clay/70 text-[10px] uppercase tracking-widest font-bold">
                            <th className="p-4">Donor Details</th>
                            <th className="p-4">Campaign ID</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Payment ID</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-clay/50 text-xs font-light">
                          {donations.map((don) => (
                            <tr key={don.id} className="hover:bg-brand-sand/20 transition-colors">
                              <td className="p-4 space-y-0.5">
                                <span className="block font-semibold text-brand-charcoal">{don.donor_name}</span>
                                <span className="block text-[10px] text-brand-muted">{don.donor_email}</span>
                              </td>
                              <td className="p-4 font-mono text-brand-muted">
                                {don.campaign_id}
                              </td>
                              <td className="p-4 font-serif-display font-bold text-brand-charcoal text-sm">
                                ₹{Number(don.amount).toLocaleString('en-IN')}
                              </td>
                              <td className="p-4 font-mono text-[10px] text-brand-muted">
                                {don.payment_id}
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  don.payment_status === 'success'
                                    ? 'bg-brand-green/15 text-brand-green'
                                    : don.payment_status === 'pending'
                                    ? 'bg-amber-500/15 text-amber-500'
                                    : 'bg-red-500/15 text-red-500'
                                }`}>
                                  <span className={`w-1 h-1 rounded-full ${
                                    don.payment_status === 'success' ? 'bg-brand-green' : don.payment_status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                                  }`} />
                                  {don.payment_status}
                                </span>
                              </td>
                              <td className="p-4 text-right text-brand-muted font-mono text-[10px]">
                                {new Date(don.created_at).toLocaleString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                            </tr>
                          ))}
                          {donations.length === 0 && (
                            <tr>
                              <td colSpan={6} className="text-center py-12 text-brand-muted">
                                No donations registered in the ledger.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          MODAL DIALOGS AND FORMS SECTION
          ─────────────────────────────────────────────────────────────────────── */}

      {/* 1. Campaign Creator Modal */}
      {isCampaignFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#15221B]/40 backdrop-blur-sm" onClick={() => setIsCampaignFormOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-brand-clay rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-brand-sand border-b border-brand-clay flex justify-between items-center">
              <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">
                {editingCampaign ? 'Edit Campaign Details' : 'Register New Campaign'}
              </h3>
              <button onClick={() => setIsCampaignFormOpen(false)} className="p-1 hover:bg-brand-clay/35 text-brand-muted hover:text-brand-charcoal rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCampaignSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Campaign Title (English)</label>
                <input type="text" required value={campTitle} onChange={(e) => setCampTitle(e.target.value)} placeholder="e.g. Sponsor Nutrition Lunch Boxes" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Campaign Title (Marathi)</label>
                <input type="text" value={campTitleMr} onChange={(e) => setCampTitleMr(e.target.value)} placeholder="उदा. पोषण भोजन पेटी प्रायोजक व्हा" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Goal Amount (INR)</label>
                <input type="number" required value={campGoal} onChange={(e) => setCampGoal(e.target.value)} placeholder="e.g. 350000" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Description (English)</label>
                <textarea required rows={3} value={campDesc} onChange={(e) => setCampDesc(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Description (Marathi)</label>
                <textarea rows={3} value={campDescMr} onChange={(e) => setCampDescMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Campaign Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setCampImage)} className="hidden" id="camp-file" />
                <label htmlFor="camp-file" className="px-4 py-2 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal text-xs font-semibold rounded-lg cursor-pointer transition-colors inline-block border border-brand-clay/60">Upload Photo</label>
                {campImage && <img src={campImage} alt="Preview" className="h-24 w-full object-cover rounded-lg mt-2 border border-brand-clay" />}
              </div>

              {editingCampaign && (
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Campaign Status</label>
                  <select value={campStatus} onChange={(e) => setCampStatus(e.target.value as any)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron">
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-brand-clay/60">
                <button type="button" onClick={() => setIsCampaignFormOpen(false)} className="flex-1 py-2 border border-brand-clay hover:bg-brand-sand text-brand-muted text-xs font-semibold rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={formLoading} className="flex-1 py-2 btn-premium text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Activity Creator Modal */}
      {isActivityFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#15221B]/40 backdrop-blur-sm" onClick={() => setIsActivityFormOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-brand-clay rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-brand-sand border-b border-brand-clay flex justify-between items-center">
              <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">
                {editingActivity ? 'Edit Activity Details' : 'Register New Activity'}
              </h3>
              <button onClick={() => setIsActivityFormOpen(false)} className="p-1 hover:bg-brand-clay/35 text-brand-muted hover:text-brand-charcoal rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleActivitySubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Activity Title (English)</label>
                <input type="text" required value={actTitle} onChange={(e) => setActTitle(e.target.value)} placeholder="e.g. Solapur Evening Tuition" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Activity Title (Marathi)</label>
                <input type="text" value={actTitleMr} onChange={(e) => setActTitleMr(e.target.value)} placeholder="उदा. सोलापूर संध्याकाळचे अभ्यास वर्ग" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Category</label>
                <select value={actCategory} onChange={(e) => setActCategory(e.target.value as any)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron">
                  <option value="nutrition">Meals & Nutrition</option>
                  <option value="education">Education Support</option>
                  <option value="healthcare">Mobile Clinics</option>
                  <option value="general">General Outreach</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Description (English)</label>
                <textarea required rows={3} value={actDesc} onChange={(e) => setActDesc(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Description (Marathi)</label>
                <textarea rows={3} value={actDescMr} onChange={(e) => setActDescMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Banner Photo</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setActImage)} className="hidden" id="act-file" />
                <label htmlFor="act-file" className="px-4 py-2 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal text-xs font-semibold rounded-lg cursor-pointer transition-colors inline-block border border-brand-clay/60">Upload Photo</label>
                {actImage && <img src={actImage} alt="Preview" className="h-24 w-full object-cover rounded-lg mt-2 border border-brand-clay" />}
              </div>

              <div className="flex gap-3 pt-4 border-t border-brand-clay/60">
                <button type="button" onClick={() => setIsActivityFormOpen(false)} className="flex-1 py-2 border border-brand-clay hover:bg-brand-sand text-brand-muted text-xs font-semibold rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={formLoading} className="flex-1 py-2 btn-premium text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Project Creator Modal */}
      {isProjectFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#15221B]/40 backdrop-blur-sm" onClick={() => setIsProjectFormOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-brand-clay rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-brand-sand border-b border-brand-clay flex justify-between items-center">
              <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">
                {editingProject ? 'Edit Project Details' : 'Register New Project'}
              </h3>
              <button onClick={() => setIsProjectFormOpen(false)} className="p-1 hover:bg-brand-clay/35 text-brand-muted hover:text-brand-charcoal rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Project Title (English)</label>
                <input type="text" required value={projTitle} onChange={(e) => setProjTitle(e.target.value)} placeholder="e.g. central community kitchen build" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Project Title (Marathi)</label>
                <input type="text" value={projTitleMr} onChange={(e) => setProjTitleMr(e.target.value)} placeholder="उदा. मध्यवर्ती समुदाय स्वयंपाकघर उभारणी प्रकल्प" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Start Date</label>
                  <input type="date" required value={projStart} onChange={(e) => setProjStart(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm outline-none focus:border-brand-saffron transition-all text-brand-charcoal" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">End Date</label>
                  <input type="date" required value={projEnd} onChange={(e) => setProjEnd(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm outline-none focus:border-brand-saffron transition-all text-brand-charcoal" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Status</label>
                <select value={projStatus} onChange={(e) => setProjStatus(e.target.value as any)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron">
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Description (English)</label>
                <textarea required rows={3} value={projDesc} onChange={(e) => setProjDesc(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Description (Marathi)</label>
                <textarea rows={3} value={projDescMr} onChange={(e) => setProjDescMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Project Cover Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setProjImage)} className="hidden" id="proj-file" />
                <label htmlFor="proj-file" className="px-4 py-2 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal text-xs font-semibold rounded-lg cursor-pointer transition-colors inline-block border border-brand-clay/60">Upload Photo</label>
                {projImage && <img src={projImage} alt="Preview" className="h-24 w-full object-cover rounded-lg mt-2 border border-brand-clay" />}
              </div>

              <div className="flex gap-3 pt-4 border-t border-brand-clay/60">
                <button type="button" onClick={() => setIsProjectFormOpen(false)} className="flex-1 py-2 border border-brand-clay hover:bg-brand-sand text-brand-muted text-xs font-semibold rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={formLoading} className="flex-1 py-2 btn-premium text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Event Creator Modal */}
      {isEventFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#15221B]/40 backdrop-blur-sm" onClick={() => setIsEventFormOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-brand-clay rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-brand-sand border-b border-brand-clay flex justify-between items-center">
              <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">
                {editingEvent ? 'Edit News Event' : 'Add News / Event Post'}
              </h3>
              <button onClick={() => setIsEventFormOpen(false)} className="p-1 hover:bg-brand-clay/35 text-brand-muted hover:text-brand-charcoal rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEventSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Event Title (English)</label>
                <input type="text" required value={evtTitle} onChange={(e) => setEvtTitle(e.target.value)} placeholder="e.g. Solapur Kit Drive Reaches 400 Kids" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Event Title (Marathi)</label>
                <input type="text" value={evtTitleMr} onChange={(e) => setEvtTitleMr(e.target.value)} placeholder="उदा. शालेय साहित्य वाटप मोहीम ४०० मुलांपर्यंत पोहोचली" className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Publication Date</label>
                <input type="date" required value={evtDate} onChange={(e) => setEvtDate(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm outline-none focus:border-brand-saffron transition-all text-brand-charcoal" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Content (English)</label>
                <textarea required rows={5} value={evtContent} onChange={(e) => setEvtContent(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Content (Marathi)</label>
                <textarea rows={5} value={evtContentMr} onChange={(e) => setEvtContentMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">Featured Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setEvtImage)} className="hidden" id="evt-file" />
                <label htmlFor="evt-file" className="px-4 py-2 bg-brand-sand hover:bg-brand-clay/40 text-brand-charcoal text-xs font-semibold rounded-lg cursor-pointer transition-colors inline-block border border-brand-clay/60">Upload Photo</label>
                {evtImage && <img src={evtImage} alt="Preview" className="h-24 w-full object-cover rounded-lg mt-2 border border-brand-clay" />}
              </div>

              <div className="flex gap-3 pt-4 border-t border-brand-clay/60">
                <button type="button" onClick={() => setIsEventFormOpen(false)} className="flex-1 py-2 border border-brand-clay hover:bg-brand-sand text-brand-muted text-xs font-semibold rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={formLoading} className="flex-1 py-2 btn-premium text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl border border-brand-clay px-4 py-2.5 rounded-full shadow-[0_15px_45px_-10px_rgba(21,34,27,0.15)] flex items-center gap-1.5 sm:gap-3 max-w-[95vw] sm:max-w-max overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: ClipboardList },
          { id: 'campaigns', label: 'Campaigns', icon: Heart },
          { id: 'volunteers', label: 'Volunteers', icon: Users },
          { id: 'content', label: 'Content', icon: Layers },
          { id: 'donations', label: 'Donations', icon: FileText },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'bg-brand-saffron text-white shadow-lg shadow-brand-saffron/25 scale-105'
                  : 'text-brand-muted hover:text-brand-charcoal hover:bg-brand-sand/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
