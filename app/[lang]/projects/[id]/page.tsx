import { Metadata } from 'next';
import { getProjects } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

const SITE_BASE = 'https://prarthanafoundation.org';

/** Converts a relative /public path to an absolute URL WhatsApp and social crawlers can fetch. */
function absoluteImg(img?: string | null): string {
  const fallback = `${SITE_BASE}/balgram-home.jpg`;
  if (!img) return fallback;
  if (img.startsWith('http')) {
    if (img.includes('cloudinary.com/djoklzpse')) return fallback;
    return img;
  }
  return `${SITE_BASE}${img.startsWith('/') ? img : `/${img}`}`;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, id: string }> }): Promise<Metadata> {
  const { lang, id } = await params;
  const projects = await getProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found | Prarthana Foundation',
    };
  }

  const isMr = lang === 'mr';
  const title = (isMr && project.title_mr) ? project.title_mr : project.title;
  const description = (isMr && project.description_mr) ? project.description_mr : project.description;
  const url = `${SITE_BASE}/${lang}/projects/${project.id}`;
  const ogImage = absoluteImg(project.image);

  return {
    title: `${title} | Prarthana Foundation`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | Prarthana Foundation`,
      description: description.slice(0, 200),
      url,
      siteName: 'Prarthana Foundation Solapur',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 200),
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_BASE}/en/projects/${project.id}`,
        mr: `${SITE_BASE}/mr/projects/${project.id}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  
  const projects = await getProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  const isMr = lang === 'mr';
  const title = (isMr && project.title_mr) ? project.title_mr : project.title;
  const description = (isMr && project.description_mr) ? project.description_mr : project.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: absoluteImg(project.image),
    publisher: {
      '@type': 'NGO',
      name: 'Prarthana Foundation',
      url: SITE_BASE,
      logo: `${SITE_BASE}/icon.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient lang={lang} project={project} />
    </>
  );
}
