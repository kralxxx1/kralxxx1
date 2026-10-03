/* Polski — Rozdział 7: Ostatni przystanek (Nordlys Express). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      train: {
        name: 'ROZDZIAŁ 7', title: 'Ostatni przystanek', place: 'Stacja Brenna, na linii północnej',
        intro: 'Środa, 19 grudnia 1990 roku, 23:40.\n\nNocny pociąg do Nordvik stoi przy peronie, wszystkie okna oświetlone. Nikt nie wsiada. Nikt nie wysiada. Jedne drzwi są otwarte.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'Rozkład jazdy przy drzwiach na peron', from: 'Koleje Północne', date: 'Rozkład zimowy 1990–91', body:
`NORDLYS EXPRESS — nocny pociąg z wagonami sypialnymi, codziennie
Halvard odj. 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (przystanek na żądanie)* 00.50
Nordvik przyj. 06.15

* Pociągi zatrzymują się w Kvitfjell tylko wtedy, gdy podróżny zgłosi to konduktorowi przed Brenną albo gdy na peronie czeka podróżny. Zimą przystanek jest nieobsadzony i nieoświetlony.` },
      train_notice: { kind: 'notice', title: 'Ogłoszenie w poczekalni', from: 'Koleje Północne, rejonowe biuro ruchu', date: '1 grudnia 1990', body:
`BILETY NALEŻY KUPIĆ PRZED WEJŚCIEM DO POCIĄGU.

W pociągach nocnych nie prowadzi się sprzedaży biletów. Podróżny, który nie okaże konduktorowi ważnego biletu, musi opuścić pociąg na najbliższym przystanku.

Dziękujemy za podróż z Kolejami Północnymi.

(Ktoś dopisał pod spodem długopisem: „nawet w Kvitfjell?”, a ktoś inny: „ZWŁASZCZA w Kvitfjell”)` },
      train_menu: { kind: 'note', title: 'Karta wagonu restauracyjnego', from: 'Wagon restauracyjny Nordlys Express', date: '19.12.90', body:
`Zupa rybna z chlebem — 48
Gulasz z renifera, borówki, ziemniaki — 95
Gofry z dżemem i kwaśną śmietaną — 32
Kawa — 12   Kakao — 14

Wagon restauracyjny zamykamy o 23.00. Po 23.00 podróżni z wagonów sypialnych są obsługiwani po okazaniu miejscówki.

(Ślad po kubku. Pod kartą ołówkiem: „Stolik przy kuchni: kakao, miejsce 24, gotówka”.)` },
      train_waiter: { kind: 'note', title: 'Bloczek zamówień przy kuchni', from: 'R. Moe, kelner', date: '19.12.90', body:
`23.55  Miejsce 24 (wagon 2) — młoda panienka, sama — kakao, gofry.
       Restauracja zamknięta, ale pokazała miejscówkę, no to.
       Jedzie do domu do Nordvik na święta. Pierwszy raz sama pociągiem.
       Schowała bilet z powrotem do kieszeni płaszcza. Powiedziałem, żeby go nie zgubiła.

00.30  Pan Saether przechodzi na obchód. Śnieg na torach
       od samej Ostry, a on wyżywa się na wszystkich.` },
      train_paper: { kind: 'clipping', title: 'Gazeta zostawiona na stoliku', from: 'Nordvik Tidende', date: 'Sobota, 22 grudnia 1990', body:
`15-LATKA ZAGINĘŁA W ŚRODĘ

Lina Berg, 15 lat, z Nordvik, nie była widziana, odkąd w środę wieczorem wsiadła w Halvard do Nordlys Express, żeby przyjechać do domu na święta.

Nie dojechała. Koleje Północne twierdzą, że między Brenną a Nordvik żaden podróżny nie opuścił pociągu, a jej miejsce po przyjeździe było puste.

Od tamtej pory w całym powiecie codziennie pada śnieg. Policja prosi wszystkich, którzy jechali tym pociągiem, o zgłoszenie się.` },
      train_lina: { kind: 'letter', title: 'List na stoliczku przy miejscu 24', from: 'Lina', date: '19.12.90, w pociągu', body:
`Kochana Mamo,

jestem w pociągu!!! Kupiłam bilet sama, z sobotnich pieniędzy z kawiarni, na całą trasę, z łóżkiem. Jest wielkości szafy. Mam dolną kuszetkę, a na górnej nikogo nie ma, więc położyłam tam płaszcz i wygląda jak człowiek.

Przyjeżdżamy kwadrans po szóstej. Nie przychodźcie na dworzec po ciemku, znam drogę. Będę w domu na śniadanie. Powiedz Jonasowi, że mojego pokoju nie dostanie.

Oddam ci ten list sama, to nie będzie potrzebny znaczek.

Lina` },
      train_saether: { kind: 'report', title: 'Raport służbowy, złożony w przedziale konduktora', from: 'E. Saether, konduktor', date: '19/20.12.90', body:
`Nordlys Express, Halvard–Nordvik. Konduktor: E. Saether.

21.10 Odj. z Halvard. 61 podróżnych.
23.40 Brenna. Wysiadło 4, wsiadło 0.
00.40 Kontrola biletów, wagon 2: miejsce 24, podróżna, ok. 17–18 lat, nie okazała biletu. Twierdzi, że kupiła. Płaszcz i torba przeszukane w jej obecności. Brak biletu.
00.50 Kvitfjell. Podróżna bez biletu wysadzona zgodnie z przepisami.
06.15 Przyj. do Nordvik. Nic więcej do zgłoszenia.

(Linijki 00.40 i 00.50 zostały zamazane innym atramentem, bardzo starannie, tak że prawie nie da się ich odczytać.)` },
      train_inquiry: { kind: 'report', title: 'Zeznanie w biurku konduktora', from: 'Dochodzenie Kolei Północnych: zeznanie E. Saethera', date: '4 stycznia 1991', body:
`W nocy z 19 na 20 grudnia byłem konduktorem w Nordlys Express.

Nie przypominam sobie żadnej dziewczyny podróżującej samotnie. Jak zwykle sprawdziłem każdy bilet w pociągu. Nikogo nie trzeba było wysadzać.

Pociąg nie zatrzymał się w Kvitfjell. Żaden podróżny o to nie prosił, a przystanek był zamknięty z powodu śniegu.

Pracuję na kolei od dwudziestu sześciu lat.

E. Saether` },
      train_docket: { kind: 'note', title: 'Kwit rzeczy znalezionych przywiązany do worka pocztowego', from: 'Składnica 9, Dworzec Centralny w Halvard — Rzeczy znalezione', date: 'Styczeń 1991', body:
`Nr 97 / 1991
Jeden bilet kolejowy, w jedną stronę, Halvard–Nordvik, sypialny, wagon 2 miejsce 24, 19.12.90. Nieskasowany.
Znaleziony: Nordlys Express, wagon 2, pod dolną kuszetką, przez sprzątających w Nordvik, 20.12.90.
Przyjęty do Składnicy 9: 7.1.91.
Urzędniczka: A. Lind
Status: NIEODEBRANY` },
      train_cabLog: { kind: 'report', title: 'Dziennik maszynisty w kabinie', from: 'Maszynista K. Aune', date: '19/20.12.90', body:
`00.47  Dzwonek od konduktora: zatrzymać w Kvitfjell.
00.50  Zatrzymano w Kvitfjell. Przystanek nieoświetlony, peron pod śniegiem. Mocny śnieg.
00.51  Wysiadł jeden podróżny, koniec wagonu 2. Odjazd dał konduktor.
00.52  Odjazd.

(Kartkę wyrwano z dziennika, a potem włożono z powrotem, luzem.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'Rysunek na poduszce w wagonie 3', from: 'Wren, 7 lat', body:
`Kredki świecowe na papierze w kratkę. Długi niebieski pociąg w ciemności, wszystkie okna świecą na żółto, odjeżdża w prawo. Za nim, w śniegu, dziewczyna w czerwonej czapce stoi przy latarni, z opuszczonymi rękami. Nad nią mały czerwony ptaszek.

Pod spodem:
ONA MIAŁA` },
    },
    items: {
      ticket: { name: 'Bilet kolejowy', desc: 'W jedną stronę, Halvard–Nordvik, 19.12.90, już raz skasowany. Czyjś. Zostawiony na stoliku pod spodeczkiem.' },
      linaTicket: { name: 'Bilet Liny', desc: 'W jedną stronę, Halvard–Nordvik, sypialny, wagon 2 miejsce 24, 19.12.90. Nieskasowany. Kupiła go sama.' },
    },
    obj: {
      train_start: 'Wsiądź do pociągu',
      train_ticket: 'Znajdź bilet, zanim konduktor znajdzie ciebie',
      train_who: 'Dowiedz się, kogo wysadzono w Kvitfjell',
      train_lina: 'Znajdź bilet Liny przy miejscu 24',
      train_punch: 'Skasuj jej bilet',
      train_brake: 'Zatrzymaj pociąg w Kvitfjell: hamulec bezpieczeństwa jest w kabinie maszynisty',
    },
    mono: {
      train_start: 'Pociąg. Wszystkie okna oświetlone, a na peronie żywej duszy.',
      train_board: 'W środku. Drzwi zamknęły się za mną.',
      train_moving: 'Jedziemy.',
      train_conductor: 'Ktoś z latarką idzie korytarzem.',
      train_sleeper: 'Ktoś tam śpi, twarzą do drzwi. Cicho, Ado.',
      train_gangway: 'Pod płytami coś jest. Nie stój tutaj.',
      train_ticket: 'Bilet. Nie mój. Musi wystarczyć.',
      train_check: 'Chce mój bilet.',
      train_punched: 'Klik. Idzie dalej. Nawet nie spojrzał mi w twarz.',
      train_letter: 'Lina. Piętnaście lat. W domu na śniadanie.',
      train_report: 'Miejsce 24. „Twierdzi, że kupiła”. Kvitfjell, za dziesięć pierwsza w nocy, w śniegu.',
      train_found: 'Pod kuszetką. Tam, gdzie mówiła.',
      train_turn: 'Latarka się zatrzymała. Odwrócił się.',
      train_docket: 'A. Lind. To moje pismo. Mój drugi tydzień. Odłożyłam to do akt i nigdy nie spytałam, czyje to.',
      train_punchIt: 'Jego kasownik. Jej bilet.',
      train_claimed: 'Skasowany. Ważny. Miała prawo być w tym pociągu.',
      train_sat: 'Usiadł. Zdjął czapkę.',
      train_kvitfjell: '„Kvitfjell”. Nie zwalniamy.',
      train_passed: 'Tam mija. Jedna latarnia w śniegu. Nie zatrzymaliśmy się.',
      train_again: 'Następny przystanek: Kvitfjell. Znowu. Kręci się w kółko.',
      train_brake: 'Trzymaj się czegoś.',
      train_brakeWait: 'Hamulec bezpieczeństwa. Jeszcze nie. Nie, zanim ona dostanie swój bilet.',
      train_punchWait: 'Kasownik konduktora. To nie mój bilet go potrzebuje.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Jedna latarnia i śnieg. Tu ją wysadził. Musiała stać dokładnie tutaj i patrzeć, jak odjeżdżają okna.',
    },
    lines: {
      train_boardPrompt: 'Wsiądź do pociągu',
      train_punchPrompt: 'Skasuj bilet Liny',
      train_punchLook: 'Kasownik konduktora',
      train_brakePrompt: 'Pociągnij hamulec bezpieczeństwa (przytrzymaj)',
      train_brakeLook: 'Hamulec bezpieczeństwa',
      pa_kvitfjell: '„Kvitfjell. Kvitfjell. Przystanek na żądanie”.',
    },
    radio: {
      train_otto1: [
        ['radio', '[koła, pod szumem]'],
        ['otto', 'Dziewiątka do Ady. Ten dźwięk. Jest pani w pociągu. Chciałbym usłyszeć, że ma pani bilet.'],
        ['ada', 'Nie mam.'],
        ['otto', 'To proszę go znaleźć, zanim konduktor znajdzie panią. Na mojej półce konduktorzy są najgorsi. Są bardzo uprzejmi i się nie zatrzymują.'],
      ],
      train_otto2: [
        ['otto', 'Ado. Pocztą pneumatyczną przyszedł właśnie sam z siebie kwit. Bilet kolejowy, nieodebrany. Pani pismem. A więc zapełniała pani moje półki na długo przed tym, jak pani do nich zeszła.'],
      ],
      train_otto3: [
        ['otto', 'U pani zrobiło się cicho. To albo bardzo dobrze, albo bardzo źle. Jeśli pociąg wciąż jedzie, proszę go zatrzymać. Takie pociągi nie dojeżdżają. Tylko krążą.'],
      ],
    },
    recap: {
      train: 'Nordlys Express, 19 grudnia 1990 roku. Konduktor Edvin Saether wysadził piętnastoletnią Linę Berg z nocnego pociągu na przystanku Kvitfjell, w śnieg, bo nie mogła znaleźć biletu. Kupiła go sama; leżał pod jej kuszetką. Komisji powiedział, że nikogo nie wysadzał. Sprzątający znaleźli bilet w Nordvik i wysłali go do Składnicy 9, a ja odłożyłam go do akt i nigdy nie spytałam, czyj jest. Skasowałam go i zatrzymałam pociąg tam, gdzie wysiadła.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
