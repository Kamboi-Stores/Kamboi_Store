import type { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = ['', '/menu', '/order', '/locations', '/about', '/contact', '/privacy', '/terms', '/cookies'];
  return pages.map(p => ({ url: `${base}${p}`, changeFrequency: 'weekly', priority: p===''?1:0.7 }));
}
