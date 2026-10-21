'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, FileText } from 'lucide-react';

interface DonateSupportProps {
  lang: string;
  onDonateClick: (campaignId?: string) => void;
  classroomImage?: string;
  smileImage?: string;
}

export default function DonateSupport({ lang, onDonateClick, classroomImage, smileImage }: DonateSupportProps) {
  const [tab, setTab] = useState<'monthly' | 'onetime'>('onetime');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');

  const isMarathi = lang === 'mr';

  const tLocal = {
    title: isMarathi ? 'प्रार्थना बालग्राम आणि वृद्धाश्रमास सहाय्य करा' : 'Support Prathana Balgram & Old Age Home',
    sub: isMarathi 
      ? 'आपली देणगी मोरवंची (सोलापूर) येथील ४५ बालके व २५ वृद्धांच्या निवास, पोषण आहार, औषधोपचार व शिक्षणासाठी थेट वापरली जाते. सर्व देणग्यांवर कलम ८०जी कर सवलत पावती मिळते.' 
      : 'Your contribution directly supports residential care, nutritious meals, healthcare, and education for 45 children and 25 senior citizens in Morvanchi, Solapur. 80G Tax Exemption receipts provided.',
    tabMonthly: isMarathi ? 'मासिक देणगी' : 'Monthly Support',
    tabOnetime: isMarathi ? 'एकदाच देणगी' : 'One-Time Donation',
    btnDonate: isMarathi ? 'आता मदत करा' : 'Donate Securely Now',
    customPlaceholder: isMarathi ? 'इतर रक्कम प्रविष्ट करा' : 'Enter custom amount',
    feature1: isMarathi ? 'विश्वासू संस्था (नोंदणीकृत २०१८)' : 'Registered Public Trust (Est. 2018)',
    feature2: isMarathi ? 'कलम ८०जी कर सवलत पावती' : 'Section 80G Tax Exemption Receipts',
  };

  const quickAmounts = [500, 1000, 5000];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleDonateSubmit = () => {
    // Open payment modal
    onDonateClick();
  };

  return (
    <section className="py-24 bg-brand-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Classroom Collage */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[40px_10px_40px_10px] overflow-hidden border-8 border-brand-yellow/10 bg-brand-charcoal shadow-xl">
            <img
              src={classroomImage || '/classroom-students.jpg'}
              alt="Classroom students learning"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 to-transparent" />
          </div>

          {/* Overlapping small image bottom-right */}
          <div className="absolute -bottom-6 -right-6 w-44 sm:w-52 aspect-square rounded-2xl overflow-hidden border-8 border-brand-paper shadow-2xl z-10 hidden sm:block">
            <img
              src={smileImage || '/outreach-smile.jpg'}
              alt="Outreach nutrition drive smile"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Yellow decorative accent dot */}
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-saffron">
            <span className="w-4 h-4 rounded-full bg-brand-yellow" />
          </div>
        </div>

        {/* Right Column: Donation Form */}
        <div className="lg:col-span-6 space-y-8 text-left z-10">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-widest font-bold text-brand-saffron">
              {isMarathi ? 'थेट मदत करा' : 'Donate Support'}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal leading-tight">
              {tLocal.title}
            </h2>
            <div className="w-12 h-[2px] bg-brand-yellow" />
            <p className="text-brand-muted text-sm leading-relaxed font-light">
              {tLocal.sub}
            </p>
          </div>

          {/* Monthly vs One-Time Tabs */}
          <div className="flex border border-brand-clay/35 rounded-full p-1 max-w-xs bg-white shadow-sm">
            <button
              onClick={() => setTab('onetime')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all duration-300 ${
                tab === 'onetime' ? 'bg-brand-green text-white shadow-sm' : 'text-brand-muted hover:text-brand-charcoal'
              }`}
            >
              {tLocal.tabOnetime}
            </button>
            <button
              onClick={() => setTab('monthly')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all duration-300 ${
                tab === 'monthly' ? 'bg-brand-green text-white shadow-sm' : 'text-brand-muted hover:text-brand-charcoal'
              }`}
            >
              {tLocal.tabMonthly}
            </button>
          </div>

          {/* Amount selection grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleAmountSelect(amt)}
                  className={`py-3 rounded-2xl font-mono text-sm font-bold border transition-all duration-300 ${
                    amount === amt && !customAmount
                      ? 'bg-brand-yellow text-brand-charcoal border-brand-yellow shadow-md'
                      : 'bg-white border-brand-clay/40 text-brand-charcoal hover:border-brand-yellow'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
              
              {/* Custom amount field */}
              <div className="col-span-1">
                <input
                  type="number"
                  placeholder={isMarathi ? 'इतर' : 'Custom'}
                  value={customAmount}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className={`w-full py-3 px-3 rounded-2xl font-mono text-sm text-center border font-bold bg-white focus:outline-none transition-all duration-300 ${
                    customAmount
                      ? 'border-brand-yellow ring-2 ring-brand-yellow/20'
                      : 'border-brand-clay/40 focus:border-brand-yellow'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Info Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-muted font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
              <span>{tLocal.feature1}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-green shrink-0" />
              <span>{tLocal.feature2}</span>
            </div>
          </div>

          {/* Donate Button */}
          <div className="pt-2">
            <button
              onClick={handleDonateSubmit}
              className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-extrabold px-10 py-4 text-[14px] tracking-wide flex items-center gap-2 shadow-[0_4px_16px_rgba(247,195,36,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>{tLocal.btnDonate}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
