/* Deutsch — Level 11: Die Werkstatt (Walt, der Keller unter der Spielhalle, April 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      workshop: {
        name: 'LEVEL 11', title: 'Die Werkstatt', place: 'Walts Erinnerung — unter der Starlight-Spielhalle, 17. April 1987, 3:20 Uhr',
        intro: 'Walts Keller: ausgeweidete Fernseher, Lötrauch, und hinter einer Stahltür eine Maschine so groß wie ein Kühlschrank, die summt. Hier wurde der Kernel geboren.\n\nZwischen den Werkbänken geht etwas Großes, Oranges, Grinsendes umher, langsam, so wie ein Kostüm geht, wenn niemand drinsteckt.',
      },
    },
    items: {
      waltKey: { name: 'Walts Schlüssel', desc: 'Ein Stahlschlüssel mit der Prägung KERNEL — NUR W. Die Reide ist abgegriffen, in der Form seines Daumens.' },
    },
    docs: {
      workshop_intro: { kind: 'note', title: 'Auf der Kellertreppe', from: 'Eddie', body:
`Ich war seit 1988 nicht mehr hier unten. Es ist genau wie damals. Das ist das Schlimmste.

Der Kernel ist hinter der Stahltür. Walt hat den Schlüssel an seiner Werkbank aufbewahrt. Die drei Kalibrierregler sind vorne am Kernel. Die Einstellungen stehen auf dem Schaltplan, irgendwo auf den Werkbänken.

Stell sie richtig ein, dann lässt uns das Spiel, glaube ich, zum Haus durch.

Das Ding, das da herumläuft, ist Chompy. Das Kostüm. Es ist langsam. Lass dich nicht umarmen.

—E.` },
      workshop_schematic: { kind: 'note', title: 'Schaltplan, Blaustift auf Millimeterpapier', from: 'Walt & Eddie', date: 'Rev. C, März 1987', body:
`KERNEL — LEVELZÄHLER-OVERRIDE

Regler A (Zeile) ..... 2
Regler B (Spalte) .... 5
Regler C (Versatz) ... 6

= 256

!! Zähler auf 256 lässt das Spielfeld über den Kill Screen hinaus zeichnen.
!! Niemand weiß, was da gezeichnet wird. — E.
!! Genau darum geht’s. — W.` },
      workshop_eddiebench: { kind: 'note', title: 'An Eddies alte Werkbank geklebt', from: 'Eddie', date: '17. April 1987', body:
`Es war meine Nacht, die Hintertür abzuschließen.

Ich hab’s nicht getan. Ich hatte es eilig. Mitternachtsvorstellung im Rialto, und ich wollte den Anfang nicht verpassen.

Walt ist um 11 nach oben gegangen. Die Hintertür blieb die ganze Nacht unverschlossen.

Ich habe es nie jemandem erzählt. Ich habe Walt das für uns beide tragen lassen.

Deshalb bin ich reingegangen, Sam. Das ist nicht mutig. Das ist die Rechnung, die fällig wird.` },
      workshop_keytag: { kind: 'note', title: 'Ein Schlüsselanhänger an der Werkbank', from: 'Walt', date: '1986', body:
`(Ein Papieranhänger an einem Stahlring. Ein Schlüssel fehlt.)

ERSATZ — VORNE
Ausgegeben an DANNY K. — samstags, 8 Uhr, zum Aufstellen der Automaten.
„Verantwortungsvoller junger Mann.“ — W.

(Darunter, mit neuerer Tinte: „Ich habe der Polizei gesagt, sie seien um Mitternacht gegangen. Ich werde ihnen nicht sagen, dass ich einem Kind meinen Schlüssel gegeben habe. Sie würden seinem Vater das Letzte nehmen, was ihm noch Gutes geblieben ist: dass man seinem Sohn vertraut hat.“)` },
      workshop_receipt: { kind: 'note', title: 'Eine Quittung, an den Kostümständer gepinnt', from: 'Harlow Party Supply', date: 'März 1983', body:
`1 × MASKOTTCHENKOSTÜM, Sonderanfertigung — „CHOMPY“
Rund, orange, Filzhörner, Schaumstoffzähne (nach beiliegender Zeichnung)
Sonderanfertigung ..................... $180.00
Änderung: passend für Mann, 1,88 m .... $25.00
Notiz vom Laden: „Hoffentlich gefällt es Ihrer Tochter!“

(Später darangetackert: ein Parkschein vom St. Agnes, 27. Oktober 1983. Der Tag, an dem er es die Treppe hochgetragen hat.)` },
      workshop_nora: { kind: 'letter', title: 'Ein nie abgeschickter Brief, adressiert und frankiert', from: 'Walt', date: 'Februar 1992', body:
`Nora,

ich habe alle deine Briefe gelesen. Ich habe nicht geantwortet, weil jede Antwort, die ich geschrieben habe, entweder eine Lüge oder ein Abschied war.

Nächsten Monat gehe ich ihnen hinterher. Lass niemanden den Stecker ziehen. Nicht die Bank, nicht die Polizei, nicht dich.

Wenn ich nicht zurück bin, wenn die Bank kommt: Die Punkteliste hängt im Flur. Behalte sie. Die Namen darauf sind wichtiger als alles, was ich je gebaut habe.

Dein Bruder
Walt

(Er wurde nie abgeschickt.)` },
      workshop_ticket: { kind: 'note', title: 'Ein Fernseh-Reparaturschein auf der Werkbank', from: 'Starlight Reparatur (hinten)', date: 'März 1986', body:
`KUNDIN: Ann Keller (Maple St.)
GERÄT: 19-Zoll-Farbfernseher, kein Bild
REPARATUR: Zeilentrafo ersetzt.
KOSTEN: 0 $ — „bezahlt in Schokoladenkeksen“

(Daran geklemmt ein Zettel in deiner eigenen Handschrift mit zwölf: „DANKE WALT DAS DU UNSEREN FERNSEHER REPARIERT HAST JETZT KÖNNEN WIR WIEDER DAS SPIEL SCHAUEN — SAM“)` },
      workshop_317: { kind: 'tape', title: 'Kassette: „3:17“', from: 'Rosies Kassettenrekorder (im Automaten Nr. 7 gefunden, lief noch)', date: '17. April 1987, 3:14–3:42 Uhr', body:
`[Klick. Die Spielhalle nach Ladenschluss. Die Musik von Hungry House, zu schnell und falsch.]

ROSIE: … drei Uhr vierzehn, und wir sind auf LEVEL 255. Radio Rosie, live, hier wird Geschichte geschrieben—
DANNY: Pst! Muster! Nell, wohin?
NELL: Links. Links, dann warten. Warten … jetzt.
TOBY: Sam, du bist am Knopf dran. Sam? Du zitterst ja.
SAM: Es ist heiß. Der ganze Automat ist heiß. Leute, das ist zu heiß.

[3:16. Die Musik bricht ab. Ein langer Ton.]

DANNY: Das ist es. Das ist 256. Schaut auf die rechte Seite …
NELL: Sie ist geteilt. Alles Buchstaben. Und … unsere Namen. D-A-N. R-O-S. N-E-L. T-O-B. S-A-M.
ROSIE: Der Pakt. Alle. Alle fünf Hände an den Joystick. JETZT.
TOBY: Ich hab dich, Sam. Ich hab deine Hand.
NELL: Die Spuke haben sich umgedreht. Sie schauen uns an. Aus dem Bildschirm raus. Sie SCHAUEN uns an.
SAM: Es brennt— ich kann nicht— ich kann nicht—
DANNY: NIEMAND LÄSST LOS!

[Eine Hand reißt sich von heißem Metall los. Turnschuhe auf Teppich. Die Hintertür schlägt auf, hinaus in den Regen.]

TOBY: SAM! SAM, KOMM ZURÜCK! [ein Schluchzen] … Ist okay. Ist okay. Vier ist okay.
ROSIE: [zitternd] CONTINUE. Drück. Zusammen.

[3:17. Ein Geräusch wie ein riesiger Atemzug, der eingesogen wird. Vier kurze Keuchlaute. Dann nur noch das Summen.]

[3:20. Eine Tür. Schritte auf der Treppe. Walt, außer Atem.]

WALT: Kinder? Danny? … Nein. Nein, nein, nein. Der Bildschirm. Die Namen unter den Spuken. DAN. ROS. NEL. TOB. O Gott. O Gott, das sind ihre Namen.
WALT: [ein Mann, der schwer auf den Boden sinkt] Es tut mir leid. Ich hol euch raus. Ich verspreche, ich hol euch raus.

[Das Band läuft zweiundzwanzig Minuten lang still weiter. Dann: Klick.]` },
      workshop_lily8: { kind: 'drawing', drawing: 8, title: 'Eine Zeichnung, gefaltet in Walts Werkzeugkasten', from: 'Lily, 9 Jahre', body:
`Wachsmalstift, die letzte. Ein großer Mann sitzt neben einer hohen, leuchtenden Maschine auf dem Boden und weint. Hinter ihm steht ein kleines Mädchen und hat die Hand auf seine Schulter gelegt. Sie ist lächelnd gemalt.

SEI NICHT TRAURIG PAPA.
AM ENDE GEHEN ALLE NACH HAUSE.
DU HAST ES VERSPROCHEN.` },
    },
    obj: {
      workshop_key: 'Walts Schlüssel finden',
      workshop_kernel: 'Den Kernel-Raum öffnen',
      workshop_dials: 'Die Kalibrierregler einstellen ({n}/3 richtig)',
      workshop_leave: 'Durch den EXIT gehen',
    },
    mono: {
      workshop_start: 'Walts Werkstatt. Durch das kleine Fenster hab ich ihm früher beim Reparieren der Fernseher zugeschaut.',
      workshop_key: 'Sein Schlüssel. Warm, als hätte ihn gerade jemand hingelegt.',
      workshop_kernel: 'Der Kernel. Er atmet. Ich schwöre, er atmet.',
      workshop_calibrated: 'Zwei. Fünf. Sechs. Das Summen fällt um eine Oktave. Weit weg springt ein Türriegel auf.',
      workshop_chompy: 'Chompy. Das Kostüm vom Krankenhausfoto. Es steckt niemand drin. Es läuft trotzdem.',
      workshop_317: 'Ich habe losgelassen.',
    },
    lines: {
      workshop_unlock: 'Mit Walts Schlüssel aufschließen',
      workshop_dial: 'Den Regler drehen (jetzt: {n})',
    },
    radio: {
      workshop_start: [
        ['eddie', 'Sam … bevor du die Treppe runtergehst. Auf meiner Werkbank liegt etwas. Ich hätte lieber, dass du es liest, als dass ich es sage.'],
      ],
      workshop_kernel: [
        ['eddie', 'Das ist sie. Das ist der Kernel. Wir haben sie in acht Monaten gebaut. Ich war so stolz.'],
      ],
      workshop_chompy: [
        ['eddie', 'Licht in die Augen. Dann hält es sich das Gesicht zu. Die Nummer hat Walt immer für die Kinder gemacht. Kuckuck.'],
      ],
      workshop_truth: [
        ['eddie', '… Sam? Ich hab’s gehört. Es kam über die Sieben. Alles.'],
        ['sam', 'Ich hab losgelassen. Ich hab losgelassen und bin weggerannt, und ich hab allen erzählt, ich wäre um 21:40 nach Hause gegangen. Sieben Jahre lang.'],
        ['eddie', 'Du warst dreizehn.'],
        ['sam', 'Walt war fünf Jahre lang das Monster dieser Stadt. Wegen mir. Und dann ist er reingegangen, und jetzt IST er eins.'],
        ['eddie', '… Und ich hab die Tür offen gelassen. Walt hat wegen eines Schlüssels gelogen. Jeder in dieser Geschichte hat etwas losgelassen, Kleines.'],
        ['eddie', 'Wichtig ist, woran du dich jetzt festhältst.'],
      ],
      workshop_calibrated: [
        ['eddie', '256. Das ist es. Das ist der Weg ins Haus.'],
        ['eddie', 'Du hast meine Werkbank gelesen. Ich hab die Hintertür offen gelassen. So bist du in der Nacht wieder reingekommen.'],
        ['sam', 'Du wolltest ins Kino.'],
        ['eddie', '… Ja. Ins Kino. Ich weiß nicht mal mehr, in welchen Film.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
