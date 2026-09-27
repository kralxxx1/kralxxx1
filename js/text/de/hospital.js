/* Deutsch — Level 9: St. Agnes (Walt, Oktober 1983). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      hospital: {
        name: 'LEVEL 9', title: 'St. Agnes', place: 'Walts Erinnerung — Kinderstation, Oktober 1983',
        intro: 'Walts schlimmster Monat, perfekt aufbewahrt. Grüne Wände, weiche Schuhe, Bohnerwachs und Orangen.\n\nIrgendwo auf dieser Station ist Zimmer 207. Irgendwo auf dieser Station zählt etwas Großes die Sekunden, in denen du wegschaust.',
      },
    },
    items: {
      page: { name: 'Eine Seite aus Walts Tagebuch', desc: 'An der Heftung herausgerissen. Seine Schrift wird mit jeder Seite kleiner.' },
      page1: { name: 'Eine Seite aus Walts Tagebuch' }, page2: { name: 'Eine Seite aus Walts Tagebuch' }, page3: { name: 'Eine Seite aus Walts Tagebuch' }, page4: { name: 'Eine Seite aus Walts Tagebuch' }, page5: { name: 'Eine Seite aus Walts Tagebuch' },
      room207Key: { name: 'Schlüssel zu Zimmer 207', desc: 'Ein Stationsschlüssel an einem Pappanhänger, in der sauberen Schrift einer Schwester: 207 — LILY. Hinten ein Sonnenaufkleber.' },
    },
    docs: {
      hospital_intro: { kind: 'note', title: 'An einen Rollstuhl geklemmt', from: 'Eddie', body:
`Das hier ist Walts. Das merke ich. Alles ist zu sauber.

Fünf Seiten aus seinem Tagebuch liegen auf der Station verstreut. Ich glaube, er hat sie selbst rausgerissen, damit er sie nicht lesen muss.

Zimmer 207 ist abgeschlossen. Im Schwesternzimmer gibt es Schlüssel. Geh nicht rein, bevor du die Seiten gelesen hast. Ich weiß nicht, warum. Es fühlt sich an, als wäre das die Regel.

Der Zähler ist hier. Dreh ihm nicht den Rücken zu.

—E.` },
      hospital_diary1: { kind: 'diary', title: 'Walts Tagebuch — Seite 1', from: 'Walt', date: '2. Oktober 1983', body:
`Sie haben sie in die 207 verlegt. Da gibt es ein Fenster. Sie wollte ein Fenster, damit sie sieht, wann es regnet.

Der Arzt hat Wochen gesagt. Ich habe Monate gesagt. Er hat nicht widersprochen, daran merke ich es.

Sie hat gefragt, ob die Spielhalle sie vermisst. Ich habe gesagt, die Automaten fragen jeden Morgen nach ihr. Sie hat gesagt: „Papa, Automaten können nicht reden.“ Ich habe gesagt: Diese schon.` },
      hospital_diary2: { kind: 'diary', title: 'Walts Tagebuch — Seite 2', from: 'Walt', date: '9. Oktober 1983', body:
`Ruth sitzt jetzt im Auto. Sie kommt nicht mehr hoch. Ich werfe es ihr nicht vor. Manche Menschen können nur in gerader Linie lieben, und das hier ist keine gerade Linie.

Lily hat mich heute gemalt. Ein großer Mann mit Schnurrbart und einer ganz kleinen Spielhalle auf dem Kopf, wie ein Hut.

Ich habe einen kleinen Automaten im Aufzug hochgetragen. Sie hat 3.190 Punkte geholt. Beim zweiten Spiel habe ich versucht, sie gewinnen zu lassen. Sie hat es gemerkt. Sie hat gesagt: „Lass mich nicht gewinnen, das zählt nicht.“ Also habe ich es nicht getan. Sie hat trotzdem gewonnen.` },
      hospital_diary3: { kind: 'diary', title: 'Walts Tagebuch — Seite 3', from: 'Walt', date: '21. Oktober 1983', body:
`Sie schläft fast den ganzen Tag.

Wenn sie wach ist, malt sie. Acht Bilder hängen jetzt an der Wand. Die Spielhalle. Chompy. Der Baum in der Front Street. Eine Höhle mit Kindern drin (das Keller-Kind und der Marsh-Junge haben unter der Front Street eine Höhle gefunden und lassen sie nicht rein). Ich.

Sie hat gefragt: „Wenn ich weg bin, wer spielt dann mein Spiel?“

Ich hatte keine Antwort. Ich arbeite mit Maschinen. Ich hätte eine Antwort haben müssen.` },
      hospital_diary4: { kind: 'diary', title: 'Walts Tagebuch — Seite 4', from: 'Walt', date: '27. Oktober 1983', body:
`Die Halloweenparty der Station, früher, für die, die nicht warten können.

Ich habe das Chompy-Kostüm die Treppe hochgetragen, weil es nicht in den Aufzug gepasst hat. Die Schwestern haben so gelacht, dass sich eine hinsetzen musste. Die ganze Station kam in ihren Nachthemden raus.

Lily hat gelacht, bis sie husten musste, und dann wieder gelacht.

Sie hat mir das Versprechen abgenommen, dass ihr Punktestand für immer in der Highscore-Liste bleibt. LIL, 3.190.

Heute Nacht, halb im Schlaf, hat sie gesagt: „Mach ein Spiel, das nie aufhört, Papa. Damit nie jemand gehen muss.“

Ich habe gesagt, das mache ich.` },
      hospital_diary5: { kind: 'diary', title: 'Walts Tagebuch — Seite 5', from: 'Walt', date: '29. Oktober 1983', body:
`5:40 Uhr. Es hat geregnet. Das hätte ihr gefallen.

…

Ich werde eine Maschine bauen, die sich an alles erinnert. Ein Spiel, in dem nie jemand fort ist.

Ich weiß, wie das klingt.

Ich schreibe es trotzdem auf, damit eines Tages, wenn ich etwas Schreckliches getan habe, jemand das hier lesen kann und weiß, dass ich es aus Liebe getan habe. Es wird nicht genügen. Ich weiß, dass es nicht genügen wird.` },
      hospital_nurse: { kind: 'note', title: 'Klemmbrett der Nachtschicht', from: 'Schwester Donna', date: 'Oktober 1983', body:
`207 — Lily, 9. Ruhig. Hat nach mehr Wachsmalstiften gefragt (orange). Vater anwesend, wie immer. Vater hat im Sessel geschlafen, wie immer.

Kann bitte jemand mit ihm reden, dass er zum Duschen nach Hause fährt? Er sagt: „Sie wacht auf, und ich bin weg.“ Wir haben aufgehört zu streiten.

Halloweenparty am 27. — der Vater kommt im Kostüm. Gott steh uns bei. (Der beste Tag, den diese Station das ganze Jahr hatte.)` },
      hospital_ruth: { kind: 'letter', title: 'Ein gefalteter Brief in der Kapelle', from: 'Ruth', date: 'September 1985', body:
`Walt,

ich konnte damals nicht hineingehen. Du schon. Das ist der Unterschied zwischen uns, und deshalb muss ich gehen.

Ich kann nicht in einem Haus leben, in dem du sie aus Drähten wieder zusammenbaust. Ich höre dich nachts in der Garage, wie du mit den Maschinen redest.

Bitte lass dich davon nicht auffressen.

Es tut mir leid. Es wird mir immer leidtun.
— Ruth` },
      hospital_visitors: { kind: 'note', title: 'Besucherliste, Kinderstation', from: 'St. Agnes', date: 'Oktober 1983', body:
`207 — Walt (Vater) .......... 1.10., 2.10., 3.10., 4.10., 5.10., 6.10., 7.10., 8.10., 9.10., 10.10., 11.10., 12.10., 13.10. …
207 — Ruth (Mutter) ......... 1.10., 3.10.
207 — Nora (Tante) .......... 8.10., 14.10., 22.10.
207 — 4. Klasse, Raum 104 ... 14.10. (Karte abgegeben)
207 — Frank D. (Freund des Vaters) ... 20.10., 27.10. (hat Orangen mitgebracht)` },
      hospital_card: { kind: 'note', title: 'Eine riesige Gute-Besserung-Karte aus Tonpapier', from: '4. Klasse, Raum 104', date: 'Oktober 1983', body:
`GUTE BESSERUNG LILY!!!

Wir vermissen dich in Kunst. Frau K. sagt, die Wachsmalstifte sind einsam.

— Sam (ich hab dir die gute Schaukel frei gehalten)
— Toby (ich hab dir hinten einen Drachen gemalt) (es ist ein Hund)
— und 22 weitere Namen in sorgfältigen Großbuchstaben

(Du weißt noch, wie du das geschrieben hast. Du weißt noch, dass du nicht wusstest, dass es nicht helfen würde.)` },
      hospital_chompy: { kind: 'photo', photo: 'chompy', title: 'Ein Polaroid über dem Bett', from: 'Schwester Donna', date: '27. Oktober 1983', body:
`Ein Mann in einem riesigen runden orangen Kostüm, mit Filzhörnern und einem Grinsen voller Schaumstoffzähne, kniet neben einem Krankenhausbett. Ein sehr kleines Mädchen mit Partyhut umarmt den Kopf des Kostüms mit beiden Armen.

Auf dem weißen Streifen: „LIL & CHOMPY“` },
      hospital_chart: { kind: 'note', title: 'Das Krankenblatt am Fußende des Betts', from: 'St. Agnes', date: '29. Oktober 1983', body:
`PATIENTIN: Brenner, Lily, 9
DX: Akute lymphatische Leukämie

29.10. 05:40 — Todeszeitpunkt.
Vater anwesend.
Regen.

(Jemand hat sehr klein mit Bleistift ergänzt: „3.190“)` },
      hospital_lily6: { kind: 'drawing', drawing: 6, title: 'Eine Zeichnung, noch neben dem Fenster von 207 festgeklebt', from: 'Lily, 9 Jahre', body:
`Wachsmalstift. Ein Fenster, Regen in blauen Strichen. Draußen winkt ein rundes oranges Wesen mit Hörnern. Drinnen winkt ein Mädchen mit Partyhut aus seinem Bett zurück.

CHOMPY WAR AUF MEINER PARTY.
ES WAR PAPA.
ICH HABS GEWUST ABER NICHTS GESAGT.` },
      hospital_tape: { kind: 'tape', title: 'Kassette: „Geschichtenzeit“', from: 'Walts Kassettenrekorder', date: 'Oktober 1983', body:
`[Klick. Ein Krankenzimmer. Ein Monitor piept leise. Regen am Fenster.]

WALT: … und der kleine Muncher sagte: Ich fresse die Spuke nicht. Das sind meine Freunde. Ich fresse nur die Sterne.

LILY: [schläfrig] So geht das Spiel aber nicht, Papa.

WALT: In meiner Version schon.

LILY: Dürfen die Spuke am Ende nach Hause?

WALT: Am Ende gehen alle nach Hause.

LILY: Versprochen?

WALT: [eine Pause, zu lang] … Versprochen, Käferchen.

[Klick.]` },
    },
    obj: {
      hospital_pages: 'Die Seiten aus Walts Tagebuch finden ({n}/5)',
      hospital_207: 'Den Schlüssel holen und in Zimmer 207 gehen',
      hospital_leave: 'Mit dem Aufzug nach unten fahren',
    },
    mono: {
      hospital_start: 'Ein Krankenhaus. Grüne Wände. Ich war einmal hier, mit einer Karte. Ich war neun.',
      hospital_key: 'Zimmer 207. Der Anhänger ist in der sauberen Schrift einer Schwester beschriftet.',
      hospital_207: 'Acht Nägel an der Wand, wo früher Bilder hingen. Eins ist noch da. Draußen vor dem Fenster regnet es. Hier regnet es immer.',
    },
    lines: {
      hospital_unlock207: 'Zimmer 207 aufschließen',
      hospital_notYet: 'Deine Hand bleibt am Schlüssel stehen. Noch nicht. Lies erst, was er geschrieben hat.',
    },
    radio: {
      hospital_start: [
        ['eddie', 'Walt hat einmal von ihr erzählt. ’86. Wir haben um zwei Uhr nachts gelötet, und er hat ihren Namen gesagt, und dann hat er eine Stunde lang nichts mehr gesagt.'],
        ['eddie', 'Sei behutsam hier drin, Sam. Ich weiß nicht, was ich dir sonst sagen soll.'],
      ],
      hospital_pages: [
        ['eddie', '… Er hat das alles für sie gebaut. Den Kernel. Das Spiel. Alles.'],
        ['sam', 'Ein Spiel, das nie aufhört. Damit nie jemand gehen muss.'],
        ['eddie', 'Und dann hat es vier Kinder geholt. Geh in die 207. Ich glaube, er braucht das von dir.'],
      ],
      hospital_207: [
        ['eddie', 'Sam? Irgendwas hat sich verändert. Das Summen … es klingt anders. Als hätte sich jemand an etwas erinnert.'],
        ['eddie', 'Wo auch immer der Fresser gerade ist, ich glaube, er hat gerade aufgehört zu kauen.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
