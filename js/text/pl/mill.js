/* Polski — Poziom 1: magazyn młyna (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'Magazyn młyna', place: 'Wspomnienie Danny’ego — Harlow Mill, Front Street',
        intro: 'Sufit jest sześć metrów nad głową. Regały ciągną się w ciemność. Gdzieś tyka zegar, zawsze na tej samej sekundzie.\n\nOjciec Danny’ego pakował w tym budynku pudła przez dwadzieścia pięć lat. Potem pewnego piątku dali mu zegarek i odesłali go do domu.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Przyklejone do drzwi windy', from: 'Eddie', body:
`Winda towarowa potrzebuje trzech bezpieczników. Skrzynka jest przy biurze załadunku.

Czerwony patroluje alejki. Szybki, nigdy się nie zatrzymuje, ale GŁOŚNY. Nasłuchuj go.

Nie próbuj mu uciec na otwartej przestrzeni. Nikt nie ucieknie Danny’emu.

—E.` },
      mill_layoff: { kind: 'letter', title: 'List na firmowym papierze', from: 'Harlow Mill, dział wysyłki', date: '30 maja 1986', body:
`Szanowny Panie Rayu,

w ramach restrukturyzacji działu wysyłki przy Front Street Pańskie stanowisko zostaje zlikwidowane z dniem 30 czerwca 1986 roku.

Dziękujemy za dwadzieścia pięć lat wiernej służby. Prosimy o zwrot klucza do szafki i identyfikatora w biurze przy wejściu.

Prosimy przyjąć załączony zegarek jako wyraz naszego uznania.

Zarząd Harlow Mill` },
      mill_punch: { kind: 'card', title: 'Karta zegarowa', from: 'Harlow Mill', date: 'Lato 1986', body:
`PRACOWNIK: KOWALSKI, D. (LATO — ZAMIATACZ)
STAWKA: 3,35 $/godz.

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

W poprzek ostatniej linijki, niebieskim długopisem:
OSTATNI DZIEŃ TATY TEŻ` },
      mill_graffiti: { kind: 'wall', title: 'Farba w sprayu na regałach', body:
`DAN #1
DANNY TU BYŁ
DANNY JEST TU ZAWSZE` },
      mill_danny1: { kind: 'note', title: 'Złożona karteczka w kieszeni kurtki', from: 'Danny', date: 'Marzec 1987', body:
`Wszyscy myślą, że niczego się nie boję.

Boję się, że tata siedzi cały dzień w kuchni z wyłączonym radiem.

Więc gram. Kto jest na pierwszym miejscu, ten nie siedzi w kuchni.

(Jak Rosie to przeczyta, to ją naprawdę zabiję.)` },
      mill_ray: { kind: 'letter', title: 'List, który nigdy nie został wysłany', from: 'Ray, ojciec Danny’ego', date: 'Maj 1987', body:
`Danny,

policja znowu pytała o klucz. Powiedziałem im, że nie obchodzi mnie żaden klucz. Możesz mieć wszystkie klucze w tym mieście.

Pracuję teraz w sklepie żelaznym. Jest w porządku. Mniej godzin. Słucham meczu w radiu.

Naprawiłem ci rower. Nowy łańcuch, nowe hamulce. Stoi w garażu.

Wróć do domu i się na nim przejedź. Nie powiem ani słowa.

Tata` },
      mill_manifest: { kind: 'printout', title: 'List przewozowy', from: 'Harlow Mill, rampa 3', date: '17 kwietnia 1987', body:
`PRZESYŁKA NR 0256
ZAWARTOŚĆ: 1 zegarek na rękę (stanął o 3:17)
WAGA: nic
MIEJSCE PRZEZNACZENIA: —
ODBIÓR POTWIERDZIŁ: —

Papier jest ciepły, jakby przed chwilą wyszedł z drukarki.` },
      mill_walt3: { kind: 'diary', title: 'Pamiętnik Walta', from: 'Walt', date: 'W środku, dzień ?', body:
`Czerwony nigdy się nie zatrzymuje. Biega w kółko tymi samymi pętlami, tak jak Danny grał w labirynt: zawsze pierwszy, zawsze najszybszy, ani chwili na oddech.

Dziś rzucił się na mnie z krzykiem. TWOJA RĘKA PUŚCIŁA. TWOJA RĘKA PUŚCIŁA.

Ja nigdy niczego nie puściłem. Trzymam każde z nich od pięciu lat. To na kogo on krzyczy?

Potem poszedłem za nim i nie pamiętam po co. Chyba byłem głodny.` },
      mill_shrine: { kind: 'note', title: 'Pod zdjęciem w kapliczce', from: 'W.', body:
`Zawsze musiał być pierwszy.
Pierwszy przy automacie. Pierwszy powyżej 900 000.
Pierwszy przez ekran.

Daj mu coś, co się zatrzymuje.` },
      mill_tape: { kind: 'tape', title: 'Taśma: „Pierwsze miejsce, dla historii”', from: 'Magnetofon Rosie', date: '16 kwietnia 1987, 23:52', body:
`[Kliknięcie. Hałas salonu. Śmiech dzieciaków.]

DANNY: Tu Danny Kowalski, pierwsze miejsce, nagranie dla historii. Dziś w nocy pokonamy kill screen.

ROSIE: Dziś w nocy SPRÓBUJEMY pokonać kill screen.

DANNY: Walt mówi, że to niemożliwe. Walt mówił też, że nikt nie przebije dziewięciuset tysięcy.

TOBY: Będziemy mieli kłopoty? Mama myśli, że nocuję u Kellerów.

DANNY: Kłopoty mają ci, co dają się złapać, Toby.

NELL: …Sam jest już w domu, Danny.

DANNY: Sam ma pietra. Więcej kill screenu dla nas.

[Pauza.]

TOBY: Sam nie ma pietra. Sam przyjdzie.

[Kliknięcie.]` },
    },
    obj: {
      mill_fuses: 'Znajdź bezpieczniki ({n}/3)',
      mill_panel: 'Włóż bezpieczniki do skrzynki windy',
      mill_wait: 'Winda jedzie… Przetrwaj ({n} s)',
      mill_leave: 'Wsiądź do windy',
    },
    mono: {
      mill_start: 'Tyka zegar. Zawsze ta sama sekunda.',
      mill_dannySeen: 'Czerwony. Przemoczone prześcieradło, wybrzuszone jak głowa, brzeg podarty w szpice. Dwoje ogromnych oczu i żadnej twarzy. Pod spodem jest coś wielkości chłopca.',
      mill_fuse: 'Kolejny bezpiecznik.',
      mill_elevator: 'Winda jedzie. Powoli. Tak powoli.',
      mill_watch: '3:17. Tak samo jak zegar.',
    },
    lines: {
      mill_panel: 'Włóż bezpieczniki',
      mill_panelIdle: 'Skrzynka bezpieczników ({n}/3)',
      mill_slots: 'Skrzynka ma trzy puste gniazda.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? Jesteś tam? …O. Znam to miejsce. Harlow Mill, magazyn przy Front Street. Ojciec Danny’ego pracował tu dwadzieścia pięć lat.'],
        ['eddie', 'Czyli czerwony też tu będzie.'],
      ],
      mill_danny: [
        ['eddie', 'Jest tuż za tobą! Nie ścigaj się z nim na otwartej przestrzeni. Przerwij linię, weź zakręt, postaw coś między wami!'],
        ['sam', 'On coś krzyczy!'],
        ['eddie', 'Zawsze krzyczy. „Twoja ręka puściła”. Krzyczał to do mnie, krzyczał do Walta. Nie wiem, o kogo mu chodzi. UCIEKAJ.'],
      ],
      mill_watch: [
        ['eddie', 'To zegarek? …Zegarek Raya. Dali mu go w dniu, w którym go zwolnili. Danny nosił go potem codziennie.'],
        ['eddie', 'Gdzieś tu jest kapliczka. Zanieś go tam. Może on sobie przypomni.'],
      ],
      mill_freed: [
        ['eddie', '…Zatrzymał się? Sam, co tu się stało? On po prostu… stoi.'],
        ['eddie', 'O mój Boże. To Danny. To naprawdę Danny.'],
      ],
      mill_elevator: [
        ['eddie', 'Ta winda jest głośna. Wszystko tu to usłyszało. Wytrzymaj, aż przyjedzie.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
