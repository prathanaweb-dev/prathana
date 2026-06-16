'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate contact form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormState({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-32 bg-brand-sand/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="section-label">
            Get In Touch
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
            Connect With Us.
          </h2>
          <div className="accent-line" />
          <p className="text-brand-muted text-sm md:text-base font-light max-w-xl leading-relaxed">
            Have questions about fund utilization, wish to coordinate field volunteering, or want to sponsor a child offline? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Form — LEFT */}
          <div className="lg:col-span-7 bg-white border border-brand-clay rounded-2xl p-6 md:p-8">
            <h4 className="font-serif-display text-xl font-bold text-brand-charcoal mb-6">
              Write a Message
            </h4>

            {submitted ? (
              <div className="p-6 bg-brand-sand/50 border border-brand-clay rounded-xl text-center space-y-3">
                <span className="block text-xl">🙏</span>
                <h5 className="font-serif-display font-bold text-brand-charcoal">
                  Message Logged Successfully
                </h5>
                <p className="text-xs text-brand-muted max-w-xs mx-auto">
                  Thank you for writing to Prarthana Foundation. Our local Solapur desk coordinator will revert back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-brand-saffron hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Ramesh Pujari"
                      className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How can we help? Tell us if you are enquiring about sponsorship, tax receipts, or volunteering..."
                    className="w-full px-4 py-3 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/10 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-saffron hover:bg-brand-charcoal text-white rounded-full font-semibold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    'Transmitting Message...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Transmit Message
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
                    Office Address
                  </span>
                  <p className="text-xs md:text-sm text-brand-charcoal leading-relaxed font-light mt-0.5">
                    102, Shanti Nilayam, Gold Finch Peth, <br />
                    Solapur, Maharashtra - 413007
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-paper border border-brand-clay/60 flex items-center justify-center text-brand-saffron flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                    Email Queries
                  </span>
                  <a
                    href="mailto:contact@prarthanafoundation.org"
                    className="text-xs md:text-sm text-brand-charcoal hover:underline mt-0.5 block"
                  >
                    contact@prarthanafoundation.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-paper border border-brand-clay/60 flex items-center justify-center text-brand-saffron flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold">
                    WhatsApp Coordinator
                  </span>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Prarthana%20Foundation%20Solapur"
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
            <div className="p-5 bg-brand-sand/35 border border-brand-clay/70 rounded-2xl space-y-3">
              <h4 className="font-serif-display font-bold text-brand-charcoal">
                Join Field Operations
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                We organize weekend meals preparation, school kit packaging, and community medicine drives in Solapur slums.
              </p>
              <a
                href="https://wa.me/919876543210?text=I%20want%20to%20volunteer%20with%20Prarthana%20Foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-brand-charcoal hover:bg-brand-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300"
              >
                Apply as Volunteer
              </a>
            </div>

            {/* Static map placeholder */}
            <div className="h-40 border border-brand-clay rounded-2xl overflow-hidden bg-brand-sand relative shadow-inner">
              {/* Map grid overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1c1a17_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                <MapPin className="w-7 h-7 text-brand-saffron animate-bounce mb-2" />
                <span className="block text-xs font-bold text-brand-charcoal uppercase">
                  Gold Finch Peth, Solapur
                </span>
                <span className="block text-[10px] text-brand-muted font-light mt-0.5">
                  Click to open in Google Maps
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
