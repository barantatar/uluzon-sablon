'use client';

import { useEffect } from 'react';
import type { Panel } from '@/lib/tipler';

// Uluzon paneline giden sayaç: data-olay="telefon" | "whatsapp" taşıyan her tıklama firmanın panelinde sayılır.
// Çerez kullanmaz, ziyaretçiyi tanımaz; yalnızca olay türü, sayfa ve ziyaretçinin siteye nereden geldiği gider.
// Bu yüzden çerez onayı beklemez (Takip bileşenindeki reklam ölçümünden ayrıdır).

const GIRIS = 'giris-kaynagi';
const VARSAYILAN_ADRES = 'https://uluzon.com';

type Kaynak = 'reklam' | 'harita' | 'organik' | 'sosyal' | 'dogrudan' | 'diger';

// Ziyaretçinin ilk geldiği sayfanın adresi ve yönlendireni: reklam, Google Haritalar, arama, sosyal medya ya da doğrudan
function kaynakBul(): Kaynak {
  const p = new URLSearchParams(location.search);
  const kaynak = (p.get('utm_source') ?? '').toLowerCase();
  const ortam = (p.get('utm_medium') ?? '').toLowerCase();
  if (p.has('gclid') || p.has('gbraid') || p.has('wbraid') || ['cpc', 'ppc', 'paid'].includes(ortam)) return 'reklam';
  if (['gbp', 'gmb', 'maps', 'google-maps'].includes(kaynak)) return 'harita';
  if (['facebook', 'instagram', 'tiktok', 'fb', 'ig'].includes(kaynak)) return 'sosyal';
  let yonlendiren = '';
  try {
    yonlendiren = document.referrer ? new URL(document.referrer).hostname : '';
  } catch {}
  if (!yonlendiren) return 'dogrudan';
  if (/(^|\.)maps\.google\./.test(yonlendiren) || document.referrer.includes('google.com/maps')) return 'harita';
  if (/(^|\.)(google|bing|yandex|duckduckgo)\./.test(yonlendiren)) return 'organik';
  if (/(facebook|instagram|tiktok|t\.co|twitter|x\.com|linkedin)/.test(yonlendiren)) return 'sosyal';
  return 'diger';
}

function girisKaynagi(): Kaynak {
  try {
    const kayitli = sessionStorage.getItem(GIRIS) as Kaynak | null;
    if (kayitli) return kayitli;
    const k = kaynakBul();
    sessionStorage.setItem(GIRIS, k);
    return k;
  } catch {
    return kaynakBul();
  }
}

function gonder(panel: Panel, govde: object) {
  const adres = `${(panel.adres ?? VARSAYILAN_ADRES).replace(/\/$/, '')}/api/olay`;
  const veri = JSON.stringify({ a: panel.anahtar, ...govde });
  // text/plain: tarayıcı ön kontrol yapmaz; sayfa kapanırken de gider
  if (navigator.sendBeacon?.(adres, new Blob([veri], { type: 'text/plain' }))) return;
  fetch(adres, { method: 'POST', body: veri, keepalive: true }).catch(() => {});
}

export default function Sayac({ panel }: { panel: Panel }) {
  useEffect(() => {
    // Kaynak ilk sayfada belirlenir; site içinde gezinince değişmez
    const kaynak = girisKaynagi();
    const tikla = (e: MouseEvent) => {
      const tur = (e.target as Element | null)?.closest<HTMLElement>('[data-olay]')?.dataset.olay;
      if (tur === 'telefon' || tur === 'whatsapp') gonder(panel, { t: tur, k: kaynak, s: location.pathname });
    };
    document.addEventListener('click', tikla, { capture: true });
    return () => document.removeEventListener('click', tikla, { capture: true });
  }, [panel]);
  return null;
}
