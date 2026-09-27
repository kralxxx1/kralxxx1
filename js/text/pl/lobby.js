/* Polski — Poziom 0: tryb demonstracyjny. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Tryb demonstracyjny', place: 'Wewnątrz ekranu',
        intro: 'Buczenie, które czuć w zębach. Mokra wykładzina. Żółte ściany bez końca. Daleko dźwięk słyszany dziesięć tysięcy razy z głośnika automatu: syrena Zjaw, która narasta i opada.\n\nGra czekała na gracza. Teraz go ma.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Kartka przyklejona do ściany', from: 'Eddie', body:
`JEŚLI TO CZYTASZ:

1. Nie biegnij, chyba że już cię zobaczyło. Bieganie jest głośne.
2. Tabliczki EXIT kłamią. Prowadzą głębiej, nie na zewnątrz.
3. Kiedy światła migają, uciekaj z korytarza.
4. Lampiony są prawdziwe. Weź jeden, a wszystko ucieka przed TOBĄ. Przez chwilę.
5. Star Pop (ta wiśniowa oranżada) zatrzymuje drżenie rąk. Nie pytaj mnie dlaczego.
6. W moim obozie jest krótkofalówka. Kanał 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'Dziennik obozowy Eddiego', from: 'Eddie', date: '12 czerwca 1993 (?)', body:
`Obóz 1.

Przeszedłem przez ekran o 23:40. Wylądowałem na twarzy. Wykładzina jest przemoczona, ale nic nie cieknie. Tu nigdy nic nie cieknie.

Ani śladu Walta. Znalazłem jego latarkę i jego pismo na ścianie.

Krótkofalówki działają na kanale 7. Nikt nie odpowiada. Zostawiam jedną dla następnego idioty, który pójdzie za dorosłym facetem do gry wideo.

Jeśli to ty: cześć. Sorry. Kanał 7.` },
      lobby_walt1: { kind: 'diary', title: 'Strona z pamiętnika Walta', from: 'Walt', date: 'W środku, dzień 1', body:
`Dzień 1.

Żółto. Buczy jak zepsuty statecznik. Wykładzina jest mokra.

Słyszę w oddali syrenę, tę, która gra, kiedy Zjawy wychodzą ze swojego domu.

Są tutaj. Miałem rację. Boże, pomóż mi, miałem rację.

Danny. Rosie. Nell. Toby. Wytrzymajcie. Idę.` },
      lobby_walt2: { kind: 'diary', title: 'Kolejna strona z pamiętnika Walta', from: 'Walt', date: 'W środku, dzień 9 (?)', body:
`Dzień 9. Albo 90.

Cały czas jestem głodny. Wszędzie stoją puszki Star Popa, tyle, ile mieści moja własna lodówka turystyczna. Wypiłem wszystkie. Nie pamiętam, żebym o tym decydował.

Lampiony smakują jak monety. Kiedy połknę jeden, widzę dalej.

Pierwszej nocy spróbowałem z wtyczką. Sam. Coś we mnie zrobiło klik, jak wpadająca moneta.

Dziś widziałem czerwonego. Uciekł przede mną. Zawołałem go po imieniu i zatrzymał się, na sekundę.

Teraz rozumiem. To ja jestem tym z paszczą.` },
      lobby_flyer: { kind: 'flyer', title: 'Złożona ulotka', from: 'Rosie', date: 'Kwiecień 1987', body:
`★ ŚCIŚLE TAJNE ★
OPERACJA 256

KIEDY: czwartek 4/16, po zamknięciu
MISJA: zobaczyć, co jest za kill screenem

EKIPA:
Danny — klucz (NIE mów Waltowi)
Rosie — plan + przekąski
Nell — mapa tras Zjaw
Toby — latarka
Sam — szczęście

CAŁA PIĄTKA ALBO NIKT.
ZNISZCZYĆ PO PRZECZYTANIU!!!
(Toby, to znaczy: nie trzymaj tego w komiksie.)` },
      lobby_exitwall: { kind: 'wall', title: 'Wydrapane obok drzwi EXIT', body:
`EXITY KŁAMIĄ
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Napisane nad krzesłami', body:
`KRZESŁA JUŻ STAŁY
PRZODEM DO ŚCIANY
KIEDY TU PRZYSZEDŁEM
—W.` },
      lobby_puddle: { kind: 'note', title: 'Wilgotna kartka przy kałuży', from: 'Walt', body:
`Woda jest tu ciepła i pachnie chlorem. Jak na miejskim basenie.

Nell po ’85 nie podchodziła do basenu. Czy to jej?

Każdy pokój tutaj do kogoś należy.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Rysunek wetknięty za kratkę wentylacyjną', from: 'Lily, 9 lat', body:
`Kredka. Duży pan z wąsami i mała dziewczynka z pomarańczowymi warkoczykami obok małego automatu. Na ekranie: okrągłe pomarańczowe stworzenie i liczba 3190. Dziewczynka ma obie ręce w górze.

JA I TATA I MAŁA MASZYNKA.
MAM 3190 PUNKTUF!!!
TATA MÓWI ŻE TO ZOSTANIE NA LIŚCIE NA ZAWSZE.` },
      lobby_tape: { kind: 'tape', title: 'Taśma: „Próba, próba”', from: 'Eddie', date: 'W środku', body:
`[Kliknięcie. Ciężki oddech. Buczenie.]

EDDIE: Próba, próba. Dziennik nagrany, dzień… nie wiem. Dzień któryś.

EDDIE: Jeśli to June: nic mi nie jest. Naprawdę. Znajdę Walta, wyciągnę dzieciaki, będę w domu przed dzieckiem. Obiecałem, a ja dotrzymuję obietnic. Zazwyczaj.

[Pauza.]

EDDIE: Jeśli to nie June: kanał siódmy. Nie biegnij. I cokolwiek robisz, nie pozwól, żeby to usłyszało, jak jesz.

[Kliknięcie.]` },
    },
    obj: {
      lobby_explore: 'Znajdź wyjście',
      lobby_pellets: 'Znajdź lampiony ({n}/4)',
      lobby_insert: 'Włóż lampiony do panelu obok EXIT',
      lobby_leave: 'Przejdź przez drzwi',
    },
    mono: {
      lobby_start: 'Gdzie… Wykładzina jest mokra. Buczenie jest w mojej głowie.',
      lobby_exitSeen: 'EXIT. Cztery okrągłe gniazda obok drzwi. W sam raz na lampion.',
      lobby_firstPellet: 'Lampion. Ciepły w dłoni. Przez sekundę wszystko zrobiło się niebieskie i uciekło.',
      lobby_eaterHeard: 'Przeżuwanie. Gdzieś za ścianami coś przeżuwa.',
      lobby_eaterSeen: 'Coś bladego na końcu korytarza. Okrągłe. Za duże na ten korytarz. Przeżuwa.',
      lobby_allPellets: 'Cztery lampiony. Teraz drzwi.',
      lobby_radio: 'Krótkofalówka. Ktoś przykleił pokrętło taśmą na kanale 7.',
    },
    lines: {
      lobby_slots: 'Cztery gniazda ({n}/4 lampiony)',
      lobby_place: 'Włóż lampiony do gniazd',
      lobby_radioTake: 'Weź krótkofalówkę',
    },
    radio: {
      lobby_meet: [
        ['radio', '[szum]'],
        ['eddie', '…halo? HALO? Jest ktoś na siódemce? Powiedz coś!'],
        ['sam', '…Halo? Kto mówi? Gdzie ja jestem?'],
        ['eddie', 'O, dzięki Bogu. Człowiek. Dobra. Dobra. Nazywam się Eddie. Pracowałem kiedyś w Starlighcie. Siódemka cię tu wpuściła, tak?'],
        ['sam', 'Eddie? Ten od Walta? Zniknąłeś półtora roku temu. Twoja żona rozwiesiła twoje zdjęcie na każdym słupie w Harlow.'],
        ['eddie', 'Półtora roku. A to jakby jedna noc. Czyli dziecko jest już… [szum] Nie. Nie teraz. Jak masz na imię?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '…Sam? Paczka Toby’ego? Wiecznie na rowerze? No proszę. To dlatego.'],
        ['sam', 'Co dlatego?'],
        ['eddie', 'Przy twoim wejściu całe to miejsce to powiedziało. PLAYER ONE. Słyszałem to tu na dole jak na stadionie. Przy mnie nigdy tego nie powiedziało. Przy mnie było INSERT COIN.'],
        ['eddie', 'Zasady. Nie biegnij, chyba że coś cię widzi. Tabliczki EXIT kłamią. Jak światła migają, uciekaj z korytarza. Drzwi stąd chcą czterech lampionów. Znajdź je. I, Sam? Zostań na siódemce.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Czy to był lampion? Oj nie. Dobra. To usłyszało. Kiedy się jakiś bierze, zawsze coś się budzi.'],
        ['eddie', 'Zakręty, Sam. Na prostej jest szybkie, na zakrętach wolne.'],
      ],
      lobby_eater: [
        ['eddie', 'Już to widać, prawda? Nie patrz na to za długo. Ja to nazywam Pożeraczem.'],
        ['sam', 'Co to jest?'],
        ['eddie', 'To Gracz. Każda gra potrzebuje jakiegoś. Ten był… [szum] Po prostu bierz zakręty.'],
      ],
      lobby_panel: [
        ['eddie', 'Cztery gniazda. Wszystko tutaj to gra, Sam. Wyczyść planszę, a drzwi się otworzą.'],
      ],
      lobby_open: [
        ['eddie', 'Te drzwi to nie wyjście. EXITY kłamią. Ale to droga w dół, a oni są na dole.'],
        ['sam', 'Kto?'],
        ['eddie', 'Wiesz kto. Czworo dzieciaków z kwietnia ’87. Idź. Będę na siódemce.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
