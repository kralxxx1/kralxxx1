/* Türkçe — 2. Bölüm: Sis Çanı (MS Saint Brigid). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      ferry: {
        name: '2. BÖLÜM', title: 'Sis Çanı', place: 'MS Saint Brigid, Halvard Boğazı',
        intro: '9 Kasım 1987, gece on bire çeyrek var. Köprüüstünden pruva görünmeyecek kadar koyu bir sis.\n\nSaint Brigid, masa gibi düz bir denizde, kıçtan, yavaş yavaş batıyor. Radarı bir haftadır çalışmıyor. Baş tarafta bir yerde, bir çan.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Filika istasyonları', from: 'MS Saint Brigid', body:
`ACİL DURUMDA

1. Filika istasyonunuza gidin (kamaranızdaki karta bakın).
2. Can yeleğinizi giyin. Gemi içinde şişirmeyin.
3. Filikaları mürettebat indirir.
   Matafora anahtarı: köprüüstünde.
   El manivelası: motor arızalanırsa.

(Altına keçeli kalemle: “2 numaralı vinç takılıyor. Manivela makine dairesindeki alet dolabında durur, güvertede DEĞİL. — 2. Çarkçı”)` },
      ferry_testimony: { kind: 'report', title: 'Soruşturma kuruluna ifade (suret)', from: 'Kpt. H. Aal', date: '30 Kasım 1987', body:
`Saat 21.30’dan terk emrine kadar köprüüstündeydim.

Görüş bir gominadan azdı. Radar 2 Kasım’dan beri arızalıydı ve sis işaretleri elle veriliyordu: geminin çanını gemici P. Rask çalıyordu.

Yaklaşık 22.35’te çan sustu. İkinci kaptanı başa gönderdim. Çocuk görev yerini terk etmişti. İşaret olmadan ne biz duyulabiliyorduk ne de başkalarını duyabiliyorduk.

Üzülerek söylüyorum ki Saint Brigid’in kaybı, on altı yaşında bir çocuğun paniğe kapılmasıyla başladı.

H. Aal, Kaptan` },
      ferry_logpage: { kind: 'report', title: 'Seyir defterinden yırtılmış bir sayfa', from: 'Saint Brigid, güverte jurnali', date: '9 Kasım 1987', body:
`21.40  Sis koyu. Hız 6 knota düşürüldü. Radar arızalı.
22.05  Kaptan kamarasına (rahatsız). Vardiya 2. Kaptan’da.
22.10  Sis işaretleri elle. Gemici Rask çanın başında.
22.31  Kaptan çağrıldı. Gelmedi.
22.44  Çarpma, iskele kıç omuzluk. Su alıyoruz.
22.47  Gemiyi terk. 1, 3, 4 numaralı filikalar denizde.
22.52  Gemici Rask hâlâ çalıyor. Filikaların çana göre dümen tuttuğunu söylüyor. Kaptan köprüüstünde değil.
22.58  Çan hâlâ

(Yazı orada kesiliyor. Sayfa tertemiz yırtılmış, sonra küçücük katlanmış; uzun süre bir çekmecede saklamak için katladığın gibi.)` },
      ferry_logbook: { kind: 'report', title: 'Harita masasındaki güverte jurnali', from: 'Saint Brigid', body:
`21.15  Halvard iskelesi. 41 yolcu, 17 mürettebat. Yer yer sis.
21.30  Limandan çıkıldı.

(Bir sayfa eksik. Ciltte yırtık kenarı görülüyor. Sonraki sayfada:)

23.40  Bütün filikalar sayıldı. Bir mürettebat kayıp: yaklaşık 22.35’te çandaki görev yerini terk eden gemici P. Rask.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'Güverte jurnali, sayfası yerinde', from: 'Saint Brigid', body:
`21.40  Sis koyu. Hız 6 knota düşürüldü. Radar arızalı.
22.05  Kaptan kamarasına (rahatsız). Vardiya 2. Kaptan’da.
22.10  Sis işaretleri elle. Gemici Rask çanın başında.
22.31  Kaptan çağrıldı. Gelmedi.
22.44  Çarpma, iskele kıç omuzluk. Su alıyoruz.
22.47  Gemiyi terk. 1, 3, 4 numaralı filikalar denizde.
22.52  Gemici Rask hâlâ çalıyor. Filikaların çana göre dümen tuttuğunu söylüyor. Kaptan köprüüstünde değil.
22.58  Çan hâlâ çalıyor.
23.05  Çan sustu.

(Sayfa hiç çıkmamış gibi cildinde duruyor. Son satırın mürekkebi ıslak.)` },
      ferry_radio: { kind: 'printout', title: 'Telsiz odası defteri', from: 'Telsiz Zabiti', date: '9.11.87', body:
`22.46  MAYDAY gönderildi. Mevki tahmini hesapla.
22.48  Halvard Radyo alındı dedi. Kılavuz teknesi Ternen yolda.
22.55  Ternen: “Sizi göremiyoruz. Çanınızı duyuyoruz. Ona dümen tutuyoruz.”
23.02  Ternen: “Filikalarınızdan ikisi bizde. Çanı hâlâ duyuyoruz. Çalmaya devam edin.”
23.05  Ternen: “Çan sustu. Neredesiniz?”
23.06  (başka kayıt yok)` },
      ferry_mother: { kind: 'letter', title: 'Salondaki bir koltukta bir mektup', from: 'Elin Rask', date: '4 Ocak 1988', body:
`Soruşturma kurulunun beylerine,

Raporunuza oğlumun görev yerini terk ettiğini yazmışsınız.

Pim on altı yaşındaydı. On bir yaşına kadar karanlıktan korkardı ve hâlâ sahanlık ışığı açık uyurdu. Korktuğunda kendisine ne söylendiyse onu yapardı, hem de daha yüksek sesle.

Biri ona o çanı çalmasını söylediyse, çalacak gemi kalmayana kadar çalmıştır.

Adının raporunuzdan çıkarılmasını istiyorum. Doğru şekilde, yeniden yazılmasını istiyorum.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'Ranzanın üstünde bir kartpostal', from: 'Margit', body:
`(Bayrakları açık Saint Brigid’in yaz gününde çekilmiş bir resmi.)

Sevgili Ruth Teyze,
Siste geçiyoruz, hiçbir şey görünmüyor! Güvertedeki çocuk, öbür tekneler burada olduğumuzu bilsin diye her dakika bir çan çalıyor. Çok güzel ve biraz ürkütücü. Anneme söyle, Halvard’dan ararım.
Margit

(Hiç postalanmamış.)` },
      ferry_purser: { kind: 'note', title: 'Mürettebat listesi, muhasip odası', from: 'Muhasip', body:
`MS SAINT BRIGID — MÜRETTEBAT, 1987 KIŞ TARİFESİ

Kaptan ............ H. Aal
Birinci Zabit ..... (izinde)
2. Kaptan ......... T. Solberg
Başçarkçı ......... K. Moe
2. Çarkçı ......... R. Dahl
Telsiz Zabiti ..... B. Lund
Gemici ............ P. Rask (16) — ilk sezonu

(Biri son ismin yanına küçük bir çan çizmiş.)` },
      ferry_mess: { kind: 'note', title: 'Mürettebat yemekhanesinde nöbet listesi', from: 'T. Solberg', body:
`45. HAFTA

Radar 2/11’den beri ARIZALI — parçalar Bergen’den sipariş edildi.
TAMİR EDİLENE KADAR: görüş 1 milin altındayken sis çanı elle.
Çan: Rask (bütün akşam seferleri).
Rask: ben dur diyene kadar çalacaksın. Canın sıkılana kadar değil. Ben DUR DİYENE kadar.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'Bir ranzaya sıkıştırılmış bir resim', from: 'Wren, 7 yaşında', body:
`Pastel boya. Gri sis karalamalarının içinde bir gemi. Önünde sarılar giymiş, elinde çan, ağzı açık, çan çalan bir çocuk. Direğin tepesinde küçük kırmızı bir kuş.

Altında:
DURMADI` },
    },
    items: {
      bridgeKey: { name: 'Köprüüstü anahtarı', desc: 'Mantar bir şamandıraya bağlı pirinç bir anahtar. Kaptan kamarasından.' },
      davitKey: { name: 'Matafora anahtarı', desc: 'Üstünde FİLİKALAR yazan T biçimli bir anahtar. Vinç frenini bırakır.' },
      crank: { name: 'Vinç manivelası', desc: 'Tahta saplı ağır çelik bir manivela. Filikayı elle indirmek için.' },
      logPage: { name: 'Yırtık jurnal sayfası', desc: 'Küçücük katlanmış. 9 Kasım 1987, 21.40’tan 22.58’e.' },
    },
    obj: {
      ferry_start: 'Gemiden inmenin bir yolunu bul',
      ferry_bridge: 'Köprüüstünden matafora anahtarını al',
      ferry_captain: 'Köprüüstü anahtarı için kaptan kamarasını ara',
      ferry_logbook: 'Yırtık sayfayı köprüüstündeki jurnale geri koy',
      ferry_key: 'Matafora anahtarını köprüüstünden al',
      ferry_crank: 'Vinç manivelasını makine dairesinde bul',
      ferry_lower: '2 numaralı filikayı indir',
    },
    mono: {
      ferry_start: 'Bir gemi. Küpeşteyi göremeyeceğim kadar koyu bir sis. Ve güverte yatıyor.',
      ferry_winch: '2 numaralı filika. Vinç için bir matafora anahtarıyla bir manivela lazım. Anahtar köprüüstünde olur.',
      ferry_winch2: 'Hâlâ anahtar ve manivela lazım.',
      ferry_winchNoCrank: 'Anahtar takılı. Manivela güvertede değil. Duyuruda makine dairesi yazıyordu.',
      ferry_winchNoKey: 'Manivela bende. Fren hâlâ kilitli: matafora anahtarı.',
      ferry_brake: 'Fren bırakmıyor. Gemi benimle işini bitirmemiş gibi.',
      ferry_pageAfter: 'Köprüüstünde değilmiş. Kamarasında bir şişeyle oturuyormuş, çocuk da bir saat boyunca o çanı çalmış.',
      ferry_logbookGap: 'Bir sayfa eksik. 21.40’ta yırtılmış.',
      ferry_claimed: 'İşte. Yeri orası.',
      ferry_bell: 'Geminin çanı. Birini bekliyormuş gibi çalıyor.',
      ferry_bellAfter: 'Sıcak. Bu ipte birinin eli vardı.',
      ferry_bridgeKey: 'Köprüüstü anahtarı. Yastığının altında. Tabii ki.',
      ferry_davitKey: 'FİLİKALAR. Matafora anahtarı.',
      ferry_crank: 'Manivela. Su kıpırdadı. Hepsi birden.',
      ferry_lower: 'Tutun. Bir yere tutun.',
      ferry_end: 'Hâlâ çalıyor. Saat gibi, düzenli. Filikalar yolunu bulsun diye.',
      ferry_bridgeLocked: 'Köprüüstü kilitli. Anahtar kaptanda olur.',
      ferry_passengers: 'Uyuyorlardı. Hepsi uyuyordu, şimdi ayaktalar.',
      ferry_drowned: 'Sudan bir şey çıktı. Önce elleri çıktı.',
      ferry_lounge: 'Salon. Her koltukta can yelekleri. İçeri girdiğimde kimse kıpırdamadı.',
      ferry_engineRoom: 'Makine dairesi diz boyu su basmış. Su çok durgun.',
      ferry_fore: 'Çan burada bir yerde. Rüzgârda nefes alışını duyuyorum.',
    },
    lines: {
      ferry_winchGo: 'Vinci çevir ve 2 numaralı filikayı indir (basılı tut)',
      ferry_winchLook: '2 numaralı filikanın vinci',
      ferry_logbookPut: 'Sayfayı yerine koy',
      ferry_logbookRead: 'Jurnali oku',
      ferry_bellPrompt: 'Çanı çal',
      ferry_pagePrompt: 'Çekmecede katlanmış bir sayfa',
      ferry_bridgeUnlock: 'Köprüüstünün kilidini aç',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[parazit, altında çok hafif bir çan]'],
        ['otto', 'Dokuzdan Ada’ya. Geçtiniz. Neredesiniz?'],
        ['ada', 'Bir gemide. Siste. Batıyor.'],
        ['otto', 'Saint Brigid. Bende koca bir rafı var: can yelekleri, bir satranç takımı, kırk bir şemsiye. 1987’de battı.'],
        ['ada', 'Nasıl inerim?'],
        ['otto', 'Her rafta yanlış yerde duran bir şey vardır. Sayfa numarası olan bir yalan. Onu yerine koyun, o yer sizi bırakır. Sonra aklı başında biri gibi filikaları kullanın.'],
      ],
      ferry_bellman: [
        ['otto', 'Çanlı adamla tanıştınız. Çanı size takmasına izin vermeyin. Nerede olduğunu bilesiniz diye çalıyor. Şükredin. Çoğu bunu yapmaz.'],
      ],
      ferry_otto2: [
        ['otto', 'Raflarımda bir şey kıpırdadı. Bir dosya. Rask, P. “Görev yerini terk” altındaydı. Artık orada değil.'],
        ['ada', 'Şimdi nerede?'],
        ['otto', '“Bulundu” altında. Oraya ben koymadım.'],
      ],
    },
    recap: {
      ferry: 'Siste Saint Brigid. Kaptan Aal, sis çanındaki çocuğun paniğe kapılıp kaçtığını söyledi. Aal’ın kendi jurnalinden yırttığı sayfaya göreyse o kamarasında sarhoştu, on altı yaşındaki Pim Rask da çanla filikaları eve getiriyordu. Sayfayı yerine koydum. 2 numaralı filika suya değdiğinde çan yeniden çalmaya başladı.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
