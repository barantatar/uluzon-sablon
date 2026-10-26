import { existsSync } from 'node:fs';
import path from 'node:path';
import type { Firma, Sektor } from './tipler';
import { telefonGecerli } from './firma';
import { ilceBilgisi } from '@/bolgeler';

// firma.config.ts derlemede kontrol edilir. Hatalar derlemeyi durdurur (yanlış site yayına çıkmaz),
// uyarılar yalnızca yazılır (site çalışır ama eksik bir şey vardır).

const SAAT = /^([01]\d|2[0-3]):[0-5]\d$/;
let yapildi = false;

export function firmaDogrula(sektor: Sektor, f: Firma) {
  if (yapildi) return;
  yapildi = true;
  const hata: string[] = [];
  const uyari: string[] = [];
  const dosyaVar = (yol: string) => existsSync(path.join(process.cwd(), 'public', yol));

  if (!f.ad.trim()) hata.push('Firma adı boş.');
  if (!telefonGecerli(f.telefon)) hata.push(`Telefon geçersiz: "${f.telefon}". Örnek: 0532 123 45 67`);
  if (f.whatsapp && !/^90\d{10}$/.test(f.whatsapp.replace(/\D/g, ''))) hata.push(`WhatsApp numarası 90 ile başlayan 12 hane olmalı: "${f.whatsapp}"`);
  if (!f.ilceler.includes(f.ilce)) hata.push(`Firmanın ilçesi (${f.ilce}) hizmet verilen ilçeler listesinde yok.`);
  if (new Set(f.ilceler).size !== f.ilceler.length) hata.push('İlçe listesinde tekrar eden ilçe var.');
  for (const i of f.ilceler) {
    if (!ilceBilgisi(f.sehir, i)) uyari.push(`${i} için bolgeler/ verisi yok: ilçe sayfası genel içerikle açılır.`);
  }
  for (const i of Object.keys(f.varisSuresi ?? {})) {
    if (!f.ilceler.includes(i)) uyari.push(`varisSuresi içindeki "${i}" hizmet verilen ilçelerde yok.`);
  }
  if (f.saatler && (!SAAT.test(f.saatler.acilis) || !SAAT.test(f.saatler.kapanis))) hata.push('Çalışma saatleri SS:DD biçiminde olmalı (ör. 08:00).');

  if (!f.siteUrl) uyari.push('siteUrl boş: canonical, sitemap ve Google işletme verisi eksik kalır.');
  else if (!/^https:\/\/[^/]+/.test(f.siteUrl)) hata.push(`siteUrl https:// ile başlamalı: "${f.siteUrl}"`);

  if (!f.unvan) uyari.push('unvan boş: KVKK metninde veri sorumlusu olarak firma adı yazılır.');
  if (!f.eposta) uyari.push('eposta boş: KVKK başvuruları için yalnızca telefon gösterilir.');
  if (!f.googlePuani) uyari.push('Google puanı girilmedi: hero ve yorum bölümünde puan görünmez.');
  if (!f.yorumlar?.length) uyari.push('Gerçek yorum girilmedi: yorumlar bölümü gizlenir.');

  const t = f.takip;
  if (!t) uyari.push('takip boş: arama ve WhatsApp dönüşümleri ölçülmez.');
  if (t?.ga4 && !/^G-[A-Z0-9]{6,}$/.test(t.ga4)) hata.push(`GA4 kimliği G-XXXXXXX biçiminde olmalı: "${t.ga4}"`);
  if (t?.googleAds) {
    if (!/^AW-\d{6,}$/.test(t.googleAds.id)) hata.push(`Google Ads kimliği AW-123456789 biçiminde olmalı: "${t.googleAds.id}"`);
    if (!t.googleAds.telefonEtiketi) uyari.push('Google Ads telefon dönüşüm etiketi boş: arama tıklamaları dönüşüm sayılmaz.');
    if (!t.googleAds.whatsappEtiketi) uyari.push('Google Ads WhatsApp dönüşüm etiketi boş.');
  }
  if (!f.panel) uyari.push('panel boş: arama ve WhatsApp tıklamaları Uluzon panelinde sayılmaz.');
  else if (!/^[0-9a-f]{32}$/.test(f.panel.anahtar)) hata.push(`panel.anahtar 32 karakterlik olmalı (paneldeki "Site sayacı" kartından kopyalayın): "${f.panel.anahtar}"`);
  else if (f.panel.adres && !/^(https:\/\/[^/]+|http:\/\/localhost(:\d+)?)/.test(f.panel.adres)) hata.push(`panel.adres https:// ile başlamalı: "${f.panel.adres}"`);
  if (t?.metaPiksel && !/^\d{10,20}$/.test(t.metaPiksel)) hata.push(`Meta piksel kimliği yalnızca rakam olmalı: "${t.metaPiksel}"`);

  if (f.logo && !dosyaVar(f.logo)) hata.push(`Logo dosyası bulunamadı: public${f.logo}`);
  const foto = f.heroFoto ?? sektor.heroFoto;
  if (foto) {
    for (const ek of ['genis-960', 'genis-1376', 'dar-720']) {
      for (const tur of ['avif', 'webp']) {
        if (!dosyaVar(`/hero/${foto.ad}-${ek}.${tur}`)) hata.push(`Hero fotoğrafı eksik: public/hero/${foto.ad}-${ek}.${tur} (node scripts/hero-foto.mjs ile üretin)`);
      }
    }
  }
  for (const h of sektor.hizmetler) {
    if (!/^[a-z0-9-]+$/.test(h.slug)) hata.push(`Hizmet adresi yalnızca küçük harf, rakam ve tire içermeli: "${h.slug}"`);
  }

  if (uyari.length) console.warn(`\n⚠ Firma ayarı uyarıları (${f.ad}):\n  - ${uyari.join('\n  - ')}\n`);
  if (hata.length) throw new Error(`\n✖ firma.config.ts hataları (${f.ad}):\n  - ${hata.join('\n  - ')}\n`);
}
