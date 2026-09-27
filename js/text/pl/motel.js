/* Polski — Poziom 8: Blue Moon Motor Inn (wspomnienie Eddiego). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      motel: {
        name: 'LEVEL 8', title: 'Blue Moon Motor Inn', place: 'Wspomnienie Eddiego — droga nr 9, nocna zmiana',
        intro: 'To nie jest twoje wspomnienie. Motel przy drodze nr 9, bzyczący neon WOLNE POKOJE, nocna recepcjonistka, która w 1990 roku śmiała się z żartów chudego złotej rączki.\n\nPokój 12 przez długi czas był opłacany tygodniowo. Ktoś wciąż puka do drzwi.',
      },
    },
    items: {
      room12Key: { name: 'Klucz do pokoju 12', desc: 'Mosiężny klucz na zielonym plastikowym rombie: BLUE MOON MOTOR INN — 12. Jeszcze ciepły z suszarki.' },
    },
    docs: {
      motel_intro: { kind: 'note', title: 'Karteczka samoprzylepna na włączniku neonu WOLNE POKOJE', from: 'June', date: '1991', body:
`Eddie —
Jeśli to czytasz, znowu się spóźniłeś.
Kawa zaparzona. Ciasto w lodówce. Nie zjedz całego.
Kocham cię. Napraw kostkarkę.
— J.` },
      motel_register: { kind: 'note', title: 'Księga gości na recepcji', from: 'Blue Moon Motor Inn', date: '1992–1993', body:
`…
Pok. 7 — komiwojażer — 1 noc
Pok. 3 — Hendersonowie (znowu)
Pok. 12 — E. — tygodniowo — „warsztat, nie przeszkadzać”
Pok. 12 — E. — tygodniowo
Pok. 12 — E. — tygodniowo — opłacone do 12 czerwca 1993

(Pismem June: „Mówi, że to do projektu. Nie chce mi powiedzieć, jakiego projektu. Wraca do domu, pachnąc cyną do lutowania, i nie śpi”.)

Haczyk na klucz do pokoju 12 jest pusty. Ktoś napisał obok na ścianie: PRALNIA?` },
      motel_complaint: { kind: 'note', title: 'Karta uwag gościa', from: 'Pokój 11', date: 'Maj 1993', body:
`Bardzo czysty pokój. Dobre ciasto.

ALE: ktoś puka do moich drzwi co noc o 3:17. Kiedy otwieram, nikogo nie ma.

Poza tym mężczyzna z pokoju 12 całą noc gada do krótkofalówki. Po drugiej stronie nikogo nie ma. Sprawdziłem.

— Gość` },
      motel_postcard: { kind: 'note', title: 'Pocztówka na szafce nocnej', from: 'Eddie', date: 'Stempel Harlow, 1990', body:
`(Z przodu: „POZDROWIENIA Z BLUE MOON — droga nr 9, Harlow” i namalowany basen, którego motel nie ma.)

June,
roześmiałaś się z żartu o kostkarce. Nikt się nie śmieje z żartu o kostkarce. Będę go opowiadał, dopóki za mnie nie wyjdziesz.
— ten chudy od napraw (Eddie)` },
      motel_walt: { kind: 'diary', title: 'Dziennik Walta, rozdarty na pół', from: 'Walt', date: 'W środku', body:
`Motel. Nie znam tego miejsca.

Mieszkał tu ktoś, kto dla mnie pracował. Złota rączka. Zły na mnie. Chyba sobie zasłużyłem.

Miał żonę. W drodze było dziecko.

Powiedziałem mu, żeby mnie nie szukał. Chyba napisałem to na kartce. Chyba nie posłuchał.

Nikt nie słucha człowieka, który stracił czworo dzieci.` },
      motel_notebook: { kind: 'note', title: 'Notes Eddiego, otwarty na łóżku', from: 'Eddie', date: '1992–1993', body:
`NOTATKI O KERNELU — wer. C

Gra potrzebuje 1 Gracza + 4 Zjaw. Kernel je TRZYMA.
Teraz Graczem jest Walt. Od marca ’92.
Jest jedno prawdziwe WYJŚCIE, na 256, po zepsutej stronie. Wypuszcza JEDNĄ osobę, kiedy JEDNA osoba zostaje na jej miejscu.

JEDEN WCHODZI, JEDEN WYCHODZI. To cała zasada.

Plan: wchodzę. Znajduję WYJŚCIE. Znajduję kogoś, kto jeszcze ma imię. Ta osoba trzyma drzwi. Ja wychodzę. Wracam do domu, do June. Poznaję dziecko.

Okropny plan. Wiem.
I tak podkreśliłem go trzy razy.

(Później, innym długopisem, pisane w środku:)
Znalazłem drzwi w pierwszym tygodniu. Nie ma komu ich trzymać. Zjawy nie mają już imion, a Walt nie ma twarzy. Więc czekam.

(Jeszcze później:)
Jest dziecko. Sam. Numer pięć. To, które poszło do domu. Dla automatu Sam to PLAYER ONE.
To może być to dziecko.
Przepraszam cię, dziecko.` },
      motel_june: { kind: 'letter', title: 'Listy w pudełku po butach, górny otwarty', from: 'June', date: 'Lipiec 1993', body:
`Eddie,

policja przestała przychodzić. Twoja mama wciąż dzwoni co niedzielę.

Ciągle ścielę twoją stronę łóżka. Nie wiem po co. To głupie.

Dziecko kopie, kiedy włączam radio. Lubi stację ze starymi przebojami. Będzie DJ-ką.

Jeśli jesteś gdzieś, gdzie możesz to przeczytać: nie jestem zła. Trochę jestem zła. Wróć do domu, to będę na ciebie zła osobiście.

Damy jej na imię Hope. Nie masz głosu.

— June` },
      motel_ultrasound: { kind: 'photo', photo: 'ultrasound', title: 'Wydruk USG, pognieciony od noszenia', from: 'Oddział położniczy St. Agnes', date: 'Maj 1993', body:
`Ziarnisty szary wachlarz. Pośrodku maleńki kształt.

Na odwrocie, pismem Eddiego, raz za razem, jakby ćwiczył:
„Cześć, maleństwo. Cześć. Jestem twoim tatą. Cześć, maleństwo. Cześć. June myśli, że jesteś dziewczynką. Cześć”.` },
      motel_tape: { kind: 'tape', title: 'Taśma: „Dla dziecka”', from: 'Eddie', date: '11 czerwca 1993', body:
`[Kliknięcie. Pokój motelowy. Kostkarka grzechocze za ścianą.]

EDDIE: Hej, maleństwo. Tu twój tata. Jeszcze mnie nie znasz.

EDDIE: Idę po kilka osób, które się zgubiły. Czworo dzieci i starszego pana, który był dla mnie dobry, choć wcale nie musiał.

EDDIE: Wrócę, zanim się urodzisz. A jeśli nie… mama powie ci, że byłem idiotą, i będzie miała rację, ale byłem idiotą z dobrego powodu.

EDDIE: [długi oddech] Boję się, maleństwo. Naprawdę się boję.

EDDIE: Dobra. Dobra. Tata cię kocha. Poproś mamę o żart o kostkarce. Będzie udawać, że go nie znosi.

[Kliknięcie.]` },
    },
    obj: {
      motel_find12: 'Dowiedz się czegoś o pokoju 12 (recepcja)',
      motel_key: 'Znajdź klucz do pokoju 12',
      motel_room12: 'Otwórz pokój 12',
      motel_leave: 'Wyjdź wyjściem ewakuacyjnym',
    },
    mono: {
      motel_start: 'Motel. Neon WOLNE POKOJE bzyczy. To nie moje wspomnienie. To czyje?',
      motel_register: 'Pokój 12. „E.” Eddie.',
      motel_key: 'Klucz leżał w suszarce. Jeszcze ciepły.',
      motel_room12: 'Pokój 12. Wszędzie kable. Polowe łóżko. Pachnie cyną do lutowania.',
      motel_notebook: '„JEDEN WCHODZI, JEDEN WYCHODZI”. …Eddie.',
      motel_neighbor: 'Mężczyzna w szlafroku, daleko na końcu korytarza. Ma spuszczoną głowę. Chyba się uśmiecha.',
    },
    lines: {
      motel_unlock12: 'Otwórz pokój 12',
      motel_trust: '„Powiedz mi prawdę. Wysłucham”.',
      motel_doubt: 'Ścisz radio. Nic nie mów.',
    },
    radio: {
      motel_start: [
        ['eddie', '…Och. Och, to Blue Moon.'],
        ['sam', 'Znasz to miejsce?'],
        ['eddie', 'Tu poznałem żonę. Pracowała na nocną zmianę. Po prostu… idź dalej, dobra? Nie wchodź do pokoju 12.'],
        ['sam', 'Czemu nie?'],
        ['eddie', 'Bo cię o to proszę.'],
      ],
      motel_neighbor: [
        ['eddie', 'Nie otwieraj drzwi, jeśli zapuka. Nie odwracaj się też do niego plecami. Światło go odpycha.'],
      ],
      motel_explain: [
        ['eddie', 'Sam. Wiem, że to czytasz. Słyszę kartki.'],
        ['eddie', 'Napisałem to, zanim cię poznałem. Zanim cokolwiek z tego wiedziałem.'],
        ['eddie', 'Mam córkę, której nigdy nie widziałem. Od półtora roku nie myślę o niczym innym.'],
        ['eddie', 'Koniec z okłamywaniem cię. Pozwól mi… po prostu wyjaśnić. Proszę.'],
      ],
      motel_trusted: [
        ['eddie', 'Ta zasada jest prawdziwa. Jeden wchodzi, jeden wychodzi. Drzwi na 256 otwierają się dla jednej osoby, kiedy ktoś inny zostaje.'],
        ['eddie', 'Chciałem, żeby padło na ciebie. Wstydzę się tego. Już tego nie chcę.'],
        ['eddie', 'Uwolnij Zjawy. Wszystkie cztery. Jeśli wszystkie przypomną sobie swoje imiona, może jest inny sposób. Walt tak myślał. Pięć rąk, napisał. Nigdy tego nie rozumiałem.'],
      ],
      motel_doubted: [
        ['eddie', '…No. Ja też bym się wyłączył.'],
        ['eddie', 'Będę tu, kiedy zechcesz pogadać. Wyjście ewakuacyjne jest otwarte.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
