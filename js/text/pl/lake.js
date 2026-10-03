/* Polski — Rozdział 9: Lód (jezioro Ostra) i trzy zakończenia. Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      lake: {
        name: 'ROZDZIAŁ 9', title: 'Lód', place: 'Jezioro Ostra',
        intro: 'Niedziela, 14 stycznia 1979 roku, 15:40.\n\nDom babci na brzegu. W piecu się pali, radio gra. Na jeziorze starsze dzieciaki siedzą przy rybackich budkach, a od północy nadciąga śnieg.\n\nWren jest gdzieś tam.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'Radio, cicho, na stole', from: 'Pogoda dla pojezierza', date: 'Niedziela, 14 stycznia 1979, 15.30', body:
`...po południu przelotne opady śniegu, od mniej więcej czwartej przechodzące w intensywne opady, z silnym wiatrem z północy i zawiejami. Po zmroku na otwartym terenie i na jeziorach widoczność bliska zeru.

Lód na jeziorze Ostra nad starym korytem rzeki, po północno-zachodniej stronie, jest niebezpieczny. Prosimy w ogóle nie wchodzić tam na lód.

A teraz wiadomości o wpół do czwartej...` },
      lake_granNote: { kind: 'note', title: 'Kartka na kuchennym stole', from: 'Babcia', date: 'Niedziela', body:
`Ado —

Poszłam do gospodarstwa po mleko. Wrócę o wpół do piątej.
Wren NIE wchodzi na lód. Masz ją trzymać przy sobie w domu.
W puszce są drożdżówki, po jednej dla każdej.

Babcia` },
      lake_wrenNote: { kind: 'note', title: 'Kartka przyklejona do drzwi dziewczynek', from: 'Wren', date: '(bez daty)', body:
`ADA
JA TEŻ IDĘ

(Pod spodem narysowany czerwony ptaszek, który leci za większym ptakiem z zielonym paskiem na szyi.)` },
      lake_diary: { kind: 'note', title: 'Pamiętnik pod górną poduszką', from: 'Ada, 12 lat', date: '14 sty 1979', body:
`Sunna i Per, i wszyscy będą przy budkach po obiedzie. SUNNA MNIE ZAPROSIŁA.

Sunna powiedziała: weź swojego ptaszka, wrzucimy ją do przerębli. Ha ha.

NIE wezmę jej. Łazi za mną wszędzie jak pies, a potem płacze i wszyscy patrzą na mnie. Chociaż raz chcę gdzieś pójść bez niej.` },
      lake_search: { kind: 'report', title: 'Złożony raport w szopie na łodzie', from: 'Policja powiatu Ostra', date: 'Styczeń 1979', body:
`Zaginione dziecko: Wren LIND, 7 lat, dom Lindów, południowy brzeg, jezioro Ostra.

14.1, 16.50. Zaginięcie zgłosiła babcia, pani Ingrid Lind, po powrocie do domu.
Siostra dziecka, Ada Lind, 12 lat, zeznaje, że Wren nie wyszła z nią na lód i że myślała, że Wren jest w domu.
Poszukiwania: dom, zabudowania gospodarcze, lasy na południu i droga, przez całą noc. Mocny śnieg.
16.1, 11.20. Na lodzie, około 300 metrów na północny zachód od rybackich budek, nad starym korytem rzeki, znaleziono czerwoną dziecięcą rękawiczkę (prawą). Lód niebezpieczny. Nurkowanie niemożliwe do roztopów.` },
      lake_hutNote: { kind: 'note', title: 'Paczka po papierosach, popisana', from: '(starsze dzieciaki)', date: '14.1.79', body:
`PER + SUNNA

PTASZEK ADY ZNOWU ZA NIĄ PRZYLAZŁ
ĆWIR ĆWIR

(rysunek ptaszka ze smutną buzią i strzałka pokazująca na zewnątrz budki)` },
      lake_tape: { kind: 'transcript', title: 'Kaseta w magnetofonie: „DLA ADY”', from: 'Ingrid Lind', date: 'Grudzień 1995', body:
`[kliknięcie; tyka kuchenny zegar; ktoś sadowi się na krześle]

Ado. Tu babcia. Mówią, że źle się czuję, więc powiem to na taśmę, bo nigdy nie umiałam powiedzieć ci tego w twarz.

Zawsze wiedziałam, że widziałaś ją na lodzie. Wiedziałam to tamtego wieczoru z twojej twarzy. Nigdy cię nie zapytałam, bo bałam się, co by ci zrobiło, gdybyś to powiedziała. Wmówiłam sobie, że to dobroć.

To nie była dobroć. Kobiety w tej rodzinie milczą i nazywają to dobrocią. Moja matka czekała, aż mój brat po nią przyjedzie, a on nigdy nie przyjechał, i nikt nigdy nie powiedział tego na głos, ani razu.

Powiedz to, dziecko. Powiedz to na głos, komuś. A potem idź i ją odnajdź.

[zegar; długi oddech; taśma kręci się do końca]` },
    },
    items: {
      mitten: { name: 'Czerwona rękawiczka', desc: 'Dziecięca rękawiczka z jednym palcem, czerwona, lewa. Przyszła w paczce. Drugą znaleziono na lodzie.' },
    },
    obj: {
      lake_start: 'Znajdź Wren',
      lake_trail: 'Idź jej śladami na lód',
      lake_huts: 'Idź do budek, gdzie były starsze dzieciaki',
      lake_remember: 'Przypomnij sobie',
      lake_thin: 'Wyjdź na cienki lód nad starą rzeką',
      lake_say: 'Powiedz jej',
    },
    mono: {
      lake_start: 'Dom babci. W piecu się pali. Radio gra. Jest tysiąc dziewięćset siedemdziesiąty dziewiąty.',
      lake_empty: 'Nikogo. Babcia poszła po mleko. Butów Wren nie ma przy drzwiach.',
      lake_note: '„Masz ją trzymać przy sobie w domu”. Nie trzymałam.',
      lake_wrenNote: 'Zawsze pisała moje imię pierwsze.',
      lake_out: 'Małe ślady w śniegu. W dół, do brzegu. Na lód.',
      lake_ice: 'Lód śpiewa. Robi tak, kiedy jest mróz.',
      lake_wren: 'Czerwone. Tam. Oddala się.',
      lake_huts: 'Budki. Ktoś się tam śmieje.',
      lake_laughers: 'Śmieją się ze mnie. Wtedy też się ze mnie śmiali.',
      lake_hole: 'Przerębel. Stałam tutaj, kiedy to usłyszałam.',
      lake_remember1: 'Weszła za mną. Twarz cała różowa od mrozu. „Ada, ja też przyszłam”.',
      lake_remember2: 'I wszyscy na mnie spojrzeli. A ja strąciłam jej rękę z mojego rękawa i powiedziałam: spadaj, Wren. Idź do domu. Spadaj.',
      lake_remember3: 'Poszła. W złą stronę. W śniegu nie było widać brzegu.',
      lake_remember4: 'A potem lód wydał dźwięk. Długi. Tam, po lewej. A ja się nie odwróciłam, bo na mnie patrzyli.',
      lake_storm: 'Nadchodzi śnieg. Nie widzę domu.',
      lake_thin: 'Lód jest tu ciemny. Cienki. Idź. Nie biegnij.',
      lake_hush: 'Coś w śniegu za mną. Zielony szalik.',
      lake_quiet: 'Zrobiło się tak cicho. Nie słyszę własnych kroków.',
      lake_found: 'Jest.',
      lake_tape: 'Głos babci. Od dwóch lat mam tę kasetę w szafce i nigdy jej nie odsłuchałam.',
      lake_gone: 'Ślady prowadzą dalej, w lewo. Do rzeki.',
    },
    lines: {
      lake_radioPrompt: 'Posłuchaj radia',
      lake_tapePrompt: 'Odtwórz kasetę',
      lake_holePrompt: 'Zajrzyj do przerębli',
      lake_choiceTitle: 'Wren stoi na cienkim lodzie, plecami do ciebie.',
      lake_sayIt: 'Powiedz to. Wszystko.',
      lake_vanished: '„Po prostu zniknęła. Nikt nic nie widział”.',
      lake_say1: '„Kazałam ci spadać”.',
      lake_say2: '„Poszłaś w złą stronę, a ja usłyszałam lód i się nie odwróciłam”.',
      lake_say3: '„Powiedziałam babci, że w ogóle nie wyszłaś. Pozwoliłam, żeby szukali cię w lesie”.',
      lake_give: 'Daj jej rękawiczkę',
    },
    radio: {
      lake_otto1: [
        ['radio', '[śnieg na szumie, bardzo miękko]'],
        ['otto', 'Dziewiątka do Ady. Ledwie panią słyszę. To nie jest moja półka. W ogóle jej nie widzę. Myślę, że jest pani.'],
        ['otto', 'Cokolwiek pani tam znajdzie, proszę powiedzieć to jej. Nie mnie.'],
      ],
      lake_otto2: [
        ['otto', 'Ado. Coś na tej półce zabiera wszystkiemu dźwięk. Proszę nie pozwolić mu podejść na tyle blisko, żeby zabrało pani.'],
      ],
    },
    recap: {
      lake: 'Jezioro Ostra, 14 stycznia 1979 roku. Miałam dwanaście lat. Wren poszła za mną na lód i do budki, w której były starsze dzieciaki, a ja kazałam jej spadać. W śniegu poszła w złą stronę, nad starą rzekę, gdzie lód jest cienki, a ja to usłyszałam i się nie odwróciłam. Potem wróciłam do domu i powiedziałam babci, że ona w ogóle nie wyszła.',
    },
    endings: {
      thaw: {
        title: 'ODWILŻ', subtitle: 'Prawda powiedziana na głos',
        lines: [
          'Mówię to. Wszystko. Słowa wychodzą ze mnie jak coś, co przez dziewiętnaście lat trzymałam w ustach.',
          'Wren się odwraca. Twarz ma różową od mrozu. Patrzy na mnie tak jak zawsze, jakbym była wyższa, niż jestem.',
          'Daję jej rękawiczkę. Zakłada ją. Unosi obie ręce, żeby mi pokazać: dwie czerwone rękawiczki, znowu para.',
          'Potem odwraca się i idzie po lodzie do domu, w stronę świateł domu, i nie ogląda się. Nic nie szkodzi. Teraz zna drogę.',
          'Dziesięć po szóstej rano budzę się przy okienku w Składnicy 9, z otwartą paczką przed sobą. Przestało padać.',
          'Piszę ODEBRANO na odbiorze 256. Dzwonię na policję w Halvard w sprawie sprzed dziewiętnastu lat. Potem wyjmuję z szafki kasetę babci i słucham jej do samego końca.',
          'W kwietniu, kiedy puszcza lód, nurkowie przeszukują stare koryto rzeki.',
          'Wren leży pochowana obok naszej babci, na wzgórzu nad jeziorem, skąd widać je całe.',
          'Tego pierwszego ranka w tacce Składnicy 9 leżał drugi kwit, napisany starą, drżącą ręką, której jeszcze nie znałam: ODEBRANO. NARESZCIE. — A.',
        ],
      },
      snowfall: {
        title: 'ŚNIEŻYCA', subtitle: 'Ta, która została',
        lines: [
          '„Po prostu zniknęła” — mówię. — „Nikt nic nie widział”.',
          'Wren się nie odwraca. Za mną, bardzo blisko, stoi to coś w zielonym szaliku. Zaczyna rozwijać szalik, zwój po zwoju, aż nie ma już czego rozwijać.',
          'Pod spodem jest moja własna twarz, dwunastoletnia, z mrozem na policzkach.',
          'Śnieg sypie na jezioro i przykrywa ciemny lód, i czerwoną postać na nim, i ślady, moje i jej, aż nie ma już nic do oglądania.',
          'Gdzieś bardzo głęboko w dole notatka nowym pismem jedzie w górę rurą poczty pneumatycznej. NOCNA URZĘDNICZKA, POZIOM 256. PIERWSZA ZMIANA.',
          'Na kanale dziewiątym, bardzo cicho: „Witamy na nocnej zmianie, Ado”.',
        ],
      },
      morning: {
        title: 'RANO', subtitle: 'Wszyscy, którzy się zgubili',
        lines: [
          'Mówię to. Wszystko. Wren się odwraca. Daję jej rękawiczkę, a ona unosi obie ręce, żeby mi pokazać, znowu para, i idzie po lodzie do domu, w stronę świateł domu.',
          'Dziesięć po szóstej rano budzę się przy okienku w Składnicy 9, z otwartą paczką przed sobą. Piszę ODEBRANO na odbiorze 256.',
          'Kwadrans po szóstej winda towarowa na końcu archiwum otwiera się sama.',
          'Wychodzi z niej starszy pan w płaszczu, który wyszedł z mody trzydzieści cztery lata temu, z mosiężną odznaką w dłoni, jakby dopiero co ją dostał.',
          '„Brandt” — mówi. — „Otto. Teraz pamiętam”. Rozgląda się po archiwum, po półkach, po mnie. — „Który mamy rok?”',
          'Mówię mu. Długo się nad tym zastanawia. A potem się śmieje, naprawdę, po raz pierwszy słyszę jego śmiech bez szumu.',
          'W kwietniu, kiedy puszcza lód, nurkowie przeszukują stare koryto rzeki. Wren leży pochowana obok naszej babci, na wzgórzu nad jeziorem.',
          'Tego ranka w tacce Składnicy 9 leży drugi kwit, napisany starą, drżącą ręką, którą znam bardzo dobrze: ODEBRANO. NARESZCIE. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
