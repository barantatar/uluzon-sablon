import type { CSSProperties, ReactNode } from 'react';
import { preload } from 'react-dom';
import { ArrowRight, Check, ChevronDown, ChevronRight, Clock, MapPin, Phone, Star, TriangleAlert, X } from 'lucide-react';
import type { Baslik as BaslikTipi, HeroFoto, Hizmet, Kose, Soru, Yorum } from '@/lib/tipler';
import { DEMO, ULUZON_URL, basHarfler, doldur, renkler, slugla } from '@/lib/firma';
import { sayfaYolu, type Baglam } from '@/lib/sayfa';
import { ilceBilgisi } from '@/bolgeler';
import Ikon from './ikon';
import AcikRozet from './acik-rozet';
import KacakTesti from './kacak-testi';
import TermalGorsel from './termal-gorsel';
import WhatsappLogo from './whatsapp-logo';
import OtomatikKaydir from './otomatik-kaydir';
import Takip, { CerezTercihleri } from './takip';
import { YASAL_YOLLAR, type YasalMetin } from '@/lib/sayfa';

/* ------------------------------------------------------------------ */
/* Sayfalar                                                            */
/* ------------------------------------------------------------------ */

export default function Site({ b }: { b: Baglam }) {
  const { sayfa } = b;
  return (
    <Kabuk b={b}>
      {sayfa.tur === 'ana' ? (
        <AnaSayfa b={b} />
      ) : sayfa.tur === 'ilce' ? (
        <IlceSayfasi b={b} />
      ) : sayfa.tur === 'yasal' ? (
        <YasalSayfa b={b} metin={sayfa.metin} />
      ) : (
        <HizmetSayfasi b={b} hizmet={sayfa.hizmet} />
      )}
    </Kabuk>
  );
}

function AnaSayfa({ b }: { b: Baglam }) {
  const { sektor, firma, yer } = b;
  return (
    <>
      <Hero b={b} baslik={firma.baslik ?? sektor.baslik} aciklama={doldur(firma.aciklama ?? sektor.aciklama, firma, yer)} gorsel={<HizmetKarti b={b} />} />
      <GuvenSeridi b={b} />
      <IlkAdimlar b={b} />
      <Hizmetler b={b} />
      <Tespit b={b} />
      <Farklar b={b} />
      <Surec b={b} />
      {sektor.evdeTest && <EvdeTest b={b} />}
      <Yorumlar b={b} />
      <Bolgeler b={b} baslik={`${doldur('{yerde}', firma)} hizmet verdiğimiz bölgeler`} />
      <Sss b={b} sorular={sektor.sss} />
      <SonCagri b={b} />
    </>
  );
}

// İlçe sayfası ana sayfanın kopyası değildir: ilçenin yapı tipine göre o bölgede
// en çok karşılaşılan işleri, mahalleleri ve ilçeye özel soruları anlatır.
function IlceSayfasi({ b }: { b: Baglam }) {
  const { sektor, firma, yer } = b;
  const bilgi = ilceBilgisi(firma.sehir, yer);
  const aciklama = bilgi
    ? `${bilgi.tanim} ${yer} genelinde ${bilgi.mahalleler.slice(0, 3).join(', ')} ve çevresine geliyoruz.`
    : doldur(sektor.aciklama, firma, yer);
  return (
    <>
      <Hero
        b={b}
        baslik={firma.baslik ?? sektor.baslik}
        aciklama={aciklama}
        kirinti={[{ ad: 'Bölgeler', href: b.yol('/', 'bolgeler') }, { ad: yer }]}
        gorsel={<HizmetKarti b={b} />}
      />
      <GuvenSeridi b={b} />
      <IlkAdimlar b={b} />
      <IlceTanitim b={b} />
      <Hizmetler b={b} />
      <Farklar b={b} />
      <Yorumlar b={b} />
      <Sss b={b} sorular={[...ilceSorulari(b), ...sektor.sss.slice(0, 2)]} />
      <Bolgeler b={b} baslik={`${yer} dışında da geliyoruz`} />
      <SonCagri b={b} />
    </>
  );
}

