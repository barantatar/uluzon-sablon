// Şablonun iki katmanı vardır:
// - Sektör: o işin dili (hizmetler, sorunlar, süreç, sık sorular). Tüm firmalarda aynıdır.
// - Firma: tek bir müşteriye ait bilgiler (ad, telefon, bölge, yorumlar, renk).

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

export interface Hizmet {
  slug: string;
  ad: string;
  ikon: Ikon;
  ozet: string;
  /** "Ne zaman çağırmalı" belirtileri */
  belirtiler: string[];
}

export interface Sorun {
  ad: string;
  ikon: Ikon;
  /** WhatsApp'a hazır giden mesajın sorun kısmı */
  mesaj: string;
}

export interface Adim {
  baslik: string;
  metin: string;
}

export interface Soru {
  soru: string;
  cevap: string;
}

export interface Sektor {
  slug: string;
  ad: string;
  /** Üst menüde firma adının altında görünen kısa etiket */
  etiket: string;
  /** Başlıkta kullanılan iş tanımı: "Su kaçağı ve tesisat arızası" */
  isTanimi: string;
  /** Başlığın vurgulu ikinci yarısı */
  vaat: string;
  /** Kısa açıklama; {ilce} ve {firma} yer tutucuları kullanılabilir */
  aciklama: string;
  /** Hero altındaki güven maddeleri */
  guvenMaddeleri: string[];
  /** Acil durumda ilk yapılacaklar kartı */
  acilAdimlar: { baslik: string; adimlar: string[] };
  sorunlar: Sorun[];
  hizmetler: Hizmet[];
  farklar: { ikon: Ikon; baslik: string; metin: string }[];
  surec: Adim[];
  sss: Soru[];
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
  /** SEO başlığı ve açıklaması; {ilce}, {sehir}, {firma} yer tutucuları */
  seoBaslik: string;
  seoAciklama: string;
  /** schema.org işletme türü */
  schemaTuru: string;
  renk: Renk;
}

export interface Renk {
  /** Ana renk: başlıklar, ikonlar, koyu bantlar */
  ana: string;
  anaKoyu: string;
  anaAcik: string;
  /** Aciliyet rengi: arama butonu */
  acil: string;
  acilKoyu: string;
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
  /** Başlıkta görünen ana ilçe */
  ilce: string;
  /** Hizmet verilen ilçeler */
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
  /** Firma rengi verilirse sektörün varsayılan rengini ezer */
  renk?: Partial<Renk>;
  siteUrl?: string;
}
