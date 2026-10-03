/* Polski — Rozdział 2: Dzwon mgłowy (MS Saint Brigid). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      ferry: {
        name: 'ROZDZIAŁ 2', title: 'Dzwon mgłowy', place: 'MS Saint Brigid, cieśnina Halvard',
        intro: '9 listopada 1987 roku, za kwadrans jedenasta w nocy. Mgła tak gęsta, że z mostka nie widać dziobu.\n\nSaint Brigid tonie rufą, powoli, na morzu gładkim jak stół. Radar nie działa od tygodnia. Gdzieś na dziobie bije dzwon.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Stanowiska przy szalupach', from: 'MS Saint Brigid', body:
`W RAZIE ZAGROŻENIA

1. Udaj się na swoje stanowisko przy szalupie (patrz karta w kabinie).
2. Załóż kamizelkę ratunkową. Nie nadmuchuj jej we wnętrzu statku.
3. Szalupy opuszcza załoga.
   Klucz żurawika: na mostku.
   Korba: jeśli silnik zawiedzie.

(Pod spodem markerem: „Wciągarka nr 2 się zacina. Korba leży w szafce na narzędzia w maszynowni, NIE na pokładzie. — 2. mechanik”)` },
      ferry_testimony: { kind: 'report', title: 'Zeznanie przed komisją (odpis)', from: 'Kpt. H. Aal', date: '30 listopada 1987', body:
`Byłem na mostku od 21:30 do rozkazu opuszczenia statku.

Widoczność wynosiła mniej niż jeden kabel. Radar był niesprawny od 2 listopada, a sygnały mgłowe dawano ręcznie: dzwonem okrętowym, w który bił marynarz P. Rask.

Około 22:35 dzwon umilkł. Wysłałem drugiego oficera na dziób. Chłopak opuścił posterunek. Bez sygnału nie mogliśmy ani być usłyszani, ani słyszeć.

Z przykrością muszę stwierdzić, że utrata Saint Brigid zaczęła się od tego, że szesnastolatek wpadł w panikę.

H. Aal, kapitan` },
      ferry_logpage: { kind: 'report', title: 'Kartka wyrwana z dziennika okrętowego', from: 'Saint Brigid, dziennik pokładowy', date: '9 listopada 1987', body:
`21:40  Gęsta mgła. Prędkość zmniejszona do 6 w. Radar niesprawny.
22:05  Kapitan w kabinie (niedysponowany). Wachtę ma 2. oficer.
22:10  Sygnały mgłowe ręcznie. Mar. Rask przy dzwonie.
22:31  Posłano po kapitana. Nie przyszedł.
22:44  Zderzenie, lewa burta na rufie. Nabieramy wody.
22:47  Opuścić statek. Szalupy 1, 3, 4 na wodzie.
22:52  Mar. Rask wciąż dzwoni. Mówi, że szalupy płyną na dzwon. Kapitana nie ma na mostku.
22:58  Dzwon wciąż

(Pismo urywa się w tym miejscu. Kartka została równo wyrwana, a potem złożona bardzo małą, tak jak składa się coś, co chce się długo trzymać w szufladzie.)` },
      ferry_logbook: { kind: 'report', title: 'Dziennik pokładowy na stole nawigacyjnym', from: 'Saint Brigid', body:
`21:15  Nabrzeże Halvard. 41 pasażerów, 17 członków załogi. Płaty mgły.
21:30  Wyjście z portu.

(Brakuje kartki. W oprawie widać wyrwany brzeg. Na następnej stronie:)

23:40  Wszystkie szalupy policzone. Brak jednego członka załogi: marynarza P. Raska, który około 22:35 opuścił posterunek przy dzwonie.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'Dziennik pokładowy, z kartką na miejscu', from: 'Saint Brigid', body:
`21:40  Gęsta mgła. Prędkość zmniejszona do 6 w. Radar niesprawny.
22:05  Kapitan w kabinie (niedysponowany). Wachtę ma 2. oficer.
22:10  Sygnały mgłowe ręcznie. Mar. Rask przy dzwonie.
22:31  Posłano po kapitana. Nie przyszedł.
22:44  Zderzenie, lewa burta na rufie. Nabieramy wody.
22:47  Opuścić statek. Szalupy 1, 3, 4 na wodzie.
22:52  Mar. Rask wciąż dzwoni. Mówi, że szalupy płyną na dzwon. Kapitana nie ma na mostku.
22:58  Dzwon wciąż bije.
23:05  Dzwon umilkł.

(Kartka siedzi w oprawie, jakby nigdy jej nie wyjmowano. Atrament w ostatniej linijce jest mokry.)` },
      ferry_radio: { kind: 'printout', title: 'Dziennik kabiny radiowej', from: 'Radiooficer', date: '9.11.87', body:
`22:46  Nadano MAYDAY. Pozycja zliczeniowa.
22:48  Halvard Radio potwierdza. Pilotówka Ternen w drodze.
22:55  Ternen: „Nie widzimy was. Słyszymy wasz dzwon. Płyniemy na niego”.
23:02  Ternen: „Mamy dwie wasze szalupy. Wciąż słyszymy dzwon. Dzwońcie dalej”.
23:05  Ternen: „Dzwon ucichł. Gdzie jesteście?”
23:06  (brak dalszych wpisów)` },
      ferry_mother: { kind: 'letter', title: 'List na fotelu w salonie', from: 'Elin Rask', date: '4 stycznia 1988', body:
`Szanowni Panowie z komisji,

napisaliście w raporcie, że mój syn opuścił posterunek.

Pim miał szesnaście lat. Do jedenastego roku życia bał się ciemności i wciąż spał przy zapalonym świetle na korytarzu. Kiedy się bał, robił, co mu kazano, i robił to głośniej.

Jeśli ktoś kazał mu bić w ten dzwon, to bił, dopóki nie zostało statku, na którym można by w niego bić.

Proszę o wykreślenie jego imienia z waszego raportu. Proszę o wpisanie go z powrotem, tak jak należy.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'Pocztówka na koi', from: 'Margit', body:
`(Zdjęcie Saint Brigid w letni dzień, z flagami galowymi.)

Kochana ciociu Ruth,
płyniemy we mgle, nic nie widać! Chłopak na pokładzie co minutę bije w dzwon, żeby inne statki wiedziały, że tu jesteśmy. Pięknie i trochę strasznie. Powiedz mamie, że zadzwonię z Halvard.
Margit

(Nigdy nie wysłana.)` },
      ferry_purser: { kind: 'note', title: 'Lista załogi, biuro intendenta', from: 'Intendent', body:
`MS SAINT BRIGID — ZAŁOGA, ROZKŁAD ZIMOWY 1987

Kapitan .............. H. Aal
Starszy oficer ....... (na urlopie)
2. oficer ............ T. Solberg
Starszy mechanik ..... K. Moe
2. mechanik .......... R. Dahl
Radiooficer .......... B. Lund
Marynarz ............. P. Rask (16) — pierwszy sezon

(Ktoś narysował mały dzwonek obok ostatniego nazwiska.)` },
      ferry_mess: { kind: 'note', title: 'Grafik wacht w mesie załogi', from: 'T. Solberg', body:
`TYDZIEŃ 45

Radar NIESPRAWNY od 2/11 — części zamówione w Bergen.
DO NAPRAWY: dzwon mgłowy ręcznie przy widoczności < 1 Mm.
Dzwon: Rask (wszystkie wieczorne rejsy).
Rask: dzwonisz, dopóki nie powiem, żebyś przestał. Nie dopóki ci się nie znudzi. Dopóki ci nie POWIEM.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'Rysunek wsunięty w koję', from: 'Wren, 7 lat', body:
`Kredki świecowe. Statek w szarych bazgrołach mgły. Na dziobie chłopiec w żółtym z dzwonem, z otwartymi ustami, dzwoni. Na szczycie masztu mały czerwony ptaszek.

Pod spodem:
NIE PRZESTAŁ` },
    },
    items: {
      bridgeKey: { name: 'Klucz do mostka', desc: 'Mosiężny klucz na korkowym pływaku. Z kabiny kapitana.' },
      davitKey: { name: 'Klucz żurawika', desc: 'Klucz w kształcie litery T z napisem SZALUPY. Zwalnia hamulec wciągarki.' },
      crank: { name: 'Korba wciągarki', desc: 'Ciężka stalowa korba z drewnianym uchwytem. Do ręcznego opuszczania szalupy.' },
      logPage: { name: 'Wyrwana kartka z dziennika', desc: 'Złożona bardzo małą. 9 listopada 1987, od 21:40 do 22:58.' },
    },
    obj: {
      ferry_start: 'Znajdź sposób, żeby zejść ze statku',
      ferry_bridge: 'Zdobądź klucz żurawika z mostka',
      ferry_captain: 'Przeszukaj kabinę kapitana w poszukiwaniu klucza do mostka',
      ferry_logbook: 'Włóż wyrwaną kartkę z powrotem do dziennika na mostku',
      ferry_key: 'Weź klucz żurawika z mostka',
      ferry_crank: 'Znajdź korbę wciągarki w maszynowni',
      ferry_lower: 'Opuść szalupę nr 2',
    },
    mono: {
      ferry_start: 'Statek. Mgła tak gęsta, że nie widzę relingu. A pokład się przechyla.',
      ferry_winch: 'Szalupa nr 2. Wciągarka potrzebuje klucza żurawika i korby. Klucz będzie na mostku.',
      ferry_winch2: 'Dalej potrzebuję klucza i korby.',
      ferry_winchNoCrank: 'Klucz jest w środku. Korby nie ma na pokładzie. Ogłoszenie mówiło: maszynownia.',
      ferry_winchNoKey: 'Mam korbę. Hamulec dalej zablokowany: klucz żurawika.',
      ferry_brake: 'Hamulec nie puszcza. Jakby statek jeszcze ze mną nie skończył.',
      ferry_pageAfter: 'Nie było go na mostku. Siedział w kabinie z butelką, a chłopak przez godzinę bił w ten dzwon.',
      ferry_logbookGap: 'Brakuje kartki. Wyrwana przy 21:40.',
      ferry_claimed: 'No. Tu jest jej miejsce.',
      ferry_bell: 'Dzwon okrętowy. Bije tak, jakby na kogoś czekał.',
      ferry_bellAfter: 'Jest ciepły. Na tej linie była czyjaś ręka.',
      ferry_bridgeKey: 'Klucz do mostka. Pod jego poduszką. No jasne.',
      ferry_davitKey: 'SZALUPY. Klucz żurawika.',
      ferry_crank: 'Korba. Woda się właśnie poruszyła. Cała naraz.',
      ferry_lower: 'Trzymaj się. Trzymaj się czegoś.',
      ferry_end: 'Wciąż dzwoni. Równo, jak zegar. Żeby szalupy znalazły drogę.',
      ferry_bridgeLocked: 'Mostek jest zamknięty. Kapitan będzie miał klucz.',
      ferry_passengers: 'Spali. Wszyscy co do jednego spali, a teraz stoją.',
      ferry_drowned: 'Coś wyszło z wody. Najpierw ręce.',
      ferry_lounge: 'Salon. Kamizelki ratunkowe na każdym fotelu. Nikt się nie ruszył, kiedy weszłam.',
      ferry_engineRoom: 'Maszynownia zalana po kolana. Woda jest zupełnie nieruchoma.',
      ferry_fore: 'Dzwon jest gdzieś tu na górze. Słyszę, jak oddycha na wietrze.',
    },
    lines: {
      ferry_winchGo: 'Kręć wciągarką i opuść szalupę nr 2 (przytrzymaj)',
      ferry_winchLook: 'Wciągarka szalupy nr 2',
      ferry_logbookPut: 'Włóż kartkę z powrotem',
      ferry_logbookRead: 'Przeczytaj dziennik',
      ferry_bellPrompt: 'Uderz w dzwon',
      ferry_pagePrompt: 'Złożona kartka w szufladzie',
      ferry_bridgeUnlock: 'Otwórz mostek',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[szum, a pod nim, bardzo cicho, dzwon]'],
        ['otto', 'Dziewiątka do Ady. Przeszła pani. Gdzie pani jest?'],
        ['ada', 'Na statku. We mgle. Tonie.'],
        ['otto', 'Saint Brigid. Mam całą półkę po niej: kamizelki ratunkowe, szachy, czterdzieści jeden parasoli. Zatonęła w 1987 roku.'],
        ['ada', 'Jak mam zejść?'],
        ['otto', 'Na każdej półce jest jedna rzecz nie na swoim miejscu. Kłamstwo z numerem strony. Proszę ją odłożyć, a miejsce panią puści. Potem proszę skorzystać z szalup jak rozsądny człowiek.'],
      ],
      ferry_bellman: [
        ['otto', 'Poznała pani człowieka z dzwonem. Niech pani nie pozwoli mu go na sobie zawiesić. Dzwoni, żeby pani wiedziała, gdzie jest. Proszę być wdzięczną. Większość tego nie robi.'],
      ],
      ferry_otto2: [
        ['otto', 'Coś się właśnie ruszyło na moich półkach. Teczka. Rask, P. Leżała w „opuścił posterunek”. Już jej tam nie ma.'],
        ['ada', 'A gdzie jest teraz?'],
        ['otto', 'W „odnalezionych”. To nie ja ją tam włożyłem.'],
      ],
    },
    recap: {
      ferry: 'Saint Brigid, we mgle. Kapitan Aal powiedział, że chłopak przy dzwonie mgłowym wpadł w panikę i uciekł. Kartka, którą Aal wyrwał z własnego dziennika, mówiła, że siedział pijany w kabinie, podczas gdy szesnastoletni Pim Rask dzwonem sprowadzał szalupy do domu. Włożyłam kartkę z powrotem. Kiedy szalupa nr 2 dotknęła wody, dzwon znów zaczął bić.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