function ilceSorulari(b: Baglam): Soru[] {
  const varis = b.firma.varisSuresi?.[b.yer];
  return b.sektor.ilceSss.map((s, i) =>
    i === 0 && varis ? { soru: s.soru, cevap: `${b.yer} bölgesine genellikle ${varis} içinde geliyoruz. Aradığınızda size net saat veriyoruz.` } : s,
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
      <Hero
        b={b}
        baslik={hizmet.baslik}
        aciklama={doldur(hizmet.aciklama, firma, yer)}
        kirinti={kirinti}
        waMesaj={hizmet.mesaj}
        gorsel={hizmet.cihazla ? <TermalKart /> : <KapsamKarti hizmet={hizmet} />}
      />
      <GuvenSeridi b={b} />
      {hizmet.cihazla && <IlkAdimlar b={b} />}
      <BelirtiKapsam b={b} hizmet={hizmet} />
      {sayfa.tur === 'hizmetIlce' && <IlceNotu b={b} hizmet={hizmet} />}
      {hizmet.cihazla && <Tespit b={b} />}
      <Surec b={b} />
      {hizmet.test && sektor.evdeTest && <EvdeTest b={b} />}
      <Yorumlar b={b} />
      <Sss b={b} sorular={[...hizmet.sss, ...(sayfa.tur === 'hizmetIlce' ? ilceSorulari(b).slice(0, 1) : []), ...sektor.sss.slice(0, 2)]} />
      <DigerHizmetler b={b} haric={hizmet} />
      <Bolgeler b={b} hizmet={hizmet} baslik={`${hizmet.ad} hizmeti verdiğimiz bölgeler`} />
      <SonCagri b={b} waMesaj={hizmet.mesaj} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Kabuk: renkler, üst menü, alt bilgi, WhatsApp butonu                */
/* ------------------------------------------------------------------ */

// Köşe stili Tailwind'in yarıçap değişkenlerini firmaya göre değiştirir: bütün kart ve kutular birlikte değişir.
const KOSELER: Record<Kose, Record<string, string>> = {
  yumusak: {},
  orta: { '--radius-lg': '0.375rem', '--radius-xl': '0.5rem', '--radius-2xl': '0.75rem', '--radius-3xl': '1rem' },
  keskin: { '--radius-lg': '0.25rem', '--radius-xl': '0.25rem', '--radius-2xl': '0.375rem', '--radius-3xl': '0.5rem' },
};

export function Kabuk({ b, children }: { b: Baglam; children: ReactNode }) {
  const r = renkler(b.sektor, b.firma);
  const stil = {
    '--renk-ana': r.ana,
    '--renk-ana-koyu': r.anaKoyu,
    '--renk-ana-acik': r.anaAcik,
    '--renk-gece': r.gece,
    ...KOSELER[b.firma.kose ?? 'yumusak'],
  } as CSSProperties;
  return (
    <div style={stil}>
      {!DEMO && b.firma.takip && <Takip takip={b.firma.takip} politika={b.yol(`/${YASAL_YOLLAR.cerez}`)} />}
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
        className="nabiz giris fixed bottom-5 right-5 z-50 grid h-13 w-13 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-6px_rgb(18_140_75/0.6)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
      >
        <WhatsappLogo className="h-7 w-7" />
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
          {firma.logo ? (
            // Logo küçük ve yerel bir dosya (SVG önerilir); görüntü optimizasyonu gerekmez
            // eslint-disable-next-line @next/next/no-img-element
            <img src={firma.logo} alt={firma.ad} height={36} className="h-9 w-auto max-w-[9rem] shrink-0 object-contain" />
          ) : (
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-gece text-[0.85rem] font-extrabold tracking-tight text-white">
              {basHarfler(firma.ad)}
            </span>
          )}
          <span className={firma.logo ? 'sr-only' : 'min-w-0'}>
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
          aria-label={`Ara: ${firma.telefon}`}
          className="parilti group inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gece py-1 pl-1 pr-3.5 text-[0.84rem] font-bold tabular-nums tracking-tight text-white transition-colors hover:bg-ana sm:pr-4 sm:text-[0.9rem]"
        >
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-white/20">
            <Phone className="zil h-3.5 w-3.5" />
          </span>
          {firma.telefon}
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
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} {firma.unvan ?? firma.ad}</span>
            <a href={yol(`/${YASAL_YOLLAR.kvkk}`)} className="hover:text-ana">KVKK aydınlatma metni</a>
            <a href={yol(`/${YASAL_YOLLAR.cerez}`)} className="hover:text-ana">Çerez politikası</a>
            {!DEMO && firma.takip && <CerezTercihleri />}
          </p>
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
  gorsel,
}: {
  b: Baglam;
  baslik: BaslikTipi;
  aciklama: string;
  kirinti?: { ad: string; href?: string }[];
  waMesaj?: string;
  /** Masaüstünde sağ sütunda görünen kart */
  gorsel: ReactNode;
}) {
  const { firma, yer, yol, tel } = b;
  const saatMetni = firma.yirmiDortSaat ? '7/24 açığız' : firma.calismaSaatleri;
  // Fotoğraf yalnızca ana sayfada; diğer sayfalar hafif kalır ve sağda kendi kartını gösterir.
  const foto = b.sayfa.tur === 'ana' ? (firma.heroFoto ?? b.sektor.heroFoto) : undefined;
  // Fotoğraflı hero'da hizmet kartı fotoğrafı kapatmasın diye alt kenarda şerit olur.
  const serit = Boolean(foto);
  return (
    <section className="relative isolate overflow-hidden bg-gece text-white">
      {foto ? (
        <HeroArkaPlan foto={foto} />
      ) : (
      /* Fotoğraf yoksa: yumuşak ışık ve ince ızgara */
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="suzul absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full bg-ana/45 blur-[120px]" />
        <div className="suzul-ters absolute -bottom-56 -left-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="tarama absolute inset-0">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-300/40 to-transparent shadow-[0_0_24px_2px_rgb(125_211_252/0.25)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      </div>
      )}

      <div
        className={`kap grid gap-12 lg:items-center lg:gap-16 ${
          foto ? 'pt-44 sm:pt-56 md:pt-16 lg:pt-24' : 'pt-8 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16'
        } ${serit ? 'pb-10 lg:pb-16' : foto ? 'pb-14 sm:pb-20 lg:pb-28' : 'pb-14 sm:pb-20 lg:pb-24'}`}
      >
        <div className={foto ? 'max-w-[38rem] [text-shadow:0_1px_18px_rgb(0_0_0/0.35)]' : undefined}>
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

          {/* Fotoğraflı hero'da mobilde rozet fotoğrafın sol üst köşesine oturur */}
          <p
            className={`giris inline-flex items-center rounded-full border border-white/12 font-medium text-white/85 backdrop-blur ${
              foto
                ? 'absolute left-[1.125rem] top-4 gap-2 bg-gece/45 px-2.5 py-1 text-[0.7rem] md:static md:gap-2.5 md:bg-white/[0.06] md:px-3.5 md:py-1.5 md:text-[0.78rem]'
                : 'gap-2.5 bg-white/[0.06] px-3.5 py-1.5 text-[0.78rem]'
            }`}
          >
            {firma.saatler && !firma.yirmiDortSaat ? <AcikRozet saatler={firma.saatler} yedekMetin={saatMetni} /> : saatMetni}
            <span aria-hidden className="h-3 w-px bg-white/20" />
            {yer === firma.sehir ? firma.sehir : `${yer}, ${firma.sehir}`}
          </p>

          <h1 className="giris-baslik mt-6 text-[2.35rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-[3.4rem] lg:text-[3.9rem]">
            {doldur(baslik.on, firma, yer)}{' '}
            <span className="isilti bg-gradient-to-r from-sky-300 via-white to-sky-300 bg-clip-text text-transparent">{baslik.vurgu}</span>
          </h1>
          <p className="giris-baslik mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70 sm:text-lg">
            {aciklama}
          </p>

          <div style={{ '--gecikme': '280ms' } as CSSProperties} className="giris mt-8 flex items-center gap-2 sm:gap-2.5 [text-shadow:none]">
            <a
              href={tel}
              data-olay="telefon"
              aria-label={`Hemen arayın: ${firma.telefon}`}
              className="parilti inline-flex h-12 items-center gap-2.5 rounded-full bg-white pl-4 pr-5 text-[0.95rem] font-bold text-gece shadow-[0_10px_30px_-12px_rgb(0_0_0/0.55)] transition-transform hover:-translate-y-0.5"
            >
              {/* Aciliyet: kırmızı, ara ara çalan telefon */}
              <Phone aria-hidden className="zil h-[1.05rem] w-[1.05rem] text-red-500" strokeWidth={2.25} />
              Hemen Arayın
            </a>
            <a
              href={b.wa(waMesaj)}
              target="_blank"
              rel="noopener noreferrer"
              data-olay="whatsapp"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 text-[0.95rem] font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.14]"
            >
              <WhatsappLogo className="h-[1.125rem] w-[1.125rem] text-whatsapp" />
              WhatsApp
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

        {!foto && (
          <div style={{ '--gecikme': '250ms' } as CSSProperties} className="giris relative hidden lg:block">
            {gorsel}
          </div>
        )}
      </div>
      {serit && <HizmetSeridi b={b} />}
    </section>
  );
}

