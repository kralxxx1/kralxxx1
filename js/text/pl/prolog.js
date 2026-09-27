/* Polski — Prolog: salon gier Starlight, 30 listopada 1994. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      prolog: {
        name: 'PROLOG', title: 'Salon gier Starlight', place: 'Harlow, Pensylwania — 30 listopada 1994, 2:11',
        intro: 'Siedem lat temu czworo dzieciaków weszło do tego salonu po zamknięciu i nigdy z niego nie wyszło. Twoje miejsce było razem z nimi. Wersja, którą usłyszała mama, policja i twoje własne sumienie: o 21:40 powrót do domu.\n\nBank zabiera automaty o szóstej. Jest dopiero druga: cztery godziny zapasu, zero towarzystwa i nikt nie wie, po co ten pośpiech.',
      },
    },
    docs: {
      p_workorder: { kind: 'printout', title: 'Zlecenie Tri-County Movers', from: 'Tri-County Movers', date: 'Zlecenie nr 4471', body:
`ODBIÓR: Salon gier Starlight, 114 Front St., Harlow
DATA: śr., 30 listopada 1994, 6:00
ZAWARTOŚĆ: 23 automaty na monety, 1 lada z nagrodami, różne wyposażenie
DOSTĘP: klucze pod wycieraczką (First Harlow Savings)
EKIPA: 3
UWAGA: kupiec chce automat nr 7 zapakowany osobno. NIE PODŁĄCZAĆ.

Długopisem na dole, twoim pismem:
Jadę wcześniej. Muszę zobaczyć nr 7, zanim go zabiorą. —S.` },
      p_notice: { kind: 'notice', title: 'Ogłoszenie przyklejone do szyby', from: 'First Harlow Savings & Loan', date: '21 października 1994', body:
`ZAWIADOMIENIE O ZAJĘCIU

Ten lokal wraz z całą zawartością został zajęty za zaległości w płatnościach na polecenie First Harlow Savings & Loan.

Zawartość zostanie sprzedana na LICYTACJI PUBLICZNEJ w sobotę 3 grudnia 1994 roku o godzinie 10:00.

Właściciel figurujący w rejestrze nie odpowiada na korespondencję od marca 1992 roku.

Pod spodem ktoś napisał czarnym markerem:
ON WCIĄŻ TAM JEST` },
      p_sticky: { kind: 'note', title: 'Żółta karteczka na automacie nr 7', from: 'W.', body:
`NIE WYCIĄGAJ WTYCZKI.

Z żadnego powodu. Nawet jeśli ich usłyszysz.
Zwłaszcza jeśli ich usłyszysz.

(Jeśli jest pan z banku: i tak nie jest podłączony. Proszę spojrzeć.)` },
      p_repair: { kind: 'card', title: 'Zawieszka serwisowa na drzwiczkach monet nr 7', from: 'Eddie', date: 'Listopad 1986', body:
`KARTA SERWISOWA — URZĄDZENIE NR 7
Płyta: KERNEL rew. C (na zamówienie, NIE WYMIENIAĆ)
Zasilacz: przerobiony, patrz mój notes

NIE włączać bez uziemienia.
NIE pozwalać Waltowi „spróbować jeszcze jednej rzeczy” po północy.

—Eddie` },
      p_ledger: { kind: 'diary', title: 'Zeszyt rachunków za prąd Walta', from: 'Walt', date: '1987–1992', body:
`Kwi. 1987 — Prąd: 212 $. Dwa razy więcej niż zwykle. Nr 7 bierze więcej niż cała reszta sali razem.

Paź. 1989 — Prąd: 1940 $. Powiedziałem właścicielowi, że zepsuła się zamrażarka.

Sty. 1991 — Odłączyłem nr 7 na cały tydzień, żeby sprawdzić. Licznik kręcił się dalej. Nigdy nie był podłączony do ściany. Jest podłączony do czegoś innego.

2 mar. 1992 — Zapłacone wszystko do czerwca. Resztę zostawiłem w kopercie dla Nory.
Noro, przepraszam.` },
      p_hiscore: { kind: 'note', title: 'Oprawiona lista wyników w korytarzu', from: 'Pismo Walta', date: 'Przepisane z nr 7, 17 kwietnia 1987', body:
`HUNGRY HOUSE — AUTOMAT NR 7 — NAJLEPSI WSZECH CZASÓW
1  DAN  921 450
2  ROS  887 300
3  NEL  640 120
4  TOB  512 890
5  SAM  498 770   (wpisane o 1:52?)

      LIL    3 190   (pokój 207)

Pod szybą, drobniejszym pismem:
Według zegara automatu wynik z inicjałami SAM wzrósł o 1:52 w nocy. A przecież o 21:40 Sam idzie do domu. Wszyscy tak mówią. Zegar musi się spieszyć.
Te imiona nigdy nie zostaną wymazane. Obiecuję. —Walt` },
      p_photo: { kind: 'photo', photo: 'five', title: 'Zdjęcie przypięte nad biurkiem w biurze', from: 'Ołówkiem na odwrocie', date: '11 kwietnia 1987', body:
`Stali bywalcy Starlightu, przed nr 7.
Z tyłu: Danny (jak zawsze z uniesionym palcem), Rosie, Nell.
Z przodu: Toby (jak zawsze z zamkniętymi oczami) i Sam.

Wszyscy się śmieją. Sam – nie.

Pod spodem, nowszym ołówkiem:
Pięć dni przed. Powinienem był wymienić zamki. —W.` },
      p_birthday: { kind: 'card', title: 'Kartka urodzinowa w magazynku', from: 'D, R, N, T i S', date: '12 marca 1987', body:
`WSZYSTKIEGO NAJLEPSZEGO NA 56., WALT!!!

Od twoich klientów numer jeden.
Danny mówi, że wisisz mu 40 żetonów.
Rosie mówi, że to Danny wisi TOBIE 40 żetonów.
Nell narysowała tort. (Tort z Hungry House. Cztery lampiony zamiast świeczek.)
Toby pyta, czy telewizja była kolorowa, kiedy byłeś mały.
Sam dziękuje za naprawę roweru.

Do jutra. I do pojutrza. I do popojutrza.` },
      p_nora: { kind: 'letter', title: 'Nieotwarty list', from: 'Nora, siostra Walta', date: 'Stempel pocztowy z 3 marca 1992', body:
`Walt,

dzwoniłam sto razy. Tylko dzwoni. Bank mówi, że prąd wciąż jest włączony, więc wiem, że tam jesteś.

Pięć lat, Walt. Rodziny już cię nie obwiniają. Policja też nie. Tylko ty sam.

Na grób mamy trzeba kwiatów. W tym roku znowu nie pójdę tam sama.

Sprzedaj tę maszynę. Rozwal ją. Rób z nią, co chcesz. Tylko przestań się w nią gapić.

Lily nie chciałaby, żebyś siedział po ciemku.

—Nora

(List przyszedł dzień po jego zniknięciu. Nikt go nie otworzył.)` },
      p_frank: { kind: 'card', title: 'Wizytówka detektywa', from: 'Det. Frank Dobbs, policja Harlow', date: '2 maja 1987', body:
`Na odwrocie, długopisem:

Walt —
Powiedziałeś mi, że dzieciaki wyszły o północy.
Pani Pruitt z naprzeciwka widziała o trzeciej światło na twoim zapleczu.
Widziała też JEDNO dziecko biegnące w deszczu Front Street o 3:25. Stąd, w przeciwną stronę.
Zadzwoń do mnie, zanim wrócę z nakazem.
—F.D.` },
      p_mirror: { kind: 'wall', title: 'Szminka na lustrze w toalecie', body:
`TO NIE JEST GRA
TO JEST MIEJSCE

—R. 4/16` },
      p_lily1: { kind: 'drawing', drawing: 1, title: 'Rysunek Lily na lodówce w biurze', from: 'Lily, 9 lat', body:
`Kredka na papierze. Okrągłe pomarańczowe stworzenie z dwoma małymi różkami i wielkim, zębatym uśmiechem, przed rzędem kolorowych skrzynek z ekranami.

MÓJ TATA PRACUJE W STARLAJCIE.
W SOBOTY JEST CHOMPIM.
JEST NAJLEPSZYM CHOMPIM NA ŚWIECIE.
—LILY` },
      p_tape: { kind: 'tape', title: 'Taśma: „Jeśli tego słuchasz”', from: 'Walt', date: '3 marca 1992, 23:48', body:
`[Kliknięcie. Deszcz o szybę. Skrzypi krzesło.]

WALT: Jeśli tego słuchasz, jestem w środku. Nie dzwoń do Franka. Nie dzwoń do Nory. Po prostu słuchaj.

WALT: Oni tam są. Danny, Rosie, Nell i Toby. Zostaw nr 7 wystarczająco długo na ekranie demonstracyjnym, a przedstawi Zjawy. Przez sześć lat nazywał je RED, VIOLET, TEAL i AMBER. Od rana siedemnastego kwietnia pisze DAN. ROS. NEL. TOB. I nie ruszają się już jak sprite’y. Ruszają się jak dzieci. Patrzę na nie od pięciu lat.

WALT: Złoty żeton w moim biurku, ten z wybitym numerem 0256. Automat bierze go jako CONTINUE. Tak weszli oni. Tak wejdę ja.

WALT: Nie wyciągaj wtyczki. Jeśli zgaśnie stąd, z zewnątrz, zgasną razem z nim. Nie wiem tego na pewno. Nie zamierzam sprawdzać.

[Długa pauza.]

WALT: Sprowadzę ich do domu. A jeśli mi się nie uda… przynajmniej nie będą tam sami.

WALT: Lily, jeśli ty… [Urywa.] Nie. Nieważne. Taśma się kończy.

[Kliknięcie.]` },
    },
    obj: {
      p_flash: 'Znajdź latarkę (za ladą z nagrodami)',
      p_power: 'Włącz główny bezpiecznik w magazynku',
      p_key: 'Znajdź klucz do biura Walta',
      p_office: 'Dostań się do biura Walta',
      p_token: 'Przeszukaj biuro Walta',
      p_insert: 'Wrzuć złoty żeton do automatu nr 7',
    },
    mono: {
      prolog_start: 'Nie ma prądu. Moja latarka jest w ciężarówce… Walt trzymał jedną za ladą z nagrodami.',
      prolog_flash: 'Pół baterii. Szkoda marnować.',
      prolog_power: 'Światła… i automaty. Wszystkie naraz.',
      prolog_register: 'Kasa wciąż się otwiera. Klucz z papierową zawieszką: BIURO.',
      prolog_token: 'Złoty żeton z wybitym numerem 0256. Ciężki. Dużo cięższy niż prawdziwy żeton.',
      prolog_cabinet: 'PLAYER 1: SAM — CONTINUE? …Kabel leży na podłodze. Nie jest podłączony.',
      prolog_seven: 'Numer siedem. Toby mówił, że pachnie przypalonym tostem. Wciąż pachnie.',
      prolog_hiscore: '1:52 w nocy. To niemożliwe. Przed dziesiątą – dom. Tak zawsze mówię.',
      prolog_outside: '…Czy ktoś stał tam na zewnątrz, za szybą?',
      prolog_insert: 'Ekran pęka na pół. Prawa połowa wypełnia się literami… i rośnie.',
      prolog_office: 'Biuro Walta. Kawa i cyna do lutowania. Pachnie jak w 1987.',
    },
    lines: {
      prolog_registerDead: 'Kasa nie ma prądu. Szuflada jest zamknięta.',
      prolog_flashHint: 'Naciśnij F, żeby włączyć lub wyłączyć latarkę.',
      prolog_breaker: 'Włącz główny bezpiecznik',
      prolog_register: 'Otwórz kasę',
      prolog_registerIdle: 'Kasa fiskalna',
      prolog_insertTok: 'Wrzuć złoty żeton',
      prolog_inspect: 'Obejrzyj automat nr 7',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
