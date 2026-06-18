'use client';

import { useState, useEffect } from 'react';
import { X, Heart, Shield, CheckCircle, IndianRupee, Loader2 } from 'lucide-react';
import { isFirebaseConfigured, Campaign } from '@/lib/db';

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
  const [step, setStep] = useState<'details' | 'simulating' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form inputs
  const [campaignId, setCampaignId] = useState('');
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  // Payment mock tracking
  const [mockPaymentDetails, setMockPaymentDetails] = useState<{
    orderId: string;
    amount: number;
    campaignId: string;
  } | null>(null);

  // Sync selected campaign id
  useEffect(() => {
    if (selectedCampaignId) {
      setCampaignId(selectedCampaignId);
    } else if (campaigns.length > 0 && !campaignId) {
      setCampaignId(campaigns[0].id);
    }
  }, [selectedCampaignId, campaigns, campaignId]);

  // Load Razorpay Checkout SDK dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen) return null;

  const presetAmounts = ['500', '1000', '2500', '5000'];
  const finalAmount = amount === 'custom' ? customAmount : amount;
  const currentCampaign = campaigns.find((c) => c.id === campaignId);

  const handlePresetSelect = (val: string) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomFocus = () => {
    setAmount('custom');
  };

  const handlePaymentInit = async (e: React.FormEvent) => {
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

    setError('');
    setLoading(true);

    try {
      // 1. Create order on server
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: val,
          campaignId,
          donorName,
          donorEmail,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to initialize payment');

      // 2. Route based on sandbox/production
      if (orderData.mock) {
        // Run mock simulation flow
        setMockPaymentDetails({
          orderId: orderData.orderId,
          amount: val,
          campaignId,
        });
        setLoading(false);
        setStep('simulating');
      } else {
        // Launch real Razorpay checkout
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Prathana Foundation',
          description: `Donation: ${currentCampaign?.title || 'NGO campaign'}`,
          image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=120&auto=format&fit=crop',
          order_id: orderData.orderId,
          handler: async function (response: any) {
            setLoading(true);
            try {
              // 3. Verify on server
              const verifyRes = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) throw new Error(verifyData.error || 'Verification failed');

              // Success
              onSuccess(val, donorName, campaignId);
              setStep('success');
            } catch (err: any) {
              setError(err.message || 'Payment verification failed');
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: donorName,
            email: donorEmail,
          },
          theme: {
            color: '#0D9488',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          setError(response.error.description || 'Payment failed');
        });
        rzp.open();
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  const handleSimulatedSuccess = async () => {
    if (!mockPaymentDetails) return;
    setLoading(true);
    setError('');

    try {
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: mockPaymentDetails.orderId,
          razorpay_payment_id: `pay_sim_${Math.random().toString(36).substring(2, 9)}`,
          razorpay_signature: 'simulated_signature_hash',
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || 'Verification failed');

      // Trigger success callback
      onSuccess(mockPaymentDetails.amount, donorName, mockPaymentDetails.campaignId);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Failed to complete transaction simulation');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset states
    setStep('details');
    setMockPaymentDetails(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            <Heart className="w-5 h-5 text-brand-saffron fill-brand-saffron/20" />
            <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">
              Make a Direct Donation
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-brand-muted hover:text-brand-saffron transition-colors rounded-full hover:bg-brand-sand/50"
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
            <form onSubmit={handlePaymentInit} className="space-y-4">
              {/* Campaign Dropdown */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1.5">
                  Select Campaign
                </label>
                <select
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-brand-clay rounded-xl text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-saffron/10 focus:border-brand-saffron outline-none transition-all"
                >
                  {campaigns.map((camp) => (
                    <option key={camp.id} value={camp.id}>
                      {camp.title}
                    </option>
                  ))}
                </select>
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
                      className={`py-2.5 px-3 border rounded-xl text-sm font-medium tracking-wide transition-all ${
                        amount === amt
                          ? 'bg-brand-saffron border-brand-saffron text-white shadow-sm'
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
                        ? 'border-brand-saffron ring-1 ring-brand-saffron'
                        : 'border-brand-clay'
                    }`}
                  />
                </div>
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
                    className="w-full px-4 py-2.5 bg-white border border-brand-clay rounded-xl text-sm outline-none focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/10 transition-all"
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
                    className="w-full px-4 py-2.5 bg-brand-paper border border-brand-clay rounded-lg text-sm outline-none focus:border-brand-saffron transition-all"
                  />
                </div>
              </div>

              {/* Shield Trust Bar */}
              <div className="flex items-center gap-3 p-3.5 bg-brand-sand/40 border border-brand-clay/40 rounded-xl text-[11px] text-brand-muted">
                <Shield className="w-5 h-5 text-brand-green flex-shrink-0" />
                <p>
                  Secure payment infrastructure. 100% of your donation is directly recorded and transparently tracked. All contributions qualify for 80G tax benefit receipts.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-saffron text-white rounded-full text-[13px] font-semibold tracking-wide hover:bg-brand-charcoal transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Initializing Payment...
                  </>
                ) : (
                  `Proceed to Pay ₹${Number(finalAmount).toLocaleString('en-IN')}`
                )}
              </button>
            </form>
          )}

          {step === 'simulating' && mockPaymentDetails && (
            <div className="space-y-5 py-2">
              <div className="p-5 bg-brand-sand/50 border border-brand-saffron/30 rounded-2xl text-center">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-saffron/15 text-brand-saffron rounded-full mb-2">
                  Simulation Sandbox Mode
                </span>
                <h4 className="font-serif-display text-base font-semibold text-brand-charcoal">
                  Razorpay Checkout Gateway Simulation
                </h4>
                <p className="text-brand-muted text-xs mt-1.5 leading-relaxed max-w-sm mx-auto">
                  Prathana Foundation is running in verification offline simulation. Use this step to test the full live stats update and receipting engine.
                </p>
              </div>

              <div className="border border-brand-clay rounded-2xl overflow-hidden bg-white">
                <div className="px-4 py-3 bg-brand-charcoal text-white text-xs font-semibold tracking-wider uppercase flex justify-between">
                  <span>Merchant: Prathana Foundation</span>
                  <span className="text-brand-gold">₹{mockPaymentDetails.amount.toLocaleString('en-IN')}.00</span>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs border-b border-brand-clay/30 pb-2">
                    <span className="text-brand-muted">Order Ref</span>
                    <span className="font-mono font-medium text-brand-charcoal">{mockPaymentDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-brand-clay/30 pb-2">
                    <span className="text-brand-muted">Donor Name</span>
                    <span className="font-medium text-brand-charcoal">{donorName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-1">
                    <span className="text-brand-muted">Donor Email</span>
                    <span className="font-medium text-brand-charcoal">{donorEmail}</span>
                  </div>
                </div>

                <div className="p-4 bg-brand-sand/30 border-t border-brand-clay flex flex-col gap-2">
                  <button
                    onClick={handleSimulatedSuccess}
                    disabled={loading}
                    className="w-full py-2.5 bg-brand-green text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-brand-charcoal transition-colors flex items-center justify-center gap-1.5"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        Authorize Successful Checkout
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setError('Simulated transaction cancelled by donor');
                      setStep('details');
                    }}
                    className="w-full py-2 border border-brand-clay text-brand-muted text-xs font-medium rounded-xl hover:bg-brand-sand/30 transition-colors"
                  >
                    Cancel Transaction
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                Thank You, {donorName.split(' ')[0]}!
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed max-w-sm mx-auto">
                Your donation of <span className="font-semibold text-brand-saffron">₹{Number(finalAmount).toLocaleString('en-IN')}</span> has been successfully processed. 
                A verification receipt has been logged. 
              </p>
              
              {/* Handwritten thank you letter accent */}
              <div className="p-6 bg-brand-sand/40 border border-brand-clay/70 rounded-xl text-left max-w-sm mx-auto shadow-inner relative overflow-hidden">
                <span className="absolute -right-4 -bottom-4 font-serif text-brand-clay/35 text-7xl select-none font-bold">
                  Hope
                </span>
                <p className="font-serif italic text-sm text-brand-charcoal/80 leading-relaxed">
                  &ldquo;Every light of hope begins with a single act of kindness. By feeding a child, equipping a student, or aiding a clinic, you have extended a healing hand to Solapur.&rdquo;
                </p>
                <div className="mt-4 border-t border-brand-clay/40 pt-3 flex justify-between items-center text-[10px] uppercase tracking-wider text-brand-muted font-semibold">
                  <span>Prathana Governing Body</span>
                  <span>Solapur Office</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-2.5 bg-brand-charcoal text-white hover:bg-brand-saffron transition-all rounded-full text-xs font-semibold tracking-wider uppercase mt-4"
              >
                Close & View Progress
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
