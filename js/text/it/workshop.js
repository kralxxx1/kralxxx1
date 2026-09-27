/* Italiano — Livello 11: Il laboratorio (Walt, la cantina sotto la sala giochi, aprile 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      workshop: {
        name: 'LEVEL 11', title: 'Il laboratorio', place: 'Il ricordo di Walt — sotto la sala giochi Starlight, 17 aprile 1987, 3:20',
        intro: 'La cantina di Walt: televisori sventrati, fumo di stagno e, dietro una porta d’acciaio, una macchina grande come un frigorifero, che ronza. È qui che è nato il Kernel.\n\nQualcosa di grosso, arancione e sorridente cammina tra i banconi, lentamente, come cammina un costume quando dentro non c’è nessuno.',
      },
    },
    items: {
      waltKey: { name: 'La chiave di Walt', desc: 'Una chiave d’acciaio con la scritta KERNEL — SOLO W. L’impugnatura è consumata a forma del suo pollice.' },
    },
    docs: {
      workshop_intro: { kind: 'note', title: 'Sulle scale della cantina', from: 'Eddie', body:
`Non scendevo quaggiù dal 1988. È identico. È questa la cosa peggiore.

Il Kernel è dietro la porta d’acciaio. Walt teneva la chiave al suo bancone. Le tre manopole di calibrazione sono sul davanti del Kernel. I valori sono sullo schema, da qualche parte sui banconi.

Impostale bene e credo che il gioco ci farà passare fino alla casa.

Quella cosa che gira è Chompy. Il costume. È lento. Non farti abbracciare.

—E.` },
      workshop_schematic: { kind: 'note', title: 'Schema, matita blu su carta millimetrata', from: 'Walt & Eddie', date: 'Rev. C, marzo 1987', body:
`KERNEL — FORZATURA DEL CONTATORE DI LIVELLO

Manopola A (riga) ...... 2
Manopola B (colonna) ... 5
Manopola C (offset) .... 6

= 256

!! Con il contatore a 256 il tabellone si disegna oltre il kill screen.
!! Nessuno sa cosa ci venga disegnato. — E.
!! È proprio questo il punto. — W.` },
      workshop_eddiebench: { kind: 'note', title: 'Attaccato al vecchio bancone di Eddie', from: 'Eddie', date: '17 aprile 1987', body:
`Quella sera toccava a me chiudere la porta sul retro.

Non l’ho fatto. Avevo fretta. Spettacolo di mezzanotte al Rialto e non volevo perdermi l’inizio.

Walt è salito alle 11. La porta sul retro è rimasta aperta tutta la notte.

Non l’ho mai detto a nessuno. Ho lasciato che Walt se lo portasse addosso per tutti e due.

È per questo che sono entrato, Sam. Non è coraggio. È il conto che arriva.` },
      workshop_keytag: { kind: 'note', title: 'Un cartellino portachiavi sul bancone', from: 'Walt', date: '1986', body:
`(Un cartellino di carta su un anello d’acciaio. Manca una chiave.)

COPIA — INGRESSO
Consegnata a DANNY K. — il sabato, 8:00, per preparare i cabinati.
«Giovanotto responsabile.» — W.

(Sotto, con un inchiostro più recente: «Ho detto alla polizia che se ne sono andati a mezzanotte. Non dirò loro che ho dato la mia chiave a un ragazzino. Toglierebbero a suo padre l’ultima cosa buona che gli resta: che di suo figlio ci si fidava.»)` },
      workshop_receipt: { kind: 'note', title: 'Una ricevuta appuntata sull’appendiabiti del costume', from: 'Harlow Party Supply', date: 'Marzo 1983', body:
`1 × COSTUME DA MASCOTTE, su misura — «CHOMPY»
Tondo, arancione, corna di feltro, denti di gommapiuma (dal disegno allegato)
Ordine speciale ....................... $180.00
Modifiche: per un uomo di 1,88 m ...... $25.00
Nota del negozio: «Speriamo che piaccia a sua figlia!»

(Pinzato sopra, più tardi: un tagliando del parcheggio del St. Agnes, 27 ottobre 1983. Il giorno in cui l’ha portato su per le scale.)` },
      workshop_nora: { kind: 'letter', title: 'Una lettera mai spedita, con indirizzo e francobollo', from: 'Walt', date: 'Febbraio 1992', body:
`Nora,

ho letto tutte le tue lettere. Non ti ho risposto perché ogni risposta che scrivevo era una bugia o un addio.

Il mese prossimo entro a prenderli. Non lasciare che nessuno stacchi la spina. Né la banca, né la polizia, né tu.

Se non sarò tornato quando arriverà la banca, il foglio dei punteggi è nel corridoio. Tienilo. I nomi che ci sono sopra contano più di qualunque cosa io abbia mai costruito.

Tuo fratello,
Walt

(Non è mai stata spedita.)` },
      workshop_ticket: { kind: 'note', title: 'Una bolla di riparazione TV sul bancone', from: 'Riparazioni Starlight (sul retro)', date: 'Marzo 1986', body:
`CLIENTE: Ann Keller (Maple St.)
APPARECCHIO: televisore a colori 19 pollici, niente immagine
RIPARAZIONE: sostituito il trasformatore di riga.
IMPORTO: 0 $ — «pagato in biscotti con gocce di cioccolato»

(Fissato con una graffetta, un biglietto con la tua stessa scrittura di quando avevi dodici anni: «GRAZIE WALT PER AVERE AGGIUSTATO LA NOSTRA TV POSSIAMO RIVEDERE LA PARTITA — SAM»)` },
      workshop_317: { kind: 'tape', title: 'Nastro: «3:17»', from: 'Il registratore di Rosie (trovato dentro il cabinato n. 7, stava ancora registrando)', date: '17 aprile 1987, 3:14–3:42', body:
`[Clic. La sala giochi dopo la chiusura. La musica di Hungry House, accelerata e storta.]

ROSIE: …le tre e quattordici, e siamo al LIVELLO 255. Rosie Radio, in diretta, la storia si fa adesso—
DANNY: Sst! Il percorso! Nell, da che parte?
NELL: Sinistra. Sinistra, poi aspettare. Aspettare… adesso.
TOBY: Sam, tocca a te il pulsante. Sam? Stai tremando.
SAM: Scotta. Tutto il cabinato scotta. Ragazzi, scotta troppo.

[3:16. La musica si ferma. Un lungo suono continuo.]

DANNY: Ci siamo. È il 256. Guardate il lato destro…
NELL: È spaccato. Sono tutte lettere. E… i nostri nomi. D-A-N. R-O-S. N-E-L. T-O-B. S-A-M.
ROSIE: Il patto. Tutti. Tutte e cinque le mani sulla leva. ADESSO.
TOBY: Ti tengo, Sam. Ti tengo la mano.
NELL: Gli Spettri si sono girati. Ci guardano. Da dentro lo schermo. Ci stanno GUARDANDO.
SAM: Brucia— non ce la— non ce la faccio—
DANNY: NESSUNO MOLLA!

[Una mano si strappa dal metallo rovente. Scarpe da ginnastica sulla moquette. La porta sul retro sbatte, aperta sulla pioggia.]

TOBY: SAM! SAM, TORNA! [un singhiozzo] …Va bene. Va bene. Anche in quattro va bene.
ROSIE: [tremando] CONTINUE. Premete. Insieme.

[3:17. Un suono come un enorme respiro trattenuto. Quattro brevi sussulti. Poi solo il ronzio.]

[3:20. Una porta. Passi sulle scale. Walt, senza fiato.]

WALT: Ragazzi? Danny? …No. No, no, no. Lo schermo. I nomi sotto gli Spettri. DAN. ROS. NEL. TOB. Oh Dio. Oh Dio, sono i loro nomi.
WALT: [un uomo che si lascia cadere pesantemente a terra] Mi dispiace. Vi tiro fuori. Vi prometto che vi tiro fuori.

[Il nastro gira in silenzio per ventidue minuti. Poi: clic.]` },
      workshop_lily8: { kind: 'drawing', drawing: 8, title: 'Un disegno piegato nella cassetta degli attrezzi di Walt', from: 'Lily, 9 anni', body:
`Pastelli a cera, l’ultimo. Un omone è seduto per terra accanto a un’alta macchina luminosa, e piange. Una bambina sta in piedi dietro di lui con la mano sulla sua spalla. È disegnata sorridente.

NON ESSERE TRISTE PAPÀ.
ALLA FINE TUTTI TORNANO A CASA.
ME LO AI PROMESSO.` },
    },
    obj: {
      workshop_key: 'Trova la chiave di Walt',
      workshop_kernel: 'Apri la stanza del Kernel',
      workshop_dials: 'Regola le manopole di calibrazione ({n}/3 giuste)',
      workshop_leave: 'Passa per l’EXIT',
    },
    mono: {
      workshop_start: 'Il laboratorio di Walt. Una volta lo guardavo riparare i televisori dalla finestrella.',
      workshop_key: 'La sua chiave. Tiepida, come se qualcuno l’avesse appena posata.',
      workshop_kernel: 'Il Kernel. Respira. Giuro che respira.',
      workshop_calibrated: 'Due. Cinque. Sei. Il ronzio scende di un’ottava. Lontano, un chiavistello scatta.',
      workshop_chompy: 'Chompy. Il costume della foto dell’ospedale. Dentro non c’è nessuno. Cammina lo stesso.',
      workshop_317: 'Ho mollato la presa.',
    },
    lines: {
      workshop_unlock: 'Apri con la chiave di Walt',
      workshop_dial: 'Gira la manopola (ora: {n})',
    },
    radio: {
      workshop_start: [
        ['eddie', 'Sam… prima che tu scenda quelle scale. C’è una cosa sul mio bancone. Preferisco che tu la legga piuttosto che sentirmela dire.'],
      ],
      workshop_kernel: [
        ['eddie', 'Eccola. È il Kernel. L’abbiamo costruita in otto mesi. Ero così orgoglioso.'],
      ],
      workshop_chompy: [
        ['eddie', 'Luce negli occhi. Si copre la faccia. Walt faceva sempre quel numero per i bambini. Cucù.'],
      ],
      workshop_truth: [
        ['eddie', '…Sam? L’ho sentito. È arrivato sul sette. Tutto.'],
        ['sam', 'Ho mollato la presa. Ho mollato, ho preso la fuga, e ho detto a tutti che alle 21:40 ero a casa. Per sette anni.'],
        ['eddie', 'Avevi tredici anni.'],
        ['sam', 'Walt è stato il mostro di questa città per cinque anni. Per colpa mia. E poi è entrato, e adesso lo È davvero.'],
        ['eddie', '…E io ho lasciato la porta aperta. Walt ha mentito per una chiave. In questa storia tutti hanno mollato qualcosa.'],
        ['eddie', 'Quello che conta è a cosa ti aggrappi adesso.'],
      ],
      workshop_calibrated: [
        ['eddie', '256. Ecco. È la strada per la casa.'],
        ['eddie', 'Hai letto il mio bancone. Avevo lasciato aperta la porta sul retro. È da lì che hai potuto rientrare quella notte.'],
        ['sam', 'Stavi andando al cinema.'],
        ['eddie', '…Già. Al cinema. Non mi ricordo nemmeno che film fosse.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
