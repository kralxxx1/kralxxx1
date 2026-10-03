/* Deutsch — Kapitel 6: Niedrigwasser (Gammel Ostra). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      village: {
        name: 'KAPITEL 6', title: 'Niedrigwasser', place: 'Gammel Ostra, Ostratal',
        intro: 'Freitag, 2. Oktober 1964, nach Einbruch der Dunkelheit, im Regen.\n\nDie Schleusentore des Damms wurden heute früh um sechs geschlossen. Auf den Plakaten an jedem Torpfosten steht der Neunte. Das Dorf ist leer, und an den tiefen Stellen ist der Fluss schon über die Ufer getreten. In einem Haus brennt noch eine Lampe im Fenster.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Eine Bekanntmachung an einem Torpfosten', from: 'Bezirksamt', date: 'September 1964', body:
`REGULIERUNG DES OSTRAFLUSSES

Die Schleusentore des Damms werden geschlossen und das Tal wird geflutet am
FREITAG, 9. OKTOBER 1964.

Alle Einwohner müssen Gammel Ostra bis zu diesem Tag verlassen haben. Umzugslastwagen fahren jeden Morgen um 8 Uhr vom Schulhof ab.

(Auf diesem Exemplar ist die 9 mit Rotstift durchgestrichen und FREITAG, 2. OKTOBER darübergeschrieben. Nicht an jedem Pfosten wurde es berichtigt.)` },
      village_torLetter: { kind: 'letter', title: 'Ein Brief auf dem Küchentisch', from: 'Tor', date: '24. September 1964', body:
`Mutter,

hör auf, an die Zeitung zu schreiben. Es nützt nichts, und der Vorstand liest jedes Wort.

Die Tore schließen am Freitag, dem 9. Du hast alle Zeit der Welt. Ich komme am Morgen des 8. mit dem Auto hoch, wir laden deine Sachen ein, und du kommst wie eine vernünftige Frau zu Ingrid nach Halvard, und unterwegs darfst du mir so böse sein, wie du willst.

Mach keine Dummheiten.
Tor` },
      village_diary: { kind: 'report', title: 'Bautagebuch, Hütte des Dammwärters', from: 'T. Holm, Bauleiter', date: 'September–Oktober 1964', body:
`28.9.  Vorstand zieht den Schluss um eine Woche vor: Tore schließen 2.10., 06.00. Heute Abend im Rundfunk bekanntgegeben. Plakate sind zu berichtigen.
       Mutter hat kein Radio. Sage es ihr selbst, wenn ich sie hole. Am Tag selbst ist es leichter.
29.9.  Betonieren der Hochwasserentlastung verschoben. Regen.
1.10.  Betonieren lief die ganze Nacht. Konnte nicht weg. Ingrid in Halvard angerufen: Mutter hat ihr gesagt, ich komme am 8., Ingrid soll sich keine Sorgen machen.
2.10.  06.00 Tore planmäßig geschlossen. Tal läuft voll.
       Ich bin nicht zum Haus hinaufgefahren.

(In dieser Hand gibt es keine weiteren Einträge.)` },
      village_ingrid: { kind: 'note', title: 'Ein Etikett an einer Kiste auf dem Dachboden', from: 'I.', date: '30.9.64', body:
`MUTTERS SACHEN — NACH HALVARD

Sie sagt, sie verlässt ihr Haus nicht, und damit basta. Tor sagt, er holt sie am 8.
Ich habe ihre Spieldose mitgenommen, damit sie einen Grund hat, sie sich zu holen.
— I.` },
      village_removal: { kind: 'report', title: 'Die Umzugsliste auf dem Lehrerpult', from: 'Schule Gammel Ostra', date: 'Oktober 1964', body:
`Aas, Olav, 64 — zu seinem Sohn, Nordvik — fort 21.9.
Familie Berg (5) — Halvard — fort 23.9.
Dahl, Marit, 80 — ins Heim in Ostra — fort 25.9.
Holm, Signe, 71, Stuegata 4 — zu ihrer Tochter (I. Lind), Halvard — durch ihren Sohn, 8.10.
Kvam, Per und Anna — fort 26.9.

(Jede Zeile bis auf eine ist abgehakt.)` },
      village_parish: { kind: 'note', title: 'Ein Zettel auf dem Tisch in der Sakristei', from: 'Pfarrer A. Rø', date: '27.9.64', body:
`Heute der letzte Gottesdienst. Die Glocken kommen am 30. herunter.
Der Chor bat darum, das Abendlied noch einmal zu singen, und ich habe es erlaubt, obwohl die Kirche fast leer war.

Frau Holm bat, die Kirche nicht zu schließen, solange sie noch im Dorf ist. Ich sagte, der Herr schließt nicht. Der Vorstand sieht das anders.

Die Schlüssel zu den Häusern der Alten hängen bis zum Umzug am Brett in der Sakristei.` },
      village_shop: { kind: 'note', title: 'Das Anschreibebuch des Ladens, aufgeschlagen', from: 'Gammel Ostra Landhandel', date: 'Oktober 1964', body:
`1.10.  Frau Holm — Petroleum, 2 Liter. Streichhölzer. Kaffee, ¼ kg. Angeschrieben.
         (Sagt, sie zahlt am 8.)

(Der Laden schloss am selben Abend. Die Regale sind leer.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Eine Zeichnung unter dem Kissen', from: 'Wren, 7 Jahre', body:
`Wachsmalkreide, weich geworden von der Feuchtigkeit. Eine weiße Kirche unter grünem Wasser, Fische schwimmen am Turm vorbei. Daneben ein kleines rotes Haus, und im Fenster eine Frau mit weißem Haar, die eine Lampe hochhält. Über dem Wasser der kleine rote Vogel.

Darunter:
SIE HAT GEWARTET` },
    },
    items: {
      signeKey: { name: 'Hausschlüssel', desc: 'An einer roten Schnurschlaufe. Ein Papieretikett: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Spieldose', desc: 'Rosenholz, mit einer kleinen Tänzerin auf dem Deckel. Aufgezogen spielt sie einen Walzer, den du fast kennst.' },
    },
    obj: {
      village_start: 'Finde heraus, wer die Lampe angezündet hat',
      village_key: 'Finde einen Schlüssel für das Haus mit der Lampe',
      village_box: 'Finde, was früher auf dem Kaminsims stand',
      village_mantel: 'Stell die Spieldose zurück auf den Kaminsims',
      village_run: 'Das Wasser kommt. Lauf zur Leiter am Damm',
      village_climb: 'Klettere',
    },
    mono: {
      village_start: 'Ein Dorf. Leer. Die Bäume sind alle gefällt. In einem Fenster ist Licht.',
      village_locked: 'Verschlossen. Drinnen brennt eine Lampe, und niemand macht auf.',
      village_church: 'Sie singen. Im Dunkeln, zum Altar gewandt. Keinen Laut.',
      village_silence: 'Sie haben aufgehört.',
      village_turn: 'Sie drehen sich um.',
      village_resume: 'Sie singen wieder.',
      village_key: 'S. Holm, Stuegata 4. Holm. Den Namen kenne ich.',
      village_school: 'Die Schule. Von hier sind die Lastwagen abgefahren.',
      village_list: 'Holm, Signe. Zu ihrer Tochter, I. Lind. Lind. I. Lind ist Oma.',
      village_attic: 'Kisten. Etiketten. Ein ganzes Dorf in Kartons gepackt.',
      village_box: 'Eine Spieldose. „Mutters Sachen.“ Mutter. Omas Mutter.',
      village_house: 'Die Lampe brennt. Der Ofen ist warm. Niemand.',
      village_dust: 'Im Staub auf dem Kaminsims ist ein sauberes Viereck. Hier hat lange etwas gestanden.',
      village_placed: 'So. Wo du sie immer hattest.',
      village_claimed: 'Sie spielt von selbst. Die Uhr schlägt. Es ist sechs.',
      village_water: 'Dieses Tosen. Das Wasser. Es kommt.',
      village_ladder: 'Die Leiter. Hoch. Los, hoch.',
      village_top: 'Oben. Das ganze Tal ist Wasser.',
      village_gran: 'Oma hat nie erzählt, dass sie hier eine Mutter hatte. Kein einziges Mal.',
    },
    lines: {
      village_mantelLook: 'Der Kaminsims',
      village_mantelPut: 'Die Spieldose auf den Kaminsims stellen',
      village_ladderPrompt: 'Die Leiter hinaufklettern (W halten)',
      village_wellLook: 'Ein Brunnen',
    },
    radio: {
      village_otto1: [
        ['radio', '[Regen auf dem Rauschen]'],
        ['otto', 'Neun an Ada. Regen, ein leeres Dorf, ein Damm? Gammel Ostra. Davon habe ich ein ganzes Regal. Hauptsächlich Türknäufe. Die Leute nehmen ihre Schlüssel mit und lassen die Türknäufe da.'],
        ['ada', 'Da singt jemand. In der Kirche.'],
        ['otto', 'Dann lassen Sie sie singen. Solange sie singen, schauen sie zum Altar. Wenn sie aufhören, warten Sie nicht ab, warum.'],
      ],
      village_otto2: [
        ['otto', 'Ada. Auf meinem Regal hat eben eine Spieldose von selbst zu spielen begonnen. Das Wasser hier auf dem Boden steigt. Ich würde gehen, an Ihrer Stelle. Ich würde jetzt gehen.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2. Oktober 1964. Meine Urgroßmutter Signe Holm wollte ihr Haus nicht verlassen. Ihr Sohn Tor, der Ingenieur des Damms, sagte ihr, die Tore würden am Neunten schließen; sie schlossen am Zweiten, und er fuhr nicht zum Haus hinauf. Oma glaubte, Tor hole sie. Die Lampe brannte noch, als das Wasser kam. Ich habe ihre Spieldose zurück auf ihren Kaminsims gestellt und bin dann den Damm hinaufgeklettert, während das Tal unter mir volllief.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
