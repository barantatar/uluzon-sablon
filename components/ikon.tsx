import {
  BadgeCheck,
  Banknote,
  Bath,
  CloudDrizzle,
  Droplets,
  Flame,
  Gauge,
  ScanSearch,
  ShowerHead,
  Sparkles,
  Waves,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { Ikon as IkonAdi } from '@/lib/tipler';

const IKONLAR: Record<IkonAdi, LucideIcon> = {
  damla: Droplets,
  tikaniklik: Waves,
  musluk: ShowerHead,
  nem: CloudDrizzle,
  kombi: Flame,
  sayac: Gauge,
  boru: Wrench,
  banyo: Bath,
  cihaz: ScanSearch,
  temiz: Sparkles,
  fiyat: Banknote,
  garanti: BadgeCheck,
};

export default function Ikon({ ad, className = 'h-5 w-5' }: { ad: IkonAdi; className?: string }) {
  const I = IKONLAR[ad];
  return <I aria-hidden className={className} strokeWidth={1.75} />;
}
