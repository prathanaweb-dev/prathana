'use client';

import { useState } from 'react';
import { Send, HeartHandshake, MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import { translations } from '@/lib/translations';

interface VolunteerFormProps {
  lang: string;
}

export default function VolunteerForm({ lang }: VolunteerFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'education',
    availability: 'weekends',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use translations if available, fallback to hardcoded if not entirely mapped
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  // If t.volunteer doesn't have all these fields, we will just use inline translations for robustness
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        interest: 'education',
        availability: 'weekends',
        message: ''
      });
    }, 1500);
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 md:px-12 py-12">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-brand-saffron/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Side: Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/20 text-brand-saffron mb-2">
              <HeartHandshake className="w-6 h-6" />
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-brand-charcoal leading-tight">
              {lang === 'mr' ? 'स्वयंसेवक बना' : 'Become a Volunteer'}
            </h1>
            <div className="w-12 h-1.5 bg-brand-yellow rounded-full" />
            <p className="text-brand-muted text-lg font-light leading-relaxed">
              {lang === 'mr' 
                ? 'प्रार्थना फाउंडेशनच्या मोहिमेत सामील व्हा आणि सोलापूरमधील गरजू मुलांच्या जीवनात सकारात्मक बदल घडवून आणा.' 
                : 'Join Prathana Foundation’s mission and bring a positive change to the lives of underprivileged children in Solapur.'}
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-brand-clay/30">
            <h3 className="text-sm uppercase tracking-widest font-bold text-brand-charcoal">
              {lang === 'mr' ? 'स्वयंसेवकांची भूमिका' : 'Volunteer Roles'}
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white p-2 rounded-lg shadow-sm border border-brand-clay/30 text-brand-saffron">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-charcoal text-sm">{lang === 'mr' ? 'क्षेत्रीय कार्य (Field Work)' : 'Field Operations'}</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {lang === 'mr' ? 'शाळांमध्ये किट वाटप, अन्नदान आणि आरोग्य शिबिरांमध्ये मदत.' : 'Assisting in school kit distribution, food drives, and health camps.'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white p-2 rounded-lg shadow-sm border border-brand-clay/30 text-brand-green">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-charcoal text-sm">{lang === 'mr' ? 'कार्यक्रम व्यवस्थापन (Event Management)' : 'Event Management'}</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {lang === 'mr' ? 'फंडरेझिंग आणि जागरूकता कार्यक्रमांचे आयोजन करणे.' : 'Organizing fundraising campaigns and awareness events.'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white p-2 rounded-lg shadow-sm border border-brand-clay/30 text-blue-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-charcoal text-sm">{lang === 'mr' ? 'लवचिक वेळ (Flexible Timings)' : 'Flexible Timings'}</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {lang === 'mr' ? 'फक्त आठवड्याच्या शेवटी किंवा तुमच्या उपलब्धतेनुसार वेळ द्या.' : 'Commit time only on weekends or as per your availability.'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <div className="premium-card bg-white/80 backdrop-blur-xl border border-brand-clay/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Inner subtle pattern */}
            <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-5 mix-blend-multiply pointer-events-none" />
            
            <h2 className="font-serif-display text-2xl font-bold text-brand-charcoal mb-6 relative z-10">
              {lang === 'mr' ? 'स्वयंसेवक नोंदणी फॉर्म' : 'Registration Form'}
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 relative z-10">
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-2">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {lang === 'mr' ? 'धन्यवाद!' : 'Thank You!'}
                </h3>
                <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
                  {lang === 'mr' 
                    ? 'तुमचा अर्ज आम्हाला मिळाला आहे. आमची टीम लवकरच तुमच्याशी संपर्क साधेल.' 
                    : 'We have received your application. Our coordinator will reach out to you shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-brand-paper border border-brand-clay hover:border-brand-yellow rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {lang === 'mr' ? 'नवीन अर्ज करा' : 'Submit Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold">
                      {lang === 'mr' ? 'पूर्ण नाव' : 'Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. रमेश पुजारी' : 'e.g. Ramesh Pujari'}
                      className="w-full px-4 py-3 bg-brand-paper/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold">
                      {lang === 'mr' ? 'ईमेल' : 'Email Address'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-brand-paper/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold">
                      {lang === 'mr' ? 'फोन नंबर' : 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 bg-brand-paper/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold">
                      {lang === 'mr' ? 'उपलब्धता' : 'Availability'}
                    </label>
                    <select
                      value={formState.availability}
                      onChange={(e) => setFormState({ ...formState, availability: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-paper/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all duration-300 appearance-none"
                    >
                      <option value="weekends">{lang === 'mr' ? 'शनिवार आणि रविवार' : 'Weekends Only'}</option>
                      <option value="weekdays">{lang === 'mr' ? 'आठवड्याचे दिवस' : 'Weekdays'}</option>
                      <option value="anytime">{lang === 'mr' ? 'कधीही' : 'Anytime'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold">
                    {lang === 'mr' ? 'आवडीचे क्षेत्र' : 'Area of Interest'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'education', label: lang === 'mr' ? 'शिक्षण' : 'Education' },
                      { id: 'health', label: lang === 'mr' ? 'आरोग्य' : 'Healthcare' },
                      { id: 'food', label: lang === 'mr' ? 'अन्नवाटप' : 'Food Drives' },
                      { id: 'events', label: lang === 'mr' ? 'कार्यक्रम' : 'Events' },
                      { id: 'fundraising', label: lang === 'mr' ? 'निधी संकलन' : 'Fundraising' },
                      { id: 'other', label: lang === 'mr' ? 'इतर' : 'Other' },
                    ].map(interest => (
                      <label 
                        key={interest.id} 
                        className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${formState.interest === interest.id ? 'bg-brand-yellow/10 border-brand-yellow text-brand-charcoal font-bold shadow-sm' : 'bg-brand-paper/30 border-brand-clay/60 hover:bg-white text-brand-muted hover:text-brand-charcoal'}`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={interest.id}
                          checked={formState.interest === interest.id}
                          onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                          className="sr-only"
                        />
                        <span className="text-xs text-center">{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold">
                    {lang === 'mr' ? 'तुमच्याबद्दल थोडक्यात सांगा (ऐच्छिक)' : 'Tell us about yourself (Optional)'}
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={lang === 'mr' 
                      ? 'तुम्हाला आमच्यासोबत काम का करायचे आहे?' 
                      : 'Why would you like to volunteer with us? Any past experience?'}
                    className="w-full px-4 py-3 bg-brand-paper/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-charcoal hover:bg-brand-yellow text-white hover:text-brand-charcoal font-bold rounded-xl text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-charcoal/20 hover:shadow-brand-yellow/30 hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {lang === 'mr' ? 'अर्ज पाठवत आहे...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {lang === 'mr' ? 'अर्ज सबमिट करा' : 'Submit Application'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
