'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Heart, Shield, IndianRupee, Loader2, QrCode, UploadCloud, FileImage, Copy, Check } from 'lucide-react';
import { Campaign } from '@/lib/db';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  selectedCampaignId?: string;
  onSuccess: (donationAmount: number, donorName: string, campaignId: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  campaigns,
  selectedCampaignId,
  onSuccess,
}: PaymentModalProps) {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form inputs
  const [campaignId, setCampaignId] = useState('');
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [bankSettings, setBankSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if (d.success) setBankSettings(d.settings);
      })
      .catch(console.error);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selected campaign id
  useEffect(() => {
    if (selectedCampaignId) {
      setCampaignId(selectedCampaignId);
    } else if (campaigns.length > 0 && !campaignId) {
      setCampaignId(campaigns[0].id);
    }
  }, [selectedCampaignId, campaigns, campaignId]);

  if (!isOpen) return null;

  const presetAmounts = ['500', '1000', '2500', '5000'];
  const finalAmount = amount === 'custom' ? customAmount : amount;
  const upiId = bankSettings?.upiId || 'prathanafoundation@sbi';

  const handlePresetSelect = (val: string) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomFocus = () => {
    setAmount('custom');
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshotName(e.target.files[0].name);
    }
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignId) {
      setError('Please select a campaign');
      return;
    }
    const val = Number(finalAmount);
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      setError('Please fill in your name and email');
      return;
    }
    if (!utrNumber.trim()) {
      setError('Please enter the 12-digit UTR/Reference number');
      return;
    }
    if (!screenshotName) {
      setError('Please upload a screenshot of your successful transaction');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate verification API call
    setTimeout(() => {
      setLoading(false);
      onSuccess(val, donorName, campaignId);
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    // Reset states
    setStep('details');
    setError('');
    setUtrNumber('');
    setScreenshotName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-charcoal/80 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white border border-brand-clay/60 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-brand-clay/40 bg-brand-sand/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-yellow fill-brand-yellow/20" />
            <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">
              Make a Direct Donation
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-brand-muted hover:text-brand-forest transition-colors rounded-full hover:bg-brand-sand/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmitVerification} className="space-y-6">
              
              {/* QR Code and UPI Section */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-brand-sand/30 border border-brand-clay/50 rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 bg-white border-2 border-brand-clay rounded-xl flex items-center justify-center p-2 shadow-sm">
                    {/* Placeholder for real QR Code image */}
                    <div className="w-full h-full border-4 border-brand-charcoal border-dashed rounded-lg flex flex-col items-center justify-center text-brand-charcoal/30 relative">
                      <QrCode className="w-10 h-10 mb-1" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-center">Place QR Here</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-brand-muted">
                    Scan with any UPI app
                  </span>
                </div>
                
                <div className="flex-1 space-y-4 w-full text-center md:text-left">
                  <div>
                    <h4 className="font-serif-display text-xl font-bold text-brand-charcoal">{bankSettings?.accountName || 'Prathana Foundation'}</h4>
                    <p className="text-sm text-brand-muted font-light mt-0.5">{bankSettings?.bankName || 'State Bank of India'} - A/C: {bankSettings?.accountNumber || '1234567890'}</p>
                    <p className="text-xs text-brand-muted font-light mt-0.5">IFSC: {bankSettings?.ifscCode || 'SBIN0001234'} ({bankSettings?.branch || 'Solapur Main'})</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted block">Official UPI ID</span>
                    <button 
                      type="button"
                      onClick={copyUpiId}
                      className="flex items-center justify-center md:justify-start gap-2 text-brand-forest font-bold text-base hover:text-brand-yellow transition-colors group w-full"
                    >
                      {upiId}
                      {copiedUpi ? (
                        <Check className="w-4 h-4 text-brand-green" />
                      ) : (
                        <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Amount Presets */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
                  Donation Amount (INR)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePresetSelect(amt)}
                      className={`py-2.5 px-3 border rounded-xl text-sm font-bold tracking-wide transition-all ${
                        amount === amt
                          ? 'bg-brand-yellow border-brand-yellow text-brand-charcoal shadow-sm'
                          : 'border-brand-clay text-brand-charcoal hover:bg-brand-sand/50'
                      }`}
                    >
                      ₹{Number(amt).toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    onFocus={handleCustomFocus}
                    placeholder="Enter custom donation amount"
                    className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-xl text-sm outline-none transition-all ${
                      amount === 'custom'
                        ? 'border-brand-yellow ring-2 ring-brand-yellow/20'
                        : 'border-brand-clay'
                    }`}
                  />
                </div>
              </div>

              {/* Campaign Dropdown */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1.5">
                  Select Campaign
                </label>
                <select
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-brand-clay rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-yellow/10 focus:border-brand-yellow outline-none transition-all"
                >
                  {campaigns.map((camp) => (
                    <option key={camp.id} value={camp.id}>
                      {camp.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    className="w-full px-4 py-2.5 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. anand@outlook.com"
                    className="w-full px-4 py-2.5 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all"
                  />
                </div>
              </div>

              {/* Verification Details: UTR and Screenshot */}
              <div className="pt-4 border-t border-brand-clay/50 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-brand-green" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">Payment Verification</span>
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
                    UTR / Transaction Reference Number
                  </label>
                  <input
                    type="text"
                    required
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 312345678901"
                    className="w-full px-4 py-2.5 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
                    Transaction Screenshot
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-brand-clay/70 rounded-xl flex flex-col items-center justify-center gap-2 text-brand-muted hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all group"
                    >
                      {screenshotName ? (
                        <>
                          <FileImage className="w-6 h-6 text-brand-green" />
                          <span className="text-xs font-bold text-brand-charcoal">{screenshotName}</span>
                          <span className="text-[10px] text-brand-muted group-hover:text-brand-charcoal transition-colors">Click to change file</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-6 h-6 group-hover:text-brand-yellow transition-colors" />
                          <span className="text-xs font-bold group-hover:text-brand-charcoal transition-colors">Upload Screenshot</span>
                          <span className="text-[10px]">PNG, JPG up to 5MB</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold rounded-full text-[13px] tracking-wide transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Verification...
                  </>
                ) : (
                  `Verify Payment of ₹${Number(finalAmount).toLocaleString('en-IN')}`
                )}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Shield className="w-8 h-8 fill-current" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                Thank You, {donorName.split(' ')[0]}!
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed max-w-sm mx-auto">
                Your donation verification of <span className="font-semibold text-brand-forest">₹{Number(finalAmount).toLocaleString('en-IN')}</span> has been submitted successfully. 
              </p>
              
              <div className="p-4 bg-brand-sand/40 border border-brand-clay/70 rounded-xl text-center max-w-sm mx-auto shadow-sm">
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-medium">
                  Our team is reviewing the transaction details. You will receive an official 80G tax receipt on <span className="font-bold text-brand-charcoal">{donorEmail}</span> shortly after verification.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-2.5 bg-brand-charcoal hover:bg-brand-yellow hover:text-brand-charcoal text-white font-bold transition-all rounded-full text-xs tracking-wider uppercase mt-4 shadow-md hover:-translate-y-0.5"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
