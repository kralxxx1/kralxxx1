/* Deutsch — Level 1: Lagerhaus der Mühle (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'Lagerhaus der Mühle', place: 'Dannys Erinnerung — Harlow Mill, Front Street',
        intro: 'Die Decke hängt sechs Meter hoch. Die Regale laufen weiter ins Dunkel. Irgendwo tickt eine Uhr, immer auf derselben Sekunde.\n\nDannys Vater hat in diesem Gebäude fünfundzwanzig Jahre lang Kisten gepackt. Dann gaben sie ihm an einem Freitag eine Uhr und schickten ihn nach Hause.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'An die Aufzugstür geklebt', from: 'Eddie', body:
`Der Lastenaufzug braucht drei Sicherungen. Der Kasten ist beim Verladebüro.

Der Rote patrouilliert durch die Gänge. Schnell, hört nie auf, aber LAUT. Horch auf ihn.

Versuch nicht, ihm im Freien davonzulaufen. Niemand läuft Danny davon.

—E.` },
      mill_layoff: { kind: 'letter', title: 'Ein Brief auf Firmenpapier', from: 'Harlow Mill, Versandabteilung', date: '30. Mai 1986', body:
`Lieber Ray,

im Zuge der Umstrukturierung des Versands in der Front Street entfällt Ihre Stelle zum 30. Juni 1986.

Wir danken Ihnen für fünfundzwanzig Jahre treue Dienste. Bitte geben Sie Spindschlüssel und Dienstausweis im Vorderbüro ab.

Nehmen Sie die beiliegende Armbanduhr als Zeichen unserer Anerkennung an.

Die Geschäftsleitung der Harlow Mill` },
      mill_punch: { kind: 'card', title: 'Eine Stempelkarte', from: 'Harlow Mill', date: 'Sommer 1986', body:
`MITARBEITER: KOWALSKI, D. (SOMMER — FEGER)
LOHN: 3,35 $/Std.

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

Quer über die letzte Zeile, mit blauem Kuli:
AUCH PAPAS LETZTER TAG` },
      mill_graffiti: { kind: 'wall', title: 'Sprühfarbe an den Regalen', body:
`DAN #1
DANNY WAR HIER
DANNY IST IMMER HIER` },
      mill_danny1: { kind: 'note', title: 'Ein gefalteter Zettel in einer Jackentasche', from: 'Danny', date: 'März 1987', body:
`Alle denken, ich hab vor nichts Angst.

Ich hab Angst davor, dass Papa den ganzen Tag in der Küche sitzt, mit ausgeschaltetem Radio.

Also spiele ich. Wer auf Platz eins ist, sitzt nicht in der Küche.

(Wenn Rosie das liest, bring ich sie wirklich um.)` },
      mill_ray: { kind: 'letter', title: 'Ein Brief, der nie abgeschickt wurde', from: 'Ray, Dannys Vater', date: 'Mai 1987', body:
`Danny,

die Polizei hat wieder nach dem Schlüssel gefragt. Ich hab gesagt, mir ist jeder Schlüssel egal. Du kannst jeden Schlüssel in dieser Stadt haben.

Ich bin jetzt im Eisenwarenladen. Es ist in Ordnung. Weniger Stunden. Ich höre Baseball im Radio.

Ich hab dein Fahrrad repariert. Neue Kette, neue Bremsen. Es steht in der Garage.

Komm nach Hause und fahr damit. Ich sag kein Wort.

Papa` },
      mill_manifest: { kind: 'printout', title: 'Ein Frachtbrief', from: 'Harlow Mill, Rampe 3', date: '17. April 1987', body:
`SENDUNG #0256
INHALT: 1 Armbanduhr (stehen geblieben um 3:17)
GEWICHT: nichts
ZIEL: —
EMPFANG QUITTIERT VON: —

Das Papier ist warm, als käme es gerade aus dem Drucker.` },
      mill_walt3: { kind: 'diary', title: 'Walts Tagebuch', from: 'Walt', date: 'Drinnen, Tag ?', body:
`Der Rote hört nie auf. Er läuft immer wieder dieselben Runden, so wie Danny das Labyrinth gespielt hat: immer Erster, immer der Schnellste, nie ein Atemzug Pause.

Heute kam er schreiend auf mich zu. DU HAST LOSGELASSEN. DU HAST LOSGELASSEN.

Ich habe nie etwas losgelassen. Ich habe jeden Einzelnen von ihnen fünf Jahre lang festgehalten. Wen schreit er also an?

Danach bin ich ihm gefolgt und weiß nicht mehr, warum. Ich glaube, ich hatte Hunger.` },
      mill_shrine: { kind: 'note', title: 'Unter dem Foto am Schrein', from: 'W.', body:
`Er musste immer der Erste sein.
Als Erster am Automaten. Als Erster über 900.000.
Als Erster durch den Bildschirm.

Gib ihm etwas, das stehen bleibt.` },
      mill_tape: { kind: 'tape', title: 'Band: „Platz eins, für die Geschichtsbücher“', from: 'Rosies Kassettenrekorder', date: '16. April 1987, 23:52 Uhr', body:
`[Klick. Spielhallenlärm. Kinder lachen.]

DANNY: Hier spricht Danny Kowalski, Platz eins, Aufnahme für die Geschichtsbücher. Heute Nacht knacken wir den Kill Screen.

ROSIE: Heute Nacht VERSUCHEN wir, den Kill Screen zu knacken.

DANNY: Walt sagt, das ist unmöglich. Walt hat auch gesagt, keiner knackt neunhunderttausend.

TOBY: Kriegen wir Ärger? Meine Mom denkt, ich schlafe bei Sam.

DANNY: Ärger kriegt nur, wer sich erwischen lässt, Toby.

NELL: …Sam ist nach Hause gegangen, Danny.

DANNY: Sam ist ein Angsthase. Mehr Kill Screen für uns.

[Eine Pause.]

TOBY: Sam ist kein Angsthase. Sam kommt noch.

[Klick.]` },
    },
    obj: {
      mill_fuses: 'Die Sicherungen finden ({n}/3)',
      mill_panel: 'Die Sicherungen in den Aufzugskasten setzen',
      mill_wait: 'Der Aufzug kommt… Überlebe ({n} s)',
      mill_leave: 'In den Aufzug steigen',
    },
    mono: {
      mill_start: 'Eine Uhr tickt. Immer dieselbe Sekunde.',
      mill_dannySeen: 'Rot. Ein durchnässtes Laken, gewölbt wie ein Kopf, der Saum in Zacken zerrissen. Zwei riesige Augen und kein Gesicht. Darunter steckt etwas so groß wie ein Junge.',
      mill_fuse: 'Noch eine Sicherung.',
      mill_elevator: 'Der Aufzug kommt. Langsam. So langsam.',
      mill_watch: '3:17. Wie die Uhr.',
    },
    lines: {
      mill_panel: 'Die Sicherungen einsetzen',
      mill_panelIdle: 'Sicherungskasten ({n}/3)',
      mill_slots: 'Der Kasten hat drei leere Fassungen.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? Bist du da? …Oh. Den Ort kenne ich. Harlow Mill, das Lagerhaus in der Front Street. Dannys Vater hat hier fünfundzwanzig Jahre gearbeitet.'],
        ['eddie', 'Das heißt, der Rote ist auch hier.'],
      ],
      mill_danny: [
        ['eddie', 'Er ist hinter dir! Lauf nicht auf offener Strecke gegen ihn an. Brich die Linie, nimm eine Ecke, bring etwas zwischen euch!'],
        ['sam', 'Er schreit irgendwas!'],
        ['eddie', 'Das tut er immer. „Du hast losgelassen.“ Hat er mich angeschrien, hat er Walt angeschrien. Ich weiß nicht, wen er meint. LAUF.'],
      ],
      mill_watch: [
        ['eddie', 'Ist das eine Uhr? …Rays Uhr. Die haben sie ihm an dem Tag gegeben, an dem sie ihn rausgeworfen haben. Danny hat sie danach jeden Tag getragen.'],
        ['eddie', 'Irgendwo hier ist ein Schrein. Bring sie hin. Vielleicht erinnert er sich.'],
      ],
      mill_freed: [
        ['eddie', '…Ist er stehen geblieben? Sam, was hast du gemacht? Er steht einfach… da.'],
        ['eddie', 'Oh mein Gott. Das ist Danny. Das ist wirklich Danny.'],
      ],
      mill_elevator: [
        ['eddie', 'Der Aufzug ist laut. Alles hier drin hat ihn gehört. Bleib am Leben, bis er da ist.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
