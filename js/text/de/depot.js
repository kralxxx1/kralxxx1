/* Deutsch — Prolog: Nachtschicht (Depot 9). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      depot: {
        name: 'PROLOG', title: 'Nachtschicht', place: 'Depot 9, Hauptbahnhof Halvard',
        intro: 'Halvard, in der Nacht zum 14. Januar 1998. Regen auf dem Glasdach des Hauptbahnhofs.\n\nUnter der Bahnhofshalle liegt Depot 9, wo alles, was die Stadt verliert, neunzig Tage darauf wartet, dass jemand zurückkommt und es holt. Ada Lind arbeitet seit acht Jahren am Nachtschalter. Nach Mitternacht kommt niemand herunter.\n\nDeshalb hat sie die Stelle genommen.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Übergabezettel', from: 'Benny', date: 'Di. 13. Jan.', body:
`Ada —

Übergabe:
• 14 Schirme rein. Es regnet, also.
• Der Mann mit der Posaune war wieder da. Immer noch nicht seine Posaune.
• Die Rutsche klemmt wieder. LINKS draufhauen.
• Dein Spind geht nicht zu. Die Kassette ist noch drin. Ich hab sie nicht angerührt.
• Jemand von oben hat gefragt, ob wir „den Aufzug noch haben“. Ich hab gesagt, den benutzt seit 1964 keiner mehr. Er sagte: „Das hab ich nicht gefragt.“

Kaffee ist alle. Sorry.
— Benny` },
      depot_log: { kind: 'printout', title: 'Nachtbuch, Seite 212', from: 'A. Lind', date: '13./14.01.98', body:
`DEPOT 9 — NACHTBUCH — A. LIND

23:10  Schein 4471: Handschuh, Damen, grau. Abgeholt.
00:40  Reinigung Gleis 2: Koffer, hellbraun, ohne Anhänger. Erfasst als Nr. 241.
01:15  Telefon. Niemand dran. (Dritte Nacht.)
02:30  Starker Regen. Rutsche ruhig.
02:56  Keine weiteren Vorkommnisse.` },
      depot_tag: { kind: 'card', title: 'Der Abholschein am Paket', from: 'A.', body:
`HAUPTBAHNHOF HALVARD — DEPOT 9 — FUNDSACHEN

ANSPRUCH 256
Ein Fäustling, rot, Kind, linke Hand.
Gefunden: Ostra-See, 14. Januar 1979.
AUFBEWAHREN FÜR: ADA LIND.

— A.

(Getippt auf einer Maschine mit einem abgesackten „e“, wie das Depot sie 1964 weggeworfen hat. Die Tinte ist noch nass.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'Eine Zeichnung, im Paket gefaltet', from: 'Wren, 7 Jahre', body:
`Wachsmalkreide. Ein kleiner roter Vogel auf einem Zaun. Ein großes Mädchen mit grünem Schal geht eine Straße hinunter davon, mit dem Rücken zu uns. Darüber in großen Buchstaben: ADA.

Auf der Rückseite, mit derselben Kreide:
DAMIT DU DEN WEG WEISST` },
      depot_ledger: { kind: 'report', title: 'Fundbuch, 1979, Bd. 1', from: 'Depot 9', body:
`Nr. 253 — 14.01.79 — Handschuhe, Herren, braunes Leder — Gleis 3 — abgeholt 16.01.
Nr. 254 — 14.01.79 — Schirm, schwarz — Wartesaal — abgeholt 15.01.
Nr. 255 — 14.01.79 — Buch, „Die Schneekönigin“, Kinderbuch — Gleis 4 — nicht abgeholt
Nr. 256 — 14.01.79 — Fäustling, rot, Kind, linke Hand — gefunden: Ostra-See — Anspruchsberechtigt: ihre Schwester, wenn sie sich erinnert.

(Der letzte Eintrag ist in einer zittrigen Hand geschrieben, die dir fast bekannt vorkommt. Die Tinte ist nass. In den Deckel geklebt: ein Messingschlüssel mit der Prägung VORST.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Notizen im Schreibtisch des Vorstehers', from: 'Otto Brandt', date: '14. Februar 1964', body:
`Einundvierzigtausend Stück seit 1906. Jedes davon gehörte jemandem.

Nachts höre ich wieder die alte Rohrpost. Notizen, unterschrieben mit „A.“ Sie kennt unser Fundbuch besser als ich.

Sie schreibt, es gebe ein Geschoss unter den Geschossen, wohin alles geht, was niemand abgeholt hat. Eine Sortierstelle. Sie schreibt, dort fehle ein Beamter.

Ich habe die Nummer über den Knopf geritzt, damit mich der Mut nicht verlässt.

Falls ich bis morgen früh nicht zurück bin: die Schirme kommen in den Käfig, nicht in den Müll.

— O.B.` },
      depot_memo: { kind: 'note', title: 'Eine Notiz in der Rohrpostbüchse', from: 'A.', body:
`INDEX — EBENE 256 — INTERN

An: Depot 9, Nachtschalter.

Ada.
Der Aufzugschlüssel liegt auf seinem Schreibtisch. Bring den Fäustling mit und leg ihn nicht ab.
Otto wird auf Kanal neun sein. Sag ihm, die Schirme sind im Käfig.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Kalender der Verkehrsbetriebe Halvard, 1964', body:
`FEBRUAR 1964

(Die Tage bis zum 13. sind durchgestrichen. Beim 14. mit Bleistift: „Nachtschicht. Die letzte?“ Unter dem Bild des neuen Staudamms bei Ostra, derselbe Bleistift: „Im Herbst setzen sie das Tal unter Wasser. Die Zeitung schreibt, eine alte Frau dort oben will nicht gehen.“ Seitdem hat niemand umgeblättert.)` },
      depot_poster: { kind: 'notice', title: 'Aushang in der Schalterhalle', from: 'Verkehrsbetriebe Halvard', body:
`FUNDSACHEN — DEPOT 9

In Bahnhöfen und Zügen gefundene Gegenstände werden hier NEUNZIG TAGE aufbewahrt.
Bitte bringen Sie einen Eigentumsnachweis mit.
Nicht abgeholte Gegenstände werden verkauft oder vernichtet.

(Darunter mit Filzstift angeheftet: „GEFUNDEN: graue Katze, hört auf Admiral. Bei Benny fragen.“)` },
      depot_kitchen: { kind: 'card', title: 'Eine Postkarte über der Spüle', from: 'Oma', date: '1995', body:
`(Ein Winterbild vom Ostra-See. Draußen auf dem Eis, ganz klein, der Turm der versunkenen Kirche.)

Ada —
Das Eis ist dieses Jahr dick. Der 14. ist ein Samstag. Komm, wenn du kannst. Ich stelle die Kerze ins Fenster wie immer.
Oma` },
    },
    items: {
      mitten: { name: 'Roter Fäustling (links)', desc: 'Ein Kinderfäustling aus roter Wolle, am Daumen gestopft. Der andere wurde vor neunzehn Jahren auf dem Eis gefunden.' },
      ottoKey: { name: 'Schlüssel des Vorstehers', desc: 'Messing, Prägung VORST. Er klebte im Deckel der Fundbuchkiste von 1979.' },
      elevatorKey: { name: 'Schlüssel zum Lastenaufzug', desc: 'Ein langer Schlüssel an einem Anhänger mit der Aufschrift LASTEN. Otto Brandts.' },
      badge: { name: 'Ottos Dienstmarke', desc: 'Messingoval: DEPOT 9 — OTTO BRANDT. Glatt gerieben, wo ein Daumen darüberstrich.' },
      parcel: { name: 'Paket' },
    },
    obj: {
      depot_log: 'Schreib das Nachtbuch an deiner Schreibmaschine fertig',
      depot_parcel: 'Sieh nach, was die Rutsche heruntergekommen ist',
      depot_torch: 'Hol deine Taschenlampe aus dem Spind',
      depot_power: 'Leg im Sortierraum den Hauptschalter wieder ein',
      depot_ledger: 'Finde das Fundbuch von 1979 im Archiv',
      depot_otto: 'Durchsuche Otto Brandts Büro',
      depot_elevator: 'Fahr mit dem Lastenaufzug hinunter',
    },
    mono: {
      depot_start: '02:51. Regen oben auf dem Glas der Halle. Noch eine Zeile, dann ist das Nachtbuch fertig.',
      depot_start2: 'Nach Mitternacht kommt hier niemand runter. Darum geht es bei dem Job.',
      depot_logDone: '02:56. Keine weiteren Vorkommnisse.',
      depot_chute: 'Die Rutsche. Um drei Uhr morgens gibt niemand Pakete auf.',
      depot_mitten: 'Linke Hand. Rot. Wrens waren rot. 1979 waren alle rot.',
      depot_dark: 'Und da geht der Strom. Meine Taschenlampe ist im Spind.',
      depot_torch: 'Batterien noch gut. Benny leiht sich nie was Nützliches.',
      depot_tape: 'Omas Kassette. Seit zwei Jahren in meinem Spind. Nicht heute Nacht.',
      depot_tape2: 'Nicht heute Nacht, hab ich gesagt.',
      depot_powerBack: 'So. Die alten Leitungen schmollen immer erst eine Minute.',
      depot_tube: 'Das war die alte Rohrpost im Büro des Vorstehers. Die funktioniert seit 1964 nicht mehr. Auf dem Schein steht 1979. Das Fundbuch ist im Archiv.',
      depot_archive: 'Einundvierzigtausend Dinge, die niemand abgeholt hat.',
      depot_sorter: 'Da war jemand am Ende des Gangs. Groß, im grauen Mantel. Hat im Dunkeln Kisten sortiert.',
      depot_ledgerAfter: 'Das ist nicht Bennys Schrift. Das ist überhaupt niemandes Schrift. Und im Deckel klebt ein Schlüssel: VORST. Otto Brandts Büro.',
      depot_ottoLocked: 'VORSTEHER. Seit 1964 verschlossen. Benny sagt, der Schlüssel ist mit ihm verschwunden.',
      depot_ottoLocked2: 'Immer noch verschlossen.',
      depot_ottoIn: 'Seine Lampe brennt. In seiner Tasse ist noch Kaffee. Vierunddreißig Jahre.',
      depot_badge: 'OTTO BRANDT. Seine Marke lässt man nur liegen, wenn man vorhat, sie wieder zu holen.',
      depot_elevKey: 'LASTEN. Der Aufzug, den seit ihm keiner mehr benutzt hat.',
      depot_noKey: 'Das Bedienfeld braucht einen Schlüssel. Natürlich.',
      depot_noKey2: 'Braucht immer noch den Schlüssel.',
      depot_256: 'Jemand hat eine Zahl über den untersten Knopf geritzt. 256.',
      depot_wren: 'Da war jemand in der Kabine. Ein Kind im roten Schneeanzug. Eine Sekunde lang.',
      depot_gate: 'Das Hallentor. Um Mitternacht von oben abgeschlossen. Bahnhofsordnung.',
      depot_elevatorShut: 'Der Lastenaufzug. Außer Betrieb seit 1964.',
    },
    lines: {
      depot_typePrompt: 'Die letzte Zeile ins Nachtbuch tippen',
      depot_parcelPrompt: 'Das Paket öffnen',
      depot_tapePrompt: 'Omas Kassette',
      depot_breakerPrompt: 'Den Hauptschalter umlegen (halten)',
      depot_ledgerPrompt: 'Fundbuchkiste: 1979',
      depot_badgePrompt: 'Ottos Dienstmarke',
      depot_callPrompt: 'Den Schlüssel drehen, den untersten Knopf drücken',
      depot_ottoUnlock: 'Mit dem Schlüssel des Vorstehers aufschließen',
    },
    recap: {
      depot: 'Depot 9, 02:56. Ein Paket kam die Rutsche herunter: ein roter Fäustling, linke Hand, und ein Schein mit „Aufbewahren für Ada Lind“. Im Fundbuch von 1979 stand: anspruchsberechtigt, ihre Schwester, wenn sie sich erinnert. Ich bin mit Otto Brandts Lastenaufzug hinuntergefahren, bis zu dem Knopf, über den jemand eine Zahl geritzt hatte: 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
