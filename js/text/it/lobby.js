/* Italiano — Livello 0: modalità dimostrativa. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Modalità dimostrativa', place: 'Dentro lo schermo',
        intro: 'Un ronzio che si sente nei denti. Moquette bagnata. Pareti gialle che non finiscono mai. Lontano, un suono sentito diecimila volte dall’altoparlante di un cabinato: la sirena degli Spettri, che sale e scende.\n\nIl gioco aspettava un giocatore. Adesso ce l’ha.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Foglio attaccato al muro', from: 'Eddie', body:
`SE STAI LEGGENDO QUESTO:

1. Non correre, a meno che non abbia già notato la tua presenza. Correre fa rumore.
2. I cartelli EXIT mentono. Portano più dentro, non fuori.
3. Quando le luci tremolano, esci dal corridoio.
4. Le lanterne sono vere. Prendine una e tutto scappa da TE. Per un po’.
5. Lo Star Pop (la bibita alla ciliegia) ferma il tremore. Non chiedermi perché.
6. Al mio accampamento c’è un walkie-talkie. Canale 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'Il diario d’accampamento di Eddie', from: 'Eddie', date: '12 giugno 1993 (?)', body:
`Accampamento 1.

Passato attraverso lo schermo alle 23:40. Atterrato di faccia. La moquette è fradicia ma non gocciola niente. Qui non gocciola mai niente.

Niente Walt. Trovata la sua torcia, e la sua calligrafia su un muro.

I walkie-talkie funzionano sul canale 7. Non risponde nessuno. Ne lascio uno qui per il prossimo idiota che segue un adulto dentro un videogioco.

Se sei tu: ciao. Scusa. Canale 7.` },
      lobby_walt1: { kind: 'diary', title: 'Una pagina del diario di Walt', from: 'Walt', date: 'Dentro, giorno 1', body:
`Giorno 1.

Giallo. Ronza come un reattore guasto. La moquette è bagnata.

Sento la sirena lontano, quella che suona quando gli Spettri escono dalla loro casa.

Sono qui. Avevo ragione. Che Dio mi aiuti, avevo ragione.

Danny. Rosie. Nell. Toby. Resistete. Sto arrivando.` },
      lobby_walt2: { kind: 'diary', title: 'Un’altra pagina del diario di Walt', from: 'Walt', date: 'Dentro, giorno 9 (?)', body:
`Giorno 9. O 90.

Ho sempre fame. Ci sono lattine di Star Pop dappertutto, quante ne stavano nella mia borsa frigo. Le ho bevute tutte. Non ricordo di averlo deciso.

Le lanterne sanno di monetine. Dopo averne inghiottita una, vedo più lontano.

La prima notte ho provato con la spina. Da solo. Qualcosa dentro di me ha fatto clic, come una moneta che cade.

Oggi ho visto il rosso. È scappato da me. Ho gridato il suo nome e si è fermato, per un secondo.

Adesso capisco. Quello con la bocca sono io.` },
      lobby_flyer: { kind: 'flyer', title: 'Un volantino piegato', from: 'Rosie', date: 'Aprile 1987', body:
`★ TOP SECRET ★
OPERAZIONE 256

QUANDO: giovedì 4/16, dopo la chiusura
MISSIONE: vedere cosa c’è oltre il kill screen

SQUADRA:
Danny — la chiave (NON dirlo a Walt)
Rosie — il piano + la merenda
Nell — la mappa dei percorsi degli Spettri
Toby — la torcia
Sam — la fortuna

TUTTI E CINQUE O NESSUNO.
DISTRUGGERE DOPO LA LETTURA!!!
(Toby, vuol dire: non tenerlo nel tuo fumetto.)` },
      lobby_exitwall: { kind: 'wall', title: 'Graffiato accanto alla porta EXIT', body:
`GLI EXIT MENTONO
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Scritto sopra le sedie', body:
`LE SEDIE ERANO GIÀ
GIRATE VERSO IL MURO
QUANDO SONO ARRIVATO
—W.` },
      lobby_puddle: { kind: 'note', title: 'Un biglietto umido vicino alla pozzanghera', from: 'Walt', body:
`L’acqua qui è tiepida e sa di cloro. Come la piscina comunale.

Nell dopo l’85 non si avvicinava più alla piscina. È sua, questa?

Ogni stanza qui dentro appartiene a qualcuno.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Un disegno infilato dietro una grata', from: 'Lily, 9 anni', body:
`Pastelli a cera. Un uomo grande coi baffi e una bambina con le trecce arancioni accanto a un cabinato piccolino. Sullo schermo: una creatura tonda e arancione e il numero 3190. La bambina ha tutte e due le braccia alzate.

IO E PAPÀ E LA MACCHINETTA.
HO FATTO 3190 PUNTI!!!
PAPÀ DICE CHE RESTA IN CLASSIFICA PER SEMPRE.` },
      lobby_tape: { kind: 'tape', title: 'Nastro: «Prova, prova»', from: 'Eddie', date: 'Dentro', body:
`[Clic. Respiro affannoso. Il ronzio.]

EDDIE: Prova, prova. Diario registrato, giorno… non lo so. Giorno qualcosa.

EDDIE: Se sei June: sto bene. Davvero. Trovo Walt, porto fuori i ragazzi, sono a casa prima del bambino. L’ho promesso, e io mantengo le promesse. Quasi sempre.

[Pausa.]

EDDIE: Se non sei June: canale sette. Non correre. E qualsiasi cosa tu faccia, non fargli sentire che mangi.

[Clic.]` },
    },
    obj: {
      lobby_explore: 'Trova una via d’uscita',
      lobby_pellets: 'Trova le lanterne ({n}/4)',
      lobby_insert: 'Metti le lanterne nel pannello accanto all’EXIT',
      lobby_leave: 'Attraversa la porta',
    },
    mono: {
      lobby_start: 'Dove… La moquette è bagnata. Il ronzio è dentro la mia testa.',
      lobby_exitSeen: 'EXIT. Quattro alloggiamenti rotondi accanto alla porta. Grandi come una lanterna.',
      lobby_firstPellet: 'Una lanterna. Calda in mano. Per un secondo tutto è diventato blu ed è scappato.',
      lobby_eaterHeard: 'Qualcosa mastica. Da qualche parte dietro i muri, qualcosa sta masticando.',
      lobby_eaterSeen: 'Qualcosa di pallido in fondo al corridoio. Tondo. Troppo grande per il corridoio. Sta masticando.',
      lobby_allPellets: 'Quattro lanterne. Adesso la porta.',
      lobby_radio: 'Un walkie-talkie. Qualcuno ha bloccato la manopola sul canale 7 con il nastro adesivo.',
    },
    lines: {
      lobby_slots: 'Quattro alloggiamenti ({n}/4 lanterne)',
      lobby_place: 'Metti le lanterne negli alloggiamenti',
      lobby_radioTake: 'Prendi il walkie-talkie',
    },
    radio: {
      lobby_meet: [
        ['radio', '[scariche]'],
        ['eddie', '…pronto? PRONTO? C’è qualcuno sul sette? Di’ qualcosa!'],
        ['sam', '…Pronto? Chi parla? Dove sono?'],
        ['eddie', 'Oh, grazie a Dio. Una persona. Ok. Ok. Mi chiamo Eddie. Lavoravo allo Starlight. Vieni dal sette, vero?'],
        ['sam', 'Eddie? L’Eddie di Walt? Sei sparito un anno e mezzo fa. Tua moglie ha attaccato la tua foto a ogni palo di Harlow.'],
        ['eddie', 'Un anno e mezzo. Sembra una notte. Allora il bambino è già… [scariche] No. Non adesso. Come ti chiami?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '…Sam? La banda di Toby? Sempre in sella alla bici? Ah. Ecco perché.'],
        ['sam', 'Perché cosa?'],
        ['eddie', 'Al tuo arrivo, tutto il posto l’ha detto. PLAYER ONE. L’ho sentito fin quaggiù come in uno stadio. Per me non l’ha mai detto. Per me diceva INSERT COIN.'],
        ['eddie', 'Regole. Non correre, a meno che qualcosa non ti veda. I cartelli EXIT mentono. Se le luci tremolano, esci dal corridoio. La porta per uscire da qui vuole quattro lanterne. Trovale. E, Sam? Resta sul sette.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Hai appena preso una lanterna? Oh no. Ok. L’ha sentito. Quando ne prendi una, qualcosa si sveglia sempre.'],
        ['eddie', 'Gli angoli, Sam. È veloce in rettilineo e lento nelle curve.'],
      ],
      lobby_eater: [
        ['eddie', 'L’hai visto. Non guardarlo troppo a lungo. Io lo chiamo il Divoratore.'],
        ['sam', 'Che cos’è?'],
        ['eddie', 'È il Giocatore. Ogni gioco ne ha bisogno. Questo era… [scariche] Tu prendi gli angoli e basta.'],
      ],
      lobby_panel: [
        ['eddie', 'Quattro alloggiamenti. Tutto qui dentro è il gioco, Sam. Ripulisci il tabellone e la porta si apre.'],
      ],
      lobby_open: [
        ['eddie', 'Quella porta non è un’uscita. Gli EXIT mentono. Ma è la strada per scendere, ed è giù che sono loro.'],
        ['sam', 'Chi?'],
        ['eddie', 'Lo sai chi. Quattro ragazzini dell’aprile ’87. Vai. Io resto sul sette.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
