/* Italiano — Capitolo 2: Campana da nebbia (MS Saint Brigid). Bibbia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      ferry: {
        name: 'CAPITOLO 2', title: 'Campana da nebbia', place: 'MS Saint Brigid, stretto di Halvard',
        intro: '9 novembre 1987, le undici meno un quarto di sera. Una nebbia così fitta che dalla plancia non si vede la prua.\n\nLa Saint Brigid affonda di poppa, lentamente, su un mare piatto come un tavolo. Il radar è guasto da una settimana. Da qualche parte a prua, una campana.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Posti di imbarco sulle scialuppe', from: 'MS Saint Brigid', body:
`IN CASO DI EMERGENZA

1. Recatevi al vostro posto scialuppa (vedi la scheda in cabina).
2. Indossate il giubbotto di salvataggio. Non gonfiatelo all’interno della nave.
3. Le scialuppe vengono ammainate dall’equipaggio.
   Chiave della gru: in plancia.
   Manovella: se il motore si guasta.

(Sotto, a pennarello: «Il verricello n. 2 si inceppa. La manovella sta nell’armadietto attrezzi della sala macchine, NON in coperta. — 2° macchinista»)` },
      ferry_testimony: { kind: 'report', title: 'Deposizione davanti alla commissione d’inchiesta (copia)', from: 'Cap. H. Aal', date: '30 novembre 1987', body:
`Sono stato in plancia dalle 21:30 fino all’ordine di abbandonare la nave.

La visibilità era inferiore a una gomena. Il radar era guasto dal 2 novembre e i segnali da nebbia venivano dati a mano: con la campana di bordo, suonata dal mozzo P. Rask.

Verso le 22:35 la campana ha smesso di suonare. Ho mandato il secondo ufficiale a prua. Il ragazzo aveva lasciato il suo posto. Senza segnale non potevamo né essere sentiti né sentire.

Mi duole dire che la perdita della Saint Brigid è cominciata quando un ragazzo di sedici anni si è fatto prendere dal panico.

H. Aal, Comandante` },
      ferry_logpage: { kind: 'report', title: 'Una pagina strappata dal giornale di bordo', from: 'Saint Brigid, giornale di coperta', date: '9 novembre 1987', body:
`21:40  Nebbia fitta. Velocità ridotta a 6 nodi. Radar fuori uso.
22:05  Comandante in cabina (indisposto). Guardia al 2° ufficiale.
22:10  Segnali da nebbia a mano. Mozzo Rask alla campana.
22:31  Comandante chiamato. Non è venuto.
22:44  Urto, sinistra poppa. Imbarchiamo acqua.
22:47  Abbandono nave. Scialuppe 1, 3, 4 in mare.
22:52  Mozzo Rask suona ancora. Dice che le scialuppe si orientano con la campana. Comandante non in plancia.
22:58  La campana suona ancora

(La scrittura si interrompe lì. La pagina è stata strappata di netto, poi piegata piccolissima, come si piega qualcosa che si vuole tenere a lungo in un cassetto.)` },
      ferry_logbook: { kind: 'report', title: 'Il giornale di coperta sul tavolo da carteggio', from: 'Saint Brigid', body:
`21:15  Molo di Halvard. 41 passeggeri, 17 membri d’equipaggio. Banchi di nebbia.
21:30  Fuori dal porto.

(Manca una pagina. Si vede il bordo strappato nella rilegatura. Nella pagina seguente:)

23:40  Tutte le scialuppe contate. Un membro d’equipaggio disperso: il mozzo P. Rask, che ha lasciato il suo posto alla campana verso le 22:35.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'Il giornale di coperta, con la sua pagina', from: 'Saint Brigid', body:
`21:40  Nebbia fitta. Velocità ridotta a 6 nodi. Radar fuori uso.
22:05  Comandante in cabina (indisposto). Guardia al 2° ufficiale.
22:10  Segnali da nebbia a mano. Mozzo Rask alla campana.
22:31  Comandante chiamato. Non è venuto.
22:44  Urto, sinistra poppa. Imbarchiamo acqua.
22:47  Abbandono nave. Scialuppe 1, 3, 4 in mare.
22:52  Mozzo Rask suona ancora. Dice che le scialuppe si orientano con la campana. Comandante non in plancia.
22:58  La campana suona ancora.
23:05  La campana tace.

(La pagina sta nella rilegatura come se non ne fosse mai uscita. L’inchiostro dell’ultima riga è fresco.)` },
      ferry_radio: { kind: 'printout', title: 'Giornale della stazione radio', from: 'Marconista', date: '9.11.87', body:
`22:46  MAYDAY trasmesso. Posizione stimata.
22:48  Halvard Radio conferma. Pilotina Ternen in arrivo.
22:55  Ternen: «Non vi vediamo. Sentiamo la vostra campana. Facciamo rotta su di essa».
23:02  Ternen: «Abbiamo due delle vostre scialuppe. Sentiamo ancora la campana. Continuate a suonare».
23:05  Ternen: «La campana si è fermata. Dove siete?».
23:06  (nessun’altra annotazione)` },
      ferry_mother: { kind: 'letter', title: 'Una lettera su una poltrona del salone', from: 'Elin Rask', date: '4 gennaio 1988', body:
`Ai signori della commissione d’inchiesta,

avete scritto nel vostro rapporto che mio figlio ha lasciato il suo posto.

Pim aveva sedici anni. Ha avuto paura del buio fino a undici anni e dormiva ancora con la luce del pianerottolo accesa. Quando aveva paura faceva quello che gli dicevano, e lo faceva più forte.

Se qualcuno gli ha detto di suonare quella campana, l’ha suonata finché non è rimasta più nave su cui suonarla.

Vorrei che il suo nome fosse tolto dal vostro rapporto. Vorrei che ci fosse rimesso nel verso giusto.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'Una cartolina sulla cuccetta', from: 'Margit', body:
`(Una foto della Saint Brigid in una giornata d’estate, con il gran pavese.)

Cara zia Ruth,
attraversiamo nella nebbia, non si vede niente! Il ragazzo sul ponte suona una campana ogni minuto perché le altre navi sappiano che ci siamo. È bello e fa un po’ paura. Di’ alla mamma che chiamo da Halvard.
Margit

(Mai spedita.)` },
      ferry_purser: { kind: 'note', title: 'Ruolo dell’equipaggio, ufficio del commissario', from: 'Commissario di bordo', body:
`MS SAINT BRIGID — EQUIPAGGIO, ORARIO INVERNALE 1987

Comandante ............ H. Aal
Primo ufficiale ....... (in licenza)
2° ufficiale .......... T. Solberg
Direttore di macchina . K. Moe
2° macchinista ........ R. Dahl
Marconista ............ B. Lund
Mozzo ................. P. Rask (16) — prima stagione

(Qualcuno ha disegnato una campanella accanto all’ultimo nome.)` },
      ferry_mess: { kind: 'note', title: 'Turni nella mensa dell’equipaggio', from: 'T. Solberg', body:
`SETTIMANA 45

Radar FUORI USO dal 2/11 — pezzi ordinati a Bergen.
FINO ALLA RIPARAZIONE: campana da nebbia a mano con visibilità < 1 miglio.
Campana: Rask (tutte le traversate serali).
Rask: suoni finché non ti dico di smettere. Non finché ti annoi. Finché non te lo DICO.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'Un disegno infilato in una cuccetta', from: 'Wren, 7 anni', body:
`Pastelli a cera. Una nave in mezzo a scarabocchi grigi di nebbia. Davanti, un ragazzo vestito di giallo con una campana, la bocca aperta, che suona. In cima all’albero, un uccellino rosso.

Sotto:
NON SI È FERMATO` },
    },
    items: {
      bridgeKey: { name: 'Chiave della plancia', desc: 'Una chiave d’ottone con un galleggiante di sughero. Dalla cabina del comandante.' },
      davitKey: { name: 'Chiave della gru', desc: 'Una chiave a T con la scritta SCIALUPPE. Sblocca il freno del verricello.' },
      crank: { name: 'Manovella del verricello', desc: 'Una pesante manovella d’acciaio con l’impugnatura di legno. Per ammainare una scialuppa a mano.' },
      logPage: { name: 'Pagina strappata del giornale', desc: 'Piegata piccolissima. 9 novembre 1987, dalle 21:40 alle 22:58.' },
    },
    obj: {
      ferry_start: 'Trova un modo per lasciare la nave',
      ferry_bridge: 'Prendi la chiave della gru in plancia',
      ferry_captain: 'Perquisisci la cabina del comandante per trovare la chiave della plancia',
      ferry_logbook: 'Rimetti la pagina strappata nel giornale di bordo in plancia',
      ferry_key: 'Prendi la chiave della gru dalla plancia',
      ferry_crank: 'Trova la manovella del verricello in sala macchine',
      ferry_lower: 'Ammaina la scialuppa 2',
    },
    mono: {
      ferry_start: 'Una nave. Una nebbia così fitta che non vedo la murata. E il ponte è inclinato.',
      ferry_winch: 'La scialuppa 2. Il verricello vuole una chiave della gru e una manovella. La chiave sarà in plancia.',
      ferry_winch2: 'Mi servono ancora la chiave e la manovella.',
      ferry_winchNoCrank: 'La chiave è inserita. La manovella non è in coperta. L’avviso diceva sala macchine.',
      ferry_winchNoKey: 'Ho la manovella. Il freno è ancora bloccato: la chiave della gru.',
      ferry_brake: 'Il freno non molla. Come se la nave non avesse finito con me.',
      ferry_pageAfter: 'Non era in plancia. Era in cabina con una bottiglia, e il ragazzo ha suonato quella campana per un’ora.',
      ferry_logbookGap: 'Manca una pagina. Strappata alle 21:40.',
      ferry_claimed: 'Ecco. È lì che va.',
      ferry_bell: 'La campana di bordo. Suona come se aspettasse qualcuno.',
      ferry_bellAfter: 'È tiepida. C’era la mano di qualcuno su questa corda.',
      ferry_bridgeKey: 'La chiave della plancia. Sotto il suo cuscino. Naturalmente.',
      ferry_davitKey: 'SCIALUPPE. La chiave della gru.',
      ferry_crank: 'La manovella. L’acqua si è appena mossa. Tutta insieme.',
      ferry_lower: 'Tieniti. Tieniti a qualcosa.',
      ferry_end: 'Suona ancora. Regolare, come un orologio. Perché le scialuppe trovino la strada.',
      ferry_bridgeLocked: 'La plancia è chiusa a chiave. Il comandante avrà una chiave.',
      ferry_passengers: 'Dormivano. Dormivano tutti, e adesso sono in piedi.',
      ferry_drowned: 'È uscito qualcosa dall’acqua. Prima le mani.',
      ferry_lounge: 'Il salone. Giubbotti di salvataggio su ogni poltrona. Nessuno si è mosso quando sono entrata.',
      ferry_engineRoom: 'La sala macchine è allagata fino al ginocchio. L’acqua è immobile.',
      ferry_fore: 'La campana è quassù da qualche parte. La sento respirare nel vento.',
    },
    lines: {
      ferry_winchGo: 'Gira il verricello e ammaina la scialuppa 2 (tieni premuto)',
      ferry_winchLook: 'Il verricello della scialuppa 2',
      ferry_logbookPut: 'Rimetti la pagina',
      ferry_logbookRead: 'Leggi il giornale di bordo',
      ferry_bellPrompt: 'Suona la campana',
      ferry_pagePrompt: 'Una pagina piegata nel cassetto',
      ferry_bridgeUnlock: 'Apri la plancia',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[fruscio, e sotto, debolissima, una campana]'],
        ['otto', 'Nove ad Ada. È passata. Dov’è?'],
        ['ada', 'Su una nave. Nella nebbia. Sta affondando.'],
        ['otto', 'La Saint Brigid. Ne ho un intero scaffale: giubbotti di salvataggio, una scacchiera, quarantun ombrelli. È affondata nel 1987.'],
        ['ada', 'Come scendo?'],
        ['otto', 'Su ogni scaffale c’è una cosa fuori posto. Una bugia con il numero di pagina. La rimetta a posto e il luogo la lascia andare. Poi usi le scialuppe come una persona assennata.'],
      ],
      ferry_bellman: [
        ['otto', 'Ha incontrato l’uomo con la campana. Non gli lasci mettergliela addosso. La suona perché lei sappia dov’è. Gli sia grata. Quasi nessuno lo fa.'],
      ],
      ferry_otto2: [
        ['otto', 'Qualcosa si è appena mosso sui miei scaffali. Un fascicolo. Rask, P. Era sotto «abbandono del posto». Non c’è più.'],
        ['ada', 'E adesso dov’è?'],
        ['otto', 'Sotto «ritrovati». Non ce l’ho messo io.'],
      ],
    },
    recap: {
      ferry: 'La Saint Brigid, nella nebbia. Il comandante Aal ha detto che il ragazzo alla campana da nebbia si era fatto prendere dal panico ed era scappato. La pagina che Aal aveva strappato dal suo stesso giornale diceva che lui era ubriaco in cabina mentre Pim Rask, sedici anni, riportava a casa le scialuppe con la campana. Ho rimesso la pagina al suo posto. Quando la scialuppa 2 ha toccato l’acqua, la campana ha ricominciato a suonare.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
