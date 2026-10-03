/* Deutsch — Kapitel 2: Nebelglocke (MS Saint Brigid). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      ferry: {
        name: 'KAPITEL 2', title: 'Nebelglocke', place: 'MS Saint Brigid, Halvard-Sund',
        intro: '9. November 1987, Viertel vor elf in der Nacht. Nebel so dicht, dass man von der Brücke aus den Bug nicht sieht.\n\nDie Saint Brigid sinkt über das Heck, langsam, auf einer See so glatt wie ein Tisch. Ihr Radar ist seit einer Woche ausgefallen. Irgendwo vorn eine Glocke.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Rettungsbootstationen', from: 'MS Saint Brigid', body:
`IM NOTFALL

1. Gehen Sie zu Ihrer Rettungsbootstation (siehe Karte in Ihrer Kabine).
2. Legen Sie Ihre Rettungsweste an. Nicht im Schiff aufblasen.
3. Die Boote werden von der Besatzung gefiert.
   Davitschlüssel: auf der Brücke.
   Handkurbel: falls der Motor ausfällt.

(Darunter mit Filzstift: „Winde Nr. 2 klemmt. Kurbel liegt im Werkzeugspind im Maschinenraum, NICHT an Deck. — 2. Ing.“)` },
      ferry_testimony: { kind: 'report', title: 'Aussage vor dem Untersuchungsausschuss (Abschrift)', from: 'Kpt. H. Aal', date: '30. November 1987', body:
`Ich war von 21:30 Uhr bis zum Befehl zum Verlassen des Schiffes auf der Brücke.

Die Sicht betrug weniger als eine Kabellänge. Das Radar war seit dem 2. November ausgefallen, und die Nebelsignale wurden von Hand gegeben: mit der Schiffsglocke, geläutet von Decksmann P. Rask.

Gegen 22:35 Uhr verstummte die Glocke. Ich schickte den Zweiten Offizier nach vorn. Der Junge hatte seinen Posten verlassen. Ohne Signal konnten wir weder gehört werden noch hören.

Ich muss leider sagen, dass der Verlust der Saint Brigid damit begann, dass ein Sechzehnjähriger in Panik geriet.

H. Aal, Kapitän` },
      ferry_logpage: { kind: 'report', title: 'Eine aus dem Logbuch gerissene Seite', from: 'Saint Brigid, Decklog', date: '9. November 1987', body:
`21:40  Dichter Nebel. Fahrt auf 6 kn reduziert. Radar a. B.
22:05  Kapitän in seine Kabine (unwohl). 2. Offz. hat die Wache.
22:10  Nebelsignale von Hand. Decksm. Rask an der Glocke.
22:31  Kapitän gerufen. Kam nicht.
22:44  Kollision, Backbord achtern. Wassereinbruch.
22:47  Schiff verlassen. Boote 1, 3, 4 zu Wasser.
22:52  Decksm. Rask läutet weiter. Er sagt, die Boote steuern nach der Glocke. Kapitän nicht auf der Brücke.
22:58  Glocke läutet noch

(Hier bricht die Schrift ab. Die Seite ist sauber herausgerissen und dann klein gefaltet worden, so wie man etwas faltet, das man lange in einer Schublade aufheben will.)` },
      ferry_logbook: { kind: 'report', title: 'Das Decklog auf dem Kartentisch', from: 'Saint Brigid', body:
`21:15  Pier Halvard. 41 Passagiere, 17 Besatzung. Nebelfelder.
21:30  Hafen frei.

(Eine Seite fehlt. Man sieht die Rissspur in der Bindung. Auf der nächsten Seite:)

23:40  Alle Boote vollzählig. Ein Besatzungsmitglied vermisst: Decksm. P. Rask, der gegen 22:35 seinen Posten an der Glocke verließ.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'Das Decklog, mit seiner Seite', from: 'Saint Brigid', body:
`21:40  Dichter Nebel. Fahrt auf 6 kn reduziert. Radar a. B.
22:05  Kapitän in seine Kabine (unwohl). 2. Offz. hat die Wache.
22:10  Nebelsignale von Hand. Decksm. Rask an der Glocke.
22:31  Kapitän gerufen. Kam nicht.
22:44  Kollision, Backbord achtern. Wassereinbruch.
22:47  Schiff verlassen. Boote 1, 3, 4 zu Wasser.
22:52  Decksm. Rask läutet weiter. Er sagt, die Boote steuern nach der Glocke. Kapitän nicht auf der Brücke.
22:58  Glocke läutet noch.
23:05  Glocke verstummt.

(Die Seite sitzt in der Bindung, als wäre sie nie draußen gewesen. Die Tinte der letzten Zeile ist nass.)` },
      ferry_radio: { kind: 'printout', title: 'Funkraumtagebuch', from: 'Funkoffizier', date: '9.11.87', body:
`22:46  MAYDAY gesendet. Position nach Koppelort.
22:48  Halvard Radio bestätigt. Lotsenboot Ternen läuft aus.
22:55  Ternen: „Sehen Sie nicht. Hören Ihre Glocke. Steuern darauf zu.“
23:02  Ternen: „Haben zwei Ihrer Boote. Hören die Glocke noch. Weiterläuten.“
23:05  Ternen: „Glocke hat aufgehört. Wo sind Sie?“
23:06  (keine weiteren Einträge)` },
      ferry_mother: { kind: 'letter', title: 'Ein Brief auf einem Sitz im Salon', from: 'Elin Rask', date: '4. Januar 1988', body:
`An die Herren des Untersuchungsausschusses,

Sie haben in Ihren Bericht geschrieben, dass mein Sohn seinen Posten verlassen hat.

Pim war sechzehn. Er hatte Angst vor der Dunkelheit, bis er elf war, und schlief immer noch mit Licht im Flur. Wenn er Angst hatte, tat er, was man ihm sagte, und er tat es lauter.

Wenn ihm jemand gesagt hat, er soll diese Glocke läuten, dann hat er sie geläutet, bis kein Schiff mehr da war, auf dem man sie läuten konnte.

Ich möchte, dass sein Name aus Ihrem Bericht gestrichen wird. Ich möchte, dass er richtig herum wieder hineingeschrieben wird.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'Eine Postkarte auf der Koje', from: 'Margit', body:
`(Ein Bild der Saint Brigid an einem Sommertag, über die Toppen geflaggt.)

Liebe Tante Ruth,
wir fahren durch Nebel, man sieht gar nichts! Der Junge an Deck läutet jede Minute eine Glocke, damit andere Schiffe wissen, dass wir da sind. Es ist schön und ein bisschen gruselig. Sag Mama, ich rufe aus Halvard an.
Margit

(Nie abgeschickt.)` },
      ferry_purser: { kind: 'note', title: 'Besatzungsliste, Zahlmeisterbüro', from: 'Zahlmeister', body:
`MS SAINT BRIGID — BESATZUNG, WINTERFAHRPLAN 1987

Kapitän .............. H. Aal
Erster Offizier ...... (im Urlaub)
2. Offizier .......... T. Solberg
Leitender Ing. ....... K. Moe
2. Ingenieur ......... R. Dahl
Funkoffizier ......... B. Lund
Decksmann ............ P. Rask (16) — erste Saison

(Jemand hat eine kleine Glocke neben den letzten Namen gezeichnet.)` },
      ferry_mess: { kind: 'note', title: 'Dienstplan in der Mannschaftsmesse', from: 'T. Solberg', body:
`WOCHE 45

Radar a. B. seit 2.11. — Teile in Bergen bestellt.
BIS ZUR REPARATUR: Nebelglocke von Hand bei Sicht < 1 sm.
Glocke: Rask (alle Abendfahrten).
Rask: Du läutest, bis ich sage, dass du aufhören sollst. Nicht, bis es langweilig wird. Bis ich es SAGE.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'Eine Zeichnung, in eine Koje gesteckt', from: 'Wren, 7 Jahre', body:
`Wachsmalkreide. Ein Schiff in grauem Nebelgekritzel. Vorn ein Junge in Gelb mit einer Glocke, den Mund offen, läutend. Oben auf dem Mast ein kleiner roter Vogel.

Darunter:
ER HAT NICHT AUFGEHÖRT` },
    },
    items: {
      bridgeKey: { name: 'Brückenschlüssel', desc: 'Ein Messingschlüssel an einem Korkschwimmer. Aus der Kapitänskabine.' },
      davitKey: { name: 'Davitschlüssel', desc: 'Ein T-förmiger Schlüssel mit der Prägung RETTUNGSBOOTE. Er löst die Windenbremse.' },
      crank: { name: 'Windenkurbel', desc: 'Eine schwere Stahlkurbel mit Holzgriff. Um ein Boot von Hand zu fieren.' },
      logPage: { name: 'Ausgerissene Logbuchseite', desc: 'Klein gefaltet. 9. November 1987, 21:40 bis 22:58.' },
    },
    obj: {
      ferry_start: 'Finde einen Weg vom Schiff',
      ferry_bridge: 'Hol den Davitschlüssel von der Brücke',
      ferry_captain: 'Durchsuche die Kapitänskabine nach dem Brückenschlüssel',
      ferry_logbook: 'Leg die ausgerissene Seite zurück ins Logbuch auf der Brücke',
      ferry_key: 'Nimm den Davitschlüssel von der Brücke',
      ferry_crank: 'Finde die Windenkurbel im Maschinenraum',
      ferry_lower: 'Fier Rettungsboot 2 ab',
    },
    mono: {
      ferry_start: 'Ein Schiff. Nebel so dicht, dass ich die Reling nicht sehe. Und das Deck hat Schlagseite.',
      ferry_winch: 'Rettungsboot 2. Die Winde braucht einen Davitschlüssel und eine Kurbel. Der Schlüssel wird auf der Brücke sein.',
      ferry_winch2: 'Brauche immer noch Schlüssel und Kurbel.',
      ferry_winchNoCrank: 'Schlüssel steckt. Die Kurbel ist nicht an Deck. Der Aushang sagte Maschinenraum.',
      ferry_winchNoKey: 'Ich habe die Kurbel. Die Bremse ist noch blockiert: der Davitschlüssel.',
      ferry_brake: 'Die Bremse lässt nicht los. Als wäre das Schiff noch nicht fertig mit mir.',
      ferry_pageAfter: 'Er war nicht auf der Brücke. Er saß mit einer Flasche in seiner Kabine, und der Junge hat eine Stunde lang diese Glocke geläutet.',
      ferry_logbookGap: 'Eine Seite fehlt. Bei 21:40 herausgerissen.',
      ferry_claimed: 'So. Da gehört sie hin.',
      ferry_bell: 'Die Schiffsglocke. Sie klingt, als würde sie auf jemanden warten.',
      ferry_bellAfter: 'Sie ist warm. Da war jemandes Hand an diesem Seil.',
      ferry_bridgeKey: 'Der Brückenschlüssel. Unter seinem Kissen. Natürlich.',
      ferry_davitKey: 'RETTUNGSBOOTE. Der Davitschlüssel.',
      ferry_crank: 'Die Kurbel. Das Wasser hat sich eben bewegt. Alles auf einmal.',
      ferry_lower: 'Festhalten. Halt dich irgendwo fest.',
      ferry_end: 'Er läutet immer noch. Gleichmäßig, wie eine Uhr. Damit die Boote ihren Weg finden.',
      ferry_bridgeLocked: 'Die Brücke ist verschlossen. Der Kapitän wird einen Schlüssel haben.',
      ferry_passengers: 'Sie haben geschlafen. Jeder Einzelne hat geschlafen, und jetzt stehen sie.',
      ferry_drowned: 'Da kam etwas aus dem Wasser. Die Hände zuerst.',
      ferry_lounge: 'Der Salon. Rettungswesten auf jedem Sitz. Niemand hat sich gerührt, als ich hereinkam.',
      ferry_engineRoom: 'Der Maschinenraum steht knietief unter Wasser. Das Wasser ist ganz still.',
      ferry_fore: 'Die Glocke ist hier oben irgendwo. Ich höre sie im Wind atmen.',
    },
    lines: {
      ferry_winchGo: 'Die Winde drehen und Rettungsboot 2 abfieren (halten)',
      ferry_winchLook: 'Winde von Rettungsboot 2',
      ferry_logbookPut: 'Die Seite zurücklegen',
      ferry_logbookRead: 'Das Logbuch lesen',
      ferry_bellPrompt: 'Die Glocke läuten',
      ferry_pagePrompt: 'Eine gefaltete Seite in der Schublade',
      ferry_bridgeUnlock: 'Die Brücke aufschließen',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[Rauschen, und darunter, ganz leise, eine Glocke]'],
        ['otto', 'Neun an Ada. Sie sind durch. Wo sind Sie?'],
        ['ada', 'Auf einem Schiff. Im Nebel. Es sinkt.'],
        ['otto', 'Die Saint Brigid. Von ihr habe ich ein ganzes Regal: Rettungswesten, ein Schachspiel, einundvierzig Schirme. Sie ist 1987 gesunken.'],
        ['ada', 'Wie komme ich runter?'],
        ['otto', 'Auf jedem Regal liegt eine Sache am falschen Platz. Eine Lüge mit Seitenzahl. Bringen Sie sie zurück, und der Ort lässt Sie los. Dann benutzen Sie die Rettungsboote wie ein vernünftiger Mensch.'],
      ],
      ferry_bellman: [
        ['otto', 'Sie haben den Mann mit der Glocke getroffen. Lassen Sie ihn sie nicht über Sie bringen. Er läutet, damit Sie wissen, wo er ist. Seien Sie dankbar. Die meisten tun das nicht.'],
      ],
      ferry_otto2: [
        ['otto', 'Auf meinen Regalen hat sich eben etwas bewegt. Eine Akte. Rask, P. Sie lag unter „Posten verlassen“. Da liegt sie nicht mehr.'],
        ['ada', 'Wo ist sie jetzt?'],
        ['otto', 'Unter „gefunden“. Ich habe sie nicht dorthin gelegt.'],
      ],
    },
    recap: {
      ferry: 'Die Saint Brigid, im Nebel. Kapitän Aal sagte, der Junge an der Nebelglocke sei in Panik geraten und weggelaufen. Die Seite, die Aal aus seinem eigenen Logbuch gerissen hatte, sagte, dass er betrunken in seiner Kabine saß, während der sechzehnjährige Pim Rask die Boote nach Hause läutete. Ich habe die Seite zurückgelegt. Als Rettungsboot 2 das Wasser berührte, begann die Glocke wieder zu läuten.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
