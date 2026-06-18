import { getProjects } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsClient from './ProjectsClient';

interface ProjectsPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const projects = await getProjects();

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col justify-between">
      <Header lang={lang} />

      <main className="flex-1 pt-32 pb-24">
        <ProjectsClient
          lang={lang}
          initialProjects={projects}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
