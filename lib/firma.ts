import type { Firma, Renk, Sektor } from './tipler';
import { deEki } from './dil';

export const DEMO = process.env.NEXT_PUBLIC_DEMO === '1';
export const ULUZON_URL = 'https://uluzon.com';

/** Telefonu yalnızca rakam olarak, başında 0 ile döndürür: 05321234567 */
function rakamlar(tel: string): string {
  let d = tel.replace(/\D/g, '');
  if (d.startsWith('90') && d.length === 12) d = `0${d.slice(2)}`;
  if (d.length === 10) d = `0${d}`;
  return d;
}

export function telefonGecerli(tel: string): boolean {
  return /^0[2-9]\d{9}$/.test(rakamlar(tel));
}

/** 05321234567 → 0532 123 45 67 */
export function telefonBicimle(tel: string): string {
  const d = rakamlar(tel);
  if (d.length !== 11) return tel.trim();
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
}

export function telHref(firma: Firma): string {
  return `tel:+90${rakamlar(firma.telefon).slice(1)}`;
}

export function waLink(firma: Firma, mesaj?: string): string {
  const numara = firma.whatsapp ? firma.whatsapp.replace(/\D/g, '') : `90${rakamlar(firma.telefon).slice(1)}`;
  const metin = mesaj ?? `Merhaba ${firma.ad}, bir sorunum var. Fotoğraf gönderebilirim.`;
  return `https://wa.me/${numara}?text=${encodeURIComponent(metin)}`;
}

/** Metindeki {firma}, {sehir}, {yer}, {yerde} yer tutucularını doldurur. Yer verilmezse şehirdir. */
export function doldur(metin: string, firma: Firma, yer: string = firma.sehir): string {
  return metin
    .replaceAll('{firma}', firma.ad)
    .replaceAll('{sehir}', firma.sehir)
    .replaceAll('{yerde}', deEki(yer))
    .replaceAll('{yer}', yer);
}

/** Türkçe adı adres parçasına çevirir: "Yenişehir" → "yenisehir" */
export function slugla(ad: string): string {
  const harf: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' };
  return ad
    .toLocaleLowerCase('tr-TR')
    .replace(/[çğıöşü]/g, (h) => harf[h])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function renkler(sektor: Sektor, firma: Firma): Renk {
  return { ...sektor.renk, ...firma.renk };
}

/** Firma adının baş harfleri: "Yıldız Tesisat" → "YT" */
export function basHarfler(ad: string): string {
  return ad
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k.charAt(0).toLocaleUpperCase('tr-TR'))
    .join('');
}

function temizMetin(deger: string | string[] | undefined, enFazla: number): string | undefined {
  const v = Array.isArray(deger) ? deger[0] : deger;
  if (!v) return undefined;
  const t = v.replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, enFazla);
  return t || undefined;
}

export type DemoParametreleri = Record<string, string | string[] | undefined>;

/**
 * Demo linkindeki parametrelerle firmayı kişiselleştirir:
 * /tesisat?firma=Yıldız Tesisat&tel=05321234567&ilce=Yenişehir&sehir=Mersin
 */
export function demoFirma(varsayilan: Firma, p: DemoParametreleri): Firma {
  const ad = temizMetin(p.firma, 40);
  const tel = temizMetin(p.tel, 20);
  const ilce = temizMetin(p.ilce, 24);
  const sehir = temizMetin(p.sehir, 24);
  const ilceler = ilce && !varsayilan.ilceler.includes(ilce) ? [ilce, ...varsayilan.ilceler] : varsayilan.ilceler;
  return {
    ...varsayilan,
    ad: ad ?? varsayilan.ad,
    telefon: tel && telefonGecerli(tel) ? telefonBicimle(tel) : varsayilan.telefon,
    whatsapp: tel && telefonGecerli(tel) ? undefined : varsayilan.whatsapp,
    ilce: ilce ?? varsayilan.ilce,
    sehir: sehir ?? varsayilan.sehir,
    ilceler,
    googlePuani: varsayilan.googlePuani ?? { puan: 4.9, yorumSayisi: 127 },
  };
}
