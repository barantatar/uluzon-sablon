import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Site from '@/components/site';
import { FIRMA } from '@/firma.config';
import { DEMO, demoFirma, doldur, type DemoParametreleri } from '@/lib/firma';
import { sektorBul } from '@/sektorler';

// Demo linki: /tesisat?firma=Yıldız Tesisat&tel=05321234567&ilce=Yenişehir
// Gerçek müşteri kurulumunda bu rota kapalıdır; site kök adreste yayınlanır.

type Props = { params: Promise<{ sektor: string }>; searchParams: Promise<DemoParametreleri> };

async function yukle({ params, searchParams }: Props) {
  if (!DEMO) notFound();
  const sektor = sektorBul((await params).sektor);
  if (!sektor) notFound();
  return { sektor, firma: demoFirma(FIRMA, await searchParams) };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { sektor, firma } = await yukle(props);
  return {
    title: doldur(sektor.seoBaslik, firma),
    description: doldur(sektor.seoAciklama, firma),
    robots: { index: false, follow: false },
  };
}

export default async function DemoSayfasi(props: Props) {
  const { sektor, firma } = await yukle(props);
  return <Site sektor={sektor} firma={firma} />;
}
