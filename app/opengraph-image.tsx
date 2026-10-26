import { ImageResponse } from 'next/og';
import { FIRMA, SEKTOR } from '@/firma.config';
import { doldur, renkler } from '@/lib/firma';
import { sektorBul } from '@/sektorler';

// WhatsApp, Facebook ve Google'da link paylaşılınca görünen görsel; firma bilgilerinden üretilir.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${FIRMA.ad} – ${FIRMA.sehir}`;

export default function OgGorseli() {
  const sektor = sektorBul(SEKTOR)!;
  const r = renkler(sektor, FIRMA);
  const baslik = FIRMA.baslik ?? sektor.baslik;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: r.gece, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: r.ana, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800 }}>
            {FIRMA.ad.split(/\s+/).slice(0, 2).map((k) => k.charAt(0).toLocaleUpperCase('tr-TR')).join('')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 34, fontWeight: 800 }}>{FIRMA.ad}</div>
            <div style={{ fontSize: 22, opacity: 0.6 }}>{`${sektor.etiket} · ${FIRMA.sehir}`}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
          <span>{doldur(baslik.on, FIRMA)}</span>
          <span style={{ color: '#7dd3fc' }}>{baslik.vurgu}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ display: 'flex', background: '#fff', color: r.gece, borderRadius: 999, padding: '14px 30px' }}>{FIRMA.telefon}</div>
          <div style={{ fontSize: 24, opacity: 0.65 }}>{FIRMA.calismaSaatleri}</div>
        </div>
      </div>
    ),
    size,
  );
}
