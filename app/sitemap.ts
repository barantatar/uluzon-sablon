import type { MetadataRoute } from 'next';
import { FIRMA } from '@/firma.config';
import { DEMO } from '@/lib/firma';

export default function sitemap(): MetadataRoute.Sitemap {
  if (DEMO || !FIRMA.siteUrl) return [];
  return [{ url: FIRMA.siteUrl, changeFrequency: 'monthly', priority: 1 }];
}
