# Google Maps API Kurulum Rehberi

Bu projede Google Maps API kullanılmaktadır. Haritanın çalışması için aşağıdaki adımları takip edin:

## 1. Google Cloud Console'da API Anahtarı Oluşturma

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni bir proje oluşturun veya mevcut projenizi seçin
3. Sol menüden "APIs & Services" > "Library" seçin
4. "Maps JavaScript API" aratın ve etkinleştirin
5. "APIs & Services" > "Credentials" bölümüne gidin
6. "Create Credentials" > "API Key" seçin
7. Oluşturulan API anahtarını kopyalayın

## 2. Environment Variable Ayarlama

Proje ana dizininde `.env` dosyası oluşturun ve aşağıdaki satırı ekleyin:

```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

`YOUR_API_KEY_HERE` kısmını kopyaladığınız API anahtarı ile değiştirin.

## 3. API Anahtarı Güvenliği

Güvenlik için API anahtarınızı kısıtlayın:

1. Google Cloud Console'da API anahtarınızı seçin
2. "Application restrictions" bölümünde "HTTP referrers" seçin
3. Aşağıdaki domain'leri ekleyin:
   - `localhost:3000/*`
   - `localhost:3001/*`
   - `yourdomain.com/*` (production için)

## 4. Uygulamayı Yeniden Başlatma

Environment variable'ı ekledikten sonra React uygulamasını yeniden başlatın:

```bash
npm start
```

## 5. Test Etme

Uygulama çalıştıktan sonra detail sayfasına gidin ve sidebar'daki haritanın yüklendiğini kontrol edin.

## Özellikler

- **İnteraktif Harita**: Antalya bölgesinde 6 otel işaretleyicisi
- **Bilgi Pencereleri**: Otel işaretleyicilerine tıklayarak otel bilgilerini görüntüleme
- **Zoom Kontrolleri**: Harita üzerinde zoom in/out butonları
- **Responsive Tasarım**: Mobil ve desktop uyumlu

## Sorun Giderme

- API anahtarı doğru ayarlanmamışsa, harita yerine "API anahtarı gerekli" mesajı görünür
- Network hatası durumunda "Harita yüklenemedi" mesajı görünür
- Console'da hata mesajlarını kontrol edin

## Not

Bu harita şu anda Antalya bölgesinde 6 örnek otel göstermektedir. Gerçek uygulamada bu veriler API'den dinamik olarak alınabilir. 