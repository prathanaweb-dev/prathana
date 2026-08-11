import AboutClient from './AboutClient';
import { getPageContent } from '@/lib/db';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  
  // Server-side pre-fetching
  const aboutContent = await getPageContent('about');

  return (
    <AboutClient
      lang={lang}
      initialContent={aboutContent}
    />
  );
}
