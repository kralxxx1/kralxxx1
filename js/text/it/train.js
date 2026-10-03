/* Italiano — Capitolo 7: Ultima fermata (il Nordlys Express). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      train: {
        name: 'CAPITOLO 7', title: 'Ultima fermata', place: 'Stazione di Brenna, sulla linea del nord',
        intro: 'Mercoledì 19 dicembre 1990, 23.40.\n\nIl treno notte per Nordvik è fermo al binario con tutti i finestrini illuminati. Nessuno sale. Nessuno scende. Una porta è aperta.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'L’orario accanto alla porta del binario', from: 'Ferrovie del Nord', date: 'Orario invernale 1990–91', body:
`NORDLYS EXPRESS — treno notte con vagone letto, giornaliero
Halvard p. 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (fermata a richiesta)* 00.50
Nordvik a. 06.15

* I treni fermano a Kvitfjell solo se un viaggiatore lo comunica al capotreno prima di Brenna, o se un viaggiatore attende sul marciapiede. D’inverno la fermata è senza personale e senza luce.` },
      train_notice: { kind: 'notice', title: 'Un avviso nella sala d’attesa', from: 'Ferrovie del Nord, ufficio regionale del traffico', date: '1° dicembre 1990', body:
`I BIGLIETTI DEVONO ESSERE ACQUISTATI PRIMA DI SALIRE.

Sui treni notte non si vendono biglietti. Il viaggiatore che non può mostrare al capotreno un biglietto valido dovrà scendere alla fermata successiva.

Grazie per aver viaggiato con le Ferrovie del Nord.

(Qualcuno ha scritto sotto a biro: «anche a Kvitfjell?», e qualcun altro: «SOPRATTUTTO a Kvitfjell»)` },
      train_menu: { kind: 'note', title: 'Il menu della carrozza ristorante', from: 'Carrozza ristorante del Nordlys Express', date: '19.12.90', body:
`Zuppa di pesce con pane — 48
Spezzatino di renna, mirtilli rossi, patate — 95
Waffle con marmellata e panna acida — 32
Caffè — 12   Cacao — 14

La carrozza ristorante chiude alle 23.00. Dopo le 23.00 si servono i viaggiatori dei vagoni letto dietro presentazione del biglietto della cuccetta.

(L’alone di una tazza. Sotto il menu, a matita: «Tavolo vicino alla cambusa: cacao, cuccetta 24, pagato in contanti».)` },
      train_waiter: { kind: 'note', title: 'Un blocco delle comande vicino alla cambusa', from: 'R. Moe, cameriere', date: '19.12.90', body:
`23.55  Cuccetta 24 (carrozza 2) — signorina, da sola — cacao, waffle.
       Carrozza chiusa, ma mi ha fatto vedere il biglietto della cuccetta, quindi.
       Torna a casa a Nordvik per Natale. Prima volta in treno da sola.
       Ha rimesso il biglietto nella tasca del cappotto. Le ho detto di non perderlo.

00.30  Passa il signor Saether per il suo giro. Neve sui binari
       da Ostra, e se la prende con tutti.` },
      train_paper: { kind: 'clipping', title: 'Un giornale lasciato su un tavolo', from: 'Nordvik Tidende', date: 'Sabato 22 dicembre 1990', body:
`RAGAZZA DI 15 ANNI SCOMPARSA DA MERCOLEDÌ

Lina Berg, 15 anni, di Nordvik, non si vede più da quando mercoledì sera è salita sul Nordlys Express a Halvard per tornare a casa per Natale.

Non è arrivata. Le Ferrovie del Nord affermano che nessun viaggiatore è sceso dal treno tra Brenna e Nordvik e che la sua cuccetta è stata trovata vuota all’arrivo del treno.

Da allora nevica ogni giorno su tutta la zona. La polizia chiede a chiunque abbia viaggiato su quel treno di farsi avanti.` },
      train_lina: { kind: 'letter', title: 'Una lettera sul tavolino della cuccetta 24', from: 'Lina', date: '19.12.90, in treno', body:
`Cara mamma,

sono in treno!!! Il biglietto l’ho comprato da sola con i soldi del sabato al bar, tutto il viaggio, con il letto. È grande come un armadio. Ho la cuccetta di sotto e in quella di sopra non c’è nessuno, così ci ho messo il cappotto e sembra una persona.

Arriviamo alle sei e un quarto. Non venite alla stazione al buio, conosco la strada. Sarò a casa per colazione. Di’ a Jonas che la mia camera non è sua.

Questa te la do io di persona, così non serve il francobollo.

Lina` },
      train_saether: { kind: 'report', title: 'Un rapporto di servizio, piegato nello scompartimento del capotreno', from: 'E. Saether, capotreno', date: '19/20.12.90', body:
`Nordlys Express, Halvard–Nordvik. Capotreno: E. Saether.

21.10 P. Halvard. 61 viaggiatori.
23.40 Brenna. Scesi 4, saliti 0.
00.40 Controllo biglietti, carrozza 2: cuccetta 24, viaggiatrice, circa 17–18 anni, non in grado di esibire il biglietto. Sostiene di averne comprato uno. Cappotto e borsa perquisiti in sua presenza. Nessun biglietto.
00.50 Kvitfjell. Viaggiatrice senza biglietto fatta scendere a norma di regolamento.
06.15 A. Nordvik. Nient’altro da segnalare.

(Le righe delle 00.40 e delle 00.50 sono state ripassate con un altro inchiostro, con molta cura, fino a renderle quasi illeggibili.)` },
      train_inquiry: { kind: 'report', title: 'Una deposizione nella scrivania del capotreno', from: 'Inchiesta delle Ferrovie del Nord: deposizione di E. Saether', date: '4 gennaio 1991', body:
`Ero il capotreno del Nordlys Express la notte del 19 dicembre.

Non ricordo nessuna ragazza che viaggiasse da sola. Ho controllato ogni biglietto del treno come al solito. Non è stato necessario far scendere nessuno.

Il treno non si è fermato a Kvitfjell. Nessun viaggiatore l’aveva chiesto, e la fermata era chiusa per neve.

Lavoro in ferrovia da ventisei anni.

E. Saether` },
      train_docket: { kind: 'note', title: 'Una scheda di oggetto smarrito legata a un sacco postale', from: 'Deposito 9, stazione centrale di Halvard — Oggetti smarriti', date: 'Gennaio 1991', body:
`N. 97 / 1991
Un biglietto ferroviario, corsa semplice, Halvard–Nordvik, vagone letto, carrozza 2 cuccetta 24, 19.12.90. Non obliterato.
Trovato: Nordlys Express, carrozza 2, sotto la cuccetta inferiore, dal personale delle pulizie a Nordvik, 20.12.90.
Ricevuto al Deposito 9: 7.1.91.
Impiegata: A. Lind
Stato: NON RITIRATO` },
      train_cabLog: { kind: 'report', title: 'Il registro del macchinista in cabina', from: 'Macchinista K. Aune', date: '19/20.12.90', body:
`00.47  Campanello dal capotreno: fermata a Kvitfjell.
00.50  Fermi a Kvitfjell. Fermata al buio, marciapiede sotto la neve. Neve fitta.
00.51  Sceso un viaggiatore, coda della carrozza 2. Via libera dal capotreno.
00.52  Partenza.

(La pagina è stata strappata dal registro e rimessa dentro, sciolta.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'Un disegno su un cuscino della carrozza 3', from: 'Wren, 7 anni', body:
`Pastelli a cera su carta a quadretti. Un lungo treno blu nel buio, con tutti i finestrini accesi di giallo, che se ne va verso destra. Dietro, nella neve, una ragazza con un berretto rosso in piedi accanto a un lampione, con le braccia abbassate. Sopra di lei, l’uccellino rosso.

Sotto:
LEI CE L’AVEVA` },
    },
    items: {
      ticket: { name: 'Biglietto del treno', desc: 'Corsa semplice, Halvard–Nordvik, 19.12.90, già obliterato una volta. Di qualcun altro. Era stato lasciato su un tavolo, sotto un piattino.' },
      linaTicket: { name: 'Il biglietto di Lina', desc: 'Corsa semplice, Halvard–Nordvik, vagone letto, carrozza 2 cuccetta 24, 19.12.90. Non obliterato. Se l’era comprato da sola.' },
    },
    obj: {
      train_start: 'Sali sul treno',
      train_ticket: 'Trova un biglietto prima che il capotreno trovi te',
      train_who: 'Scopri chi è stato fatto scendere a Kvitfjell',
      train_lina: 'Trova il biglietto di Lina nella cuccetta 24',
      train_punch: 'Fai obliterare il suo biglietto',
      train_brake: 'Ferma il treno a Kvitfjell: il freno d’emergenza è in cabina di guida',
    },
    mono: {
      train_start: 'Un treno. Tutti i finestrini accesi e nemmeno un’anima sul marciapiede.',
      train_board: 'Dentro. La porta si è chiusa dietro di me.',
      train_moving: 'Ci muoviamo.',
      train_conductor: 'Qualcuno con una lanterna sta arrivando lungo il corridoio.',
      train_sleeper: 'Lì dentro dorme qualcuno, girato verso la porta. Piano, Ada.',
      train_gangway: 'C’è qualcosa sotto le piastre. Non stare qui.',
      train_ticket: 'Un biglietto. Non è il mio. Dovrà bastare.',
      train_check: 'Vuole il mio biglietto.',
      train_punched: 'Clic. Va avanti. Non mi ha guardata in faccia.',
      train_letter: 'Lina. Quindici anni. A casa per colazione.',
      train_report: 'Cuccetta 24. «Sostiene di averne comprato uno». Kvitfjell, l’una meno dieci di notte, nella neve.',
      train_found: 'Sotto la cuccetta. Dove diceva lei.',
      train_turn: 'La lanterna si è fermata. Si è girato.',
      train_docket: 'A. Lind. È la mia calligrafia. La mia seconda settimana. L’ho archiviato e non ho mai chiesto di chi fosse.',
      train_punchIt: 'La sua obliteratrice. Il biglietto di lei.',
      train_claimed: 'Obliterato. Valido. Aveva il diritto di stare su questo treno.',
      train_sat: 'Si è seduto. Si è tolto il berretto.',
      train_kvitfjell: '«Kvitfjell». Non rallentiamo.',
      train_passed: 'Eccola che passa. Una lampada nella neve. Non ci siamo fermati.',
      train_again: 'Prossima fermata, Kvitfjell. Di nuovo. Gira in tondo.',
      train_brake: 'Tieniti a qualcosa.',
      train_brakeWait: 'Il freno d’emergenza. Non ancora. Non prima che lei abbia il suo biglietto.',
      train_punchWait: 'L’obliteratrice del capotreno. Non è il mio biglietto che ne ha bisogno.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Una lampada e la neve. È qui che l’ha fatta scendere. Dev’essere rimasta proprio qui, a guardare i finestrini andarsene.',
    },
    lines: {
      train_boardPrompt: 'Sali sul treno',
      train_punchPrompt: 'Oblitera il biglietto di Lina',
      train_punchLook: 'L’obliteratrice del capotreno',
      train_brakePrompt: 'Tira il freno d’emergenza (tieni premuto)',
      train_brakeLook: 'Il freno d’emergenza',
      pa_kvitfjell: '«Kvitfjell. Kvitfjell. Fermata a richiesta».',
    },
    radio: {
      train_otto1: [
        ['radio', '[le ruote, sotto il fruscio]'],
        ['otto', 'Nove ad Ada. Quel rumore. È su un treno. Vorrei che mi dicesse che ha il biglietto.'],
        ['ada', 'Non ce l’ho.'],
        ['otto', 'Allora ne trovi uno prima che il capotreno trovi lei. Sul mio scaffale i capotreno sono i peggiori. Sono molto educati e non si fermano.'],
      ],
      train_otto2: [
        ['otto', 'Ada. È appena arrivata da sola una scheda dalla posta pneumatica. Un biglietto ferroviario, non ritirato. Con la sua calligrafia. Dunque lei riempiva i miei scaffali molto prima di scenderci.'],
      ],
      train_otto3: [
        ['otto', 'Dalle sue parti si è fatto silenzio. È o molto bene o molto male. Se il treno va ancora, lo fermi. Quei treni non arrivano. Girano soltanto.'],
      ],
    },
    recap: {
      train: 'Nordlys Express, 19 dicembre 1990. Il capotreno Edvin Saether fece scendere dal treno notte la quindicenne Lina Berg alla fermata di Kvitfjell, nella neve, perché non trovava il biglietto. Se l’era comprato da sola; era sotto la sua cuccetta. Lui disse all’inchiesta che non aveva fatto scendere nessuno. Il personale delle pulizie trovò il biglietto a Nordvik e lo mandò al Deposito 9, e io lo archiviai senza mai chiedere di chi fosse. L’ho fatto obliterare, e ho fermato il treno dove lei era scesa.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
