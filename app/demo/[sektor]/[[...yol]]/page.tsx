import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Site from '@/components/site';
import { FIRMA } from '@/firma.config';
import { DEMO, demoFirma, type DemoParametreleri } from '@/lib/firma';
import { baglamKur, sayfaCoz, yolUret } from '@/lib/sayfa';
import { sayfaMetadata } from '@/lib/seo';
import { sektorBul } from '@/sektorler';

// Demo sayfası, link parametreleriyle kişiselleşir. Ziyaretçi adresi /tesisat/... görür;
// next.config.ts bu adresleri buraya yönlendirir. Arama motorlarına kapalıdır.
//   /tesisat/su-kacagi-tespiti/yenisehir?firma=Yıldız Tesisat&tel=05321234567

type Props = { params: Promise<{ sektor: string; yol?: string[] }>; searchParams: Promise<DemoParametreleri> };

async function yukle({ params, searchParams }: Props) {
  if (!DEMO) notFound();
  const { sektor: slug, yol = [] } = await params;
  const sektor = sektorBul(slug);
  if (!sektor) notFound();
  const q = await searchParams;
  const firma = demoFirma(FIRMA, q);
  const sayfa = sayfaCoz(sektor, firma, yol.map((p) => decodeURIComponent(p)));
  if (!sayfa) notFound();
  return baglamKur(sektor, firma, sayfa, yolUret(sektor, q));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return { ...sayfaMetadata(await yukle(props)), robots: { index: false, follow: false } };
}

export default async function DemoSayfasi(props: Props) {
  return <Site b={await yukle(props)} />;
}
