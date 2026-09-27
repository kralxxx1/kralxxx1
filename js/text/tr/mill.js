/* Türkçe — Seviye 1: Değirmen Deposu (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      mill: {
        name: 'SEVİYE 1', title: 'Değirmen Deposu', place: 'Danny’nin anısı — Harlow Değirmeni, Front Sokağı',
        intro: 'Tavan altı metre yukarıda. Raflar karanlığın içine uzanıyor. Bir yerde bir saat tıkırdıyor, hep aynı saniyede.\n\nDanny’nin babası bu binada yirmi beş yıl koli paketledi. Sonra bir cuma ona bir saat verip evine gönderdiler.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Yük asansörünün kapısına bantlanmış', from: 'Eddie', body:
`Yük asansörü üç sigorta istiyor. Pano yükleme ofisinin yanında.

Kırmızı olan raf aralarında devriye geziyor. Hızlı, hiç durmuyor ama GÜRÜLTÜLÜ. Onu dinle.

Açık alanda ondan kaçmaya çalışma. Danny’den kimse kaçamaz.

—E.` },
      mill_layoff: { kind: 'letter', title: 'Şirket kâğıdına yazılmış bir mektup', from: 'Harlow Değirmeni, Sevkiyat Bölümü', date: '30 Mayıs 1986', body:
`Sayın Ray,

Front Sokağı sevkiyat biriminin yeniden yapılandırılması kapsamında görevinize 30 Haziran 1986 itibarıyla son verilecektir.

Yirmi beş yıllık sadık hizmetiniz için teşekkür ederiz. Lütfen dolap anahtarınızı ve kartınızı ön büroya teslim ediniz.

Ekteki kol saatini minnettarlığımızın bir nişanesi olarak kabul ediniz.

Harlow Değirmeni Yönetimi` },
      mill_punch: { kind: 'card', title: 'Bir mesai kartı', from: 'Harlow Değirmeni', date: '1986 yazı', body:
`ÇALIŞAN: KOWALSKI, D. (YAZ — SÜPÜRGECİ)
ÜCRET: saatte 3,35 $

02/6  07:00 — 15:00
03/6  07:00 — 15:00
04/6  06:52 — 15:04
...
30/6  07:00 — 11:15

Son satırın üstüne mavi tükenmezle:
BABAMIN DA SON GÜNÜ` },
      mill_graffiti: { kind: 'wall', title: 'Raflara sprey boyayla', body:
`DAN #1
DANNY BURADAYDI
DANNY HEP BURADA` },
      mill_danny1: { kind: 'note', title: 'Bir ceket cebinde katlanmış not', from: 'Danny', date: 'Mart 1987', body:
`Herkes hiçbir şeyden korkmadığımı sanıyor.

Babamın bütün gün radyo kapalı mutfakta oturmasından korkuyorum.

O yüzden oynuyorum. Birinci olan adam mutfakta oturmaz.

(Rosie bunu okursa onu gerçekten öldürürüm.)` },
      mill_ray: { kind: 'letter', title: 'Hiç gönderilmemiş bir mektup', from: 'Danny’nin babası Ray', date: 'Mayıs 1987', body:
`Danny,

Polis yine anahtarı sordu. Hiçbir anahtar umurumda değil dedim. Bu kasabadaki bütün anahtarlar senin olsun.

Artık hırdavatçıdayım. İdare ediyor. Saatler daha az. Maçı dinliyorum.

Bisikletini tamir ettim. Yeni zincir, yeni fren. Garajda.

Eve gel de bin. Tek kelime etmeyeceğim.

Babam` },
      mill_manifest: { kind: 'printout', title: 'Bir sevk irsaliyesi', from: 'Harlow Değirmeni, 3 No’lu Rampa', date: '17 Nisan 1987', body:
`SEVKİYAT #0256
İÇERİK: 1 kol saati (3:17’de durmuş)
AĞIRLIK: hiç
VARIŞ: —
TESLİM ALAN: —

Kâğıt ılık, sanki yazıcıdan az önce çıkmış gibi.` },
      mill_walt3: { kind: 'diary', title: 'Walt’ın günlüğü', from: 'Walt', date: 'İçeride, ? . gün', body:
`Kırmızı olan hiç durmuyor. Aynı turları tekrar tekrar koşuyor, tıpkı Danny’nin labirenti oynadığı gibi: hep ilk, hep en hızlı, hiç soluklanmadan.

Bugün bağırarak üstüme geldi. BIRAKTIN. BIRAKTIN.

Ben hiçbir şeyi bırakmadım. Beş yıldır her birine sımsıkı tutunuyorum. Kime bağırıyor o zaman?

Sonra peşinden gittim ve neden gittiğimi hatırlamıyorum. Sanırım açtım.` },
      mill_shrine: { kind: 'note', title: 'Sunaktaki fotoğrafın altında', from: 'W.', body:
`Hep ilk olmak zorundaydı.
Makineye ilk o gelirdi. 900.000’e ilk o ulaştı.
Ekrandan ilk o geçti.

Ona duran bir şey ver.` },
      mill_tape: { kind: 'tape', title: 'Kaset: "Birinci, tarih için"', from: 'Rosie’nin teyp kaydedicisi', date: '16 Nisan 1987, 23:52', body:
`[Klik. Salon gürültüsü. Gülen çocuklar.]

DANNY: Ben Danny Kowalski, birinci sıra, tarih için kayıt yapıyorum. Bu gece ölüm ekranını geçiyoruz.

ROSIE: Bu gece ölüm ekranını geçmeyi DENİYORUZ.

DANNY: Walt imkânsız diyor. Walt dokuz yüz bini de kimse geçemez demişti.

TOBY: Başımız belaya girecek mi? Annem Sam’lerde yatıyorum sanıyor.

DANNY: Bela yakalananlar içindir, Toby.

NELL: ...Sam eve gitti, Danny.

DANNY: Sam korkak. Ölüm ekranı bize kalır.

[Kısa bir sessizlik.]

TOBY: Sam korkak değil. Sam gelecek.

[Klik.]` },
    },
    obj: {
      mill_fuses: 'Sigortaları bul ({n}/3)',
      mill_panel: 'Sigortaları asansör panosuna tak',
      mill_wait: 'Asansör geliyor… Hayatta kal ({n} sn)',
      mill_leave: 'Asansöre bin',
    },
    mono: {
      mill_start: 'Bir saat tıkırdıyor. Hep aynı saniye.',
      mill_dannySeen: 'Kırmızı. Sırılsıklam bir çarşaf, kafa gibi kubbelenmiş, eteği sivri sivri yırtılmış. Kocaman iki göz, yüz yok. Altında bir oğlan boyunda bir şey var.',
      mill_fuse: 'Bir sigorta daha.',
      mill_elevator: 'Asansör geliyor. Yavaşça. Çok yavaş.',
      mill_watch: '3:17. Saatle aynı.',
    },
    lines: {
      mill_panel: 'Sigortaları tak',
      mill_panelIdle: 'Sigorta panosu ({n}/3)',
      mill_slots: 'Panoda üç boş yuva var.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? Orada mısın? ...Aa. Burayı biliyorum. Harlow Değirmeni, Front Sokağı’ndaki depo. Danny’nin babası burada yirmi beş yıl çalıştı.'],
        ['eddie', 'Demek ki kırmızı olan da burada olacak.'],
      ],
      mill_danny: [
        ['eddie', 'Peşinde! Açıkta onunla yarışma. Görüşünü kes, köşe dön, aranıza bir şey koy!'],
        ['sam', 'Bir şey bağırıyor!'],
        ['eddie', 'Hep bağırır. "Bıraktın." Bana da bağırdı, Walt’a da. Kimi kastettiğini bilmiyorum. KOŞ.'],
      ],
      mill_watch: [
        ['eddie', 'O bir saat mi? ...Ray’in saati. İşten çıkardıkları gün ona vermişler. Danny ondan sonra her gün taktı.'],
        ['eddie', 'Buralarda bir sunak var. Oraya götür. Belki hatırlar.'],
      ],
      mill_freed: [
        ['eddie', '...Durdu mu? Sam, ne yaptın? Öylece... duruyor.'],
        ['eddie', 'Aman Tanrım. Bu Danny. Bu gerçekten Danny.'],
      ],
      mill_elevator: [
        ['eddie', 'O asansör çok gürültülü. Buradaki her şey duydu. O gelene kadar hayatta kal.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
