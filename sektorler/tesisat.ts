import type { Sektor } from '@/lib/tipler';

export const tesisat: Sektor = {
  slug: 'tesisat',
  ad: 'Tesisat ve su kaçağı',
  etiket: 'Tesisat · Su kaçağı',
  baslik: { on: '{yerde} su kaçağını', vurgu: 'kırmadan buluyoruz.' },
  aciklama: 'Kaçağın yerini cihazla tespit ediyor, yalnızca o noktayı açıyoruz. Fiyatı işe başlamadan söylüyor, evinizi temiz teslim ediyoruz.',
  guvenMaddeleri: [
    { ikon: 'cihaz', metin: 'Cihazla tespit' },
    { ikon: 'fiyat', metin: 'Önce fiyat' },
    { ikon: 'temiz', metin: 'Temiz işçilik' },
  ],
  ilkAdimlar: {
    soru: 'Şu an su mu akıyor? Biz gelene kadar yapmanız gerekenler',
    adimlar: [
      'Ana su vanasını kapatın. Genelde sayacın hemen yanındadır.',
      'Su prize ya da sigorta kutusuna yakınsa elektriği kesin.',
      'Islak alanın fotoğrafını çekip WhatsApp’tan bize gönderin.',
    ],
  },
  hizmetler: [
    {
      slug: 'su-kacagi-tespiti',
      ad: 'Su kaçağı tespiti',
      ikon: 'cihaz',
      kisa: 'Termal kamera ve dinleme cihazıyla, duvarı kırmadan.',
      baslik: { on: '{yerde} su kaçağı tespiti,', vurgu: 'duvar kırmadan.' },
      aciklama:
        'Termal kamera ve akustik dinleme cihazıyla kaçağın yerini önceden buluyoruz. Bütün banyoyu değil, yalnızca kaçağın olduğu noktayı açıyoruz.',
      belirtiler: [
        'Su faturası birden yükseldi',
        'Musluklar kapalıyken sayaç dönüyor',
        'Alt kata ya da komşuya su sızıyor',
        'Zeminde veya duvarda ıslaklık var',
      ],
      kapsam: [
        'Termal kamera ile ısı farkından kaçak izi taraması',
        'Akustik cihazla boru içindeki su sesini dinleme',
        'Basınç testiyle hattın kaçak yapıp yapmadığını ölçme',
        'Yalnızca kaçak noktasını açıp onarma ve kapatma',
      ],
      sss: [
        {
          soru: 'Kaçak tespiti kaç saat sürer?',
          cevap: 'Çoğu dairede tespit bir iki saat içinde biter. Hattın uzunluğuna ve kaçağın türüne göre değişebilir; gelmeden önce size tahmini süre söylüyoruz.',
        },
        {
          soru: 'Kaçak bulunamazsa ne olur?',
          cevap: 'Ölçüm sonuçlarını sizinle paylaşıyor, sorunun tesisattan mı yoksa yalıtım gibi başka bir kaynaktan mı geldiğini açıkça söylüyoruz.',
        },
      ],
      cihazla: true,
      test: true,
      mesaj: 'evde su kaçağı olduğunu düşünüyorum',
    },
    {
      slug: 'tikaniklik-acma',
      ad: 'Tıkanıklık açma',
      ikon: 'tikaniklik',
      kisa: 'Lavabo, tuvalet ve giderler makineyle, kırmadan.',
      baslik: { on: '{yerde} tıkanıklık açma,', vurgu: 'makineyle ve kırmadan.' },
      aciklama: 'Lavabo, tuvalet, banyo ve mutfak giderleri ile bina kanalizasyon hatlarını spiral makineyle, kırmadan açıyoruz.',
      belirtiler: ['Su geç gidiyor ya da hiç gitmiyor', 'Giderden kötü koku geliyor', 'Su geri taşıyor', 'Giderden fokurdama sesi geliyor'],
      kapsam: ['Lavabo, eviye ve duş giderleri', 'Tuvalet ve klozet tıkanıklığı', 'Bina ana kanalizasyon hattı', 'Açma sonrası su ile akış testi'],
      sss: [
        {
          soru: 'Tıkanıklık açarken bir yer kırılır mı?',
          cevap: 'Hayır. Spiral makineyle giderin içinden çalışıyoruz. Kırmak gereken nadir durumlarda önce size gösterip onay alıyoruz.',
        },
        {
          soru: 'Kimyasal açıcı kullanmalı mıyım?',
          cevap: 'Önermiyoruz. Asitli ürünler eski boruları yıpratır ve tıkanıklığı her zaman çözmez. Fotoğraf gönderin, ne gerektiğini söyleyelim.',
        },
      ],
      mesaj: 'giderim tıkandı',
    },
    {
      slug: 'tesisat-yenileme',
      ad: 'Tesisat yenileme',
      ikon: 'boru',
      kisa: 'Eskiyen, paslanan temiz ve pis su hatları baştan.',
      baslik: { on: '{yerde} tesisat yenileme,', vurgu: 'tek seferde ve doğru.' },
      aciklama: 'Eskiyen, paslanan ya da sürekli arıza çıkaran temiz su ve pis su tesisatını ihtiyaca göre bölüm bölüm ya da baştan yeniliyoruz.',
      belirtiler: ['Musluktan paslı veya bulanık su geliyor', 'Su basıncı çok düşük', 'Sık sık farklı yerden arıza çıkıyor', 'Bina 20 yıldan eski ve tesisat hiç yenilenmedi'],
      kapsam: ['Mevcut hattın keşfi ve yazılı fiyat', 'Temiz su hattı yenileme', 'Pis su ve gider hattı yenileme', 'İş sonunda basınç testi ve temizlik'],
      sss: [
        {
          soru: 'Bütün tesisatı yenilemek şart mı?',
          cevap: 'Her zaman değil. Keşifte hangi bölümün gerçekten yenilenmesi gerektiğini gösteriyor, gereksiz masraf çıkarmıyoruz.',
        },
        {
          soru: 'Evde otururken yapılabilir mi?',
          cevap: 'Çoğu zaman evet. İşi bölümlere ayırıp suyun kesik kalacağı saatleri önceden bildiriyoruz.',
        },
      ],
      mesaj: 'tesisat yenileme için fiyat almak istiyorum',
    },
    {
      slug: 'banyo-mutfak-tesisati',
      ad: 'Banyo ve mutfak tesisatı',
      ikon: 'banyo',
      kisa: 'Klozet, rezervuar, batarya, eviye montajı ve tadilat.',
      baslik: { on: '{yerde} banyo ve mutfak tesisatı,', vurgu: 'temiz montaj.' },
      aciklama: 'Klozet, gömme rezervuar, lavabo, batarya ve eviye montajından tadilat sırasındaki tesisatın tamamına kadar.',
      belirtiler: ['Rezervuar sürekli su kaçırıyor', 'Batarya ya da musluk damlatıyor', 'Lavabonun altı ıslak', 'Banyo veya mutfak tadilatı yapılacak'],
      kapsam: ['Batarya, musluk ve ara musluk değişimi', 'Klozet ve gömme rezervuar montajı ve tamiri', 'Lavabo ve eviye bağlantıları', 'Tadilatta tesisatın yeniden planlanması'],
      sss: [
        {
          soru: 'Malzemeyi ben alsam takar mısınız?',
          cevap: 'Evet. İsterseniz malzemeyi biz de getirebiliriz; iki seçeneğin fiyatını da önceden söylüyoruz.',
        },
        {
          soru: 'Gömme rezervuar arızasında duvar kırılır mı?',
          cevap: 'Çoğu arıza kumanda panelinin arkasından giderilir, duvar kırılmaz.',
        },
      ],
      mesaj: 'banyo / mutfak tesisatı için destek istiyorum',
    },
    {
      slug: 'nem-ve-rutubet',
      ad: 'Nem ve rutubet tespiti',
      ikon: 'nem',
      kisa: 'Rutubet tesisattan mı yalıtımdan mı, ölçerek ayırıyoruz.',
      baslik: { on: '{yerde} nem ve rutubet tespiti,', vurgu: 'ölçerek.' },
      aciklama: 'Duvardaki rutubetin tesisat kaçağından mı, yalıtım ya da yoğuşmadan mı geldiğini nem ölçer ve termal kamerayla ayırıyoruz.',
      belirtiler: ['Duvarda kabarma ve sarı leke', 'Boya ve sıva dökülüyor', 'Odada küf kokusu var', 'Leke yağmurdan bağımsız büyüyor'],
      kapsam: ['Nem ölçer ile duvar haritası', 'Termal kamera ile kaynak taraması', 'Kaçaksa onarım, değilse doğru ustaya yönlendirme', 'Bulguların fotoğraflı raporu'],
      sss: [
        {
          soru: 'Her rutubet tesisattan mı gelir?',
          cevap: 'Hayır. Çoğu zaman yalıtım ya da yoğuşmadan gelir. Bunu ölçmeden kırmak boşa masraftır; önce kaynağı buluyoruz.',
        },
        {
          soru: 'Rapor veriyor musunuz?',
          cevap: 'Evet. Ölçüm noktalarını ve bulguları fotoğraflı olarak WhatsApp’tan iletiyoruz; komşu veya yöneticiyle paylaşabilirsiniz.',
        },
      ],
      cihazla: true,
      mesaj: 'duvarda nem ve rutubet var',
    },
    {
      slug: 'kombi-petek-tesisati',
      ad: 'Kombi ve petek tesisatı',
      ikon: 'kombi',
      kisa: 'Petek temizliği, montajı ve basınç kaybı sorunları.',
      baslik: { on: '{yerde} kombi ve petek tesisatı,', vurgu: 'ısınma sorununa son.' },
      aciklama: 'Petek temizliği, petek montajı ve taşıma, kombi bağlantı tesisatı ve sürekli basınç düşmesine yol açan kaçaklar.',
      belirtiler: ['Peteklerin bir kısmı ısınmıyor', 'Kombi sürekli basınç düşürüyor', 'Peteğin vanasında ya da altında kaçak var', 'Doğalgaz faturası yükseldi ama ev ısınmıyor'],
      kapsam: ['Makineli petek temizliği', 'Petek montajı, sökme ve taşıma', 'Kombi bağlantı ve tesisat hattı', 'Isıtma hattında kaçak tespiti'],
      sss: [
        {
          soru: 'Petek temizliği ne zaman yapılmalı?',
          cevap: 'Peteklerin üstü sıcak altı soğuksa ya da bazı odalar ısınmıyorsa temizlik zamanı gelmiştir. Genelde birkaç yılda bir yeterlidir.',
        },
        {
          soru: 'Kombi arızasına da bakıyor musunuz?',
          cevap: 'Tesisat ve petek tarafına bakıyoruz. Kombinin kendi arızası için yetkili servise yönlendiriyoruz.',
        },
      ],
      mesaj: 'peteklerim ısınmıyor / kombi basınç düşürüyor',
    },
  ],
  tespit: {
    baslik: 'Duvarı tahminle kırmıyoruz.',
    metin: 'Kaçak çoğu zaman göründüğü yerde değildir. Önce cihazla ölçüyor, sonra yalnızca kaçağın olduğu noktayı açıyoruz.',
    eski: {
      baslik: 'Tahminle arama',
      maddeler: ['Islaklığın olduğu yer kırılır', 'Kaçak bulunamazsa kırım büyür', 'Fayans, dolap ve sıva masrafı çıkar'],
    },
    yeni: {
      baslik: 'Cihazla tespit',
      maddeler: ['Kaçağın yeri önce ölçülür', 'Yalnızca o nokta açılır', 'Tadilat masrafı en aza iner'],
    },
  },
  farklar: [
    { ikon: 'cihaz', baslik: 'Cihazla tespit', metin: 'Termal kamera ve dinleme cihazıyla ölçüyoruz, tahminle kırmıyoruz.' },
    { ikon: 'fiyat', baslik: 'Önce fiyat', metin: 'Tespitten sonra fiyatı söylüyoruz; onayınız olmadan başlamıyoruz.' },
    { ikon: 'temiz', baslik: 'Temiz çalışma', metin: 'Galoş, koruma örtüsü ve iş sonunda temizlik.' },
    { ikon: 'garanti', baslik: 'Garantili işçilik', metin: 'Sorun tekrar ederse yeniden geliyoruz.' },
  ],
  surec: [
    { baslik: 'Arayın ya da yazın', metin: 'Sorunu anlatın, mümkünse fotoğraf gönderin.' },
    { baslik: 'Usta kapınızda', metin: 'Verdiğimiz saatte, cihaz ve malzemeyle geliyoruz.' },
    { baslik: 'Tespit ve fiyat', metin: 'Sorunun kaynağını buluyor, fiyatı işe başlamadan söylüyoruz.' },
    { baslik: 'Onarım ve temizlik', metin: 'Onarıyor, alanı temizliyor, suyu birlikte test ediyoruz.' },
  ],
  sss: [
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
      cevap: 'Önce ana vanayı kapatın, sonra bizi arayın. Kaçağın sizin tesisatınızdan mı, ortak hattan mı geldiğini tespit edip size bildiriyoruz.',
    },
    {
      soru: 'Hafta sonu ve akşam geliyor musunuz?',
      cevap: 'Çalışma saatlerimiz sayfanın altında yazılı. Acil su kaçaklarında en kısa sürede yönlendirme yapıyoruz; arayıp durumu anlatmanız yeterli.',
    },
  ],
  sonCagri: '{yerde} tesisat sorununuzu bugün çözelim.',
  ornekYorumlar: [
    {
      ad: 'Ayşe K.',
      ilce: 'Yenişehir',
      puan: 5,
      metin: 'Alt kata su sızıyordu. Kaçağın yerini cihazla buldular ve sadece bir fayansı söktüler. Fiyatı baştan söylediler, iş temiz bitti.',
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
  seoBaslik: '{yer} Su Kaçağı Tespiti ve Tesisatçı | {firma}',
  seoAciklama: '{yerde} kırmadan su kaçağı tespiti, tıkanıklık açma ve tesisat onarımı. Fiyat işe başlamadan söylenir. Hemen arayın.',
  schemaTuru: 'Plumber',
  renk: {
    ana: '#1d5fd1',
    anaKoyu: '#1748a3',
    anaAcik: '#eef4ff',
    gece: '#071426',
  },
};
