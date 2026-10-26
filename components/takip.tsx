'use client';

import { useEffect, useSyncExternalStore } from 'react';
import type { Takip as TakipAyari } from '@/lib/tipler';

// Dönüşüm ölçümü ve çerez onayı.
// - Ölçüm kodları yalnızca ziyaretçi "Kabul et" derse yüklenir (KVKK); bu yüzden sayfa hızını etkilemez.
// - Google onay modu v2: önce her şey "reddedildi" ile başlar, kabulde güncellenir.
// - data-olay="telefon" | "whatsapp" taşıyan her tıklama Ads dönüşümü, GA4 olayı ve Meta "Contact" olarak gider.

const ANAHTAR = 'cerez-onayi';
const TERCIH_OLAYI = 'cerez-tercihleri';
type Onay = 'kabul' | 'red' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void };
    _fbq?: unknown;
  }
}

function oku(): Onay {
  try {
    const v = localStorage.getItem(ANAHTAR);
    return v === 'kabul' || v === 'red' ? v : null;
  } catch {
    return null;
  }
}

const dinleyiciler = new Set<() => void>();
function yaz(v: Exclude<Onay, null>) {
  try {
    localStorage.setItem(ANAHTAR, v);
  } catch {}
  dinleyiciler.forEach((f) => f());
}
function abone(f: () => void) {
  dinleyiciler.add(f);
  window.addEventListener('storage', f);
  return () => {
    dinleyiciler.delete(f);
    window.removeEventListener('storage', f);
  };
}

let tercihAcik = false;
function tercihAboneligi(f: () => void) {
  const ac = () => {
    tercihAcik = true;
    f();
  };
  window.addEventListener(TERCIH_OLAYI, ac);
  dinleyiciler.add(f);
  return () => {
    window.removeEventListener(TERCIH_OLAYI, ac);
    dinleyiciler.delete(f);
  };
}

function scriptEkle(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let yuklendi = false;
function olcumuYukle(t: TakipAyari) {
  if (yuklendi) return;
  yuklendi = true;
  const ilkKimlik = t.ga4 ?? t.googleAds?.id;
  if (ilkKimlik) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js "arguments" nesnesini bekler
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    window.gtag('js', new Date());
    if (t.ga4) window.gtag('config', t.ga4);
    if (t.googleAds) window.gtag('config', t.googleAds.id);
    scriptEkle(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ilkKimlik)}`);
  }
  if (t.metaPiksel) {
    // Meta'nın resmî yükleyicisinin karşılığı: script gelene kadar çağrılar kuyrukta bekler
    const kuyruk: unknown[] = [];
    const fbq: NonNullable<Window['fbq']> = Object.assign(
      (...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args);
        else kuyruk.push(args);
      },
      { queue: kuyruk },
    );
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq = fbq;
    fbq('init', t.metaPiksel);
    fbq('track', 'PageView');
    scriptEkle('https://connect.facebook.net/en_US/fbevents.js');
  }
}

function olayGonder(t: TakipAyari, tur: 'telefon' | 'whatsapp') {
  const etiket = tur === 'telefon' ? t.googleAds?.telefonEtiketi : t.googleAds?.whatsappEtiketi;
  if (window.gtag) {
    if (t.googleAds && etiket) window.gtag('event', 'conversion', { send_to: `${t.googleAds.id}/${etiket}` });
    if (t.ga4) window.gtag('event', tur === 'telefon' ? 'telefon_tiklama' : 'whatsapp_tiklama', { sayfa: location.pathname });
  }
  window.fbq?.('track', 'Contact', { yontem: tur });
}

export default function Takip({ takip, politika }: { takip: TakipAyari; politika: string }) {
  const onay = useSyncExternalStore(abone, oku, () => 'red' as Onay);
  const tercih = useSyncExternalStore(tercihAboneligi, () => tercihAcik, () => false);

  useEffect(() => {
    if (onay === 'kabul') olcumuYukle(takip);
  }, [onay, takip]);

  useEffect(() => {
    const tikla = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLElement>('[data-olay]');
      const tur = a?.dataset.olay;
      if (oku() === 'kabul' && (tur === 'telefon' || tur === 'whatsapp')) olayGonder(takip, tur);
    };
    document.addEventListener('click', tikla, { capture: true });
    return () => document.removeEventListener('click', tikla, { capture: true });
  }, [takip]);

  if (onay !== null && !tercih) return null;

  const sec = (v: 'kabul' | 'red') => {
    tercihAcik = false;
    yaz(v);
    // Reddedilirse yüklenmiş ölçüm kodlarını devre dışı bırakmak için sayfa yenilenir.
    if (v === 'red' && yuklendi) location.reload();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihi"
      className="fixed inset-x-3 bottom-3 z-[60] mr-16 rounded-2xl border border-cizgi bg-white p-4 text-[0.85rem] text-metin shadow-[0_20px_50px_-20px_rgb(11_18_32/0.45)] sm:inset-x-auto sm:left-5 sm:mr-0 sm:max-w-sm"
    >
      <p>
        Reklamlarımızın işe yarayıp yaramadığını ölçmek için çerez kullanmak istiyoruz. Onay vermezseniz yalnızca zorunlu bilgiler kullanılır.{' '}
        <a href={politika} className="font-semibold text-ana underline-offset-2 hover:underline">
          Çerez politikası
        </a>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => sec('red')} className="h-10 rounded-full border border-cizgi font-semibold text-murekkep hover:bg-zemin">
          Reddet
        </button>
        <button type="button" onClick={() => sec('kabul')} className="h-10 rounded-full bg-gece font-semibold text-white hover:bg-ana">
          Kabul et
        </button>
      </div>
    </div>
  );
}

/** Alt bilgideki "Çerez tercihleri" bağlantısı: onay kutusunu yeniden açar */
export function CerezTercihleri() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(TERCIH_OLAYI))} className="hover:text-ana">
      Çerez tercihleri
    </button>
  );
}
