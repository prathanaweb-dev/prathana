import { MetadataRoute } from 'next';
import { getCampaigns, getProjects, getEvents } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://prarthanafoundation.org';
  const languages = ['en', 'mr'];

  // Static pages
  const staticRoutes = [
    '',
    '/about',
    '/vision-mission',
    '/activities',
    '/projects',
    '/events',
    '/csr',
    '/donation',
    '/volunteer',
    '/team',
    '/gallery',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
    '/legal/refund',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for all languages
  for (const lang of languages) {
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : (route === '/donation' || route === '/about' ? 0.9 : 0.7),
      });
    }
  }

  try {
    // Dynamic Campaigns
    const campaigns = await getCampaigns();
    for (const camp of campaigns) {
      for (const lang of languages) {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/campaigns/${camp.slug}`,
          lastModified: new Date(camp.created_at || Date.now()),
          changeFrequency: 'daily',
          priority: 0.9,
        });
      }
    }

    // Dynamic Projects
    const projects = await getProjects();
    for (const proj of projects) {
      for (const lang of languages) {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/projects/${proj.id}`,
          lastModified: new Date(proj.created_at || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch (e) {
    console.error('Error generating dynamic sitemap:', e);
  }

  return sitemapEntries;
}
