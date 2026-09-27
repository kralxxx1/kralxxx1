/* English — Level 1: Mill Warehouse (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'Mill Warehouse', place: "Danny's memory — Harlow Mill, Front Street",
        intro: 'The ceiling is twenty feet up. The racks run on into the dark. Somewhere a clock is ticking, always on the same second.\n\nDanny\'s father packed boxes in this building for twenty-five years. Then one Friday they gave him a watch and sent him home.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Taped to the elevator door', from: 'Eddie', body:
`Freight elevator needs three fuses. The panel's by the loading office.

The red one patrols the aisles. Fast, never stops, but LOUD. Listen for him.

Don't try to outrun him in the open. Nobody outruns Danny.

—E.` },
      mill_layoff: { kind: 'letter', title: 'A letter on company paper', from: 'Harlow Mill, Shipping Dept.', date: 'May 30, 1986', body:
`Dear Ray,

As part of the restructuring of the Front Street shipping operation, your position will be eliminated effective June 30, 1986.

We thank you for twenty-five years of loyal service. Please return your locker key and badge to the front office.

Please accept the enclosed wristwatch as a token of our appreciation.

Harlow Mill Management` },
      mill_punch: { kind: 'card', title: 'A punch card', from: 'Harlow Mill', date: 'Summer 1986', body:
`EMPLOYEE: KOWALSKI, D. (SUMMER — SWEEPER)
RATE: $3.35/hr

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

Across the last line, in blue pen:
DAD'S LAST DAY TOO` },
      mill_graffiti: { kind: 'wall', title: 'Spray paint on the racks', body:
`DAN #1
DANNY WAS HERE
DANNY IS ALWAYS HERE` },
      mill_danny1: { kind: 'note', title: 'A folded note in a jacket pocket', from: 'Danny', date: 'March 1987', body:
`Everybody thinks I'm not scared of anything.

I'm scared of Dad sitting in the kitchen all day with the radio off.

So I play. The guy in first place doesn't sit in the kitchen.

(If Rosie reads this I will actually kill her.)` },
      mill_ray: { kind: 'letter', title: 'A letter that was never sent', from: "Ray, Danny's father", date: 'May 1987', body:
`Danny,

The police asked about the key again. I told them I don't care about any key. You can have every key in this town.

I'm at the hardware store now. It's all right. Fewer hours. I listen to the ball game.

I fixed your bike. New chain, new brakes. It's in the garage.

Come home and ride it. I won't say a word.

Dad` },
      mill_manifest: { kind: 'printout', title: 'A shipping manifest', from: 'Harlow Mill, Dock 3', date: 'April 17, 1987', body:
`SHIPMENT #0256
CONTENTS: 1 wristwatch (stopped at 3:17)
WEIGHT: nothing
DESTINATION: —
SIGNED FOR BY: —

The paper is warm, as if it had just come out of the printer.` },
      mill_walt3: { kind: 'diary', title: "Walt's journal", from: 'Walt', date: 'Inside, day ?', body:
`The red one never stops. He runs the same loops over and over, the way Danny played the maze: always first, always fastest, never a breath.

Today he came at me screaming. YOU LET GO. YOU LET GO.

I never let go of anything. I've held on to every one of them for five years. So who is he screaming at?

I followed him afterwards and I don't remember why. I think I was hungry.` },
      mill_shrine: { kind: 'note', title: 'Under the photo on the shrine', from: 'W.', body:
`He always had to be first.
First to the cabinet. First to 900,000.
First through the screen.

Give him something that stops.` },
      mill_tape: { kind: 'tape', title: 'Tape: "First place, for history"', from: "Rosie's tape recorder", date: 'April 16, 1987, 11:52 PM', body:
`[Click. Arcade noise. Kids laughing.]

DANNY: This is Danny Kowalski, first place, recording for history. Tonight we beat the kill screen.

ROSIE: Tonight we TRY to beat the kill screen.

DANNY: Walt says it's impossible. Walt also said nobody breaks nine hundred thousand.

TOBY: Are we gonna get in trouble? My mom thinks I'm sleeping at Sam's.

DANNY: Trouble's for people who get caught, Toby.

NELL: ...Sam went home, Danny.

DANNY: Sam's chicken. More kill screen for us.

[A pause.]

TOBY: Sam's not chicken. Sam'll come.

[Click.]` },
    },
    obj: {
      mill_fuses: 'Find the fuses ({n}/3)',
      mill_panel: 'Put the fuses into the elevator panel',
      mill_wait: 'The elevator is coming… Stay alive ({n}s)',
      mill_leave: 'Get in the elevator',
    },
    mono: {
      mill_start: 'A clock ticking. Always the same second.',
      mill_dannySeen: 'Red. A sheet soaked through, domed like a head, the hem torn into points. Two huge eyes and no face. Something the size of a boy is under it.',
      mill_fuse: 'Another fuse.',
      mill_elevator: 'The elevator is coming. Slowly. So slowly.',
      mill_watch: '3:17. Same as the clock.',
    },
    lines: {
      mill_panel: 'Put in the fuses',
      mill_panelIdle: 'Fuse panel ({n}/3)',
      mill_slots: 'The panel has three empty sockets.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? You there? ...Oh. I know this place. Harlow Mill, the Front Street warehouse. Danny\'s dad worked here twenty-five years.'],
        ['eddie', 'Which means the red one\'s going to be here too.'],
      ],
      mill_danny: [
        ['eddie', 'He\'s on you! Don\'t race him in the open. Break the line, take a corner, put something between you!'],
        ['sam', 'He\'s screaming something!'],
        ['eddie', 'He always does. "You let go." Screamed it at me, screamed it at Walt. I don\'t know who he means. RUN.'],
      ],
      mill_watch: [
        ['eddie', 'Is that a watch? ...Ray\'s watch. They gave it to him the day they let him go. Danny wore it every day after that.'],
        ['eddie', 'There\'s a shrine around here somewhere. Take it there. Maybe he remembers.'],
      ],
      mill_freed: [
        ['eddie', '...Did he stop? Sam, what did you do? He\'s just... standing there.'],
        ['eddie', 'Oh my God. That\'s Danny. That\'s actually Danny.'],
      ],
      mill_elevator: [
        ['eddie', 'That elevator is loud. Everything in here heard it. Stay alive till it gets there.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
