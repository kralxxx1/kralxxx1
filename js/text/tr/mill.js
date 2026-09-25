/* Türkçe — Bölüm 2: Fabrika Deposu (Billy). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      mill: {
        name: 'SEVİYE 1', title: 'Fabrika Deposu', place: 'Billy’nin ayak sesleri',
        intro: 'Tavan yedi metre yukarıda. Raflar karanlığa uzanıyor. Bir yerlerde bir saat tıkırdıyor, hep aynı saniyeye takılı.',
      },
    },
    docs: {
      mill_intro: { title: 'Asansör kapısına bantlanmış', from: 'Eddie', body:
`Asansöre üç sigorta lazım. Pano yükleme ofisinin yanında.

Kırmızı olan koridorlarda devriye geziyor. Hızlı ve hiç durmuyor, ama gürültücü. Kulak ver.

Açık alanda ondan kaçmaya çalışma. Kimse Billy’den kaçamaz.

—E` },
      mill_layoff: { title: 'Şirket kâğıdına yazılmış bir mektup', from: 'Harlow Fabrikası, Sevkiyat Bölümü', date: '30 Mayıs 1986', body:
`Sayın Ray,

Front Caddesi sevkiyat biriminin yeniden yapılandırılması kapsamında görevinize 30 Haziran 1986 itibarıyla son verilmiştir.

Yirmi beş yıllık sadık hizmetiniz için teşekkür ederiz. Lütfen dolap anahtarınızı ve kartınızı ön büroya teslim ediniz.

Ekte bir hatıra kol saati bulacaksınız.

Harlow Fabrikası Yönetimi` },
      mill_punch: { title: 'Bir puantaj kartı', from: 'Harlow Fabrikası', date: '1986 yazı', body:
`ÇALIŞAN: BILLY (YAZLIK — TEMİZLİKÇİ)
ÜCRET: saatte 3,35 $

2/6  07:00 — 15:00
3/6  07:00 — 15:00
4/6  06:52 — 15:04
...
30/6  07:00 — 11:15

Son satırın üstüne mavi kalemle yazılmış:
BABAMIN DA SON GÜNÜ` },
      mill_graffiti: { title: 'Raflarda sprey boya', body:
`BLY #1
BILLY BURADAYDI
BILLY HEP BURADA` },
      mill_billy1: { title: 'Bir mont cebinde katlanmış not', from: 'Billy', date: 'Mart 1987', body:
`Herkes hiçbir şeyden korkmadığımı sanıyor.

Babamın bütün gün radyo kapalı mutfakta oturmasından korkuyorum.

O yüzden oynuyorum. Birinci olan adam mutfakta oturmaz.

(Penny bunu okursa gerçekten öldürürüm.)` },
      mill_ray: { title: 'Hiç gönderilmemiş bir mektup', from: 'Ray (Billy’nin babası)', date: 'Mayıs 1987', body:
`Billy,

Polis yine anahtarı sordu. Anahtar falan umurumda değil dedim. Bu kasabadaki bütün anahtarlar senin olsun.

Artık hırdavatçıdayım. Fena değil. Daha az saat. Maçı dinliyorum.

Bisikletini tamir ettim. Yeni zincir, yeni fren. Garajda duruyor.

Eve gel ve bin. Tek kelime etmeyeceğim.

Babam` },
      mill_manifest: { title: 'Bir sevk irsaliyesi', from: 'Harlow Fabrikası, 3 No’lu Rampa', date: '17 Nisan 1987', body:
`SEVKİYAT #0256
İÇERİK: 1 kol saati (durmuş)
AĞIRLIK: yok
VARIŞ YERİ: —
TESLİM ALAN: —

Kâğıt ılık, sanki yazıcıdan az önce çıkmış.` },
      mill_walt3: { title: 'Walt’ın defteri', from: 'Walt', date: 'İçeride, ? gün', body:
`Kırmızı hiç durmuyor. Aynı turları tekrar tekrar koşuyor, Billy’nin labirenti oynadığı gibi: hep ilk, hep en hızlı, hiç soluklanmadan.

Bir kere adını seslendim. Bir saniye durdu. Sadece bir saniye.

Sonra çığlık atıp kaçtı, ben de peşinden gittim, ve nedenini hatırlamıyorum.

Sanırım açtım.` },
      mill_shrine: { title: 'Sunaktaki fotoğrafın altında', from: 'W.', body:
`Hep ilk olmak zorundaydı.
Kabine ilk. 900.000’e ilk.
Ekrandan ilk geçen.

Ona durmasını sağlayacak bir şey ver.` },
      mill_tape: { title: 'Kaset: "Birinci sıra, tarih için"', from: 'Penny’nin teyp kaydedicisi', date: '16 Nisan 1987, 23:52', body:
`[Klik. Salon sesleri. Gülen çocuklar.]

BILLY: Ben Billy, birinci sıra, tarih için kayıt yapıyorum. Bu gece kill screen’i geçiyoruz.

PENNY: Bu gece kill screen’i geçmeyi DENİYORUZ.

BILLY: Walt imkânsız diyor. Walt dokuz yüz bini geçemem de demişti.

CLYDE: Başımız belaya girecek mi? Annem beni Sam’lerde sanıyor.

BILLY: Bela yakalananlar içindir Clyde.

IVY: ...Sam eve gitti Billy.

BILLY: Sam korkak. Level 256 bize kalır.

[Bir an sessizlik.]

CLYDE: O korkak değil.

[Klik.]` },
    },
    obj: {
      mill_fuses: 'Sigortaları bul ({n}/3)',
      mill_panel: 'Sigortaları asansör panosuna tak',
      mill_wait: 'Asansör geliyor… Hayatta kal ({n} sn)',
      mill_leave: 'Asansöre bin',
      ghost: '{pos} eşyasını türbesine götür (isteğe bağlı)',
    },
    mono: {
      mill_start: 'Bir saatin tik takı. Hep aynı saniyeye takılı.',
      mill_redSeen: 'Kırmızı... bir çarşaf gibi. İki beyaz göz. Bana bakıyor.',
      mill_fuse: 'Bir sigorta daha.',
      mill_elevator: 'Asansör geliyor. Yavaş. Çok yavaş.',
      mill_watch: '3:17. Saatle aynı.',
    },
    lines: {
      mill_panel: 'Sigortaları tak',
      mill_panelIdle: 'Sigorta panosu ({n}/3)',
      mill_slots: 'Panoda üç boş yuva var.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? Orada mısın? ...Aa. Burayı biliyorum. Harlow Fabrikası, Front Caddesi deposu. Billy’nin babası burada yirmi beş yıl çalıştı.'],
        ['eddie', 'Yani kırmızı da burada olacak.'],
      ],
      mill_red: [
        ['eddie', 'Peşinde! Açık alanda ondan kaçmaya çalışma. Görüşünü kes, köşe dön, aranıza bir şey koy!'],
      ],
      mill_watch: [
        ['eddie', 'O bir saat mi? ...Ray’in saati. Onu kovdukları gün vermişlerdi. Billy ondan sonra her gün taktı.'],
        ['eddie', 'Buralarda bir sunak var. Oraya götür. Belki hatırlar.'],
      ],
      mill_freed: [
        ['eddie', '...Durdu mu? Sam, ne yaptın? Orada... öylece duruyor.'],
        ['eddie', 'Aman Tanrım. O Billy. Gerçekten Billy.'],
      ],
      mill_elevator: [
        ['eddie', 'O asansör çok gürültülü. Her şey duydu. Gelene kadar hayatta kal.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
