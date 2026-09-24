# Pacman: Arka Odalar

Pacman'in efsanevi 256. seviye hatasının arkasında geçen, birinci şahıs bir **kaçış ve korku oyunu**. Tarayıcıda çalışır, kurulum gerektirmez.

> 30 Kasım 1994, gece 02:11. Kadıköy'deki kapanmış Yıldız Atari Salonu'ndan otomatları toplamaya geldin. 7 numaralı kabinin üstünde bir not var: **FİŞİNİ ÇEKME.** Jetonu attığında ekranın sağ yarısı harflerle doluyor, sonra sen sonsuz sarı odalara düşüyorsun. Bir yerlerde tanıdık bir ses var: *vaka, vaka.*

## Nasıl çalıştırılır

- **En kolayı:** `index.html` dosyasını tarayıcıda aç. 3D motoru (three.js) ve yazı tipleri internetten yüklendiği için bağlantı gerekir.
- **Yerel sunucu ile:** depo klasöründe `python3 -m http.server` çalıştır, sonra `http://localhost:8000` adresine git.
- **Tek dosya:** `python3 tools/build_single.py` komutu her şeyi `dist/pacman-arka-odalar.html` içine toplar.
- Eski 2D Pacman `classic/index.html` içinde duruyor. Oyunun içinde, atari salonundaki bedava kabinde de oynanabiliyor.

## Kontroller

| Tuş | İşlev |
| --- | --- |
| `W` `A` `S` `D` | Yürü |
| Fare | Bak (oyuna tıklayınca kilitlenir; kilitlenemezse basılı tutup sürükle) |
| `Shift` | Koş (gürültü yapar, nefes tüketir) |
| `C` | Eğil (neredeyse sessiz) |
| `E` | Etkileşim: oku, al, aç, saklan |
| `F` | Fener |
| `Q` | Badem suyu iç (korkuyu yatıştırır) |
| `G` | Işık çubuğu at |
| `M` / `Tab` | Harita |
| `Esc` / `P` | Duraklat |

Dokunmatik ekranda sol altta yürüme çubuğu, sağ tarafta sürükleyerek bakış ve eylem düğmeleri var.

## Bölümler

| Bölüm | Yer | Düşman | Hedef |
| --- | --- | --- | --- |
| Prolog | Yıldız Atari Salonu, 1994 | — | Feneri bul, elektriği ver, özel jetonu kabine at |
| Seviye 0 | Sarı Odalar | Yutucu | Dört güç hapını ÇIKIŞ kapısına yerleştir |
| Seviye 1 | Beton Depo | Kırmızı (Bülent) | Üç sigortayla asansörü çalıştır |
| Seviye 2 | Havuz Odaları | Mavi (İnci) | Dört vanayı çevir, havuzu boşalt |
| Seviye 3 | Ofis Katı | Pembe (Pınar) | Güvenlik şifresini bul, kartla merdivene kaç |
| Seviye 4 | Karanlık | Turuncu (Cemil), Sırıtkanlar | Üç jeneratörü mazotla çalıştır |
| Seviye 5 | Labirent | Yutucu, dört hayalet, Sayaç | Dört köşedeki güç hapını ye, hayalet evine gir |
| Seviye 256 | Bölünmüş Ekran | Yutucu, Sayaç | Seçimini yap: ÇIKIŞ kapısı ya da fiş |

Her bölümde bir hayaletin kaybolmuş eşyası ve bir türbesi var. Dördünü de kurtarırsan son değişir. İki son var.

## Neler var

- **Hikâye:** 56 belge. Not, mektup, defter sayfası, kaset kaydı, bilgisayar ekranı, telefon mesajı, fotoğraf ve duvar yazıları arşivde toplanıyor. Yedi yıl önce kaybolan dört genç ile salonun sahibi Mahir Usta'nın hikâyesi bunlarla anlatılıyor.
- **Yaratıklar:** Yutucu düz koridorda senden hızlı ama dönüşlerde yavaş. Yaklaşınca floresanlar titriyor. Kırmızı hiç durmadan kovalar, Pembe önünü keser, Mavi ışınlanır ve sudaki adımları duyar, Turuncu sen bakarken donar. Karanlıkta fenerden kaçan Sırıtkanlar ve sırtını dönünce yaklaşan Sayaç da var.
- **Hayatta kalma:** koşma, eğilme, masa altına saklanma, güç hapıyla düşmanları kaçırma, fener pili, korku göstergesi, kaset çalarlarla kayıt.
- **Grafik:** Tek bir resim dosyası yok, bütün dokular kodla üretiliyor (2048 piksele kadar renk, normal ve pürüzlülük haritaları). Duvar bilen gölgeler ve sekme ışığıyla pişmiş aydınlatma, fener gölgeleri, HDR bloom, ACES ton eşleme, film greni, renk sapması, isteğe bağlı VHS kamera görünümü ve %200'e kadar süper örnekleme.
- **Ses:** Hepsi anlık olarak üretiliyor. 3D (HRTF) konumlandırma, duvar arkasında boğuklaşan sesler, bölüme göre değişen yankı, ortam katmanları ve kovalamaca müziği var.
- **Ayarlar:** Grafik (ön ayarlar, çözünürlük ölçeği, doku, gölge, kenar yumuşatma, ışık haritası, dinamik ışık, bloom, parçacık, görüş mesafesi), görüntü (parlaklık, kontrast, FOV, kafa sallanması, gren, VHS, titreşimi azaltma, altyazılar), ses (5 ayrı kanal, HRTF), kontroller ve oynanış (3 zorluk, ani korkutma şiddeti, ipuçları).

Tüm belgeleri okuyan ve dört hayaleti kurtaran biri için tahmini oynanış süresi 2-3 saat.

## Geliştirme

```
index.html        oyunun kabuğu (menüler, HUD, katmanlar)
css/game.css      arayüz
js/levelgen.js    bölüm üreticisi (DOM'suz, Node ile test edilir)
js/story.js       hikâye, notlar, bölüm tanımları
js/textures.js    prosedürel dokular
js/world.js       geometri, pişmiş ışık, armatürler, kapılar
js/post.js        son işleme
js/entities.js    yaratıklar ve yapay zekâ
js/game.js        oyun döngüsü, bölüm senaryoları, kayıt
tests/            bölüm üreticisi testleri
```

Bölüm testleri için: `node tests/levelgen.test.js`
