// Hero fotoğrafını sitenin beklediği boyut ve biçimlere çevirir.
// Kullanım: node scripts/hero-foto.mjs <kaynak.jpg> <ad> [mobil kırpım için sol kenar oranı, varsayılan 0.4]
// Örnek:    node scripts/hero-foto.mjs usta.jpg yildiz-tesisat 0.45
import sharp from 'sharp';

const [kaynak, ad, solOran = '0.4'] = process.argv.slice(2);
if (!kaynak || !ad) {
  console.error('Kullanım: node scripts/hero-foto.mjs <kaynak.jpg> <ad> [solOran]');
  process.exit(1);
}

const { width, height } = await sharp(kaynak).metadata();
const sol = Math.round(width * Number(solOran));
const isler = [
  [`${ad}-genis-1376`, sharp(kaynak).resize(1376), 60],
  [`${ad}-genis-960`, sharp(kaynak).resize(960), 50],
  [`${ad}-dar-720`, sharp(kaynak).extract({ left: sol, top: 0, width: width - sol, height }).resize(720), 50],
];
for (const [dosya, s, kalite] of isler) {
  await s.clone().avif({ quality: kalite, effort: 6 }).toFile(`public/hero/${dosya}.avif`);
  await s.clone().webp({ quality: 72 }).toFile(`public/hero/${dosya}.webp`);
  console.log(`public/hero/${dosya}.avif/.webp`);
}
