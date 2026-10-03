/* Polski — Rozdział 8: Jasne światła (wesołe miasteczko Falka). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      carnival: {
        name: 'ROZDZIAŁ 8', title: 'Jasne światła', place: 'Wesołe miasteczko Falka, port w Halvard',
        intro: 'Niedziela, 30 września 1984 roku, tuż przed północą. Ostatnia noc sezonu.\n\nTłum poszedł do domów. Światła zostawiono zapalone. Pociąg widmo spłonął poprzedniej nocy, a staremu klaunowi kazano się spakować.',
      },
    },
    docs: {
      carnival_poster: { kind: 'notice', title: 'Plakat na kasie', from: 'Wesołe miasteczko Falka', date: 'Wrzesień 1984', body:
`WESOŁE MIASTECZKO FALKA
Port w Halvard — od 14 do 30 września
OSTATNIE WIECZORY!

Wielka Karuzela · Diabelski Młyn
Gabinet Śmiechu — poznaj ROZEŚMIANĄ LOTTE!
POCIĄG WIDMO (jeśli się odważysz)
Łowienie Kaczek · Strzelnica · Sprawdź Swoją Siłę

a codziennie o 16 i o 19:
KLAUN PIPO
„Nasz, z Halvard, od dwudziestu jeden sezonów”` },
      carnival_closing: { kind: 'notice', title: 'Ogłoszenie przykręcone drutem do bramy', from: 'E. Falk, właściciel', date: '30.9.84', body:
`POCIĄG WIDMO JEST ZAMKNIĘTY.

Po pożarze w sobotę w nocy pociąg widmo nie będzie już w tym sezonie jeździł. Nikt nie odniósł obrażeń.

Dyrekcja dziękuje publiczności i Straży Pożarnej w Halvard oraz przeprasza za rozczarowanie.

Wesołe miasteczko Falka opuszcza Halvard we wtorek rano. Do zobaczenia za rok!` },
      carnival_fire: { kind: 'report', title: 'Kopia raportu pożarowego w budce sterowniczej', from: 'Straż Pożarna w Halvard', date: '30 września 1984', body:
`Zdarzenie 84/211. Wesołe miasteczko Falka, port. Zgłoszenie 01.40, 30.9.84.
Pożar w ciemnej kolejce („Pociąg widmo”). Ugaszony o 02.15. Brak poszkodowanych.

Źródło ognia: kabina operatora z tyłu atrakcji, kosz na śmieci.
Prawdopodobna przyczyna: niedogaszony papieros.

Właściciel, p. E. Falk, oświadcza, że jego pracownik H. Brecht (klaun) nocował i palił w kabinie. P. Brecht został zwolniony i nie udało się go przesłuchać. Syn właściciela, K. Falk, 19 lat, nie był obecny.

Uwaga funkcjonariusza: w koszu dwa rodzaje niedopałków. Na jednym szminka.` },
      carnival_kasper: { kind: 'letter', title: 'Koperta na spalonym biurku, nigdy niewysłana', from: 'K.', date: '1 października 1984', body:
`Hugo,

to byłem ja. Ja i Mette, w kabinie po zamknięciu, i wysypałem puszkę do kosza, nie patrząc, bo usłyszeliśmy, że idzie tata.

Tata wie. Tata mówi, że już po sprawie, że i tak miałeś niedługo skończyć, i dał ci dwutygodniową wypłatę. Kiedy powiedział, że to ty, spojrzałeś na mnie. Nic nie powiedziałeś. Nie wiem, dlaczego nic nie powiedziałeś.

Przepraszam. Przepraszam.
K.

(Na kopercie: „Pipo”. Bez adresu. Na odwrocie tą samą ręką: „gdzie mam to wysłać”)` },
      carnival_ledger: { kind: 'report', title: 'Księga właściciela w budce diabelskiego młyna', from: 'E. Falk', date: 'Wrzesień 1984', body:
`29.9 Utarg, wszystkie atrakcje — 14 220. Pociąg widmo: pożar po zamknięciu (01.40). Nieczynny.
30.9 Brecht, H. („Pipo”). 21 sezonów. Rozliczony: dwutygodniowa wypłata, gotówką. Nie zatrudniać ponownie.
     Szkoda ubezpieczeniowa, pociąg widmo: pożar spowodowany przez pracownika palącego w tylnej kabinie (Brecht). Oświadczenie podpisał E.F.
     K. — we wtorek prowadzi ciężarówkę do Ostry. Zająć go czymś.` },
      carnival_rosa: { kind: 'note', title: 'Kartka przypięta pod ladą stoiska z maskami', from: 'Rosa, maski i drobiazgi', date: 'Noc 30.9.84', body:
`Pipo przeszedł koło mojego stoiska o północy z walizką. Twarz już zdjął i wyglądał na sto lat.

Wyjął nos z kieszeni, położył go na mojej ladzie i powiedział: „Popilnuj mi go, Rosa”.

Zapytałam, dokąd idzie. Powiedział: „Do domu”. Nie ma domu. Od dwudziestu lat mieszka w tej przyczepie.

Schowałam nos pod ladę, gdzie nikt go nie weźmie. — R.` },
      carnival_hugo: { kind: 'note', title: 'Kartka wetknięta w ramę lustra', from: 'Hugo Brecht', date: '(bardzo stara, wiele razy przepisywana)', body:
`Czego nauczył mnie stary Bruno, 1931:

Twarz nakłada się w tej kolejności. Biały. Potem czerwony. Potem czarny. Potem nos.
Nos zakłada się na końcu i zdejmuje na początku.
Z nosem jesteś Pipo i nic nie może ci się stać.
Bez niego jesteś tylko Hugo. Więc uważaj, gdzie go zdejmujesz.

Nos mieszka na lustrze. Nigdy w kieszeni.` },
      carnival_fan: { kind: 'letter', title: 'List dziecka na łóżku', from: 'Tomas, 7 lat', date: 'Wrzesień 1984', body:
`Kochany Pipo

Dziękuję za pieska z balonika którego mi zrobiłeś. Dalej go mam. Trochę flaczeje.

Jak będę duży chcę być klaunem i się przewracać.

buziaki od Tomasa

(Rysunek kredkami: klaun z czerwonym nosem tak dużym jak jego głowa, przewraca się, a wszyscy się śmieją.)` },
      carnival_paper: { kind: 'clipping', title: 'Strona gazety na ławce', from: 'Wiadomości Portowe z Halvard', date: 'Czwartek, 4 października 1984', body:
`WALIZKA KLAUNA ZNALEZIONA NA SCHODACH W PORCIE

Zniszczona brązowa walizka należąca do Hugona Brechta, lat 71, znanego trzem pokoleniom dzieci z Halvard jako klaun Pipo, została znaleziona w poniedziałek rano na schodach pod nabrzeżem rybnym.

Pan Brecht został zwolniony z wesołego miasteczka Falka po pożarze pociągu widmo w sobotę w nocy, o który obwinił go właściciel. Od tamtej pory nikt go nie widział. Kto widział go w niedzielę w nocy, proszony jest o kontakt z policją portową.

Wesołe miasteczko opuściło Halvard we wtorek.` },
      wren8: { kind: 'drawing', drawing: 8, title: 'Rysunek na podłodze krzywego pokoju', from: 'Wren, 7 lat', body:
`Kredki świecowe, kartka złożona na cztery. Klaun z czerwonym nosem i wielką brązową walizką odchodzi drogą w stronę morza i macha na pożegnanie, z ręką wysoko w górze. Za nim diabelski młyn pełen świateł. Mały czerwony ptaszek siedzi na jego kapeluszu.

Pod spodem:
PA PA PIPO` },
    },
    items: {
      fuse: { name: 'Bezpiecznik', desc: 'Bezpiecznik topikowy z porcelany i mosiądzu. 60 A. Z warsztatu gabinetu śmiechu.' },
      nose: { name: 'Nos Pipa', desc: 'Klauński nos, czerwony, wyświecony od noszenia. Był na wielu twarzach, a zawsze na jednej.' },
    },
    obj: {
      carnival_start: 'Znajdź sposób, żeby wydostać się z wesołego miasteczka',
      carnival_power: 'Pociąg widmo wyjeżdża za ogrodzenie. Uruchom go',
      carnival_fuse: 'Znajdź bezpiecznik: spróbuj w warsztacie gabinetu śmiechu',
      carnival_fit: 'Włóż bezpiecznik w budce sterowniczej pociągu widmo',
      carnival_why: 'Dowiedz się, co się stało z Pipem',
      carnival_nose: 'Znajdź to, co zostawił Pipo',
      carnival_mirror: 'Odłóż nos Pipa z powrotem na jego lustro',
      carnival_ride: 'Wyjedź pociągiem widmo',
    },
    mono: {
      carnival_start: 'Wesołe miasteczko. Zamknięte na noc, a wszystkie światła się palą.',
      carnival_gate: 'Na łańcuchu. A ogrodzenie to trzy metry siatki z drutem na górze.',
      carnival_booth: 'Budka pusta. Szyba wybita. Od środka.',
      carnival_lotte: 'Ktoś się śmieje. Bardzo daleko. Nie przerywa nawet na oddech.',
      carnival_ghost: 'Pociąg widmo. Wypalony. Tor przechodzi przez środek i wychodzi z tyłu, przez ogrodzenie.',
      carnival_noPower: 'Martwy. Gniazdo bezpiecznika puste, a stary bezpiecznik leży czarny w tacce.',
      carnival_fuse: 'Bezpiecznik. Sześćdziesiąt amperów. Wygląda na właściwy.',
      carnival_power: 'W środku światło. Wagoniki dalej stoją. Coś je trzyma.',
      carnival_maze: 'Lustra. Ja, i ja, i w każdym ktoś stoi za mną. Za mną nikogo nie ma.',
      carnival_masks: 'Ludzie w maskach stoją tu i tam. Minutę temu ich nie było.',
      carnival_nose: 'Jego nos. „Popilnuj mi go, Rosa”.',
      carnival_music: 'Katarynka zaczęła grać. Sama.',
      carnival_horses: 'Konie. Schodzą z karuzeli.',
      carnival_stopped: 'Muzyka ucichła. One też stanęły. Dokładnie tam, gdzie są.',
      carnival_trailer: 'Jego przyczepa. Lustro jest oświetlone.',
      carnival_mirrorLook: 'Jego lustro. Czysty okrągły ślad na szklanej półce, gdzie zawsze coś leżało.',
      carnival_placed: 'No. Tam, gdzie mieszka, kiedy on jest tylko Hugonem.',
      carnival_claimed: 'Żarówki wokół lustra gasną jedna po drugiej.',
      carnival_running: 'Po drugiej stronie miasteczka coś ruszyło. Pociąg widmo.',
      carnival_notYet: 'Tor wychodzi z tyłu. Ale bez prądu nie pojedzie.',
      carnival_board: 'Trzymaj się poręczy.',
      carnival_out: 'Schody w porcie. Brązowa walizka na najniższym stopniu, a przypływ podnosi się nad nią.',
      carnival_kasper: 'Napisał i nigdy nie wysłał. „Gdzie mam to wysłać”.',
      carnival_fence: 'Przez tylną ścianę, przez ogrodzenie.',
    },
    lines: {
      carnival_boothPrompt: 'Włóż bezpiecznik',
      carnival_boothLook: 'Sterowanie atrakcji',
      carnival_mirrorPut: 'Połóż nos na lustrze',
      carnival_mirrorLook: 'Lustro Pipa',
      carnival_ridePrompt: 'Wsiądź do wagonika',
      carnival_rideLook: 'Wagonik pociągu widmo',
    },
    radio: {
      carnival_otto1: [
        ['radio', '[jarmarczna katarynka, daleko, rozstrojona]'],
        ['otto', 'Dziewiątka do Ady. Słyszę wesołe miasteczko. Mam półkę małych papierowych biletów na przejażdżki i jeden czerwony nos. Nie mam pojęcia, dlaczego to powiedziałem.'],
        ['ada', 'Brama jest na łańcuchu.'],
        ['otto', 'Wesołe miasteczka ogradza się po to, żeby ludzie płacili, a nie żeby nie mogli wyjść. Zawsze jest wyjście, którego używa obsługa. Proszę iść wzdłuż torów.'],
      ],
      carnival_otto2: [
        ['otto', 'Ado. Proszę nie stać w miejscu przy niczym, co nosi twarz. A jeśli zacznie się muzyka, proszę się ruszać, dopóki gra. Kiedy ucichnie, staje wszystko, co do niej tańczy.'],
      ],
      carnival_otto3: [
        ['otto', 'Nos zniknął z mojej półki. Dobrze. Nigdy nie był mój, żebym go trzymał. Jeszcze jedna półka, Ado, i to ta, do której idzie pani przez całą noc.'],
      ],
    },
    recap: {
      carnival: 'Wesołe miasteczko Falka, 30 września 1984 roku. Dziewiętnastoletni Kasper Falk podpalił pociąg widmo papierosem; jego ojciec powiedział strażakom, że to stary klaun Hugo Brecht, i go rozliczył. Hugo nic nie powiedział. Zostawił nos Rosie przy stoisku z maskami i wyszedł przez bramę z walizką, a walizkę znaleziono na schodach w porcie. Odłożyłam jego nos na lustro, gdzie mieszkał, i wyjechałam przez ogrodzenie pociągiem widmo.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
