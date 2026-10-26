// Firmanın yazı tipi. Farklı bir görünüm için yalnızca içe aktarılan adı değiştirin;
// Türkçe karakterleri ve sitenin ağırlıklarını destekleyen hazır seçenekler:
//   Manrope · Plus_Jakarta_Sans · Sora · DM_Sans · Outfit · Figtree
import { Manrope as YaziTipi } from 'next/font/google';

export const govde = YaziTipi({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-govde',
  // Yazı tipi geç gelirse sistem yazısıyla devam edilir: sayfa kaymaz, hız düşmez.
  display: 'optional',
});
