/* Deutsch — Level 5: Harlow Junior High (Klassen 7–9, 16. April 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      school: {
        name: 'LEVEL 5', title: 'Harlow Junior High', place: 'Die Erinnerung von allen — Donnerstag, 16. April 1987, 15:05 Uhr',
        intro: 'Der letzte Nachmittag, an dem jemand euch fünf zusammen gesehen hat. Es hat gerade geklingelt, und es wird weiterklingeln.\n\nJemand geht mit einer Taschenlampe durch die Flure und kontrolliert Passierscheine. Du hast keinen.',
      },
    },
    items: {
      janitorKeys: { name: 'Der Schlüsselbund des Hausmeisters', desc: 'Der Bund von Herrn Gus: zwanzig Schlüssel, ein Flaschenöffner und eine kleine Plastikhornisse. Der Schlüssel fürs Vorhängeschloss ist mit rotem Nagellack markiert.' },
    },
    docs: {
      school_intro: { kind: 'note', title: 'An eine Passierschein-Tafel geklemmt', from: 'Eddie', body:
`Schule. Ihre Schule. Hier drin ist Donnerstagnachmittag, und jedes Mal, wenn ich hier durchkomme, ist es Donnerstagnachmittag.

Der Notausgang am Ende des Ostflurs ist mit einer Kette gesichert. Der Hausmeister hat die Schlüssel. Seine Kammer hat ein Zahlenschloss.

Durch diese Flure geht etwas mit einer Taschenlampe. Es sieht nur, was sein Licht trifft. Die Spinde gehen auf. Du passt rein.

—E.` },
      school_clue1: { kind: 'wall', title: 'Kreide in der Ecke einer Tafel', body:
`ERINNERUNG (Herr Gus, Hausmeister):
Code der Kammer geändert.
Lehrkräfte bitte im Sekretariat fragen.

(und darunter, kleiner, in Kinderschrift:)
erste Zahl = 3
wie 3 Leben in Hungry House
—R.` },
      school_clue2: { kind: 'note', title: 'Nachsitz-Zettel, rosa Durchschlag', from: 'Harlow Junior High', date: '14. April 1987', body:
`SCHÜLER: Kowalski, Danny — 9. Klasse (Wiederholer)
VERGEHEN: In der 4. Stunde in der Hausmeisterkammer angetroffen. Behauptet, er habe „Inventur gemacht“.
NACHSITZEN: Mittwoch, 15.4., 15:15–16:00 Uhr

Stellungnahme des Schülers (Pflichtfeld):
„Ich hab mir den Code gemerkt. Die mittlere Zahl ist 1. Wie ich. Nummer 1.“

Anmerkung der Lehrkraft: Das ist keine Stellungnahme zum Vergehen, Danny.` },
      school_clue3: { kind: 'note', title: 'Jahrbuch 1985–86, eine Seite mit Unterschriften', from: 'Das Jahrbuch der Harlow Hornets', date: 'Juni 1986', body:
`Die Seite ist voller Unterschriften in fünf Farben.

„SCHÖNE FERIEN!! — Rosie ♪“
„bleib schräg — Danny #1“
„Diese Seite behalte ich für immer. — Nell“
„sam keiner spielt hungry house besser als du außer mir — Toby“
„bis in der Spielhalle — Sam“

Am Rand, mit neuerem Bleistift und in Tobys Schrift, ein Pfeil zur Tür des Hausmeisters:
„letzte zahl = 7. glücks-7. NICHT HERRN GUS SAGEN“` },
      school_passnote: { kind: 'note', title: 'Ein Zettel, zu einem winzigen Dreieck gefaltet', from: 'Rosie', date: '16. April 1987, 2. Stunde', body:
`OPERATION 256 — HEUTE NACHT

D hat den Schlüssel (NICHT fragen).
Walt macht um 10 zu. Wir kommen um 23:15 zurück. Hintertür.
Nell bringt die Karten mit den Spuk-Mustern.
Toby bringt die Taschenlampe + Snacks.
Sam bringt den Glücks-Vierteldollar.

Wir werden die ersten Menschen der WELT sein, die Level 256 sehen.

(gib das an Nell weiter, NICHT an Toby, der verliert es)

PS: Sam. Red mit Toby. Er fühlt sich mies wegen dem Kassettenspieler.` },
      school_pact: { kind: 'note', title: 'Ein Blatt Heftpapier, auf ein Achtel gefaltet', from: 'Rosies Handschrift', date: '16. April 1987, 15:30 Uhr', body:
`OPERATION 256 — DER PAKT

Wir, die besten Hungry-House-Spieler von Harlow, Pennsylvania, schwören:

1. Wir gehen alle fünf. ALLE FÜNF ODER KEINER.
2. Wenn wir 256 erreichen, sind alle fünf Hände am Joystick.
3. NIEMAND LÄSST LOS. Egal, was auf dem Bildschirm ist.
4. Was auch immer auf der anderen Seite ist, wir sehen es zusammen.
5. Niemand geht allein nach Hause. (Festungsregel 4, mit Erlaubnis vom Boss ausgeliehen.)

DANNY K.   ROSIE A. ♪   NELL P.   TOBY M. ★

Und ganz unten, in einer Handschrift, die du besser kennst als jede andere:
SAM K.` },
      school_plaque: { kind: 'wall', title: 'Eine Messingtafel neben der Bibliothekstür', body:
`IN LIEBEVOLLER ERINNERUNG AN
LILY BRENNER
1974 – 1983

Sie hat auf alles gemalt.
Sie hat über alles gelacht.
Sie war unsere Freundin.

— Ihre 4. Klasse, Raum 104, Harlow Elementary.
Wir haben die Tafel mitgenommen, als wir hierher gewechselt sind. (1986)` },
      school_paper: { kind: 'note', title: 'The Harlow Hornet, die Schülerzeitung', from: 'Harlow Junior High', date: 'April 1987', body:
`DER RADIO-CLUB BRAUCHT DICH!
Magst du Musik? Redest du gern? Willst du AUF SENDUNG sein?
Rosie Alvarez (9. Klasse) gründet einen Radio-Club. Erstes Treffen am Dienstag.
„Harlow verdient einen echten DJ.“ — Rosie

HIGHSCORES AUS DEM STARLIGHT (Hungry House, Nr. 7)
1. DAN 921.450  2. ROS 887.300  3. NEL 640.120  4. TOB 512.890  5. SAM 498.770

GEFUNDEN: ein Kassettenspieler, blau, hinten ein „S“ eingeritzt. Irgendwie kaputt. An den Besitzer: Bitte verzeih, wer auch immer sich draufgesetzt hat. —T.` },
      school_samlocker: { kind: 'note', title: 'Innen in Spind 217 geklebt (deinen)', from: 'Sam', date: '16. April 1987', body:
`Toby,

es ist nur ein Kassettenspieler. Der Kassettenspieler ist mir sogar egal. Ich war sauer, weil du immer alles zuerst machen darfst und ich immer hinterherrennen muss.

Tut mir leid, dass ich in der Cafeteria rumgeschrien hab.

Ich komme heute Abend. Ich bring den Glücks-Vierteldollar mit.

Wir sind ein Team.

— Sam

(Du hast ihn in der Mittagspause geschrieben und in deinen Spind geklebt, um ihn ihm nach der Schule zu geben. An dem Abend in der Spielhalle gab es stattdessen den zweiten Streit. Du hast ihn ihm nie gegeben. Er hing dort, bis im Juni die Spinde ausgeräumt wurden.)` },
      school_attendance: { kind: 'note', title: 'Tägliche Fehlliste, Sekretariat', from: 'Harlow Junior High', date: 'Freitag, 17. April 1987', body:
`FEHLT, KEIN ANRUF VON ZU HAUSE:
Kowalski, Danny (9)
Alvarez, Rosie (9)
Park, Nell (9)
Marsh, Toby (7)

Sekretariat informiert 8:20 Uhr.
Eltern informiert 8:35 Uhr.
Polizei im Gebäude 9:10 Uhr.

Keller, Sam (7) — ANWESEND. Früh gekommen. Hat sich in Raum 112 an Tobys Tisch gesetzt und wollte nicht weg. Haare noch nass. Um 9:30 zur Schulkrankenschwester geschickt.` },
      school_walt: { kind: 'diary', title: 'Walts Tagebuch, mit Bleistift', from: 'Walt', date: 'Drinnen', body:
`Eine Turnhalle. Girlanden für einen Tanzabend, den es nie gegeben hat.

Es ist nicht Lilys Schule, aber es riecht genauso. Im Frühjahr ’83 war ich einmal in ihrer Klasse, um von meiner Arbeit zu erzählen. Sie haben gefragt, was ein Radar macht. Ich habe gesagt: Es findet Dinge, die verloren gegangen sind.

Das Keller-Kind hat die meisten Fragen gestellt. Sam. Lily hat über jede einzelne gelacht. Das war das letzte Mal, dass ich sie so lachen gehört habe.

Ich habe solchen Hunger, Lily.` },
      school_tape: { kind: 'tape', title: 'Kassette: „Morgendurchsagen“', from: 'Büro der Schulleitung', date: '17. April 1987, 8:45 Uhr', body:
`[Klick. Rückkopplung aus den Lautsprechern. Jemand klopft zweimal ans Mikrofon.]

SCHULLEITER: Guten Morgen, Harlow Hornets. Ich … muss euch alle bitten, zuzuhören.

SCHULLEITER: Vier unserer Schülerinnen und Schüler sind letzte Nacht nicht nach Hause gekommen. Danny Kowalski, Rosie Alvarez, Nell Park und Toby Marsh.

SCHULLEITER: Wenn ihr sie gestern Abend gesehen habt, egal wo, kommt bitte ins Sekretariat. Ihr bekommt keinen Ärger. Niemand bekommt Ärger.

[Eine lange Pause. Im Sekretariat weint jemand.]

SCHULLEITER: … Der Frühlingsball ist verschoben.

[Klick.]` },
    },
    obj: {
      school_code: 'Den Code der Hausmeisterkammer finden ({n}/3)',
      school_closet: 'Die Hausmeisterkammer öffnen',
      school_keys: 'Die Schlüssel des Hausmeisters nehmen',
      school_leave: 'Die Kette am Notausgang im Ostflur lösen',
    },
    mono: {
      school_start: 'Harlow Junior High. Die Uhr über der Tür zeigt 15:05. Sie hat das ganze Jahr 15:05 gezeigt.',
      school_code: '3 … 1 … 7. Natürlich.',
      school_keys: 'Die Schlüssel von Herrn Gus. Manchmal durften wir sie zur Turnhalle tragen. Da kamen wir uns wichtig vor.',
      school_gym: 'Die Turnhalle. FRÜHLINGSBALL ’87. Toby wollte Nell fragen. Er hat an mir geübt.',
      school_monitor: 'Jemand am Ende des Flurs, mit einer Taschenlampe. Wo sein Gesicht sein sollte, ist nur das Licht.',
      school_pact: 'Niemand lässt los. Ich weiß noch, wie ich unterschrieben habe. Ich weiß noch den Streit um 21:40. Danach … nur Regen.',
      hideLocker: 'Durch die Lüftungsschlitze. Nicht atmen.',
    },
    lines: {
      school_keypad: 'Schloss der Hausmeisterkammer (3 Ziffern)',
      school_unlockExit: 'Die Kette mit den Hausmeisterschlüsseln aufschließen',
    },
    radio: {
      school_start: [
        ['eddie', 'Oh nein. Schule. Ich hab die Schule gehasst.'],
        ['sam', 'Es ist der Tag. Der sechzehnte April.'],
        ['eddie', '… Ja. Hab ich mir gedacht. Hör zu: Die Pausenaufsicht sieht nur, was ihre Taschenlampe sieht. Bleib aus dem Strahl. Spinde sind deine Freunde.'],
      ],
      school_monitor: [
        ['eddie', 'Pausenaufsicht. Rein in einen Spind. Sofort, Sam. Keine Diskussion. SPIND.'],
      ],
      school_keys: [
        ['eddie', 'Schlüssel. Gut. Ostflur, die Kette am Notausgang.'],
        ['eddie', 'Und Sam … dieser Spind. 217. War das deiner?'],
        ['sam', 'Lass es.'],
        ['eddie', 'Okay. Okay.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
