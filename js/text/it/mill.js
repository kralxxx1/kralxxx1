/* Italiano — Livello 1: il magazzino della fabbrica (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'Il magazzino della fabbrica', place: 'Il ricordo di Danny — Harlow Mill, Front Street',
        intro: 'Il soffitto è a sei metri. Le scaffalature si perdono nel buio. Da qualche parte un orologio ticchetta, sempre sullo stesso secondo.\n\nIl padre di Danny ha impacchettato scatole in questo edificio per venticinque anni. Poi un venerdì gli hanno regalato un orologio e l’hanno mandato a casa.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Attaccato alla porta del montacarichi', from: 'Eddie', body:
`Il montacarichi vuole tre fusibili. Il quadro è vicino all’ufficio carico merci.

Il rosso pattuglia le corsie. Veloce, non si ferma mai, ma è RUMOROSO. Ascoltalo.

Non provare a seminarlo allo scoperto. Nessuno semina Danny.

—E.` },
      mill_layoff: { kind: 'letter', title: 'Una lettera su carta intestata', from: 'Harlow Mill, Reparto spedizioni', date: '30 maggio 1986', body:
`Caro Ray,

nell’ambito della riorganizzazione del reparto spedizioni di Front Street, la sua mansione verrà soppressa a partire dal 30 giugno 1986.

La ringraziamo per venticinque anni di servizio leale. La preghiamo di restituire la chiave dell’armadietto e il tesserino all’ufficio principale.

Accetti l’orologio allegato come segno della nostra riconoscenza.

La direzione della Harlow Mill` },
      mill_punch: { kind: 'card', title: 'Un cartellino marcatempo', from: 'Harlow Mill', date: 'Estate 1986', body:
`DIPENDENTE: KOWALSKI, D. (ESTIVO — SPAZZINO)
PAGA: 3,35 $/ora

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

Di traverso sull’ultima riga, a penna blu:
ANCHE L’ULTIMO GIORNO DI PAPÀ` },
      mill_graffiti: { kind: 'wall', title: 'Vernice spray sulle scaffalature', body:
`DAN #1
DANNY È STATO QUI
DANNY È SEMPRE QUI` },
      mill_danny1: { kind: 'note', title: 'Un biglietto piegato nella tasca di un giubbotto', from: 'Danny', date: 'Marzo 1987', body:
`Tutti pensano che io non abbia paura di niente.

Ho paura di papà seduto in cucina tutto il giorno con la radio spenta.

Allora gioco. Chi è primo non resta seduto in cucina.

(Se Rosie legge questo, la ammazzo sul serio.)` },
      mill_ray: { kind: 'letter', title: 'Una lettera mai spedita', from: 'Ray, il padre di Danny', date: 'Maggio 1987', body:
`Danny,

la polizia mi ha chiesto di nuovo della chiave. Gli ho detto che non mi importa di nessuna chiave. Puoi avere tutte le chiavi di questa città.

Adesso lavoro in ferramenta. Va bene così. Meno ore. Ascolto la partita alla radio.

Ti ho aggiustato la bici. Catena nuova, freni nuovi. È in garage.

Torna a casa e salici sopra. Non dirò una parola.

Papà` },
      mill_manifest: { kind: 'printout', title: 'Una bolla di spedizione', from: 'Harlow Mill, banchina 3', date: '17 aprile 1987', body:
`SPEDIZIONE N. 0256
CONTENUTO: 1 orologio da polso (fermo alle 3:17)
PESO: niente
DESTINAZIONE: —
FIRMA DEL RICEVENTE: —

La carta è tiepida, come se fosse appena uscita dalla stampante.` },
      mill_walt3: { kind: 'diary', title: 'Il diario di Walt', from: 'Walt', date: 'Dentro, giorno ?', body:
`Il rosso non si ferma mai. Rifà sempre gli stessi giri, come Danny giocava il labirinto: sempre primo, sempre il più veloce, mai un respiro.

Oggi mi è venuto addosso urlando. HAI MOLLATO. HAI MOLLATO.

Io non ho mai mollato niente. Li ho tenuti stretti tutti quanti per cinque anni. Allora con chi ce l’ha?

Dopo l’ho seguito e non ricordo perché. Credo di avere avuto fame.` },
      mill_shrine: { kind: 'note', title: 'Sotto la foto sull’altarino', from: 'W.', body:
`Doveva sempre essere il primo.
Il primo al cabinato. Il primo a 900.000.
Il primo ad attraversare lo schermo.

Dagli qualcosa che si ferma.` },
      mill_tape: { kind: 'tape', title: 'Nastro: «Primo posto, per la storia»', from: 'Il registratore di Rosie', date: '16 aprile 1987, 23:52', body:
`[Clic. Rumore di sala giochi. Ragazzini che ridono.]

DANNY: Qui Danny Kowalski, primo posto, registrazione per la storia. Stanotte battiamo il kill screen.

ROSIE: Stanotte PROVIAMO a battere il kill screen.

DANNY: Walt dice che è impossibile. Walt diceva anche che nessuno avrebbe superato novecentomila.

TOBY: Finiremo nei guai? Mia mamma crede che dorma da Sam.

DANNY: I guai sono per chi si fa beccare, Toby.

NELL: …Sam ha preso la strada di casa, Danny.

DANNY: Sam ha fifa. Più kill screen per noi.

[Una pausa.]

TOBY: Sam non ha fifa. Sam verrà.

[Clic.]` },
    },
    obj: {
      mill_fuses: 'Trova i fusibili ({n}/3)',
      mill_panel: 'Metti i fusibili nel quadro del montacarichi',
      mill_wait: 'Il montacarichi sta arrivando… Sopravvivi ({n} s)',
      mill_leave: 'Sali sul montacarichi',
    },
    mono: {
      mill_start: 'Un orologio che ticchetta. Sempre lo stesso secondo.',
      mill_dannySeen: 'Rosso. Un lenzuolo fradicio, bombato come una testa, l’orlo strappato a punte. Due occhi enormi e nessuna faccia. Sotto c’è qualcosa grande quanto un ragazzo.',
      mill_fuse: 'Un altro fusibile.',
      mill_elevator: 'Il montacarichi sta arrivando. Piano. Pianissimo.',
      mill_watch: 'Le 3:17. Come l’orologio.',
    },
    lines: {
      mill_panel: 'Inserisci i fusibili',
      mill_panelIdle: 'Quadro dei fusibili ({n}/3)',
      mill_slots: 'Il quadro ha tre alloggiamenti vuoti.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? Ci sei? …Oh. Questo posto lo conosco. Harlow Mill, il magazzino di Front Street. Il padre di Danny ha lavorato qui venticinque anni.'],
        ['eddie', 'Il che vuol dire che qui ci sarà anche il rosso.'],
      ],
      mill_danny: [
        ['eddie', 'Ce l’hai addosso! Non sfidarlo in corsa allo scoperto. Spezza la linea, prendi un angolo, metti qualcosa tra voi!'],
        ['sam', 'Sta urlando qualcosa!'],
        ['eddie', 'Lo fa sempre. «Hai mollato.» L’ha urlato a me, l’ha urlato a Walt. Non so a chi si riferisca. CORRI.'],
      ],
      mill_watch: [
        ['eddie', 'È un orologio? …L’orologio di Ray. Gliel’hanno dato il giorno che l’hanno licenziato. Da allora Danny l’ha portato tutti i giorni.'],
        ['eddie', 'Qui intorno c’è un altarino, da qualche parte. Portalo lì. Magari si ricorda.'],
      ],
      mill_freed: [
        ['eddie', '…Si è fermato? Sam, che hai fatto? Se ne sta lì… fermo.'],
        ['eddie', 'Oddio. È Danny. È proprio Danny.'],
      ],
      mill_elevator: [
        ['eddie', 'Quel montacarichi fa un fracasso. L’ha sentito tutto quello che c’è qui dentro. Resisti finché non arriva.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
