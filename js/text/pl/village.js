/* Polski — Rozdział 6: Niska woda (Gammel Ostra). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      village: {
        name: 'ROZDZIAŁ 6', title: 'Niska woda', place: 'Gammel Ostra, dolina Ostry',
        intro: 'Piątek, 2 października 1964 roku, po zmroku, w deszczu.\n\nZasuwy zapory zamknięto dziś o szóstej rano. Na plakatach na każdym słupku bramy stoi dziewiąty. Wieś jest pusta, a w niżej położonych miejscach rzeka już wystąpiła z brzegów. W jednym domu w oknie wciąż pali się lampa.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Obwieszczenie na słupku bramy', from: 'Urząd powiatowy', date: 'Wrzesień 1964', body:
`REGULACJA RZEKI OSTRA

Zasuwy zapory zostaną zamknięte, a dolina zalana
W PIĄTEK, 9 PAŹDZIERNIKA 1964 R.

Wszyscy mieszkańcy muszą opuścić Gammel Ostra do tego dnia. Ciężarówki przeprowadzkowe odjeżdżają codziennie o 8 rano ze szkolnego podwórka.

(Na tym egzemplarzu 9 skreślono czerwonym ołówkiem, a nad nim napisano PIĄTEK, 2 PAŹDZIERNIKA. Nie na każdym słupku to poprawiono.)` },
      village_torLetter: { kind: 'letter', title: 'List na kuchennym stole', from: 'Tor', date: '24 września 1964', body:
`Mamo,

przestań pisać do gazety. Nic to nie daje, a zarząd czyta każde słowo.

Zasuwy zamykają w piątek 9-go. Masz mnóstwo czasu. Przyjadę samochodem rano 8-go, załadujemy twoje rzeczy i pojedziesz do Ingrid do Halvard jak rozsądna kobieta, a po drodze możesz się na mnie złościć, ile chcesz.

Nie rób głupstw.
Tor` },
      village_diary: { kind: 'report', title: 'Dziennik budowy, budka dozorcy zapory', from: 'T. Holm, inżynier budowy', date: 'Wrzesień–październik 1964', body:
`28.9  Zarząd przyspiesza zamknięcie o tydzień: zasuwy 2.10 o 06.00. Ogłoszone dziś wieczorem w radiu. Plakaty do poprawienia.
      Mama nie ma radia. Powiem jej sam, kiedy po nią pojadę. Tego dnia będzie łatwiej.
29.9  Betonowanie przelewu przesunięte. Deszcz.
1.10  Betonowanie całą noc. Nie mogłem się wyrwać. Dzwoniłem do Ingrid do Halvard: mama powiedziała jej, że przyjadę 8-go, więc Ingrid ma się nie martwić.
2.10  06.00 Zasuwy zamknięte zgodnie z planem. Dolina się napełnia.
      Nie pojechałem do domu.

(Więcej wpisów tą ręką nie ma.)` },
      village_ingrid: { kind: 'note', title: 'Etykieta przywiązana do skrzyni na strychu', from: 'I.', date: '30.9.64', body:
`RZECZY MAMY — DO HALVARD

Mówi, że nie opuści swojego domu i koniec. Tor mówi, że przyjedzie po nią 8-go.
Zabrałam jej pozytywkę, żeby miała powód po nią przyjechać.
— I.` },
      village_removal: { kind: 'report', title: 'Lista przeprowadzek na biurku nauczyciela', from: 'Szkoła w Gammel Ostra', date: 'Październik 1964', body:
`Aas, Olav, 64 — do syna, Nordvik — wyjechał 21.9
Rodzina Berg (5) — Halvard — wyjechali 23.9
Dahl, Marit, 80 — do domu opieki w Ostrze — wyjechała 25.9
Holm, Signe, 71, Stuegata 4 — do córki (I. Lind), Halvard — zabiera ją syn, 8.10
Kvam, Per i Anna — wyjechali 26.9

(Odhaczono każdą linijkę oprócz jednej.)` },
      village_parish: { kind: 'note', title: 'Kartka na stole w zakrystii', from: 'Pastor A. Rø', date: '27.9.64', body:
`Dziś ostatnie nabożeństwo. Dzwony zdejmą 30-go.
Chór poprosił, żeby jeszcze raz zaśpiewać wieczorny hymn, i pozwoliłem, choć kościół był prawie pusty.

Pani Holm prosiła, żeby nie zamykać kościoła, dopóki ona jest we wsi. Powiedziałem, że Pan nie zamyka. Zarząd jest innego zdania.

Klucze do domów starszych osób wiszą na tablicy w zakrystii do czasu przeprowadzki.` },
      village_shop: { kind: 'note', title: 'Zeszyt z długami w sklepie, otwarty', from: 'Sklep w Gammel Ostra', date: 'Październik 1964', body:
`1.10  Pani Holm — nafta, 2 litry. Zapałki. Kawa, ¼ kg. Na zeszyt.
        (Mówi, że zapłaci 8-go.)

(Sklep zamknięto tego samego wieczoru. Półki są puste.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Rysunek pod poduszką', from: 'Wren, 7 lat', body:
`Kredki świecowe, rozmiękłe od wilgoci. Biały kościół pod zieloną wodą, obok wieży pływają ryby. Obok mały czerwony domek, a w oknie siwa pani trzyma uniesioną lampę. Nad wodą mały czerwony ptaszek.

Pod spodem:
CZEKAŁA I NIE SPAŁA` },
    },
    items: {
      signeKey: { name: 'Klucz do domu', desc: 'Na pętli z czerwonego sznurka. Papierowa przywieszka: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Pozytywka', desc: 'Z palisandru, z małą baletnicą na wieczku. Nakręcona gra walca, którego prawie znasz.' },
    },
    obj: {
      village_start: 'Znajdź tego, kto zapalił lampę',
      village_key: 'Znajdź klucz do domu z lampą',
      village_box: 'Znajdź to, co kiedyś stało na gzymsie kominka',
      village_mantel: 'Postaw pozytywkę z powrotem na gzymsie kominka',
      village_run: 'Woda nadchodzi. Dotrzyj do drabiny na zaporze',
      village_climb: 'Wspinaj się',
    },
    mono: {
      village_start: 'Wieś. Pusta. Wszystkie drzewa wycięte. W jednym oknie świeci się światło.',
      village_locked: 'Zamknięte. W środku pali się lampa i nikt nie otwiera.',
      village_church: 'Śpiewają. Po ciemku, twarzami do ołtarza. Ani dźwięku.',
      village_silence: 'Przestali.',
      village_turn: 'Odwracają się.',
      village_resume: 'Znowu śpiewają.',
      village_key: 'S. Holm, Stuegata 4. Holm. Znam to nazwisko.',
      village_school: 'Szkoła. Stąd odjeżdżały ciężarówki.',
      village_list: 'Holm, Signe. Do córki, I. Lind. Lind. I. Lind to babcia.',
      village_attic: 'Skrzynie. Etykiety. Cała wieś spakowana do pudeł.',
      village_box: 'Pozytywka. „Rzeczy mamy”. Mamy. Mamy babci.',
      village_house: 'Lampa się pali. Piec jest ciepły. Nikogo.',
      village_dust: 'W kurzu na gzymsie jest czysty kwadrat. Coś tu długo stało.',
      village_placed: 'No. Tam, gdzie ją trzymałaś.',
      village_claimed: 'Gra sama. Zegar wybija godzinę. Szósta.',
      village_water: 'Ten huk. Woda. Nadchodzi.',
      village_ladder: 'Drabina. W górę. Wspinaj się.',
      village_top: 'Szczyt. Cała dolina to woda.',
      village_gran: 'Babcia nigdy nie mówiła, że miała tu mamę. Ani razu.',
    },
    lines: {
      village_mantelLook: 'Gzyms kominka',
      village_mantelPut: 'Postaw pozytywkę na gzymsie',
      village_ladderPrompt: 'Wspinaj się po drabinie (przytrzymaj W)',
      village_wellLook: 'Studnia',
    },
    radio: {
      village_otto1: [
        ['radio', '[deszcz na szumie]'],
        ['otto', 'Dziewiątka do Ady. Deszcz, pusta wieś, zapora? Gammel Ostra. Mam po niej całą półkę. Głównie klamki. Ludzie zabierają klucze i zostawiają klamki.'],
        ['ada', 'Ktoś śpiewa. W kościele.'],
        ['otto', 'To niech śpiewają. Kiedy śpiewają, patrzą na ołtarz. Jeśli przestaną, niech pani nie czeka, żeby sprawdzić dlaczego.'],
      ],
      village_otto2: [
        ['otto', 'Ado. Pozytywka na mojej półce właśnie zaczęła grać sama. Woda na podłodze tutaj się podnosi. Na pani miejscu bym poszedł. Poszedłbym teraz.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 października 1964 roku. Moja prababcia Signe Holm nie chciała opuścić swojego domu. Jej syn Tor, inżynier zapory, powiedział jej, że zasuwy zamkną dziewiątego; zamknęli je drugiego, a on nie pojechał do domu. Babcia myślała, że Tor po nią jedzie. Kiedy przyszła woda, lampa wciąż się paliła. Postawiłam jej pozytywkę z powrotem na gzymsie, a potem wspinałam się po zaporze, a pode mną napełniała się dolina.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
