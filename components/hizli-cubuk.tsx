'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import WhatsappLogo from './whatsapp-logo';

/**
 * Hero yarılanınca alttan açılan "Hemen Arayın / WhatsApp" çubuğu; hero'nun üst yarısı ekrandayken gizli kalır.
 */
export default function HizliCubuk({ tel, wa, telefon }: { tel: string; wa: string; telefon: string }) {
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    // Hero'nun yarısı ekranın üstünden çıkınca açılır; hero'su olmayan sayfalarda (yasal metinler) biraz kaydırınca.
    const kontrol = () => {
      if (!hero) return setAcik(window.scrollY > 320);
      const { top, height } = hero.getBoundingClientRect();
      setAcik(top + height / 2 <= 0);
    };
    kontrol();
    window.addEventListener('scroll', kontrol, { passive: true });
    window.addEventListener('resize', kontrol, { passive: true });
    return () => {
      window.removeEventListener('scroll', kontrol);
      window.removeEventListener('resize', kontrol);
    };
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-cubuk', acik);
  }, [acik]);

  return (
    <div
      aria-hidden={!acik}
      inert={!acik}
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 ease-out sm:px-6 sm:pb-5 print:hidden ${
        acik ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2 rounded-2xl border border-cizgi/80 bg-white/95 p-2 shadow-[0_18px_50px_-12px_rgb(15_23_42/0.35)] backdrop-blur-xl">
        <a
          href={tel}
          data-olay="telefon"
          aria-label={`Hemen arayın: ${telefon}`}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gece text-[0.95rem] font-bold text-white transition-colors hover:bg-gece/90"
        >
          <Phone aria-hidden className="zil h-[1.05rem] w-[1.05rem] text-red-400" strokeWidth={2.25} />
          Hemen Arayın
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-olay="whatsapp"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp text-[0.95rem] font-bold text-white transition-[filter] hover:brightness-95"
        >
          <WhatsappLogo className="h-[1.15rem] w-[1.15rem]" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
