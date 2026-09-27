/* Polski — Poziom 9: St. Agnes (Walt, październik 1983). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      hospital: {
        name: 'LEVEL 9', title: 'St. Agnes', place: 'Wspomnienie Walta — oddział dziecięcy, październik 1983',
        intro: 'Najgorszy miesiąc Walta, przechowany w idealnym stanie. Zielone ściany, miękkie buty, pasta do podłóg i pomarańcze.\n\nGdzieś na tym piętrze jest sala 207. Gdzieś na tym piętrze coś bardzo wysokiego liczy sekundy, kiedy odwracasz wzrok.',
      },
    },
    items: {
      page: { name: 'Kartka z dziennika Walta', desc: 'Wyrwana wzdłuż zszycia. Jego pismo z każdą stroną robi się mniejsze.' },
      page1: { name: 'Kartka z dziennika Walta' }, page2: { name: 'Kartka z dziennika Walta' }, page3: { name: 'Kartka z dziennika Walta' }, page4: { name: 'Kartka z dziennika Walta' }, page5: { name: 'Kartka z dziennika Walta' },
      room207Key: { name: 'Klucz do sali 207', desc: 'Klucz oddziałowy na kartonowej przywieszce, starannym pismem pielęgniarki: 207 — LILY. Z tyłu naklejka ze słoneczkiem.' },
    },
    docs: {
      hospital_intro: { kind: 'note', title: 'Przypięte do wózka inwalidzkiego', from: 'Eddie', body:
`To jest Walta. Widać to. Wszystko jest za czyste.

Pięć kartek z jego dziennika leży rozrzuconych po oddziale. Chyba sam je wyrwał, żeby nie musieć ich czytać.

Sala 207 jest zamknięta. W dyżurce pielęgniarek są klucze. Nie wchodź, dopóki nie przeczytasz kartek. Nie wiem czemu. Mam wrażenie, że taka jest zasada.

Liczący tu jest. Nie odwracaj się do niego plecami.

—E.` },
      hospital_diary1: { kind: 'diary', title: 'Dziennik Walta — strona 1', from: 'Walt', date: '2 października 1983', body:
`Przenieśli ją do 207. Jest tam okno. Chciała okno, żeby widzieć, kiedy pada.

Lekarz powiedział: tygodnie. Ja powiedziałem: miesiące. Nie zaprzeczył i po tym poznałem.

Zapytała, czy salon gier za nią tęskni. Powiedziałem, że automaty co rano o nią pytają. Powiedziała: „Tato, automaty nie mówią”. Powiedziałem: te mówią.` },
      hospital_diary2: { kind: 'diary', title: 'Dziennik Walta — strona 2', from: 'Walt', date: '9 października 1983', body:
`Ruth siedzi teraz w samochodzie. Nie przychodzi na górę. Nie mam do niej żalu. Niektórzy umieją kochać tylko w linii prostej, a to nie jest linia prosta.

Lily mnie dziś narysowała. Wielki pan z wąsami i malutkim salonem gier na głowie, jak kapelusz.

Wwiozłem windą mały automat. Zrobiła 3190 punktów. W drugiej grze próbowałem dać jej wygrać. Zorientowała się. Powiedziała: „Nie dawaj mi wygrać, to się nie liczy”. Więc nie dałem. I tak wygrała.` },
      hospital_diary3: { kind: 'diary', title: 'Dziennik Walta — strona 3', from: 'Walt', date: '21 października 1983', body:
`Śpi prawie cały dzień.

Kiedy nie śpi, rysuje. Na ścianie wisi już osiem rysunków. Salon gier. Chompy. Choinka na Front Street. Jaskinia z dziećmi w środku (dziecko Kellerów i chłopak Marshów znaleźli jaskinię pod Front Street i jej nie wpuszczają). Ja.

Zapytała: „Kiedy mnie już nie będzie, kto będzie grał w moją grę?”.

Nie umiałem odpowiedzieć. Pracuję z maszynami. Powinienem był mieć odpowiedź.` },
      hospital_diary4: { kind: 'diary', title: 'Dziennik Walta — strona 4', from: 'Walt', date: '27 października 1983', body:
`Oddziałowa impreza na Halloween, wcześniej, dla tych, którzy nie mogą czekać.

Wniosłem kostium Chompy’ego po schodach, bo nie mieścił się w windzie. Pielęgniarki śmiały się tak, że jedna musiała usiąść. Cały oddział wyszedł w piżamach.

Lily śmiała się, aż zaczęła kaszleć, a potem znowu się śmiała.

Kazała mi obiecać, że jej wynik zostanie w tabeli rekordów na zawsze. LIL, 3190.

Dziś wieczorem, w półśnie, powiedziała: „Zrób grę, która się nigdy nie kończy, tato. Żeby nikt nigdy nie musiał odchodzić”.

Powiedziałem, że zrobię.` },
      hospital_diary5: { kind: 'diary', title: 'Dziennik Walta — strona 5', from: 'Walt', date: '29 października 1983', body:
`5:40. Padało. Spodobałoby jej się.

…

Zbuduję maszynę, która wszystko pamięta. Grę, w której nikt nigdy nie odchodzi.

Wiem, jak to brzmi.

I tak to zapisuję, żeby kiedyś, kiedy zrobię coś strasznego, ktoś mógł to przeczytać i wiedział, że zrobiłem to z miłości. To nie wystarczy. Wiem, że to nie wystarczy.` },
      hospital_nurse: { kind: 'note', title: 'Podkładka nocnej zmiany', from: 'Pielęgniarka Donna', date: 'Październik 1983', body:
`207 — Lily, 9 l. Spokojna. Prosiła o więcej kredek (pomarańczowa). Ojciec obecny, jak zawsze. Ojciec spał w fotelu, jak zawsze.

Niech ktoś z nim porozmawia, żeby pojechał do domu się umyć. Mówi: „Obudzi się, a mnie nie będzie”. Przestałyśmy się kłócić.

Impreza halloweenowa 27. — ojciec będzie przebrany. Boże, miej nas w opiece. (Najlepszy dzień, jaki ten oddział miał przez cały rok.)` },
      hospital_ruth: { kind: 'letter', title: 'List złożony w kaplicy', from: 'Ruth', date: 'Wrzesień 1985', body:
`Walt,

ja wtedy nie potrafiłam wejść. Ty potrafiłeś. Na tym polega różnica między nami i dlatego muszę odejść.

Nie umiem żyć w domu, w którym budujesz ją na nowo z kabli. Słyszę cię nocami w garażu, jak rozmawiasz z maszynami.

Proszę, nie daj się temu pożreć.

Przepraszam. Zawsze będzie mi przykro.
— Ruth` },
      hospital_visitors: { kind: 'note', title: 'Księga odwiedzin, oddział dziecięcy', from: 'St. Agnes', date: 'Październik 1983', body:
`207 — Walt (ojciec) ......... 1.10, 2.10, 3.10, 4.10, 5.10, 6.10, 7.10, 8.10, 9.10, 10.10, 11.10, 12.10, 13.10…
207 — Ruth (matka) .......... 1.10, 3.10
207 — Nora (ciotka) ......... 8.10, 14.10, 22.10
207 — klasa 4, sala 104 ..... 14.10 (kartka dostarczona)
207 — Frank D. (przyjaciel ojca) ... 20.10, 27.10 (przyniósł pomarańcze)` },
      hospital_card: { kind: 'note', title: 'Olbrzymia kartka z życzeniami zdrowia z kolorowego brystolu', from: 'Klasa 4, sala 104', date: 'Październik 1983', body:
`WRACAJ SZYBKO DO ZDROWIA LILY!!!

Tęsknimy za tobą na plastyce. Pani K mówi, że kredkom jest smutno.

— Sam (najlepsza huśtawka czeka na ciebie)
— Toby (narysowałem ci z tyłu smoka) (to pies)
— i jeszcze 22 imiona starannymi drukowanymi literami

(Pamiętasz tę kartkę. Pamiętasz tamtą niewiedzę: że to nic nie da.)` },
      hospital_chompy: { kind: 'photo', photo: 'chompy', title: 'Polaroid przyklejony nad łóżkiem', from: 'Pielęgniarka Donna', date: '27 października 1983', body:
`Mężczyzna w ogromnym okrągłym pomarańczowym kostiumie, z filcowymi rogami i uśmiechem pełnym zębów z gąbki, klęczy przy szpitalnym łóżku. Bardzo mała dziewczynka w imprezowej czapeczce obejmuje obiema rękami głowę kostiumu.

Na białym pasku: „LIL & CHOMPY”` },
      hospital_chart: { kind: 'note', title: 'Karta przy łóżku', from: 'St. Agnes', date: '29 października 1983', body:
`PACJENTKA: Brenner, Lily, 9 l.
ROZPOZNANIE: Ostra białaczka limfoblastyczna

29.10 05:40 — Godzina zgonu.
Ojciec obecny.
Pada deszcz.

(Ktoś dopisał bardzo małymi literami, ołówkiem: „3190”)` },
      hospital_lily6: { kind: 'drawing', drawing: 6, title: 'Rysunek wciąż przyklejony obok okna sali 207', from: 'Lily, 9 lat', body:
`Kredki świecowe. Okno, deszcz w niebieskich kreskach. Na zewnątrz macha okrągły pomarańczowy stworek z rogami. W środku dziewczynka w imprezowej czapeczce macha mu z łóżka.

CHOMPY PRZYSZEDŁ NA MOJĄ IMPREZĘ.
TO BYŁ TATA.
WIEDZIAŁAM ALE NIC NIE POWIEDZIAŁAM.` },
      hospital_tape: { kind: 'tape', title: 'Taśma: „Czas na bajkę”', from: 'Magnetofon Walta', date: 'Październik 1983', body:
`[Kliknięcie. Sala szpitalna. Cicho pika monitor. Deszcz o szybę.]

WALT: …a mały Muncher powiedział: nie zjem Zjaw. To moi przyjaciele. Zjadam tylko gwiazdki.

LILY: [sennie] Gra tak nie idzie, tato.

WALT: Moja wersja tak idzie.

LILY: A Zjawy mogą na koniec wrócić do domu?

WALT: Na koniec wszyscy wracają do domu.

LILY: Obiecujesz?

WALT: [pauza, za długa] …Obiecuję, robaczku.

[Kliknięcie.]` },
    },
    obj: {
      hospital_pages: 'Znajdź kartki z dziennika Walta ({n}/5)',
      hospital_207: 'Zdobądź klucz i wejdź do sali 207',
      hospital_leave: 'Zjedź windą na dół',
    },
    mono: {
      hospital_start: 'Szpital. Zielone ściany. Znam to miejsce: raz, z kartką. Dziewięć lat na karku.',
      hospital_key: 'Sala 207. Przywieszka opisana starannym pismem pielęgniarki.',
      hospital_207: 'Osiem gwoździ w ścianie, na których kiedyś wisiały rysunki. Jeden rysunek wciąż tu jest. Za oknem pada. Tutaj zawsze pada.',
    },
    lines: {
      hospital_unlock207: 'Otwórz salę 207',
      hospital_notYet: 'Ręka zatrzymuje się na kluczu. Jeszcze nie. Najpierw przeczytaj, co napisał.',
    },
    radio: {
      hospital_start: [
        ['eddie', 'Walt raz o niej opowiadał. W ’86. Lutowaliśmy o drugiej w nocy, on powiedział jej imię, a potem przez godzinę nic nie mówił.'],
        ['eddie', 'Tylko delikatnie tutaj, Sam. Nie wiem, co jeszcze ci powiedzieć.'],
      ],
      hospital_pages: [
        ['eddie', '…Zbudował to wszystko dla niej. Kernel. Grę. Wszystko.'],
        ['sam', 'Gra, która się nigdy nie kończy. Żeby nikt nigdy nie musiał odchodzić.'],
        ['eddie', 'A potem zabrała czworo dzieci. Idź do 207. Myślę, że on tego od ciebie potrzebuje.'],
      ],
      hospital_207: [
        ['eddie', 'Sam? Coś się zmieniło. Ten szum… brzmi inaczej. Jakby ktoś sobie coś przypomniał.'],
        ['eddie', 'Gdziekolwiek jest teraz Pożeracz, chyba właśnie przestał przeżuwać.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
