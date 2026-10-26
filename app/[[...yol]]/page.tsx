import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Site from '@/components/site';
import { FIRMA, SEKTOR } from '@/firma.config';
import { DEMO, ULUZON_URL } from '@/lib/firma';
import { YASAL_SAYFALAR, baglamKur, sayfaCoz, sayfaYolu, tumSayfalar, yolUret } from '@/lib/sayfa';
import { firmaDogrula } from '@/lib/dogrula';
import { sayfaMetadata, sayfaSchema } from '@/lib/seo';
import { SEKTORLER, sektorBul } from '@/sektorler';

// Gerçek müşteri sitesi: bütün sayfalar derlemede statik üretilir
//   /   /bolge/yenisehir   /su-kacagi-tespiti   /su-kacagi-tespiti/yenisehir
// Demo kurulumunda (NEXT_PUBLIC_DEMO=1) bu rota yalnızca şablon listesini gösterir;
// sektör adresleri next.config.ts'de app/demo altına yönlendirilir.

type Props = { params: Promise<{ yol?: string[] }> };

export function generateStaticParams() {
  if (DEMO) return [{ yol: [] }];
  // Gerçek kurulumda ayarlar derlemede kontrol edilir: hata varsa derleme durur, eksikler uyarı olarak yazılır.
  firmaDogrula(sektor(), FIRMA);
  return [...tumSayfalar(sektor(), FIRMA), ...YASAL_SAYFALAR].map((s) => ({ yol: sayfaYolu(s).split('/').filter(Boolean) }));
}

export const dynamicParams = false;

function sektor() {
  const s = sektorBul(SEKTOR);
  if (!s) throw new Error(`firma.config.ts: "${SEKTOR}" adında bir sektör yok.`);
  return s;
}

async function yukle({ params }: Props) {
  const parcalar = ((await params).yol ?? []).map((p) => decodeURIComponent(p));
  if (DEMO) {
    if (parcalar.length) notFound();
    return null;
  }
  const sayfa = sayfaCoz(sektor(), FIRMA, parcalar);
  if (!sayfa) notFound();
  return baglamKur(sektor(), FIRMA, sayfa, yolUret(sektor()));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const b = await yukle(props);
  return b ? sayfaMetadata(b) : { title: 'Uluzon sektör şablonları (demo)' };
}

export default async function Sayfa(props: Props) {
  const b = await yukle(props);
  if (!b) return <DemoListesi />;
  return (
    <>
      {b.sayfa.tur !== 'yasal' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sayfaSchema(b)).replace(/</g, '\\u003c') }} />
      )}
      <Site b={b} />
    </>
  );
}

function DemoListesi() {
  return (
    <main className="kap py-16">
      <p className="text-sm font-bold uppercase tracking-widest text-soluk">Uluzon · Demo</p>
      <h1 className="mt-3 text-3xl font-extrabold">Sektör şablonları</h1>
      <p className="mt-3 max-w-xl text-metin">
        Linke <code>?firma=</code>, <code>&amp;tel=</code> ve <code>&amp;ilce=</code> ekleyerek demoyu bir işletmeye göre kişiselleştirebilirsiniz.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {Object.values(SEKTORLER).map((s) => (
          <li key={s.slug}>
            <Link href={`/${s.slug}`} className="flex items-center justify-between rounded-2xl border border-cizgi p-5 font-bold hover:bg-zemin">
              {s.ad}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-soluk">
        <a href={ULUZON_URL} className="underline">uluzon.com</a>
      </p>
    </main>
  );
}
