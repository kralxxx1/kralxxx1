/* Italiano — Livello 4: Harlow Mutual (Rosie). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      office: {
        name: 'LEVEL 4', title: 'Harlow Mutual', place: 'Il ricordo di Rosie — Keystone Building, 3° piano',
        intro: 'Postazioni, schermi verdi, caffè freddo. Squilla un telefono. Poi un altro. Poi tacciono tutti insieme.\n\nRosie faceva i compiti qui ogni sera mentre sua madre restava fino a tardi, e parlava in un registratore perché l’ufficio sembrasse meno vuoto.',
      },
    },
    docs: {
      office_lily4: { kind: 'drawing', drawing: 4, title: 'Un disegno in una cartellina con scritto «LIL — DA TENERE»', from: 'Lily, 9 anni', body:
`Pastelli a cera. Un palazzo alto con tante finestre. A una finestra, una ragazza con le cuffie parla in un microfono. Le note musicali volano sopra tutta la città.

ROSIE ANDRÀ ALLA RADIO.
(ROSIE A VOLTE MI ACCOMPAGNA A CASA DALLA SALA GIOCHI.)
MI FA SCEGLIERE LE CANZONI.` },
      office_intro: { kind: 'notice', title: 'Cartello sulla porta della sala sicurezza', from: 'Servizi generali', body:
`SALA SICUREZZA
Codice cambiato ad aprile 1987 secondo il regolamento aziendale.
A ogni capo reparto è stata assegnata UNA cifra.
Non scrivete la vostra cifra.

(Quattro persone diverse hanno scritto la loro cifra da qualche parte su questo piano.)` },
      office_clue1: { kind: 'printout', title: 'Una circolare dimenticata nella stampante', from: 'Servizi generali', date: '2 aprile 1987', clue: 1, body:
`A: Ufficio sinistri
DA: Servizi generali

La vostra cifra del nuovo codice di sicurezza è: 1
È la PRIMA cifra.

Memorizzatela e distruggete questa circolare.

(Nessuno ha distrutto questa circolare.)` },
      office_clue2: { kind: 'screen', title: 'Terminal: CODE.TXT', from: 'Terminale d’ufficio', clue: 2, body:
`C:\\> TYPE CODE.TXT

CODICE SALA SICUREZZA
POSIZIONE 2 = 0
POSIZIONI 3 E 4: chiedere a Carol, ufficio sinistri.
Tanto lei sa tutto.

C:\\> _` },
      office_clue3: { kind: 'wall', title: 'Lavagna bianca della sala relax', from: 'Rosie', clue: 3, body:
`ROSIE RADIO
10_.3 FM
L’UNICA STAZIONE CHE TRASMETTE
QUELLO CHE HAI BISOGNO DI SENTIRE

numero mancante = il mio numero fortunato = 7
(La mamma dice che non posso mettere la mia stazione nel codice. Troppo tardi!)` },
      office_clue4: { kind: 'phone', title: 'Segreteria, interno 1073', from: 'Carol, ufficio sinistri', clue: 4, body:
`[Bip.]

CAROL: Rosie, tesoro, sono la mamma. Sono bloccata alla riunione sinistri, va per le lunghe un’altra volta.

CAROL: Se chiamano i servizi generali per il codice, di’ loro che l’ultima cifra è tre. Tre, come noi tre: tu, io e il microonde.

CAROL: Non mangiare tutti i cracker del distributore. Ti voglio bene. Prima i compiti, poi la radio.

[Bip.]` },
      office_carol: { kind: 'note', title: 'Biglietto sul frigo della sala relax', from: 'Carol, la madre di Rosie', date: 'Aprile 1987', body:
`R —

la riunione va per le lunghe di nuovo. La cena è nel congelatore, il contenitore col coperchio blu. Sette minuti, non dieci.

I compiti PRIMA della radio.

Sono fiera di te. Lo so che non te lo dico. Te lo dico sul frigo.

—Mamma` },
      office_tracklist: { kind: 'card', title: 'La copertina di una cassetta', from: 'Rosie', date: 'Aprile 1987', body:
`OPERAZIONE 256 — COMPILATION UFFICIALE

LATO A: PER STANOTTE
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Lantern
3. Midnight at the Starlight — Rosie (dal vivo dalla sala relax)
4. Don’t Look Back — Harbor Lights

LATO B: PER DOPO
(vuoto — lo registriamo quando avremo vinto)` },
      office_rosie_tape: { kind: 'tape', title: 'Nastro: «Rosie Radio, in diretta»', from: 'Il registratore di Rosie', date: '14 e 17 aprile 1987', body:
`[Clic. Ronzio dei neon. Un microonde che fa il conto alla rovescia.]

ROSIE: Buonasera, Harlow! Qui Rosie Radio, centosette-punto-tre, in diretta dalla sala relax della Harlow Mutual, dove il caffè è bruciato e il futuro è splendente.

ROSIE: [più piano] A volte parlo in questo coso per un’ora e nessuno sente. Va bene così. È bello fare finta che ci sia qualcuno là fuori.

[Il nastro fruscia e salta. Adesso: pioggia sul vetro, musica dei cabinati, un ventilatore. Il contatore segna 12:40.]

ROSIE: [sussurrando] Rosie Radio, in diretta dallo Starlight dopo la chiusura. Livello duecentododici. Danny è alla leva e suda.

[Tre colpi su una porta di metallo.]

NELL: C’è qualcuno sul retro.

TOBY: [già di corsa] Lo sapevo! Lo SAPEVO!

[Un chiavistello scorre. La pioggia diventa forte.]

ROSIE: Bene, bene, bene. Guarda chi torna strisciando.

TOBY: [ridendo, quasi in lacrime] Eccoti!

ROSIE: Saluta Harlow, pezzo di—

[Clic. Il nastro finisce qui.]` },
      office_walt5: { kind: 'diary', title: 'Il diario di Walt', from: 'Walt', date: 'Dentro, giorno ?', body:
`La viola è sempre dove sto per andare io. Mi legge come una mappa.

Rosie lo faceva anche al cabinato. Si metteva dietro Danny e sussurrava: «sinistra, sinistra, adesso aspetta, adesso VAI». Lui non ha mai ammesso di darle retta.

Oggi sono andato a sinistra. Lei era già lì. Non mi ha toccato. Mi ha solo guardato, come se le dispiacesse.` },
      office_eddie_page: { kind: 'note', title: 'Una pagina strappata e accartocciata', from: 'Eddie', body:
`…uno dentro, uno fuori. Quindi la porta vuole che qualcuno resti indietro. Qualcuno che attraversi lo schermo dopo di me. Potrebbe essere chiunque. Potrebbe essere un ragazzino.

No. Smettila.

Non sei quel tipo di persona, Eddie.` },
      office_board: { kind: 'wall', title: 'Lavagna della sala riunioni', from: 'Sala riunioni B', body:
`REVISIONE SINISTRI
- arretrati: 212 pratiche
- straordinari: approvati (di nuovo)
- venerdì: pranzo in condivisione

Di traverso su tutto, con un altro pennarello:
DOVE SONO FINITI TUTTI` },
      office_phone2: { kind: 'phone', title: 'Linea 0256', from: 'Linea sconosciuta', body:
`[Scariche. Poi una voce piatta, infantile, che conta piano.]

…duecentocinquantatré…
…duecentocinquantaquattro…
…duecentocinquantacinque…

[Il conteggio si ferma. Un respiro, attaccato alla cornetta.]

…duecentocinquant-

[La linea cade.]` },
      office_phone3: { kind: 'phone', title: 'Una telefonata dal 1987', from: 'Maggie Marsh', date: '17 aprile 1987, 7:12', body:
`[Squilli, poi una donna che si sforza tanto di sembrare calma.]

MAGGIE: Pronto? Carol? Sono Maggie, la mamma di Toby. Scusa se ti chiamo al lavoro così presto. Rosie è con te? Toby ha detto che dormiva da Sam, ma Sam dice che Toby non è mai arrivato…

MAGGIE: C’è qualcuno?

MAGGIE: …Gli ho lasciato accesa la luce del portico. La lascio accesa e basta.

[Clic.]` },
      office_personnel: { kind: 'screen', title: 'Terminal: PERSONNEL.TXT', from: 'Terminale d’ufficio', body:
`HARLOW MUTUAL — UFFICIO SINISTRI
CAROL A. ..... LIQUIDATRICE ... STRAORDINARI T1: 212 ORE
DENNIS R. .... RESPONSABILE ... STRAORDINARI T1:  12 ORE
MARGE T. ..... IMPIEGATA ...... STRAORDINARI T1:   0 ORE

REGISTRO VISITATORI (DOPO LE 18):
ROSIE A. (FIGLIA DI CAROL A.) ... 61 VISITE

C:\\> _` },
    },
    obj: {
      office_code: 'Trova le cifre del codice di sicurezza ({n}/4)',
      office_keypad: 'Inserisci il codice nella tastiera della sala sicurezza',
      office_card: 'Prendi la tessera di sicurezza',
      office_stairs: 'Usa la tessera sulla porta della scala antincendio',
    },
    mono: {
      office_start: 'Un ufficio. Schermi verdi. Non c’è nessuno, ma sembra che si siano appena alzati tutti.',
      office_rosieSeen: 'Viola… davanti a me. È arrivata prima. I suoi occhi sono dove voglio andare io.',
      office_code: 'Eccole tutte e quattro. Uno, zero, sette, tre. La stazione di Rosie.',
      office_cameras: 'I monitor mostrano le telecamere del piano. Adesso le vedo sulla mappa.',
      office_tape: 'Il lato B è vuoto. «Per dopo.»',
    },
    lines: {
      office_keypad: 'Inserisci il codice',
      office_card: 'Passa la tessera',
      office_cardIdle: 'Lettore di tessere (rosso)',
      office_cardRed: 'La spia del lettore è rossa.',
    },
    radio: {
      office_start: [
        ['eddie', 'Un ufficio? …Harlow Mutual. La madre di Rosie lavorava qui. Rosie faceva i compiti nella sala relax ogni sera fino alle nove.'],
        ['eddie', 'Chiamava la sala giochi dal loro telefono e ci faceva le previsioni del tempo. Ogni santa sera.'],
      ],
      office_rosie: [
        ['eddie', 'La viola è davanti a te! Legge dove stai andando. Torna indietro. Girati senza motivo. So come suona.'],
      ],
      office_tape: [
        ['eddie', 'La compilation. Ne aveva fatta una per quella notte. Il lato B era «per dopo».'],
        ['sam', 'Dopo cosa?'],
        ['eddie', 'Dopo aver vinto. Dopo essere tornati a casa.'],
      ],
      office_freed: [
        ['eddie', 'Cammina accanto a te. Non davanti. Accanto.'],
        ['eddie', 'Stava così dietro Danny al cabinato. Proprio lì, a sussurrargli le mosse.'],
      ],
      office_page: [
        ['sam', 'Eddie. Qui c’è una pagina. La tua calligrafia. «Uno dentro, uno fuori. Potrebbe essere un ragazzino.»'],
        ['eddie', '…È vecchia. La prima settimana ho scritto un sacco di stupidaggini. Lascia perdere.'],
        ['eddie', 'Le scale, Sam. Vai alle scale.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
