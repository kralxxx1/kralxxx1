/* Italiano — Capitolo 8: Luci brillanti (il luna park di Falk). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      carnival: {
        name: 'CAPITOLO 8', title: 'Luci brillanti', place: 'Luna park di Falk, porto di Halvard',
        intro: 'Domenica 30 settembre 1984, poco prima di mezzanotte. L’ultima notte della stagione.\n\nLa folla è tornata a casa. Le luci sono rimaste accese. Il treno fantasma è bruciato la notte prima, e al vecchio pagliaccio hanno detto di fare i bagagli.',
      },
    },
    docs: {
      carnival_poster: { kind: 'notice', title: 'Un manifesto sul botteghino', from: 'Luna park di Falk', date: 'Settembre 1984', body:
`LUNA PARK DI FALK
Porto di Halvard — dal 14 al 30 settembre
ULTIME SERE!

La Grande Giostra · La Ruota Panoramica
La Casa delle Risate — vieni a conoscere LOTTE LA RIDENTE!
Il TRENO FANTASMA (se hai il coraggio)
Pesca le Paperelle · Tiro a Segno · Prova la tua Forza

e ogni pomeriggio alle 4 e alle 7:
PIPO IL PAGLIACCIO
«Il pagliaccio di Halvard, da ventuno stagioni»` },
      carnival_closing: { kind: 'notice', title: 'Un avviso legato al cancello col fil di ferro', from: 'E. Falk, proprietario', date: '30.9.84', body:
`IL TRENO FANTASMA È CHIUSO.

Dopo l’incendio di sabato notte, il treno fantasma non riaprirà più in questa stagione. Nessuno è rimasto ferito.

La direzione ringrazia il pubblico e i vigili del fuoco di Halvard, e si scusa per la delusione.

Il Luna park di Falk lascia Halvard martedì mattina. Arrivederci all’anno prossimo!` },
      carnival_fire: { kind: 'report', title: 'Una copia del rapporto d’incendio nella cabina di comando', from: 'Vigili del fuoco di Halvard', date: '30 settembre 1984', body:
`Intervento 84/211. Luna park di Falk, porto. Chiamata 01.40, 30.9.84.
Incendio nella giostra al buio («Treno fantasma»). Spento alle 02.15. Nessun ferito.

Origine dell’incendio: la cabina dell’operatore sul retro della giostra, in un cestino.
Causa probabile: una sigaretta non spenta.

Il proprietario, sig. E. Falk, dichiara che il suo dipendente H. Brecht (pagliaccio) dormiva e fumava nella cabina. Il sig. Brecht è stato licenziato e non è stato possibile sentirlo. Il figlio del proprietario, K. Falk, 19 anni, non era presente.

Nota dell’agente: due tipi di mozziconi nel cestino. Rossetto su uno.` },
      carnival_kasper: { kind: 'letter', title: 'Una busta sulla scrivania bruciata, mai spedita', from: 'K.', date: '1° ottobre 1984', body:
`Hugo,

sono stato io. Io e Mette, nella cabina dopo la chiusura, e ho svuotato la scatoletta nel cestino senza guardare perché abbiamo sentito arrivare papà.

Papà lo sa. Papà dice che ormai è fatta, che tanto stavi per smettere, e ti ha dato due settimane di paga. Quando ha detto che eri stato tu, mi hai guardato. Non hai detto niente. Non so perché non hai detto niente.

Mi dispiace. Mi dispiace.
K.

(Sulla busta: «Pipo». Nessun indirizzo. Sul retro, con la stessa mano: «dove la spedisco»)` },
      carnival_ledger: { kind: 'report', title: 'Il libro dei conti del proprietario nella cabina della ruota', from: 'E. Falk', date: 'Settembre 1984', body:
`29.9 Incassi, tutte le giostre — 14.220. Treno fantasma: incendio dopo la chiusura (01.40). Fuori servizio.
30.9 Brecht, H. («Pipo»). 21 stagioni. Liquidato: due settimane di paga, in contanti. Da non riassumere.
     Denuncia all’assicurazione, treno fantasma: incendio causato da dipendente che fumava nella cabina posteriore (Brecht). Dichiarazione firmata E.F.
     K. — guiderà il camion fino a Ostra martedì. Tenerlo occupato.` },
      carnival_rosa: { kind: 'note', title: 'Un biglietto appuntato sotto il banco delle maschere', from: 'Rosa, maschere e scherzi', date: 'Notte del 30.9.84', body:
`Pipo è passato davanti alla mia bancarella a mezzanotte con la sua valigia. Si era già tolto la faccia, e sembrava che avesse cent’anni.

Si è tolto il naso dalla tasca, l’ha messo sul mio banco e ha detto: «Tienimelo tu, Rosa».

Gli ho chiesto dove andava. Ha detto: «A casa». Non ce l’ha, una casa. Vive in quella roulotte da vent’anni.

Ho messo il naso sotto il banco, dove nessuno lo prenderà. — R.` },
      carnival_hugo: { kind: 'note', title: 'Un cartoncino infilato nella cornice dello specchio', from: 'Hugo Brecht', date: '(molto vecchio, riscritto più volte)', body:
`Quello che mi ha insegnato il vecchio Bruno, 1931:

La faccia si mette in quest’ordine. Il bianco. Poi il rosso. Poi il nero. Poi il naso.
Il naso si mette per ultimo e si toglie per primo.
Col naso sei Pipo, e niente può farti del male.
Senza sei solo Hugo. Quindi stai attento a dove te lo togli.

Il naso vive sullo specchio. Mai in tasca.` },
      carnival_fan: { kind: 'letter', title: 'Una lettera di un bambino sul letto', from: 'Tomas, 7 anni', date: 'Settembre 1984', body:
`Caro Pipo

Grazie per il cane di palloncino che mi hai fatto. Ce l’ho ancora. Si sta sgonfiando un po’.

Da grande voglio fare il pagliaccio e fare le cadute.

baci da Tomas

(Un disegno a pastelli: un pagliaccio con un naso rosso grande come la sua testa, che cade, e tutti che ridono.)` },
      carnival_paper: { kind: 'clipping', title: 'Una pagina di giornale su una panchina', from: 'Notizie dal Porto di Halvard', date: 'Giovedì 4 ottobre 1984', body:
`TROVATA LA VALIGIA DEL PAGLIACCIO SUI GRADINI DEL PORTO

Una malconcia valigia marrone appartenente a Hugo Brecht, 71 anni, noto a tre generazioni di bambini di Halvard come Pipo il pagliaccio, è stata trovata lunedì mattina sui gradini sotto il molo del pesce.

Il sig. Brecht era stato licenziato dal Luna park di Falk dopo un incendio sul treno fantasma sabato notte, di cui il proprietario lo aveva incolpato. Da allora non è più stato visto. Chiunque l’abbia visto domenica notte è pregato di rivolgersi alla polizia portuale.

Il luna park ha lasciato Halvard martedì.` },
      wren8: { kind: 'drawing', drawing: 8, title: 'Un disegno sul pavimento della stanza inclinata', from: 'Wren, 7 anni', body:
`Pastelli a cera, il foglio piegato in quattro. Un pagliaccio con il naso rosso e una grande valigia marrone che se ne va lungo una strada verso il mare, salutando con il braccio alzato in alto. Dietro di lui, una ruota panoramica piena di luci. L’uccellino rosso è seduto sul suo cappello.

Sotto:
CIAO PIPO` },
    },
    items: {
      fuse: { name: 'Fusibile', desc: 'Un fusibile a cartuccia di porcellana e ottone. 60 A. Dall’officina della casa delle risate.' },
      nose: { name: 'Il naso di Pipo', desc: 'Un naso da pagliaccio, rosso, lucido per l’uso. È stato su molte facce, e sempre su una sola.' },
    },
    obj: {
      carnival_start: 'Trova un modo per uscire dal luna park',
      carnival_power: 'Il treno fantasma esce attraverso la recinzione. Rimettilo in funzione',
      carnival_fuse: 'Trova un fusibile: prova nell’officina della casa delle risate',
      carnival_fit: 'Monta il fusibile nella cabina di comando del treno fantasma',
      carnival_why: 'Scopri che cosa è successo a Pipo',
      carnival_nose: 'Trova ciò che Pipo si è lasciato dietro',
      carnival_mirror: 'Rimetti il naso di Pipo sul suo specchio',
      carnival_ride: 'Esci a bordo del treno fantasma',
    },
    mono: {
      carnival_start: 'Un luna park. Chiuso per la notte, con tutte le luci lasciate accese.',
      carnival_gate: 'Incatenato. E la recinzione è tre metri di rete con il filo spinato in cima.',
      carnival_booth: 'La cabina è vuota. Il vetro è rotto. Dall’interno.',
      carnival_lotte: 'Qualcuno ride. Molto lontano. Non si ferma nemmeno per respirare.',
      carnival_ghost: 'Il treno fantasma. Bruciato. Il binario lo attraversa ed esce dal retro, attraverso la recinzione.',
      carnival_noPower: 'Morto. Il portafusibile è vuoto e il vecchio fusibile è nero nel vassoio.',
      carnival_fuse: 'Un fusibile. Sessanta ampere. Sembra quello giusto.',
      carnival_power: 'Luci dentro. I vagoncini non si muovono comunque. Qualcosa li trattiene.',
      carnival_maze: 'Specchi. Io, e io, e qualcuno dietro di me in ognuno. Dietro di me non c’è nessuno.',
      carnival_masks: 'Gente con le maschere, ferma in giro. Un minuto fa non c’era.',
      carnival_nose: 'Il suo naso. «Tienimelo tu, Rosa».',
      carnival_music: 'L’organo è partito. Da solo.',
      carnival_horses: 'I cavalli. Stanno scendendo dalla giostra.',
      carnival_stopped: 'La musica si è fermata. Si sono fermati anche loro. Esattamente dove sono.',
      carnival_trailer: 'La sua roulotte. Lo specchio è illuminato.',
      carnival_mirrorLook: 'Il suo specchio. Un segno tondo e pulito sulla mensola di vetro, dove c’era sempre qualcosa.',
      carnival_placed: 'Ecco. Dove vive quando lui è soltanto Hugo.',
      carnival_claimed: 'Le lampadine intorno allo specchio si spengono una alla volta.',
      carnival_running: 'Qualcosa si è avviato dall’altra parte del luna park. Il treno fantasma.',
      carnival_notYet: 'Il binario esce dal retro. Ma senza corrente non va.',
      carnival_board: 'Tieniti alla sbarra.',
      carnival_out: 'I gradini del porto. Una valigia marrone sull’ultimo, e la marea che ci sale sopra.',
      carnival_kasper: 'L’ha scritta e non l’ha mai spedita. «Dove la spedisco».',
      carnival_fence: 'Attraverso la parete di fondo, attraverso la recinzione.',
    },
    lines: {
      carnival_boothPrompt: 'Monta il fusibile',
      carnival_boothLook: 'I comandi della giostra',
      carnival_mirrorPut: 'Metti il naso sullo specchio',
      carnival_mirrorLook: 'Lo specchio di Pipo',
      carnival_ridePrompt: 'Sali sul vagoncino',
      carnival_rideLook: 'Un vagoncino del treno fantasma',
    },
    radio: {
      carnival_otto1: [
        ['radio', '[un organo da fiera, lontano, stonato]'],
        ['otto', 'Nove ad Ada. Sento un luna park. Ho uno scaffale di bigliettini di carta per le giostre, e un naso rosso. Non ho idea del perché l’ho detto.'],
        ['ada', 'Il cancello è incatenato.'],
        ['otto', 'I luna park sono recintati perché la gente paghi, non perché resti dentro. C’è sempre un’uscita che usa il personale. Segua i binari.'],
      ],
      carnival_otto2: [
        ['otto', 'Ada. Non stia ferma vicino a niente che porti una faccia. E se parte la musica, si muova finché suona. Quando si ferma, si ferma anche tutto ciò che ci balla sopra.'],
      ],
      carnival_otto3: [
        ['otto', 'Il naso è sparito dal mio scaffale. Bene. Non toccava a me tenerlo. Ancora uno scaffale, Ada, ed è quello verso cui cammina da tutta la notte.'],
      ],
    },
    recap: {
      carnival: 'Il Luna park di Falk, 30 settembre 1984. Kasper Falk, diciannove anni, diede fuoco al treno fantasma con una sigaretta; suo padre disse ai vigili del fuoco che era stato il vecchio pagliaccio, Hugo Brecht, e lo liquidò. Hugo non disse niente. Lasciò il suo naso a Rosa al banco delle maschere e uscì dal cancello con la sua valigia, e la valigia fu trovata sui gradini del porto. Ho rimesso il suo naso sul suo specchio, dove viveva, e sono uscita attraverso la recinzione sul treno fantasma.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
