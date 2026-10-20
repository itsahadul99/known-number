import type { MetadataRoute } from 'next';
import { ALL_SCENARIOS } from '@/content/scenarios';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/organise', priority: 0.8 },
    { path: '/report', priority: 0.7 },
    { path: '/card', priority: 0.6 },
    { path: '/about', priority: 0.5 },
    { path: '/accessibility', priority: 0.4 },
    { path: '/privacy', priority: 0.3 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...ALL_SCENARIOS.map((s) => ({
      url: absoluteUrl(`/drill/${s.id}`),
      lastModified: new Date(s.lastReviewed || lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
