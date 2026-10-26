import type { Firma } from '@/lib/tipler';

// Müşteriye özel kurulumda yalnızca bu dosya ve SEKTOR değişir.
// Demo kurulumunda (NEXT_PUBLIC_DEMO=1) bu bilgiler linkteki parametrelerle ezilir.

export const SEKTOR = 'tesisat';

export const FIRMA: Firma = {
  ad: 'Örnek Tesisat',
  telefon: '0850 242 73 63',
  sehir: 'Mersin',
  ilce: 'Mezitli',
  ilceler: ['Mezitli', 'Yenişehir', 'Toroslar', 'Akdeniz', 'Erdemli', 'Tarsus', 'Silifke'],
  calismaSaatleri: 'Her gün 08:00 – 22:00',
  saatler: { acilis: '08:00', kapanis: '22:00' },
  yirmiDortSaat: false,
  garantiAy: 12,
};
