/* Türkçe — Bölüm 1: Lobi (Seviye 0). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      lobby: {
        name: 'SEVİYE 0', title: 'Lobi', place: 'Ekranın kenarı',
        intro: 'Bir vızıltı. Islak halı kokusu. Sonsuza uzanan sarı duvarlar. Çok uzaklarda on bin kere duyduğun bir ses: hayalet sireni. Vuu, vuu.',
      },
    },
    docs: {
      lobby_rules: { title: 'Duvara bantlanmış kâğıt', from: 'Eddie', body:
`BUNU OKUYORSAN:

1. Seni görmedikçe koşma. Koşmak gürültü yapar.
2. ÇIKIŞ tabelaları yalan söyler. Dışarı değil, daha derine gider.
3. Işıklar titrerse saklan ya da köşe dön.
4. Hapların hepsi gerçek. Birini yut, her şey senden kaçar. Bir süreliğine.
5. Badem suyu. İç. Sorma.
6. Kampımda bir telsiz var. Kanal 7.

—Eddie` },
      lobby_camp: { title: 'Eddie’nin kamp günlüğü', from: 'Eddie', date: '12 Haziran 1993 (?)', body:
`Kamp 1.

Ekrandan gece 23:40’ta geçtim. Yüzüstü düştüm. Halı ıslak ama hiçbir yer akıtmıyor. Burada hiçbir yer akıtmıyor.

Walt burada değil. Fenerini ve duvardaki el yazısını buldum.

Telsizler kanal 7’de çalışıyor. Cevap veren yok. Walt’ın peşinden bir video oyununa dalan bir sonraki salak için buraya bir tane bırakıyorum.

O sensen: merhaba. Kusura bakma. Kanal 7.` },
      lobby_walt1: { title: 'Walt’ın defterinden bir sayfa', from: 'Walt', date: 'İçeride, 1. gün', body:
`1. gün.

Sarı. Eski Asteroids kabinindeki balast gibi vızıldıyor. Halı ıslak.

Uzakta sireni duyabiliyorum. Hayalet sireni, evden çıktıklarında çalan. Vuu, vuu.

Buradalar. Haklıydım. Tanrı yardımcım olsun, haklıydım.

Billy, Penny, Ivy, Clyde. Dayanın. Geliyorum.` },
      lobby_walt2: { title: 'Walt’ın defterinden başka bir sayfa', from: 'Walt', date: 'İçeride, 9. gün (?)', body:
`9. gün. Ya da 90.

Sürekli açım. Kasalarca badem suyu buldum, hepsini içtim. Karar verdiğimi hatırlamıyorum.

Hapların tadı bozuk para gibi. Birini yiyince daha uzağı görebiliyorum.

Bugün kırmızıyı gördüm. Yaklaşınca çığlık atıp kaçtı. Adını seslendim. Bir saniye durdu, sonra koşmaya devam etti.

Anlıyorum. Ağzı olan artık benim.` },
      lobby_flyer: { title: 'Katlanmış bir el ilanı', from: 'Penny', date: 'Nisan 1987', body:
`★ ÇOK GİZLİ ★
256 OPERASYONU

NE ZAMAN: Perşembe 16/4, kapanıştan sonra
GÖREV: kill screen’in öbür tarafında ne olduğunu görmek

EKİP:
Billy — anahtar (Walt’a SÖYLEMEYİN)
Penny — plan + atıştırmalık
Ivy — hayalet hareketlerinin haritası
Clyde — fener
Sam — şans

OKUDUKTAN SONRA YOK EDİN!!!
(Clyde, bu çizgi romanının içinde saklama demek.)` },
      lobby_exitwall: { title: 'ÇIKIŞ kapısının yanına kazınmış', body:
`ÇIKIŞLAR YALAN SÖYLER
—E` },
      lobby_chairs: { title: 'Sandalyelerin üstüne yazılmış', body:
`BURAYA GELDİĞİMDE
SANDALYELER ZATEN
DUVARA DÖNÜKTÜ
—W` },
      lobby_puddle: { title: 'Su birikintisinin yanında nemli bir not', from: 'Walt', body:
`Buradaki su ılık ve klor kokuyor. Kasabanın havuzu gibi.

Ivy ’85’ten sonra havuzun yanına bile gitmezdi. Burası onun mu?

Burada her oda birine ait.` },
      lobby_lily2: { title: 'Bir havalandırmanın arkasına sıkışmış çocuk çizimi', from: 'Lily, 8 yaşında', body:
`Pastel boya. Ekranında sarı bir daire olan bir makinenin önünde iri bir adam ve küçük bir kız. Kız kollarını havaya kaldırmış.

BEN VE BABAM SALONDA.
3190 PUAN YAPTIM!!!
BABAM TABLODA SONSUZA KADAR KALACAK DEDİ.` },
      lobby_tape: { title: 'Kaset: "Deneme, deneme"', from: 'Eddie', date: 'İçeride', body:
`[Klik. Ağır nefesler. Vızıltı.]

EDDIE: Deneme, deneme. Kaset günlüğü, gün... bilmiyorum. Bir günler.

EDDIE: June, bu sensen: iyiyim. Hiçbir şeyim yok. Onu bulacağım ve bebekten önce eve döneceğim. Söz verdim, ben sözümü tutarım. Genelde.

[Sessizlik.]

EDDIE: June değilsen: kanal 7. Koşma. Ve ne yaparsan yap, yemek yerken seni görmesine izin verme.

[Klik.]` },
    },
    obj: {
      lobby_explore: 'Bir çıkış yolu bul',
      lobby_pellets: 'Güç haplarını topla ({n}/4)',
      lobby_insert: 'Hapları ÇIKIŞ kapısının yanındaki yuvalara yerleştir',
      lobby_leave: 'Kapıdan geç',
    },
    mono: {
      lobby_start: 'Neredeyim ben? Halı... ıslak. Vızıltı kafamın içinde.',
      lobby_exitSeen: 'ÇIKIŞ. Kapının yanında dört yuvarlak yuva var. Hap boyutunda.',
      lobby_firstPellet: 'Avuç kadar bir ışık. Bir anlığına her şey maviye döndü.',
      lobby_eaterHeard: 'O ses. Vaka, vaka. Çocukken bin kere duydum. Hiç böyle duymadım.',
      lobby_eaterSeen: 'Koridorun sonunda sarı bir ışık. Büyük. Çok büyük.',
      lobby_allPellets: 'Dört hap. Şimdi kapıya.',
      lobby_radio: 'Bir telsiz. Kadranı kanal 7’ye bantlanmış.',
    },
    lines: {
      lobby_slots: 'Dört yuva ({n}/4 hap)',
      lobby_place: 'Hapları yuvalara yerleştir',
      lobby_radioTake: 'Telsizi al',
    },
    radio: {
      lobby_meet: [
        ['radio', '[cızırtı]'],
        ['eddie', '...alo? ALO? Yedide biri mi var? Bir şey söyle!'],
        ['sam', '...Alo? Kimsin? Neredeyim ben?'],
        ['eddie', 'Tanrıya şükür. Bir insan sesi. Tamam. Tamam. Adım Eddie. Eskiden Starlight’ta çalışırdım. Ekrandan geçtin, değil mi? Yedi numaradan?'],
        ['sam', 'Eddie? Walt’ın Eddie’si mi? Geçen yıl kayboldun. Resmin haftalarca gazetedeydi.'],
        ['eddie', 'Geçen yıl. Hıh. Geçen hafta gibi geliyor. Dinle, adın ne?'],
        ['sam', 'Sam.'],
        ['eddie', '...Sam. Clyde’ın Sam’i mi? Bisikletli küçük Sam? Dalga geçiyorsun. Tamam Sam, kurallar. Bir şey seni görmedikçe koşma. ÇIKIŞ tabelaları yalan söyler. Işıklar titrerse koridordan çık.'],
        ['eddie', 'Bu seviyenin kapısı dört güç hapı istiyor. Onları bul. Ve Sam? Yedide kal.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Hap mı aldın az önce? Olamaz. Hayır, hayır, hayır. Tamam. Artık uyandı. Sen yedin mi hep bir şey uyanır.'],
        ['eddie', 'Köşeler Sam. Düzde hızlı, dönüşlerde yavaş.'],
      ],
      lobby_eater: [
        ['eddie', 'Gördün onu. Ona çok uzun bakma. Ben ona Yutucu diyorum.'],
        ['sam', 'Nedir o?'],
        ['eddie', 'Eskiden... [cızırtı] Sen köşeleri kullan.'],
      ],
      lobby_panel: [
        ['eddie', 'Dört yuva. Burada her şey oyun Sam. Tahtayı temizle, kapı açılsın.'],
      ],
      lobby_open: [
        ['eddie', 'O kapı dışarı açılmıyor. Çıkışlar yalan söyler. Ama aşağı iniyor, ve onlar aşağıda.'],
        ['sam', 'Kim?'],
        ['eddie', 'Kim olduğunu biliyorsun. ’87 Nisan’ından dört çocuk. Hadi. Yedideyim.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
