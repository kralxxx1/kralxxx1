/* English — Chapter 11: The Workshop (Walt, the basement under the arcade, April 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      workshop: {
        name: 'LEVEL 11', title: 'The Workshop', place: 'Under the Starlight Arcade, April 17, 1987, 3:20 AM',
        intro: 'Walt\'s basement: TV guts, solder smoke, a machine the size of a refrigerator humming behind a locked door. This is where the Kernel was born. Something big and yellow and smiling is walking between the benches, slowly, the way a costume walks when nobody is inside it.',
      },
    },
    items: {
      waltKey: { name: "Walt's key", desc: 'A steel key stamped KERNEL — W. The bow is worn to his thumbprint.' },
    },
    docs: {
      workshop_intro: { kind: 'note', title: 'On the basement stairs', from: 'Eddie', body:
`I haven't been down here since 1988. It's exactly the same. That's the worst part.

The Kernel's behind the steel door. Walt kept the key in his desk. The three calibration dials are on the front of the Kernel. The settings are on the schematic, somewhere on the benches.

If you get it right, I think the game will let us through to the maze.

That thing walking around is Chompy. The costume. It's slow. Don't let it hug you.

—E` },
      workshop_schematic: { kind: 'note', title: 'Schematic, blue pencil on graph paper', from: 'Walt & Eddie', date: 'Rev C, March 1987', body:
`KERNEL — LEVEL COUNTER OVERRIDE

Dial A (row) ........ 2
Dial B (column) ..... 5
Dial C (offset) ..... 6

= 256

!! Setting the counter to 256 lets the board draw past the kill screen.
!! Nobody knows what's drawn there. — E.
!! That's the point. — W.` },
      workshop_eddiebench: { kind: 'note', title: "Taped to Eddie's old bench", from: 'Eddie', date: 'April 17, 1987', body:
`It was my night to lock up the back.

I didn't. I was in a hurry. There was a midnight movie at the Rialto and I didn't want to miss the start.

Walt went upstairs at 11. The back door was unlocked. The kids didn't even need Billy's key.

I never told anyone. I let Walt carry it for both of us.

That's why I went in, Sam. It's not brave. It's just the bill coming due.` },
      workshop_keytag: { kind: 'note', title: 'A key tag in the desk drawer', from: 'Walt', date: '1986', body:
`(A paper key tag on a steel ring. One key is missing.)

SPARE — FRONT
Given to BILLY — Saturdays, 8 AM, to set up the machines.
"Responsible young man." — W.

(Under it, newer ink: "I told the police they left at midnight. I will not tell them I gave a child my key. They would take the boy's father's last good thing: that his son was trusted.")` },
      workshop_receipt: { kind: 'note', title: 'A receipt pinned to the costume stand', from: 'Harlow Party Supply', date: 'March 1983', body:
`1 × MASCOT COSTUME, custom, yellow, round — "CHOMPY"
Custom order ...................................... $180.00
Alterations: make it fit a man 6'2" ....... $25.00
Note from the shop: "Hope your daughter likes it!"

(Stapled to it, later: a hospital parking stub, October 14, 1983. The day he wore it up the stairs.)` },
      workshop_nora: { kind: 'letter', title: 'An unsent letter, the envelope addressed and stamped', from: 'Walt', date: 'February 1992', body:
`Nora,

I have read all of your letters. I did not answer because every answer I wrote was a lie or a goodbye.

I'm going in after them next month. Don't let anyone pull the plug. Not the bank, not the police, not you.

If I'm not back by the time the bank comes, the high score table is in the office. Keep it. The names on it matter more than anything I built.

Your brother,
Walt

(It was never mailed. The stamp is from 1992.)` },
      workshop_ticket: { kind: 'note', title: 'A TV repair ticket on the bench', from: 'Starlight Repair (in the back)', date: 'March 1986', body:
`CUSTOMER: Sam's mom (Maple St.)
SET: Zenith 19", no picture
REPAIR: Replaced flyback transformer.
CHARGE: $0 — "paid in chocolate chip cookies"

(Clipped to it, a note in your own 12-year-old handwriting: "THANK YOU WALT FOR FIXING OUR TV WE CAN WATCH THE GAME AGAIN — SAM")` },
      workshop_317: { kind: 'tape', title: 'Tape: "3:17"', from: "Penny's tape recorder (found in the cabinet, still recording)", date: 'April 17, 1987', body:
`[Click. The arcade after hours. The cabinet's music, sped up and wrong.]

PENNY: ...it's 3:14 and we are ON LEVEL 255, Radio Penny live —
BILLY: Shh! Pattern! Ivy, which way?
IVY: Left. Left, then wait. Wait. Now.
CLYDE: [whispering] Sam should see this. Sam should be here.

[3:16. The music stops. A single tone.]

BILLY: That's it. That's 256. Look at the right side...
IVY: It says CONTINUE. It's not supposed to say continue.
PENNY: Are we...? Do we...?
CLYDE: [very small] I'll hold the button with you, Billy.

[3:17. A sound like a very large breath being drawn in. Four short gasps. Then only the hum.]

[3:20. A door. Footsteps on the stairs. Walt, breathing hard.]

WALT: Kids? Billy? — No. No, no, no. Look at me. Look at the screen. Who... oh God. Oh God, there are four of them.

WALT: [the sound of a man sitting down on the floor] I'm sorry. I'll get you out. I promise I'll get you out.

[The tape runs on in silence for twenty-two minutes. Then: Click.]` },
      workshop_lily8: { kind: 'drawing', drawing: 8, title: "A drawing folded in Walt's toolbox", from: 'Lily, age 9', body:
`Crayon, the last one. A big man sitting on the floor next to a glowing machine, crying. A small girl stands behind him with her hand on his shoulder. She is drawn smiling.

DON'T BE SAD DADDY.
EVERYBODY GOES HOME AT THE END.
YOU PROMISED.` },
    },
    obj: {
      workshop_key: "Find Walt's key",
      workshop_kernel: 'Open the Kernel room',
      workshop_dials: 'Set the calibration dials ({n}/3 right)',
      workshop_leave: 'Go through the EXIT',
    },
    mono: {
      workshop_start: 'Walt\'s workshop. I used to watch him fix TVs through the little window.',
      workshop_key: 'His key. Warm, like someone just put it down.',
      workshop_kernel: 'The Kernel. It\'s breathing. I swear it\'s breathing.',
      workshop_calibrated: 'Two. Five. Six. The hum drops an octave. Somewhere far away, a door unlatches.',
      workshop_chompy: 'Chompy. The costume from the hospital photo. There\'s nobody inside it. It\'s walking anyway.',
    },
    lines: {
      workshop_unlock: "Unlock with Walt's key",
      workshop_dial: 'Turn the dial (now: {n})',
    },
    radio: {
      workshop_start: [
        ['eddie', 'Sam... before you go down those stairs. There\'s something on my bench. I\'d rather you read it than me say it.'],
      ],
      workshop_kernel: [
        ['eddie', 'That\'s her. That\'s the Kernel. We built her in eight months. I was so proud.'],
      ],
      workshop_chompy: [
        ['eddie', 'Light in its eyes. It covers its face. Walt used to do that bit for the kids. Peekaboo.'],
      ],
      workshop_calibrated: [
        ['eddie', '256. That\'s it. That\'s the door to the maze.'],
        ['eddie', 'Sam, whatever happens at the end... you should know the truth now. You know it. I left the door open.'],
        ['sam', 'You were going to a movie.'],
        ['eddie', '...Yeah. A movie. I don\'t even remember what it was.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
