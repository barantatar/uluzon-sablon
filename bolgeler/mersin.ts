import type { IlceBilgisi } from '@/lib/tipler';

// Mersin ilçeleri: bütün sektör şablonlarında ortak kullanılır.
// Yapı tipleri sektör dosyasındaki yapiNotlari ile eşleşir ve her ilçe sayfasına
// o ilçeye özgü içerik üretir. Mahalle listeleri satıştan önce firmayla teyit edilmelidir.
export const mersin: Record<string, IlceBilgisi> = {
  Akdeniz: {
    tanim: 'Mersin’in en eski yerleşim bölgelerinden biri. Çarşı çevresinde onlarca yıllık apartmanlar, iş yerleri ve dükkânlar bir arada.',
    mahalleler: ['Çankaya', 'Camişerif', 'Kiremithane', 'Mahmudiye', 'Nusratiye', 'Karaduvar'],
    yapilar: ['eski', 'isyeri'],
    komsular: ['Toroslar', 'Yenişehir'],
  },
  Yenişehir: {
    tanim: 'Yüksek katlı apartmanların ve sitelerin yoğun olduğu, hızla büyüyen merkez ilçe.',
    mahalleler: ['Pirireis', 'Menteş', 'Çiftlikköy', 'Batıkent', 'Limonluk', 'Gazi'],
    yapilar: ['site', 'apartman'],
    komsular: ['Mezitli', 'Akdeniz', 'Toroslar'],
  },
  Mezitli: {
    tanim: 'Sahil boyunca uzanan yeni siteler, yüksek katlı binalar ve yazlık konutlarla büyüyen ilçe.',
    mahalleler: ['Tece', 'Davultepe', 'Kuyuluk', 'Viranşehir', 'Deniz', 'Merkez'],
    yapilar: ['site', 'yazlik'],
    komsular: ['Yenişehir', 'Erdemli'],
  },
  Toroslar: {
    tanim: 'Eski mahallelerle yeni konut alanlarının iç içe olduğu, müstakil evlerin de sık görüldüğü kuzey ilçe.',
    mahalleler: ['Çukurova', 'Akbelen', 'Yalınayak', 'Mithatpaşa', 'Halkkent'],
    yapilar: ['eski', 'mustakil'],
    komsular: ['Akdeniz', 'Yenişehir'],
  },
  Erdemli: {
    tanim: 'Sahil şeridinde yazlık sitelerin, iç kesimlerde müstakil evlerin ve seraların bulunduğu ilçe.',
    mahalleler: ['Ayaş', 'Kumkuyu', 'Kocahasanlı', 'Tömük', 'Arpaçbahşiş', 'Limonlu'],
    yapilar: ['yazlik', 'mustakil'],
    komsular: ['Mezitli', 'Silifke'],
  },
  Tarsus: {
    tanim: 'Tarihi merkezinde eski evlerin, çevresinde yeni toplu konutların ve müstakil yapıların olduğu büyük ilçe.',
    mahalleler: ['Merkez', 'Yenice', 'Gülek'],
    yapilar: ['eski', 'mustakil'],
    komsular: ['Akdeniz', 'Toroslar'],
  },
  Silifke: {
    tanim: 'Taşucu, Atakent ve Susanoğlu’ndaki yazlık sitelerle merkezdeki müstakil ve eski yapıların bir arada olduğu ilçe.',
    mahalleler: ['Taşucu', 'Atakent', 'Susanoğlu', 'Merkez'],
    yapilar: ['yazlik', 'mustakil'],
    komsular: ['Erdemli'],
  },
};
