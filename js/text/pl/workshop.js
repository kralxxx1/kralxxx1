/* Polski — Poziom 11: Warsztat (Walt, piwnica pod salonem gier, kwiecień 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      workshop: {
        name: 'LEVEL 11', title: 'Warsztat', place: 'Wspomnienie Walta — pod salonem gier Starlight, 17 kwietnia 1987, 3:20',
        intro: 'Piwnica Walta: wypatroszone telewizory, dym z lutowania, a za stalowymi drzwiami maszyna wielkości lodówki, która buczy. To tu narodził się Kernel.\n\nMiędzy stołami warsztatowymi chodzi coś dużego, pomarańczowego i uśmiechniętego, powoli, tak jak chodzi kostium, w którym nikogo nie ma.',
      },
    },
    items: {
      waltKey: { name: 'Klucz Walta', desc: 'Stalowy klucz z wybitym napisem KERNEL — TYLKO W. Główka wytarta w kształt jego kciuka.' },
    },
    docs: {
      workshop_intro: { kind: 'note', title: 'Na schodach do piwnicy', from: 'Eddie', body:
`Nie schodziłem tu od 1988. Wszystko jest dokładnie tak samo. To najgorsze.

Kernel jest za stalowymi drzwiami. Walt trzymał klucz przy swoim stole. Trzy pokrętła kalibracyjne są z przodu Kernela. Ustawienia są na schemacie, gdzieś na stołach.

Ustaw je dobrze, a gra chyba przepuści nas do domu.

To coś, co tu chodzi, to Chompy. Kostium. Jest powolny. Nie daj się przytulić.

—E.` },
      workshop_schematic: { kind: 'note', title: 'Schemat, niebieski ołówek na papierze milimetrowym', from: 'Walt i Eddie', date: 'Wer. C, marzec 1987', body:
`KERNEL — OBEJŚCIE LICZNIKA POZIOMÓW

Pokrętło A (wiersz) ..... 2
Pokrętło B (kolumna) .... 5
Pokrętło C (przesunięcie) 6

= 256

!! Licznik na 256 pozwala planszy rysować się za ekranem śmierci.
!! Nikt nie wie, co się tam narysuje. — E.
!! I o to chodzi. — W.` },
      workshop_eddiebench: { kind: 'note', title: 'Przyklejone do starego stołu Eddiego', from: 'Eddie', date: '17 kwietnia 1987', body:
`To była moja kolej, żeby zamknąć tylne drzwi.

Nie zamknąłem. Spieszyłem się. Seans o północy w Rialto, nie chciałem przegapić początku.

Walt poszedł na górę o 23. Tylne drzwi zostały otwarte przez całą noc.

Nigdy nikomu nie powiedziałem. Pozwoliłem, żeby Walt dźwigał to za nas obu.

Dlatego tam wszedłem, Sam. To nie odwaga. To rachunek, który przyszedł do zapłaty.` },
      workshop_keytag: { kind: 'note', title: 'Przywieszka od klucza przy stole', from: 'Walt', date: '1986', body:
`(Papierowa przywieszka na stalowym kółku. Brakuje jednego klucza.)

ZAPASOWY — FRONT
Wydany DANNY’EMU K. — soboty, 8:00, do przygotowania automatów.
„Odpowiedzialny młody człowiek”. — W.

(Pod spodem, nowszym atramentem: „Powiedziałem policji, że wyszli o północy. Nie powiem im, że dałem dziecku swój klucz. Odebraliby jego ojcu ostatnią dobrą rzecz, jaka mu została: że jego synowi ufano”.)` },
      workshop_receipt: { kind: 'note', title: 'Rachunek przypięty do stojaka z kostiumem', from: 'Harlow Party Supply', date: 'Marzec 1983', body:
`1 × KOSTIUM MASKOTKI, na zamówienie — „CHOMPY”
Okrągły, pomarańczowy, filcowe rogi, zęby z pianki (wg załączonego rysunku)
Zamówienie specjalne .................. $180.00
Przeróbki: dla mężczyzny 1,88 m ....... $25.00
Dopisek sklepu: „Mamy nadzieję, że córce się spodoba!”

(Dopięty później: bilet z parkingu przy St. Agnes, 27 października 1983. Dzień, w którym wniósł go po schodach.)` },
      workshop_nora: { kind: 'letter', title: 'Niewysłany list, zaadresowany i ze znaczkiem', from: 'Walt', date: 'Luty 1992', body:
`Noro,

przeczytałem wszystkie twoje listy. Nie odpisywałem, bo każda odpowiedź, którą pisałem, była albo kłamstwem, albo pożegnaniem.

W przyszłym miesiącu idę po nich. Nie pozwól nikomu wyciągnąć wtyczki. Ani bankowi, ani policji, ani sobie.

Jeśli nie wrócę, zanim przyjdzie bank, lista wyników wisi w korytarzu. Zatrzymaj ją. Imiona na niej są ważniejsze niż cokolwiek, co kiedykolwiek zbudowałem.

Twój brat
Walt

(Nigdy nie został wysłany.)` },
      workshop_ticket: { kind: 'note', title: 'Kwit z naprawy telewizora na stole', from: 'Naprawy Starlight (na zapleczu)', date: 'Marzec 1986', body:
`KLIENTKA: Ann Keller (Maple St.)
URZĄDZENIE: 19-calowy telewizor kolorowy, brak obrazu
NAPRAWA: wymieniony transformator wysokiego napięcia.
KWOTA: 0 $ — „zapłacone ciasteczkami z czekoladą”

(Przypięta spinaczem karteczka twoim własnym, dwunastoletnim pismem: „DZIĘKUJĘ WALT ZA NAPRAWIENIE TELEWIZORA ZNOWU MOŻEMY OGLĄDAĆ MECZ — SAM”)` },
      workshop_317: { kind: 'tape', title: 'Taśma: „3:17”', from: 'Magnetofon Rosie (znaleziony w automacie nr 7, wciąż nagrywał)', date: '17 kwietnia 1987, 3:14–3:42', body:
`[Kliknięcie. Salon gier po zamknięciu. Muzyka z Hungry House, przyspieszona i zła.]

ROSIE: …trzecia czternaście i jesteśmy na POZIOMIE 255. Radio Rosie, na żywo, historia się dzieje—
DANNY: Ćśś! Wzór! Nell, w którą stronę?
NELL: W lewo. W lewo, potem czekać. Czekać… teraz.
TOBY: Sam, twoja kolej na przycisk. Sam? Trzęsiesz się.
SAM: Gorąco. Cały automat jest gorący. Ludzie, za gorąco.

[3:16. Muzyka milknie. Jeden długi ton.]

DANNY: To jest to. To 256. Patrzcie na prawą stronę…
NELL: Jest rozdarta. Same litery. I… nasze imiona. D-A-N. R-O-S. N-E-L. T-O-B. S-A-M.
ROSIE: Pakt. Wszyscy. Wszystkie pięć rąk na drążku. TERAZ.
TOBY: Mam cię, Sam. Trzymam cię za rękę.
NELL: Zjawy się odwróciły. Patrzą na nas. Z ekranu. One na nas PATRZĄ.
SAM: Parzy— nie mogę— nie mogę—
DANNY: NIKT NIE PUSZCZA!

[Czyjaś ręka odrywa się od gorącego metalu. Trampki na wykładzinie. Tylne drzwi trzaskają, otwarte na deszcz.]

TOBY: SAM! SAM, WRÓĆ! [szloch] …Nic. Nic się nie stało. We czwórkę też się da.
ROSIE: [drżącym głosem] CONTINUE. Naciskajcie. Razem.

[3:17. Dźwięk jak ogromny wdech. Cztery krótkie łapczywe oddechy. Potem już tylko buczenie.]

[3:20. Drzwi. Kroki na schodach. Walt, zdyszany.]

WALT: Dzieciaki? Danny? …Nie. Nie, nie, nie. Ekran. Imiona pod Zjawami. DAN. ROS. NEL. TOB. O Boże. O Boże, to ich imiona.
WALT: [mężczyzna, który ciężko osuwa się na podłogę] Przepraszam. Wyciągnę was. Obiecuję, że was wyciągnę.

[Taśma kręci się w ciszy jeszcze przez dwadzieścia dwie minuty. Potem: kliknięcie.]` },
      workshop_lily8: { kind: 'drawing', drawing: 8, title: 'Rysunek złożony w skrzynce z narzędziami Walta', from: 'Lily, 9 lat', body:
`Kredki świecowe, ostatni. Wielki pan siedzi na podłodze obok wysokiej, świecącej maszyny i płacze. Za nim stoi mała dziewczynka z ręką na jego ramieniu. Jest narysowana z uśmiechem.

NIE BĄDŹ SMUTNY TATO.
NA KOŃCU WSZYSCY WRACAJĄ DO DOMU.
OBIECAŁEŚ.` },
    },
    obj: {
      workshop_key: 'Znajdź klucz Walta',
      workshop_kernel: 'Otwórz pomieszczenie Kernela',
      workshop_dials: 'Ustaw pokrętła kalibracyjne ({n}/3 poprawnie)',
      workshop_leave: 'Przejdź przez EXIT',
    },
    mono: {
      workshop_start: 'Warsztat Walta. Kiedyś przez to okienko było widać, jak naprawia telewizory.',
      workshop_key: 'Jego klucz. Ciepły, jakby ktoś dopiero co go odłożył.',
      workshop_kernel: 'Kernel. Oddycha. Przysięgam, że oddycha.',
      workshop_calibrated: 'Dwa. Pięć. Sześć. Buczenie opada o oktawę. Gdzieś daleko odskakuje zasuwa.',
      workshop_chompy: 'Chompy. Kostium ze zdjęcia ze szpitala. W środku nikogo nie ma. A i tak chodzi.',
      workshop_317: 'Moja ręka puściła.',
    },
    lines: {
      workshop_unlock: 'Otwórz kluczem Walta',
      workshop_dial: 'Przekręć pokrętło (teraz: {n})',
    },
    radio: {
      workshop_start: [
        ['eddie', 'Sam… zanim zejdziesz po tych schodach. Na moim stole coś leży. Wolę, żeby to zostało przeczytane, niż żeby padło z moich ust.'],
      ],
      workshop_kernel: [
        ['eddie', 'To ona. To Kernel. Zbudowaliśmy ją w osiem miesięcy. Byłem taki dumny.'],
      ],
      workshop_chompy: [
        ['eddie', 'Światło w oczy. Zasłania twarz. Walt robił ten numer dzieciakom. A kuku.'],
      ],
      workshop_truth: [
        ['eddie', '…Sam? Słyszałem. Przyszło na siódemce. Wszystko.'],
        ['sam', 'Moja ręka puściła. Potem ucieczka, a potem siedem lat powtarzania wszystkim, że o 21:40 już w domu.'],
        ['eddie', 'Trzynaście lat, Sam. Tyle wtedy było ci lat.'],
        ['sam', 'Walt przez pięć lat był potworem tego miasta. Przeze mnie. A potem tam wszedł, i teraz naprawdę NIM JEST.'],
        ['eddie', '…A ja zostawiłem otwarte drzwi. Walt skłamał w sprawie klucza. W tej historii każdy coś puścił, Sam.'],
        ['eddie', 'Liczy się to, czego trzymasz się teraz.'],
      ],
      workshop_calibrated: [
        ['eddie', '256. To jest to. Tędy do domu.'],
        ['eddie', 'Już wiesz, co jest na moim stole. Zostawiłem tylne drzwi otwarte. Tędy był twój powrót tamtej nocy.'],
        ['sam', 'Szedłeś do kina.'],
        ['eddie', '…No. Do kina. Nawet nie pamiętam, na jaki film.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
