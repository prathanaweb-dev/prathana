'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Campaign, Donation } from '@/lib/db';
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
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<'campaigns' | 'donations'>('campaigns');

  // Database lists
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // Campaign Modals / Forms
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  
  // Form values
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formGoal, setFormGoal] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    const isLogged = localStorage.getItem('prarthana_admin_session') === 'true';
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
      const campRes = await fetch('/api/campaigns');
      const campData = await campRes.json();
      if (campData.success) {
        setCampaigns(campData.campaigns);
      }

      const donRes = await fetch('/api/donations');
      const donData = await donRes.json();
      if (donData.success) {
        setDonations(donData.donations);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('prarthana_admin_session');
    router.push('/admin/login');
  };

  // Convert uploaded image to Base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Open form to Create or Edit
  const openForm = (campaign?: Campaign) => {
    setFormError('');
    if (campaign) {
      setEditingCampaign(campaign);
      setFormTitle(campaign.title);
      setFormDesc(campaign.description);
      setFormGoal(campaign.goal_amount.toString());
      setFormImage(campaign.image);
      setFormCompleted(campaign.is_completed);
    } else {
      setEditingCampaign(null);
      setFormTitle('');
      setFormDesc('');
      setFormGoal('');
      setFormImage('');
      setFormCompleted(false);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCampaign(null);
  };

  // Submit Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    if (!formTitle.trim() || !formDesc.trim() || !formGoal.trim()) {
      setFormError('All fields except the image are required.');
      setFormLoading(false);
      return;
    }

    try {
      const payload = {
        title: formTitle,
        description: formDesc,
        goal_amount: Number(formGoal),
        image: formImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      };

      let res;
      if (editingCampaign) {
        // Edit campaign
        res = await fetch('/api/campaigns', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingCampaign.id,
            updates: {
              ...payload,
              is_completed: formCompleted,
            },
          }),
        });
      } else {
        // Create campaign
        res = await fetch('/api/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit campaign data');

      // Refresh list and close
      await fetchAdminData();
      closeForm();
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  // Toggle Completion Status directly
  const handleToggleCompletion = async (campaign: Campaign) => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: campaign.id,
          updates: {
            is_completed: !campaign.is_completed,
          },
        }),
      });

      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Failed to update completion status:', err);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-300 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-saffron" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col relative">
      {/* Admin Navbar */}
      <header className="border-b border-stone-850 bg-stone-900/50 py-4 px-6 md:px-12 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-brand-saffron fill-brand-saffron/20" />
          <div>
            <span className="font-serif-display text-lg font-bold text-white">
              Prarthana Control Panel
            </span>
            <span className="block text-[8px] uppercase tracking-widest text-brand-saffron -mt-1 font-semibold">
              Admin Dashboard
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchAdminData}
            className="p-2 border border-stone-800 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            title="Refresh Ledger"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-stone-800 rounded-lg text-xs font-semibold hover:bg-red-950/20 hover:border-red-900 hover:text-red-400 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 py-8 w-full z-10 flex flex-col gap-6">
        
        {/* Navigation Tabs & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-850 pb-4">
          <div className="flex border border-stone-800 rounded-lg overflow-hidden bg-stone-900/40">
            <button
              onClick={() => setTab('campaigns')}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                tab === 'campaigns'
                  ? 'bg-brand-saffron text-white'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/40'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setTab('donations')}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                tab === 'donations'
                  ? 'bg-brand-saffron text-white'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/40'
              }`}
            >
              Donation Ledger
            </button>
          </div>

          {tab === 'campaigns' && (
            <button
              onClick={() => openForm()}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-saffron hover:bg-white hover:text-stone-950 text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          )}
        </div>

        {/* Tab contents */}
        {loading ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-saffron" />
          </div>
        ) : tab === 'campaigns' ? (
          
          /* Campaigns List Grid */
          campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-44 relative bg-stone-950">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    {camp.is_completed && (
                      <span className="absolute top-3 right-3 bg-brand-green text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="block font-mono text-[9px] text-stone-500">{camp.id}</span>
                      <h4 className="font-serif-display text-lg font-bold text-white leading-tight">
                        {camp.title}
                      </h4>
                      <p className="text-stone-400 text-xs line-clamp-2 font-light">
                        {camp.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-stone-800">
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="bg-stone-950/40 p-2 rounded-lg border border-stone-850">
                          <span className="block text-[8px] uppercase tracking-wider text-stone-500 font-bold">Goal</span>
                          <span className="font-mono font-semibold text-stone-300">₹{Number(camp.goal_amount).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-stone-950/40 p-2 rounded-lg border border-stone-850">
                          <span className="block text-[8px] uppercase tracking-wider text-stone-500 font-bold">Raised</span>
                          <span className="font-mono font-semibold text-brand-green">₹{Number(camp.amount_raised).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openForm(camp)}
                          className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Details
                        </button>
                        <button
                          onClick={() => handleToggleCompletion(camp)}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                            camp.is_completed
                              ? 'border-brand-saffron/40 text-brand-saffron hover:bg-stone-800'
                              : 'border-brand-green/40 text-brand-green hover:bg-brand-green/10'
                          }`}
                        >
                          {camp.is_completed ? 'Make Active' : 'Mark Completed'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-stone-850 rounded-xl">
              <p className="text-stone-500 text-sm font-light">No campaigns registered. Click "New Campaign" to create one.</p>
            </div>
          )
        ) : (
          
          /* Donations Ledger Table */
          donations.length > 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 text-[10px] uppercase tracking-widest font-bold">
                      <th className="p-4">Donor Details</th>
                      <th className="p-4">Campaign ID</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment ID</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-xs">
                    {donations.map((don) => (
                      <tr key={don.id} className="hover:bg-stone-850/35 transition-colors">
                        <td className="p-4 space-y-0.5">
                          <span className="block font-semibold text-white">{don.donor_name}</span>
                          <span className="block text-[10px] text-stone-500 font-light">{don.donor_email}</span>
                        </td>
                        <td className="p-4 font-mono text-stone-400">
                          {don.campaign_id}
                        </td>
                        <td className="p-4 font-serif-display font-bold text-white text-sm">
                          ₹{Number(don.amount).toLocaleString('en-IN')}
                        </td>
                        <td className="p-4 font-mono text-[10px] text-stone-400">
                          {don.payment_id}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              don.payment_status === 'success'
                                ? 'bg-brand-green/15 text-brand-green'
                                : don.payment_status === 'pending'
                                ? 'bg-amber-500/15 text-amber-500'
                                : 'bg-red-500/15 text-red-500'
                            }`}
                          >
                            <span
                              className={`w-1 h-1 rounded-full ${
                                don.payment_status === 'success'
                                  ? 'bg-brand-green'
                                  : don.payment_status === 'pending'
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                            />
                            {don.payment_status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-stone-500 font-mono text-[10px]">
                          {new Date(don.created_at).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-stone-850 rounded-xl">
              <p className="text-stone-500 text-sm font-light">No donation records found in the log.</p>
            </div>
          )
        )}
      </main>

      {/* Create/Edit Campaign Modal Panel */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85" onClick={closeForm} />

          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex justify-between items-center">
              <h3 className="font-serif-display text-lg font-bold text-white">
                {editingCampaign ? 'Edit Campaign Details' : 'Register New Campaign'}
              </h3>
              <button
                onClick={closeForm}
                className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 text-xs rounded-lg font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Sponsor Nutrition Lunch Boxes"
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 outline-none focus:border-brand-saffron transition-all"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
                  Goal Amount (INR)
                </label>
                <input
                  type="number"
                  required
                  value={formGoal}
                  onChange={(e) => setFormGoal(e.target.value)}
                  placeholder="e.g. 350000"
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 outline-none focus:border-brand-saffron transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
                  Campaign Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe the target, ground execution details, and impact metrics..."
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 outline-none focus:border-brand-saffron transition-all"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
                  Campaign Banner Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                    id="image-file-input"
                  />
                  <label
                    htmlFor="image-file-input"
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Upload Local Photo
                  </label>
                  <span className="text-[10px] text-stone-500">
                    {formImage ? 'Image uploaded (Base64)' : 'Or default Unsplash placeholder will be used'}
                  </span>
                </div>
                {formImage && (
                  <div className="h-24 w-full rounded-lg overflow-hidden border border-stone-800 mt-2 bg-stone-950">
                    <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Completed Status Check (Only for edit) */}
              {editingCampaign && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="form-completed-check"
                    checked={formCompleted}
                    onChange={(e) => setFormCompleted(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-800 bg-stone-950 text-brand-saffron focus:ring-brand-saffron"
                  />
                  <label htmlFor="form-completed-check" className="text-xs text-stone-300 font-medium">
                    Mark Campaign Completed (Deactivates Donate button)
                  </label>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-2.5 border border-stone-850 hover:bg-stone-800 text-stone-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-2.5 bg-brand-saffron hover:bg-white hover:text-stone-950 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  {formLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Save Campaign
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
