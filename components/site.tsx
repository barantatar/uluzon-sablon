import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight, Clock, MapPin, Phone, Star, TriangleAlert, X } from 'lucide-react';
import type { Baslik as BaslikTipi, Hizmet, Soru, Yorum } from '@/lib/tipler';
import { DEMO, ULUZON_URL, basHarfler, doldur, renkler, slugla } from '@/lib/firma';
import { sayfaYolu, type Baglam } from '@/lib/sayfa';
import Ikon from './ikon';
import AcikRozet from './acik-rozet';
import KacakTesti from './kacak-testi';
import TermalGorsel from './termal-gorsel';
import WhatsappLogo from './whatsapp-logo';

/* ------------------------------------------------------------------ */
/* Sayfalar                                                            */
/* ------------------------------------------------------------------ */

export default function Site({ b }: { b: Baglam }) {
  const { sayfa } = b;
  return (
    <Kabuk b={b}>
      {sayfa.tur === 'ana' || sayfa.tur === 'ilce' ? <GenelSayfa b={b} /> : <HizmetSayfasi b={b} hizmet={sayfa.hizmet} />}
    </Kabuk>
  );
}

function GenelSayfa({ b }: { b: Baglam }) {
  const { sektor, firma, sayfa, yer } = b;
  const ilceSayfasi = sayfa.tur === 'ilce';
  return (
    <>
      <Hero
        b={b}
        baslik={sektor.baslik}
        aciklama={doldur(sektor.aciklama, firma, yer)}
        kirinti={ilceSayfasi ? [{ ad: 'Bölgeler', href: b.yol('/', 'bolgeler') }, { ad: yer }] : undefined}
      />
      <GuvenSeridi b={b} />
      <IlkAdimlar b={b} />
      <Hizmetler b={b} />
      <Tespit b={b} />
      <Farklar b={b} />
      <Surec b={b} />
      {sektor.evdeTest && <EvdeTest b={b} />}
      <Yorumlar b={b} />
      <Bolgeler b={b} baslik={ilceSayfasi ? 'Yakın bölgelerde de hizmetinizdeyiz' : `${doldur('{yerde}', firma)} hizmet verdiğimiz bölgeler`} />
      <Sss b={b} sorular={sektor.sss} />
      <SonCagri b={b} />
    </>
  );
}

