/* Polski — Poziom 7: Harlow Mall (13 grudnia 1986, najszczęśliwszy dzień). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pl', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'Wspomnienie wszystkich — sobota, 13 grudnia 1986',
        intro: 'Najlepsza sobota 1986 roku. Piątka dzieciaków, dwadzieścia dolarów na wszystkich, choinka wysoka na trzy piętra.\n\nCentrum handlowe jest teraz zamknięte. Manekiny przysunęły się bliżej szyb. Ruszają się tylko wtedy, kiedy nikt nie patrzy.',
      },
    },
    items: {
      frame: { name: 'Klatka z fotobudki', desc: 'Jedno zdjęcie z paska z fotobudki, wycięte. Budka chce mieć je znów razem.' },
      frame1: { name: 'Klatka z fotobudki', doc: 'mall_frame1' },
      frame2: { name: 'Klatka z fotobudki', doc: 'mall_frame2' },
      frame3: { name: 'Klatka z fotobudki', doc: 'mall_frame3' },
      frame4: { name: 'Klatka z fotobudki', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'Na odwrocie planu centrum handlowego', from: 'Eddie', body:
`Fotobudka przy strefie restauracyjnej jest zepsuta. Chce z powrotem swoje zdjęcia.

Cztery klatki z paska zdjęć są porozrzucane po sklepach. Znajdź je, wrzuć do budki, a drzwi się otworzą.

Manekiny. Nie spuszczaj ich z oczu. Mówię dosłownie. Nie ruszają się, dopóki patrzysz.

To najszczęśliwsze miejsce w całej grze i właśnie jego najbardziej nienawidzę.

—E.` },
      mall_directory: { kind: 'note', title: 'Plan centrum, napis „TU JESTEŚ” starty palcami', from: 'Harlow Mall', date: '1986', body:
`POZIOM 1
Spins Records ......... Muzyka, kasety, czyste kasety
Comic Vault ........... Komiksy, karty, gry
Toy Parade ............ Zabawki dla każdego
Fotobudka ............. 4 pozy 1 $
Strefa restauracyjna .. Sunny Orange, Nonna’s Pizza, Pretzel Barn
Starlight Jr. ......... Mini salon gier (przy fontannie)

Otwarte do 21:00 aż do Wigilii!` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Klatka z fotobudki nr 1', from: 'Fotobudka', date: '13.12.1986', body:
`Danny i Rosie. Danny udaje, że się nudzi. Rosie udaje DJ-kę i mówi do precla jak do mikrofonu.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Klatka z fotobudki nr 2', from: 'Fotobudka', date: '13.12.1986', body:
`Nell i Toby. Nell naprawdę się uśmiecha, prawdziwym uśmiechem, i wygląda na zaskoczoną. Toby włożył jej czapkę Mikołaja.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Klatka z fotobudki nr 3', from: 'Fotobudka', date: '13.12.1986', body:
`Ty i Toby, policzek przy policzku, z dokładnie taką samą miną. Oczy masz zmrużone od śmiechu.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Klatka z fotobudki nr 4', from: 'Fotobudka', date: '13.12.1986', body:
`Cała wasza piątka wciśnięta na jeden stołek. Łokieć Danny’ego tkwi w twoim uchu. Nikt nie patrzy w obiektyw. Wszyscy patrzą na siebie nawzajem.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'Pasek zdjęć, jeszcze ciepły', from: 'Fotobudka', date: '13.12.1986', body:
`Cztery klatki, jeden pasek. Na odwrocie pięć podpisów i linijka okrągłym pismem Rosie:

„PRZYJACIELE NA ZAWSZE. NAWET JAK BĘDZIEMY STARZY I NUDNI.
NAWET JAK SIĘ WYPROWADZIMY.
NAWET JAK.
— Starlight Five”

Pamiętasz, kto zatrzymał ten pasek. Toby. W pudełku po zapalniczce.` },
      mall_lists: { kind: 'note', title: 'Pięć list do Mikołaja na jednej kartce z zeszytu', from: 'Starlight Five', date: 'Grudzień 1986', body:
`DANNY: praca dla mojego taty. (i deskorolka)
ROSIE: prawdziwy mikrofon. czyste kasety (100)
NELL: Star Rangers nr 12. żeby Theo już nigdy nie bał się wody
TOBY: latarka, co się nigdy nie wyczerpie. i Sam bez złości o byle co
SAM: poziom 256

(Życzenie z imieniem SAM ktoś skreślił i dopisał pod spodem, ręką Toby’ego: „zdobędziemy go razem”)` },
      mall_receipt: { kind: 'note', title: 'Paragon zaklinowany w skrzynce z płytami', from: 'Spins Records', date: '13.12.86 15:41', body:
`CZYSTA KASETA KEYTONE C-90 x10 ....... $14.90
BIG BAND CHRISTMAS (LP używany) ...... $1.00
RAZEM ................................ $15.90
GOTÓWKA .............................. $16.00
RESZTA ............................... $0.10

Na odwrocie: „Strona A: piosenki na teraz. Strona B: na potem. — R.”` },
      mall_guard: { kind: 'note', title: 'Dziennik ochroniarza', from: 'Ochrona Harlow Mall', date: '13 grudnia 1986', body:
`14:20 — Piątka dzieci przy fontannie rzuca monety. Kazałem przestać. Przestały. Potem zaczęły znowu. Odpuściłem. Są święta.

16:05 — Ta sama piątka w fotobudce. Budka się zacięła. Dzieci same ją naprawiły (duży miał śrubokręt). Nie pytałem.

17:30 — Najmniejszy się zgubił. Znaleziony, jak płakał przy fontannie. Pozostała czwórka przybiegła z czterech stron. Wszyscy się ściskali. Zapisuję, bo to było miłe.` },
      mall_kiosk: { kind: 'note', title: 'Ulotka na kiosku Starlight Jr.', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
Salon gier Starlight przyjeżdża do centrum handlowego!
3 automaty • 25 ¢ • Otwarte w weekendy

„Każde dziecko zasługuje na rekord.” — Walt, właściciel

(W rogu przyklejony do szyldu stary rysunek kredkami: okrągły pomarańczowy stworek z rogami i szerokim uśmiechem, na krótkich nóżkach. Podpisano: LIL.)` },
      mall_walt: { kind: 'diary', title: 'Dziennik Walta, rozmazana strona', from: 'Walt', date: 'W środku', body:
`Centrum handlowe. Miałem tu kiosk. Przykleiłem stary rysunek Lily na szyldzie. Chompy, z nóżkami.

Tamtej zimy ta piątka przychodziła w każdą sobotę. Ten głośny, ta od kaset, ta cicha w okularach, mały z zapalniczką i ktoś, kto wszędzie z nim chodzi.

Ten ktoś. Nie pamiętam imienia. Zaczyna się na S.

To ważne. Nie wiem, dlaczego to ważne.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'Rysunek przyklejony wewnątrz kiosku Starlight Jr.', from: 'Lily, 8 lat', date: 'Grudzień 1982', body:
`Kredki świecowe. Wielka choinka na Front Street. U jej stóp okrągły pomarańczowy stworek z rogami i nogami trzyma za rękę małą dziewczynkę. Śnieg pada niebieskimi kropkami.

TATA MÓWI ŻE KIEDYŚ W KAŻDYM MIEŚCIE BĘDZIE STARLIGHT.
NAWET MALUTKI W CENTRUM HANDLOWYM.
(NARYSOWAŁAM CHOMPY’EGO) (TATA MÓWI ŻE GO WYMYŚLIŁAM)` },
      mall_tape: { kind: 'tape', title: 'Taśma: „Świąteczne życzenia”', from: 'Magnetofon Rosie', date: '13 grudnia 1986', body:
`[Kliknięcie. Gwar strefy restauracyjnej, świąteczna muzyka, fontanna.]

ROSIE: Tu Radio Rosie, na żywo ze strefy restauracyjnej, ze świątecznymi życzeniami dla… nas z przyszłości. Dawaj.

DANNY: Danny z przyszłości, lepiej, żebyś był bogaty.

NELL: Eee. Nell z przyszłości. Mam nadzieję, że dalej przyjaźnisz się z tymi idiotami.

TOBY: Toby z przyszłości, pewnie jesteś wyższy. Nareszcie.

SAM: Sam z przyszłości… nie zapomnij o tym.

ROSIE: Ckliwe, Sam.

SAM: Cicho, są święta.

[Wszyscy się śmieją. Komuś spada taca.]

ROSIE: Radio Rosie kończy nadawanie. Wesołych świąt, Harlow.

[Kliknięcie.]` },
    },
    obj: {
      mall_frames: 'Znajdź klatki z paska zdjęć ({n}/4)',
      mall_booth: 'Wrzuć klatki do fotobudki',
      mall_leave: 'Wyjdź drzwiami centrum handlowego',
    },
    mono: {
      mall_start: 'Centrum handlowe. Precle i choinka. Tu było mi dobrze. Wyleciało mi to z głowy.',
      mall_frame1: 'Danny i Rosie. Zawsze udawał, że się nie bawi.',
      mall_frame2: 'Nell i Toby. Nigdy nie uśmiechała się na zdjęciach. Na tym tak.',
      mall_frame3: 'Ja i Toby. Ta sama mina. Zawsze robiliśmy tę samą minę.',
      mall_frame4: 'Cała piątka na jednym stołku.',
      mall_strip: 'Zatrzymał go. W pudełku po zapalniczce. Zatrzymał.',
      mall_mannequin: 'Ten manekin patrzył w okno. Teraz patrzy na mnie.',
    },
    lines: {
      mall_boothUse: 'Wrzuć klatki do fotobudki',
      mall_boothLook: 'Fotobudka (4 pozy 1 $)',
      mall_boothNeed: 'Budka buczy. Brakuje jeszcze {n}.',
    },
    radio: {
      mall_start: [
        ['eddie', 'Centrum handlowe. Wszyscy byli tu tacy szczęśliwi, Sam. Każde wspomnienie z tego miejsca jest ciepłe.'],
        ['eddie', 'Właśnie dlatego gra tak łatwo się ich trzyma.'],
      ],
      mall_mannequin: [
        ['eddie', 'Nie mrugaj. Mówię serio. W razie czego idź tyłem.'],
      ],
      mall_frames: [
        ['eddie', 'Wszystkie cztery. Budka jest przy strefie restauracyjnej.'],
      ],
      mall_booth: [
        ['eddie', '…Starlight Five. Tak was nazywał Walt. Teraz sobie przypominam.'],
        ['eddie', 'Nie przywiązuj się do tego za bardzo, Sam. To echa. Gra je odtwarza, żeby cię tu zatrzymać.'],
        ['sam', 'To ci się właśnie przydarzyło?'],
        ['eddie', '…Drzwi są otwarte. Idź.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
