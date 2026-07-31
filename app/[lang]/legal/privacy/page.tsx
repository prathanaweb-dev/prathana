import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return (
    <div className="relative min-h-screen bg-brand-paper text-brand-charcoal selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-serif-display text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-brand-muted font-light uppercase tracking-widest text-sm">Last Updated: July 2026</p>
          </div>
          
          <div className="prose prose-brand max-w-none space-y-8 text-brand-charcoal/80 font-light leading-relaxed">
            
            <section className="bg-white/50 p-8 rounded-2xl border border-brand-clay/30">
              <p>At <strong>Prathana Foundation Irlewadi</strong>, we respect your privacy and are committed to protecting any personal information that you provide to us. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
              <ul className="list-none space-y-2 mt-4 text-sm bg-brand-charcoal text-white p-6 rounded-xl">
                <li><strong>Organization Name (Brand):</strong> Prathana Foundation</li>
                <li><strong>Registered Legal Name:</strong> Prathana Foundation Irlewadi</li>
                <li><strong>Registration Number:</strong> Society- Solapur/0000209/2018 | Trust- F-0030038(SLP)</li>
                <li><strong>Registered Address:</strong> A/p Irlewadi tal- barshi district Solapur</li>
                <li><strong>Contact Email:</strong> prathanafoundation@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">1. Information We Collect</h2>
              <p>When you make a donation, volunteer, or contact us, we may collect personal information such as your name, email address, phone number, PAN card number (for 80G tax exemption receipts), and payment details.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and acknowledge your donations.</li>
                <li>To issue tax exemption certificates (80G).</li>
                <li>To send updates about our charitable projects and campaigns.</li>
                <li>To respond to your inquiries and support requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">3. Data Protection and Security</h2>
              <p>We implement strict security measures to protect your personal information. Payment processing is handled through secure, encrypted third-party payment gateways (such as Razorpay). We do not store your credit/debit card information on our servers.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">4. Sharing Your Information</h2>
              <p>We will never sell, trade, or rent your personal information to third parties. We may only disclose your data if required by law or to government regulatory bodies for tax and compliance purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <strong>prathanafoundation@gmail.com</strong>.</p>
            </section>

          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
