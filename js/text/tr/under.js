/* Türkçe — 1. Bölüm: Sahipsiz (Seviye 256, Aşağısı). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      under: {
        name: '1. BÖLÜM', title: 'Sahipsiz', place: 'Seviye 256',
        intro: 'Asansör uzun süre indi. Garın derinliğinden uzun. Şehrin yaşından uzun.\n\nKapılar, ıslak halı ve başkalarının şemsiyeleri kokan sarı odalara açıldı. Bir yerlerinde bir uğultu. Bir yerlerinde, kimsenin geri gelip almadığı her şey.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Halının üstünde bir bagaj etiketi', body:
`BULAN LÜTFEN ŞURAYA GETİRSİN:
M. STRAND, 8 YAŞINDA
PINEWOOD AÇIK HAVA SİNEMASI, 5. SIRA

(Bir çocuk yazısı. İpi kemirilerek kopmuş.)` },
      under_umbrella: { kind: 'card', title: 'Bir şemsiyeye bağlı etiket', from: 'O.B.', body:
`Eşya 41.207.
Bir şemsiye, siyah, erkek.
Üzüntüyle bırakılmış.

Eşya 41.208.
Bir eldiven, sol. Henüz kimsenin değil.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'Bir kızın bavulunda bir mektup', from: 'Annen', date: '12 Aralık 1990', body:
`Lina —

Biletini aldığında paltonun İÇ cebinde tut. Dış cebinde değil. Trende bakmak için çıkarma, nasıl olduğunu biliyorsun.

Nordvik son durak, altıyı çeyrek geçe. Karanlık hakkında ne dersen de, baban arabayla peronda olacak. Ondan önce hiçbir yerde inme.

Kimsenin sana o trene ait olmadığını söylemesine izin verme.

Sevgiler, Annen` },
      under_chalk: { kind: 'wall', title: 'Duvarda tebeşir yazısı', body:
`YASSI OLANLAR DUVARDAN ÇIKAR
SEN ARKANI DÖNÜNCE
O YÜZDEN DÖNME
— O.` },
      under_otto1: { kind: 'diary', title: 'Otto’nun kamp defteri', from: 'Otto Brandt', body:
`Günleri saymayı bıraktım. Onun yerine eşyaları sayıyorum. Bugün 41.212: bir şapka, bir işitme cihazı, köpeksiz bir tasma.

Telsiz dokuzuncu kanalda çalışıyor. Kimse cevap vermiyor. Ben yine de konuşuyorum. Ses çalışır durumda kalsın.

Bu sabah yerden bir not geldi. A. imzalı. “Biri geliyor. Ona iyi davran; sana inanmayacak.”

Ben hep iyi davranırım. İnsanların zorlandığı şey inanmak.` },
      under_list: { kind: 'note', title: 'Ayıklama katının kuralları (geçici)', from: 'O.B.', body:
`1. Kayıp ışıklar saklamak içindir, yemek için değil. Aşağıda bir şey buna katılmıyor.
2. Uğultu koyulaşıp lambalar kekelemeye başlayınca yürümeyi bırak. Duyar. Görmez.
3. Duvar kâğıdına güvenilmez.
4. Dizin Kapısı dört ışık ister. Ben bir seferde hiç üçten fazla bulamadım.
5. Kendini dosyalama.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Suyun yanında nemli bir sayfa', from: 'O.B.', body:
`Bu odadaki su soğuk ve göl tadında. Aşağıdaki her oda birinin en kötü öğleden sonrasına ait.

Bu, henüz tanışmadığım birine ait.` },
      under_index: { kind: 'wall', title: 'Kapının yanına şablonla yazılmış', body:
`DİZİN
LÜTFEN TALEBİNİZİ HAZIR BULUNDURUN` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Bir radyatörün altında bir resim', from: 'Wren, 7 yaşında', body:
`Pastel boya. Sarı bir oda. Ağzı diş dolu büyük, yuvarlak bir şey. Üstünde uçan: küçük kırmızı bir kuş.

Altında:
IŞIKLARI YİYOR
KUŞ DAHA HIZLI` },
    },
    items: {},
    obj: {
      under_walkie: 'Sarı odalardan bir yol bul',
      under_lights: 'Kayıp ışıkları bul ({n}/4)',
      under_index: 'Dört ışığı Dizin Kapısı’na götür',
      under_leave: 'Dizin Kapısı’ndan geç',
    },
    mono: {
      under_start: 'Burası bodrum değil. Asansör dört dakika indi. Gar o kadar derin değil.',
      under_walkie: 'Bir telsiz, dokuzuncu kanala bantlanmış. Biri açık bırakmış.',
      under_light1: 'Küçük bir lamba. Sıcak. Bir anlığına karanlıktaki her şey sustu, nefesini tutuyormuş gibi.',
      under_light4: 'Dört. Katın öbür ucunda bir yerde, bir şey çiğnemeyi bıraktı.',
      under_indexSeen: 'DİZİN. Kapının yanında dört boş yuva.',
      under_wpSeen: 'Duvarın içindeydi. Duvarın kendisiydi. Ve ben arkamı dönünce kıpırdadı.',
      under_eaterSeen: 'Koridora sığmayacak kadar büyük. Solgun. Çiğniyor.',
      under_humNear: 'Uğultu koyulaştı. Işıklar kekeliyor.',
    },
    lines: {
      under_slots: 'Dört yuva ({n}/4 ışık)',
      under_place: 'Işıkları yuvalara yerleştir',
      under_walkiePrompt: 'Telsizi al',
      under_lightPrompt: 'Kayıp ışığı al',
    },
    radio: {
      under_otto1: [
        ['radio', '[parazit]'],
        ['otto', '...dokuz. Burası dokuz. Hatta biri mi var? Nefesini duyabiliyorum. Bu bir eleştiri değil.'],
        ['ada', 'Kimsiniz?'],
        ['otto', 'Brandt. Depo 9, gece gişesi. Ve siz benim ayıklama katımda fişsiz dolaşıyorsunuz.'],
        ['ada', 'Otto Brandt mı? Siz 1964’te kayboldunuz.'],
        ['otto', '1964. Şimdi... yok. Sonra söylersiniz. Adınız ne, memur hanım?'],
        ['ada', 'Ada. Ada Lind. Sizin işiniz bende.'],
        ['otto', 'O hâlde başınız sağ olsun. Dinleyin, Ada Lind. Burası, kimsenin geri gelip almadığı her şeyin gittiği yer. Çok büyük ve boş değil.'],
        ['otto', 'Bir kapı var. Dizin Kapısı. Kayıp ışıklardan dördünü istiyor, küçük lambalar, görünce tanırsınız. Dördünü getirin, açılır.'],
        ['ada', 'Kapının ötesinde ne var?'],
        ['otto', 'Başka katlar. Ben raf diyorum. Bir not geleceğinizi söyledi. A. imzalı. Bir A. tanıyor musunuz?'],
        ['ada', '...Hayır.'],
        ['otto', 'Ben de. Kanalı açık tutun.'],
      ],
      under_lights: [
        ['otto', 'Bir tane buldunuz. Yakınınızda tutun. Aşağıda bir şey onları yiyor ve elinizde yenisi varken sizden korkuyor.'],
        ['ada', 'Ne kadar süre?'],
        ['otto', 'Uzun değil. Aşağıda hiçbir şey uzun süre korkmaz.'],
      ],
      under_wallpaper: [
        ['otto', 'Yassı adamları gördünüz mü? Duvar kâğıdındakileri. Sırtınız dönükken çıkıyorlar.'],
        ['ada', 'Ya onlara bakarsam?'],
        ['otto', 'O zaman duvar kâğıdıdırlar. Çok sabırlı duvar kâğıdı.'],
      ],
      under_hum: [
        ['otto', 'Uğultu koyulaşır, lambalar kekelerse durun. Orada bir şey dikiliyordur. Sizi göremez. Ayakkabılarınızı duyabilir.'],
        ['ada', 'Ne o?'],
        ['otto', '“Çeşitli” altına dosyaladım. Geniş bir kategori.'],
      ],
      under_eater: [
        ['otto', 'Ada. O ses. Uyandı.'],
        ['otto', 'Yiyici. Aşağıdaki en eski şey. Kimsenin istemediğini yer. Bunun siz olduğuna karar vermesine izin vermeyin. Dizin Kapısı’na koşun. Köşeleri dönün; köşelerde yavaştır.'],
      ],
      under_index: [
        ['otto', 'Dizin Kapısı. Dört yuva. Ben bir seferde hiç üçten fazla ışık bulamadım. Belki siz daha şanslısınızdır.'],
      ],
      under_open: [
        ['otto', 'Açıldı. Açık hâlini hiç görmemiştim.'],
        ['ada', 'Benimle gelin.'],
        ['otto', 'Gelemem. Nedenini bilmiyorum. Sanırım bu kata dosyalanmışım. Siz gidin. Dokuzda olacağım.'],
        ['otto', 'Aşağıdaki her rafın dibinde bir yalan var, Ada. Yalanı arayın.'],
      ],
      under_badge: [
        ['ada', 'Otto. Size ait bir şey getirdim. Masanızdan. Kapıya bırakıyorum.'],
        ['otto', '[uzun bir sessizlik]'],
        ['otto', 'O. Brandt. Otto. Adım buydu. Bir yere koymuşum da nereye koyduğumu unutmuşum.'],
        ['otto', 'Teşekkür ederim, Ada. Orada bırakın. Artık nerede olduğunu bileceğim.'],
      ],
    },
    recap: {
      under: 'Seviye 256: kimsenin geri gelip almadığı şeylerle dolu sarı odalar. Otto Brandt aşağıda, yaşıyor, dokuzuncu kanalda; bir yıl kadar olduğunu sanıyor. Arkamda yuvarlak ve çok yaşlı bir şey uyanırken Dizin Kapısı’na dört kayıp ışık verdim.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
