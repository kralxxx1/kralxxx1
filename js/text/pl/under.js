/* Polski — Rozdział 1: Nieodebrane (Poziom 256, Podspód). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      under: {
        name: 'ROZDZIAŁ 1', title: 'Nieodebrane', place: 'Poziom 256',
        intro: 'Winda jechała w dół bardzo długo. Dłużej, niż dworzec jest głęboki. Dłużej, niż miasto jest stare.\n\nDrzwi otworzyły się na żółte pokoje, które pachną mokrą wykładziną i cudzymi parasolami. Gdzieś w nich buczenie. Gdzieś w nich wszystko, po co nikt nie wrócił.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Przywieszka bagażowa na wykładzinie', body:
`ZNALAZCĘ PROSZĘ O ZWROT DO:
M. STRAND, 8 LAT
KINO SAMOCHODOWE PINEWOOD, RZĄD 5

(Dziecięce pismo. Sznurek przegryziony.)` },
      under_umbrella: { kind: 'card', title: 'Przywieszka przy parasolu', from: 'O.B.', body:
`Przedmiot 41 207.
Jeden parasol, czarny, męski.
Pozostawiony z żalem.

Przedmiot 41 208.
Jedna rękawiczka, lewa. Na razie niczyja.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'List w walizce dziewczyny', from: 'Mama', date: '12 grudnia 1990', body:
`Lino —

Kiedy już kupisz bilet, trzymaj go w WEWNĘTRZNEJ kieszeni płaszcza. Nie w zewnętrznej. Nie wyjmuj go w pociągu, żeby na niego patrzeć, przecież wiesz, jaka jesteś.

Nordvik to stacja końcowa, kwadrans po szóstej. Tata będzie czekał na peronie z samochodem, cokolwiek byś mówiła o ciemności. Nie wysiadaj nigdzie wcześniej.

Nie pozwól nikomu wmówić sobie, że nie masz prawa jechać tym pociągiem.

Całuję, mama` },
      under_chalk: { kind: 'wall', title: 'Kreda na ścianie', body:
`PŁASCY SCHODZĄ ZE ŚCIANY
KIEDY SIĘ ODWRACASZ
WIĘC SIĘ NIE ODWRACAJ
— O.` },
      under_otto1: { kind: 'diary', title: 'Obozowy zeszyt Ottona', from: 'Otto Brandt', body:
`Przestałem liczyć dni. Zamiast tego liczę przedmioty. Dziś 41 212: kapelusz, aparat słuchowy, smycz bez psa.

Krótkofalówka działa na kanale dziewiątym. Nikt nie odpowiada. Mówię i tak. Głos nie rdzewieje.

Dziś rano przez podłogę przyszła notatka. Podpisana A. „Ktoś przychodzi. Bądź dla niej miły; nie uwierzy ci”.

Zawsze jestem miły. To z wiarą ludzie mają kłopot.` },
      under_list: { kind: 'note', title: 'Zasady piętra sortowni (tymczasowe)', from: 'O.B.', body:
`1. Zgubione światła są do trzymania, nie do jedzenia. Coś tutaj się z tym nie zgadza.
2. Kiedy buczenie robi się niższe, a lampy się jąkają, przestań iść. Ono słyszy. Ono nie widzi.
3. Tapetom nie należy ufać.
4. Drzwi Indeksu przyjmują cztery światła. Nigdy nie znalazłem więcej niż trzech naraz.
5. Nie odkładaj samego siebie do akt.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Wilgotna kartka przy wodzie', from: 'O.B.', body:
`Woda w tym pokoju jest zimna i smakuje jeziorem. Każdy pokój tutaj należy do czyjegoś najgorszego popołudnia.

Ten należy do kogoś, kogo jeszcze nie poznałem.` },
      under_index: { kind: 'wall', title: 'Napis z szablonu obok drzwi', body:
`INDEKS
PROSIMY PRZYGOTOWAĆ KWIT ODBIORU` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Rysunek pod kaloryferem', from: 'Wren, 7 lat', body:
`Kredki świecowe. Żółty pokój. Wielka okrągła rzecz z paszczą pełną zębów. Nad nią leci mały czerwony ptaszek.

Pod spodem:
TO JE ŚWIATŁA
PTASZEK JEST SZYBSZY` },
    },
    items: {},
    obj: {
      under_walkie: 'Znajdź drogę przez żółte pokoje',
      under_lights: 'Znajdź zgubione światła ({n}/4)',
      under_index: 'Zanieś cztery światła do Drzwi Indeksu',
      under_leave: 'Przejdź przez Drzwi Indeksu',
    },
    mono: {
      under_start: 'To nie piwnica. Winda jechała w dół cztery minuty. Dworzec nie jest taki głęboki.',
      under_walkie: 'Krótkofalówka, przyklejona taśmą na kanale dziewiątym. Ktoś zostawił ją włączoną.',
      under_light1: 'Mała lampka. Ciepła. Przez chwilę wszystko w ciemności ucichło, jakby wstrzymało oddech.',
      under_light4: 'Cztery. Gdzieś na drugim końcu piętra coś przestało przeżuwać.',
      under_indexSeen: 'INDEKS. Cztery puste oprawki przy drzwiach.',
      under_wpSeen: 'To było w ścianie. To była ściana. I ruszyło się, kiedy się odwróciłam.',
      under_eaterSeen: 'Za duże na korytarz. Blade. Przeżuwa.',
      under_humNear: 'Buczenie zrobiło się niższe. Światła się jąkają.',
    },
    lines: {
      under_slots: 'Cztery oprawki ({n}/4 świateł)',
      under_place: 'Włóż światła do oprawek',
      under_walkiePrompt: 'Weź krótkofalówkę',
      under_lightPrompt: 'Weź zgubione światło',
    },
    radio: {
      under_otto1: [
        ['radio', '[szum]'],
        ['otto', '...dziewiątka. Tu dziewiątka. Czy ktoś jest na linii? Słyszę, jak pani oddycha. To nie zarzut.'],
        ['ada', 'Kto mówi?'],
        ['otto', 'Brandt. Składnica 9, nocne okienko. A pani jest na moim piętrze sortowni bez kwitu.'],
        ['ada', 'Otto Brandt? Pan zaginął w 1964 roku.'],
        ['otto', 'W 1964. Czy to już... nie. Powie mi pani później. Jak się pani nazywa, koleżanko?'],
        ['ada', 'Ada. Ada Lind. Mam pana posadę.'],
        ['otto', 'W takim razie ma pani moje współczucie. Proszę posłuchać, Ado Lind. Tu trafia wszystko, po co nikt nie wrócił. Jest tu bardzo dużo miejsca i nie jest tu pusto.'],
        ['otto', 'Są drzwi. Drzwi Indeksu. Chcą czterech zgubionych świateł, małych lampek, pozna je pani. Proszę przynieść cztery, a się otworzą.'],
        ['ada', 'A za drzwiami?'],
        ['otto', 'Kolejne piętra. Nazywam je półkami. Notatka mówiła, że pani przyjdzie. Podpisana A. Zna pani jakąś A.?'],
        ['ada', '...Nie.'],
        ['otto', 'Ja też nie. Proszę nie wyłączać kanału.'],
      ],
      under_lights: [
        ['otto', 'Znalazła pani jedno. Proszę trzymać je przy sobie. Coś tutaj je zjada, a dopóki trzyma pani w dłoni świeże, boi się pani.'],
        ['ada', 'Jak długo?'],
        ['otto', 'Niedługo. Nic tu się długo nie boi.'],
      ],
      under_wallpaper: [
        ['otto', 'Widziała już pani płaskich ludzi? W tapecie. Odklejają się, kiedy odwraca się pani plecami.'],
        ['ada', 'A kiedy na nich patrzę?'],
        ['otto', 'Wtedy są tapetą. Bardzo cierpliwą tapetą.'],
      ],
      under_hum: [
        ['otto', 'Jeśli buczenie robi się niższe, a lampy się jąkają, proszę się zatrzymać. Coś tam stoi. Nie widzi pani. Słyszy pani buty.'],
        ['ada', 'Co to jest?'],
        ['otto', 'Odłożyłem to do „różnych”. To pojemna kategoria.'],
      ],
      under_eater: [
        ['otto', 'Ado. Ten dźwięk. Obudziło się.'],
        ['otto', 'Pożeracz. Najstarsza rzecz tu na dole. Zjada to, czego nikt nie chce. Niech pani nie pozwoli mu uznać, że to pani. Proszę biec do Drzwi Indeksu. Proszę ścinać zakręty; na zakrętach jest wolny.'],
      ],
      under_index: [
        ['otto', 'Drzwi Indeksu. Cztery oprawki. Nigdy nie znalazłem więcej niż trzech świateł naraz. Może pani ma więcej szczęścia.'],
      ],
      under_open: [
        ['otto', 'Otwarte. Nigdy nie widziałem ich otwartych.'],
        ['ada', 'Proszę iść ze mną.'],
        ['otto', 'Nie mogę. Nie wiem dlaczego. Chyba zostałem odłożony do akt na tym piętrze. Proszę iść. Będę na dziewiątce.'],
        ['otto', 'Na dnie każdej półki niżej leży kłamstwo, Ado. Proszę szukać kłamstwa.'],
      ],
      under_badge: [
        ['ada', 'Otto. Przyniosłam coś pańskiego. Z pana biurka. Zostawiam to w drzwiach.'],
        ['otto', '[długa cisza]'],
        ['otto', 'O. Brandt. Otto. Tak się nazywałem. Gdzieś to odłożyłem i zapomniałem gdzie.'],
        ['otto', 'Dziękuję, Ado. Proszę ją tam zostawić. Teraz będę wiedział, gdzie jest.'],
      ],
    },
    recap: {
      under: 'Poziom 256: żółte pokoje pełne rzeczy, po które nikt nie wrócił. Otto Brandt żyje tam na dole, na kanale dziewiątym; myśli, że minął mniej więcej rok. Oddałam Drzwiom Indeksu cztery zgubione światła, a za mną budziło się coś okrągłego i bardzo starego.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
