/* Deutsch — Kapitel 9: Das Eis (Ostra-See) und die drei Enden. Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      lake: {
        name: 'KAPITEL 9', title: 'Das Eis', place: 'Ostra-See',
        intro: 'Sonntag, 14. Januar 1979, 15:40 Uhr.\n\nOmas Haus am Ufer. Der Ofen brennt, das Radio läuft. Draußen auf dem See sind die großen Kinder bei den Fischerhütten, und von Norden zieht Schnee heran.\n\nWren ist irgendwo da draußen.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'Das Radio, leise, auf dem Tisch', from: 'Wetter für das Seengebiet', date: 'Sonntag, 14. Januar 1979, 15.30 Uhr', body:
`...am Nachmittag Schneeschauer, ab etwa vier Uhr in starken Schneefall übergehend, mit kräftigem Nordwind und Schneeverwehungen. Nach Einbruch der Dunkelheit auf freiem Gelände und auf den Seen Sicht nahe null.

Das Eis auf dem Ostra-See ist über dem alten Flussbett auf der Nordwestseite als unsicher gemeldet. Die Bevölkerung wird gebeten, das Eis dort überhaupt nicht zu betreten.

Und nun die Nachrichten, um halb vier...` },
      lake_granNote: { kind: 'note', title: 'Ein Zettel auf dem Küchentisch', from: 'Oma', date: 'Sonntag', body:
`Ada —

Bin zum Hof hinauf, Milch holen. Um halb fünf zurück.
Wren geht NICHT aufs Eis. Du behältst sie bei dir drinnen.
In der Dose sind Hefeschnecken, für jede eine.

Oma` },
      lake_wrenNote: { kind: 'note', title: 'Ein Blatt an der Tür der Mädchen', from: 'Wren', date: '(ohne Datum)', body:
`ADA
ICH KOMME AUCH

(Darunter ein roter Vogel, der hinter einem größeren Vogel mit einem grünen Streifen um den Hals herfliegt.)` },
      lake_diary: { kind: 'note', title: 'Ein Tagebuch unter dem oberen Kissen', from: 'Ada, 12', date: '14. Jan. 1979', body:
`Sunna und Per und alle sind nach dem Essen bei den Hütten. SUNNA HAT MICH GEFRAGT.

Sunna hat gesagt, bring dein Vögelchen mit, wir stecken sie ins Loch. Haha.

Ich bringe sie NICHT mit. Sie läuft mir überallhin nach wie ein Hund, und dann weint sie, und alle schauen mich an. Nur einmal will ich irgendwo ohne sie hingehen.` },
      lake_search: { kind: 'report', title: 'Ein gefalteter Bericht im Bootshaus', from: 'Polizei Bezirk Ostra', date: 'Januar 1979', body:
`Vermisstes Kind: Wren LIND, 7, aus dem Haus Lind, Südufer, Ostra-See.

14.1., 16.50. Als vermisst gemeldet von ihrer Großmutter, Frau Ingrid Lind, bei ihrer Heimkehr.
Die Schwester des Kindes, Ada Lind, 12, gibt an, Wren sei nicht mit ihr aufs Eis gekommen, und sie habe geglaubt, Wren sei zu Hause.
Suche: das Haus, die Nebengebäude, die Wälder im Süden und die Straße, die ganze Nacht hindurch. Starker Schneefall.
16.1., 11.20. Ein roter Kinderfäustling (rechte Hand) auf dem Eis gefunden, etwa 300 Meter nordwestlich der Fischerhütten, über dem alten Flussbett. Eis unsicher. Tauchen erst nach dem Tauwetter möglich.` },
      lake_hutNote: { kind: 'note', title: 'Eine Zigarettenschachtel, beschrieben', from: '(die großen Kinder)', date: '14.1.79', body:
`PER + SUNNA

ADAS VÖGELCHEN IST IHR SCHON WIEDER NACHGELAUFEN
PIEP PIEP

(eine Zeichnung von einem Vogel mit traurigem Gesicht und ein Pfeil, der aus der Hütte hinauszeigt)` },
      lake_tape: { kind: 'transcript', title: 'Eine Kassette im Rekorder: „FÜR ADA“', from: 'Ingrid Lind', date: 'Dezember 1995', body:
`[ein Klicken; eine Küchenuhr tickt; jemand setzt sich zurecht]

Ada. Hier ist Oma. Sie sagen, mir geht es nicht gut, also sage ich es aufs Band, weil ich es dir nie ins Gesicht sagen konnte.

Ich habe immer gewusst, dass du sie auf dem Eis gesehen hast. Ich wusste es an jenem Abend an deinem Gesicht. Ich habe dich nie gefragt, weil ich Angst hatte, was es mit dir machen würde, es auszusprechen. Ich habe mir gesagt, das sei Güte.

Das war es nicht. Die Frauen in dieser Familie schweigen und nennen es Güte. Meine Mutter hat darauf gewartet, dass mein Bruder sie holt, und er ist nie gekommen, und niemand hat es je laut gesagt, kein einziges Mal.

Sag es, mein Mädchen. Sag es laut, zu irgendjemandem. Und dann geh und finde sie.

[die Uhr; ein langer Atemzug; das Band läuft bis zum Ende]` },
    },
    items: {
      mitten: { name: 'Roter Fäustling', desc: 'Ein Kinderfäustling, rot, linke Hand. Er kam im Paket. Der andere wurde auf dem Eis gefunden.' },
    },
    obj: {
      lake_start: 'Finde Wren',
      lake_trail: 'Folge ihren Fußspuren hinaus aufs Eis',
      lake_huts: 'Geh zu den Hütten, wo die großen Kinder waren',
      lake_remember: 'Erinnere dich',
      lake_thin: 'Geh hinaus aufs dünne Eis über dem alten Fluss',
      lake_say: 'Sag es ihr',
    },
    mono: {
      lake_start: 'Omas Haus. Der Ofen brennt. Das Radio läuft. Es ist neunzehnhundertneunundsiebzig.',
      lake_empty: 'Niemand da. Oma ist Milch holen. Wrens Stiefel stehen nicht an der Tür.',
      lake_note: '„Du behältst sie bei dir drinnen.“ Hab ich nicht.',
      lake_wrenNote: 'Sie hat meinen Namen immer zuerst geschrieben.',
      lake_out: 'Kleine Fußspuren im Schnee. Hinunter zum Ufer. Hinaus aufs Eis.',
      lake_ice: 'Das Eis singt. Das tut es, wenn es kalt ist.',
      lake_wren: 'Rot. Da draußen. Sie geht weg.',
      lake_huts: 'Die Hütten. Da drin lacht jemand.',
      lake_laughers: 'Sie lachen mich aus. Damals haben sie mich auch ausgelacht.',
      lake_hole: 'Das Loch im Eis. Hier habe ich gestanden, als ich es hörte.',
      lake_remember1: 'Sie kam mir nach hinein. Das Gesicht ganz rosa vor Kälte. „Ada, ich bin auch gekommen.“',
      lake_remember2: 'Und alle haben mich angesehen. Und ich habe ihre Hand von meinem Ärmel gestoßen und gesagt, hau ab, Wren. Geh nach Hause. Hau ab.',
      lake_remember3: 'Sie ist gegangen. In die falsche Richtung. Im Schnee konnte man das Ufer nicht sehen.',
      lake_remember4: 'Und dann hat das Eis ein Geräusch gemacht. Ein langes. Da draußen, links. Und ich habe mich nicht umgedreht, weil sie mich angesehen haben.',
      lake_storm: 'Der Schnee kommt. Ich sehe das Haus nicht mehr.',
      lake_thin: 'Das Eis ist hier dunkel. Dünn. Geh. Renn nicht.',
      lake_hush: 'Etwas im Schnee hinter mir. Ein grüner Schal.',
      lake_quiet: 'Es ist so still geworden. Ich höre meine eigenen Schritte nicht.',
      lake_found: 'Da ist sie.',
      lake_tape: 'Omas Stimme. Ich habe diese Kassette seit zwei Jahren im Spind und nie abgespielt.',
      lake_gone: 'Die Spur führt weiter, nach links hinaus. Zum Fluss.',
    },
    lines: {
      lake_radioPrompt: 'Dem Radio zuhören',
      lake_tapePrompt: 'Die Kassette abspielen',
      lake_holePrompt: 'In das Loch hinunterschauen',
      lake_choiceTitle: 'Wren steht auf dem dünnen Eis, mit dem Rücken zu dir.',
      lake_sayIt: 'Sag es. Alles.',
      lake_vanished: '„Sie ist einfach verschwunden. Niemand hat etwas gesehen.“',
      lake_say1: '„Ich habe dir gesagt, du sollst abhauen.“',
      lake_say2: '„Du bist in die falsche Richtung gegangen, und ich habe das Eis gehört und mich nicht umgedreht.“',
      lake_say3: '„Ich habe Oma gesagt, du wärst nie rausgekommen. Ich habe sie im Wald nach dir suchen lassen.“',
      lake_give: 'Gib ihr den Fäustling',
    },
    radio: {
      lake_otto1: [
        ['radio', '[Schnee auf dem Rauschen, sehr sanft]'],
        ['otto', 'Neun an Ada. Ich höre Sie kaum. Das hier ist nicht mein Regal. Ich kann es überhaupt nicht sehen. Ich glaube, es ist Ihres.'],
        ['otto', 'Was immer Sie da draußen finden, sagen Sie es ihr. Nicht mir.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Etwas auf diesem Regal nimmt allem den Klang. Lassen Sie es nicht nah genug heran, um Ihren zu nehmen.'],
      ],
    },
    recap: {
      lake: 'Ostra-See, 14. Januar 1979. Ich war zwölf. Wren ist mir aufs Eis gefolgt, in die Hütte, wo die großen Kinder waren, und ich habe ihr gesagt, sie soll abhauen. Sie ist im Schnee in die falsche Richtung gegangen, über den alten Fluss, wo das Eis dünn ist, und ich habe es gehört, und ich habe mich nicht umgedreht. Dann bin ich nach Hause gegangen und habe Oma gesagt, sie sei nie rausgekommen.',
    },
    endings: {
      thaw: {
        title: 'TAUWETTER', subtitle: 'Die Wahrheit, laut ausgesprochen',
        lines: [
          'Ich sage es. Alles. Die Worte kommen aus mir heraus wie etwas, das ich neunzehn Jahre lang im Mund gehalten habe.',
          'Wren dreht sich um. Ihr Gesicht ist rosa vor Kälte. Sie sieht mich an, wie sie es immer getan hat, als wäre ich größer, als ich bin.',
          'Ich gebe ihr den Fäustling. Sie zieht ihn an. Sie hält beide Hände hoch, um sie mir zu zeigen: zwei rote Fäustlinge, wieder ein Paar.',
          'Dann dreht sie sich um und geht über das Eis nach Hause, auf die Lichter des Hauses zu, und sie sieht nicht zurück. Das ist in Ordnung. Sie kennt jetzt den Weg.',
          'Um zehn nach sechs am Morgen wache ich am Schalter in Depot 9 auf, das Paket offen vor mir. Der Regen hat aufgehört.',
          'Ich schreibe ABGEHOLT auf Anspruch 256. Ich rufe die Polizei in Halvard an, wegen eines Falls, der neunzehn Jahre alt ist. Dann nehme ich Omas Kassette aus meinem Spind und spiele sie ab, bis zum Ende.',
          'Im April, als das Eis aufgeht, suchen die Taucher das alte Flussbett ab.',
          'Wren liegt neben unserer Großmutter begraben, auf dem Hügel über dem See, von dem aus man ihn ganz sieht.',
          'In der Ablage von Depot 9 lag an jenem ersten Morgen ein zweiter Schein, in einer alten, zittrigen Hand, die ich noch nicht kannte: ABGEHOLT. ENDLICH. — A.',
        ],
      },
      snowfall: {
        title: 'SCHNEEFALL', subtitle: 'Die, die blieb',
        lines: [
          '„Sie ist einfach verschwunden“, sage ich. „Niemand hat etwas gesehen.“',
          'Wren dreht sich nicht um. Hinter mir steht das Ding im grünen Schal ganz nah. Es beginnt, den Schal abzuwickeln, Runde um Runde, bis nichts mehr abzuwickeln ist.',
          'Darunter ist mein eigenes Gesicht, mit zwölf, die Kälte in den Wangen.',
          'Der Schnee fällt über den See und deckt das dunkle Eis zu und die rote Gestalt darauf und die Fußspuren, meine und ihre, bis nichts mehr zu sehen ist.',
          'Irgendwo weit unten fährt eine Notiz in einer neuen Handschrift eine Rohrpost hinauf. NACHTBEAMTIN, EBENE 256. ERSTE SCHICHT.',
          'Auf Kanal neun, ganz leise: „Willkommen in der Nachtschicht, Ada.“',
        ],
      },
      morning: {
        title: 'MORGEN', subtitle: 'Alle, die verloren waren',
        lines: [
          'Ich sage es. Alles. Wren dreht sich um. Ich gebe ihr den Fäustling, und sie hält beide Hände hoch, um sie mir zu zeigen, wieder ein Paar, und geht über das Eis nach Hause, auf die Lichter des Hauses zu.',
          'Um zehn nach sechs am Morgen wache ich am Schalter in Depot 9 auf, das Paket offen vor mir. Ich schreibe ABGEHOLT auf Anspruch 256.',
          'Um Viertel nach öffnet sich der Lastenaufzug am Ende des Archivs von selbst.',
          'Ein alter Mann tritt heraus, in einem Mantel, der seit vierunddreißig Jahren aus der Mode ist, eine Messingmarke in der Hand, als hätte man sie ihm eben gegeben.',
          '„Brandt“, sagt er. „Otto. Jetzt weiß ich es wieder.“ Er sieht sich im Archiv um, die Regale, mich. „Welches Jahr haben wir?“',
          'Ich sage es ihm. Er denkt lange darüber nach. Und dann lacht er, ein echtes Lachen, das erste, das ich je ohne Rauschen von ihm gehört habe.',
          'Im April, als das Eis aufgeht, suchen die Taucher das alte Flussbett ab. Wren liegt neben unserer Großmutter begraben, auf dem Hügel über dem See.',
          'In der Ablage von Depot 9 liegt an diesem Morgen ein zweiter Schein, in einer alten, zittrigen Hand, die ich sehr gut kenne: ABGEHOLT. ENDLICH. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
