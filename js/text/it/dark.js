/* Italiano — Livello 6: Luci spente (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Luci spente', place: 'Il ricordo di Toby — il buio',
        intro: 'Le stesse stanze gialle, con ogni luce morta. Qui il buio è così denso che ci si potrebbe appoggiare.\n\nToby ha avuto paura del buio per tutta la vita. Qui dentro, il buio non ha paura di niente. Da qualche parte, lì in mezzo, qualcosa si sforza tantissimo di non ridere.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Sopra un generatore', from: 'Eddie', body:
`Tre generatori. Ci sono taniche di gasolio sparse dappertutto.

Qui il buio ha i denti. Io li chiamo Ghignanti. La luce li fa sparire. Torcia, stick luminoso, qualsiasi cosa.

L’ambra… tienigli la luce addosso. Non voltargli le spalle a lungo.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Una pagina di un quaderno di scuola', from: 'Toby', date: '15 aprile 1987', body:
`Domani c’è l’Operazione 256!!!

Danny dice che io sono il responsabile della torcia. Rosie ha fatto una cassetta. Nell ha fatto una mappa dei percorsi degli Spettri ed è davvero bellissima.

Oggi mi sono seduto sul walkman di Sam. Ha fatto crac. Sam non lo sa ancora. Darò a Sam la mia paghetta di marzo E di aprile.

Danny dice che lo Spettro ambra del n. 7 sono io perché è il fifone. Walt dice che è quello furbo. Comunque è il MIO Spettro.` },
      dark_diary2: { kind: 'diary', title: 'L’ultima pagina', from: 'Toby', date: '17 aprile 1987, 0:50 — alla sala giochi', body:
`Scritto alla luce dell’accendino. Danny ha spento le luci sul retro per fare paura. Ha funzionato.

Sam ha lasciato la sala giochi alle 21:40. Sam ha detto: «Va bene. E allora sparisci». Io non ho risposto niente. Ho pianto nel retro, dove nessuno poteva vedermi.

E poi alle 0:40 qualcuno ha bussato alla porta sul retro ed era SAM. Gocciolante di pioggia.

SAM È QUI!!! Sam torna sempre.

Ho chiesto scusa io per primo. Vuol dire che ho vinto io.

Livello 212. Danny dice 256 entro le tre. Tutte e cinque le mani. Nessuno molla.` },
      dark_grandpa: { kind: 'card', title: 'Un bigliettino nella scatola di un accendino', from: 'Il nonno di Toby', date: '1985', body:
`Toby,

tua nonna me l’ha regalato nel 1951 perché trovassi la strada di casa dopo il turno di notte.

Adesso è tuo. Non dovrai mai stare al buio.

—Il nonno` },
      dark_grinners: { kind: 'note', title: 'Calligrafia tremante', from: 'Eddie', body:
`I Ghignanti non sono persone. Non sono neanche Spettri.

Credo che siano l’idea che il gioco ha di ciò che sta nel buio. L’idea di Toby. Quello che un ragazzino di tredici anni pensa che viva sotto il letto.

Spezza uno stick luminoso, conta fino a tre, e spariscono.

In questo livello dormo poco.` },
      dark_walt6: { kind: 'diary', title: 'Il diario di Walt, scrittura fitta', from: 'Walt', date: 'Dentro', body:
`Non ricordo il mio nome. Comincia con la W.

Ricordo la calligrafia di una bambina. Lettere tonde. Ha disegnato una cosa arancione con le corna e sotto ha scritto PAPÀ.

Ricordo il sapore delle monetine.

Neanche l’ambra mi guarda. Nessuno mi guarda più.

MANGIA, dice il tabellone. MANGIA.` },
      dark_wall: { kind: 'wall', title: 'Scritto sul muro con la fuliggine dell’accendino', body:
`NON GUARDARMI

SCUSA SAM` },
      dark_porch: { kind: 'note', title: 'Un biglietto attaccato a una zanzariera', from: 'Maggie, la madre di Toby', date: 'Aprile 1987', body:
`Toby,

la luce del portico resta accesa finché non torni a casa.

Ti voglio bene, mamma` },
      dark_tape: { kind: 'tape', title: 'Nastro: «La barzelletta di Toby»', from: 'Il registratore di Rosie', date: '16 aprile 1987, 23:58', body:
`[Clic. Il retro della sala giochi. Le luci sono spente. Scatta un accendino.]

TOBY: Ok, ok. Perché il Muncher ha attraversato la strada?

DANNY: Perché gli Spettri erano da questa parte.

TOBY: No! Perché sulla strada c’erano le STELLE!

[Silenzio. Poi Nell sbuffa una risata, poi Rosie, poi ridono tutti molto più di quanto la barzelletta meriti.]

TOBY: [ancora ridendo] Sam dovrebbe essere qui. Sam ride sempre a questa.

[Le risate si spengono.]

ROSIE: …Sam arriverà, Toby.

[Clic.]` },
    },
    obj: {
      dark_generators: 'Avvia i generatori ({n}/3)',
      dark_leave: 'Raggiungi il montacarichi',
    },
    mono: {
      dark_start: 'Non vedo niente. La torcia… non so se basta.',
      dark_tobySeen: 'Qualcosa color ambra nell’angolo. Un lenzuolo con l’orlo bruciato. Non si muove. Non finché lo guardo.',
      dark_grinner: 'Un sorriso nel buio. Solo denti.',
      dark_gen: 'Il generatore si sveglia tossendo. Luce.',
      dark_lighter: 'Il suo accendino. Una volta, nel 1986, me l’ha fatto tenere. Dopo dieci secondi l’ha rivoluto indietro.',
      dark_diary2: 'Sam è qui. …No. No. Ho preso la strada di casa. Alle 21:40 ho preso la strada di casa.',
    },
    lines: {
      dark_gen: 'Versa il gasolio e avvialo (tieni premuto)',
      dark_genEmpty: 'Generatore (senza gasolio)',
      dark_needFuel: 'Prima serve una tanica di gasolio.',
      dark_tankEmpty: 'Il serbatoio del generatore è vuoto.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Odio questo. Lo odio tantissimo. Resta nella luce, Sam. Dico sul serio.'],
      ],
      dark_toby: [
        ['eddie', 'Ambra… è Toby. Non ti viene addosso finché lo guardi. Quando aveva paura, non riusciva mai a guardare nessuno negli occhi.'],
        ['sam', 'Guardava negli occhi me. Sempre.'],
        ['eddie', '…Già. Credo di sì.'],
      ],
      dark_lighter: [
        ['eddie', 'L’accendino di suo nonno. Non lo faceva toccare a nessuno. Neanche a Danny.'],
      ],
      dark_freed: [
        ['eddie', '…È solo un ragazzino, Sam. Sono tutti solo ragazzini.'],
        ['eddie', 'Che razza di gioco fa questo a dei ragazzini?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
