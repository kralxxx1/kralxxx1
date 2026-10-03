/* Deutsch — Kapitel 5: Whiteout (Berghotel Weisshorn). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      lodge: {
        name: 'KAPITEL 5', title: 'Whiteout', place: 'Berghotel Weisshorn, 2914 m ü. M.',
        intro: 'Montag, 28. Februar 1983, nach Einbruch der Dunkelheit. Sturm am Berg.\n\nAm Morgen schickte das Tal ein Telegramm an das Hotel oben an der Seilbahn. Am Nachmittag lagen fünf Gäste und ihr Skilehrer an der Bergstation unter dem Schnee. Das Hotel sagt, es sei kein Telegramm gekommen.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'Das Gästebuch', from: 'Berghotel Weisshorn', date: 'Februar 1983', body:
`26.2.  Fam. Aebi (3)          Zimmer 4
26.2.  Mr. & Mrs. Coulter     Zimmer 2
27.2.  R. Fankhauser          Zimmer 1
27.2.  L. Brunner (Skischule, Personal)

Abreisen:
Mrs. Coulter — 2.3., mit dem Talschlitten.
(Alle anderen Namen oben sind am 28.2. mit einem sauberen Strich durchgestrichen, mit einem anderen Stift.)` },
      lodge_weather: { kind: 'report', title: 'Wetterbuch auf dem Bürotisch', from: 'G. Imhof', date: '28. Februar 1983', body:
`06.30  Starker Schneefall seit 3 Uhr. Wind NW 60.
07.10  Telefonleitung tot (wie üblich).
08.15  Postschlitten von der Station herauf. Post, Milch und das Brot.
09.20  Bahn läuft. Skischule um 9.30 oben wie jeden Tag. Volle Woche, alle Zimmer belegt, die erste volle Woche seit 1979.

(Die Zeile 08.15 ist zweimal mit Bleistift nachgezogen, als wäre jemand dort hängen geblieben.)` },
      lodge_telegram: { kind: 'telegram', title: 'Ein Telegramm, an den Rändern verbrannt', from: 'Talstation, Lawinendienst', date: '28.2.83 07.55', body:
`AN BERGHOTEL WEISSHORN STOP
LAWINENGEFAHR 5 STOP OBERE HÄNGE STARK BELADEN STOP
OBERE PISTEN UND BERGSTATION HEUTE SCHLIESSEN STOP
KEIN SKIBETRIEB OBERHALB DES HOTELS STOP
UMGEHEND BESTÄTIGEN STOP
LAWINENDIENST

(Auf der Rückseite, in sorgfältiger Hand: „Erhalten 8.15. — G.I.“ Der Rest ist Ruß. Es hätte verbrennen sollen. Es ist nicht verbrannt.)` },
      lodge_menu: { kind: 'notice', title: 'Die Frühstückskarte auf einem Tisch', from: 'Berghotel Weisshorn', body:
`MONTAG, 28. FEBRUAR
Kaffee — Tee — Heiße Schokolade
Birchermüesli
Rösti mit Spiegelei
Brot aus dem Tal, Butter, Honig von den hoteleigenen Bienen

Heute Abend: Fondue auf der Terrasse, wenn das Wetter es zulässt!
Skischule trifft sich um 9.30 an der Bergstation. Leo sagt: Brillen mitbringen.` },
      lodge_postcard: { kind: 'card', title: 'Eine Postkarte auf dem Nachttisch, Zimmer 1', from: 'Ruth Fankhauser', body:
`(Ein Bild des Hotels im Sonnenschein, eine Gondel schwebt daran vorbei hinauf.)

Liebe Hanni,
es schneit wie am Ende der Welt. Man sagt, die Abfahrt von ganz oben ist die beste im Tal, und wir fahren morgen früh hinauf, Sturm hin oder her. Leo, der Skilehrer, lacht über alles. Ich bin glücklich. Ich rufe Sonntag an.
R.

(Frankiert, nie abgeschickt.)` },
      lodge_roomNote: { kind: 'note', title: 'Ein Kinderzettel in Zimmer 4', from: 'Lisa Aebi, 10', body:
`Mama sagt, wenn es zu windig ist, können wir drinbleiben und mit Frau Imhof Karten spielen.
Frau Imhof sagt, der Wind ist hier oben gar nichts.
Ich habe gefragt, ob der Schnee vom Berg fallen kann. Sie hat gesagt, diese Woche nicht.` },
      lodge_school: { kind: 'notice', title: 'Anmeldeliste der Skischule', from: 'L. Brunner', date: '28.2.83', body:
`SKISCHULE — BERGSTATION 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Skilehrer: Leo Brunner
(Darunter mit Bleistift:) Greta sagt, vom Tal alles klar. Gut. Los geht’s.` },
      lodge_kitchenNote: { kind: 'note', title: 'An die Kühlraumtür gepinnt', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
Wenn das Tal anruft oder der Schlitten irgendetwas vom Lawinendienst heraufbringt, kommt es zu MIR, nicht zu den Gästen und nicht zu Leo. Ich kümmere mich darum.
Eine volle Woche. Wir brauchen diese Woche.
Der Hauptschlüssel für die Seilbahn hängt am Haken neben dem Kühlraum. Den nimmt niemand außer mir oder dir.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'Aus der Untersuchung, ein Zeitungsausschnitt', from: 'Talzeitung', date: 'April 1983', body:
`WEISSHORN: HOTELIÈRE SAGT, KEINE WARNUNG ERHALTEN

Die Inhaberin des Berghotels Weisshorn, Frau Greta Imhof (52), erklärte gestern vor der Untersuchungskommission, am 28. Februar habe keine Lawinenwarnung das Hotel erreicht. Die Telefonleitung sei seit 7 Uhr tot gewesen, und „mit dem Postschlitten kam nichts als die Post herauf“, sagte sie.

Der Lawinendienst bleibt dabei, dass mit dem Schlitten um 8.15 ein Telegramm geschickt wurde. Im Hotel wurde keine Kopie gefunden.

Fünf Gäste und der Skilehrer Leo Brunner (29) kamen ums Leben, als die oberen Hänge um 14.40 Uhr abgingen.` },
    },
    items: {
      telegram: { name: 'Telegramm', desc: 'An den Rändern verbrannt und trotzdem lesbar. Erhalten 8.15.' },
      masterKey: { name: 'Hauptschlüssel', desc: 'Ein schwerer Schlüssel an einem Holzanhänger: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Raus aus dem Sturm',
      lodge_find: 'Finde heraus, was am Weisshorn geschehen ist',
      lodge_telegram: 'Finde das Telegramm, das nie ankam',
      lodge_pin: 'Häng das Telegramm zurück an die Tafel an der Rezeption',
      lodge_key: 'Hol den Hauptschlüssel aus der Küche',
      lodge_power: 'Starte die Seilbahn im Maschinenraum',
      lodge_board: 'Steig in die Gondel',
    },
    mono: {
      lodge_start: 'Ich sehe meine eigene Hand nicht. Da ist ein Licht. Ein Gebäude.',
      lodge_inside: 'Warm. Ein Feuer brennt, und niemand ist da, der es hütet.',
      lodge_cold: 'Mir ist so kalt. Ich muss hinein.',
      lodge_colder: 'Ich spüre meine Finger nicht mehr.',
      lodge_warm: 'Warm. Oh, das ist besser.',
      lodge_frozen: 'Sie sitzen an ihren Tischen. Ganz weiß. Hier hat sich lange niemand bewegt.',
      lodge_frozenMove: 'Der am Fenster hat sich bewegt. Als ich ans Feuer kam, hat er sich bewegt.',
      lodge_board: 'Eine Reißzwecke und die abgerissene Ecke von etwas, das hier mal hing.',
      lodge_book: 'Sechs von ihnen am Achtundzwanzigsten durchgestrichen. Alle mit demselben Stift, alle in einem Zug.',
      lodge_stove: 'Kalte Asche. Und etwas darin, das nicht verbrannt ist.',
      lodge_telegram: '„Obere Pisten schließen.“ Sie hatte es um Viertel nach acht. Sie sind um halb zehn hinaufgefahren.',
      lodge_pinned: 'So. Wo jeder es hätte lesen können.',
      lodge_claimed: 'Der Wind hat nachgelassen. Nur einen Atemzug lang. Als würde der Berg zuhören.',
      lodge_stationLit: 'Lichter, draußen über dem Schnee. Die Seilbahnstation.',
      lodge_key: 'Der Hauptschlüssel.',
      lodge_cook: 'Da ist jemand in der Küche. Ein großer Mann. Mit etwas in der Hand.',
      lodge_prints: 'Fußspuren. Die entstehen. Jetzt gerade, vor mir.',
      lodge_power: 'Sie läuft. Die Gondel ist beleuchtet.',
      lodge_noKey: 'Sie braucht einen Schlüssel.',
      lodge_notYet: 'Der Motor springt nicht an. Nicht, solange der Ort mich noch festhält.',
      lodge_boarding: 'Türen. Zu. Zu, bitte geht zu.',
      lodge_away: 'Wir fahren. Hinunter ins Nichts.',
      lodge_office: 'Ihr Büro. Die Ofentür hängt offen.',
      lodge_station: 'Die Station. Das Seil geht hinaus ins Weiß und hört einfach auf, da zu sein.',
    },
    lines: {
      lodge_bookPrompt: 'Das Gästebuch',
      lodge_boardPrompt: 'Die Telegrammtafel',
      lodge_boardPin: 'Das Telegramm aufhängen',
      lodge_stovePrompt: 'Aus der Asche heben (halten)',
      lodge_controlPrompt: 'Die Seilbahn starten (halten)',
      lodge_controlLook: 'Steuerpult',
      lodge_gondolaPrompt: 'In die Gondel steigen',
      lodge_gondolaLook: 'Die Gondel',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[Wind über dem Rauschen]'],
        ['otto', 'Neun an Ada. Sie sind sehr laut. Ist das ein Sturm? Dann das Weisshorn. Ich habe sechs Paar Ski auf meinem Regal und ein Fondueset, das nie benutzt wurde.'],
        ['ada', 'Hier sind Leute. Erfroren an den Tischen.'],
        ['otto', 'Dann stellen Sie sich nicht ans Feuer. Sie kommen zur Wärme. Und draußen achten Sie auf Schritte, die nicht Ihre sind.'],
      ],
      lodge_otto2: [
        ['otto', 'Etwas ist von meinem Regal verschwunden. Ein Telegramm. Es ist jetzt am richtigen Platz. Ich bin fast sicher, dass ich Ski gehört habe.'],
      ],
    },
    recap: {
      lodge: 'Das Weisshorn, 28. Februar 1983. Greta Imhof hatte die Lawinenwarnung um Viertel nach acht in der Hand, steckte sie in ihren Ofen, damit die volle Woche nicht abgesagt wurde, und schickte die Skischule um halb zehn hinauf. Fünf Gäste und ihr Skilehrer starben an der Bergstation; sie sagte der Untersuchung, es sei keine Warnung gekommen. Das Telegramm ist nie verbrannt. Ich habe es dort aufgehängt, wo jeder es lesen konnte, und die Seilbahn hat mich aus dem Sturm hinuntergebracht.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
