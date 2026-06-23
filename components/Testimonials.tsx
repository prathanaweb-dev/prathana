'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialsProps {
  lang: string;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const isMarathi = lang === 'mr';

  const testimonials = [
    {
      text: isMarathi 
        ? 'प्रार्थना फाउंडेशनची पारदर्शकता अत्यंत वाखाणण्याजोगी आहे. आपल्या देणगीचा प्रत्येक रुपया कुठे खर्च होतो हे पाहणे मनाला समाधान देते.'
        : 'The transparency of Prathana Foundation is unmatched. Seeing exactly where my donations go and how they benefit children brings immense peace of mind.',
      rating: 5,
      name: isMarathi ? 'अमित देशमुख' : 'Amit Deshmukh',
      role: isMarathi ? 'नियमित देणगीदार, पुणे' : 'Regular Donor, Pune',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
      borderColor: 'border-l-brand-green',
    },
    {
      text: isMarathi
        ? 'सोलापूरमधील रस्त्यावरील मुलांसाठी त्यांचे काम अतिशय मोलाचे आहे. मुलांना शिक्षण आणि सकस अन्न देऊन ते समाज घडवत आहेत.'
        : 'They are doing real, impactful on-ground work in Solapur. Helping street children study and get proper nutrition is a beautiful cause.',
      rating: 5,
      name: isMarathi ? 'सुप्रिया पाटील' : 'Supriya Patil',
      role: isMarathi ? 'सामाजिक कार्यकर्ता, सोलापूर' : 'Social Worker, Solapur',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
      borderColor: 'border-l-brand-yellow',
    },
    {
      text: isMarathi
        ? 'प्रसाद आणि अनू मोहिते यांचे कार्य प्रेरणादायी आहे. वैयक्तिक दुःखातून त्यांनी उभं केलेलं हे सामाजिक काम खरोखरच कौतुकास्पद आहे.'
        : 'Prasad and Anus story is deeply inspiring. Reclaiming their life tragedy to build a safe home for kids and elderly is a remarkable service.',
      rating: 5,
      name: isMarathi ? 'राजेश कुलकर्णी' : 'Rajesh Kulkarni',
      role: isMarathi ? 'माजी नगरसेवक, सोलापूर' : 'Supporter, Solapur',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop',
      borderColor: 'border-l-[#e75c3c]',
    },
  ];

  return (
    <section className="py-24 bg-brand-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <span className="text-[11px] uppercase tracking-widest font-bold text-brand-saffron">
            {isMarathi ? 'अभिप्राय आणि विश्वास' : 'Testimonials'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-brand-charcoal max-w-xl mx-auto leading-tight">
            {isMarathi ? 'आमच्या मौल्यवान देणगीदारांचे अनुभव' : 'Our Valuable Customers Awesome Feedback'}
          </h2>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-2" />
        </div>

        {/* 3-Column Speech Bubbles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col space-y-6 text-left"
            >
              {/* Speech bubble box */}
              <div className={`bg-white p-8 rounded-3xl shadow-sm border-l-4 ${t.borderColor} relative space-y-4`}>
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-yellow fill-current" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-brand-muted text-[13px] leading-relaxed font-light italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                {/* Speech Bubble Arrow Triangle */}
                <div className="absolute left-8 -bottom-3 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
              </div>

              {/* Reviewer identity directly below arrow */}
              <div className="flex items-center gap-3 pl-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-brand-clay/40 shadow-sm"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-brand-charcoal leading-tight">{t.name}</span>
                  <span className="text-[10px] text-brand-muted font-light mt-0.5">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Selector Below */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
        </div>

      </div>
    </section>
  );
}