/**
 * Hero fotoğrafı. Mobilde öznenin olduğu sağ kırpım üstte görünür, metin altta koyu zemine oturur;
 * masaüstünde metnin olduğu sol taraf soldan sağa koyulaşan bir geçişle okunur kalır.
 */
function HeroArkaPlan({ foto }: { foto: HeroFoto }) {
  const k = `/hero/${foto.ad}`;
  // Fotoğraf sayfanın en büyük öğesi (LCP): HTML'in başında, ekrana uygun tek dosya önceden istenir.
  preload(`${k}-dar-720.avif`, { as: 'image', type: 'image/avif', media: '(max-width: 767px)', fetchPriority: 'high' });
  preload(`${k}-genis-1376.avif`, {
    as: 'image',
    type: 'image/avif',
    media: '(min-width: 768px)',
    imageSrcSet: `${k}-genis-960.avif 960w, ${k}-genis-1376.avif 1376w`,
    imageSizes: '100vw',
    fetchPriority: 'high',
  });
  return (
    <div className="absolute inset-0 -z-10">
      <picture>
        <source media="(max-width: 767px)" type="image/avif" srcSet={`${k}-dar-720.avif`} />
        <source media="(max-width: 767px)" type="image/webp" srcSet={`${k}-dar-720.webp`} />
        <source type="image/avif" srcSet={`${k}-genis-960.avif 960w, ${k}-genis-1376.avif 1376w`} sizes="100vw" />
        <source type="image/webp" srcSet={`${k}-genis-960.webp 960w, ${k}-genis-1376.webp 1376w`} sizes="100vw" />
        {/* Dosyalar önceden optimize edildi (scripts/hero-foto.mjs), sunucu dönüşümü gerekmiyor */}
        <img
          src={`${k}-genis-1376.webp`}
          alt={foto.alt}
          fetchPriority="high"
          className="h-[19rem] w-full object-cover object-top sm:h-[24rem] md:h-full md:object-[75%_center]"
        />
      </picture>
      {/* Mobil: fotoğrafın alt kenarı koyu zemine erir */}
      <div className="absolute inset-x-0 top-0 h-[19rem] bg-gradient-to-b from-gece/30 via-gece/40 to-gece sm:h-[24rem] md:hidden" />
      {/* Masaüstü: solda metin için koyu, sağda fotoğraf açık */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-gece via-gece/85 to-gece/5 md:block lg:via-gece/75" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-gece/60 via-transparent to-gece/30 md:block" />
    </div>
  );
}

/** Fotoğraflı hero'nun alt kenarında cam şerit: hizmetlere hızlı geçiş */
function HizmetSeridi({ b }: { b: Baglam }) {
  const { sektor, sayfa } = b;
  const ilce = sayfa.tur === 'ilce' ? sayfa.ilce : undefined;
  return (
    <div className="kap pb-8 lg:pb-12">
      <nav
        aria-label="Hizmetler"
        style={{ '--gecikme': '420ms' } as CSSProperties}
        className="giris rounded-[22px] border border-white/12 bg-gece/50 p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] backdrop-blur-xl"
      >
        <p className="px-3 pb-1.5 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/50">Ne için arıyorsunuz?</p>
        <OtomatikKaydir className="-mx-2 flex snap-x gap-1.5 overflow-x-auto px-2 pb-1 [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:[mask-image:none]">
          {sektor.hizmetler.map((h) => (
            <li key={h.slug} className="shrink-0 snap-start">
              <a
                href={b.yol(sayfaYolu(ilce ? { tur: 'hizmetIlce', hizmet: h, ilce } : { tur: 'hizmet', hizmet: h }))}
                className="group flex h-full items-center gap-2.5 rounded-2xl px-3 py-2.5 text-[0.88rem] font-semibold text-white/85 transition-colors hover:bg-white/[0.08] hover:text-white lg:flex-col lg:items-start lg:gap-3 lg:p-3.5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-sky-300 ring-1 ring-white/10 transition-colors group-hover:bg-white/[0.14]">
                  <Ikon ad={h.ikon} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="whitespace-nowrap lg:whitespace-normal lg:leading-snug">{h.ad}</span>
              </a>
            </li>
          ))}
        </OtomatikKaydir>
      </nav>
    </div>
  );
}

/** Ana sayfa ve ilçe sayfası hero kartı: hizmetlere hızlı geçiş */
function HizmetKarti({ b }: { b: Baglam }) {
  const { sektor, sayfa } = b;
  const ilce = sayfa.tur === 'ilce' ? sayfa.ilce : undefined;
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur">
      <p className="px-4 pb-3 pt-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/55">Ne için arıyorsunuz?</p>
      <ul className="grid gap-1.5">
        {sektor.hizmetler.map((h, i) => (
          <li key={h.slug} style={{ '--gecikme': `${350 + i * 70}ms` } as CSSProperties} className="giris">
            <a
              href={b.yol(sayfaYolu(ilce ? { tur: 'hizmetIlce', hizmet: h, ilce } : { tur: 'hizmet', hizmet: h }))}
              className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.07]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-sky-300 ring-1 ring-white/10">
                <Ikon ad={h.ikon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">{h.ad}</span>
                <span className="block truncate text-[0.8rem] text-white/55">{h.kisa}</span>
              </span>
              <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Cihaz gerektirmeyen hizmetlerin hero kartı: yapılan işlerin listesi */
function KapsamKarti({ hizmet }: { hizmet: Hizmet }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.08] text-sky-300 ring-1 ring-white/10">
        <Ikon ad={hizmet.ikon} className="h-7 w-7" />
      </span>
      <p className="mt-6 text-xl font-bold text-white">{hizmet.ad}</p>
      <ul className="mt-5 space-y-3.5">
        {hizmet.kapsam.map((m, i) => (
          <li key={m} style={{ '--gecikme': `${350 + i * 90}ms` } as CSSProperties} className="giris flex gap-3 text-white/75">
            <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" strokeWidth={2.5} />
            {m}
          </li>
        ))}
      </ul>
    </div>
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

/** İlçe sayfası: ilçenin yapı tiplerine göre öne çıkan işler, mahalleler, varış */
function IlceTanitim({ b }: { b: Baglam }) {
  const { sektor, firma, yer } = b;
  const bilgi = ilceBilgisi(firma.sehir, yer);
  if (!bilgi) return null;
  const notlar = bilgi.yapilar.map((y) => sektor.yapiNotlari[y]).filter((n) => n !== undefined);
  const varis = firma.varisSuresi?.[yer];
  return (
    <Bolum ust={`${yer} hakkında`} baslik={`${doldur('{yerde}', firma, yer)} en çok çağrıldığımız işler`} aciklama={bilgi.tanim}>
      <div className="grid gap-4 lg:grid-cols-2">
        {notlar.map((n) => (
          <div key={n.baslik} className="flex flex-col rounded-3xl border border-cizgi bg-white p-6 sm:p-8">
            <p className="text-lg font-bold text-murekkep">{n.baslik}</p>
            <p className="mt-3 leading-relaxed text-metin">{n.metin}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {n.hizmetler
                .map((slug) => sektor.hizmetler.find((h) => h.slug === slug))
                .filter((h) => h !== undefined)
                .map((h) => (
                  <li key={h.slug}>
                    <a
                      href={b.yol(sayfaYolu({ tur: 'hizmetIlce', hizmet: h, ilce: yer }))}
                      className="inline-flex items-center gap-2 rounded-full bg-ana-acik px-3.5 py-2 text-[0.85rem] font-semibold text-ana hover:bg-ana hover:text-white"
                    >
                      <Ikon ad={h.ikon} className="h-4 w-4" />
                      {h.ad}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-zemin p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="font-bold text-murekkep">{yer} içinde geldiğimiz mahalleler</p>
          <p className="mt-2 text-metin">{bilgi.mahalleler.join(', ')} ve çevresi.</p>
        </div>
        {varis && (
          <p className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.9rem] font-semibold text-murekkep ring-1 ring-cizgi">
            <Clock aria-hidden className="h-4 w-4 text-ana" /> Ortalama varış {varis}
          </p>
        )}
      </div>
    </Bolum>
  );
}

/** Hizmet + ilçe sayfası: bu hizmetin o ilçedeki karşılığı */
function IlceNotu({ b, hizmet }: { b: Baglam; hizmet: Hizmet }) {
  const { sektor, firma, yer } = b;
  const bilgi = ilceBilgisi(firma.sehir, yer);
  if (!bilgi) return null;
  const notlar = bilgi.yapilar.map((y) => sektor.yapiNotlari[y]).filter((n) => n !== undefined);
  const not = notlar.find((n) => n.hizmetler.includes(hizmet.slug)) ?? notlar[0];
  return (
    <Bolum ust={yer} baslik={`${doldur('{yerde}', firma, yer)} ${hizmet.ad.toLocaleLowerCase('tr-TR')}`} aciklama={bilgi.tanim} zemin>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {not && (
          <div className="rounded-3xl border border-cizgi bg-white p-6 sm:p-8">
            <p className="text-lg font-bold text-murekkep">{not.baslik}</p>
            <p className="mt-3 leading-relaxed text-metin">{not.metin}</p>
          </div>
        )}
        <div className="rounded-3xl border border-cizgi bg-white p-6 sm:p-8">
          <p className="font-bold text-murekkep">Geldiğimiz mahalleler</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {bilgi.mahalleler.map((m) => (
              <li key={m} className="rounded-full bg-zemin px-3 py-1.5 text-[0.85rem] font-medium text-metin">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Bolum>
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
  const { firma, yer, sayfa } = b;
  // İlçe sayfasında bulunulan ilçe listelenmez, komşu ilçeler öne alınır.
  const komsular = sayfa.tur === 'ilce' ? (ilceBilgisi(firma.sehir, yer)?.komsular ?? []) : [];
  const ilceler =
    sayfa.tur === 'ilce'
      ? firma.ilceler.filter((i) => i !== yer).sort((x, y) => Number(komsular.includes(y)) - Number(komsular.includes(x)))
      : firma.ilceler;
  return (
    <Bolum id="bolgeler" ust="Hizmet bölgeleri" baslik={baslik}>
      <ul className="flex flex-wrap gap-2.5">
        {ilceler.map((i) => {
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

/* ------------------------------------------------------------------ */
/* Yasal metinler ve bulunamadı sayfası                                */
/* ------------------------------------------------------------------ */

// Firma bilgilerinden üretilen şablon metinler. Yayına almadan önce bir hukukçuya göstermek önerilir.
function YasalSayfa({ b, metin }: { b: Baglam; metin: YasalMetin }) {
  const { firma } = b;
  const sorumlu = firma.unvan ?? firma.ad;
  const iletisim = [firma.adres, firma.eposta, firma.telefon].filter(Boolean).join(' · ');
  const takipVar = Boolean(firma.takip);
  const servisler = [
    firma.takip?.ga4 && 'Google Analytics (ziyaret istatistikleri)',
    firma.takip?.googleAds && 'Google Ads (reklam dönüşüm ölçümü)',
    firma.takip?.metaPiksel && 'Meta Pikseli (Facebook/Instagram reklam ölçümü)',
  ].filter(Boolean) as string[];

  const bolumler: { baslik: string; paragraflar: string[] }[] =
    metin === 'kvkk'
      ? [
          {
            baslik: 'Veri sorumlusu',
            paragraflar: [`6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu ${sorumlu}’dur. İletişim: ${iletisim}.`],
          },
          {
            baslik: 'İşlenen veriler ve amaçları',
            paragraflar: [
              'Bu sitede form bulunmaz; bize telefonla ya da WhatsApp üzerinden ulaştığınızda paylaştığınız ad, telefon numarası, adres ve sorunla ilgili bilgiler (fotoğraf dahil) yalnızca talebinizi karşılamak, randevu ve fiyat bilgisi vermek ve yapılan işin garantisini takip etmek amacıyla işlenir.',
              'Siteyi ziyaret ettiğinizde barındırma sağlayıcısı tarafından güvenlik amacıyla IP adresi ve tarayıcı bilgisi gibi teknik kayıtlar tutulabilir.',
              takipVar
                ? 'Onay vermeniz halinde reklamlarımızın etkinliğini ölçmek için çerezler kullanılır; ayrıntılar Çerez Politikası’ndadır.'
                : 'Sitede reklam veya analiz çerezi kullanılmaz.',
            ],
          },
          {
            baslik: 'Hukuki sebep',
            paragraflar: [
              'Verileriniz KVKK m.5/2 (c) uyarınca bir sözleşmenin kurulması ve ifası, (f) uyarınca meşru menfaat ve çerezler için m.5/1 uyarınca açık rızanız hukuki sebeplerine dayanılarak işlenir.',
            ],
          },
          {
            baslik: 'Aktarım',
            paragraflar: [
              'Verileriniz satılmaz ve pazarlama amacıyla üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluk halinde yetkili kurumlarla ve hizmetin yürütülmesi için kullanılan iletişim ve barındırma hizmetleriyle sınırlı olarak paylaşılabilir; bu hizmetlerin bir kısmının sunucuları yurt dışında bulunabilir.',
            ],
          },
          {
            baslik: 'Haklarınız',
            paragraflar: [
              'KVKK m.11 uyarınca verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.',
              `Başvurularınızı ${firma.eposta ? `${firma.eposta} adresine e-posta ile ya da ` : ''}${firma.adres ? `${firma.adres} adresine yazılı olarak ` : 'yukarıdaki iletişim bilgileriyle '}iletebilirsiniz. Başvurular en geç 30 gün içinde yanıtlanır.`,
            ],
          },
        ]
      : [
          {
            baslik: 'Çerez nedir?',
            paragraflar: ['Çerezler, ziyaret ettiğiniz sitenin tarayıcınıza kaydettiği küçük dosyalardır.'],
          },
          {
            baslik: 'Zorunlu kayıtlar',
            paragraflar: [
              'Sitenin çalışması için çerez gerekmez. Çerez tercihinizi hatırlamak için tarayıcınızda yalnızca tercihinizi içeren küçük bir kayıt tutulur.',
            ],
          },
          {
            baslik: 'Ölçüm ve reklam çerezleri',
            paragraflar: takipVar
              ? [
                  `Yalnızca onay verirseniz şu hizmetler yüklenir: ${servisler.join(', ')}. Bu çerezler arama ve WhatsApp butonlarına tıklanıp tıklanmadığını ölçerek reklamlarımızın işe yarayıp yaramadığını anlamamızı sağlar.`,
                  'Onay vermezseniz bu hizmetler hiç yüklenmez. Tercihinizi sayfanın altındaki “Çerez tercihleri” bağlantısından istediğiniz zaman değiştirebilirsiniz.',
                ]
              : ['Bu sitede ölçüm veya reklam çerezi kullanılmaz.'],
          },
          {
            baslik: 'Tarayıcı ayarları',
            paragraflar: ['Çerezleri tarayıcınızın ayarlarından da silebilir veya engelleyebilirsiniz.'],
          },
        ];

  return (
    <section className="kap max-w-3xl py-14 sm:py-20">
      <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ana">{firma.ad}</p>
      <h1 className="mt-3 text-[2rem] font-extrabold tracking-[-0.03em] text-murekkep sm:text-[2.6rem]">
        {metin === 'kvkk' ? 'KVKK Aydınlatma Metni' : 'Çerez Politikası'}
      </h1>
      <div className="mt-10 space-y-9">
        {bolumler.map((bl) => (
          <div key={bl.baslik}>
            <h2 className="text-lg font-bold text-murekkep">{bl.baslik}</h2>
            {bl.paragraflar.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-metin">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SayfaBulunamadi({ b }: { b: Baglam }) {
  return (
    <Kabuk b={b}>
      <section className="relative isolate overflow-hidden bg-gece text-white">
        <div aria-hidden className="suzul absolute -right-40 -top-48 -z-10 h-[30rem] w-[30rem] rounded-full bg-ana/45 blur-[120px]" />
        <div className="kap py-20 sm:py-28">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-white/55">404</p>
          <h1 className="mt-4 max-w-2xl text-[2.2rem] font-extrabold leading-tight tracking-[-0.035em] sm:text-[3.2rem]">Aradığınız sayfa bulunamadı.</h1>
          <p className="mt-4 max-w-xl text-white/70">Sorununuzu anlatmak için bizi doğrudan arayabilir ya da hizmetlerimize göz atabilirsiniz.</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a href={b.tel} data-olay="telefon" className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-5 font-bold text-gece">
              <Phone aria-hidden className="h-[1.05rem] w-[1.05rem] text-red-500" strokeWidth={2.25} />
              Hemen Arayın
            </a>
            <a href={b.yol('/')} className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/[0.08] px-5 font-semibold">
              Ana sayfaya dön
            </a>
          </div>
        </div>
      </section>
      <Hizmetler b={b} />
    </Kabuk>
  );
}
