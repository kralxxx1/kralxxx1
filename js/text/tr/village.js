/* Türkçe — 6. Bölüm: Sığ Su (Gammel Ostra). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      village: {
        name: '6. BÖLÜM', title: 'Sığ Su', place: 'Gammel Ostra, Ostra vadisi',
        intro: 'Cuma, 2 Ekim 1964, karanlık bastıktan sonra, yağmurda.\n\nBaraj kapakları bu sabah altıda kapandı. Her kapı direğindeki afişte dokuzu yazıyor. Köy boş ve nehir alçak yerlerde çoktan taştı. Bir evin penceresinde hâlâ bir lamba yanıyor.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Bir kapı direğinde duyuru', from: 'İlçe Müdürlüğü', date: 'Eylül 1964', body:
`OSTRA NEHRİ DÜZENLEMESİ

Baraj kapakları kapanacak ve vadi
9 EKİM 1964 CUMA günü sular altında kalacaktır.

Bütün sakinlerin bu tarihe kadar Gammel Ostra’yı terk etmiş olması gerekir. Taşıma kamyonları her sabah 8’de okul bahçesinden kalkar.

(Bu kopyada 9’un üstü kırmızı kalemle çizilmiş ve üstüne 2 EKİM CUMA yazılmış. Direklerdekilerin hepsi düzeltilmemiş.)` },
      village_torLetter: { kind: 'letter', title: 'Mutfak masasında bir mektup', from: 'Tor', date: '24 Eylül 1964', body:
`Anne,

Gazeteye yazmayı bırak. Hiçbir işe yaramıyor ve kurul her kelimeyi okuyor.

Kapaklar 9’unda, cuma günü kapanacak. Dünya kadar vaktin var. 8’inin sabahı arabayla gelip eşyalarını yükleyeceğiz, sen de aklı başında bir kadın gibi Halvard’a, Ingrid’in yanına ineceksin; yolda bana istediğin kadar kızabilirsin.

Saçma bir şey yapma.
Tor` },
      village_diary: { kind: 'report', title: 'Şantiye günlüğü, baraj bekçisinin kulübesi', from: 'T. Holm, şantiye mühendisi', date: 'Eylül–Ekim 1964', body:
`28.9  Kurul kapatmayı bir hafta öne aldı: kapaklar 2.10’da, 06.00’da kapanacak. Bu akşam radyoda duyuruldu. Afişler düzeltilecek.
      Annemin radyosu yok. Onu almaya gidince kendim söylerim. O gün daha kolay olur.
29.9  Dolusavak dökümü ertelendi. Yağmur.
1.10  Döküm bütün gece sürdü. Ayrılamadım. Halvard’da Ingrid’i aradım: annem ona 8’inde geleceğimi söylemiş, Ingrid merak etmesin.
2.10  06.00 Kapaklar programa göre kapandı. Vadi doluyor.
      Eve çıkmadım.

(Bu elden başka kayıt yok.)` },
      village_ingrid: { kind: 'note', title: 'Tavan arasında bir sandığa bağlı etiket', from: 'I.', date: '30.9.64', body:
`ANNEMİN EŞYALARI — HALVARD’A

Evinden çıkmayacağını, konunun kapandığını söylüyor. Tor 8’inde onu almaya geleceğini söylüyor.
Müzik kutusunu aldım ki gelip almak için bir sebebi olsun.
— I.` },
      village_removal: { kind: 'report', title: 'Öğretmen masasındaki taşınma listesi', from: 'Gammel Ostra okulu', date: 'Ekim 1964', body:
`Aas, Olav, 64 — oğlunun yanına, Nordvik — 21.9’da gitti
Berg ailesi (5) — Halvard — 23.9’da gitti
Dahl, Marit, 80 — Ostra’daki huzurevine — 25.9’da gitti
Holm, Signe, 71, Stuegata 4 — kızının (I. Lind) yanına, Halvard — oğlu götürecek, 8.10
Kvam, Per ve Anna — 26.9’da gitti

(Biri dışında bütün satırlar işaretlenmiş.)` },
      village_parish: { kind: 'note', title: 'Kilise odası masasında bir not', from: 'Papaz A. Rø', date: '27.9.64', body:
`Bugün son ayin. Çanlar 30’unda indiriliyor.
Koro akşam ilahisini bir kez daha söylemek istedi, kilise neredeyse boş olsa da izin verdim.

Bayan Holm, kendisi köydeyken kilisenin kapatılmamasını istedi. Rab kapanmaz dedim. Kurul başka türlü düşünüyor.

Yaşlıların evlerinin anahtarları taşınmaya kadar kilise odasındaki panoda.` },
      village_shop: { kind: 'note', title: 'Dükkânın veresiye defteri, açık', from: 'Gammel Ostra Bakkalı', date: 'Ekim 1964', body:
`1.10  Bayan Holm — gaz yağı, 2 litre. Kibrit. Kahve, ¼ kg. Veresiye.
        (8’inde ödeyeceğini söylüyor.)

(Dükkân aynı akşam kapandı. Raflar bomboş.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Yastığın altında bir resim', from: 'Wren, 7 yaşında', body:
`Pastel boya, nemden yumuşamış. Yeşil suyun altında beyaz bir kilise; kulenin yanından balıklar yüzüyor. Yanında küçük kırmızı bir ev, penceresinde elinde lamba tutan beyaz saçlı bir kadın. Suyun üstünde küçük kırmızı kuş.

Altında:
UYUMADAN BEKLEDİ` },
    },
    items: {
      signeKey: { name: 'Ev anahtarı', desc: 'Kırmızı bir ip halkasında. Kâğıt bir etiket: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Müzik kutusu', desc: 'Gül ağacından, kapağında küçük bir dansçı. Kurulunca neredeyse bildiğin bir vals çalıyor.' },
    },
    obj: {
      village_start: 'Lambayı kimin yaktığını bul',
      village_key: 'Lambalı evin anahtarını bul',
      village_box: 'Şöminenin üstünde eskiden ne durduğunu bul',
      village_mantel: 'Müzik kutusunu şömine rafına geri koy',
      village_run: 'Su geliyor. Barajdaki merdivene git',
      village_climb: 'Tırman',
    },
    mono: {
      village_start: 'Bir köy. Boş. Ağaçların hepsi kesilmiş. Bir pencerede ışık var.',
      village_locked: 'Kilitli. İçeride bir lamba yanıyor ve kapıyı açan yok.',
      village_church: 'Şarkı söylüyorlar. Karanlıkta, yüzleri sunağa dönük. Ses çıkarma.',
      village_silence: 'Durdular.',
      village_turn: 'Arkalarına dönüyorlar.',
      village_resume: 'Yeniden söylüyorlar.',
      village_key: 'S. Holm, Stuegata 4. Holm. Tanıdık bir isim.',
      village_school: 'Okul. Kamyonlar buradan kalkıyormuş.',
      village_list: 'Holm, Signe. Kızının yanına, I. Lind. Lind. I. Lind anneannem.',
      village_attic: 'Sandıklar. Etiketler. Koca bir köy kutulara doldurulmuş.',
      village_box: 'Bir müzik kutusu. “Annemin eşyaları.” Annesi. Anneannemin annesi.',
      village_house: 'Lamba yanıyor. Soba sıcak. Kimse yok.',
      village_dust: 'Şömine rafındaki tozda temiz bir kare var. Burada uzun süre bir şey durmuş.',
      village_placed: 'İşte. Onu koyduğun yerde.',
      village_claimed: 'Kendi kendine çalıyor. Saat vuruyor. Saat altı.',
      village_water: 'O gürleme. Su. Geliyor.',
      village_ladder: 'Merdiven. Yukarı. Çık.',
      village_top: 'Tepe. Bütün vadi su.',
      village_gran: 'Anneannem burada bir annesi olduğunu hiç söylemedi. Bir kez bile.',
    },
    lines: {
      village_mantelLook: 'Şömine rafı',
      village_mantelPut: 'Müzik kutusunu şömine rafına koy',
      village_ladderPrompt: 'Merdivene tırman (W’ye basılı tut)',
      village_wellLook: 'Bir kuyu',
    },
    radio: {
      village_otto1: [
        ['radio', '[paraziti döven yağmur]'],
        ['otto', 'Dokuzdan Ada’ya. Yağmur, boş bir köy, bir baraj mı? Gammel Ostra. Bende onun koca bir rafı var. Çoğu kapı tokmağı. İnsanlar anahtarlarını alıp tokmakları bırakıyor.'],
        ['ada', 'Şarkı söyleyen var. Kilisede.'],
        ['otto', 'Bırakın söylesinler. Söylerken sunağa bakarlar. Dururlarsa nedenini görmeyi beklemeyin.'],
      ],
      village_otto2: [
        ['otto', 'Ada. Rafımda kendi kendine çalmaya başlayan bir müzik kutusu var. Buradaki yerdeki su yükseliyor. Yerinizde olsam giderdim. Hemen şimdi giderdim.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 Ekim 1964. Büyük büyükannem Signe Holm evinden çıkmak istemedi. Barajın mühendisi olan oğlu Tor ona kapakların dokuzunda kapanacağını söyledi; ikisinde kapandılar ve o eve çıkmadı. Anneannem Tor’un onu almaya gittiğini sandı. Su geldiğinde lamba hâlâ yanıyordu. Müzik kutusunu şömine rafına geri koydum, sonra vadi altımda dolarken barajı tırmandım.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
