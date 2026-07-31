import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return (
    <div className="relative min-h-screen bg-brand-paper text-brand-charcoal selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-serif-display text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
            <p className="text-brand-muted font-light uppercase tracking-widest text-sm">Last Updated: July 2026</p>
          </div>
          
          <div className="prose prose-brand max-w-none space-y-8 text-brand-charcoal/80 font-light leading-relaxed">
            
            <section className="bg-white/50 p-8 rounded-2xl border border-brand-clay/30">
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">1. General Information</h2>
              <p>Welcome to the official website of <strong>Prathana Foundation Irlewadi</strong> ("we", "us", "our"). By accessing or using this website, you agree to comply with and be bound by the following Terms and Conditions.</p>
              <ul className="list-none space-y-2 mt-4 text-sm bg-brand-charcoal text-white p-6 rounded-xl">
                <li><strong>Organization Name (Brand):</strong> Prathana Foundation</li>
                <li><strong>Registered Legal Name:</strong> Prathana Foundation Irlewadi</li>
                <li><strong>Registration Number:</strong> Society- Solapur/0000209/2018 | Trust- F-0030038(SLP)</li>
                <li><strong>Registered Address:</strong> A/p Irlewadi tal- barshi district Solapur</li>
                <li><strong>Contact Email:</strong> prathanafoundation@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">2. Use of the Website</h2>
              <p>This website is provided for informational purposes regarding our charitable projects, donation drives, and volunteer opportunities. You may not use this site for any unlawful purpose or in any way that might harm, damage, or disparage any other party.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">3. Donations</h2>
              <p>All donations made through this website are strictly voluntary. By making a donation, you confirm that the funds are your own and that you are authorized to conduct the transaction. You understand that your donation is being made to a registered charity and, subject to applicable Indian laws (such as 80G tax exemptions), may be tax-deductible.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">4. Intellectual Property</h2>
              <p>All content, images, and text on this website are the property of Prathana Foundation unless otherwise stated. Unauthorized use, reproduction, or distribution of our materials is strictly prohibited without written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">5. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Solapur, Maharashtra.</p>
            </section>

          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
