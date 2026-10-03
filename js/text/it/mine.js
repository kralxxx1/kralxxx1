/* Italiano — Capitolo 4: Sette sotto (miniera di Hollow Creek). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      mine: {
        name: 'CAPITOLO 4', title: 'Sette sotto', place: 'Miniera di Hollow Creek',
        intro: 'Sabato 3 marzo 1956, poco prima di mezzanotte. Neve sul castelletto.\n\nAlle sei meno venti di quella mattina il tetto è crollato al livello dei 400 piedi. Sette uomini erano dall’altra parte. Il caposquadra disse alle famiglie che erano morti sul colpo.',
      },
    },
    docs: {
      mine_rules: { kind: 'notice', title: 'Regole della lampisteria', from: 'Miniera di Hollow Creek', body:
`1. Ogni uomo prende la propria lampada e lascia il suo numero al gancio.
2. Ogni uomo che entra in una sezione appende la sua medaglietta d’ottone al tabellone di quella sezione, e la toglie quando esce. Una medaglietta sul tabellone vuol dire un uomo sotto.
3. Con ogni squadra che scende al livello 400 scende un canarino. Se l’uccello tace, si risale.

Per ordine,
A. Lund, caposquadra` },
      mine_lampBook: { kind: 'note', title: 'Il registro delle lampade', from: 'Lampisteria', date: 'Sabato 3 marzo 1956', body:
`LAMPADE USCITE, TURNO DI NOTTE, LIVELLO 400 EST

N. 112   E. Nygaard        NON RESTITUITA
N. 117   J. Vik            NON RESTITUITA
N. 123   T. Holmberg       NON RESTITUITA
N. 124   K. Holmberg       NON RESTITUITA
N. 130   A. Skog           NON RESTITUITA
N. 135   P. Moen           NON RESTITUITA
N. 138   B. Ulstein        NON RESTITUITA

(In fondo, a matita:) sette lampade fuori. Sette lampade fuori. Nessuno le cancella finché qualcuno non mi dice dove sono.` },
      mine_statement: { kind: 'report', title: 'Deposizione all’inchiesta (copia carbone)', from: 'A. Lund, caposquadra', date: '20 marzo 1956', body:
`Il crollo nella sezione est alle 5.40 è stato totale su una lunghezza di circa quaranta piedi.

Sono certo che i sette uomini della sezione est siano rimasti uccisi sul colpo dal crollo. Dall’altra parte non si è mai sentito alcun rumore.

Alle 6.10, quando il fumo dell’armatura in fiamme ha raggiunto la galleria di carreggio, ho chiuso la porta tagliafuoco come prescrive il regolamento, per proteggere il pozzo e gli uomini dei cantieri nord.

Il tabellone di controllo della stazione indicava la sezione est libera. La squadra di soccorso è stata quindi mandata al crollo nord, da cui sono stati estratti vivi due uomini.

A. Lund` },
      mine_phoneLog: { kind: 'note', title: 'Il quaderno del telefono della stazione', from: 'Stazione del livello 400', date: '3 marzo 1956', body:
`05.40  Crollo, sezione est. Niente corrente sotto. — R.H.
05.52  Fumo nella galleria est.
06.02  Caposquadra alla porta tagliafuoco. Colpi dall’altra parte. Sette, poi sette, poi sette.
06.10  Caposquadra: porta tagliafuoco chiusa e bloccata col cuneo. Fumo.
06.14  Il caposquadra ha tolto le sette medagliette dal tabellone. Dice che la sezione est è libera. Gli ho detto che stanno battendo. Ha detto di no.

(Più piccolo, con la stessa mano:)
06.40  Battono ancora.
09.15  Ancora.` },
      mine_rescue: { kind: 'report', title: 'Rapporto della squadra di soccorso', from: 'Capo del soccorso minerario', date: '3 marzo 1956', body:
`Squadra di otto uomini scesa alle 07.30.
Tabellone della stazione: sezione est segnata LIBERA.
Squadra diretta al crollo nord. Due uomini intrappolati, entrambi estratti vivi alle 13.15.
Sezione est non ispezionata. Porta tagliafuoco sigillata per ordine del caposquadra, 4 marzo.

(Qualcuno ha sottolineato LIBERA due volte.)` },
      mine_widow: { kind: 'letter', title: 'Una lettera appuntata a un cappotto nello spogliatoio', from: 'Ruth Holmberg', date: 'Aprile 1956', body:
`Signor Lund,

è venuto nella mia cucina a dirmi che i miei ragazzi sono morti sul colpo e non si sono accorti di niente.

Tore e Karl hanno appeso le loro medagliette a quel tabellone quando sono scesi. Karl me l’aveva fatto vedere la prima settimana, come un bambino con un coltello nuovo. La lampisteria dice che le loro lampade non sono mai risalite. Il tabellone dice che lì non c’era nessuno.

Una delle due cose è una bugia, e le lampade non mentono.

Vorrei le loro medagliette. Sono tutto quello che avrò da seppellire.

Ruth Holmberg` },
      mine_lunch: { kind: 'note', title: 'Un biglietto in una gavetta', from: 'Mamma', body:
`Karl —
Il caffè è per tutti e due. Fallo dividere a Tore.
A casa per cena. Pesce.
— Mamma` },
      mine_confession: { kind: 'letter', title: 'Piegata nel coperchio della scatola di tabacco', from: 'A. Lund', date: 'Gennaio 1976', body:
`Le ho tenute vent’anni.

Alle sei e due ero alla porta tagliafuoco e li ho sentiti. Sette colpi, poi sette, poi sette. Si contavano, perché chi arrivava sapesse che c’erano tutti e sette. Il fumo passava intorno alla porta. Se l’avessi aperta, il fumo sarebbe sceso per la galleria di carreggio e salito su per il pozzo, e gli uomini al crollo nord sarebbero rimasti senz’aria. Questo mi sono detto.

Ho bloccato la porta col cuneo. Sono andato al tabellone e ho tolto le loro medagliette, perché i soccorsi andassero a nord e nessuno mi chiedesse di riaprirla.

Sono tornato una volta, ad ascoltare. Battevano ancora. Mi è caduta la scatola nella terra e sono scappato, e ne ho raccolte solo quattro.

Hanno battuto per due giorni.

Rimettile al loro posto.
A. Lund` },
      mine_genNote: { kind: 'notice', title: 'Sulla porta della sala del generatore', from: 'Elettricista', body:
`GENERATORE DI EMERGENZA — pompe e motore d’estrazione d’emergenza.
Se sotto manca la corrente, è l’unico modo di far scendere la gabbia fino a voi.

Gasolio: deposito carburante, in fondo alla galleria sud.
La galleria sud trattiene il gas. Si raccoglie sotto il tetto. PORTATE L’UCCELLO. Se tossite, lo state già respirando: abbassatevi e continuate a muovervi.` },
      wren5: { kind: 'drawing', drawing: 5, title: 'Un disegno spinto sotto la porta tagliafuoco', from: 'Wren, 7 anni', body:
`Pastelli a cera, su carta ammorbidita dall’umidità. Una galleria marrone sotto l’erba verde, e dentro sette lampadine gialle in fila, ognuna con una faccina rotonda sotto. In fondo alla galleria, una porta grigia. Sopra l’erba, l’uccellino rosso.

Sotto, con molta cura:
1 2 3 4 5 6 7` },
    },
    items: {
      canary: { name: 'Canarino', desc: 'Un canarino giallo in una gabbia d’ottone. Canta finché l’aria è buona.' },
      tin: { name: 'Scatola di tabacco', desc: 'Una scatola rossa, con la vernice consumata agli angoli. Dentro tintinnano quattro medagliette d’ottone.' },
      tags: { name: 'Medagliette di controllo', desc: 'Dischetti d’ottone con un numero inciso. {n} su sette.' },
      diesel: { name: 'Tanica di gasolio', desc: 'Pesante e piena.' },
    },
    obj: {
      mine_start: 'Trova un modo per scendere in miniera',
      mine_canary: 'Prendi un canarino dalla lampisteria',
      mine_down: 'Scendi con la gabbia',
      mine_tags: 'Trova le sette medagliette che mancano dal tabellone ({n}/7)',
      mine_board: 'Riappendi le medagliette al tabellone ({n}/7)',
      mine_power: 'L’argano è morto. Porta il gasolio al generatore',
      mine_gen: 'Avvia il generatore',
      mine_hoist: 'Chiama la gabbia con l’interruttore dell’argano',
      mine_ride: 'Risali con la gabbia',
    },
    mono: {
      mine_start: 'Una miniera. Neve dappertutto, e nessuno che la spali.',
      mine_noCanary: 'Non senza il canarino. Lo dice il cartello, e non mi metto a discutere con un cartello in cima a un pozzo di miniera.',
      mine_canary: 'Ciao, tu. Continua a cantare.',
      mine_down: 'Quattrocento piedi. Non pensarci.',
      mine_station: 'Il fondo. Un tabellone pieno di ganci, e quelli della sezione est sono vuoti.',
      mine_board: 'Sette ganci vuoti. Nygaard, Vik, Holmberg, Holmberg, Skog, Moen, Ulstein.',
      mine_boardNone: 'Non ho nessuna delle medagliette.',
      mine_tin: 'Quattro medagliette. Holmberg, Holmberg, Skog, Moen. Dovrebbero essere sette.',
      mine_tag: 'Una medaglietta nella terra.',
      mine_tagCount: 'Fanno {n}.',
      mine_hung: 'Di nuovo dov’erano.',
      mine_claimed: 'Sette. Tutte e sette. Eravate qui.',
      mine_knockStop: 'I colpi si sono fermati.',
      mine_knock: 'Qualcuno batte. Sette. Poi di nuovo sette.',
      mine_fireDoor: 'La porta tagliafuoco. Bloccata col cuneo. I colpi vengono proprio da dietro.',
      mine_fireOpen: 'Non riesco ad aprirla. Non credo di doverlo fare.',
      mine_gas: 'L’uccello si è zittito.',
      mine_gasNo: 'C’è qualcosa nell’aria. Sa di fiammiferi.',
      mine_gasLow: 'Stai bassa. Si raccoglie sotto il tetto.',
      mine_notYet: 'Non ancora. Non finché battono.',
      mine_hoistLit: 'Il quadro è acceso. Il motore della gabbia ha corrente.',
      mine_noCage: 'Prima la gabbia deve avere corrente.',
      mine_gasOut: 'Canta di nuovo.',
      mine_hoistDead: 'Morto. Quaggiù non c’è corrente.',
      mine_diesel: 'Gasolio. Pesante.',
      mine_genFuel: 'Carburante dentro.',
      mine_genNoFuel: 'Il serbatoio è a secco.',
      mine_genOn: 'Va. Avrà svegliato tutto quello che c’è quaggiù.',
      mine_hoistOn: 'Qualcosa sta scendendo nel pozzo. La gabbia. Ti prego, che sia la gabbia.',
      mine_cageHere: 'La gabbia.',
      mine_stop: 'Si è fermata. Oh no. Si è fermata.',
      mine_lever: 'C’è una leva. Tira. Tirala.',
      mine_moving: 'Si muove. Si muove.',
      mine_top: 'Neve. Aria.',
      mine_lamps: 'Luci che scendono per la galleria. Una squadra di soccorso. No. Le squadre di soccorso parlano.',
      mine_burrower: 'Il pavimento si è mosso.',
      mine_crawler: 'C’è qualcosa lassù nell’armatura.',
      mine_lake: 'I vecchi cantieri sono pieni d’acqua. Perfettamente immobile.',
      mine_stope: 'Sale e sale. Non vedo il tetto.',
      mine_drawing: 'Qualcosa è scivolato sotto la porta.',
    },
    lines: {
      mine_cageGo: 'Scendi con la gabbia',
      mine_cageLook: 'La gabbia',
      mine_cageUp: 'Risali con la gabbia',
      mine_boardPut: 'Appendi le medagliette ai loro ganci',
      mine_boardLook: 'Il tabellone di controllo',
      mine_hoistPrompt: 'Interruttore dell’argano (tieni premuto)',
      mine_genPrompt: 'Avvia il generatore (tieni premuto)',
      mine_genFuelPrompt: 'Riempi il generatore',
      mine_genLook: 'Il generatore di emergenza',
      mine_leverPrompt: 'Tira la leva d’emergenza (tieni premuto)',
      mine_tinPrompt: 'Una scatola di tabacco nel cassetto',
      mine_tagPrompt: 'Raccogli la medaglietta',
      mine_fireLook: 'La porta tagliafuoco',
    },
    radio: {
      mine_otto1: [
        ['radio', '[fruscio, e debolissimo sotto, un martello sull’acciaio]'],
        ['otto', 'Nove ad Ada. Neve? Un castelletto? Allora Hollow Creek. Ne ho uno scaffale. Sette lampade, tutte ancora accese, cosa che non dovrebbero essere, dopo tutto questo tempo.'],
        ['ada', 'Qualcuno batte. Laggiù.'],
        ['otto', 'Sì. Battono sul mio scaffale dal 1956. Prenda l’uccello. Le dirà quello che l’aria tace.'],
      ],
      mine_ottoLamps: [
        ['otto', 'Le luci nella galleria. Vengono verso la luce, Ada, come le falene. Spenga la sua e resti ferma. Le passeranno accanto. Quasi sempre.'],
      ],
      mine_ottoClaim: [
        ['otto', 'Il mio scaffale si è fatto silenzioso. Sette lampade. Si sono spente una dopo l’altra, piano, come una casa che va a dormire.'],
      ],
    },
    recap: {
      mine: 'Hollow Creek, la notte del crollo del 1956. Il caposquadra Arvid Lund sentì sette uomini battere dietro la porta tagliafuoco, la bloccò con un cuneo e tolse le loro medagliette dal tabellone perché i soccorsi andassero altrove. Disse alle famiglie che erano morti sul colpo, e tenne le medagliette per vent’anni in una scatola di tabacco. Le ho riappese tutte e sette ai loro ganci, e i colpi sono cessati. Poi la gabbia mi ha riportata su attraverso il buio.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
