'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useTranslations } from '@/components/TranslationProvider';

interface ContactProps {
  lang: string;
}

export default function Contact({ lang }: ContactProps) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = useTranslations((lang === 'mr' ? 'mr' : 'en') as 'en'|'mr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Trigger mailto link as backend fallback
    setTimeout(() => {
      window.location.href = `mailto:contact@prathanafoundation.org?subject=Website Contact: ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0A--%0AFrom: ${formState.name}%0AEmail: ${formState.email}`;
      setSubmitted(true);
      setLoading(false);
      setFormState({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-32 bg-brand-paper bg-grid-pattern relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-saffron/4 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-green/4 rounded-full blur-[100px] pointer-events-none animate-drift" style={{ animationDelay: '-2.5s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="section-label">
            {lang === 'mr' ? 'संपर्क साधा' : 'Get In Touch'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
            {lang === 'mr' ? 'आमच्याशी जोडून घ्या.' : 'Connect With Us.'}
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base font-light max-w-xl leading-relaxed">
            {lang === 'mr'
              ? 'निधीचा वापर, स्वयंसेवा किंवा इतर माहितीसाठी आम्हाला थेट संदेश पाठवू शकता. आमची टीम २४ तासांच्या आत उत्तर देईल.'
              : 'Have questions about fund utilization, wish to coordinate field volunteering, or want to sponsor a child offline? Send us a message.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Form — LEFT */}
          <div className="lg:col-span-7 premium-card rounded-2xl p-6 md:p-8 shadow-lg">
            <h4 className="font-serif-display text-xl font-bold text-brand-charcoal mb-6">
              {lang === 'mr' ? 'संदेश पाठवा' : 'Write a Message'}
            </h4>

            {submitted ? (
              <div className="p-6 bg-brand-sand/50 border border-brand-clay rounded-xl text-center space-y-3">
                <span className="block text-xl">🙏</span>
                <h5 className="font-serif-display font-bold text-brand-charcoal">
                  {lang === 'mr' ? 'संदेश यशस्वीरित्या प्राप्त झाला' : 'Message Logged Successfully'}
                </h5>
                <p className="text-xs text-brand-muted max-w-xs mx-auto font-light leading-relaxed">
                  {lang === 'mr'
                    ? 'प्रार्थना फाउंडेशनशी संपर्क साधल्याबद्दल धन्यवाद. आमचे सोलापूरचे समन्वयक २४ तासांच्या आत तुमच्याशी संपर्क साधतील.'
                    : 'Thank you for writing to Prathana Foundation. Our local Solapur desk coordinator will revert back to you within 24 hours.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-brand-saffron hover:underline"
                >
                  {lang === 'mr' ? 'आणखी एक संदेश पाठवा' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      {t.volunteer.fields.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. रमेश पुजारी' : 'e.g. Ramesh Pujari'}
                      className="w-full px-4 py-3 bg-white/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      {t.volunteer.fields.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. ramesh@gmail.com' : 'e.g. ramesh@gmail.com'}
                      className="w-full px-4 py-3 bg-white/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                    {lang === 'mr' ? 'तुमचा संदेश' : 'Your Message'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={lang === 'mr' 
                      ? 'आम्ही तुमची काय मदत करू शकतो? स्वयंसेवा, देणगी पावती किंवा प्रायोजकत्वाविषयी माहिती येथे लिहा...' 
                      : 'How can we help? Tell us if you are enquiring about sponsorship, tax receipts, or volunteering...'}
                    className="w-full px-4 py-3 bg-white/50 border border-brand-clay/70 rounded-xl text-sm outline-none focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/5 transition-all duration-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold rounded-full text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-md"
                >
                  {loading ? (
                    lang === 'mr' ? 'संदेश पाठवला जात आहे...' : 'Transmitting Message...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      {lang === 'mr' ? 'संदेश पाठवा' : 'Transmit Message'}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info — RIGHT */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-6">

            {/* Contact details */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-paper border border-brand-clay/60 flex items-center justify-center text-brand-saffron flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                    {lang === 'mr' ? 'कार्यालय पत्ता' : 'Office Address'}
                  </span>
                  <p className="text-xs md:text-sm text-brand-charcoal leading-relaxed font-light mt-0.5">
                    {lang === 'mr'
                      ? '१०२, शांती निलयम, गोल्ड फिंच पेठ, सोलापूर, महाराष्ट्र - ४१३००७'
                      : '102, Shanti Nilayam, Gold Finch Peth, Solapur, Maharashtra - 413007'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-paper border border-brand-clay/60 flex items-center justify-center text-brand-saffron flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                    {lang === 'mr' ? 'ईमेल चौकशी' : 'Email Queries'}
                  </span>
                  <a
                    href="mailto:contact@prathanafoundation.org"
                    className="text-xs md:text-sm text-brand-charcoal hover:underline mt-0.5 block"
                  >
                    contact@prathanafoundation.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-paper border border-brand-clay/60 flex items-center justify-center text-brand-saffron flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                    {lang === 'mr' ? 'व्हाट्सएप समन्वयक' : 'WhatsApp Coordinator'}
                  </span>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Prathana%20Foundation%20Solapur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-brand-charcoal hover:underline mt-0.5 flex items-center gap-1.5 font-medium"
                  >
                    <MessageSquare className="w-4 h-4 text-green-600 fill-green-600/10" />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Volunteer CTA */}
            <div className="p-5 bg-brand-sand/30 border border-brand-clay/60 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-serif-display font-bold text-brand-charcoal">
                {lang === 'mr' ? 'थेट कामात सहभागी व्हा' : 'Join Field Operations'}
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                {lang === 'mr'
                  ? 'आम्ही दर शनिवारी-रविवारी अन्न शिजवणे, पॅकिंग आणि सोलापूरच्या वस्त्यांमध्ये वाटप करण्याचे उपक्रम राबवतो.'
                  : 'We organize weekend meals preparation, school kit packaging, and community medicine drives in Solapur slums.'}
              </p>
              <a
                href={`/${lang}/volunteer`}
                className="inline-block px-5 py-2.5 bg-brand-charcoal hover:bg-brand-yellow hover:text-brand-charcoal text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm"
              >
                {lang === 'mr' ? 'स्वयंसेवक म्हणून अर्ज करा' : 'Apply as Volunteer'}
              </a>
            </div>

            {/* Static map placeholder */}
            <div className="h-40 border border-brand-clay rounded-2xl overflow-hidden bg-brand-sand relative shadow-inner">
              {/* Map grid overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1c1a17_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                <MapPin className="w-7 h-7 text-brand-saffron animate-bounce mb-2" />
                <span className="block text-xs font-bold text-brand-charcoal uppercase">
                  {lang === 'mr' ? 'गोल्ड फिंच पेठ, सोलापूर' : 'Gold Finch Peth, Solapur'}
                </span>
                <span className="block text-[10px] text-brand-muted font-light mt-0.5">
                  {lang === 'mr' ? 'गुगल मॅपवर पाहण्यासाठी क्लिक करा' : 'Click to open in Google Maps'}
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Gold+Finch+Peth+Solapur"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
