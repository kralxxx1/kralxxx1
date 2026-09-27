/* English — Level 11: The Workshop (Walt, the basement under the arcade, April 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      workshop: {
        name: 'LEVEL 11', title: 'The Workshop', place: "Walt's memory — under the Starlight Arcade, April 17, 1987, 3:20 AM",
        intro: 'Walt\'s basement: TV guts, solder smoke, and behind a steel door a machine the size of a refrigerator, humming. This is where the Kernel was born.\n\nSomething big, orange and grinning walks between the benches, slowly, the way a costume walks when nobody is inside it.',
      },
    },
    items: {
      waltKey: { name: "Walt's key", desc: 'A steel key stamped KERNEL — W. ONLY. The bow is worn to the shape of his thumb.' },
    },
    docs: {
      workshop_intro: { kind: 'note', title: 'On the basement stairs', from: 'Eddie', body:
`I haven't been down here since 1988. It's exactly the same. That's the worst part.

The Kernel is behind the steel door. Walt kept the key at his bench. The three calibration dials are on the front of the Kernel. The settings are on the schematic, somewhere on the benches.

Set them right and I think the game lets us through to the house.

That thing walking around is Chompy. The costume. It's slow. Don't let it hug you.

—E.` },
      workshop_schematic: { kind: 'note', title: 'Schematic, blue pencil on graph paper', from: 'Walt & Eddie', date: 'Rev. C, March 1987', body:
`KERNEL — LEVEL COUNTER OVERRIDE

Dial A (row) ........ 2
Dial B (column) ..... 5
Dial C (offset) ..... 6

= 256

!! Counter at 256 lets the board draw past the kill screen.
!! Nobody knows what gets drawn there. — E.
!! That's the point. — W.` },
      workshop_eddiebench: { kind: 'note', title: "Taped to Eddie's old bench", from: 'Eddie', date: 'April 17, 1987', body:
`It was my night to lock the back door.

I didn't. I was in a hurry. Midnight movie at the Rialto and I didn't want to miss the start.

Walt went upstairs at 11. The back door stayed unlocked all night.

I never told anyone. I let Walt carry it for both of us.

That's why I went in, Sam. It isn't brave. It's the bill coming due.` },
      workshop_keytag: { kind: 'note', title: 'A key tag at the bench', from: 'Walt', date: '1986', body:
`(A paper key tag on a steel ring. One key is missing.)

SPARE — FRONT
Given to DANNY K. — Saturdays, 8 AM, to set up the machines.
"Responsible young man." — W.

(Under it, in newer ink: "I told the police they left at midnight. I will not tell them I gave a child my key. They would take his father's last good thing: that his son was trusted.")` },
      workshop_receipt: { kind: 'note', title: 'A receipt pinned to the costume stand', from: 'Harlow Party Supply', date: 'March 1983', body:
`1 × MASCOT COSTUME, custom — "CHOMPY"
Round, orange, felt horns, foam teeth (from the enclosed drawing)
Custom order ......................... $180.00
Alterations: fit a man 6'2" .......... $25.00
Note from the shop: "Hope your daughter likes it!"

(Stapled to it, later: a St. Agnes parking stub, October 27, 1983. The day he wore it up the stairs.)` },
      workshop_nora: { kind: 'letter', title: 'An unsent letter, addressed and stamped', from: 'Walt', date: 'February 1992', body:
`Nora,

I've read all of your letters. I didn't answer because every answer I wrote was either a lie or a goodbye.

I'm going in after them next month. Don't let anyone pull the plug. Not the bank, not the police, not you.

If I'm not back when the bank comes, the score sheet is in the hallway. Keep it. The names on it matter more than anything I ever built.

Your brother,
Walt

(It was never mailed.)` },
      workshop_ticket: { kind: 'note', title: 'A TV repair ticket on the bench', from: 'Starlight Repair (in the back)', date: 'March 1986', body:
`CUSTOMER: Ann Keller (Maple St.)
SET: 19-inch color TV, no picture
REPAIR: Replaced the flyback transformer.
CHARGE: $0 — "paid in chocolate chip cookies"

(Clipped to it, a note in your own twelve-year-old handwriting: "THANK YOU WALT FOR FIXING OUR TV WE CAN WATCH THE GAME AGAIN — SAM")` },
      workshop_317: { kind: 'tape', title: 'Tape: "3:17"', from: "Rosie's tape recorder (found inside cabinet #7, still recording)", date: 'April 17, 1987, 3:14–3:42 AM', body:
`[Click. The arcade after hours. Hungry House music, sped up and wrong.]

ROSIE: ...three-fourteen, and we are ON LEVEL 255. Rosie Radio, live, history in the making—
DANNY: Shh! Pattern! Nell, which way?
NELL: Left. Left, then wait. Wait... now.
TOBY: Sam, your turn on the button. Sam? You're shaking.
SAM: It's hot. The whole cabinet's hot. Guys, it's too hot.

[3:16. The music stops. One long tone.]

DANNY: That's it. That's 256. Look at the right side...
NELL: It's split. It's all letters. And... our names. D-A-N. R-O-S. N-E-L. T-O-B. S-A-M.
ROSIE: The pact. Everybody. All five hands on the stick. NOW.
TOBY: I've got you, Sam. I've got your hand.
NELL: The Haunts turned around. They're looking at us. Out of the screen. They're LOOKING at us.
SAM: It's burning— I can't— I can't—
DANNY: NOBODY LETS GO!

[A hand tears away from hot metal. Sneakers on carpet. The back door bangs open onto the rain.]

TOBY: SAM! SAM, COME BACK! [a sob] ...It's okay. It's okay. Four's okay.
ROSIE: [shaking] CONTINUE. Press it. Together.

[3:17. A sound like an enormous breath being drawn in. Four short gasps. Then only the hum.]

[3:20. A door. Footsteps on the stairs. Walt, out of breath.]

WALT: Kids? Danny? ...No. No, no, no. The screen. The names under the Haunts. DAN. ROS. NEL. TOB. Oh God. Oh God, those are their names.
WALT: [a man sitting down hard on the floor] I'm sorry. I'll get you out. I promise I'll get you out.

[The tape runs on in silence for twenty-two minutes. Then: click.]` },
      workshop_lily8: { kind: 'drawing', drawing: 8, title: "A drawing folded in Walt's toolbox", from: 'Lily, age 9', body:
`Crayon, the last one. A big man sits on the floor beside a tall glowing machine, crying. A small girl stands behind him with her hand on his shoulder. She is drawn smiling.

DON'T BE SAD DADDY.
EVERYBODY GOES HOME AT THE END.
YOU PROMISED.` },
    },
    obj: {
      workshop_key: "Find Walt's key",
      workshop_kernel: 'Open the Kernel room',
      workshop_dials: 'Set the calibration dials ({n}/3 correct)',
      workshop_leave: 'Go through the EXIT',
    },
    mono: {
      workshop_start: 'Walt\'s workshop. I used to watch him fix TVs through the little window.',
      workshop_key: 'His key. Warm, as if someone just put it down.',
      workshop_kernel: 'The Kernel. It\'s breathing. I swear it\'s breathing.',
      workshop_calibrated: 'Two. Five. Six. The hum drops an octave. Far away, a door unlatches.',
      workshop_chompy: 'Chompy. The costume from the hospital photo. There\'s nobody inside it. It\'s walking anyway.',
      workshop_317: 'I let go.',
    },
    lines: {
      workshop_unlock: "Unlock it with Walt's key",
      workshop_dial: 'Turn the dial (now: {n})',
    },
    radio: {
      workshop_start: [
        ['eddie', 'Sam... before you go down those stairs. There\'s something on my bench. I\'d rather you read it than hear me say it.'],
      ],
      workshop_kernel: [
        ['eddie', 'That\'s her. That\'s the Kernel. We built her in eight months. I was so proud.'],
      ],
      workshop_chompy: [
        ['eddie', 'Light in its eyes. It covers its face. Walt used to do that bit for the kids. Peekaboo.'],
      ],
      workshop_truth: [
        ['eddie', '...Sam? I heard it. It came through on seven. All of it.'],
        ['sam', 'I let go. I let go and I ran, and I told everybody I went home at 9:40. For seven years.'],
        ['eddie', 'You were thirteen.'],
        ['sam', 'Walt spent five years being the monster of this town. Because of me. And then he went in, and now he IS one.'],
        ['eddie', '...And I left the door unlocked. Walt lied about a key. Everybody in this story let go of something, kid.'],
        ['eddie', 'What matters is what you hold on to now.'],
      ],
      workshop_calibrated: [
        ['eddie', '256. That\'s it. That\'s the way into the house.'],
        ['eddie', 'You read my bench. I left the back door open. That\'s how you got back in that night.'],
        ['sam', 'You were going to a movie.'],
        ['eddie', '...Yeah. A movie. I don\'t even remember which one.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
