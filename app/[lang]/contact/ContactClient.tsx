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
              <div className="bg-brand-charcoal text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden h-full">
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
                        {isMr ? '६४/१ लोकमंगल साखर कारखाना रोड, मोरवंची,' : '64/1 Lokmangal Sugar Factory Road, Morvanchi,'}<br />
                        {isMr ? 'ता. मोहोळ जि. सोलापूर, ४१३२१३' : 'Taluka Mohol, Dist. Solapur, 413213'}
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
                        +91 95459 92026<br />
                        +91 90490 63829<br />
                        +91 90223 93906
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
                  <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                    <a href="https://facebook.com/prathanafoundation" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-yellow transition-colors" title="Facebook">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://youtube.com/prathanafoundation" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-yellow transition-colors" title="YouTube">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://instagram.com/prathanafoundation" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-yellow transition-colors" title="Instagram">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Campus Photo Card */}
                <div className="relative mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                  <div className="h-40 w-full bg-black/40">
                    <img
                      src="https://res.cloudinary.com/djoklzpse/image/upload/v1786951863/prathana/blob_wkqr0a.jpg"
                      alt="Prathana Balgram Campus in Morvanchi, Solapur"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-yellow">
                      {isMr ? 'मोरवंची कॅम्पस, सोलापूर' : 'Morvanchi Campus, Solapur'}
                    </span>
                    <p className="text-[11px] text-white/80 font-light mt-0.5 leading-tight">
                      {isMr ? 'बालग्राम, वृद्धाश्रम व सेंद्रिय शेती संकुल' : 'Balgram, Old Age Sanctuary & Organic Farm'}
                    </p>
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
