import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';
import { Target, Compass, Star } from 'lucide-react';

interface VisionMissionPageProps {
  params: Promise<{ lang: string }>;
}

export default async function VisionMissionPage({ params }: VisionMissionPageProps) {
  const { lang } = await params;
  const t = translations[lang === 'mr' ? 'mr' : 'en'] || translations.en;

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="section-label">{t.vision.label}</span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05]">
              {t.vision.title}
            </h1>
            <div className="accent-line" />
          </div>

          {/* Vision & Mission Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 bg-white border border-brand-clay/60 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-saffron">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {t.vision.visionTitle}
                </h3>
                <p className="text-[15px] text-brand-muted font-light leading-relaxed">
                  {t.vision.visionDesc}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="p-8 bg-white border border-brand-clay/60 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-green">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-brand-charcoal">
                  {t.vision.missionTitle}
                </h3>
                <p className="text-[15px] text-brand-muted font-light leading-relaxed">
                  {t.vision.missionDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Goals List */}
          <div className="p-8 md:p-10 bg-brand-charcoal text-white rounded-3xl relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-saffron/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                {lang === 'mr' ? 'उद्दिष्टे' : 'Strategic Blueprint'}
              </span>
              <h3 className="font-serif-display text-3xl font-bold leading-tight">
                {t.vision.goalsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.vision.goals.map((goal, index) => (
                <div key={index} className="flex gap-4 items-start bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold text-xs font-mono font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-brand-clay leading-relaxed font-light">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
