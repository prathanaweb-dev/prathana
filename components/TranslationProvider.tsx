'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { TranslationDict } from '@/lib/translations';

const TranslationContext = createContext<{
  translations: Record<'en' | 'mr', TranslationDict>;
} | null>(null);

export function TranslationProvider({ 
  children, 
  translations 
}: { 
  children: ReactNode; 
  translations: Record<'en' | 'mr', TranslationDict>;
}) {
  return (
    <TranslationContext.Provider value={{ translations }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(lang: 'en' | 'mr') {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error('useTranslations must be used within TranslationProvider');
  }
  return ctx.translations[lang] || ctx.translations.en;
}
