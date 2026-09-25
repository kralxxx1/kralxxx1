/* Türkçe — Bölüm 13–14: Labirent (seviye 255) ve Kill Screen (seviye 256). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      maze: {
        name: 'SEVİYE 255', title: 'Labirent', place: 'Bozuk olandan önceki tahta',
        intro: 'Karanlıkta parlayan mavi duvarlar, bel hizasında süzülen noktalar, ortada pembe kapılı bir ev. Burayı kendi yatak odandan iyi tanıyorsun.',
      },
      killscreen: {
        name: 'SEVİYE 256', title: 'Kill Screen', place: 'Kimsenin görmemesi gereken yarı',
        intro: 'Tahtanın sol yarısı bildiğin labirent. Sağ yarısı ise yerinden kopmuş harfler, sayılar ve renkler, havada asılı. Çekirdekte bir yerde bir şey prize takılı.',
      },
    },
    docs: {
      maze_neon: { title: 'Labirent duvarına neonla yazılmış', from: 'W.', body:
`BUNU OKUYABİLİYORSAN
BENİM OYUNUMDASIN.
ÖZÜR DİLERİM.
NOKTALARI YE.
HAYALETLERE ZARAR VERME.
—W` },
      maze_rules: { title: 'Taş gibi soğuk bir levha', body:
`OYUNUN KURALLARI

1. Oyuncu yer.
2. Hayaletler kovalar.
3. Tahta temizlenir.
4. Sonraki tahta başlar.
5. Beşinci kural yoktur.` },
      maze_house: { title: 'Hayalet evinin kapısında', from: 'Eddie', body:
`Dört güç hapı perdeyi kapalı tutuyor. Her köşede bir tane.

Ev aşağı iniyor. Son iniş.

Öbür tarafta görüşürüz. —E` },
      maze_fruit: { title: 'Kiraz — bir anı', body:
`Lily ilk kirazını aldığında öyle bir çığlık attı ki Walt kahvesini düşürdü.

"Baba! MEYVE! MEYVE ALDIM!"

Ondan sonra her cumartesi makineye onun için bir çeyreklik attı, oyun boyunca arkasında durdu ve bir kere bile hangi yöne gideceğini söylemedi.` },
      ks_glitch1: { title: 'Havada bozuk karakterler', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
S̴A̸Ğ̶ ̵Y̵A̷R̸I̵:
̶B̸U̵L̵U̷N̵A̷M̶A̸D̷I` },
      ks_glitch2: { title: 'Bozuk bir kayıt dosyası', body:
`KAYIT VERİSİ
OYUNCU: W̶L̸T̵ (AÇ)
HAYALETLER: B̵L̸Y P̴N̷Y I̷V̵Y C̸L̵Y
MİSAFİRLER: E̶D̵D ... S̷A̶M̸?
SIRADAKİ OYUNCU: —` },
      ks_walt8: { title: 'Walt’ın son mektubu', from: 'W. (Sanırım adım bu)', date: 'Sayılamayan gün', body:
`Çekirdeğe ulaşan kişiye.

Fiş burada. İçeriden çekilirse bu cinayet değil, bir son olur. OYUN BİTTİ. Hâlâ kendisi olan herkes eve döner.

Ama sadece o dördü kim olduklarını hatırlıyorsa. Onlar hâlâ hayaletken çekersen oyun sadece yeni hayaletler seçer. Ve yeni bir oyuncu.

Bir kere öyle denedim. Yeni oyuncu benim.

Nora’ya özür dilediğimi söyle. Ruth’a haklı olduğunu söyle. Lily’nin tablosuna skorunu korumasını söyle.

—W` },
      ks_eddie: { title: 'ÇIKIŞ’ın yanına iğnelenmiş bir not', from: 'Eddie', body:
`Biri çıkar, biri kalır. Skor tutulmak zorunda.

Bu kapıyı ilk ayımda buldum. Bir buçuk yıldır yanında duruyorum.

Özür dilerim evlat.` },
    },
    obj: {
      maze_pellets: 'Dört köşedeki güç haplarını ye ({n}/4)',
      maze_house: 'Hayalet evine gir',
      ks_core: 'Bozuk tarafta çekirdeğe ulaş',
      ks_choice: 'Seçimini yap: ÇIKIŞ kapısı ya da fiş',
    },
    mono: {
      maze_start: 'Bu... oyunun kendisi. İçindeyim.',
      maze_rules: 'Noktaları kim yiyor? Ben.',
      maze_house: 'Perde indi. Evin içinde bir kapı var.',
      ks_start: 'Sağ taraf... bozuk. Harfler havada asılı.',
      ks_core: 'Çekirdek. Burada koca bir fiş var. Kabinin fişi. İçeriden.',
      ks_exit: 'ÇIKIŞ. Bu sefer gerçek. Rüzgârı hissedebiliyorum.',
      ks_plugTry: 'Kıpırdamıyor. Bunu tek başıma çekemem. Dört el daha lazım.',
      ks_plugReady: 'Dört renkli ışık yanıma geliyor. Kırmızı, pembe, mavi, turuncu.',
    },
    lines: {
      maze_portal: 'Sayılamayan seviyeye in',
      maze_fruitTake: 'Kirazı al',
      ks_plug: 'FİŞİ ÇEK',
      ks_plugTry: 'Fişi çekmeyi dene',
      ks_exitGo: 'ÇIKIŞ’tan geç',
      ks_exitHold: 'Kapıyı Eddie için tut',
      ks_missing: '(Eksik: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'İşte bu. İki yüz elli beşinci seviye. Bozuk olandan önceki son tahta.'],
        ['eddie', 'Köşeleri ye. Dipte bekliyor olacağım.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Buradayım. Telsizde değil. Burada. Sağdaki kapının yanında.'],
        ['eddie', 'Gel beni bul. Lütfen.'],
      ],
      ks_plea: [
        ['eddie', 'Gerçek olan bu. Rüzgâr, yağmur, Front Caddesi. Ev.'],
        ['eddie', 'Birini dışarı bırakır, birini içeride tutar. İlk ayımda öğrendim. O günden beri yanında duruyorum.'],
        ['sam', 'Onu benim açmamı bekleyip kendin geçecektin.'],
        ['eddie', 'Hope bir yaşında Sam. Onu hiç kucağıma almadım. [Sesi çatlıyor.] Beni affetmeni istemiyorum. Kapıyı tutmanı istiyorum.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'Gerçek olan bu. Rüzgâr, yağmur, Front Caddesi. Ev.'],
        ['eddie', 'Motelde sana istemeyeceğimi söylemiştim. O yüzden istemiyorum.'],
        ['sam', 'Ama istiyorsun.'],
        ['eddie', 'Her saniye. [Uzun bir nefes.] Önce çekirdeğe git, Sam. Başka bir yol varsa oradadır. Yoksa... ben yine burada duruyor olacağım.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
