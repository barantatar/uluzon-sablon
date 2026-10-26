import type { Firma } from '@/lib/tipler';

// ╔════════════════════════════════════════════════════════════════════╗
// ║  YENİ FİRMA KURULUMU: yalnızca bu dosya (ve isterseniz             ║
// ║  app/yazitipi.ts ile public/ altındaki logo/fotoğraf) değişir.      ║
// ║  Derleme sırasında ayarlar otomatik kontrol edilir; eksik ya da     ║
// ║  hatalı bir bilgi varsa Türkçe uyarı verir. Rehber: KURULUM.md      ║
// ╚════════════════════════════════════════════════════════════════════╝
//
// Demo kurulumunda (NEXT_PUBLIC_DEMO=1) bu bilgiler linkteki parametrelerle ezilir.

/** sektorler/ klasöründeki sektör: 'tesisat' */
export const SEKTOR = 'tesisat';

export const FIRMA: Firma = {
  // ── Kimlik ────────────────────────────────────────────────────────
  ad: 'Örnek Tesisat',
  unvan: undefined, // 'Yıldız Tesisat - Ahmet Yıldız' (KVKK metni için)
  siteUrl: undefined, // 'https://yildiztesisat.com' (canonical, sitemap, schema)

  // ── İletişim ──────────────────────────────────────────────────────
  telefon: '0850 242 73 63',
  whatsapp: undefined, // telefondan farklıysa: '905321234567'
  eposta: undefined,
  adres: undefined, // 'Akdeniz Mah. 1234 Sk. No:5, Mezitli/Mersin'

  // ── Bölge (her ilçe için ayrı sayfa açılır; bolgeler/ verisiyle eşleşmeli) ─
  sehir: 'Mersin',
  ilce: 'Mezitli',
  ilceler: ['Mezitli', 'Yenişehir', 'Toroslar', 'Akdeniz', 'Erdemli', 'Tarsus', 'Silifke'],
  // Firmadan alınır; boş bırakılan ilçede gösterilmez.
  varisSuresi: { Mezitli: '20-30 dakika', Yenişehir: '20-30 dakika', Akdeniz: '30-40 dakika', Toroslar: '30-40 dakika' },

  // ── Çalışma saatleri ──────────────────────────────────────────────
  calismaSaatleri: 'Her gün 08:00 – 22:00',
  saatler: { acilis: '08:00', kapanis: '22:00' },
  yirmiDortSaat: false,

  // ── Güven (yalnızca gerçek bilgi girin) ───────────────────────────
  garantiAy: 12,
  tecrube: undefined, // '15 yıllık tecrübe'
  kesifUcreti: undefined,
  googlePuani: undefined, // { puan: 4.9, yorumSayisi: 127, link: 'https://g.page/r/...' }
  yorumlar: undefined, // [{ ad: 'Ayşe K.', ilce: 'Yenişehir', puan: 5, metin: '...' }]

  // ── Marka: firmalar birbirine benzemesin ──────────────────────────
  renk: undefined, // { ana: '#0f766e', anaKoyu: '#115e59', anaAcik: '#ecfdf5', gece: '#04201d' }
  kose: 'yumusak', // 'yumusak' | 'orta' | 'keskin'
  logo: undefined, // '/logo.svg'
  heroFoto: undefined, // { ad: 'yildiz', alt: '...' }  → node scripts/hero-foto.mjs usta.jpg yildiz
  baslik: undefined, // { on: '{yerde} su kaçağını', vurgu: 'kırmadan buluyoruz.' }
  aciklama: undefined,

  // ── Dönüşüm ölçümü (ziyaretçi çerez onayı verirse yüklenir) ──────
  takip: undefined,
  // takip: {
  //   ga4: 'G-XXXXXXXXXX',
  //   googleAds: { id: 'AW-123456789', telefonEtiketi: 'AbCdEf123', whatsappEtiketi: 'GhIjKl456' },
  //   metaPiksel: '1234567890',
  // },
};
