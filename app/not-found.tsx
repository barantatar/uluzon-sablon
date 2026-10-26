import type { Metadata } from 'next';
import { SayfaBulunamadi } from '@/components/site';
import { FIRMA, SEKTOR } from '@/firma.config';
import { baglamKur, yolUret } from '@/lib/sayfa';
import { sektorBul } from '@/sektorler';

export const metadata: Metadata = { title: `Sayfa bulunamadı | ${FIRMA.ad}`, robots: { index: false } };

export default function Bulunamadi() {
  const sektor = sektorBul(SEKTOR)!;
  return <SayfaBulunamadi b={baglamKur(sektor, FIRMA, { tur: 'ana' }, yolUret(sektor))} />;
}
