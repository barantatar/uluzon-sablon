import { ImageResponse } from 'next/og';
import { FIRMA, SEKTOR } from '@/firma.config';
import { basHarfler, renkler } from '@/lib/firma';
import { sektorBul } from '@/sektorler';

// Firma adının baş harflerinden üretilen sekme ikonu; logo gelene kadar yeterli.
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  const sektor = sektorBul(SEKTOR)!;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 14,
          background: renkler(sektor, FIRMA).ana,
          color: '#fff',
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        {basHarfler(FIRMA.ad)}
      </div>
    ),
    size,
  );
}
