/* Deutsch — Kapitel 7: Letzter Halt (der Nordlys-Express). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      train: {
        name: 'KAPITEL 7', title: 'Letzter Halt', place: 'Bahnhof Brenna, an der Nordstrecke',
        intro: 'Mittwoch, 19. Dezember 1990, 23.40 Uhr.\n\nDer Nachtzug nach Nordvik steht am Bahnsteig, alle Fenster erleuchtet. Niemand steigt ein. Niemand steigt aus. Eine Tür steht offen.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'Der Fahrplan neben der Bahnsteigtür', from: 'Nordbahn', date: 'Winterfahrplan 1990/91', body:
`NORDLYS-EXPRESS — Nachtzug mit Schlafwagen, täglich
Halvard ab 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (Bedarfshalt)* 00.50
Nordvik an 06.15

* Züge halten in Kvitfjell nur, wenn ein Reisender es dem Schaffner vor Brenna mitteilt oder ein Reisender am Bahnsteig wartet. Der Haltepunkt ist im Winter unbesetzt und unbeleuchtet.` },
      train_notice: { kind: 'notice', title: 'Ein Aushang im Wartesaal', from: 'Nordbahn, Bezirksverkehrsamt', date: '1. Dezember 1990', body:
`FAHRKARTEN SIND VOR DEM EINSTEIGEN ZU LÖSEN.

In Nachtzügen werden keine Fahrkarten verkauft. Ein Reisender, der dem Schaffner keine gültige Fahrkarte vorzeigen kann, muss den Zug am nächsten Halt verlassen.

Vielen Dank, dass Sie mit der Nordbahn reisen.

(Darunter hat jemand mit Kuli geschrieben: „Auch in Kvitfjell?“ und jemand anderes: „GERADE in Kvitfjell“)` },
      train_menu: { kind: 'note', title: 'Die Speisekarte des Speisewagens', from: 'Speisewagen Nordlys-Express', date: '19.12.90', body:
`Fischsuppe mit Brot — 48
Rentiergulasch, Preiselbeeren, Kartoffeln — 95
Waffeln mit Marmelade und Sauerrahm — 32
Kaffee — 12   Kakao — 14

Der Speisewagen schließt um 23.00 Uhr. Nach 23.00 Uhr werden Reisende aus den Schlafwagen gegen Vorlage ihrer Bettkarte bedient.

(Ein Tassenrand. Unter der Karte mit Bleistift: „Tisch an der Kombüse: Kakao, Bett 24, bar bezahlt.“)` },
      train_waiter: { kind: 'note', title: 'Ein Bestellblock an der Kombüse', from: 'R. Moe, Kellner', date: '19.12.90', body:
`23.55  Bett 24 (Wagen 2) — junge Dame, allein — Kakao, Waffeln.
       Speisewagen zu, aber sie hat mir ihre Bettkarte gezeigt, also.
       Fährt zu Weihnachten heim nach Nordvik. Zum ersten Mal allein mit dem Zug.
       Hat die Fahrkarte zurück in die Manteltasche gesteckt. Hab ihr gesagt, sie soll sie nicht verlieren.

00.30  Herr Saether kommt auf seiner Runde durch. Schnee auf der Strecke
       seit Ostra, und er lässt es an allen aus.` },
      train_paper: { kind: 'clipping', title: 'Eine Zeitung, auf einem Tisch liegen gelassen', from: 'Nordvik Tidende', date: 'Samstag, 22. Dezember 1990', body:
`MÄDCHEN, 15, SEIT MITTWOCH VERMISST

Lina Berg, 15, aus Nordvik, wurde nicht mehr gesehen, seit sie am Mittwochabend in Halvard in den Nordlys-Express stieg, um über Weihnachten nach Hause zu kommen.

Sie kam nicht an. Die Nordbahn erklärt, zwischen Brenna und Nordvik habe kein Reisender den Zug verlassen, und ihr Bett sei bei der Ankunft unbenutzt vorgefunden worden.

Seitdem schneit es im ganzen Bezirk jeden Tag. Die Polizei bittet alle, die mit dem Zug gereist sind, sich zu melden.` },
      train_lina: { kind: 'letter', title: 'Ein Brief auf dem kleinen Tisch in Bett 24', from: 'Lina', date: '19.12.90, im Zug', body:
`Liebe Mama,

ich bin im Zug!!! Ich habe die Fahrkarte selbst gekauft, von meinem Samstagsgeld aus dem Café, die ganze Strecke, mit Bett. Es ist so groß wie ein Schrank. Ich habe die untere Koje, und in der oberen ist niemand, also habe ich meinen Mantel hochgelegt, und er sieht aus wie ein Mensch.

Wir kommen um Viertel nach sechs an. Kommt nicht im Dunkeln zum Bahnhof, ich kenne den Weg. Ich bin zum Frühstück zu Hause. Sag Jonas, er kriegt mein Zimmer nicht.

Ich gebe dir den Brief selbst, dann brauche ich keine Briefmarke.

Lina` },
      train_saether: { kind: 'report', title: 'Ein Dienstbericht, gefaltet im Schaffnerabteil', from: 'E. Saether, Schaffner', date: '19./20.12.90', body:
`Nordlys-Express, Halvard–Nordvik. Schaffner: E. Saether.

21.10 Ab Halvard. 61 Reisende.
23.40 Brenna. 4 aus, 0 ein.
00.40 Fahrkartenkontrolle, Wagen 2: Bett 24, weibliche Reisende, ca. 17–18, kann keine Fahrkarte vorweisen. Behauptet, eine gekauft zu haben. Mantel und Tasche in ihrem Beisein durchsucht. Keine Fahrkarte.
00.50 Kvitfjell. Reisende ohne Fahrkarte vorschriftsgemäß abgesetzt.
06.15 An Nordvik. Keine weiteren Vorkommnisse.

(Die Zeilen 00.40 und 00.50 sind mit anderer Tinte überschrieben, sehr sorgfältig, sodass sie fast unleserlich sind.)` },
      train_inquiry: { kind: 'report', title: 'Eine Aussage im Schreibtisch des Schaffners', from: 'Untersuchung der Nordbahn: Aussage E. Saether', date: '4. Januar 1991', body:
`Ich war in der Nacht des 19. Dezember Schaffner im Nordlys-Express.

Ich kann mich an kein allein reisendes Mädchen erinnern. Ich habe wie üblich jede Fahrkarte im Zug kontrolliert. Niemand musste abgesetzt werden.

Der Zug hat in Kvitfjell nicht gehalten. Kein Reisender hatte darum gebeten, und der Haltepunkt war wegen Schnee geschlossen.

Ich bin seit sechsundzwanzig Jahren bei der Bahn.

E. Saether` },
      train_docket: { kind: 'note', title: 'Ein Fundzettel an einem Postsack', from: 'Depot 9, Hauptbahnhof Halvard — Fundsachen', date: 'Januar 1991', body:
`Nr. 97 / 1991
Eine Fahrkarte, einfach, Halvard–Nordvik, Schlafwagen, Wagen 2 Bett 24, 19.12.90. Nicht entwertet.
Gefunden: Nordlys-Express, Wagen 2, unter der unteren Koje, von der Reinigung in Nordvik, 20.12.90.
Eingang Depot 9: 7.1.91.
Bearbeitung: A. Lind
Status: NICHT ABGEHOLT` },
      train_cabLog: { kind: 'report', title: 'Das Fahrtenbuch im Führerstand', from: 'Lokführer K. Aune', date: '19./20.12.90', body:
`00.47  Klingelsignal vom Schaffner: Halt in Kvitfjell.
00.50  Gehalten in Kvitfjell. Haltepunkt unbeleuchtet, Bahnsteig unter Schnee. Starker Schneefall.
00.51  Ein Reisender aus, Ende Wagen 2. Abfahrauftrag vom Schaffner.
00.52  Abfahrt.

(Die Seite ist aus dem Buch gerissen und lose wieder hineingelegt worden.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'Eine Zeichnung auf einem Kissen in Wagen 3', from: 'Wren, 7 Jahre', body:
`Wachsmalkreide auf kariertem Papier. Ein langer blauer Zug im Dunkeln, alle Fenster gelb erleuchtet, fährt nach rechts davon. Dahinter im Schnee ein Mädchen mit roter Mütze, das neben einem Laternenpfahl steht, die Arme hängen herab. Über ihr der kleine rote Vogel.

Darunter:
SIE HATTE EINE` },
    },
    items: {
      ticket: { name: 'Fahrkarte', desc: 'Einfach, Halvard–Nordvik, 19.12.90, schon einmal entwertet. Jemand anderes. Sie lag auf einem Tisch unter einer Untertasse.' },
      linaTicket: { name: 'Linas Fahrkarte', desc: 'Einfach, Halvard–Nordvik, Schlafwagen, Wagen 2 Bett 24, 19.12.90. Nicht entwertet. Sie hatte sie selbst gekauft.' },
    },
    obj: {
      train_start: 'Steig in den Zug',
      train_ticket: 'Finde eine Fahrkarte, bevor der Schaffner dich findet',
      train_who: 'Finde heraus, wer in Kvitfjell abgesetzt wurde',
      train_lina: 'Finde Linas Fahrkarte in Bett 24',
      train_punch: 'Lass ihre Fahrkarte entwerten',
      train_brake: 'Halte den Zug in Kvitfjell an: die Notbremse ist im Führerstand',
    },
    mono: {
      train_start: 'Ein Zug. Jedes Fenster erleuchtet und keine Menschenseele auf dem Bahnsteig.',
      train_board: 'Drin. Die Tür ist hinter mir zugegangen.',
      train_moving: 'Wir fahren.',
      train_conductor: 'Jemand mit einer Lampe kommt den Gang herunter.',
      train_sleeper: 'Da drin schläft jemand, das Gesicht zur Tür. Leise, Ada.',
      train_gangway: 'Unter den Platten ist etwas. Bleib hier nicht stehen.',
      train_ticket: 'Eine Fahrkarte. Es ist nicht meine. Sie muss reichen.',
      train_check: 'Er will meine Fahrkarte.',
      train_punched: 'Klick. Er geht weiter. Er hat mir nicht ins Gesicht gesehen.',
      train_letter: 'Lina. Fünfzehn. Zum Frühstück zu Hause.',
      train_report: 'Bett 24. „Behauptet, eine gekauft zu haben.“ Kvitfjell, zehn vor eins in der Nacht, im Schnee.',
      train_found: 'Unter der Koje. Wo sie gesagt hat.',
      train_turn: 'Die Lampe ist stehen geblieben. Er hat sich umgedreht.',
      train_docket: 'A. Lind. Das ist meine Schrift. Meine zweite Woche. Ich habe es abgelegt und nie gefragt, wem es gehört.',
      train_punchIt: 'Seine Zange. Ihre Fahrkarte.',
      train_claimed: 'Entwertet. Gültig. Sie durfte in diesem Zug sein.',
      train_sat: 'Er hat sich hingesetzt. Er hat seine Mütze abgenommen.',
      train_kvitfjell: '„Kvitfjell.“ Wir werden nicht langsamer.',
      train_passed: 'Da geht es hin. Eine Lampe im Schnee. Wir haben nicht gehalten.',
      train_again: 'Nächster Halt Kvitfjell. Schon wieder. Es geht im Kreis.',
      train_brake: 'Halt dich irgendwo fest.',
      train_brakeWait: 'Die Notbremse. Noch nicht. Nicht, bevor sie ihre Fahrkarte hat.',
      train_punchWait: 'Die Zange des Schaffners. Es ist nicht meine Fahrkarte, die sie braucht.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Eine Lampe und der Schnee. Hier hat er sie abgesetzt. Sie muss genau hier gestanden und den Fenstern nachgesehen haben.',
    },
    lines: {
      train_boardPrompt: 'In den Zug steigen',
      train_punchPrompt: 'Linas Fahrkarte entwerten',
      train_punchLook: 'Die Zange des Schaffners',
      train_brakePrompt: 'Die Notbremse ziehen (halten)',
      train_brakeLook: 'Die Notbremse',
      pa_kvitfjell: '„Kvitfjell. Kvitfjell. Bedarfshalt.“',
    },
    radio: {
      train_otto1: [
        ['radio', '[die Räder, unter dem Rauschen]'],
        ['otto', 'Neun an Ada. Dieses Geräusch. Sie sind in einem Zug. Ich hätte gern, dass Sie mir sagen, Sie haben eine Fahrkarte.'],
        ['ada', 'Habe ich nicht.'],
        ['otto', 'Dann finden Sie eine, bevor der Schaffner Sie findet. Auf meinem Regal sind die Schaffner die schlimmsten. Sie sind sehr höflich, und sie hören nicht auf.'],
      ],
      train_otto2: [
        ['otto', 'Ada. Eben ist von selbst ein Zettel durch die Rohrpost gekommen. Eine Fahrkarte, nicht abgeholt. In Ihrer Handschrift. Sie haben also meine Regale gefüllt, lange bevor Sie zu ihnen heruntergekommen sind.'],
      ],
      train_otto3: [
        ['otto', 'Bei Ihnen ist es still geworden. Das ist entweder sehr gut oder sehr schlecht. Wenn der Zug noch fährt, halten Sie ihn an. Solche Züge kommen nicht an. Sie fahren nur im Kreis.'],
      ],
    },
    recap: {
      train: 'Nordlys-Express, 19. Dezember 1990. Schaffner Edvin Saether setzte die fünfzehnjährige Lina Berg am Haltepunkt Kvitfjell in den Schnee, weil sie ihre Fahrkarte nicht fand. Sie hatte sie selbst gekauft; sie lag unter ihrer Koje. Er sagte der Untersuchung, niemand sei abgesetzt worden. Die Reinigung fand die Fahrkarte in Nordvik und schickte sie an Depot 9, und ich legte sie ab und fragte nie, wem sie gehörte. Ich habe sie entwerten lassen, und ich habe den Zug dort angehalten, wo sie ausgestiegen ist.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
