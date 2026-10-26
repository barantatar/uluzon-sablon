import type { Metadata } from 'next';
import { doldur, telHref } from './firma';
import { sayfaYolu, type Baglam } from './sayfa';

export function sayfaBasligi(b: Baglam): { baslik: string; aciklama: string } {
  const { sektor, firma, sayfa, yer } = b;
  if (sayfa.tur === 'yasal') {
    return {
      baslik: `${sayfa.metin === 'kvkk' ? 'KVKK Aydınlatma Metni' : 'Çerez Politikası'} | ${firma.ad}`,
      aciklama: `${firma.ad} kişisel verilerin korunması ve çerez kullanımı hakkında bilgilendirme.`,
    };
  }
  if (sayfa.tur === 'hizmet' || sayfa.tur === 'hizmetIlce') {
    return {
      baslik: `${yer} ${sayfa.hizmet.ad} | ${firma.ad}`,
      aciklama: `${doldur(sayfa.hizmet.aciklama, firma, yer)} ${firma.telefon}`,
    };
  }
  return { baslik: doldur(sektor.seoBaslik, firma, yer), aciklama: doldur(sektor.seoAciklama, firma, yer) };
}

export function sayfaMetadata(b: Baglam): Metadata {
  const { baslik, aciklama } = sayfaBasligi(b);
  const url = b.firma.siteUrl ? new URL(sayfaYolu(b.sayfa), b.firma.siteUrl).toString() : undefined;
  return {
    title: baslik,
    description: aciklama,
    alternates: url ? { canonical: url } : undefined,
    // Sayfa openGraph verdiğinde kök görsel devralınmaz; bu yüzden açıkça eklenir (app/opengraph-image.tsx).
    openGraph: { title: baslik, description: aciklama, type: 'website', locale: 'tr_TR', url, siteName: b.firma.ad, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: baslik, description: aciklama, images: ['/opengraph-image'] },
    // Yasal metinler aranmaz; bağlantıları izlenir.
    robots: b.sayfa.tur === 'yasal' ? { index: false, follow: true } : undefined,
  };
}

const GUNLER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** schema.org verisi; yalnızca gerçek müşteri sitesinde basılır. */
export function sayfaSchema(b: Baglam) {
  const { sektor, firma, sayfa, yer } = b;
  const kok = firma.siteUrl?.replace(/\/$/, '');
  const isletme: Record<string, unknown> = {
    '@type': sektor.schemaTuru,
    '@id': kok ? `${kok}/#isletme` : undefined,
    name: firma.ad,
    telephone: telHref(firma).replace('tel:', ''),
    url: kok,
    address: {
      '@type': 'PostalAddress',
      addressLocality: firma.ilce,
      addressRegion: firma.sehir,
      addressCountry: 'TR',
      streetAddress: firma.adres,
    },
    areaServed: firma.ilceler.map((ilce) => ({ '@type': 'City', name: `${ilce}, ${firma.sehir}` })),
    openingHoursSpecification: firma.yirmiDortSaat
      ? { '@type': 'OpeningHoursSpecification', dayOfWeek: GUNLER, opens: '00:00', closes: '23:59' }
      : firma.saatler
        ? { '@type': 'OpeningHoursSpecification', dayOfWeek: GUNLER, opens: firma.saatler.acilis, closes: firma.saatler.kapanis }
        : undefined,
  };
  // Puan yalnızca gerçek Google verisi girildiyse eklenir.
  if (firma.googlePuani) {
    isletme.aggregateRating = { '@type': 'AggregateRating', ratingValue: firma.googlePuani.puan, reviewCount: firma.googlePuani.yorumSayisi };
  }

  const graf: Record<string, unknown>[] = [isletme];
  if (sayfa.tur === 'hizmet' || sayfa.tur === 'hizmetIlce') {
    graf.push({
      '@type': 'Service',
      name: `${yer} ${sayfa.hizmet.ad}`,
      serviceType: sayfa.hizmet.ad,
      description: doldur(sayfa.hizmet.aciklama, firma, yer),
      areaServed: { '@type': 'City', name: `${yer}, ${firma.sehir}` },
      provider: kok ? { '@id': `${kok}/#isletme` } : { '@type': sektor.schemaTuru, name: firma.ad },
    });
  }
  if (sayfa.tur !== 'ana' && kok) {
    const parcalar: { ad: string; yol: string }[] = [{ ad: 'Ana sayfa', yol: '/' }];
    if (sayfa.tur === 'ilce') parcalar.push({ ad: sayfa.ilce, yol: sayfaYolu(sayfa) });
    if (sayfa.tur === 'hizmet' || sayfa.tur === 'hizmetIlce') parcalar.push({ ad: sayfa.hizmet.ad, yol: sayfaYolu({ tur: 'hizmet', hizmet: sayfa.hizmet }) });
    if (sayfa.tur === 'hizmetIlce') parcalar.push({ ad: sayfa.ilce, yol: sayfaYolu(sayfa) });
    graf.push({
      '@type': 'BreadcrumbList',
      itemListElement: parcalar.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.ad, item: `${kok}${p.yol}` })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graf };
}
