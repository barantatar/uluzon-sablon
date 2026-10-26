// Türkçe yer adı ekleri: Mezitli'de, Toroslar'da, Tarsus'ta, Akdeniz'de

const INCE = 'eiöü';
const SERT = 'fstkçşhp';

function sonUnlu(kelime: string): string {
  const k = kelime.toLocaleLowerCase('tr-TR');
  for (let i = k.length - 1; i >= 0; i--) {
    if ('aeıioöuü'.includes(k.charAt(i))) return k.charAt(i);
  }
  return 'e';
}

/** Bulunma eki: Mezitli → Mezitli'de */
export function deEki(ad: string): string {
  const son = ad.toLocaleLowerCase('tr-TR').slice(-1);
  const sessiz = SERT.includes(son) ? 't' : 'd';
  const unlu = INCE.includes(sonUnlu(ad)) ? 'e' : 'a';
  return `${ad}’${sessiz}${unlu}`;
}
