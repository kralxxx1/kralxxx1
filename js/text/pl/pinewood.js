/* Polski — Rozdział 3: Podwójny seans (kino samochodowe Pinewood). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      pinewood: {
        name: 'ROZDZIAŁ 3', title: 'Podwójny seans', place: 'Kino samochodowe Pinewood, na północ od Nordvik',
        intro: 'Piątek, 22 sierpnia 1975 roku, chwilę po jedenastej w nocy. Ostatnia noc sezonu.\n\nNa ekranie między drzewami leci drugi film. Nie ma dźwięku i się nie kończy. Ośmioletni chłopiec poszedł do toalety podczas zmiany szpuli i nie wrócił.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'Ulotka na ladzie bufetu', from: 'Kino samochodowe Pinewood', body:
`OSTATNIA NOC SEZONU — PIĄTEK, 22 SIERPNIA

20:45   DŁUGIE LATO
22:40   JEZIORO NOCĄ

LOSOWANIE SZCZĘŚLIWEGO BILETU!
Zachowaj odcinek biletu. W przerwie przynieś go do okienka kabiny projekcyjnej i wrzuć do puszki. Pan Hardy wylosuje zwycięzcę na końcu drugiego filmu.
Nagroda: KARNET na sezon 1976. Każdy film, całe auto.

Prosimy odwieszać głośniki na słupki. Jedźcie powoli. Uważajcie na dzieci.` },
      pine_missing: { kind: 'notice', title: 'Plakat na ścianie toalety', from: 'Policja w Nordvik', date: 'Sierpień 1975', body:
`ZAGINĄŁ
MIKKEL STRAND, lat 8

Ostatni raz widziany w kinie samochodowym Pinewood w piątek 22 sierpnia, około 23:00, w drodze do toalety.
Jasne włosy. Niebieska kurtka, czerwone kalosze. Miał przy sobie latarkę taty.

Jeśli go widziałeś albo widziałeś tej nocy cokolwiek, zadzwoń na posterunek policji w Nordvik.
Prosi cię o to jego mama i tata. Cokolwiek.` },
      pine_statement: { kind: 'report', title: 'Zeznanie, odpis', from: 'L. Hardy, kinooperator', date: '23 sierpnia 1975, 9:10', body:
`Byłem w kabinie od siódmej wieczorem do drugiej w nocy, jak w każdy wieczór z seansem. Puściłem oba filmy bez przerwy, nie licząc zmian szpul.

Nie widziałem chłopca. Dzieci nie przychodzą do kabiny. Okienka wychodzą na ekran, a z kabiny nie widać toalet.

Nie wychodziłem z kabiny. Nie piłem.

Odczytano i podpisano,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'List pod poduszką na pryczy', from: 'L. Hardy', date: 'Marzec 1981, nigdy niewysłany', body:
`Pani Strand,

pisałem to dziewięć razy. Tym razem wyślę.

Pani syn przyszedł do okienka kabiny za dziesięć jedenasta z odcinkiem na losowanie. Miałem otwartą butelkę i zbliżała się zmiana szpuli, więc kazałem mu przyjść później. Powiedział: „Obiecujesz, że go wrzucisz?”. Powiedziałem: no już, zmykaj.

Pięć po jedenastej wyszedłem za bufet zaczerpnąć powietrza i zobaczyłem małą latarkę wchodzącą między drzewa za toaletami. Przed nią, głębiej, było drugie światło. Czerwone, jak światło stopu. Pomyślałem, że to starsze dzieciaki się wygłupiają. Pomyślałem, że to nie moja sprawa. Pomyślałem, że jeśli tam zejdę i ktoś poczuje ode mnie alkohol, stracę licencję, a kabina to wszystko, co mam.

Powiedziałem policji, że nic nie widziałem. Powiedziałem, że dzieci nie przychodzą do kabiny.

Nigdy nie wylosowałem zwycięzcy. Puszka wciąż stoi na stole.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'Zeszyt rzeczy znalezionych w budce z biletami', from: 'Pinewood, sezon 1975', body:
`16/8   sweter damski, zielony, rząd 2
16/8   termos (bez nakrętki)
22/8   jedna skarpetka, dziecięca, rząd 4
22/8   23:40   KLUCZYKI DO AUTA na czerwonej przywieszce, „STRAND”. Ojciec zgubił przy toaletach, kiedy szukali. Oddała Jonna L. Powiedziałam mu, że tu są. Nie wrócił po nie.` },
      pine_wiper: { kind: 'note', title: 'Kartka za wycieraczką kombi', from: 'Tata', body:
`(Długopisem, na odwrocie mapy drogowej, wsunięta za wycieraczkę tak, żeby była zwrócona w stronę drzew.)

MIKKEL —
STÓJ TAM, GDZIE WIDZISZ ŚWIATŁA AUTA.
IDŹ DO NICH.
SZUKAMY CIĘ.
NIKT SIĘ NIE GNIEWA.
— TATA` },
      pine_staff: { kind: 'note', title: 'Przypięte w magazynku', from: 'Bo', body:
`OBSŁUGA —
Agregat zasila bufet i oświetlenie placu.
Dla klientów, którym zabrakło paliwa: zbiornik dzienny ma z boku kranik spustowy. Pół czerwonego kanistra, nie więcej, i wpisać do zeszytu. Kranik odkręcać POWOLI. Pluje i strzela, a cały plac się na was gapi.

Akumulator Lyle’a jest do lampy w JEGO kabinie. Nie do odpalania aut. Nigdy więcej.
— Bo` },
      pine_search: { kind: 'report', title: 'Ogłoszenie o poszukiwaniach przybite do ambony myśliwskiej', from: 'Policja w Nordvik', date: 'Sobota, 23 sierpnia 1975', body:
`POSZUKIWANIA — SEKTOR C (las na północnym zachodzie)
Tyraliery po dziesięć osób, na długość ręki.

Psy zgubiły trop przy starej ambonie.
Znaleziono dziecięcy kalosz, lewy, czerwony, około 40 m na północ od ambony.
Nic więcej nie znaleziono.

Poszukiwania przerwano o zmroku. Wznowienie o 06:00.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'Rysunek w liściach', from: 'Wren, 7 lat', body:
`Kredki świecowe. Ogromny biały ekran stojący między czarnymi drzewami. Przed nim mały chłopiec w niebieskim płaszczu i czerwonych kaloszach, z latarką w ręce, ogląda się przez ramię. Na górnej krawędzi ekranu mały czerwony ptaszek.

Pod spodem:
OBEJRZAŁ SIĘ` },
    },
    items: {
      stub: { name: 'Odcinek biletu', desc: 'DZIECIĘCY — KINO SAMOCHODOWE PINEWOOD — 22 SIE 75 — Nr 1147. Nigdy nie trafił do puszki.' },
      carBattery: { name: 'Akumulator samochodowy', desc: 'Dwanaście woltów i bardzo ciężki. Zasilał lampę w kabinie.' },
      carKeys: { name: 'Kluczyki do auta', desc: 'Dwa kluczyki na czerwonej plastikowej przywieszce. STRAND.' },
      jerrycan: { name: 'Czerwony kanister', desc: 'Pusty. Pachnie benzyną.' },
      fuel: { name: 'Kanister z benzyną', desc: 'Do połowy pełny. Chlupie przy chodzeniu.' },
    },
    obj: {
      pine_start: 'Znajdź sposób, żeby wydostać się z Pinewood',
      pine_parts: 'Uruchom kombi: akumulator, benzyna, kluczyki ({n}/3)',
      pine_startCar: 'Odpal kombi',
      pine_stubFind: 'Znajdź odcinek biletu chłopca',
      pine_claim: 'Wrzuć odcinek do puszki w kabinie projekcyjnej',
      pine_leave: 'Wyjedź przez bramę',
    },
    mono: {
      pine_start: 'Ekran kinowy między drzewami. Film leci, a nie ma żadnego dźwięku.',
      pine_gate: 'Brama na łańcuchu. Kłódka po tej stronie, co nie ma sensu.',
      pine_wagon: 'To auto ktoś wyprowadził z rzędu i obrócił w stronę drzew. Reflektory są włączone. Akumulator padł.',
      pine_wagonNeeds: 'Akumulator padł, bak pusty, brak kluczyków. Ktoś trzymał to auto całą noc na światłach.',
      pine_battery: 'Akumulator samochodowy. Zasilał lampę w kabinie.',
      pine_batteryDark: 'A teraz w kabinie jest ciemno.',
      pine_keys: 'STRAND. Zgubił je, kiedy szukał syna.',
      pine_can: 'Czerwony kanister. Pusty.',
      pine_fill: 'Pluje. Strzela. Wszystko tam na zewnątrz to słyszy.',
      pine_filled: 'Pół kanistra. Wystarczy.',
      pine_tankNoCan: 'Zbiornik dzienny agregatu. Jest kranik spustowy. Potrzebuję czegoś do napełnienia.',
      pine_fitBattery: 'Akumulator założony. Reflektory zapaliły się same. Nikt ich nie wyłączył.',
      pine_inBeam: 'Jedno z drzew w świetle stoi nie tak, jak trzeba.',
      pine_fuel: 'Benzyna wlana.',
      pine_startFail: 'Kręci. Kręci. Gaśnie. Wszystko to słyszało.',
      pine_notYet: 'Kręci i nie łapie. Jakby to miejsce jeszcze ze mną nie skończyło.',
      pine_stubHint: 'Przyszedł do kabiny z odcinkiem na losowanie. Potem poszedł do toalety.',
      pine_stub: 'Odcinek dziecięcego biletu. Numer tysiąc sto czterdzieści siedem. Nie zdążył go wrzucić.',
      pine_claimed: 'No. Byłeś tu. Zostałeś policzony.',
      pine_draw: 'Wygrałby.',
      pine_start2: 'Załapał. Och, załapał.',
      pine_end: 'W lusterku ekran robi się biały, potem ciemny. Ktoś wyłączył projektor.',
      pine_booth: 'Kabina. Gorący kurz i whisky.',
      pine_toilets: 'Tylne drzwi otwarte na las.',
      pine_clearing: 'Ambona myśliwska. Liście wokół niej udeptane w krąg.',
      pine_pines: 'Niektóre z tych drzew przesunęły się, odkąd ostatnio patrzyłam.',
      pine_stag: 'Coś wielkiego właśnie przeszło przez plac. Poroże szersze niż auto.',
      pine_usher: 'Czerwone światło między autami. Ktoś odprowadza ludzi na miejsca.',
      pine_swing: 'Huśtawka się kołysze. Nie ma wiatru.',
      pine_gateOpen: 'W oddali łańcuch spada na żwir.',
      pine_canLook: 'Puszka losowania. Garść odcinków na dnie, pod ostatnią szpulą.',
    },
    lines: {
      pine_stubPrompt: 'Odcinek biletu na podłodze',
      pine_canPut: 'Wrzuć odcinek do puszki',
      pine_canLook: 'Otwarta puszka na film na stole do przewijania',
      pine_tankPrompt: 'Napełnij kanister z kranika (przytrzymaj)',
      pine_tankLook: 'Zbiornik dzienny agregatu',
      pine_wagonLook: 'Kombi Strandów',
      pine_wagonBattery: 'Załóż akumulator',
      pine_wagonFuel: 'Wlej benzynę',
      pine_wagonStart: 'Odpal silnik (przytrzymaj)',
      pine_wagonGo: 'Wsiądź i jedź',
    },
    radio: {
      pine_otto1: [
        ['radio', '[szum, a pod nim terkot projektora]'],
        ['otto', 'Dziewiątka do Ady. Drzewa? Ekran? Pinewood. Kino samochodowe na północ od Nordvik, 1975. Mam tu z niego pudło: jedenaście kluczyków do aut, czerwony chłopięcy kalosz i ostatnią szpulę filmu, którego nikt nie obejrzał do końca.'],
        ['ada', 'Film dalej leci. Bez dźwięku.'],
        ['otto', 'Tu na dole nigdy go nie ma. Dwie rzeczy. Drzewa tam ruszają się tylko wtedy, gdy pani się rusza. A jeśli zobaczy pani czerwone światło między autami, nie jest tam po to, żeby pomóc pani znaleźć miejsce.'],
      ],
      pine_ottoStag: [
        ['otto', 'To był Jeleń. Nasłuchuje. Kiedy pochyli głowę, proszę postawić między wami coś solidnego. Drzewo. Auto. Przed niczym innym się nie zatrzyma.'],
      ],
      pine_draw: [
        ['lyle', '[ze wszystkich głośników na placu naraz: trzask, oddech, mężczyzna za blisko mikrofonu]'],
        ['lyle', 'Panie i panowie. Szczęśliwy bilet. Karnet na tysiąc dziewięćset siedemdziesiąty szósty.'],
        ['lyle', 'Numer tysiąc sto... czterdzieści siedem.'],
        ['lyle', 'Tysiąc sto czterdzieści siedem. Czy jest tu tysiąc sto czterdzieści siedem?'],
        ['lyle', 'Chodź do kabiny, synu. Obiecałem.'],
      ],
      pine_otto2: [
        ['otto', 'Pudło z Pinewood. Kalosza już w nim nie ma. Na jego miejscu leży odcinek biletu. Ktoś napisał na nim ołówkiem: „Zwycięzca”.'],
      ],
    },
    recap: {
      pinewood: 'Kino samochodowe Pinewood, ostatnia noc 1975 roku. Kinooperator Lyle Hardy powiedział policji, że dzieci nigdy nie przychodzą do jego kabiny i że nic nie widział. Ośmioletni Mikkel Strand przyszedł do kabiny z odcinkiem na losowanie, został odprawiony i poszedł za czerwonym światłem między drzewa, a Lyle na to patrzył. Wrzuciłam odcinek chłopca do puszki i wszystkie głośniki na placu odczytały jego numer. Potem wyjechałam przez bramę samochodem jego ojca.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
