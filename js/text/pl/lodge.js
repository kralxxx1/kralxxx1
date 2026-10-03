/* Polski — Rozdział 5: Biała ciemność (Berghotel Weisshorn). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      lodge: {
        name: 'ROZDZIAŁ 5', title: 'Biała ciemność', place: 'Berghotel Weisshorn, 2914 m n.p.m.',
        intro: 'Poniedziałek, 28 lutego 1983 roku, po zmroku. Na górze szaleje burza.\n\nTego ranka z doliny wysłano telegram do hotelu na górnej stacji kolejki. Po południu pięcioro gości i ich instruktor narciarski leżeli pod śniegiem przy górnej stacji. Hotel twierdzi, że żaden telegram nie przyszedł.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'Księga gości', from: 'Berghotel Weisshorn', date: 'Luty 1983', body:
`26.2.  Rodz. Aebi (3)         pokój 4
26.2.  Państwo Coulter        pokój 2
27.2.  R. Fankhauser          pokój 1
27.2.  L. Brunner (szkółka narciarska, personel)

Wyjazdy:
Pani Coulter — 2.3., saniami z doliny.
(Wszystkie pozostałe nazwiska powyżej skreślono 28.2. jedną równą kreską, innym długopisem.)` },
      lodge_weather: { kind: 'report', title: 'Zeszyt pogodowy na biurku', from: 'G. Imhof', date: '28 lutego 1983', body:
`06.30  Mocny śnieg od 3. Wiatr NW 60.
07.10  Linia telefoniczna zerwana (jak zwykle).
08.15  Sanie pocztowe przyjechały ze stacji. Poczta, mleko i chleb.
09.20  Kolejka działa. Szkółka narciarska na górze o 9.30 jak co dzień. Pełny tydzień, wszystkie pokoje zajęte, pierwszy pełny tydzień od 1979.

(Linijkę 08.15 dwa razy poprawiono ołówkiem, jakby ktoś na niej utknął.)` },
      lodge_telegram: { kind: 'telegram', title: 'Telegram, nadpalony na brzegach', from: 'Stacja w dolinie, służba lawinowa', date: '28.2.83 07.55', body:
`DO BERGHOTEL WEISSHORN STOP
ZAGROŻENIE LAWINOWE 5 STOP GÓRNE STOKI PRZECIĄŻONE STOP
DZIŚ ZAMKNĄĆ GÓRNE TRASY I GÓRNĄ STACJĘ STOP
ZAKAZ JAZDY POWYŻEJ HOTELU STOP
POTWIERDZIĆ ZWROTNIE STOP
SŁUŻBA LAWINOWA

(Na odwrocie, starannym pismem: „Otrzymano 8.15. — G.I.” Reszta to sadza. Powinien był spłonąć. Nie spłonął.)` },
      lodge_menu: { kind: 'notice', title: 'Karta śniadaniowa na stoliku', from: 'Berghotel Weisshorn', body:
`PONIEDZIAŁEK, 28 LUTEGO
Kawa — Herbata — Gorąca czekolada
Musli Birchera
Rösti z jajkiem sadzonym
Chleb z doliny, masło, miód od hotelowych pszczół

Wieczorem: fondue na tarasie, jeśli pogoda pozwoli!
Szkółka narciarska zbiera się o 9.30 przy górnej stacji. Leo mówi: weźcie gogle.` },
      lodge_postcard: { kind: 'card', title: 'Pocztówka na szafce nocnej, pokój 1', from: 'Ruth Fankhauser', body:
`(Zdjęcie hotelu w słońcu, obok przepływa w górę wagonik kolejki.)

Kochana Hanni,
sypie śnieg jak na koniec świata. Mówią, że zjazd ze szczytu jest najlepszy w dolinie, i rano wjeżdżamy, burza czy nie. Leo, instruktor, śmieje się ze wszystkiego. Jestem szczęśliwa. Zadzwonię w niedzielę.
R.

(Ze znaczkiem, nigdy niewysłana.)` },
      lodge_roomNote: { kind: 'note', title: 'Kartka dziecka w pokoju 4', from: 'Lisa Aebi, 10 lat', body:
`Mama mówi, że jak będzie za bardzo wiało, możemy zostać w środku i grać w karty z panią Imhof.
Pani Imhof mówi, że tu na górze wiatr to nic.
Zapytałam, czy śnieg może spaść z góry. Powiedziała, że nie w tym tygodniu.` },
      lodge_school: { kind: 'notice', title: 'Lista zapisów do szkółki narciarskiej', from: 'L. Brunner', date: '28.2.83', body:
`SZKÓŁKA NARCIARSKA — GÓRNA STACJA 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Instruktor: Leo Brunner
(Pod spodem ołówkiem:) Greta mówi, że z doliny wszystko czysto. Świetnie. Jedziemy.` },
      lodge_kitchenNote: { kind: 'note', title: 'Przypięte przy drzwiach chłodni', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
Jeśli zadzwoni dolina albo sanie przywiozą cokolwiek od służby lawinowej, to idzie do MNIE, nie do gości i nie do Leo. Ja się tym zajmę.
Pełny tydzień. Potrzebujemy tego tygodnia.
Główny klucz do kolejki wisi na haczyku przy chłodni. Nikt go nie bierze oprócz mnie albo ciebie.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'Z dochodzenia, wycinek prasowy', from: 'Gazeta z doliny', date: 'Kwiecień 1983', body:
`WEISSHORN: HOTELARKA TWIERDZI, ŻE NIE DOSTAŁA OSTRZEŻENIA

Właścicielka Berghotelu Weisshorn, pani Greta Imhof (52), oświadczyła wczoraj przed komisją, że 28 lutego do hotelu nie dotarło żadne ostrzeżenie lawinowe. Linia telefoniczna była zerwana od 7 rano, a „saniami pocztowymi przyjechała tylko poczta” – powiedziała.

Służba lawinowa utrzymuje, że telegram wysłano saniami o 8.15. W hotelu nie znaleziono żadnej kopii.

Pięcioro gości i instruktor narciarski Leo Brunner (29) zginęli, gdy o 14.40 zeszły górne stoki.` },
    },
    items: {
      telegram: { name: 'Telegram', desc: 'Nadpalony na brzegach, a mimo to czytelny. Otrzymano 8.15.' },
      masterKey: { name: 'Klucz główny', desc: 'Ciężki klucz na drewnianym breloku: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Schroń się przed burzą',
      lodge_find: 'Dowiedz się, co się stało w Weisshorn',
      lodge_telegram: 'Znajdź telegram, który nigdy nie przyszedł',
      lodge_pin: 'Przypnij telegram z powrotem na tablicy w recepcji',
      lodge_key: 'Weź klucz główny z kuchni',
      lodge_power: 'Uruchom kolejkę w maszynowni',
      lodge_board: 'Wsiądź do wagonika',
    },
    mono: {
      lodge_start: 'Nie widzę własnej ręki. Jest światło. Budynek.',
      lodge_inside: 'Ciepło. Pali się ogień i nie ma nikogo, kto by go pilnował.',
      lodge_cold: 'Tak mi zimno. Muszę wejść do środka.',
      lodge_colder: 'Nie czuję palców.',
      lodge_warm: 'Ciepło. Och, tak lepiej.',
      lodge_frozen: 'Siedzą przy stolikach. Całkiem biali. Nikt się dawno nie ruszał.',
      lodge_frozenMove: 'Ten przy oknie się ruszył. Kiedy podeszłam do ognia, ruszył się.',
      lodge_board: 'Pinezka i oderwany róg czegoś, co tu kiedyś wisiało.',
      lodge_book: 'Sześcioro skreślonych dwudziestego ósmego. Tym samym długopisem, za jednym razem.',
      lodge_stove: 'Zimny popiół. A w nim coś, co nie spłonęło.',
      lodge_telegram: '„Zamknąć górne trasy”. Miała to w ręku kwadrans po ósmej. Wjechali o wpół do dziesiątej.',
      lodge_pinned: 'No. Tam, gdzie każdy mógłby to przeczytać.',
      lodge_claimed: 'Wiatr ucichł. Na jeden oddech. Jakby góra słuchała.',
      lodge_stationLit: 'Światła, daleko za śniegiem. Stacja kolejki.',
      lodge_key: 'Klucz główny.',
      lodge_cook: 'W kuchni ktoś jest. Duży mężczyzna. Coś trzyma w ręce.',
      lodge_prints: 'Ślady stóp. Pojawiają się. Teraz, przede mną.',
      lodge_power: 'Działa. Wagonik się świeci.',
      lodge_noKey: 'Potrzebny klucz.',
      lodge_notYet: 'Silnik nie rusza. Nie ruszy, dopóki to miejsce mnie trzyma.',
      lodge_boarding: 'Drzwi. Zamknijcie się. Zamknijcie się, proszę.',
      lodge_away: 'Jedziemy. W dół, w nicość.',
      lodge_office: 'Jej biuro. Drzwiczki pieca wiszą otwarte.',
      lodge_station: 'Stacja. Lina wychodzi w biel i po prostu przestaje istnieć.',
    },
    lines: {
      lodge_bookPrompt: 'Księga gości',
      lodge_boardPrompt: 'Tablica na telegramy',
      lodge_boardPin: 'Przypnij telegram',
      lodge_stovePrompt: 'Wyjmij z popiołu (przytrzymaj)',
      lodge_controlPrompt: 'Uruchom kolejkę (przytrzymaj)',
      lodge_controlLook: 'Pulpit sterowniczy',
      lodge_gondolaPrompt: 'Wsiądź do wagonika',
      lodge_gondolaLook: 'Wagonik',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[wiatr ponad szumem]'],
        ['otto', 'Dziewiątka do Ady. Bardzo głośno panią słychać. To burza? A więc Weisshorn. Mam na półce sześć par nart i zestaw do fondue, którego nikt nigdy nie użył.'],
        ['ada', 'Są tu ludzie. Zamarznięci przy stolikach.'],
        ['otto', 'W takim razie proszę nie stać przy ogniu. Idą do ciepła. A na zewnątrz proszę nasłuchiwać kroków, które nie są pani krokami.'],
      ],
      lodge_otto2: [
        ['otto', 'Coś zniknęło z mojej półki. Telegram. Jest teraz na właściwym miejscu. Jestem prawie pewien, że słyszałem narty.'],
      ],
    },
    recap: {
      lodge: 'Weisshorn, 28 lutego 1983 roku. Greta Imhof miała ostrzeżenie lawinowe w ręku kwadrans po ósmej, wrzuciła je do pieca, żeby pełny tydzień nie przepadł, i o wpół do dziesiątej wysłała szkółkę narciarską na górę. Pięcioro gości i ich instruktor zginęli przy górnej stacji; komisji powiedziała, że żadne ostrzeżenie nie przyszło. Telegram nigdy nie spłonął. Przypięłam go tam, gdzie każdy mógł go przeczytać, a kolejka zawiozła mnie w dół, poza burzę.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
