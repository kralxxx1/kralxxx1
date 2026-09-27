/* English — Level 0: Attract Mode. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Attract Mode', place: 'Inside the screen',
        intro: 'A hum you can feel in your teeth. Wet carpet. Yellow walls that go on forever. Far away, a sound you have heard ten thousand times through a cabinet speaker: the Haunt siren, rising and falling.\n\nThe game has been waiting for a player. Now it has one.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Paper taped to the wall', from: 'Eddie', body:
`IF YOU'RE READING THIS:

1. Don't run unless it's already seen you. Running is loud.
2. EXIT signs lie. They go deeper, not out.
3. When the lights flicker, get out of the hallway.
4. The lanterns are real. Grab one and everything runs from YOU. For a little while.
5. Star Pop (the cherry soda) stops the shakes. Don't ask me why.
6. There's a walkie-talkie at my camp. Channel 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: "Eddie's camp log", from: 'Eddie', date: 'June 12, 1993 (?)', body:
`Camp 1.

Came through the screen at 11:40 PM. Landed on my face. The carpet is soaked but nothing is leaking. Nothing is ever leaking here.

No Walt. Found his flashlight, and his handwriting on a wall.

The walkie-talkies work on channel 7. Nobody answers. I'm leaving one here for the next idiot who follows a grown man into a video game.

If that's you: hi. Sorry. Channel 7.` },
      lobby_walt1: { kind: 'diary', title: "A page from Walt's journal", from: 'Walt', date: 'Inside, day 1', body:
`Day 1.

Yellow. It hums like a bad ballast. The carpet is wet.

I can hear the siren far off, the one that plays when the Haunts leave their house.

They're here. I was right. God help me, I was right.

Danny. Rosie. Nell. Toby. Hold on. I'm coming.` },
      lobby_walt2: { kind: 'diary', title: "Another page from Walt's journal", from: 'Walt', date: 'Inside, day 9 (?)', body:
`Day 9. Or 90.

I'm hungry all the time. There are cans of Star Pop everywhere, my own cooler's worth. I drank them all. I don't remember deciding to.

The lanterns taste like pennies. After I swallow one I can see farther.

Tried the plug on my first night. Alone. Something in me went click, like a coin dropping.

I saw the red one today. He ran from me. I called his name and he stopped, for one second.

I understand now. I'm the one with the mouth.` },
      lobby_flyer: { kind: 'flyer', title: 'A folded flyer', from: 'Rosie', date: 'April 1987', body:
`★ TOP SECRET ★
OPERATION 256

WHEN: Thursday 4/16, after closing
MISSION: see what's past the kill screen

CREW:
Danny — the key (DON'T tell Walt)
Rosie — the plan + snacks
Nell — the map of the Haunt patterns
Toby — the flashlight
Sam — the luck

ALL FIVE OR NOBODY.
DESTROY AFTER READING!!!
(Toby, that means don't keep it in your comic book.)` },
      lobby_exitwall: { kind: 'wall', title: 'Scratched beside the EXIT door', body:
`EXITS LIE
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Written above the chairs', body:
`THE CHAIRS WERE ALREADY
FACING THE WALL
WHEN I GOT HERE
—W.` },
      lobby_puddle: { kind: 'note', title: 'A damp note by the puddle', from: 'Walt', body:
`The water here is warm and smells of chlorine. Like the town pool.

Nell wouldn't go near the pool after '85. Is this hers?

Every room in here belongs to somebody.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'A drawing stuck behind a vent', from: 'Lily, age 9', body:
`Crayon. A big man with a mustache and a small girl with orange braids next to a little arcade machine. On its screen: a round orange creature and the number 3190. The girl has both arms up.

ME AND DADDY AND THE LITTLE MACHINE.
I GOT 3190 POINTS!!!
DADDY SAYS IT GOES ON THE TABLE FOREVER.` },
      lobby_tape: { kind: 'tape', title: 'Tape: "Test, test"', from: 'Eddie', date: 'Inside', body:
`[Click. Heavy breathing. The hum.]

EDDIE: Test, test. Tape log, day... I don't know. Day something.

EDDIE: If this is June: I'm okay. I'm fine. I find Walt, I bring the kids, I'm home before the baby. I promised, and I keep my promises. Mostly.

[Pause.]

EDDIE: If this isn't June: channel seven. Don't run. And whatever you do, don't let it hear you eat.

[Click.]` },
    },
    obj: {
      lobby_explore: 'Find a way out',
      lobby_pellets: 'Find the lanterns ({n}/4)',
      lobby_insert: 'Set the lanterns into the panel beside the EXIT',
      lobby_leave: 'Go through the door',
    },
    mono: {
      lobby_start: 'Where... The carpet is wet. The hum is inside my head.',
      lobby_exitSeen: 'EXIT. Four round sockets beside the door. Lantern-sized.',
      lobby_firstPellet: 'A lantern. Warm in my hand. For a second everything went blue and ran.',
      lobby_eaterHeard: 'Chewing. Somewhere behind the walls, something is chewing.',
      lobby_eaterSeen: 'Something pale at the end of the hall. Round. Too big for the hallway. It\'s chewing.',
      lobby_allPellets: 'Four lanterns. Now the door.',
      lobby_radio: 'A walkie-talkie. Someone taped the dial to channel 7.',
    },
    lines: {
      lobby_slots: 'Four sockets ({n}/4 lanterns)',
      lobby_place: 'Set the lanterns into the sockets',
      lobby_radioTake: 'Take the walkie-talkie',
    },
    radio: {
      lobby_meet: [
        ['radio', '[static]'],
        ['eddie', '...hello? HELLO? Is somebody on seven? Say something!'],
        ['sam', '...Hello? Who is this? Where am I?'],
        ['eddie', 'Oh, thank God. A person. Okay. Okay. My name is Eddie. I used to work at the Starlight. You came through number seven, right?'],
        ['sam', "Eddie? Walt's Eddie? You disappeared a year and a half ago. Your wife put your picture on every pole in Harlow."],
        ['eddie', 'A year and a half. Feels like a night. Then the baby is... [static] No. Not now. What\'s your name?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', "...Toby's Sam? Kid with the bike? Huh. That's why."],
        ['sam', 'Why what?'],
        ['eddie', 'When you came in, the whole place said it. PLAYER ONE. I heard it down here like a stadium. It never said that for me. For me it said INSERT COIN.'],
        ['eddie', 'Rules. Don\'t run unless something sees you. EXIT signs lie. If the lights flicker, get out of the hallway. The door out of here wants four lanterns. Find them. And Sam? Stay on seven.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Did you just pick up a lantern? Oh no. Okay. It heard that. Something always wakes up when you take one.'],
        ['eddie', 'Corners, Sam. It\'s fast in a straight line and slow in the turns.'],
      ],
      lobby_eater: [
        ['eddie', 'You saw it. Don\'t look at it too long. I call it the Eater.'],
        ['sam', 'What is it?'],
        ['eddie', 'It\'s the Player. Every game needs one. This one was... [static] Just take corners.'],
      ],
      lobby_panel: [
        ['eddie', 'Four sockets. Everything in here is the game, Sam. Clear the board and the door opens.'],
      ],
      lobby_open: [
        ['eddie', 'That door isn\'t a way out. EXITs lie. But it\'s the way down, and down is where they are.'],
        ['sam', 'Who?'],
        ['eddie', 'You know who. Four kids from April \'87. Go on. I\'ll be on seven.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