function HizmetSayfasi({ b, hizmet }: { b: Baglam; hizmet: Hizmet }) {
  const { sektor, firma, sayfa, yer } = b;
  const kirinti =
    sayfa.tur === 'hizmetIlce'
      ? [{ ad: hizmet.ad, href: b.yol(sayfaYolu({ tur: 'hizmet', hizmet })) }, { ad: yer }]
      : [{ ad: hizmet.ad }];
  return (
    <>
      <Hero b={b} baslik={hizmet.baslik} aciklama={doldur(hizmet.aciklama, firma, yer)} kirinti={kirinti} waMesaj={hizmet.mesaj} />
      <GuvenSeridi b={b} />
      {hizmet.cihazla && <IlkAdimlar b={b} />}
      <BelirtiKapsam b={b} hizmet={hizmet} />
      {hizmet.cihazla && <Tespit b={b} />}
      <Surec b={b} />
      {hizmet.test && sektor.evdeTest && <EvdeTest b={b} />}
      <Yorumlar b={b} />
      <Sss b={b} sorular={[...hizmet.sss, ...sektor.sss.slice(0, 2)]} />
      <DigerHizmetler b={b} haric={hizmet} />
      <Bolgeler b={b} hizmet={hizmet} baslik={`${hizmet.ad} hizmeti verdiğimiz bölgeler`} />
      <SonCagri b={b} waMesaj={hizmet.mesaj} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Kabuk: renkler, üst menü, alt bilgi, WhatsApp butonu                */
/* ------------------------------------------------------------------ */

function Kabuk({ b, children }: { b: Baglam; children: ReactNode }) {
  const r = renkler(b.sektor, b.firma);
  const stil = {
    '--renk-ana': r.ana,
    '--renk-ana-koyu': r.anaKoyu,
    '--renk-ana-acik': r.anaAcik,
    '--renk-gece': r.gece,
  } as CSSProperties;
  return (
    <div style={stil}>
      {DEMO && <DemoBandi b={b} />}
      <Ust b={b} />
      <main id="icerik">{children}</main>
      <Alt b={b} />
      <a
        href={b.wa()}
        target="_blank"
        rel="noopener noreferrer"
        data-olay="whatsapp"
        aria-label="WhatsApp’tan yazın"
        className="nabiz giris fixed bottom-5 right-5 z-50 grid h-15 w-15 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-6px_rgb(18_140_75/0.6)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
      >
        <WhatsappLogo className="h-8 w-8" />
      </a>
    </div>
  );
}

function DemoBandi({ b }: { b: Baglam }) {
  return (
    <div className="border-b border-cizgi bg-zemin text-center text-[0.8rem] text-soluk">
      <p className="kap py-2">
        <strong className="font-semibold text-murekkep">{b.firma.ad}</strong> için örnek site ·{' '}
        <a href={ULUZON_URL} className="font-semibold text-ana underline-offset-2 hover:underline">
          Uluzon ile yayına alın
        </a>
      </p>
    </div>
  );
}

function Ust({ b }: { b: Baglam }) {
  const { firma, sektor, yol, tel } = b;
  return (
    <header className="ust-giris ust-golge sticky top-0 z-40 border-b border-cizgi/70 bg-white/85 backdrop-blur-xl">
      <div className="kap flex h-16 items-center justify-between gap-4">
        <a href={yol('/')} className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-gece text-[0.85rem] font-extrabold tracking-tight text-white">
            {basHarfler(firma.ad)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.95rem] font-extrabold leading-tight tracking-tight text-murekkep">{firma.ad}</span>
            <span className="block truncate text-[0.72rem] font-medium text-soluk">
              {sektor.etiket} · {firma.sehir}
            </span>
          </span>
        </a>
        <nav aria-label="Ana menü" className="hidden items-center gap-1 text-[0.9rem] font-semibold text-metin lg:flex">
          <a href={yol('/', 'hizmetler')} className="menu-link rounded-full px-3.5 py-2 hover:text-murekkep">Hizmetler</a>
          <a href={yol('/', 'nasil')} className="menu-link rounded-full px-3.5 py-2 hover:text-murekkep">Nasıl çalışıyoruz</a>
          <a href={yol('/', 'bolgeler')} className="menu-link rounded-full px-3.5 py-2 hover:text-murekkep">Bölgeler</a>
          <a href={yol('/', 'sss')} className="menu-link rounded-full px-3.5 py-2 hover:text-murekkep">SSS</a>
        </nav>
        <a
          href={tel}
          data-olay="telefon"
          className="parilti inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gece px-4 text-[0.9rem] font-bold text-white transition-colors hover:bg-ana"
        >
          <Phone aria-hidden className="zil h-4 w-4" />
          <span className="sm:hidden">Ara</span>
          <span className="hidden sm:inline">{firma.telefon}</span>
        </a>
      </div>
    </header>
  );
}

function Alt({ b }: { b: Baglam }) {
  const { firma, sektor, yol, sayfa } = b;
  const hizmetIlce = sayfa.tur === 'hizmetIlce' || sayfa.tur === 'ilce' ? sayfa.ilce : undefined;
  return (
    <footer className="border-t border-cizgi bg-zemin">
      <div className="kap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-lg font-extrabold tracking-tight">{firma.ad}</p>
          <p className="mt-2 max-w-xs text-[0.9rem] leading-relaxed text-soluk">{doldur(sektor.seoAciklama, firma)}</p>
          <ul className="mt-5 space-y-2.5 text-[0.9rem] text-metin">
            <li>
              <a href={b.tel} data-olay="telefon" className="inline-flex items-center gap-2 font-bold text-murekkep hover:text-ana">
                <Phone aria-hidden className="h-4 w-4" /> {firma.telefon}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock aria-hidden className="h-4 w-4 text-soluk" /> {firma.yirmiDortSaat ? '7/24 hizmet' : firma.calismaSaatleri}
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-soluk" /> {firma.adres ?? `${firma.ilce}, ${firma.sehir}`}
            </li>
          </ul>
        </div>
        <nav aria-label="Hizmetler">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-soluk">Hizmetler</p>
          <ul className="mt-4 space-y-2.5 text-[0.9rem]">
            {sektor.hizmetler.map((h) => (
              <li key={h.slug}>
                <a href={yol(hizmetIlce ? sayfaYolu({ tur: 'hizmetIlce', hizmet: h, ilce: hizmetIlce }) : sayfaYolu({ tur: 'hizmet', hizmet: h }))} className="text-metin hover:text-ana">
                  {hizmetIlce ? `${hizmetIlce} ${h.ad.toLocaleLowerCase('tr-TR')}` : h.ad}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Bölgeler">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-soluk">Bölgeler</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.9rem]">
            {firma.ilceler.map((i) => (
              <li key={i}>
                <a href={yol(sayfaYolu({ tur: 'ilce', ilce: i }))} className="text-metin hover:text-ana">
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-cizgi">
        <div className="kap flex flex-col gap-2 py-5 pr-24 text-[0.8rem] text-soluk sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {firma.ad}</p>
          <p>
            Web sitesi ve dijital büyüme:{' '}
            <a href={ULUZON_URL} className="font-semibold text-metin hover:text-ana">
              Uluzon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Bölümler                                                            */
/* ------------------------------------------------------------------ */

function Hero({
  b,
  baslik,
  aciklama,
  kirinti,
  waMesaj,
}: {
  b: Baglam;
  baslik: BaslikTipi;
  aciklama: string;
  kirinti?: { ad: string; href?: string }[];
  waMesaj?: string;
}) {
  const { firma, yer, yol, tel } = b;
  const saatMetni = firma.yirmiDortSaat ? '7/24 açığız' : firma.calismaSaatleri;
  return (
    <section className="relative isolate overflow-hidden bg-gece text-white">
      {/* Arka plan: yumuşak ışık ve ince ızgara */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="suzul absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full bg-ana/45 blur-[120px]" />
        <div className="suzul-ters absolute -bottom-56 -left-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="tarama absolute inset-0">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-300/40 to-transparent shadow-[0_0_24px_2px_rgb(125_211_252/0.25)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      </div>

      <div className="kap grid gap-12 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          {kirinti && (
            <nav aria-label="Sayfa yolu" className="mb-6 text-[0.8rem] text-white/60">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <a href={yol('/')} className="hover:text-white">Ana sayfa</a>
                </li>
                {kirinti.map((k) => (
                  <li key={k.ad} className="flex items-center gap-1.5">
                    <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                    {k.href ? (
                      <a href={k.href} className="hover:text-white">{k.ad}</a>
                    ) : (
                      <span aria-current="page" className="text-white/85">{k.ad}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <p className="giris inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-[0.78rem] font-medium text-white/85 backdrop-blur">
            {firma.saatler && !firma.yirmiDortSaat ? <AcikRozet saatler={firma.saatler} yedekMetin={saatMetni} /> : saatMetni}
            <span aria-hidden className="h-3 w-px bg-white/20" />
            {yer === firma.sehir ? firma.sehir : `${yer}, ${firma.sehir}`}
          </p>

          <h1 className="giris-baslik mt-6 text-[2.35rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-[3.4rem] lg:text-[3.9rem]">
            {doldur(baslik.on, firma, yer)}{' '}
            <span className="isilti bg-gradient-to-r from-sky-300 via-white to-sky-300 bg-clip-text text-transparent">{baslik.vurgu}</span>
          </h1>
          <p style={{ '--gecikme': '180ms' } as CSSProperties} className="giris mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70 sm:text-lg">
            {aciklama}
          </p>

          <div style={{ '--gecikme': '280ms' } as CSSProperties} className="giris mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={tel}
              data-olay="telefon"
              className="parilti group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-[1.05rem] font-bold text-gece shadow-[0_18px_40px_-18px_rgb(255_255_255/0.6)] transition-transform hover:-translate-y-0.5"
            >
              <Phone aria-hidden className="zil h-5 w-5" />
              {firma.telefon}
            </a>
            <a
              href={b.wa(waMesaj)}
              target="_blank"
              rel="noopener noreferrer"
              data-olay="whatsapp"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-7 text-[1.05rem] font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.12]"
            >
              <WhatsappLogo className="h-5 w-5 text-whatsapp" />
              WhatsApp’tan yazın
            </a>
          </div>

          {firma.googlePuani && (
            <p style={{ '--gecikme': '380ms' } as CSSProperties} className="giris mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9rem] text-white/70">
              <Yildizlar puan={firma.googlePuani.puan} />
              <span>
                <strong className="font-bold text-white">{firma.googlePuani.puan.toLocaleString('tr-TR')}</strong> · {firma.googlePuani.yorumSayisi} Google yorumu
              </span>
            </p>
          )}
        </div>

        <div style={{ '--gecikme': '250ms' } as CSSProperties} className="giris relative hidden lg:block">
          <TermalKart />
        </div>
      </div>
    </section>
  );
}

function TermalKart() {
  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur">
      <div className="overflow-hidden rounded-[22px]">
        <TermalGorsel />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
        <span>
          <span className="block text-sm font-bold text-white">Termal kamera ile kaçak taraması</span>
          <span className="block text-[0.8rem] text-white/60">Bütün duvarı değil, yalnızca o noktayı açıyoruz.</span>
        </span>
        <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[0.7rem] font-medium text-white/70">Temsilî</span>
      </figcaption>
    </figure>
  );
}

function GuvenSeridi({ b }: { b: Baglam }) {
  const { firma, sektor } = b;
  const maddeler = [...sektor.guvenMaddeleri];
  if (firma.garantiAy) maddeler.push({ ikon: 'garanti', metin: `${firma.garantiAy} ay garanti` });
  return (
    <div className="border-b border-cizgi bg-white">
      <ul className="kap grid grid-cols-2 gap-x-4 gap-y-3 py-5 text-[0.88rem] font-semibold text-murekkep sm:flex sm:flex-wrap sm:justify-between">
        {maddeler.map((m) => (
          <li key={m.metin} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ana-acik text-ana">
              <Ikon ad={m.ikon} className="h-4 w-4" />
            </span>
            {m.metin}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IlkAdimlar({ b }: { b: Baglam }) {
  const { ilkAdimlar } = b.sektor;
  return (
    <div className="kap pt-8">
      <details className="group rounded-2xl border border-amber-200/70 bg-amber-50/60">
        <summary className="flex items-center gap-3 px-5 py-4 text-[0.95rem] font-semibold text-murekkep">
          <TriangleAlert aria-hidden className="h-5 w-5 shrink-0 text-amber-600" />
          <span className="flex-1">{ilkAdimlar.soru}</span>
          <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-soluk transition-transform group-open:rotate-180" />
        </summary>
        <ol className="space-y-2.5 px-5 pb-5 text-[0.93rem] text-metin">
          {ilkAdimlar.adimlar.map((a, i) => (
            <li key={a} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-murekkep ring-1 ring-amber-200">{i + 1}</span>
              <span className="pt-0.5">{a}</span>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}

function Hizmetler({ b }: { b: Baglam }) {
  const { sektor, sayfa, firma, yer } = b;
  const ilce = sayfa.tur === 'ilce' ? sayfa.ilce : undefined;
  return (
    <Bolum id="hizmetler" ust="Hizmetler" baslik={`${doldur('{yerde}', firma, yer)} neler yapıyoruz?`}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {sektor.hizmetler.map((h) => (
          <li key={h.slug}>
            <a
              href={b.yol(sayfaYolu(ilce ? { tur: 'hizmetIlce', hizmet: h, ilce } : { tur: 'hizmet', hizmet: h }))}
              className="group flex h-full items-center gap-4 rounded-2xl border border-cizgi bg-white p-4 transition-all hover:border-ana/40 hover:shadow-kart sm:flex-col sm:items-start sm:p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ana-acik text-ana">
                <Ikon ad={h.ikon} className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-murekkep">{h.ad}</span>
                <span className="mt-1 block text-[0.88rem] leading-snug text-soluk">{h.kisa}</span>
              </span>
              <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-soluk transition-transform group-hover:translate-x-0.5 group-hover:text-ana sm:mt-auto" />
            </a>
          </li>
        ))}
      </ul>
    </Bolum>
  );
}

function Tespit({ b }: { b: Baglam }) {
  const { tespit } = b.sektor;
  return (
    <Bolum id="nasil" ust="Kırmadan tespit" baslik={tespit.baslik} aciklama={tespit.metin} zemin>
      <div className="grid gap-6">
        <div className="overflow-hidden rounded-3xl bg-gece p-2 shadow-kart lg:hidden">
          <div className="overflow-hidden rounded-[18px]">
            <TermalGorsel />
          </div>
          <p className="flex items-center justify-between px-3 pb-1.5 pt-3 text-[0.8rem] text-white/65">
            Termal kamerada kaçak noktası
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.7rem]">Temsilî</span>
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-cizgi bg-white p-5 sm:p-7">
            <p className="font-bold text-soluk">{tespit.eski.baslik}</p>
            <ul className="mt-3 space-y-2.5 text-[0.92rem] text-soluk">
              {tespit.eski.maddeler.map((m) => (
                <li key={m} className="flex gap-2.5">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-ana/25 bg-white p-5 shadow-kart ring-1 ring-ana/10 sm:p-7">
            <p className="font-bold text-murekkep">{tespit.yeni.baslik}</p>
            <ul className="mt-3 space-y-2.5 text-[0.92rem] text-metin">
              {tespit.yeni.maddeler.map((m) => (
                <li key={m} className="flex gap-2.5">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ana" strokeWidth={2.5} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Bolum>
  );
}

function Farklar({ b }: { b: Baglam }) {
  const { sektor, firma } = b;
  return (
    <Bolum ust={`Neden ${firma.ad}?`} baslik="Evinize usta değil, çözüm geliyor.">
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
        {sektor.farklar.map((f) => (
          <li key={f.baslik}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gece text-white">
              <Ikon ad={f.ikon} className="h-5 w-5" />
            </span>
            <p className="mt-4 font-bold text-murekkep">{f.baslik}</p>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-soluk">{f.metin}</p>
          </li>
        ))}
      </ul>
    </Bolum>
  );
}

function Surec({ b }: { b: Baglam }) {
  return (
    <Bolum ust="Süreç" baslik="Aradığınız andan iş bitene kadar" zemin>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {b.sektor.surec.map((s, i) => (
          <li key={s.baslik} className="relative rounded-2xl border border-cizgi bg-white p-5 sm:p-6">
            <span className="text-[0.8rem] font-bold tabular-nums text-ana">0{i + 1}</span>
            <p className="mt-2 font-bold text-murekkep">{s.baslik}</p>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-soluk">{s.metin}</p>
          </li>
        ))}
      </ol>
    </Bolum>
  );
}

function BelirtiKapsam({ b, hizmet }: { b: Baglam; hizmet: Hizmet }) {
  return (
    <Bolum ust={hizmet.ad} baslik="Ne zaman çağırmalı, ne yapıyoruz?">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-cizgi bg-white p-6 sm:p-8">
          <p className="text-lg font-bold text-murekkep">Bu belirtiler varsa arayın</p>
          <ul className="mt-5 space-y-3.5">
            {hizmet.belirtiler.map((m) => (
              <li key={m} className="flex gap-3 text-metin">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                </span>
                {m}
              </li>
            ))}
          </ul>
          <a
            href={b.wa(hizmet.mesaj)}
            target="_blank"
            rel="noopener noreferrer"
            data-olay="whatsapp"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-ana hover:text-ana-koyu"
          >
            <WhatsappLogo className="h-4 w-4 text-whatsapp-koyu" />
            Fotoğraf gönderin, birlikte bakalım
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
        <div className="rounded-3xl bg-gece p-6 text-white sm:p-8">
          <p className="text-lg font-bold">Neler yapıyoruz</p>
          <ul className="mt-5 space-y-3.5">
            {hizmet.kapsam.map((m) => (
              <li key={m} className="flex gap-3 text-white/80">
                <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" strokeWidth={2.5} />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Bolum>
  );
}

function EvdeTest({ b }: { b: Baglam }) {
  const test = b.sektor.evdeTest!;
  return (
    <Bolum ust="Kendiniz kontrol edin" baslik={test.baslik} aciklama={test.aciklama}>
      <div className="max-w-3xl">
        <KacakTesti test={test} evetLink={b.wa(test.evetMesaj)} />
      </div>
    </Bolum>
  );
}

function Yorumlar({ b }: { b: Baglam }) {
  const { firma, sektor, yer } = b;
  const ornek = !firma.yorumlar?.length && DEMO;
  const tumu: Yorum[] = firma.yorumlar?.length ? firma.yorumlar : DEMO ? sektor.ornekYorumlar : [];
  if (!tumu.length) return null;
  // İlçe sayfasında o ilçeden gelen yorumlar öne alınır.
  const yorumlar = [...tumu].sort((x, y) => Number(y.ilce === yer) - Number(x.ilce === yer));
  return (
    <Bolum id="yorumlar" ust="Müşterilerimiz anlatıyor" baslik="Komşularınız bizi neden tavsiye ediyor?" zemin>
      {firma.googlePuani && (
        <div className="-mt-4 mb-8 flex items-center gap-3">
          <span className="text-3xl font-extrabold tracking-tight">{firma.googlePuani.puan.toLocaleString('tr-TR')}</span>
          <span className="text-[0.85rem] leading-tight text-soluk">
            <Yildizlar puan={firma.googlePuani.puan} />
            <span className="mt-0.5 block">{firma.googlePuani.yorumSayisi} Google yorumu</span>
          </span>
        </div>
      )}
      <ul className="-mx-[1.125rem] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[1.125rem] pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {yorumlar.map((y) => (
          <li key={y.ad + y.metin} className="w-[85%] shrink-0 snap-start rounded-2xl border border-cizgi bg-white p-6 md:w-auto">
            <Yildizlar puan={y.puan} />
            <p className="mt-4 leading-relaxed text-metin">“{y.metin}”</p>
            <p className="mt-5 text-[0.88rem] font-bold text-murekkep">
              {y.ad}
              {y.ilce && <span className="font-medium text-soluk"> · {y.ilce}</span>}
            </p>
          </li>
        ))}
      </ul>
      {ornek && <p className="mt-4 text-[0.8rem] text-soluk">Örnek yorumlardır. Sitenizde gerçek Google yorumlarınız yer alır.</p>}
    </Bolum>
  );
}

function Bolgeler({ b, baslik, hizmet }: { b: Baglam; baslik: string; hizmet?: Hizmet }) {
  const { firma, yer } = b;
  return (
    <Bolum id="bolgeler" ust="Hizmet bölgeleri" baslik={baslik}>
      <ul className="flex flex-wrap gap-2.5">
        {firma.ilceler.map((i) => {
          const aktif = i === yer;
          const href = b.yol(sayfaYolu(hizmet ? { tur: 'hizmetIlce', hizmet, ilce: i } : { tur: 'ilce', ilce: i }));
          return (
            <li key={slugla(i)}>
              <a
                href={href}
                aria-current={aktif ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.92rem] font-semibold transition-colors ${
                  aktif ? 'border-gece bg-gece text-white' : 'border-cizgi bg-white text-metin hover:border-ana/40 hover:text-ana'
                }`}
              >
                <MapPin aria-hidden className="h-4 w-4" />
                {hizmet ? `${i} ${hizmet.ad.toLocaleLowerCase('tr-TR')}` : i}
              </a>
            </li>
          );
        })}
      </ul>
    </Bolum>
  );
}

function DigerHizmetler({ b, haric }: { b: Baglam; haric: Hizmet }) {
  const { sektor, sayfa } = b;
  const ilce = sayfa.tur === 'hizmetIlce' ? sayfa.ilce : undefined;
  return (
    <Bolum ust="Diğer hizmetler" baslik="Bunlar için de buradayız" zemin>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sektor.hizmetler
          .filter((h) => h.slug !== haric.slug)
          .map((h) => (
            <li key={h.slug}>
              <a
                href={b.yol(sayfaYolu(ilce ? { tur: 'hizmetIlce', hizmet: h, ilce } : { tur: 'hizmet', hizmet: h }))}
                className="group flex items-center gap-4 rounded-2xl border border-cizgi bg-white p-4 transition-colors hover:border-ana/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ana-acik text-ana">
                  <Ikon ad={h.ikon} />
                </span>
                <span className="flex-1 font-semibold text-murekkep">{h.ad}</span>
                <ArrowRight aria-hidden className="h-4 w-4 text-soluk group-hover:text-ana" />
              </a>
            </li>
          ))}
      </ul>
    </Bolum>
  );
}

function Sss({ b, sorular }: { b: Baglam; sorular: Soru[] }) {
  return (
    <Bolum id="sss" ust="Sık sorulanlar" baslik="Aklınızdaki sorular">
      <div className="max-w-3xl divide-y divide-cizgi border-y border-cizgi">
        {sorular.map((s) => (
          <details key={s.soru} className="group py-1">
            <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-murekkep">
              {doldur(s.soru, b.firma, b.yer)}
              <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-soluk transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-5 pr-8 leading-relaxed text-metin">{doldur(s.cevap, b.firma, b.yer)}</p>
          </details>
        ))}
      </div>
    </Bolum>
  );
}

function SonCagri({ b, waMesaj }: { b: Baglam; waMesaj?: string }) {
  const { firma, yer, tel } = b;
  return (
    <section className="kap pb-16 sm:pb-24">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-gece px-6 py-12 text-white sm:px-12 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-ana/50 blur-[100px]" />
        <h2 className="max-w-2xl text-[1.9rem] font-extrabold leading-tight tracking-[-0.03em] sm:text-[2.6rem]">
          {doldur(b.sektor.sonCagri, firma, yer)}
        </h2>
        <p className="mt-4 max-w-xl text-white/70">Arayın ya da fotoğraf gönderin. Fiyatı işe başlamadan söylüyoruz.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={tel} data-olay="telefon" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-[1.05rem] font-bold text-gece">
            <Phone aria-hidden className="h-5 w-5" />
            {firma.telefon}
          </a>
          <a
            href={b.wa(waMesaj)}
            target="_blank"
            rel="noopener noreferrer"
            data-olay="whatsapp"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-7 text-[1.05rem] font-semibold"
          >
            <WhatsappLogo className="h-5 w-5 text-whatsapp" />
            WhatsApp’tan yazın
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Yardımcılar                                                         */
/* ------------------------------------------------------------------ */

function Bolum({
  id,
  ust,
  baslik,
  aciklama,
  zemin,
  children,
}: {
  id?: string;
  ust: string;
  baslik: string;
  aciklama?: string;
  zemin?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={zemin ? 'bg-zemin' : undefined}>
      <div className="kap py-16 sm:py-24">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ana">{ust}</p>
        <h2 className="mt-3 max-w-3xl text-[1.85rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-murekkep sm:text-[2.5rem]">{baslik}</h2>
        {aciklama && <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-metin">{aciklama}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Yildizlar({ puan }: { puan: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`5 üzerinden ${puan.toLocaleString('tr-TR')} puan`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} aria-hidden className={`h-4 w-4 ${i < Math.round(puan) ? 'fill-yildiz text-yildiz' : 'fill-cizgi text-cizgi'}`} />
      ))}
    </span>
  );
}
