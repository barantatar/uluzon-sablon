import type { IlceBilgisi } from '@/lib/tipler';
import { mersin } from './mersin';

// Yeni şehir: bolgeler/<sehir>.ts dosyasını ekleyip buraya kaydedin.
const SEHIRLER: Record<string, Record<string, IlceBilgisi>> = {
  Mersin: mersin,
};

export function ilceBilgisi(sehir: string, ilce: string): IlceBilgisi | undefined {
  return SEHIRLER[sehir]?.[ilce];
}
