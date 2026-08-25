import type { Metadata } from 'next';
import { getProjects } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsClient from './ProjectsClient';

interface ProjectsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isMr = lang === 'mr';

  const title = isMr
    ? 'सर्व प्रकल्प व सामाजिक उपक्रम | प्रार्थना फाउंडेशन सोलापूर'
    : 'Our Key Initiatives & Sustainable Projects | Prathana Foundation';
  const description = isMr
    ? 'प्रार्थना बालग्राम, वंचितांची शाळा, फिरते रुग्णालय, अन्नछत्र आणि सेंद्रिय शेती प्रकल्प.'
    : 'Explore our key humanitarian projects in Solapur: Balgram shelter, mobile health clinic, daily nutrition drives, and sustainable rural development.';

  const url = `https://prarthanafoundation.org/${lang}/projects`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Prathana Foundation Solapur',
      images: ['https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_k1puoc.jpg'],
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://prarthanafoundation.org/en/projects',
        mr: 'https://prarthanafoundation.org/mr/projects',
      },
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const projects = await getProjects();

  return (
    <div className="relative min-h-screen bg-brand-paper bg-grid-pattern overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-saffron/4 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/4 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-3.5s' }} />

      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24 z-10">
        <ProjectsClient
          lang={lang}
          initialProjects={projects}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
