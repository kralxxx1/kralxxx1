/* Deutsch — Level 255 (Das Haus) und Level 256 (Kill Screen). */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'Das Haus', place: 'Das Spiel selbst',
        intro: 'Hungry House, von innen. Wände, deren Fugen leuchten wie ein Bildschirm, Sterne, die auf Hüfthöhe schweben, und in der Mitte das Haus der Spuke, dessen Tür von vier Laternen verschlossen gehalten wird.\n\nDu kennst dieses Spielfeld besser als dein eigenes Zimmer. Du hast es zehntausendmal gespielt. Es hat darauf gewartet, dass du es noch ein Mal spielst.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Kill Screen', place: 'Die Hälfte, die niemand sehen sollte',
        intro: 'Die linke Hälfte des Spielfelds ist das Haus, das du kennst. Die rechte Hälfte besteht aus Buchstaben, Zahlen und Farben, die sich gelöst haben und in der Luft hängen.\n\nIrgendwo im Kern ist noch etwas eingesteckt.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Leuchtende Buchstaben an der Labyrinthwand', from: 'W.', body:
`WENN DU DAS LESEN KANNST,
BIST DU IN MEINEM SPIEL.
ES TUT MIR LEID.
FRISS DIE STERNE.
TU DEN SPUKEN NICHTS.
—W.` },
      maze_rules: { kind: 'wall', title: 'Eine Tafel, kalt wie Stein', body:
`REGELN DES HAUSES

1. Der Spieler frisst.
2. Die Spuke jagen.
3. Das Spielfeld wird geleert.
4. Das nächste Spielfeld beginnt.
5. Es gibt keine Regel fünf.` },
      maze_house: { kind: 'note', title: 'An der Tür des Spukhauses', from: 'Eddie', body:
`Vier Laternen halten den Vorhang geschlossen. Eine in jeder Ecke.

Das Haus ist der Weg nach unten. Der letzte Weg nach unten.

Wir sehen uns auf der anderen Seite. —E.` },
      maze_fruit: { kind: 'memory', title: 'Die Süßigkeit — eine Erinnerung', body:
`Als Lily zum ersten Mal den Süßigkeiten-Bonus holte, schrie sie so laut, dass Walt seinen Kaffee fallen ließ.

„Papa! SÜSSIGKEIT! Ich hab die SÜSSIGKEIT!“

Danach warf er jeden Samstag einen Vierteldollar für sie ein, stand das ganze Spiel über hinter ihr und sagte ihr kein einziges Mal, wohin sie gehen sollte.` },
      ks_glitch1: { kind: 'wall', title: 'Kaputte Zeichen, die in der Luft hängen', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Ein beschädigter Spielstand', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'Walts letzter Brief', from: 'W. (ich glaube, so heiße ich)', date: 'Ein Tag, der sich nicht zählen ließ', body:
`An wen auch immer, der den Kern erreicht.

Der Stecker ist hier. Von innen gezogen ist es kein Mord, sondern ein Ende. GAME OVER. Alle, die noch sie selbst sind, gehen nach Hause.

Aber er rührt sich nicht für ein einziges Paar Hände. Das Spiel hat mit fünf Händen am Joystick angefangen. Es endet mit fünf. Und die vier müssen sich erinnern, wer sie sind, sonst sind ihre Hände nur Licht.

Ich habe es allein versucht, in meiner ersten Nacht hier drin. Das Spiel hat es als Spielzug gewertet und mich zu seinem Spieler gemacht. Das bin ich jetzt.

Um 3:16 hat eine Hand losgelassen. Seitdem wartet das Spiel auf diese Hand.

Sag Nora, dass es mir leidtut. Sag Ruth, dass sie recht hatte. Sag der Tabelle, sie soll Lilys Punkte behalten.

—W.` },
      ks_eddie: { kind: 'note', title: 'Ein Zettel, neben den EXIT gepinnt', from: 'Eddie', body:
`Einer rein, einer raus.

Ich habe diese Tür in meiner ersten Woche gefunden. Draußen sind es anderthalb Jahre. Hier drin hat es sich angefühlt wie eine einzige, sehr lange Nacht.

Tut mir leid, Kleines.` },
    },
    obj: {
      maze_pellets: 'Die Laternen in den vier Ecken nehmen ({n}/4)',
      maze_house: 'Ins Haus der Spuke gehen',
      ks_core: 'Den Kern auf der kaputten Seite erreichen',
      ks_choice: 'Wählen: die EXIT-Tür oder der Stecker',
    },
    mono: {
      maze_start: 'Das ist … das Spiel selbst. Ich bin darin.',
      maze_rules: 'Wer frisst die Sterne? Ich.',
      maze_house: 'Der Vorhang ist gefallen. Im Haus ist eine Tür.',
      ks_start: 'Die rechte Seite ist … kaputt. Buchstaben hängen in der Luft.',
      ks_core: 'Der Kern. Hier ist ein riesiger Stecker. Der Stecker des Automaten. Von innen.',
      ks_exit: 'EXIT. Diesmal ein echter. Ich spüre Wind.',
      ks_plugTry: 'Er rührt sich nicht. Nicht für zwei Hände. Er braucht fünf.',
      ks_plugReady: 'Vier farbige Lichter kommen an meine Seite. Rot, Violett, Türkis, Bernstein.',
    },
    lines: {
      maze_portal: 'Hinunter in das Level, das sich nicht zählen lässt',
      maze_fruitTake: 'Die Süßigkeit nehmen',
      ks_plug: 'DEN STECKER ZIEHEN',
      ks_plugTry: 'Versuchen, den Stecker zu ziehen',
      ks_exitGo: 'Durch den EXIT gehen',
      ks_exitHold: 'Eddie die Tür aufhalten',
      ks_missing: '(Es fehlen: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'Das ist es. Level zweihundertfünfundfünfzig. Das letzte Spielfeld vor dem kaputten.'],
        ['eddie', 'Nimm die Ecken. Ich warte unten auf dich.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Ich bin hier. Nicht im Funk. Hier. An der Tür rechts.'],
        ['eddie', 'Komm und such mich. Bitte.'],
      ],
      ks_plea: [
        ['eddie', 'Das ist der echte. Wind, Regen, Front Street. Zuhause.'],
        ['eddie', 'Er lässt einen raus und behält einen drin. Ich habe ihn in meiner ersten Woche gefunden. Seitdem stehe ich daneben.'],
        ['sam', 'Du wolltest mich aufmachen lassen und selbst durchgehen.'],
        ['eddie', 'Hope ist fünfzehn Monate alt, Sam. Ich habe sie nie im Arm gehalten. [Seine Stimme bricht.] Ich bitte dich nicht, mir zu verzeihen. Ich bitte dich, die Tür zu halten.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'Das ist der echte. Wind, Regen, Front Street. Zuhause.'],
        ['eddie', 'Ich hab dir im Motel gesagt, dass ich nicht fragen werde. Also frage ich nicht.'],
        ['sam', 'Aber du willst.'],
        ['eddie', 'Jede Sekunde. [Ein langer Atemzug.] Geh zuerst zum Kern, Sam. Wenn es einen anderen Weg gibt, dann dort. Wenn nicht … stehe ich immer noch hier.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
