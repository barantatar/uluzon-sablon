import type { MetadataRoute } from 'next';
import { FIRMA } from '@/firma.config';
import { DEMO } from '@/lib/firma';

export default function robots(): MetadataRoute.Robots {
  if (DEMO) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: FIRMA.siteUrl ? `${FIRMA.siteUrl.replace(/\/$/, '')}/sitemap.xml` : undefined,
  };
}
