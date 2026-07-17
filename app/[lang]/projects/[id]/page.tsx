import { getProjects } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

export default async function ProjectPage({ params }: { params: { lang: string, id: string } }) {
  const projects = await getProjects();
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient lang={params.lang} project={project} />;
}
