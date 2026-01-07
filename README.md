# 🚑 Acil Kart - Emergency QR Card

**Hayat kurtaran bilgilerinizi QR kod ile taşıyın!**

Acil Kart, acil durumlarda hayati bilgilerinizi hızlıca paylaşmanızı sağlayan modern bir Progressive Web App (PWA) uygulamasıdır. Kredi kartı boyutunda, cüzdanınızda ya da telefonunuzda taşıyabileceğiniz acil durum kartınızı saniyeler içinde oluşturun.

🌐 **Canlı Demo:** [https://ensarce.github.io/emergency-qr-card/](https://ensarce.github.io/emergency-qr-card/)

---

## ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 📱 **PWA Desteği** | Mobil ve masaüstüne yüklenebilir, offline çalışır |
| 🎨 **Premium Tasarım** | Modern, şık kredi kartı stili arayüz |
| ⚡ **Anlık Önizleme** | Yazarken kartınızı gerçek zamanlı görün |
| 📥 **Görsel İndirme** | Yüksek kaliteli PNG olarak kaydedin |
| 📤 **Kolay Paylaşım** | Web Share API ile tek tıkla paylaşın |
| 🌍 **Çift Dil** | Türkçe ve İngilizce desteği |
| 📷 **QR Kod** | Tüm bilgiler güzel bir kart sayfasında açılır |
| 🔒 **Gizlilik** | Veriler cihazınızda kalır, sunucuya gönderilmez |

---

## 🛠️ Teknolojiler

- **HTML5 / CSS3 / JavaScript (ES6)**
- **Tailwind CSS** - Modern styling
- **QRCode.js** - QR kod oluşturma
- **html2canvas** - Kart görsel export
- **Service Worker** - Offline cache

---

## 📁 Proje Yapısı

```
emergency-qr-card/
├── index.html          # Ana uygulama
├── card.html           # QR tarandığında açılan kart sayfası
├── view.html           # Alternatif görüntüleme sayfası
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── favicon.png         # Favicon
└── assets/
    ├── css/style.css   # Özel stiller
    ├── js/app.js       # Uygulama mantığı
    ├── icons/          # PWA ikonları
    └── images/         # Sosyal medya önizleme
```

---

## 🚀 Hızlı Başlangıç

### Çevrimiçi Kullanım
Doğrudan [canlı siteyi](https://ensarce.github.io/emergency-qr-card/) kullanabilirsiniz.

### Yerel Kurulum
```bash
# Projeyi klonlayın
git clone https://github.com/ensarce/emergency-qr-card.git
cd emergency-qr-card

# Yerel sunucu başlatın
npx serve .

# Tarayıcıda açın
# http://localhost:3000
```

---

## 📱 PWA Olarak Yükleme

### Mobil (Android/iOS):
1. Chrome veya Safari ile siteyi açın
2. "Ana ekrana ekle" seçeneğine tıklayın
3. Uygulama ana ekranınıza eklenecek

### Masaüstü (Chrome/Edge):
1. Adres çubuğundaki yükleme ikonuna tıklayın
2. "Yükle" butonuna basın

---

## 🎨 Özelleştirme

### Tema Rengi Değiştirme
- `manifest.json` → `theme_color`
- `index.html` → `<meta name="theme-color">`
- `assets/css/style.css` → CSS değişkenleri

### Kart Tasarımını Düzenleme
- `assets/css/style.css` → `.emergency-card` sınıfı

---

## 🔒 Gizlilik ve Güvenlik

✅ **Sunucu yok** - Tüm veriler cihazınızda kalır  
✅ **localStorage** - Sadece tarayıcınızda saklanır  
✅ **Analytics yok** - Hiçbir izleme scripti yoktur  
✅ **Offline çalışır** - İlk yüklemeden sonra internet gerekmez

---

## 👨‍💻 Geliştirici

**Ensar Kaplan**
- GitHub: [@ensarce](https://github.com/ensarce)

---

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır.

```
MIT License

Copyright (c) 2025 Ensar Kaplan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<p align="center">
  Made with ❤️ by <strong>Ensar Kaplan</strong> | © 2025 Acil Kart
</p>
