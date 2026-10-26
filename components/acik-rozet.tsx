'use client';

import { useSyncExternalStore } from 'react';

function dakika(saat: string): number {
  const [s, d] = saat.split(':').map(Number);
  return s * 60 + d;
}

function simdiIstanbul(): number {
  const p = new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const s = Number(p.find((x) => x.type === 'hour')?.value ?? 0);
  const d = Number(p.find((x) => x.type === 'minute')?.value ?? 0);
  return s * 60 + d;
}

const abone = (cb: () => void) => {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
};

/** Çalışma saatine göre "Şu an açığız" ya da "Açılış 08:00" gösterir. Sunucuda saat yazılı metin görünür. */
export default function AcikRozet({ saatler, yedekMetin }: { saatler: { acilis: string; kapanis: string }; yedekMetin: string }) {
  const simdi = useSyncExternalStore(abone, simdiIstanbul, () => -1);
  if (simdi < 0) return <span>{yedekMetin}</span>;
  const acik = simdi >= dakika(saatler.acilis) && simdi < dakika(saatler.kapanis);
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className={`relative inline-flex h-2 w-2 rounded-full ${acik ? 'bg-emerald-500' : 'bg-amber-400'}`}>
        {acik && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />}
      </span>
      {acik ? `Şu an açığız · Kapanış ${saatler.kapanis}` : `Şu an kapalıyız · Açılış ${saatler.acilis}`}
    </span>
  );
}
