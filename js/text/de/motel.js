/* Deutsch — Level 8: Blue Moon Motor Inn (Eddies Erinnerung). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      motel: {
        name: 'LEVEL 8', title: 'Blue Moon Motor Inn', place: 'Eddies Erinnerung — Route 9, die Nachtschicht',
        intro: 'Diese hier gehört nicht dir. Ein Motel an der Route 9, das ZIMMER-FREI-Schild summt, eine Nachtportierin, die 1990 über die Witze eines dürren Handwerkers gelacht hat.\n\nZimmer 12 wurde lange Zeit wochenweise bezahlt. Jemand klopft immer wieder an Türen.',
      },
    },
    items: {
      room12Key: { name: 'Schlüssel zu Zimmer 12', desc: 'Ein Messingschlüssel an einer grünen Plastikraute: BLUE MOON MOTOR INN — 12. Noch warm vom Trockner.' },
    },
    docs: {
      motel_intro: { kind: 'note', title: 'Ein Klebezettel am Schalter des ZIMMER-FREI-Schilds', from: 'June', date: '1991', body:
`Eddie —
Wenn du das liest, bist du wieder zu spät.
Kaffee läuft. Kuchen ist im Kühlschrank. Iss nicht alles auf.
Ich liebe dich. Reparier die Eismaschine.
— J.` },
      motel_register: { kind: 'note', title: 'Das Gästebuch auf der Rezeption', from: 'Blue Moon Motor Inn', date: '1992–1993', body:
`…
Zi. 7 — Handelsvertreter — 1 Nacht
Zi. 3 — die Hendersons (schon wieder)
Zi. 12 — E. — wöchentlich — „Werkstatt, bitte nicht stören“
Zi. 12 — E. — wöchentlich
Zi. 12 — E. — wöchentlich — bezahlt bis 12. Juni 1993

(In Junes Schrift: „Er sagt, es ist für ein Projekt. Er sagt mir nicht, was für ein Projekt. Er kommt nach Lötzinn riechend nach Hause und schläft nicht.“)

Der Haken für den Schlüssel von Zimmer 12 ist leer. Jemand hat daneben an die Wand geschrieben: WÄSCHEREI?` },
      motel_complaint: { kind: 'note', title: 'Kommentarkarte eines Gastes', from: 'Zimmer 11', date: 'Mai 1993', body:
`Sehr sauberes Zimmer. Guter Kuchen.

ABER: Jede Nacht um 3:17 Uhr klopft jemand an meine Tür. Wenn ich aufmache, ist niemand da.

Außerdem redet der Mann in Zimmer 12 die ganze Nacht in sein Funkgerät. Am anderen Ende ist niemand. Ich habe nachgesehen.

— Ein Gast` },
      motel_postcard: { kind: 'note', title: 'Eine Postkarte auf dem Nachttisch', from: 'Eddie', date: 'Poststempel Harlow, 1990', body:
`(Vorne: „GRÜSSE AUS DEM BLUE MOON — Route 9, Harlow“ und ein gemalter Swimmingpool, den das Motel nicht hat.)

June,
du hast über den Eismaschinen-Witz gelacht. Niemand lacht über den Eismaschinen-Witz. Ich erzähle ihn so lange weiter, bis du mich heiratest.
— der dürre Reparaturtyp (Eddie)` },
      motel_walt: { kind: 'diary', title: 'Walts Tagebuch, in der Mitte zerrissen', from: 'Walt', date: 'Drinnen', body:
`Ein Motel. Ich kenne diesen Ort nicht.

Jemand, der für mich gearbeitet hat, hat hier gewohnt. Geschickte Hände. Wütend auf mich. Ich glaube, das hatte ich verdient.

Er hatte eine Frau. Er hatte ein Baby, das unterwegs war.

Ich habe ihm gesagt, er soll nicht nach mir suchen. Auf einen Zettel geschrieben, glaube ich. Ich glaube, er hat nicht gehört.

Auf den Mann, der vier Kinder verloren hat, hört niemand.` },
      motel_notebook: { kind: 'note', title: 'Eddies Notizbuch, aufgeschlagen auf dem Bett', from: 'Eddie', date: '1992–1993', body:
`KERNEL-NOTIZEN — Rev. C

Ein Spiel braucht 1 Spieler + 4 Spuke. Der Kernel BEHÄLT sie.
Walt ist jetzt der Spieler. Seit März ’92.
Es gibt einen echten AUSGANG, auf 256, auf der kaputten Seite. Er lässt EINEN Menschen raus, wenn EIN Mensch an seiner Stelle bleibt.

EINER REIN, EINER RAUS. Das ist die ganze Regel.

Plan: Ich gehe rein. Ich finde den AUSGANG. Ich finde jemanden, der noch einen Namen hat. Der hält die Tür. Ich gehe raus. Ich gehe nach Hause zu June. Ich lerne das Baby kennen.

Furchtbarer Plan. Ich weiß.
Ich hab ihn trotzdem dreimal unterstrichen.

(Später, mit einem anderen Stift, drinnen geschrieben:)
Die Tür in der ersten Woche gefunden. Niemand da, der sie hält. Die Spuke haben keine Namen mehr, und Walt hat kein Gesicht. Also warte ich.

(Noch später:)
Da ist ein Kind. Sam. Das fünfte. Das, das nach Hause gegangen ist. Die Maschine hat Sam PLAYER ONE genannt.
Vielleicht ist es das Kind.
Tut mir leid, Kleines.` },
      motel_june: { kind: 'letter', title: 'Briefe in einem Schuhkarton, der oberste offen', from: 'June', date: 'Juli 1993', body:
`Eddie,

die Polizei kommt nicht mehr. Deine Mutter ruft immer noch jeden Sonntag an.

Ich mache deine Bettseite immer noch jeden Morgen. Ich weiß nicht, warum. Es ist albern.

Das Baby tritt, wenn ich Radio höre. Sie mag den Oldie-Sender. Sie wird mal DJ.

Falls du irgendwo bist, wo du das lesen kannst: Ich bin nicht sauer. Ein bisschen sauer. Komm nach Hause, dann bin ich persönlich sauer auf dich.

Wir nennen sie Hope. Du hast keine Stimme.

— June` },
      motel_ultrasound: { kind: 'photo', photo: 'ultrasound', title: 'Ein Ultraschallbild, zerknittert vom Herumtragen', from: 'St.-Agnes-Entbindungsstation', date: 'Mai 1993', body:
`Ein körniger grauer Fächer. In der Mitte eine winzige Form.

Auf der Rückseite, in Eddies Schrift, immer wieder, als würde er üben:
„Hallo, Kleines. Hallo. Ich bin dein Papa. Hallo, Kleines. Hallo. June glaubt, du bist ein Mädchen. Hallo.“` },
      motel_tape: { kind: 'tape', title: 'Kassette: „Fürs Baby“', from: 'Eddie', date: '11. Juni 1993', body:
`[Klick. Ein Motelzimmer. Die Eismaschine rattert durch die Wand.]

EDDIE: Hey, Kleines. Hier ist dein Papa. Du kennst mich noch nicht.

EDDIE: Ich gehe ein paar Leute holen, die sich verlaufen haben. Vier Kinder und einen alten Mann, der nett zu mir war, obwohl er es nicht musste.

EDDIE: Ich bin zurück, bevor du auf die Welt kommst. Und wenn nicht … dann wird deine Mama dir sagen, dass ich ein Idiot war, und sie hat recht, aber ich war ein Idiot aus einem guten Grund.

EDDIE: [ein langer Atemzug] Ich hab Angst, Kleines. Ich hab richtig Angst.

EDDIE: Okay. Okay. Dein Papa hat dich lieb. Frag deine Mama nach dem Eismaschinen-Witz. Sie tut dann so, als würde sie ihn hassen.

[Klick.]` },
    },
    obj: {
      motel_find12: 'Etwas über Zimmer 12 herausfinden (die Rezeption)',
      motel_key: 'Den Schlüssel zu Zimmer 12 finden',
      motel_room12: 'Zimmer 12 öffnen',
      motel_leave: 'Über den Notausgang gehen',
    },
    mono: {
      motel_start: 'Ein Motel. Das ZIMMER-FREI-Schild summt. Das ist nicht meine Erinnerung. Wessen dann?',
      motel_register: 'Zimmer 12. „E.“ Eddie.',
      motel_key: 'Der Schlüssel lag in einem Trockner. Noch warm.',
      motel_room12: 'Zimmer 12. Überall Kabel. Eine Pritsche. Es riecht nach Lötzinn.',
      motel_notebook: '„EINER REIN, EINER RAUS.“ … Eddie.',
      motel_neighbor: 'Ein Mann im Bademantel, weit hinten im Flur. Er hat den Kopf gesenkt. Ich glaube, er lächelt.',
    },
    lines: {
      motel_unlock12: 'Zimmer 12 aufschließen',
      motel_trust: '„Sag mir die Wahrheit. Ich hör zu.“',
      motel_doubt: 'Das Funkgerät leiser drehen. Nichts sagen.',
    },
    radio: {
      motel_start: [
        ['eddie', '… Oh. Oh, das ist das Blue Moon.'],
        ['sam', 'Du kennst es?'],
        ['eddie', 'Hier hab ich meine Frau kennengelernt. Sie hat nachts gearbeitet. Geh einfach … weiter, okay? Geh nicht in Zimmer 12.'],
        ['sam', 'Warum nicht?'],
        ['eddie', 'Weil ich dich darum bitte.'],
      ],
      motel_neighbor: [
        ['eddie', 'Mach die Tür nicht auf, wenn er klopft. Dreh ihm auch nicht den Rücken zu. Licht lässt ihn zurückweichen.'],
      ],
      motel_explain: [
        ['eddie', 'Sam. Ich weiß, dass du es gelesen hast. Ich höre die Seiten.'],
        ['eddie', 'Das hab ich geschrieben, bevor ich dich kannte. Bevor ich irgendwas davon wusste.'],
        ['eddie', 'Ich habe eine Tochter, die ich nie gesehen habe. Seit anderthalb Jahren denke ich an nichts anderes.'],
        ['eddie', 'Ich lüge dich nicht mehr an. Lass es mich … einfach erklären. Bitte.'],
      ],
      motel_trusted: [
        ['eddie', 'Die Regel ist echt. Einer rein, einer raus. Die Tür auf 256 geht für einen Menschen auf, wenn ein anderer bleibt.'],
        ['eddie', 'Ich wollte, dass du das bist. Ich schäme mich dafür. Ich will nicht mehr, dass du das bist.'],
        ['eddie', 'Befrei die Spuke. Alle vier. Wenn sie sich alle an ihre Namen erinnern, gibt es vielleicht einen anderen Weg. Walt dachte das. Fünf Hände, hat er geschrieben. Ich hab es nie verstanden.'],
      ],
      motel_doubted: [
        ['eddie', '… Ja. Ich würde mich auch abschalten.'],
        ['eddie', 'Ich bin hier, wenn du reden willst. Der Notausgang ist offen.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
