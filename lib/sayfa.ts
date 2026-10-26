import type { Firma, Hizmet, Sektor } from './tipler';
import { DEMO, slugla, telHref, waLink } from './firma';

// Her firma sitesi dört tür sayfadan oluşur. Reklamda her grup kendi sayfasına gider:
//   /                               ana sayfa (şehir geneli)
//   /bolge/yenisehir                ilçe sayfası
//   /su-kacagi-tespiti              hizmet sayfası (şehir geneli)
//   /su-kacagi-tespiti/yenisehir    hizmet + ilçe sayfası
export type Sayfa =
  | { tur: 'ana' }
  | { tur: 'ilce'; ilce: string }
  | { tur: 'hizmet'; hizmet: Hizmet }
  | { tur: 'hizmetIlce'; hizmet: Hizmet; ilce: string }
  | { tur: 'yasal'; metin: YasalMetin };

export type YasalMetin = 'kvkk' | 'cerez';
export const YASAL_YOLLAR: Record<YasalMetin, string> = { kvkk: 'kvkk-aydinlatma-metni', cerez: 'cerez-politikasi' };

const BOLGE = 'bolge';

function ilceBul(firma: Firma, slug: string): string | undefined {
  return firma.ilceler.find((i) => slugla(i) === slug);
}

export function sayfaCoz(sektor: Sektor, firma: Firma, parcalar: string[]): Sayfa | null {
  const [a, b, ...fazla] = parcalar;
  if (fazla.length) return null;
  if (!a) return { tur: 'ana' };
  const yasal = (Object.keys(YASAL_YOLLAR) as YasalMetin[]).find((k) => YASAL_YOLLAR[k] === a);
  if (yasal) return b ? null : { tur: 'yasal', metin: yasal };
  if (a === BOLGE) {
    const ilce = b ? ilceBul(firma, b) : undefined;
    return ilce ? { tur: 'ilce', ilce } : null;
  }
  const hizmet = sektor.hizmetler.find((h) => h.slug === a);
  if (!hizmet) return null;
  if (!b) return { tur: 'hizmet', hizmet };
  const ilce = ilceBul(firma, b);
  return ilce ? { tur: 'hizmetIlce', hizmet, ilce } : null;
}

export function sayfaYolu(s: Sayfa): string {
  switch (s.tur) {
    case 'ana':
      return '/';
    case 'ilce':
      return `/${BOLGE}/${slugla(s.ilce)}`;
    case 'hizmet':
      return `/${s.hizmet.slug}`;
    case 'hizmetIlce':
      return `/${s.hizmet.slug}/${slugla(s.ilce)}`;
    case 'yasal':
      return `/${YASAL_YOLLAR[s.metin]}`;
  }
}

export function tumSayfalar(sektor: Sektor, firma: Firma): Sayfa[] {
  return [
    { tur: 'ana' },
    ...firma.ilceler.map((ilce): Sayfa => ({ tur: 'ilce', ilce })),
    ...sektor.hizmetler.flatMap((hizmet): Sayfa[] => [
      { tur: 'hizmet', hizmet },
      ...firma.ilceler.map((ilce): Sayfa => ({ tur: 'hizmetIlce', hizmet, ilce })),
    ]),
  ];
}

/** Derlemede üretilen ama sitemap'e girmeyen sayfalar */
export const YASAL_SAYFALAR: Sayfa[] = [
  { tur: 'yasal', metin: 'kvkk' },
  { tur: 'yasal', metin: 'cerez' },
];

/** Sayfanın başlıklarda geçen yeri: ilçe sayfalarında ilçe, diğerlerinde şehir */
export function sayfaYeri(s: Sayfa, firma: Firma): string {
  return s.tur === 'ilce' || s.tur === 'hizmetIlce' ? s.ilce : firma.sehir;
}

/** Site içi link üretir. Demoda sektör öneki ve kişiselleştirme parametreleri korunur. */
export type Yol = (yol: string, capa?: string) => string;

const DEMO_ANAHTARLARI = ['firma', 'tel', 'ilce', 'sehir'] as const;

export function yolUret(sektor: Sektor, demoParametreleri?: Record<string, string | string[] | undefined>): Yol {
  if (!DEMO) return (yol, capa) => `${yol}${capa ? `#${capa}` : ''}`;
  const q = new URLSearchParams();
  for (const k of DEMO_ANAHTARLARI) {
    const v = demoParametreleri?.[k];
    const tek = Array.isArray(v) ? v[0] : v;
    if (tek) q.set(k, tek.slice(0, 40));
  }
  const sorgu = q.size ? `?${q}` : '';
  return (yol, capa) => `/${sektor.slug}${yol === '/' ? '' : yol}${sorgu}${capa ? `#${capa}` : ''}`;
}

/** Bir sayfanın bütün bölümlerine geçen ortak bilgiler */
export interface Baglam {
  sektor: Sektor;
  firma: Firma;
  sayfa: Sayfa;
  yer: string;
  yol: Yol;
  tel: string;
  wa: (sorun?: string) => string;
}

export function baglamKur(sektor: Sektor, firma: Firma, sayfa: Sayfa, yol: Yol): Baglam {
  return {
    sektor,
    firma,
    sayfa,
    yer: sayfaYeri(sayfa, firma),
    yol,
    tel: telHref(firma),
    wa: (sorun) => waLink(firma, sorun ? `Merhaba ${firma.ad}, ${sorun}. Yardımcı olabilir misiniz?` : undefined),
  };
}
