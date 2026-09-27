/* Deutsch — Level 7: Harlow Mall (13. Dezember 1986, der glücklichste Tag). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'Die Erinnerung von allen — Samstag, 13. Dezember 1986',
        intro: 'Der schönste Samstag von 1986. Fünf Kinder, zwanzig Dollar zusammen, ein Weihnachtsbaum, drei Stockwerke hoch.\n\nDas Einkaufszentrum ist jetzt geschlossen. Die Schaufensterpuppen sind näher an die Scheiben gerückt. Sie bewegen sich nur, wenn niemand hinsieht.',
      },
    },
    items: {
      frame: { name: 'Fotostreifen-Bild', desc: 'Ein Bild von einem Fotoautomaten-Streifen, abgeschnitten. Der Automat will sie wieder zusammen haben.' },
      frame1: { name: 'Fotostreifen-Bild', doc: 'mall_frame1' },
      frame2: { name: 'Fotostreifen-Bild', doc: 'mall_frame2' },
      frame3: { name: 'Fotostreifen-Bild', doc: 'mall_frame3' },
      frame4: { name: 'Fotostreifen-Bild', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'Auf der Rückseite eines Lageplans', from: 'Eddie', body:
`Der Fotoautomat bei den Imbissständen ist kaputt. Er will seine Bilder zurück.

Vier Bilder von einem Fotostreifen liegen verstreut in den Läden. Finde sie, steck sie in den Automaten, dann gehen die Türen auf.

Die Schaufensterpuppen. Lass sie nicht aus den Augen. Das meine ich wörtlich. Solange du hinsiehst, bewegen sie sich nicht.

Das ist der glücklichste Ort im ganzen Spiel, und ich hasse ihn am meisten.

—E.` },
      mall_directory: { kind: 'note', title: 'Lageplan, „SIE SIND HIER“ von Fingern abgerieben', from: 'Harlow Mall', date: '1986', body:
`EBENE 1
Spins Records ......... Musik, Kassetten, Leerkassetten
Comic Vault ........... Comics, Karten, Spiele
Toy Parade ............ Spielzeug für jedes Alter
Fotoautomat ........... 4 Posen 1 $
Imbissbereich ......... Sunny Orange, Nonna’s Pizza, Pretzel Barn
Starlight Jr. ......... Mini-Spielhallenkiosk (am Brunnen)

Bis Heiligabend täglich bis 21 Uhr geöffnet!` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Bild Nr. 1 aus dem Fotoautomaten', from: 'Fotoautomat', date: '13.12.1986', body:
`Danny und Rosie. Danny tut so, als würde er sich langweilen. Rosie tut so, als wäre sie DJ, und spricht in eine Brezel wie in ein Mikrofon.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Bild Nr. 2 aus dem Fotoautomaten', from: 'Fotoautomat', date: '13.12.1986', body:
`Nell und Toby. Nell lächelt tatsächlich, ein echtes Lächeln, und wirkt selbst überrascht davon. Toby hat ihr eine Weihnachtsmannmütze aufgesetzt.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Bild Nr. 3 aus dem Fotoautomaten', from: 'Fotoautomat', date: '13.12.1986', body:
`Du und Toby, Wange an Wange, ihr zieht genau dieselbe Grimasse. Deine Augen sind vor Lachen zugekniffen.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Bild Nr. 4 aus dem Fotoautomaten', from: 'Fotoautomat', date: '13.12.1986', body:
`Ihr fünf, zusammengequetscht auf einem Hocker. Dannys Ellbogen steckt in deinem Ohr. Niemand schaut in die Kamera. Alle schauen einander an.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'Der Fotostreifen, noch warm', from: 'Fotoautomat', date: '13.12.1986', body:
`Vier Bilder, ein Streifen. Auf der Rückseite fünf Unterschriften und eine Zeile in Rosies runder Schrift:

„FREUNDE FÜR IMMER. AUCH WENN WIR ALT UND LANGWEILIG WERDEN.
AUCH WENN WIR WEGZIEHEN.
AUCH WENN.
— die Starlight Five“

Du weißt noch, wer den Streifen behalten hat. Toby. In seiner Feuerzeugschachtel.` },
      mall_lists: { kind: 'note', title: 'Fünf Wunschzettel auf einem Blatt Heftpapier', from: 'Die Starlight Five', date: 'Dezember 1986', body:
`DANNY: eine arbeit für meinen dad. (und ein skateboard)
ROSIE: ein echtes mikrofon. leerkassetten (100)
NELL: Star Rangers Nr. 12. dass Theo nie mehr angst vor wasser hat
TOBY: eine taschenlampe, die nie leer wird. dass Sam sich nicht mehr über alles aufregt
SAM: level 256

(Jemand hat SAMS Wunsch durchgestrichen und darunter geschrieben, in Tobys Schrift: „das holen wir uns zusammen“)` },
      mall_receipt: { kind: 'note', title: 'Ein Kassenbon, in einer Plattenkiste hängen geblieben', from: 'Spins Records', date: '13.12.86 15:41', body:
`KEYTONE C-90 LEERKASSETTE x10 ........ $14.90
BIG BAND CHRISTMAS (gebr. LP) ........ $1.00
SUMME ................................ $15.90
BAR .................................. $16.00
RÜCKGELD ............................. $0.10

Auf der Rückseite: „Seite A: Songs für jetzt. Seite B: für danach. — R.“` },
      mall_guard: { kind: 'note', title: 'Wachbuch des Sicherheitsdienstes', from: 'Sicherheitsdienst Harlow Mall', date: '13. Dezember 1986', body:
`14:20 — Fünf Kinder am Brunnen werfen Pennys. Gesagt, sie sollen aufhören. Haben aufgehört. Dann wieder angefangen. Laufen lassen. Ist Weihnachten.

16:05 — Dieselben fünf im Fotoautomaten. Automat klemmt. Kinder haben ihn selbst repariert (der Große hatte einen Schraubenzieher). Nicht nachgefragt.

17:30 — Der Kleinste verloren gegangen. Weinend am Brunnen gefunden. Die anderen vier kamen aus vier Richtungen angerannt. Alle haben sich umarmt. Schreibe das auf, weil es schön war.` },
      mall_kiosk: { kind: 'note', title: 'Ein Flyer am Starlight-Jr.-Kiosk', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
Die Starlight-Spielhalle kommt ins Einkaufszentrum!
3 Automaten • 25 ¢ • Am Wochenende geöffnet

„Jedes Kind verdient einen Highscore.“ — Walt, Inhaber

(In der Ecke ist eine alte Wachsmalzeichnung auf das Schild geklebt: ein rundes oranges Wesen mit Hörnern und breitem Grinsen, auf kleinen Beinen. Signiert: LIL.)` },
      mall_walt: { kind: 'diary', title: 'Walts Tagebuch, eine verschmierte Seite', from: 'Walt', date: 'Drinnen', body:
`Das Einkaufszentrum. Ich hatte hier einen Kiosk. Ich habe Lilys alte Zeichnung auf das Schild geklebt. Chompy, mit Beinen.

Die fünf kamen in dem Winter jeden Samstag vorbei. Der Laute, die mit den Kassetten, die Stille mit der Brille, der Kleine mit dem Feuerzeug und das Kind, das immer bei ihm war.

Das Kind, das immer bei ihm war. Ich weiß den Namen nicht mehr. Er fängt mit S an.

Es ist wichtig. Ich weiß nicht, warum es wichtig ist.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'Eine Zeichnung, innen in den Starlight-Jr.-Kiosk geklebt', from: 'Lily, 8 Jahre', date: 'Dezember 1982', body:
`Wachsmalstift. Der große Weihnachtsbaum in der Front Street. An seinem Fuß hält ein rundes oranges Wesen mit Hörnern und Beinen ein kleines Mädchen an der Hand. Schnee fällt in blauen Punkten.

PAPA SAGT, EINES TAGES GIBT ES IN JEDER STADT EIN STARLIGHT.
SOGAR EIN KLEINES IN EINEM EINKAUFSZENTRUM.
(ICH HAB CHOMPY GEMALT) (PAPA SAGT, ICH HAB IHN ERFUNDEN)` },
      mall_tape: { kind: 'tape', title: 'Kassette: „Weihnachtsbotschaft“', from: 'Rosies Kassettenrekorder', date: '13. Dezember 1986', body:
`[Klick. Lärm vom Imbissbereich, Weihnachtsmusik, ein Brunnen.]

ROSIE: Hier ist Radio Rosie, live vom Imbissbereich, mit einer Weihnachtsbotschaft an … unser zukünftiges Ich. Los.

DANNY: Zukünftiger Danny, du bist besser reich.

NELL: Äh. Zukünftige Nell. Ich hoffe, du bist immer noch mit diesen Idioten befreundet.

TOBY: Zukünftiger Toby, du bist bestimmt größer. Endlich.

SAM: Zukunfts-Sam … vergiss das hier nicht.

ROSIE: Das ist kitschig, Sam.

SAM: Klappe, es ist Weihnachten.

[Alle lachen. Jemandem fällt ein Tablett runter.]

ROSIE: Radio Rosie verabschiedet sich. Frohe Weihnachten, Harlow.

[Klick.]` },
    },
    obj: {
      mall_frames: 'Die Bilder des Fotostreifens finden ({n}/4)',
      mall_booth: 'Die Bilder in den Fotoautomaten stecken',
      mall_leave: 'Durch die Türen des Einkaufszentrums gehen',
    },
    mono: {
      mall_start: 'Das Einkaufszentrum. Brezeln und Tannennadeln. Ich war hier glücklich. Das hatte ich vergessen.',
      mall_frame1: 'Danny und Rosie. Er hat immer so getan, als hätte er keinen Spaß.',
      mall_frame2: 'Nell und Toby. Auf Fotos hat sie nie gelächelt. Auf diesem schon.',
      mall_frame3: 'Ich und Toby. Dieselbe Grimasse. Wir haben immer dieselbe Grimasse gezogen.',
      mall_frame4: 'Wir fünf auf einem Hocker.',
      mall_strip: 'Er hat ihn behalten. In der Feuerzeugschachtel. Er hat ihn behalten.',
      mall_mannequin: 'Die Puppe hat zum Fenster geschaut. Jetzt schaut sie mich an.',
    },
    lines: {
      mall_boothUse: 'Die Bilder in den Fotoautomaten stecken',
      mall_boothLook: 'Fotoautomat (4 Posen 1 $)',
      mall_boothNeed: 'Der Automat summt. Es fehlen noch {n}.',
    },
    radio: {
      mall_start: [
        ['eddie', 'Das Einkaufszentrum. Hier waren sie alle so glücklich, Sam. Jede Erinnerung an diesen Ort ist warm.'],
        ['eddie', 'Genau deshalb kann das Spiel sie so leicht festhalten.'],
      ],
      mall_mannequin: [
        ['eddie', 'Nicht blinzeln. Ich mein’s ernst. Geh notfalls rückwärts.'],
      ],
      mall_frames: [
        ['eddie', 'Alle vier. Der Automat ist bei den Imbissständen.'],
      ],
      mall_booth: [
        ['eddie', '… Die Starlight Five. So hat Walt euch genannt. Jetzt weiß ich es wieder.'],
        ['eddie', 'Häng dich nicht zu sehr an die hier, Sam. Das sind Echos. Das Spiel spielt sie ab, damit du hierbleibst.'],
        ['sam', 'Ist dir das passiert?'],
        ['eddie', '… Die Türen sind offen. Geh.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
