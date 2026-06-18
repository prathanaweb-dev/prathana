'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Volunteer } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, User, Phone, Mail, CheckCircle, AlertCircle, Clock, Calendar, LogOut } from 'lucide-react';
import { translations } from '@/lib/translations';
import { useParams } from 'next/navigation';

export default function VolunteerDashboard() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Check if volunteer is already logged in
    const stored = localStorage.getItem('prathana_volunteer_session');
    if (stored) {
      try {
        setVolunteer(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing session:', err);
      }
    }
    setPageLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !phone.trim()) {
      setError(lang === 'mr' ? 'कृपया ईमेल आणि फोन दोन्ही भरा' : 'Please enter both email and phone number');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/volunteers?email=${encodeURIComponent(email.trim())}&phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || (lang === 'mr' ? 'नोंदणी सापडली नाही. ईमेल किंवा फोन तपासा' : 'Volunteer record not found. Please check details'));
      }

      setVolunteer(data.volunteer);
      localStorage.setItem('prathana_volunteer_session', JSON.stringify(data.volunteer));
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('prathana_volunteer_session');
    setVolunteer(null);
    setEmail('');
    setPhone('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-brand-green" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusText = (status: 'pending' | 'approved' | 'rejected') => {
    return t.volunteerDashboard.statusValues[status] || status;
  };

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          {pageLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand-saffron" />
            </div>
          ) : !volunteer ? (
            
            /* ── Login Form Card ── */
            <div className="max-w-md mx-auto bg-white border border-brand-clay/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {t.volunteerDashboard.loginCardTitle}
                </h2>
                <p className="text-xs text-brand-muted font-light leading-relaxed">
                  {t.volunteerDashboard.subtitle}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                    {t.volunteerDashboard.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. volunteer@gmail.com"
                    className="w-full px-4 py-3 bg-brand-paper border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-saffron transition-all text-brand-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                    {t.volunteerDashboard.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 bg-brand-paper border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-saffron transition-all text-brand-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-saffron hover:bg-brand-charcoal text-white rounded-full font-semibold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    t.volunteerDashboard.loggingIn
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t.volunteerDashboard.loginBtn}
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            
            /* ── Volunteer Dashboard View ── */
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
              {/* Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-clay/50 pb-6">
                <div>
                  <span className="section-label">{t.volunteerDashboard.title}</span>
                  <h1 className="font-serif-display text-3xl md:text-4xl font-bold text-brand-charcoal leading-tight">
                    {lang === 'mr' ? `स्वागत आहे, ${volunteer.name}` : `Welcome, ${volunteer.name}`}
                  </h1>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 border border-brand-clay rounded-full text-xs font-semibold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all text-brand-muted"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t.volunteerDashboard.logoutBtn}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left side: Profile and status */}
                <div className="md:col-span-5 space-y-6">
                  {/* Status Card */}
                  <div className="p-6 bg-white border border-brand-clay/60 rounded-3xl space-y-4 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-semibold">
                      {t.volunteerDashboard.statusLabel}
                    </span>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(volunteer.status)}
                      <span className="font-semibold text-sm text-brand-charcoal">
                        {getStatusText(volunteer.status)}
                      </span>
                    </div>
                  </div>

                  {/* Profile Card */}
                  <div className="p-6 bg-white border border-brand-clay/60 rounded-3xl space-y-4 shadow-sm">
                    <h3 className="font-serif-display text-lg font-bold text-brand-charcoal pb-2 border-b border-brand-clay/30">
                      {t.volunteerDashboard.profileTitle}
                    </h3>
                    <div className="space-y-3.5 text-xs text-brand-muted font-light leading-relaxed">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-saffron shrink-0" />
                        <span className="font-semibold text-brand-charcoal">{volunteer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-brand-saffron shrink-0" />
                        <span>{volunteer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-saffron shrink-0" />
                        <span>{volunteer.phone}</span>
                      </div>
                      <div className="pt-2 border-t border-brand-clay/30 text-[10px]">
                        <span>{lang === 'mr' ? 'नोंदणी दिनांक' : 'Applied on'}: {new Date(volunteer.created_at).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Assigned activities details */}
                <div className="md:col-span-7 bg-white border border-brand-clay/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <h3 className="font-serif-display text-xl font-bold text-brand-charcoal pb-3 border-b border-brand-clay/30">
                    {t.volunteerDashboard.assignedTitle}
                  </h3>

                  {volunteer.status === 'approved' && volunteer.assigned_activity ? (
                    <div className="p-5 bg-brand-sand/35 border border-brand-clay/45 rounded-2xl space-y-4">
                      <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[9px] uppercase tracking-widest text-brand-saffron font-bold">Assigned Drive</span>
                        <h4 className="font-serif-display text-lg font-bold text-brand-charcoal">
                          {volunteer.assigned_activity}
                        </h4>
                      </div>
                      <p className="text-xs text-brand-muted leading-relaxed font-light">
                        {lang === 'mr'
                          ? 'तुम्हाला या सेवाकार्यात स्वयंसेवक म्हणून नियुक्त केले आहे. वस्त्यांमध्ये वाटप नियोजन, वेळ आणि समन्वयाविषयी माहितीसाठी सोलापूर समन्वयक तुमच्याशी संपर्क साधतील.'
                          : 'You are assigned to coordinate this outreach program. The local coordinator will contact you shortly with schedules and cluster allocations.'}
                      </p>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-brand-muted space-y-3">
                      <Calendar className="w-10 h-10 text-brand-clay mx-auto" />
                      <p className="text-xs max-w-xs mx-auto leading-relaxed font-light">
                        {t.volunteerDashboard.noAssignment}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
