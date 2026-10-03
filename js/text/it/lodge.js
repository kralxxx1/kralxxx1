/* Italiano — Capitolo 5: Bianco totale (Berghotel Weisshorn). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      lodge: {
        name: 'CAPITOLO 5', title: 'Bianco totale', place: 'Berghotel Weisshorn, a quota 2914',
        intro: 'Lunedì 28 febbraio 1983, dopo il tramonto. Bufera sulla montagna.\n\nQuella mattina la valle ha mandato un telegramma all’albergo in cima alla funivia. Nel pomeriggio cinque ospiti e il loro maestro di sci erano sotto la neve alla stazione a monte. L’albergo dice che non è arrivato nessun telegramma.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'Il libro degli ospiti', from: 'Berghotel Weisshorn', date: 'Febbraio 1983', body:
`26.2.  Fam. Aebi (3)          camera 4
26.2.  Sig. e Sig.ra Coulter  camera 2
27.2.  R. Fankhauser          camera 1
27.2.  L. Brunner (scuola di sci, personale)

Partenze:
Sig.ra Coulter — 2.3., con la slitta della valle.
(Tutti gli altri nomi qui sopra sono stati cancellati il 28.2. con un solo tratto netto, con un’altra penna.)` },
      lodge_weather: { kind: 'report', title: 'Il quaderno del meteo sulla scrivania', from: 'G. Imhof', date: '28 febbraio 1983', body:
`06.30  Nevica forte dalle 3. Vento NO 60.
07.10  Linea telefonica interrotta (come al solito).
08.15  Salita la slitta postale dalla stazione. Posta, latte e il pane.
09.20  Funivia in funzione. Scuola di sci su alle 9.30 come ogni giorno. Settimana piena, tutte le camere occupate, la prima settimana piena dal 1979.

(La riga delle 08.15 è stata ripassata due volte a matita, come se qualcuno si fosse fermato lì.)` },
      lodge_telegram: { kind: 'telegram', title: 'Un telegramma, bruciato ai bordi', from: 'Stazione a valle, servizio valanghe', date: '28.2.83 07.55', body:
`A BERGHOTEL WEISSHORN STOP
PERICOLO VALANGHE 5 STOP PENDII SUPERIORI CARICHI STOP
CHIUDERE OGGI PISTE ALTE E STAZIONE A MONTE STOP
VIETATO SCIARE SOPRA L’ALBERGO STOP
CONFERMARE A STRETTO GIRO STOP
SERVIZIO VALANGHE

(Sul retro, con grafia accurata: «Ricevuto 8.15. — G.I.». Il resto è fuliggine. Avrebbe dovuto bruciare. Non è bruciato.)` },
      lodge_menu: { kind: 'notice', title: 'Il menu della colazione su un tavolo', from: 'Berghotel Weisshorn', body:
`LUNEDÌ 28 FEBBRAIO
Caffè — Tè — Cioccolata calda
Birchermüesli
Rösti con uovo all’occhio di bue
Pane della valle, burro, miele delle api dell’albergo

Stasera: fonduta in terrazza se il tempo lo permette!
La scuola di sci si ritrova alle 9.30 alla stazione a monte. Leo dice: portate gli occhiali.` },
      lodge_postcard: { kind: 'card', title: 'Una cartolina sul comodino, camera 1', from: 'Ruth Fankhauser', body:
`(Una foto dell’albergo al sole, con una cabina della funivia che sale accanto.)

Cara Hanni,
nevica come alla fine del mondo. Dicono che la discesa dalla cima sia la più bella della valle, e domattina saliamo, bufera o no. Leo, il maestro, ride di tutto. Sono felice. Ti chiamo domenica.
R.

(Affrancata, mai spedita.)` },
      lodge_roomNote: { kind: 'note', title: 'Un biglietto di una bambina nella camera 4', from: 'Lisa Aebi, 10 anni', body:
`La mamma dice che se c’è troppo vento possiamo restare dentro e giocare a carte con la signora Imhof.
La signora Imhof dice che quassù il vento non è niente.
Le ho chiesto se la neve può cadere giù dalla montagna. Ha detto non questa settimana.` },
      lodge_school: { kind: 'notice', title: 'Foglio delle iscrizioni della scuola di sci', from: 'L. Brunner', date: '28.2.83', body:
`SCUOLA DI SCI — STAZIONE A MONTE 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Maestro: Leo Brunner
(Sotto, a matita:) Greta dice che dalla valle è tutto a posto. Bene. Si parte.` },
      lodge_kitchenNote: { kind: 'note', title: 'Appuntato accanto alla cella frigorifera', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
Se chiama la valle o la slitta porta su qualcosa dal servizio valanghe, arriva a ME, non agli ospiti e non a Leo. Ci penso io.
Una settimana piena. Ci serve questa settimana.
La chiave principale della funivia è al gancio vicino alla cella. Non la prende nessuno tranne me o te.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'Dall’inchiesta, un ritaglio di giornale', from: 'Giornale della valle', date: 'Aprile 1983', body:
`WEISSHORN: L’ALBERGATRICE DICE DI NON AVER RICEVUTO ALCUN AVVISO

La proprietaria del Berghotel Weisshorn, la signora Greta Imhof (52 anni), ha dichiarato ieri davanti alla commissione d’inchiesta che il 28 febbraio nessun avviso di valanga è arrivato all’albergo. La linea telefonica era interrotta dalle 7 e «con la slitta postale non è salito altro che la posta», ha detto.

Il servizio valanghe sostiene che un telegramma è stato spedito con la slitta delle 8.15. In albergo non è stata trovata nessuna copia.

Cinque ospiti e il maestro di sci Leo Brunner (29 anni) sono morti quando i pendii superiori si sono staccati alle 14.40.` },
    },
    items: {
      telegram: { name: 'Telegramma', desc: 'Bruciato ai bordi, e ancora leggibile. Ricevuto 8.15.' },
      masterKey: { name: 'Chiave principale', desc: 'Una chiave pesante con un portachiavi di legno: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Mettiti al riparo dalla bufera',
      lodge_find: 'Scopri cos’è successo al Weisshorn',
      lodge_telegram: 'Trova il telegramma che non è mai arrivato',
      lodge_pin: 'Riappendi il telegramma alla bacheca della reception',
      lodge_key: 'Prendi la chiave principale dalla cucina',
      lodge_power: 'Avvia la funivia nella sala macchine',
      lodge_board: 'Sali sulla cabina',
    },
    mono: {
      lodge_start: 'Non vedo nemmeno la mia mano. C’è una luce. Un edificio.',
      lodge_inside: 'Fa caldo. C’è un fuoco acceso e nessuno che lo curi.',
      lodge_cold: 'Ho freddissimo. Devo entrare.',
      lodge_colder: 'Non mi sento più le dita.',
      lodge_warm: 'Caldo. Oh, così va meglio.',
      lodge_frozen: 'Sono ai loro tavoli. Bianchi da capo a piedi. Nessuno si muove da tanto tempo.',
      lodge_frozenMove: 'Quello vicino alla finestra si è mosso. Quando mi sono avvicinata al fuoco, si è mosso.',
      lodge_board: 'Una puntina, e l’angolo strappato di qualcosa che era appeso qui.',
      lodge_book: 'Sei di loro cancellati il ventotto. Tutti con la stessa penna, tutti in una volta.',
      lodge_stove: 'Cenere fredda. E dentro qualcosa che non è bruciato.',
      lodge_telegram: '«Chiudere piste alte». Ce l’aveva alle otto e un quarto. Sono saliti alle nove e mezza.',
      lodge_pinned: 'Ecco. Dove tutti avrebbero potuto leggerlo.',
      lodge_claimed: 'Il vento è calato. Solo per un respiro. Come se la montagna ascoltasse.',
      lodge_stationLit: 'Luci, laggiù oltre la neve. La stazione della funivia.',
      lodge_key: 'La chiave principale.',
      lodge_cook: 'C’è qualcuno in cucina. Un uomo grosso. Con qualcosa in mano.',
      lodge_prints: 'Impronte. Che si formano. Adesso, davanti a me.',
      lodge_power: 'Va. La cabina è illuminata.',
      lodge_noKey: 'Serve una chiave.',
      lodge_notYet: 'Il motore non parte. Non finché questo posto mi tiene ancora.',
      lodge_boarding: 'Porte. Chiudetevi. Chiudetevi, vi prego.',
      lodge_away: 'Ci muoviamo. Giù, nel nulla.',
      lodge_office: 'Il suo ufficio. Lo sportello della stufa penzola aperto.',
      lodge_station: 'La stazione. Il cavo esce nel bianco e semplicemente smette di esserci.',
    },
    lines: {
      lodge_bookPrompt: 'Il libro degli ospiti',
      lodge_boardPrompt: 'La bacheca dei telegrammi',
      lodge_boardPin: 'Appendi il telegramma',
      lodge_stovePrompt: 'Tiralo fuori dalla cenere (tieni premuto)',
      lodge_controlPrompt: 'Avvia la funivia (tieni premuto)',
      lodge_controlLook: 'Il quadro di comando',
      lodge_gondolaPrompt: 'Sali sulla cabina',
      lodge_gondolaLook: 'La cabina',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[vento sopra il fruscio]'],
        ['otto', 'Nove ad Ada. La sento fortissimo. È una bufera? Allora il Weisshorn. Ho sei paia di sci sul mio scaffale e un servizio da fonduta mai usato.'],
        ['ada', 'Qui c’è gente. Congelata ai tavoli.'],
        ['otto', 'Allora non stia vicino al fuoco. Vengono verso il calore. E fuori, ascolti i passi che non sono i suoi.'],
      ],
      lodge_otto2: [
        ['otto', 'Qualcosa ha lasciato il mio scaffale. Un telegramma. Adesso è al posto giusto. Sono quasi sicuro di aver sentito degli sci.'],
      ],
    },
    recap: {
      lodge: 'Il Weisshorn, 28 febbraio 1983. Greta Imhof ebbe in mano l’avviso di valanga alle otto e un quarto, lo mise nella stufa perché la settimana piena non venisse annullata, e mandò su la scuola di sci alle nove e mezza. Cinque ospiti e il loro maestro morirono alla stazione a monte; lei disse all’inchiesta che non era arrivato nessun avviso. Il telegramma non è mai bruciato. L’ho appeso dove tutti potevano leggerlo, e la funivia mi ha portata giù, fuori dalla bufera.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
