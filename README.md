# FORM · kişisel sürüm

Yeni başlayan bir kadın için hazırlanmış zayıflama uygulaması. Haftada 3 gün salon programı, her hareketin çizimi ve nasıl yapıldığı, set/kilo takibi, kilo, kalori, protein ve adım takibi, ilerleme ve motivasyon ekranı içerir. Ağabeyin FORM uygulamasının sade, ona özel versiyonu.

## Program

Haftada 3 gün tam vücut. A ve B sırayla gelir (A-B-A, sonraki hafta B-A-B). Bir gün kaçarsa sıra bozulmaz, bir sonraki spor gününde sıradaki antrenman yapılır.

| Antrenman A | Set × tekrar | Antrenman B | Set × tekrar |
|---|---|---|---|
| Leg press | 3 × 10–15 | Goblet squat | 3 × 10–15 |
| Hip thrust | 3 × 8–12 | 45° sırt ekstansiyonu | 3 × 10–15 |
| Lat pulldown | 3 × 8–12 | Oturarak kablo row | 3 × 8–12 |
| Göğüs press makinesi | 3 × 8–12 | Makine omuz press | 3 × 8–12 |
| Oturarak leg curl | 3 × 10–15 | Abduktor makinesi | 3 × 12–15 |

- **Hafta 1–2 öğrenme dönemi:** hareket başına 2 set, hafif ağırlık. Hafta 3'ten sonra 3 set.
- **İlerleme (çift ilerleme):** bütün setlerde aralığın üst sınırına ulaşınca bir sonraki seansta kilo bir kademe artar. Uygulama her harekette ne deneneceğini yazar.
- **Bilerek olmayanlar:** ayrı karın hareketi (karın bileşik hareketlerde zaten çalışıyor), koşu bandı/kardiyo (yerini günlük 10.000 adım tutuyor), Romanian deadlift (öğrenmesi zor, bele yük bindiriyor; yerine 45° sırt ekstansiyonu).
- **Beslenme:** kalori = bakım kalorisinin %20 altı (en çok 500 kcal açık, en az 1.300 kcal). Protein = hedef kilo × 1,8 g.

## Telefona kurulum

1. Linki iPhone'da **Safari** ile aç.
2. **Paylaş** → **Ana Ekrana Ekle**.
3. Uygulamayı ana ekrandaki **FORM** simgesinden aç ve kurulumu orada yap.

Safari'de girilen veriler ana ekran uygulamasına geçmez, kurulumu doğrudan ana ekrandan yapmak gerekir.

## Veriler nerede?

- Kayıtlar telefonun tarayıcısında (`localStorage`) durur. Bu repoya ya da herhangi bir sunucuya **gitmez**. Repo açık olsa da veriler gizli kalır.
- **Yedek:** Ayarlar → Verilerim → *Yedek indir* (iCloud Drive / Dosyalar / WhatsApp). Yeni telefonda *Yedek yükle*.
- **Bulut yedeği (isteğe bağlı):** Ayarlar → Bulut yedeği. Sadece `gist` yetkili klasik bir GitHub anahtarıyla, veriler GitHub'da gizli bir Gist dosyasına otomatik yedeklenir.
- **Dinlenme bildirimi (isteğe bağlı):** Ayarlar → Dinlenme bildirimi. FORM'un mevcut bildirim sunucusunu (`form-timer` Cloudflare worker) kullanır. Ana ekrana eklenmiş uygulamada, iOS 16.4 ve üstünde çalışır.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Uygulamanın tamamı (HTML + CSS + JS, dış kütüphane yok) |
| `sw.js` | Çevrimdışı açılış (önce ağ, sonra önbellek) ve dinlenme bildirimi |
| `manifest.webmanifest`, `icon-*.png`, `logo.svg` | Ana ekran simgesi ve uygulama bilgisi |

Ana FORM uygulamasıyla aynı adreste (`yurugagarin.github.io`) çalışsa da ayrı anahtarlar (`fk:*`) ve ayrı önbellek kullanır. İkisi birbirinin verisine dokunmaz.
