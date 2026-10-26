import type { CSSProperties } from 'react';
import { ArrowRight, Check, ChevronDown, Clock, MapPin, MessageCircle, Phone, ShieldCheck, Star, TriangleAlert } from 'lucide-react';
import type { Firma, Sektor, Yorum } from '@/lib/tipler';
import { DEMO, ULUZON_URL, basHarfler, doldur, renkler, telHref, waLink } from '@/lib/firma';
import { deEki } from '@/lib/dil';
import Ikon from './ikon';
import AcikRozet from './acik-rozet';
import KacakTesti from './kacak-testi';
import TermalGorsel from './termal-gorsel';

export default function Site({ sektor, firma }: { sektor: Sektor; firma: Firma }) {
  const r = renkler(sektor, firma);
  const stil = {
    '--renk-ana': r.ana,
    '--renk-ana-koyu': r.anaKoyu,
    '--renk-ana-acik': r.anaAcik,
    '--renk-acil': r.acil,
    '--renk-acil-koyu': r.acilKoyu,
  } as CSSProperties;

  const tel = telHref(firma);
  const wa = (sorun?: string) =>
    waLink(firma, sorun ? `Merhaba ${firma.ad}, ${sorun}. Yardımcı olabilir misiniz?` : `Merhaba ${firma.ad}, bir sorunum var. Fotoğraf gönderiyorum.`);

  const ornekYorum = !firma.yorumlar?.length && DEMO;
  const yorumlar: Yorum[] = firma.yorumlar?.length ? firma.yorumlar : DEMO ? sektor.ornekYorumlar : [];
  const saatMetni = firma.yirmiDortSaat ? '7/24 açığız' : firma.calismaSaatleri;

  return (
    <div style={stil} className="pb-24 md:pb-0">
      {DEMO && <DemoBandi firma={firma} />}
      <Ust firma={firma} etiket={sektor.etiket} tel={tel} />

      <main id="icerik">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-ana-acik via-white to-white">
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-ana/10 blur-3xl" />
          <div className="kap relative grid gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-ana/15 bg-white px-3.5 py-1.5 text-[0.8rem] font-semibold text-ana-koyu shadow-sm">
                {firma.saatler && !firma.yirmiDortSaat ? <AcikRozet saatler={firma.saatler} yedekMetin={saatMetni} /> : saatMetni}
                <span aria-hidden className="text-ana/30">|</span>
                {firma.sehir} · {firma.ilce}
              </p>
              <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.08] text-murekkep sm:text-5xl lg:text-[3.4rem]">
                {deEki(firma.ilce)} {sektor.isTanimi} <span className="text-ana">{sektor.vaat}</span>
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-metin sm:text-lg">{doldur(sektor.aciklama, firma)}</p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href={tel}
                  data-olay="telefon"
                  className="group flex min-h-16 items-center gap-4 rounded-2xl bg-acil px-5 py-3 text-white shadow-[0_12px_30px_-12px_var(--renk-acil)] transition-colors hover:bg-acil-koyu sm:pr-8"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                    <Phone aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[0.8rem] font-medium text-white">Hemen arayın</span>
                    <span className="text-xl font-extrabold tracking-tight">{firma.telefon}</span>
                  </span>
                </a>
                <a
                  href={wa()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-olay="whatsapp"
                  className="flex min-h-16 items-center gap-4 rounded-2xl border-2 border-whatsapp/25 bg-white px-5 py-3 text-murekkep transition-colors hover:border-whatsapp sm:pr-8"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-whatsapp text-white">
                    <MessageCircle aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[0.8rem] font-medium text-soluk">Fotoğraf gönderin</span>
                    <span className="text-lg font-bold">WhatsApp’tan yazın</span>
                  </span>
                </a>
              </div>

              <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[0.92rem] font-medium text-metin">
                {firma.googlePuani && (
                  <li className="flex items-center gap-2">
                    <Yildizlar puan={firma.googlePuani.puan} />
                    <span>
                      <strong className="text-murekkep">{firma.googlePuani.puan.toLocaleString('tr-TR')}</strong> · {firma.googlePuani.yorumSayisi} Google yorumu
                    </span>
                  </li>
                )}
                {sektor.guvenMaddeleri.map((m) => (
                  <li key={m} className="flex items-center gap-1.5">
                    <Check aria-hidden className="h-4 w-4 text-ana" strokeWidth={2.5} />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <figure className="overflow-hidden rounded-3xl bg-murekkep shadow-[0_30px_60px_-30px_rgb(15_23_42/0.5)] ring-1 ring-black/5">
                <TermalGorsel />
                <figcaption className="flex items-center justify-between gap-3 bg-white px-5 pb-10 pt-4">
                  <span>
                    <span className="block text-sm font-bold text-murekkep">Kaçağı cihazla buluyoruz</span>
                    <span className="block text-[0.8rem] text-soluk">Bütün duvarı değil, yalnızca o noktayı açıyoruz.</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-ana-acik px-3 py-1 text-[0.72rem] font-semibold text-ana">Temsilî</span>
                </figcaption>
              </figure>

              <div className="relative -mt-6 mx-3 rounded-2xl border border-orange-200 bg-white p-5 shadow-kart sm:mx-6">
                <p className="flex items-center gap-2 font-bold text-murekkep">
                  <TriangleAlert aria-hidden className="h-5 w-5 text-acil" />
                  {sektor.acilAdimlar.baslik}
                </p>
                <ol className="mt-3 space-y-2 text-[0.92rem] text-metin">
                  {sektor.acilAdimlar.adimlar.map((a, i) => (
                    <li key={a} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-xs font-bold text-acil-koyu">{i + 1}</span>
                      <span className="pt-0.5">{a}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* SORUN SEÇİCİ */}
        <section aria-labelledby="sorun-baslik" className="border-y border-cizgi bg-zemin py-14 sm:py-20">
          <div className="kap">
            <Baslik id="sorun-baslik" ust="Hızlı destek" baslik="Sorununuz ne?" alt="Seçin, WhatsApp’ta mesajınız hazır olsun. Fotoğraf eklerseniz fiyatı daha hızlı söyleriz." />
            <ul className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {sektor.sorunlar.map((s) => (
                <li key={s.ad}>
                  <a
                    href={wa(s.mesaj)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-olay="whatsapp"
                    className="group flex h-full min-h-28 flex-col justify-between gap-4 rounded-2xl border border-cizgi bg-white p-4 shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-ana hover:shadow-kart sm:p-5"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ana-acik text-ana transition-colors group-hover:bg-ana group-hover:text-white">
                      <Ikon ad={s.ikon} className="h-5 w-5" />
                    </span>
                    <span className="flex items-end justify-between gap-2 font-bold leading-snug text-murekkep">
                      {s.ad}
                      <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-soluk transition-transform group-hover:translate-x-0.5 group-hover:text-ana" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HİZMETLER */}
        <section id="hizmetler" aria-labelledby="hizmet-baslik" className="py-16 sm:py-24">
          <div className="kap">
            <Baslik id="hizmet-baslik" ust="Hizmetler" baslik={`${firma.sehir} genelinde tesisatın her işi`} alt="Her hizmette aynı kural: önce tespit ve fiyat, sonra iş." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sektor.hizmetler.map((h) => (
                <article key={h.slug} id={h.slug} className="flex flex-col rounded-3xl border border-cizgi bg-white p-6 shadow-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ana text-white">
                    <Ikon ad={h.ikon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-murekkep">{h.ad}</h3>
                  <p className="mt-2 leading-relaxed text-metin">{h.ozet}</p>
                  <div className="mt-5 border-t border-cizgi pt-4">
                    <p className="text-[0.75rem] font-bold uppercase tracking-wider text-soluk">Ne zaman çağırmalı?</p>
                    <ul className="mt-2 space-y-1.5 text-[0.92rem] text-metin">
                      {h.belirtiler.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-acil" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FARKLAR */}
        <section aria-labelledby="fark-baslik" className="relative overflow-hidden bg-ana-koyu py-16 text-white sm:py-24">
          <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-ana blur-3xl" />
          <div className="kap relative">
            <Baslik id="fark-baslik" ust={`Neden ${firma.ad}?`} baslik="Evinize usta değil, çözüm geliyor." acik />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sektor.farklar.map((f) => (
                <div key={f.baslik} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                  <Ikon ad={f.ikon} className="h-7 w-7 text-orange-300" />
                  <h3 className="mt-5 text-lg font-bold">{f.baslik}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{f.metin}</p>
                </div>
              ))}
            </div>
            {(firma.garantiAy || firma.tecrube || firma.kesifUcreti) && (
              <ul className="mt-8 flex flex-wrap gap-3 text-[0.92rem] font-semibold">
                {firma.garantiAy && (
                  <li className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                    <ShieldCheck aria-hidden className="h-4 w-4 text-orange-300" />
                    {firma.garantiAy} ay işçilik garantisi
                  </li>
                )}
                {firma.tecrube && <li className="rounded-full bg-white/10 px-4 py-2">{firma.tecrube}</li>}
                {firma.kesifUcreti && <li className="rounded-full bg-white/10 px-4 py-2">Keşif: {firma.kesifUcreti}</li>}
              </ul>
            )}
          </div>
        </section>

        {/* SÜREÇ */}
        <section id="nasil" aria-labelledby="surec-baslik" className="py-16 sm:py-24">
          <div className="kap">
            <Baslik id="surec-baslik" ust="Nasıl çalışıyoruz?" baslik="Aradığınız andan iş bitene kadar 4 adım" />
            <ol className="mt-10 grid gap-4 md:grid-cols-4">
              {sektor.surec.map((a, i) => (
                <li key={a.baslik} className="relative rounded-3xl bg-zemin p-6">
                  <span aria-hidden className="text-5xl font-extrabold leading-none text-ana/60">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-lg font-bold text-murekkep">{a.baslik}</h3>
                  <p className="mt-2 leading-relaxed text-metin">{a.metin}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* EVDE TEST */}
        {sektor.evdeTest && (
          <section aria-labelledby="test-baslik" className="border-y border-cizgi bg-gradient-to-br from-ana-acik to-white py-16 sm:py-24">
            <div className="kap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
              <Baslik id="test-baslik" ust="Kendiniz kontrol edin" baslik={sektor.evdeTest.baslik} alt={sektor.evdeTest.aciklama} />
              <KacakTesti test={sektor.evdeTest} evetLink={wa(sektor.evdeTest.evetMesaj)} />
            </div>
          </section>
        )}

        {/* YORUMLAR */}
        {yorumlar.length > 0 && (
          <section id="yorumlar" aria-labelledby="yorum-baslik" className="py-16 sm:py-24">
            <div className="kap">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <Baslik id="yorum-baslik" ust="Müşterilerimiz anlatıyor" baslik="Komşularınız bizi neden tavsiye ediyor?" />
                {firma.googlePuani && (
                  <div className="flex items-center gap-3 rounded-2xl border border-cizgi px-4 py-3">
                    <span className="text-3xl font-extrabold text-murekkep">{firma.googlePuani.puan.toLocaleString('tr-TR')}</span>
                    <span className="text-sm text-soluk">
                      <Yildizlar puan={firma.googlePuani.puan} />
                      {firma.googlePuani.yorumSayisi} Google yorumu
                    </span>
                  </div>
                )}
              </div>
              <ul className="mt-10 grid gap-4 md:grid-cols-3">
                {yorumlar.map((y) => (
                  <li key={y.ad + y.metin.slice(0, 12)} className="flex flex-col rounded-3xl border border-cizgi bg-white p-6 shadow-sm">
                    <Yildizlar puan={y.puan} />
                    <blockquote className="mt-4 flex-1 leading-relaxed text-metin">“{y.metin}”</blockquote>
                    <p className="mt-5 flex items-center gap-3 text-sm">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-ana-acik font-bold text-ana">{y.ad.charAt(0)}</span>
                      <span>
                        <span className="block font-bold text-murekkep">{y.ad}</span>
                        {y.ilce && <span className="text-soluk">{y.ilce}</span>}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
              {ornekYorum && <p className="mt-4 text-sm text-soluk">Örnek yorumlardır. Sitenizde gerçek Google yorumlarınız yer alır.</p>}
            </div>
          </section>
        )}

        {/* BÖLGELER */}
        <section aria-labelledby="bolge-baslik" className="bg-zemin py-16 sm:py-20">
          <div className="kap grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Baslik id="bolge-baslik" ust="Hizmet bölgeleri" baslik={`${firma.sehir}’in her yerindeyiz`} alt="Bölgenizi göremiyorsanız arayın; size en yakın ustayı yönlendirelim." />
            <ul className="flex flex-wrap gap-2.5">
              {firma.ilceler.map((i) => (
                <li key={i} className="inline-flex items-center gap-1.5 rounded-full border border-cizgi bg-white px-4 py-2 font-semibold text-murekkep">
                  <MapPin aria-hidden className="h-4 w-4 text-ana" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SSS */}
        <section id="sss" aria-labelledby="sss-baslik" className="py-16 sm:py-24">
          <div className="kap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Baslik id="sss-baslik" ust="Sık sorulanlar" baslik="Aklınızdaki sorular" />
            <div className="divide-y divide-cizgi rounded-3xl border border-cizgi bg-white">
              {sektor.sss.map((s) => (
                <details key={s.soru} className="group px-6">
                  <summary className="flex min-h-16 items-center justify-between gap-4 py-4 font-bold text-murekkep">
                    {s.soru}
                    <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-soluk transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 leading-relaxed text-metin">{s.cevap}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SON ÇAĞRI */}
        <section className="px-3 pb-16 sm:px-0 sm:pb-24">
          <div className="kap">
            <div className="relative overflow-hidden rounded-[2rem] bg-ana px-6 py-12 text-white sm:px-12 sm:py-14">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div>
                  <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">Su kaçağı beklemez. Her saat fatura ve hasar büyür.</h2>
                  <p className="mt-3 text-lg text-white/80">Arayın, sorunu anlatın; fiyatı işe başlamadan söyleyelim.</p>
                </div>
                <div className="grid gap-3">
                  <a href={tel} data-olay="telefon" className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-acil px-6 text-lg font-extrabold hover:bg-acil-koyu">
                    <Phone aria-hidden className="h-5 w-5" />
                    {firma.telefon}
                  </a>
                  <a href={wa()} target="_blank" rel="noopener noreferrer" data-olay="whatsapp" className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white font-bold text-murekkep hover:bg-ana-acik">
                    <MessageCircle aria-hidden className="h-5 w-5 text-whatsapp" />
                    WhatsApp’tan yazın
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Alt firma={firma} sektor={sektor} tel={tel} />
      <MobilCubuk tel={tel} wa={wa()} />
    </div>
  );
}

function DemoBandi({ firma }: { firma: Firma }) {
  return (
    <div className="bg-murekkep text-white">
      <p className="kap flex min-h-10 flex-wrap items-center justify-center gap-x-2 py-2 text-center text-[0.8rem]">
        <span>
          Bu site <strong>{firma.ad}</strong> için hazırlanmış bir örnektir.
        </span>
        <a href={ULUZON_URL} className="font-semibold text-orange-300 underline underline-offset-2 hover:text-white">
          Uluzon ile birkaç gün içinde yayında
        </a>
      </p>
    </div>
  );
}

function Ust({ firma, etiket, tel }: { firma: Firma; etiket: string; tel: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-cizgi/80 bg-white/90 backdrop-blur-md">
      <div className="kap flex h-16 items-center justify-between gap-4">
        <a href="#icerik" className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ana text-[0.95rem] font-extrabold text-white">
            {basHarfler(firma.ad)}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-extrabold leading-tight text-murekkep">{firma.ad}</span>
            <span className="block truncate text-[0.75rem] text-soluk">{etiket} · {firma.sehir}</span>
          </span>
        </a>
        <nav aria-label="Ana menü" className="hidden items-center gap-1 text-[0.92rem] font-semibold text-metin lg:flex">
          <a href="#hizmetler" className="rounded-full px-3 py-2 hover:bg-zemin hover:text-murekkep">Hizmetler</a>
          <a href="#nasil" className="rounded-full px-3 py-2 hover:bg-zemin hover:text-murekkep">Nasıl çalışıyoruz</a>
          <a href="#yorumlar" className="rounded-full px-3 py-2 hover:bg-zemin hover:text-murekkep">Yorumlar</a>
          <a href="#sss" className="rounded-full px-3 py-2 hover:bg-zemin hover:text-murekkep">SSS</a>
        </nav>
        <a href={tel} data-olay="telefon" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-acil px-4 font-bold text-white hover:bg-acil-koyu">
          <Phone aria-hidden className="h-4 w-4" />
          <span className="hidden sm:inline">{firma.telefon}</span>
          <span className="sm:hidden">Ara</span>
        </a>
      </div>
    </header>
  );
}

function Alt({ firma, sektor, tel }: { firma: Firma; sektor: Sektor; tel: string }) {
  return (
    <footer className="border-t border-cizgi bg-zemin">
      <div className="kap grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-lg font-extrabold text-murekkep">{firma.ad}</p>
          <p className="mt-2 max-w-sm text-[0.92rem] leading-relaxed text-soluk">
            {firma.sehir} {firma.ilce} merkezli {sektor.ad.toLocaleLowerCase('tr-TR')} hizmeti. {firma.ilceler.length} ilçede, fiyat işe başlamadan söylenir.
          </p>
        </div>
        <div className="text-[0.92rem]">
          <p className="font-bold text-murekkep">İletişim</p>
          <ul className="mt-3 space-y-2 text-metin">
            <li>
              <a href={tel} className="inline-flex items-center gap-2 font-semibold text-murekkep hover:text-ana">
                <Phone aria-hidden className="h-4 w-4 text-ana" />
                {firma.telefon}
              </a>
            </li>
            {firma.adres && (
              <li className="flex gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ana" />
                {firma.adres}
              </li>
            )}
            <li className="flex gap-2">
              <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ana" />
              {firma.yirmiDortSaat ? '7 gün 24 saat' : firma.calismaSaatleri}
            </li>
          </ul>
        </div>
        <div className="text-[0.92rem]">
          <p className="font-bold text-murekkep">Hizmetler</p>
          <ul className="mt-3 space-y-2 text-metin">
            {sektor.hizmetler.slice(0, 5).map((h) => (
              <li key={h.slug}>
                <a href={`#${h.slug}`} className="hover:text-ana">
                  {h.ad}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cizgi">
        <p className="kap flex flex-col gap-2 py-5 text-[0.8rem] text-soluk sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {firma.ad}</span>
          <a href={ULUZON_URL} rel="noopener" className="hover:text-murekkep">
            Web sitesi ve dijital büyüme: <span className="font-semibold">Uluzon</span>
          </a>
        </p>
      </div>
    </footer>
  );
}

function MobilCubuk({ tel, wa }: { tel: string; wa: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cizgi bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[1.6fr_1fr] gap-2.5">
        <a href={tel} data-olay="telefon" className="flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-acil text-[1.05rem] font-extrabold text-white">
          <Phone aria-hidden className="h-5 w-5" />
          Hemen Ara
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" data-olay="whatsapp" className="flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-whatsapp font-bold text-white">
          <MessageCircle aria-hidden className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function Baslik({ id, ust, baslik, alt, acik = false }: { id: string; ust: string; baslik: string; alt?: string; acik?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-[0.8rem] font-bold uppercase tracking-[0.14em] ${acik ? 'text-orange-300' : 'text-acil'}`}>{ust}</p>
      <h2 id={id} className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${acik ? 'text-white' : 'text-murekkep'}`}>
        {baslik}
      </h2>
      {alt && <p className={`mt-4 text-lg leading-relaxed ${acik ? 'text-white/75' : 'text-metin'}`}>{alt}</p>}
    </div>
  );
}

function Yildizlar({ puan }: { puan: number }) {
  return (
    <span className="inline-flex" role="img" aria-label={`5 üzerinden ${puan.toLocaleString('tr-TR')} puan`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} aria-hidden className={`h-4 w-4 ${i < Math.round(puan) ? 'fill-yildiz text-yildiz' : 'text-cizgi'}`} />
      ))}
    </span>
  );
}
