/* Italiano — Livello 255 (La casa) e livello 256 (Kill screen). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'La casa', place: 'Il gioco stesso',
        intro: 'Hungry House, visto da dentro. Pareti che brillano lungo le giunture come uno schermo, stelle che fluttuano all’altezza dei fianchi e, al centro, la casa degli Spettri, con la porta tenuta chiusa da quattro lanterne.\n\nConosci questo tabellone meglio della tua camera. Ci hai giocato diecimila volte. Stava aspettando che ci giocassi ancora una volta.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Kill screen', place: 'La metà che nessuno avrebbe dovuto vedere',
        intro: 'La metà sinistra del tabellone è la casa che conosci. La metà destra è fatta di lettere, numeri e colori che si sono staccati e restano sospesi nell’aria.\n\nDa qualche parte nel nucleo, qualcosa è ancora attaccato alla corrente.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Lettere luminose sulla parete del labirinto', from: 'W.', body:
`SE RIESCI A LEGGERE QUESTO,
SEI NEL MIO GIOCO.
MI DISPIACE.
MANGIA LE STELLE.
NON FARE DEL MALE AGLI SPETTRI.
—W.` },
      maze_rules: { kind: 'wall', title: 'Una targa, fredda come la pietra', body:
`REGOLE DELLA CASA

1. Il Giocatore mangia.
2. Gli Spettri inseguono.
3. Il tabellone si svuota.
4. Comincia il tabellone successivo.
5. Non c’è una regola cinque.` },
      maze_house: { kind: 'note', title: 'Sulla porta della casa degli Spettri', from: 'Eddie', body:
`Quattro lanterne tengono chiusa la tenda. Una in ogni angolo.

La casa è la strada verso il basso. L’ultima strada verso il basso.

Ci vediamo dall’altra parte. —E.` },
      maze_fruit: { kind: 'memory', title: 'La caramella — un ricordo', body:
`La prima volta che Lily prese il premio della caramella, urlò così forte che a Walt cadde il caffè.

«Papà! La CARAMELLA! Ho preso la CARAMELLA!»

Da allora ogni sabato lui le metteva una moneta e restava dietro di lei per tutta la partita, senza mai dirle nemmeno una volta da che parte andare.` },
      ks_glitch1: { kind: 'wall', title: 'Caratteri rotti sospesi nell’aria', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Un file di salvataggio corrotto', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'L’ultima lettera di Walt', from: 'W. (credo che sia il mio nome)', date: 'Un giorno che non si poteva contare', body:
`A chiunque raggiunga il nucleo.

La spina è qui. Staccata da dentro non è un omicidio, è una fine. GAME OVER. Tutti quelli che sono ancora se stessi tornano a casa.

Ma non si muove per un solo paio di mani. Il gioco è cominciato con cinque mani sulla leva. Finisce con cinque. E quei quattro devono ricordarsi chi sono, o le loro mani sono solo luce.

Ci ho provato da solo, la mia prima notte qui dentro. Il gioco l’ha presa per una mossa e mi ha reso il suo Giocatore. È questo che sono adesso.

Una mano ha mollato alle 3:16. Da allora il gioco aspetta quella mano.

Di’ a Nora che mi dispiace. Di’ a Ruth che aveva ragione. Di’ alla classifica di tenere il punteggio di Lily.

—W.` },
      ks_eddie: { kind: 'note', title: 'Un biglietto appuntato accanto all’EXIT', from: 'Eddie', body:
`Uno dentro, uno fuori.

Ho trovato questa porta la prima settimana. Là fuori è passato un anno e mezzo. Qui dentro è sembrata un’unica notte, lunghissima.

Mi dispiace, Sam.` },
    },
    obj: {
      maze_pellets: 'Prendi le lanterne nei quattro angoli ({n}/4)',
      maze_house: 'Entra nella casa degli Spettri',
      ks_core: 'Raggiungi il nucleo sul lato rotto',
      ks_choice: 'Scegli: la porta EXIT o la spina',
    },
    mono: {
      maze_start: 'Questo è… il gioco stesso. Ci sono dentro.',
      maze_rules: 'Chi mangia le stelle? Io.',
      maze_house: 'La tenda è caduta. Dentro la casa c’è una porta.',
      ks_start: 'Il lato destro è… rotto. Lettere sospese nell’aria.',
      ks_core: 'Il nucleo. Qui c’è una spina enorme. La spina del cabinato. Vista da dentro.',
      ks_exit: 'EXIT. Stavolta uno vero. Sento il vento.',
      ks_plugTry: 'Non si muove. Non con due mani. Ne servono cinque.',
      ks_plugReady: 'Quattro luci colorate vengono al mio fianco. Rossa, viola, turchese, ambra.',
    },
    lines: {
      maze_portal: 'Scendi al livello che non si può contare',
      maze_fruitTake: 'Prendi la caramella',
      ks_plug: 'STACCA LA SPINA',
      ks_plugTry: 'Prova a staccare la spina',
      ks_exitGo: 'Passa per l’EXIT',
      ks_exitHold: 'Tieni la porta aperta per Eddie',
      ks_missing: '(Mancano: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'Ci siamo. Livello duecentocinquantacinque. L’ultimo tabellone prima di quello rotto.'],
        ['eddie', 'Prendi gli angoli. Ti aspetto giù.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Sono qui. Non alla radio. Qui. Vicino alla porta a destra.'],
        ['eddie', 'Vieni a cercarmi. Ti prego.'],
      ],
      ks_plea: [
        ['eddie', 'Quello è quello vero. Vento, pioggia, Front Street. Casa.'],
        ['eddie', 'Ne fa uscire uno e ne tiene dentro uno. L’ho trovato la prima settimana. Da allora gli sto accanto.'],
        ['sam', 'Volevi lasciarmelo aprire e passare tu.'],
        ['eddie', 'Hope ha quindici mesi, Sam. Non l’ho mai presa in braccio. [Gli si spezza la voce.] Non ti chiedo di perdonarmi. Ti chiedo di tenere la porta.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'Quello è quello vero. Vento, pioggia, Front Street. Casa.'],
        ['eddie', 'Al motel ti ho detto che non te l’avrei chiesto. Quindi non te lo chiedo.'],
        ['sam', 'Ma vorresti.'],
        ['eddie', 'Ogni secondo. [Un lungo respiro.] Prima vai al nucleo, Sam. Se c’è un’altra strada, è lì. Se non c’è… io sarò ancora qui.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
