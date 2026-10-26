import type { Sektor } from '@/lib/tipler';

export const tesisat: Sektor = {
  slug: 'tesisat',
  ad: 'Tesisat ve su kaçağı',
  etiket: 'Tesisat · Su kaçağı',
  isTanimi: 'su kaçağını ve tesisat arızalarını',
  vaat: 'kırmadan çözüyoruz.',
  aciklama:
    '{ilce} ve çevresinde su kaçağını cihazla, duvarı kırmadan buluyoruz. Tıkanıklık, sızıntı ve tesisat arızasında fiyatı işe başlamadan söylüyor, işi temiz teslim ediyoruz.',
  guvenMaddeleri: ['Kırmadan cihazla tespit', 'Fiyat işe başlamadan', 'Temiz ve garantili işçilik'],
  acilAdimlar: {
    baslik: 'Su kaçağı mı var? Biz gelene kadar:',
    adimlar: [
      'Ana su vanasını kapatın (genelde sayacın yanında).',
      'Su prizlere veya sigortaya yakınsa elektriği kesin.',
      'Islak alanın fotoğrafını çekip WhatsApp’tan gönderin.',
    ],
  },
  sorunlar: [
    { ad: 'Su kaçağı', ikon: 'damla', mesaj: 'evde su kaçağı var' },
    { ad: 'Tıkanıklık', ikon: 'tikaniklik', mesaj: 'gider / lavabo tıkandı' },
    { ad: 'Fatura yüksek geldi', ikon: 'sayac', mesaj: 'su faturam normalden yüksek geldi' },
    { ad: 'Duvarda nem, rutubet', ikon: 'nem', mesaj: 'duvarda nem ve rutubet lekesi var' },
    { ad: 'Musluk, batarya', ikon: 'musluk', mesaj: 'musluk / batarya damlatıyor' },
    { ad: 'Kombi, petek tesisatı', ikon: 'kombi', mesaj: 'kombi / petek tesisatında sorun var' },
  ],
  hizmetler: [
    {
      slug: 'su-kacagi-tespiti',
      ad: 'Su kaçağı tespiti',
      ikon: 'cihaz',
      ozet: 'Termal kamera ve akustik dinleme cihazıyla kaçağın yerini duvarı kırmadan buluyoruz; yalnızca kaçağın olduğu noktayı açıyoruz.',
      belirtiler: ['Su faturası birden arttı', 'Sayaç musluklar kapalıyken dönüyor', 'Alt kata su sızıyor'],
    },
    {
      slug: 'tikaniklik-acma',
      ad: 'Tıkanıklık açma',
      ikon: 'tikaniklik',
      ozet: 'Lavabo, tuvalet, banyo ve mutfak giderleri ile kanalizasyon hatlarını makineyle, kırmadan açıyoruz.',
      belirtiler: ['Su geç gidiyor', 'Giderden kötü koku geliyor', 'Su geri taşıyor'],
    },
    {
      slug: 'tesisat-yenileme',
      ad: 'Tesisat yenileme',
      ikon: 'boru',
      ozet: 'Eskiyen, paslanan ya da sürekli arıza çıkaran temiz ve pis su tesisatını baştan yeniliyoruz.',
      belirtiler: ['Musluktan paslı su geliyor', 'Su basıncı çok düşük', 'Sık sık arıza çıkıyor'],
    },
    {
      slug: 'banyo-mutfak-tesisati',
      ad: 'Banyo ve mutfak tesisatı',
      ikon: 'banyo',
      ozet: 'Klozet, rezervuar, lavabo, batarya ve eviye montajı ile tadilat sırasında tesisatın tamamı.',
      belirtiler: ['Rezervuar sürekli su kaçırıyor', 'Batarya damlatıyor', 'Tadilat yapılacak'],
    },
    {
      slug: 'nem-ve-rutubet',
      ad: 'Nem ve rutubet tespiti',
      ikon: 'nem',
      ozet: 'Rutubetin tesisattan mı, yalıtımdan mı geldiğini ölçerek ayırıyoruz; gereksiz kırım ve masraf yapmıyorsunuz.',
      belirtiler: ['Duvarda kabarma ve leke', 'Boya dökülüyor', 'Küf kokusu var'],
    },
    {
      slug: 'kombi-petek-tesisati',
      ad: 'Kombi ve petek tesisatı',
      ikon: 'kombi',
      ozet: 'Petek temizliği, petek montajı, kombi bağlantı tesisatı ve basınç kaybı sorunları.',
      belirtiler: ['Petekler ısınmıyor', 'Kombi sürekli basınç düşürüyor', 'Peteklerde kaçak var'],
    },
  ],
  farklar: [
    { ikon: 'cihaz', baslik: 'Cihazla tespit', metin: 'Tahminle kırmıyoruz. Kaçağın yerini ölçüp yalnızca o noktayı açıyoruz.' },
    { ikon: 'fiyat', baslik: 'Önce fiyat, sonra iş', metin: 'Tespitten sonra fiyatı söylüyoruz; onayınız olmadan işe başlamıyoruz.' },
    { ikon: 'temiz', baslik: 'Temiz çalışma', metin: 'Galoş, koruma örtüsü ve iş sonunda temizlik. Evinizi bulduğumuz gibi bırakıyoruz.' },
    { ikon: 'garanti', baslik: 'Garantili işçilik', metin: 'Yaptığımız işin arkasındayız; sorun tekrar ederse yeniden geliyoruz.' },
  ],
  surec: [
    { baslik: 'Arayın ya da yazın', metin: 'Sorunu anlatın, mümkünse fotoğraf gönderin. Size en yakın ustayı yönlendiriyoruz.' },
    { baslik: 'Usta adresinizde', metin: 'Size verdiğimiz saatte, gerekli cihaz ve malzemeyle kapınızdayız.' },
    { baslik: 'Tespit ve fiyat onayı', metin: 'Sorunun kaynağını cihazla buluyor, fiyatı işe başlamadan söylüyoruz.' },
    { baslik: 'Onarım ve temizlik', metin: 'Onarımı yapıyor, alanı temizliyor ve suyu birlikte test ediyoruz.' },
  ],
  sss: [
    {
      soru: 'Su kaçağını bulmak için duvarı kırmanız gerekiyor mu?',
      cevap: 'Hayır. Termal kamera ve akustik dinleme cihazıyla kaçağın yerini önceden buluyoruz. Yalnızca kaçağın olduğu küçük alanı açıp onarıyoruz.',
    },
    {
      soru: 'Fiyatı ne zaman öğrenirim?',
      cevap: 'Tespitten sonra, işe başlamadan önce. Onayınız olmadan hiçbir işe başlamıyoruz; sürpriz fatura çıkmaz.',
    },
    {
      soru: 'Su faturam neden yüksek geliyor olabilir?',
      cevap: 'Bütün musluklar kapalıyken sayaç dönüyorsa büyük olasılıkla görünmeyen bir kaçak vardır. Sayacın fotoğrafını WhatsApp’tan gönderin, birlikte bakalım.',
    },
    {
      soru: 'Alt komşuya su sızıyor, ne yapmalıyım?',
      cevap: 'Önce ana vanayı kapatın, sonra bizi arayın. Kaçağın sizin tesisatınızdan mı, ortak hattan mı geldiğini tespit edip size yazılı olarak bildiriyoruz.',
    },
    {
      soru: 'Hafta sonu ve gece hizmet veriyor musunuz?',
      cevap: 'Çalışma saatlerimiz sayfanın altında yazılı. Acil su kaçaklarında mümkün olan en kısa sürede yönlendirme yapıyoruz; arayıp durumu anlatmanız yeterli.',
    },
  ],
  ornekYorumlar: [
    {
      ad: 'Ayşe K.',
      ilce: 'Yenişehir',
      puan: 5,
      metin: 'Alt kata su sızıyordu, kaçağın yerini cihazla buldular ve sadece bir fayansı söktüler. Fiyatı baştan söylediler, iş temiz bitti.',
    },
    {
      ad: 'Mehmet Y.',
      ilce: 'Mezitli',
      puan: 5,
      metin: 'Akşam saatinde mutfak gideri tıkandı, aradığımda bir saat içinde geldiler. Makineyle açtılar, ortalığı da temizlediler.',
    },
    {
      ad: 'Elif D.',
      ilce: 'Toroslar',
      puan: 5,
      metin: 'Su faturamız iki katına çıkmıştı. Banyo duvarındaki kaçağı kırmadan buldular, fatura normale döndü.',
    },
  ],
  evdeTest: {
    baslik: '30 saniyelik kaçak testi',
    aciklama: 'Görünmeyen bir kaçak olup olmadığını usta çağırmadan önce kendiniz kontrol edin.',
    adimlar: ['Evdeki bütün muslukları ve rezervuarları kapatın.', 'Su sayacının küçük çarkının ya da son hanesinin yerini not edin.', '15 dakika hiç su kullanmadan bekleyip sayaca tekrar bakın.'],
    soru: 'Sayaç hareket etti mi?',
    evetBaslik: 'Evet, sayaç döndü',
    evetMetin: 'Büyük olasılıkla görünmeyen bir kaçak var. Ne kadar erken bulunursa fatura ve hasar o kadar az olur.',
    evetMesaj: 'kaçak testini yaptım, musluklar kapalıyken sayaç dönüyor',
    hayirBaslik: 'Hayır, sayaç durdu',
    hayirMetin: 'Ana tesisatta kaçak görünmüyor. Yine de nem, koku ya da yüksek fatura varsa fotoğraf gönderin, birlikte bakalım.',
  },
  seoBaslik: '{ilce} Su Kaçağı Tespiti ve Tesisatçı | {firma}',
  seoAciklama:
    '{ilce} ve {sehir} genelinde kırmadan su kaçağı tespiti, tıkanıklık açma ve tesisat onarımı. Fiyat işe başlamadan söylenir. Hemen arayın.',
  schemaTuru: 'Plumber',
  renk: {
    ana: '#0b4a85',
    anaKoyu: '#062c52',
    anaAcik: '#e8f1fb',
    acil: '#c2410c',
    acilKoyu: '#9a3412',
  },
};
