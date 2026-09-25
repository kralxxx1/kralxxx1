/* English — Chapters 13–14: The Maze (level 255) and the Kill Screen (level 256). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'The Maze', place: 'The board before the broken one',
        intro: 'Blue walls glowing in the dark, dots floating at hip height, a house in the middle with a pink door. You know this place better than your own bedroom.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Kill Screen', place: 'The half nobody was supposed to see',
        intro: 'The left half of the board is the maze you know. The right half is letters, numbers and colors that have come loose, hanging in the air. Somewhere at the core, something is plugged in.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Written in neon on the maze wall', from: 'W.', body:
`IF YOU CAN READ THIS
YOU ARE IN MY GAME.
I'M SORRY.
EAT THE DOTS.
DON'T HURT THE GHOSTS.
—W` },
      maze_rules: { kind: 'wall', title: 'A plaque, cold as stone', body:
`RULES OF THE GAME

1. The player eats.
2. The ghosts chase.
3. The board is cleared.
4. The next board begins.
5. There is no rule five.` },
      maze_house: { kind: 'note', title: 'On the ghost house door', from: 'Eddie', body:
`Four power pellets hold the curtain shut. One in each corner.

The house is the way down. The last way down.

I'll meet you on the other side. —E` },
      maze_fruit: { kind: 'memory', title: 'Cherry — a memory', body:
`The first time Lily got a cherry, she screamed so loud Walt dropped his coffee.

"Daddy! FRUIT! I got FRUIT!"

He put a quarter in the machine for her every Saturday after that, and stood behind her the whole game, and never once told her which way to go.` },
      ks_glitch1: { kind: 'wall', title: 'Broken characters in the air', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'A corrupted save file', body:
`SAVE DATA
PLAYER: W̶L̸T̵ (HUNGRY)
GHOSTS: B̵L̸Y P̴N̷Y I̷V̵Y C̸L̵Y
GUESTS: E̶D̵D ... S̷A̶M̸?
NEXT PLAYER: —` },
      ks_walt8: { kind: 'letter', title: "Walt's last letter", from: 'W. (I think that is my name)', date: 'The day that could not be counted', body:
`To whoever reaches the core.

The plug is here. Pulled from the inside it isn't murder, it's an ending. GAME OVER. Everyone who is still themselves goes home.

But only if the four of them remember who they are. If you pull it while they are still ghosts, the game just picks new ghosts. And a new player.

I tried it that way once. I am the new player.

Tell Nora I'm sorry. Tell Ruth she was right. Tell Lily's table to keep her score.

—W` },
      ks_eddie: { kind: 'note', title: 'A note pinned beside the EXIT', from: 'Eddie', body:
`One in, one out. The score has to be kept.

I found this door in my first month. I've been standing next to it for a year and a half.

I'm sorry, kid.` },
    },
    obj: {
      maze_pellets: 'Eat the power pellets in the four corners ({n}/4)',
      maze_house: 'Go into the ghost house',
      ks_core: 'Reach the core on the broken side',
      ks_choice: 'Make your choice: the EXIT door or the plug',
    },
    mono: {
      maze_start: "This is... the game itself. I'm inside it.",
      maze_rules: 'Who eats the dots? I do.',
      maze_house: 'The curtain dropped. There is a door inside the house.',
      ks_start: 'The right side is... broken. Letters hanging in the air.',
      ks_core: "The core. There's a huge plug here. The cabinet's plug. From the inside.",
      ks_exit: 'EXIT. A real one this time. I can feel wind.',
      ks_plugTry: "It won't move. I can't pull this alone. I need four more hands.",
      ks_plugReady: 'Four colored lights come to my side. Red, pink, blue, orange.',
    },
    lines: {
      maze_portal: 'Go down to the uncounted level',
      maze_fruitTake: 'Take the cherry',
      ks_plug: 'PULL THE PLUG',
      ks_plugTry: 'Try to pull the plug',
      ks_exitGo: 'Walk through the EXIT',
      ks_exitHold: 'Hold the door open for Eddie',
      ks_missing: "(Missing: {names})",
    },
    radio: {
      maze_start: [
        ['eddie', 'This is it. Level two fifty-five. The last board before the broken one.'],
        ['eddie', 'Eat the corners. I\'ll be waiting at the bottom.'],
      ],
      ks_start: [
        ['eddie', 'Sam. I\'m here. Not on the radio. Here. By the door on the right.'],
        ['eddie', 'Come find me. Please.'],
      ],
      ks_plea: [
        ['eddie', 'That\'s the real one. Wind, rain, Front Street. Home.'],
        ['eddie', 'It lets one out and keeps one in. I found that out my first month. I\'ve been standing next to it ever since.'],
        ['sam', 'You were going to let me open it and walk through yourself.'],
        ['eddie', 'Hope is a year old, Sam. I have never held her. [His voice breaks.] I\'m not asking you to forgive me. I\'m asking you to hold the door.'],
      ],
      // If Sam heard him out at the Starlite, Eddie keeps the promise he made there
      ks_pleaTrust: [
        ['eddie', 'That\'s the real one. Wind, rain, Front Street. Home.'],
        ['eddie', 'I told you at the motel I wouldn\'t ask you. So I\'m not asking.'],
        ['sam', 'But you want to.'],
        ['eddie', 'Every second. [A long breath.] Go to the core first, Sam. If there\'s another way, it\'s there. If there isn\'t... I\'ll still be standing here.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
