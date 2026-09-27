/* Deutsch — Level 0: Demo-Modus. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Demo-Modus', place: 'Im Bildschirm',
        intro: 'Ein Brummen, das man in den Zähnen spürt. Nasser Teppich. Gelbe Wände, die nie aufhören. Weit weg ein Geräusch, das du zehntausendmal aus einem Automatenlautsprecher gehört hast: die Spuk-Sirene, auf und ab.\n\nDas Spiel hat auf einen Spieler gewartet. Jetzt hat es einen.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Papier, an die Wand geklebt', from: 'Eddie', body:
`WENN DU DAS LIEST:

1. Renn nicht, außer es hat dich schon gesehen. Rennen ist laut.
2. EXIT-Schilder lügen. Sie führen tiefer hinein, nicht hinaus.
3. Wenn die Lichter flackern, raus aus dem Gang.
4. Die Laternen sind echt. Schnapp dir eine, und alles flieht vor DIR. Für eine Weile.
5. Star Pop (die Kirschlimo) stoppt das Zittern. Frag mich nicht, warum.
6. In meinem Lager liegt ein Funkgerät. Kanal 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'Eddies Lagertagebuch', from: 'Eddie', date: '12. Juni 1993 (?)', body:
`Lager 1.

Um 23:40 Uhr durch den Bildschirm gekommen. Aufs Gesicht gefallen. Der Teppich ist klatschnass, aber nichts leckt. Hier leckt nie etwas.

Kein Walt. Seine Taschenlampe gefunden und seine Handschrift an einer Wand.

Die Funkgeräte funktionieren auf Kanal 7. Niemand antwortet. Ich lasse eins hier für den nächsten Idioten, der einem erwachsenen Mann in ein Videospiel hinterherläuft.

Falls du das bist: Hallo. Tut mir leid. Kanal 7.` },
      lobby_walt1: { kind: 'diary', title: 'Eine Seite aus Walts Tagebuch', from: 'Walt', date: 'Drinnen, Tag 1', body:
`Tag 1.

Gelb. Es brummt wie ein kaputtes Vorschaltgerät. Der Teppich ist nass.

Ich höre die Sirene in der Ferne, die, die spielt, wenn die Spuke ihr Haus verlassen.

Sie sind hier. Ich hatte recht. Gott steh mir bei, ich hatte recht.

Danny. Rosie. Nell. Toby. Haltet durch. Ich komme.` },
      lobby_walt2: { kind: 'diary', title: 'Noch eine Seite aus Walts Tagebuch', from: 'Walt', date: 'Drinnen, Tag 9 (?)', body:
`Tag 9. Oder 90.

Ich habe ständig Hunger. Überall stehen Dosen Star Pop, so viele wie in meiner eigenen Kühlbox. Ich habe sie alle getrunken. Ich weiß nicht mehr, dass ich das beschlossen hätte.

Die Laternen schmecken nach Pennys. Wenn ich eine geschluckt habe, sehe ich weiter.

Habe es in der ersten Nacht mit dem Stecker versucht. Allein. Etwas in mir machte klick, wie eine fallende Münze.

Heute habe ich den Roten gesehen. Er ist vor mir weggelaufen. Ich habe seinen Namen gerufen, und er ist stehen geblieben, eine Sekunde lang.

Jetzt verstehe ich. Ich bin der mit dem Maul.` },
      lobby_flyer: { kind: 'flyer', title: 'Ein gefaltetes Flugblatt', from: 'Rosie', date: 'April 1987', body:
`★ STRENG GEHEIM ★
OPERATION 256

WANN: Donnerstag, 4/16, nach Ladenschluss
MISSION: sehen, was hinter dem Kill Screen ist

TEAM:
Danny — der Schlüssel (NICHT Walt erzählen)
Rosie — der Plan + Snacks
Nell — die Karte mit den Spuk-Mustern
Toby — die Taschenlampe
Sam — das Glück

ALLE FÜNF ODER KEINER.
NACH DEM LESEN VERNICHTEN!!!
(Toby, das heißt: nicht in deinem Comic aufheben.)` },
      lobby_exitwall: { kind: 'wall', title: 'Neben der EXIT-Tür eingeritzt', body:
`EXITS LÜGEN
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Über den Stühlen geschrieben', body:
`DIE STÜHLE STANDEN
SCHON ZUR WAND GEDREHT
ALS ICH HERKAM
—W.` },
      lobby_puddle: { kind: 'note', title: 'Ein feuchter Zettel neben der Pfütze', from: 'Walt', body:
`Das Wasser hier ist warm und riecht nach Chlor. Wie das Stadtbad.

Nell ist nach ’85 nicht mehr in die Nähe des Schwimmbads gegangen. Gehört das hier ihr?

Jeder Raum hier drin gehört jemandem.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Eine Zeichnung hinter einem Lüftungsgitter', from: 'Lily, 9 Jahre', body:
`Wachsmalstift. Ein großer Mann mit Schnurrbart und ein kleines Mädchen mit orangefarbenen Zöpfen neben einem kleinen Spielautomaten. Auf dessen Bildschirm: ein rundes orangefarbenes Wesen und die Zahl 3190. Das Mädchen hat beide Arme hochgerissen.

ICH UND PAPA UND DIE KLEINE MASCHIENE.
ICH HAB 3190 PUNKTE!!!
PAPA SAGT DAS KOMMT FÜR IMMER AUF DIE LISTE.` },
      lobby_tape: { kind: 'tape', title: 'Band: „Test, Test“', from: 'Eddie', date: 'Drinnen', body:
`[Klick. Schweres Atmen. Das Brummen.]

EDDIE: Test, Test. Tonbandlog, Tag… keine Ahnung. Tag irgendwas.

EDDIE: Falls das June ist: Mir geht’s gut. Alles gut. Ich finde Walt, ich hole die Kinder, ich bin vor dem Baby zu Hause. Ich hab’s versprochen, und ich halte meine Versprechen. Meistens.

[Pause.]

EDDIE: Falls das nicht June ist: Kanal sieben. Nicht rennen. Und was auch immer du tust, lass es dich nicht essen hören.

[Klick.]` },
    },
    obj: {
      lobby_explore: 'Einen Ausweg finden',
      lobby_pellets: 'Die Laternen finden ({n}/4)',
      lobby_insert: 'Die Laternen in die Tafel neben dem EXIT setzen',
      lobby_leave: 'Durch die Tür gehen',
    },
    mono: {
      lobby_start: 'Wo… Der Teppich ist nass. Das Brummen ist in meinem Kopf.',
      lobby_exitSeen: 'EXIT. Vier runde Fassungen neben der Tür. Genau laternengroß.',
      lobby_firstPellet: 'Eine Laterne. Warm in der Hand. Für eine Sekunde wurde alles blau und rannte.',
      lobby_eaterHeard: 'Kauen. Irgendwo hinter den Wänden kaut etwas.',
      lobby_eaterSeen: 'Etwas Blasses am Ende des Gangs. Rund. Zu groß für den Gang. Es kaut.',
      lobby_allPellets: 'Vier Laternen. Jetzt die Tür.',
      lobby_radio: 'Ein Funkgerät. Jemand hat den Regler auf Kanal 7 festgeklebt.',
    },
    lines: {
      lobby_slots: 'Vier Fassungen ({n}/4 Laternen)',
      lobby_place: 'Die Laternen in die Fassungen setzen',
      lobby_radioTake: 'Das Funkgerät nehmen',
    },
    radio: {
      lobby_meet: [
        ['radio', '[Rauschen]'],
        ['eddie', '…hallo? HALLO? Ist da jemand auf Kanal sieben? Sag was!'],
        ['sam', '…Hallo? Wer ist da? Wo bin ich?'],
        ['eddie', 'Oh, Gott sei Dank. Ein Mensch. Okay. Okay. Ich heiße Eddie. Ich habe früher im Starlight gearbeitet. Du bist durch die Sieben gekommen, oder?'],
        ['sam', 'Eddie? Walts Eddie? Du bist vor anderthalb Jahren verschwunden. Deine Frau hat dein Foto an jeden Mast in Harlow gehängt.'],
        ['eddie', 'Anderthalb Jahre. Fühlt sich an wie eine Nacht. Dann ist das Baby schon… [Rauschen] Nein. Nicht jetzt. Wie heißt du?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '…Tobys Sam? Das Kind mit dem Fahrrad? Hm. Deshalb also.'],
        ['sam', 'Deshalb was?'],
        ['eddie', 'Als du hereingekommen bist, hat der ganze Laden es gesagt. PLAYER ONE. Ich hab’s hier unten gehört wie in einem Stadion. Bei mir hat er das nie gesagt. Bei mir hieß es INSERT COIN.'],
        ['eddie', 'Regeln. Renn nicht, außer wenn dich etwas sieht. EXIT-Schilder lügen. Wenn die Lichter flackern, raus aus dem Gang. Die Tür hier raus will vier Laternen. Finde sie. Und Sam? Bleib auf der Sieben.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Hast du gerade eine Laterne genommen? Oh nein. Okay. Es hat das gehört. Wenn man eine nimmt, wacht immer etwas auf.'],
        ['eddie', 'Ecken, Sam. Auf gerader Strecke ist es schnell, in den Kurven langsam.'],
      ],
      lobby_eater: [
        ['eddie', 'Du hast es gesehen. Sieh es nicht zu lange an. Ich nenne es den Fresser.'],
        ['sam', 'Was ist das?'],
        ['eddie', 'Es ist der Spieler. Jedes Spiel braucht einen. Dieser hier war… [Rauschen] Nimm einfach die Ecken.'],
      ],
      lobby_panel: [
        ['eddie', 'Vier Fassungen. Alles hier drin ist das Spiel, Sam. Räum das Spielfeld leer, dann geht die Tür auf.'],
      ],
      lobby_open: [
        ['eddie', 'Diese Tür ist kein Ausgang. EXITs lügen. Aber sie führt nach unten, und unten sind sie.'],
        ['sam', 'Wer?'],
        ['eddie', 'Du weißt, wer. Vier Kinder aus dem April ’87. Geh schon. Ich bin auf der Sieben.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
