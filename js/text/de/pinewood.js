/* Deutsch — Kapitel 3: Doppelvorstellung (Pinewood-Autokino). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      pinewood: {
        name: 'KAPITEL 3', title: 'Doppelvorstellung', place: 'Pinewood-Autokino, nördlich von Nordvik',
        intro: 'Freitag, 22. August 1975, kurz nach elf Uhr nachts. Die letzte Nacht der Saison.\n\nDer zweite Film läuft auf einer Leinwand zwischen den Bäumen. Er hat keinen Ton, und er hört nicht auf. Ein achtjähriger Junge ging beim Rollenwechsel zu den Toiletten und kam nicht zurück.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'Ein Handzettel auf der Imbisstheke', from: 'Pinewood-Autokino', body:
`LETZTE NACHT DER SAISON — FREITAG, 22. AUGUST

20:45   DER LANGE SOMMER
22:40   NACHTSEE

GLÜCKSKARTEN-VERLOSUNG!
Heben Sie Ihren Kartenabschnitt auf. Bringen Sie ihn in der Pause ans Fenster der Vorführkabine und werfen Sie ihn in die Dose. Herr Hardy zieht den Gewinner am Ende des zweiten Films.
Preis: eine SAISONKARTE für 1976. Jeder Film, das ganze Auto.

Bitte hängen Sie die Lautsprecher wieder an ihre Pfosten. Fahren Sie langsam. Achten Sie auf die Kinder.` },
      pine_missing: { kind: 'notice', title: 'Ein Plakat an der Toilettenwand', from: 'Polizei Nordvik', date: 'August 1975', body:
`VERMISST
MIKKEL STRAND, 8 Jahre

Zuletzt gesehen im Pinewood-Autokino am Freitag, 22. August, gegen 23 Uhr, auf dem Weg zu den Toiletten.
Blondes Haar. Blauer Anorak, rote Gummistiefel. Er hatte die Taschenlampe seines Vaters dabei.

Wenn Sie ihn gesehen haben oder in dieser Nacht überhaupt etwas gesehen haben, rufen Sie bitte die Polizeiwache Nordvik an.
Seine Mutter und sein Vater bitten Sie darum. Irgendetwas.` },
      pine_statement: { kind: 'report', title: 'Aussage, Abschrift', from: 'L. Hardy, Filmvorführer', date: '23. August 1975, 9:10 Uhr', body:
`Ich war wie an jedem Vorführabend von sieben Uhr abends bis zwei Uhr morgens in der Kabine. Ich habe beide Filme ohne Pause gezeigt, abgesehen von den Rollenwechseln.

Ich habe den Jungen nicht gesehen. Kinder kommen nicht zur Kabine hoch. Die Fenster gehen zur Leinwand, und von der Kabine aus sieht man die Toiletten nicht.

Ich habe die Kabine nicht verlassen. Ich hatte nicht getrunken.

Vorgelesen und unterschrieben,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'Ein Brief unter dem Kissen auf der Pritsche', from: 'L. Hardy', date: 'März 1981, nie abgeschickt', body:
`Frau Strand,

ich habe das neunmal geschrieben. Diesmal schicke ich es ab.

Ihr Junge kam um zehn vor elf mit seinem Abschnitt für die Verlosung ans Kabinenfenster. Ich hatte eine Flasche offen und einen Rollenwechsel vor mir und sagte ihm, er solle später wiederkommen. Er sagte: „Versprichst du, dass du ihn reinwirfst?“ Ich sagte, ab mit dir, husch.

Um fünf nach elf ging ich hinter den Imbiss, um Luft zu schnappen, und sah eine kleine Taschenlampe hinter den Toiletten zwischen die Bäume gehen. Weiter vorn, tiefer drin, war noch ein Licht. Ein rotes, wie ein Bremslicht. Ich dachte, die großen Kinder machen Unsinn. Ich dachte, das geht mich nichts an. Ich dachte, wenn ich da runtergehe und jemand riecht meinen Atem, verliere ich meine Lizenz, und die Kabine ist alles, was ich habe.

Ich habe der Polizei gesagt, ich hätte nichts gesehen. Ich habe ihr gesagt, Kinder kämen nicht zur Kabine.

Ich habe den Gewinner nie gezogen. Die Dose steht noch auf der Werkbank.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'Das Fundbuch im Kassenhäuschen', from: 'Pinewood, Saison 1975', body:
`16.8.   Damenstrickjacke, grün, Reihe 2
16.8.   Thermoskanne (ohne Deckel)
22.8.   eine Socke, Kind, Reihe 4
22.8.   23:40   AUTOSCHLÜSSEL an rotem Anhänger, „STRAND“. Vom Vater bei den Toiletten verloren, während sie suchten. Abgegeben von Jonna L. Hab ihm gesagt, dass sie hier sind. Er hat sie nicht abgeholt.` },
      pine_wiper: { kind: 'note', title: 'Ein Zettel unter dem Scheibenwischer des Kombis', from: 'Papa', body:
`(Kuli, auf der Rückseite einer Straßenkarte, so unter den Wischer geklemmt, dass er zu den Bäumen zeigt.)

MIKKEL —
BLEIB DA, WO DU DIE AUTOLICHTER SEHEN KANNST.
GEH AUF SIE ZU.
WIR SUCHEN DICH.
NIEMAND IST BÖSE.
— PAPA` },
      pine_staff: { kind: 'note', title: 'Im Lagerraum angepinnt', from: 'Bo', body:
`PERSONAL —
Der Generator versorgt den Imbiss und die Platzbeleuchtung.
Für Kunden, denen der Sprit ausgeht: Der Tagestank hat seitlich einen Ablasshahn. Ein halber roter Kanister, nicht mehr, und ins Buch eintragen. Den Hahn LANGSAM öffnen. Er spuckt und knallt, und der ganze Platz schaut euch an.

Lyles Batterie ist für SEINE Kabinenlampe. Nicht zum Starthelfen. Nicht schon wieder.
— Bo` },
      pine_search: { kind: 'report', title: 'Eine Suchmeldung, an den Hochsitz genagelt', from: 'Polizei Nordvik', date: 'Samstag, 23. August 1975', body:
`SUCHE — SEKTOR C (Nordwestwald)
Reihen zu zehn, eine Armlänge Abstand.

Die Hunde haben die Spur am alten Hochsitz verloren.
Ein Kinderstiefel gefunden, links, rot, etwa 40 m nördlich des Hochsitzes.
Sonst nichts gefunden.

Suche bei Dunkelheit abgebrochen. Fortsetzung 06:00.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'Eine Zeichnung im Laub', from: 'Wren, 7 Jahre', body:
`Wachsmalkreide. Eine riesige weiße Leinwand zwischen schwarzen Bäumen. Davor ein kleiner Junge in blauem Mantel und roten Stiefeln, eine Taschenlampe in der Hand, der über die Schulter zurückschaut. Auf der Oberkante der Leinwand der kleine rote Vogel.

Darunter:
ER HAT ZURÜCKGESCHAUT` },
    },
    items: {
      stub: { name: 'Kartenabschnitt', desc: 'KIND — PINEWOOD-AUTOKINO — 22. AUG. 75 — Nr. 1147. Er wurde nie in die Dose geworfen.' },
      carBattery: { name: 'Autobatterie', desc: 'Zwölf Volt und sehr schwer. Sie hat die Kabinenlampe betrieben.' },
      carKeys: { name: 'Autoschlüssel', desc: 'Zwei Schlüssel an einem roten Plastikanhänger. STRAND.' },
      jerrycan: { name: 'Roter Kanister', desc: 'Leer. Er riecht nach Benzin.' },
      fuel: { name: 'Kanister mit Benzin', desc: 'Halb voll. Er schwappt beim Gehen.' },
    },
    obj: {
      pine_start: 'Finde einen Weg aus Pinewood',
      pine_parts: 'Bring den Kombi zum Laufen: Batterie, Benzin, Schlüssel ({n}/3)',
      pine_startCar: 'Starte den Kombi',
      pine_stubFind: 'Finde den Kartenabschnitt des Jungen',
      pine_claim: 'Wirf den Abschnitt in die Dose in der Vorführkabine',
      pine_leave: 'Fahr durch das Tor hinaus',
    },
    mono: {
      pine_start: 'Eine Kinoleinwand zwischen den Bäumen. Der Film läuft, und es gibt überhaupt keinen Ton.',
      pine_gate: 'Das Tor ist mit einer Kette verschlossen. Das Vorhängeschloss ist auf dieser Seite, was keinen Sinn ergibt.',
      pine_wagon: 'Den hier hat jemand aus seiner Reihe geholt und zu den Bäumen gedreht. Die Scheinwerfer sind eingeschaltet. Die Batterie ist leer.',
      pine_wagonNeeds: 'Batterie leer, Tank leer, keine Schlüssel. Jemand hat dieses Auto die ganze Nacht mit Licht laufen lassen.',
      pine_battery: 'Eine Autobatterie. Sie hat die Kabinenlampe betrieben.',
      pine_batteryDark: 'Und jetzt ist die Kabine dunkel.',
      pine_keys: 'STRAND. Er hat sie verloren, als er seinen Sohn suchte.',
      pine_can: 'Ein roter Kanister. Leer.',
      pine_fill: 'Er spuckt. Er knallt. Alles da draußen hört das.',
      pine_filled: 'Ein halber Kanister. Das reicht.',
      pine_tankNoCan: 'Der Tagestank des Generators. Da ist ein Ablasshahn. Ich brauche etwas zum Befüllen.',
      pine_fitBattery: 'Batterie drin. Die Scheinwerfer sind von selbst angegangen. Sie waren nie ausgeschaltet.',
      pine_inBeam: 'Einer der Bäume im Licht steht falsch.',
      pine_fuel: 'Benzin drin.',
      pine_startFail: 'Er dreht. Er dreht. Er stirbt ab. Das hat alles gehört.',
      pine_notYet: 'Er dreht und springt nicht an. Als wäre der Ort noch nicht fertig mit mir.',
      pine_stubHint: 'Er kam mit seinem Abschnitt für die Verlosung zur Kabine. Dann ging er zu den Toiletten.',
      pine_stub: 'Ein Kinderkartenabschnitt. Nummer elf siebenundvierzig. Er kam nie dazu, ihn einzuwerfen.',
      pine_claimed: 'So. Du warst hier. Du wurdest mitgezählt.',
      pine_draw: 'Er hätte gewonnen.',
      pine_start2: 'Er ist angesprungen. Oh, er ist angesprungen.',
      pine_end: 'Im Spiegel wird die Leinwand weiß und dann dunkel. Jemand hat den Projektor ausgeschaltet.',
      pine_booth: 'Die Kabine. Heißer Staub und Whisky.',
      pine_toilets: 'Die Hintertür steht zu den Bäumen hin offen.',
      pine_clearing: 'Ein Hochsitz. Das Laub ist in einem Ring darum flachgetreten.',
      pine_pines: 'Einige dieser Bäume haben sich bewegt, seit ich zuletzt hingesehen habe.',
      pine_stag: 'Etwas Großes ist gerade über den Platz gelaufen. Ein Geweih breiter als ein Auto.',
      pine_usher: 'Ein rotes Licht zwischen den Autos. Jemand, der Leute zu ihren Plätzen führt.',
      pine_swing: 'Die Schaukel bewegt sich. Es weht kein Wind.',
      pine_gateOpen: 'In der Ferne fällt eine Kette auf Kies.',
      pine_canLook: 'Die Losdose. Eine Handvoll Abschnitte auf dem Boden, unter der letzten Rolle.',
    },
    lines: {
      pine_stubPrompt: 'Ein Kartenabschnitt auf dem Boden',
      pine_canPut: 'Den Abschnitt in die Dose werfen',
      pine_canLook: 'Eine offene Filmdose auf der Umrollbank',
      pine_tankPrompt: 'Den Kanister am Ablasshahn füllen (halten)',
      pine_tankLook: 'Der Tagestank des Generators',
      pine_wagonLook: 'Der Kombi der Strands',
      pine_wagonBattery: 'Die Batterie einbauen',
      pine_wagonFuel: 'Das Benzin einfüllen',
      pine_wagonStart: 'Den Motor starten (halten)',
      pine_wagonGo: 'Einsteigen und losfahren',
    },
    radio: {
      pine_otto1: [
        ['radio', '[Rauschen, und darunter das Rattern eines Projektors]'],
        ['otto', 'Neun an Ada. Bäume? Eine Leinwand? Pinewood. Ein Autokino nördlich von Nordvik, 1975. Ich habe eine Kiste davon hier: elf Autoschlüssel, ein roter Jungenstiefel und die letzte Rolle eines Films, den niemand zu Ende gesehen hat.'],
        ['ada', 'Der Film läuft noch. Ohne Ton.'],
        ['otto', 'Hier unten gibt es nie Ton. Zwei Dinge. Die Bäume dort bewegen sich nur, während Sie sich bewegen. Und wenn Sie zwischen den Autos ein rotes Licht sehen, ist es nicht da, um Ihnen Ihren Platz zu zeigen.'],
      ],
      pine_ottoStag: [
        ['otto', 'Das war der Hirsch. Er lauscht. Wenn er den Kopf senkt, bringen Sie etwas Festes zwischen sich und ihn. Einen Baum. Ein Auto. Für sonst nichts bleibt er stehen.'],
      ],
      pine_draw: [
        ['lyle', '[aus jedem Lautsprecher auf dem Platz zugleich: ein Knistern, ein Atem, ein Mann zu nah am Mikrofon]'],
        ['lyle', 'Meine Damen und Herren. Der Glücksabschnitt. Eine Saisonkarte für neunzehnhundertsechsundsiebzig.'],
        ['lyle', 'Nummer elf... siebenundvierzig.'],
        ['lyle', 'Elf siebenundvierzig. Ist elf siebenundvierzig hier?'],
        ['lyle', 'Komm hoch zur Kabine, Junge. Ich hab’s versprochen.'],
      ],
      pine_otto2: [
        ['otto', 'Die Kiste aus Pinewood. Der Stiefel ist nicht mehr drin. An seiner Stelle liegt ein Kartenabschnitt. Jemand hat mit Bleistift darauf geschrieben: „Gewinner.“'],
      ],
    },
    recap: {
      pinewood: 'Das Pinewood-Autokino, die letzte Nacht von 1975. Der Filmvorführer Lyle Hardy sagte der Polizei, Kinder kämen nie zu seiner Kabine und er habe nichts gesehen. Der achtjährige Mikkel Strand kam mit seinem Abschnitt für die Verlosung zur Kabine, wurde weggeschickt und folgte einem roten Licht in die Bäume, während Lyle zusah. Ich habe den Abschnitt des Jungen in die Dose geworfen, und jeder Lautsprecher auf dem Platz hat seine Nummer ausgerufen. Dann bin ich mit dem Auto seines Vaters durch das Tor gefahren.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
