import { CircleCheck, TriangleAlert } from 'lucide-react';
import type { Sektor } from '@/lib/tipler';
import WhatsappLogo from './whatsapp-logo';

type Test = NonNullable<Sektor['evdeTest']>;

// JavaScript'siz: seçilen cevaba göre sonuç CSS :has() ile görünür.
export default function KacakTesti({ test, evetLink }: { test: Test; evetLink: string }) {
  return (
    <div className="group rounded-3xl border border-cizgi bg-white p-6 shadow-kart sm:p-8">
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
            <label
              key={s}
              className="flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border-2 border-cizgi bg-white px-4 font-semibold text-murekkep transition-colors hover:border-ana has-checked:border-ana has-checked:bg-ana has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-ana"
            >
              <input type="radio" name="kacak-testi" value={s} data-cevap={s} className="sr-only" />
              {s === 'evet' ? test.evetBaslik : test.hayirBaslik}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="hidden group-has-[[data-cevap=evet]:checked]:block">
        <div className="mt-5 rounded-2xl bg-amber-50 p-5">
          <p className="flex gap-3 font-medium text-murekkep">
            <TriangleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            {test.evetMetin}
          </p>
          <a
            href={evetLink}
            target="_blank"
            rel="noopener noreferrer"
            data-olay="whatsapp"
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp-koyu px-6 font-bold text-white hover:bg-[#0e7a40]"
          >
            <WhatsappLogo />
            Sonucu WhatsApp’tan bildirin
          </a>
        </div>
      </div>
      <p className="mt-5 hidden gap-3 rounded-2xl bg-emerald-50 p-5 font-medium text-murekkep group-has-[[data-cevap=hayir]:checked]:flex">
        <CircleCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        {test.hayirMetin}
      </p>
    </div>
  );
}
