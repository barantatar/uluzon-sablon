import type { Sektor } from '@/lib/tipler';
import { tesisat } from './tesisat';

// Yeni sektör: sektorler/<slug>.ts dosyasını ekleyip buraya kaydedin.
export const SEKTORLER: Record<string, Sektor> = {
  [tesisat.slug]: tesisat,
};

export function sektorBul(slug: string): Sektor | undefined {
  return Object.hasOwn(SEKTORLER, slug) ? SEKTORLER[slug] : undefined;
}
