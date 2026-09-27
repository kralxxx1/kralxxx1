/* Deutsch — Level 6: Licht aus (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Licht aus', place: 'Tobys Erinnerung — die Dunkelheit',
        intro: 'Dieselben gelben Räume, in denen jedes Licht tot ist. Die Dunkelheit hier ist so dick, dass man sich dagegenlehnen könnte.\n\nToby hatte sein Leben lang Angst im Dunkeln. Hier drin hat die Dunkelheit vor nichts Angst. Irgendwo in ihr gibt sich etwas große Mühe, nicht zu lachen.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Auf einem Generator', from: 'Eddie', body:
`Drei Generatoren. Überall liegen Dieselkanister herum.

Die Dunkelheit hat hier Zähne. Ich nenne sie Grinser. Licht vertreibt sie. Taschenlampe, Knicklicht, egal was.

Der Bernsteinfarbene … behalt ihn im Licht. Dreh ihm nie lange den Rücken zu.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Eine Seite aus einem Schulheft', from: 'Toby', date: '15. April 1987', body:
`Morgen ist Operation 256!!!

Danny sagt, ich bin für die Taschenlampe zuständig. Rosie hat eine Kassette gemacht. Nell hat eine Karte von den Spuk-Mustern gezeichnet und die ist echt richtig gut.

Ich hab mich heute auf Sams Walkman gesetzt. Es hat geknirscht. Sam weiß es noch nicht. Ich geb Sam mein Taschengeld für März UND April.

Danny sagt, der bernsteinfarbene Spuk auf der Nr. 7 bin ich, weil das der Angsthase ist. Walt sagt, das ist der Schlaue. So oder so ist es MEIN Spuk.` },
      dark_diary2: { kind: 'diary', title: 'Die letzte Seite', from: 'Toby', date: '17. April 1987, 0:50 Uhr — in der Spielhalle', body:
`Geschrieben beim Licht vom Feuerzeug. Danny hat hinten das Licht ausgemacht, damit es gruselig ist. Hat geklappt.

Sam ist um 21:40 nach Hause gegangen. Sam hat gesagt: „Schön. Dann verschwinde doch.“ Ich hab nichts zurückgesagt. Ich hab im Hinterzimmer geweint, wo es keiner sieht.

Und dann um 0:40 hat jemand an die Hintertür geklopft und es war SAM. Klatschnass.

SAM IST ZURÜCKGEKOMMEN!!! Sam kommt immer zurück.

Ich hab mich zuerst entschuldigt. Das heißt, ich hab gewonnen.

Level 212. Danny sagt, 256 bis drei Uhr. Alle fünf Hände. Keiner lässt los.` },
      dark_grandpa: { kind: 'card', title: 'Eine kleine Karte in einer Feuerzeugschachtel', from: 'Tobys Opa', date: '1985', body:
`Toby —

Deine Oma hat mir das 1951 geschenkt, damit ich von der Nachtschicht nach Hause finde.

Jetzt gehört es dir. Du musst nie im Dunkeln sitzen.

—Opa` },
      dark_grinners: { kind: 'note', title: 'Zittrige Handschrift', from: 'Eddie', body:
`Die Grinser sind keine Menschen. Sie sind nicht mal Spuke.

Ich glaube, sie sind das, was sich das Spiel unter der Dunkelheit vorstellt. Was Toby sich vorstellt. Was ein Dreizehnjähriger glaubt, das unter dem Bett wohnt.

Knick ein Knicklicht, zähl bis drei, weg sind sie.

Auf diesem Level schlafe ich nicht viel.` },
      dark_walt6: { kind: 'diary', title: 'Walts Tagebuch, gedrängte Schrift', from: 'Walt', date: 'Drinnen', body:
`Ich weiß meinen Namen nicht mehr. Er fängt mit W an.

Ich weiß noch die Handschrift eines kleinen Mädchens. Runde Buchstaben. Sie hat ein oranges Ding mit Hörnern gemalt und PAPA darunter geschrieben.

Ich weiß noch, wie Kupfermünzen schmecken.

Der Bernsteinfarbene sieht mich auch nicht an. Niemand sieht mich mehr an.

FRISS, sagt das Spielfeld. FRISS.` },
      dark_wall: { kind: 'wall', title: 'Mit Feuerzeugruß an die Wand geschrieben', body:
`SCHAU MICH NICHT AN

ES TUT MIR LEID SAM` },
      dark_porch: { kind: 'note', title: 'Ein Zettel an einer Fliegengittertür', from: 'Maggie, Tobys Mutter', date: 'April 1987', body:
`Toby —

Das Verandalicht bleibt an, bis du zu Hause bist.

Hab dich lieb, Mama` },
      dark_tape: { kind: 'tape', title: 'Kassette: „Tobys Witz“', from: 'Rosies Kassettenrekorder', date: '16. April 1987, 23:58 Uhr', body:
`[Klick. Das Hinterzimmer der Spielhalle. Das Licht ist aus. Ein Feuerzeug schnappt auf.]

TOBY: Okay, okay. Warum ist der Muncher über die Straße gegangen?

DANNY: Weil die Spuke auf dieser Seite waren.

TOBY: Nein! Weil auf der Straße STERNE lagen!

[Stille. Dann prustet Nell los, dann Rosie, dann lachen alle viel lauter, als der Witz es verdient.]

TOBY: [lacht noch] Sam müsste hier sein. Sam lacht über den immer.

[Das Lachen verebbt.]

ROSIE: … Sam kommt schon noch, Toby.

[Klick.]` },
    },
    obj: {
      dark_generators: 'Die Generatoren starten ({n}/3)',
      dark_leave: 'Zum Lastenaufzug gehen',
    },
    mono: {
      dark_start: 'Ich sehe gar nichts. Die Taschenlampe … ich weiß nicht, ob sie reicht.',
      dark_tobySeen: 'Etwas Bernsteinfarbenes in der Ecke. Ein Laken mit angesengtem Saum. Es bewegt sich nicht. Nicht, solange ich hinsehe.',
      dark_grinner: 'Ein Lächeln in der Dunkelheit. Nur Zähne.',
      dark_gen: 'Der Generator hustet sich wach. Licht.',
      dark_lighter: 'Sein Feuerzeug. Einmal, 1986, durfte ich es halten. Nach zehn Sekunden wollte er es zurück.',
      dark_diary2: 'Sam ist zurückgekommen. … Nein. Nein. Ich bin nach Hause gegangen. Um 21:40 bin ich nach Hause gegangen.',
    },
    lines: {
      dark_gen: 'Diesel einfüllen und starten (halten)',
      dark_genEmpty: 'Generator (kein Diesel)',
      dark_needFuel: 'Finde zuerst einen Dieselkanister.',
      dark_tankEmpty: 'Der Tank des Generators ist leer.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Ich hasse den hier. Ich hasse den hier so sehr. Bleib im Licht, Sam. Ich mein’s ernst.'],
      ],
      dark_toby: [
        ['eddie', 'Bernstein … das ist Toby. Solange du ihn ansiehst, kommt er nicht auf dich zu. Wenn er Angst hatte, konnte er nie jemandem in die Augen sehen.'],
        ['sam', 'Mir hat er in die Augen gesehen. Die ganze Zeit.'],
        ['eddie', '… Ja. Wahrscheinlich schon.'],
      ],
      dark_lighter: [
        ['eddie', 'Das Feuerzeug von seinem Opa. Das durfte nie jemand anfassen. Nicht mal Danny.'],
      ],
      dark_freed: [
        ['eddie', '… Er ist doch nur ein Kind, Sam. Das sind alles nur Kinder.'],
        ['eddie', 'Was für ein Spiel tut Kindern so was an?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
