/* Türkçe — Bölüm 5: Sigorta Ofisi (Penny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      office: {
        name: 'SEVİYE 4', title: 'Harlow Mutual', place: 'Penny’nin dinlenme odası',
        intro: 'Bölmeler, tüplü monitörler, soğumuş kahve. Bir telefon çalıyor. Sonra bir başkası. Sonra hepsi birden susuyor.',
      },
    },
    docs: {
      office_intro: { title: 'Güvenlik odası kapısındaki tabela', from: 'Teknik Hizmetler', body:
`GÜVENLİK ODASI
Şifre şirket politikası gereği Nisan 1987’de değiştirildi.
Her bölüm müdürüne TEK bir hane verildi.
Hanenizi bir yere yazmayın.

(Dört ayrı kişi hanesini bu katta bir yere yazmış.)` },
      office_clue1: { title: 'Yazıcıdan çıkan bir not', from: 'Teknik Hizmetler', date: '2 Nisan 1987', body:
`KİME: Hasar Bölümü
KİMDEN: Teknik Hizmetler

Yeni güvenlik şifresindeki haneniz: 1
Bu İLK hanedir.

Lütfen ezberleyip bu notu imha edin.

(Kimse bu notu imha etmemiş.)` },
      office_clue2: { title: 'Terminal: CODE.TXT', from: 'IBM PC/XT', body:
`C:\\> TYPE CODE.TXT

GUVENLIK ODASI SIFRESI
2. HANE = 0
3. VE 4. HANE: Hasar'dan Carol'a sor.
O zaten her seyi biliyor.

C:\\> _` },
      office_clue3: { title: 'Dinlenme odasındaki beyaz tahta', from: 'Penny', body:
`PENNY RADYO
10_,3 FM
DUYMAN GEREKENİ ÇALAN
TEK İSTASYON

eksik sayı = şanslı sayım = 7
(Annem istasyonu şifreye koyamazsın diyor. Çok geç!)` },
      office_clue4: { title: 'Sesli mesaj, dahili 1073', from: 'Carol (Hasar)', body:
`[Bip.]

CAROL: Penny, tatlım, annen. İkinci çeyrek hasar toplantısında kaldım, yine uzuyor.

CAROL: Teknik Hizmetler şifreyi sorarsa son hanenin üç olduğunu söyle. Üç, bizim gibi: sen, ben ve mikrodalga.

CAROL: Otomattaki krakerlerin hepsini yeme. Seni seviyorum. Önce ödev, sonra radyo.

[Bip.]` },
      office_carol: { title: 'Dinlenme odası buzdolabındaki not', from: 'Carol (Penny’nin annesi)', date: 'Nisan 1987', body:
`P —

Toplantı yine uzuyor. Yemek dondurucuda, mavi kapaklı olan. On değil, yedi dakika.

Radyodan ÖNCE ödev.

Seninle gurur duyuyorum. Söylemediğimi biliyorum. Buzdolabında söylüyorum.

—Annen` },
      office_tracklist: { title: 'Bir kaset kapağı', from: 'Penny', date: 'Nisan 1987', body:
`256 OPERASYONU — RESMİ KARIŞIK KASET

A YÜZÜ: BU GECE İÇİN
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Pellet
3. Midnight at the Starlight — Penny (canlı, dinlenme odasından)
4. Don’t Look Back — Harbor Lights

B YÜZÜ: SONRASI İÇİN
(boş — kazandıktan sonra kaydedeceğiz)` },
      office_penny_tape: { title: 'Kaset: "Penny Radyo, canlı"', from: 'Penny', date: '14 Nisan 1987', body:
`[Klik. Bir floresan vızıltısı. Geri sayan bir mikrodalga.]

PENNY: İyi akşamlar Harlow! Penny Radyo’yu dinliyorsunuz, yüz yedi nokta üç, Harlow Mutual Sigorta’nın dinlenme odasından canlı yayın. Kahvenin yanık, geleceğin parlak olduğu yerden.

PENNY: Bu gecenin hava durumu: karanlık. Yarının hava durumu: yine karanlık, çünkü annemin toplantısı yine uzuyor.

[Mikrodalga ötüyor.]

PENNY: [daha alçak sesle] Bazen bir saat boyunca buna konuşuyorum ve kimse duymuyor. Sorun değil. Orada biri varmış gibi yapmak güzel.

PENNY: Eğer oradaysan... Perşembe kill screen’i geçeceğiz. Bizi dinlemeye devam et.

[Klik.]` },
      office_walt5: { title: 'Walt’ın defteri', from: 'Walt', date: 'İçeride, ? gün', body:
`Pembe hep benim gideceğim yerde. Beni harita gibi okuyor.

Penny kabinde de böyle yapardı. Billy’nin arkasında durup fısıldardı: "sol, sol, şimdi bekle, şimdi GİT." Billy onu dinlediğini hiç kabul etmedi.

Bugün sola gittim. Zaten oradaydı. Bana dokunmadı. Sadece bana üzgünmüş gibi baktı.` },
      office_eddie_page: { title: 'Yırtık, buruşturulmuş bir sayfa', from: 'Eddie', body:
`...Walt artık oyuncuysa, o gidince oyunun yeni birine ihtiyacı olur. Ekrandan geçen herkes olabilir. Çocuk olabilir.

Hayır. Kes şunu.

Sen öyle biri değilsin Eddie.` },
      office_board: { title: 'Toplantı odasındaki beyaz tahta', from: 'B Toplantı Odası', body:
`2. ÇEYREK HASAR DEĞERLENDİRME
- bekleyen: 212 dosya
- fazla mesai: onaylandı (yine)
- Cuma: herkes bir yemek getirsin

Hepsinin üstüne, başka bir kalemle:
HERKES NEREYE GİTTİ` },
      office_phone2: { title: 'Telefon hattı 0256', from: 'Bilinmeyen hat', body:
`[Cızırtı. Sonra düz, çocuksu bir ses, yavaşça sayıyor.]

...iki yüz elli üç...
...iki yüz elli dört...
...iki yüz elli beş...

[Sayma duruyor. Nefes sesi. Tam ahizenin yanında.]

...iki yüz elli-

[Hat kesiliyor.]` },
      office_phone3: { title: '1987’den bir arama', from: 'Maggie', date: '17 Nisan 1987, 07:12', body:
`[Çalıyor, sonra sakin kalmak için çok uğraşan bir kadın sesi.]

MAGGIE: Alo? Ben Maggie, Clyde’ın annesi. Bu kadar erken aradığım için kusura bakmayın. Penny orada mı? Clyde Sam’lerde kalacağını söylemişti ama Sam’in annesi diyor ki...

MAGGIE: Orada kimse yok mu?

MAGGIE: ...Veranda ışığını onun için açık bıraktım. Açık bırakacağım.

[Klik.]` },
      office_personnel: { title: 'Terminal: PERSONNEL.TXT', from: 'IBM PC/XT', body:
`HARLOW MUTUAL — HASAR BOLUMU
CAROL ........ EKSPER ......... FM 1. CEYREK: 212 SA
DENNIS ....... AMIR ........... FM 1. CEYREK:  12 SA
MARGE ........ MEMUR .......... FM 1. CEYREK:   0 SA

ZIYARETCI KAYDI (18:00 SONRASI):
PENNY (KIZI, CAROL) ........... 61 ZIYARET

C:\\> _` },
    },
    obj: {
      office_code: 'Güvenlik şifresinin hanelerini bul ({n}/4)',
      office_keypad: 'Şifreyi güvenlik odasının tuş takımına gir',
      office_card: 'Güvenlik kartını al',
      office_stairs: 'Kartı yangın merdiveni kapısında kullan',
    },
    mono: {
      office_start: 'Bir ofis. Tüplü monitörler. Kimse yok ama herkes az önce kalkmış gibi.',
      office_pinkSeen: 'Pembe... önümde. Ben oraya varmadan oradaydı.',
      office_code: 'Dördü de tamam. Bir, sıfır, yedi, üç. Penny’nin istasyonu.',
      office_cameras: 'Monitörler katın kameralarını gösteriyor. Artık onları haritamda görebiliyorum.',
      office_tape: 'B yüzü boş.',
    },
    lines: {
      office_keypad: 'Şifreyi gir',
      office_card: 'Kartı okut',
      office_cardIdle: 'Kart okuyucu (kırmızı)',
      office_cardRed: 'Kart okuyucunun ışığı kırmızı.',
    },
    radio: {
      office_start: [
        ['eddie', 'Ofis mi? ...Harlow Mutual. Penny’nin annesi burada çalışırdı. Penny her akşam dokuza kadar ödevini dinlenme odasında yapardı.'],
        ['eddie', 'Oradaki telefondan salonu arar, bize hava durumunu okurdu. Her akşam.'],
      ],
      office_pink: [
        ['eddie', 'Pembe önünde! Nereye gittiğini okuyor. Gerekirse geri geri yürü, kulağa nasıl geldiğini biliyorum.'],
      ],
      office_tape: [
        ['eddie', 'Karışık kaset. O gece için bir tane yapmıştı. B yüzü "sonrası için" olacaktı.'],
        ['sam', 'Neyin sonrası?'],
        ['eddie', 'Kazandıktan sonrası. Eve döndükten sonrası.'],
      ],
      office_freed: [
        ['eddie', 'Yanında yürüyor. Önünde değil. Yanında.'],
        ['eddie', 'Kabinde de Billy’nin arkasında böyle dururdu. Tam orada, hamleleri fısıldayarak.'],
      ],
      office_page: [
        ['sam', 'Eddie. Bir sayfa buldum. Senin el yazın. "Çocuk olabilir."'],
        ['eddie', '...O eski. İlk haftamda bir sürü saçma şey yazdım. Unut onu.'],
        ['eddie', 'Merdivenler Sam. Merdivenlere git.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
