/* Türkçe — 5. Bölüm: Beyaz Karanlık (Berghotel Weisshorn). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      lodge: {
        name: '5. BÖLÜM', title: 'Beyaz Karanlık', place: 'Berghotel Weisshorn, 2.914 m',
        intro: 'Pazartesi, 28 Şubat 1983, karanlık bastıktan sonra. Dağda fırtına.\n\nO sabah vadi, teleferiğin tepesindeki otele bir telgraf gönderdi. Öğleden sonra beş misafir ve kayak hocaları üst istasyonda karın altındaydı. Otel hiç telgraf gelmediğini söylüyor.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'Misafir defteri', from: 'Berghotel Weisshorn', date: 'Şubat 1983', body:
`26.2.  Aebi ailesi (3)       oda 4
26.2.  Bay ve Bayan Coulter   oda 2
27.2.  R. Fankhauser          oda 1
27.2.  L. Brunner (kayak okulu, personel)

Ayrılışlar:
Bayan Coulter — 2.3., vadi kızağıyla.
(Yukarıdaki öbür isimlerin hepsinin üstü 28.2.’de, tek ve düzgün bir çizgiyle, başka bir kalemle çizilmiş.)` },
      lodge_weather: { kind: 'report', title: 'Ofis masasındaki hava defteri', from: 'G. Imhof', date: '28 Şubat 1983', body:
`06.30  Saat 3’ten beri yoğun kar. Rüzgâr KB 60.
07.10  Telefon hattı koptu (her zamanki gibi).
08.15  İstasyondan posta kızağı çıktı. Posta, süt ve ekmek.
09.20  Teleferik çalışıyor. Kayak okulu her gün olduğu gibi 9.30’da yukarıda. Dolu bir hafta, bütün odalar dolu, 1979’dan beri ilk dolu hafta.

(08.15 satırının üstünden kurşunkalemle iki kez geçilmiş; biri orada takılıp kalmış gibi.)` },
      lodge_telegram: { kind: 'telegram', title: 'Kenarları yanmış bir telgraf', from: 'Vadi istasyonu, çığ servisi', date: '28.2.83 07.55', body:
`BERGHOTEL WEISSHORN’A STOP
ÇIĞ TEHLİKESİ 5 STOP ÜST YAMAÇLAR YÜKLÜ STOP
ÜST PİSTLERİ VE ÜST İSTASYONU BUGÜN KAPATIN STOP
OTELİN ÜSTÜNDE KAYAK YOK STOP
DÖNÜŞTE TEYİT EDİN STOP
ÇIĞ SERVİSİ

(Arkasına, özenli bir elle: “8.15’te alındı. — G.I.” Gerisi is. Yanması gerekirdi. Yanmamış.)` },
      lodge_menu: { kind: 'notice', title: 'Bir masada kahvaltı kartı', from: 'Berghotel Weisshorn', body:
`PAZARTESİ 28 ŞUBAT
Kahve — Çay — Sıcak çikolata
Bircher müslisi
Sahanda yumurtalı rösti
Vadiden ekmek, tereyağı, otelin kendi arılarından bal

Bu akşam: hava izin verirse terasta fondü!
Kayak okulu 9.30’da üst istasyonda toplanır. Leo diyor ki: gözlüklerinizi getirin.` },
      lodge_postcard: { kind: 'card', title: 'Komodinin üstünde bir kartpostal, oda 1', from: 'Ruth Fankhauser', body:
`(Güneşte otelin bir resmi, yanından süzülerek çıkan bir teleferik kabini.)

Sevgili Hanni,
Dünyanın sonu gibi kar yağıyor. Tepeden inen pistin vadinin en iyisi olduğunu söylüyorlar, sabah çıkıyoruz, fırtına olsa da olmasa da. Hocamız Leo her şeye gülüyor. Mutluyum. Pazar ararım.
R.

(Pullu, hiç postalanmamış.)` },
      lodge_roomNote: { kind: 'note', title: 'Oda 4’te bir çocuğun notu', from: 'Lisa Aebi, 10', body:
`Annem, hava çok rüzgârlı olursa içeride kalıp Bayan Imhof’la kâğıt oynayabileceğimizi söylüyor.
Bayan Imhof burada rüzgârın bir şey olmadığını söylüyor.
Karın dağdan düşüp düşemeyeceğini sordum. Bu hafta olmaz dedi.` },
      lodge_school: { kind: 'notice', title: 'Kayak okulu kayıt listesi', from: 'L. Brunner', date: '28.2.83', body:
`KAYAK OKULU — ÜST İSTASYON 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Hoca: Leo Brunner
(Altına kurşunkalemle:) Greta vadiden her şeyin yolunda olduğunu söylüyor. Güzel. Haydi bakalım.` },
      lodge_kitchenNote: { kind: 'note', title: 'Soğuk oda kapısının yanına iğnelenmiş', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
Vadi ararsa ya da kızak çığ servisinden bir şeyle gelirse, BANA gelir; misafirlere değil, Leo’ya da değil. Ben hallederim.
Dolu bir hafta. Bu haftaya ihtiyacımız var.
Teleferiğin ana anahtarı soğuk odanın yanındaki askıda. Benden ya da senden başkası almaz.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'Soruşturmadan, bir gazete kupürü', from: 'Vadi gazetesi', date: 'Nisan 1983', body:
`WEISSHORN: OTELCİ UYARI ALMADIĞINI SÖYLÜYOR

Berghotel Weisshorn’un sahibi Bayan Greta Imhof (52), dün soruşturma kuruluna 28 Şubat’ta otele hiçbir çığ uyarısı ulaşmadığını söyledi. Telefon hattı sabah 7’den beri kopuktu ve “posta kızağıyla postadan başka bir şey gelmedi” dedi.

Çığ servisi, 8.15 kızağıyla bir telgraf gönderildiği konusunda ısrar ediyor. Otelde hiçbir kopyası bulunamadı.

Üst yamaçlar öğleden sonra 2.40’ta koptuğunda beş misafir ve kayak hocası Leo Brunner (29) hayatını kaybetti.` },
    },
    items: {
      telegram: { name: 'Telgraf', desc: 'Kenarları yanmış, ama hâlâ okunuyor. 8.15’te alınmış.' },
      masterKey: { name: 'Ana anahtar', desc: 'Tahta anahtarlığa takılı ağır bir anahtar: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Fırtınadan kurtul',
      lodge_find: 'Weisshorn’da ne olduğunu öğren',
      lodge_telegram: 'Hiç gelmeyen telgrafı bul',
      lodge_pin: 'Telgrafı resepsiyondaki panoya geri as',
      lodge_key: 'Ana anahtarı mutfaktan al',
      lodge_power: 'Makine dairesinde teleferiği çalıştır',
      lodge_board: 'Kabine bin',
    },
    mono: {
      lodge_start: 'Kendi elimi göremiyorum. Bir ışık var. Bir bina.',
      lodge_inside: 'Sıcak. Bir ateş yanıyor ve başında kimse yok.',
      lodge_cold: 'Çok üşüyorum. İçeri girmem lazım.',
      lodge_colder: 'Parmaklarımı hissetmiyorum.',
      lodge_warm: 'Sıcak. Ah, daha iyi.',
      lodge_frozen: 'Masalarında oturuyorlar. Her yerleri bembeyaz. Uzun zamandır kimse kıpırdamamış.',
      lodge_frozenMove: 'Penceredeki kıpırdadı. Ben ateşe gelince kıpırdadı.',
      lodge_board: 'Bir raptiye ve eskiden burada asılı duran bir şeyin yırtık köşesi.',
      lodge_book: 'Altısının da üstü yirmi sekizinde çizilmiş. Hepsi aynı kalemle, hepsi tek seferde.',
      lodge_stove: 'Soğuk kül. İçinde yanmamış bir şey var.',
      lodge_telegram: '“Üst pistleri kapatın.” Sekizi çeyrek geçe elindeymiş. Onlar dokuz buçukta çıkmışlar.',
      lodge_pinned: 'İşte. Herkesin okuyabileceği yerde.',
      lodge_claimed: 'Rüzgâr dindi. Bir nefeslik. Dağ dinliyormuş gibi.',
      lodge_stationLit: 'Karın öbür yanında ışıklar. Teleferik istasyonu.',
      lodge_key: 'Ana anahtar.',
      lodge_cook: 'Mutfakta biri var. İri bir adam. Elinde bir şey var.',
      lodge_prints: 'Ayak izleri. Şu anda, önümde açılıyor.',
      lodge_power: 'Çalışıyor. Kabinin ışığı yandı.',
      lodge_noKey: 'Anahtar lazım.',
      lodge_notYet: 'Motor dönmüyor. Burası beni bırakmadıkça dönmeyecek.',
      lodge_boarding: 'Kapılar. Kapanın. Kapanın, lütfen kapanın.',
      lodge_away: 'Gidiyoruz. Aşağı, hiçliğin içine.',
      lodge_office: 'Onun ofisi. Sobanın kapağı açık sarkıyor.',
      lodge_station: 'İstasyon. Halat beyazın içine uzanıyor ve orada bir anda yok oluyor.',
    },
    lines: {
      lodge_bookPrompt: 'Misafir defteri',
      lodge_boardPrompt: 'Telgraf panosu',
      lodge_boardPin: 'Telgrafı as',
      lodge_stovePrompt: 'Külün içinden çıkar (basılı tut)',
      lodge_controlPrompt: 'Teleferiği çalıştır (basılı tut)',
      lodge_controlLook: 'Kontrol masası',
      lodge_gondolaPrompt: 'Kabine bin',
      lodge_gondolaLook: 'Kabin',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[paraziti bastıran rüzgâr]'],
        ['otto', 'Dokuzdan Ada’ya. Sesiniz çok yüksek geliyor. Fırtına mı o? Weisshorn o zaman. Rafımda altı çift kayak ve hiç kullanılmamış bir fondü takımı var.'],
        ['ada', 'Burada insanlar var. Masalarda donmuşlar.'],
        ['otto', 'O zaman ateşin yanında durmayın. Sıcaklığa gelirler. Dışarıdaysa, sizin atmadığınız adımları dinleyin.'],
      ],
      lodge_otto2: [
        ['otto', 'Rafımdan bir şey çıktı. Bir telgraf. Artık doğru yerde. Kayak sesi duyduğuma neredeyse eminim.'],
      ],
    },
    recap: {
      lodge: 'Weisshorn, 28 Şubat 1983. Greta Imhof çığ uyarısını sekizi çeyrek geçe eline almış, dolu hafta iptal olmasın diye sobasına atmış ve kayak okulunu dokuz buçukta yukarı göndermişti. Beş misafir ve hocaları üst istasyonda öldü; o, soruşturmaya hiçbir uyarı gelmediğini söyledi. Telgraf hiç yanmadı. Onu herkesin okuyabileceği yere astım ve teleferik beni fırtınanın içinden aşağı indirdi.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
