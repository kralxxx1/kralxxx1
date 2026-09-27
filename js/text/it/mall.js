/* Italiano — Livello 7: Harlow Mall (13 dicembre 1986, il giorno più felice). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'Il ricordo di tutti — sabato 13 dicembre 1986',
        intro: 'Il sabato più bello del 1986. Cinque ragazzini, venti dollari in tutto, un albero di Natale alto tre piani.\n\nIl centro commerciale adesso è chiuso. I manichini si sono avvicinati alle vetrine. Si muovono solo quando nessuno guarda.',
      },
    },
    items: {
      frame: { name: 'Fotogramma della cabina', desc: 'Un riquadro di una striscia della cabina per fototessere, ritagliato. La cabina li rivuole tutti insieme.' },
      frame1: { name: 'Fotogramma della cabina', doc: 'mall_frame1' },
      frame2: { name: 'Fotogramma della cabina', doc: 'mall_frame2' },
      frame3: { name: 'Fotogramma della cabina', doc: 'mall_frame3' },
      frame4: { name: 'Fotogramma della cabina', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'Sul retro di una mappa del centro commerciale', from: 'Eddie', body:
`La cabina per fototessere vicino all’area ristoro è rotta. Rivuole le sue foto.

Quattro fotogrammi di una striscia sono sparsi per i negozi. Trovali, infilali nella cabina e le porte si aprono.

I manichini. Non staccargli gli occhi di dosso. Lo dico alla lettera. Non si muovono finché li guardi.

Questo è il posto più felice di tutto il gioco, ed è quello che odio di più.

—E.` },
      mall_directory: { kind: 'note', title: 'Mappa del centro, con il «VOI SIETE QUI» consumato dalle dita', from: 'Harlow Mall', date: '1986', body:
`PIANO 1
Spins Records ......... Musica, cassette, cassette vergini
Comic Vault ........... Fumetti, figurine, giochi
Toy Parade ............ Giocattoli per tutte le età
Cabina foto ........... 4 pose 1 $
Area ristoro .......... Sunny Orange, Nonna’s Pizza, Pretzel Barn
Starlight Jr. ......... Mini chiosco di videogiochi (vicino alla fontana)

Aperto fino alle 21 fino alla vigilia di Natale!` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Fotogramma n. 1 della cabina', from: 'Cabina foto', date: '13 dic. 1986', body:
`Danny e Rosie. Danny fa finta di annoiarsi. Rosie fa finta di essere una DJ e parla dentro un pretzel come fosse un microfono.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Fotogramma n. 2 della cabina', from: 'Cabina foto', date: '13 dic. 1986', body:
`Nell e Toby. Nell sorride davvero, un sorriso vero, e sembra sorpresa lei stessa. Toby le ha messo un cappello da Babbo Natale.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Fotogramma n. 3 della cabina', from: 'Cabina foto', date: '13 dic. 1986', body:
`Tu e Toby, guancia contro guancia, con la stessa identica smorfia. Hai gli occhi chiusi dal ridere.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Fotogramma n. 4 della cabina', from: 'Cabina foto', date: '13 dic. 1986', body:
`Tutti e cinque stipati su un solo sgabello. Il gomito di Danny è nel tuo orecchio. Nessuno guarda l’obiettivo. Tutti si guardano tra loro.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'La striscia di foto, ancora tiepida', from: 'Cabina foto', date: '13 dic. 1986', body:
`Quattro fotogrammi, una striscia. Sul retro, cinque firme e una riga nella scrittura tonda di Rosie:

«AMICI PER SEMPRE. ANCHE SE DIVENTIAMO VECCHI E NOIOSI.
ANCHE SE CI TRASFERIAMO.
ANCHE SE.
— gli Starlight Five»

Ti ricordi chi ha tenuto la striscia. Toby. Nella scatola dell’accendino.` },
      mall_lists: { kind: 'note', title: 'Cinque letterine di Natale su un solo foglio di quaderno', from: 'Gli Starlight Five', date: 'Dicembre 1986', body:
`DANNY: un lavoro per mio papà. (anche uno skateboard)
ROSIE: un microfono vero. cassette vergini (100)
NELL: Star Rangers n. 12. che Theo non abbia mai più paura dell’acqua
TOBY: una torcia che non si scarica mai. che Sam non si arrabbi più per niente
SAM: il livello 256

(Qualcuno ha cancellato il desiderio di SAM e sotto ha scritto, con la mano di Toby: «ce lo prendiamo insieme»)` },
      mall_receipt: { kind: 'note', title: 'Uno scontrino incastrato in un espositore di dischi', from: 'Spins Records', date: '13/12/86 15:41', body:
`CASSETTA VERGINE KEYTONE C-90 x10 .... $14.90
BIG BAND CHRISTMAS (LP usato) ........ $1.00
TOTALE ............................... $15.90
CONTANTI ............................. $16.00
RESTO ................................ $0.10

Sul retro: «Lato A: canzoni per adesso. Lato B: per dopo. — R.»` },
      mall_guard: { kind: 'note', title: 'Registro della guardia giurata', from: 'Sicurezza Harlow Mall', date: '13 dicembre 1986', body:
`14:20 — Cinque ragazzini alla fontana che tirano monetine. Detto di smettere. Hanno smesso. Poi hanno ricominciato. Lasciato perdere. È Natale.

16:05 — Gli stessi cinque nella cabina per fototessere. Cabina inceppata. I ragazzini l’hanno aggiustata da soli (il grande aveva un cacciavite). Non ho chiesto.

17:30 — Il più piccolo si è perso. Trovato che piangeva vicino alla fontana. Gli altri quattro sono arrivati di corsa da quattro direzioni. Tutti abbracciati. Lo scrivo perché è stato bello.` },
      mall_kiosk: { kind: 'note', title: 'Un volantino sul chiosco Starlight Jr.', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
La sala giochi Starlight arriva al centro commerciale!
3 cabinati • 25 ¢ • Aperto nel weekend

«Ogni bambino merita un record.» — Walt, titolare

(In un angolo, un vecchio disegno a pastelli incollato all’insegna: una creatura arancione tonda con le corna e un gran sorriso, su zampette corte. Firmato: LIL.)` },
      mall_walt: { kind: 'diary', title: 'Il diario di Walt, una pagina sbavata', from: 'Walt', date: 'Dentro', body:
`Il centro commerciale. Qui avevo un chiosco. Ho incollato il vecchio disegno di Lily sull’insegna. Chompy, con le zampe.

Quei cinque passavano ogni sabato, quell’inverno. Quello chiassoso, quella delle cassette, quella silenziosa con gli occhiali, il piccolo con l’accendino e chi gli stava sempre accanto.

Chi gli stava sempre accanto. Non ricordo come si chiamava. Comincia con la S.

È importante. Non so perché sia importante.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'Un disegno attaccato dentro il chiosco Starlight Jr.', from: 'Lily, 8 anni', date: 'Dicembre 1982', body:
`Pastelli a cera. Il grande albero di Natale di Front Street. Ai suoi piedi, una creatura arancione tonda con le corna e le zampe tiene per mano una bambina. La neve cade a puntini blu.

PAPÀ DICE CHE UN GIORNO CI SARÀ UNO STARLIGHT IN OGNI CITTÀ.
ANCHE UNO PICCOLO IN UN CENTRO COMMERCIALE.
(HO DISEGNATO CHOMPY) (PAPÀ DICE CHE LO INVENTATO IO)` },
      mall_tape: { kind: 'tape', title: 'Nastro: «Messaggio di Natale»', from: 'Il registratore di Rosie', date: '13 dicembre 1986', body:
`[Clic. Rumore dell’area ristoro, musica natalizia, una fontana.]

ROSIE: Qui Rosie Radio, in diretta dall’area ristoro, con un messaggio di Natale per… noi del futuro. Vai.

DANNY: Danny del futuro, vedi di essere ricco.

NELL: Ehm. Nell del futuro. Spero che tu sia ancora amica di questi idioti.

TOBY: Toby del futuro, sarai più alto. Finalmente.

SAM: Sam del futuro… non dimenticare questo momento.

ROSIE: Che sdolcinatezza, Sam.

SAM: Zitta, è Natale.

[Ridono tutti. A qualcuno cade un vassoio.]

ROSIE: Rosie Radio chiude qui. Buon Natale, Harlow.

[Clic.]` },
    },
    obj: {
      mall_frames: 'Trova i fotogrammi della striscia ({n}/4)',
      mall_booth: 'Infila i fotogrammi nella cabina per fototessere',
      mall_leave: 'Esci dalle porte del centro commerciale',
    },
    mono: {
      mall_start: 'Il centro commerciale. Pretzel e pino. Qui ero felice. L’avevo dimenticato.',
      mall_frame1: 'Danny e Rosie. Faceva sempre finta di non divertirsi.',
      mall_frame2: 'Nell e Toby. Non sorrideva mai nelle foto. In questa sì.',
      mall_frame3: 'Io e Toby. La stessa smorfia. Facevamo sempre la stessa smorfia.',
      mall_frame4: 'Tutti e cinque su uno sgabello.',
      mall_strip: 'L’ha tenuta. Nella scatola dell’accendino. L’ha tenuta.',
      mall_mannequin: 'Quel manichino guardava la vetrina. Adesso guarda me.',
    },
    lines: {
      mall_boothUse: 'Infila i fotogrammi nella cabina',
      mall_boothLook: 'Cabina foto (4 pose 1 $)',
      mall_boothNeed: 'La cabina ronza. Ne mancano ancora {n}.',
    },
    radio: {
      mall_start: [
        ['eddie', 'Il centro commerciale. Qui erano tutti così felici, Sam. Ogni ricordo di questo posto è caldo.'],
        ['eddie', 'Ed è proprio per questo che il gioco ci si aggrappa così facilmente.'],
      ],
      mall_mannequin: [
        ['eddie', 'Non sbattere le palpebre. Dico sul serio. Cammina all’indietro, se serve.'],
      ],
      mall_frames: [
        ['eddie', 'Tutti e quattro. La cabina è vicino all’area ristoro.'],
      ],
      mall_booth: [
        ['eddie', '…Gli Starlight Five. Walt vi chiamava così. Adesso mi ricordo.'],
        ['eddie', 'Non affezionarti troppo a queste cose, Sam. Sono echi. Il gioco li ripete per tenerti qui.'],
        ['sam', 'È questo che è successo a te?'],
        ['eddie', '…Le porte sono aperte. Vai.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
