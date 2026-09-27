/* Türkçe — Seviye 255 (Ev) ve Seviye 256 (Ölüm Ekranı). */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      maze: {
        name: 'SEVİYE 255', title: 'Ev', place: 'Oyunun kendisi',
        intro: 'İçeriden Hungry House. Ekran gibi kenarlarından parlayan duvarlar, bel hizasında süzülen yıldızlar ve ortada, kapısı dört fenerle kapalı tutulan hayaletlerin evi.\n\nBu tahtayı kendi yatak odandan iyi bilirsin. On bin kere oynadın. Bir kez daha oynamanı bekliyordu.',
      },
      killscreen: {
        name: 'SEVİYE 256', title: 'Ölüm Ekranı', place: 'Kimsenin görmemesi gereken yarı',
        intro: 'Tahtanın sol yarısı bildiğin ev. Sağ yarısı ise yerinden kopmuş, havada asılı duran harfler, sayılar ve renkler.\n\nÇekirdekte bir yerde bir şey hâlâ fişe takılı.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Labirent duvarında parlayan harfler', from: 'W.', body:
`BUNU OKUYABİLİYORSAN
BENİM OYUNUMDASIN.
ÖZÜR DİLERİM.
YILDIZLARI YE.
HAYALETLERE ZARAR VERME.
—W.` },
      maze_rules: { kind: 'wall', title: 'Taş gibi soğuk bir plaket', body:
`EVİN KURALLARI

1. Oyuncu yer.
2. Hayaletler kovalar.
3. Tahta temizlenir.
4. Sonraki tahta başlar.
5. Beşinci kural yoktur.` },
      maze_house: { kind: 'note', title: 'Hayaletlerin evinin kapısında', from: 'Eddie', body:
`Perdeyi dört fener kapalı tutuyor. Her köşede bir tane.

Ev aşağı giden yol. Aşağı giden son yol.

Öbür tarafta görüşürüz. —E.` },
      maze_fruit: { kind: 'memory', title: 'Şeker — bir anı', body:
`Lily şeker ödülünü ilk aldığında öyle bir çığlık attı ki Walt kahvesini düşürdü.

"Baba! ŞEKER! ŞEKERİ ALDIM!"

Ondan sonra her cumartesi makineye onun için bir çeyrek attı ve bütün oyun boyunca arkasında durdu; ona hiçbir zaman nereye gideceğini söylemedi.` },
      ks_glitch1: { kind: 'wall', title: 'Havada asılı bozuk karakterler', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Bozulmuş bir kayıt dosyası', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'Walt’ın son mektubu', from: 'W. (sanırım adım bu)', date: 'Sayılamayan bir gün', body:
`Çekirdeğe ulaşan kişiye.

Fiş burada. İçeriden çekilirse cinayet değil, bir son olur. GAME OVER. Hâlâ kendisi olan herkes eve döner.

Ama tek bir çift el için kıpırdamaz. Oyun kolda beş elle başladı. Beş elle biter. Ve dördü kim olduklarını hatırlamak zorunda, yoksa elleri sadece ışıktır.

İçerideki ilk gecemde tek başıma denedim. Oyun bunu bir hamle saydı ve beni Oyuncusu yaptı. Artık oyum.

Bir el 3:16’da bıraktı. Oyun o zamandan beri o eli bekliyor.

Nora’ya özür dilediğimi söyleyin. Ruth’a haklı olduğunu söyleyin. Tabloya Lily’nin puanını saklamasını söyleyin.

—W.` },
      ks_eddie: { kind: 'note', title: 'EXIT’in yanına iğnelenmiş bir not', from: 'Eddie', body:
`Biri girer, biri çıkar.

Bu kapıyı ilk haftamda buldum. Dışarıda bir buçuk yıl geçti. İçeride tek bir uzun gece gibi geldi.

Özür dilerim evlat.` },
    },
    obj: {
      maze_pellets: 'Dört köşedeki fenerleri al ({n}/4)',
      maze_house: 'Hayaletlerin evine gir',
      ks_core: 'Bozuk taraftaki çekirdeğe ulaş',
      ks_choice: 'Seç: EXIT kapısı ya da fiş',
    },
    mono: {
      maze_start: 'Burası... oyunun kendisi. İçindeyim.',
      maze_rules: 'Yıldızları kim yiyor? Ben.',
      maze_house: 'Perde düştü. Evin içinde bir kapı var.',
      ks_start: 'Sağ taraf... bozuk. Havada asılı harfler.',
      ks_core: 'Çekirdek. Burada kocaman bir fiş var. Makinenin fişi. İçeriden.',
      ks_exit: 'EXIT. Bu sefer gerçek. Rüzgârı hissedebiliyorum.',
      ks_plugTry: 'Kıpırdamıyor. İki elle olmaz. Beş el istiyor.',
      ks_plugReady: 'Dört renkli ışık yanıma geliyor. Kırmızı, mor, turkuaz, kehribar.',
    },
    lines: {
      maze_portal: 'Sayılamayan seviyeye in',
      maze_fruitTake: 'Şekeri al',
      ks_plug: 'FİŞİ ÇEK',
      ks_plugTry: 'Fişi çekmeyi dene',
      ks_exitGo: 'EXIT’ten geç',
      ks_exitHold: 'Kapıyı Eddie için açık tut',
      ks_missing: '(Eksik: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'İşte burası. Seviye iki yüz elli beş. Bozuk olandan önceki son tahta.'],
        ['eddie', 'Köşeleri al. Aşağıda seni bekliyor olacağım.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Buradayım. Telsizde değil. Burada. Sağdaki kapının yanında.'],
        ['eddie', 'Gel bul beni. Lütfen.'],
      ],
      ks_plea: [
        ['eddie', 'Gerçek olan bu. Rüzgâr, yağmur, Front Sokağı. Ev.'],
        ['eddie', 'Birini dışarı bırakıp birini içeride tutuyor. İlk haftamda buldum. O zamandan beri yanında duruyorum.'],
        ['sam', 'Onu benim açmamı bekleyip kendin geçecektin.'],
        ['eddie', 'Hope on beş aylık Sam. Onu bir kere bile kucağıma almadım. [Sesi çatlıyor.] Beni affetmeni istemiyorum. Kapıyı tutmanı istiyorum.'],
      ],
      // Sam onu motelde dinlediyse, Eddie orada verdiği sözü tutar
      ks_pleaTrust: [
        ['eddie', 'Gerçek olan bu. Rüzgâr, yağmur, Front Sokağı. Ev.'],
        ['eddie', 'Motelde senden istemeyeceğimi söylemiştim. O yüzden istemiyorum.'],
        ['sam', 'Ama istiyorsun.'],
        ['eddie', 'Her saniye. [Derin bir nefes.] Önce çekirdeğe git Sam. Başka bir yol varsa oradadır. Yoksa... ben yine burada duruyor olacağım.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
