/* Türkçe — Seviye 6: Işıklar Söndü (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      dark: {
        name: 'SEVİYE 6', title: 'Işıklar Söndü', place: 'Toby’nin anısı — karanlık',
        intro: 'Aynı sarı odalar, bütün ışıkları ölü. Buradaki karanlık, yaslanabileceğin kadar koyu.\n\nToby hayatı boyunca karanlıktan korktu. Burada karanlık hiçbir şeyden korkmuyor. İçinde bir yerde bir şey gülmemek için çok uğraşıyor.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Bir jeneratörün üstünde', from: 'Eddie', body:
`Üç jeneratör. Mazot bidonları etrafa dağılmış.

Bu seviyede karanlığın dişleri var. Ben onlara sırıtan diyorum. Işık onları uzaklaştırır. Fener, ışık çubuğu, ne olursa.

Kehribar olan... ışığını onun üstünde tut. Ona uzun süre sırtını dönme.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Bir okul defterinden bir sayfa', from: 'Toby', date: '15 Nisan 1987', body:
`Yarın Operasyon 256!!!

Danny fenerden ben sorumluyum dedi. Rosie kaset yaptı. Nell hayalet hareketlerinin haritasını çıkardı, gerçekten çok iyi olmuş.

Bugün Sam’in walkman’inin üstüne oturdum. Çatır diye ses çıktı. Henüz bilmiyor. Ona mart VE nisan harçlığımı vereceğim.

Danny, #7’deki kehribar hayalet benim çünkü korkak olan o diyor. Walt akıllı olan o diyor. Her iki durumda da o BENİM hayaletim.` },
      dark_diary2: { kind: 'diary', title: 'Son sayfa', from: 'Toby', date: '17 Nisan 1987, 00:50 — salonda', body:
`Çakmak ışığında yazıyorum. Danny korkutmak için arkadaki ışıkları kapattı. İşe yaradı.

Sam 21:40’ta eve gitti. Sam "Peki. Kaybol o zaman." dedi. Ben bir şey demedim. Arka odada kimse görmesin diye ağladım.

Sonra 12:40’ta biri arka kapıyı çaldı ve SAM’di. Sırılsıklam.

SAM GERİ GELDİ!!! Sam hep geri gelir.

Önce ben özür diledim. Yani ben kazandım.

Seviye 212. Danny saat üçte 256 diyor. Beş el birden. Kimse bırakmaz.` },
      dark_grandpa: { kind: 'card', title: 'Bir çakmak kutusunda küçük bir kart', from: 'Toby’nin dedesi', date: '1985', body:
`Toby —

Bunu 1951’de, gece vardiyasından eve yolumu bulayım diye büyükannen vermişti.

Artık senin. Hiç karanlıkta oturmak zorunda kalmayacaksın.

—Deden` },
      dark_grinners: { kind: 'note', title: 'Titrek bir el yazısı', from: 'Eddie', body:
`Sırıtanlar insan değil. Hayalet bile değiller.

Bence oyunun karanlıkta ne olduğuna dair fikri. Toby’nin fikri. On üç yaşında bir çocuğun yatağın altında ne yaşadığına dair fikri.

Bir çubuğu kır, üçe kadar say, gitmiş olurlar.

Bu seviyede pek uyumuyorum.` },
      dark_walt6: { kind: 'diary', title: 'Walt’ın günlüğü, sıkışık bir yazı', from: 'Walt', date: 'İçeride', body:
`Adımı hatırlamıyorum. W ile başlıyor.

Küçük bir kızın el yazısını hatırlıyorum. Yuvarlak harfler. Boynuzlu turuncu bir şey çizmiş, altına BABAM yazmıştı.

Bozuk para tadını hatırlıyorum.

Kehribar olan da bana bakmıyor. Artık kimse bana bakmıyor.

YE, diyor tahta. YE.` },
      dark_wall: { kind: 'wall', title: 'Duvara çakmak isiyle yazılmış', body:
`BANA BAKMA

ÖZÜR DİLERİM SAM` },
      dark_porch: { kind: 'note', title: 'Bir sineklik kapısına bantlanmış not', from: 'Toby’nin annesi Maggie', date: 'Nisan 1987', body:
`Toby —

Sen eve gelene kadar veranda lambası açık kalacak.

Seni seviyorum, annen` },
      dark_tape: { kind: 'tape', title: 'Kaset: "Toby’nin fıkrası"', from: 'Rosie’nin teyp kaydedicisi', date: '16 Nisan 1987, 23:58', body:
`[Klik. Salonun arka odası. Işıklar kapalı. Bir çakmak çakılıyor.]

TOBY: Tamam, tamam. Muncher karşıya neden geçmiş?

DANNY: Hayaletler bu taraftaymış da ondan.

TOBY: Hayır! Yolda YILDIZLAR varmış da ondan!

[Sessizlik. Sonra Nell kıkırdıyor, sonra Rosie, sonra herkes fıkranın hak ettiğinden çok daha fazla gülüyor.]

TOBY: [hâlâ gülerek] Sam burada olmalıydı. Sam buna hep güler.

[Gülüşler azalıyor.]

ROSIE: ...Sam gelecek Toby.

[Klik.]` },
    },
    obj: {
      dark_generators: 'Jeneratörleri çalıştır ({n}/3)',
      dark_leave: 'Servis asansörüne git',
    },
    mono: {
      dark_start: 'Hiçbir şey göremiyorum. Fener... yeter mi bilmiyorum.',
      dark_tobySeen: 'Köşede kehribar bir şey. Eteği yanık bir çarşaf. Kıpırdamıyor. Ben ona bakarken değil.',
      dark_grinner: 'Karanlıkta bir gülümseme. Sadece dişler.',
      dark_gen: 'Jeneratör öksürerek uyanıyor. Işık.',
      dark_lighter: 'Onun çakmağı. 1986’da bir kere tutmama izin vermişti. On saniye sonra geri istemişti.',
      dark_diary2: 'Sam geri geldi. ...Hayır. Hayır. Eve gittim. 21:40’ta eve gittim.',
    },
    lines: {
      dark_gen: 'Mazotu dök ve çalıştır (basılı tut)',
      dark_genEmpty: 'Jeneratör (mazot yok)',
      dark_needFuel: 'Önce bir mazot bidonu bul.',
      dark_tankEmpty: 'Jeneratörün deposu boş.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Bundan nefret ediyorum. Bundan o kadar nefret ediyorum ki. Işıkta kal Sam. Ciddiyim.'],
      ],
      dark_toby: [
        ['eddie', 'Kehribar... o Toby. Sen ona bakarken üstüne gelmez. Korktuğunda kimsenin gözünün içine bakamazdı.'],
        ['sam', 'Benim gözümün içine bakardı. Her zaman.'],
        ['eddie', '...Evet. Galiba bakardı.'],
      ],
      dark_lighter: [
        ['eddie', 'Dedesinin çakmağı. Kimseye dokundurmazdı. Danny’ye bile.'],
      ],
      dark_freed: [
        ['eddie', '...O daha bir çocuk Sam. Hepsi daha çocuk.'],
        ['eddie', 'Nasıl bir oyun çocuklara bunu yapar?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
