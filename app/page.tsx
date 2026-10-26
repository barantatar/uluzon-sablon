import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Site from '@/components/site';
import { FIRMA, SEKTOR } from '@/firma.config';
import { DEMO, ULUZON_URL } from '@/lib/firma';
import { isletmeSchema, sayfaMetadata } from '@/lib/seo';
import { SEKTORLER, sektorBul } from '@/sektorler';

const sektor = sektorBul(SEKTOR);
if (!sektor) throw new Error(`firma.config.ts: "${SEKTOR}" adında bir sektör yok.`);

export const metadata: Metadata = DEMO ? { title: 'Uluzon sektör şablonları (demo)' } : sayfaMetadata(sektor, FIRMA);

export default function Anasayfa() {
  if (DEMO) return <DemoListesi />;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(isletmeSchema(sektor!, FIRMA)).replace(/</g, '\\u003c') }}
      />
      <Site sektor={sektor!} firma={FIRMA} />
    </>
  );
}

function DemoListesi() {
  return (
    <main className="kap py-16" style={{ '--renk-acil': '#c2410c' } as React.CSSProperties}>
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
