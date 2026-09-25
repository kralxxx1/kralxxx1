/* English — Chapter 1: The Lobby (Level 0). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'The Lobby', place: 'The edge of the screen',
        intro: 'A hum. The smell of wet carpet. Yellow walls that go on forever. Somewhere far away, a sound you have heard ten thousand times: the ghost siren. Whoo, whoo.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Paper taped to the wall', from: 'Eddie', body:
`IF YOU'RE READING THIS:

1. Don't run unless it sees you. Running is loud.
2. EXIT signs lie. They go deeper, not out.
3. When the lights flicker, hide or take a corner.
4. The pellets are real. Swallow one and everything runs from you. For a little while.
5. Almond water. Drink it. Don't ask.
6. There's a radio at my camp. Channel 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: "Eddie's camp log", from: 'Eddie', date: 'June 12, 1993 (?)', body:
`Camp 1.

Came through the screen at 11:40 PM. Landed on my face. The carpet is wet but nothing is leaking. Nothing is ever leaking here.

Walt's not here. Found his flashlight and his handwriting on a wall.

The radios work on channel 7. Nobody answers. I'm leaving one here for the next idiot who follows Walt into a video game.

If that's you: hi. Sorry. Channel 7.` },
      lobby_walt1: { kind: 'diary', title: "A page from Walt's journal", from: 'Walt', date: 'Inside, day 1', body:
`Day 1.

It's yellow. It hums like the ballast in the old Asteroids cabinet. The carpet is wet.

I can hear the siren far away. The ghost siren, the one that plays when they leave the house. Whoo, whoo.

They're here. I was right. God help me, I was right.

Billy, Penny, Ivy, Clyde. Hold on. I'm coming.` },
      lobby_walt2: { kind: 'diary', title: "Another page from Walt's journal", from: 'Walt', date: 'Inside, day 9 (?)', body:
`Day 9. Or 90.

I'm hungry all the time. I found crates of almond water and drank all of it. I don't remember deciding to.

The pellets taste like pennies. After I eat one, I can see farther.

I saw the red one today. He screamed when I got close and ran. I called his name. He stopped for a second, then kept running.

I understand. I'm the one with the mouth now.` },
      lobby_flyer: { kind: 'flyer', title: 'A folded flyer', from: 'Penny', date: 'April 1987', body:
`★ TOP SECRET ★
OPERATION 256

WHEN: Thursday 4/16, after closing
MISSION: see what's on the other side of the kill screen

CREW:
Billy — the key (DON'T tell Walt)
Penny — the plan + snacks
Ivy — the map of the ghost patterns
Clyde — the flashlight
Sam — the luck

DESTROY AFTER READING!!!
(Clyde, that means don't keep it in your comic book.)` },
      lobby_exitwall: { kind: 'wall', title: 'Scratched next to the EXIT door', body:
`EXITS LIE
—E` },
      lobby_chairs: { kind: 'wall', title: 'Written above the chairs', body:
`THE CHAIRS WERE ALREADY
FACING THE WALL
WHEN I GOT HERE
—W` },
      lobby_puddle: { kind: 'note', title: 'A damp note by the puddle', from: 'Walt', body:
`The water here is warm and it smells of chlorine. Like the town pool.

Ivy wouldn't go near the pool after '85. Is this hers?

Every room here belongs to somebody.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'A child\'s drawing stuck behind a vent', from: 'Lily, age 8', body:
`Crayon. A big man and a small girl in front of a machine with a yellow circle on the screen. The girl has her arms up.

ME AND DADDY AT THE ARCADE.
I GOT 3190 POINTS!!!
DADDY SAID IT GOES ON THE TABLE FOREVER.` },
      lobby_tape: { kind: 'tape', title: 'Tape: "Test, test"', from: 'Eddie', date: 'Inside', body:
`[Click. Heavy breathing. The hum.]

EDDIE: Test, test. Tape log, day... I don't know. Day something.

EDDIE: If this is June: I'm okay. I'm fine. I'm going to find him and I'm coming home before the baby. I promised, and I keep my promises. Mostly.

[Pause.]

EDDIE: If this isn't June: channel 7. Don't run. And whatever you do, don't let it see you eat.

[Click.]` },
    },
    obj: {
      lobby_explore: 'Find a way out',
      lobby_pellets: 'Collect the power pellets ({n}/4)',
      lobby_insert: 'Put the pellets into the slots by the EXIT door',
      lobby_leave: 'Go through the door',
    },
    mono: {
      lobby_start: 'Where am I? The carpet is... wet. The hum is inside my head.',
      lobby_exitSeen: 'EXIT. Four round slots next to the door. Pellet-sized.',
      lobby_firstPellet: 'A handful of light. For a second everything turned blue.',
      lobby_eaterHeard: 'That sound. Waka, waka. I heard it a thousand times as a kid. Never like this.',
      lobby_eaterSeen: 'Yellow light at the end of the hall. Big. So big.',
      lobby_allPellets: 'Four pellets. Now the door.',
      lobby_radio: 'A walkie-talkie. The dial is taped to channel 7.',
    },
    lines: {
      lobby_slots: 'Four slots ({n}/4 pellets)',
      lobby_place: 'Put the pellets into the slots',
      lobby_radioTake: 'Take the walkie-talkie',
    },
    radio: {
      lobby_meet: [
        ['radio', '[static]'],
        ['eddie', '...hello? HELLO? Is somebody on seven? Say something!'],
        ['sam', "...Hello? Who is this? Where am I?"],
        ['eddie', 'Oh thank God. A human voice. Okay. Okay. My name is Eddie. I used to work at the Starlight. You came through the screen, right? Number seven?'],
        ['sam', "Eddie? Walt's Eddie? You disappeared last year. Your picture was in the paper for weeks."],
        ['eddie', 'Last year. Huh. Feels like last week. Listen, what\'s your name?'],
        ['sam', 'Sam.'],
        ['eddie', '...Sam. Clyde\'s Sam? Little Sam with the bike? You\'re kidding me. Okay, Sam, rules. Don\'t run unless something sees you. EXIT signs lie. And if the lights flicker, you get out of the hallway.'],
        ['eddie', 'The door out of this level wants four power pellets. Find them. And Sam? Stay on channel seven.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Did you just take a pellet? Oh no. No, no, no. Okay. It\'s awake now. Something always wakes up when you eat.'],
        ['eddie', 'Corners, Sam. It\'s fast in a straight line and slow in the turns.'],
      ],
      lobby_eater: [
        ['eddie', 'You saw it. Don\'t look at it too long. I call it the Eater.'],
        ['sam', 'What is it?'],
        ['eddie', 'It used to be... [static] Just take corners.'],
      ],
      lobby_panel: [
        ['eddie', 'Four slots. Everything here is the game, Sam. Clear the board and the door opens.'],
      ],
      lobby_open: [
        ['eddie', 'That door isn\'t a way out. EXITs lie. But it\'s the way down, and down is where they are.'],
        ['sam', 'Who?'],
        ['eddie', 'You know who. Four kids from April \'87. Go on. I\'ll be on seven.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
