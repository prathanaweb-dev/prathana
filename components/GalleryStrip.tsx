'use client';

import { motion } from 'framer-motion';

export default function GalleryStrip() {
  const images = [
    '/gallery-strip-1.jpg',
    '/gallery-strip-2.jpg',
    '/gallery-strip-3.jpg',
    '/gallery-strip-4.jpg',
    '/gallery-strip-5.jpg',
    '/gallery-strip-6.jpg',
  ];

  return (
    <section className="w-full overflow-hidden bg-brand-charcoal">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-[4/3] group overflow-hidden bg-brand-charcoal cursor-pointer">
            {/* Grayscale image */}
            <img
              src={img}
              alt="Field work photo strip"
              className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-brand-charcoal/20 group-hover:bg-transparent transition-colors duration-500" />
            
            {/* Center Circular Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center shadow-md scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
