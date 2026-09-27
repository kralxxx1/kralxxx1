/* Türkçe — Seviye 0: Tanıtım Ekranı. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      lobby: {
        name: 'SEVİYE 0', title: 'Tanıtım Ekranı', place: 'Ekranın içinde',
        intro: 'Dişlerinde hissettiğin bir uğultu. Islak halı. Sonsuza kadar uzanan sarı duvarlar. Çok uzaklarda, makine hoparlöründen on bin kere duyduğun bir ses: hayaletlerin sireni, yükselip alçalıyor.\n\nOyun bir oyuncu bekliyordu. Artık bir oyuncusu var.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Duvara bantlanmış kâğıt', from: 'Eddie', body:
`BUNU OKUYORSAN:

1. Seni zaten görmediyse koşma. Koşmak gürültülü.
2. EXIT tabelaları yalan söyler. Dışarı değil, daha derine götürür.
3. Işıklar titrerse koridordan çık.
4. Fenerler gerçek. Birini aldığında her şey SENDEN kaçar. Bir süreliğine.
5. Star Pop (kirazlı gazoz) titremeyi durdurur. Nedenini sorma.
6. Kampımda bir telsiz var. Kanal 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'Eddie’nin kamp günlüğü', from: 'Eddie', date: '12 Haziran 1993 (?)', body:
`Kamp 1.

Ekrandan saat 23:40’ta geçtim. Yüzüstü düştüm. Halı sırılsıklam ama hiçbir yer sızdırmıyor. Burada hiçbir şey sızdırmıyor.

Walt yok. Fenerini ve bir duvarda el yazısını buldum.

Telsizler 7. kanalda çalışıyor. Kimse cevap vermiyor. Bir yetişkini video oyununun içine kadar takip eden bir sonraki salak için bir tane buraya bırakıyorum.

Sensen: selam. Kusura bakma. Kanal 7.` },
      lobby_walt1: { kind: 'diary', title: 'Walt’ın günlüğünden bir sayfa', from: 'Walt', date: 'İçeride, 1. gün', body:
`1. gün.

Sarı. Bozuk bir balast gibi uğulduyor. Halı ıslak.

Uzaktan sireni duyuyorum, hayaletler evlerinden çıkınca çalan siren.

Buradalar. Haklıymışım. Tanrım, haklıymışım.

Danny. Rosie. Nell. Toby. Dayanın. Geliyorum.` },
      lobby_walt2: { kind: 'diary', title: 'Walt’ın günlüğünden başka bir sayfa', from: 'Walt', date: 'İçeride, 9. gün (?)', body:
`9. gün. Ya da 90.

Sürekli açım. Her yerde Star Pop kutuları var, kendi soğutucumun hepsi. Hepsini içtim. İçmeye karar verdiğimi hatırlamıyorum.

Fenerlerin tadı bozuk para gibi. Birini yutunca daha uzağı görüyorum.

İlk gecemde fişi denedim. Tek başıma. İçimde bir şey tık etti, düşen bir jeton gibi.

Bugün kırmızı olanı gördüm. Benden kaçtı. Adını seslendim, durdu. Bir saniyeliğine.

Artık anlıyorum. Ağzı olan benim.` },
      lobby_flyer: { kind: 'flyer', title: 'Katlanmış bir el ilanı', from: 'Rosie', date: 'Nisan 1987', body:
`★ ÇOK GİZLİ ★
OPERASYON 256

NE ZAMAN: Perşembe 16/4, kapanıştan sonra
GÖREV: ölüm ekranının ötesinde ne var, görmek

EKİP:
Danny — anahtar (Walt’a SÖYLEMEYİN)
Rosie — plan + atıştırmalık
Nell — hayalet hareketlerinin haritası
Toby — el feneri
Sam — şans

YA BEŞİMİZ YA HİÇBİRİMİZ.
OKUDUKTAN SONRA İMHA EDİN!!!
(Toby, bu çizgi romanının içinde saklama demek.)` },
      lobby_exitwall: { kind: 'wall', title: 'EXIT kapısının yanına kazınmış', body:
`EXIT’LER YALAN SÖYLER
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Sandalyelerin üstüne yazılmış', body:
`BEN GELDİĞİMDE
SANDALYELER ZATEN
DUVARA DÖNÜKTÜ
—W.` },
      lobby_puddle: { kind: 'note', title: 'Su birikintisinin yanında nemli bir not', from: 'Walt', body:
`Buradaki su ılık ve klor kokuyor. Belediye havuzu gibi.

Nell ’85’ten sonra havuzun yanına bile gitmezdi. Bu onun mu?

Buradaki her oda birine ait.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Bir havalandırmanın arkasına sıkışmış çizim', from: 'Lily, 9 yaşında', body:
`Pastel boya. Bıyıklı iri bir adam ve turuncu örgülü küçük bir kız, küçük bir oyun makinesinin yanında. Ekranında yuvarlak turuncu bir yaratık ve 3190 sayısı. Kız iki kolunu da kaldırmış.

BEN VE BABAM VE KÜÇÜK MAKİNE.
3190 PUAN YAPTIM!!!
BABAM SONSUZA KADAR TABLODA KALACAK DİYO.` },
      lobby_tape: { kind: 'tape', title: 'Kaset: "Deneme, deneme"', from: 'Eddie', date: 'İçeride', body:
`[Klik. Ağır bir soluk. Uğultu.]

EDDIE: Deneme, deneme. Kaset günlüğü, gün... bilmiyorum. Bir şeyinci gün.

EDDIE: Dinleyen June’sa: iyiyim. Gerçekten. Walt’ı bulacağım, çocukları getireceğim, bebekten önce evde olacağım. Söz verdim, ben sözümü tutarım. Genelde.

[Duraklama.]

EDDIE: Dinleyen June değilse: kanal yedi. Koşma. Ve ne yaparsan yap, yemek yerken seni duymasına izin verme.

[Klik.]` },
    },
    obj: {
      lobby_explore: 'Bir çıkış yolu bul',
      lobby_pellets: 'Fenerleri bul ({n}/4)',
      lobby_insert: 'Fenerleri EXIT kapısının yanındaki panele yerleştir',
      lobby_leave: 'Kapıdan geç',
    },
    mono: {
      lobby_start: 'Neredeyim... Halı ıslak. Uğultu kafamın içinde.',
      lobby_exitSeen: 'EXIT. Kapının yanında dört yuvarlak yuva. Fener büyüklüğünde.',
      lobby_firstPellet: 'Bir fener. Elimde sıcacık. Bir anlığına her şey maviye döndü ve kaçtı.',
      lobby_eaterHeard: 'Çiğneme sesi. Duvarların arkasında bir yerde bir şey çiğniyor.',
      lobby_eaterSeen: 'Koridorun sonunda soluk bir şey. Yuvarlak. Koridora sığmayacak kadar büyük. Çiğniyor.',
      lobby_allPellets: 'Dört fener. Şimdi kapı.',
      lobby_radio: 'Bir telsiz. Biri düğmesini bantla 7. kanala sabitlemiş.',
    },
    lines: {
      lobby_slots: 'Dört yuva ({n}/4 fener)',
      lobby_place: 'Fenerleri yuvalara yerleştir',
      lobby_radioTake: 'Telsizi al',
    },
    radio: {
      lobby_meet: [
        ['radio', '[parazit]'],
        ['eddie', '...alo? ALO? Yedide biri var mı? Bir şey söyle!'],
        ['sam', '...Alo? Kimsin? Neredeyim?'],
        ['eddie', 'Oh, şükürler olsun. Bir insan. Tamam. Tamam. Adım Eddie. Eskiden Starlight’ta çalışırdım. Yedi numaradan geçtin, değil mi?'],
        ['sam', 'Eddie mi? Walt’ın Eddie’si? Bir buçuk yıl önce kayboldun. Karın fotoğrafını Harlow’daki her direğe astı.'],
        ['eddie', 'Bir buçuk yıl. Bana bir gece gibi geldi. O zaman bebek... [parazit] Yok. Şimdi değil. Adın ne?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '...Toby’nin Sam’i mi? Bisikletli çocuk? Hmm. Demek ondan.'],
        ['sam', 'Ne ondan?'],
        ['eddie', 'Sen girince bütün burası aynı şeyi söyledi. PLAYER ONE. Buradan stadyum gibi duydum. Bana hiç öyle demedi. Bana INSERT COIN dedi.'],
        ['eddie', 'Kurallar. Bir şey seni görmediyse koşma. EXIT tabelaları yalan söyler. Işıklar titrerse koridordan çık. Buradan çıkan kapı dört fener istiyor. Onları bul. Ve Sam? Yedide kal.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Az önce bir fener mi aldın? Eyvah. Tamam. Duydu. Bir fener aldığında hep bir şey uyanır.'],
        ['eddie', 'Köşeler Sam. Düz çizgide hızlı, dönüşlerde yavaş.'],
      ],
      lobby_eater: [
        ['eddie', 'Gördün onu. Ona çok uzun bakma. Ben ona Yiyici diyorum.'],
        ['sam', 'Ne o?'],
        ['eddie', 'Oyuncu. Her oyunun bir oyuncusu olmalı. Bu da eskiden... [parazit] Sen sadece köşe dön.'],
      ],
      lobby_panel: [
        ['eddie', 'Dört yuva. Burada her şey oyun Sam. Tahtayı temizle, kapı açılsın.'],
      ],
      lobby_open: [
        ['eddie', 'O kapı çıkış değil. EXIT’ler yalan söyler. Ama aşağı iniyor ve onlar da aşağıda.'],
        ['sam', 'Kimler?'],
        ['eddie', 'Kim olduklarını biliyorsun. Nisan ’87’nin dört çocuğu. Hadi. Yedide olacağım.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
