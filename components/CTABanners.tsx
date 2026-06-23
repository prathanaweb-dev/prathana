'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface CTABannersProps {
  lang: string;
  onDonateClick: () => void;
}

export default function CTABanners({ lang, onDonateClick }: CTABannersProps) {
  const router = useRouter();

  const isMarathi = lang === 'mr';

  const tLocal = {
    leftTitle: isMarathi ? 'स्वयंसेवक बनायचे आहे का?' : 'Become A Volunteer?',
    leftBtn: isMarathi ? 'सहभागी व्हा' : 'Join Us',
    rightTitle: isMarathi ? 'देणगी देऊन मदत करा!' : 'Make Donation To Us!',
    rightBtn: isMarathi ? 'दान करा' : 'Donate Now',
  };

  return (
    <section className="relative w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[280px]">
      
      {/* Left Banner: Volunteer */}
      <div className="relative bg-brand-green flex flex-col justify-center p-8 sm:p-12 md:p-16 text-white text-left overflow-hidden">
        {/* Yellow paint-stroke highlight backdrop */}
        <div className="absolute top-0 right-0 w-24 h-full bg-brand-yellow/15 skew-x-12 transform origin-top-right pointer-events-none" />
        
        <div className="relative z-10 max-w-md ml-auto space-y-6">
          <h3 className="font-serif-display text-2xl sm:text-4xl font-bold tracking-tight">
            {tLocal.leftTitle}
          </h3>
          <button
            onClick={() => router.push(`/${lang}/volunteer`)}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-8 py-3.5 text-[13px] tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 self-start"
          >
            {tLocal.leftBtn}
          </button>
        </div>
      </div>

      {/* Right Banner: Donation */}
      <div className="relative bg-brand-forest flex flex-col justify-center p-8 sm:p-12 md:p-16 text-white text-left overflow-hidden">
        {/* Yellow paint-stroke highlight backdrop */}
        <div className="absolute top-0 left-0 w-24 h-full bg-brand-yellow/10 -skew-x-12 transform origin-top-left pointer-events-none" />
        
        <div className="relative z-10 max-w-md mr-auto space-y-6">
          <h3 className="font-serif-display text-2xl sm:text-4xl font-bold tracking-tight">
            {tLocal.rightTitle}
          </h3>
          <button
            onClick={onDonateClick}
            className="rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold px-8 py-3.5 text-[13px] tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 self-start"
          >
            {tLocal.rightBtn}
          </button>
        </div>
      </div>

      {/* Center Overlapping Child Photo Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-8 border-brand-paper bg-brand-sand overflow-hidden hidden md:block z-20 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop"
          alt="Outreach child face"
          className="w-full h-full object-cover"
        />
      </div>

    </section>
  );
}
