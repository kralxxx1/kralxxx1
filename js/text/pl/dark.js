/* Polski — Poziom 6: Światła gasną (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Światła gasną', place: 'Wspomnienie Toby’ego — ciemność',
        intro: 'Te same żółte pokoje, w których zgasło każde światło. Ciemność jest tu tak gęsta, że można się o nią oprzeć.\n\nToby przez całe życie bał się ciemności. Tutaj ciemność nie boi się niczego. Gdzieś w niej coś bardzo się stara nie parsknąć śmiechem.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Na generatorze', from: 'Eddie', body:
`Trzy generatory. Wszędzie walają się kanistry z olejem napędowym.

Tutaj ciemność ma zęby. Nazywam je Szczerzaczami. Światło je przegania. Latarka, świetlik, cokolwiek.

Bursztynowy… trzymaj na nim światło. Nie odwracaj się do niego plecami na długo.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Kartka z zeszytu szkolnego', from: 'Toby', date: '15 kwietnia 1987', body:
`Jutro Operacja 256!!!

Danny mówi, że odpowiadam za latarkę. Rosie nagrała kasetę. Nell narysowała mapę tras Zjaw i jest naprawdę super.

Dziś usiadłem na odtwarzaczu. Tym, który Sam wszędzie nosi. Chrup. Sam jeszcze nie wie. Oddam całe kieszonkowe za marzec I kwiecień.

Danny mówi, że bursztynowa Zjawa z nr 7 to ja, bo to ta tchórzliwa. Walt mówi, że to ta sprytna. Tak czy siak to MOJA Zjawa.` },
      dark_diary2: { kind: 'diary', title: 'Ostatnia strona', from: 'Toby', date: '17 kwietnia 1987, 0:50 — w salonie gier', body:
`Piszę przy świetle zapalniczki. Danny zgasił światła z tyłu, żeby było strasznie. Udało się.

O 21:40 Sam do domu, a na odchodne: „Dobra. To znikaj”. Nic nie odpowiedziałem. Płakałem na zapleczu, gdzie nikt nie widział.

A potem o 0:40 ktoś zapukał do tylnych drzwi, a tam SAM. Woda leje się z włosów.

SAM JEST Z POWROTEM!!! Sam zawsze wraca.

Pierwszy przeprosiłem. Czyli wygrałem.

Poziom 212. Danny mówi, że 256 do trzeciej. Wszystkie pięć rąk. Nikt nie puszcza.` },
      dark_grandpa: { kind: 'card', title: 'Mała karteczka w pudełku po zapalniczce', from: 'Dziadek Toby’ego', date: '1985', body:
`Toby —

Twoja babcia dała mi ją w 1951, żebym trafiał do domu po nocnej zmianie.

Teraz jest twoja. Nigdy nie musisz siedzieć po ciemku.

—Dziadek` },
      dark_grinners: { kind: 'note', title: 'Roztrzęsione pismo', from: 'Eddie', body:
`Szczerzacze to nie ludzie. To nawet nie Zjawy.

Myślę, że to wyobrażenie gry o tym, co siedzi w ciemności. Wyobrażenie Toby’ego. To, co według trzynastolatka mieszka pod łóżkiem.

Złam świetlik, policz do trzech i już ich nie ma.

Na tym poziomie mało śpię.` },
      dark_walt6: { kind: 'diary', title: 'Dziennik Walta, ściśnięte pismo', from: 'Walt', date: 'W środku', body:
`Nie pamiętam swojego imienia. Zaczyna się na W.

Pamiętam pismo małej dziewczynki. Okrągłe litery. Narysowała pomarańczowego stworka z rogami i napisała pod spodem TATA.

Pamiętam smak monet.

Bursztynowy też na mnie nie patrzy. Nikt już na mnie nie patrzy.

JEDZ, mówi plansza. JEDZ.` },
      dark_wall: { kind: 'wall', title: 'Napisane na ścianie sadzą z zapalniczki', body:
`NIE PATRZ NA MNIE

PRZEPRASZAM SAM` },
      dark_porch: { kind: 'note', title: 'Karteczka przyklejona do drzwi z moskitierą', from: 'Maggie, mama Toby’ego', date: 'Kwiecień 1987', body:
`Toby —

Światło na ganku pali się, dopóki nie wrócisz do domu.

Całuję, Mama` },
      dark_tape: { kind: 'tape', title: 'Taśma: „Żart Toby’ego”', from: 'Magnetofon Rosie', date: '16 kwietnia 1987, 23:58', body:
`[Kliknięcie. Zaplecze salonu gier. Światła są zgaszone. Pstryka zapalniczka.]

TOBY: Dobra, dobra. Dlaczego Muncher przeszedł przez ulicę?

DANNY: Bo Zjawy były po tej stronie.

TOBY: Nie! Bo na ulicy były GWIAZDKI!

[Cisza. Potem parska Nell, potem Rosie, a potem wszyscy śmieją się o wiele głośniej, niż ten żart zasługuje.]

TOBY: [wciąż się śmieje] Sam zawsze się z tego śmieje. Bez całej paczki to nie to samo.

[Śmiech cichnie.]

ROSIE: …Sam jeszcze przyjdzie, Toby.

[Kliknięcie.]` },
    },
    obj: {
      dark_generators: 'Uruchom generatory ({n}/3)',
      dark_leave: 'Dotrzyj do windy towarowej',
    },
    mono: {
      dark_start: 'Nic nie widzę. Latarka… nie wiem, czy wystarczy.',
      dark_tobySeen: 'Coś bursztynowego w kącie. Prześcieradło z przypalonym brzegiem. Nie rusza się. Nie, dopóki patrzę.',
      dark_grinner: 'Uśmiech w ciemności. Same zęby.',
      dark_gen: 'Generator budzi się z kaszlem. Światło.',
      dark_lighter: 'Jego zapalniczka. Raz, w 1986, dał mi ją potrzymać. Po dziesięciu sekundach kazał oddać.',
      dark_diary2: 'Sam jest z powrotem. …Nie. Nie. Do domu. O 21:40 — do domu.',
    },
    lines: {
      dark_gen: 'Wlej olej napędowy i uruchom (przytrzymaj)',
      dark_genEmpty: 'Generator (brak paliwa)',
      dark_needFuel: 'Najpierw trzeba znaleźć kanister z olejem napędowym.',
      dark_tankEmpty: 'Bak generatora jest pusty.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Nienawidzę tego poziomu. Strasznie go nienawidzę. Trzymaj się światła, Sam. Mówię serio.'],
      ],
      dark_toby: [
        ['eddie', 'Bursztynowy… to Toby. Nie ruszy na ciebie, dopóki na niego patrzysz. Kiedy się bał, nigdy nie umiał nikomu spojrzeć w oczy.'],
        ['sam', 'Mnie patrzył w oczy. Cały czas.'],
        ['eddie', '…No. Chyba tak.'],
      ],
      dark_lighter: [
        ['eddie', 'Zapalniczka jego dziadka. Nikomu nie pozwalał jej dotknąć. Nawet Danny’emu.'],
      ],
      dark_freed: [
        ['eddie', '…To tylko dzieciak, Sam. Oni wszyscy to tylko dzieciaki.'],
        ['eddie', 'Co to za gra, która robi coś takiego dzieciom?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
