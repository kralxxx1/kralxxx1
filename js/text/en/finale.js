/* English — Level 255 (The House) and Level 256 (Kill Screen). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'The House', place: 'The game itself',
        intro: 'Hungry House, from the inside. Walls that glow at the seams like a screen, stars floating at hip height, and in the middle the Haunts\' house, its door held shut by four lanterns.\n\nYou know this board better than your own bedroom. You have played it ten thousand times. It has been waiting for you to play it once more.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Kill Screen', place: 'The half nobody was supposed to see',
        intro: 'The left half of the board is the house you know. The right half is letters, numbers and colors that have come loose and hang in the air.\n\nSomewhere at the core, something is still plugged in.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Glowing letters on the maze wall', from: 'W.', body:
`IF YOU CAN READ THIS
YOU ARE IN MY GAME.
I'M SORRY.
EAT THE STARS.
DON'T HURT THE HAUNTS.
—W.` },
      maze_rules: { kind: 'wall', title: 'A plaque, cold as stone', body:
`RULES OF THE HOUSE

1. The Player eats.
2. The Haunts chase.
3. The board is cleared.
4. The next board begins.
5. There is no rule five.` },
      maze_house: { kind: 'note', title: "On the Haunts' house door", from: 'Eddie', body:
`Four lanterns hold the curtain shut. One in each corner.

The house is the way down. The last way down.

I'll meet you on the other side. —E.` },
      maze_fruit: { kind: 'memory', title: 'The candy — a memory', body:
`The first time Lily got the candy prize, she screamed so loud Walt dropped his coffee.

"Daddy! CANDY! I got the CANDY!"

After that he put a quarter in for her every Saturday and stood behind her the whole game, and never once told her which way to go.` },
      ks_glitch1: { kind: 'wall', title: 'Broken characters hanging in the air', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'A corrupted save file', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: "Walt's last letter", from: 'W. (I think that is my name)', date: 'A day that could not be counted', body:
`To whoever reaches the core.

The plug is here. Pulled from the inside it isn't murder, it's an ending. GAME OVER. Everyone who is still themselves goes home.

But it won't move for one pair of hands. The game started with five hands on the stick. It ends with five. And the four of them have to remember who they are, or their hands are just light.

I tried it alone, my first night in here. The game took it as a move and made me its Player. That's what I am now.

One hand let go at 3:16. The game has been waiting for that hand ever since.

Tell Nora I'm sorry. Tell Ruth she was right. Tell the table to keep Lily's score.

—W.` },
      ks_eddie: { kind: 'note', title: 'A note pinned beside the EXIT', from: 'Eddie', body:
`One in, one out.

I found this door my first week. Out there it's been a year and a half. In here it's felt like one very long night.

I'm sorry, kid.` },
    },
    obj: {
      maze_pellets: 'Take the lanterns in the four corners ({n}/4)',
      maze_house: "Go into the Haunts' house",
      ks_core: 'Reach the core on the broken side',
      ks_choice: 'Choose: the EXIT door or the plug',
    },
    mono: {
      maze_start: "This is... the game itself. I'm inside it.",
      maze_rules: 'Who eats the stars? I do.',
      maze_house: 'The curtain dropped. There\'s a door inside the house.',
      ks_start: 'The right side is... broken. Letters hanging in the air.',
      ks_core: "The core. There's a huge plug here. The cabinet's plug. From the inside.",
      ks_exit: 'EXIT. A real one this time. I can feel wind.',
      ks_plugTry: "It won't move. Not for two hands. It needs five.",
      ks_plugReady: 'Four colored lights come to my side. Red, violet, teal, amber.',
    },
    lines: {
      maze_portal: 'Go down to the level that can\'t be counted',
      maze_fruitTake: 'Take the candy',
      ks_plug: 'PULL THE PLUG',
      ks_plugTry: 'Try to pull the plug',
      ks_exitGo: 'Walk through the EXIT',
      ks_exitHold: 'Hold the door open for Eddie',
      ks_missing: '(Missing: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'This is it. Level two fifty-five. The last board before the broken one.'],
        ['eddie', 'Take the corners. I\'ll be waiting at the bottom.'],
      ],
      ks_start: [
        ['eddie', 'Sam. I\'m here. Not on the radio. Here. By the door on the right.'],
        ['eddie', 'Come find me. Please.'],
      ],
      ks_plea: [
        ['eddie', 'That\'s the real one. Wind, rain, Front Street. Home.'],
        ['eddie', 'It lets one out and keeps one in. I found it my first week. I\'ve been standing next to it ever since.'],
        ['sam', 'You were going to let me open it and walk through yourself.'],
        ['eddie', 'Hope is fifteen months old, Sam. I have never held her. [His voice breaks.] I\'m not asking you to forgive me. I\'m asking you to hold the door.'],
      ],
      // If Sam heard him out at the motel, Eddie keeps the promise he made there
      ks_pleaTrust: [
        ['eddie', 'That\'s the real one. Wind, rain, Front Street. Home.'],
        ['eddie', 'I told you at the motel I wouldn\'t ask. So I\'m not asking.'],
        ['sam', 'But you want to.'],
        ['eddie', 'Every second. [A long breath.] Go to the core first, Sam. If there\'s another way, it\'s there. If there isn\'t... I\'ll still be standing here.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
