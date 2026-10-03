/* Italiano — Capitolo 3: Doppio spettacolo (cinema all’aperto Pinewood). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      pinewood: {
        name: 'CAPITOLO 3', title: 'Doppio spettacolo', place: 'Cinema all’aperto Pinewood, a nord di Nordvik',
        intro: 'Venerdì 22 agosto 1975, poco dopo le undici di sera. L’ultima notte della stagione.\n\nIl secondo film scorre su uno schermo tra gli alberi. Non ha sonoro e non finisce. Un bambino di otto anni è andato ai bagni durante il cambio della bobina e non è tornato.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'Un volantino sul bancone del chiosco', from: 'Cinema all’aperto Pinewood', body:
`ULTIMA NOTTE DELLA STAGIONE — VENERDÌ 22 AGOSTO

20:45   LA LUNGA ESTATE
22:40   IL LAGO DI NOTTE

ESTRAZIONE DEL BIGLIETTO FORTUNATO!
Conservate la matrice del biglietto. All’intervallo portatela alla finestrella della cabina e infilatela nella scatola. Il signor Hardy estrarrà il vincitore alla fine del secondo film.
Premio: un ABBONAMENTO per la stagione 1976. Tutti i film, tutta la macchina.

Per favore, riappendete gli altoparlanti ai loro pali. Guidate piano. Attenzione ai bambini.` },
      pine_missing: { kind: 'notice', title: 'Un manifesto sul muro dei bagni', from: 'Polizia di Nordvik', date: 'Agosto 1975', body:
`SCOMPARSO
MIKKEL STRAND, 8 anni

Visto per l’ultima volta al cinema all’aperto Pinewood venerdì 22 agosto, verso le 23, mentre andava ai bagni.
Capelli biondi. Giacca a vento blu, stivali di gomma rossi. Aveva con sé la torcia di suo padre.

Se lo avete visto, o se quella notte avete visto qualsiasi cosa, chiamate il commissariato di Nordvik.
Ve lo chiedono sua madre e suo padre. Qualsiasi cosa.` },
      pine_statement: { kind: 'report', title: 'Deposizione, copia', from: 'L. Hardy, proiezionista', date: '23 agosto 1975, ore 9:10', body:
`Sono stato in cabina dalle sette di sera alle due di notte, come ogni sera di proiezione. Ho proiettato entrambi i film senza pause, a parte i cambi di bobina.

Non ho visto il bambino. I bambini non salgono in cabina. Le finestrelle danno sullo schermo e dalla cabina i bagni non si vedono.

Non ho lasciato la cabina. Non avevo bevuto.

Letto e sottoscritto,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'Una lettera sotto il cuscino della branda', from: 'L. Hardy', date: 'Marzo 1981, mai spedita', body:
`Signora Strand,

ho scritto questa lettera nove volte. Questa volta la spedisco.

Suo figlio è venuto alla finestrella della cabina alle undici meno dieci con la sua matrice per l’estrazione. Io avevo una bottiglia aperta e un cambio di bobina in arrivo, e gli ho detto di tornare dopo. Lui ha detto: «Prometti che la metti dentro?». Ho detto su, sparisci.

Alle undici e cinque sono uscito dietro il chiosco a prendere aria, e ho visto una piccola torcia entrare tra gli alberi dietro i bagni. Davanti c’era un’altra luce, più in fondo. Una rossa, come un fanale di stop. Ho pensato che fossero i ragazzi grandi che facevano gli scemi. Ho pensato, non sono affari miei. Ho pensato, se scendo laggiù e qualcuno mi sente l’alito, perdo la licenza, e la cabina è tutto quello che ho.

Ho detto alla polizia che non avevo visto niente. Ho detto che i bambini non vengono in cabina.

Il vincitore non l’ho mai estratto. La scatola è ancora sul banco.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'Il registro degli oggetti smarriti nel botteghino', from: 'Pinewood, stagione 1975', body:
`16/8   golfino da donna, verde, fila 2
16/8   thermos (senza tappo)
22/8   un calzino, da bambino, fila 4
22/8   23:40   CHIAVI DELL’AUTO su un’etichetta rossa, «STRAND». Perse dal padre vicino ai bagni mentre cercavano. Consegnate da Jonna L. Gli ho detto che sono qui. Non è tornato a prenderle.` },
      pine_wiper: { kind: 'note', title: 'Un biglietto sotto il tergicristallo della station wagon', from: 'Papà', body:
`(A biro, sul retro di una carta stradale, infilato sotto il tergicristallo in modo che guardi verso gli alberi.)

MIKKEL —
RESTA DOVE VEDI I FARI DELLA MACCHINA.
CAMMINA VERSO DI LORO.
TI STIAMO CERCANDO.
NESSUNO È ARRABBIATO.
— PAPÀ` },
      pine_staff: { kind: 'note', title: 'Appeso nel magazzino', from: 'Bo', body:
`PERSONALE —
Il generatore alimenta il chiosco e le luci del piazzale.
Per i clienti rimasti a secco: il serbatoio giornaliero ha un rubinetto di scarico sul fianco. Mezza tanica rossa, non di più, e segnatelo sul registro. Aprite il rubinetto PIANO. Sputa e scoppietta e tutto il piazzale vi guarda.

La batteria di Lyle è per la lampada della SUA cabina. Non per avviare le macchine. Non di nuovo.
— Bo` },
      pine_search: { kind: 'report', title: 'Un avviso di ricerca inchiodato alla torretta di caccia', from: 'Polizia di Nordvik', date: 'Sabato 23 agosto 1975', body:
`RICERCHE — SETTORE C (bosco a nord-ovest)
File da dieci, a distanza di un braccio.

I cani hanno perso la traccia alla vecchia torretta di caccia.
Trovato uno stivale da bambino, sinistro, rosso, circa 40 m a nord della torretta.
Nient’altro trovato.

Ricerche sospese al buio. Si riprende alle 06:00.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'Un disegno tra le foglie', from: 'Wren, 7 anni', body:
`Pastelli a cera. Un enorme schermo bianco in piedi tra alberi neri. Davanti, un bambino con un cappotto blu e stivali rossi, una torcia in mano, che si guarda alle spalle. Sul bordo superiore dello schermo, l’uccellino rosso.

Sotto:
SI È VOLTATO` },
    },
    items: {
      stub: { name: 'Matrice del biglietto', desc: 'BAMBINI — CINEMA ALL’APERTO PINEWOOD — 22 AGO 75 — N. 1147. Non è mai stata infilata nella scatola.' },
      carBattery: { name: 'Batteria d’auto', desc: 'Dodici volt e pesantissima. Alimentava la lampada della cabina.' },
      carKeys: { name: 'Chiavi dell’auto', desc: 'Due chiavi su un’etichetta di plastica rossa. STRAND.' },
      jerrycan: { name: 'Tanica rossa', desc: 'Vuota. Sa di benzina.' },
      fuel: { name: 'Tanica di benzina', desc: 'Mezza piena. Sciaborda quando cammini.' },
    },
    obj: {
      pine_start: 'Trova un modo per uscire da Pinewood',
      pine_parts: 'Fai partire la station wagon: batteria, benzina, chiavi ({n}/3)',
      pine_startCar: 'Metti in moto la station wagon',
      pine_stubFind: 'Trova la matrice del biglietto del bambino',
      pine_claim: 'Infila la matrice nella scatola in cabina di proiezione',
      pine_leave: 'Esci in macchina dal cancello',
    },
    mono: {
      pine_start: 'Uno schermo da cinema tra gli alberi. Il film scorre, e non c’è nessun suono.',
      pine_gate: 'Il cancello è incatenato. Il lucchetto è da questa parte, il che non ha senso.',
      pine_wagon: 'Questa l’hanno tirata fuori dalla fila e girata verso gli alberi. I fari sono accesi. La batteria è morta.',
      pine_wagonNeeds: 'Batteria morta, serbatoio vuoto, niente chiavi. Qualcuno ha tenuto questa macchina accesa tutta la notte con i fari.',
      pine_battery: 'Una batteria d’auto. Alimentava la lampada della cabina.',
      pine_batteryDark: 'E adesso la cabina è al buio.',
      pine_keys: 'STRAND. Le ha perse cercando suo figlio.',
      pine_can: 'Una tanica rossa. Vuota.',
      pine_fill: 'Sputa. Scoppietta. Tutto là fuori può sentirlo.',
      pine_filled: 'Mezza tanica. Basterà.',
      pine_tankNoCan: 'Il serbatoio giornaliero del generatore. C’è un rubinetto di scarico. Mi serve qualcosa da riempire.',
      pine_fitBattery: 'Batteria montata. I fari si sono accesi da soli. Non erano mai stati spenti.',
      pine_inBeam: 'Uno degli alberi nella luce è messo storto.',
      pine_fuel: 'Benzina dentro.',
      pine_startFail: 'Gira. Gira. Si spegne. L’ha sentito tutto.',
      pine_notYet: 'Gira e non parte. Come se questo posto non avesse finito con me.',
      pine_stubHint: 'È venuto in cabina con la sua matrice per l’estrazione. Poi è andato ai bagni.',
      pine_stub: 'La matrice del biglietto di un bambino. Numero millecentoquarantasette. Non è mai riuscito a infilarla.',
      pine_claimed: 'Ecco. Eri qui. Sei stato contato.',
      pine_draw: 'Avrebbe vinto.',
      pine_start2: 'È partita. Oh, è partita.',
      pine_end: 'Nello specchietto lo schermo diventa bianco, e poi buio. Qualcuno ha spento il proiettore.',
      pine_booth: 'La cabina. Polvere calda e whisky.',
      pine_toilets: 'La porta sul retro è aperta verso gli alberi.',
      pine_clearing: 'Una torretta di caccia. Le foglie sono calpestate in cerchio tutto intorno.',
      pine_pines: 'Alcuni di questi alberi si sono spostati dall’ultima volta che ho guardato.',
      pine_stag: 'Qualcosa di grosso ha appena attraversato il piazzale. Corna più larghe di un’auto.',
      pine_usher: 'Una luce rossa tra le macchine. Qualcuno che accompagna la gente al posto.',
      pine_swing: 'L’altalena si muove. Non c’è vento.',
      pine_gateOpen: 'Lontano, una catena che cade sulla ghiaia.',
      pine_canLook: 'La scatola dell’estrazione. Una manciata di matrici sul fondo, sotto l’ultima bobina.',
    },
    lines: {
      pine_stubPrompt: 'Una matrice di biglietto per terra',
      pine_canPut: 'Infila la matrice nella scatola',
      pine_canLook: 'Una scatola da pellicola aperta sul banco di riavvolgimento',
      pine_tankPrompt: 'Riempi la tanica al rubinetto di scarico (tieni premuto)',
      pine_tankLook: 'Il serbatoio giornaliero del generatore',
      pine_wagonLook: 'La station wagon degli Strand',
      pine_wagonBattery: 'Monta la batteria',
      pine_wagonFuel: 'Versa la benzina',
      pine_wagonStart: 'Metti in moto (tieni premuto)',
      pine_wagonGo: 'Sali e guida',
    },
    radio: {
      pine_otto1: [
        ['radio', '[fruscio, e sotto il ticchettio di un proiettore]'],
        ['otto', 'Nove ad Ada. Alberi? Uno schermo? Pinewood. Un cinema all’aperto a nord di Nordvik, 1975. Ne ho qui una scatola: undici chiavi d’auto, uno stivale rosso da bambino e l’ultima bobina di un film che nessuno ha finito di vedere.'],
        ['ada', 'Il film scorre ancora. Senza sonoro.'],
        ['otto', 'Quaggiù non c’è mai. Due cose. Gli alberi lì si muovono solo mentre si muove lei. E se vede una luce rossa tra le macchine, non è lì per aiutarla a trovare il posto.'],
      ],
      pine_ottoStag: [
        ['otto', 'Quello era il Cervo. Ascolta. Quando abbassa la testa, metta qualcosa di solido tra voi. Un albero. Un’auto. Non si ferma per nient’altro.'],
      ],
      pine_draw: [
        ['lyle', '[tutti gli altoparlanti del piazzale insieme: un crepitio, un respiro, un uomo troppo vicino al microfono]'],
        ['lyle', 'Signore e signori. Il biglietto fortunato. Un abbonamento per il millenovecentosettantasei.'],
        ['lyle', 'Numero millecento... quarantasette.'],
        ['lyle', 'Millecentoquarantasette. C’è il millecentoquarantasette?'],
        ['lyle', 'Sali in cabina, ragazzo. Te l’avevo promesso.'],
      ],
      pine_otto2: [
        ['otto', 'La scatola di Pinewood. Lo stivale non c’è più. Al suo posto c’è una matrice di biglietto. Qualcuno ci ha scritto sopra a matita: «Vincitore».'],
      ],
    },
    recap: {
      pinewood: 'Il cinema all’aperto Pinewood, l’ultima notte del 1975. Il proiezionista, Lyle Hardy, disse alla polizia che i bambini non venivano mai in cabina e che non aveva visto niente. Mikkel Strand, otto anni, era venuto in cabina con la sua matrice per l’estrazione, era stato mandato via, e aveva seguito una luce rossa tra gli alberi mentre Lyle guardava. Ho infilato la matrice del bambino nella scatola, e tutti gli altoparlanti del piazzale hanno letto il suo numero. Poi sono uscita dal cancello con la macchina di suo padre.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
