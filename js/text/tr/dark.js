/* Türkçe — Bölüm 7: Karanlık (Clyde). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      dark: {
        name: 'SEVİYE 6', title: 'Karanlık', place: 'Clyde’ın karanlığı',
        intro: 'Aynı sarı odalar, bütün ışıkları ölü. Buradaki karanlık, yaslanabileceğin kadar koyu. İçinde bir yerlerde bir şey gülmemek için çok uğraşıyor.',
      },
    },
    docs: {
      dark_intro: { title: 'Bir jeneratörün üstünde', from: 'Eddie', body:
`Üç jeneratör. Mazot bidonları etrafa dağılmış.

Burada karanlığın dişleri var. Ben onlara sırıtkan diyorum. Işık onları kovar. Fener, ışık çubuğu, ne olursa.

Turuncu olana gelince... ışığını onun üstünde tut. Ona uzun süre sırtını dönme.

—E` },
      dark_diary1: { title: 'Bir okul defterinden sayfa', from: 'Clyde', date: '15 Nisan 1987', body:
`Yarın 256 Operasyonu!!!

Billy feneri benim tutabileceğimi söyledi. Penny bir kaset yaptı. Ivy hayalet hareketlerinin haritasını çıkardı ve gerçekten çok iyi.

Sam walkman’ini kırdığım için bana kızgın. İstemeden oldu. Üstüne oturdum. Mart VE Nisan harçlığımı ona vereceğim.

Gelecek. Hep gelir.` },
      dark_diary2: { title: 'Son sayfa', from: 'Clyde', date: '16 Nisan 1987 — 22:00, salonda', body:
`Sam eve gitti.

"Tamam, kaybol o zaman" dedi. Hiçbir şey demedim. Bir şey demeliydim.

Billy korkutucu olsun diye arkadaki ışıkları söndürdü. İşe yaradı.

Dedemin çakmağı bende. Korkmuyorum.

Biraz korkuyorum.

Yarın Sam gelince önce ben özür dileyeceğim. Ondan önce. Böylece ben kazanırım.` },
      dark_grandpa: { title: 'Bir çakmak kutusunda küçük bir kart', from: 'Clyde’ın dedesi', date: '1985', body:
`Clyde —

Bunu büyükannen 1951’de bana verdi, gece vardiyasından eve yolumu bulayım diye.

Artık senin. Hiçbir zaman karanlıkta oturmak zorunda değilsin.

—Deden` },
      dark_grinners: { title: 'Titrek bir el yazısı', from: 'Eddie', body:
`Sırıtkanlar insan değil. Hayalet bile değiller.

Bence oyunun karanlıkta ne olduğuna dair fikri onlar. Clyde’ın fikri. On üç yaşında bir çocuğun yatağın altında ne olduğuna dair fikri.

Bir çubuk yak, üçe kadar say, gitmişler.

Bu seviyede pek uyumuyorum.` },
      dark_walt6: { title: 'Walt’ın defteri, sıkışık yazı', from: 'W', date: '—', body:
`Adımı hatırlamıyorum. W ile başlıyor.

Bir kızın el yazısını hatırlıyorum. Yuvarlak harfler. Bacaklı sarı bir daire çizmişti.

Bozuk para tadını hatırlıyorum.

Turuncu da bana bakmıyor. Artık kimse bana bakmıyor.

Ye, diyor tahta. Ye.` },
      dark_wall: { title: 'Duvara çakmak isiyle yazılmış', body:
`BAKMA BANA

ÖZÜR DİLERİM SAM` },
      dark_porch: { title: 'Bir sineklikli kapıya bantlanmış not', from: 'Maggie (Clyde’ın annesi)', date: 'Nisan 1987', body:
`Clyde —

Eve gelene kadar veranda ışığı açık kalacak.

Sevgiler, Annen` },
      dark_tape: { title: 'Kaset: "Clyde’ın fıkrası"', from: 'Penny’nin teyp kaydedicisi', date: '17 Nisan 1987, 00:40', body:
`[Klik. Salonun arka odası. Işıklar kapalı. Biri çakmak çakıyor.]

CLYDE: Tamam, tamam. Pacman karşıya neden geçmiş?

BILLY: Çünkü hayaletler öbür taraftaymış.

CLYDE: Hayır! Çünkü yolda NOKTA varmış!

[Sessizlik. Sonra Ivy kıkırdıyor, sonra Penny, sonra herkes fıkranın hak ettiğinden çok daha fazla gülüyor.]

CLYDE: [hâlâ gülerek] Sam burada olmalıydı. O buna hep güler.

[Gülüşmeler azalıyor.]

PENNY: ...Yarın gelir Clyde.

[Klik.]` },
    },
    obj: {
      dark_generators: 'Jeneratörleri çalıştır ({n}/3)',
      dark_leave: 'Servis asansörüne ulaş',
    },
    mono: {
      dark_start: 'Hiçbir şey göremiyorum. Fener... yeter mi bilmiyorum.',
      dark_orangeSeen: 'Köşede turuncu bir şey duruyor. Kıpırdamıyor. Ben baktıkça kıpırdamıyor.',
      dark_grinner: 'Karanlıkta bir gülümseme. Sadece dişler.',
      dark_gen: 'Jeneratör öksürerek uyanıyor. Işıklar.',
      dark_lighter: 'Çakmağı. 1986’da bir kere tutmuştum. On saniye sonra geri vermemi istemişti.',
    },
    lines: {
      dark_gen: 'Mazot dök ve çalıştır (basılı tut)',
      dark_genEmpty: 'Jeneratör (mazot yok)',
      dark_needFuel: 'Önce bir mazot bidonu bul.',
      dark_tankEmpty: 'Jeneratörün deposu boş.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Bundan nefret ediyorum. Çok nefret ediyorum. Işıkta kal Sam. Ciddiyim.'],
      ],
      dark_orange: [
        ['eddie', 'Turuncu... o Clyde. Sen ona bakarken üstüne gelmez. Hiç kimsenin gözüne bakamazdı.'],
        ['sam', 'Benim gözüme bakardı. Hep.'],
        ['eddie', '...Evet. Galiba bakardı.'],
      ],
      dark_lighter: [
        ['eddie', 'Dedesinin çakmağı. Kimsenin dokunmasına izin vermezdi. Billy’nin bile.'],
      ],
      dark_freed: [
        ['eddie', '...O daha bir çocuk Sam. Hepsi daha çocuk.'],
        ['eddie', 'Nasıl bir oyun çocuklara bunu yapar?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
