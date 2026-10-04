/* Türkçe — 9. Bölüm: Buz (Ostra Gölü) ve üç son. Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      lake: {
        name: '9. BÖLÜM', title: 'Buz', place: 'Ostra Gölü',
        intro: 'Pazar, 14 Ocak 1979, 15.40.\n\nAnneannenin kıyıdaki evi. Soba yanıyor, radyo açık. Gölün üstünde büyük çocuklar balıkçı kulübelerinde, kar da kuzeyden geliyor.\n\nWren dışarıda bir yerde.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'Masada, kısık sesle radyo', from: 'Göller bölgesi için hava durumu', date: 'Pazar, 14 Ocak 1979, 15.30', body:
`...öğleden sonra kar sağanakları, saat dört sularından itibaren yerini kuvvetli kuzey rüzgârı ve tipiyle yoğun kara bırakacak. Karanlık bastıktan sonra açık arazide ve göllerde görüş neredeyse sıfır.

Ostra Gölü’nde buzun, kuzeybatı taraftaki eski nehir yatağının üstünde güvenli olmadığı bildiriliyor. Halkın oradaki buza hiç çıkmaması rica ediliyor.

Ve şimdi saat üç buçuk haberleri...` },
      lake_granNote: { kind: 'note', title: 'Mutfak masasında bir not', from: 'Anneanne', date: 'Pazar', body:
`Ada —

Süt için çiftliğe çıktım. Dört buçukta dönerim.
Wren buza ÇIKMAYACAK. Onu yanında, içeride tut.
Kutuda çörek var, birer tane.

Anneannen` },
      lake_wrenNote: { kind: 'note', title: 'Kızların kapısına yapıştırılmış bir sayfa', from: 'Wren', date: '(tarihsiz)', body:
`ADA
BEN DE GELİYORUM

(Altına çizilmiş kırmızı bir kuş, boynunda yeşil bir şerit olan daha uzun bir kuşun peşinden uçuyor.)` },
      lake_diary: { kind: 'note', title: 'Üstteki yastığın altında bir günlük', from: 'Ada, 12', date: '14 Ocak 1979', body:
`Sunna, Per ve hepsi akşam yemeğinden sonra kulübelerde olacak. SUNNA BENİ ÇAĞIRDI.

Sunna, küçük kuşunu da getir, onu deliğe atarız dedi. Ha ha.

Onu GETİRMİYORUM. Her yere köpek gibi peşimden geliyor, sonra ağlıyor ve herkes bana bakıyor. Bir kez olsun onsuz bir yere gitmek istiyorum.` },
      lake_search: { kind: 'report', title: 'Kayıkhanede katlanmış bir rapor', from: 'Ostra ilçe polisi', date: 'Ocak 1979', body:
`Kayıp çocuk: Wren LIND, 7, Lind evi, güney kıyısı, Ostra Gölü.

14.1, 16.50. Eve dönen anneannesi Bayan Ingrid Lind tarafından kayıp bildirildi.
Çocuğun ablası Ada Lind, 12, Wren’in kendisiyle buza çıkmadığını ve evde olduğunu sandığını ifade ediyor.
Arama: ev, ek binalar, güneydeki orman ve yol, bütün gece boyunca. Yoğun kar.
16.1, 11.20. Buzun üstünde, balıkçı kulübelerinin yaklaşık 300 metre kuzeybatısında, eski nehir yatağının üstünde bir çocuğun kırmızı eldiveni (sağ el) bulundu. Buz güvensiz. Buzlar çözülene kadar dalış mümkün değil.` },
      lake_hutNote: { kind: 'note', title: 'Üstüne yazı yazılmış bir sigara paketi', from: '(büyük çocuklar)', date: '14.1.79', body:
`PER + SUNNA

ADA’NIN KÜÇÜK KUŞU YİNE PEŞİNDEN GELDİ
CİK CİK

(üzgün suratlı bir kuş resmi ve kulübenin dışını gösteren bir ok)` },
      lake_tape: { kind: 'transcript', title: 'Teypteki bir kaset: “ADA İÇİN”', from: 'Ingrid Lind', date: 'Aralık 1995', body:
`[bir tık; tıkırdayan bir mutfak saati; birinin sandalyeye yerleşmesi]

Ada. Ben anneannen. İyi olmadığımı söylüyorlar, o yüzden kasete söyleyeceğim, çünkü yüzüne hiç söyleyemedim.

Onu buzda gördüğünü hep biliyordum. O gece yüzünden anlamıştım. Hiç sormadım, çünkü söylemenin sana ne yapacağından korkuyordum. Kendime bunun iyilik olduğunu söyledim.

Değildi. Bu ailenin kadınları susar ve buna iyilik der. Annem kardeşimin gelip onu almasını bekledi, o hiç gelmedi, ve kimse bunu yüksek sesle söylemedi, bir kez bile.

Söyle, kızım. Yüksek sesle, birine söyle. Sonra git ve onu bul.

[saat; uzun bir nefes; kaset sonuna kadar dönüyor]` },
    },
    items: {
      mitten: { name: 'Kırmızı eldiven', desc: 'Bir çocuk eldiveni, kırmızı, sol el. Paketle geldi. Öbür teki buzda bulundu.' },
    },
    obj: {
      lake_start: 'Wren’i bul',
      lake_trail: 'Ayak izlerini izleyip buza çık',
      lake_huts: 'Büyük çocukların olduğu kulübelere git',
      lake_remember: 'Hatırla',
      lake_thin: 'Eski nehrin üstündeki ince buza çık',
      lake_say: 'Ona söyle',
    },
    mono: {
      lake_start: 'Anneannemin evi. Soba yanıyor. Radyo açık. Yıl bin dokuz yüz yetmiş dokuz.',
      lake_empty: 'Kimse yok. Anneannem süt almaya gitmiş. Wren’in botları kapının yanında değil.',
      lake_note: '“Onu yanında, içeride tut.” Tutmadım.',
      lake_wrenNote: 'Hep önce benim adımı yazardı.',
      lake_out: 'Karda küçük ayak izleri. Kıyıya iniyor. Buza çıkıyor.',
      lake_ice: 'Buz şarkı söylüyor. Soğukta öyle yapar.',
      lake_wren: 'Kırmızı. Orada. Uzaklaşıyor.',
      lake_huts: 'Kulübeler. İçeride biri gülüyor.',
      lake_laughers: 'Bana gülüyorlar. O zaman da bana gülüyorlardı.',
      lake_hole: 'Buzdaki delik. Onu duyduğumda burada duruyordum.',
      lake_remember1: 'Peşimden içeri girdi. Yüzü soğuktan pembeleşmişti. “Ada, ben de geldim.”',
      lake_remember2: 'Ve hepsi bana baktı. Ben de elini kolumdan ittim ve kaybol Wren dedim. Eve git. Kaybol.',
      lake_remember3: 'Gitti. Yanlış yöne gitti. Karda kıyı görünmüyordu.',
      lake_remember4: 'Sonra buz bir ses çıkardı. Uzun bir ses. Orada, solda. Ve ben arkamı dönmedim, çünkü bana bakıyorlardı.',
      lake_storm: 'Kar geliyor. Evi göremiyorum.',
      lake_thin: 'Buz burada koyu. İnce. Yürü. Koşma.',
      lake_hush: 'Arkamda, karın içinde bir şey var. Yeşil bir atkı.',
      lake_quiet: 'Her şey çok sessizleşti. Kendi ayak seslerimi duyamıyorum.',
      lake_found: 'İşte orada.',
      lake_tape: 'Anneannemin sesi. Bu kaset iki yıldır dolabımda ve hiç dinlemedim.',
      lake_gone: 'İzler sola, ileriye gidiyor. Nehre doğru.',
    },
    lines: {
      lake_radioPrompt: 'Radyoyu dinle',
      lake_tapePrompt: 'Kaseti çal',
      lake_holePrompt: 'Deliğe bak',
      lake_choiceTitle: 'Wren ince buzun üstünde, sana sırtı dönük duruyor.',
      lake_sayIt: 'Söyle. Hepsini.',
      lake_vanished: '“Öylece kayboldu. Kimse bir şey görmedi.”',
      lake_say1: '“Sana kaybol dedim.”',
      lake_say2: '“Yanlış yöne gittin, buzu duydum ve arkamı dönmedim.”',
      lake_say3: '“Anneanneme hiç dışarı çıkmadığını söyledim. Seni ormanda aramalarına izin verdim.”',
      lake_give: 'Eldiveni ona ver',
    },
    radio: {
      lake_otto1: [
        ['radio', '[paraziti örten kar, çok yumuşak]'],
        ['otto', 'Dokuzdan Ada’ya. Sizi zor duyuyorum. Bu benim rafım değil. Hiç göremiyorum. Sanırım sizin.'],
        ['otto', 'Orada ne bulursanız, ona söyleyin. Bana değil.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Bu rafta bir şey her şeyin sesini alıp götürüyor. Sizinkini alacak kadar yaklaşmasına izin vermeyin.'],
      ],
    },
    recap: {
      lake: 'Ostra Gölü, 14 Ocak 1979. On iki yaşındaydım. Wren peşimden buza, büyük çocukların olduğu kulübeye geldi ve ben ona kaybol dedim. Karda yanlış yöne, buzun ince olduğu eski nehrin üstüne gitti; ben sesi duydum ve arkamı dönmedim. Sonra eve gidip anneanneme onun hiç dışarı çıkmadığını söyledim.',
    },
    endings: {
      thaw: {
        title: 'ÇÖZÜLME', subtitle: 'Yüksek sesle söylenen gerçek',
        lines: [
          'Söylüyorum. Hepsini. Kelimeler, on dokuz yıldır ağzımda tuttuğum bir şey gibi içimden çıkıyor.',
          'Wren arkasını dönüyor. Yüzü soğuktan pembe. Bana hep baktığı gibi bakıyor, olduğumdan daha uzunmuşum gibi.',
          'Eldiveni ona veriyorum. Takıyor. İki elini birden kaldırıp gösteriyor: iki kırmızı eldiven, yine bir çift.',
          'Sonra dönüyor ve buzun üstünden, evin ışıklarına doğru eve yürüyor, arkasına bakmıyor. Sorun değil. Artık yolu biliyor.',
          'Sabah altıyı on geçe Depo 9’daki gişede, önümde açık paketle uyanıyorum. Yağmur dinmiş.',
          'Talep 256’nın üstüne TESLİM EDİLDİ yazıyorum. Halvard polisini on dokuz yıllık bir dava için arıyorum. Sonra anneannemin kasetini dolabımdan çıkarıyorum ve sonuna kadar dinliyorum.',
          'Nisan’da, buzlar çözülünce, dalgıçlar eski nehir yatağını arıyor.',
          'Wren, anneannemizin yanına, gölün tamamını görebildiğin tepeye gömülüyor.',
          'O ilk sabah Depo 9’un tepsisinde ikinci bir etiket vardı, henüz tanımadığım yaşlı, titrek bir elle: TESLİM EDİLDİ. SONUNDA. — A.',
        ],
      },
      snowfall: {
        title: 'KAR', subtitle: 'Kalan',
        lines: [
          '“Öylece kayboldu,” diyorum. “Kimse bir şey görmedi.”',
          'Wren arkasını dönmüyor. Arkamda yeşil atkılı şey çok yakınımda duruyor. Atkıyı çözmeye başlıyor, dolana dolana, çözülecek bir şey kalmayana kadar.',
          'Altında benim kendi yüzüm var, on iki yaşında, yanaklarında soğuk.',
          'Kar gölün üstüne yağıyor; koyu buzu, üstündeki kırmızı figürü ve ayak izlerini, benimkileri ve onunkileri örtüyor, görecek hiçbir şey kalmayana kadar.',
          'Çok aşağılarda bir yerde, pnömatik borudan yeni bir el yazısıyla bir not yukarı çıkıyor. GECE MEMURU, SEVİYE 256. İLK VARDİYA.',
          'Dokuzuncu kanalda, çok sessizce: “Gece vardiyasına hoş geldiniz, Ada.”',
        ],
      },
      morning: {
        title: 'SABAH', subtitle: 'Kaybolan herkes',
        lines: [
          'Söylüyorum. Hepsini. Wren arkasını dönüyor. Eldiveni ona veriyorum, iki elini birden kaldırıp gösteriyor, yine bir çift, ve buzun üstünden, evin ışıklarına doğru eve yürüyor.',
          'Sabah altıyı on geçe Depo 9’daki gişede, önümde açık paketle uyanıyorum. Talep 256’nın üstüne TESLİM EDİLDİ yazıyorum.',
          'Çeyrek geçe, arşivin sonundaki yük asansörü kendiliğinden açılıyor.',
          'Modası otuz dört yıl önce geçmiş bir palto giymiş yaşlı bir adam iniyor; elinde, sanki az önce verilmiş gibi pirinç bir rozet tutuyor.',
          '“Brandt,” diyor. “Otto. Şimdi hatırlıyorum.” Arşive, raflara, bana bakıyor. “Hangi yıldayız?”',
          'Söylüyorum. Uzun süre düşünüyor. Sonra gülüyor, gerçek bir kahkaha; ondan paraziti olmadan duyduğum ilk kahkaha.',
          'Nisan’da, buzlar çözülünce, dalgıçlar eski nehir yatağını arıyor. Wren, anneannemizin yanına, gölün üstündeki tepeye gömülüyor.',
          'O sabah Depo 9’un tepsisinde ikinci bir etiket var, çok iyi tanıdığım yaşlı, titrek bir elle: TESLİM EDİLDİ. SONUNDA. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
