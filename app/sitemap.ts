import type { MetadataRoute } from 'next';
import { FIRMA, SEKTOR } from '@/firma.config';
import { DEMO } from '@/lib/firma';
import { sayfaYolu, tumSayfalar } from '@/lib/sayfa';
import { sektorBul } from '@/sektorler';

export default function sitemap(): MetadataRoute.Sitemap {
  const sektor = sektorBul(SEKTOR);
  if (DEMO || !FIRMA.siteUrl || !sektor) return [];
  const kok = FIRMA.siteUrl.replace(/\/$/, '');
  return tumSayfalar(sektor, FIRMA).map((s) => ({
    url: `${kok}${sayfaYolu(s) === '/' ? '' : sayfaYolu(s)}`,
    changeFrequency: 'monthly',
    priority: s.tur === 'ana' ? 1 : s.tur === 'hizmetIlce' ? 0.6 : 0.8,
  }));
}
