'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { translations } from '@/lib/translations';
import { useParams, useRouter } from 'next/navigation';

export default function VolunteerRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = [
    { id: 'nutrition', label: t.volunteer.interestOptions.nutrition },
    { id: 'education', label: t.volunteer.interestOptions.education },
    { id: 'healthcare', label: t.volunteer.interestOptions.healthcare },
    { id: 'admin', label: t.volunteer.interestOptions.admin },
  ];

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (selectedInterests.length === 0) {
      setError(lang === 'mr' ? 'कृपया आवडीचे किमान एक क्षेत्र निवडा' : 'Please select at least one area of interest');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          city,
          occupation,
          interests: selectedInterests.join(', '),
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');

      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setCity('');
      setOccupation('');
      setSelectedInterests([]);
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Editorial intro */}
          <div className="lg:col-span-5 space-y-6">
            <span className="section-label">{t.volunteer.label}</span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
              {t.volunteer.title}
            </h1>
            <div className="accent-line" />
            
            <p className="text-brand-muted text-base font-light leading-relaxed">
              {t.volunteer.desc}
            </p>

            <div className="p-6 bg-brand-sand/50 border border-brand-clay/55 rounded-2xl space-y-4">
              <h4 className="font-serif-display font-bold text-brand-charcoal">
                {t.volunteer.portalLink}
              </h4>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                {t.volunteer.portalDesc}
              </p>
              <button
                onClick={() => router.push(`/${lang}/volunteer/dashboard`)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-forest hover:text-brand-yellow transition-colors font-mono"
              >
                <span>{lang === 'mr' ? 'स्वयंसेवक लॉगिन' : 'Volunteer Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Form card */}
          <div className="lg:col-span-7 bg-white border border-brand-clay/60 rounded-3xl p-6 md:p-10 shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-brand-green/15 rounded-full flex items-center justify-center mx-auto text-brand-green">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {t.volunteer.successTitle}
                </h3>
                <p className="text-sm text-brand-muted font-light max-w-sm mx-auto leading-relaxed">
                  {t.volunteer.successDesc}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-6 shadow-md hover:-translate-y-0.5"
                >
                  {t.volunteer.anotherBtn}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif-display text-xl font-bold text-brand-charcoal">
                  {t.volunteer.formTitle}
                </h3>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      {t.volunteer.fields.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ramesh Pujari"
                      className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all text-brand-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      {t.volunteer.fields.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      {t.volunteer.fields.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@gmail.com"
                      className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all text-brand-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      {t.volunteer.fields.city}
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Solapur"
                      className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all text-brand-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                    {t.volunteer.fields.occupation}
                  </label>
                  <input
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="Student / Teacher / Professional"
                    className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all text-brand-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-3">
                    {t.volunteer.fields.interests}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {interestOptions.map((opt) => {
                      const isSelected = selectedInterests.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleInterestToggle(opt.id)}
                          className={`flex items-center justify-between px-4 py-3 border rounded-xl text-xs font-semibold text-left transition-colors ${
                            isSelected
                              ? 'bg-brand-yellow/15 border-brand-yellow text-brand-charcoal'
                              : 'bg-transparent border-brand-clay hover:bg-brand-sand/20 text-brand-charcoal'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border border-brand-clay flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-brand-yellow border-brand-yellow' : 'bg-transparent'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                    {t.volunteer.fields.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about yourself and how you would like to help..."
                    className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all text-brand-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold rounded-full text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
                >
                  {loading ? (
                    t.volunteer.submitting
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      {t.volunteer.submitBtn}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
