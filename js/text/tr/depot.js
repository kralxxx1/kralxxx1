/* Türkçe — Önsöz: Gece Vardiyası (Depo 9). Hikâye kılavuzu: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('tr', 'story', {
    chapters: {
      depot: {
        name: 'ÖNSÖZ', title: 'Gece Vardiyası', place: 'Depo 9, Halvard Merkez Garı',
        intro: 'Halvard, 13 Ocak 1998 gecesi. Merkez garın cam çatısında yağmur.\n\nGar holünün altında Depo 9 var: şehrin kaybettiği her şey, biri gelip alsın diye burada doksan gün bekler. Ada Lind sekiz yıldır gece gişesinde çalışıyor. Gece yarısından sonra kimse aşağı inmez.\n\nBu işi bu yüzden aldı.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Devir notu', from: 'Benny', date: 'Salı 13 Ocak', body:
`Ada —

Devir:
• 14 şemsiye geldi. Yağmur yağıyor, ne bekliyordun.
• Trombonlu adam yine geldi. Yine onun trombonu değil.
• Oluk yine sıkışıyor. SOL tarafına vur.
• Dolabın kapanmıyor. Kaset hâlâ içinde. Dokunmadım.
• Yukarıdan biri “asansör hâlâ bizde mi” diye sordu. 1964’ten beri o asansörü kimse kullanmadı dedim. “Ben onu sormadım” dedi.

Kahve bitti. Kusura bakma.
— Benny` },
      depot_log: { kind: 'printout', title: 'Gece defteri, sayfa 212', from: 'A. Lind', date: '13/14.01.98', body:
`DEPO 9 — GECE DEFTERİ — A. LIND

23:10  Fiş 4471: eldiven, bayan, gri. Sahibi aldı.
00:40  2. peron temizlikçileri: bavul, açık kahve, etiketsiz. 241 numarayla kaydedildi.
01:15  Telefon. Kimse yok. (Üçüncü gece.)
02:30  Sağanak. Oluk sessiz.
02:56  Bildirilecek başka bir şey yok.` },
      depot_tag: { kind: 'card', title: 'Paketin üstündeki talep etiketi', from: 'A.', body:
`HALVARD MERKEZ — DEPO 9 — KAYIP EŞYA

TALEP 256
Bir eldiven, kırmızı, çocuk, sol el.
Bulunduğu yer: Ostra Gölü, 14 Ocak 1979.
ADA LIND ADINA SAKLANSIN.

— A.

(“e” harfi düşük basan bir makinede yazılmış; deponun 1964’te attığı türden. Mürekkep hâlâ ıslak.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'Paketin içine katlanmış bir resim', from: 'Wren, 7 yaşında', body:
`Pastel boya. Bir çitin üstünde küçük kırmızı bir kuş. Yeşil atkılı uzun boylu bir kız, sırtını dönmüş, yolda uzaklaşıyor. Üstünde kocaman harflerle: ADA.

Arkasında, aynı boyayla:
YOLU BİL DİYE` },
      depot_ledger: { kind: 'report', title: 'Kayıp eşya defteri, 1979, 1. cilt', from: 'Depo 9', body:
`No. 253 — 14.01.79 — Eldiven, erkek, kahverengi deri — 3. peron — 16.01’de alındı
No. 254 — 14.01.79 — Şemsiye, siyah — Bekleme salonu — 15.01’de alındı
No. 255 — 14.01.79 — Kitap, “Karlar Kraliçesi”, çocuk — 4. peron — sahibi çıkmadı
No. 256 — 14.01.79 — Eldiven, kırmızı, çocuk, sol el — bulunduğu yer: Ostra Gölü — Talep eden: ablası, hatırladığında.

(Son kayıt, neredeyse tanıdığın titrek bir elle yazılmış. Mürekkep ıslak. Kapağın içine bantlanmış: üstünde MÜD. yazan pirinç bir anahtar.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Müdür masasındaki notlar', from: 'Otto Brandt', date: '14 Şubat 1964', body:
`1906’dan beri kırk bir bin eşya. Her biri birinindi.

Geceleri eski boruyu duymaya başladım. Notlar geliyor, “A.” imzalı. Defterimizi benden iyi biliyor.

Katların altında bir kat olduğunu yazıyor; kimsenin geri gelip almadığı her şeyin gittiği yer. Bir ayıklama bürosu. Bir memurunun eksik olduğunu yazıyor.

Cesaretimi kaybetmeyeyim diye numarayı düğmenin üstüne kazıdım.

Sabaha dönmezsem: şemsiyeler kafese gider, çöpe değil.

— O.B.` },
      depot_memo: { kind: 'note', title: 'Boru kapsülünde bir not', from: 'A.', body:
`DİZİN — SEVİYE 256 — DAHİLİ

Kime: Depo 9, gece gişesi.

Ada.
Asansör anahtarı onun masasında. Eldiveni getir ve elinden bırakma.
Otto dokuzuncu kanalda olacak. Ona şemsiyelerin kafeste olduğunu söyle.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Halvard Ulaşım takvimi, 1964', body:
`ŞUBAT 1964

(13’üne kadar günlerin üstü çizilmiş. 14’üne kurşunkalemle: “Gece vardiyası. Sonuncusu mu?” Ostra’daki yeni barajın resminin altına aynı kalemle: “Vadiyi sonbaharda su basacaklar. Gazete, yukarıdaki yaşlı bir kadının gitmeyeceğini yazıyor.” O günden beri sayfayı kimse çevirmemiş.)` },
      depot_poster: { kind: 'notice', title: 'Halka açık salondaki duyuru', from: 'Halvard Ulaşım', body:
`KAYIP EŞYA — DEPO 9

İstasyonlarda ve trenlerde bulunan eşyalar burada DOKSAN GÜN saklanır.
Lütfen sahipliğinizi gösteren bir belge getirin.
Sahibi çıkmayan eşyalar satılır ya da imha edilir.

(Altına keçeli kalemle iliştirilmiş: “BULUNDU: gri kedi, Amiral adına bakıyor. Benny’ye sorun.”)` },
      depot_kitchen: { kind: 'card', title: 'Lavabonun üstünde bir kartpostal', from: 'Anneanne', date: '1995', body:
`(Ostra Gölü’nden bir kış manzarası. Buzun üstünde, çok küçük, batık kilisenin kulesi.)

Ada —
Bu yıl buz kalın. 14’ü cumartesiye geliyor. Gelebilirsen gel. Her zamanki gibi pencereye mumu koyacağım.
Anneannen` },
    },
    items: {
      mitten: { name: 'Kırmızı eldiven (sol)', desc: 'Bir çocuk eldiveni, kırmızı yün, başparmağı örülmüş. Öbür teki on dokuz yıl önce buzun üstünde bulundu.' },
      ottoKey: { name: 'Müdürün anahtarı', desc: 'Pirinç, üstünde MÜD. yazıyor. 1979 defter kutusunun kapağının içine bantlanmıştı.' },
      elevatorKey: { name: 'Yük asansörü anahtarı', desc: 'Üstünde YÜK yazan bir etikete bağlı uzun bir anahtar. Otto Brandt’ın.' },
      badge: { name: 'Otto’nun rozeti', desc: 'Pirinç oval: DEPO 9 — OTTO BRANDT. Bir başparmağın ovduğu yerden pürüzsüzleşmiş.' },
      parcel: { name: 'Paket' },
    },
    obj: {
      depot_log: 'Daktilonda gece defterini bitir',
      depot_parcel: 'Oluktan ne düştüğüne bak',
      depot_torch: 'Dolabından fenerini al',
      depot_power: 'Ayıklama odasındaki ana şalteri kaldır',
      depot_ledger: 'Arşivde 1979 defterini bul',
      depot_otto: 'Otto Brandt’ın odasını ara',
      depot_elevator: 'Yük asansörüyle aşağı in',
    },
    mono: {
      depot_start: '02:51. Yukarıda, holün camında yağmur. Bir satır daha, gece defteri bitecek.',
      depot_start2: 'Gece yarısından sonra buraya kimse inmez. İşin bütün olayı bu.',
      depot_logDone: '02:56. Bildirilecek başka bir şey yok.',
      depot_chute: 'Oluk. Sabahın üçünde kimse paket atmaz.',
      depot_mitten: 'Sol el. Kırmızı. Wren’inkiler kırmızıydı. 1979’da herkesinki kırmızıydı.',
      depot_dark: 'İşte elektrik de gitti. Fenerim dolabımda.',
      depot_torch: 'Piller hâlâ iyi. Benny işe yarar hiçbir şeyi ödünç almaz.',
      depot_tape: 'Anneannemin kaseti. İki yıldır dolabımda. Bu gece olmaz.',
      depot_tape2: 'Bu gece olmaz dedim.',
      depot_powerBack: 'Tamam. Eski tesisat hep bir dakika surat asar önce.',
      depot_tube: 'Müdür odasındaki eski haber borusuydu bu. 1964’ten beri çalışmıyor. Etikette 1979 yazıyor. Defter arşivde.',
      depot_archive: 'Kimsenin geri gelip almadığı kırk bir bin şey.',
      depot_sorter: 'Koridorun sonunda biri vardı. Uzun boylu, gri paltolu. Karanlıkta kutuları ayıklıyordu.',
      depot_ledgerAfter: 'Bu Benny’nin yazısı değil. Bu kimsenin yazısı değil. Kapağa bir anahtar da bantlanmış: MÜD. Otto Brandt’ın odası.',
      depot_ottoLocked: 'MÜDÜR. 1964’ten beri kilitli. Benny anahtarın onunla gittiğini söylüyor.',
      depot_ottoLocked2: 'Hâlâ kilitli.',
      depot_ottoIn: 'Lambası yanıyor. Fincanında hâlâ kahve var. Otuz dört yıl.',
      depot_badge: 'OTTO BRANDT. Geri gelip almayı düşünmüyorsan rozetini bırakmazsın.',
      depot_elevKey: 'YÜK. Ondan beri kimsenin kullanmadığı asansör.',
      depot_noKey: 'Panel anahtar istiyor. Tabii ki istiyor.',
      depot_noKey2: 'Hâlâ anahtar lazım.',
      depot_256: 'Biri en alttaki düğmenin üstüne bir numara kazımış. 256.',
      depot_wren: 'Kabinde biri vardı. Kırmızı kar tulumlu bir çocuk. Bir saniyeliğine.',
      depot_gate: 'Hol kapısı. Gece yarısı yukarıdan kilitlenir. Gar kuralı.',
      depot_elevatorShut: 'Yük asansörü. 1964’ten beri hizmet dışı.',
    },
    lines: {
      depot_typePrompt: 'Gece defterinin son satırını yaz',
      depot_parcelPrompt: 'Paketi aç',
      depot_tapePrompt: 'Anneannemin kaseti',
      depot_breakerPrompt: 'Ana şalteri kaldır (basılı tut)',
      depot_ledgerPrompt: 'Defter kutusu: 1979',
      depot_badgePrompt: 'Otto’nun rozeti',
      depot_callPrompt: 'Anahtarı çevir, en alttaki düğmeye bas',
      depot_ottoUnlock: 'Müdürün anahtarıyla aç',
    },
    recap: {
      depot: 'Depo 9, 02:56. Oluktan bir paket düştü: kırmızı bir eldiven, sol el, ve üstünde “Ada Lind adına saklansın” yazan bir etiket. 1979 defterinde şöyle yazıyordu: talep eden, ablası, hatırladığında. Otto Brandt’ın yük asansörüyle, birinin kazıdığı düğmeye kadar indim: 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
