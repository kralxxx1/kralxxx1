/* Türkçe — 7. Bölüm: Son Durak (Nordlys Ekspresi). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      train: {
        name: '7. BÖLÜM', title: 'Son Durak', place: 'Brenna istasyonu, kuzey hattında',
        intro: 'Çarşamba, 19 Aralık 1990, 23.40.\n\nNordvik’e giden gece yataklı treni bütün pencereleri ışıl ışıl, peronda bekliyor. Binen yok. İnen yok. Bir kapı açık.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'Peron kapısının yanındaki tarife', from: 'Kuzey Hatları', date: 'Kış tarifesi 1990–91', body:
`NORDLYS EKSPRESİ — gece yataklı, her gün
Halvard kalkış 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (isteğe bağlı durak)* 00.50
Nordvik varış 06.15

* Trenler Kvitfjell’de yalnızca bir yolcu Brenna’dan önce kondüktöre söylerse ya da peronda bekleyen bir yolcu varsa durur. Durakta kışın görevli de ışık da yoktur.` },
      train_notice: { kind: 'notice', title: 'Bekleme salonunda bir duyuru', from: 'Kuzey Hatları, Bölge Trafik Müdürlüğü', date: '1 Aralık 1990', body:
`BİLETLER TRENE BİNMEDEN ÖNCE ALINMALIDIR.

Gece trenlerinde bilet satışı yoktur. Kondüktöre geçerli bir bilet gösteremeyen yolcunun bir sonraki durakta trenden inmesi istenir.

Kuzey Hatları’nı tercih ettiğiniz için teşekkür ederiz.

(Altına biri tükenmezle yazmış: “Kvitfjell’de bile mi?” Bir başkası da: “ÖZELLİKLE Kvitfjell’de”)` },
      train_menu: { kind: 'note', title: 'Yemekli vagonun menüsü', from: 'Nordlys Ekspresi yemekli vagonu', date: '19.12.90', body:
`Ekmekli balık çorbası — 48
Ren geyiği yahnisi, kırmızı yaban mersini, patates — 95
Reçelli ve ekşi kremalı waffle — 32
Kahve — 12   Kakao — 14

Yemekli vagon 23.00’te kapanır. 23.00’ten sonra yataklı vagon yolcularına yatak biletlerini göstermeleri hâlinde servis yapılır.

(Bir fincan izi. Menünün altında kurşunkalemle: “Mutfak yanındaki masa: kakao, yatak 24, nakit ödendi.”)` },
      train_waiter: { kind: 'note', title: 'Mutfağın yanında bir sipariş defteri', from: 'R. Moe, garson', date: '19.12.90', body:
`23.55  Yatak 24 (2. vagon) — genç bir hanım, tek başına — kakao, waffle.
       Yemekli vagon kapalı ama yatak biletini gösterdi, ben de.
       Noel için Nordvik’e, evine gidiyor. Trende ilk kez tek başına.
       Bileti paltosunun cebine geri koydu. Kaybetmemesini söyledim.

00.30  Bay Saether turunda geçti. Ostra’dan beri hatta kar var,
       o da acısını herkesten çıkarıyor.` },
      train_paper: { kind: 'clipping', title: 'Bir masada bırakılmış bir gazete', from: 'Nordvik Times', date: 'Cumartesi, 22 Aralık 1990', body:
`15 YAŞINDAKİ KIZ ÇARŞAMBADAN BERİ KAYIP

Nordvikli 15 yaşındaki Lina Berg, Çarşamba akşamı Noel için eve gelmek üzere Halvard’da Nordlys Ekspresi’ne bindiğinden beri görülmedi.

Varmadı. Kuzey Hatları, Brenna ile Nordvik arasında hiçbir yolcunun trenden inmediğini ve tren vardığında yatağının boş bulunduğunu söylüyor.

O günden beri bölgeye her gün kar yağıyor. Polis, trenle yolculuk eden herkesin başvurmasını istiyor.` },
      train_lina: { kind: 'letter', title: '24 numaralı yatağın küçük masasında bir mektup', from: 'Lina', date: '19.12.90, trende', body:
`Sevgili Anneciğim,

Trendeyim!!! Bileti kafedeki cumartesi paramla kendim aldım, sonuna kadar, yataklı. Bir dolap büyüklüğünde. Alt ranza bende, üsttekinde kimse yok, ben de paltomu oraya koydum, insan gibi duruyor.

Altıyı çeyrek geçe varıyoruz. Karanlıkta istasyona gelmeyin, yolu biliyorum. Kahvaltıya evde olurum. Jonas’a söyle, odam onun olamaz.

Bunu sana kendim veririm, pul gerekmesin.

Lina` },
      train_saether: { kind: 'report', title: 'Kondüktör kompartımanında katlanmış bir görev raporu', from: 'E. Saether, kondüktör', date: '19/20.12.90', body:
`Nordlys Ekspresi, Halvard–Nordvik. Kondüktör: E. Saether.

21.10 Halvard’dan kalkış. 61 yolcu.
23.40 Brenna. 4 inen, 0 binen.
00.40 Bilet kontrolü, 2. vagon: yatak 24, kadın yolcu, tahminen 17–18 yaşında, bilet gösteremedi. Aldığını iddia ediyor. Paltosu ve çantası kendisinin önünde arandı. Bilet yok.
00.50 Kvitfjell. Biletsiz yolcu yönetmeliğe uygun olarak indirildi.
06.15 Nordvik varış. Bildirilecek başka bir şey yok.

(00.40 ve 00.50 satırlarının üstünden başka bir mürekkeple, çok dikkatle, neredeyse okunmaz hâle gelene kadar geçilmiş.)` },
      train_inquiry: { kind: 'report', title: 'Kondüktörün masasında bir ifade', from: 'Kuzey Hatları soruşturması: E. Saether’in ifadesi', date: '4 Ocak 1991', body:
`19 Aralık gecesi Nordlys Ekspresi’nin kondüktörüydüm.

Tek başına yolculuk eden bir kızı hatırlamıyorum. Her zamanki gibi trendeki bütün biletleri kontrol ettim. Kimsenin indirilmesi gerekmedi.

Tren Kvitfjell’de durmadı. Hiçbir yolcu istememişti ve durak kar yüzünden kapalıydı.

Yirmi altı yıldır demiryolundayım.

E. Saether` },
      train_docket: { kind: 'note', title: 'Bir posta çuvalına bağlı kayıp eşya fişi', from: 'Depo 9, Halvard Merkez — Kayıp Eşya', date: 'Ocak 1991', body:
`No. 97 / 1991
Bir tren bileti, tek yön, Halvard–Nordvik, yataklı, 2. vagon yatak 24, 19.12.90. Zımbalanmamış.
Bulunduğu yer: Nordlys Ekspresi, 2. vagon, alt ranzanın altı; Nordvik’te temizlikçiler, 20.12.90.
Depo 9’a geliş: 7.1.91.
Memur: A. Lind
Durum: SAHİBİ ÇIKMADI` },
      train_cabLog: { kind: 'report', title: 'Kabindeki makinist defteri', from: 'Makinist K. Aune', date: '19/20.12.90', body:
`00.47  Kondüktörden zil: Kvitfjell’de dur.
00.50  Kvitfjell’de duruldu. Durak karanlık, peron kar altında. Yoğun kar.
00.51  Bir yolcu indi, 2. vagonun arkasından. Kondüktörden hareket işareti.
00.52  Hareket.

(Sayfa defterden yırtılmış, sonra gevşekçe geri konmuş.)` },
      wren7: { kind: 'drawing', drawing: 7, title: '3. vagonda bir yastığın üstünde bir resim', from: 'Wren, 7 yaşında', body:
`Kareli kâğıda pastel boya. Karanlıkta, bütün pencereleri sarı yanan uzun mavi bir tren, sağa doğru uzaklaşıyor. Arkasında, karın içinde, bir lamba direğinin yanında kolları iki yanında, kırmızı bereli bir kız duruyor. Üstünde küçük kırmızı kuş.

Altında:
ONDA VARDI` },
    },
    items: {
      ticket: { name: 'Tren bileti', desc: 'Tek yön, Halvard–Nordvik, 19.12.90, bir kez zımbalanmış. Başkasının. Bir masada, bir fincan tabağının altında bırakılmış.' },
      linaTicket: { name: 'Lina’nın bileti', desc: 'Tek yön, Halvard–Nordvik, yataklı, 2. vagon yatak 24, 19.12.90. Zımbalanmamış. Kendisi almış.' },
    },
    obj: {
      train_start: 'Trene bin',
      train_ticket: 'Kondüktör seni bulmadan bir bilet bul',
      train_who: 'Kvitfjell’de kimin indirildiğini öğren',
      train_lina: 'Lina’nın biletini 24 numaralı yatakta bul',
      train_punch: 'Biletini zımbalat',
      train_brake: 'Treni Kvitfjell’de durdur: imdat freni makinist kabininde',
    },
    mono: {
      train_start: 'Bir tren. Bütün pencereleri yanıyor ve peronda in cin top oynuyor.',
      train_board: 'İçerideyim. Kapı arkamdan kapandı.',
      train_moving: 'Hareket ediyoruz.',
      train_conductor: 'Elinde lambayla biri koridordan geliyor.',
      train_sleeper: 'İçeride biri uyuyor, yüzü kapıya dönük. Sessizce, Ada.',
      train_gangway: 'Plakaların altında bir şey var. Burada durma.',
      train_ticket: 'Bir bilet. Benim değil. İdare edecek.',
      train_check: 'Biletimi istiyor.',
      train_punched: 'Çıt. Yürüyüp gidiyor. Yüzüme bakmadı bile.',
      train_letter: 'Lina. On beş yaşında. Kahvaltıya evde.',
      train_report: 'Yatak 24. “Aldığını iddia ediyor.” Kvitfjell, gece biri on geçe, karda.',
      train_found: 'Ranzanın altında. Söylediği yerde.',
      train_turn: 'Lamba durdu. Arkasını döndü.',
      train_docket: 'A. Lind. Bu benim yazım. İkinci haftam. Dosyaladım ve kimin olduğunu hiç sormadım.',
      train_punchIt: 'Onun zımbası. Kızın bileti.',
      train_claimed: 'Zımbalandı. Geçerli. Bu trende olmaya hakkı vardı.',
      train_sat: 'Oturdu. Şapkasını çıkardı.',
      train_kvitfjell: '“Kvitfjell.” Yavaşlamıyoruz.',
      train_passed: 'İşte gidiyor. Karda tek bir lamba. Durmadık.',
      train_again: 'Sıradaki durak Kvitfjell. Yine. Dönüp duruyor.',
      train_brake: 'Bir yere tutun.',
      train_brakeWait: 'İmdat freni. Henüz değil. Kız biletine kavuşmadan değil.',
      train_punchWait: 'Kondüktörün zımbası. Zımbalanması gereken benim biletim değil.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Bir lamba ve kar. Onu indirdiği yer burası. Tam burada durmuş, pencerelerin gidişini izlemiş olmalı.',
    },
    lines: {
      train_boardPrompt: 'Trene bin',
      train_punchPrompt: 'Lina’nın biletini zımbala',
      train_punchLook: 'Kondüktörün zımbası',
      train_brakePrompt: 'İmdat frenini çek (basılı tut)',
      train_brakeLook: 'İmdat freni',
      pa_kvitfjell: '“Kvitfjell. Kvitfjell. İsteğe bağlı durak.”',
    },
    radio: {
      train_otto1: [
        ['radio', '[paraziti altında tekerlekler]'],
        ['otto', 'Dokuzdan Ada’ya. O ses. Trendesiniz. Biletiniz olduğunu söylemenizi isterdim.'],
        ['ada', 'Yok.'],
        ['otto', 'O zaman kondüktör sizi bulmadan bir tane bulun. Benim rafımda en kötüleri kondüktörlerdir. Çok kibardırlar ve durmazlar.'],
      ],
      train_otto2: [
        ['otto', 'Ada. Borudan kendiliğinden bir fiş geldi. Bir tren bileti, sahibi çıkmamış. Sizin el yazınızla. Demek ki benim raflarıma onlara inmeden çok önce dosyalama yapıyormuşsunuz.'],
      ],
      train_otto3: [
        ['otto', 'Sizin oralar sessizleşti. Bu ya çok iyi ya da çok kötü. Tren hâlâ gidiyorsa durdurun. Öyle trenler varmaz. Yalnızca dönüp dururlar.'],
      ],
    },
    recap: {
      train: 'Nordlys Ekspresi, 19 Aralık 1990. Kondüktör Edvin Saether, biletini bulamadığı için on beş yaşındaki Lina Berg’i gece treninden Kvitfjell durağında, karın içine indirdi. Kız bileti kendisi almıştı; ranzasının altındaydı. Saether soruşturmaya kimsenin indirilmediğini söyledi. Temizlikçiler bileti Nordvik’te bulup Depo 9’a yolladı; ben de dosyaladım ve kimin olduğunu hiç sormadım. Onu zımbalattım ve treni kızın indiği yerde durdurdum.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
