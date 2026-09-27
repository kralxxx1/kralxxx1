/* Italiano — Livello 9: St. Agnes (Walt, ottobre 1983). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      hospital: {
        name: 'LEVEL 9', title: 'St. Agnes', place: 'Il ricordo di Walt — reparto pediatrico, ottobre 1983',
        intro: 'Il mese peggiore di Walt, conservato alla perfezione. Pareti verdi, scarpe morbide, cera per pavimenti e arance.\n\nDa qualche parte su questo piano c’è la camera 207. Da qualche parte su questo piano qualcosa di altissimo conta i secondi in cui distogli lo sguardo.',
      },
    },
    items: {
      page: { name: 'Una pagina del diario di Walt', desc: 'Strappata lungo la cucitura. La sua scrittura diventa più piccola a ogni pagina.' },
      page1: { name: 'Una pagina del diario di Walt' }, page2: { name: 'Una pagina del diario di Walt' }, page3: { name: 'Una pagina del diario di Walt' }, page4: { name: 'Una pagina del diario di Walt' }, page5: { name: 'Una pagina del diario di Walt' },
      room207Key: { name: 'Chiave della camera 207', desc: 'Una chiave di reparto su un cartellino, con la calligrafia ordinata di un’infermiera: 207 — LILY. Un adesivo a forma di sole sul retro.' },
    },
    docs: {
      hospital_intro: { kind: 'note', title: 'Fissato a una sedia a rotelle', from: 'Eddie', body:
`Questo è di Walt. Si capisce. È tutto troppo pulito.

Cinque pagine del suo diario sono sparse per il reparto. Credo che le abbia strappate lui stesso, per non doverle leggere.

La camera 207 è chiusa a chiave. Alla postazione delle infermiere ci sono le chiavi. Non entrare prima di aver letto le pagine. Non so perché. Sembra che la regola sia questa.

Il Contatore è qui. Non dargli le spalle.

—E.` },
      hospital_diary1: { kind: 'diary', title: 'Il diario di Walt — pagina 1', from: 'Walt', date: '2 ottobre 1983', body:
`L’hanno spostata nella 207. Ha una finestra. Voleva una finestra per vedere quando piove.

Il dottore ha detto settimane. Io ho detto mesi. Non mi ha contraddetto, ed è così che lo so.

Mi ha chiesto se la sala giochi sente la sua mancanza. Le ho detto che i cabinati chiedono di lei ogni mattina. Lei ha detto: «Papà, le macchine non parlano». Io ho detto: queste sì.` },
      hospital_diary2: { kind: 'diary', title: 'Il diario di Walt — pagina 2', from: 'Walt', date: '9 ottobre 1983', body:
`Ruth adesso resta in macchina. Non sale. Non gliene faccio una colpa. Certe persone sanno amare solo in linea retta, e questa non è una linea retta.

Oggi Lily mi ha disegnato. Un omone con i baffi e una sala giochi piccolissima in testa, come un cappello.

Ho portato su un cabinato piccolo con l’ascensore. Ha fatto 3.190 punti. Alla seconda partita ho provato a farla vincere. Se n’è accorta. Ha detto: «Non farmi vincere, così non vale». Allora non l’ho fatto. Ha vinto lo stesso.` },
      hospital_diary3: { kind: 'diary', title: 'Il diario di Walt — pagina 3', from: 'Walt', date: '21 ottobre 1983', body:
`Dorme quasi tutto il giorno.

Quando è sveglia, disegna. Adesso ci sono otto disegni sul muro. La sala giochi. Chompy. L’albero di Front Street. Una grotta con dei bambini dentro (Sam Keller e il ragazzino dei Marsh hanno trovato una grotta sotto Front Street e non la fanno entrare). Io.

Mi ha chiesto: «Quando non ci sarò più, chi giocherà al mio gioco?»

Non ho saputo rispondere. Lavoro con le macchine. Avrei dovuto avere una risposta.` },
      hospital_diary4: { kind: 'diary', title: 'Il diario di Walt — pagina 4', from: 'Walt', date: '27 ottobre 1983', body:
`La festa di Halloween del reparto, in anticipo, per chi non può aspettare.

Ho portato su il costume di Chompy per le scale perché non entrava nell’ascensore. Le infermiere hanno riso così tanto che una ha dovuto sedersi. Tutto il reparto è uscito in camice.

Lily ha riso fino a tossire, e poi ha riso ancora.

Mi ha fatto promettere che il suo punteggio resterà per sempre nella classifica dei record. LIL, 3.190.

Stanotte, mezza addormentata, ha detto: «Fai un gioco che non finisce mai, papà. Così nessuno deve mai andare via».

Le ho detto che l’avrei fatto.` },
      hospital_diary5: { kind: 'diary', title: 'Il diario di Walt — pagina 5', from: 'Walt', date: '29 ottobre 1983', body:
`5:40. Pioveva. Le sarebbe piaciuto.

…

Costruirò una macchina che ricorda tutto. Un gioco in cui nessuno se ne va mai.

So come suona.

Lo scrivo lo stesso, perché un giorno, quando avrò fatto qualcosa di terribile, qualcuno possa leggere queste righe e sapere che l’ho fatto per amore. Non basterà. So che non basterà.` },
      hospital_nurse: { kind: 'note', title: 'Cartellina del turno di notte', from: 'Infermiera Donna', date: 'Ottobre 1983', body:
`207 — Lily, 9 anni. Tranquilla. Ha chiesto altri pastelli (arancione). Padre presente, come sempre. Padre ha dormito in poltrona, come sempre.

Qualcuno, per favore, gli dica di andare a casa a farsi una doccia. Dice: «Si sveglierà e io non ci sarò». Abbiamo smesso di discutere.

Festa di Halloween il 27 — il padre verrà in costume. Che Dio ci aiuti. (Il giorno più bello che questo reparto abbia avuto in tutto l’anno.)` },
      hospital_ruth: { kind: 'letter', title: 'Una lettera piegata nella cappella', from: 'Ruth', date: 'Settembre 1985', body:
`Walt,

io allora non riuscivo a entrare. Tu sì. È questa la differenza tra noi, ed è per questo che devo andarmene.

Non posso vivere in una casa in cui la stai ricostruendo con i fili. Ti sento di notte in garage, mentre parli alle macchine.

Ti prego, non lasciare che questa cosa ti divori.

Mi dispiace. Mi dispiacerà sempre.
— Ruth` },
      hospital_visitors: { kind: 'note', title: 'Registro visite, reparto pediatrico', from: 'St. Agnes', date: 'Ottobre 1983', body:
`207 — Walt (padre) .......... 1/10, 2/10, 3/10, 4/10, 5/10, 6/10, 7/10, 8/10, 9/10, 10/10, 11/10, 12/10, 13/10…
207 — Ruth (madre) .......... 1/10, 3/10
207 — Nora (zia) ............ 8/10, 14/10, 22/10
207 — Classe quarta, aula 104 ... 14/10 (biglietto consegnato)
207 — Frank D. (amico del padre) ... 20/10, 27/10 (ha portato arance)` },
      hospital_card: { kind: 'note', title: 'Un gigantesco biglietto di guarigione in cartoncino colorato', from: 'Classe quarta, aula 104', date: 'Ottobre 1983', body:
`GUARISCI PRESTO LILY!!!

Ci manchi a disegno. La maestra K dice che i pastelli si sentono soli.

— Sam (ti ho tenuto l’altalena buona)
— Toby (ti ho disegnato un drago sul retro) (è un cane)
— e altri 22 nomi in stampatello accurato

(Ti ricordi di averlo scritto. Ti ricordi di non sapere che non sarebbe servito.)` },
      hospital_chompy: { kind: 'photo', photo: 'chompy', title: 'Una foto istantanea attaccata sopra il letto', from: 'Infermiera Donna', date: '27 ottobre 1983', body:
`Un uomo in un enorme costume arancione tondo, con corna di feltro e un sorriso pieno di denti di gommapiuma, inginocchiato accanto a un letto d’ospedale. Una bambina piccolissima con un cappellino da festa abbraccia la testa del costume con tutte e due le braccia.

Sulla striscia bianca: «LIL & CHOMPY»` },
      hospital_chart: { kind: 'note', title: 'La cartella clinica ai piedi del letto', from: 'St. Agnes', date: '29 ottobre 1983', body:
`PAZIENTE: Brenner, Lily, 9 anni
DIAGNOSI: Leucemia linfoblastica acuta

29/10 05:40 — Ora del decesso.
Padre presente.
Pioggia.

(Qualcuno ha aggiunto, piccolissimo, a matita: «3.190»)` },
      hospital_lily6: { kind: 'drawing', drawing: 6, title: 'Un disegno ancora attaccato accanto alla finestra della 207', from: 'Lily, 9 anni', body:
`Pastelli a cera. Una finestra, la pioggia a righe blu. Fuori, una creatura arancione tonda con le corna saluta. Dentro, una bambina con il cappellino da festa ricambia il saluto dal letto.

CHOMPY È VENUTO ALLA MIA FESTA.
ERA PAPÀ.
IO LO SAPEVO MA NON LO DETTO.` },
      hospital_tape: { kind: 'tape', title: 'Nastro: «L’ora della storia»', from: 'Il registratore di Walt', date: 'Ottobre 1983', body:
`[Clic. Una stanza d’ospedale. Un monitor bippa piano. Pioggia sul vetro.]

WALT: …e il piccolo Muncher disse: io non mangio gli Spettri. Sono miei amici. Mangio solo le stelle.

LILY: [assonnata] Il gioco non funziona così, papà.

WALT: Nella mia versione sì.

LILY: Gli Spettri possono tornare a casa, alla fine?

WALT: Alla fine tutti tornano a casa.

LILY: Promesso?

WALT: [una pausa, troppo lunga] …Promesso, coccinella.

[Clic.]` },
    },
    obj: {
      hospital_pages: 'Trova le pagine del diario di Walt ({n}/5)',
      hospital_207: 'Prendi la chiave ed entra nella camera 207',
      hospital_leave: 'Scendi con l’ascensore',
    },
    mono: {
      hospital_start: 'Un ospedale. Pareti verdi. Ci ho messo piede una volta, con un biglietto. Avevo nove anni.',
      hospital_key: 'Camera 207. Il cartellino è scritto con la calligrafia ordinata di un’infermiera.',
      hospital_207: 'Otto chiodi nel muro, dove una volta erano appesi i disegni. Uno è ancora qui. Fuori dalla finestra piove. Qui piove sempre.',
    },
    lines: {
      hospital_unlock207: 'Apri la camera 207',
      hospital_notYet: 'La mano si ferma sulla chiave. Non ancora. Prima leggi quello che ha scritto.',
    },
    radio: {
      hospital_start: [
        ['eddie', 'Walt mi ha parlato di lei una volta. Nell’86. Stavamo saldando alle due di notte, lui ha detto il suo nome e poi per un’ora non ha più detto niente.'],
        ['eddie', 'Vacci piano qui dentro, Sam. Non so cos’altro dirti.'],
      ],
      hospital_pages: [
        ['eddie', '…Ha costruito tutto per lei. Il Kernel. Il gioco. Tutto.'],
        ['sam', 'Un gioco che non finisce mai. Così nessuno deve mai andare via.'],
        ['eddie', 'E poi si è preso quattro ragazzini. Vai nella 207. Credo che abbia bisogno che tu ci vada.'],
      ],
      hospital_207: [
        ['eddie', 'Sam? Qualcosa è cambiato. Il ronzio… suona diverso. Come se qualcuno si fosse ricordato di qualcosa.'],
        ['eddie', 'Ovunque sia il Divoratore adesso, credo che abbia appena smesso di masticare.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
