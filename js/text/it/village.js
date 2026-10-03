/* Italiano — Capitolo 6: Acque basse (Gammel Ostra). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      village: {
        name: 'CAPITOLO 6', title: 'Acque basse', place: 'Gammel Ostra, valle dell’Ostra',
        intro: 'Venerdì 2 ottobre 1964, dopo il tramonto, sotto la pioggia.\n\nLe paratoie della diga si sono chiuse stamattina alle sei. I manifesti su ogni pilastro dei cancelli dicono il nove. Il paese è vuoto, e nei punti bassi il fiume è già straripato. In una casa c’è ancora una lampada accesa alla finestra.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Un avviso sul pilastro di un cancello', from: 'Ufficio distrettuale', date: 'Settembre 1964', body:
`REGOLAZIONE DEL FIUME OSTRA

Le paratoie della diga saranno chiuse e la valle sarà allagata
VENERDÌ 9 OTTOBRE 1964.

Tutti i residenti devono aver lasciato Gammel Ostra entro tale data. I camion dei traslochi partono ogni mattina alle 8 dal cortile della scuola.

(Su questa copia il 9 è stato cancellato con la matita rossa e sopra è scritto VENERDÌ 2 OTTOBRE. Non tutti i pilastri sono stati corretti.)` },
      village_torLetter: { kind: 'letter', title: 'Una lettera sul tavolo della cucina', from: 'Tor', date: '24 settembre 1964', body:
`Mamma,

smettila di scrivere al giornale. Non serve a niente e il consiglio legge ogni parola.

Le paratoie chiudono venerdì 9. Hai tutto il tempo del mondo. Salgo con la macchina la mattina dell’8, carichiamo le tue cose e scendi da Ingrid a Halvard come una donna di buon senso, e per strada puoi avercela con me quanto vuoi.

Non fare sciocchezze.
Tor` },
      village_diary: { kind: 'report', title: 'Diario di cantiere, casotto del guardiano della diga', from: 'T. Holm, ingegnere residente', date: 'Settembre–ottobre 1964', body:
`28.9  Il consiglio anticipa la chiusura di una settimana: paratoie il 2.10 alle 06.00. Annunciato stasera alla radio. Manifesti da correggere.
      La mamma non ha la radio. Glielo dirò io quando vado a prenderla. Sarà più facile il giorno stesso.
29.9  Getto dello sfioratore rimandato. Pioggia.
1.10  Getto per tutta la notte. Non sono potuto andare via. Telefonato a Ingrid a Halvard: la mamma le ha detto che vengo l’8, quindi Ingrid non deve preoccuparsi.
2.10  06.00 Paratoie chiuse come previsto. La valle si riempie.
      Non sono salito alla casa.

(Non ci sono altre annotazioni di questa mano.)` },
      village_ingrid: { kind: 'note', title: 'Un’etichetta legata a una cassa in soffitta', from: 'I.', date: '30.9.64', body:
`COSE DELLA MAMMA — PER HALVARD

Dice che non lascia casa sua e basta. Tor dice che va a prenderla l’8.
Ho preso il suo carillon, così avrà un motivo per venire a riprenderselo.
— I.` },
      village_removal: { kind: 'report', title: 'L’elenco dei traslochi sulla cattedra', from: 'Scuola di Gammel Ostra', date: 'Ottobre 1964', body:
`Aas, Olav, 64 — dal figlio, Nordvik — partito 21.9
Famiglia Berg (5) — Halvard — partita 23.9
Dahl, Marit, 80 — alla casa di riposo di Ostra — partita 25.9
Holm, Signe, 71, Stuegata 4 — dalla figlia (I. Lind), Halvard — la porta il figlio, 8.10
Kvam, Per e Anna — partiti 26.9

(Tutte le righe tranne una sono spuntate.)` },
      village_parish: { kind: 'note', title: 'Un biglietto sul tavolo della sacrestia', from: 'Pastore A. Rø', date: '27.9.64', body:
`Oggi l’ultima funzione. Le campane vengono calate il 30.
Il coro ha chiesto di cantare l’inno della sera ancora una volta e gliel’ho permesso, anche se la chiesa era quasi vuota.

La signora Holm ha chiesto che la chiesa non venga chiusa finché lei è ancora in paese. Le ho detto che il Signore non chiude. Il consiglio la pensa diversamente.

Le chiavi delle case degli anziani sono sulla bacheca della sacrestia fino al trasloco.` },
      village_shop: { kind: 'note', title: 'Il libro dei conti della bottega, aperto', from: 'Emporio di Gammel Ostra', date: 'Ottobre 1964', body:
`1.10  Sig.ra Holm — petrolio, 2 litri. Fiammiferi. Caffè, ¼ kg. A credito.
        (Dice che salderà l’8.)

(La bottega ha chiuso la sera stessa. Gli scaffali sono spogli.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Un disegno sotto il cuscino', from: 'Wren, 7 anni', body:
`Pastelli a cera, ammorbiditi dall’umidità. Una chiesa bianca sotto l’acqua verde, con i pesci che nuotano accanto al campanile. Vicino, una casetta rossa, e alla finestra una signora dai capelli bianchi che tiene alta una lampada. Sopra l’acqua, l’uccellino rosso.

Sotto:
È RIMASTA SVEGLIA AD ASPETTARE` },
    },
    items: {
      signeKey: { name: 'Chiave di casa', desc: 'Su un anello di spago rosso. Un’etichetta di carta: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Carillon', desc: 'Di palissandro, con una piccola ballerina sul coperchio. Caricato, suona un valzer che conosci quasi.' },
    },
    obj: {
      village_start: 'Trova chi ha acceso la lampada',
      village_key: 'Trova una chiave della casa con la lampada',
      village_box: 'Trova ciò che un tempo stava sulla mensola del camino',
      village_mantel: 'Rimetti il carillon sulla mensola del camino',
      village_run: 'Arriva l’acqua. Raggiungi la scala a pioli della diga',
      village_climb: 'Arrampicati',
    },
    mono: {
      village_start: 'Un paese. Vuoto. Gli alberi sono stati tutti tagliati. C’è una luce a una finestra.',
      village_locked: 'Chiusa a chiave. Dentro arde una lampada e nessuno risponde.',
      village_church: 'Cantano. Al buio, rivolti all’altare. Nemmeno un rumore.',
      village_silence: 'Si sono fermati.',
      village_turn: 'Si stanno girando.',
      village_resume: 'Cantano di nuovo.',
      village_key: 'S. Holm, Stuegata 4. Holm. Questo nome lo conosco.',
      village_school: 'La scuola. Da qui partivano i camion.',
      village_list: 'Holm, Signe. Dalla figlia, I. Lind. Lind. I. Lind è la nonna.',
      village_attic: 'Casse. Etichette. Un paese intero messo negli scatoloni.',
      village_box: 'Un carillon. «Cose della mamma». La mamma. La madre della nonna.',
      village_house: 'La lampada è accesa. La stufa è calda. Nessuno.',
      village_dust: 'C’è un quadrato pulito nella polvere sulla mensola. Qui c’è stato qualcosa per molto tempo.',
      village_placed: 'Ecco. Dove lo tenevi.',
      village_claimed: 'Suona da solo. L’orologio batte le ore. Sono le sei.',
      village_water: 'Quel rombo. L’acqua. Sta arrivando.',
      village_ladder: 'La scala. Su. Sali.',
      village_top: 'In cima. Tutta la valle è acqua.',
      village_gran: 'La nonna non ha mai detto di avere una madre qui. Mai, nemmeno una volta.',
    },
    lines: {
      village_mantelLook: 'La mensola del camino',
      village_mantelPut: 'Metti il carillon sulla mensola',
      village_ladderPrompt: 'Sali la scala a pioli (tieni premuto W)',
      village_wellLook: 'Un pozzo',
    },
    radio: {
      village_otto1: [
        ['radio', '[pioggia sul fruscio]'],
        ['otto', 'Nove ad Ada. Pioggia, un paese vuoto, una diga? Gammel Ostra. Ne ho uno scaffale intero. Soprattutto pomelli. La gente si porta via le chiavi e lascia i pomelli.'],
        ['ada', 'C’è qualcuno che canta. In chiesa.'],
        ['otto', 'Allora li lasci cantare. Mentre cantano guardano l’altare. Se smettono, non aspetti di vedere perché.'],
      ],
      village_otto2: [
        ['otto', 'Ada. Un carillon sul mio scaffale ha appena cominciato a suonare da solo. L’acqua sul pavimento qui sta salendo. Fossi in lei me ne andrei. Me ne andrei adesso.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 ottobre 1964. La mia bisnonna Signe Holm non voleva lasciare la sua casa. Suo figlio Tor, l’ingegnere della diga, le disse che le paratoie si sarebbero chiuse il nove; si chiusero il due, e lui non salì alla casa. La nonna credeva che Tor andasse a prenderla. La lampada era ancora accesa quando arrivò l’acqua. Ho rimesso il suo carillon sulla sua mensola, e poi mi sono arrampicata sulla diga mentre la valle si riempiva sotto di me.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
