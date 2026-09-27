/* Polski — Poziom 4: Harlow Mutual (Rosie). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      office: {
        name: 'LEVEL 4', title: 'Harlow Mutual', place: 'Wspomnienie Rosie — Keystone Building, 3. piętro',
        intro: 'Boksy, zielone ekrany, zimna kawa. Dzwoni telefon. Potem drugi. Potem wszystkie milkną naraz.\n\nRosie odrabiała tu lekcje co wieczór, kiedy jej mama siedziała po godzinach, i mówiła do magnetofonu, żeby biuro wydawało się mniej puste.',
      },
    },
    docs: {
      office_lily4: { kind: 'drawing', drawing: 4, title: 'Rysunek w teczce z napisem „LIL — ZACHOWAĆ”', from: 'Lily, 9 lat', body:
`Kredki świecowe. Wysoki budynek z mnóstwem okien. W jednym oknie dziewczyna w słuchawkach mówi do mikrofonu. Nutki fruwają nad całym miastem.

ROSIE BĘDZIE W RADIU.
(ROSIE CZASEM ODPROWADZA MNIE DO DOMU Z SALONU GIER.)
POZWALA MI WYBIERAĆ PIOSENKI.` },
      office_intro: { kind: 'notice', title: 'Tabliczka na drzwiach pokoju ochrony', from: 'Dział administracji', body:
`POKÓJ OCHRONY
Kod zmieniony w kwietniu 1987 zgodnie z polityką firmy.
Każdy kierownik działu otrzymał JEDNĄ cyfrę.
Nie zapisuj swojej cyfry.

(Cztery różne osoby zapisały swoją cyfrę gdzieś na tym piętrze.)` },
      office_clue1: { kind: 'printout', title: 'Notatka zapomniana w drukarce', from: 'Dział administracji', date: '2 kwietnia 1987', clue: 1, body:
`DO: Dział szkód
OD: Dział administracji

Wasza cyfra nowego kodu ochrony to: 1
To PIERWSZA cyfra.

Prosimy zapamiętać i zniszczyć tę notatkę.

(Nikt nie zniszczył tej notatki.)` },
      office_clue2: { kind: 'screen', title: 'Terminal: CODE.TXT', from: 'Terminal biurowy', clue: 2, body:
`C:\\> TYPE CODE.TXT

KOD POKOJU OCHRONY
POZYCJA 2 = 0
POZYCJE 3 I 4: zapytać Carol z działu szkód.
Ona i tak wie wszystko.

C:\\> _` },
      office_clue3: { kind: 'wall', title: 'Tablica w pokoju socjalnym', from: 'Rosie', clue: 3, body:
`RADIO ROSIE
10_.3 FM
JEDYNA STACJA, KTÓRA GRA
TO, CO MUSISZ USŁYSZEĆ

brakująca cyfra = moja szczęśliwa liczba = 7
(Mama mówi, że nie mogę wstawić swojej stacji do kodu. Za późno!)` },
      office_clue4: { kind: 'phone', title: 'Poczta głosowa, wewnętrzny 1073', from: 'Carol, dział szkód', clue: 4, body:
`[Piknięcie.]

CAROL: Rosie, kochanie, tu mama. Utknęłam na zebraniu w sprawie szkód, znowu się przeciąga.

CAROL: Jak zadzwoni administracja w sprawie kodu, powiedz im, że ostatnia cyfra to trzy. Trzy, jak nas troje: ty, ja i mikrofalówka.

CAROL: Nie zjadaj wszystkich krakersów z automatu. Kocham cię. Najpierw lekcje, potem radio.

[Piknięcie.]` },
      office_carol: { kind: 'note', title: 'Kartka na lodówce w pokoju socjalnym', from: 'Carol, mama Rosie', date: 'Kwiecień 1987', body:
`R —

Zebranie znowu się przeciąga. Obiad jest w zamrażarce, ten z niebieską pokrywką. Siedem minut, nie dziesięć.

Lekcje PRZED radiem.

Jestem z ciebie dumna. Wiem, że tego nie mówię. Mówię to na lodówce.

—Mama` },
      office_tracklist: { kind: 'card', title: 'Okładka kasety', from: 'Rosie', date: 'Kwiecień 1987', body:
`OPERACJA 256 — OFICJALNA SKŁADANKA

STRONA A: NA DZISIAJ
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Lantern
3. Midnight at the Starlight — Rosie (na żywo z pokoju socjalnego)
4. Don’t Look Back — Harbor Lights

STRONA B: NA POTEM
(pusta — nagramy ją, jak wygramy)` },
      office_rosie_tape: { kind: 'tape', title: 'Taśma: „Radio Rosie, na żywo”', from: 'Magnetofon Rosie', date: '14 i 17 kwietnia 1987', body:
`[Kliknięcie. Brzęczenie jarzeniówek. Mikrofalówka odlicza.]

ROSIE: Dobry wieczór, Harlow! Tu Radio Rosie, sto siedem i trzy dziesiąte, na żywo z pokoju socjalnego Harlow Mutual, gdzie kawa jest przypalona, a przyszłość świetlana.

ROSIE: [ciszej] Czasem gadam do tego pudła przez godzinę i nikt nie słyszy. Nic nie szkodzi. Miło jest udawać, że ktoś tam jest.

[Taśma syczy i przeskakuje. Teraz: deszcz o szybę, muzyka automatów, wentylator. Licznik pokazuje 12:40.]

ROSIE: [szeptem] Radio Rosie, na żywo ze Starlight po zamknięciu. Poziom dwieście dwunasty. Danny trzyma drążek i poci się jak mysz.

[Trzy stuknięcia w metalowe drzwi.]

NELL: Ktoś jest przy tylnych drzwiach.

TOBY: [już biegnie] Wiedziałem! WIEDZIAŁEM!

[Szczęk zasuwy. Deszcz robi się głośny.]

ROSIE: No proszę, proszę. Kto tu wraca na czworakach.

TOBY: [śmieje się, prawie płacze] Jesteś!

ROSIE: Przywitaj się z Harlow, ty sieroto—

[Kliknięcie. Tu taśma się kończy.]` },
      office_walt5: { kind: 'diary', title: 'Dziennik Walta', from: 'Walt', date: 'W środku, dzień ?', body:
`Fioletowa jest zawsze tam, gdzie zaraz będę. Czyta mnie jak mapę.

Rosie robiła to samo przy automacie. Stawała za Dannym i szeptała: „w lewo, w lewo, teraz czekaj, teraz JAZDA”. Nigdy się nie przyznał, że jej słuchał.

Dziś poszedłem w lewo. Już tam była. Nie dotknęła mnie. Tylko na mnie spojrzała, jakby było jej przykro.` },
      office_eddie_page: { kind: 'note', title: 'Wyrwana kartka, zmięta', from: 'Eddie', body:
`…jeden wchodzi, jeden wychodzi. Czyli drzwi chcą, żeby ktoś został. Ktoś, kto przejdzie przez ekran po mnie. To może być ktokolwiek. To może być dzieciak.

Nie. Przestań.

Nie jesteś taki, Eddie.` },
      office_board: { kind: 'wall', title: 'Tablica w sali konferencyjnej', from: 'Sala konferencyjna B', body:
`PRZEGLĄD SZKÓD
- zaległości: 212 teczek
- nadgodziny: zatwierdzone (znowu)
- piątek: składkowy obiad

W poprzek wszystkiego, innym markerem:
GDZIE WSZYSCY SIĘ PODZIALI` },
      office_phone2: { kind: 'phone', title: 'Linia 0256', from: 'Nieznana linia', body:
`[Trzaski. Potem płaski, dziecięcy głos, liczący powoli.]

…dwieście pięćdziesiąt trzy…
…dwieście pięćdziesiąt cztery…
…dwieście pięćdziesiąt pięć…

[Liczenie się urywa. Oddech, tuż przy słuchawce.]

…dwieście pięćdziesiąt-

[Połączenie się zrywa.]` },
      office_phone3: { kind: 'phone', title: 'Telefon z 1987 roku', from: 'Maggie Marsh', date: '17 kwietnia 1987, 7:12', body:
`[Sygnał, potem kobieta, która bardzo się stara brzmieć spokojnie.]

MAGGIE: Halo? Carol? Tu Maggie, mama Toby’ego. Przepraszam, że dzwonię do pracy tak wcześnie. Czy Rosie jest z tobą? Toby mówił, że nocuje u Kellerów, ale Sam mówi, że Toby w ogóle nie przyszedł…

MAGGIE: Jest tam ktoś?

MAGGIE: …Zostawiłam mu zapalone światło na ganku. Po prostu zostawię je zapalone.

[Kliknięcie.]` },
      office_personnel: { kind: 'screen', title: 'Terminal: PERSONNEL.TXT', from: 'Terminal biurowy', body:
`HARLOW MUTUAL — DZIAŁ SZKÓD
CAROL A. ..... LIKWIDATOR ..... NADGODZINY Q1: 212 H
DENNIS R. .... KIEROWNIK ...... NADGODZINY Q1:  12 H
MARGE T. ..... REFERENT ....... NADGODZINY Q1:   0 H

REJESTR GOŚCI (PO 18:00):
ROSIE A. (CÓRKA CAROL A.) ... 61 WIZYT

C:\\> _` },
    },
    obj: {
      office_code: 'Znajdź cyfry kodu ochrony ({n}/4)',
      office_keypad: 'Wpisz kod na klawiaturze pokoju ochrony',
      office_card: 'Weź kartę ochrony',
      office_stairs: 'Użyj karty przy drzwiach klatki ewakuacyjnej',
    },
    mono: {
      office_start: 'Biuro. Zielone ekrany. Nikogo tu nie ma, a wygląda, jakby wszyscy przed chwilą wstali.',
      office_rosieSeen: 'Fiolet… przede mną. Była tam pierwsza. Jej oczy są tam, dokąd idę.',
      office_code: 'Są wszystkie cztery. Jeden, zero, siedem, trzy. Stacja Rosie.',
      office_cameras: 'Monitory pokazują kamery z piętra. Teraz widzę je na mapie.',
      office_tape: 'Strona B jest pusta. „Na potem”.',
    },
    lines: {
      office_keypad: 'Wpisz kod',
      office_card: 'Przeciągnij kartę',
      office_cardIdle: 'Czytnik kart (czerwony)',
      office_cardRed: 'Lampka czytnika kart świeci na czerwono.',
    },
    radio: {
      office_start: [
        ['eddie', 'Biuro? …Harlow Mutual. Mama Rosie tu pracowała. Rosie co wieczór do dziewiątej odrabiała lekcje w pokoju socjalnym.'],
        ['eddie', 'Dzwoniła do salonu z ich telefonu i czytała nam prognozę pogody. Co wieczór, bez wyjątku.'],
      ],
      office_rosie: [
        ['eddie', 'Fioletowa jest przed tobą! Czyta, dokąd idziesz. Zawróć. Odwróć się bez powodu. Wiem, jak to brzmi.'],
      ],
      office_tape: [
        ['eddie', 'Składanka. Nagrała ją na tamtą noc. Strona B była „na potem”.'],
        ['sam', 'Po czym?'],
        ['eddie', 'Po tym, jak wygrają. Jak wrócą do domu.'],
      ],
      office_freed: [
        ['eddie', 'Idzie obok ciebie. Nie przed tobą. Obok.'],
        ['eddie', 'Tak samo stała za Dannym przy automacie. Tuż obok, szepcząc ruchy.'],
      ],
      office_page: [
        ['sam', 'Eddie. Tu jest kartka. Twoje pismo. „Jeden wchodzi, jeden wychodzi. To może być dzieciak”.'],
        ['eddie', '…To stare. W pierwszym tygodniu napisałem mnóstwo głupot. Zapomnij.'],
        ['eddie', 'Schody, Sam. Biegnij do schodów.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
