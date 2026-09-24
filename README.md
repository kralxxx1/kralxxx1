# Pacman

Tarayıcıda çalışan, tek dosyalık bir Pacman oyunu. Kurulum gerekmez: `index.html` dosyasını tarayıcıda açman yeterli.

## Kontroller

| Tuş | İşlev |
| --- | --- |
| Ok tuşları veya `W` `A` `S` `D` | Pacman'i yönlendir |
| `Enter` / `Boşluk` | Oyunu başlat |
| `P` / `Esc` | Duraklat / devam et |
| `M` | Sesi aç / kapat |

Telefonda ekranı kaydırarak ya da alttaki yön tuşlarıyla oynanır.

## Neler var

- Orijinal 28 × 31 labirent: 240 yem, 4 güç hapı ve yan tünel
- Dört hayalet, her biri kendi kovalama davranışıyla: Blinky seni doğrudan kovalar, Pinky önünü keser, Inky Blinky ile birlikte sıkıştırır, Clyde yaklaşınca köşesine kaçar
- Dağılma ve kovalama dönemleri, güç hapıyla korkutulan hayaletler (200 / 400 / 800 / 1600 puan)
- Seviyeye göre değişen meyveler, artan hızlar ve kısalan güç hapı süresi
- 10.000 puanda ekstra can; en yüksek skor tarayıcıda saklanır
- WebAudio ile üretilen sesler (dosya gerekmez)
