// Şablonun iki katmanı vardır:
// - Sektör: o işin dili (hizmetler, süreç, sık sorular). Tüm firmalarda aynıdır.
// - Firma: tek bir müşteriye ait bilgiler (ad, telefon, bölge, yorumlar, renk).
//
// Metinlerde kullanılabilen yer tutucular:
//   {firma}  firma adı            {sehir}  firmanın şehri
//   {yer}    sayfanın yeri: ilçe sayfasında ilçe, diğerlerinde şehir
//   {yerde}  bulunma ekli yer: "Yenişehir’de", "Mersin’de"

export type Ikon =
  | 'damla'
  | 'tikaniklik'
  | 'musluk'
  | 'nem'
  | 'kombi'
  | 'sayac'
  | 'boru'
  | 'banyo'
  | 'cihaz'
  | 'temiz'
  | 'fiyat'
  | 'garanti';

/** Başlığın düz ve vurgulu iki parçası */
export interface Baslik {
  on: string;
  vurgu: string;
}

export interface Soru {
  soru: string;
  cevap: string;
}

export interface Adim {
  baslik: string;
  metin: string;
}

export interface Hizmet {
  /** Sayfa adresi: /su-kacagi-tespiti, /su-kacagi-tespiti/yenisehir */
  slug: string;
  ad: string;
  ikon: Ikon;
  /** Kartta görünen tek cümle */
  kisa: string;
  baslik: Baslik;
  aciklama: string;
  /** "Bu belirtiler varsa çağırın" */
  belirtiler: string[];
  /** "Neler yapıyoruz" */
  kapsam: string[];
  sss: Soru[];
  /** Cihazla tespit anlatımı ve kırmadan/kırarak karşılaştırması gösterilsin mi */
  cihazla?: boolean;
  /** Evde kaçak testi gösterilsin mi */
  test?: boolean;
  /** WhatsApp'a hazır giden mesajın sorun kısmı */
  mesaj: string;
}

export interface Sektor {
  slug: string;
  ad: string;
  /** Üst menüde firma adının altında görünen kısa etiket */
  etiket: string;
  /** Ana sayfa ve ilçe sayfası başlığı */
  baslik: Baslik;
  aciklama: string;
  /** Hero altındaki kısa güven maddeleri */
  guvenMaddeleri: { ikon: Ikon; metin: string }[];
  /** Acil durumda ilk yapılacaklar */
  ilkAdimlar: { soru: string; adimlar: string[] };
  hizmetler: Hizmet[];
  /** Cihazla tespit bölümü */
  tespit: {
    baslik: string;
    metin: string;
    eski: { baslik: string; maddeler: string[] };
    yeni: { baslik: string; maddeler: string[] };
  };
  farklar: { ikon: Ikon; baslik: string; metin: string }[];
  /** İlçe sayfaları için: yapı tipine göre o sektörün sık gördüğü sorunlar */
  yapiNotlari: Partial<Record<YapiTuru, { baslik: string; metin: string; hizmetler: string[] }>>;
  /** İlçe sayfasına özel sorular; {yer} ilçedir */
  ilceSss: Soru[];
  surec: Adim[];
  sss: Soru[];
  /** Sayfa sonundaki çağrı başlığı */
  sonCagri: string;
  ornekYorumlar: Yorum[];
  /** Ziyaretçinin evde kendi yapabileceği kısa kontrol (ör. görünmeyen kaçak testi) */
  evdeTest?: {
    baslik: string;
    aciklama: string;
    adimlar: string[];
    soru: string;
    evetBaslik: string;
    evetMetin: string;
    evetMesaj: string;
    hayirBaslik: string;
    hayirMetin: string;
  };
  /** Ana sayfa ve ilçe sayfası SEO metinleri; hizmet sayfaları kendi başlığından üretilir */
  seoBaslik: string;
  seoAciklama: string;
  /** schema.org işletme türü */
  schemaTuru: string;
  /** Demo ve fotoğrafı olmayan firmalar için varsayılan hero fotoğrafı */
  heroFoto?: HeroFoto;
  renk: Renk;
}

/** Bir ilçedeki yaygın yapı tipi; sektör her tip için ayrı not ve öne çıkan hizmetler verir */
export type YapiTuru = 'eski' | 'apartman' | 'site' | 'yazlik' | 'mustakil' | 'isyeri';

export interface IlceBilgisi {
  /** İlçeyi tanıtan bir iki cümle */
  tanim: string;
  mahalleler: string[];
  yapilar: YapiTuru[];
  komsular: string[];
}

/**
 * Hero arka plan fotoğrafı. Dosyalar public/hero/ altında şu adlarla durur:
 *   {ad}-genis-960 / {ad}-genis-1376  (masaüstü, özne sağda)
 *   {ad}-dar-720                      (mobil kırpım)
 * her biri .avif ve .webp olarak. scripts/hero-foto.mjs bu dosyaları üretir.
 */
export interface HeroFoto {
  ad: string;
  alt: string;
}

export interface Renk {
  /** Ana renk: butonlar, ikonlar, vurgular */
  ana: string;
  anaKoyu: string;
  anaAcik: string;
  /** Koyu zemin: hero ve son çağrı bandı */
  gece: string;
}

export interface Yorum {
  ad: string;
  ilce?: string;
  puan: number;
  metin: string;
}

export interface Firma {
  ad: string;
  /** Ekranda görünen biçim: 0532 123 45 67 */
  telefon: string;
  /** Uluslararası biçimde WhatsApp numarası, boşsa telefondan türetilir */
  whatsapp?: string;
  sehir: string;
  /** Firmanın bulunduğu ilçe */
  ilce: string;
  /** Hizmet verilen ilçeler; her biri için ayrı sayfa açılır */
  ilceler: string[];
  adres?: string;
  calismaSaatleri: string;
  /** "Şu an açığız" rozeti için saatler (İstanbul saati, her gün) */
  saatler?: { acilis: string; kapanis: string };
  /** 7/24 hizmet veriyorsa true */
  yirmiDortSaat: boolean;
  googlePuani?: { puan: number; yorumSayisi: number; link?: string };
  yorumlar?: Yorum[];
  /** Kuruluş yılı veya "15 yıllık tecrübe" gibi metin */
  tecrube?: string;
  /** İşçilik garantisi (ay) */
  garantiAy?: number;
  /** Keşif ücreti metni: "300 ₺, iş yapılırsa düşülür" */
  kesifUcreti?: string;
  /** Ana sayfa başlığı; verilirse sektörün başlığını ezer (ör. yalnızca su kaçağı yapan firma) */
  baslik?: Baslik;
  aciklama?: string;
  /** İlçeye varış süresi: { Yenişehir: '20-30 dakika' } */
  varisSuresi?: Record<string, string>;
  /** Firmanın kendi hero fotoğrafı; sektörün fotoğrafını ezer */
  heroFoto?: HeroFoto;
  /** Firma rengi verilirse sektörün varsayılan rengini ezer */
  renk?: Partial<Renk>;
  siteUrl?: string;
}
