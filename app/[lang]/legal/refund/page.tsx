import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function RefundPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return (
    <div className="relative min-h-screen bg-brand-paper text-brand-charcoal selection:bg-brand-yellow/30 selection:text-brand-forest">
      <Header lang={lang} />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-serif-display text-4xl md:text-5xl font-bold">Refund & Cancellation Policy</h1>
            <p className="text-brand-muted font-light uppercase tracking-widest text-sm">Last Updated: July 2026</p>
          </div>
          
          <div className="prose prose-brand max-w-none space-y-8 text-brand-charcoal/80 font-light leading-relaxed">
            
            <section className="bg-white/50 p-8 rounded-2xl border border-brand-clay/30">
              <p>Thank you for supporting <strong>Prathana Foundation Irlewadi</strong>. Your contributions ensure that destitute children and elderly citizens receive the care they deserve. Please read our donation refund policy carefully.</p>
              <ul className="list-none space-y-2 mt-4 text-sm bg-brand-charcoal text-white p-6 rounded-xl">
                <li><strong>Organization Name (Brand):</strong> Prathana Foundation</li>
                <li><strong>Registered Legal Name:</strong> Prathana Foundation Irlewadi</li>
                <li><strong>Registration Number:</strong> Society- Solapur/0000209/2018 | Trust- F-0030038(SLP)</li>
                <li><strong>Registered Address:</strong> A/p Irlewadi tal- barshi district Solapur</li>
                <li><strong>Contact Email:</strong> prathanafoundation@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">1. Donation Refund Policy</h2>
              <p>Prathana Foundation Irlewadi relies on the generosity of public donations to sustain our charitable activities. Once a donation is made, it is utilized directly for our ongoing projects (such as Balgram, Old Age Home, and Educational Support).</p>
              <p className="mt-4"><strong>Therefore, we have a strict NO REFUND policy for donations made to the foundation.</strong></p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">2. Exceptions for Accidental Transactions</h2>
              <p>We understand that errors can happen during online transactions (e.g., a double deduction or a wrong amount entered). If such an error occurs, you must notify us within <strong>7 days</strong> of the transaction.</p>
              <p className="mt-4">To request a review for an accidental transaction, please email us at <strong>prathanafoundation@gmail.com</strong> with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your full name and contact number.</li>
                <li>Date of the donation.</li>
                <li>The donation amount.</li>
                <li>Proof of the transaction (e.g., bank statement or transaction reference ID).</li>
              </ul>
              <p className="mt-4">We will review the request and, at our sole discretion, initiate a refund. If approved, the refund will be processed and credited back to the original method of payment within 10-15 working days.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-charcoal mb-4">3. Cancellation of Recurring Donations</h2>
              <p>If you have set up a recurring monthly donation, you may cancel it at any time by contacting your bank or by reaching out to us at our official email address. Cancellations will apply to future deductions only; past deductions will not be refunded.</p>
            </section>

          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
