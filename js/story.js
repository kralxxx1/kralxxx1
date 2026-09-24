/* Hikâye: karakterler, notlar, kasetler, bölüm tanımları, hedefler ve sonlar. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});

  const CHAR = {
    deniz: { name: 'Deniz Kaya', role: 'Otomat teknisyeni, 24 yaşında. Sen.' },
    mahir: { name: 'Mahir Aksoy', role: 'Yıldız Atari Salonu’nun sahibi. Elektronik mühendisi. 29 Kasım 1994’ten beri kayıp.' },
    bulent: { name: 'Bülent Kaplan', color: '#ff2a2a', ghost: 'blinky', nick: 'Gölge', role: 'Taksici, 34 yaşında. Hep ilk olmak isteyen.' },
    pinar: { name: 'Pınar Ersoy', color: '#ff9ad5', ghost: 'pinky', nick: 'Pusucu', role: 'Reklam metin yazarı, 22 yaşında. Hep bir adım önde.' },
    inci: { name: 'İnci Demir', color: '#39e6ff', ghost: 'inky', nick: 'Kararsız', role: 'Yüzücü, 19 yaşında. Hiçbir zaman emin olamayan.' },
    cemil: { name: 'Cemil Arslan', color: '#ffae3b', ghost: 'clyde', nick: 'Utangaç', role: 'Liseli, 16 yaşında. Kimsenin gözüne bakamayan.' },
  };

  // ------------------------------------------------------------------ NOTLAR
  const N = {};
  const note = (id, o) => { N[id] = Object.assign({ id }, o); };

  // PROLOG — Atari salonu, 30 Kasım 1994
  note('p_sticky', { level: 'prolog', kind: 'not', title: 'Kabinin üstündeki sarı kâğıt', from: 'M.A.', body:
`FİŞİNİ ÇEKME.

Ne olursa olsun çekme. Sesleri duysan da çekme. Özellikle sesleri duyarsan çekme.

Temizlikçi kadın: bu makinenin tozunu almayın lütfen.` });
  note('p_flyer', { level: 'prolog', kind: 'duyuru', title: 'Camdaki kapanış duyurusu', from: 'Yıldız Atari Salonu', date: 'Kasım 1994', body:
`DEĞERLİ MÜŞTERİLERİMİZ,

Salonumuz 30 Kasım 1994 tarihi itibarıyla KAPANMIŞTIR.

On üç yıl boyunca jetonlarınızı, bağırışlarınızı ve rekorlarınızı bizimle paylaştığınız için teşekkür ederiz. Kalan jetonlar iade edilmeyecektir.

Not: Rekor tablosundaki isimler silinmeyecek. Söz.` });
  note('p_ledger', { level: 'prolog', kind: 'defter', title: 'Mahir Usta’nın hesap defteri', from: 'Mahir Aksoy', date: '1987–1994', body:
`Nisan 87 — Elektrik: 41.000 TL. Normalin iki katı. 7 numaralı kabin tek başına salonun yarısını çekiyor.

Ekim 89 — Elektrik: 380.000 TL. Kiracıya "soğutucu arızalı" dedim.

Mart 92 — Kabin kapalıyken bile sayaç dönüyor. Kapalı değil aslında. Hiç kapanmadı.

Kasım 94 — Borç: ödenemez. Bina sahibi otomatları ayın 30’unda boşaltacakmış.

Bir yolu kalmadı. İçeri gireceğim. Jetonu masada bırakıyorum, çünkü bir aptal mutlaka onu bulup atacak. Belki de o aptal benim.` });
  note('p_photo', { level: 'prolog', kind: 'fotograf', title: 'Panoya iğnelenmiş fotoğraf', from: 'Arkasında kurşun kalemle', date: '16 Nisan 1987', body:
`Beş kişi, 7 numaralı kabinin önünde. Herkes gülüyor, bir kişi hariç.

Arkasındaki yazı:
"256’dan bir gece önce. Bülent yine ortada, Pınar yine kulaklıkla, İnci gözlüğünü unutmuş, Cemil yine yere bakıyor. Ben fotoğrafı çektim, o yüzden yokum. Keşke olsaydım. — M."

Ama fotoğrafta beş kişi var.` });
  note('p_letter', { level: 'prolog', kind: 'mektup', title: 'Açılmamış bir mektup', from: 'Nermin (kız kardeşi)', date: 'Ekim 1994', body:
`Abi,

Kaç kere aradım, telefon hep meşgul. Annem seni soruyor. Yedi yıldır o salondan çıkmıyormuşsun, komşular öyle diyor.

O dört çocuğun ailelerine borçlu değilsin. Polis bile "kendi istekleriyle gittiler" dedi. Kimse seni suçlamıyor.

Sadece sen suçluyorsun.

Eve gel. Makineyi sat, parçala, ne yaparsan yap. Ama o ekrana bakmayı bırak.

— Nermin` });
  note('p_mirror', { level: 'prolog', kind: 'duvar', title: 'Aynaya ruj ile yazılmış', body:
`SAYIYORUM

253
254
255

256’YI SAYAMIYORUM` });
  note('p_tape', { level: 'prolog', kind: 'kaset', title: 'Kaset: "Son kayıt"', from: 'Mahir Aksoy', date: '29 Kasım 1994, 23:48', body:
`[Teyp tıkırtısı. Arkada kabinin cızırtısı.]

Adım Mahir Aksoy. Eğer bunu dinliyorsan, jetonu bulmuşsun demektir. Ya da ben bulamayıp geri döndüm ve bunu kendime dinletiyorum.

Pacman’in 256. seviyesi bir hatadır. Seviye sayacı taşar, ekranın sağ yarısı çöple dolar. Herkes öyle bilir. Ben bilmiyorum. Ben o çöpün içine dört kişi gönderdim.

Oradaki şey bir yer. Makinenin sayamadığı her şeyin durduğu yer. Koridorlar, odalar, ışıklar... sarı. Hep sarı.

Kabine jetonu atan içeri girer. Ben şimdi atacağım.

Eğer içeride beni görürsen... kaç. Beni tanıdığını sanma.

[Uzun bir sessizlik. Ardından çok uzaktan, alçak bir "vaka... vaka..." sesi.]` });

  // SEVİYE 0 — Sarı Odalar
  note('l0_first', { level: 'l0', kind: 'not', title: 'Duvara bantlanmış kâğıt', from: 'imzasız', body:
`Yeni geldiysen:

1. Işıkların vızıltısını dinle. Sustuklarında, bir şey yaklaşıyordur.
2. Yerdeki sarı noktaları yeme. Onları o yer. Nereye gittiğini noktalardan anlarsın: noktalar yoksa oradan geçmiştir.
3. Büyük, parlayan hapları topla. Kapıyı onlar açar. Bir de... onu korkutan tek şey onlar.
4. Koşma. Sesini duyar.` });
  note('l0_mahir1', { level: 'l0', kind: 'defter', title: 'Mahir’in defterinden bir sayfa', from: 'Mahir Aksoy', date: 'içeride, 1. gün (?)', body:
`Buraya düştüğümde saatim durdu. 23:59’da.

Duvar kâğıdı 1970’lerden kalma gibi. Halı ıslak, küf kokuyor. Floresanlar tek bir notada vızıldıyor: si bemol. Ömrüm boyunca kabin tamir ettim, o sesi tanırım. Bu bir balast arızası değil. Bu bir ses kaydı. Döngüye alınmış.

Burası bir oyun alanı değil. Burası oyunun kenarı. Ekranın dışında kalan her şey.

Onları bulacağım. Dördünü de.` });
  note('l0_wanderer', { level: 'l0', kind: 'not', title: 'Buruşturulmuş kâğıt', from: 'Selim, 1991', date: '?', body:
`Kimse okumayacak biliyorum ama yazıyorum.

Ben Mahir abinin salonuna hiç gitmedim. İzmir’de bir kahvehanede, bir Pacman makinesinde 255’i geçtim. Sonra buradaydım.

Demek ki tek makine değil. Demek ki 256’ya ulaşan herkes buraya düşüyor.

Sarı olanı gördüm. Ağzını açınca içinde ışık yok. Hiçbir şey yok. Karanlık bile değil.

Şimdi sesini duyuyorum. Vaka, vaka. Çok yakın.` });
  note('l0_bulent', { level: 'l0', kind: 'mektup', title: 'Bir kartpostal', from: 'Bülent Kaplan', date: 'Nisan 1987', body:
`Cemil’e,

Ödlek. Cumartesi gelmezsen herkese söylerim. Mahir abi bu sefer 256’yı göreceğimizi söylüyor. Tarihe geçeceğiz oğlum. Türkiye’de 256’yı gören ilk ekip!

Sen sadece jeton at, gerisini ben hallederim. Hep ben hallederim zaten.

— Kaptan Bülent

(Arkasında başka bir el yazısı: "Keşke gitmeseydim." — C.)` });
  note('l0_chairs', { level: 'l0', kind: 'duvar', title: 'Sandalye odasındaki yazı', body:
`KAÇ SANDALYE VAR SAY

SAYDIN MI

BİR TANE EKSİK

O SENİNKİ` });
  note('l0_mahir2', { level: 'l0', kind: 'defter', title: 'Mahir’in defteri, yırtık sayfa', from: 'Mahir Aksoy', date: 'içeride, 9. gün (?)', body:
`Haplar. Oyundaki büyük haplar burada da var. Birini yuttuğumda her şey bir an için mavileşti ve Sarı olan benden kaçtı. İlk defa. Sekiz saniye.

Hapları yemeye devam etmeliyim. Her birinde biraz daha güçlü hissediyorum. Biraz daha... aç.

Sarı olanın izini sürüyorum. Pelletleri o yiyor, ben de onun arkasından yürüyorum. Yolun yarısında pelletlerin tadını merak ettim. Bu normal mi?` });
  note('l0_exit', { level: 'l0', kind: 'duvar', title: 'ÇIKIŞ kapısının yanında kazınmış', body:
`DÖRT HAP DÖRT YUVA
DÖRT KİŞİ DÖRT YUVA
KAPI HER SEFERİNDE BİR KİŞİYİ ALIR` });
  note('l0_tape', { level: 'l0', kind: 'kaset', title: 'Kaset: "Kamp"', from: 'Mahir Aksoy', date: 'içeride', body:
`[Hırıltılı bir nefes.]

Burayı kamp yaptım. Işıklar burada titremiyor. Neden bilmiyorum, belki bu oda oyunun kodunda bir yerde "güvenli" diye işaretlidir.

Teypler çalışıyor. Garip değil mi? Kendi sesimi buraya kaydediyorum ve bir sonraki gelen dinleyecek. Bir kere, çok eskiden, kendi sesimi dinlediğimi hatırlıyorum. Söylediklerimi daha söylemeden dinlemiştim.

Kırmızıyı gördüm bugün. Uzakta, bir koridorun sonunda. Bülent’in yürüyüşüyle yürüyordu. Seslendim.

Bana doğru koşmaya başladı.

[Kayıt kesilir.]` });

  // SEVİYE 1 — Beton Depo (Bülent)
  note('l1_intro', { level: 'l1', kind: 'not', title: 'Asansör kapısına yapıştırılmış', from: 'imzasız', body:
`ASANSÖR ÇALIŞMIYOR
SİGORTA PANOSU BOŞ
3 SİGORTA LAZIM

(Altına başka bir kalemle:)
Kırmızı olan hiç durmaz. Onu gördüğün an köşeyi dön. Düz koridorda kaçamazsın.` });
  note('l1_bulent1', { level: 'l1', kind: 'defter', title: 'Taksimetre fişlerinin arkası', from: 'Bülent Kaplan', date: '?', body:
`Kaç gündür koşuyorum bilmiyorum. Saatim 03:17’de durdu. Salonun kepengi o saatte inmişti.

Bu depoda raflar bitmiyor. Her rafın numarası var ama sıra yok. 17’den sonra 4 geliyor, 4’ten sonra 212.

Diğerlerini kaybettim. Pınar "buradan" dedi, İnci "hayır buradan" dedi, Cemil hiçbir şey demedi. Ben koştum. Ben hep koşarım.

Durursam yetişemem.` });
  note('l1_bulent2', { level: 'l1', kind: 'defter', title: 'Islanmış fişler', from: 'Bülent Kaplan', date: '?', body:
`Bir şey oluyor bana. Kırmızı. Ellerim kırmızı ışık gibi parlıyor.

Birini gördüm, arkası dönüktü, yaklaştım ve o anda içimde bir şey dedi ki: YAKALA.

Oyunun kuralı bu. Hayaletler kovalar. Ben de artık bir hayaletim, değil mi?

Kimse kalmadı. Durursam... Durursam kim olduğumu hatırlarım. Hatırlamak istemiyorum. Cemil’i ben zorla getirdim.` });
  note('l1_forklift', { level: 'l1', kind: 'ciktı', title: 'Sevk irsaliyesi', from: 'Yıldız Otomatçılık Depo', date: '17.04.1987', body:
`GÖNDEREN: Yıldız Atari Salonu, Moda
ALICI: —
İÇERİK: 1 adet Pacman kabini (özel sürüm), seri no 0256
AÇIKLAMA: "Ekranın sağ yarısı arızalı. İade değil. Tamir değil. SAKLAMA."

Teslim alan imzası yerinde bir çocuk çizimi var: dört hayalet ve ortada ağzı açık sarı bir daire.` });
  note('l1_mahir3', { level: 'l1', kind: 'defter', title: 'Mahir’in defteri', from: 'Mahir Aksoy', date: 'içeride, ? gün', body:
`Bülent’i gördüm. Artık Bülent değil. Kırmızı bir çarşaf, iki beyaz göz. Ama saatini hâlâ takıyordu, bileğinde değil, içinde bir yerde. Tik tak sesi geliyordu ondan.

Saatini ona geri verirsem... Belki hatırlar.

Saati aradım. Buldum sanırım: bir rafın en üstünde, kırık camlı bir kol saati. 03:17.

Ama Bülent’e yaklaşamadım. Beni kovalamadı. Benden kaçtı. İlk defa.

Neden benden kaçıyor?` });
  note('l1_graffiti', { level: 'l1', kind: 'duvar', title: 'Sprey boyayla', body:
`KIRMIZI DÜZ YOLDA SENDEN HIZLI
KÖŞEDE DEĞİL

KÖŞE DÖN
KÖŞE DÖN
KÖŞE DÖN` });
  note('l1_tape', { level: 'l1', kind: 'kaset', title: 'Kaset: "Bülent, 1987"', from: 'Bülent Kaplan', date: '16 Nisan 1987', body:
`[Salon gürültüsü, jeton şıkırtısı, gülüşmeler.]

BÜLENT: Kayıtta mı bu? Tamam. Ben, Bülent Kaplan, yarın gece Pacman’in 256. seviyesine ulaşacak ekibin kaptanı olarak söz veriyorum...

PINAR: Kaptan kim seçti seni?

BÜLENT: ...söz veriyorum ki kimseyi geride bırakmayacağım. Hepimiz birlikte gireceğiz, hepimiz birlikte çıkacağız.

CEMİL: (çok alçak sesle) Ya çıkamazsak?

BÜLENT: Çıkarız oğlum. Ne olacak, oyun bu.

[Kahkahalar. Kayıt biter.]` });
  note('l1_shrine', { level: 'l1', kind: 'not', title: 'Türbedeki fotoğrafın altında', from: 'imzasız', body:
`Burada biri beklerdi. Kırmızı ışığın altında, bir sandalyede, saatine bakarak.

Sandalye hâlâ ılık.

Bir şeyini getirirsen, belki uyanır.` });

  // SEVİYE 2 — Havuz Odaları (İnci)
  note('l2_intro', { level: 'l2', kind: 'not', title: 'Soyunma dolabına sıkıştırılmış', from: 'imzasız', body:
`Burası sakin. Çok sakin. Güvenme.

Su sesini taşır. Havuza girersen her adımın kilometrelerce yankılanır.

Ana havuzun dibinde bir kapak var. Dört vanayı çevir, su çekilsin. Vanalar gıcırdar. Mavi olan o sesi sever.` });
  note('l2_inci1', { level: 'l2', kind: 'defter', title: 'Islak defter sayfası', from: 'İnci Demir', date: '?', body:
`Gözlüğüm yok. Her şey bulanık. Havuzlar mavi lekeler, fayanslar beyaz lekeler.

Belki şuradadır. Hayır, belki oradadır. Bir yöne yüzüyorum, sonra vazgeçiyorum, sonra kendimi başka bir havuzda buluyorum. Yüzmüyorum bile. Sadece... oradayım.

Antrenörüm hep derdi: "İnci, karar ver. Dönüşte tereddüt eden kaybeder."

Hep kaybettim.` });
  note('l2_inci2', { level: 'l2', kind: 'defter', title: 'Fayansa kazınmış', from: 'İnci Demir', body:
`BURADAYIM
HAYIR ORADAYIM
BURADAYIM

Biri beni izliyor. Sadece bakmadığım zamanlarda yaklaşıyorum ona. Neden öyle yapıyorum bilmiyorum. Birden onun yanında buluyorum kendimi. Sonra o bağırıyor. Sonra ben de bağırıyorum.` });
  note('l2_mahir4', { level: 'l2', kind: 'defter', title: 'Mahir’in defteri', from: 'Mahir Aksoy', date: 'içeride, ? gün', body:
`Hapları yemeyi bırakamıyorum.

Dün (dün var mı burada?) bir pelleti ağzıma attım. Sonra bir tane daha. Tadı yoktu. Tadı yoktu ama duramadım.

Ellerim sarardı. Tırnaklarım yuvarlaklaşıyor.

İnci’yi gördüm. Uzaktan. Mavi. Bana baktı, sonra yok oldu, sonra arkamda belirdi. Yüzünü göremedim, gözlüğü yoktu. Onun gözlüğü benim cebimde, farkında olmadan almışım. 87’de, salonda, masada unutmuştu.

Gözlüğü soyunma odasına bırakıyorum. Ben ona yaklaşırsam kaçıyor.` });
  note('l2_sign', { level: 'l2', kind: 'duyuru', title: 'Havuz kuralları tabelası', from: 'Belediye Kapalı Yüzme Havuzu', body:
`HAVUZ KURALLARI

1. Duş almadan havuza girmeyiniz.
2. Koşmayınız. Koşmayınız. Koşmayınız.
3. Cankurtaran yokken yüzmeyiniz. Cankurtaran hiç yoktur.
4. Havuzdan çıkış merdivenlerini sayınız. Bir tane fazla varsa, onu kullanmayınız.
5. Saat 03:17’den sonra havuz kapanır. Saat hep 03:17’dir.` });
  note('l2_tape', { level: 'l2', kind: 'kaset', title: 'Kaset: "İnci — yarış öncesi"', from: 'İnci Demir', date: 'Mart 1987', body:
`[Yankılı bir havuz salonu. Uzakta düdük sesi.]

İNCİ: Anne, kaydediyor mu? Tamam. Yarın 100 metre serbest. İki seçenek var: ya ilk 50’de yüklenirim ya da sona saklarım. Ya da... ortada bir yerde?

(Gülüyor.) Görüyorsun, yine yapıyorum.

Bülent abi "gel bizimle Pacman oyna, reflekslerin gelişir" diyor. Belki giderim. Belki gitmem.

Belki giderim.

[Kayıt biter.]` });

  // SEVİYE 3 — Ofis Katı (Pınar)
  note('l3_intro', { level: 'l3', kind: 'not', title: 'Güvenlik odası kapısında', from: 'Güvenlik Amirliği', body:
`GÜVENLİK ODASI — YETKİSİZ GİRİŞ YASAKTIR

Şifre her gün değişir.
Bugünün şifresi: _ _ _ _

(Kalemle:) Şifreyi dört yere dağıttım, hep unutuyorum. Ekranlar, yazıcı, tahta, bir de yapışkan not. Hepsi olay tarihinden.` });
  note('l3_pinar1', { level: 'l3', kind: 'defter', title: 'Ajanda sayfası', from: 'Pınar Ersoy', date: '?', body:
`Pazartesi: Hayalet ol.
Salı: Birinin önüne geç.
Çarşamba: Nereye gideceğini bil. Oraya ondan önce var.
Perşembe: Pazartesi.

Reklam ajansında da böyleydim. Müşteri ne isteyecek, ben ondan önce bilirdim. "Pınar hep bir adım önde" derlerdi.

Şimdi de öyleyim. Buraya düşen her zavallının gideceği yeri biliyorum ve oraya ondan önce gidiyorum. Ne yapacağımı bilmiyorum oraya varınca. Sadece... varıyorum.` });
  note('l3_pinar2', { level: 'l3', kind: 'mektup', title: 'Kaset kutusunun içindeki kâğıt', from: 'Pınar Ersoy', date: 'Nisan 1987', body:
`"NİSAN 87" karışık kaset — A yüzü:

1. Salonun kepenk sesi (kayıt: ben)
2. Bülent’in rekor kırdığı an (bağırış, 14 saniye)
3. İnci’nin "belki"leri (derleme, 2 dakika)
4. Cemil’in gülüşü (bir kere güldü, kaydettim, 3 saniye)
5. Mahir abinin makine tamir ederken mırıldandığı şarkı

B yüzü boş. 256’dan sonra dolduracağız dedik.` });
  note('l3_memo', { level: 'l3', kind: 'ciktı', title: 'Yazıcıdan çıkan kâğıt', from: 'YAZICI 3. KAT', body:
`İÇ YAZIŞMA

KİME: Tüm personel
KONU: Sarı ziyaretçi

Son haftalarda koridorlarda "sarı, yuvarlak bir ziyaretçi" görüldüğüne dair şikâyetler artmıştır. Personelin bu ziyaretçiyle göz teması kurmaması, masaların altına saklanması ve IŞIKLAR TİTREDİĞİNDE yerinden kıpırdamaması rica olunur.

Ziyaretçinin personel kartı yoktur. Güvenlik odası ona açılmaz.

Şifre hanesi (3.): 0

— Yönetim` });
  note('l3_mahir5', { level: 'l3', kind: 'defter', title: 'Mahir’in defteri, son sayfalardan', from: 'Mahir Aksoy', date: 'içeride, sayamıyorum', body:
`Artık yürümüyorum. Yuvarlanıyorum.

Pınar beni gördü ve bu sefer kaçmadı. Önüme geçti. Bir koridorun sonunda bekliyordu, ben dönmeden oraydı. Bana baktı ve dedi ki:

"Mahir abi, ağzın."

Ağzım. Ağzım çok büyük. Çok büyük ve kapanmıyor.

Kaseti onun masasına bıraktım. Pembe Walkman’i. Benim hatam. Hepsi benim hatam.

Eğer bunu okuyorsan ve beni görürsen: köşeleri kullan. Düz yolda senden hızlıyım. Köşelerde hâlâ... hâlâ biraz insanım.` });
  note('l3_tape', { level: 'l3', kind: 'kaset', title: 'Kaset: "Kadıköy FM gece yayını"', from: 'Pınar Ersoy', date: '17 Nisan 1987, 02:40', body:
`[Radyo cızırtısı. Hafif bir synth müziği.]

PINAR: ...ve Kadıköy FM’de saat ikiyi kırk geçiyor. Bu gece Moda’daki Yıldız Atari’den canlı bağlanıyoruz, çünkü tarihe tanıklık ediyoruz. 255. seviyedeyiz millet.

[Arkada Bülent: "Yüklen, yüklen!"]

PINAR: Mahir abi ekrana bir şey bağladı, kablolar falan... Ne olduğunu sormayın. Cemil’in yüzü bembeyaz. İnci "belki durmalıyız" dedi, ki bu İnci için çok kararlı bir cümle.

Ekran... Ekranın sağ tarafı bozuluyor. Harfler. Renkler. Aman Tanrım, dinleyiciler, keşke görebilseniz, bu...

[Uzun bir parazit. Ardından çok yakından, çok derin: "vaka." Kayıt biter.]` });
  note('l3_shrine', { level: 'l3', kind: 'not', title: 'Toplantı masasında isim kartı', from: '', body:
`PINAR ERSOY
Kıdemli Metin Yazarı

(Arkasına:) Bir sonraki toplantıya geç kalmayacağım. Hiçbir toplantıya geç kalmadım. Hep herkesten önce vardım. Kimse gelmedi.` });
  // Bilgisayar ekranları
  note('l3_pc1', { level: 'l3', kind: 'ekran', title: 'Terminal: PERSONEL.TXT', from: 'IBM PC/XT', body:
`C:\\> TYPE PERSONEL.TXT

AD         BÖLÜM       DURUM
---------  ----------  ----------
AKSOY M.   TEKNİK      KAYIP (?)
KAPLAN B.  SÜRÜŞ       KOVALIYOR
ERSOY P.   METİN       BEKLİYOR
DEMİR İ.   HAVUZ       KARARSIZ
ARSLAN C.  -           KARANLIKTA
KAYA D.    SERVİS      YENİ KAYIT

Şifre hanesi (1.): 1

C:\\> _` });
  note('l3_pc2', { level: 'l3', kind: 'ekran', title: 'Terminal: SAYAC.EXE', from: 'IBM PC/XT', body:
`C:\\> SAYAC.EXE

SEVİYE: 253
SEVİYE: 254
SEVİYE: 255
SEVİYE: 0

HATA: TAŞMA
HATA: EKRANIN SAĞ YARISI TANIMSIZ
HATA: TANIMSIZ BÖLGEDE 6 NESNE TESPİT EDİLDİ

UYARI: Nesnelerden biri yeni.
UYARI: Yeni nesne bu satırı okuyor.

C:\\> _` });
  note('l3_pc3', { level: 'l3', kind: 'ekran', title: 'Terminal: NOT.TXT', from: 'IBM PC/XT', body:
`C:\\> TYPE NOT.TXT

Pınar’a:

Yarın akşam salonda buluşuyoruz, unutma. Kaseti getir, B yüzüne 256’yı kaydedeceğiz.

Olay saati: 17 Nisan, 03:17.
Mahir abi "tarih şifre gibi, unutmayın" dedi.

Şifre hanesi (4.): 4

— İnci

C:\\> _` });
  note('l3_board', { level: 'l3', kind: 'duvar', title: 'Beyaz tahta', from: 'Toplantı odası', body:
`STRATEJİ TOPLANTISI — 17.04

• Kırmızı: arkandan gelir
• Pembe: önüne geçer
• Mavi: belirsiz
• Turuncu: bakmazsan gelir

• SARI: ???

Şifre hanesi (2.): 7

(Köşede silinmemiş bir çizim: beş çöp adam, biri çok büyük ve yuvarlak.)` });
  note('l3_phone1', { level: 'l3', kind: 'telefon', title: 'Telesekreter mesajı', from: 'Bilinmeyen numara', body:
`"Bir yeni mesajınız var."

[Hışırtı.] Pınar, benim, annen. Üç gündür eve gelmedin. Ajanstakiler seni hiç görmediklerini söylüyor, ama masanda hâlâ sıcak bir çay varmış. Her sabah. Kim koyuyor o çayı?

Ne olur ara.

"Mesaj sonu."` });
  note('l3_phone2', { level: 'l3', kind: 'telefon', title: 'Telefon açıldı', from: 'Hat 0256', body:
`[Telefonu kaldırıyorsun. Karşıda nefes sesi.]

Çok uzaktan, bozuk bir kayıt gibi:

"...hayaletler hep aynı şeyi yapar. Kırmızı kovalar, pembe önüne geçer, mavi kararsızdır, turuncu utanır. Bunu ben yazdım. Makinenin içine ben yazdım. Onların karakterlerini ben seçtim.

Onlara bu rolleri ben verdim."

[Hat kesilir.]` });
  note('l3_phone3', { level: 'l3', kind: 'telefon', title: 'Telefon açıldı', from: 'Hat ?', body:
`[Telefonu kaldırıyorsun.]

Çocuk sesi, fısıltıyla:

"Beni görme. Lütfen. Sen bakınca donuyorum. Bakmayınca yanına geliyorum. İstemeden. Karanlıkta daha kolay.

Çakmağımı buldun mu? Dedemindi. Karanlıkta sadece onunla görebiliyordum.

...Arkana bakma."

[Hat kesilir.]` });

  // SEVİYE 4 — Karanlık (Cemil)
  note('l4_intro', { level: 'l4', kind: 'not', title: 'Jeneratörün üstünde', from: 'imzasız', body:
`BURADA IŞIK YOK.

Üç jeneratör var, her birinin bölgesi var. Mazot bidonlarını bul, jeneratörlere dök. Her jeneratör kendi bölgesinin ışıklarını yakar.

Işık çubuklarını idareli kullan. Karanlıktaki gülümseyen şeyler ışıktan hoşlanmaz.

Turuncu olana BAK. Bakmaya devam et. Ama çok uzun değil, yoksa aklını yer.` });
  note('l4_cemil1', { level: 'l4', kind: 'defter', title: 'Okul defterinin arka sayfası', from: 'Cemil Arslan', date: '?', body:
`Kimse bana bakmasın istiyorum. Sınıfta da öyleydi. Öğretmen tahtaya kaldırınca bayılacak gibi olurdum.

Burada biri bana baktığında donuyorum. Kaskatı. Kıpırdayamıyorum.

Ama bakmadıklarında... İçimde bir şey beni onlara doğru itiyor. Hızlı. Çok hızlı. Yanlarına varınca ne yapacağımı bilmiyorum. Hiç varmak istemedim.

Karanlıktan korkuyorum. Burası hep karanlık.` });
  note('l4_cemil2', { level: 'l4', kind: 'defter', title: 'Duvara çakmakla isten yazılmış', from: 'Cemil Arslan', body:
`DEDEM DERDİ Kİ:
KARANLIKTA KORKARSAN ÇAKMAĞI YAK, KENDİ YÜZÜNÜ GÖR.
KENDİ YÜZÜNÜ GÖREN KORKMAZ.

ÇAKMAĞIMI KAYBETTİM.
YÜZÜMÜ UNUTTUM.` });
  note('l4_grinners', { level: 'l4', kind: 'not', title: 'Titrek bir el yazısı', from: 'Selim, 1991', body:
`Sırıtkanlar.

Karanlıkta sadece dişleri görünüyor. Bir gülümseme, havada. Işık tutunca geri çekiliyorlar, eriyorlar gibi.

Sanırım bunlar oyunun kullanmadığı çizimler. Programcıların silip attığı yüzler. Çöp kutusunda gülümseyen şeyler.

Pilim bitiyor. Işık çubuğum kaldı bir tane. Onu kırıyorum.

Şimdi etrafımda on iki gülümseme sayıyorum.` });
  note('l4_mahir6', { level: 'l4', kind: 'defter', title: 'Mahir’in defteri — son yazı', from: 'Mahir Aksoy', date: '—', body:
`Elimle yazamıyorum artık. Bu satırları dişlerimle tutup yazıyorum.

Cemil’i buldum. Karanlıkta, bir köşede, dizlerini karnına çekmiş. Bana bakmadı, çünkü bakamazdı. Ben de ona bakamadım.

Ona çakmağını vermek istedim. Ama elim yok. Ağzımla verebilirdim, ama ağzımı açınca...

Açınca ne olacağını biliyorum.

Çakmağı buraya, bu jeneratörün yanına bırakıyorum. Bir insan bulsun. İnsan eli olan biri.

Ben artık Mahir değilim. Ben Yutucu’yum.` });
  note('l4_tape', { level: 'l4', kind: 'kaset', title: 'Kaset: "Cemil’in gülüşü"', from: 'Pınar Ersoy’un kasetinden', date: '16 Nisan 1987', body:
`[Salon gürültüsü.]

BÜLENT: Cemil, bak bak, İnci yine "belki" diyecek, iddiaya girelim!

İNCİ: Ben öyle bir şey... Belki demem.

[Kısa bir sessizlik. Sonra çok kısa, çekingen, ama gerçek bir kahkaha. Üç saniye.]

PINAR: (fısıltıyla) Kaydettim. Cemil güldü, kaydettim.

[Kayıt biter. Teyp bandı boşa döner.]` });

  // SEVİYE 5 — Labirent (Hafıza)
  note('l5_mahir7', { level: 'l5', kind: 'duvar', title: 'Labirent duvarına neonla yazılmış', from: 'M.', body:
`BURASI KALP.

Beş kişi girdik, beş rol vardı. Dört hayalet, bir Pacman. Makine rolleri kendisi dağıttı. Beni dışarıda bıraktı, çünkü ben makineyi yapan kişiydim.

Sonra yedi yıl sonra ben de girdim. Tek boş rol kalmıştı.

Pacman.

Aç olan. Yiyen. Kovalanan ve kovalayan.

Onları kurtarmaya geldim. Onları yiyorum.` });
  note('l5_rules', { level: 'l5', kind: 'duvar', title: 'Taş gibi soğuk bir levha', body:
`OYUNUN KURALLARI

Pacman pelletleri yer.
Hayaletler Pacman’i kovalar.
Pacman güç hapını yerse, hayaletleri yer.

BU OYUNDA PACMAN KİM?

Pelletleri kim yiyor?
Hapları kim topluyor?

Sen.` });
  note('l5_house', { level: 'l5', kind: 'not', title: 'Hayalet evinin kapısında', from: '', body:
`Dört köşe, dört hap.
Hapları yuttuğunda perde iner.

İçeride bir kapı daha var.
Arkasında sayılamayan seviye.

Oraya girersen, oyunun sonu gelir.
Hangi son, onu sen seçersin.` });
  note('l5_fruit', { level: 'l5', kind: 'anı', title: 'Kiraz — bir anı', body:
`Bir yaz akşamı, 1985. Mahir abi salonun kapısında kiraz dağıtıyor. "Pacman’in ilk meyvesi kirazdır," diyor, "100 puan. İlk seviyenin ödülü. Az ama tatlı."

Cemil kirazı cebine koyuyor, yemiyor. Sonra yıllarca cebinde taşıyor, çekirdeğini.

Anı bir sarı ışıkla sönüyor.` });

  // SEVİYE 256
  note('l6_glitch1', { level: 'l6', kind: 'duvar', title: 'Bozuk karakterler', body:
`▓▒░ SEV1YE 2S6 ░▒▓

H4TA HATA H▒TA

NE█E SAYA▒AMIYO█UM
ÇÜNKÜ SE█ BU█ADASIN
VE SEN█ SAYAMAM` });
  note('l6_glitch2', { level: 'l6', kind: 'duvar', title: 'Bozuk bir kayıt', body:
`[Ses parçaları, ters çalınmış gibi.]

...fişi çekersen herkes uyanır. Herkes. Ama fiş tek başına çekilmez. Dört el daha lazım. Onların ellerini sen geri verdin mi?

Vermediysen kapıyı kullan. ÇIKIŞ. Sen çıkarsın. Onlar kalır.

Ben her iki durumda da kalırım.` });
  note('l6_mahir8', { level: 'l6', kind: 'mektup', title: 'Mahir’in son mektubu', from: 'Mahir Aksoy', date: 'sayılamayan gün', body:
`Deniz,

Adını biliyorum çünkü kabin, jetonu atanın adını sayaca yazar. Rekor tablosunda altıncı satır: DNZ.

Sana söyleyeceğim tek şey şu: ben kovalamayı bırakamam. Aç olan buyum. Ama köşelerde, her dönüşte, bir anlığına hatırlıyorum. O anlarda bana kaçmak için zaman veriyorum. Fark ettin mi?

Eğer dördünü de kendine getirdiysen, fişi çek. Beni de çek. Doymak istiyorum.

Eğer getiremediysen kapıdan çık ve bir daha asla, asla bir Pacman kabinine jeton atma.

— Mahir` });

  // ------------------------------------------------------------------ BÖLÜMLER
  // Eşya yerleştirme kuralları levelgen.placeItems tarafından yorumlanır.
  const commonSupplies = (bat, alm, extra = []) => [
    { type: 'battery', count: bat, place: 'any', group: 'bat', sep: 6 },
    { type: 'almond', count: alm, place: 'any', group: 'alm', sep: 8 },
  ].concat(extra);

  const LEVELS = [
    {
      id: 'prolog', index: 0, name: 'PROLOG', title: 'Yıldız Atari Salonu', place: 'Moda, Kadıköy — 30 Kasım 1994, 02:11',
      intro: 'Bina sahibi otomatların sabaha kadar boşaltılmasını istedi. Anahtarı paspasın altına bırakmışlar. İçeride elektrik yok.',
      layout: 'arcade', seed: 1994, theme: 'arcade', music: 'arcade', fog: [0x08060e, 0.035], grade: { tint: [1.02, 0.97, 1.05], sat: 1.05 },
      startFlashlight: false,
      items: [
        { type: 'flashlight', id: 'flashlight', place: 'spot', spot: 'counter', h: 1.02 },
        { type: 'fuseBox', id: 'mainBreaker', place: 'spot', spot: 'fuseBox', h: 1.5 },
        { type: 'register', id: 'register', place: 'spot', spot: 'counter', reuse: true, h: 1.02, offset: [1.4, 0] },
        { type: 'token', id: 'token', place: 'spot', spot: 'officeDesk' },
        { type: 'specialCabinet', id: 'special', place: 'spot', spot: 'specialCabinet', h: 0 },
        { type: 'freeCabinet', id: 'freeplay', place: 'spot', spot: 'freeCabinet', h: 0 },
        { type: 'note', id: 'n_sticky', data: 'p_sticky', place: 'spot', spot: 'specialCabinet', reuse: true, h: 1.02, offset: [0.55, -0.35] },
        { type: 'note', id: 'n_flyer', data: 'p_flyer', place: 'spot', spot: 'hall' },
        { type: 'note', id: 'n_ledger', data: 'p_ledger', place: 'spot', spot: 'officeDesk', reuse: true, h: 0.82, offset: [-0.55, 0.05] },
        { type: 'note', id: 'n_photo', data: 'p_photo', place: 'spot', spot: 'officeWall', h: 1.6 },
        { type: 'note', id: 'n_letter', data: 'p_letter', place: 'spot', spot: 'storage' },
        { type: 'note', id: 'n_mirror', data: 'p_mirror', place: 'spot', spot: 'wc' },
        { type: 'tape', id: 'tape_p', data: 'p_tape', place: 'spot', spot: 'corridor' },
        { type: 'battery', count: 2, place: 'spot', spot: 'hall', fallback: 'any' },
      ],
      entities: [],
    },
    {
      id: 'l0', index: 1, name: 'SEVİYE 0', title: 'Sarı Odalar', place: 'Ekranın kenarı',
      intro: 'Vızıltı. Islak halı kokusu. Sonsuza uzanan sarı duvarlar. Uzaklarda bir yerde, çok tanıdık bir ses: vaka, vaka.',
      layout: 'backrooms', seed: 1987, theme: 'yellow', music: 'lobby', fog: [0x4a3f1f, 0.016], grade: { tint: [1.04, 1.0, 0.9], sat: 0.95 },
      gen: { w: 50, h: 50, landmarks: [{ tag: 'camp', w: 3, h: 3 }, { tag: 'lone', w: 4, h: 3, openings: 2 }, { tag: 'chairs', w: 4, h: 4, openings: 2 }, { tag: 'stairs', w: 3, h: 4 }, { tag: 'puddle', w: 5, h: 4, openings: 3 }] },
      items: [
        { type: 'powerPellet', id: 'pellet', count: 4, place: 'deadEnd', group: 'pellet', minFrac: 0.35 },
        { type: 'exitPanel', id: 'exitPanel', place: 'spot', spot: 'exitPanel', reuse: true, h: 1.3, beside: 1.05 },
        { type: 'tape', id: 'tape_l0', data: 'l0_tape', place: 'spot', spot: 'camp' },
        { type: 'note', id: 'n_l0_first', data: 'l0_first', place: 'near', wall: true, h: 1.5 },
        { type: 'note', id: 'n_l0_mahir1', data: 'l0_mahir1', place: 'mid' },
        { type: 'note', id: 'n_l0_wanderer', data: 'l0_wanderer', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_l0_bulent', data: 'l0_bulent', place: 'spot', spot: 'lone', fallback: 'mid' },
        { type: 'note', id: 'n_l0_chairs', data: 'l0_chairs', place: 'spot', spot: 'chairs', fallback: 'mid', wall: true, h: 1.6 },
        { type: 'note', id: 'n_l0_mahir2', data: 'l0_mahir2', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_l0_exit', data: 'l0_exit', place: 'spot', spot: 'exitPanel', reuse: true, beside: -1.05, h: 1.5 },
      ].concat(commonSupplies(6, 4)),
      entities: [{ type: 'pacman', dormant: true }],
      objectives: ['l0_explore', 'l0_pellets', 'l0_insert', 'l0_leave'],
    },
    {
      id: 'l1', index: 2, name: 'SEVİYE 1', title: 'Beton Depo', place: 'Bülent’in ayak sesleri',
      intro: 'Tavan yedi metre yukarıda. Raflar karanlığa uzanıyor. Bir yerlerde bir saat tıkırdıyor, hep aynı saniyede.',
      layout: 'warehouse', seed: 3171987, theme: 'concrete', music: 'warehouse', fog: [0x0d0f12, 0.028], grade: { tint: [0.95, 0.98, 1.05], sat: 0.85 },
      items: [
        { type: 'fuse', id: 'fuse', count: 3, place: 'far', group: 'fuse', minFrac: 0.4 },
        { type: 'fusePanel', id: 'fusePanel', place: 'spot', spot: 'fusePanel', h: 1.4 },
        { type: 'memento', id: 'watch', data: 'bulent', place: 'far', group: 'mem', minFrac: 0.5 },
        { type: 'shrine', id: 'shrine_b', data: 'bulent', place: 'spot', spot: 'shrine' },
        { type: 'tape', id: 'tape_l1', data: 'l1_tape', place: 'spot', spot: 'camp' },
        { type: 'note', id: 'n_l1_intro', data: 'l1_intro', place: 'near' },
        { type: 'note', id: 'n_l1_bulent1', data: 'l1_bulent1', place: 'mid' },
        { type: 'note', id: 'n_l1_bulent2', data: 'l1_bulent2', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_l1_forklift', data: 'l1_forklift', place: 'spot', spot: 'office1', fallback: 'mid' },
        { type: 'note', id: 'n_l1_mahir3', data: 'l1_mahir3', place: 'spot', spot: 'office2', fallback: 'far' },
        { type: 'note', id: 'n_l1_graffiti', data: 'l1_graffiti', place: 'mid', wall: true, h: 1.8 },
        { type: 'note', id: 'n_l1_shrine', data: 'l1_shrine', place: 'spot', spot: 'shrine', fallback: 'far' },
      ].concat(commonSupplies(5, 3)),
      entities: [{ type: 'ghost', ghost: 'blinky' }, { type: 'pacman', dormant: true }],
      ghost: 'bulent',
      objectives: ['l1_fuses', 'l1_panel', 'l1_wait', 'l1_leave'],
    },
    {
      id: 'l2', index: 3, name: 'SEVİYE 2', title: 'Havuz Odaları', place: 'İnci’nin tereddüdü',
      intro: 'Beyaz fayanslar, hareketsiz su, klor kokusu. Burası huzurlu olmalıydı. Her şey fazla temiz.',
      layout: 'pools', seed: 1989, theme: 'pool', music: 'pools', fog: [0x7d9aa2, 0.012], grade: { tint: [0.97, 1.02, 1.05], sat: 0.9 },
      items: [
        { type: 'valve', id: 'valve', count: 4, place: 'far', wall: true, group: 'valve', minFrac: 0.35, h: 1.1 },
        { type: 'drain', id: 'drain', place: 'spot', spot: 'drain' },
        { type: 'memento', id: 'glasses', data: 'inci', place: 'far', group: 'mem', minFrac: 0.5 },
        { type: 'shrine', id: 'shrine_i', data: 'inci', place: 'spot', spot: 'shrine' },
        { type: 'tape', id: 'tape_l2', data: 'l2_tape', place: 'spot', spot: 'camp' },
        { type: 'note', id: 'n_l2_intro', data: 'l2_intro', place: 'near' },
        { type: 'note', id: 'n_l2_inci1', data: 'l2_inci1', place: 'mid' },
        { type: 'note', id: 'n_l2_inci2', data: 'l2_inci2', place: 'far', wall: true, h: 1.2, group: 'notes' },
        { type: 'note', id: 'n_l2_mahir4', data: 'l2_mahir4', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_l2_sign', data: 'l2_sign', place: 'mid', wall: true, h: 1.6 },
      ].concat(commonSupplies(3, 3)),
      entities: [{ type: 'ghost', ghost: 'inky' }, { type: 'pacman', dormant: true }],
      ghost: 'inci',
      objectives: ['l2_valves', 'l2_drain', 'l2_hatch'],
    },
    {
      id: 'l3', index: 4, name: 'SEVİYE 3', title: 'Ofis Katı', place: 'Pınar’ın toplantısı',
      intro: 'Bölmeler, tüplü monitörler, soğumuş kahveler. Bir telefon çalıyor. Sonra bir başkası. Sonra hepsi birden susuyor.',
      layout: 'office', seed: 1990, theme: 'office', music: 'office', fog: [0x1a1d22, 0.02], grade: { tint: [0.96, 1.0, 1.04], sat: 0.85 },
      code: '1704',
      items: [
        { type: 'codeClue', id: 'clue_pc1', data: 'l3_pc1', place: 'spot', spot: 'openplan', fallback: 'mid', h: 0.78, prop: 'computer' },
        { type: 'codeClue', id: 'clue_board', data: 'l3_board', place: 'spot', spot: 'whiteboard', fallback: 'far', wall: true, h: 1.5, prop: 'whiteboard' },
        { type: 'codeClue', id: 'clue_memo', data: 'l3_memo', place: 'spot', spot: 'server', fallback: 'far', prop: 'printer' },
        { type: 'codeClue', id: 'clue_pc3', data: 'l3_pc3', place: 'spot', spot: 'offices', fallback: 'far', h: 0.78, prop: 'computer' },
        { type: 'keypad', id: 'keypad', place: 'spot', spot: 'keypad', reuse: true, h: 1.35, beside: 0.95 },
        { type: 'keycard', id: 'keycard', place: 'spot', spot: 'keycard', h: 0.8 },
        { type: 'cardReader', id: 'cardReader', place: 'spot', spot: 'cardReader', reuse: true, h: 1.3, beside: 0.95 },
        { type: 'memento', id: 'walkman', data: 'pinar', place: 'far', group: 'mem', minFrac: 0.45 },
        { type: 'shrine', id: 'shrine_p', data: 'pinar', place: 'spot', spot: 'shrine' },
        { type: 'tape', id: 'tape_l3', data: 'l3_tape', place: 'spot', spot: 'kitchen', fallback: 'mid' },
        { type: 'note', id: 'n_l3_intro', data: 'l3_intro', place: 'spot', spot: 'keypad', reuse: true, h: 1.55, beside: -0.95 },
        { type: 'note', id: 'n_l3_pinar1', data: 'l3_pinar1', place: 'mid' },
        { type: 'note', id: 'n_l3_pinar2', data: 'l3_pinar2', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_l3_mahir5', data: 'l3_mahir5', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_l3_shrine', data: 'l3_shrine', place: 'spot', spot: 'shrine' },
        { type: 'computer', id: 'pc2', data: 'l3_pc2', place: 'spot', spot: 'openplan', fallback: 'any', h: 0.78 },
        { type: 'phone', id: 'phone1', data: 'l3_phone1', place: 'mid', group: 'phone' },
        { type: 'phone', id: 'phone2', data: 'l3_phone2', place: 'far', group: 'phone' },
        { type: 'phone', id: 'phone3', data: 'l3_phone3', place: 'far', group: 'phone' },
      ].concat(commonSupplies(4, 3)),
      entities: [{ type: 'ghost', ghost: 'pinky' }, { type: 'pacman', dormant: true }],
      ghost: 'pinar',
      objectives: ['l3_code', 'l3_keypad', 'l3_card', 'l3_stairs'],
    },
    {
      id: 'l4', index: 5, name: 'SEVİYE 4', title: 'Karanlık', place: 'Cemil’in korkusu',
      intro: 'Burada ışıklar hiç yanmamış. Fenerinin halkasının dışında hiçbir şey yok. Ya da her şey var.',
      layout: 'backrooms', seed: 1991, theme: 'dark', music: 'dark', fog: [0x020203, 0.06], grade: { tint: [1.0, 0.98, 0.95], sat: 0.8 },
      gen: { w: 46, h: 46, zones: 3, min: 2, gapEvery: 4, remove: 0.06, stubs: 90, corridors: 5, theme: 'dark', exitDoor: { kind: 'elevator', name: 'Servis asansörü', lockMsg: 'Asansör ölü. Üç jeneratörün de çalışması gerekiyor.' },
        light: { density: 0.55, darkThreshold: -0.2, flicker: 0.15, broken: 0.1, color: [1, 0.9, 0.7] },
        landmarks: [{ tag: 'camp', w: 3, h: 3 }, { tag: 'shrine', w: 3, h: 3 }] },
      items: [
        { type: 'generator', id: 'gen', count: 3, place: 'spot', spot: 'generator', depth: 0.45, h: 0 },
        { type: 'fuelCan', id: 'fuel', count: 3, place: 'far', group: 'fuel', minFrac: 0.3 },
        { type: 'memento', id: 'lighter', data: 'cemil', place: 'spot', spot: 'generator', fallback: 'far' },
        { type: 'shrine', id: 'shrine_c', data: 'cemil', place: 'spot', spot: 'shrine' },
        { type: 'tape', id: 'tape_l4', data: 'l4_tape', place: 'spot', spot: 'camp' },
        { type: 'note', id: 'n_l4_intro', data: 'l4_intro', place: 'near' },
        { type: 'note', id: 'n_l4_cemil1', data: 'l4_cemil1', place: 'mid' },
        { type: 'note', id: 'n_l4_cemil2', data: 'l4_cemil2', place: 'far', wall: true, h: 1.3, group: 'notes' },
        { type: 'note', id: 'n_l4_grinners', data: 'l4_grinners', place: 'mid' },
        { type: 'note', id: 'n_l4_mahir6', data: 'l4_mahir6', place: 'far', group: 'notes' },
        { type: 'glowstick', count: 7, place: 'any', group: 'glow', sep: 6 },
      ].concat(commonSupplies(7, 3)),
      entities: [{ type: 'ghost', ghost: 'clyde' }, { type: 'grinner', count: 4 }, { type: 'pacman', dormant: true }],
      ghost: 'cemil',
      objectives: ['l4_generators', 'l4_leave'],
    },
    {
      id: 'l5', index: 6, name: 'SEVİYE 5', title: 'Labirent', place: 'Oyunun kalbi',
      intro: 'Mavi neon duvarlar. Ayağının altında parlayan noktalar. Yukarıda, gökyüzü olması gereken yerde, dev harflerle bir skor tablosu.',
      layout: 'maze', seed: 1992, theme: 'maze', music: 'maze', fog: [0x000006, 0.02], grade: { tint: [0.95, 0.97, 1.08], sat: 1.15 },
      items: [
        { type: 'powerPellet', id: 'mpellet', count: 4, place: 'spot', spot: 'corner', center: true },
        { type: 'note', id: 'n_l5_mahir7', data: 'l5_mahir7', place: 'spot', spot: 'corner', center: true },
        { type: 'note', id: 'n_l5_rules', data: 'l5_rules', place: 'spot', spot: 'corner', center: true },
        { type: 'note', id: 'n_l5_house', data: 'l5_house', place: 'spot', spot: 'corner', center: true },
        { type: 'battery', count: 1, place: 'spot', spot: 'corner', center: true },
        { type: 'portal', id: 'portal', place: 'spot', spot: 'houseInside', center: true },
      ],
      entities: [{ type: 'pacman', arcade: true }, { type: 'ghost', ghost: 'blinky', maze: true }, { type: 'ghost', ghost: 'pinky', maze: true }, { type: 'ghost', ghost: 'inky', maze: true }, { type: 'ghost', ghost: 'clyde', maze: true }, { type: 'watcher' }],
      objectives: ['l5_pellets', 'l5_house'],
    },
    {
      id: 'l6', index: 7, name: 'SEVİYE 256', title: 'Bölünmüş Ekran', place: 'Sayılamayan yer',
      intro: 'Ekranın sol yarısı tanıdık. Sağ yarısı harflerden, renklerden, yarım kalmış şeylerden yapılmış. Makinenin sayamadığı yer burası.',
      layout: 'killscreen', seed: 256, theme: 'glitch', music: 'glitch', fog: [0x04000a, 0.03], grade: { tint: [1.05, 0.95, 1.08], sat: 1.2 },
      items: [
        { type: 'plug', id: 'plug', place: 'spot', spot: 'core', center: true },
        { type: 'powerPellet', id: 'gpellet', count: 2, place: 'spot', spot: 'corner', center: true, fallback: 'any' },
        { type: 'note', id: 'n_l6_glitch1', data: 'l6_glitch1', place: 'mid' },
        { type: 'note', id: 'n_l6_glitch2', data: 'l6_glitch2', place: 'far' },
        { type: 'note', id: 'n_l6_mahir8', data: 'l6_mahir8', place: 'spot', spot: 'core', fallback: 'far' },
      ],
      entities: [{ type: 'pacman', arcade: true, final: true }, { type: 'watcher' }],
      objectives: ['l6_core', 'l6_choice'],
    },
  ];

  // Hedef metinleri: {n}, {t} ilerleme ile değişir
  const OBJ = {
    p_flash: 'Feneri bul (tezgâhın arkasında olmalı)',
    p_power: 'Depodaki ana şalteri kaldır',
    p_key: 'Mahir Usta’nın ofis anahtarını bul',
    p_office: 'Ofise gir',
    p_token: 'Özel jetonu bul',
    p_insert: 'Jetonu 7 numaralı kabine at',
    l0_explore: 'Çıkışı bul',
    l0_pellets: 'Güç haplarını topla ({n}/4)',
    l0_insert: 'Hapları ÇIKIŞ kapısındaki yuvalara yerleştir',
    l0_leave: 'Kapıdan geç',
    l1_fuses: 'Sigortaları bul ({n}/3)',
    l1_panel: 'Sigortaları asansör panosuna tak',
    l1_wait: 'Asansör geliyor… Hayatta kal ({n} sn)',
    l1_leave: 'Asansöre bin',
    l2_valves: 'Tahliye vanalarını aç ({n}/4)',
    l2_drain: 'Ana havuzun boşalmasını bekle',
    l2_hatch: 'Havuzun dibindeki kapağı aç',
    l3_code: 'Güvenlik odası şifresinin hanelerini bul ({n}/4)',
    l3_keypad: 'Şifreyi güvenlik odasının tuş takımına gir',
    l3_card: 'Güvenlik kartını al',
    l3_stairs: 'Kartı yangın merdiveni kapısında kullan',
    l4_generators: 'Jeneratörleri çalıştır ({n}/3)',
    l4_leave: 'Servis asansörüne ulaş',
    l5_pellets: 'Dört köşedeki güç haplarını ye ({n}/4)',
    l5_house: 'Hayalet evine gir',
    l6_core: 'Bozuk tarafta çekirdeğe ulaş',
    l6_choice: 'Seçimini yap: ÇIKIŞ kapısı ya da fiş',
    ghost: '{name}’in eşyasını türbesine götür (isteğe bağlı)',
  };

  // İç ses repliği: olay anahtarı → metin
  const MONO = {
    prolog_start: 'Elektrik kesik. Fenerim kamyonette kaldı… Tezgâhta bir tane olmalı.',
    prolog_flash: 'Pil yarım. Idareli kullanmalıyım.',
    prolog_power: 'Işıklar… Makineler de açıldı. Hepsi bir anda.',
    prolog_register: 'Yazar kasa çalışıyor. Çekmecede bir anahtar var: "OFİS".',
    prolog_token: 'Jetonun üstünde "0256" yazıyor. Ağır. Normal jetondan çok daha ağır.',
    prolog_cabinet: 'Ekranda "OYUNCU 1 HAZIR" yazıyor. Seviye sayacı: 255.',
    prolog_rain: 'Yağmur hiç dinmiyor.',
    l0_start: 'Neredeyim ben? Halı… ıslak. Bu vızıltı kafamın içinde.',
    l0_exitSeen: 'ÇIKIŞ. Kapının yanında dört yuva var. Yuvarlak. Hap boyutunda.',
    l0_firstPellet: 'Elimde avuç kadar bir ışık. Her şey bir anlığına… maviye döndü.',
    l0_pacmanHeard: 'O ses. Vaka, vaka. Çocukken yüzlerce kere duydum. Hiç böyle duymadım.',
    l0_pacmanSeen: 'Koridorun sonunda sarı bir ışık geçti. Büyük. Çok büyük.',
    l0_allPellets: 'Dört hap. Şimdi kapıya.',
    l1_start: 'Bir saatin tik takı. Hep aynı saniyede takılı.',
    l1_blinkySeen: 'Kırmızı… Bir çarşaf gibi. İki beyaz göz. Bana bakıyor.',
    l1_fuse: 'Bir sigorta daha.',
    l1_elevator: 'Asansör geliyor. Yavaş. Çok yavaş.',
    l2_start: 'Su. Her yerde su. Adımlarımın sesi yankılanıyor.',
    l2_inkySeen: 'Mavi bir şey. Orada. Hayır… burada.',
    l2_valve: 'Vana gıcırdıyor. Ses her yere yayılıyor.',
    l2_drained: 'Su çekildi. Dipte bir kapak var.',
    l3_start: 'Bir ofis. Tüplü monitörler. Kimse yok ama herkes az önce kalkmış gibi.',
    l3_pinkySeen: 'Pembe… Önümde. Ben oraya gitmeden oradaydı.',
    l3_code: 'Şifre tamam. Bir, yedi, sıfır, dört. On yedi Nisan.',
    l4_start: 'Hiçbir şey göremiyorum. Fener… fener yeter mi bilmiyorum.',
    l4_clydeSeen: 'Turuncu bir şey köşede duruyor. Kıpırdamıyor. Ben baktıkça kıpırdamıyor.',
    l4_grinner: 'Karanlıkta bir gülümseme. Sadece dişler.',
    l4_gen: 'Jeneratör homurdandı. Işıklar yanıyor.',
    l5_start: 'Bu… oyunun kendisi. İçindeyim.',
    l5_rules: 'Pelletleri kim yiyor? Ben.',
    l5_house: 'Perde indi. Evin içinde bir kapı var.',
    l6_start: 'Sağ taraf… bozuk. Harfler havada asılı.',
    l6_core: 'Çekirdek. Burada koca bir fiş var. Kabinin fişi. İçeriden.',
    freed: '{name} artık beni kovalamıyor. Işığı yumuşadı.',
    lowBattery: 'Pil bitiyor.',
    hide: 'Nefesini tut.',
    fearHigh: 'Nefes alamıyorum…',
  };

  const DEATH = {
    pacman: ['YUTULDUN', 'Yutucu seni buldu. Köşeleri kullan: düz koridorlarda senden hızlı, dönüşlerde yavaş.'],
    blinky: ['YAKALANDIN', 'Kırmızı hiç durmaz. Görüş hattını kır ve köşe dön.'],
    pinky: ['PUSUYA DÜŞTÜN', 'Pembe, baktığın yöne doğru önünü keser. Arkana bakarak yürümeyi dene.'],
    inky: ['KAYBOLDUN', 'Mavi, sen suya girip ses çıkardıkça yaklaşır. Kenardan yürü.'],
    clyde: ['DONDUN', 'Turuncu sen bakarken kıpırdayamaz. Arkanı dönme, ona feneri tut.'],
    grinner: ['GÜLÜMSEDİ', 'Sırıtkanlar ışıktan kaçar. Feneri üzerlerinde tut ya da ışık çubuğu at.'],
    watcher: ['SAYILDIN', 'Sayaç sen bakmazken yaklaşır. Sırtını ona uzun süre dönme.'],
  };

  const TIPS = [
    'Yutucu düz koridorlarda senden hızlıdır ama dönüşlerde yavaşlar. Köşe dön.',
    'Koşmak ses çıkarır. Eğilerek yürümek neredeyse sessizdir.',
    'Işıklar titremeye başladıysa Yutucu yakındadır.',
    'Güç hapı yuttuğunda her şey sekiz saniyeliğine senden kaçar.',
    'Kaset çalarlar oyunu kaydeder ve bir anı dinletir.',
    'Masaların altına ya da dolapların içine saklanabilirsin. Seni girerken görmedilerse bulamazlar.',
    'Hayaletlerin eşyalarını türbelerine götürürsen kovalamayı bırakırlar. Son için önemli olabilir.',
    'Badem suyu korkunu yatıştırır ve nefesini toparlar.',
    'M tuşu keşfettiğin yerlerin haritasını açar.',
    'Yerdeki sarı noktalar Yutucu’nun izidir: noktalar yoksa oradan geçmiştir.',
    'Karanlıkta fener pili hızlı biter. Işık çubuklarını G ile yere at.',
    'Turuncu olana bakmaya devam et. Ama çok uzun değil.',
    'Ayarlar menüsünden çözünürlük ölçeğini %200’e kadar çıkarabilirsin.',
  ];

  const ENDINGS = {
    exit: {
      title: 'ÇIKIŞ',
      subtitle: 'Kötü son — Tek başına',
      lines: [
        'Kapı arkandan kapanıyor. Soğuk bir rüzgâr. Yağmur kokusu.',
        'Gözlerini açtığında salonun ıslak zeminindesin. Sabah olmuş. Kepenkler yarı açık.',
        '7 numaralı kabin hâlâ çalışıyor. Ekranda dört hayalet, labirentin ortasında bekliyor.',
        'Rekor tablosunun altıncı satırında üç harf yanıp sönüyor: DNZ.',
        'Nakliye kamyonu kabini öğlen alıyor. Şoför yolda, arka kasadan "vaka, vaka" diye bir ses geldiğini söyleyecek.',
        'Kamyon hiç varmıyor.',
      ],
    },
    plug: {
      title: 'OYUN BİTTİ',
      subtitle: 'İyi son — Beş oyuncu özgür',
      lines: [
        'Dört renkli ışık ellerinin üstüne kapanıyor. Kırmızı, pembe, mavi, turuncu. Birlikte çekiyorsunuz.',
        'Fiş çıkıyor. Ses kesiliyor. Vızıltı ilk defa susuyor.',
        'Karanlıkta çok yakından, yorgun ama insan bir ses: "Doydum, Deniz. Sonunda doydum."',
        'Gözlerini açtığında salonun zeminindesin. Güneş vitrin camından içeri vuruyor.',
        '7 numaralı kabin kapkara. Ekranında tek bir satır yanmış kalmış: OYUN BİTTİ — 5 OYUNCU.',
        'Bir hafta sonra gazetede küçük bir haber: "1987’de Kadıköy’de kaybolan dört genç, Haydarpaşa Garı’nın bekleme salonunda bulundu. Doktorlar hiç yaşlanmadıklarını söylüyor."',
        'Mahir Aksoy bulunamadı. Ama panodaki fotoğrafta, beş kişinin arasında artık o da gülümsüyor.',
      ],
    },
  };

  const CREDITS = [
    ['PACMAN: ARKA ODALAR', ''],
    ['Bir kaçış ve korku oyunu', ''],
    ['Adanmıştır', 'Yıldız Atari Salonu’nda son jetonunu atan herkese'],
    ['Klasik labirent', '1980 atari labirentine saygıyla'],
    ['Sesler', 'Hepsi tarayıcıda, anlık olarak üretildi'],
    ['Dokular', 'Hepsi prosedürel: tek bir resim dosyası yok'],
    ['Oyunculara', 'Hiçbir Pacman kabinine gece jeton atmayın'],
  ];

  PB.Story = { CHAR, NOTES: N, LEVELS, OBJ, MONO, DEATH, TIPS, ENDINGS, CREDITS,
    level(id) { return LEVELS.find(l => l.id === id); },
    ghostChar(ghost) { return Object.values(CHAR).find(c => c.ghost === ghost); },
    noteCount() { return Object.keys(N).length; },
  };
})(typeof window !== 'undefined' ? window : globalThis);
