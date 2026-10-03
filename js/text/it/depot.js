/* Italiano — Prologo: Turno di notte (Deposito 9). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      depot: {
        name: 'PROLOGO', title: 'Turno di notte', place: 'Deposito 9, stazione centrale di Halvard',
        intro: 'Halvard, la notte del 13 gennaio 1998. Pioggia sulla volta di vetro della stazione centrale.\n\nSotto l’atrio c’è il Deposito 9, dove tutto ciò che la città perde aspetta novanta giorni che qualcuno torni a prenderlo. Ada Lind lavora allo sportello di notte da otto anni. Dopo mezzanotte non scende nessuno.\n\nÈ per questo che ha preso il posto.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Nota di consegna', from: 'Benny', date: 'Mar. 13 gen.', body:
`Ada —

Consegna:
• Entrati 14 ombrelli. Piove, quindi.
• È tornato l’uomo col trombone. Ancora non è il suo trombone.
• Lo scivolo si inceppa di nuovo. Colpiscilo sul lato SINISTRO.
• Il tuo armadietto non si chiude. La cassetta è ancora dentro. Non l’ho toccata.
• Uno di sopra ha chiesto se «abbiamo ancora l’ascensore». Gli ho detto che quell’ascensore non lo usa nessuno dal 1964. Ha detto: «Non è quello che ho chiesto».

Caffè finito. Scusa.
— Benny` },
      depot_log: { kind: 'printout', title: 'Registro notturno, pagina 212', from: 'A. Lind', date: '13/14.01.98', body:
`DEPOSITO 9 — REGISTRO NOTTURNO — A. LIND

23:10  Scontrino 4471: guanto, da donna, grigio. Ritirato.
00:40  Pulizie binario 2: valigia, color cuoio, senza etichetta. Registrata col n. 241.
01:15  Telefono. Nessuno. (Terza notte.)
02:30  Pioggia forte. Scivolo tranquillo.
02:56  Nient’altro da segnalare.` },
      depot_tag: { kind: 'card', title: 'Lo scontrino di ritiro sul pacco', from: 'A.', body:
`STAZIONE CENTRALE DI HALVARD — DEPOSITO 9 — OGGETTI SMARRITI

RICHIESTA 256
Una manopola, rossa, da bambina, mano sinistra.
Trovata: lago Ostra, 14 gennaio 1979.
DA TENERE PER: ADA LIND.

— A.

(Battuta a macchina con una «e» abbassata, di quelle che il deposito ha buttato nel 1964. L’inchiostro è ancora fresco.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'Un disegno piegato dentro il pacco', from: 'Wren, 7 anni', body:
`Pastelli a cera. Un uccellino rosso su uno steccato. Una ragazza alta con una sciarpa verde che si allontana lungo una strada, di spalle. Sopra di lei, a lettere grandi: ADA.

Sul retro, con lo stesso pastello:
COSÌ SAI LA STRADA` },
      depot_ledger: { kind: 'report', title: 'Registro degli oggetti smarriti, 1979, vol. 1', from: 'Deposito 9', body:
`N. 253 — 14.01.79 — Guanti, uomo, pelle marrone — Binario 3 — ritirati 16.01
N. 254 — 14.01.79 — Ombrello, nero — Sala d’attesa — ritirato 15.01
N. 255 — 14.01.79 — Libro, «La regina delle nevi», per bambini — Binario 4 — non ritirato
N. 256 — 14.01.79 — Manopola, rossa, da bambina, mano sinistra — trovata: lago Ostra — Avente diritto: sua sorella, quando se ne ricorderà.

(L’ultima riga è scritta da una mano tremante che quasi conosci. L’inchiostro è fresco. Attaccata con lo scotch dentro il coperchio: una chiave d’ottone con la sigla SOVR.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Appunti nella scrivania del sovrintendente', from: 'Otto Brandt', date: '14 febbraio 1964', body:
`Quarantunomila oggetti dal 1906. Ognuno era di qualcuno.

Di notte ho cominciato a sentire la vecchia posta pneumatica. Appunti, firmati «A.» Conosce il nostro registro meglio di me.

Scrive che c’è un piano sotto i piani, dove va tutto ciò che nessuno è tornato a prendere. Un ufficio di smistamento. Scrive che manca un impiegato.

Ho inciso il numero sopra il pulsante per non perdermi d’animo.

Se domattina non sono tornato: gli ombrelli vanno nella gabbia, non nella spazzatura.

— O.B.` },
      depot_memo: { kind: 'note', title: 'Un appunto nella capsula della posta pneumatica', from: 'A.', body:
`INDICE — LIVELLO 256 — INTERNO

A: Deposito 9, sportello notturno.

Ada.
La chiave dell’ascensore è sulla sua scrivania. Porta la manopola, e non posarla.
Otto sarà sul canale nove. Digli che gli ombrelli sono nella gabbia.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Calendario dei Trasporti di Halvard, 1964', body:
`FEBBRAIO 1964

(I giorni sono cancellati fino al 13. Sul 14, a matita: «Turno di notte. L’ultimo?». Sotto la foto della nuova diga di Ostra, la stessa matita: «In autunno allagano la valle. Il giornale dice che una vecchia lassù non vuole andarsene». Da allora nessuno ha girato pagina.)` },
      depot_poster: { kind: 'notice', title: 'Avviso nella sala del pubblico', from: 'Trasporti di Halvard', body:
`OGGETTI SMARRITI — DEPOSITO 9

Gli oggetti trovati nelle stazioni e sui treni sono custoditi qui per NOVANTA GIORNI.
Si prega di portare una prova di proprietà.
Gli oggetti non ritirati vengono venduti o distrutti.

(Appuntato sotto, a pennarello: «TROVATO: gatto grigio, risponde al nome di Ammiraglio. Chiedere a Benny».)` },
      depot_kitchen: { kind: 'card', title: 'Una cartolina sopra il lavello', from: 'La nonna', date: '1995', body:
`(Una veduta invernale del lago Ostra. Sul ghiaccio, piccolissima, la guglia della chiesa sommersa.)

Ada —
Quest’anno il ghiaccio è spesso. Il 14 cade di sabato. Vieni se puoi. Metterò la candela alla finestra come sempre.
La nonna` },
    },
    items: {
      mitten: { name: 'Manopola rossa (sinistra)', desc: 'Una manopola da bambina di lana rossa, rammendata sul pollice. L’altra è stata trovata sul ghiaccio diciannove anni fa.' },
      ottoKey: { name: 'Chiave del sovrintendente', desc: 'D’ottone, con la sigla SOVR. Era attaccata dentro il coperchio della scatola del registro del 1979.' },
      elevatorKey: { name: 'Chiave del montacarichi', desc: 'Una chiave lunga con un’etichetta che dice MONTACARICHI. Quella di Otto Brandt.' },
      badge: { name: 'Il distintivo di Otto', desc: 'Ovale d’ottone: DEPOSITO 9 — OTTO BRANDT. Lisciato dove un pollice lo strofinava.' },
      parcel: { name: 'Pacco' },
    },
    obj: {
      depot_log: 'Finisci il registro notturno alla tua macchina da scrivere',
      depot_parcel: 'Guarda cosa è sceso dallo scivolo',
      depot_torch: 'Prendi la torcia dal tuo armadietto',
      depot_power: 'Riarma l’interruttore generale nella sala di smistamento',
      depot_ledger: 'Trova il registro del 1979 nell’archivio',
      depot_otto: 'Perquisisci l’ufficio di Otto Brandt',
      depot_elevator: 'Scendi con il montacarichi',
    },
    mono: {
      depot_start: '02:51. Pioggia sul vetro dell’atrio, lassù. Ancora una riga e il registro notturno è finito.',
      depot_start2: 'Dopo mezzanotte qui non scende nessuno. È tutto il senso del lavoro.',
      depot_logDone: '02:56. Nient’altro da segnalare.',
      depot_chute: 'Lo scivolo. Nessuno spedisce pacchi alle tre del mattino.',
      depot_mitten: 'Mano sinistra. Rossa. Quelle di Wren erano rosse. Nel 1979 erano rosse quelle di tutti.',
      depot_dark: 'Ed ecco che salta la corrente. La torcia è nel mio armadietto.',
      depot_torch: 'Le pile sono ancora buone. Benny non prende mai in prestito niente di utile.',
      depot_tape: 'La cassetta della nonna. Due anni nel mio armadietto. Non stanotte.',
      depot_tape2: 'Ho detto non stanotte.',
      depot_powerBack: 'Ecco. Il vecchio impianto tiene sempre il broncio per un minuto, prima.',
      depot_tube: 'Era la vecchia posta pneumatica nell’ufficio del sovrintendente. Non funziona dal 1964. Lo scontrino dice 1979. Il registro è in archivio.',
      depot_archive: 'Quarantunomila cose che nessuno è tornato a prendere.',
      depot_sorter: 'C’era qualcuno in fondo alla corsia. Alto, con un cappotto grigio. Smistava scatole al buio.',
      depot_ledgerAfter: 'Questa non è la calligrafia di Benny. Non è la calligrafia di nessuno. E nel coperchio c’è una chiave attaccata: SOVR. L’ufficio di Otto Brandt.',
      depot_ottoLocked: 'SOVRINTENDENTE. Chiuso dal 1964. Benny dice che la chiave se n’è andata con lui.',
      depot_ottoLocked2: 'Ancora chiuso.',
      depot_ottoIn: 'La sua lampada è accesa. C’è ancora del caffè nella tazza. Trentaquattro anni.',
      depot_badge: 'OTTO BRANDT. Non si lascia il proprio distintivo, a meno di voler tornare a prenderlo.',
      depot_elevKey: 'MONTACARICHI. Quello che nessuno ha più usato dopo di lui.',
      depot_noKey: 'Il pannello vuole una chiave. Ovvio.',
      depot_noKey2: 'Serve ancora la chiave.',
      depot_256: 'Qualcuno ha inciso un numero sopra il pulsante più basso. 256.',
      depot_wren: 'C’era qualcuno nella cabina. Una bambina con una tuta da neve rossa. Per un secondo.',
      depot_gate: 'Il cancello dell’atrio. Chiuso da sopra a mezzanotte. Regolamento della stazione.',
      depot_elevatorShut: 'Il montacarichi. Fuori servizio dal 1964.',
    },
    lines: {
      depot_typePrompt: 'Batti l’ultima riga del registro notturno',
      depot_parcelPrompt: 'Apri il pacco',
      depot_tapePrompt: 'La cassetta della nonna',
      depot_breakerPrompt: 'Alza l’interruttore generale (tieni premuto)',
      depot_ledgerPrompt: 'Scatola del registro: 1979',
      depot_badgePrompt: 'Il distintivo di Otto',
      depot_callPrompt: 'Gira la chiave, premi il pulsante più basso',
      depot_ottoUnlock: 'Apri con la chiave del sovrintendente',
    },
    recap: {
      depot: 'Deposito 9, 02:56. Un pacco è sceso dallo scivolo: una manopola rossa, mano sinistra, e uno scontrino che diceva «Da tenere per Ada Lind». Il registro del 1979 diceva: avente diritto, sua sorella, quando se ne ricorderà. Sono scesa con il montacarichi di Otto Brandt fino al pulsante su cui qualcuno aveva inciso un numero: 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
