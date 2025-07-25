# SAN TSG - 2025 Yaz Stajı Programı Geliştirme Projesi

Bu proje, **SAN TSG 2025 Yaz Stajı Programı** kapsamında, stajyerler tarafından bir otel ürününün satışını sağlayan Web tabanlı B2C (Business-to-Consumer) e-ticaret uygulaması olarak geliştirdik.

## Proje Amacı
Kullanıcıların otel arayabilmesini, detaylarını incelemesini, odaları karşılaştırmasını ve rezervasyon yapabilmesini sağlayan uçtan uca bir rezervasyon deneyimi sunmak.

---

## Kullanılan Teknolojiler ve Araçlar

| Kategori | Teknoloji |
|---------|-----------|
| Front-End | React.js (Vite ile) |
| CSS | Tailwind CSS + custom SCSS |
| Arayüz | Responsive Design, Grid & Flex Layout |
| API | [SAN TSG TourVisio API](http://docs.santsg.com/tourvisio) |
| Versiyon Kontrol | Git & GitHub |
| Proje Yönetimi | Trello |
| CI/CD | GitHub Actions (Docker build ve publish) |
| Dağıtım | DockerHub üzerinden image teslimi |

---
## Klasör Yapısı

- `src/components`: Sayfa içinde kullanılan bileşenler (örneğin: SearchBar, RoomCard, DatePickerButton)
- `src/pages`: Ana sayfalar (örneğin: SearchPage, DetailPage)
- `src/assets`: Resim ve statik varlıklar
- `src/styles`: Genel CSS dosyaları
- `src/utils`: Yardımcı fonksiyonlar (örneğin: tarih formatlama)
  
## Tasarım

- Figma kullanılarak taslaklar oluşturuldu
- Bileşen bazlı mobil uyumlu modern bir UI geliştirildi
- Otel kartları ve oda kartları yatayda geniş tasarlandı
