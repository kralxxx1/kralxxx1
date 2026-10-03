/* Italiano — Capitolo 1: Non ritirato (Livello 256, il Sotto). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      under: {
        name: 'CAPITOLO 1', title: 'Non ritirato', place: 'Livello 256',
        intro: 'L’ascensore è sceso a lungo. Più a lungo di quanto sia profonda la stazione. Più a lungo di quanto sia vecchia la città.\n\nLe porte si sono aperte su stanze gialle che sanno di moquette bagnata e di ombrelli altrui. Da qualche parte, lì dentro, un ronzio. Da qualche parte, lì dentro, tutto ciò che nessuno è tornato a prendere.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Un’etichetta da bagaglio sulla moquette', body:
`SE TROVATO, SI PREGA DI RESTITUIRE A:
M. STRAND, 8 ANNI
CINEMA ALL’APERTO PINEWOOD, FILA 5

(Una grafia da bambino. Lo spago è stato rosicchiato.)` },
      under_umbrella: { kind: 'card', title: 'Un’etichetta legata a un ombrello', from: 'O.B.', body:
`Oggetto 41.207.
Un ombrello, nero, da uomo.
Lasciato con rammarico.

Oggetto 41.208.
Un guanto, sinistro. Ancora di nessuno.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'Una lettera nella valigia di una ragazza', from: 'Mamma', date: '12 dicembre 1990', body:
`Lina —

Quando avrai comprato il biglietto, tienilo nella tasca INTERNA del cappotto. Non in quella fuori. Non tirarlo fuori per guardarlo in treno, sai come sei fatta.

Nordvik è il capolinea, alle sei e un quarto. Papà sarà sul binario con la macchina, qualunque cosa tu dica del buio. Non scendere da nessuna parte prima.

Non lasciare che nessuno ti dica che su quel treno non ci devi stare.

Un bacio, Mamma` },
      under_chalk: { kind: 'wall', title: 'Gesso sul muro', body:
`QUELLI PIATTI ESCONO DAL MURO
QUANDO TI GIRI
QUINDI NON GIRARTI
— O.` },
      under_otto1: { kind: 'diary', title: 'Il quaderno da campo di Otto', from: 'Otto Brandt', body:
`Ho smesso di contare i giorni. Conto invece gli oggetti. Oggi 41.212: un cappello, un apparecchio acustico, un guinzaglio senza cane.

Il walkie-talkie funziona sul canale nove. Nessuno risponde. Parlo lo stesso. Tiene la voce in esercizio.

Stamattina è arrivato un appunto attraverso il pavimento. Firmato A. «Arriva qualcuno. Sii gentile con lei; non ti crederà».

Io sono sempre gentile. È credere che alla gente riesce difficile.` },
      under_list: { kind: 'note', title: 'Regole del piano di smistamento (provvisorie)', from: 'O.B.', body:
`1. Le luci perdute vanno tenute, non mangiate. Qualcosa quaggiù non è d’accordo.
2. Quando il ronzio si fa più grave e le lampade balbettano, smetti di camminare. Sente. Non vede.
3. Della carta da parati non ci si fida.
4. La porta dell’Indice prende quattro luci. Io non ne ho mai trovate più di tre insieme.
5. Non archiviare te stesso.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Una pagina umida vicino all’acqua', from: 'O.B.', body:
`L’acqua di questa stanza è fredda e sa di lago. Ogni stanza quaggiù appartiene al pomeriggio peggiore di qualcuno.

Questa appartiene a qualcuno che non ho ancora conosciuto.` },
      under_index: { kind: 'wall', title: 'Scritto con lo stampino accanto alla porta', body:
`L’INDICE
TENERE PRONTA LA RICHIESTA` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Un disegno sotto un termosifone', from: 'Wren, 7 anni', body:
`Pastelli a cera. Una stanza gialla. Una grossa cosa rotonda con la bocca piena di denti. Sopra, in volo: un uccellino rosso.

Sotto:
MANGIA LE LUCI
L’UCCELLINO È PIÙ VELOCE` },
    },
    items: {},
    obj: {
      under_walkie: 'Trova una strada attraverso le stanze gialle',
      under_lights: 'Trova le luci perdute ({n}/4)',
      under_index: 'Porta quattro luci alla porta dell’Indice',
      under_leave: 'Attraversa la porta dell’Indice',
    },
    mono: {
      under_start: 'Questa non è la cantina. L’ascensore è sceso per quattro minuti. La stazione non è così profonda.',
      under_walkie: 'Un walkie-talkie, fissato con lo scotch sul canale nove. Qualcuno l’ha lasciato acceso.',
      under_light1: 'Una piccola lampada. Calda. Per un attimo tutto nel buio si è zittito, come se trattenesse il respiro.',
      under_light4: 'Quattro. Da qualche parte, all’altro capo del piano, qualcosa ha smesso di masticare.',
      under_indexSeen: 'L’INDICE. Quattro portalampade vuoti accanto alla porta.',
      under_wpSeen: 'Era nel muro. Era il muro. E si è mosso quando mi sono girata.',
      under_eaterSeen: 'Troppo grande per il corridoio. Pallido. Mastica.',
      under_humNear: 'Il ronzio si è fatto più grave. Le luci balbettano.',
    },
    lines: {
      under_slots: 'Quattro portalampade ({n}/4 luci)',
      under_place: 'Metti le luci nei portalampade',
      under_walkiePrompt: 'Prendi il walkie-talkie',
      under_lightPrompt: 'Prendi la luce perduta',
    },
    radio: {
      under_otto1: [
        ['radio', '[fruscio]'],
        ['otto', '...nove. Qui nove. C’è qualcuno in linea? La sento respirare. Non è una critica.'],
        ['ada', 'Chi parla?'],
        ['otto', 'Brandt. Deposito 9, sportello notturno. E lei è sul mio piano di smistamento senza scontrino.'],
        ['ada', 'Otto Brandt? Lei è scomparso nel 1964.'],
        ['otto', '1964. È già... no. Me lo dirà dopo. Come si chiama, collega?'],
        ['ada', 'Ada. Ada Lind. Ho il suo posto.'],
        ['otto', 'Allora ha la mia solidarietà. Mi ascolti, Ada Lind. Qui arriva tutto ciò che nessuno è tornato a prendere. È molto grande, e non è vuoto.'],
        ['otto', 'C’è una porta. La porta dell’Indice. Vuole quattro delle luci perdute, piccole lampade, le riconoscerà. Ne porti quattro e si apre.'],
        ['ada', 'E oltre la porta?'],
        ['otto', 'Altri piani. Io li chiamo scaffali. Un appunto diceva che sarebbe arrivata. Firmato A. Conosce una A.?'],
        ['ada', '...No.'],
        ['otto', 'Nemmeno io. Tenga aperto il canale.'],
      ],
      under_lights: [
        ['otto', 'Ne ha trovata una. La tenga vicina. Qualcosa quaggiù le mangia, e finché ne tiene in mano una appena presa, ha paura di lei.'],
        ['ada', 'Per quanto?'],
        ['otto', 'Non molto. Quaggiù niente ha paura a lungo.'],
      ],
      under_wallpaper: [
        ['otto', 'Ha già visto gli uomini piatti? Nella carta da parati. Si staccano quando lei volta loro le spalle.'],
        ['ada', 'E quando li guardo?'],
        ['otto', 'Allora sono carta da parati. Carta da parati molto paziente.'],
      ],
      under_hum: [
        ['otto', 'Se il ronzio si fa più grave e le lampade balbettano, si fermi. Lì c’è qualcosa in piedi. Non la vede. Sente le sue scarpe.'],
        ['ada', 'Che cos’è?'],
        ['otto', 'L’ho archiviato sotto «varie». È una categoria ampia.'],
      ],
      under_eater: [
        ['otto', 'Ada. Quel rumore. È sveglio.'],
        ['otto', 'Il Divoratore. La cosa più vecchia quaggiù. Mangia ciò che nessuno vuole. Non gli lasci decidere che si tratta di lei. Corra alla porta dell’Indice. Prenda gli angoli; negli angoli è lento.'],
      ],
      under_index: [
        ['otto', 'La porta dell’Indice. Quattro portalampade. Io non ho mai trovato più di tre luci insieme. Forse lei è più fortunata.'],
      ],
      under_open: [
        ['otto', 'È aperta. Non l’avevo mai vista aperta.'],
        ['ada', 'Venga con me.'],
        ['otto', 'Non posso. Non so perché. Credo di essere archiviato su questo piano. Vada. Sarò sul nove.'],
        ['otto', 'In fondo a ogni scaffale, laggiù, c’è una bugia, Ada. Cerchi la bugia.'],
      ],
      under_badge: [
        ['ada', 'Otto. Le ho portato una cosa sua. Dalla sua scrivania. La lascio nella porta.'],
        ['otto', '[un lungo silenzio]'],
        ['otto', 'O. Brandt. Otto. Era quello, il nome. L’avevo messo da qualche parte e avevo dimenticato dove.'],
        ['otto', 'Grazie, Ada. Lo lasci lì. Adesso saprò dov’è.'],
      ],
    },
    recap: {
      under: 'Livello 256: stanze gialle piene di cose che nessuno è tornato a prendere. Otto Brandt è vivo, laggiù, sul canale nove; crede che sia passato più o meno un anno. Ho dato quattro luci perdute alla porta dell’Indice mentre dietro di me si svegliava qualcosa di rotondo e molto vecchio.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
