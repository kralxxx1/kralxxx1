/* Türkçe — 8. Bölüm: Parlak Işıklar (Falk Lunaparkı). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      carnival: {
        name: '8. BÖLÜM', title: 'Parlak Işıklar', place: 'Falk Lunaparkı, Halvard limanı',
        intro: 'Pazar, 30 Eylül 1984, gece yarısına az var. Sezonun son gecesi.\n\nKalabalık evine gitti. Işıklar açık bırakılmış. Hayalet treni önceki gece yandı ve yaşlı palyaçoya eşyalarını toplaması söylendi.',
      },
    },
    docs: {
      carnival_poster: { kind: 'notice', title: 'Bilet gişesinde bir afiş', from: 'Falk Lunaparkı', date: 'Eylül 1984', body:
`FALK LUNAPARKI
Halvard Limanı — 14–30 Eylül
SON GECELER!

Büyük Atlıkarınca · Dönme Dolap
Eğlence Evi — GÜLEN LOTTE ile tanışın!
HAYALET TRENİ (cesaretiniz varsa)
Ördek Yakalama · Atış Galerisi · Gücünü Dene

ve her öğleden sonra 4’te ve 7’de:
PALYAÇO PİPO
“Halvard’ın kendi palyaçosu, yirmi bir sezondur”` },
      carnival_closing: { kind: 'notice', title: 'Kapıya tellenmiş bir duyuru', from: 'E. Falk, işletmeci', date: '30.9.84', body:
`HAYALET TRENİ KAPALIDIR.

Cumartesi gecesi çıkan yangın nedeniyle hayalet treni bu sezon bir daha çalışmayacaktır. Kimse yaralanmadı.

İşletme halka ve Halvard İtfaiyesi’ne teşekkür eder, yaşanan hayal kırıklığı için özür diler.

Falk Lunaparkı Salı sabahı Halvard’dan ayrılıyor. Seneye görüşmek üzere!` },
      carnival_fire: { kind: 'report', title: 'Kontrol kulübesinde yangın raporunun bir kopyası', from: 'Halvard İtfaiyesi', date: '30 Eylül 1984', body:
`Olay 84/211. Falk Lunaparkı, liman. İhbar 01.40, 30.9.84.
Karanlık yolculuk tünelinde (“Hayalet Treni”) yangın. 02.15’te söndürüldü. Yaralı yok.

Yangının çıktığı yer: tünelin arkasındaki operatör kabini, bir çöp kovası.
Muhtemel neden: söndürülmemiş bir sigara.

İşletmeci Bay E. Falk, çalışanı H. Brecht’in (palyaço) kabinde uyuduğunu ve orada sigara içtiğini beyan ediyor. Bay Brecht işten çıkarılmış olup ifadesi alınamadı. İşletmecinin oğlu K. Falk, 19, olay yerinde değildi.

Memurun notu: kovada iki çeşit izmarit. Birinde ruj izi.` },
      carnival_kasper: { kind: 'letter', title: 'Yanık masanın üstünde, hiç postalanmamış bir zarf', from: 'K.', date: '1 Ekim 1984', body:
`Hugo,

Bendim. Ben ve Mette, kapanıştan sonra kabinde; babamın geldiğini duyunca bakmadan tenekeyi kovaya attım.

Babam biliyor. Babam olan oldu diyor, sen zaten yakında bırakacaktın diyor, sana iki haftalık para verdi. Senin yaptığını söylediğinde bana baktın. Hiçbir şey söylemedin. Neden hiçbir şey söylemedin bilmiyorum.

Özür dilerim. Özür dilerim.
K.

(Zarfın üstünde: “Pipo”. Adres yok. Arkasında, aynı elle: “nereye göndereyim”)` },
      carnival_ledger: { kind: 'report', title: 'Dönme dolap kulübesinde işletmecinin defteri', from: 'E. Falk', date: 'Eylül 1984', body:
`29.9 Hasılat, bütün oyuncaklar — 14.220. Hayalet treni: kapanıştan sonra yangın (01.40). Hizmet dışı.
30.9 Brecht, H. (“Pipo”). 21 sezon. Hesabı kesildi: iki haftalık para, nakit. Tekrar işe alınmayacak.
     Sigorta talebi, hayalet treni: arka kabinde sigara içen çalışanın (Brecht) çıkardığı yangın. İfade E.F. tarafından imzalandı.
     K. — Salı kamyonu Ostra’ya sürecek. Oyalansın.` },
      carnival_rosa: { kind: 'note', title: 'Maske tezgâhının altına iğnelenmiş bir not', from: 'Rosa, maskeler ve hediyelik eşya', date: '30.9.84 gecesi', body:
`Pipo gece yarısı bavuluyla tezgâhımın önünden geçti. Yüzünü çoktan çıkarmıştı, yüz yaşında gibi görünüyordu.

Cebinden burnunu çıkarıp tezgâhıma koydu ve “Buna göz kulak ol, Rosa” dedi.

Nereye gittiğini sordum. “Eve” dedi. Evi yok ki. Yirmi yıldır o karavanda yaşıyor.

Burnu kimse almasın diye tezgâhın altına koydum. — R.` },
      carnival_hugo: { kind: 'note', title: 'Ayna çerçevesine sıkıştırılmış bir kart', from: 'Hugo Brecht', date: '(çok eski, üstüne defalarca yazılmış)', body:
`İhtiyar Bruno’nun bana öğrettikleri, 1931:

Yüz şu sırayla takılır. Beyaz. Sonra kırmızı. Sonra siyah. Sonra burun.
Burun en son takılır, en önce çıkar.
Burun takılıyken Pipo’sun ve hiçbir şey sana zarar veremez.
Çıkarınca yalnızca Hugo’sun. O yüzden onu nerede çıkardığına dikkat et.

Burun aynanın üstünde yaşar. Asla cepte değil.` },
      carnival_fan: { kind: 'letter', title: 'Yatağın üstünde bir çocuğun mektubu', from: 'Tomas, 7 yaşında', date: 'Eylül 1984', body:
`Sevgili Pipo

Bana balondan yaptığın köpek için teşekkür ederim. Hâlâ duruyor. Biraz söndü.

Büyüyünce palyaço olup düşme numarasını yapmak istiyorum.

sevgiler Tomas

(Pastel boyayla bir resim: burnu kafası kadar büyük bir palyaço, düşüyor, herkes gülüyor.)` },
      carnival_paper: { kind: 'clipping', title: 'Bir bankın üstünde bir gazete sayfası', from: 'Halvard Liman Haberleri', date: 'Perşembe, 4 Ekim 1984', body:
`PALYAÇONUN BAVULU LİMAN MERDİVENLERİNDE BULUNDU

Halvard çocuklarının üç kuşağının Palyaço Pipo olarak tanıdığı 71 yaşındaki Hugo Brecht’e ait eski püskü kahverengi bir bavul Pazartesi sabahı balık iskelesinin altındaki merdivenlerde bulundu.

Bay Brecht, Cumartesi gecesi hayalet treninde çıkan ve işletmecinin ona yüklediği yangından sonra Falk Lunaparkı’ndaki işinden çıkarılmıştı. O günden beri görülmedi. Pazar gecesi onu gören herkesin liman polisine başvurması isteniyor.

Lunapark Salı günü Halvard’dan ayrıldı.` },
      wren8: { kind: 'drawing', drawing: 8, title: 'Eğik odanın zemininde bir resim', from: 'Wren, 7 yaşında', body:
`Pastel boya, kâğıt dörde katlanmış. Kırmızı burunlu, koca kahverengi bavullu bir palyaço, denize doğru giden bir yolda uzaklaşıyor, kolunu sonuna kadar kaldırıp el sallıyor. Arkasında ışıklarla dolu bir dönme dolap. Küçük kırmızı kuş şapkasının üstünde oturuyor.

Altında:
GÜLE GÜLE PİPO` },
    },
    items: {
      fuse: { name: 'Sigorta', desc: 'Porselen ve pirinçten bir kartuş sigorta. 60 A. Eğlence evinin atölyesinden.' },
      nose: { name: 'Pipo’nun burnu', desc: 'Kırmızı, kullanılmaktan parlamış bir palyaço burnu. Çok yüze takılmış, ama hep tek bir yüze.' },
    },
    obj: {
      carnival_start: 'Lunaparktan çıkmanın bir yolunu bul',
      carnival_power: 'Hayalet treni çitin dışına çıkıyor. Çalıştır onu',
      carnival_fuse: 'Bir sigorta bul: eğlence evinin atölyesine bak',
      carnival_fit: 'Sigortayı hayalet treninin kontrol kulübesine tak',
      carnival_why: 'Pipo’ya ne olduğunu öğren',
      carnival_nose: 'Pipo’nun geride bıraktığını bul',
      carnival_mirror: 'Pipo’nun burnunu aynasına geri koy',
      carnival_ride: 'Hayalet treniyle dışarı çık',
    },
    mono: {
      carnival_start: 'Bir lunapark. Gece için kapanmış, bütün ışıkları açık bırakılmış.',
      carnival_gate: 'Zincirli. Çit de üç metre tel örgü, tepesi dikenli tel.',
      carnival_booth: 'Kulübe boş. Camı kırık. İçeriden.',
      carnival_lotte: 'Biri gülüyor. Çok uzakta. Nefes almak için hiç durmuyor.',
      carnival_ghost: 'Hayalet treni. Yanıp kül olmuş. Ray içinden geçip arkadan, çitin dışına çıkıyor.',
      carnival_noPower: 'Ölü. Sigorta yuvası boş, eski sigorta tepside kapkara.',
      carnival_fuse: 'Bir sigorta. Altmış amper. Doğru görünüyor.',
      carnival_power: 'İçeride ışıklar. Vagonlar hâlâ kıpırdamıyor. Bir şey tutuyor.',
      carnival_maze: 'Aynalar. Ben, ben, ve her birinde arkamda duran biri. Arkamda kimse yok.',
      carnival_masks: 'Maskeli insanlar ortalıkta dikiliyor. Bir dakika önce orada değillerdi.',
      carnival_nose: 'Burnu. “Buna göz kulak ol, Rosa.”',
      carnival_music: 'Org başladı. Kendi kendine.',
      carnival_horses: 'Atlar. Atlıkarıncadan iniyorlar.',
      carnival_stopped: 'Müzik durdu. Onlar da durdu. Tam oldukları yerde.',
      carnival_trailer: 'Karavanı. Aynanın ışıkları yanıyor.',
      carnival_mirrorLook: 'Aynası. Cam rafta, hep bir şeyin durduğu yerde temiz, yuvarlak bir iz.',
      carnival_placed: 'İşte. Yalnızca Hugo olduğunda yaşadığı yer.',
      carnival_claimed: 'Aynanın çevresindeki ampuller birer birer sönüyor.',
      carnival_running: 'Lunaparkın öbür ucunda bir şey çalıştı. Hayalet treni.',
      carnival_notYet: 'Ray arkadan dışarı çıkıyor. Ama elektriksiz çalışmaz.',
      carnival_board: 'Bara tutun.',
      carnival_out: 'Liman merdivenleri. En alttakinde kahverengi bir bavul, üstünden yükselen gelgit.',
      carnival_kasper: 'Yazmış ve hiç göndermemiş. “Nereye göndereyim.”',
      carnival_fence: 'Arka duvardan, çitin içinden.',
    },
    lines: {
      carnival_boothPrompt: 'Sigortayı tak',
      carnival_boothLook: 'Oyuncağın kumandaları',
      carnival_mirrorPut: 'Burnu aynaya koy',
      carnival_mirrorLook: 'Pipo’nun aynası',
      carnival_ridePrompt: 'Vagona bin',
      carnival_rideLook: 'Bir hayalet treni vagonu',
    },
    radio: {
      carnival_otto1: [
        ['radio', '[uzakta, akortsuz bir panayır orgu]'],
        ['otto', 'Dokuzdan Ada’ya. Bir lunapark duyuyorum. Bende oyuncaklar için küçük kâğıt biletlerle dolu bir raf ve bir kırmızı burun var. Bunu neden söylediğime dair hiçbir fikrim yok.'],
        ['ada', 'Kapı zincirli.'],
        ['otto', 'Lunaparkların çitleri insanlar ödemeye devam etsin diyedir, içeride kalsınlar diye değil. Her zaman personelin kullandığı bir çıkış vardır. Rayları izleyin.'],
      ],
      carnival_otto2: [
        ['otto', 'Ada. Yüz takmış hiçbir şeyin yanında kıpırdamadan durmayın. Müzik başlarsa, çaldığı sürece hareket edin. Durduğunda, onunla dans eden her şey de durur.'],
      ],
      carnival_otto3: [
        ['otto', 'Burun rafımdan gitti. Güzel. Saklamak hiç bana düşmezdi. Bir raf daha, Ada; o da bütün gece yürüyüp durduğunuz raf.'],
      ],
    },
    recap: {
      carnival: 'Falk Lunaparkı, 30 Eylül 1984. On dokuz yaşındaki Kasper Falk hayalet trenini bir sigarayla tutuşturdu; babası itfaiyeye bunun yaşlı palyaço Hugo Brecht olduğunu söyledi ve onun hesabını kesti. Hugo hiçbir şey söylemedi. Burnunu maske tezgâhındaki Rosa’ya bıraktı ve bavuluyla kapıdan çıkıp gitti; bavul liman merdivenlerinde bulundu. Burnunu yaşadığı yere, aynasına geri koydum ve hayalet treniyle çitin dışına çıktım.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
