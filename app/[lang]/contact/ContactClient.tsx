'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactClient({ lang }: { lang: string }) {
  const isMr = lang === 'mr';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const t = {
    label: isMr ? 'संपर्क' : 'Contact Us',
    title: isMr ? 'आमच्याशी संपर्क साधा' : 'Get In Touch',
    desc: isMr 
      ? 'काही प्रश्न आहेत किंवा मदत करायची आहे? आम्हाला तुमचा संदेश पाठवा.' 
      : 'Have questions or want to help? We\'d love to hear from you.',
    info: isMr ? 'संपर्क माहिती' : 'Contact Information',
    formLabel: isMr ? 'संदेश पाठवा' : 'Send a Message',
    fields: {
      name: isMr ? 'पूर्ण नाव' : 'Full Name',
      email: isMr ? 'ईमेल पत्ता' : 'Email Address',
      phone: isMr ? 'फोन नंबर' : 'Phone Number',
      subject: isMr ? 'विषय' : 'Subject',
      message: isMr ? 'तुमचा संदेश' : 'Your Message',
      btn: isMr ? 'संदेश पाठवा' : 'Send Message',
      btnSending: isMr ? 'पाठवत आहे...' : 'Sending...',
    },
    successTitle: isMr ? 'संदेश प्राप्त झाला!' : 'Message Received!',
    successDesc: isMr ? 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद. आम्ही लवकरच तुमच्याशी संपर्क करू.' : 'Thank you for reaching out. We will get back to you shortly.'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to send message');
      
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl text-left"
          >
            <span className="section-label">{t.label}</span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
              {t.title}
            </h1>
            <div className="accent-line" />
            <p className="text-base text-brand-muted font-light leading-relaxed">
              {t.desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="bg-brand-charcoal text-white p-8 md:p-10 rounded-3xl premium-card relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-forest/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <h3 className="font-serif-display text-2xl font-bold mb-8 relative z-10">{t.info}</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-yellow">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Address</h4>
                      <p className="font-light text-white/90 leading-relaxed text-sm">
                        Prathana Foundation,<br />
                        Near City Hospital, Station Road,<br />
                        Pune, Maharashtra 411001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-yellow">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Phone</h4>
                      <p className="font-light text-white/90 leading-relaxed text-sm">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-yellow">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Email</h4>
                      <p className="font-light text-white/90 leading-relaxed text-sm break-all">
                        contact@prathanafoundation.org
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-brand-clay/60 shadow-sm relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 z-20"
                    >
                      <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="font-serif-display text-3xl font-bold text-brand-charcoal mb-4">{t.successTitle}</h3>
                      <p className="text-brand-muted max-w-sm mx-auto leading-relaxed">{t.successDesc}</p>
                      <button 
                        onClick={() => setSuccess(false)}
                        className="mt-8 px-6 py-2 border border-brand-clay text-brand-muted text-sm font-bold tracking-widest uppercase rounded-full hover:bg-brand-sand transition-colors"
                      >
                        {isMr ? 'नवीन संदेश पाठवा' : 'Send Another'}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6 relative z-10"
                    >
                      <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal mb-8 border-b border-brand-clay/50 pb-4">
                        {t.formLabel}
                      </h3>
                      
                      {error && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">{t.fields.name} *</label>
                          <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-brand-sand/50 border border-brand-clay rounded-xl px-4 py-3 text-sm text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">{t.fields.email} *</label>
                          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-brand-sand/50 border border-brand-clay rounded-xl px-4 py-3 text-sm text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:bg-white transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">{t.fields.phone} *</label>
                          <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-brand-sand/50 border border-brand-clay rounded-xl px-4 py-3 text-sm text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">{t.fields.subject}</label>
                          <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-brand-sand/50 border border-brand-clay rounded-xl px-4 py-3 text-sm text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:bg-white transition-all" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">{t.fields.message} *</label>
                        <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-brand-sand/50 border border-brand-clay rounded-xl px-4 py-3 text-sm text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:bg-white transition-all resize-none" />
                      </div>

                      <button disabled={loading} type="submit" className="w-full py-4 bg-brand-charcoal text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-brand-forest transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? t.fields.btnSending : t.fields.btn}
                        {!loading && <Send size={16} />}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
