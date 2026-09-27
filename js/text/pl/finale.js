/* Polski — Poziom 255 (Dom) i poziom 256 (Ekran śmierci). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'Dom', place: 'Sama gra',
        intro: 'Hungry House od środka. Ściany, których spoiny świecą jak ekran, gwiazdy unoszące się na wysokości bioder, a pośrodku dom Zjaw, którego drzwi trzymają zamknięte cztery lampiony.\n\nZnasz tę planszę lepiej niż własny pokój. Dziesięć tysięcy rozgrywek. Czekała, aż zagrasz jeszcze raz.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Ekran śmierci', place: 'Połowa, której nikt nie miał zobaczyć',
        intro: 'Lewa połowa planszy to dom, który znasz. Prawa połowa to litery, cyfry i kolory, które się oderwały i wiszą w powietrzu.\n\nGdzieś w rdzeniu coś wciąż jest podłączone do prądu.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Świecące litery na ścianie labiryntu', from: 'W.', body:
`JEŚLI MOŻESZ TO PRZECZYTAĆ,
JESTEŚ W MOJEJ GRZE.
PRZEPRASZAM.
JEDZ GWIAZDY.
NIE KRZYWDŹ ZJAW.
—W.` },
      maze_rules: { kind: 'wall', title: 'Tablica, zimna jak kamień', body:
`ZASADY DOMU

1. Gracz je.
2. Zjawy gonią.
3. Plansza zostaje wyczyszczona.
4. Zaczyna się następna plansza.
5. Nie ma zasady piątej.` },
      maze_house: { kind: 'note', title: 'Na drzwiach domu Zjaw', from: 'Eddie', body:
`Cztery lampiony trzymają zasłonę zamkniętą. Po jednym w każdym rogu.

Dom to droga w dół. Ostatnia droga w dół.

Do zobaczenia po drugiej stronie. —E.` },
      maze_fruit: { kind: 'memory', title: 'Cukierek — wspomnienie', body:
`Kiedy Lily pierwszy raz zdobyła cukierkową premię, krzyknęła tak głośno, że Walt upuścił kawę.

„Tato! CUKIEREK! Mam CUKIERKA!”

Potem co sobotę wrzucał dla niej ćwierćdolarówkę i przez całą grę stał za nią, i ani razu nie powiedział jej, w którą stronę iść.` },
      ks_glitch1: { kind: 'wall', title: 'Połamane znaki wiszące w powietrzu', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Uszkodzony zapis gry', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'Ostatni list Walta', from: 'W. (chyba tak mam na imię)', date: 'Dzień, którego nie dało się policzyć', body:
`Do kogokolwiek, kto dotrze do rdzenia.

Wtyczka jest tutaj. Wyciągnięta od środka to nie morderstwo, tylko koniec. GAME OVER. Wszyscy, którzy wciąż są sobą, wracają do domu.

Ale nie ruszy się dla jednej pary rąk. Gra zaczęła się od pięciu rąk na drążku. Kończy się na pięciu. A tych czworo musi pamiętać, kim jest, bo inaczej ich ręce są tylko światłem.

Próbowałem sam, pierwszej nocy tutaj. Gra uznała to za ruch i zrobiła ze mnie swojego Gracza. Tym właśnie teraz jestem.

Jedna ręka puściła o 3:16. Od tamtej pory gra czeka na tę rękę.

Powiedz Norze, że przepraszam. Powiedz Ruth, że miała rację. Powiedz tabeli, żeby zachowała wynik Lily.

—W.` },
      ks_eddie: { kind: 'note', title: 'Kartka przypięta obok EXIT', from: 'Eddie', body:
`Jeden wchodzi, jeden wychodzi.

Znalazłem te drzwi w pierwszym tygodniu. Tam na zewnątrz minęło półtora roku. Tu w środku to była jedna, bardzo długa noc.

Przepraszam, Sam.` },
    },
    obj: {
      maze_pellets: 'Zabierz lampiony z czterech rogów ({n}/4)',
      maze_house: 'Wejdź do domu Zjaw',
      ks_core: 'Dotrzyj do rdzenia po zepsutej stronie',
      ks_choice: 'Wybierz: drzwi EXIT albo wtyczka',
    },
    mono: {
      maze_start: 'To jest… sama gra. Jestem w środku.',
      maze_rules: 'Kto zjada gwiazdy? Ja.',
      maze_house: 'Zasłona opadła. W domu są drzwi.',
      ks_start: 'Prawa strona jest… zepsuta. Litery wiszą w powietrzu.',
      ks_core: 'Rdzeń. Jest tu ogromna wtyczka. Wtyczka automatu. Od środka.',
      ks_exit: 'EXIT. Tym razem prawdziwy. Czuję wiatr.',
      ks_plugTry: 'Nie rusza się. Nie dla dwóch rąk. Potrzeba pięciu.',
      ks_plugReady: 'Cztery kolorowe światła stają przy mnie. Czerwone, fioletowe, turkusowe, bursztynowe.',
    },
    lines: {
      maze_portal: 'Zejdź na poziom, którego nie da się policzyć',
      maze_fruitTake: 'Weź cukierka',
      ks_plug: 'WYCIĄGNIJ WTYCZKĘ',
      ks_plugTry: 'Spróbuj wyciągnąć wtyczkę',
      ks_exitGo: 'Przejdź przez EXIT',
      ks_exitHold: 'Przytrzymaj drzwi dla Eddiego',
      ks_missing: '(Brakuje: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'To tu. Poziom dwieście pięćdziesiąt pięć. Ostatnia plansza przed tą zepsutą.'],
        ['eddie', 'Zbierz rogi. Będę czekał na dole.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Jestem tu. Nie w radiu. Tutaj. Przy drzwiach po prawej.'],
        ['eddie', 'Znajdź mnie. Proszę.'],
      ],
      ks_plea: [
        ['eddie', 'To ten prawdziwy. Wiatr, deszcz, Front Street. Dom.'],
        ['eddie', 'Wypuszcza jednego, a jednego zatrzymuje. Znalazłem go w pierwszym tygodniu. Od tamtej pory przy nim stoję.'],
        ['sam', 'Chciałeś pozwolić mi otworzyć i przejść samemu.'],
        ['eddie', 'Hope ma piętnaście miesięcy, Sam. Nigdy nie trzymałem jej na rękach. [Głos mu się łamie.] Nie proszę o wybaczenie. Proszę o przytrzymanie drzwi.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'To ten prawdziwy. Wiatr, deszcz, Front Street. Dom.'],
        ['eddie', 'W motelu mówiłem, że nie będę prosił. Więc nie proszę.'],
        ['sam', 'Ale chcesz.'],
        ['eddie', 'W każdej sekundzie. [Długi oddech.] Najpierw idź do rdzenia, Sam. Jeśli jest inny sposób, to tam. Jeśli nie… dalej będę tu stał.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
