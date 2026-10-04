/* Türkçe — 3. Bölüm: Çifte Gösterim (Pinewood Açık Hava Sineması). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      pinewood: {
        name: '3. BÖLÜM', title: 'Çifte Gösterim', place: 'Pinewood Açık Hava Sineması, Nordvik’in kuzeyi',
        intro: 'Cuma, 22 Ağustos 1975, gece on biri biraz geçe. Sezonun son gecesi.\n\nİkinci film, ağaçların arasındaki bir perdede oynuyor. Sesi yok ve bitmiyor. Sekiz yaşında bir oğlan makara değişiminde tuvalete gitti ve geri dönmedi.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'Büfe tezgâhında bir el ilanı', from: 'Pinewood Açık Hava Sineması', body:
`SEZONUN SON GECESİ — CUMA 22 AĞUSTOS

 20.45   UZUN YAZ
22.40   GECE GÖLÜ

ŞANSLI BİLET ÇEKİLİŞİ!
Bilet koçanınızı saklayın. Arada makine dairesinin penceresine getirip kutuya atın. Bay Hardy ikinci filmin sonunda kazananı çekecek.
Ödül: 1976 için bir SEZON KARTI. Her film, bütün araba.

Lütfen hoparlörleri direklerine geri asın. Yavaş sürün. Çocuklara dikkat edin.` },
      pine_missing: { kind: 'notice', title: 'Tuvaletlerin duvarında bir afiş', from: 'Nordvik polisi', date: 'Ağustos 1975', body:
`KAYIP
MIKKEL STRAND, 8 yaşında

En son 22 Ağustos Cuma günü, saat 23.00 sularında Pinewood Açık Hava Sineması’nda, tuvalete giderken görüldü.
Sarı saçlı. Mavi anorak, kırmızı lastik çizmeler. Yanında babasının feneri vardı.

Onu gördüyseniz ya da o gece herhangi bir şey gördüyseniz, lütfen Nordvik karakolunu arayın.
Annesiyle babası sizden rica ediyor. Ne olursa.` },
      pine_statement: { kind: 'report', title: 'İfade, suret', from: 'L. Hardy, makinist', date: '23 Ağustos 1975, 09.10', body:
`Her gösterim gecesi olduğu gibi akşam yediden gece ikiye kadar makine dairesindeydim. İki filmi de makara değişimleri dışında ara vermeden oynattım.

Çocuğu görmedim. Çocuklar makine dairesine çıkmaz. Pencereler perdeye bakar ve makine dairesinden tuvaletler görünmez.

Makine dairesinden çıkmadım. İçki içmemiştim.

Okundu, imzalandı,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'Sedirdeki yastığın altında bir mektup', from: 'L. Hardy', date: 'Mart 1981, hiç postalanmadı', body:
`Bayan Strand,

Bunu dokuz kez yazdım. Bu sefer postalayacağım.

Oğlunuz on bire on kala, çekiliş için koçanıyla makine dairesinin penceresine geldi. Açık bir şişem vardı, makara değişimi geliyordu, ona sonra gel dedim. “Atacağına söz veriyor musun?” dedi. Hadi, kaybol dedim.

On biri beş geçe hava almak için büfenin arkasına çıktım ve tuvaletlerin arkasındaki ağaçlara giren küçük bir fener gördüm. Önünde, daha derinde, başka bir ışık vardı. Kırmızı, fren lambası gibi. Büyük çocukların oyun ettiğini sandım. Beni ilgilendirmez diye düşündüm. Oraya inersem ve biri nefesimi koklarsa ruhsatımı kaybederim diye düşündüm, oysa sahip olduğum tek şey o makine dairesi.

Polise hiçbir şey görmediğimi söyledim. Çocukların makine dairesine gelmediğini söyledim.

Kazananı hiç çekmedim. Kutu hâlâ tezgâhın üstünde.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'Bilet kulübesindeki kayıp eşya defteri', from: 'Pinewood, 1975 sezonu', body:
`16/8   kadın hırkası, yeşil, 2. sıra
16/8   termos (kapaksız)
22/8   tek çorap, çocuk, 4. sıra
22/8   23.40   ARABA ANAHTARLARI, kırmızı etiketli, “STRAND”. Ararlarken babası tuvaletlerin oradan düşürmüş. Jonna L. teslim etti. Burada olduklarını söyledim. Gelip almadı.` },
      pine_wiper: { kind: 'note', title: 'Arabanın sileceğinin altında bir not', from: 'Babam', body:
`(Tükenmezle, bir yol haritasının arkasına yazılmış; ağaçlara dönük olsun diye sileceğin altına sıkıştırılmış.)

MIKKEL —
ARABANIN FARLARINI GÖREBİLECEĞİN YERDE KAL.
ONLARA DOĞRU YÜRÜ.
SENİ ARIYORUZ.
KİMSE KIZGIN DEĞİL.
— BABAN` },
      pine_staff: { kind: 'note', title: 'Depo odasına asılmış', from: 'Bo', body:
`PERSONEL —
Jeneratör büfeyi ve alan ışıklarını çalıştırır.
Benzini biten müşteriler için: günlük tankın yanında bir boşaltma musluğu var. Yarım kırmızı bidon, fazla değil, deftere de yazın. Musluğu YAVAŞ açın. Tükürür, patlar, bütün alan size bakar.

Lyle’ın aküsü ONUN makine dairesi lambası için. Araba çalıştırmak için değil. Bir daha olmasın.
— Bo` },
      pine_search: { kind: 'report', title: 'Av kulesine çakılmış bir arama duyurusu', from: 'Nordvik polisi', date: 'Cumartesi, 23 Ağustos 1975', body:
`ARAMA — C SEKTÖRÜ (kuzeybatı ormanı)
Onar kişilik, kol mesafesinde sıralar.

Köpekler izi eski av kulesinde kaybetti.
Bir çocuk çizmesi bulundu, sol, kırmızı, kulenin yaklaşık 40 m kuzeyinde.
Başka bir şey bulunmadı.

Arama karanlık bastırınca durduruldu. 06.00’da devam.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'Yaprakların arasında bir resim', from: 'Wren, 7 yaşında', body:
`Pastel boya. Kara ağaçların arasında dikilen kocaman beyaz bir perde. Önünde mavi paltolu, kırmızı çizmeli, elinde fener tutan küçük bir oğlan, omzunun üstünden geriye bakıyor. Perdenin üst kenarında küçük kırmızı kuş.

Altında:
GERİYE BAKTI` },
    },
    items: {
      stub: { name: 'Bilet koçanı', desc: 'ÇOCUK — PINEWOOD AÇIK HAVA SİNEMASI — 22 AĞU 75 — No. 1147. Kutuya hiç atılmamış.' },
      carBattery: { name: 'Araba aküsü', desc: 'On iki volt ve çok ağır. Makine dairesinin lambasını çalıştırıyordu.' },
      carKeys: { name: 'Araba anahtarları', desc: 'Kırmızı plastik bir etikete takılı iki anahtar. STRAND.' },
      jerrycan: { name: 'Kırmızı bidon', desc: 'Boş. Benzin kokuyor.' },
      fuel: { name: 'Benzin bidonu', desc: 'Yarısı dolu. Yürürken çalkalanıyor.' },
    },
    obj: {
      pine_start: 'Pinewood’dan çıkmanın bir yolunu bul',
      pine_parts: 'Station wagon’u çalıştır: akü, benzin, anahtarlar ({n}/3)',
      pine_startCar: 'Arabayı çalıştır',
      pine_stubFind: 'Oğlanın bilet koçanını bul',
      pine_claim: 'Koçanı makine dairesindeki kutuya at',
      pine_leave: 'Kapıdan arabayla çık',
    },
    mono: {
      pine_start: 'Ağaçların arasında bir sinema perdesi. Film oynuyor ve hiç ses yok.',
      pine_gate: 'Kapı zincirli. Asma kilit bu tarafta, ki bu hiç mantıklı değil.',
      pine_wagon: 'Bu araba sırasından çıkarılıp ağaçlara doğru çevrilmiş. Farları açık. Akü bitmiş.',
      pine_wagonNeeds: 'Akü bitmiş, depo boş, anahtar yok. Biri bütün gece bu arabayı farları açık bekletmiş.',
      pine_battery: 'Bir araba aküsü. Makine dairesinin lambasını çalıştırıyordu.',
      pine_batteryDark: 'Ve şimdi makine dairesi karanlık.',
      pine_keys: 'STRAND. Oğlunu ararken düşürmüş.',
      pine_can: 'Kırmızı bir bidon. Boş.',
      pine_fill: 'Tükürüyor. Patlıyor. Dışarıdaki her şey bunu duyabilir.',
      pine_filled: 'Yarım bidon. Yeter.',
      pine_tankNoCan: 'Jeneratörün günlük tankı. Bir boşaltma musluğu var. Dolduracak bir şey lazım.',
      pine_fitBattery: 'Akü takıldı. Farlar kendiliğinden yandı. Hiç kapatılmamışlar.',
      pine_inBeam: 'Işığın içindeki ağaçlardan biri yanlış duruyor.',
      pine_fuel: 'Benzin kondu.',
      pine_startFail: 'Marş basıyor. Basıyor. Ölüyor. Her şey bunu duydu.',
      pine_notYet: 'Marş basıyor ama çalışmıyor. Burası benimle işini bitirmemiş gibi.',
      pine_stubHint: 'Çekiliş için koçanıyla makine dairesine gelmiş. Sonra tuvalete gitmiş.',
      pine_stub: 'Bir çocuğun bilet koçanı. On bir kırk yedi numara. Kutuya atmaya hiç fırsatı olmamış.',
      pine_claimed: 'İşte. Buradaydın. Sayıldın.',
      pine_draw: 'Kazanacakmış.',
      pine_start2: 'Çalıştı. Ah, çalıştı.',
      pine_end: 'Aynada perde bembeyaz oluyor, sonra kararıyor. Biri makineyi kapattı.',
      pine_booth: 'Makine dairesi. Sıcak toz ve viski.',
      pine_toilets: 'Arka kapı ağaçlara açık.',
      pine_clearing: 'Bir av kulesi. Etrafındaki yapraklar halka şeklinde ezilmiş.',
      pine_pines: 'Bu ağaçlardan bazıları en son baktığımdan beri yer değiştirmiş.',
      pine_stag: 'Alandan büyük bir şey geçti. Boynuzları bir arabadan geniş.',
      pine_usher: 'Arabaların arasında kırmızı bir ışık. Biri insanlara yerlerini gösteriyor.',
      pine_swing: 'Salıncak sallanıyor. Rüzgâr yok.',
      pine_gateOpen: 'Uzakta, çakılın üstüne düşen bir zincir.',
      pine_canLook: 'Çekiliş kutusu. Dibinde, son makaranın altında bir avuç koçan.',
    },
    lines: {
      pine_stubPrompt: 'Yerde bir bilet koçanı',
      pine_canPut: 'Koçanı kutuya at',
      pine_canLook: 'Sarma tezgâhında açık bir film kutusu',
      pine_tankPrompt: 'Bidonu boşaltma musluğundan doldur (basılı tut)',
      pine_tankLook: 'Jeneratörün günlük tankı',
      pine_wagonLook: 'Strand’ların station wagon’u',
      pine_wagonBattery: 'Aküyü tak',
      pine_wagonFuel: 'Benzini dök',
      pine_wagonStart: 'Motoru çalıştır (basılı tut)',
      pine_wagonGo: 'Bin ve sür',
    },
    radio: {
      pine_otto1: [
        ['radio', '[parazit, altında bir projektör tıkırtısı]'],
        ['otto', 'Dokuzdan Ada’ya. Ağaçlar mı? Perde mi? Pinewood. Nordvik’in kuzeyinde bir açık hava sineması, 1975. Burada ondan bir kutu var: on bir araba anahtarı, bir oğlanın kırmızı çizmesi ve kimsenin sonuna kadar izlemediği bir filmin son makarası.'],
        ['ada', 'Film hâlâ oynuyor. Sessiz.'],
        ['otto', 'Aşağıda hiç ses olmaz. İki şey. Oradaki ağaçlar yalnızca siz kıpırdarken kıpırdar. Ve arabaların arasında kırmızı bir ışık görürseniz, yerinizi bulmanıza yardım etmek için orada değildir.'],
      ],
      pine_ottoStag: [
        ['otto', 'O Geyikti. Dinler. Başını eğdiğinde aranıza sağlam bir şey koyun. Bir ağaç. Bir araba. Başka hiçbir şey için durmaz.'],
      ],
      pine_draw: [
        ['lyle', '[alandaki bütün hoparlörlerden aynı anda: bir cızırtı, bir nefes, mikrofona fazla yakın duran bir adam]'],
        ['lyle', 'Bayanlar baylar. Şanslı bilet. Bin dokuz yüz yetmiş altı için bir sezon kartı.'],
        ['lyle', 'Numara on bir... kırk yedi.'],
        ['lyle', 'On bir kırk yedi. On bir kırk yedi burada mı?'],
        ['lyle', 'Makine dairesine gel, evlat. Söz vermiştim.'],
      ],
      pine_otto2: [
        ['otto', 'Pinewood kutusu. Çizme içinden gitti. Yerinde bir bilet koçanı var. Biri üstüne kurşunkalemle yazmış: “Kazanan.”'],
      ],
    },
    recap: {
      pinewood: 'Pinewood Açık Hava Sineması, 1975’in son gecesi. Makinist Lyle Hardy polise çocukların makine dairesine hiç gelmediğini ve hiçbir şey görmediğini söyledi. Sekiz yaşındaki Mikkel Strand çekiliş için koçanıyla makine dairesine gelmiş, geri gönderilmiş ve Lyle seyrederken kırmızı bir ışığın peşinden ağaçlara girmişti. Oğlanın koçanını kutuya attım ve alandaki bütün hoparlörler onun numarasını okudu. Sonra babasının arabasıyla kapıdan çıktım.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
