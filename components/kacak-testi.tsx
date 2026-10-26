'use client';

import { useState } from 'react';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import type { Sektor } from '@/lib/tipler';

type Test = NonNullable<Sektor['evdeTest']>;

export default function KacakTesti({ test, evetLink }: { test: Test; evetLink: string }) {
  const [sonuc, setSonuc] = useState<'evet' | 'hayir' | null>(null);
  return (
    <div className="rounded-3xl border border-cizgi bg-white p-6 shadow-kart sm:p-8">
      <ol className="space-y-4">
        {test.adimlar.map((a, i) => (
          <li key={a} className="flex gap-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ana-acik text-sm font-bold text-ana">{i + 1}</span>
            <p className="pt-1 leading-relaxed text-metin">{a}</p>
          </li>
        ))}
      </ol>
      <fieldset className="mt-7 border-t border-cizgi pt-6">
        <legend className="font-bold text-murekkep">{test.soru}</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(['evet', 'hayir'] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={sonuc === s}
              onClick={() => setSonuc(s)}
              className={`min-h-12 rounded-2xl border-2 px-4 font-semibold transition-colors ${
                sonuc === s ? 'border-ana bg-ana text-white' : 'border-cizgi bg-white text-murekkep hover:border-ana'
              }`}
            >
              {s === 'evet' ? test.evetBaslik : test.hayirBaslik}
            </button>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite">
        {sonuc === 'evet' && (
          <div className="mt-5 rounded-2xl bg-orange-50 p-5">
            <p className="flex gap-3 font-medium text-murekkep">
              <TriangleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-acil" />
              {test.evetMetin}
            </p>
            <a href={evetLink} target="_blank" rel="noopener noreferrer" data-olay="whatsapp" className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-acil px-6 font-bold text-white hover:bg-acil-koyu">
              Sonucu WhatsApp’tan bildirin
            </a>
          </div>
        )}
        {sonuc === 'hayir' && (
          <p className="mt-5 flex gap-3 rounded-2xl bg-emerald-50 p-5 font-medium text-murekkep">
            <CircleCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            {test.hayirMetin}
          </p>
        )}
      </div>
    </div>
  );
}
