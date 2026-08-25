'use client';

import { Campaign } from '@/lib/db';
import { translations } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, CheckCircle, Share2, MessageCircle, Copy, Check, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PaymentModal from '@/components/PaymentModal';

interface Props {
  lang: string;
  campaign: Campaign;
}

export default function CampaignDetailClient({ lang, campaign }: Props) {
  const router = useRouter();
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;
  const isMarathi = lang === 'mr';

  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const goal = Number(campaign.goal_amount);
  const raised = Number(campaign.amount_raised);
  const progressPercent = Math.min(100, Math.round((raised / goal) * 100));
  const isCompleted = campaign.is_completed || campaign.status === 'completed';

  const title = (isMarathi && campaign.title_mr) ? campaign.title_mr : campaign.title;
  const description = (isMarathi && campaign.description_mr) ? campaign.description_mr : campaign.description;
  const content = (isMarathi && campaign.content_mr) ? campaign.content_mr : (campaign.content || description);

  // Generate formatted viral share message
  const getShareMessage = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://prarthanafoundation.org/${lang}/campaigns/${campaign.slug}`;
    const donateUrl = campaign.donate_url || currentUrl;
    const upiLink = campaign.upi_link || 'prarthana@upi';
    const excerptSnippet = description || content.slice(0, 280);

    return `*${title}*\n\n${excerptSnippet}\n\n*Read More:* ${currentUrl}\n\n*Donate Here:* ${donateUrl}\n-------------------------------------\n*Donate via UPI:* ${upiLink}\n-------------------------------------\n*Donations are 100% safe & verified with Prathana Foundation.*\n\nDonations made through this fundraiser will be securely deposited for the cause. 80G tax exemption receipts are issued immediately.\n\n*Indian tax benefits available (80G)*`;
  };

  const handleCopyShare = async () => {
    const text = getShareMessage();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <>
      <main className="min-h-screen bg-brand-paper pb-24 pt-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Back button */}
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-brand-muted hover:text-brand-saffron transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isMarathi ? 'मागे जा' : 'Back to Campaigns'}
          </button>

          {/* Header Section */}
          <header className="space-y-6 text-center md:text-left">
            <span className="section-label">
              {isCompleted ? (isMarathi ? 'पूर्ण मोहीम' : 'Completed Campaign') : (isMarathi ? 'सक्रिय मोहीम' : 'Active Campaign')}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight">
              {title}
            </h1>
          </header>

          {/* Cover Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[40px_10px_40px_10px] overflow-hidden shadow-xl border-4 border-white relative"
          >
            <img src={campaign.image} alt={title} className="w-full h-full object-cover editorial-img" />
            
            {/* Status Badge */}
            {isCompleted ? (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                <CheckCircle className="w-4 h-4" />
                {isMarathi ? 'उद्दिष्ट साध्य' : 'Goal Achieved'}
              </div>
            ) : (
              <div className="absolute top-6 right-6 bg-brand-yellow text-brand-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                {progressPercent}% {isMarathi ? 'पूर्ण' : 'Funded'}
              </div>
            )}
          </motion.div>

          {/* Main Content & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (Rich Text) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg prose-olive max-w-none">
                <p className="text-xl font-serif-display leading-relaxed text-brand-charcoal">
                  {description}
                </p>
                <div className="w-12 h-1 bg-brand-yellow my-8 rounded-full" />
                
                {/* Format content with basic paragraph splitting */}
                <div className="space-y-6 text-brand-muted font-light leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              </div>

              {/* ── Share Campaign Block ── */}
              <div className="p-6 bg-white border border-brand-clay/40 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-brand-forest" />
                    <h4 className="font-serif-display text-lg font-bold text-brand-charcoal">
                      {isMarathi ? 'ही मोहीम मित्रांसोबत शेअर करा' : 'Spread The Word'}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-green">
                    80G Tax Benefit
                  </span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {isMarathi
                    ? 'आपला एक शेअर गरजू बालके व वृद्धांचे आयुष्य वाचवू शकतो.'
                    : 'Every share brings us closer to fulfilling our mission. Share on WhatsApp or copy the formatted message.'}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex-1 min-w-[160px] py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    {isMarathi ? 'व्हॉट्सॲपवर शेअर करा' : 'Share on WhatsApp'}
                  </button>

                  <button
                    onClick={handleCopyShare}
                    className="py-3 px-5 bg-brand-sand hover:bg-brand-clay/30 text-brand-charcoal font-bold text-xs rounded-2xl flex items-center justify-center gap-2 border border-brand-clay/40 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4" />}
                    {copied ? (isMarathi ? 'कॉपी झाले!' : 'Copied to Clipboard!') : (isMarathi ? 'मेसेज कॉपी करा' : 'Copy Formatted Text')}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar (Donation Panel) */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 premium-card rounded-3xl p-8 space-y-8 shadow-xl bg-white border border-brand-clay/40">
                
                {/* Stats */}
                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">
                      {isMarathi ? 'उद्दिष्ट' : 'Goal'}
                    </span>
                    <span className="font-mono text-3xl text-brand-charcoal font-bold">
                      ₹{goal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="w-full h-2.5 bg-brand-clay/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${isCompleted ? 'bg-brand-green' : 'bg-brand-yellow'}`}
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">
                      {isMarathi ? 'जमा निधी' : 'Raised'}
                    </span>
                    <span className="font-mono text-xl text-brand-green font-bold">
                      ₹{raised.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Donate Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    disabled={isCompleted}
                    className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                      isCompleted
                        ? 'bg-brand-sand border-2 border-brand-clay text-brand-muted cursor-not-allowed shadow-none'
                        : 'bg-brand-forest text-white hover:bg-brand-forest/90 hover:-translate-y-0.5'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isCompleted ? '' : 'text-brand-yellow fill-current'}`} />
                    {isCompleted ? (isMarathi ? 'मोहीम पूर्ण झाली' : 'Campaign Closed') : t.donation.donateBtn}
                  </button>

                  {campaign.donate_url && (
                    <a
                      href={campaign.donate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-full font-semibold text-xs text-brand-charcoal bg-amber-50 hover:bg-amber-100 border border-amber-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                      {isMarathi ? 'पर्यायी दान लिंक (ImpactGuru/इतर)' : 'Donate via Partner Fundraiser'}
                    </a>
                  )}

                  {campaign.upi_link && (
                    <div className="pt-2 text-center">
                      <span className="text-[11px] text-brand-muted block font-mono">
                        UPI: <strong className="text-brand-forest select-all">{campaign.upi_link}</strong>
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-brand-clay/30 flex items-center gap-2 text-[11px] text-brand-muted">
                  <ShieldCheck className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>{isMarathi ? '८०जी कर सवलत प्रमाणपत्र तात्काळ उपलब्ध' : '80G Tax Exemption Instant Certificate'}</span>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <PaymentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        campaigns={[campaign]} 
        selectedCampaignId={campaign.id} 
        onSuccess={() => setModalOpen(false)}
      />
    </>
  );
}
