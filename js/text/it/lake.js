/* Italiano — Capitolo 9: Il ghiaccio (lago Ostra) e i tre finali. Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      lake: {
        name: 'CAPITOLO 9', title: 'Il ghiaccio', place: 'Lago Ostra',
        intro: 'Domenica 14 gennaio 1979, 15.40.\n\nLa casa della nonna, sulla riva. La stufa è accesa e la radio è accesa. Sul lago i ragazzi grandi sono alle capanne da pesca, e la neve arriva da nord.\n\nWren è là fuori, da qualche parte.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'La radio, a basso volume, sul tavolo', from: 'Meteo per la regione dei laghi', date: 'Domenica 14 gennaio 1979, 15.30', body:
`...rovesci di neve nel pomeriggio, che dalle quattro circa diventeranno nevicate intense, con forti venti da nord e accumuli. Dopo il tramonto visibilità quasi nulla in campo aperto e sui laghi.

Il ghiaccio del lago Ostra viene segnalato come non sicuro sopra il vecchio alveo del fiume, sul lato nord-ovest. Si prega la popolazione di non avventurarsi affatto sul ghiaccio in quella zona.

E ora il notiziario delle tre e mezza...` },
      lake_granNote: { kind: 'note', title: 'Un biglietto sul tavolo della cucina', from: 'La nonna', date: 'Domenica', body:
`Ada —

Sono salita alla fattoria a prendere il latte. Torno alle quattro e mezza.
Wren NON va sul ghiaccio. Tienila dentro con te.
Ci sono le brioche nella latta, una a testa.

La nonna` },
      lake_wrenNote: { kind: 'note', title: 'Un foglio attaccato alla porta delle bambine', from: 'Wren', date: '(senza data)', body:
`ADA
VENGO ANCH’IO

(Sotto, un uccellino rosso disegnato che vola dietro a un uccello più grande con una striscia verde intorno al collo.)` },
      lake_diary: { kind: 'note', title: 'Un diario sotto il cuscino di sopra', from: 'Ada, 12 anni', date: '14 gen. 1979', body:
`Sunna e Per e tutti gli altri saranno alle capanne dopo pranzo. SUNNA MI HA INVITATA.

Sunna ha detto porta il tuo uccellino, la buttiamo nel buco. Ah ah.

NON la porto. Mi segue dappertutto come un cane e poi piange e tutti guardano me. Per una volta voglio andare da qualche parte senza di lei.` },
      lake_search: { kind: 'report', title: 'Un rapporto piegato nella rimessa delle barche', from: 'Polizia del distretto di Ostra', date: 'Gennaio 1979', body:
`Minore scomparsa: Wren LIND, 7 anni, casa Lind, riva sud, lago Ostra.

14.1, 16.50. Scomparsa denunciata dalla nonna, sig.ra Ingrid Lind, al rientro a casa.
La sorella della minore, Ada Lind, 12 anni, dichiara che Wren non è uscita con lei sul ghiaccio e che la credeva a casa.
Ricerche: la casa, gli annessi, i boschi a sud e la strada, per tutta la notte. Nevicata intensa.
16.1, 11.20. Trovata sul ghiaccio una manopola rossa da bambina (mano destra), circa 300 metri a nord-ovest delle capanne da pesca, sopra il vecchio alveo del fiume. Ghiaccio non sicuro. Immersioni impossibili fino al disgelo.` },
      lake_hutNote: { kind: 'note', title: 'Un pacchetto di sigarette, scritto sopra', from: '(i ragazzi grandi)', date: '14.1.79', body:
`PER + SUNNA

L’UCCELLINO DI ADA L’HA SEGUITA DI NUOVO
CIP CIP

(il disegno di un uccello con la faccia triste e una freccia che punta fuori dalla capanna)` },
      lake_tape: { kind: 'transcript', title: 'Una cassetta nel registratore: «PER ADA»', from: 'Ingrid Lind', date: 'Dicembre 1995', body:
`[un clic; un orologio da cucina che ticchetta; qualcuno che si sistema su una sedia]

Ada. Sono la nonna. Dicono che non sto bene, quindi lo dico sul nastro, perché non sono mai riuscita a dirtelo in faccia.

Ho sempre saputo che l’avevi vista sul ghiaccio. L’ho capito dalla tua faccia quella sera. Non te l’ho mai chiesto, perché avevo paura di cosa ti avrebbe fatto dirlo. Mi sono detta che era bontà.

Non lo era. Le donne di questa famiglia tacciono e la chiamano bontà. Mia madre aspettò che mio fratello andasse a prenderla, e lui non andò mai, e nessuno lo disse ad alta voce, nemmeno una volta.

Dillo, bambina mia. Dillo ad alta voce, a qualcuno. E poi vai a cercarla.

[l’orologio; un lungo respiro; il nastro gira fino alla fine]` },
    },
    items: {
      mitten: { name: 'Manopola rossa', desc: 'Una manopola da bambina, rossa, mano sinistra. È arrivata nel pacco. L’altra è stata trovata sul ghiaccio.' },
    },
    obj: {
      lake_start: 'Trova Wren',
      lake_trail: 'Segui le sue impronte fin sul ghiaccio',
      lake_huts: 'Vai alle capanne, dov’erano i ragazzi grandi',
      lake_remember: 'Ricorda',
      lake_thin: 'Esci sul ghiaccio sottile sopra il vecchio fiume',
      lake_say: 'Diglielo',
    },
    mono: {
      lake_start: 'La casa della nonna. La stufa è accesa. La radio è accesa. È il millenovecentosettantanove.',
      lake_empty: 'Non c’è nessuno. La nonna è andata a prendere il latte. Gli stivali di Wren non sono vicino alla porta.',
      lake_note: '«Tienila dentro con te». Non l’ho fatto.',
      lake_wrenNote: 'Scriveva sempre il mio nome per primo.',
      lake_out: 'Piccole impronte nella neve. Giù fino alla riva. Fuori sul ghiaccio.',
      lake_ice: 'Il ghiaccio canta. Lo fa quando fa freddo.',
      lake_wren: 'Rosso. Là fuori. Che si allontana.',
      lake_huts: 'Le capanne. Lì dentro qualcuno ride.',
      lake_laughers: 'Ridono di me. Ridevano di me anche allora.',
      lake_hole: 'Il buco nel ghiaccio. Ero qui quando l’ho sentito.',
      lake_remember1: 'È entrata dietro di me. La faccia tutta rosa per il freddo. «Ada, sono venuta anch’io».',
      lake_remember2: 'E mi guardavano tutti. E io le ho tolto la mano dalla mia manica e le ho detto, sparisci, Wren. Torna a casa. Sparisci.',
      lake_remember3: 'È andata. Dalla parte sbagliata. Con la neve non si vedeva la riva.',
      lake_remember4: 'E poi il ghiaccio ha fatto un rumore. Lungo. Là fuori, sulla sinistra. E io non mi sono girata, perché mi stavano guardando.',
      lake_storm: 'Arriva la neve. Non vedo la casa.',
      lake_thin: 'Qui il ghiaccio è scuro. Sottile. Cammina. Non correre.',
      lake_hush: 'Qualcosa nella neve dietro di me. Una sciarpa verde.',
      lake_quiet: 'È diventato tutto così silenzioso. Non sento i miei passi.',
      lake_found: 'Eccola.',
      lake_tape: 'La voce della nonna. Ho questa cassetta nell’armadietto da due anni e non l’ho mai ascoltata.',
      lake_gone: 'Le tracce continuano, verso sinistra. Verso il fiume.',
    },
    lines: {
      lake_radioPrompt: 'Ascolta la radio',
      lake_tapePrompt: 'Ascolta la cassetta',
      lake_holePrompt: 'Guarda dentro il buco',
      lake_choiceTitle: 'Wren è in piedi sul ghiaccio sottile, girata di spalle.',
      lake_sayIt: 'Dillo. Tutto.',
      lake_vanished: '«È sparita e basta. Nessuno ha visto niente».',
      lake_say1: '«Ti ho detto di sparire».',
      lake_say2: '«Sei andata dalla parte sbagliata, e ho sentito il ghiaccio e non mi sono girata».',
      lake_say3: '«Ho detto alla nonna che non eri mai uscita. Ho lasciato che ti cercassero nel bosco».',
      lake_give: 'Dalle la manopola',
    },
    radio: {
      lake_otto1: [
        ['radio', '[neve sul fruscio, molto lieve]'],
        ['otto', 'Nove ad Ada. La sento appena. Questo non è il mio scaffale. Non lo vedo per niente. Credo sia il suo.'],
        ['otto', 'Qualunque cosa trovi là fuori, la dica a lei. Non a me.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Qualcosa su questo scaffale toglie il suono a ogni cosa. Non lo lasci avvicinare abbastanza da togliere il suo.'],
      ],
    },
    recap: {
      lake: 'Lago Ostra, 14 gennaio 1979. Avevo dodici anni. Wren mi ha seguita sul ghiaccio e dentro la capanna dov’erano i ragazzi grandi, e io le ho detto di sparire. Nella neve è andata dalla parte sbagliata, sopra il vecchio fiume dove il ghiaccio è sottile, e io l’ho sentito, e non mi sono girata. Poi sono tornata a casa e ho detto alla nonna che non era mai uscita.',
    },
    endings: {
      thaw: {
        title: 'DISGELO', subtitle: 'La verità, detta ad alta voce',
        lines: [
          'Lo dico. Tutto. Le parole mi escono come qualcosa che ho tenuto in bocca per diciannove anni.',
          'Wren si gira. Ha la faccia rosa per il freddo. Mi guarda come mi ha sempre guardata, come se fossi più alta di quanto sono.',
          'Le do la manopola. Se la mette. Alza tutte e due le mani per mostrarmele: due manopole rosse, di nuovo un paio.',
          'Poi si volta e torna a casa sul ghiaccio, verso le luci della casa, e non si guarda indietro. Va bene così. Adesso sa la strada.',
          'Alle sei e dieci del mattino mi sveglio allo sportello del Deposito 9, con il pacco aperto davanti. Ha smesso di piovere.',
          'Scrivo RITIRATO sulla richiesta 256. Telefono alla polizia di Halvard per un caso di diciannove anni fa. Poi tiro fuori dall’armadietto la cassetta della nonna e l’ascolto, fino alla fine.',
          'Ad aprile, quando il ghiaccio se ne va, i sommozzatori perlustrano il vecchio alveo del fiume.',
          'Wren è sepolta accanto a nostra nonna, sulla collina sopra il lago, da dove lo si vede tutto.',
          'Nel vassoio del Deposito 9, quella prima mattina, c’era un secondo scontrino, scritto da una mano vecchia e tremante che non conoscevo ancora: RITIRATO. FINALMENTE. — A.',
        ],
      },
      snowfall: {
        title: 'NEVICATA', subtitle: 'Quella che è rimasta',
        lines: [
          '«È sparita e basta», dico. «Nessuno ha visto niente».',
          'Wren non si gira. Dietro di me la cosa con la sciarpa verde è vicinissima. Comincia a srotolare la sciarpa, giro dopo giro, finché non resta niente da srotolare.',
          'Sotto c’è la mia stessa faccia, a dodici anni, con il freddo nelle guance.',
          'La neve cade sul lago e copre il ghiaccio scuro e la figura rossa sopra e le impronte, le mie e le sue, finché non resta niente da vedere.',
          'Da qualche parte molto in basso, un appunto sale lungo una posta pneumatica con una calligrafia nuova. IMPIEGATA NOTTURNA, LIVELLO 256. PRIMO TURNO.',
          'Sul canale nove, piano piano: «Benvenuta nel turno di notte, Ada».',
        ],
      },
      morning: {
        title: 'MATTINA', subtitle: 'Tutti quelli che si erano perduti',
        lines: [
          'Lo dico. Tutto. Wren si gira. Le do la manopola e lei alza tutte e due le mani per mostrarmele, di nuovo un paio, e torna a casa sul ghiaccio, verso le luci della casa.',
          'Alle sei e dieci del mattino mi sveglio allo sportello del Deposito 9, con il pacco aperto davanti. Scrivo RITIRATO sulla richiesta 256.',
          'Alle sei e un quarto, il montacarichi in fondo all’archivio si apre da solo.',
          'Ne esce un vecchio con un cappotto fuori moda da trentaquattro anni, un distintivo d’ottone in mano, come se gliel’avessero appena dato.',
          '«Brandt», dice. «Otto. Adesso mi ricordo». Guarda l’archivio, gli scaffali, me. «Che anno è?».',
          'Glielo dico. Ci pensa a lungo. E poi ride, una risata vera, la prima che gli sento senza fruscio.',
          'Ad aprile, quando il ghiaccio se ne va, i sommozzatori perlustrano il vecchio alveo del fiume. Wren è sepolta accanto a nostra nonna, sulla collina sopra il lago.',
          'Nel vassoio del Deposito 9, quella mattina, c’è un secondo scontrino, scritto da una mano vecchia e tremante che conosco benissimo: RITIRATO. FINALMENTE. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
