import type { Metadata } from 'next';
import type { Firma, Sektor } from './tipler';
import { doldur, telHref } from './firma';

export function sayfaMetadata(sektor: Sektor, firma: Firma): Metadata {
  const baslik = doldur(sektor.seoBaslik, firma);
  const aciklama = doldur(sektor.seoAciklama, firma);
  return {
    title: baslik,
    description: aciklama,
    alternates: firma.siteUrl ? { canonical: firma.siteUrl } : undefined,
    openGraph: { title: baslik, description: aciklama, type: 'website', locale: 'tr_TR', url: firma.siteUrl },
  };
}

/** schema.org yerel işletme verisi; yalnızca gerçek müşteri sitesinde basılır. */
export function isletmeSchema(sektor: Sektor, firma: Firma) {
  const veri: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': sektor.schemaTuru,
    name: firma.ad,
    telephone: telHref(firma).replace('tel:', ''),
    url: firma.siteUrl,
    description: doldur(sektor.seoAciklama, firma),
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
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: sektor.ad,
      itemListElement: sektor.hizmetler.map((h) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: h.ad } })),
    },
  };
  // Puan yalnızca gerçek Google verisi girildiyse eklenir.
  if (firma.googlePuani) {
    veri.aggregateRating = { '@type': 'AggregateRating', ratingValue: firma.googlePuani.puan, reviewCount: firma.googlePuani.yorumSayisi };
  }
  return veri;
}

const GUNLER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
