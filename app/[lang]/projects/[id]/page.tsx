import { getProjects } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

export default async function ProjectPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  
  const projects = await getProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient lang={lang} project={project} />;
}
