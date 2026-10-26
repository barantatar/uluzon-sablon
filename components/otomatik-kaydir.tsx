'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Yatay kayan listeyi (yalnızca taşma varsa, ör. mobilde) aralıklarla bir öğe ileri kaydırır.
 * Sona gelince başa döner. Kullanıcı dokununca bir süre durur; "hareketi azalt" açıksa hiç çalışmaz.
 */
export default function OtomatikKaydir({ className, aralik = 2000, children }: { className?: string; aralik?: number; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let bekleyene = 0;
    const dur = () => {
      bekleyene = Date.now() + 6000;
    };
    el.addEventListener('pointerdown', dur, { passive: true });
    el.addEventListener('wheel', dur, { passive: true });
    const id = window.setInterval(() => {
      if (Date.now() < bekleyene || el.scrollWidth <= el.clientWidth + 4 || document.hidden) return;
      const ilk = el.firstElementChild as HTMLElement | null;
      const adim = ilk ? ilk.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : el.clientWidth / 2;
      const sonda = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: sonda ? 0 : el.scrollLeft + adim, behavior: 'smooth' });
    }, aralik);
    return () => {
      window.clearInterval(id);
      el.removeEventListener('pointerdown', dur);
      el.removeEventListener('wheel', dur);
    };
  }, [aralik]);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
