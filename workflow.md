# Depo - Dil Öğrenme Uygulaması İş Akışı (Workflow)

Bu belge, **Depo** projesinin geliştirme sürecini, hedeflerini ve izlenmesi gereken adımları özetler.

## 1. Proje Özeti
**Depo**, React ve Vite tabanlı, kullanıcıların yeni kelimeler öğrenebileceği, kelime listeleri oluşturabileceği ve quizlerle bilgisini test edebileceği minimalist bir dil öğrenme uygulamasıdır.

## 2. Mevcut Durum
- ✅ Proje iskeleti oluşturuldu (Vite + React).
- ✅ Temel dosya yapısı hazır (`src`, `index.html`, `vite.config.js`).
- ✅ Kelime içe aktarma mantığı için taslak mevcut (`importWords.js`).
- ❌ Kullanıcı arayüzü (UI) henüz tasarlanmadı.
- ❌ Kelime listeleme ve yönetim özellikleri eksik.
- ❌ Quiz/Test modülü bulunmuyor.
- ❌ Dokümantasyon (`README.md`) eksik.

## 3. Hedefler (MVP - Minimum Uygulanabilir Ürün)
İlk sürümde aşağıdaki özelliklerin teslim edilmesi hedeflenmektedir:
1.  **Kelime Yönetimi:** Kullanıcının kelime listesini görebilmesi ve yeni kelime ekleyebilmesi.
2.  **Öğrenme Modu:** Kelimelerin kartlar halinde gösterilmesi (Ön yüz: Kelime, Arka yüz: Anlam).
3.  **Quiz Modu:** Çoktan seçmeli sorularla bilgi testi.
4.  **Veri Kalıcılığı:** Tarayıcı hafızasında (LocalStorage) basit veri saklama.

## 4. Geliştirme Adımları (Roadmap)

### Aşama 1: Temel Altyapı ve Veri Yönetimi
- [ ] `importWords.js` dosyasını işlevsel hale getir.
- [ ] Basit bir veri modeli oluştur (Kelime: { id, target, native, example }).
- [ ] LocalStorage entegrasyonu için yardımcı fonksiyonlar yaz.

### Aşama 2: Arayüz (UI) Geliştirme
- [ ] Ana sayfa düzenini oluştur (Header, Kelime Listesi, Aksiyon Butonları).
- [ ] "Kelime Ekle" formu bileşeni yarat.
- [ ] Responsive ve temiz bir CSS yapısı kur (Tailwind veya saf CSS).

### Aşama 3: Özellik Geliştirme
- [ ] **Flashcard Bileşeni:** Çevirme animasyonlu kelime kartları.
- [ ] **Quiz Motoru:** Rastgele soru üreten ve puanlayan sistem.
- [ ] İlerleme takibi (Kaç kelime öğrenildi, quiz skoru).

### Aşama 4: Test ve İyileştirme
- [ ] Kullanıcı testleri için hazırlık.
- [ ] Hata ayıklama ve performans optimizasyonu.
- [ ] `README.md` dosyasının detaylandırılması (Kurulum, Kullanım).

## 5. Teknik Gereksinimler
- **Node.js:** v18+
- **Paket Yöneticisi:** npm / yarn / pnpm
- **Framework:** React 18+
- **Build Tool:** Vite

## 6. Kurulum ve Çalıştırma
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim derlemesi al
npm run build
```

## 7. Katkıda Bulunma
1.  Projeyi fork edin.
2.  Yeni bir branch oluşturun (`feature/yeni-ozellik`).
3.  Değişikliklerinizi commit edin.
4.  Pull Request gönderin.
