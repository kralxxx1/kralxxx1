/* Italiano — Livello 2: Sogni di tubi (i canali di scolo, estate 1985). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      pipes: {
        name: 'LEVEL 2', title: 'Sogni di tubi', place: 'Canale di scolo C sotto Front Street — luglio 1985',
        intro: 'Gallerie di mattoni sotto Harlow, tiepide e gocciolanti. Nel luglio del 1985 tre ragazzini sono scesi quaggiù con una torcia e un sacchetto di liquirizia e hanno costruito un forte. Tu facevi parte del gruppo.\n\nLe frecce col gesso sembrano ancora fresche. Adesso quaggiù vive qualcos’altro, e odia la luce.',
      },
    },
    docs: {
      pipes_intro: { kind: 'note', title: 'Attaccato a un tubo in una bustina di plastica', from: 'Eddie', body:
`Canali di scolo. Credo che questo sia il posto dei ragazzini. Frecce col gesso ovunque.

La porta stagna in fondo non si muove finché non si sfiata il vapore. Tre valvole grandi. Girale fino in fondo, una per una.

Quaggiù ci sono cose che chiamo Striscianti. Odiano la luce. La ODIANO. Tienigli la torcia addosso e arretrano.

Non far morire la batteria quaggiù.

—E.` },
      pipes_chalk: { kind: 'wall', title: 'Gesso sui mattoni', body:
`D + T + S
SONO STATI QUI
LUGLIO 1985

→ FORTE →

(NIENTE FEMMINE)
(TRANNE NELL) (TRANNE ROSIE) (OK TUTTI)` },
      pipes_map: { kind: 'note', title: 'Una mappa del tesoro sul retro di una scatola di cereali', from: 'Toby, 11 anni', body:
`CANALE C — MAPPA SEGRETA
(NON FARLA VEDERE AI GRANDI)

X = FORTE
ZIGZAG = IL TUBO RUMOROSO
TESCHIO = DOVE SAM HA FATTO CADERE LA TORCIA E ABBIAMO DOVUTO TENERCI PER MANO

La caldaia è il drago. Non toccate la ruota rossa. Danny dice che fa starnutire tutta la città.

Se hai trovato questa mappa, adesso sei nel club.` },
      pipes_rules: { kind: 'wall', title: 'Pennarello su un’asse, a lettere grandi', body:
`REGOLE DEL FORTE
1. NIENTE GRANDI
2. VIETATO PIANGERE (TOBY DICO A TE) (SCHERZO)
3. CHI HA LA TORCIA ASPETTA GLI ALTRI
4. NESSUNO TORNA A CASA DA SOLO
5. MIGLIORI AMICI PER SEMPRE, NIENTE RIPENSAMENTI

— SAM (PRESIDENTE)` },
      pipes_works: { kind: 'note', title: 'Lavori Pubblici di Harlow — registro d’ispezione', from: 'Lavori Pubblici di Harlow', date: '2 agosto 1985', body:
`CANALE C, SEZIONE 4

Valvole di sfogo della caldaia ingrassate. Pressione normale.

Tracce di bambini: carte di caramelle, un sacco a pelo, fumetti, scritte col gesso, una torcia (scarica). Cartello all’incrocio: «FORTE — VIETATO AI GRANDI».

Si consiglia un lucchetto sulla grata di Front Street.

Il forte non è stato rimosso. Sembrava importante per qualcuno.

—R.` },
      pipes_walt: { kind: 'diary', title: 'Il diario di Walt, una pagina umida', from: 'Walt', date: 'Dentro', body:
`Gallerie. Mattoni. Non sono mai sceso quaggiù in vita mia, eppure conosco ogni svolta.

Questi non sono ricordi miei. Sto camminando nell’estate di qualcun altro.

Tre ragazzini. Una torcia. Una regola che dice che nessuno torna a casa da solo.

Vorrei dirgli che è una bella regola. Non ricordo più come si parla ai bambini. Una volta ero bravo.` },
      pipes_photo: { kind: 'photo', photo: 'fort', title: 'Una foto istantanea appuntata al muro del forte', from: 'Sconosciuto', date: 'Luglio 1985', body:
`Tre ragazzini in una galleria di mattoni, illuminati dal basso da un’unica torcia, che cercano di sembrare spaventosi senza riuscirci. Quello alto (Danny) fa le corna a quello piccolo (Toby). In mezzo, sorridente, ci sei tu.

Sulla striscia bianca, a penna: «IL FORTE. GIORNO DELL’INAUGURAZIONE.»` },
      pipes_crawlers: { kind: 'note', title: 'Strappato da un taccuino', from: 'Eddie', body:
`Sugli Striscianti.

Credo che siano gli spazzini del gioco. Quando un ricordo diventa troppo vecchio per contare, arrivano e se lo mangiano. Nessuno si ricorda più di queste gallerie tranne tre ragazzini, e infatti brulicano di Striscianti.

Veloci al buio. Stupidi alla luce. Scattano, arretrano quando si bruciano, poi girano in tondo.

Uno stick luminoso per terra alle tue spalle ti fa guadagnare un minuto. L’ho imparato a mie spese.` },
      pipes_lily3: { kind: 'drawing', drawing: 3, title: 'Un disegno arrotolato dentro un tubo', from: 'Lily, 9 anni', date: 'Maggio 1983', body:
`Pastelli a cera. Tre ragazzini sotto un grande soffitto di mattoni a volta, con una torcia in tre. Fuori, una bambina con le trecce arancioni li saluta con la mano.

SAM E TOBY E DANNY IL GRANDE ANNO TROVATO UNA GROTTA SOTTO LA STRADA.
DICONO NIENTE FEMMINE.
NELLA MIA TESTA POSSO ENTRARE.` },
      pipes_tape: { kind: 'tape', title: 'Nastro: «Diario del forte 1»', from: 'Lo stereo portatile di Danny', date: '19 luglio 1985', body:
`[Clic. Acqua che gocciola. Tre ragazzini che bisbigliano, con l’eco.]

DANNY: Diario del forte numero uno. Presenti: io, Toby e Sam, presidente.

SAM: Presidente del FORTE.

DANNY: Presidente del forte. Abbiamo quattro fumetti, due torce, di cui una funziona, e la liquirizia.

TOBY: La liquirizia l’ho portata io.

DANNY: Toby ha portato la liquirizia. Regola quattro, Sam.

SAM: Nessuno torna a casa da solo.

TOBY: Anche se è arrabbiato?

SAM: …Soprattutto se è arrabbiato.

[In lontananza, un tubo sbatte. Tutti e tre urlano, poi ridono fino a restare senza fiato.]

[Clic.]` },
    },
    obj: {
      pipes_valves: 'Sfiata le valvole del vapore ({n}/3)',
      pipes_leave: 'Attraversa la porta stagna',
    },
    mono: {
      pipes_start: 'Il canale C. Conosco quest’odore. Avevo undici anni.',
      pipes_valve: 'La valvola stride, poi tace. Da qualche parte, lontano, esce vapore sibilando.',
      pipes_fort: 'Il forte. Il nostro forte. Il sacco a pelo è ancora qui. I fumetti di Toby sono ancora qui.',
      pipes_crawler: 'Qualcosa di bianco e veloce sul soffitto. È scattato via dalla luce come se si fosse bruciato.',
    },
    lines: {
      pipes_valve: 'Gira la valvola del vapore (tieni premuto)',
    },
    radio: {
      pipes_start: [
        ['eddie', 'Gallerie. Tutto bene? Il tuo respiro si sente fortissimo alla radio.'],
        ['sam', 'Venivo quaggiù. Con Danny e Toby.'],
        ['eddie', 'Allora conosci la strada meglio di me. Prima le valvole. E tieni la luce alta. Dico sul serio.'],
      ],
      pipes_crawler: [
        ['eddie', 'Uno Strisciante. Luce addosso, Sam! Non scappare da loro al buio, sono più veloci di te.'],
      ],
      pipes_fort: [
        ['sam', 'Regola quattro. Nessuno torna a casa da solo. L’ho inventata io. Avevo undici anni.'],
        ['eddie', '…È una bella regola, Sam. Avrei voluto avere una regola così.'],
      ],
      pipes_done: [
        ['eddie', 'La pressione sta scendendo. La porta dovrebbe cedere adesso. Il prossimo è acqua. Tanta acqua.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
