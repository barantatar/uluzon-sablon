# Yeni firma kurulumu

Her firma bu reponun ayrı bir kopyasıdır (GitHub'da "Use this template" ya da fork) ve ayrı bir Vercel projesi olarak yayınlanır. Şablona yapılan iyileştirmeler `git pull upstream main` ile firmalara taşınır; firmaya özel her şey aşağıdaki dosyalardadır, bu yüzden çakışma çıkmaz.

## 1. Firmadan alınacak bilgiler

| Bilgi | Nereye | Zorunlu |
| --- | --- | --- |
| Firma adı, telefon, ilçe, hizmet verilen ilçeler, çalışma saatleri | `firma.config.ts` | Evet |
| Alan adı | `siteUrl` | Evet |
| Resmî unvan, e-posta, adres | `unvan`, `eposta`, `adres` (KVKK metni) | Önerilir |
| Google puanı, yorum sayısı ve 3–6 gerçek yorum | `googlePuani`, `yorumlar` | Önerilir |
| Garanti süresi, tecrübe, keşif ücreti | `garantiAy`, `tecrube`, `kesifUcreti` | Yalnızca gerçekse |
| İlçelere varış süreleri | `varisSuresi` | Önerilir |
| Ustanın fotoğrafı | `heroFoto` | Önerilir |
| Logo | `logo` | İsteğe bağlı |

## 2. Firmayı diğerlerinden ayırmak

Hepsi `firma.config.ts` içinde, kod değişikliği gerekmez:

- **Renk:** `renk` → `ana`, `anaKoyu`, `anaAcik`, `gece` (koyu zemin).
- **Köşe stili:** `kose: 'yumusak' | 'orta' | 'keskin'`.
- **Başlık:** `baslik` ve `aciklama` (ör. yalnızca su kaçağı yapan firma için).
- **Logo:** dosyayı `public/` altına koyup `logo: '/logo.svg'`.
- **Fotoğraf:** `node scripts/hero-foto.mjs usta.jpg firma-adi` → `heroFoto: { ad: 'firma-adi', alt: '...' }`.
- **Yazı tipi:** `app/yazitipi.ts` içindeki tek satır (Manrope, Plus_Jakarta_Sans, Sora, DM_Sans, Outfit, Figtree).

## 3. Dönüşüm ölçümü

1. Google Ads > Hedefler > Dönüşümler > "Web sitesi" ile iki dönüşüm işlemi açın: **Telefon tıklaması** ve **WhatsApp tıklaması**. Her birinin `AW-…/etiket` değerindeki etiketi alın.
2. GA4 mülkü açıp ölçüm kimliğini (`G-…`) alın. İsterseniz Meta piksel kimliğini de ekleyin.
3. `takip` alanını doldurun. Ziyaretçi çerez onayı verince ölçüm başlar; site her "Hemen Arayın" ve WhatsApp tıklamasını otomatik gönderir. GA4'te olay adları `telefon_tiklama` ve `whatsapp_tiklama`dır.

## 4. Kontrol ve yayın

```
npm run build
```

Derleme ayarları kontrol eder: hatalı telefon, eksik fotoğraf dosyası, yanlış ölçüm kimliği gibi hatalarda durur; eksik bilgileri uyarı olarak listeler. Uyarı kalmayana kadar tamamlayın.

Vercel'de yeni proje → bu repo → alan adını bağlayın. Ortam değişkeni gerekmez (demo hariç).

Yayından sonra:
- Search Console'a alan adını ekleyip `/sitemap.xml` gönderin.
- Google İşletme Profili'nde web sitesi olarak alan adını girin.
- Paylaşım görselini kontrol edin: alan adını WhatsApp'ta kendinize gönderin.
- KVKK ve çerez metinleri şablondur; firmanın durumuna uygunluğunu bir hukukçuya kontrol ettirin.
